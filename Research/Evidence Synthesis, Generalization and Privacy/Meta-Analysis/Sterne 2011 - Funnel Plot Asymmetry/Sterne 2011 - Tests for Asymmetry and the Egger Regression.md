---
title: "Sterne 2011 - Tests for Asymmetry and the Egger Regression"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry.pdf]]"
source_location: "Statistical tests for funnel plot asymmetry; Box 2, pp. 3-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry"
doc_type: paper
depends_on:
  - "[[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]"
used_by:
  - "[[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]]"
aliases:
  - "Egger test"
  - "Egger regression test for funnel plot asymmetry"
  - "Small-study effects tests"
---
# Sterne 2011 - Tests for Asymmetry and the Egger Regression

> [!summary]
> A test for funnel plot asymmetry asks whether the association between effect size and study size exceeds what chance allows. For continuous outcomes, Egger's weighted regression of effect on standard error is recommended; for odds ratios the Harbord, Peters or (for large heterogeneity) Rucker arcsine tests avoid a mathematical coupling between the log odds ratio and its SE. All have low power: use them only with about 10 or more studies.

## Overview

This note gives the formal content of the testing section and of Box 2, the equivalence of Egger's two regression forms, a worked simulation, and what the original Egger et al. (1997) paper reported (from its abstract).

## Main Content

### The Egger regression

> [!definition] Funnel plot asymmetry test (Egger et al. 1997)
> Let $\hat\theta_i$ be the effect estimate and $s_i$ its standard error in study $i=1,\dots,k$. The paper states the test as "a weighted linear regression of the effect estimates on their standard errors" for continuous outcomes, and for odds ratios "an inverse variance weighted linear regression of the log odds ratio on its standard error":
> $$\hat\theta_i=\beta_0+\beta_1 s_i+s_i\,\varepsilon_i,\qquad\varepsilon_i\sim N(0,\sigma^2)\quad(\text{weights }1/s_i^2).$$
> Egger et al.'s original form uses the **standard normal deviate** $\text{SND}_i=\hat\theta_i/s_i$ and **precision** $1/s_i$:
> $$\frac{\hat\theta_i}{s_i}=a+b\,\frac1{s_i}+\varepsilon_i.$$
> Asymmetry is measured by the intercept $a$; the null hypothesis of symmetry is $a=0$.

^def-egger-test

> [!theorem] Equivalence of the two forms
> Dividing the first model through by $s_i$ gives $\hat\theta_i/s_i=\beta_1+\beta_0/s_i+\varepsilon_i$, so $a=\beta_1$ (the slope on SE in the weighted form) and $b=\beta_0$ (the intercept in the weighted form). Hence testing $a=0$ in the SND regression is the same test as $\beta_1=0$ in the weighted regression of effect on SE. *Proof sketch:* algebra as shown; both regressions have identical residuals up to the factor $s_i$, so the weighted least-squares fits coincide. This is my derivation from the two descriptions in the article and in the Egger 1997 abstract (regression of standard normal deviates against precision).

^thm-egger-equivalence

Under no asymmetry the fitted line passes through the origin of the SND-vs-precision plot ($a=0$) and $b$ estimates the common effect; a non-zero $a$ means small (imprecise) studies deviate systematically in one direction. The article notes that **extrapolating** this regression to $s\to0$ (infinite precision) gives a bias-adjusted effect, i.e. $\beta_0=b$ (see [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]]).

### The problem for binary outcomes

> [!theorem] Mathematical coupling for log odds ratios
> For odds ratios the standard error of the log odds ratio is mathematically linked to the size of the odds ratio itself, even with no small-study effects, so the Egger regression can give false positives when there is a substantial intervention effect. Alternatives: Harbord et al., Peters et al., Rucker et al. (arcsine), Deeks et al. (diagnostic accuracy studies, where large imbalances in group sizes and large odds ratios hurt other tests).

^thm-or-coupling

### Box 2 - recommendations on testing

> [!definition] Recommendations on testing for funnel plot asymmetry
> **All outcome types.** (i) Do not test with fewer than ~10 studies - power is too low to separate chance from real asymmetry (the lower the power, the higher the share of "significant" results that are false); with substantial heterogeneity the minimum may be much more than 10. (ii) Interpret tests together with the funnel plot (influential or outlying studies; publication bias can probably be excluded if small studies show *lower* benefit than large ones, or if no studies are significant). (iii) Asymmetry has several explanations (Box 1). (iv) Specify the testing strategy in advance; do not apply many tests; if several are used, report all. (v) Do not test when all standard errors are similar.
> **Continuous outcomes (mean differences).** Egger's test may be used; no reason to prefer later tests; avoid with substantially fewer than 10 studies.
> **Odds ratios.** Harbord and Peters tests avoid the coupling and retain power, but false positives can still occur with substantial heterogeneity. If $\tau^2>0.1$ (heterogeneity variance of log odds ratios) only the arcsine test including random effects (Rucker) works reasonably well (slightly conservative with no heterogeneity, less familiar). When $\tau^2<0.1$, Harbord, Peters or Rucker can be used; performance deteriorates as $\tau^2$ grows.

^thm-box2-recommendations

> [!note] Tests should be used in a minority of meta-analyses
> Because it is impossible to know the mechanism, tests are evaluated by simulation (mostly by selectively deleting studies from simulated data). The authors conclude that tests "should be used in only a minority of meta-analyses".

### Decision table distilled from Box 2

| Situation | Test |
|---|---|
| $k<10$ or all SEs similar | none |
| Continuous / mean difference | Egger |
| Odds ratio, $\tau^2<0.1$ | Harbord, Peters or Rucker |
| Odds ratio, $\tau^2>0.1$ | Rucker arcsine with random effects |
| Diagnostic accuracy | Deeks |

### What Egger et al. (1997) reported (from the published abstract)

> [!example] Egger 1997 design and headline results
> *Design:* eight pairs of (meta-analysis, single large trial) found by Medline search; 37 meta-analyses from four general medical journals (1993-6); 38 Cochrane Database reviews. Asymmetry measured by the intercept of the SND-vs-precision regression. *Results:* four pairs concordant, four discordant; in every discordant pair the meta-analysis showed the larger effect; asymmetry appeared in 3 of 4 discordant pairs and in none of the concordant pairs. Asymmetry suggesting bias in 14 (38%) of the journal meta-analyses and 5 (13%) of the Cochrane reviews. *Conclusion:* funnel plot analysis is useful for flagging bias, but power is limited with few small trials. (Provenance: PMC record abstract; the full text was not retrievable, so the section structure of Egger 1997 is not reproduced here.)

^ex-egger-1997

## Examples

> [!example] Simulation of the Egger test under selective publication
> *Setup (illustrative, not from the paper):* 2000 latent studies, true effect $\theta=0.1$, standard errors $s_i\sim U(0.05,0.5)$, estimates $\hat\theta_i\sim N(\theta,s_i^2)$. A study is published if $z_i>1.96$, otherwise with probability 0.2. Run the Egger test on the first 200 latent studies, on the first 40 published, and on the first 200 published.
> *Solution (seed 7):* latent $k=200$: intercept 0.071, $t=0.59$, $p=0.554$; published $k=40$: intercept 0.335, $t=1.11$, $p=0.275$; published $k=200$: intercept 0.338, $t=2.40$, $p=0.0175$.
> *Interpretation:* selection induces a positive intercept (about 0.34) in both published samples, but with $k=40$ the test cannot distinguish it from chance - the low power that motivates the "$\ge10$ studies" rule (and why even 40 may be too few under selection this mild). With $k=200$ it is detected.

^ex-egger-sim

```python
import numpy as np
from scipy import stats

def egger_test(y, se):
    """SND_i = y_i/se_i regressed on precision 1/se_i; test intercept = 0."""
    snd, prec = y / se, 1.0 / se
    X = np.column_stack([np.ones_like(prec), prec])
    beta, *_ = np.linalg.lstsq(X, snd, rcond=None)
    resid = snd - X @ beta
    k = len(y)
    cov = (resid @ resid / (k - 2)) * np.linalg.inv(X.T @ X)
    t = beta[0] / np.sqrt(cov[0, 0])
    return beta, t, 2 * stats.t.sf(abs(t), k - 2)

rng = np.random.default_rng(7)
theta = 0.1
se = rng.uniform(0.05, 0.5, 2000)
y = rng.normal(theta, se)
pub = (y / se > 1.96) | (rng.random(2000) < 0.2)
for label, idx in [("latent,    k=200", np.arange(200)),
                   ("published, k= 40", np.flatnonzero(pub)[:40]),
                   ("published, k=200", np.flatnonzero(pub)[:200])]:
    b, t, p = egger_test(y[idx], se[idx])
    print(f"{label}: intercept={b[0]:6.3f} slope={b[1]:6.3f}  t={t:5.2f}  p={p:.4f}")
```

## Connections

- Andrews and Kasy (2019) analyse exactly this class of meta-regressions under a selection model and show they are valid tests of no selection but hard to interpret under the alternative: [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]].
- Estimating how selective publication is, rather than testing for it: [[Andrews Kasy 2019 - Identification Using Meta-Studies]].

### Relevance to marketing measurement

For a library of $k$ incrementality tests with lifts $\hat\theta_i$ and standard errors $s_i$, an Egger regression is a two-line diagnostic. Keep the $k\ge10$ rule and pre-specify it; treat a positive intercept as "small tests look better than large tests", not as proof of file-drawer behaviour.

## See Also

- [[Sterne 2011 - Funnel Plot Asymmetry - Overview]]
- [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]
- [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]]
- [[Power Analysis and Sample Size]]
