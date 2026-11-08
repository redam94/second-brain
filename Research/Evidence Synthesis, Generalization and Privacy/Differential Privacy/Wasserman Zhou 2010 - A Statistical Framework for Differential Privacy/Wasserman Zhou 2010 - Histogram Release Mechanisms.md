---
title: "Wasserman Zhou 2010 - Histogram Release Mechanisms"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 4 Sampling From a Histogram (Thm. 4.1-4.4, pp. 9-13); Proofs 9.4-9.7 (pp. 21-28)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]"
  - "[[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]]"
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
used_by:
  - "[[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]"
aliases:
  - Smoothed histogram release
  - Perturbed histogram release
  - Private histogram rates of convergence
---

# Wasserman Zhou 2010 - Histogram Release Mechanisms

> [!summary]
> Two ways to release a private database drawn from a histogram. **Smoothed histogram:** mix the histogram with a uniform floor $\delta$ and sample $k$ points; it is $\alpha$-DP iff $k\ln\big(\frac{(1-\delta)m}{n\delta}+1\big)\le\alpha$ (Thm. 4.1) and gets $L_2$ rate $n^{-2/(2r+3)}$ and KS rate $\sqrt{\log n}\,n^{-2/(6+r)}$, both slower than minimax. **Perturbed histogram:** add $\mathrm{Lap}(2/\alpha)$ noise to each bin count, clip at zero and renormalise; it attains the minimax $L_2$ rate $n^{-2/(2+r)}$ for any $k\ge n$ (Thm. 4.4).

## Overview

The histogram is used "for its familiarity and simplicity and because it is used in applications of differential privacy". The histogram "has to be carefully constructed to ensure differential privacy". Both schemes draw a random sample from a histogram-like density and differ in how privacy is obtained. Accuracy depends on both the construction and the distance used.

## Main Content

### Histogram set-up (pp. 9-10)

Let $L>0$ and suppose $p=dP/d\mu\in\mathcal{P}$ where
$$\mathcal{P}=\Big\{p:\ |p(x)-p(y)|\le L\|x-y\|\Big\}\tag{4}$$
is the class of Lipschitz functions. Minimax rate for density estimators in squared $L_2$ over $\mathcal{P}$: $n^{-2/(2+r)}$ (Scott 1992). Take a bin width $h=h_n\in(0,1)$ with $m=1/h^r$ an integer and partition $\mathcal{X}=[0,1]^r$ into $m$ cubes $B_1,\dots,B_m$ of side $h$. Let $C_j=\sum_{i=1}^nI(X_i\in B_j)$, $\hat p_j=C_j/n$ and
$$\hat f_m(x)=\sum_{j=1}^m\frac{\hat p_j}{h^r}I(x\in B_j).$$
$\hat f_m$ is consistent if $h_n\to0$ and $nh_n^r\to\infty$; the optimal $m_n\asymp n^{r/(2+r)}$ gives $\int(p-\hat f_m)^2=O_P(n^{-2/(2+r)})$.

### Mechanism 1: sampling from a smoothed histogram (Sec. 4.1)

> [!definition] Smoothed histogram (p. 10)
> Fix a constant $0<\delta<1$ and define $\hat f_{m,\delta}(x)=(1-\delta)\hat f_m(x)+\delta$ (a mixture of the histogram with the uniform density on $[0,1]^r$). The mechanism releases $Z=(Z_1,\dots,Z_k)$, $Z_1,\dots,Z_k$ i.i.d. draws from $\hat f_{m,\delta}$.
^def-wz-smoothed-hist

> [!theorem] Theorem 4.1 (p. 10)
> If
> $$k\log\!\Big(\frac{(1-\delta)m}{n\delta}+1\Big)\le\alpha\tag{6}$$
> then $\alpha$-differential privacy holds.
^thm-wz-smoothed-dp

For $\delta\to0$ and $\frac{m}{n\delta}\to0$, $\log(\cdot)\approx\frac{m}{n\delta}$, so (6) is approximately
$$\frac{mk}{\delta}\le n\alpha.\tag{7}$$
This shows the trade-off among $m$, $k$ and $\delta$. "We note that sampling from the usual histogram corresponding to $\delta=0$ does not preserve differential privacy."

> [!proof]- Proof (Sec. 9.4, pp. 21-22)
> Let $X,Y$ differ in one observation, with histograms $\hat f$ and $\hat g$ and cell proportions $\hat p_j(X),\hat p_j(Y)$; $|\hat p_j(X)-\hat p_j(Y)|\le1/n$. The maximum density ratio for a single draw occurs in one bin $B_j$; since the draws are i.i.d. the joint ratio is the $k$-th power. If $\hat p_j(Y)=0$ the worst case is $\hat p_j(X)=1/n$, giving per-draw ratio $\frac{(1-\delta)m(1/n)+\delta}{\delta}=\frac{(1-\delta)m}{n\delta}+1$. Otherwise $\hat p_j(Y)\ge1/n$ (cell proportions are multiples of $1/n$) and $\hat p_j(X)=\hat p_j(Y)\pm1/n$; the ratio $\frac{(1-\delta)m(\hat p_j+1/n)+\delta}{(1-\delta)m\hat p_j+\delta}$ (or its reverse) is maximised, for fixed $m,n,\delta$, when $\hat p_j(Y)=1/n$ and $\hat p_j(X)=0$ (or the roles swapped). In all cases the ratio is at most $\big(\frac{(1-\delta)m}{n\delta}+1\big)^k$, hence the theorem.

> [!theorem] Theorem 4.2 - KS accuracy of the smoothed histogram (p. 11)
> Suppose (4) holds and $\rho$ is the KS distance. Choose $m\asymp n^{r/(6+r)}$, $k\asymp m^{4/r}=n^{4/(6+r)}$ and $\delta=mk/(n\alpha)\asymp n^{-2/(6+r)}$. These minimise $\mathbb{E}\rho(F,\hat F_Z)$ subject to (6), giving
> $$\mathbb{E}\rho(F,\hat F_Z)=O\!\left(\frac{\sqrt{\log n}}{n^{2/(6+r)}}\right).$$
^thm-wz-smoothed-ks

> [!theorem] Theorem 4.3 - $L_2$ accuracy of the smoothed histogram (p. 11)
> Assume the same setup with $\rho$ the squared $L_2$ distance (8), $\hat f_Z(x)=h^{-r}\sum_{j=1}^m\hat q_jI(x\in B_j)$ with $\hat q_j=\#\{Z_i\in B_j\}/k$ and $\rho(F,\hat F_Z)=\int(p-\hat f_Z)^2$. Choosing
> $$m\asymp n^{r/(2r+3)},\qquad k\asymp n^{(r+2)/(2r+3)},\qquad\delta\asymp n^{-1/(2r+3)},$$
> minimises $\mathbb{E}\rho(F,\hat F_Z)$ subject to (6), and $\mathbb{E}\rho(F,\hat F_Z)=O\big(n^{-2/(2r+3)}\big)$.
^thm-wz-smoothed-l2

(The statement of Thm. 4.3 prints $\delta\asymp n^{-1/(r+3)}$, while its proof in Sec. 9.6 and the constraint $mk/\delta\asymp n$ give $\delta\asymp n^{-1/(2r+3)}$: $mk=n^{(2r+2)/(2r+3)}$ so $mk/\delta=n$ exactly when $\delta=n^{-1/(2r+3)}$. The version above is the internally consistent one. Both rates are slower than the minimax rates, KS $n^{-1/2}$ and $L_2$ $n^{-2/(2+r)}$.)

> [!proof]- Proofs of Thm. 4.2 and 4.3 (Sec. 9.5-9.6, pp. 22-25)
> *Thm. 4.2.* Use the VC bound for orthants (VC dimension $r$): $P\big(\sup_t|\hat F_X(t)-F(t)|>\epsilon\big)\le8n^r\exp(-n\epsilon^2/32)$, so $\mathbb{E}\sup_t|\hat F_X-F|=O(\sqrt{r\log n/n})$; similarly given $X$, $Z_1,\dots,Z_k\sim\hat F_{m,\delta}$ and $\mathbb{E}\sup|\hat F_Z-\hat F_{m,\delta}|=O(\sqrt{r\log k/k})$. Decompose $\mathbb{E}\sup|\hat F_Z-F|\le\mathbb{E}\sup|\hat F_Z-\hat F_{m,\delta}|+\mathbb{E}\sup|\hat F_{m,\delta}-F|$, and $\hat F_{m,\delta}=(1-\delta)\hat F_m+\delta U$ ($U$ uniform cdf) so the second term is at most $\mathbb{E}\sup|\hat F_m-F|+\delta$. Bound $\mathbb{E}\sup|\hat F_m-F|$ by sampling error $\sqrt{r\log n/n}$ plus the histogram bias $\sup_x|F_m(x)-F(x)|$, where $F_m=\mathbb{E}\hat F_m$: for $x$ not a grid point the difference comes from $A\setminus R$, a set intersecting at most $rh/h^r$ cubes with maximum density discrepancy $Lh\sqrt r$ (Lipschitz) and volume $h^r$ per cube, giving $\le Lr^{3/2}m^{-2/r}$. Altogether $\mathbb{E}\sup|\hat F_Z-F|=O\big(\sqrt{r\log k/k}+\sqrt{r\log n/n}+Lr^{3/2}m^{-2/r}+\delta\big)$; with $m\asymp n^{r/(6+r)}$, $k\asymp n^{4/(6+r)}$, $\delta=mk/(n\alpha)\asymp n^{-2/(6+r)}$ the terms balance at $\sqrt{\log n}/n^{2/(6+r)}$.
> *Thm. 4.3.* The pointwise inequality $(\hat f_Z-p)^2\lesssim(1-\delta)^2(p-\hat f_m)^2+\delta^2(p-1)^2+(\hat f_{m,\delta}-\hat f_Z)^2$ gives $\mathbb{E}\int(\hat f_Z-p)^2\lesssim R_m+\delta^2+\mathbb{E}\int(\hat f_{m,\delta}-\hat f_Z)^2$, where $R_m=m^{-2/r}+m/n$ is the usual histogram risk, and conditional on $X$, $\hat f_Z$ is unbiased for $\hat f_m$ with integrated variance $\lesssim m/k$. So the risk is $\lesssim m^{-2/r}+\frac mn+\delta^2+\frac mk$. Minimising subject to $mk/\delta\asymp n$ gives $m\asymp n^{r/(2r+3)}$, $k\asymp n^{(r+2)/(2r+3)}$, $\delta\asymp n^{-1/(2r+3)}$ and risk $n^{-2/(2r+3)}$.

### Mechanism 2: sampling from a perturbed histogram (Sec. 4.2, due to Dwork et al. 2006)

> [!definition] Perturbed histogram (p. 12)
> With $C_j$ the count in bin $B_j$, release $D_j=C_j+\nu_j$ where $\nu_1,\dots,\nu_m$ are i.i.d. Laplace with mean $0$ and variance $8/\alpha^2$, i.e. density $g(\nu)=(\alpha/4)e^{-|\nu|\alpha/2}=\mathrm{Lap}(2/\alpha)$. (Scale $2/\alpha$ is the $\ell_1$-sensitivity $2$ of the count vector under Hamming neighbours, since replacing one record changes two bin counts by $1$, divided by $\alpha$.) Releasing $D=(D_1,\dots,D_m)$ is $\alpha$-DP. To release a database, set $\tilde D_j=\max\{D_j,0\}$, $\hat q_j=\tilde D_j/\sum_s\tilde D_s$, and draw $Z=(Z_1,\dots,Z_k)$ i.i.d. from $\tilde f(x)=h^{-r}\sum_{j=1}^m\hat q_jI(x\in B_j)$. By Lemma 2.6 (postprocessing and i.i.d. resampling) $Z$ is $\alpha$-DP **for any $k$**.
^def-wz-perturbed-hist

> [!theorem] Theorem 4.4 (p. 12)
> Let $Z=(Z_1,\dots,Z_k)$ be drawn from $\tilde f$. Assume there exists $1\le C<\infty$ such that $\sup_xp(x)=C$.
> 1. **$L_2$.** Let $\rho$ be the ($L_2$) distance (8) and $m\asymp n^{r/(2+r)}$, $k\ge n$. Then $\mathbb{E}\rho(F,\hat F_Z)=O(n^{-2/(2+r)})$, the minimax rate.
> 2. **KS.** With $m\asymp n^{r/(2+r)}$, $\mathbb{E}\rho(F,\hat F_Z)=O\Big(\min\Big\{\frac{\log n}{n^{2/(2+r)}},\sqrt{\frac{\log n}{n}}\Big\}\Big)$: for $r=1$ the rate is $O(\sqrt{\log n/n})$ and for $r\ge2$ it is $O(\log n\times n^{-2/(2+r)})$.
^thm-wz-perturbed-hist

"Hence this method achieves the minimax rate of convergence in $L_2$ while the first data release method does not. This suggests that the perturbation method is preferable for the $L_2$ distance." It does not achieve the minimax rate in KS distance.

> [!proof]- Proof (Sec. 9.7, pp. 25-28)
> *(1)* Write $p-\hat f_Z=(p-\tilde f)+(\tilde f-\hat f_Z)$; the second term is $O_P(\sqrt{m/k})$, negligible for $k\ge n$. Split $p-\tilde f=(p-\hat f_m)+(\hat f_m-\tilde f)$; the first term has the usual risk $O(m^{-2/r}+m/n)$. For the second, show $\max_j|\hat q_j-\hat p_j|=O(\log m/n)$ almost surely: the clipped noisy count satisfies $|(C_j+\nu_j)_+/n-\hat p_j|\le|\nu_j|/n\le M/n$, with $M=\max_j|\nu_j|$; since $\Pr(M>A\log m)\le m\cdot m^{-A\beta}$ (Laplace tail, $\beta=\alpha/2$), Borel-Cantelli gives $M<A\log m$ eventually. The normaliser satisfies $|R_n-1|\le\sum_s|\nu_s|/n\le Mm/n$, so $1/R_n=1+O(m\log m/n)$. A Bernstein bound with $\hat p_j=O(1/m)$ (since $p\le C$) gives $\hat q_j-\hat p_j=O(\log m/n)+O\!\big(\frac{m(\log m)^2}{n^2}\big)$ almost surely, so $\int(\hat f_m-\tilde f)^2=O\big((m\log m/n)^2\big)\le O(m/n)$ for $n\ge m\log^2m$. Therefore the risk is the usual one, $m^{-2/r}+m/n$, minimised at $m\asymp n^{r/(2+r)}$ to give $n^{-2/(2+r)}$.
> *(2)* $\mathbb{E}\sup|F-\hat F_Z|\le\mathbb{E}\sup|F-\hat F_m|+\mathbb{E}\sup|\hat F_m-\tilde F_m|+O(\sqrt{r\log k/k})$ and $\sup_x|\hat F_m(x)-\tilde F_m(x)|\le\sum_\ell|\hat p_\ell-\hat q_\ell|=O(m\log m/n)$. With $m\asymp n^{r/(2+r)}$ the total is $O\big(\sqrt{r\log n/n}\big)+O(Lr^{3/2}m^{-2/r})+O(m\log m/n)$; for $r\ge2$ the last term dominates, $\log n\times n^{-2/(2+r)}$.

### Comparison with the Dirichlet-posterior method (p. 12-13)

Machanavajjhala et al. (2008) put a Dirichlet$(a_1,\dots,a_m)$ prior on cell probabilities $p_j=P(X_i\in B_j)$; the posterior is Dirichlet$(a_1+C_1,\dots,a_m+C_m)$. Draw $q=(q_1,\dots,q_m)$ from the posterior, then new counts $D\sim\mathrm{Multinomial}(k,q)$. The distribution of $D$ given $X$ is $\Pr(D=d\mid X)=\frac{\prod_j\Gamma(d_j+a_j+C_j)}{\Gamma(k+n+\sum_ja_j)}$ (up to the multinomial coefficient and prior normalisation as printed in the paper). They show DP requires $a_j+C_j\ge k/(e^{\alpha}-1)$ for all $j$. With $a_1=\dots=a_m$ this resembles the smoothed histogram (a pseudocount floor), and they also suggest a weakened version of DP.

## Examples

**How many points can the smoothed histogram release? (own computation).** $\alpha=1$, $n=1000$, $m=10$ bins. The maximum $k$ satisfying (6) versus the approximation (7) ($k\le n\alpha\delta/m$):

| $\delta$ | max $k$ from (6) | approximation (7) |
|---|---|---|
| 0.05 | 5.7 | 5 |
| 0.1 | 11.6 | 10 |
| 0.3 | 43.4 | 30 |
| 0.5 | 100.5 | 50 |
| 0.9 | 900.5 | 90 |

Only about 11 synthetic points can be released at $\delta=0.1$, and a large $k$ requires $\delta$ close to 1, at which the released data is nearly uniform noise. This is the "choosing $k$ is delicate" point (too large breaks privacy, too small breaks accuracy) that motivates preferring the perturbed histogram.

```python
import numpy as np, math
rng = np.random.default_rng(0)

def smoothed_histogram_k_max(alpha, n, m, delta):
    return alpha / math.log((1 - delta) * m / (n * delta) + 1)   # Theorem 4.1, eq. (6)

def perturbed_histogram_release(x, m, alpha, k, rng=rng):
    """Theorem 4.4 mechanism for r=1: Lap(2/alpha) on bin counts, clip at 0, renormalise, sample k points."""
    counts = np.histogram(x, bins=m, range=(0, 1))[0]
    d = np.maximum(counts + rng.laplace(0, 2 / alpha, m), 0)
    q = d / d.sum() if d.sum() > 0 else np.full(m, 1 / m)
    bins = rng.choice(m, size=k, p=q)
    return (bins + rng.random(k)) / m                              # uniform within the chosen bin

x = rng.beta(10, 10, 1000)
z = perturbed_histogram_release(x, m=15, alpha=0.1, k=1000)
print(smoothed_histogram_k_max(1.0, 1000, 10, 0.1), x.mean(), z.mean())
```

## Connections

- **Marketing measurement.** A "perturbed histogram" is exactly how aggregate privacy-preserving reports behave: per-bucket counts plus Laplace noise, with negative values clipped. Clipping at zero introduces a *bias* for small cells that downstream models should handle (treat the clipped value as censored, or work with the unclipped noisy counts, which are unbiased). The bin-count trade-off ($m\asymp n^{r/(2+r)}$ for the non-private optimum, but private error grows with $m/(n\alpha)$) argues for coarser buckets than a non-private analysis would choose.
- Compare with the DP histogram view of Laplace noise in [[Dwork Roth 2014 - Laplace Mechanism]] (histogram queries, sensitivity 1 under add/remove neighbours, versus 2 under replace-one neighbours here).

## See Also

- [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]
- [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]
- [[Dwork 2006 - Low-Sensitivity Functions and Applications]] (histogram sensitivity 1)
