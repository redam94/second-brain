---
title: Compute-Optimal Training (Chinchilla)
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/scaling-laws
  - topic/resource-allocation
  - type/method
  - doc/paper
source: "[[raw/Hoffmann 2022 - Training Compute-Optimal Large Language Models.pdf]]"
source_location: "Sec. 1 (Eq. 1), pp. 1-3; Sec. 2; Sec. 3.1-3.4 (Eqs. 2-4, Tables 2-3, Figs. 2-4), pp. 4-8; Sec. 4 (Tables 4, 6), pp. 9-12; Sec. 5; Appendices D.2-D.4, E, F"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Neural Scaling Laws]]"
  - "[[Autoregressive Language Modeling and Pretraining]]"
used_by:
  - "[[Transformers and LLM Foundations - Overview]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
aliases:
  - Chinchilla Scaling Laws
  - Chinchilla
  - Compute-Optimal Large Language Models
  - IsoFLOP Analysis
  - Hoffmann Scaling Laws
---

# Compute-Optimal Training (Chinchilla)

> [!summary]
> Hoffmann et al. (2022) ask: given a fixed FLOP budget $C$, how should one split it between model size $N$ and training tokens $D$? Training over 400 models (70M to over 16B parameters, 5B to 500B tokens) and analysing them three different ways, they find $N_{\text{opt}} \propto C^{a}$ and $D_{\text{opt}} \propto C^{b}$ with $a \approx b \approx 0.5$: **parameters and data should be scaled in equal proportion**, in contrast to the $a = 0.73$, $b = 0.27$ of [[Neural Scaling Laws|Kaplan et al.]] The 2020-2022 generation of LLMs, all trained on about 300B tokens, was therefore "significantly undertrained". The test: **Chinchilla** (70B parameters, 1.4T tokens) uses the same compute as Gopher (280B, 300B tokens) and "uniformly and significantly outperforms" it, reaching 67.6% on MMLU compared with 60.0%, while being 4x cheaper at inference.

## Overview

The problem is stated as a constrained optimization (Eq. 1):

$$
N_{\text{opt}}(C),\, D_{\text{opt}}(C) = \operatorname*{argmin}_{N, D \ \text{s.t.}\ \mathrm{FLOPs}(N,D) = C} L(N, D),
$$

where $L$ is the final pretraining loss and $\mathrm{FLOPs}(N, D) \approx 6ND$. The practical motivation is that "it is typically only feasible to train these large models once", so hyperparameters must be set by extrapolation from cheaper runs.

**Why Kaplan et al. got a different answer** (Sec. 2):

1. They used "a fixed number of training tokens and learning rate schedule for all models". With a cosine schedule set for 130B tokens, the loss measured at an intermediate $D' \ll 130$B overestimates what a schedule *matched to* $D'$ would achieve. That understates the value of training smaller models on less data and pushes the allocation towards large $N$. Hoffmann et al. find that setting the cosine cycle length to approximately match the training horizon is best; overshooting by more than 25% noticeably degrades the loss (Appendix B).
2. Most of Kaplan's runs were below 100M parameters, whereas most of Hoffmann's are above 500M, and there is "slight curvature in the FLOP-loss frontier" (Appendix E), so extrapolating from small models misleads.

Bookkeeping also differs: Hoffmann et al. count all parameters and all FLOPs including embeddings (Appendix F), whereas Kaplan et al. exclude embeddings.

## Main Content

> [!algorithm] Approach 1: minimum over training curves ^alg-approach-1
> (Sec. 3.1.) For each model size (70M to 10B), train four runs whose cosine schedules decay 10x over horizons spanning a 16x range. Smooth and interpolate each loss curve as a function of FLOPs. At each of 1,500 log-spaced FLOP values, record which run attains the lowest loss, giving the envelope $(C, N, D)$. Fit power laws to the envelope: $a = 0.50$, $b = 0.50$.

> [!algorithm] Approach 2: IsoFLOP profiles ^alg-approach-2
> (Sec. 3.2.) Fix 9 budgets from $6 \times 10^{18}$ to $3 \times 10^{21}$ FLOPs. At each, train models of varying size (up to 16B) with $D = C/(6N)$ and the cosine schedule matched to $D$. Plot final loss against $N$: each budget shows "a clear valley in loss". Fit a parabola in $\log N$ to locate the minimum, then fit power laws through the minima: $a = 0.49$, $b = 0.51$.

> [!algorithm] Approach 3: parametric loss fit ^alg-approach-3
> (Sec. 3.3, Appendix D.2.) Model all final losses as
>
> $$
> \hat L(N, D) \triangleq E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}},
> $$
>
> where $E$ is the entropy of natural text, $A/N^\alpha$ the gap between an ideal $N$-parameter Transformer and the ideal generative process, and $B/D^\beta$ the cost of finite optimization on finite data (see the risk decomposition in [[Autoregressive Language Modeling and Pretraining]]). Estimate by minimizing a Huber loss ($\delta = 10^{-3}$) between predicted and observed **log** loss with L-BFGS from a grid of initializations, using the log-sum-exp form for stability:
>
> $$
> \min_{a, b, e, \alpha, \beta} \sum_{i} \mathrm{Huber}_\delta\!\Big( \mathrm{LSE}\big(a - \alpha \log N_i,\; b - \beta \log D_i,\; e\big) - \log L_i \Big),
> \qquad A, B, E = e^{a}, e^{b}, e^{e}.
> $$
>
> Result (Eq. 10): $E = 1.69$, $A = 406.4$, $B = 410.7$, $\alpha = 0.34$, $\beta = 0.28$. The Huber loss matters: larger $\delta$ "pushes the model to overfit the small compute regime and poorly predict held-out data from larger runs".

> [!theorem] Closed-form efficient frontier ^thm-frontier
> Minimizing $\hat L$ subject to $6ND = C$ (Eq. 4):
>
> $$
> N_{\text{opt}}(C) = G \left(\frac{C}{6}\right)^{a}, \qquad
> D_{\text{opt}}(C) = G^{-1} \left(\frac{C}{6}\right)^{b}, \qquad
> G = \left(\frac{\alpha A}{\beta B}\right)^{\frac{1}{\alpha + \beta}}, \quad
> a = \frac{\beta}{\alpha + \beta}, \quad b = \frac{\alpha}{\alpha + \beta}.
> $$
>
> *Derivation.* Substitute $D = C/(6N)$ and set $\partial \hat L/\partial N = 0$: $\alpha A N^{-\alpha - 1} = \beta B (6/C)^{\beta} N^{\beta - 1}$, so $N^{\alpha+\beta} = (\alpha A/\beta B)(C/6)^{\beta}$. Equivalently, the first-order condition is
>
> $$
> \frac{\alpha A}{N^{\alpha}} = \frac{\beta B}{D^{\beta}},
> $$
>
> i.e. the elasticity-weighted reducible losses from "too few parameters" and "too little data" are balanced. With the fitted values, $a = 0.46$ and $b = 0.54$.

| Approach | $a$ ($N_{\text{opt}} \propto C^a$) | $b$ ($D_{\text{opt}} \propto C^b$) |
|---|---|---|
| 1. Minimum over training curves | 0.50 (0.488, 0.502) | 0.50 (0.501, 0.512) |
| 2. IsoFLOP profiles | 0.49 (0.462, 0.534) | 0.51 (0.483, 0.529) |
| 3. Parametric modelling of the loss | 0.46 (0.454, 0.455) | 0.54 (0.542, 0.543) |
| Kaplan et al. (2020) | 0.73 | 0.27 |

(Table 2; parentheses are 10th-90th percentiles from bootstrapping 80% of the runs 100 times.) For a 10x larger budget, Kaplan prescribes 5.5x more parameters and 1.8x more tokens; Hoffmann prescribes about 3.2x of each.

### Implied model and data sizes

| Parameters | FLOPs | Tokens |
|---|---|---|
| 400M | $1.92 \times 10^{19}$ | 8.0B |
| 1B | $1.21 \times 10^{20}$ | 20.2B |
| 10B | $1.23 \times 10^{22}$ | 205.1B |
| 67B | $5.76 \times 10^{23}$ | 1.5T |
| 175B | $3.85 \times 10^{24}$ | 3.7T |
| 280B | $9.90 \times 10^{24}$ | 5.9T |
| 1T | $1.27 \times 10^{26}$ | 21.2T |

(Table 3, Approach 1, selected rows.) The ratio is close to **20 tokens per parameter** throughout, a rule of thumb widely quoted from this table. Approach 3 implies even more data per parameter at large scale (Table A3: 4.1T tokens for 67B). GPT-3 (175B, 300B tokens) and Gopher (280B, 300B tokens) sit far off this frontier, and "unless one has a compute budget of $10^{26}$ FLOPs ... a 1 trillion parameter model is unlikely to be the optimal model to train." A direct head-to-head at $10^{21}$ FLOPs confirms the prediction: Kaplan's rule gives a 4.68B model, Approach 1 gives 2.86B, and the smaller model trained longer ends with lower loss (Appendix D.4, Fig. A4).

### The Chinchilla test

For Gopher's budget of $5.76 \times 10^{23}$ FLOPs the three approaches put the optimum between 40B and 70B parameters. Chinchilla is trained at the upper end: 70B parameters, 1.4T tokens, 80 layers, 64 heads of key/value size 128, $d_{\text{model}} = 8192$, feed-forward size $4 d_{\text{model}}$, AdamW, batch size 1.5M doubled to 3M tokens midway (Table 4). Gopher has 280B parameters, the same 80 layers and $d_{\text{model}} = 16{,}384$.

| Benchmark | Gopher 280B | Chinchilla 70B |
|---|---|---|
| MMLU, 5-shot average over 57 tasks | 60.0% | 67.6% |
| BIG-bench, average over 62 tasks | 54.4% | 65.1% |
| LAMBADA accuracy | 74.5% | 77.4% |
| WikiText-103 perplexity | 7.75 | 7.16 |

(Table 6, Secs. 4.2.1-4.2.4.) GPT-3 scores 43.9% on MMLU 5-shot, and Chinchilla exceeds a panel of forecasters' June 2023 prediction of 63.4%. (The abstract rounds the MMLU result to 67.5%.) The authors caution that, since Chinchilla saw 4x more data, train/test leakage could inflate language-modelling comparisons, and they weight MMLU and BIG-bench more heavily. Because inference and fine-tuning cost scale with $N$, the 4x smaller model is also cheaper for all downstream use.

### Stated limitations

(Sec. 5.) Only two comparable runs exist at large scale (Gopher and Chinchilla), with no intermediate tests. The power-law frontier is an assumption, and observed concavity in $\log N_{\text{opt}}$ at high budgets means "we may still be overestimating the optimal size of large models". All runs use less than one epoch, so the multi-epoch regime is untested. The projected data requirements (trillions of tokens) shift the bottleneck to collecting high-quality datasets.

## Examples

**Evaluating the fitted law with the published constants.**

```python
E, A, B, alpha, beta = 1.69, 406.4, 410.7, 0.34, 0.28
L = lambda N, D: E + A / N**alpha + B / D**beta

L(280e9, 300e9)    # Gopher:     1.69 + 0.052 + 0.251 = 1.993
L(70e9, 1.4e12)    # Chinchilla: 1.69 + 0.083 + 0.163 = 1.937

a, b = beta / (alpha + beta), alpha / (alpha + beta)          # 0.452, 0.548
G = (alpha * A / (beta * B)) ** (1 / (alpha + beta))          # 1.345
C = 5.76e23
N_opt = G * (C / 6) ** a                                      # ~3.2e10 parameters
D_opt = (C / 6) / N_opt                                       # ~3.0e12 tokens
```

The decomposition shows the mechanism. Gopher's loss is dominated by the data term (0.251 compared with 0.052 for the parameter term), so moving budget from $N$ to $D$ pays. Chinchilla's two terms are closer to balance. With the *rounded* published constants the frontier gives about 32B parameters at Gopher's budget; the paper reports 40B from its unrounded fit (Fig. 4). The difference is a reminder that $N_{\text{opt}}$ is obtained by raising a number of order $10^{23}$ to a fitted power, so the third decimal of the exponent moves the answer materially.

**The same problem in marketing.** Replace $N$ and $D$ with spend on two channels, $-\hat L$ with response, and $6ND = C$ with a budget constraint: this is the constrained allocation of [[ROAS, mROAS, and Optimal Media Mix]], solved by the same Lagrange condition of equalized marginal returns per unit of cost, with power-law diminishing returns playing the role of [[Shape (Saturation) Effects|saturation curves]]. Two lessons transfer. First, the optimum is sensitive to curvature parameters that are estimated with error, so report a *distribution* over allocations (Hoffmann's bootstrap intervals; posterior draws in an MMM). Second, how the response curve is measured can bias the allocation: Kaplan's mismatched learning-rate schedules systematically understated the return to data, just as mis-specified carryover understates the return to a channel.

## Connections

- [[Neural Scaling Laws]]: the predecessor result; same power-law premise, different allocation exponents, and the reasons for the discrepancy.
- [[Autoregressive Language Modeling and Pretraining]]: the risk decomposition behind $E + A/N^\alpha + B/D^\beta$ and the $C \approx 6ND$ accounting.
- [[In-Context Learning and Few-Shot Prompting]]: GPT-3, the model whose 300B-token recipe this paper shows to be undertrained; Chinchilla's benchmarks are evaluated few-shot.
- [[Power Analysis and Sample Size]]: choosing $N$ and $D$ before the single affordable run is a design problem; IsoFLOP profiles are the analogue of a power curve traced by pilot simulation.
- [[Bayesian Experimental Design - Overview]]: allocating a fixed budget to maximize expected utility under a fitted surrogate model of outcomes.
- [[ROAS, mROAS, and Optimal Media Mix]]: constrained budget optimization with diminishing returns and uncertain optima.
- [[Overfitting and Information Criteria]]: robust (Huber) fitting and held-out validation of the extrapolating model itself.

## See Also

- [[Transformers and LLM Foundations - Overview]]
- [[Transformer Architecture and Positional Encoding]]
- [[Geo-Experiment Design and Power Analysis]]
- [[Shape (Saturation) Effects]]
- [[Simultaneous Inference via Multiplier Bootstrap]]: bootstrap-based uncertainty, used here for the exponents $a$ and $b$.
