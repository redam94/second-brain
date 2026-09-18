---
title: Variational Inference - Index
tags:
  - type/index
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
parent: "[[Research/Bayesian Statistics/Computation/_Index|Computation]]"
---

# Variational Inference - Index

> [!abstract] Routing Summary
> A dedicated treatment of variational inference: the objective (ELBO / reverse KL), the classical mean-field + coordinate-ascent recipe, stochastic and black-box gradients, ADVI as implemented in Stan and PyMC, the reparameterization trick and variational autoencoders, normalizing-flow posteriors, and the PSIS $\hat k$ / VSBC diagnostics. Anchored by Blei, Kucukelbir & McAuliffe (2017), Kucukelbir et al. (2017), Kingma & Welling (2013), Yao et al. (2018), Ranganath et al. (2014) and Rezende & Mohamed (2015). Fills Dream gap #33 and explains the ADVI failure recorded in [[SBC Case Studies]].
>
> - Need the big picture, VI vs MCMC, or when VI is appropriate for MMM / geo models? → [[Variational Inference - Overview]]
> - Need the ELBO derivation, its three forms, the EM link, or why reverse KL is mode-seeking? → [[The ELBO and KL Divergence Minimization]]
> - Need the mean-field update, CAVI, the Gaussian-mixture example, or *why VI underestimates variance*? → [[Mean-Field Family and Coordinate Ascent VI (CAVI)]]
> - Need the closed-form variance shrinkage $1/\Lambda_{jj}$ and the linear-regression slope calculation? → [[Mean-Field Family and Coordinate Ascent VI (CAVI)#^ex-mf-gaussian|mean-field fit to a correlated Gaussian]]
> - Need SVI (natural gradients, data subsampling) or the score-function estimator with variance reduction? → [[Stochastic and Black-Box Variational Inference]]
> - Need how Stan / PyMC ADVI works, mean-field vs full-rank, step sizes, or transformation sensitivity? → [[Automatic Differentiation Variational Inference (ADVI)]]
> - Need the reparameterization trick, amortized inference, the VAE objective, or VAE as nonlinear PPCA? → [[Reparameterization Trick and Variational Autoencoders]]
> - Need richer-than-Gaussian variational families (planar / radial flows)? → [[Normalizing Flows for Variational Inference]]
> - Need to know whether a VI fit can be trusted ($\hat k$ thresholds, VSBC, eight-schools and horseshoe failures)? → [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| VI as optimization; VI vs MCMC | [[Variational Inference - Overview]] | overview | Introduction to Bayesian Computation; MCMC Basics | $q^*=\arg\min_{q\in\mathcal Q}\mathrm{KL}(q\,\Vert\,p(z\mid x))$; fast, scalable, biased uncertainty; must be diagnosed |
| ELBO and reverse KL | [[The ELBO and KL Divergence Minimization]] | concept | Overview | $\log p(x)=\mathrm{KL}+\mathrm{ELBO}$; ELBO $=\mathbb E_q[\log p(x\mid z)]-\mathrm{KL}(q\Vert p(z))$; zero-forcing; ELBO value is not a fit measure |
| Mean-field family and CAVI | [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] | method | ELBO | $q_j^*\propto\exp\{\mathbb E_{-j}[\log p(z_j\mid z_{-j},x)]\}$; Gaussian target gives $\operatorname{Var}_q=1/\Lambda_{jj}\le(\Lambda^{-1})_{jj}$ |
| SVI and BBVI | [[Stochastic and Black-Box Variational Inference]] | method | ELBO; CAVI | Natural gradient $=\mathbb E_\varphi[\hat\alpha]-\lambda$; score-function gradient; Rao-Blackwellization and control variates |
| ADVI | [[Automatic Differentiation Variational Inference (ADVI)]] | method | ELBO; CAVI; BBVI; Reparameterization | Transform to $\mathbb R^K$ + Gaussian + standardization + autodiff; mean-field variances 0.13 vs true 0.28; optimal $T^*=\Phi^{-1}\circ P$ |
| Reparameterization trick and VAE | [[Reparameterization Trick and Variational Autoencoders]] | method | ELBO; BBVI; Factor Analysis and PPCA | $z=g_\phi(\epsilon,x)$ makes the MC ELBO differentiable; amortized encoder; VAE = nonlinear PPCA with variational E-step |
| Normalizing-flow posteriors | [[Normalizing Flows for Variational Inference]] | method | ELBO; Reparameterization; ADVI | $\ln q_K=\ln q_0-\sum_k\ln\lvert1+u_k^\top\psi_k\rvert$; $O(D)$ planar/radial flows; MNIST bound 89.9 → 85.1 |
| Diagnostics | [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] | method | ELBO; ADVI; SBC; Cross Validation Checking | $\hat k<0.5$ good, $<0.7$ usable, $>0.7$ unreliable; VSBC symmetry test; VI can over- *or* under-disperse |

## Notes

- [[Variational Inference - Overview]] — CONTAINS: VI problem definition, VI-vs-MCMC table, intractable-evidence example (GMM), four generations of VI, explanation of the SBC/ADVI slope failure, theory summary, relevance to MMM / geo-hierarchical models / BOED / ABMs, practical decision procedure.
- [[The ELBO and KL Divergence Minimization]] — CONTAINS: reverse KL definition, ELBO definition, evidence decomposition theorem and Jensen derivation, three readings (energy+entropy, fit−complexity, evidence−gap), EM and variational EM, support constraint / zero-forcing / light tails, forward KL and EP, why ELBO is not a fit or model-selection measure, bimodal example, Monte Carlo ELBO code.
- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] — CONTAINS: mean-field family, optimal coordinate update with proof sketch, CAVI algorithm, Gibbs / message-passing connection, exponential-family and conditionally conjugate updates, local optima and log-sum-exp, accuracy theory (Wang & Titterington), correlated-Gaussian and linear-regression variance derivation, GMM updates with numpy code.
- [[Stochastic and Black-Box Variational Inference]] — CONTAINS: Robbins-Monro conditions, natural gradient of the ELBO, SVI algorithm, score-function gradient theorem, Rao-Blackwellization, control variates, score-vs-reparameterization comparison table, BBVI code, kidney-disease case study.
- [[Automatic Differentiation Variational Inference (ADVI)]] — CONTAINS: differentiable-model class, constraint transforms and Jacobian, mean-field vs full-rank Gaussian, ELBO in unconstrained space, elliptical standardization, gradient formulas, Algorithm 1 with step-size sequence, accuracy experiments (2-D Gaussian, logistic, stochastic volatility), transformation sensitivity and optimal transform, speed benchmarks, PyMC / CmdStanR usage, open issues.
- [[Reparameterization Trick and Variational Autoencoders]] — CONTAINS: per-datapoint bound, reparameterization theorem and the three constructions, SGVB estimators A and B, AEVB algorithm, Gaussian-encoder VAE and closed-form KL, autoencoder interpretation, amortization and the amortization gap, VAE-vs-PPCA table, MNIST / Frey Face results, PyTorch VAE, links to non-centered parameterization.
- [[Normalizing Flows for Variational Inference]] — CONTAINS: change-of-variables flow density, LOTUS, planar and radial flows with $O(D)$ determinants, flow free-energy bound, infinitesimal (Langevin / Hamiltonian) flows, NICE and HVI as special cases, 2-D / MNIST / CIFAR results, annealing, planar-flow PyTorch code, caveats.
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] — CONTAINS: two levels of diagnostics, PSIS definition, $k$ as Renyi-divergence finiteness, PSIS diagnostic algorithm and thresholds, reparameterization invariance, why marginal $\hat k$ misleads, VSBC algorithm and symmetry proposition, four case studies (linear, logistic, eight schools, horseshoe), locality limitation, ArviZ code, applied decision rule.

## External / Cross-Folder Links

- [[Variational Inference and Pathfinder]] — Bayesian Workflow book section on VI families, divergences and Pathfinder (distinct note; complements this cluster).
- [[Approximation Methods]] — BDA3 Ch. 13: Laplace, variational Bayes, EP.
- [[Approximate Algorithms and Approximate Models]], [[Approximations Based on Joint and Conditional Posterior Modes]] — workflow-level framing of approximate computation.
- [[MCMC Basics]], [[Efficient MCMC]], [[HMC and Stan in Practice]] — the exact alternatives.
- [[Simulation-Based Calibration - Overview]], [[SBC Case Studies]], [[Interpreting SBC Histograms]], [[Cross Validation Checking]] — calibration and PSIS machinery reused by the diagnostics.
- [[Hierarchical Models]], [[Computational Troubleshooting]] — funnel geometry and non-centering.
- [[Factor Analysis and PPCA]] — linear-Gaussian special case of the VAE.
- [[Variational BOED - Overview]], [[Variational Posterior Estimator (Barber-Agakov)]], [[Variational Marginal Estimator]] — variational bounds for expected information gain.
- [[Normalizing Flows as Conditional Density Estimators]], [[Neural Simulation-Based Inference - Overview]], [[Simulation-Based and Amortized Inference]] — amortized neural posteriors for simulators.
- [[Bayesian Media Mix Modeling - Overview]] — applied context where ADVI is commonly (mis)used.

## Sources

- [[raw/Blei 2017 - Variational Inference A Review for Statisticians.pdf]] — Blei, D. M., Kucukelbir, A. & McAuliffe, J. D. (2017), "Variational Inference: A Review for Statisticians," *JASA* 112(518). arXiv:1601.00670.
- [[raw/Kucukelbir 2017 - Automatic Differentiation Variational Inference.pdf]] — Kucukelbir, A., Tran, D., Ranganath, R., Gelman, A. & Blei, D. M. (2017), "Automatic Differentiation Variational Inference," *JMLR* 18. arXiv:1603.00788.
- [[raw/Kingma 2013 - Auto-Encoding Variational Bayes.pdf]] — Kingma, D. P. & Welling, M. (2013/2014), "Auto-Encoding Variational Bayes," ICLR. arXiv:1312.6114.
- [[raw/Yao 2018 - Yes but Did It Work Evaluating Variational Inference.pdf]] — Yao, Y., Vehtari, A., Simpson, D. & Gelman, A. (2018), "Yes, but Did It Work?: Evaluating Variational Inference," ICML, PMLR 80. arXiv:1802.02538.
- [[raw/Ranganath 2014 - Black Box Variational Inference.pdf]] — Ranganath, R., Gerrish, S. & Blei, D. M. (2014), "Black Box Variational Inference," AISTATS. arXiv:1401.0118.
- [[raw/Rezende 2015 - Variational Inference with Normalizing Flows.pdf]] — Rezende, D. J. & Mohamed, S. (2015), "Variational Inference with Normalizing Flows," ICML. arXiv:1505.05770.
