---
title: "De Blasi 2015 - Consistency, Dependent Processes and Conclusions"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Secs. 5-7 (Eqs. 44-45), Appendix, pp. 29-36"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]"
  - "[[De Blasi 2015 - Species Sampling and Unseen Species Prediction]]"
used_by:
  - "[[De Blasi 2015 - Gibbs-Type Priors - Overview]]"
aliases:
  - "Gibbs-type consistency"
  - "inconsistency of Pitman-Yor at diffuse distributions"
  - "dependent Gibbs-type processes"
---

# De Blasi 2015 - Consistency, Dependent Processes and Conclusions

> [!summary]
> Under iid sampling from a true $P_0$, Gibbs-type posteriors converge weakly to $\alpha P^*+(1-\alpha)P_0$ where $\alpha=\lim V_{n+1,\kappa_n+1}/V_{n,\kappa_n}$. They are consistent at discrete $P_0$ but, for $\sigma>0$ PY, inconsistent at diffuse $P_0$ (limit $\sigma P^*+(1-\sigma)P_0$) unless used inside a mixture; the paper closes by arguing that Gibbs-type priors are the most natural generalisation of the DP.

## Main Content
**Setup.** Data iid from $P_0$ ("what if" approach, Diaconis and Freedman). Posterior consistent if $Q(A_\epsilon\mid X_{1:n})\to1$ a.s. for weak neighbourhoods $A_\epsilon$ of $P_0$. $\kappa_n$ = number of distinct values; for discrete $P_0$ with $N$ atoms ($N\le\infty$) $\kappa_n\to N$, $\kappa_n/n\to0$; for diffuse $P_0$, $\kappa_n=n$.

> [!theorem] General convergence (Sec. 5.1, De Blasi, Lijoi, Prunster 2013)
> For a Gibbs-type prior with $P^*$ of full support, if (H): $V_{n+1,\kappa_n+1}/V_{n,\kappa_n}\to\alpha\in[0,1]$ a.s.-$P_0^\infty$, then the posterior concentrates weakly at $\bar P_0=\alpha P^*+(1-\alpha)P_0$ (Eq. 44). $\alpha=0$: consistency; $\alpha=1$: "total inconsistency" (posterior concentrates at the prior guess).

^thm-gibbs-consistency

For PY $(\sigma\in[0,1),\theta>-\sigma)$: discrete $P_0$ gives $\alpha=0$ (consistent); diffuse $P_0$ gives $\alpha=\sigma$, inconsistent unless $\sigma=0$ (the DP). NGG analogous. Do not read this as a flaw: discrete priors should model discrete data or sit inside a hierarchical mixture.

> [!theorem] Finite-species ($\sigma<0$) consistency via the mixing law $\pi$ (Eq. 20)
> (i) Consistent at any discrete $P_0$ if $\pi(m+1)/\pi(m)\le1$ for large $m$ (T1). (ii) Consistent at any diffuse $P_0$ if $\pi(m+1)/\pi(m)\le M/m$ for large $m$ (T2).

^thm-negative-sigma-consistency

**Illustrations ($\sigma=-1$, diffuse $P_0$).** Gnedin model: $\pi(m+1)/\pi(m)=(m-\gamma)/(m+1)$ fails (T2); $V_{n+1,\kappa+1}/V_{n,\kappa}=\kappa(\kappa-\gamma)/(n(\gamma+n))\to1$ ($\kappa_n=n$): total inconsistency. Poisson $\pi$: ratio $\lambda/(m+1)$ satisfies (T2): consistent. Geometric $\pi$: ratio $\eta$ fails (T2); $\alpha=\big(2-\eta-2\sqrt{1-\eta}\big)/\eta\in[0,1]$ (Eq. 45), increasing in $\eta$, so the whole range from consistency to total inconsistency appears; (T2) is near-necessary.

**Dependent processes (Sec. 6).** Two research lines: *dependent processes* for covariates/time (MacEachern's dependent DP; Cifarelli-Regazzini; slice and retrospective samplers) and *population dynamics* with measure-valued diffusions whose stationary laws are one- or two-parameter Poisson-Dirichlet, DP or normalised inverse Gaussian (Ethier-Kurtz; Pólya urn constructions; sigma-diversity processes).

**Conclusions (Sec. 7).** Gibbs-type priors start from an assumption about the *learning mechanism* ($P(\text{new})$ depends on $n,k$ not frequencies), in the spirit of de Finetti's emphasis on observables; tractability is a consequence. Benefits: $K_n$ not forced to grow like $\log n$ (the whole range from finite to nearly linear), flexible prior on the number of components, explicit estimators, $K_n$ sufficient for new-value prediction. The DP is recovered by dropping dependence on $K_n$.

## Examples
> [!example] Why PY is inconsistent at a diffuse truth
> If $P_0$ is continuous, every observation is a new value: $\kappa_n=n$ and PY's new-value probability is $(\theta+\sigma n)/(\theta+n)\to\sigma$. With probability $\sigma$ each future draw is "new from $P^*$", so the posterior mean keeps weight $\sigma$ on the prior guess: $\bar P_0=\sigma P^*+(1-\sigma)P_0$.

^ex-py-inconsistent

## Connections
[[Teh 2010 - DP Definition and Posterior Conjugacy]] (DP consistency from conjugacy), [[Posterior Predictive Checking]] (check discrete-prior fit by mixing, not by using a discrete prior on continuous data).

## See Also
[[De Blasi 2015 - Gibbs-Type Priors - Overview]]
