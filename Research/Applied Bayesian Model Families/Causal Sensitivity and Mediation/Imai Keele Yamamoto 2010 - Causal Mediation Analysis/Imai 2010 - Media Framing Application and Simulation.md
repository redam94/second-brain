---
title: "Imai 2010 - Media Framing Application and Simulation"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]"
source_location: "Sec. 2, 4.3, 6, pp. 2-4, 10-11, 13-16; Tables 1-3; Figs. 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
doc_type: paper
depends_on:
  - "[[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]]"
  - "[[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]"
used_by: []
aliases:
  - Nelson Clawson Oxley media framing example
  - Klan rally mediation example
  - mediation Monte Carlo Table 2
---

# Imai 2010 - Media Framing Application and Simulation

> [!summary]
> The empirical application re-analyses Nelson, Clawson & Oxley's (1997) randomised media-framing experiment ($n=136$): the public order frame lowers tolerance of a Ku Klux Klan rally by $-0.54$ (SE 0.34), of which about $-0.51$ operates through the importance attached to public order. The mediator was observed not randomised, so sensitivity analysis shows the negative ACME survives unless $\rho<-0.68$. A Monte Carlo study shows nonparametric estimators are nearly unbiased but higher-variance than the LSEM.

## Overview

**Experiment.** Student subjects watched one of two local newscasts, identical except for the final story on a Klan rally in central Ohio: framed as a **free speech** issue ($T=0$, 67 subjects) or a **public order** disruption ($T=1$, 69 subjects). Outcome: tolerance for the Klan on a 7-point scale. Hypothesised mediators (measured after the experiment, scaled): importance of free speech and importance of public order. Because attitudes were not randomised, an unobserved pre-treatment variable such as political ideology may confound mediator and outcome (conservatives care more about public order and are more sympathetic to the Klan).

## Main Content

### Table 1 (descriptive statistics and ATEs)

| Response | Public order mean (SD) | Free speech mean (SD) | ATE (SE) |
|---|---|---|---|
| Importance of free speech | 5.25 (1.43) | 5.49 (1.35) | $-0.231$ (0.239) |
| Importance of public order | 5.43 (1.73) | 4.75 (1.80) | $0.674$ (0.303) |
| Tolerance for the KKK | 2.59 (1.89) | 3.13 (2.07) | $-0.540$ (0.340) |

Sample sizes 69 (public order) and 67 (free speech). Only the public-order mediator is analysed, since the original authors found a significant mediation effect there.

### Table 3: ACME estimates under sequential ignorability (95% CI)

| Quantity | Parametric LSEM | Nonparametric |
|---|---|---|
| Free speech frame $\hat\delta(0)$ | $-0.566$ [$-1.081,-0.050$] | $-0.596$ [$-1.168,-0.024$] |
| Public order frame $\hat\delta(1)$ | $-0.451$ [$-0.871,-0.031$] | $-0.374$ [$-0.823,0.074$] |
| Average total effect $\hat\tau$ | $-0.540$ [$-1.207,0.127$] | $-0.540$ [$-1.206,0.126$] |
| With no-interaction: $\hat\delta(0)=\hat\delta(1)$ | $-0.510$ [$-0.969,-0.051$] | (not reported) |
| Total effect under no-interaction | $-0.540$ [$-1.206,0.126$] | - |

Interpretation: ACME under the free-speech frame is larger in magnitude than under public order for both estimators, and the nonparametric CI for $\bar\delta(1)$ includes zero, but the test of $\bar\delta(0)=\bar\delta(1)$ has $p=0.238$ so Assumption 2 is acceptable; the no-interaction estimate lies between the two. The total effect is unchanged because Assumption 2 restricts only how the effect is transmitted.

### Sensitivity analysis results (Figs. 1-2)
- **Fig. 1 ($\rho$ axis).** Conclusion about the direction of the ACME (negative) holds unless $\rho<-0.68$; with sampling variability the 95% CI covers zero only for $-0.79<\rho<-0.49$.
- **Fig. 2 ($R^2$ axes).** If the confounder pushes mediator and outcome in the same direction (e.g. political ideology: $\text{sgn}(\lambda_2\lambda_3)>0$), the estimated ACME is always negative, so the conclusion is perfectly robust. In the opposite-sign case the ACME is guaranteed negative if the confounder explains less than 27.7% of the variance in the mediator *or* outcome left unexplained by the treatment alone, however large the other proportion; or less than 26.7% (14.7%) of the original variance in the mediator (outcome).

- **Fig. 3 / Appendix E (nonparametric, dichotomised data).** Bounds on $\bar\delta(1),\bar\delta(0)$ as a function of $\upsilon$ cross zero at $\upsilon\approx0.019$ and $0.022$: much less robust than the parametric $\rho$ analysis (details in [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]).

> [!warning] Unreconciled figures
> With $\rho^2=R^{2*}_MR^{2*}_Y$ and the Fig. 1 threshold $\tilde\rho\approx-0.68$, setting $R^{2*}_Y=1$ would suggest a cut-off near $R^{2*}_M\approx0.46$, not 27.7%. The printed 27.7%/26.7%/14.7% values are reported as in the paper; I could not reproduce them from the quoted $\tilde\rho$ alone (they depend on estimated variances not given in the text).

### Table 2: Monte Carlo study (Sec. 4.3)
Population model: $Y_i(t,m)=\exp(Y^*_i(t,m))$, $M_i(t)=1\{M^*_i(t)\ge0.5\}$, with $(Y^*,M^*)$ jointly normal: means $E Y^*(1,1)=2$, $E Y^*(1,0)=0$, $E Y^*(0,1)=1$, $E Y^*(0,0)=0.5$, $E M^*(1)=1$, $E M^*(0)=0$; unit variances; $\text{Corr}(Y^*(t,m),Y^*(t',m'))=0.5$; $\text{Corr}(Y^*,M^*)=0$; $\text{Corr}(M^*(1),M^*(0))=0.3$. Implies $\Pr(M=1|T)=\Phi(\alpha_2+\beta_2T)$ and $Y|T,M\sim\text{lognormal}(\alpha_3+\beta_3T+\gamma M+\kappa TM,\sigma_3^2)$ with $(\alpha_2,\beta_2,\alpha_3,\beta_3,\gamma,\kappa,\sigma_3^2)=(-0.5,1,0.5,-0.5,0.5,1.5,1)$ and
$$\bar\delta(t)=\{e^{\alpha_3+\beta_3t+\gamma+\kappa t+\sigma_3^2/2}-e^{\alpha_3+\beta_3t+\sigma_3^2/2}\}\{\Phi(\alpha_2+\beta_2)-\Phi(\alpha_2)\}\quad(23).$$
True values $\bar\delta(0)=0.675$, $\bar\delta(1)=4.03$. 50,000 iterations, $n_1=n_0=n/2$.

| Estimand | $n$ | NP bias | NP RMSE | NP coverage | Param. bias | Param. RMSE | Param. coverage |
|---|---|---|---|---|---|---|---|
| $\hat\delta(0)$ | 50 | 0.002 | 1.034 | 0.824 | 0.096 | 0.965 | 0.919 |
| $\hat\delta(0)$ | 100 | 0.006 | 0.683 | 0.871 | 0.044 | 0.566 | 0.933 |
| $\hat\delta(0)$ | 500 | $-0.002$ | 0.292 | 0.922 | 0.006 | 0.229 | 0.947 |
| $\hat\delta(1)$ | 50 | 0.010 | 2.082 | 0.886 | $-0.010$ | 1.840 | 0.934 |
| $\hat\delta(1)$ | 100 | 0.005 | 1.462 | 0.912 | 0.003 | 1.290 | 0.944 |
| $\hat\delta(1)$ | 500 | 0.001 | 0.643 | 0.939 | 0.001 | 0.570 | 0.955 |

Reading: the nonparametric estimator has less bias but more variance; coverage converges to 95% (fully by $n=5000$), much faster for the parametric estimator.

## Examples

```python
# Re-compute the true ACMEs of the Monte Carlo population model (Eq. 23)
import numpy as np
from scipy.stats import norm
a2,b2,a3,b3,g,k,s2 = -0.5,1,0.5,-0.5,0.5,1.5,1
d = lambda t: (np.exp(a3+b3*t+g+k*t+s2/2)-np.exp(a3+b3*t+s2/2))*(norm.cdf(a2+b2)-norm.cdf(a2))
print(d(0), d(1))   # approximately 0.675 and 4.03
```

## Connections

- [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] holds the sensitivity formulas used here.
- Contrast with a quasi-experimental setting (marketing, no randomisation of $T$): [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]].

## See Also

[[Imai 2010 - Causal Mediation Analysis - Overview]]
