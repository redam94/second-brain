---
title: Uncertainty Calibration for Linear Solvers
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 21-22, pp. 175-192"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Linear Algebra"
doc_type: textbook
depends_on:
  - "[[Probabilistic Linear Solvers - Algorithmic Scaffold]]"
  - "[[Computational Constraints on Probabilistic Solvers]]"
  - "[[Conjugate Gradients as Probabilistic Inference]]"
  - "[[Hierarchical Inference in Gaussian Models]]"
used_by:
  - "[[Lessons from Integration]]"
aliases:
  - Uncertainty Calibration
  - Rayleigh Regression
  - Scale Estimation for Linear Solvers
  - Calibrating CG uncertainty
---

# Uncertainty Calibration for Linear Solvers

> [!summary]
> CG gives an excellent posterior *mean* $A_M=\tilde Y\tilde Y^\top$; the remaining task is to attach a **trustworthy covariance**. The idea: choose the prior covariance parameter $W_0$ to equal $A_M$ on the explored subspace $\mathrm{span}(S)$ and a scaled identity $\omega I$ on its orthogonal complement, then estimate the single scale $\omega$ at runtime. **Rayleigh regression** predicts $\omega$ from CG's own scalar by-products (the Rayleigh coefficients $a(m)=s_m^\top A s_m/s_m^\top s_m$), giving a genuinely probabilistic error estimate for arbitrary projections $Av$. A hard worst-case bound ($\omega\ge\max_{ij}[A]_{ij}$) gives a conservative but loose error estimate; a conjugate Gauss–Gamma prior (Ch. 22.5) gives a fully Bayesian scale.

## Overview

From [[Conjugate Gradients as Probabilistic Inference]] and [[Computational Constraints on Probabilistic Solvers]], the mean $A_M$ is fixed and good, but the naive empirical-Bayes covariance ($W_0=A_M$) collapses to zero on the null space of the observations. The final goal of Part III (Ch. 21) is a covariance that is (i) *probabilistically consistent* with $A_M$ (both arise from one generative model) and (ii) *well-calibrated* so it can serve as an uncertainty. Because the object is matrix-valued, different design criteria (diagonal vs off-diagonal error, projection error) pull towards different priors, so no single choice is perfect.

## Main Content

### The projection-complement covariance

> [!definition] Calibrated $W_0$ with a null-space scale ^def-W0
> Set $W_0$ to act like $A$ on $\mathrm{span}(S)$ and estimate its effect on the complement using regularity assumptions:
> $$
> W_0=\tilde Y\tilde Y^\top+(I-S(S^\top S)^{-1}S^\top)\,\Omega\,(I-S(S^\top S)^{-1}S^\top), \tag{21.1}
> $$
> with a general spd $\Omega$. The projection matrices ensure $\Omega$ only acts on the space **not** covered by $A_M=\tilde Y\tilde Y^\top$, so any such $\Omega$ still reproduces the mean $A_M$ (20.3). For simplicity take a **scalar** $\Omega=\omega I$ (21.2): with no specific prior knowledge there is no way to prefer directions in the null-space of $S$. Then
> $$
> W_M=W_0-W_0 S(S^\top W_0 S)^{-1}S^\top W_0=\omega(I-S(S^\top S)^{-1}S^\top). \tag{via 21.1}
> $$
> The scale $\omega$ scales the remaining uncertainty over the **entire null-space of $S$** — the space CG has not yet explored.

The diagonal/off-diagonal trade-off of (20.4)–(20.6) persists: calibrated variance on the diagonal implies under-confidence off it, and vice versa, so $\omega$ strikes a balance.

### Rayleigh regression: estimating $\omega$ from CG's by-products

> [!definition] Rayleigh coefficients ^def-rayleigh
> During a CG run on $A$, the projected values
> $$
> a(m):=\frac{s_m^\top A s_m}{s_m^\top s_m}
> $$
> (the $m$-th direction's **Rayleigh coefficient**) are computed essentially for free (the term $s_m^\top A s_m$ is line 7 of Algorithm 17.2, up to rescaling). For spd $A$ with eigenvalues $\lambda_1\ge\dots\ge\lambda_N$,
> $$
> \lambda_1\ge a(m)\ge\lambda_N\ \ \forall m,\qquad\text{and}\qquad \sigma^2\le\frac{v^\top Av}{v^\top v}\le\mathrm{tr}\,A\ \ \forall v.
> $$
> So $\{a(m)\}$ carry (loose) spectral information about $A$ at no extra cost.

Empirically (SARCOS kernel-ridge example, Fig. 21.1): the collected projections decay rapidly in the first $\sim50$ steps (an expanding subspace of relevant directions, related to but not equal to top eigenvectors), then a "kink", then slow non-monotone decay. Since the $a(m)$ come for free and are *scalar*, cheap univariate regression on them predicts $\omega$ (and hence $v^\top Av$ for unseen $v$):

> [!definition] Rayleigh regression ^def-rayleigh-reg
> Fit a parametric curve to the $M$ observed $\log_{10}a(m)$, e.g.
> $$
> \hat a(m)=\sigma^2+10^{\xi_1+\xi_2 m}+10^{\xi_3+\xi_4 m}, \tag{21.4}
> $$
> with constants $\xi_1,\dots,\xi_4$ found by least squares (the posterior mean of parametric Gaussian regression). Then estimate the average projection scale from stopping point $M$ to $N$:
> $$
> \omega_{\text{projections}}:=\frac{1}{N-M}\int_M^N\hat a(m)\,\mathrm{d}m. \tag{21.5}
> $$
> A more automatic GP-regression version on $\log a(m)$ is possible (Wenger & Hennig, 2020).

> [!theorem] Predicting general matrix projections ^thm-projection
> Under the posterior $p(A)=\mathcal{N}(A;A_M,W_M\otimes_{\!\ominus}W_M)$, the marginal over a projection $Av=(I\otimes v)^\top\vec{A}$ is Gaussian:
> $$
> p(Av)=\mathcal{N}\Big(Av;\,A_M v,\ \underbrace{\tfrac12\big(W_M v^\top W_M v+(W_M v)(v^\top W_M)\big)}_{=:\Sigma_v}\Big).
> $$
> With $\omega$ set by Rayleigh regression (SARCOS: $\omega\approx0.02$ after $M=300$, vs radically larger $\omega=\mathrm{tr}\,A$), the standardised elements $z=\Sigma_v^{-1/2}(Av-\mathbb{E}[Av])$ are close to standard-normal for random $v$ (Gaussian/uniform/binary), Fig. 21.2 — the posterior captures the two moments of $Av$ well **without access to** the distribution of $v$. This is a new, genuinely probabilistic error estimate emerging from the interpretation of linear solvers.

Why the good Gaussian fit is unsurprising: for $v_i\sim p_v$ i.i.d., $[Av]_i=\sum_j[A]_{ij}v_j$ is approximately Gaussian by the CLT, with $\mathbb{E}_{p_v}([Av]_i)=\mathbb{E}[v]\sum_j[A]_{ij}$ and $\mathrm{var}=\mathrm{var}(v)\sum_j[A]_{ij}^2$. Randomness "washes out structure", leaving the maximum-entropy Gaussian the model already assumes — helpful here, but a sign the interesting structure has been removed.

### The hard part: individual matrix elements

Predicting single elements $[A]_{ij}$ (deterministic, not smeared by randomness) is genuinely harder. The marginal is
$$
p([A]_{ij}\mid Y,S)=\mathcal{N}\big([A]_{ij};[A_M]_{ij},\tfrac12([W_M]_{ii}[W_M]_{jj}+[W_M]_{ij}^2)\big),
$$
and (20.5)–(20.6) show **no** scalar $\omega$ (nor even a full spd $W_0$) makes this variance a tight prediction of the error on *all* elements simultaneously. Two options:

> [!definition] Two calibration regimes for elements ^def-two-regimes
> - **Hard upper bound:** $\mathrm{var}_{p(A)}([A]_{ij})$ upper-bounds $[A-A_M]_{ij}^2$ if $\tfrac12([W_0]_{ii}[W_0]_{jj}+[W_0]_{ij}^2)>|A-A_M|_{ij}$. For spd matrices ($|A|^2\le|A_{ii}||A_{jj}|$) this holds if $\omega\ge\max_{ij}[A]_{ij}$; an $\mathcal{O}(N)$ a-priori bound is $\omega=\max_i[A]_{ii}^2$ (SARCOS Gram matrix: known to be $1$). Guarantees a conservative bound but is loose for off-diagonal elements (the vast majority).
> - **Estimated average:** $\omega=\omega_{\text{projections}}$ (21.5) gives no guarantee but captures the *typical* matrix scale — a more aggressive, often more useful error estimate for off-diagonal elements ($\sim1$), though on the diagonal some outliers can have true/estimated error ratios beyond $10$ (Fig. 21.3).

### Conjugate-prior scale inference (Ch. 22.5)

An alternative, fully Bayesian calibration uses the scalar-covariance prior $p_A(A\mid\alpha,\beta)=\mathcal{N}(A;\alpha I,\beta^2 I\otimes_{\!\ominus}I)$ (which by Theorem 19.16 is also CG-consistent) and places a **Gauss–Gamma conjugate prior** on the hyperparameters $(\alpha,\beta)$.

> [!theorem] Gauss–Gamma posterior on the scale (Eqs. 22.7–22.11) ^thm-gauss-gamma
> With prior $\mathcal{N}(\alpha;\mu_0,\beta^2/\lambda_0)\,\mathcal{G}(\beta^{-2};a_0,b_0)$ and marginal likelihood $p(Y,S\mid\alpha,\beta)=\mathcal{N}(\vec{Y};\alpha\vec{S},\beta^2(I\otimes S)^\top(I\otimes_{\!\ominus}I)(I\otimes S))$, the posterior sufficient statistics are
> $$
> \mu_N=\frac{\lambda_0\mu_0+M\bar\alpha}{\lambda_0+M},\quad \lambda_N=\lambda_0+M,\quad a_N=a_0+\tfrac12(NM-\tfrac12(M^2-M)),
> $$
> $$
> b_N=b_0+\tfrac12\Big(M\hat\beta^2+\tfrac{\lambda_0 M}{\lambda_0+M}(\bar\alpha-\mu_0)^2\Big),
> $$
> where, writing the SVD $S=V\Sigma U^\top$,
> $$
> \bar\alpha=\tfrac1M\sum_{i=1}^M(V^\top AV)_{ii},\qquad \hat\beta^2=\tfrac1M\sum_{ij=1}^M\Big((V^\top AV)_{ij}^2-\tfrac{(V^\top AV)_{ii}(V^\top AV)_{jj}}{M}\Big).
> $$
> Interpretation: the sufficient statistics compute an **empirical expectation over the elements of $A$ in the left-singular basis of $S$**. $\bar\alpha$ is an empirical mean over the (rotated) diagonal; $\hat\beta^2$ is an empirical variance. When $S$ is orthonormal, $V=S$ and $V^\top AV=S^\top AS=Y^\top S$ directly. Both direct and iterative conjugate solvers thus project along a transformation of orthogonal directions — for CG, the sequence of residuals $r_i=Ax_i-b$.

## Examples

> [!example] Why CG's step sizes calibrate the whole matrix
> The Rayleigh coefficients $a(m)$ are literally line 7 of the solver — CG already computes them. A cheap hand-crafted regression (21.4) on these $M$ scalars finds the right *scale* for the $N-M$ directions of $A$ that the mean $A_M$ has not captured. The predicted variance $\Sigma_v$ for a projection $Av$ is then a fundamentally probabilistic error bar that "comes for free" — a concrete instance of the recurring thesis that a classical solver already carries the ingredients of its own uncertainty.

> [!example] Conservative worst-case vs aggressive average (Fig. 21.3)
> On the SARCOS Gram matrix, $\omega=\max_i[A]_{ii}^2=1$ makes the posterior std a valid but loose upper bound on element errors. Switching to $\omega_{\text{projections}}\approx0.02$ gives well-scaled ($\sim1$) error ratios for off-diagonal elements, at the cost of losing the guarantee and occasionally under-estimating diagonal errors by $>10\times$. Calibration is thus a deliberate choice between conservative bounds and realistic average error.

## Connections
- Directly resolves the $W_M=0$ failure noted in [[Computational Constraints on Probabilistic Solvers]].
- The Gauss–Gamma treatment is the linear-algebra instance of [[Hierarchical Inference in Gaussian Models]] (conjugate-prior hyperparameter inference, §6.2).
- The "under-confidence trade-off" mirrors the integration chapter's choice of kernels with analytic means but imperfect calibration — see [[Convergence and Priors in Bayesian Quadrature]] and [[Lessons from Integration]].
- Rayleigh regression's spectral reading ties back to the Lanczos/Krylov structure of [[Classic Linear Solvers - A Review]].

## See Also
- [[Computational Constraints on Probabilistic Solvers]] — supplies the mean $A_M=\tilde Y\tilde Y^\top$ this note calibrates.
- [[Conjugate Gradients as Probabilistic Inference]] — the scalar prior underlying the conjugate-prior calibration.
- [[Hierarchical Inference in Gaussian Models]] — the general conjugate/empirical-Bayes machinery.
- [[Probabilistic Linear Solvers - Algorithmic Scaffold]] — element-variance formulas (20.4) and the symmetric-Kronecker covariance.
