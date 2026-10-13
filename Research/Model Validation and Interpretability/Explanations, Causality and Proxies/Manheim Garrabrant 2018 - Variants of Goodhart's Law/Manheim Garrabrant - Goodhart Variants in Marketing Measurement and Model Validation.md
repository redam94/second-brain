---
title: "Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation"
tags:
  - source/ingested
  - topic/model-validation
  - topic/goodhart
  - topic/marketing-measurement
  - type/application
  - type/example
  - doc/paper
source: "[[raw/Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law.pdf]]"
source_location: "Vault synthesis built on arXiv:1803.04585v4, eq. (1), (2), (4), (7) and §1-§4 and the Conclusion (p.9-10); simulations are vault additions, not from the paper"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law"
doc_type: paper
depends_on:
  - "[[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]"
  - "[[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]]"
  - "[[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]]"
  - "[[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]]"
  - "[[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]"
used_by: []
aliases:
  - Goodhart in Model Validation
  - Goodhart Effects in Media Measurement
  - Goodhart Simulations
---

# Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation

> [!summary]
> This note applies the Manheim-Garrabrant taxonomy to marketing analytics and model validation. It has three parts: (1) a **diagnostic table** mapping common practices to the Goodhart variant they trigger and the matching defence; (2) a **checklist** for validation reviews; (3) **reproducible simulations** of the paper's toy models (regressional eq. 1, extremal eq. 2, shared-cause intervention, Campbell eq. 7) with their numerical output (in Examples). The main point: any rule that *selects* or *rewards* models, channels or teams on a proxy needs either an independent check of the goal (hold-out, experiment, simulation with known truth) or shrinkage towards what is known. The simulations and mappings are vault additions; the paper itself has no empirical content.
^summary

## Overview

The paper's conclusion (p.9-10) names three ML failure sources: limited data with "overly parsimonious models" (extremal), "myopic consideration of goals" and "ignoring causality". Marketing measurement has all three. Weekly series are short (often 52-156 rows), so there is limited data. Response curves are low-parameter by design. Budget decisions intervene on the system the model describes. Channel teams also have incentives tied to the metrics.

## Main Content

### Diagnostic table

| Practice | Proxy $M$ | Goal $G$ | Goodhart variant | Defence |
|---|---|---|---|---|
| Choosing among model fits by total SHAP mass on media, or "plausible ROIs", instead of held-out accuracy | importance / plausibility | correct incremental effects | Regressional (selection on noise); adversarial-misalignment if analysts anticipate the reviewers | Pre-register the selection rule; nested hold-out; report the spread over the Rashomon set ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]) |
| Best-of-$K$ hyperparameter search scored on the same short hold-out that is reported | hold-out MAPE | true forecast skill | Regressional | Report on untouched data; rolling-origin evaluation ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]) |
| Budget optimizer recommends spend beyond the observed range | fitted saturation curve | true response | Extremal (model insufficiency) | Constrain the optimizer to the support; test the spend region by experiment ([[Shape (Saturation) Effects]]) |
| Applying a model trained before a pricing, consent or platform change | pre-change relationship | post-change response | Extremal (change in regime) | Structural-break checks; recalibration; [[Granger 2003 - Spurious Regression and Cointegration - Overview]] |
| Raising bids on the channel with the largest predictive importance (e.g. branded search) | predictive driver | incremental sales | Causal (intermediary intervention) | Interventional evidence; DAG review ([[Dillon et al - SHAP and Causal Insights - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]) |
| Comparing markets after equalising a shared driver (seasonality, distribution) | spend-sales correlation | channel effect | Causal (shared cause) / ignored shared cause under selection | Model the shared cause explicitly |
| Paying teams on platform-attributed conversions | attributed conversions | incremental revenue | Normal cobra effect (agent manipulates ignored cause $Y$) | Pay on experimentally measured lift ([[Experimental Benchmarks for Observational Ad Measurement]]) |
| Tuning a simulator's settings until the method under test "recovers truth" | recovery score on chosen scenarios | performance in the real world | Regressional + extremal on the simulation design | Fix ADEMP before running ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]); include adversarial scenarios ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) |
| Per-segment tree models of a shared aggregate KPI, compared by importance rankings | segment importance | segment causal contribution | Ignored shared cause (the aggregate KPI) + regressional | Joint model or hierarchical pooling ([[Hierarchical Models]]) |

### Validation-review checklist

> [!algorithm] Goodhart audit for a model-selection or measurement process
> 1. **Name the goal and the proxy.** Write down $G$, for example "true incremental ROI per channel", and every $M$ used to choose or reward, for example fit, plausibility, importance or attributed conversions.
> 2. **Measure the selection pressure.** Count the candidates, specifications and re-runs behind the reported result. More candidates mean more regressional overstatement ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]]).
> 3. **Check reliability.** Estimate $\lambda=\operatorname{Var}(G)/\operatorname{Var}(M)$, for instance from re-fits on bootstrap or rolling windows. Low $\lambda$ means the winner's score should be shrunk ([[Partial Pooling as Multiple Comparisons Correction]]).
> 4. **Check support.** Are the recommended actions inside the data range? If not, flag extremal risk and propose a test.
> 5. **Look for regime boundaries.** Look for known breaks (platform changes, pricing, consent, distribution) inside or after the training window.
> 6. **Draw the DAG.** For every variable the decision will act on, say whether it is a cause, an intermediary or a shared cause of the outcome. Predictive importance never settles this ([[Directed Acyclic Graphs]]).
> 7. **Map the incentives.** Who benefits from each $M$? Can they move an ignored cause $Y$ of $M$?
> 8. **Validate the goal independently.** Use at least one check whose proxy is not the one being optimized: an experiment, a simulation with known truth ([[Simulation-Based Calibration - Overview]]), or a hold-out never used for selection.
> 9. **Record the selection rule before seeing results.** Pre-registration turns regressional selection into a fixed estimator ([[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]).
^alg-goodhart-audit

## Examples

The paper has no empirical content. The examples below are vault simulations of its toy models.

### Simulations

All code runs as is with NumPy. Seed 0, $n=10^6$.

```python
import numpy as np
rng = np.random.default_rng(0); n = 1_000_000

# 1. Regressional Goodhart, eq. (1): M = G + N(0,1), G ~ N(0,1)
G = rng.normal(0, 1, n); M = G + rng.normal(0, 1, n)
for q in [0.5, 0.9, 0.99, 0.999]:
    s = M > np.quantile(M, q)
    print(q, M[s].mean(), G[s].mean(), np.corrcoef(G[s], M[s])[0, 1])

# 2. Campbell's law, eq. (7): M_R = G_R + X, M_A = G_A * X
for mu in [0, 1]:
    X = rng.normal(mu, 1, n); GR = rng.normal(0, 1, n); GA = rng.normal(0, 1, n)
    MR, MA = GR + X, GA * X
    print("full", np.corrcoef(GA, MA)[0, 1])
    for q in [0.5, 0.9, 0.99]:
        s = MR > np.quantile(MR, q)
        print(q, np.corrcoef(GA[s], MA[s])[0, 1], X[s].mean())

# 3. Shared-cause intervention: X -> M, X -> G, then do(X = 3)
X = rng.normal(0, 1, n); M = X + rng.normal(0, 1, n); G = X + rng.normal(0, 1, n)
print("obs corr", np.corrcoef(M, G)[0, 1])
M2 = 3 + rng.normal(0, 1, n); G2 = 3 + rng.normal(0, 1, n)
print("do corr", np.corrcoef(M2, G2)[0, 1], G2.mean())

# 4. Extremal (model insufficiency), eq. (2): G(s) = s - 0.1 s^3, linear proxy fit on [-1, 1]
s = rng.uniform(-1, 1, 5000); Gs = s - 0.1 * s**3 + rng.normal(0, .05, 5000)
b = np.polyfit(s, Gs, 1)
for x in [1, 2, 3, 4]:
    print(x, np.polyval(b, x), x - 0.1 * x**3)
```

> [!example] Simulation 1: Regressional Goodhart (eq. 1, $\tau=\sigma=1$, $\lambda=0.5$)
>
> | Selected top | threshold $c$ | $E[M\mid\text{sel}]$ | $E[G\mid\text{sel}]$ | $E[G]/E[M]$ | corr$(G,M\mid\text{sel})$ |
> |---|---|---|---|---|---|
> | 50% | 0.00 | 1.130 | 0.567 | 0.50 | 0.516 |
> | 10% | 1.81 | 2.484 | 1.241 | 0.50 | 0.382 |
> | 1% | 3.30 | 3.776 | 1.888 | 0.50 | 0.295 |
> | 0.1% | 4.38 | 4.775 | 2.391 | 0.50 | 0.270 |
>
> The full-population correlation is $1/\sqrt2=0.707$. Selection still raises $G$, but the proxy overstates it by a factor of $1/\lambda=2$ at every threshold, and the absolute gap grows. Within the selected set the proxy ranks worse and worse (correlation 0.52 → 0.27). This matches [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart#^thm-gaussian-shrinkage]].
^sim-regressional

> [!example] Simulation 2: Extremal Goodhart (eq. 2, cubic truth, linear proxy)
> Fitted proxy slope 0.94, intercept about 0. Proxy vs truth at $s=1,2,3,4$: (0.94, 0.90), (1.88, 1.20), (2.82, 0.30), (3.76, -2.40). The goal peaks at $s=\sqrt{10/3}\approx1.83$. Every proxy-improving step past that point lowers the goal.
^sim-extremal

> [!example] Simulation 3: Shared-cause intervention (§3, p.5)
> Observational corr$(M,G)=0.498$. After $do(X=3)$: corr $=0.000$ and $E[G]=3.00$. The intervention raised the goal, as the paper allows ("does not imply that the overall outcome is worse"), but the metric no longer carries any information about $G$ for further optimization.
^sim-causal

> [!example] Simulation 4: Campbell's law (eq. 7)
>
> | $\mu=E[X]$ | full corr$(G_A,M_A)$ | top 50% of $M_R$ | top 10% | top 1% |
> |---|---|---|---|---|
> | 0 | 0.000 | 0.565 | 0.850 | 0.935 |
> | 1 | 0.706 | 0.884 | 0.947 | 0.969 |
>
> The paper's "zero over the full set" needs $\mu=0$. The positive conditional correlation holds in both cases ([[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects#^thm-campbell-correlation]]).
^sim-campbell


## Connections

- [[Model Selection and Overfitting]], [[Cross Validation Checking]] — formal tools for the regressional case.
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] — the multiplicity view of best-of-$K$.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — practice-level challenges in MMM that these variants explain.
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] — small samples lower $\lambda$ and worsen regressional overstatement.
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] — experimental evidence of an intermediary-type causal Goodhart in search.

## See Also
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — taxonomy and source map
- [[Kumar et al - Shapley Values in Normative Model Evaluation]] — explanations as a proxy for model validity
- [[Model Risk Management (SR 11-7)]] and [[NIST AI Risk Management Framework]] — governance responses
- [[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]] — attributed vs incremental sales divergence
