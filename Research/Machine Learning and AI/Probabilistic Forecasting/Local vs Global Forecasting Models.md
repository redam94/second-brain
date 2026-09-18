---
title: Local vs Global Forecasting Models
tags:
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/machine-learning
  - type/concept
  - doc/paper
source:
  - "[[raw/Salinas 2017 - DeepAR Probabilistic Forecasting with Autoregressive Recurrent Networks.pdf]]"
  - "[[raw/Ansari 2024 - Chronos Learning the Language of Time Series.pdf]]"
source_location: "Salinas et al. 2017 Secs. 1-2 (pp. 1-3), Sec. 3.3 (pp. 5-6), Sec. 4.1 & Table 1 (pp. 7-8); Ansari et al. 2024 Sec. 2 (p. 3), Sec. 5.3 (pp. 9-10), Sec. 5.5 (pp. 10-13), Sec. 6 (pp. 19-21), Tables 7-10 (pp. 36-37)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[DeepAR and Global Autoregressive Neural Forecasters]]"
  - "[[Time-Series Foundation Models (Chronos)]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Forecast Evaluation and Backtesting]]"
aliases:
  - Local vs Global Models
  - Global Forecasting Models
  - Cross-Learning
  - Pooled Forecasting Models
  - Task-Specific vs Pretrained Forecasters
---

# Local vs Global Forecasting Models

> [!summary]
> A **local** model estimates separate parameters $\theta_i$ for each series $i$ (ARIMA, ETS, Theta, BSTS). A **global** model estimates one parameter vector $\Theta$ from all series jointly and conditions on each series' own recent history to individualise the forecast (DeepAR, TFT, N-BEATS, PatchTST). A **pretrained** model is a global model whose training set is a multi-domain corpus and which is applied to new data without fitting (Chronos). The trade-off is the familiar one between **no pooling and complete pooling** of parameters: global models buy a large reduction in estimation variance — and the ability to use flexible function classes and to forecast cold-start series — at the risk of bias when series are heterogeneous. Both papers' evidence says the trade is favourable at scale: task-specific global models beat local ones, and pretrained models zero-shot match the task-specific ones.

## Overview

The vault's classical time-series notes — [[Single Marketing Time Series]], [[Transfer Function Model]], [[Bayesian Structural Time-Series Model]], [[Linear-Gaussian State-Space Models]] — are all local: every series gets its own model and its own parameter estimates. Salinas et al. (Sec. 1) describe this as the setting in which "prevalent forecasting methods … have been developed": individual or small groups of series, manually selected structure. Ansari et al. (Sec. 2) give the modern vocabulary: classical methods "fit a separate model to each time series independently (hence referred to as local models). In contrast, deep learning forecasting models learn across time series in a given dataset (and are called global models)."

This note collects what the two papers say about *when and why* globality helps, what makes it hard, and how it relates to the pooling ideas already in the vault.

## Main Content

> [!definition] Local model ^def-local-model
> For each series $i=1,\dots,N$ a separate parameter $\theta_i$ is estimated from $z_{i,1:T_i}$ alone:
>
> $$
> \hat\theta_i=\arg\max_{\theta}\ \log p(z_{i,1:T_i}\mid\theta),\qquad \hat P_i=p(z_{i,T_i+1:T_i+H}\mid z_{i,1:T_i},\hat\theta_i).
> $$
>
> Total parameter count grows as $O(N)$; each estimate uses $T_i$ observations.

> [!definition] Global model ^def-global-model
> A single $\Theta$ is estimated from all series:
>
> $$
> \hat\Theta=\arg\max_{\Theta}\ \sum_{i=1}^{N}\sum_{t}\log \ell\bigl(z_{i,t}\mid\theta(h_{i,t},\Theta)\bigr),\qquad h_{i,t}=h(h_{i,t-1},z_{i,t-1},x_{i,t},\Theta)
> $$
>
> (DeepAR, Eq. 2). The forecast for series $i$ differs from that for series $j$ **only through the inputs** — its own lagged values, covariates, scale $\nu_i$, and optional item embedding — not through series-specific fitted dynamics. Parameter count is $O(1)$ in $N$; the estimate uses $\sum_iT_i$ observations.

> [!definition] Pretrained (foundation) model ^def-pretrained-model
> A global model whose $\hat\Theta$ is estimated once on a corpus $\mathcal D_{\text{pre}}$ of many datasets and then applied to a series from an unseen dataset with **no parameter update** — "pretrained models which do not perform task-specific training, instead using a single model across all tasks" (Ansari et al., Sec. 5.3). All adaptation happens in-context, through the $C$ most recent observations.

### Why pooling across series helps

1. **Variance reduction, enabling flexible models.** "Using data from related time series not only allows fitting more complex (and hence potentially more accurate) models without overfitting, it can also alleviate the time and labor intensive manual feature engineering and model selection steps" (Salinas et al., p. 1). A 3-layer LSTM is hopeless on one 52-point weekly series but well-determined on 2M windows drawn from 500K series.
2. **Shared structure is learned once.** Seasonal shapes, holiday responses and covariate effects recur across items; DeepAR "learns seasonal behavior and dependencies on given covariates across time series" (advantage (i)).
3. **Cold start.** "By learning from similar items, our method is able to provide forecasts for items with little or no history at all, a case where traditional single-item forecasting methods fail" (advantage (iii)). Training windows that start before a series begins teach the model the typical launch trajectory.
4. **Learned, not assumed, uncertainty growth.** Pooled data identify how predictive variance grows with horizon (non-linearly, widening in Q4), which a local ISSM must postulate (Sec. 4.2).
5. **Operational simplicity.** One model to train, monitor and deploy; at the pretrained extreme, none to train: Chronos "could streamline production forecasting systems … by obviating the need for training separate models for each task" (Sec. 5.5.1).

### What makes pooling hard

> [!warning] Scale heterogeneity ^warn-scale
> Amazon's item velocities follow an approximate **power law** (DeepAR Fig. 1). Consequences: (a) no grouping into velocity bands removes the skew (each band is again skewed); (b) group-based regularisation fails; (c) input standardisation and batch normalisation are "less effective"; (d) uniform sampling of training windows under-fits the rare high-volume series that matter most. Remedies: per-series scaling $\nu_i$ of inputs and likelihood parameters, scale-proportional sampling (DeepAR Sec. 3.3), and mean scaling before tokenisation (Chronos Sec. 3.1). The ablation `rnn-negbin` (no scaling, uniform sampling) loses most of DeepAR's gain on the power-law datasets: average relative risk 1.17 vs 0.77 on `ec-sub`.

- **Heterogeneous dynamics → bias.** A single $\Theta$ must serve intermittent and fast-moving items, trending and stationary ones. Global models cope by being expressive and by conditioning on long contexts and embeddings; with few, idiosyncratic series a well-specified local model can still win — on simulated AR(1)/AR(2) data a correctly specified AR fit beats Chronos, though not for AR(3)/AR(4) (Ansari et al., Sec. 5.7).
- **Likelihood mismatch.** One output family for all series: DeepAR's Gaussian head on count data is its worst ablation (`rnn-gaussian`: 1.19-1.21 on `parts`/`ec-sub`). Chronos sidesteps this with a categorical head that "imposes no restrictions on the structure of the output distribution."
- **Covariates and interpretability.** Global deep models accept covariates only if known over the prediction range (DeepAR Sec. 3.4); Chronos accepts none. Neither yields structural components or causal coefficients as a [[Transfer Function Model]] or BSTS does.
- **Evaluation leakage.** For pretrained models, benchmark datasets may overlap the pretraining corpus; Chronos separates *in-domain* (Benchmark I) from *zero-shot* (Benchmark II) evaluation for this reason and notes that a rigorous split also requires temporal separation (footnote 5).

### Evidence

| Comparison | Source | Result |
|---|---|---|
| Global RNN vs best local/statistical baseline, retail counts | DeepAR Table 1 | Avg. relative $\rho$-risk 0.94 (`parts`), 0.77 (`ec-sub`), 0.85 (`ec`) vs 1.00 |
| Task-specific global vs local, 15 datasets | Chronos Table 7 (WQL rel. to Seasonal Naive, geometric mean) | Best task-specific deep model 0.601; best local model 0.876; "task-specific deep learning models … perform better than local statistical models" |
| Pretrained in-domain | Chronos Table 7 | Chronos-T5 Large 0.564 — best overall |
| Pretrained **zero-shot** vs models trained on the data, 27 datasets | Chronos Table 9 | Chronos-T5 Large 0.645; best task-specific 0.639; best local 0.728; Naive 1.152 |
| Zero-shot + 1,000 fine-tuning steps | Chronos Fig. 6 | Chronos-T5 Small becomes best overall on Benchmark II |
| Does scale help? | Chronos Sec. 5.6 | Monotone improvement from 20M to 710M parameters |

### The pooling analogy

| | No pooling | Partial pooling | Complete pooling of parameters |
|---|---|---|---|
| Bayesian regression ([[Hierarchical Models]]) | separate $\theta_j$ | $\theta_j\sim\mathcal N(\mu,\tau^2)$, $\tau$ learned | $\theta_j\equiv\theta$ |
| Forecasting | local ARIMA/ETS/BSTS per series | global model **+ item embeddings / static features**; or hierarchical-prior state-space models | global model with no series identifiers; pretrained models |

A global network with a learned embedding per item (DeepAR on small datasets uses item identity as the categorical feature) behaves like partial pooling: shared dynamics plus a low-dimensional series-specific offset, regularised by early stopping rather than by a hyperprior. The Bayesian alternative DeepAR cites — sharing information "via hierarchical priors" (Chapados 2014) — is the [[Hierarchical Models|multilevel]] route; it retains interpretability and honest parameter uncertainty but scales poorly to $10^5$-$10^6$ series. [[Empirical Bayes Interpretation of Shrinkage]] gives the variance-reduction logic common to both.

A distinct third way to share information is *after* forecasting: [[Hierarchical Forecast Reconciliation (MinT)]] combines independently produced local forecasts through aggregation constraints.

> [!note] Further reading (not ingested)
> The formal statement that a global model class can represent anything a collection of local models can, together with generalisation-bound arguments for why global models need not assume series are "related", is in Montero-Manso & Hyndman (2021), "Principles and algorithms for forecasting groups of time series: Locality and globality," *International Journal of Forecasting* 37(4). It is referenced here only as a pointer; claims in this note are limited to what the DeepAR and Chronos papers report.

## Examples

**Choosing a regime for a geo-level marketing panel.** Suppose weekly sales for 210 DMAs over 3 years ($T=156$).

- *Local* (BSTS or ARIMA per DMA): 210 fits, each seeing ≈3 seasonal cycles — yearly seasonality is weakly identified per geo; small DMAs are noisy. Advantage: media covariates with lagged effects and interpretable components.
- *Global* (DeepAR with DMA embedding + region as static category): ≈33K observations identify a shared seasonal shape; small DMAs borrow strength; new DMAs (cold start) are feasible. Requires planned media/price as known-future covariates.
- *Pretrained* (Chronos zero-shot): no training; a strong baseline within minutes. No covariates, so promotions are invisible; check clipping at $15\times$ mean for spiky geos.
- *Decision rule*: backtest all three with rolling origins ([[Forecast Evaluation and Backtesting]]); reconcile the winner to the national forecast with MinT; if the purpose is a *counterfactual* for a geo test, prefer the model whose pre-period interval coverage is closest to nominal.

```python
# same evaluation harness, three regimes
models = {
  "local_ets":  lambda y: AutoETS(season_length=52).fit(y),            # one per series
  "global_dar": lambda Y: DeepAREstimator(freq="W", prediction_length=13).train(Y),  # one for all
  "pretrained": lambda _: ChronosPipeline.from_pretrained("amazon/chronos-t5-small"), # none
}
```

## Connections

- [[DeepAR and Global Autoregressive Neural Forecasters]] — the reference global model; scale handling and ablations.
- [[Time-Series Foundation Models (Chronos)]] — the pretrained limit; in-domain vs zero-shot evidence.
- [[Hierarchical Models]] — no/partial/complete pooling of parameters; the Bayesian analogue.
- [[Empirical Bayes Interpretation of Shrinkage]] — why borrowing strength reduces risk.
- [[Hierarchical Forecast Reconciliation (MinT)]] — information sharing through aggregation constraints instead of shared parameters.
- [[Overfitting and Information Criteria]] — the variance side of the trade-off: flexible models need more data, which pooling supplies.
- [[Probabilistic Forecasting - Overview]] — taxonomy of local / task-specific / pretrained.

## See Also

- [[Single Marketing Time Series]], [[Transfer Function Model]], [[Multivariate Persistence and Cointegration]] — the local (and small-system multivariate) classical toolkit.
- [[Bayesian Structural Time-Series Model]] and [[Local Linear Trend and Seasonality]] — local Bayesian structural models.
- [[Transformers and LLM Foundations - Overview]] — pretraining/zero-shot/fine-tuning vocabulary borrowed from LLMs.
- [[Bayesian Media Mix Modeling - Overview]] — geo-level MMMs face the same pooling choice across geos.
