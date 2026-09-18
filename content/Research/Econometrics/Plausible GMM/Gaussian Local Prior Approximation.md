---
title: "Gaussian Local Prior Approximation"
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian-statistics
  - type/theorem
  - doc/paper
source: "[[raw/Plausible GMM - A Quasi-Bayesian Approach]]"
source_location: "§2.3 Simple Quasi-Bayes Inference using Gaussian Local Priors (pp. 10-11)"
date_ingested: 2026-06-27
folder: "Econometrics/Plausible GMM"
doc_type: paper
depends_on:
  - "[[Quasi-Bayes for Plausible Moment Restrictions]]"
  - "[[Plausible Moment Restriction Model]]"
used_by:
  - "[[Plausible GMM - Institutions and GDP Application]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
aliases:
  - local prior
  - PGMM Gaussian approximation
  - plausibility-adjusted weighting matrix
  - no free lunch
---

# Gaussian Local Prior Approximation

> [!summary]
> The tractable special case of [[Quasi-Bayes for Plausible Moment Restrictions|the quasi-posterior]]: when the prior over the plausibility term is local Gaussian, $\mu \sim \mathcal{N}(\mu_0, \Lambda/T)$, and identification is strong, the marginal quasi-posterior for $\theta$ is approximately $\mathcal{N}(\widehat\theta, V/T)$. The mode $\widehat\theta$ is a GMM estimator using a **plausibility-adjusted weighting matrix** $A_\theta \ne \Omega(\theta)^{-1}$ that places the most weight on moments the researcher is most confident in. The quasi-posterior variance is **strictly larger** than the efficient-GMM variance — the formal "no free lunch": allowing for misspecification costs precision. Efficient GMM is recovered as $\Lambda \to 0$ (no uncertainty about the moments).

## Overview

The full quasi-posterior of [[Quasi-Bayes for Plausible Moment Restrictions]] requires MCMC. This section gives a closed-form **Gaussian approximation** valid when the prior on the plausibility characteristic $\mu$ is normal with small (order $1/T$) variance and the model is strongly identified. It makes transparent the forces shaping the quasi-posterior — most importantly, how it endogenously trades off moment precision against the researcher's uncertainty about each moment's validity.

## Main Content

> [!definition] Definition: Local Gaussian prior ($\S$2.3, Eq. 4)
> $$
> \mu \sim \mathcal{N}\!\left(\mu_0, \frac{\Lambda}{T}\right),
> $$
> for a fixed $q$-vector $\mu_0$ and fixed full-rank $q\times q$ matrix $\Lambda$. A simple choice is diagonal $\Lambda$ with entries $\lambda_k$: a **small** $\lambda_k$ means little uncertainty about the plausibility of the $k$-th moment; a **large** $\lambda_k$ means high uncertainty.
>
> **"Local."** Variance of order $1/T$ means prior misspecification uncertainty shrinks at the same rate as sampling uncertainty in the moments, so neither dominates the large-$T$ asymptotics (cf. Conley, Hansen & Rossi 2012; Armstrong & Kolesár 2021).
> ^def-local-prior

**Regularity assumptions.** Set $\mu_0 = 0$ and assume a flat prior on $\theta$. Assume **strong identification**: $m(\theta(\mu)) = \mu$ has a unique solution $\theta(\mu)$, with the linearization around $\theta_0 \equiv \theta(\mu_0)$
$$
m(\theta(\mu)) = G\,(\theta(\mu) - \theta_0) + o\!\left(\lVert \theta(\mu) - \theta_0 \rVert\right),
\qquad G = \frac{\partial\, \mathbb{E}[\widehat{m}(\theta)]}{\partial \theta}\Big|_{\theta = \theta_0},
$$
where $G^\top G$ has minimal eigenvalue bounded away from zero.

> [!definition] Definition: Plausibility-adjusted weighting matrix ($\S$2.3)
> $$
> \widehat{A}_{T,\theta} = \widehat{\Omega}_T(\theta)^{-1} - \widehat{\Omega}_T(\theta)^{-1}\bigl[\Lambda^{-1} + \widehat{\Omega}_T(\theta)^{-1}\bigr]^{-1}\widehat{\Omega}_T(\theta)^{-1},
> $$
> with population counterpart
> $$
> A_\theta = \Omega(\theta)^{-1} - \Omega(\theta)^{-1}\bigl[\Lambda^{-1} + \Omega(\theta)^{-1}\bigr]^{-1}\Omega(\theta)^{-1}.
> $$
> Unlike the efficient GMM weight $\Omega(\theta)^{-1}$, $A_\theta$ **down-weights** moments with large plausibility-uncertainty $\lambda_k$, reflecting the extra uncertainty from not knowing $\mu$ exactly. As $\Lambda \to 0$ (i.e. $\Lambda^{-1} \to \infty$), $A_\theta \to \Omega(\theta)^{-1}$ and efficient GMM is recovered.
> ^def-weighting

> [!theorem] Result: Gaussian quasi-posterior approximation ($\S$2.3, Eq. 5)
> Under the local Gaussian prior and strong identification, the marginal quasi-posterior is approximately proportional to
> $$
> \exp\!\left( -T\,\bigl\lVert \widehat{m}(\widehat\theta) + G(\theta - \widehat\theta) \bigr\rVert^2_{\widehat{A}_{T,\theta}} \big/ 2 \right),
> $$
> where the mode $\widehat\theta$ is the **GMM estimator using weighting matrix $\widehat{A}_{T,\theta}$**. Equivalently,
> $$
> \theta \approx \mathcal{N}\!\left(\widehat\theta, \frac{V}{T}\right),
> \qquad V = \left(G^\top \widehat{A}_{T,\theta}\, G\right)^{-1}.
> $$
> ^thm-gaussian-approx

### Three noteworthy features

1. **Center.** $\widehat\theta$ is the classical GMM estimator with weight $A_{\theta_0}$ rather than the efficient $\Omega(\theta_0)^{-1}$. Efficient weighting reflects only sampling variation in the moments; $A_{\theta_0}$ incorporates *both* sampling and plausibility uncertainty, placing most weight where combined uncertainty is lowest.

2. **Quasi-posterior variance is inflated.**
   $$
   V = \left(G^\top A_{\theta_0} G\right)^{-1} \;\ge\; \left(G^\top \Omega(\theta_0)^{-1} G\right)^{-1},
   $$
   the right side being the usual efficient-GMM asymptotic variance. The gap is the extra uncertainty from lack of certainty about moment validity.

3. **Sampling distribution of the center.**
   $$
   \sqrt{T}\,(\widehat\theta - \theta_0) \to_d \mathcal{N}(0, \bar V),
   \qquad
   \bar V = \left(G^\top A_{\theta_0} G\right)^{-1} G^\top A_{\theta_0}\, \Omega(\theta_0)\, A_{\theta_0}\, G \left(G^\top A_{\theta_0} G\right)^{-1},
   $$
   with $\bar V \le V$ (since $A_{\theta_0}\Omega(\theta_0)A_{\theta_0} \le A_{\theta_0}$). The quasi-posterior variance $V$ exceeds the *actual* sampling variance $\bar V$ of $\widehat\theta$ because the latter is computed under the dogmatic belief $\mu \equiv 0$ and only reflects misspecification through reweighting, not through the prior.

> [!example] Key takeaway: "No free lunch" ($\S$2.3)
> Incorporating a non-dogmatic prior over moment-condition violations **necessarily** produces less informative inference than the dogmatic case: the quasi-posterior variance $V$ is larger than efficient GMM. This is desirable — inference then more accurately reflects what can actually be learned when model uncertainty exists. Efficient GMM is the limiting, over-confident special case $\Lambda \to 0$.
> ^ex-no-free-lunch

## Connections

- A computable stand-in for the general [[Quasi-Bayes for Plausible Moment Restrictions|quasi-posterior]] (Eq. 2), valid under local Gaussian priors.
- The weighting matrix $A_\theta$ realizes, from a quasi-Bayesian angle, the **precision-vs-misspecification trade-off** that Armstrong & Kolesár (2021) obtain via a minimax criterion — see [[Plausible GMM - Overview]].
- Recovers efficient [[Method of Simulated Moments|GMM]] / [[Asymptotics and Frequentist Connections|Chernozhukov–Hong]] asymptotics as $\Lambda \to 0$.
- The local prior $\mathcal{N}(\mu_0, \Lambda/T)$ is the device used in the [[Plausible GMM - Institutions and GDP Application|institutions–GDP application]] (with data-scaled $\Sigma_T$).

## See Also

- [[Quasi-Bayes for Plausible Moment Restrictions]] — the exact quasi-posterior this approximates
- [[Plausible GMM - Institutions and GDP Application]] — the approximation and full simulation in practice
- [[Plausible GMM - Overview]] — Bernstein–von Mises concentration results (full versions in the Supplemental Appendix)
