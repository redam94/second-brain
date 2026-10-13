---
title: "Riley 2020 - Shrinkage and Optimism Criteria for Overfitting"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/sample-size
  - topic/shrinkage
  - type/theorem
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, p. 3 (Step 3: overfitting, shrinkage, examples 206 and 1698), p. 4 (Step 4: optimism, example 1079), Fig 3 (p. 10), Fig 5 (p. 12); supplementary S4, S6 referenced but not in PDF"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley et al 2020 - Sample Size for Prediction Models - Overview]]"
  - "[[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
  - "[[Model Selection and Overfitting]]"
used_by:
  - "[[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]"
  - "[[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]"
aliases:
  - Riley shrinkage sample size formula
  - Riley Step 3 shrinkage criterion
  - Riley Step 4 optimism criterion
  - Expected uniform shrinkage factor 0.9
  - Criterion B3
  - Criterion B4
  - Optimism in apparent Nagelkerke R2
---

# Riley 2020 - Shrinkage and Optimism Criteria for Overfitting

> [!summary]
> Steps 3-4 are the **overfitting** criteria and usually bind. **Step 3:** choose $n$ so that the expected uniform shrinkage factor is $S \ge 0.9$ ($\le 10\%$ shrinkage): $n = P / [(S-1)\ln(1 - R^2_{cs}/S)]$ (Fig 3). For $P=20$, $R^2_{cs}=0.1$ this gives **1698**, which is EPP 8.5 at prevalence 0.1 but EPP 25.5 at prevalence 0.3. **Step 4:** choose $n$ so that the apparent Nagelkerke $R^2$ is optimistic by at most $\delta=0.05$. Set $S = R^2_{cs}/(R^2_{cs} + \delta\,\max(R^2_{cs}))$ and reuse the Fig 3 formula (Fig 5). For $R^2_{cs}=0.2$, $\phi=0.05$, $P=20$ this gives **1079**. The authors aim to *avoid needing* shrinkage, because estimated shrinkage is least reliable exactly when it is most needed.
^summary

## Overview

The paper sets this step up around one definition and one paradox. Small samples cause overfitting. Shrinkage (penalisation, regularisation) is the textbook remedy. But the amount of shrinkage is itself estimated from the same small sample. So the paper designs the sample so that little shrinkage is needed to begin with.

## Main Content

### Overfitting and shrinkage (p. 3)

> [!definition] Definition: Overfitting and shrinkage (p. 3)
> **Overfitting**: a developed model's predictions are **more extreme than they ought to be** for individuals in a new dataset from the same target population. For a binary outcome, predicted probabilities are too close to 1 for above-average-risk individuals and too close to 0 for below-average-risk individuals. It occurs notably when $P$ is large relative to $n$ (continuous outcomes) or to the number of events (binary, time-to-event). Consequence: **apparent** performance (in the development data) is optimistic, and **actual** performance in new data is worse.
>
> **Shrinkage** (penalisation, regularisation): methods that reduce the variability of predictions, pulling extreme predictions back toward the overall average. A **uniform shrinkage factor** $S \in (0,1]$ multiplies all predictor effects ($\beta_j \to S\beta_j$, intercept re-estimated). $1-S$ is the proportional shrinkage.
^def-overfit

> [!theorem] The shrinkage paradox (p. 3)
> Shrinkage is not guaranteed to fix overfitting:
> 1. Shrinkage and penalty factors are **estimated from the development data**. In small samples they are imprecise and can mis-size the correction (van Houwelingen 2001, ref 30).
> 2. Estimated required shrinkage is **negatively correlated with apparent performance**. When apparent fit is excellent by chance, required shrinkage is estimated too low.
>
> Verbatim (p. 3): "ironically, in those situations when overfitting is of most concern (and thus shrinkage is most urgently needed), the prediction model developer has insufficient assurance in selecting the proper amount of shrinkage to cancel the impact of overfitting."
>
> **Implication:** target a sample size and candidate-parameter count at which only a **small** amount of shrinkage ($\le 10\%$) is expected.
^shrinkage-paradox

### Step 3: the shrinkage criterion (Fig 3)

> [!theorem] Criterion B3 / T2: sample size for expected shrinkage $S$ (Fig 3, p. 10; Riley et al. 2019 Part II)
> For binary or time-to-event outcomes, the number of participants needed for an expected uniform shrinkage factor $S$ is
> $$n = \frac{P}{(S-1)\,\ln\!\left(1 - \dfrac{R^2_{cs}}{S}\right)}$$
> where $P$ = number of candidate predictor parameters, $R^2_{cs}$ = anticipated (optimism-adjusted) Cox-Snell $R^2$ of the new model ([[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum#^def-r2cs|definition]]), and the recommended target is $S \ge 0.9$.
>
> **Requirements:** prespecify $P$; for binary/survival outcomes the anticipated outcome proportion or rate (to translate $n$ into events and to bound $R^2_{cs}$); a **conservative** anticipated $R^2_{cs}$ (Fig 4). Note $R^2_{cs} < S$ is needed for the log to exist.
>
> **Proof sketch (reconstruction; the PDF states only the formula).** (i) The van Houwelingen-le Cessie heuristic shrinkage is $S = 1 - P/\text{LR}$, where LR is the model's likelihood-ratio $\chi^2$. (ii) The Cox-Snell definition gives $R^2_{cs,\text{app}} = 1 - \exp(-\text{LR}/n)$, so $\text{LR} = -n\ln(1-R^2_{cs,\text{app}})$. (iii) The optimism-adjusted $R^2_{cs}$ is approximately $S \cdot R^2_{cs,\text{app}}$, so $R^2_{cs,\text{app}} = R^2_{cs}/S$. (iv) Substitute: $S = 1 + P/[n\ln(1 - R^2_{cs}/S)]$. Solving for $n$ gives the formula.
^fig3-shrinkage

> [!example] Fig 3 worked example (p. 10)
> $P=20$, $R^2_{cs}=0.1$, $S=0.9$:
> $$n = \frac{20}{(0.9-1)\ln(1 - 0.1/0.9)} = 1698.$$
> - Outcome proportion 0.1: $1698\times0.1 = 169.8$ events, EPP $=169.8/20 = 8.5$.
> - Outcome proportion 0.3: EPP $=25.5$.
>
> The required EPP changes greatly because $R^2_{cs}=0.1$ is a much smaller **fraction** of max($R^2_{cs}$) at prevalence 0.3 (max 0.71) than at 0.1 (max 0.48). The same absolute $R^2_{cs}$ therefore means weaker relative signal at the higher prevalence.
^example-1

**Signal:noise intuition (p. 3).** High anticipated $R^2_{cs}$ (near 1, possible for continuous outcomes) means true patterns are easy to detect, overfitting is less of a concern, and more parameters can be estimated. Low $R^2_{cs}$ (near 0) means patterns are hard to find, overfitting risk is larger, and fewer parameters can be estimated reliably. Required $n$ is very sensitive to $R^2_{cs}$, so choose it conservatively.

> [!example] Continuous outcome (p. 3; supplementary S4)
> For a continuous outcome, $R^2_{cs}$ is the ordinary $R^2 \in [0,1]$. With up to $P=30$ predictor parameters and anticipated $R^2 = 0.7$, **206** participants give expected shrinkage of 10%, about **7 participants per parameter**.
>
> *Caveat recorded on ingest:* plugging these values into the Fig 3 binary formula gives about 199.5, not 206. The continuous-outcome criterion in S4 (Riley et al. 2019 Part I) is a separate expression that is not included in the PDF. Use `pmsampsize, type(c)` rather than the Fig 3 formula for continuous outcomes.
^cont-shrink

### Step 4: the optimism criterion (Fig 5)

> [!definition] Optimism in apparent model fit (p. 4)
> The **apparent** $R^2_{Nagelkerke}$ $(= R^2_{cs}/\max(R^2_{cs}))$ is computed on the development data. The **optimism-adjusted** value is an approximately unbiased estimate of fit in the target population. **Optimism** is apparent minus adjusted. Target a small optimism, e.g. $\delta \le 0.05$.
^definition-1

> [!theorem] Criterion B4 / T3: sample size for optimism $\delta$ (Fig 5, p. 12; continuous C4 uses supplementary S6 instead)
> First find the shrinkage factor corresponding to expected optimism $\delta$ in $R^2_{Nagelkerke}$:
> $$S = \frac{R^2_{cs}}{R^2_{cs} + \delta\,\max(R^2_{cs})}.$$
> Then substitute $S$ into the Fig 3 formula $n = P / [(S-1)\ln(1-R^2_{cs}/S)]$.
>
> **Proof sketch (reconstruction).** Apparent $R^2_{cs} \approx R^2_{cs}/S$, so optimism in the Nagelkerke scale is $(R^2_{cs}/S - R^2_{cs})/\max(R^2_{cs}) = \delta$. Solving for $S$ gives the expression above.
>
> **Worked example:** logistic model, anticipated $R^2_{cs} \ge 0.2$, $\phi = 0.05$ so $\max(R^2_{cs}) = 0.33$, $\delta = 0.05$:
> $$S = \frac{0.2}{0.2 + 0.05\times0.33} = 0.924, \qquad n = \frac{20}{(0.924-1)\ln(1 - 0.2/0.924)} = 1078.9,$$
> so at least **1079** participants for $P=20$.
^fig5-optimism

*Numerical note:* using unrounded $S=0.92379$ gives $n \approx 1075.6$. The paper's 1078.9 comes from rounding $S$ to 0.924. Either way, rounding up to the next integer is the convention.

**Which binds?** Steps 3 and 4 both translate into a required $S$. B4's $S$ is below 0.9 whenever $R^2_{cs} < 9\,\delta\,\max(R^2_{cs})$, i.e. $R^2_{Nagelkerke} < 0.45$ for $\delta=0.05$, and then B3 (with $S=0.9$) binds. That covers most clinical models, where $R^2_{Nagelkerke}$ is typically 0.1-0.2 (Fig 4). B4 binds only for models with high relative fit.

## Examples

> [!example] Verified computation (python)
> ```python
> import math
> def n_shrink(P, R2cs, S=0.9):
>     return P / ((S - 1) * math.log(1 - R2cs / S))
> def S_optimism(R2cs, maxR2, delta=0.05):
>     return R2cs / (R2cs + delta * maxR2)
> print(round(n_shrink(20, 0.1)))                  # 1698
> S = S_optimism(0.2, 0.33); print(round(S, 3))   # 0.924
> print(round(n_shrink(20, 0.2, 0.924), 1))       # 1078.9
> ```
^example-2

### Marketing-analytics reading

> [!example] How many parameters can 104 weeks support? (illustrative, not from the paper)
> Treat a weekly sales regression as a continuous-outcome development problem and, as a rough guide only, use the Fig 3 expression (see the continuous caveat above). For $P=36$ candidate parameters and $S=0.9$:
> | anticipated out-of-sample $R^2$ | required $n$ (weeks) |
> |---|---|
> | 0.3 | about 888 |
> | 0.5 | about 444 |
> | 0.7 | about 239 |
>
> Two years of weekly data (104 rows) fall well short unless the honest, *out-of-sample* $R^2$ is very high. In-sample $R^2$ from a model with trend and seasonality is not the right input; it is the optimistic quantity this criterion guards against. Autocorrelated rows carry less information than independent ones, so the true shortfall is larger. Practical responses mirror the paper's: reduce candidate parameters (fix adstock forms from prior evidence), use informative priors as structured shrinkage ([[Bayesian Estimation and Priors for MMM]]), or pool across markets or segments.
^example-3

## Connections

- Uniform shrinkage $S$ is the frequentist counterpart of the posterior pull-to-the-mean in [[Empirical Bayes Interpretation of Shrinkage]]. Bayesian shrinkage priors ([[Global-Local Shrinkage Priors]], [[Regularized Horseshoe (Finnish Horseshoe)]]) replace one global $S$ with structured, partly data-driven shrinkage. That is still subject to the paradox when the data are weak.
- Optimism (apparent minus adjusted fit) is the quantity that [[Overfitting and Information Criteria]] corrects with an effective-parameter penalty, and that bootstrap or [[Cross Validation Checking]] estimates empirically.
- The paradox (shrinkage least reliable when most needed) parallels the instability of selected subsets in [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also

- [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]] — the key input to both formulas
- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] — B3 binds in Example 1 and T2 in Example 2
- [[Model Selection and Overfitting]]
- [[Model Selection Using Predictive Performance]]
