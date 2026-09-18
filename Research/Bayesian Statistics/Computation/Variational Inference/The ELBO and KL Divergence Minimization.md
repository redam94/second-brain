---
title: The ELBO and KL Divergence Minimization
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/information-theory
  - type/concept
  - doc/paper
source:
  - "[[raw/Blei 2017 - Variational Inference A Review for Statisticians.pdf]]"
  - "[[raw/Kucukelbir 2017 - Automatic Differentiation Variational Inference.pdf]]"
  - "[[raw/Yao 2018 - Yes but Did It Work Evaluating Variational Inference.pdf]]"
source_location: "Blei et al. 2017 Sec. 2.2 (Eqs. 10-14, pp. 6-7), Sec. 2.3 Fig. 1, Sec. 5.4; Kucukelbir et al. 2017 Sec. 2.2 (Eqs. 1-3, fn. 3); Yao et al. 2018 Secs. 1, 2.2, 5.1"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[Variational Inference - Overview]]"
  - "[[Introduction to Bayesian Computation]]"
used_by:
  - "[[Mean-Field Family and Coordinate Ascent VI (CAVI)]]"
  - "[[Stochastic and Black-Box Variational Inference]]"
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
  - "[[Normalizing Flows for Variational Inference]]"
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
aliases:
  - ELBO
  - Evidence Lower Bound
  - Variational Lower Bound
  - Variational Free Energy
  - Reverse KL Minimization
---

# The ELBO and KL Divergence Minimization

> [!summary]
> The variational objective $\mathrm{KL}(q(z)\,\|\,p(z\mid x))$ cannot be computed because it contains the log evidence $\log p(x)$. Dropping that constant gives the **evidence lower bound**, $\mathrm{ELBO}(q) = \mathbb E_q[\log p(z,x)] - \mathbb E_q[\log q(z)]$, which needs only the *unnormalized* posterior. The identity $\log p(x) = \mathrm{KL}(q\,\|\,p(\cdot\mid x)) + \mathrm{ELBO}(q)$ (Blei et al. 2017, Eq. 14) shows that maximizing the ELBO minimizes the KL and that the ELBO lower-bounds the log evidence. The *direction* of the KL, with the expectation under $q$, is what makes VI computable and also what makes it mode-seeking and variance-underestimating.

## Overview

Every algorithm in the [[Variational Inference - Overview|VI cluster]] maximizes the same quantity; they differ only in the family $\mathcal Q$ and in how the expectation under $q$ is computed or estimated. This note collects the properties of the objective itself: three equivalent forms, the bound, the relation to EM, what reverse KL does to the optimum, and why the ELBO's *value* is nearly useless as a quality measure.

## Main Content

> [!definition] Kullback-Leibler divergence (reverse / exclusive form) ^def-reverse-kl
> With all expectations taken under $q(z)$,
>
> $$
> \mathrm{KL}\big(q(z)\,\|\,p(z\mid x)\big) = \mathbb E_q[\log q(z)] - \mathbb E_q[\log p(z\mid x)] .
> $$
>
> It is non-negative, zero iff $q = p(\cdot\mid x)$, and **asymmetric**: $\mathrm{KL}(q\|p)\neq\mathrm{KL}(p\|q)$ (Blei et al., Eq. 11 and fn. 2). Expanding the conditional,
>
> $$
> \mathrm{KL}\big(q(z)\,\|\,p(z\mid x)\big) = \mathbb E_q[\log q(z)] - \mathbb E_q[\log p(z,x)] + \log p(x),
> $$
>
> which "reveals its dependence on $\log p(x)$" (Eq. 12), the very quantity that made inference hard.

> [!definition] Evidence lower bound (ELBO) ^def-elbo
> $$
> \mathrm{ELBO}(q) = \mathbb E_q[\log p(z,x)] - \mathbb E_q[\log q(z)] .
> $$
>
> "The ELBO is the negative KL divergence of Equation (12) plus $\log p(x)$, which is a constant with respect to $q(z)$. Maximizing the ELBO is equivalent to minimizing the KL divergence" (Blei et al., Eq. 13).

> [!theorem] Evidence decomposition and the bound ^thm-evidence-decomposition
> For any density $q(z)$,
>
> $$
> \log p(x) = \mathrm{KL}\big(q(z)\,\|\,p(z\mid x)\big) + \mathrm{ELBO}(q) \quad\Longrightarrow\quad \log p(x)\ \ge\ \mathrm{ELBO}(q),
> $$
>
> with equality iff $q(z) = p(z\mid x)$ (Blei et al., Eq. 14). The bound follows from $\mathrm{KL}\ge 0$; the original literature derived it from Jensen's inequality, $\log p(x) = \log\mathbb E_q[p(z,x)/q(z)] \ge \mathbb E_q[\log p(z,x)/q(z)]$ (Jordan et al. 1999).

**Three readings of the same objective.**

1. *Energy plus entropy.* $\mathrm{ELBO}(q) = \mathbb E_q[\log p(z,x)] + \mathbb H[q]$. The first term rewards mass on configurations with high joint density; the entropy term rewards spreading out. Kucukelbir et al. (2017, Eq. 2) and Ranganath et al. (2014) use this form. Its negative is the **variational free energy** $\mathcal F$ of Rezende & Mohamed (2015).
2. *Fit minus complexity.* Splitting the joint,

$$
\mathrm{ELBO}(q) = \mathbb E_q[\log p(x\mid z)] - \mathrm{KL}\big(q(z)\,\|\,p(z)\big).
$$

"The first term is an expected likelihood; it encourages densities that place their mass on configurations of the latent variables that explain the observed data. The second term is the negative divergence between the variational density and the prior; it encourages densities close to the prior. Thus the variational objective mirrors the usual balance between likelihood and prior" (Blei et al., p. 7). This is the form the [[Reparameterization Trick and Variational Autoencoders|VAE]] optimizes: reconstruction error plus a KL regularizer.
3. *Evidence minus gap.* $\mathrm{ELBO}(q) = \log p(x) - \mathrm{KL}(q\,\|\,p(\cdot\mid x))$: the bound is tight exactly to the extent the approximation is good.

> [!theorem] Relation to EM ^thm-em-relation
> The first ELBO term $\mathbb E_q[\log p(z,x)]$ is the expected complete-data log likelihood optimized by EM. EM exploits that the ELBO *equals* $\log p(x)$ when $q(z) = p(z\mid x)$: the E-step sets $q$ to the exact conditional, the M-step maximizes over fixed parameters. "Unlike variational inference, EM assumes the expectation under $p(z\mid x)$ is computable... Unlike EM, variational inference does not estimate fixed model parameters" (Blei et al., p. 7). **Variational EM** is EM with a variational E-step, which is exactly what the VAE does: $\theta$ by (approximate) maximum likelihood, $z$ by VI. Compare [[EM and Gradient Optimization for the Delayed Feedback Model]] for a case where the exact E-step *is* available.

### What the direction of the KL does

> [!theorem] Support constraint and zero-forcing ^thm-zero-forcing
> Reverse KL integrates $q\log(q/p)$. Wherever $q>0$ but $p=0$ the integrand is $+\infty$, so the optimization carries the implicit constraint $\operatorname{supp}(q)\subseteq\operatorname{supp}(p(\cdot\mid x))$ (Kucukelbir et al. 2017, Eq. 3 and fn. 3). More generally the objective "penalizes placing mass in $q(\cdot)$ on areas where $p(\cdot)$ has little mass, but penalizes less the reverse" (Blei et al., p. 9). Consequences:
>
> - **Variance underestimation.** A factorized $q$ fitted to a correlated target must shrink to stay inside the high-density region (Blei et al., Fig. 1). To match the marginal variances "the circular $q(\cdot)$ would have to expand into territory where $p(\cdot)$ has little mass."
> - **Mode-seeking.** Against a multimodal target a unimodal $q$ locks onto one mode rather than straddling them.
> - **Light tails.** Yao et al. (2018): the VI solution "has a lighter tail than $p(\theta\mid y)$ as a result of entropy penalization," giving importance ratios $p/q$ a heavy right tail, which is what the [[Diagnosing Variational Inference (PSIS k-hat and VSBC)|$\hat k$ diagnostic]] measures.

The opposite direction, $\mathrm{KL}(p\,\|\,q)$, is mass-covering and moment-matching but requires expectations under the unknown posterior. Expectation propagation "is inspired by the KL divergence 'in the other direction'" (Blei et al., Sec. 5.4; see [[Approximation Methods]]). The $\alpha$- and Renyi-divergence family interpolates between the two; [[Variational Inference and Pathfinder]] summarizes the Bayesian Workflow book's view of these alternatives and of score-based divergences.

### What the ELBO value does *not* tell you

- **Not a fit measure.** Yao et al. (Sec. 1): an unknown multiplicative constant in $p(\theta,y)\propto p(\theta\mid y)$ "changes with reparametrization, making it meaningless to compare ELBO across two approximations. Moreover, the ELBO is a quantity on an uninterpretable scale... This makes it next to useless as a method to assess how well the variational inference has fit." The gap $\log p(x) - \mathrm{ELBO}$ *is* the KL, but $\log p(x)$ is unknown.
- **Not a principled model-selection criterion.** The ELBO has been used as a stand-in for the marginal likelihood, but "selecting based on a bound is not justified in theory" (Blei et al., p. 7), because the slack differs across models. For predictive comparison prefer [[Cross Validation Checking|PSIS-LOO]] and the criteria in [[Overfitting and Information Criteria]].
- **Non-convex.** "The ELBO is (generally) a non-convex objective function"; ten random initializations of a Gaussian mixture reach ten different ELBO values (Blei et al., Sec. 2.5, Fig. 2). Convergence of the ELBO means a *local* optimum has been reached, nothing more. Blei et al. suggest monitoring the average held-out log predictive as a cheaper proxy, but Yao et al. show (logistic regression, Sec. 4.2) that held-out log predictive density can *improve* while the approximation gets worse.

## Examples

> [!example] Mode-seeking on a bimodal target ^ex-bimodal
> Yao et al. (Sec. 5.1) consider $p = 0.8\,\mathcal N(0, 0.2) + 0.2\,\mathcal N(3, 0.2)$ with well-separated modes. A Gaussian $q$ fitted by reverse KL "will converge to one of the modes," say $q\approx\mathcal N(0,0.2)$. On the support of $q$ the ratio $p/q$ is then essentially the constant $0.8$. Two lessons:
>
> 1. The KL at that optimum is about $\log(1/0.8)\approx 0.22$ nats, small, even though $q$ misses 20% of the posterior mass entirely. Reverse KL is a *local* measure.
> 2. Any diagnostic built from samples of $q$ (including $\hat k$) is blind to the missing mode; it must be found by multiple dispersed initializations or by a prior-predictive check such as VSBC.

> [!example] Monte Carlo ELBO for a Gaussian $q$ ^ex-mc-elbo
> The energy-plus-entropy form gives a generic estimator requiring only an unnormalized log posterior:
>
> ```python
> import numpy as np
>
> def elbo_hat(log_joint, mu, log_sigma, S=1000, rng=np.random.default_rng(0)):
>     """ELBO estimate for q = N(mu, diag(exp(log_sigma)^2)).
>     log_joint(z) returns log p(z, x) up to a constant."""
>     K = mu.size
>     eps = rng.standard_normal((S, K))
>     z = mu + np.exp(log_sigma) * eps              # samples from q
>     energy = np.mean([log_joint(zs) for zs in z])  # E_q[log p(z, x)]
>     entropy = 0.5 * K * (1 + np.log(2 * np.pi)) + log_sigma.sum()
>     return energy + entropy
> ```
>
> Writing $z = \mu + \sigma\odot\epsilon$ is already the [[Reparameterization Trick and Variational Autoencoders|reparameterization trick]]: differentiate through `z` and this estimator becomes the ADVI gradient. Note that adding a constant to `log_joint` shifts the ELBO by the same constant, the concrete face of Yao et al.'s "uninterpretable scale."

## Connections

- [[Variational Inference - Overview]] - where the objective sits in the overall method.
- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] - maximizes the ELBO coordinate-wise in closed form.
- [[Stochastic and Black-Box Variational Inference]] - writes $\nabla\mathrm{ELBO}$ as an expectation and estimates it by Monte Carlo.
- [[Automatic Differentiation Variational Inference (ADVI)]] - the ELBO in unconstrained coordinates, with a Jacobian term.
- [[Reparameterization Trick and Variational Autoencoders]] - the fit-minus-complexity form as a training loss.
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] - replaces the uninformative ELBO value with a calibrated diagnostic.
- [[Variational Posterior Estimator (Barber-Agakov)]] - the same "replace an intractable posterior by $q$ and get a bound" move, applied to mutual information instead of evidence.

## See Also

- [[Lindley's Information Measure]] - expected KL from prior to posterior as the utility in Bayesian experimental design.
- [[Overfitting and Information Criteria]] - KL divergence as the basis of predictive accuracy and information criteria.
- [[Variational Marginal Estimator]] and [[Variational NMC Estimator]] - other variational bounds in the vault.
- [[Approximation Methods]] - BDA3's treatment of variational Bayes and EP.
