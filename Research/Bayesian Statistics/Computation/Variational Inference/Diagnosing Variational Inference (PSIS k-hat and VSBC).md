---
title: Diagnosing Variational Inference (PSIS k-hat and VSBC)
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/bayesian-workflow
  - topic/model-checking
  - type/method
  - method/stan
  - doc/paper
source: "[[raw/Yao 2018 - Yes but Did It Work Evaluating Variational Inference.pdf]]"
source_location: "Sec. 1; Sec. 2 (Eqs. 2-4, Alg. 1, Prop. 1); Sec. 3 (Alg. 2, Prop. 2); Sec. 4.1-4.4 (Figs. 1-8); Sec. 5"
date_ingested: 2026-09-18
folder: "Bayesian Statistics/Computation/Variational Inference"
doc_type: paper
depends_on:
  - "[[The ELBO and KL Divergence Minimization]]"
  - "[[Automatic Differentiation Variational Inference (ADVI)]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Cross Validation Checking]]"
  - "[[Introduction to Bayesian Computation]]"
used_by:
  - "[[Variational Inference - Overview]]"
aliases:
  - PSIS Diagnostic for Variational Inference
  - Pareto k-hat Diagnostic for VI
  - VSBC
  - Variational Simulation-Based Calibration
  - Evaluating Variational Inference
---

# Diagnosing Variational Inference (PSIS k-hat and VSBC)

> [!summary]
> "While it's always possible to compute a variational approximation to a posterior distribution, it can be difficult to discover problems with this approximation" (Yao, Vehtari, Simpson & Gelman 2018). The [[The ELBO and KL Divergence Minimization|ELBO]] cannot tell you: it lives on an uninterpretable, parameterization-dependent scale. The paper proposes two complementary checks. **PSIS $\hat k$:** treat $q$ as an importance-sampling proposal for the posterior, fit a generalized Pareto distribution to the largest ratios $p(\theta_s,y)/q(\theta_s)$, and read the shape $\hat k$ as a measure of joint discrepancy; $\hat k<0.5$ good, $0.5$-$0.7$ usable, $>0.7$ unreliable. When $\hat k$ is small, the same smoothed weights *correct* the VI estimate. **VSBC:** a simulation-based-calibration variant that tests whether VI *point estimates* are unbiased on average over the prior, via the symmetry of calibration-probability histograms.

## Overview

There are two levels of VI diagnostics (Sec. 1). The first is **convergence** of the optimizer to a local optimum, assessed by monitoring ELBO changes or held-out predictive density. The second, the subject of this note, is whether the converged $q^*(\theta)$ "is close enough to the true posterior $p(\theta\mid y)$ to be used in its place." VI can be flawed through "slow convergence of the optimization problem, the inability of the approximation family to capture the true posterior, the asymmetry of the true distribution, the fact that the direction of the KL divergence under-penalizes approximation with too-light tails, or all these reasons."

The two diagnostics answer different questions:

| | PSIS $\hat k$ | VSBC |
|---|---|---|
| Target | the **joint** approximation, for the **observed** data set | **marginal point estimates**, **averaged** over data sets from the prior predictive |
| Cost | one VI fit + $S$ joint-density evaluations | $M$ simulated data sets and $M$ VI fits |
| Passing means | $q$ is a usable importance proposal; VI estimates can be corrected | centre of $q$ is unbiased on average (if model is well specified) |
| Blind to | modes that $q$ never visits | failures specific to the realized data; model misspecification |

## Main Content

### PSIS as a diagnostic

With draws $\theta_1,\dots,\theta_S\sim q$, define ratios and a family of estimators
$$
r_s=\frac{p(\theta_s,y)}{q(\theta_s)},\qquad\mathbb E_p[h(\theta)]\approx\frac{\sum_{s=1}^Sh(\theta_s)\,w_s}{\sum_{s=1}^Sw_s}
$$
(Eqs. 2-3). $w_s\equiv1$ is the plain VI estimate: low variance, biased "to an unknown extent and inconsistent." $w_s=r_s$ is [[Introduction to Bayesian Computation|importance sampling]]: consistent, but with possibly infinite variance, because a reverse-KL $q$ "has a lighter tail than $p(\theta\mid y)$ as a result of entropy penalization, which lead[s] to a heavy right tail of $r_s$."

> [!definition] Pareto smoothed importance sampling ^def-psis
> Fit a generalized Pareto distribution to the $M=\min(S/5,\,3\sqrt S)$ largest ratios, report the estimated shape $\hat k$, replace those $M$ ratios "by their expected value under the fitted generalized Pareto distribution," leave the rest unchanged, and truncate all weights at the raw maximum. The smoothed weights $w_s$ give lower mean squared error than plain or truncated IS (Sec. 2.1; Vehtari et al. 2017). This is the same PSIS used for leave-one-out cross-validation in [[Cross Validation Checking]], with the variational $q$ in place of the full-data posterior as the proposal.

> [!theorem] What $k$ measures ^thm-k-renyi
> A generalized Pareto with shape $k$ has finite moments up to order $1/k$, so $\hat k$ estimates
> $$
> k=\inf\Big\{k'>0:\ \mathbb E_q\Big[\Big(\frac{p(\theta\mid y)}{q(\theta)}\Big)^{1/k'}\Big]<\infty\Big\}=\inf\big\{k'>0:\ D_{1/k'}(p\,\|\,q)<\infty\big\},
> $$
> where $D_\alpha(p\|q)=\frac1{\alpha-1}\log\int p^\alpha q^{1-\alpha}\,d\theta$ is the Renyi divergence (Eq. 4). Hence:
> - $k>0.5$: the $\chi^2$ divergence is infinite (IS variance infinite);
> - $k>1$: $D_1(p\|q)=\mathrm{KL}(p\|q)=\infty$, "indicating a disastrous VI approximation, despite the fact that $\mathrm{KL}(q,p)$ is always minimized among the variational family";
> - $k<1/3$: Berry-Esseen gives an even faster approach to normality.
>
> Theoretically $k<1$ always (since $\mathbb E_q[p(\theta\mid y)/q(\theta)]$ is finite), but finite-sample $\hat k$ can exceed 1. $\hat k$ is invariant to multiplicative constants, which is why the unnormalized $p(\theta,y)$ suffices.

> [!algorithm] PSIS diagnostic (Yao et al., Algorithm 1) ^alg-psis-diagnostic
> 1. Run VI to obtain $q(\theta)$; draw $\theta_s\sim q$, $s=1,\dots,S$.
> 2. Compute $r_s=p(\theta_s,y)/q(\theta_s)$ (in practice $\log r_s$).
> 3. Fit the generalized Pareto to the $M$ largest $r_s$; report $\hat k$.
> 4. **If $\hat k<0.5$:** $q$ is close to the posterior; use PSIS weights to refine estimates. **If $0.5<\hat k<0.7$:** "not perfect but still useful"; use PSIS weights. **If $\hat k>0.7$:** unreliable; tune VI (reparameterize, more iterations, larger minibatch, smaller learning rate) or use MCMC.

**Invariance (Sec. 2.3).** Under a smooth bijection $\xi=T(\theta)$ the Jacobians cancel in $p(\xi)/q(\xi)=p(\theta)/q(\theta)$, so $\hat k$ does not depend on the coordinates it is computed in. But a reparameterization that *changes the family* (e.g. centered vs non-centered, or a different [[Automatic Differentiation Variational Inference (ADVI)|ADVI]] transform) changes $q^*$ and hence $\hat k$, so $\hat k$ "can guide the choice of re-parametrization."

> [!theorem] Marginal $\hat k$ is misleading (Proposition 1) ^thm-marginal-k
> If $\mathbb E_q[(p(\theta)/q(\theta))^\alpha]<\infty$ for some $\alpha>1$, then $\mathbb E_q[(p(\theta_i)/q(\theta_i))^\alpha]<\infty$ for every margin $i$: marginal $k_i\le$ joint $k$. So joint $\hat k$ grows with dimension, which "accurately reflects the quality of the variational approximation to the joint posterior." Marginal $\hat k_i$ should nonetheless not be used: the true marginal density is unknown, and when VI *over*-disperses a margin, $\hat k_i$ is small even though the estimate is bad (Sec. 2.4).

### VSBC

> [!algorithm] VSBC marginal diagnostic (Yao et al., Algorithm 2) ^alg-vsbc
> For $j=1,\dots,M$: draw $\theta_j^{(0)}\sim p(\theta)$; simulate $y_{(j)}\sim p(y\mid\theta_j^{(0)})$ of the same size as the real data; run VI to get $q_j$; for each margin $i$ compute
> $$
> p_{ij}=\Pr\big(\theta_{ij}^{(0)}<\theta_i^*\ \big|\ \theta^*\sim q_j\big).
> $$
> For each $i$, test whether $\{p_{ij}\}_{j=1}^M$ is **symmetric** about $0.5$ (histogram, or a Kolmogorov-Smirnov test comparing $p_{i:}$ with $1-p_{i:}$). Rejection means the VI approximation is biased in margin $i$.

This adapts Cook, Gelman & Rubin (2006), the precursor of [[Simulation-Based Calibration - Overview|SBC]]. Full SBC demands *uniform* histograms, a test that an approximate method like VI will essentially always fail, as ADVI does in [[SBC Case Studies]]. VSBC deliberately weakens the requirement to symmetry, asking only whether the *centre* is right.

> [!theorem] Proposition 2 ^thm-vsbc-symmetry
> For a one-dimensional parameter, if both the VI approximation $q$ and the true posterior are symmetric and VI is unbiased, $\mathbb E_{q}\theta=\mathbb E_{p(\theta\mid y)}\theta$, then the distribution of VSBC $p$-values is symmetric. If VI is positively (negatively) biased, the distribution is right (left) skewed.
>
> Reading shape as in [[Interpreting SBC Histograms]]: **skew** indicates bias; a symmetric **U-shape** indicates under-dispersion; a symmetric **hump** indicates over-dispersion.

Interpret conservatively: failing VSBC means VI "will not perform well on the model in question"; passing does not guarantee good behaviour on the actual data, and says nothing under misspecification (Sec. 3.2).

### Experiments (all mean-field ADVI in Stan)

> [!example] Four case studies (Sec. 4) ^ex-yao-cases
> 1. **Linear regression**, $n=10000$, $K=100$, $\beta_i\sim\mathcal N(0,1)$, $\sigma\sim\text{Gamma}(0.5,0.5)$, $M=1000$ VSBC replications. KS test not rejected for $\beta_1$ ($p=0.27$), $\beta_2$ ($p=0.08$); rejected for $\log\sigma$, which is over-estimated. "The under-estimation of posterior variance is reflected by the U-shaped distributions." On one data set $\hat k=0.61$ with relative tolerance $10^{-5}$, but $\hat k=4.4$ at the default $10^{-2}$: "a fake convergence" that $\hat k$ catches and the ELBO rule does not (Figs. 1-2).
> 2. **Logistic regression** with design correlation $\rho\in[0,0.99]$. Posterior correlation rises with $\rho$, mean-field fits worse, $\hat k$ rises. Held-out log predictive density of VI *improves* with $\rho$, "misleadingly suggesting better fit"; the *discrepancy* between VI and true lpd jumps sharply near $\hat k=0.7$. First- and second-moment RMSE grow with $\hat k$, and "PSIS adjustment always shrinks the VI estimation errors" (Figs. 3-4).
> 3. **Eight schools** ([[Hierarchical Models]]). Centered: joint $\hat k=1.00$; the Gaussian family cannot capture the funnel between $\tau$ and $\theta$. Here ADVI **over**-estimates the posterior sd of every $\theta_j$: the posterior mode is at $\tau=0$, entropy pushes $q$ away from it, $\tau$ is over-estimated, and that inflates the $\theta_j$. Marginal $\hat k_i$ are "misleadingly small." Non-centered ($\theta_j=\mu+\tau\theta_j^*$): joint $\hat k=0.64$, smaller bias in means and sds. VSBC: $\theta_1$ symmetric; $\tau$ right-skewed (over-estimated) when centered and left-skewed (under-estimated) when non-centered (Figs. 5-6). "VI posteriors can be both over-dispersed and under-dispersed, depending crucially on the true parameter dependencies."
> 4. **Regularized-horseshoe logistic regression**, leukemia microarray, $D=7129$, $n=72$. ADVI runs in minutes versus hours for MCMC, but $\hat k=9.8$: "not even close." The Gaussian family misses the right-hand mode of $\log\lambda_j$, collapsing the corresponding $\beta_j$ to a spike at zero; VSBC shows $\lambda$ biased down and the global scale $\tau$ biased up to compensate (Figs. 7-8). Compare [[Regularized Horseshoe (Finnish Horseshoe)]] and [[The Horseshoe Prior]].

### Limitations (Sec. 5)

**Both diagnostics are local.** If the posterior is $0.8\,\mathcal N(0,0.2)+0.2\,\mathcal N(3,0.2)$ and $q$ sits on one mode, the ratio is the constant $0.8$ or $0.2$ on the sampled region and $k=0$: "any divergence measure based on samples from the approximation such as $\mathrm{KL}(q,p)$ is local." Remedies: multiple over-dispersed initializations; estimating $\mathrm{KL}(p,q)$ through PSIS with $h=\log(q/p)$; and VSBC itself, which draws truths from the prior and so can land in the missed mode. In practice "a marginal missing mode will typically lead to large joint discrepancy that is still detectable by $\hat k$," as in the horseshoe example.

## Examples

> [!example] Computing $\hat k$ for a PyMC or Stan VI fit ^ex-khat-code
> ```python
> import numpy as np, arviz as az
>
> # theta: (S, K) draws from q in the UNCONSTRAINED space
> # logp_joint(theta_s): log p(theta_s, y) incl. Jacobian; logq(theta_s): log q density
> log_r = np.array([logp_joint(t) - logq(t) for t in theta])
> log_w, khat = az.psislw(log_r)                  # smoothed log weights, Pareto shape
> print(f"k-hat = {float(khat):.2f}")
>
> if khat < 0.7:                                   # PSIS-corrected posterior mean
>     w = np.exp(log_w - log_w.max()); w /= w.sum()
>     post_mean = (w[:, None] * theta).sum(0)
> ```
> Both densities must be evaluated in the same coordinates; by the invariance result either space is fine as long as the Jacobian is included consistently. CmdStan's variational output includes `log_p__` (log joint) and `log_g__` (log approximation) columns that can be differenced to form $\log r_s$.

**A decision rule for applied work.** For a [[Bayesian Media Mix Modeling - Overview|media mix]] or geo-hierarchical model fitted by ADVI: (i) rerun with tolerance $\le10^{-4}$ and several seeds; (ii) compute joint $\hat k$; (iii) if $\hat k>0.7$, non-center, centre and scale predictors, try full-rank, then fall back to NUTS; (iv) never infer interval quality from good out-of-sample prediction, which case 2 shows can improve while the posterior approximation degrades. If the production system must use VI for speed, run VSBC once per model *structure* offline to learn which parameters (typically scales such as $\tau$ and $\sigma$) are systematically biased.

## Connections

- [[The ELBO and KL Divergence Minimization]] - why the ELBO value is uninformative and why reverse KL yields light-tailed $q$.
- [[Automatic Differentiation Variational Inference (ADVI)]] - the algorithm under test in every experiment.
- [[Mean-Field Family and Coordinate Ascent VI (CAVI)]] - the under-dispersion that produces U-shaped VSBC histograms.
- [[Simulation-Based Calibration - Overview]], [[The SBC Algorithm]] and [[Interpreting SBC Histograms]] - the stricter uniformity-based check VSBC relaxes.
- [[Cross Validation Checking]] - PSIS-LOO and the same $\hat k<0.7$ threshold.
- [[Computational Troubleshooting]] - centered vs non-centered parameterizations and funnel geometry.

## See Also

- [[SBC Case Studies]] - ADVI failing full SBC on linear regression.
- [[Variational Inference and Pathfinder]] - Pathfinder also uses importance resampling on top of a normal approximation.
- [[Fitting and Validating Computation]] - the workflow context for fake-data checks.
- [[Normalizing Flows for Variational Inference]] - richer families to which $\hat k$ applies unchanged.
- [[Variational Inference - Overview]] - cluster map.
