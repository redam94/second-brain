---
title: "De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Sec. 2.2 (Eqs. 18-25), pp. 12-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]]"
used_by:
  - "[[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]]"
  - "[[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]]"
aliases:
  - "Pitman-Yor process"
  - "normalized generalized gamma process"
  - "NGG"
  - "Gnedin model"
---

# De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors

> [!summary]
> Sub-classes: PY (weights $V_{n,k}=\prod_{i<k}(\theta+i\sigma)/(\theta+1)_{n-1}$), the $\sigma$-stable process ($\theta=0$), PY with $\sigma<0$ (finite $m$ species with symmetric Dirichlet weights, the basic building block for $\sigma<0$), Gnedin's model, and NGG (with the normalised inverse Gaussian at $\sigma=1/2$). All have full weak support when "genuinely nonparametric".

## Main Content
> [!definition] Pitman-Yor weights (Eq. 18)
> $V_{n,k}=\dfrac{\prod_{i=1}^{k-1}(\theta+i\sigma)}{(\theta+1)_{n-1}}$ solves the recursion for admissible $(\sigma,\theta)$: $\sigma\in[0,1)$ with $\theta>-\sigma$, or $\sigma<0$ with $\theta=m|\sigma|$, $m$ a positive integer. $\sigma=0$ gives the DP; $\sigma\in(0,1),\theta=0$ the normalised $\sigma$-stable process (Kingman).

^def-py-weights

**Finite number of species ($\sigma<0$).** With $\theta=m|\sigma|$: $V_{n,k}=\dfrac{|\sigma|^{k-1}\prod_{i=1}^{k-1}(m-i)}{(m|\sigma|+1)_{n-1}}\mathbf 1_{\{1..\min(n,m)\}}(k)$ (Eq. 19): a population of $m$ species with proportions $\text{Dirichlet}(|\sigma|,\dots,|\sigma|)$ (a Wright-Fisher stationary law).

> [!theorem] Structure of $\sigma<0$ Gibbs-type priors (Gnedin and Pitman 2005)
> Every Gibbs-type prior with $\sigma<0$ is a mixture over the number of species $m\sim\pi$ on $\{1,2,\dots\}$ of PY$(\sigma,m|\sigma|)$: $(\tilde p_1,\dots,\tilde p_{m-1})\mid m\sim\text{Dir}(|\sigma|,\dots)$, $m\sim\pi$ (Eq. 20).

^thm-negative-sigma-mixture

Choices of $\pi$: Gnedin (Eq. 21) $\pi(m)=\gamma(1-\gamma)_{m-1}/m!$, $\gamma\in(0,1)$, heavy-tailed with infinite expected number of species, and with $\sigma=-1$ weights $V_{n,k}=\dfrac{(k-1)!(1-\gamma)_{k-1}(\gamma)_{n-k}}{(n-1)!(1+\gamma)_{n-1}}$ (Eq. 22); truncated Poisson $\pi(m)=\frac{e^{-\lambda}\lambda^m}{(1-e^{-\lambda})m!}$ (Eq. 23); geometric $\pi(m)=(1-\eta)\eta^{m-1}$ (Eq. 24).

> [!definition] Normalised generalised gamma (NGG) process
> $\sigma\in(0,1)$, $\beta>0$:
> $$
> V_{n,k}=\frac{e^\beta\sigma^{k-1}}{\Gamma(n)}\sum_{i=0}^{n-1}\binom{n-1}i(-1)^i\beta^{i/\sigma}\Gamma\big(k-\tfrac i\sigma;\beta\big),
> $$
> with $\Gamma(x;a)=\int_a^\infty s^{x-1}e^{-s}ds$ (Eq. 25). $\sigma\to0$ gives the DP; $\sigma=1/2$ the normalised inverse Gaussian process (closed form finite-dimensional laws); $\beta=0$ the normalised $\sigma$-stable process. NGG is the only NRMI that is also Gibbs-type (Lijoi, Prunster, Walker 2008).

^def-ngg

For $\sigma>0$ the prediction rules (15) are those of $\sigma$-stable Poisson-Kingman models (Gnedin and Pitman 2005); posterior derivation there is hard. **Support**: genuinely nonparametric Gibbs-type priors ($\sigma\ge0$, or $\sigma<0$ with unbounded support for $\pi$) have full weak support - positive prior mass to every weak neighbourhood of any distribution whose support lies in that of $P^*$.

## Examples
> [!example] Finite-species PY for a known-size population
> $\sigma=-1,m=10$ (so $\theta=10$): at most 10 clusters ever appear. $P(K_n=k)>0$ only for $k\le\min(n,10)$. Useful when the category count is known to be bounded (e.g. a fixed menu).

^ex-finite-species

## Connections
Mixture use: [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]]. Compare with the two-parameter IBP: [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]].

## See Also
[[De Blasi 2015 - Gibbs-Type Priors - Overview]]
