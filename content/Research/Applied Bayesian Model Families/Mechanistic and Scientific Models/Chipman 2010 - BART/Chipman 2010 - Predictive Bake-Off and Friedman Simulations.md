---
title: "Chipman 2010 - Predictive Bake-Off and Friedman Simulations"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
  - type/example
  - doc/paper
source: "[[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]"
source_location: "Sec. 5.1-5.2, pp. 280-290; Tables 1-4; Figs. 2-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chipman 2010 - BART"
doc_type: paper
depends_on:
  - "[[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]]"
  - "[[Chipman 2010 - Backfitting MCMC and Posterior Inference]]"
used_by:
  - "[[Chipman 2010 - Extensions, Discussion and Practical Use]]"
aliases:
  - BART bake-off
  - BART Friedman function experiments
---

# Chipman 2010 - Predictive Bake-Off and Friedman Simulations

> [!summary]
> Two evidence blocks. (1) 42 real datasets x 20 random splits: BART with defaults is near the best black-box learner and BART with cross-validated hyperparameters is the best. (2) Friedman's 5-variable test function with up to 1000 pure-noise predictors: BART recovers the signal, gives sensible intervals, selects variables via small $m$, and is robust to hyperparameters; defaults degrade at $p=1000$ while BART-cv does not.

## Overview

The paper's empirical claim is *accuracy without tuning*. All BART numbers use the backfitting sampler of [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] with the priors of [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]].

## Main Content

### 5.1 The 42-dataset bake-off

**Setup.** Datasets are a subset of the 52 in Kim et al. (2007): 10 were excluded (random forests could not use more than 32 categorical predictors, or the original used a single split). Each has 3-28 numeric and 0-6 categorical predictors, $n$ from 96 to 6806 (Table 1: Abalone 4177, Ais 202, Alcohol 2462, Amenity 3044, Attend 838, Baseball 263, Baskball 96, Boston 506, Budget 1729, Cane 3775, Cardio 375, College 694, Cps 534, Cpu 209, Deer 654, Diabetes 375, Diamond 308, Edu 1400, Enroll 258, Fame 1318, Fat 252, Fishery 6806, Hatco 100, Insur 2182, Labor 2953, Laheart 200, Medicare 4406, Mpg 392, Mumps 1523, Mussels 201, Ozone 330, Price 159, Rate 144, Rice 171, Scenic 113, Servo 167, Smsa 141, Strike 625, Tecator 215, Tree 100). Responses were log- or square-root-transformed when that made the histogram more bell-shaped (about half the cases used a log; Fishery used a square root). Each dataset: 20 random 5/6 train, 1/6 test splits, giving $42\times20=840$ splits; metric is test RMSE.

> [!definition] Relative RMSE (RRMSE)
> $\text{RRMSE}=\text{RMSE}/\min_{\text{methods}}\text{RMSE}$ on the same split. It equals 1.0 for the best method and is invariant to location/scale of the response, so it can be pooled across datasets.
^def-bart-rrmse

**Competitors and tuning (Table 2).** All tuned by 5-fold CV inside each training set except BART-default.

| Method | Parameter | Values |
|---|---|---|
| BART-cv | $(\nu,q)$ | (3,0.90), (3,0.99), (10,0.75) |
| | $m$ | 50, 200 |
| | $k$ | 1, 2, 3, 5 |
| Lasso | shrinkage | 0.1, ..., 1.0 |
| Gradient boosting (gbm) | trees; shrinkage; max depth | 50, 100, 200; 0.01, 0.05, 0.10, 0.25; 1, 2, 3, 4 |
| Neural net (nnet) | hidden units (set so roughly 50-800 weights, between 3 and 30 units); decay | 0.0001, 0.001, 0.01, 0.1, 1, 2, 3 |
| Random forests | trees; % variables per node | 500; 10, 25, 50, 100 |

BART-cv has $3\cdot4\cdot2=24$ settings, so one BART-cv run costs $24\cdot5+1=121$ BART fits. BART-default $(\nu,q,k,m)=(3,0.90,2,200)$ needs one. Typically 200 burn-in and 1000 posterior iterations were used.

**Result (Table 3, quantiles of RRMSE over 840 splits).**

| Method | 50% | 75% |
|---|---|---|
| Lasso | 1.196 | 1.762 |
| Boosting | 1.068 | 1.189 |
| Neural net | 1.055 | 1.195 |
| Random forest | 1.053 | 1.181 |
| BART-default | 1.055 | 1.164 |
| BART-cv | 1.037 | 1.117 |

Share of splits with RRMSE > 1.5: random forests 16.2%, neural net 9.0%, boosting 13.6%, BART-cv 9.0%, BART-default 11.8%, lasso 29.5%. **Interpretation:** BART-cv wins more often and has the lightest upper tail; BART-default is arguably second best while using no tuning. Medians differ by only a few percent: "best" here means a small but consistent edge.

### 5.2 Friedman's five-dimensional function

> [!example] Friedman test function (eqs. 26-27)
> $x_1,\dots,x_p\sim\text{iid Uniform}(0,1)$,
> $$
> y=10\sin(\pi x_1x_2)+20(x_3-0.5)^2+10x_4+5x_5+\varepsilon,\quad\varepsilon\sim N(0,1).
> $$
> Only $x_1..x_5$ matter; $x_6..x_p$ are pure noise. The function mixes an interaction, a quadratic and two linear terms.
^ex-bart-friedman

**5.2.1 Single data set ($p=10,n=100$, defaults, 5000 draws after 1000 burn-in).** Posterior means track the true $f(x)$; 90% intervals covered 89% (in-sample) and 96% (out-of-sample), 87%/93% averaged over 200 replicates. The $\sigma$ chain wanders around the true 1 ("fit but not overfit"), whereas with $m=1$ it stays well above 1. Partial dependence plots (Fig. 4) show nonzero marginal effects for $x_1..x_5$ and zero for $x_6..x_{10}$. Variable usage with $n=500$ and $m=10,20,50,100,200$ (Fig. 5) exactly isolates $x_1..x_5$ as $m$ shrinks. Robustness (Fig. 6): very small $m$ gives poor RMSE; for $k>1$ settings of $(\nu,q,k)$ give near-identical results; large $m$ costs little. Correlations of out-of-sample fits across settings are above 0.99 (e.g., 0.9948 between (3,0.9,2,100) and (10,0.75,3,100)); two seeds at (3,0.9,2,200) correlate 0.9994, justifying one long chain.

**5.2.2 Higher dimension.** With $n=100$ and $p=20,100,1000$, $m=100$, naive $\hat\sigma$ (needed when $p\ge n$): in-sample fits stay good at every $p$; out-of-sample the estimates shrink toward the mean and intervals widen as $p$ grows. On pure noise ($f\equiv0$), intervals cover or are near 0 for $p=10,100$; at $p=1000$ some in-sample intervals miss 0 (the prior "takes over") while out-of-sample intervals still cover 0 and are wide.

**5.2.3 Out-of-sample comparison (Table 4; 100 datasets of $n=100$, 1000 test points each; 3000 draws after 1000 burn-in).**

| Method | $p=10$ (50%, 75%) | $p=100$ | $p=1000$ |
|---|---|---|---|
| Random forests | (1.25, 1.31) | (1.46, 1.52) | (1.62, 1.68) |
| Neural net | (1.01, 1.32) | (1.71, 2.11) | unavailable (computational) |
| Boosting | (0.99, 1.07) | (1.03, 1.14) | (1.08, 1.33) |
| BART-cv | (0.90, 0.95) | (0.93, 0.98) | (0.99, 1.06) |
| BART-default | (0.89, 0.94) | (1.02, 1.10) | (1.48, 1.66) |

**Interpretation.** At $p=10$ both BART versions are clearly best. Default BART collapses at $p=1000$: CV picked $m=50$ with the aggressive $\sigma$ prior (3, 0.99) about 60% of the time at $p=100$ or $1000$, because the signal is strong and only 5 variables matter; with the naive $\hat\sigma$ anchor the default noise prior is not aggressive enough, and extra trees inhibit the stochastic search. **Lesson:** defaults are for moderate $p$; with hundreds of irrelevant predictors, tune $m$ down and $q$ up.

## Examples

**Generate the Friedman data and a BART-style check (runnable data generator).**
```python
import numpy as np
rng = np.random.default_rng(0)
def friedman(n, p, sigma=1.0):
    X = rng.uniform(size=(n, p))
    f = 10*np.sin(np.pi*X[:,0]*X[:,1]) + 20*(X[:,2]-0.5)**2 + 10*X[:,3] + 5*X[:,4]
    return X, f, f + sigma*rng.normal(size=n)
X, f, y = friedman(100, 10)
print(round(f.std(),2))   # signal SD vs noise SD 1 => high signal-to-noise
```
To reproduce Table 4's metric, fit any BART implementation, then compute $\sqrt{\tfrac1{1000}\sum_i(\hat f(x_i)-f(x_i))^2}$ on fresh uniform $x$.

## Connections

- Bake-off logic (RRMSE across datasets) is a template for comparing flexible baselines; see [[Model Selection and Overfitting]] and [[Overfitting and Information Criteria]].
- Random forest vs BART behaviour: [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]].

## See Also

[[Chipman 2010 - BART - Overview]], [[Chipman 2010 - Drug Discovery Classification and Execution Time]].
