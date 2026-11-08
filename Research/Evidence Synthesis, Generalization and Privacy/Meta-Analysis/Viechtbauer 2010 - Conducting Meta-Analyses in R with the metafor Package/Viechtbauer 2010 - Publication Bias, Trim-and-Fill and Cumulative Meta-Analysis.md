---
title: "Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 3.5, pp. 29-33 (Figures 5, 8, 9)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]]"
used_by:
  - "[[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]]"
aliases:
  - funnel plot asymmetry tests
  - trim and fill method
  - Egger regression test
  - cumulative meta-analysis
---

# Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis

> [!summary]
> If small or non-significant studies stay unpublished, a funnel plot becomes asymmetric. metafor tests asymmetry with rank-correlation (Begg-Mazumdar) and regression (Egger and variants) tests, estimates the number of missing studies with Duval-Tweedie trim and fill (only for models without moderators), and tracks how evidence accumulates with `cumul()`. On BCG neither test finds asymmetry, trim and fill imputes 4 studies and still leaves a significant effect, and the cumulative plot shows a drifting estimate that is a latitude artefact.

## Overview

Publication bias means that studies with small or non-significant findings are less likely to enter a meta-analysis. A visual and numerical toolkit gives *sensitivity analyses*, not corrections: the paper stresses that trim and fill "should not be regarded as a way of yielding a more 'valid' estimate ... but as a way of examining the sensitivity of the results to one particular selection mechanism".

## Main Content

### Funnel-plot asymmetry tests

> [!definition] Asymmetry tests (`ranktest()`, `regtest()`)
> Both test whether observed outcomes (or residuals from a moderator model) are related to their sampling variance, SE or sample size.
> - **Rank correlation test** (Begg and Mazumdar 1994): Kendall-type correlation between standardized effects and variances.
> - **Regression tests** (Egger et al. 1997 and extensions: Macaskill et al. 2001, Sterne and Egger 2005, Harbord et al. 2006, Peters et al. 2006, Rucker et al. 2008, Moreno et al. 2009). Versions differ in the model (weighted regression with multiplicative dispersion, `model="lm"`, versus a meta-analytic model `model="rma"`, default), the predictor (`"sei"` SE default, `"vi"`, `"ni"` sample size, `"ninv"` inverse sample size) and the outcome measure used (for 2x2 data one can choose among measures).
> Signature: `regtest(x, model="rma", predictor="sei", ni=NULL, ...)`. With `model="rma"`, the options (`method`, `weighted`, `knha`) of the original fit are reused, so a mixed-effects asymmetry test needs the model fitted with moderators first.
^def-asymmetry-tests

> [!example] BCG asymmetry tests
> Weighted regression with multiplicative dispersion, predictor = SE: $t=-1.4013$, df = 11, $p=0.1887$. Mixed-effects model (latitude, year) with predictor = total sample size: $z=0.7470$, $p=0.4550$. "Neither test suggests asymmetry in the respective funnel plots, although the results must be treated with some caution." (Fig. 5 shows both funnel plots: RE model with SE axis 0.000 to 0.730 and mixed-effects with residual axis.)
^ex-bcg-asymmetry

### Trim and fill

> [!definition] Trim and fill (Duval and Tweedie 2000a,b; Duval 2005)
> A nonparametric, rank-based data-augmentation method that (i) estimates the number $k_0$ of studies missing on one side of the funnel due to suppression of the most extreme results, via the `"L0"` or `"R0"` estimator, (ii) trims the most extreme studies, re-estimates the centre, (iii) mirrors the trimmed studies (fills) and re-fits. `trimfill(x, estimator="L0", side=NULL, maxit=50, verbose=FALSE)`; `side` is chosen from the regression test when `NULL`. Applicable only to fixed- or random-effects models without moderators.
^def-trim-and-fill

> [!example] BCG trim and fill
> Starting from the **fixed-effects** model: estimated number of missing studies on the right = 4, giving $k=17$; $Q(16)=262.7316$ ($p<.0001$); filled-in FE estimate $-0.2910$ (SE 0.0383, $z=-7.6057$, CI $[-0.3660,-0.2160]$). The vaccine effect is smaller with filled studies but "still statistically significant". Fig. 8 plots the filled-in funnel. (Original FE estimate: $-0.4303$.)
^ex-bcg-trimfill

Selection-model alternatives: the `copas` package with `meta` (Copas 1999; Copas and Shi 2000, 2001).

### Cumulative meta-analysis

> [!definition] Cumulative meta-analysis (Chalmers and Lau 1993; Lau et al. 1995)
> Sequentially add studies (usually chronologically) and re-estimate the average effect; shows how evidence evolves. Typically retrospective, can be prospective (Whitehead 1997). `cumul(res, order=order(dat$year))` refits the FE or RE model $k$ times; study labels must be set by `slab` in the original `rma()` call.
^def-cumulative-ma

> [!example] BCG cumulative forest plot (Fig. 9)
> Ordering by year: Aronson 1948 RR 0.41 [0.13, 1.26]; adding Ferguson & Simes 0.27 [0.13, 0.53]; ... after Rosenthal 1961 0.33 [0.22, 0.49]; after Comstock 1974 0.46 [0.32, 0.65]; Hart & Sutherland 1977 0.45 [0.32, 0.64]; TPT Madras 1980 0.49 [0.34, 0.70] (equal to the full RE result). The apparent decline in effectiveness over time is "related to the fact that the more recent studies were conducted closer to the equator", i.e. confounded with latitude.
^ex-bcg-cumulative

## Examples

```python
import numpy as np
from scipy import stats
def egger_test(y, v):
    """Weighted regression with multiplicative dispersion: z_i = y_i/se_i on precision 1/se_i; intercept = asymmetry."""
    se = np.sqrt(v); z = y/se; X = np.column_stack([np.ones_like(se), 1/se])
    b, res, *_ = np.linalg.lstsq(X, z, rcond=None); k = len(y)
    s2 = ((z-X@b)**2).sum()/(k-2); cov = s2*np.linalg.inv(X.T@X)
    t = b[0]/np.sqrt(cov[0,0]); return b[0], t, 2*stats.t.sf(abs(t), k-2)
```
(This is the classic Egger form, shown for intuition; metafor's variants differ in model, predictor and outcome measure, so its output for BCG ($t=-1.4013$) is not reproduced by this snippet.)

## Connections

- Marketing: platform-run lift studies and agency case studies are selectively reported. A funnel plot of published or shared lift tests is a quick check on whether small positive results are over-represented. See [[Researcher Degrees of Freedom]] and [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] for the underlying mechanism.
- Formal selection-model corrections for publication bias are a natural follow-on (Andrews and Kasy 2019, in the umbrella `raw/` folder, not yet ingested).
- Cumulative analysis is the frequentist analogue of sequential Bayesian updating discussed in [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]].

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]]
