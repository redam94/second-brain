---
title: "Abowd 2022 - Why Differential Privacy, zCDP and Curator Models"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 1-2 (Definitions 1-2, Figure 1, curator models), pp. 2-7"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]"
used_by:
  - "[[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]]"
  - "[[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]"
aliases:
  - zero-concentrated DP in the census
  - census trusted curator model
  - why the census adopted differential privacy
---

# Abowd 2022 - Why Differential Privacy, zCDP and Curator Models

> [!summary]
> The Bureau adopted formal privacy because traditional disclosure avoidance fails to be transparent, to resist post-processing attacks, or to compose gracefully. TDA's privacy accounting uses $\rho$-zCDP: $D_\alpha(M(x)\Vert M(x'))\le\rho\alpha$ for all $\alpha>1$, which implies a continuum of $(\varepsilon,\delta)$ pairs, converted for communication with $\varepsilon=\rho+2\sqrt{\rho\log(1/\delta)}$ (consistent with all the paper's reported pairs). The model is trusted-curator (central) DP with bounded neighbors.

## Overview

Sections 1-2 give the rationale for DP, the two privacy definitions used, the interpretation of $\rho$ and $\delta$, and why the trusted-curator model was chosen.

## Main Content

### Why formal privacy

Traditional methods have well-known vulnerabilities (reconstruction attacks of Dinur-Nissim, re-identification of Netflix/AOL/GWAS data, etc.). Petabyte-scale cloud computing, optimization software (Gurobi, CPLEX, GLPK solving NP-hard systems with billions of simultaneous equations) and commercially available auxiliary data realize the scenario Fellegi warned of in 1972. A formally private framework is built from randomized mechanisms whose properties do not depend on the realized confidential data nor, ideally, on the attacker's information, and must come with an accounting system that quantifies the privacy loss of the ensemble of published answers.

Three properties distinguish DP from traditional methods (none of which satisfies all three, per the paper):
1. **Transparency**: the mechanism and its parameters can be published, but not the random numbers actually drawn, without compromising the guarantee. Household swapping (used 1990-2010) is not transparent: its parameters cannot be published.
2. **No degradation under post-processing**: any algorithm applied to the output of a DP mechanism with no further access to the data is still DP with no additional loss. Aggregation does *not* preserve uncertainty (reconstruction attacks); cell suppression can be unraveled if an attacker knows one unexpected cell.
3. **Adaptive composition**: if $M_1(X)$ produces $\omega$ and $M_2(\omega,X)$ a second output, the composed loss is a sub-additive, smoothly bounded function of the two losses.

DP gives *relative* guarantees that hold for arbitrary attacker priors and strategies: Alice's incremental risk equals the difference between the output of the mechanism without her data versus with it. An analyst may make an aggregate (statistical) inference about Alice but not an identifying inference enabled only by her record. The analysis of such limits is called **privacy semantics**.

### Definitions

> [!definition] Definition 1: pure/approximate differential privacy
> Given $\varepsilon\ge0$ and $\delta\in[0,1]$, a randomized mechanism $M:\mathcal X^n\to\mathcal Y$ satisfies $(\varepsilon,\delta)$-DP if for all $x,x'\in\mathcal X^n$ differing on a single entry ($x\sim x'$) and all measurable events $E\subset\mathcal Y$: $\mathbb P(M(x)\in E)\le e^{\varepsilon}\mathbb P(M(x')\in E)+\delta$. Pure DP is the case $\delta=0$. The parameter $\delta$ is typically set below $1/N$, since a mechanism releasing one record at random satisfies $(0,1/N)$-DP.
^def-census-dp

**Neighbors.** Two conventions exist: *unbounded* (add/remove one record) and *bounded* (modify one record). TDA uses **bounded** neighbors because the total population of the U.S. (and Puerto Rico) is invariant, so neighboring datasets must have the same record count.

> [!definition] Definition 2: zero-concentrated DP (zCDP)
> Given $\rho\ge0$, a randomized mechanism $M:\mathcal X^n\to\mathcal Y$ satisfies $\rho$-zCDP if for all $x\sim x'$ and all $\alpha\in(1,\infty)$,
> $$D_\alpha\big(M(x)\Vert M(x')\big)\le\rho\,\alpha,\qquad D_\alpha(P\Vert Q)=\frac1{\alpha-1}\log\sum_{E\in\mathcal Y}P(E)^\alpha Q(E)^{(1-\alpha)},$$
> the Renyi divergence of order $\alpha$ (Bun-Steinke).
^def-zcdp

zCDP implies $(\varepsilon,\delta)$-DP and has robust accounting and composition: $\rho$'s add. It is the member of the Renyi family with a *linear* budget curve, see [[Mironov 2017 - Renyi Divergence and the RDP Definition]].

### Why two definitions

Empirically, a **discrete Gaussian** mechanism for noisy measurements gave substantial accuracy gains over the geometric (double-geometric) mechanism. Accounting with the discrete Gaussian aligns naturally with zCDP (allocating $\rho$ rather than $\varepsilon$), so TDA adopted zCDP accounting. To permit comparison with other implementations, and because reasoning about the whole privacy-loss distribution is harder to communicate to policymakers, $\rho$ is translated into $(\varepsilon,\delta)$. The paper intentionally **did not use the tightest conversion** (Canonne et al.) but the Bun-Steinke conversion, which overestimates $\delta$ and is interpretable as an upper bound on the probability that a given level of $\varepsilon$ does not hold.

zCDP gives a continuum of $(\varepsilon,\delta)$ pairs for each $\rho$ (Figure 1 plots the curve for $\rho=1$ and $\rho=2.63$, the final production setting). The curve "indicates that zCDP provides privacy protection that weakens as $\delta$ approaches 0, but never results in catastrophic failure", where catastrophic failure means one or more records released with probability $\min(n\delta,1)$. No single point on the curve summarizes $\rho$; public presentations used $\delta=10^{-10}$ to ease the transition from $\varepsilon$-based accounting, but analyzing only that pair is "very incomplete". The paper does not attempt to interpret $\delta$ further.

### Data curator models

- **Trusted curator (central DP)**: a legally authorized entity collects and stores confidential data and releases protected tabulations. Used for the 2020 Census. Allows more statistically efficient mechanisms (more accuracy at the same privacy parameter).
- **Untrusted curator (local DP)**: protection is applied to individual records as collected (e.g. Warner's 1965 randomized response), so the curator never sees raw data.

Setting $\rho$ or $\varepsilon$ is (or should be) the job of policymakers; TDA lets the Data Stewardship Executive Policy Committee (DSEP) set the global parameter and its allocation. The typical goal is maximum accuracy for a given privacy-loss parameter; DSEP's instructions generally tried to **minimize the privacy-loss parameter given a lower bound on utility**.

## Examples

> [!example] Converting $\rho$ to $(\varepsilon,\delta)$ at $\delta=10^{-10}$
> Setup: the conversion $\varepsilon=\rho+2\sqrt{\rho\log(1/\delta)}$ (the Bun-Steinke conversion; the paper does not print the formula, so this form is inferred from, and checked against, its reported numbers).
> Solution: $\rho=1.095\Rightarrow\varepsilon=1.095+2\sqrt{1.095\times23.026}=11.14$ and $\rho=0.1885\Rightarrow4.36$, both matching the paper (footnote 21). For production, recomputed: $\rho=2.63\Rightarrow\varepsilon\approx18.19$; persons $\rho=2.56\Rightarrow17.92$; housing units $\rho=0.07\Rightarrow2.61$. The paper notes the more accurate approach is to sum the person and housing $\rho$'s first, then convert.
> Interpretation: the headline $\varepsilon$ looks large, but it is a single point on a curve; the same $\rho=2.63$ Gaussian-equivalent trade-off is $\mu=\sqrt{2\rho}=2.29$-GDP, whose exact $\varepsilon$ at $\delta=10^{-10}$ is about 16.7 (recomputed), slightly below the conservative Bun-Steinke value. The production $\varepsilon$ values are this note's computation, not stated in the paper text read.
^ex-rho-to-eps

```python
import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

def zcdp_to_eps(rho, delta=1e-10):          # Bun-Steinke conversion (conservative)
    return rho + 2 * np.sqrt(rho * np.log(1 / delta))

def gdp_eps(mu, delta):                      # exact Gaussian trade-off conversion
    f = lambda e: norm.cdf(-e/mu + mu/2) - np.exp(e)*norm.cdf(-e/mu - mu/2) - delta
    return brentq(f, 0, 200)

for rho in (0.1885, 1.095, 2.56, 0.07, 2.63):
    print(rho, round(zcdp_to_eps(rho), 2))   # 4.36, 11.14, 17.92, 2.61, 18.19
print(round(gdp_eps(np.sqrt(2 * 2.63), 1e-10), 1))   # about 16.7: rho = mu^2/2
```

## Connections

- Gaussian mechanism in zCDP / RDP language: [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]; conversion of RDP to $(\varepsilon,\delta)$: [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]].
- Hypothesis-testing semantics (the "privacy semantics" the paper alludes to): [[Dong Roth Su 2022 - Trade-off Functions and f-DP]].
- Trusted-curator vs local model, and why central DP matters for measurement vendors: [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]
- [[Dwork Roth 2014 - Randomized Response]] — the local-model mechanism contrasted with the trusted-curator model.
- [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] — reconstruction and re-identification attacks behind the move to formal privacy.
