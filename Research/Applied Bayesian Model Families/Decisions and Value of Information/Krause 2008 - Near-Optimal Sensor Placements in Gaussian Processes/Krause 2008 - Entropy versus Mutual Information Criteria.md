---
title: "Krause 2008 - Entropy versus Mutual Information Criteria"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 3, pp. 241-245; Appendix A (Theorem 2)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - GP Model and Posterior Variance]]"
used_by:
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
  - "[[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]]"
aliases:
  - Mutual information sensor criterion
  - Entropy criterion boundary effect
---

# Krause 2008 - Entropy versus Mutual Information Criteria

> [!summary]
> Minimising the conditional entropy of unsensed locations is equivalent to maximising the entropy $H(X_A)$ of the sensors (D-optimal design); it is NP-hard and pushes sensors to the border because it is indirect. The Caselton-Zidek mutual-information criterion $I(X_A;X_{V\setminus A})$ measures prediction quality directly, places sensors centrally, and is also NP-complete (Theorem 2).

## Overview

Setting: locations $V=S\cup U$, where $S$ are admissible sensor sites and $U$ are positions of interest with no sensors. Choose $A\subseteq S$ with $|A|=k$.

## Main Content

> [!definition] Entropy criterion
> $A^*=\arg\min_{|A|=k}H(X_{V\setminus A}\mid X_A)=\arg\max_{|A|=k}H(X_A)$, since $H(X_{V\setminus A}\mid X_A)=H(X_V)-H(X_A)$. For a Gaussian, $H(X_y\mid X_A)=\tfrac12\log(2\pi e\,\sigma^2_{y\mid A})$ (Eq. 5), monotone in the variance. Greedy rule (Eq. 4): $y^*_H=\arg\max_yH(X_y\mid X_{A_i})$.
^def-entropy-criterion

> [!theorem] Theorem 1 (Ko et al., 1995)
> Given rational $M$ and rational covariance matrix $\Sigma_{VV}$, deciding whether there is $A\subseteq V$ with $|A|=k$ and $H(X_A)\ge M$ is NP-complete.
^thm-ko-entropy-np

*Boundary problem (Fig. 4).* The highest-entropy set is the set of sensors "most uncertain about each other", typically as far apart as possible, i.e. along the border (Ramakrishnan et al., 2005). A border sensor "wastes" information because it predicts only on one side.

> [!definition] Mutual-information criterion (Caselton and Zidek, 1984)
> $$A^*=\arg\max_{A\subseteq S,\ |A|=k}\Big[H(X_{V\setminus A})-H(X_{V\setminus A}\mid X_A)\Big]=\arg\max_{A\subseteq S,|A|=k}I(X_A;X_{V\setminus A}),\quad MI(A)=I(X_A;X_{V\setminus A}).$$
> It "directly measures the effect of sensor placements on the posterior uncertainty of the GP". Caselton et al. (1992) and Zidek et al. (2000) argued against it when $H(X_A)$ is a large share of $H(X_V)$ and because computing it needs an accurate $P(X_V)$; the authors respond that nonstationary models are now estimable and show empirically that MI beats entropy.
^def-mi-criterion

> [!theorem] Theorem 2 (NP-completeness of MI)
> Given rational $M$ and rational $\Sigma_{VV}$ over $V=S\cup U$, deciding whether there exists $A\subseteq S$, $|A|=k$, with $MI(A)\ge M$ is NP-complete.
^thm-mi-np

*Proof sketch (App. A).* Reduce from the Ko et al. construction: for any graph $G$ there is a covariance $\Sigma$ whose $k\times k$ subdeterminant exceeds $M$ iff $G$ has a $k$-clique (with a gap $\varepsilon$ otherwise). Let $\Sigma$ be the covariance of latent $X_U$; add observed copies $y_i\mid X_i\sim N(X_i,\sigma^2)$ as sites $S$. Then $I(A;V\setminus A)=H(A)-H(A\mid U)$ and $H(A\mid U)$ depends only on $|A|$, so maximising MI maximises $H(A)$ and thus the entropy of its parents $\Gamma_A\subset U$; for small enough $\sigma^2$ the gap decides clique.

*Greedy near-optimality in practice (Fig. 5).* On a 16-location subsample of the temperature data, choosing 1 to 5 of 16, the greedy solution stayed within 95 percent of the optimum computed by branch and bound.

## Examples

**Variance-only (entropy) vs MI on a 1-D grid** (verified here): 60 grid points on $[0,1]$, squared-exponential kernel length 0.1, noise variance 0.1, choose 5. Greedy MI picks grid indices 2, 13, 29, 46, 57 (interior, spread evenly), while greedy entropy picks 0, 11, 23, 41, 59 (including both borders). Code is in [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]].

## Connections
- Entropy criterion = D-optimal in linear Bayesian design (Sebastiani and Wynn, 2000), as discussed in [[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]].
- Compare with value of information: MI is an information-based surrogate of what [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] measures in decision units; see [[Expected Information Gain]].

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
