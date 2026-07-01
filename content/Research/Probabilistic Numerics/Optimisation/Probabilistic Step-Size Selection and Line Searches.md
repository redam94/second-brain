---
title: Probabilistic Step-Size Selection and Line Searches
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 26, pp. 203-220; Ch. 27, pp. 221-227"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[The Local Optimisation Problem]]"
  - "[[Gaussian Process Regression]]"
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Gaussian Distributions and Algebra]]"
used_by:
  - "[[First- and Second-Order Optimisation Methods]]"
  - "[[Acquisition Functions]]"
aliases:
  - Probabilistic Line Search
  - Wolfe Conditions
  - Probabilistic Wolfe Conditions
  - Step-Size Selection
  - Batch-Size Selection
  - Early Stopping
---
# Probabilistic Step-Size Selection and Line Searches
> [!summary]
> A line search decides the step size $\alpha$ along a fixed direction by probing the univariate objective $f(\alpha)$ and its projected gradient $f'(\alpha)$, stopping when the **Wolfe conditions** hold. Under batch noise these deterministic ingredients break; the **probabilistic line search** of Mahsereci & Hennig replaces every non-probabilistic element by its Bayesian counterpart: cubic-spline interpolation becomes **GP regression with an integrated-Wiener kernel**, the bisection/evaluation rule becomes an **expected-improvement** decision, and the Boolean Wolfe test becomes a **probability** of the Wolfe conditions (a bivariate-normal integral). The same probabilistic reasoning yields runtime rules for **batch size** and **early stopping** (Ch. 27).

## Overview
In the linear problem $Ax=b$ the step size was a trivial analytic ratio once $z_i=Ad_i$ was known; in the nonlinear setting it is not. Line searches are considered an "easier", nearly-solved inner-loop problem in the noise-free world, but under significant computational **noise** they become genuinely hard (Thm. 25.3, Exercise 25.2 show step size is decisive). Ch. 26 is a *case study*: build a classical line search, then carefully replace each non-probabilistic aspect by a probabilistic equivalent, adding essentially **no overhead**. Ch. 27 generalises the theme — controlling *other* optimiser hyperparameters (batch size, stopping) by probabilistic estimates.

## Main Content
### The Wolfe termination conditions
> [!definition] (Weak and strong) Wolfe conditions
> With constants $0\le c_1<c_2\le1$, a step length $\alpha$ is acceptable if
> $$
> f(\alpha)\le f(0)+c_1\alpha f'(0)\qquad\text{(sufficient decrease / Armijo)},\tag{26.5}
> $$
> $$
> f'(\alpha)\ge c_2 f'(0)\qquad\text{(weak curvature condition)}.\tag{26.6}
> $$
> The **strong** Wolfe conditions replace (26.6) by $|f'(\alpha)|\le c_2|f'(0)|$ (26.8), adding an upper bound on the gradient. Here $f(0),f'(0)$ are the value and projected gradient at the start of the search. The Armijo condition demands the function lie sufficiently below its initial value (linear decrease slope $c_1$); the curvature condition demands the gradient increase beyond its initial value. Practical lenient choices: $c_1=10^{-4}$, $c_2=0.9$.
^def-wolfe

The Wolfe conditions do **not** guarantee the true optimum lies in the accepted bracket, nor that the chosen step is close to $\alpha_*$; they merely rule out pathological behaviour (increasing values, tiny steps) and, combined with direction rules, give guarantees on $d_{i+1}$ (e.g. for [[First- and Second-Order Optimisation Methods|BFGS]] the curvature condition guarantees $d_{i+1}$ is a descent direction). Requiring $c_2>c_1$ is necessary for acceptable steps to exist (Exercise 26.2).

### Classical search by cubic-spline interpolation
The classical evaluation rule builds cubic local approximations of $f(\alpha)$ from collected $f,f'$ values, stepping to a local minimum or an extrapolation point (Wahba; Nocedal & Wright §3.3). Starting from $f_0,f_0'$, the linear guess $\hat f(\alpha)=f_0+\alpha f_0'$ has no minimum, so a first step $\alpha_1$ is set ad hoc (e.g. the previous search's terminal step). Given four numbers $f_0,f_1,f_0',f_1'$, a **unique cubic** $\hat f(\alpha)=a\alpha^3+b\alpha^2+\alpha f_0'+f_0$ interpolates them (26.9), with coefficients (26.10) and its quadratic derivative minimised at $\alpha_2=\big(-b+\sqrt{b^2-3af_0'}\big)/(3a)$. If the new point satisfies Wolfe, stop; else bisect the bracketing interval by the sign of $f'(\alpha_2)$ and re-interpolate. **This procedure is brittle to noise:** a single erroneous bisection (from a noisy gradient sign) sends the search down a dead-end from which it cannot recover (Fig. 26.3).

### Probabilistic line search: three replacements
> [!definition] The three probabilistic substitutions
> The classical routine has three non-probabilistic ingredients replaced (Mahsereci & Hennig 2015):
> 1. **Spline interpolation → GP regression** extended to noisy observations;
> 2. **Deterministic bisection → a candidate-set + utility rule** (no region can be "bisected away" with certainty);
> 3. **Boolean Wolfe test → a probability** of having found a suitable point.
>
> All three are unified by casting spline interpolation as the **noise-free limit of GP regression**.
^def-three-replacements

#### (1) Cubic splines as the integrated Wiener process
The SDE $\mathrm{d}[f,f']^\top=\big[\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\big][f,f']^\top\mathrm{d}\alpha+[0,q]^\top\mathrm{d}\omega_t$ (26.11) — the **integrated Wiener process** (see [[Gauss-Markov Processes and SDEs]]) — has kernel $\operatorname{cov}(f(a),f(b))=\theta^2\big(\tfrac13\min^3(a,b)+|a-b|\tfrac12\min(a,b)\big)$. Its GP posterior mean is a piecewise-cubic polynomial that, in the **noise-free limit** $\Lambda\to0$, reverts exactly to the classical cubic spline. Conditioning on nontrivial $[f(0),f'(0)]=[f_0,f_0']$ gives mean $[\mu(\alpha),\mu'(\alpha)]=[f_0+f_0'\alpha,\ f_0']$ and the joint value/derivative kernel (26.13, with $\alpha_\square:=\min(\alpha_a,\alpha_b)$)
$$
\begin{bmatrix}k_{\alpha_a\alpha_b}&k^{\partial}_{\alpha_a\alpha_b}\\\partial k_{\alpha_a\alpha_b}&\partial k^{\partial}_{\alpha_a\alpha_b}\end{bmatrix}=q^2\begin{bmatrix}\tfrac13\alpha_\square^3-\tfrac12\alpha_\square^2+\alpha_a\alpha_b\alpha_\square & -\tfrac12\alpha_\square^2+\alpha_a\alpha_\square\\-\tfrac12\alpha_\square^2+\alpha_b\alpha_\square & \alpha_\square\end{bmatrix}.
$$
The GP posterior mean/covariance (26.14–26.15) follow from standard [[Gaussian Process Regression]] with the noisy likelihood (Model 26.3):
> [!definition] Model 26.3 — Gaussian likelihood for values and gradients
> $$
> p(Y\mid f)=\mathcal{N}\big(Y;[f(\alpha_1),\dots,f(\alpha_K),f'(\alpha_1),\dots,f'(\alpha_K)]^\top,\Lambda\big),
> $$
> $Y\in\mathbb{R}^{2K}$ stacks values (first $K$) then gradients, with spd noise covariance $\Lambda\in\mathbb{R}^{2K\times2K}$ whose block structure allows value/gradient noise to co-vary at one node $\alpha_i$ (correlation $\rho_i$) but assumes noise at different locations is independent (correct when batches are re-drawn per evaluation, Eq. 26.3). Since $\Lambda$ is block-diagonal the posterior can be computed by $2\times2$ Kalman filtering/smoothing, at cost a constant multiple of the classical routine.
^def-model263

#### (2) Selecting evaluation nodes by expected improvement
In the noisy setting no region can be bisected away, so the search maintains a **finite candidate set** $\tau=[\tau_1,\dots,\tau_L]$: (i) an extrapolation candidate $\tau_1=\alpha_{\max}+r_i$ (with growth policy $r_i=1$, $r_i=i$, or $r_i=2^i$), plus (ii) all local minima of the posterior mean $\nu(\alpha)$ in $[0,\alpha_{\max}]\setminus\{\alpha_i\}$. The next node maximises a utility $\hat\alpha=\arg\max_{\tau_\ell}\{u(\tau_\ell)\}$, e.g. the **expected improvement** over the best previous mean $\eta=\min_i\{\nu(\alpha_i)\}$:
> [!definition] Expected improvement along the line (26.16)
> $$
> u_{\text{EI}}(\tau)=\mathbb{E}_{p(f(\tau)\mid Y)}\big(\min\{0,\eta-f(\tau)\}\big)=\frac{\eta-\nu(\tau)}{2}\Big(1+\operatorname{erf}\tfrac{\eta-\nu(\tau)}{\sqrt{2\kappa_{\tau\tau}}}\Big)+\sqrt{\tfrac{\kappa_{\tau\tau}}{2\pi}}\exp\!\Big(-\tfrac{(\eta-\nu(\tau))^2}{2\kappa_{\tau\tau}}\Big),
> $$
> where $\nu(\tau),\kappa_{\tau\tau}$ are the posterior mean and variance at $\tau$. In practice the product $u_{\text{EI}}\cdot p_{\text{Wolfe}}$ works well. (See [[Acquisition Functions]] — this is the univariate ancestor of EI.)
^def-ei-line

#### (3) Probabilistic Wolfe conditions
> [!theorem] Wolfe conditions as a bivariate-normal probability
> The *weak* Wolfe conditions are a **linear projection** of $(f,f')$: they require $a_\alpha,b_\alpha\ge0$ where
> $$
> \begin{bmatrix}a_\alpha\\b_\alpha\end{bmatrix}=\begin{bmatrix}1&c_1\alpha&-1&0\\0&-c_2&0&1\end{bmatrix}\begin{bmatrix}f(0)\\f'(0)\\f(\alpha)\\f'(\alpha)\end{bmatrix}\ge\begin{bmatrix}0\\0\end{bmatrix}.
> $$
> By closure of Gaussians under linear maps ([[Gaussian Distributions and Algebra]]), the GP posterior on $(f,f')$ induces a bivariate Gaussian $p(a_\alpha,b_\alpha)=\mathcal{N}\big([a_\alpha,b_\alpha]^\top;[m_\alpha^a,m_\alpha^b]^\top,[\begin{smallmatrix}C^{aa}&C^{ab}\\C^{ba}&C^{bb}\end{smallmatrix}]\big)$ with
> $$
> m_\alpha^a=\nu_0-\nu_\alpha+c_1\alpha\nu_0',\qquad m_\alpha^b=\nu_\alpha'-c_2\nu'(0),
> $$
> $$
> C_\alpha^{aa}=\kappa_{00}+(c_1\alpha)^2\kappa^{\partial\partial}_{00}+\kappa_{\alpha\alpha}+2\big(c_1\alpha(\kappa^{\partial}_{00}-\partial\kappa_{0\alpha})-\kappa_{0\alpha}\big),\ \ C_\alpha^{bb}=c_2^2\kappa^{\partial\partial}_{00}-2c_2\partial\kappa^{\partial}_{0\alpha}+\partial\kappa^{\partial}_{\alpha\alpha}, \text{ etc.}
> $$
> The probability that the weak Wolfe conditions hold is the **bivariate-normal integral**
> $$
> p(a_\alpha\ge0\wedge b_\alpha\ge0)=\int_{-m^a_\alpha/\sqrt{C^{aa}_\alpha}}^{\infty}\!\int_{-m^b_\alpha/\sqrt{C^{bb}_\alpha}}^{\infty}\!\mathcal{N}\Big([\begin{smallmatrix}a\\b\end{smallmatrix}];0,[\begin{smallmatrix}1&\rho_\alpha\\\rho_\alpha&1\end{smallmatrix}]\Big)\,\mathrm{d}a\,\mathrm{d}b,\quad \rho_\alpha=\frac{C^{ab}_\alpha}{\sqrt{C^{aa}_\alpha C^{bb}_\alpha}}.
> $$
> The point is accepted once this probability crosses a threshold $c_W$ (e.g. 0.3) after an evaluation. The strong condition adds a linear upper limit $\bar b=-2c_2\nu_0'$ on $b_\alpha$ (26.17).
^thm-prob-wolfe

The completed method (Algorithm 26.1, `probLineSearch`) operates on scaled pairs $\mathbf{f}(t)=[(f(t)-f(0))/f'(0),\ f'(t)/f'(0)]$ with $t=\alpha/\alpha_{i-1}$, avoiding hyperparameters; it aborts after a fixed budget (~10 evaluations) with a rare fall-back to the posterior-mean minimum. It runs robustly on MLPs and logistic regression on MNIST/CIFAR10 (Fig. 26.6). **Uncertain observations require additional observables:** the noise variances $\sigma_{f_i}^2,\sigma_{f_i'}^2$ (elements of $\Lambda$) are absent classically and must be *estimated at runtime* from within-batch statistics
$$
S_i=\frac1M\sum_m\ell_m^2(\alpha_i),\quad S_i'=\frac1M\sum_m(d_i^\top\nabla\ell_m(\alpha_i))^2,\qquad \sigma_{f_i}^2=\frac{S_i-y_i^2}{M-1},\ \ \sigma_{f_i'}^2=\frac{S_i'-(y_i')^2}{M-1}.\tag{26.18}
$$

### Controlling other hyperparameters by probabilistic estimates (Ch. 27)
> [!theorem] Optimal batch size for SGD
> With $g_M(x)\sim\mathcal{N}\big(\nabla\mathcal{L}(x),\tfrac1M\Sigma(x)\big)$ (27.1), $\Sigma$ the gradient-element covariance whose diagonal is estimated by $S=\tfrac1M\sum_j\nabla\ell(\xi_j,x)^{.2}-g_M(x)^{.2}$ (27.2), assume $\mathcal{L}$ is $L$-Lipschitz-smooth. The per-step **expected gain** is
> $$
> \mathbb{E}(G)=\Big(\alpha_i-\tfrac{L\alpha_i^2}{2}\Big)\|\nabla\mathcal{L}(x_i)\|^2-\tfrac{L\alpha_i^2}{2M}\operatorname{tr}\Sigma,
> $$
> using $\mathbb{E}(\|g_i\|^2)=\|\nabla\mathcal{L}(x_i)\|^2+\operatorname{tr}\Sigma/M$. Since cost is linear in $M$, maximising expected gain **per cost** $\mathbb{E}(G)/M$ gives
> $$
> M_*=\frac{2L\alpha}{2-L\alpha}\frac{\operatorname{tr}\Sigma}{\|\nabla\mathcal{L}(x_i)\|^2}.\tag{27.3}
> $$
> Under a scalar-Hessian approximation ($B\approx hI$, optimal rate $\alpha=1/h$) and energy-type risks ($\mathcal{L}_*\approx0$) this simplifies to the upper bound $M_*\le\alpha\,\operatorname{tr}\Sigma/\mathcal{L}(x_i)$ (27.4). The tuning heuristic again involves $\operatorname{tr}\Sigma$, a quantity absent in the noise-free case, estimated cheaply at runtime.
^thm-batch-size

> [!theorem] Statistical early-stopping test
> In the noisy case $\nabla\mathcal{L}=0$ never holds exactly; stop when we cannot rule out being at the population optimum. With $p(\nabla\mathcal{L}(x)\mid f)=\mathcal{N}(\nabla\mathcal{L};\nabla f(x),\Sigma(x)/K)$, the **evidence** under $\nabla f(x)=0$ is $p(\nabla\mathcal{L}(x)\mid0)=\mathcal{N}(\nabla\mathcal{L};0,\Sigma(x)/K)$. Assuming independence across gradient elements and reusing $S$ (27.2), a log-likelihood-ratio test $\log p(\nabla\mathcal{L}\mid0)-\mathbb{E}_{p(\nabla\hat{\mathcal{L}}\mid0)}(\cdot)>0$ reduces to
> $$
> 1-\frac{K}{N}\sum_{i=1}^N\Big(\frac{[\nabla\mathcal{L}(x)]_i}{S_i(x)}\Big)>0,
> $$
> i.e. stop when the average gradient element lies within its "error bar" $S$. Here computational and empirical (population-vs-empirical-risk) uncertainty overlap and need not be distinguished.
^thm-early-stop

## Examples
> [!example] Erroneous bisection under SNR = 1
> With gradient noise $p(y'(\alpha)\mid f'(\alpha))=\mathcal{N}(y'(\alpha);f'(\alpha),\sigma^2)$ and $\sigma\approx|f'(0)|$ (a realistic SNR of 1 in big data), one may *observe* $y'(\alpha_1)>0$ while the true $f'(\alpha_1)<0$. A classical line search bisects the wrong sub-interval and is permanently derailed (Fig. 26.3). The probabilistic line search instead reverts its GP mean toward the prior, yielding a smoother interpolant and a *probability* (not a certainty) of Wolfe satisfaction, so no irreversible decision is taken.

## Connections
- Builds directly on [[The Local Optimisation Problem]] (the projected univariate sub-problem, ERM batch noise).
- The integrated-Wiener prior is a [[Gauss-Markov Processes and SDEs|Gauss-Markov SDE]]; inference is [[Gaussian Process Regression]] with a joint value/gradient likelihood; the Wolfe projection uses [[Gaussian Distributions and Algebra|Gaussian closure under linear maps]].
- The line-search EI (26.16) is the univariate special case of [[Acquisition Functions|Expected Improvement]]; value-of-information appears as in [[Bayesian Quadrature]].
- Curvature-condition guarantees feed [[First- and Second-Order Optimisation Methods|BFGS]] descent directions.

## See Also
- [[The Local Optimisation Problem]] — the setting and the two per-iteration decisions.
- [[First- and Second-Order Optimisation Methods]] — the outer-loop direction decision, using Wolfe guarantees.
- [[Acquisition Functions]] — EI and value-of-information at global scale.
- [[Gauss-Markov Processes and SDEs]] — the integrated Wiener process behind cubic splines.
