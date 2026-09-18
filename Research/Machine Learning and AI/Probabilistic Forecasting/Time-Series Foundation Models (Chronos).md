---
title: Time-Series Foundation Models (Chronos)
tags:
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/foundation-models
  - topic/transformers
  - topic/machine-learning
  - type/method
  - doc/paper
source: "[[raw/Ansari 2024 - Chronos Learning the Language of Time Series.pdf]]"
source_location: "Secs. 1-3 (pp. 1-7), Sec. 4 (pp. 7-8), Sec. 5 (pp. 8-19), Sec. 6 (pp. 19-21), App. A (p. 29), App. D (pp. 34-35), Tables 7-10 (pp. 36-37)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[DeepAR and Global Autoregressive Neural Forecasters]]"
  - "[[Transformers and LLM Foundations - Overview]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
used_by:
  - "[[Local vs Global Forecasting Models]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Chronos
  - Time-Series Foundation Models
  - Pretrained Time Series Models
  - Zero-Shot Forecasting
  - TSMixup
  - KernelSynth
  - Ansari et al. 2024
---

# Time-Series Foundation Models (Chronos)

> [!summary]
> **Chronos** (Ansari et al., Amazon, TMLR 2024) asks: what if forecasting is just language modelling over a different vocabulary? Real values are **mean-scaled** and **quantised** into $B=4094$ uniform bins on $[-15,15]$, giving a token sequence; an off-the-shelf **T5** encoder-decoder (20M-710M parameters; also GPT-2) is trained with ordinary **categorical cross-entropy** to predict the next token. Forecasts are obtained by autoregressive sampling, dequantising, and unscaling. The model uses *no* time features, *no* covariates, *no* time-series-specific architecture. Trained on 28 public datasets (~890K series, ~84B observations) augmented by **TSMixup** (convex mixtures of real series) and **KernelSynth** (Gaussian-process samples from randomly composed kernels), it beats local statistical and task-specific deep models in-domain and is on par with the best trained deep models **zero-shot** on 27 unseen datasets.

## Overview

Chronos sits at the end of the local → global → pretrained progression ([[Local vs Global Forecasting Models]]). [[DeepAR and Global Autoregressive Neural Forecasters|DeepAR]] shares parameters across the series of *one* dataset; Chronos shares them across *all* datasets and is then applied, frozen, to data it has never seen — an "inference-only alternative to the conventional approach involving training and tuning a model on individual tasks" (Sec. 7). The authors' design philosophy is minimalism: since transformers ([[Transformers and LLM Foundations - Overview]]) excel on token sequences, change the *data representation*, not the model.

The key conceptual point (Sec. 2-3): a language model predicts a categorical distribution over a finite vocabulary; a time series is real-valued and unbounded. Tokenisation bridges this gap, and the consequence is **regression via classification** — the predictive distribution is a free-form histogram over bins, able to represent skewed or multimodal futures without choosing a likelihood family.

## Main Content

> [!definition] Tokenisation: scaling then quantisation (Sec. 3.1) ^def-chronos-tokenisation
> Given context $x_{1:C}$ and horizon $x_{C+1:C+H}$:
>
> **Mean scaling.** $\tilde x_i=x_i/s$ with $s=\frac1C\sum_{i=1}^{C}|x_i|$ (the affine map $(x_i-m)/s$ with $m=0$). It preserves zeros, which are "often semantically meaningful, such as zero sales."
>
> **Quantisation.** Choose bin centres $c_1<\dots<c_B$ and edges $c_i<b_i<c_{i+1}$; then
>
> $$
> q(x)=\begin{cases}1 & -\infty\le x<b_1\\ 2 & b_1\le x<b_2\\ \ \vdots\\ B & b_{B-1}\le x<\infty\end{cases}
> \qquad\text{and}\qquad d(j)=c_j .
> $$
>
> Chronos uses **uniform** binning (centres equally spaced on $[c_1,c_B]=[-15,15]$, $b_i=(c_i+c_{i+1})/2$) rather than quantile binning, because downstream data distributions differ from training. The vocabulary $\mathcal V_{\text{ts}}$ has 4096 entries: 4094 bins plus `PAD` (padding *and missing values*) and `EOS`.

> [!definition] Objective (Sec. 3.2) ^def-chronos-objective
> With $z_{1:C+H}$ the token sequence, the model outputs a categorical $p_\theta(z_{C+h+1}\mid z_{1:C+h})$ over $\mathcal V_{\text{ts}}$ and minimises
>
> $$
> \ell(\theta)=-\sum_{h=1}^{H+1}\sum_{i=1}^{|\mathcal V_{\text{ts}}|}\mathbf 1\{z_{C+h+1}=i\}\,\log p_\theta(z_{C+h+1}=i\mid z_{1:C+h}).
> $$
>
> This loss is **not distance-aware**: it does not know bin $i$ is closer to $i+1$ than to $i+2$; the model must learn bin topology from data. In scoring-rule terms it is the [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)#^def-log-score|log score]] on the discretised outcome.

> [!algorithm] Zero-shot forecasting (Sec. 3.3) ^alg-chronos-forecast
> 1. Take the last $C\le 512$ observations; compute $s$; scale and quantise.
> 2. Autoregressively sample $H$ tokens from $p_\theta$; repeat for $K$ sample paths (20 in the paper's evaluation).
> 3. Dequantise $d(\cdot)$ and multiply by $s$.
> 4. Summarise: median for a point forecast; empirical quantiles for intervals.

> [!algorithm] TSMixup (Sec. 4.1, Alg. 1) ^alg-tsmixup
> Draw $k\sim\mathcal U\{1,K\}$ ($K=3$) and length $l\sim\mathcal U\{128,2048\}$; sample $k$ series of length $l$ from random training datasets; mean-scale each; draw weights $[\lambda_1,\dots,\lambda_k]\sim\operatorname{Dir}(\alpha=1.5)$; return
>
> $$
> \tilde x^{\text{TSMixup}}_{1:l}=\sum_{i=1}^{k}\lambda_i\,\tilde x^{(i)}_{1:l}.
> $$
>
> Original series appear with probability $1/3$ ($k=1$).

> [!algorithm] KernelSynth (Sec. 4.2, Alg. 2) ^alg-kernelsynth
> From a **kernel bank** $\mathcal K$ (constant, white noise, linear for trend, RBF for smooth local variation, rational quadratic, periodic kernels at typical seasonal periods) draw $j\sim\mathcal U\{1,5\}$ kernels with replacement; combine them left to right with random binary operators in $\{+,\times\}$ into $\tilde\kappa$; sample $x_{1:1024}\sim\mathcal{GP}(0,\tilde\kappa)$. This inverts the Automatic Statistician: instead of searching kernel compositions to *explain* a series, random compositions *generate* series.

**Training setup (Sec. 5.2).** T5 Mini (20M), Small (46M), Base (200M), Large (710M) and GPT-2 (90M); 10M TSMixup augmentations plus 1M KernelSynth series sampled 9:1; context 512, prediction length 64; 200K steps of AdamW, learning rate $10^{-3}$ linearly annealed, batch 256; 8×A100. Training cost ranges from 7.7 h (\$252, Mini) to 63 h (\$2,066, Large) (Table 6).

### Results (Sec. 5.5; Tables 7-10)

Metrics are **WQL** on quantiles $0.1,\dots,0.9$ (probabilistic) and **MASE** (point), each divided by Seasonal Naive's score and aggregated across datasets by **geometric mean** ([[Forecast Evaluation and Backtesting]]). Lower is better; Seasonal Naive = 1.000.

| Aggregate relative score | T5-Large | T5-Base | T5-Small | T5-Mini | GPT-2 |
|---|---|---|---|---|---|
| Benchmark I (15 in-domain datasets) — WQL | 0.564 | 0.580 | 0.603 | 0.598 | 0.623 |
| Benchmark I — MASE | 0.695 | 0.706 | 0.727 | 0.732 | 0.741 |
| Benchmark II (27 zero-shot datasets) — WQL | 0.645 | 0.662 | 0.667 | 0.678 | 0.687 |
| Benchmark II — MASE | 0.823 | 0.832 | 0.841 | 0.850 | 0.852 |

- **In-domain**, the larger Chronos models beat local models (AutoETS, AutoARIMA, AutoTheta), task-specific deep models (DeepAR, TFT, PatchTST, N-BEATS, N-HiTS, DLinear, WaveNet) and other pretrained models (Lag-Llama, Moirai); even Chronos-Mini (20M) beats Moirai-Large (311M).
- **Zero-shot**, Chronos "significantly outperform[s] standalone local statistical models," takes 2nd-4th place on WQL and 2nd on MASE among all methods, and clearly beats LLMTime and ForecastPFN. Naive scores 1.152 (WQL) / 1.188 (MASE) on this benchmark.
- **Fine-tuning** Chronos-T5-Small for 1,000 steps per dataset moves it to first place on Benchmark II.

### Ablations (Sec. 5.6)

- **Size**: loss and downstream scores improve monotonically from 20M to 710M.
- **LLM initialisation**: starting from text-pretrained T5 weights gives *no benefit* over random initialisation (slightly higher final loss) — the transferable asset is the architecture, not the language knowledge.
- **TSMixup** leaves in-domain performance unchanged but improves zero-shot; **KernelSynth** helps both, best at ≈10% synthetic data, degrading beyond. A model trained on synthetic data *only* is still better than ForecastPFN and several baselines.
- **Context** helps up to 1024; **vocabulary** size trades discretisation error against sparsely populated bins (MASE improves with more bins; WQL is non-monotone).

> [!warning] Limitations (Sec. 5.7, 6.1) ^chronos-limitations
> - **Bounded range**: representable values lie in $[-15s,15s]$. Sparse spiky series (small $s$) overflow; strong or **exponential trends** are under-predicted (suggested fix: log-transform first). Short contexts lead to underestimated trend.
> - **Precision**: token spacing is $30s/(B-1)$; a large-mean, small-variance signal collapses into a few tokens (suggested fix: standardise instead of mean-scale).
> - **Univariate, no covariates**: prices, promotions, media or holidays cannot be injected. The authors suggest task-specific adaptors or stacking Chronos with a covariate model such as LightGBM.
> - **Inference cost**: slower than task-specific deep models, comparable to some local statistical models.
> - **Leakage**: with public benchmark corpora, a truly clean zero-shot split requires test data *after* the pretraining data ends (footnote 5).

## Examples

**Synthetic diagnostics (Sec. 5.7, Figs. 12-14).** On i.i.d. $\mathcal N(0,1)$ and $\mathcal N(100,10)$ noise the 80% interval matches the true interval. Linear trend, single and triple seasonality, and additive or multiplicative trend×season composites are forecast accurately; exponential trend is not. On stationary AR($p$) data a correctly specified AR model beats Chronos for $p=1,2$, but for AR(3)-AR(4) Chronos-Base beats AutoARIMA and matches the correctly-ordered fitted AR model — it has learned generic autoregressive structure.

**Tokenisation arithmetic.** Weekly sales with mean absolute value $s=200$: bins are spaced $30\times200/4093\approx1.47$ units apart and the ceiling is $15\times200=3000$. A Black-Friday week of 3,500 units is unrepresentable and clips to 3,000 — a concrete reason to backtest zero-shot models around promotional peaks.

```python
import torch
from chronos import ChronosPipeline
pipe = ChronosPipeline.from_pretrained("amazon/chronos-t5-small")
samples = pipe.predict(torch.tensor(y_hist[-512:]), prediction_length=13, num_samples=20)
q10, q50, q90 = np.quantile(samples[0].numpy(), [0.1, 0.5, 0.9], axis=0)
```

## Connections

- [[Probabilistic Forecasting - Overview]] — the "pretrained" tier of the forecaster taxonomy.
- [[DeepAR and Global Autoregressive Neural Forecasters]] — source of mean scaling and autoregressive sample paths; Chronos swaps the parametric likelihood for a categorical one.
- [[Transformers and LLM Foundations - Overview]] — T5/GPT-2 architectures, next-token cross-entropy, and sampling strategies carried over verbatim.
- [[Local vs Global Forecasting Models]] — pretrained models as the limiting case of cross-series pooling.
- [[Forecast Evaluation and Backtesting]] — WQL, MASE, geometric-mean aggregation, leakage caveats.
- [[Gaussian Process Regression]] and [[Hilbert Space Gaussian Processes]] — KernelSynth draws from GP priors; kernel sums and products are the same algebra used in [[Model Building - Time-Series Decomposition for Birthdays]].
- [[Conformal Prediction - Overview]] — "Chronos is especially attractive in the context of conformal prediction since it requires no training set, so all available data can be used for calibration" (Sec. 6.1).

## See Also

- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — cross-entropy as a (non-distance-aware) log score vs CRPS as a distance-aware alternative.
- [[Counterfactual Impact Estimation]] — a zero-shot forecaster is a cheap counterfactual baseline, but without control-series covariates it cannot absorb common shocks the way BSTS with contemporaneous controls does.
- [[Bayesian Structural Time-Series Model]] — the interpretable, covariate-aware local alternative.
