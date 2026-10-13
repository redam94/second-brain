---
title: "Randomised Lasso and the Irrepresentable Condition"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/high-dimensional-statistics
  - type/definition
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §3 intro, eqs (10)-(11) (p. 11); §3.1 Lasso and randomised Lasso, eqs (12)-(13) (pp. 11-12); weakness trade-off and Relation to other work (pp. 14-15); §3.2 Example, Fig. 4 (p. 15)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]"
  - "[[Stability Paths and the Stable-Variable Set]]"
used_by:
  - "[[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]"
  - "[[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]"
  - "[[Stability Selection Simulation Study - Designs A-G and Results]]"
aliases:
  - Randomised Lasso
  - Randomized Lasso
  - Irrepresentable Condition
  - Neighbourhood Stability Condition
  - Weakness Parameter (Randomised Lasso)
---

# Randomised Lasso and the Irrepresentable Condition

> [!summary]
> The Lasso recovers the true support only if the **irrepresentable condition** holds: no noise variable may be too well explained by the signed relevant variables, $\max_{k\in N}|\operatorname{sign}(\beta_S)^\top(X_S^\top X_S)^{-1}X_S^\top X_k|<1$. Correlated designs often violate it. The **randomised Lasso** multiplies each variable's penalty by a random factor $1/W_k$, $W_k\in[\alpha,1]$, so penalties range over $[\lambda,\lambda/\alpha]$. A single randomised fit is useless. Across many fits, though, the irrepresentable condition fails only *some* of the time for a noise variable, so its selection probability falls below the threshold while true variables stay near 1. A toy example with $p=n=200$ and $\rho>0.5$ shows the Lasso always including a spurious third variable that the randomised version screens out.
^summary-ss-randomised-lasso-and-the-irrepresentable

## Overview

§3 specialises to high-dimensional linear regression. Stability selection is attractive here for two reasons (p. 11):
1. Results are much less sensitive to the regularisation, whose choice is hard because the noise level is unknown.
2. It "makes variable selection consistent in settings where the original methods fail".

## Main Content

### Model and consistency (§3, eqs 10-11)

> [!definition] Gaussian linear model and selection consistency (§3, p. 11)
> $$Y=X\beta+\varepsilon,\qquad \varepsilon_1,\dots,\varepsilon_n\ \text{i.i.d.}\ \mathcal N(0,\sigma^2), \tag{10}$$
> with **fixed** $n\times p$ design $X$, columns normalised $\|X_k\|_2=1$, and $p\gg n$ allowed. A procedure $\hat S$ is **variable-selection consistent** if
> $$P(\hat S=S)\to1\quad(n\to\infty). \tag{11}$$
^def-ss-consistency

The usual growth restriction is $|S|\log p=o(n)$ (Meinshausen & Bühlmann 2006; Zhao & Yu 2006; Wainwright 2006). It is often realistic. The binding constraints are **design conditions**: for the Lasso, neighbourhood stability, equivalently the irrepresentable condition; for OMP, Tropp's exact recovery criterion. The §3 introduction calls it "sufficient and necessary" for consistent selection; §3.3 calls it only sufficient (see [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection#^note-ss-erc-necessity|ROMP note]]).

> [!theorem] Two-stage claim of the §3 introduction (p. 11)
> 1. The authors show that these design conditions "can be circumvented more directly by using stability selection, also giving guidance on the proper amount of regularisation". Because of length limits only the Lasso is analysed in detail; OMP is "just indicated".
> 2. "An interesting aspect is that stability selection with the original procedures alone yields often very large improvements already." This holds before any randomisation is added. Subsampling alone is the grey-bar method of Figs 5-6; see [[Stability Selection Figs 5-6 - Per-Cell Power Readings]].
> 3. Adding extra randomness "in the spirit of Random Forests (Breiman, 2001)" weakens considerably the conditions needed for consistent variable selection. This is the randomised Lasso below and Theorem 2.
^thm-ss-sec3-intro-claims

> [!definition] Irrepresentable / neighbourhood-stability condition (§3.1, eq. 12, p. 12)
> $$\max_{k\in N}\ \big|\operatorname{sign}(\beta_S)^\top(X_S^\top X_S)^{-1}X_S^\top X_k\big|<1.$$
> It is **sufficient** and **almost necessary** for consistent Lasso selection. "Almost" because the necessary version uses $\le$. Here $(X_S^\top X_S)^{-1}X_S^\top X_k$ is the vector of coefficients from regressing noise variable $X_k$ on the relevant variables $X_S$. The condition says this projection, weighted by the true signs, must not reach 1 in absolute value.
^def-ss-irrepresentable

**If (12) fails.** One can only hope for $\ell_2$ recovery, $\|\hat\beta^\lambda-\beta\|_2\to_p0$, under sparse-eigenvalue bounds. This can then be turned into selection by **two-stage** procedures: thresholding, or preferably the **adaptive Lasso** (Zou 2006; Huang et al. 2008). The drawback is "the need to choose several tuning parameters without proper guidance". The randomised Lasso is offered as a simpler alternative.

> [!definition] Randomised Lasso with weakness $\alpha\in(0,1]$ (§3.1, eq. 13, p. 12)
> Let $W_k$, $k=1,\dots,p$, be i.i.d. random variables in $[\alpha,1]$. For $\lambda\in\mathbb R$,
> $$\hat\beta^{\lambda,W}=\arg\min_{\beta\in\mathbb R^p}\ \|Y-X\beta\|_2^2+\lambda\sum_{k=1}^p\frac{|\beta_k|}{W_k}.$$
> Each variable's penalty is a random value in $[\lambda,\lambda/\alpha]$. **Weight distribution used in the theory (p. 13):** independently, $W_k=\alpha$ with probability $p_w\in(0,1)$ and $W_k=1$ otherwise. Other perturbations "work often just as well in practice". $\alpha=1$ recovers the ordinary Lasso.
^def-ss-randomised-lasso

**Implementation.** Rescale column $k$ by $W_k$ and solve a standard Lasso (LARS, Efron et al. 2004; coordinate descent, Friedman et al. 2007, Meier et al. 2008). The name "weakness" comes from weak greedy algorithms (Temlyakov 2000).

**Why random weights help.** The reweighting resembles the adaptive Lasso, but it is "not based on any previous estimate, but is simply chosen at random!" (p. 12). One perturbation gives no improvement, and "If applied only with one random perturbation, randomised Lasso is not very useful." The power comes from repeating it many times and keeping variables chosen often, i.e. from combining it with stability selection.

### The weakness trade-off (pp. 14-15)

- **Low $\alpha$, cost:** the reweighted design $XW$ can approach singularity, so conditioning gets worse.
- **Low $\alpha$, benefit:** irrelevant variables are less likely to be selected. A noise variable can only enter when its irrepresentable condition (12) is violated. Random reweighting with low $\alpha$ makes that condition hold some of the time, which lowers the variable's selection probability.
- **Practice:** "choosing $\alpha$ in the range of (0.2, 0.8) gives very useful results" (p. 14). §4 uses $\alpha=0.5$; Fig. 1 right uses $\alpha=0.2$.

### Relation to other work (pp. 14-15)

| Method | Mechanism | Key difference from stability selection + randomised Lasso |
|---|---|---|
| **Bolasso** (Bach 2008) | Bootstrap the Lasso, keep variables selected in all replicates (≈ stability selection with $\pi_{thr}=1$) | Needs $\lambda$ to vanish faster than usual, at rate $n^{-1/2}$, with $p$ fixed. If $\lambda$ is too large, noise variables can be picked up |
| **Adaptive Lasso** (Zou 2006) | Reweight penalties by an initial estimate | Two stages, several tuning parameters; too-large $\lambda$ admits false variables |
| **Hard thresholding** (Candès & Tao 2007; Meinshausen & Yu 2009) | Threshold an $\ell_2$-consistent estimate | Same sensitivity to $\lambda$ |
| **Stability selection + randomised Lasso** | Random penalty weights + subsampling | For $\lambda$ chosen too large, no noise variables enter; only some relevant ones may be missed (Remark 3) |

## Examples

> [!example] §3.2 toy example - three variables, one spurious (pp. 15-16, Fig. 4)
> **Setup.** $p=n=200$. $X\sim\mathcal N(0,\Sigma)$ with $\Sigma=I$ except $\Sigma_{13}=\Sigma_{23}=\rho$ (and symmetric entries). $\beta=(1,1,0,0,\dots,0)$, $\varepsilon_i\sim\mathcal N(0,1/4)$ i.i.d.
> **Check of (12).** For $k=3$, $S=\{1,2\}$ and $X_S^\top X_S\approx I$, the irrepresentable quantity is $|\operatorname{sign}(\beta_S)^\top(\rho,\rho)^\top|=2\rho$. So (12) fails for $\rho>0.5$.
> **Lasso ($\alpha=1$, Fig. 4 left).** The Lasso cannot isolate variables 1 and 2: it "always includes the third variable superfluously".
> **Randomised Lasso ($\alpha=0.5$ middle, $\alpha=0.2$ right).** Variables 1-2 (red solid) keep selection probability near 1. Variable 3 (blue broken) is selected with much lower probability. Other noise variables (dotted) stay at 0 for large $\lambda$ ($\gtrsim0.85$) and only rise as $\lambda$ shrinks (see the readings below).
> **Interpretation.** Picking $\lambda$ to get the right model is much harder in the left plot than in the right one. With randomisation the stability path separates relevant from irrelevant variables, and the randomised Lasso "is consistent under stability selection".
^ex-ss-toy-rho

**The value of $\rho$ is not given.** The text says only that (12) is violated "for $\rho>0.5$". The paper never states which $\rho$ was used to draw Fig. 4, nor how many subsamples or weight draws were used.

**Fig. 4 - approximate plot readings (p. 15).** The values were read by eye from the rendered figure, to about ±0.03. The $\lambda$ axis runs from 1.0 to 0.0. Red solid = variables 1-2; blue dashed = variable 3; grey dotted = the other 197 noise variables.

| Weakness | Variables 1-2 (red) | Variable 3 (blue) | Other noise (dotted) | Gap at small $\lambda$ |
|---|---|---|---|---|
| $\alpha=1$ (Lasso, left) | Reach $\hat\Pi=1$ at $\lambda\approx0.93$ and $\approx0.88$ and stay there | Enters **first**: $\approx0.98$-0.99 already at $\lambda\approx0.97$, before either relevant variable. Declines slowly: $\approx0.9$ at $\lambda\approx0.6$, $\approx0.83$ at 0.4, $\approx0.79$ at 0.2, $\approx0.73$ at 0 | Zero until $\lambda\approx0.85$, then rising; bulk $\approx0.3$-0.55 at $\lambda=0$, top paths $\approx0.8$ | For $\lambda\in(0.88,0.97)$, variable 3 has a *higher* selection probability than a true variable. Its peak ($\approx0.99$) is indistinguishable from the true variables' 1.0 |
| $\alpha=0.5$ (middle) | Reach 1 by $\lambda\approx0.9$-0.87 | $\approx0.72$ at $\lambda\approx0.95$; maximum $\approx0.83$ near $\lambda\approx0.6$; $\approx0.73$ at 0 | Top paths $\approx0.75$-0.8 at $\lambda\to0$ | Max of variable 3 is $\approx0.83$ vs 1.0 for the true variables, so any $\pi_{thr}\in(0.83,1)$ separates them |
| $\alpha=0.2$ (right) | Reach 1 by $\lambda\approx0.75$-0.7 (slower rise) | $\approx0.65$ at $\lambda\approx0.9$; flat at $\approx0.69$-0.71; $\approx0.69$ at 0 | Top paths $\approx0.75$-0.78 at $\lambda\to0$ | Variable 3 peaks at $\approx0.71$; the separation threshold widens to $(0.71,1)$ |

**Reading.** Randomisation lowers variable 3's *peak* selection probability from $\approx0.99$ ($\alpha=1$) to $\approx0.83$ ($\alpha=0.5$) and $\approx0.71$ ($\alpha=0.2$). The cost is that the true variables reach 1 at a smaller $\lambda$. The generic noise variables are not helped by randomisation. At small $\lambda$ their top paths rise to $\approx0.75$-0.8, in some panels above variable 3. That is why the useful region is large $\lambda$, which matches Remark 3: with randomised Lasso, "no false variable is selected for all sufficiently large values of λ" (p. 15).

> [!example] Marketing reading: the "halo" proxy
> Suppose two real drivers, TV and search spend, both correlate with a third series such as branded search impressions, which has no causal effect of its own given the first two. That is exactly the §3.2 geometry. A single Lasso fit (and often the CV-chosen fit) keeps the proxy. Randomised-penalty stability selection tends to drop it, provided the proxy's correlation pattern violates (12) only part of the time under reweighting. This is an illustration, not an example in the paper.
^example-ss-marketing-reading-the-halo

## Connections

- Correlated proxies that "explain" relevant variables are the same problem that inflates permutation importance under correlation. See [[Strobl et al 2008 - Conditional Variable Importance - Overview]] and [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- Random perturbation of the selection step is explicitly inspired by Random Forests' random feature subsets (§1, §3). Compare [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]].
- In causal pipelines, Lasso selection mistakes feed into regularisation bias: [[Regularization Bias and the Partially Linear Model]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] - formal consistency result
- [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]] - the greedy analogue
