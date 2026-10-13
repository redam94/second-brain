---
title: Bayesian Estimation and Priors for MMM
tags:
  - source/ingested
  - topic/market-response
  - type/concept
  - doc/paper
  - topic/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 3, pp. 6-7; Secs. 6-7, pp. 16-21; Appendix pp. 28-30"
date_ingested: 2026-06-17
date_updated: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]"
  - "[[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]]"
aliases:
  - MMM Priors
  - MMM MCMC Estimation
  - Prior Sensitivity MMM
---

# Bayesian Estimation and Priors for MMM

> [!summary]
> The nonlinear MMM is estimated by MCMC (a customized C++ Gibbs/slice sampler and a STAN/HMC implementation), placing support-respecting priors on each parameter: beta/uniform for the retention rate $\alpha$ and half-saturation $\mathcal{K}$, uniform for the delay $\theta$, gamma for the slope $\mathcal{S}$, and half-normal for the nonnegative coefficients $\beta$. The central empirical finding: when the sample is small and the signal weak, **the posterior is dominated by the prior** and the data cannot correct prior-induced bias — so prior choice has a large, sometimes determinative, impact on estimates and downstream attribution.
^summary

## Overview

Because the adstock and Hill transforms make the model nonlinear in its parameters, maximizing the likelihood (frequentist MLE) is nontrivial. More importantly, a single MMM dataset carries little information relative to the parameter count, so the Bayesian framework is adopted specifically to **incorporate prior knowledge** from industry experience or related media-mix models. The model can also be extended to a hierarchical Bayesian form pooling across related brands (Wang et al. 2017) or geos (Sun et al. 2017) to manufacture more informative priors.

## Main Content

> [!definition] Likelihood, posterior, and MCMC
> Let $\Phi$ be all model parameters, $\mathbf{X}$ the media, $\mathbf{Z}$ the controls, $\mathbf{y}$ the response. The frequentist MLE is $\hat\Phi = \arg\max_\Phi \mathcal{L}(\mathbf{y}\mid\mathbf{X},\mathbf{Z},\Phi)$ (Eq. 8), where the paper describes $\mathcal{L}$ as the **log likelihood** given the data and parameters. For the variance and asymptotic distribution of the MLE it refers to Lehmann & Casella (1998, p. 449). The Bayesian posterior is
> $$
> p(\Phi \mid \mathbf{y},\mathbf{X}) \;\propto\; \mathcal{L}(\mathbf{y}\mid\mathbf{X},\mathbf{Z},\Phi)\,\pi(\Phi). \tag{9}
> $$
> Conjugate priors would give an analytic posterior, but here samples are drawn by MCMC. Two samplers: a **customized Gibbs sampler** using a slice sampler (Neal 2003) in C++/BOOM (Scott 2016), and a **STAN** implementation using **Hamiltonian Monte Carlo** (HMC). High posterior correlation among the transformation parameters challenges STAN — it can take hours/days on a few-thousand points — so the custom Gibbs sampler is much more efficient. Gibbs sampling is cited to Gelfand & Smith (1990) and Geman & Geman (1984), HMC to Hoffman & Gelman (2014). Posterior summaries: mean, median or mode, plus quantile-based credible intervals (Hartigan 2012; Hoff 2009), which the paper calls "a more informative summary". The full citation map is in [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]. See [[MCMC Basics]].
^likelihood-posterior

> [!definition] Prior specifications (with rationale)
> Prior choice "has important implications on the resulting posterior distributions" (Sec. 3, p. 7, citing Gelman 2006, pp. 1634-1637). Each prior should respect its parameter's support:
> - **Retention rate $\alpha \in [0,1)$** — beta or uniform on $[0,1)$ (simulation: $\text{beta}(3,3)$); narrower support if strong prior knowledge.
> - **Delay $\theta \in [0, L-1]$** — uniform or scaled beta (simulation: $\text{uniform}(0,12)$).
> - **Slope $\mathcal{S} > 0$** — gamma with a positive mode (simulation: $\text{gamma}(3,1)$).
> - **Half-saturation $\mathcal{K}$** — beta constrained over the **observed spend range** (simulation: $\text{beta}(2,2)$), because $\mathcal{K}$ outside the observed range is unidentifiable (see [[Shape (Saturation) Effects]]).
> - **Coefficients $\beta_m \ge 0$** — half-normal (normal constrained nonnegative), since media effect is believed nonnegative (simulation: $\text{half normal}(0,1)$).
> - Baseline $\tau \sim \text{normal}(0,5)$; controls $\gamma_c \sim \text{normal}(0,1)$; noise variance $\sim \text{inverse gamma}(0.05, 0.0005)$.
^prior-specs

> [!definition] Prior dominance in small samples
> If the data has strong information content, priors with the same support yield similar posteriors. If not, **the prior has a large influence and the posterior may look almost the same as the prior**. Empirically (Sec. 6): the delay $\theta$ has low bias and moderate uncertainty even in small samples, but the retention rate $\alpha$ shows "somewhat more bias and uncertainty for small sample size" (p. 16; e.g. Media 3 mean posterior median about 0.64 vs true 0.8 in Fig. 7a), and both are estimated worse for the weak Media 3. The shape parameters $(\mathcal{K},\mathcal{S},\beta)$ suffer **high variance and large bias** for small samples — the $\beta$Hill curves are systematically **underestimated**. The bias is attributable to the priors: when sample size is small and signal weak, the data is not strong enough to correct prior-induced bias.
^prior-dominance

## Examples

> [!example] Sensitivity to the prior on $\beta$ (Sec. 7.1)
> Three priors compared over 500 datasets: $\text{half normal}(0,1)$, $\text{normal}(0,1)$, $\text{uniform}(0,3)$. The two normal priors give nearly identical, underestimated $\beta$Hill curves; $\text{uniform}(0,3)$ puts more mass on large $\beta$ and so produces **smaller bias** (e.g. Media 2 at $x=1$: −18.0% / −18.0% / −1.5%). But this does **not** generalize — in scenarios where curves are over-estimated, $\text{uniform}(0,3)$ would worsen the bias. There is no universally "correct" prior.
^sensitivity-to-the-prior

> [!example] Sensitivity to the prior on $\mathcal{K}$ (Sec. 7.2)
> Priors $\text{beta}(2,2)$, $\text{uniform}(0,1)$, $\text{uniform}(0,10)$ across two scenarios (true $\mathcal{K}=0.2$ inside the observed $[0,1]$ range; true $\mathcal{K}=2$ outside it). The $\beta$Hill *curves* are similar across all three priors, but the **estimates of $\mathcal{K}$ differ markedly** for the wide $\text{uniform}(0,10)$ prior. Because media effect depends on the curve (not the individual $\mathcal{K}$), the model is not very sensitive to the $\mathcal{K}$ prior — but a tighter, knowledge-backed prior speeds sampler convergence. When $\mathcal{K}=2$ lies outside the data range it cannot be estimated well even with a well-placed prior, yet the curve within range is still fine.
^sensitivity-to-the-prior-2

## Connections

- Estimates the combined model from [[Bayesian Media Mix Modeling - Overview]]; priors target the parameters of [[Carryover (Adstock) Functional Forms]] and [[Shape (Saturation) Effects]].
- General MCMC background (Gibbs, HMC, slice sampling): [[MCMC Basics]]; the linear-control part connects to [[Bayesian Linear Regression]].
- Posterior samples feed the attribution metrics: [[ROAS, mROAS, and Optimal Media Mix]].
- Model selection across functional forms (BIC): [[MMM Model Selection and Application]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]]
- [[MCMC Basics]]
- [[Bayesian Linear Regression]]
- [[_Index|Index: Bayesian Media Mix Modeling]]
- [[Conversion Lift Studies on Ad Platforms]] — the lift studies that supply experimental priors
- [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] — full Tables 5-6 and Figs. 9-12
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] — full Table 4 and Figs. 7-8
- [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] — the Appendix Stan program
- [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] — parameter budget for 52-156-row weekly media models
- [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] — category posteriors as informative priors
