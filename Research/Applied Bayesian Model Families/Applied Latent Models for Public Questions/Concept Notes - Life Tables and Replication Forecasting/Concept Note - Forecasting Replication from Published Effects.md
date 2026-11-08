---
title: "Concept Note - Forecasting Replication from Published Effects"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; Hedges 1992; Andrews and Kasy 2019; Open Science Collaboration 2015"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Concept Notes - Life Tables and Replication Forecasting"
doc_type: concept-note
depends_on: []
used_by:
  - "[[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]"
aliases:
  - "replication forecast publication filter"
  - "predicting replication from published effect"
  - "selection model null real mixture"
---

# Concept Note - Forecasting Replication from Published Effects

> [!summary]
> Concept note, no raw source. If journals publish significant results more readily than insignificant ones, the distribution of published $z$-statistics is a renormalised, step-weighted version of the population distribution. Fitting a null/real mixture for effects through that filter lets one estimate how many published findings are real, how large real effects are, and the probability that an exact replication will again be significant. The vault already covers the selection-model identification in the Andrews and Kasy notes; this note only links the pieces and gives a small worked model.

## Overview

Motivating PyMC example: **E117** "Would that headline finding replicate? The publication filter, 76 repeated psychology experiments and a forecast that has to earn trust" (Reproducibility Project: Psychology master file, Open Science Collaboration 2015; null/real mixture with effects integrated out; closed-form renormalised step-selection likelihood checked by quadrature; one $z$-scale for numerator and normaliser; prior predictive of a filtered sample in NumPy) - [gallery](https://redam94.github.io/pymc-challenges/examples.html).

Existing vault coverage (do not repeat): [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]] (step-function selection, identification from replications and meta-studies), [[Andrews Kasy 2019 - Identification Using Replication Studies]], [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]] (the OSC psychology data analysed there), [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] (PPV), [[Type S and Type M Errors]] (exaggeration of significant effects), [[The Replication Crisis and Multiple Levels of Variation]].

## Main Content

> [!definition] Publication filter (step selection; Hedges 1992; Andrews and Kasy 2019)
> A study with test statistic $z$ is published with probability $w(z)=1$ if $|z|>c$ ($c=1.96$) and $w(z)=p<1$ otherwise. If the unfiltered $z$ density is $m(z)$, the published density is
> $$ f_{\text{pub}}(z)=\frac{w(z)\,m(z)}{Z},\qquad Z=\int w(u)\,m(u)\,du=P_m(|z|>c)+p\,P_m(|z|\le c).$$
^def-filter

> [!definition] Null/real mixture with effects integrated out
> With probability $\pi_0$ a true effect is null ($\theta=0$), otherwise $\theta\sim N(0,\tau^2)$ on the standardised ($z$) scale. Then an original $z\mid\theta\sim N(\theta,1)$ has marginal $m(z)=\pi_0N(z;0,1)+(1-\pi_0)N(z;0,1+\tau^2)$ and $P_m(|z|>c)=2\{\pi_0\bar\Phi(c)+(1-\pi_0)\bar\Phi(c/\sqrt{1+\tau^2})\}$, with $\bar\Phi$ the normal upper tail. The filtered likelihood is closed form (no integral over $\theta$) and can be checked by quadrature. Parameters $(\pi_0,\tau,p)$ are estimated by maximising $\prod_if_{\text{pub}}(z_i)$ or by Bayes.
^def-mixture

> [!theorem] Forecast of a replication
> Given a published $z$ and population parameters, filtering does **not** change the posterior of $\theta$ for that study (the filter acts on the study as a whole): $P(\text{real}\mid z)=\dfrac{(1-\pi_0)N(z;0,1+\tau^2)}{m(z)}$ and, if real, $\theta\mid z\sim N\big(\frac{\tau^2}{1+\tau^2}z,\ \frac{\tau^2}{1+\tau^2}\big)$. A replication with the same standard error yields $z_{\text{rep}}\mid\theta\sim N(\theta,1)$, not filtered. Hence
> $$P(|z_{\text{rep}}|>c\mid z)=P(\text{real}\mid z)\,P\big(|N(\mu_z,1+v)|>c\big)+P(\text{null}\mid z)\cdot 2\bar\Phi(c),\quad \mu_z=\tfrac{\tau^2}{1+\tau^2}z,\ v=\tfrac{\tau^2}{1+\tau^2}.$$
> **The filter matters for estimating $(\pi_0,\tau)$** from published $z$'s: ignoring it makes the estimates too optimistic (too few nulls, effects too large). A replication prediction is only as good as those estimates ("a forecast that has to earn trust": check calibration against held-out replications).
^thm-forecast

## Examples

> [!example] A toy forecast
> Parameters: $\pi_0=0.5$, $\tau=1$, $c=1.96$, $p=0.1$. Published $z=2.5$. Normalisation check: $\int f_{\text{pub}}=1.000000$ by quadrature. $P(\text{real}\mid z)=0.771$; given real, $\mu_z=1.25$, $v=0.5$ so $P(|z_{\text{rep}}|>1.96)=0.285$; overall $0.771\times0.285+0.229\times0.05=0.232$. Interpretation: although $z=2.5$ is significant, with half the field null and modest real effects the chance that the replication is again significant is only about 23% in this toy (replication power is limited by the shrinkage of $\theta$ toward zero, the winner's-curse logic of [[Type S and Type M Errors]]).
^ex-toy-forecast
```python
import numpy as np
from scipy import stats
c, tau, pi0, p, z = 1.96, 1.0, 0.5, 0.1, 2.5
m = lambda z: pi0*stats.norm.pdf(z) + (1-pi0)*stats.norm.pdf(z, 0, np.sqrt(1+tau**2))
sig = 2*(pi0*stats.norm.sf(c) + (1-pi0)*stats.norm.sf(c, 0, np.sqrt(1+tau**2)))
Z = sig + p*(1 - sig)                                  # renormalising constant
f_pub = lambda z: (1 if abs(z) > c else p) * m(z) / Z   # integrates to 1
pr = (1-pi0)*stats.norm.pdf(z, 0, np.sqrt(1+tau**2)) / m(z)
mu, v = tau**2/(1+tau**2)*z, tau**2/(1+tau**2)
rep = pr*(stats.norm.sf(c, mu, np.sqrt(1+v)) + stats.norm.cdf(-c, mu, np.sqrt(1+v))) + (1-pr)*2*stats.norm.sf(c)
print(pr, rep)    # 0.771  0.232
```

**PyMC-style sketch (untested).** Put priors on $\pi_0\sim\text{Beta}$, $\tau\sim\text{HalfNormal}$, $p\sim\text{Beta}$; add `pm.Potential("lik", (pt.log(w(z)) + logsumexp([...mixture logpdfs...]) - pt.log(Z)).sum())` where $Z$ is the closed-form normaliser above; then compute the replication probability per posterior draw.

> [!tip] Relevance to marketing measurement
> The same filter applies to the A/B tests a team ships: winning variants are published internally more than losers. Forecasting whether a shipped lift will replicate in a holdout needs the selection-adjusted prior over effects, not the raw observed lift.

## Connections
[[Hierarchical Models]] (the mixture is a two-component prior), [[Prior Predictive Checking]] (filtered-sample simulation), [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] (scoring replication forecasts), [[Simulation-Based Calibration - Overview]].

## See Also
[[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]
