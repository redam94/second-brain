---
title: DeepAR and Global Autoregressive Neural Forecasters
tags:
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/deep-learning
  - topic/machine-learning
  - type/method
  - doc/paper
source: "[[raw/Salinas 2017 - DeepAR Probabilistic Forecasting with Autoregressive Recurrent Networks.pdf]]"
source_location: "Secs. 1-3 (pp. 1-6), Sec. 4 (pp. 6-8), Supplementary (pp. 9-10), Tables 1-3, Figs. 1-5"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Local vs Global Forecasting Models]]"
  - "[[Time-Series Foundation Models (Chronos)]]"
  - "[[Forecast Evaluation and Backtesting]]"
aliases:
  - DeepAR
  - Autoregressive Recurrent Network Forecasting
  - Global Neural Forecaster
  - Salinas et al. 2017
---

# DeepAR and Global Autoregressive Neural Forecasters

> [!summary]
> **DeepAR** (Salinas, Flunkert & Gasthaus, Amazon, 2017) is the canonical *global* probabilistic forecaster. A single autoregressive LSTM, with parameters $\Theta$ shared across all $N$ series, maps the previous value $z_{i,t-1}$, covariates $x_{i,t}$ and hidden state $h_{i,t-1}$ to the parameters $\theta_{i,t}$ of a chosen likelihood (Gaussian for real data, **negative binomial** for counts). Training maximises the summed log-likelihood over random windows from all series; forecasting draws **ancestral sample paths**, giving a *joint* predictive distribution over the horizon. Two devices make pooling work on power-law-scaled retail data: **per-series scaling** $\nu_i$ of inputs/outputs and **scale-weighted sampling** of training windows. On Amazon sales data DeepAR improves quantile risk by roughly 15% on average over the best previous methods, and up to ~23% on the hardest dataset.

## Overview

Classical practice — [[Single Marketing Time Series|Box–Jenkins ARIMA]], exponential smoothing, [[Linear-Gaussian State-Space Models|state-space models]] — estimates "model parameters for each given time series … independently … from past observations" with manual choice of trend/seasonal/autocorrelation structure (p. 1). DeepAR targets a different regime: "forecasting thousands or millions of related time series" — household energy use, server load, demand for every product of a large retailer. There, related series are data: they permit "fitting more complex (and hence potentially more accurate) models without overfitting" and remove manual per-series model selection.

The paper lists four advantages (p. 2): (i) seasonality and covariate effects are learned across series with minimal feature engineering; (ii) forecasts are **Monte Carlo sample paths**, so quantiles of any functional of the future (e.g. total demand over a lead-time window) are consistent; (iii) **cold start** — series with little or no history get forecasts by borrowing from similar items; (iv) no Gaussian-noise assumption — any likelihood with cheap sampling and differentiable log-density can be used.

## Main Content

> [!definition] Model ^def-deepar-model
> For series $i$ with values $z_{i,t}$, covariates $x_{i,t}$ known over the whole range, conditioning range $[1,t_0-1]$ and prediction range $[t_0,T]$, the model distribution factorises autoregressively:
>
> $$
> Q_\Theta(z_{i,t_0:T}\mid z_{i,1:t_0-1},x_{i,1:T})=\prod_{t=t_0}^{T}\ell\bigl(z_{i,t}\mid\theta(h_{i,t},\Theta)\bigr),
> \qquad
> h_{i,t}=h\bigl(h_{i,t-1},z_{i,t-1},x_{i,t},\Theta\bigr),
> $$
>
> where $h$ is a multi-layer LSTM (Eq. 1). It is *autoregressive* (consumes $z_{i,t-1}$) and *recurrent* (consumes $h_{i,t-1}$). Encoder (conditioning range) and decoder (prediction range) share architecture **and weights**; $h_{i,0}$ and $z_{i,0}$ are zero.

> [!definition] Likelihood heads (Sec. 3.1) ^def-deepar-likelihoods
> **Gaussian**, $\theta=(\mu,\sigma)$:
>
> $$
> \mu(h_{i,t})=w_\mu^\top h_{i,t}+b_\mu,\qquad \sigma(h_{i,t})=\log\bigl(1+\exp(w_\sigma^\top h_{i,t}+b_\sigma)\bigr).
> $$
>
> **Negative binomial** with mean $\mu>0$ and shape $\alpha>0$:
>
> $$
> \ell_{\text{NB}}(z\mid\mu,\alpha)=\frac{\Gamma(z+\tfrac1\alpha)}{\Gamma(z+1)\Gamma(\tfrac1\alpha)}\left(\frac{1}{1+\alpha\mu}\right)^{1/\alpha}\left(\frac{\alpha\mu}{1+\alpha\mu}\right)^{z},
> $$
>
> both obtained through softplus layers, so that $\operatorname{Var}[z]=\mu+\mu^2\alpha$. Beta, Bernoulli or mixture likelihoods drop in the same way.

> [!algorithm] Training (Sec. 3.2) ^alg-deepar-training
> 1. For each series generate many training windows of fixed total length $T$ by sliding the start point; windows may begin *before* the series starts (zero-padded) so the model learns the behaviour of "new" series. Absolute time reaches the model only through covariates.
> 2. Sample windows with probability proportional to the series scale $\nu_i$ (Sec. 3.3).
> 3. Maximise
>
> $$
> \mathcal L=\sum_{i=1}^{N}\sum_{t=t_0}^{T}\log\ell\bigl(z_{i,t}\mid\theta(h_{i,t})\bigr)
> $$
>
> by SGD (ADAM, early stopping). Because $h_{i,t}$ is a deterministic function of observed inputs, "in contrast to state space models with latent variables — no inference is required" (Eq. 2). In practice the likelihood terms of the conditioning range are included too ($t_0=0$).
>
> Teacher forcing creates a train/predict mismatch (true $z_{i,t-1}$ vs sampled $\tilde z_{i,t-1}$); the authors "have not observed adverse effects" and scheduled sampling did not help.

> [!algorithm] Prediction by ancestral sampling (Sec. 3) ^alg-deepar-sampling
> 1. Run the network over the conditioning range to obtain $h_{i,t_0-1}$.
> 2. For $t=t_0,\dots,T$: compute $\tilde h_{i,t}=h(\tilde h_{i,t-1},\tilde z_{i,t-1},x_{i,t},\Theta)$, draw $\tilde z_{i,t}\sim\ell(\cdot\mid\theta(\tilde h_{i,t},\Theta))$, feed it back.
> 3. Repeat (200 traces in the experiments). The traces are samples from the **joint** predictive distribution, so quantiles of sums over any span $[L,L+S)$ are obtained by summing within each trace first.

> [!definition] Scale handling (Sec. 3.3) ^def-deepar-scale
> Amazon item velocities follow an approximate **power law** (Fig. 1), so no velocity-band grouping removes the skew, and input standardisation or batch-norm are ineffective. DeepAR (a) divides autoregressive inputs by $\nu_i=1+\frac{1}{t_0}\sum_{t=1}^{t_0}z_{i,t}$ and rescales the outputs — for the negative binomial $\mu=\nu_i\log(1+e^{o_\mu})$, $\alpha=\log(1+e^{o_\alpha})/\sqrt{\nu_i}$ (count data cannot be rescaled in preprocessing); and (b) samples training windows with probability $\propto\nu_i$, so rare high-velocity items are not under-fitted.

**Features (Sec. 3.4).** An "age" feature (distance to first observation), calendar features as increasing numeric values (hour-of-day, day-of-week, week-of-year, month-of-year by frequency), and one learned categorical embedding (product category for retail; item identity in small datasets). Covariates such as price or promotion are admissible "as long as the features' values are available also in the prediction range." All covariates are standardised.

**Missing data (Supplement).** Replace an unobserved $z_{i,t}$ by a draw from the model's conditional predictive distribution when computing $h$ and drop its likelihood term — important for stock-outs, where treating censored sales as demand yields a downward-biased spiral.

**Architecture (Table 3).** 3 LSTM layers with 40 nodes (parts, electricity, traffic) or 120 nodes (ec-sub, ec); encoder/decoder lengths 8/8 (monthly), 168/24 (hourly), 52/52 (weekly); batch size 64-512; the full 534,884-series `ec` dataset trains and predicts in about 10 hours on one GPU.

### Empirical results (Sec. 4, Tables 1-2)

Metric: the $\rho$-**risk** (normalised quantile loss, see [[Forecast Evaluation and Backtesting]]) at $\rho=0.5,0.9$ for spans $(L,S)$, relative to the strongest published baseline (= 1.00). Baselines: Croston, ETS, the negative-binomial AR model of Snyder et al., and the innovations state-space model (ISSM) of Seeger et al.

| Dataset (series) | Best baseline | rnn-gaussian | rnn-negbin | **DeepAR** (avg.) |
|---|---|---|---|---|
| parts (1,046) | Snyder 1.00 | 1.19 | 0.99 | **0.94** |
| ec-sub (39,700) | ISSM 1.00 | 1.21 | 1.17 | **0.77** |
| ec (534,884) | ISSM 1.00 | 1.01 | 0.93 | **0.85** |

The ablations isolate the contributions: a Gaussian head on count data is markedly worse (`rnn-gaussian`), and the negative-binomial head *without* scaling and weighted sampling (`rnn-negbin`) loses most of the gain on the power-law datasets but matches DeepAR on `parts`, which is not power-law. Against matrix factorisation on real-valued data, DeepAR obtains ND 0.07 vs 0.16 (electricity) and 0.17 vs 0.20 (traffic), evaluated with rolling windows and **without retraining** between windows.

**Qualitative findings (Sec. 4.2).** Uncertainty growth over the horizon is *learned* rather than imposed — it is non-linear and correctly widens around Q4, unlike the ISSM's linear growth (Fig. 4). Calibration curves (Coverage($p$) vs $p$) improve on ISSM (Fig. 5). Shuffling the sample paths independently per time step — destroying temporal correlation while preserving marginals — leaves one-step calibration unchanged but worsens calibration of 9-step sums and raises 0.9-risk by 10%: the joint sample paths carry real information.

## Examples

**Ordering decisions from sample paths.** A retailer needs the 90th percentile of demand over weeks 3-14 ahead (lead time $L=3$, span $S=12$) for a newly launched SKU with four weeks of history.

1. Condition the trained network on the 4 observed weeks (zero-padded before launch; the age feature marks it as new; the category embedding supplies the seasonal prior).
2. Draw 200 sample paths of length 15.
3. For each path compute $Z^{(k)}=\sum_{t=t_0+3}^{t_0+14}\tilde z^{(k)}_t$.
4. Order up to the empirical 0.9-quantile of $\{Z^{(k)}\}$.

Computing per-week 0.9-quantiles and summing them would overstate the required stock, because quantiles do not add; independent per-week sampling would misstate it, because weekly demands are positively correlated — the shuffling experiment quantifies this.

```python
# GluonTS-style sketch
from gluonts.torch import DeepAREstimator
from gluonts.torch.distributions import NegativeBinomialOutput
est = DeepAREstimator(freq="W", prediction_length=52, context_length=52,
                      num_layers=3, hidden_size=120,
                      distr_output=NegativeBinomialOutput(),
                      num_feat_static_cat=1, cardinality=[n_categories])
predictor = est.train(train_ds)                 # one model for all series
fcst = next(predictor.predict(test_ds, num_samples=200))
q90_span = np.quantile(fcst.samples[:, 3:15].sum(axis=1), 0.9)
```

## Connections

- [[Probabilistic Forecasting - Overview]] — places DeepAR as the "task-specific global" tier between local and pretrained models.
- [[Local vs Global Forecasting Models]] — the statistical argument for sharing $\Theta$ and the scale-heterogeneity obstacle.
- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — training objective = log score; evaluation = pinball loss.
- [[Time-Series Foundation Models (Chronos)]] — inherits mean scaling and autoregressive sampling; replaces the parametric head with a categorical one and the RNN with a transformer.
- [[Linear-Gaussian State-Space Models]] and [[The Kalman Filter]] — latent-state models require filtering for the likelihood; DeepAR's deterministic state needs none, at the cost of interpretable components.
- [[Hierarchical Models]] — partial pooling through a hyperprior vs pooling through shared network weights plus item embeddings.
- [[Monsters and Mixtures]] — over-dispersed count likelihoods (gamma-Poisson / negative binomial) in the Bayesian regression setting.

## See Also

- [[Transformers and LLM Foundations - Overview]] — DeepAR's sequence-to-sequence design follows the RNN language-modelling work that transformers later displaced.
- [[Bayesian Structural Time-Series Model]] — a local alternative with explicit trend/seasonal/regression components.
- [[Transfer Function Model]] — classical treatment of covariates with dynamic (lagged) effects; DeepAR's covariates must be known in the prediction range.
- [[Optimal Marketing Decisions and Forecasting]] — forecasts as inputs to planning decisions.
