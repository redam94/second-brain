---
title: "Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Sec. 3.2, pp. 4-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]"
  - "[[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]]"
used_by:
  - "[[Heath 2015 - Influenza Vaccine Case Study and Table 1]]"
  - "[[Heath 2015 - Discussion Limitations and Practical Guidance]]"
aliases:
  - Strong-Oakley EVPPI
  - Sadatsafavi EVPPI
---

# Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi

> [!summary]
> Two methods that estimate EVPPI for a scalar $\phi$ from PSA draws alone by sorting on $\phi$ and exploiting local constancy of the best decision. Strong-Oakley averages net benefit in $M$ equal blocks; Sadatsafavi et al. cut at the points where the optimal decision flips. Both depend on a tuning input ($M$ or the number of decision changes) that can badly bias the answer.

## Overview

Both methods rest on two ideas stated in Sec. 3.2: (i) provided the optimal decision stays constant, the first EVPPI term can be approximated by the average known-distribution net benefit within that set; (ii) an option optimal at one parameter value stays optimal "close to" it. With $S$ PSA draws $(\theta^1,\dots,\theta^S)$ this yields an estimator provided the decision is constant on the chosen sets.

## Main Content

> [!definition] Strong-Oakley blocking estimator
> 1. Draw $\theta^1..\theta^S$.
> 2. Compute $NB_t(\theta^s)$ for every option $t$.
> 3. Sort the draws so $\min\phi=\varphi_1<\dots<\varphi_S=\max\phi$.
> 4. Reorder $NB_t(\theta^s)$ to follow that order, $NB_t(\varphi_s)$.
> 5. Split into $m=1..M$ sub-lists $L_m$ of length $L=S/M$ and average $\overline{NB}^m_t=\frac1L\sum_{j\in L_m}NB_t(\varphi_j)$.
> 6. $\widehat{\text{EVPPI}}=\frac1M\sum_{m=1}^M\max_t\overline{NB}^m_t-\max_t\overline{NB}_t$ (the second term is the overall best mean).
^def-strong-oakley

*Tuning.* "If $M$ is large, the EVPPI is close to the overall EVPI estimate. At the other end of the scale, if $M$ is small, the EVPPI is approximately 0." Strong and Oakley use a normal approximation to the upward bias and choose $M$ as the largest number of subsets such that the bias is below a threshold, for example 0.1. In the vaccine case study that gave $M$ between 2 and 20 depending on the parameter.

> [!definition] Sadatsafavi et al. segmentation estimator
> Same steps 1-4, then split the sorted list at $M$ cut points $\varphi_{L_1}..\varphi_{L_M}$ (the segmentation vector) so that sub-list $m$ holds all $\varphi$ with $\varphi_{L_m}\le\varphi<\varphi_{L_{m+1}}$; set
> $$\widehat{\text{EVPPI}}=\max_{(\varphi_{L_1},\dots,\varphi_{L_M})}\ \frac1M\sum_{m=1}^M\max_t\overline{NB}^m_t-\max_t\overline{NB}_t.$$
> It is asymptotically unbiased if the search uses the true number of decision changes.
^def-sadatsafavi

*Choosing the number of changes.* A visual tool plots the cumulative sum of the difference in known-distribution net benefit between two options (ordered by $\phi$); a change in the optimal decision appears as an extremum. The paper warns it "can be difficult to identify extrema making EVPPI estimates using this method unreliable in certain situations", and that a parameter judged to have no decision changes is by that choice assigned EVPPI $=0$ ("visual indications are used to determine the EVPPI rather than objective analysis").

## Examples

Sketch (my code, untested on the paper's data): for $\phi$ scalar and two options,

```python
import numpy as np
def evppi_blocks(phi, nb, M):
    """nb: (T, S) known-distribution net benefit; Strong-Oakley blocking with M blocks."""
    o = np.argsort(phi); nbs = nb[:, o]
    L = nb.shape[1] // M
    blk = nbs[:, :M*L].reshape(nb.shape[0], M, L).mean(axis=2)   # (T, M)
    return blk.max(axis=0).mean() - nb.mean(axis=1).max()
```

For the toy model in [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]], small $M$ underestimates and large $M$ drifts toward EVPI, as the quoted text predicts.

## Connections
- Both are black-box in the sense of using only the PSA sample, but not black-box in the sense of needing no tuning; this is why Sec. 5 says they are "largely superseded" by [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]].
- Marketing: with a draw matrix from an MMM posterior, a one-parameter block estimator is a fast screening check on which single channel parameter matters.

## See Also
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
