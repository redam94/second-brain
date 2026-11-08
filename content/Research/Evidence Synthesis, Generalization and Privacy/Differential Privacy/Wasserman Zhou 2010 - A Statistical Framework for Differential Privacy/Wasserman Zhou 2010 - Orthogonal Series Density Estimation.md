---
title: "Wasserman Zhou 2010 - Orthogonal Series Density Estimation"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 6 Orthogonal Series Density Estimation (Lemma 6.1, Thm. 6.2, 6.3, pp. 15-17); Proofs 9.11 incl. Lemma 9.3 (pp. 32-37)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]"
  - "[[Wasserman Zhou 2010 - Histogram Release Mechanisms]]"
used_by:
  - "[[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]"
aliases:
  - Private orthogonal series density estimator
  - Sobolev ellipsoid minimax rate with differential privacy
  - Exponential mechanism versus perturbation for density estimation
---

# Wasserman Zhou 2010 - Orthogonal Series Density Estimation

> [!summary]
> For $r=1$ and a density in a Sobolev ellipsoid of order $\gamma$, the minimax squared-$L_2$ rate is $n^{-2\gamma/(2\gamma+1)}$. An exponential mechanism built on the $L_2$ distance between orthogonal-series estimates achieves only $n^{-\gamma/(2\gamma+1)}$ (with $k\asymp\sqrt n$, $\gamma>1$; Thm. 6.2), while *perturbing the series coefficients* with Laplace noise attains the minimax rate for any $k\ge n$ (Thm. 6.3). Again perturbation beats the exponential mechanism, though the authors do not know whether their exponential-mechanism bound is tight.

## Overview

The section develops "an exponential scheme based on density estimation" and compares it with a perturbation approach. For simplicity $r=1$. The mathematical structure: expand $p$ in an orthonormal basis, estimate the leading coefficients, and either (a) sample a sanitized database whose own series estimate is close to the data's estimate (exponential mechanism) or (b) add Laplace noise to the coefficient estimates and sample from the resulting density.

## Main Content

### Set-up (pp. 15-16)

Let $\{1,\psi_1,\psi_2,\dots\}$ be an orthonormal basis for $L_2(0,1)=\{f:\int_0^1f^2<\infty\}$ and suppose $p\in L_2(0,1)$:
$$
p(x)=1+\sum_{j=1}^\infty\beta_j\psi_j(x),\qquad\beta_j=\int_0^1\psi_j(x)p(x)\,dx.
$$
Assume the basis is uniformly bounded:
$$
c_0\equiv\sup_x\sup_j|\psi_j(x)|<\infty.\tag{13}
$$
(Lemma 9.3 uses the cosine basis $\psi_j(x)=\sqrt2\cos(\pi jx)$, so $c_0=\sqrt2$.)

> [!definition] Sobolev ellipsoid (p. 16)
> For $\gamma>1/2$ and $C>0$, $B(\gamma,C)=\big\{\beta=(\beta_1,\beta_2,\dots):\sum_{j=1}^\infty\beta_j^2j^{2\gamma}\le C^2\big\}$ and $\mathcal{P}(\gamma,C)=\big\{p(x)=1+\sum_{j\ge1}\beta_j\psi_j(x):\beta\in B(\gamma,C)\big\}$.
^def-wz-sobolev

The minimax rate in $L_2$ norm for $\mathcal{P}(\gamma,C)$ is $n^{-2\gamma/(2\gamma+1)}$ (Efromovich 1999): $\inf_{\hat p}\sup_{P\in\mathcal{P}(\gamma,C)}\mathbb{E}\int(\hat p-p)^2\ge c_1n^{-2\gamma/(2\gamma+1)}$. It is achieved by the projection estimator
$$
\hat p(x)=1+\sum_{j=1}^{m_n}\hat\beta_j\psi_j(x),\quad m_n=n^{1/(2\gamma+1)},\ \hat\beta_j=n^{-1}\sum_{i=1}^n\psi_j(X_i).\tag{14}
$$
For $u\in L_2(0,1)$ write $\|u\|_{\ell_2}=\big(\int_0^1|u(x)|^2dx\big)^{1/2}$.

### Exponential mechanism on the series loss

Take the loss
$$
\xi(X,Z)=\Big(\int(\hat p_X(x)-\hat p^*_Z(x))^2dx\Big)^{1/2}=\|\hat p_X-\hat p^*\|_{\ell_2},\tag{15}
$$
where $\hat p_X$ is (14) from the data and, from the released sample $Z$,
$$
\hat p^*(x)=1+\sum_{j=1}^{m_k}\hat\beta^*_j\psi_j(x),\quad m_k=k^{1/(2\gamma+1)},\ \hat\beta^*_j=k^{-1}\sum_{i=1}^k\psi_j(Z_i).\tag{16}
$$

> [!theorem] Lemma 6.1 (p. 17)
> Under this scheme $\Delta\le\dfrac{2c_0^2m_n}{n}$. Hence the exponential-mechanism density satisfies
> $$
> g(z\mid x)=\exp\!\Big(-\frac{\alpha\|\hat p^*-\hat p\|_{\ell_2}}{\Delta}\Big)\le\exp\!\Big(-\frac{\alpha n\|\hat p^*-\hat p\|_{\ell_2}}{2c_0^2m_n}\Big)\ \text{almost surely.}\tag{17}
> $$
^lem-wz-series-sensitivity

(The printed exponent in (17) is $\alpha\|\cdot\|/\Delta$ whereas definition (9) has $\alpha\|\cdot\|/(2\Delta)$; with the factor 2 the privacy parameter is $\alpha$, without it $2\alpha$. This affects only constants, not rates.)

> [!proof]- Proof (Sec. 9.11, pp. 32-33)
> Let $X=(x,X_2,\dots,X_n)$ and $Y=(y,X_2,\dots,X_n)$ so $\delta(X,Y)=1$. By the reverse triangle inequality in $\ell_2$: $|\xi(X,Z)-\xi(Y,Z)|=\big|\|u\|_{\ell_2}-\|v\|_{\ell_2}\big|\le\|u-v\|_{\ell_2}=\|\hat p_X-\hat p_Y\|_{\ell_2}$ with $u=\hat p_X-\hat p^*$, $v=\hat p_Y-\hat p^*$. Pointwise, $|\hat p_X(x)-\hat p_Y(x)|=\big|\frac1n\sum_{j=1}^{m_n}(\psi_j(X_1)-\psi_j(Y_1))\psi_j(x)\big|\le\frac1n\sum_{j=1}^{m_n}(|\psi_j(X_1)|+|\psi_j(Y_1)|)|\psi_j(x)|\le\frac{2c_0^2m_n}{n}$. Integrating over $[0,1]$ gives the $\ell_2$ bound.

> [!theorem] Theorem 6.2 - exponential mechanism rate (p. 17)
> Let $Z=(Z_1,\dots,Z_k)$ be drawn from $g_x(z)$ in (17). Assume $\gamma>1$. If $k\asymp\sqrt n$ then
> $$
> \rho^2(p,\hat p^*)=O_P\big(n^{-\gamma/(2\gamma+1)}\big).
> $$
^thm-wz-series-exponential

The sanitized estimator converges at a slower rate than the minimax rate $n^{-2\gamma/(2\gamma+1)}$ (the exponent halves).

> [!proof]- Proof outline (Sec. 9.11, pp. 33-35)
> Follow the proof of Thm. 5.3 with $\rho(F,\hat F_u)=\|p-\hat p_u\|_{\ell_2}$ and $\rho(\hat F_X,\hat F_u)=\|\hat p_X-\hat p_u\|_{\ell_2}$; the triangle inequalities $\|\hat p_u-\hat p_X\|\ge\|\hat p_u-p\|-\|\hat p_X-p\|$ and $\le\|\hat p_u-p\|+\|p-\hat p_X\|$ replace the cdf ones. Condition (10) follows from Markov's inequality: $P(\|\hat p_X-p\|>\epsilon)\le\mathbb{E}\|\hat p_X-p\|^2/\epsilon^2$ with polynomially decaying MSE. The *small ball probability* is the bottleneck:
> 1. By Parseval, $\int(p-\hat p_k)^2=\sum_{j\le m_k}(\hat\beta_j-\beta_j)^2+\sum_{j>m_k}\beta_j^2\le Q+ck^{-2\gamma/(2\gamma+1)}$ with $Q=\sum_{j\le m_k}(\hat\beta_j-\beta_j)^2$, the second term being the Sobolev tail.
> 2. Standardise: $U_i=(\psi_1(X_i)-\beta_1,\dots,\psi_{m_k}(X_i)-\beta_{m_k})^T$ with covariance $\Sigma_k$, $Y_i=\Sigma_k^{-1/2}U_i$, $S=k^{-1/2}\sum_iY_i$ so $Q=k^{-1}S^T\Sigma_kS$. If $\lambda_k$ is the largest eigenvalue of $\Sigma_k$ then $P(Q\le\delta^2)\ge P(S^TS\le k\delta^2/\lambda_k)$. Lemma 9.3: $\lambda=\limsup\lambda_k<\infty$ (for the cosine basis, $\Sigma_{jj}=1+\beta_{2j}/\sqrt2-\beta_j^2$, and off-diagonal entries involve only $\beta_{|j-k|},\beta_{j+k},\beta_{j/2},\beta_{2k}$ with $\sum|\beta_j|=O(1)$, giving a bounded operator norm).
> 3. Multivariate Berry-Esseen (Bentkus 2003): $\sup_c|P(S^TS\le c)-P(\chi^2_{m_k}\le c)|=O\big(\sqrt{m_k^3/k}\big)=O\big(k^{-(\gamma-1)/(2\gamma+1)}\big)$. This is where $\gamma>1$ is needed.
> 4. The $\chi^2$ tail (Rohde-Duembgen): $P(\chi^2_m\le m+a)\ge1-e^{-a^2/(4(m+a))}$. Write the target as $\rho^2(p,\hat p^*)\le\epsilon_n$ with $\epsilon_n=c_1n^{-\gamma/(2\gamma+1)}$, i.e. norm radius $\sqrt{\epsilon_n}$, and take $k=\sqrt n$. Since $k^{-2\gamma/(2\gamma+1)}=n^{-\gamma/(2\gamma+1)}$ is of the same order as $\epsilon_n$, the bias term is absorbed and one obtains $P\big(\|p-\hat p_k\|_{\ell_2}\le\sqrt{\epsilon_n}/2\big)\ge\frac12-O\big(k^{-(\gamma-1)/(2\gamma+1)}\big)$, bounded away from zero.
> 5. Plug into the Thm. 5.3-type bound with $\Delta\le2c_0^2m_n/n$. The first term is at most $c_2\exp\{k\log\sup_xp-\alpha c_3\,n\sqrt{\epsilon_n}/m_n\}$. Here $k\log\sup p\asymp n^{1/2}$ while $n\sqrt{\epsilon_n}/m_n\asymp n^{1-\gamma/(2(2\gamma+1))-1/(2\gamma+1)}=n^{3\gamma/(2(2\gamma+1))}$. Because $\frac{3\gamma}{2(2\gamma+1)}>\frac12$ iff $\gamma>1$, the negative term dominates and the bound is $c_2\exp\{-\alpha c_4n^{3\gamma/(2(2\gamma+1))}\}\to0$. Hence the theorem (and this is the second place, after Berry-Esseen, where $\gamma>1$ is used).

### Perturbation approach

> [!definition] Perturbed series estimator (p. 17)
> $\hat q(x)=1+\sum_{j=1}^{m_n}(\hat\beta_j+\nu_j)\psi_j(x)$ with $\nu_1,\dots,\nu_m$ i.i.d. Laplace, density $g(\nu)=\frac{n\alpha}{2c_0m}e^{-n\alpha|\nu|/(c_0m)}$ (as printed). If $\hat q(x)<0$ for some $x$, replace $\hat q$ by $\hat q(x)I(\hat q(x)>0)\big/\int\hat q(s)I(\hat q(s)>0)ds$ (Hall and Murison 1993). Let $Z=(Z_1,\dots,Z_k)$ be an i.i.d. sample from $\hat q$. In the notation of Lemma 2.6, $R=(\nu_1,\dots,\nu_m)$, so for any $k$ the release is DP.
^def-wz-perturbed-series

(Sensitivity check, own derivation: by the computation in Lemma 6.1 each $\hat\beta_j$ moves by at most $2c_0/n$ when one record is replaced, so the coefficient vector has $\ell_1$-sensitivity at most $2c_0m/n$; $\alpha$-DP needs Laplace scale $2c_0m/(n\alpha)$, versus the printed scale $c_0m/(n\alpha)$. The printed scale is smaller by a factor 2, the same kind of constant-level slip as in (17); rates are unaffected.)

> [!theorem] Theorem 6.3 - perturbation attains the minimax rate (p. 17)
> Let $Z=(Z_1,\dots,Z_k)$ be drawn from $\hat q$, assume $\gamma>1$ and choose $k\ge n$. Then
> $$
> \rho^2(p,\hat p_Z)=O_P\big(n^{-2\gamma/(2\gamma+1)}\big),
> $$
> where $\hat p_Z$ is the orthogonal series density estimator based on $Z$.
^thm-wz-series-perturbed

"Hence, again, the perturbation technique achieves the minimax rate of convergence and so appears to be superior to the exponential mechanism. We do not know if this is because the exponential mechanism is inherently less accurate, or if our bounds for the exponential mechanism are not tight enough."

(*Heuristic for why perturbation is cheap (own calculation, not in the paper).* With Laplace scale $2c_0m/(n\alpha)$ per coefficient, the added integrated variance is $m\cdot2(2c_0m/(n\alpha))^2=O\big(m^3/(n^2\alpha^2)\big)$, of lower order than the sampling variance $m/n$ whenever $m^2\ll n\alpha^2$. At $m_n=n^{1/(2\gamma+1)}$ this holds for any $\gamma>1/2$ and fixed $\alpha$, so the private estimator inherits the usual bias-variance balance $m_n^{-2\gamma}+m_n/n\asymp n^{-2\gamma/(2\gamma+1)}$. The paper's stronger assumption $\gamma>1$ is carried over from Thm. 6.2.)

## Examples

**Rate comparison for $\gamma=2$ (smooth density, own arithmetic).** Exponential mechanism: $n^{-\gamma/(2\gamma+1)}=n^{-2/5}$; perturbation and minimax: $n^{-2\gamma/(2\gamma+1)}=n^{-4/5}$. At $n=10^4$: $0.025$ versus $0.00025$ in rate scale (a factor $n^{2/5}=40$ in the exponential mechanism's disfavour, ignoring constants).

```python
import numpy as np
rng = np.random.default_rng(1)

def private_cosine_density(x, m, alpha, rng=rng, c0=np.sqrt(2)):
    """Perturbed series estimator: beta_hat_j + Laplace noise (scale 2*c0*m/(n*alpha), from the Lemma 6.1 sensitivity)."""
    n = len(x)
    j = np.arange(1, m + 1)
    beta_hat = np.sqrt(2) * np.cos(np.pi * np.outer(j, x)).mean(axis=1)
    noisy = beta_hat + rng.laplace(0, 2 * c0 * m / (n * alpha), size=m)
    grid = np.linspace(0, 1, 2001)
    q = 1 + (noisy[:, None] * np.sqrt(2) * np.cos(np.pi * np.outer(j, grid))).sum(0)
    q = np.clip(q, 0, None); q /= np.trapezoid(q, grid)
    return grid, q

x = rng.beta(10, 10, 5000)
grid, q = private_cosine_density(x, m=8, alpha=1.0)
from scipy.stats import beta
print(np.trapezoid((q - beta.pdf(grid, 10, 10))**2, grid))      # integrated squared error
```

With seed 1 this gives an integrated squared error of about $0.0019$ for $n=5000$, $\alpha=1$ and $m=8$ cosine terms (so $n\alpha=5000$, larger than the $n\alpha\le100$ settings of the histogram simulation in [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]], so the two are not directly comparable). It illustrates that for a smooth density a handful of series coefficients carry the signal and need little noise.

## Connections

- **Marketing measurement.** Smooth continuous variables (days-to-conversion, spend, order value) can be released as a handful of Laplace-noised series coefficients instead of a histogram; the number of coefficients $m$ plays the role of the bin count and the same bias-variance-privacy trade-off applies ($m\asymp n^{1/(2\gamma+1)}$ non-privately). Smoother distributions allow fewer coefficients and therefore less noise: a practical argument for parametric or low-dimensional summaries of response curves before privatisation. Related: nonparametric curve estimation in [[Nonparametric Models Overview]].

## See Also

- [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]
- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]]
- [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]
