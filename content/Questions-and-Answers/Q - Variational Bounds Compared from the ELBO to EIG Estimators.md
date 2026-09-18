---
title: "Q: How do the ELBO, the Barber–Agakov posterior bound and the marginal / VNMC bounds on expected information gain, the contrastive PCE and ACE bounds, neural ratio estimation and the forward-KL objective of neural posterior estimation relate? Which direction of KL does each use, is each an upper or lower bound, and what failure does that choice cause?"
tags:
  - type/qa
  - topic/variational-inference
  - topic/bayesian-experimental-design
  - topic/likelihood-free-inference
  - topic/bayesian-statistics
date_asked: 2026-09-18
answered_from:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Mean-Field Family and Coordinate Ascent VI (CAVI)]]"
  - "[[Normalizing Flows for Variational Inference]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
  - "[[Variational Inference - Overview]]"
  - "[[Variational Inference and Pathfinder]]"
  - "[[Expected Information Gain]]"
  - "[[Nested Estimation and Nested Monte Carlo]]"
  - "[[Variational Posterior Estimator (Barber-Agakov)]]"
  - "[[Variational Marginal Estimator]]"
  - "[[Variational NMC Estimator]]"
  - "[[Implicit Likelihood Estimator]]"
  - "[[Convergence Rates and Estimator Selection]]"
  - "[[Adaptive Contrastive Estimation (ACE)]]"
  - "[[Prior Contrastive Estimation (PCE)]]"
  - "[[Likelihood-Free ACE and Gradient Estimation]]"
  - "[[High-Dimensional Design Applications]]"
  - "[[Neural Posterior Estimation (NPE)]]"
  - "[[Neural Ratio Estimation]]"
  - "[[Normalizing Flows as Conditional Density Estimators]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
related_questions:
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
aliases:
  - ELBO vs Barber-Agakov vs contrastive bounds
  - Forward vs reverse KL across VI, BOED and SBI
  - One table of variational bounds
---

# How do the ELBO, the Barber–Agakov, marginal and VNMC bounds on EIG, the contrastive PCE / ACE bounds, neural ratio estimation and NPE's forward-KL objective relate?

> [!summary]
> Every one of these objectives is the same identity, **intractable quantity = computable surrogate ± an expected KL**, obtained by replacing an intractable density with a learned $q$. Two things decide everything else. (1) *Which density the expectation is taken under*: under $q$ (reverse KL — ELBO, VAE, the $L{=}1$ VNMC bound) you need an evaluable target and you get zero-forcing, mode-seeking under-dispersion; under the true joint $p(\theta,y)$ (forward KL — Barber–Agakov, NPE, the marginal bound, ACE) you need only simulations and you get mass-covering over-dispersion. (2) *Whether $q$ replaces a numerator or a denominator*: replacing the posterior in the numerator gives a **lower** bound on EIG, replacing the marginal in the denominator gives an **upper** bound. NPE's loss *is* the Barber–Agakov bound up to the prior entropy; PCE is NMC with the generating sample added to the denominator, which flips NMC's upward bias into a lower bound that cannot exceed $\log(L+1)$.

## Answer

### 1. The shared move

[[The ELBO and KL Divergence Minimization]] gives the template: for any $q$,

$$
\log p(x)=\mathrm{ELBO}(q)+\mathrm{KL}\big(q(z)\,\|\,p(z\mid x)\big),
$$

so the ELBO is a lower bound on the evidence, tight iff $q$ is the posterior ([[The ELBO and KL Divergence Minimization#^thm-evidence-decomposition]]). That note already flags the Barber–Agakov estimator as "the same 'replace an intractable posterior by $q$ and get a bound' move, applied to mutual information instead of evidence."

The EIG has three equivalent forms ([[Expected Information Gain#^thm-eig-forms]]):

$$
\mathrm{EIG}(\xi)=\mathbb E_{p(\theta,y\mid\xi)}\Big[\log\frac{p(\theta\mid y,\xi)}{p(\theta)}\Big]=\mathbb E_{p(\theta,y\mid\xi)}\Big[\log\frac{p(y\mid\theta,\xi)}{p(y\mid\xi)}\Big],
$$

and it is *doubly* intractable: the posterior and the marginal are both unavailable, and both change with every $y$ ([[Nested Estimation and Nested Monte Carlo]]). Each estimator below substitutes a $q$ for one of them:

- **Posterior in the numerator → lower bound.** $\mathrm{EIG}-\mathcal L_{\text{post}}=\mathbb E_{p(y)}[\mathrm{KL}(p(\theta\mid y)\,\|\,q_p(\theta\mid y))]\ge0$ ([[Variational Posterior Estimator (Barber-Agakov)#^thm-ba-bound]]).
- **Marginal in the denominator → upper bound.** $\mathcal U_{\text{marg}}-\mathrm{EIG}$ is "an expected KL from the true marginal to its approximation", i.e. $\mathrm{KL}(p(y\mid d)\,\|\,q_m(y\mid d))$ ([[Variational Marginal Estimator#^thm-marg-bound]]).

Both gaps are **forward** KLs, because the outer expectation is always under the model's own joint $p(\theta,y\mid\xi)$ — which is why both are trained from simulations alone, and why the BA note can say no reparameterization is needed: the sampling distribution $p(y,\theta\mid d)$ does not depend on $\phi$.

### 2. The one table

| Objective | Surrogate inserted | Gap = which KL | Bound | Amortized over | Characteristic failure |
|---|---|---|---|---|---|
| **ELBO** (CAVI, ADVI, flows) | $q(z)$ for $p(z\mid x)$ | **reverse** $\mathrm{KL}(q\Vert p)$ | lower, on $\log p(x)$ | nothing — one optimisation per dataset | zero-forcing: mode-seeking, light tails, mean-field "underestimates marginal variances"; ELBO value is not a fit measure |
| **VAE / amortized ELBO** | encoder $q_\phi(z\mid x)$ | reverse, averaged over data | lower | data points $x$ | same, plus an **amortization gap** (network output is not the per-datum optimum) |
| **Barber–Agakov** $\mathcal L_{\text{post}}$ | $q_p(\theta\mid y,d)$ for the posterior | **forward** $\mathbb E_y\mathrm{KL}(p\Vert q_p)$ | **lower**, on EIG | all outcomes $y$ (and $d$) | family gap (term III) is permanent; a mass-covering $q_p$ is too diffuse, so EIG is *under*-stated; needs the density of the running posterior in sequential use |
| **NPE** | $q_\phi(\theta\mid x)$ | **forward** — identical loss | (its negative loss + prior entropy is $\mathcal L_{\text{post}}$) | all $x$ from the prior predictive | over-dispersion in the limit; in practice "a badly trained network returns a smooth, confident, wrong answer"; prior baked in; SNPE correction instabilities |
| **Marginal** $\mathcal U_{\text{marg}}$ | $q_m(y\mid d)$ for $p(y\mid d)$ | **forward**, in $y$-space | **upper**, on EIG | nothing (one density per design) | needs explicit likelihood; poor when $\dim y$ is large; an upper bound cannot be maximised jointly with the design |
| **NMC** | $\frac1M\sum_m p(y\mid\theta_m)$, prior draws | none (Jensen bias) | upward-biased, $\mathcal O(1/M)$; consistent | nothing | cost $NM$, rate $\mathcal O(C^{-1/3})$ with $M\propto\sqrt N$ |
| **VNMC** $\mathcal U_{\text{VNMC}}(L)$ | importance-weighted $\frac1L\sum p(\theta_\ell,y)/q_v$ | $\mathrm{KL}(\prod q_v\,\Vert\,\text{mixture})$ — **reverse-type**, under $q_v$ | **upper**; tight if $q_v$ exact *or* $L\to\infty$ | outcomes $y$ | an under-dispersed proposal gives heavy-tailed importance weights (*synthesis*, by the $\hat k$ logic); second stage falls back to $\mathcal O((NM)^{-1/3})$ |
| **ACE** $I_{ACE}(L)$ | same weights, but $\theta_0$ added to the denominator | $\mathrm{KL}(P(\theta_{0:L}\mid y)\,\Vert\,\prod q_\phi)$ — **forward-type** | **lower**; tight if $q_\phi$ exact *or* $L\to\infty$; $L{=}0$ is BA | outcomes $y$; trained jointly with $\xi$ | cost grows with $L$; gradient variance (score-function vs reparameterised) |
| **PCE** | ACE with $q_\phi=p(\theta)$ | forward-type, fixed proposal | **lower**; tight only as $L\to\infty$ | nothing — no $\phi$ at all | **$\log(L+1)$ saturation**; "degraded as dimension increased" |
| **Likelihood-free ACE** | unnormalised critic $f_\psi(\theta,y)$ | — | **lower** (Thm 2) | $y$, and the critic over $(\theta,y)$ | critic capacity; inherits the contrastive ceiling |
| **Implicit $\hat\mu_{m+\ell}$** | $q_\ell(y\mid\theta)$ and $q_m(y)$ | two forward-KL fits | **not a bound** — only $\lvert\text{error}\rvert$ is bounded (Lemma 2) | — | sign of the error unknown, so unsafe to maximise over designs |
| **NRE** | classifier logit for $\log\frac{p(x\mid\theta)}{p(x)}$ | cross-entropy, not a KL to the posterior | plug-in $\mathbb E[\log\hat r]$ is not a bound; the multi-class form is an InfoNCE lower bound (*synthesis*) | all $(x,\theta)$ pairs; MCMC is not amortised | classifier saturation; ratio "can take on an arbitrary value" off-support; trustworthy only where the training prior had mass |

### 3. Four relationships the table hides

**(a) NPE = Barber–Agakov.** NPE minimises $-\sum_n\log q_\phi(\theta_n\mid x_n)$ on prior-predictive pairs ([[Neural Posterior Estimation (NPE)]]); BA maximises $\mathbb E[\log q_p(\theta\mid y)-\log p(\theta)]$ on the same pairs. The vault states it directly: "the same amortized $q(\theta\mid y)$, trained by the same forward-KL objective". *Synthesis:* therefore $\mathcal L_{\text{post}}=\mathrm H[p(\theta)]-\mathcal L_{\text{NPE}}/N$ — any NPE network trained for ABM calibration hands you, for free, a lower bound on how informative that simulated dataset design is about $\theta$. Conversely, [[Normalizing Flows as Conditional Density Estimators]] gives the cleanest reason the two communities use opposite KLs: "VI has the density and lacks samples, so it uses reverse KL; SBI has samples … and lacks the density, so it uses forward KL."

**(b) NMC → VNMC → ACE → PCE is one estimator with two switches.** Switch one is the proposal (prior vs learned $q$); switch two is whether the generating sample $\theta_0$ sits in the denominator.

| | $\theta_0$ excluded | $\theta_0$ included |
|---|---|---|
| prior proposal | NMC (biased **up**) | PCE (**lower** bound) |
| learned proposal | VNMC (**upper** bound) | ACE (**lower** bound) |

Excluding $\theta_0$ makes the inner average an unbiased estimate of $p(y)$, and Jensen's inequality on the $\log$ pushes the EIG estimate up ([[Nested Estimation and Nested Monte Carlo]]). Including it "prevents the catastrophic under-estimation of $p(y\mid\xi)$" and yields a valid lower bound ([[Adaptive Contrastive Estimation (ACE)#^thm1-ace]]); the NMC note calls this "turning the NMC bias into a *controlled bound*". *Synthesis:* at $L=1$ the VNMC inner term is exactly a single-sample ELBO for $\log p(y\mid d)$, so $\mathcal U_{\text{VNMC}}(d,1)=\mathrm{EIG}+\mathbb E_y[\mathrm{KL}(q_v\Vert p(\theta\mid y))]$ — EIG plus an expected *reverse* KL, the mirror image of BA's EIG minus an expected *forward* KL. Larger $L$ is the importance-weighted (IWAE-style) tightening noted in [[Variational NMC Estimator#^lemma1-vnmc]].

**(c) Why contrastive bounds saturate.** *Synthesis — this is not stated in the vault notes.* In $I_{PCE}$ the denominator $\frac1{L+1}\sum_{\ell=0}^L p(y\mid\theta_\ell)$ contains the numerator's own term, so the integrand is at most $\log(L+1)$ and $I_{PCE}\le\log(L+1)$ whatever the true EIG. The same argument for ACE gives $I_{ACE}\le\log(L+1)+\mathcal L_{\text{post}}$: a learned proposal *lifts the ceiling by the BA value*. That is the quantitative content of the vault's qualitative remarks that PCE has only "case-2 tightness", "degraded as dimension increased", while ACE "generally does at least as well as the better of BA and PCE".

**(d) NRE is the critic view of the same quantity.** The optimal NRE logit is $\log p(x\mid\theta)/p(x)$, and [[Neural Ratio Estimation]] notes it "is the pointwise mutual information whose expectation is the expected information gain". PCE is "the experimental-design instance of InfoNCE with a known critic" (the likelihood) ([[Prior Contrastive Estimation (PCE)#^def-pce]]); likelihood-free ACE learns an unnormalised critic and keeps the bound ([[Likelihood-Free ACE and Gradient Estimation#^thm2-lface]]); multi-class NRE (Durkan et al.) learns $\log p(\theta\mid x)/p(\theta)$ by picking the right $\theta$ out of $K$ and is "closely related to the atomic SNPE-C/APT approach". So the binary-NRE loss is *not* a KL to the posterior and gives no bound direction; its multi-class cousin is a PCE-type lower bound with a learned critic and the same $\log K$ ceiling.

### 4. What the KL direction costs you

> [!theorem] Zero-forcing under reverse KL ([[The ELBO and KL Divergence Minimization#^thm-zero-forcing]])
> Reverse KL "penalizes placing mass in $q(\cdot)$ on areas where $p(\cdot)$ has little mass, but penalizes less the reverse". Consequences: variance underestimation for factorised $q$, mode-seeking against multimodal targets, lighter tails than the posterior.

- **Reverse KL is local.** On $0.8\,\mathcal N(0,0.2)+0.2\,\mathcal N(3,0.2)$ a Gaussian $q$ sits on one mode with KL $\approx0.22$ nats while missing 20% of the mass, and $\hat k$ computed from $q$'s samples is blind to it ([[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]). Richer families ([[Normalizing Flows for Variational Inference]]) shrink the family gap but keep the direction.
- **It is not always under-dispersed.** On centred eight schools ADVI *over*-estimates every $\theta_j$'s sd; "VI uncertainty is unreliable in an unknown direction" ([[Variational Inference - Overview]]). [[Variational Inference and Pathfinder]]: "which divergence works best depends on the inferential task at hand."
- **Forward KL** "is mass-covering and moment-matching but requires expectations under the unknown posterior" — which simulation supplies. The flows note adds (flagged there as a standard observation, not from its source) that it "tends to over-cover … for a posterior approximation, over-dispersion is usually the less harmful error."
- **For EIG the direction changes the *decision*, not just the interval.** *Synthesis:* a lower bound with a forward-KL gap is loosest at designs whose posteriors are hardest for the family (multimodal, funnel-shaped), so maximising BA over $\xi$ can prefer designs that are merely *easy to amortise*. ACE's extra samples and the ACE-lower / VNMC-upper sandwich exist to remove that confound: "if design $A$'s lower bound exceeds design $B$'s upper bound, $A$ is provably superior" ([[High-Dimensional Design Applications]]).
- **Error budget.** Total error $\le$ MC variance ($N^{-1/2}$) + optimisation ($K^{-1/2}$) + family gap (constant); only VNMC — and ACE/PCE via $L$ — can drive the third term to zero without a bigger family ([[Convergence Rates and Estimator Selection]]).

### Practical Implications

**Decision rule**

1. *Have a differentiable log-density, want a posterior fast* (MMM prototyping): reverse-KL VI or Pathfinder, then PSIS $\hat k$ ($<0.5$ good, $>0.7$ unreliable). Treat ADVI ROAS intervals as wrong in an unknown direction; never rank models by ELBO.
2. *Simulator only* (ABM calibration): forward KL — NPE with a flow, or NRE when a classifier is easier than a density and MCMC is acceptable. Validate with SBC / coverage, since the asymptotic over-dispersion story does not protect a badly trained network.
3. *Scoring a fixed set of geo-test designs:* if $\theta$ (lift, ROAS) is low-dimensional and $y$ (geo × week panel) is high-dimensional use the posterior family (BA / ACE); in the opposite case use the marginal. With geo random effects the likelihood is implicit → $\hat\mu_{\text{post}}$ or likelihood-free ACE; use $\hat\mu_{m+\ell}$ only to *score*, never to *optimise*, because it has no bound direction.
4. *Optimising a continuous design by gradient:* needs a lower bound — ACE by default, PCE if the prior is an adequate proposal and dimension is low.
5. *Sizing $L$:* you need $L+1\gg e^{\mathrm{EIG}}$. An experiment expected to deliver 3 nats needs $L\gg20$; 6 nats needs $L\gg400$. If PCE values cluster near $\log(L+1)$, the estimate is the ceiling, not the design.
6. *Before acting on a comparison:* sandwich the finalists with ACE (lower) and VNMC (upper); spend roughly 50–90% of the budget on training $\phi$ (Foster 2019, Fig. 1d).

**Checklist for any new "variational" objective:** under which distribution is the expectation taken (→ density or samples needed; → which tail error)? Does $q$ replace a numerator or a denominator (→ bound direction; → can it be maximised over designs)? What is amortised, and is there an amortisation gap? Is there a second route to tightness (more inner samples), and does it have a ceiling?

## Source Notes

| Note | Relevance |
|------|-----------|
| [[The ELBO and KL Divergence Minimization]] | Evidence decomposition, zero-forcing, bimodal example, ELBO value caveats |
| [[Mean-Field Family and Coordinate Ascent VI (CAVI)]], [[Normalizing Flows for Variational Inference]], [[Reparameterization Trick and Variational Autoencoders]] | Family restrictions, richer families, amortisation gap |
| [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]], [[Variational Inference - Overview]], [[Variational Inference and Pathfinder]] | $\hat k$ thresholds, locality, eight-schools over-dispersion, choice of divergence |
| [[Expected Information Gain]], [[Nested Estimation and Nested Monte Carlo]] | EIG forms, double intractability, NMC bias and $C^{-1/3}$ rate |
| [[Variational Posterior Estimator (Barber-Agakov)]], [[Variational Marginal Estimator]], [[Variational NMC Estimator]], [[Implicit Likelihood Estimator]] | The four Foster-2019 estimators, their gaps and bound directions |
| [[Convergence Rates and Estimator Selection]] | Three-term error decomposition, selection rules, budget split |
| [[Adaptive Contrastive Estimation (ACE)]], [[Prior Contrastive Estimation (PCE)]], [[Likelihood-Free ACE and Gradient Estimation]], [[High-Dimensional Design Applications]] | Contrastive lower bounds, InfoNCE link, bound trapping |
| [[Neural Posterior Estimation (NPE)]], [[Neural Ratio Estimation]], [[Normalizing Flows as Conditional Density Estimators]], [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]] | Forward-KL training from simulations, ratio trick, failure modes and diagnostics |

## Related Concepts

- [[Lindley's Information Measure]] — expected prior-to-posterior KL, the utility all the EIG bounds target
- [[Unified SGD BOED - Overview]] and [[Variational BOED - Overview]] — the two Foster papers these bounds come from
- [[Amortized vs Sequential Inference]] — what is lost when proposals are adapted to one $x_o$
- [[Neural Likelihood Estimation and Sequential Neural Likelihood]] — the likelihood-targeting alternative, analogue of $q_\ell$ in $\hat\mu_{m+\ell}$
- [[Approximation Methods]] — expectation propagation as the classical forward-KL-inspired method
- [[Simulation-Based Calibration - Overview]] — the diagnostic that applies to every amortised $q$ here
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — where these estimators get used
- [[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]] — NPE vs NRE vs NLE in practice

## Gaps

- **The $\log(L+1)$ ceiling of PCE/InfoNCE is not stated anywhere in the vault**; §3(c) derives it, and the ACE variant, as synthesis. The Poole et al. (2019) / McAllester–Stratos analysis of variational MI bounds is not ingested.
- **No note on IWAE / multi-sample ELBOs**; the VNMC note mentions the parallel in one line. The $L{=}1$ identity in §3(b) is synthesis.
- **Bound status of NRE** (binary loss vs the multi-class contrastive loss) is asserted here by analogy; the vault's NRE note summarises Durkan et al. second-hand and does not give the loss.
- **MINE / NWJ / Donsker–Varadhan critics** appear only as a pointer to Kleinegesse & Gutmann; there is no comparison of their bias–variance behaviour.
- **Empirical direction of NPE miscalibration** under finite simulation budgets (over- vs under-confidence) is not covered beyond the general warning in the benchmarking note; the mass-covering claim is itself flagged in the flows note as not from its source.
- Expectation propagation and $\alpha$-/Rényi divergences — the interpolants between the two KL directions — have only passing coverage.

## Follow-Up Questions

- Can an NPE network trained for ABM calibration be reused as the $q_p$ in a BA/ACE bound to choose *which* summary statistics or data sources to collect?
- For a geo-holdout with hierarchical geo effects, how large is the BA family gap with a Gaussian vs a flow $q_p$, and does it change the ranking of designs?
- How does randomised MLMC (unbiased EIG) compare with the ACE/VNMC sandwich at equal budget?
- Does PSIS $\hat k$ applied to $q_v$ predict when VNMC's second stage will be unstable?
