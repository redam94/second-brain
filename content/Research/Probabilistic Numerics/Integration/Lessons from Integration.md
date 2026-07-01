---
title: Lessons from Integration
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/overview
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 12-13, pp. 107-121"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[The Integration Problem]]"
  - "[[Bayesian Quadrature]]"
  - "[[Classical Quadrature as Inference]]"
  - "[[Convergence and Priors in Bayesian Quadrature]]"
  - "[[Active Bayesian Quadrature and Bayesian Monte Carlo]]"
used_by:
  - "[[Probabilistic Numerics - Overview]]"
aliases:
  - Probabilistic Numerical Lessons from Integration
  - Why Be Probabilistic
  - Monte Carlo as Inference
  - A Meditation on Randomness
---

# Lessons from Integration

> [!summary]
> Integration is the pedagogical prototype that establishes the transferable design lessons of Probabilistic Numerics: (1) classical methods are MAP estimators under hidden priors, so PN is *no worse* than classical numerics; (2) priors encode assumptions, and good bespoke priors beget efficient, trustworthy bespoke methods; (3) meaningful error bars require good priors plus runtime calibration; (4) PN can be as *fast* as classical methods, and modelling cost is an *investment*; and (5) even Monte Carlo is a probabilistic method under a degenerate white-noise prior — from which the contentious conclusion follows that injecting random numbers into a deterministic computation is generally a bad idea.

## Overview

This note gathers the "so what" of Part II: the intuitions that will inform the rest of the book (linear algebra, optimisation, ODEs). Having shown in [[Classical Quadrature as Inference]] that trapezoid/spline/Gauss rules are Bayesian, and in [[Active Bayesian Quadrature and Bayesian Monte Carlo]] that a purpose-built probabilistic integrator (WSABI) can outrun stochastic competitors, the chapter draws general conclusions and — provocatively — argues *against* stochasticity by exhibiting even Monte Carlo as inference under an extreme prior. The recurring three-part thesis of Part II is made explicit here: solvers are agents; classical rules are posterior means; posterior variance gives calibrated error bars and drives active design.

## Main Content

### Why be probabilistic?

> [!definition] The four lessons of Part II (Ch. 13 summary)
> 1. **Classical methods can be re-framed as probabilistic.** Elementary numerical methods are MAP estimates under equally elementary priors; the trapezoidal rule is the MAP estimate under a Wiener-process prior on the integrand (see [[Classical Quadrature as Inference]]).
> 2. **Design policies arise naturally.** Regular-grid node placement emerges as the choice minimising posterior variance over the integral (see [[Convergence and Priors in Bayesian Quadrature]]).
> 3. **Prior knowledge begets bespoke methods.** The general recipe — a joint generative model (prior + likelihood) for the latent quantity and the computable data, plus an action rule from a loss function — customises numerical methods to a task (see [[The Integration Problem]]).
> 4. **Meaningful error measures require good priors.** The prior sets the *scale* of the posterior; hierarchical inference calibrates it at runtime. Calibration is *epistemic*: it assumes unobserved parts of the problem resemble observed ones.
> ^def-four-lessons

Because classical methods *are* implicitly probabilistic, the probabilistic approach is *at least no worse* than the classical one: just as lightweight, performant, and reliable — and it additionally exposes the model choice $(m,k)$ to the user, which is the strongest argument for PN. Getting that choice right (as in WSABI) yields methods both **more efficient** and **more trustworthy**. The RKHS lens (see [[Kernel Quadrature and Kernel Means]]) adds analytical tools; samples from the GP are explicit and interpretable.

### Probabilistic Numerics can be fast; modelling is an investment

Assigning a posterior distribution to a numerical task need not cost significantly more than classical point estimation — the Bayesian trapezoidal rule runs in $\mathcal O(N)$, identical to its classical twin, with uncertainty at almost the same cost (see [[Classical Quadrature as Inference]] ^thm-trapezoid-filter). Moreover, adaptive schemes like WSABI are *legitimately faster* than alternatives. The lesson: frame computation spent on probabilistic modelling as an **investment** that returns dividends in fewer, better-placed evaluations — not as overhead. This is especially compelling when each integrand evaluation is expensive (a large dataset, a costly simulation, a physical experiment).

### Monte Carlo as probabilistic inference

Even Monte Carlo — the archetypal *stochastic* method — is a probabilistic method under an extreme prior. Assume the integrand is "white noise" with unknown constant mean:
$$
f(x)\sim\mathcal{GP}(m,k(x,x')),\quad k(x,x')=\theta^2\mathbb 1(x=x'),\ p(m)=\mathcal N(m;0,c^{-1}).
$$
Marginalising $m$ gives $p(f\mid c)=\mathcal{GP}(0,\ k(x,x')+c^{-1})$. Conditioning on evaluations and taking the improper limit $c\to0$ ("total ignorance" about $m$):

> [!theorem] Theorem 12.1 (Monte Carlo is MAP under a white-noise prior)
> The Monte Carlo estimate is the limit as $c\to0$ of the MAP estimate under the prior
> $$
> p(f)=\mathcal{GP}\big(0,\ \theta^2\mathbb 1(x=x')+c^{-1}\big),\qquad \theta\in\mathbb R_+.
> $$
> The posterior mean and variance of $F=\int_a^b f\,\mathrm dx$ become
> $$
> \mathbb E_{\mid X,Y}(F)=\frac{b-a}{N}\sum_{i=1}^N y_i,\qquad \operatorname{var}_{\mid X,Y}(F)=\frac{\theta^2(b-a)^2}{N},
> $$
> matching the Monte Carlo estimator and its $\mathcal O(N^{-1})$-variance ($\mathcal O(N^{-1/2})$ std) rate. Under this prior **any** non-overlapping design $X$ gives the *same* posterior variance on $F$.
> ^thm-mc-as-inference

**The moral of the white-noise prior.** Because the kernel $\mathbb 1(x=x')$ asserts that function values are *entirely uncorrelated*, a value at one location says nothing about its neighbours — the weakest possible model. This is why Monte Carlo (a) is dimension-independent (it makes minimal modelling assumptions, gleaning almost nothing per evaluation, so it needs staggeringly many evaluations) and (b) is indifferent to node placement. Monte Carlo's celebrated dimension-independence is not "equally good in all dimensions" but rather "**equally bad**": "if you want your convergence rate to be independent of problem dimension, do your integration with Monte Carlo" is "much like ... if you want your nail-hammering to be independent of wall hardness, do your hammering with a banana."

### When randomness helps or hurts

> [!definition] Generic arguments against a PRNG (Ch. 12.3)
> A pseudo-random number generator (1) has **no coherent decision-theoretic motivation** — using a PRNG asserts the expected-loss surface is uniformly flat, i.e. that the computation is completely insensitive to its output, almost never true when symmetry-breaking forces make some outputs better; (2) is **worse at exploration** than a model-based probabilistic approach — a PRNG uses neither knowledge of $f$ nor memory of past choices, extreme self-imposed constraints given that we usually have strong priors and cheap memory; (3) is **more computationally expensive** — a PRNG (e.g. Mersenne Twister needs 2.5 kB of state) is not free, and its output cannot be reused as an investment; (4) **muddles subjectivity and bias** — "unbiased" borrows unearned virtue from the unrelated everyday sense of "bias"; PN unashamedly *encourages* (inductive) bias through useful priors.
> ^def-anti-prng

Even the general white-noise (Monte Carlo) model converges *faster* with non-random nodes: on a regular grid $X=[a,a+h,\dots]$ with $h=(b-a)/N$, the mean estimate is the **Riemann sum** $h\sum_i f(x_i)$, which for Lipschitz-continuous $f$ converges at the *linear* rate $\mathcal O(N^{-1})$ — better than the stochastic $\mathcal O(N^{-1/2})$. This is the heart of **quasi-Monte Carlo (QMC)**: unit-weight rules with carefully-designed *low-discrepancy* (non-random) nodes, whose analysis uses RKHS hypothesis spaces and connects to Bayesian quadrature (see [[Kernel Quadrature and Kernel Means]]). Even if we cannot assume regularity, using a regular grid loses nothing and helps if the integrand happens to be continuous — hence "it is generally a bad idea to introduce random numbers into an otherwise deterministic computation."

> [!example] Which sequence is random?
> The chapter presents five digit-strings and reveals: dice-throws (unpredictable but *fail* randomness tests → MC using them does *not* converge at $\mathcal O(N^{-1/2})$); digits of $\pi$ (structureless, fine for MC — unless you tell your reviewer where they came from); a von Neumann PRNG with a *known seed* (now fully deterministic); Marsaglia CD digits; and coin-flips from an unstated drop height. Conclusion: **randomness is a subjective property** — it depends on what "we" and "you" know. The argument for MC rests entirely on the *user not knowing the PRNG seed*, which shows computation is fundamentally conditional on prior knowledge.

**Adversarial defence — the one caveat.** If an adversary knows your exact deterministic quadrature code, they can craft a Riemann-integrable integrand that fools it; MC's random nodes guarantee convergence regardless. But users of numerical methods are typically *not* adversaries — the relationship is the opposite (users tailor problems to suit methods), and virtually all MC in practice uses PRNGs (not "real" randomness), so the adversarial argument is weak.

### Randomness and reproducibility

In reinforcement learning, the random seed is empirically significant to performance; but the seed is *not a feature of the problem*. Treating a seed as a random variable to be averaged over "renders our performance unimprovable" — the sole purpose of a PRNG is to make the outcome an *unpredictable* function of the seed, defeating scientific inquiry into the mechanism. PN prefers explicitly-constructed models of what to explore ($-f(x)$) over painfully-dumb random exploration.

### Further reading and software

- **Software:** `emukit` (outer-loop BQ incl. WSABI-L) and `ProbNum` (probnum.org; surrogate models + BQ under development).
- **Quasi-Monte Carlo:** unit-weight low-discrepancy rules; analysis via RKHS (Dick, Kuo & Sloan 2013), good high-dimensional rates.
- **Closely related:** kernel herding and kernel quadrature (Chen–Welling–Smola; Huszár–Duvenaud; Bach), which allow the kernel to shrink with $N$ — incompatible with a strict prior (see [[Kernel Quadrature and Kernel Means]]).

## Connections

- **Synthesises** [[The Integration Problem]], [[Bayesian Quadrature]], [[Classical Quadrature as Inference]], [[Convergence and Priors in Bayesian Quadrature]], and [[Active Bayesian Quadrature and Bayesian Monte Carlo]].
- **Theorem 12.1** parallels [[Classical Quadrature as Inference]] ^thm-trapezoid (Monte Carlo as the *weakest*-prior member of the same BQ family that contains the trapezoidal rule as a stronger-prior member).
- **Feeds** the whole-book perspective of [[Probabilistic Numerics - Overview]]: the same lessons recur in linear algebra, optimisation, and ODEs.

## See Also
- [[The Integration Problem]] — the task these lessons generalise from.
- [[Classical Quadrature as Inference]] — the "classical methods are MAP estimators" lesson in full.
- [[Active Bayesian Quadrature and Bayesian Monte Carlo]] — "computation as investment" in practice.
- [[Convergence and Priors in Bayesian Quadrature]] — the calibration lesson.
- [[Probabilistic Numerics - Overview]] — where these transferable lessons reappear across Parts III-V.
