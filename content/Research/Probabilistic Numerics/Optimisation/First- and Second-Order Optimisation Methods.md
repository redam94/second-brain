---
title: First- and Second-Order Optimisation Methods
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 28, pp. 229-241"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[The Local Optimisation Problem]]"
  - "[[Probabilistic Step-Size Selection and Line Searches]]"
  - "[[Bayesian Filtering and Smoothing]]"
  - "[[Conjugate Gradients as Probabilistic Inference]]"
used_by:
  - "[[The Global Optimisation Problem]]"
aliases:
  - Search Directions
  - Gradient Descent
  - Momentum
  - Quasi-Newton Methods
  - BFGS as Inference
  - Probabilistic Gradient Descent
  - Dennis Family
---
# First- and Second-Order Optimisation Methods
> [!summary]
> Choosing the search **direction** $d_i$ splits optimisers into *element-wise* first-order methods (gradient descent, momentum, Nesterov, Adam) and *second-order* methods that couple gradient elements (Newton, quasi-Newton). Both admit probabilistic re-interpretations: element-wise probabilistic gradient descent is a per-coordinate **Kalman filter** on noisy gradients (Wiener or Ornstein–Uhlenbeck dynamics), and **quasi-Newton / BFGS** estimates the Hessian from secant observations — recoverable, in the linear case, as the posterior mean of a matrix-valued Gaussian (Corollary 28.2). A fully general one-to-one Kalman interpretation of quasi-Newton methods, however, does **not** exist, because the Hessian is not constant.

## Overview
In $x_{i+1}=x_i+\alpha_i d_i$, how should $d_i$ be chosen? Roughly, methods split into (i) rules motivated by **gradient descent** (first-order) — often phrased *element-wise*, $[d_i]_n=[d_i]_n(\{f_j,[\nabla f_j]_n\}_{j\le i})$, scaling to $N>10^6$; and (ii) rules motivated by **Newton–Raphson** (second-order), which couple gradient elements. First-class methods can converge asymptotically faster than gradient descent; second-class methods (bar Newton) converge slower than Newton but capture curvature. The classification is primarily *computational*, not analytic. Algorithm 28.1 (`prob_optimise`) shows the probabilistic optimiser is structurally identical to the classic one — probabilistic operations are encapsulated in the subroutines (direction and [[Probabilistic Step-Size Selection and Line Searches|probabilistic line search]]).

## Main Content
### Element-wise (first-order) methods
> [!definition] Classic element-wise update rules
> - **Gradient descent:** $x_{i+1}=x_i-\alpha_i\nabla f$.
> - **Momentum (heavy ball, Polyak 1964):** auxiliary velocity $v_i$,
> $$
> v_i=-\alpha_i(1-\beta_i)\nabla f(x_i)+\beta_i v_{i-1},\quad x_{i+1}=x_i+v_i,\qquad \beta_i\in(0,1).\tag{28.3}
> $$
> Derived from the Newtonian dynamics of a mass-$m$ particle in potential $f$ with friction $\varkappa$: $m\ddot x(t)=-\varkappa\dot x(t)-\nabla f(x(t))$ (28.1), whose locally-linear explicit-Euler discretisation gives (28.3) with $\alpha_i=1/\varkappa$, $\beta_i=\exp(-\tfrac{\varkappa}{m}\tau)$. In the massless limit $m\to0$ ($\beta\to0$) it reverts to gradient descent.
> - **Nesterov's accelerated method:** a *look-ahead* variant $v_i=-\alpha_i(1-\beta_i)\nabla f(x_i+\alpha_i(1-\beta_i)v_i)+\beta_i v_{i-1}$ — implicit ($v_i$ on both sides), understood via *implicit ODE solvers*.
> - **AdaDelta, Adam:** retain a running average of the element-wise **square** of the gradient (cf. Eq. 27.2), giving a form of "uncertainty-damping" — each coordinate's step is scaled by its signal-to-noise ratio.
^def-first-order

The first three (GD, momentum, Nesterov) are motivated *purely on noise-free* objectives; noise analysis can be added afterward but is not a design ingredient. Adam-type methods are *designed* for stochasticity.

### Probabilistic element-wise gradient descent as Kalman filtering
Assuming gradient elements evolve independently, $p(\nabla f(x))=\prod_{n=1}^N p_n(f_n'(x))$, and treating each coordinate's gradient as a scalar time series $f_n'(t_i)$ (with $t_{i+1}=t_i+\tau$, $\tau=\|x_{i+1}-x_i\|$), inference uses the [[Bayesian Filtering and Smoothing|Kalman filter]]. Two SDE priors:
$$
\mathrm{d}f_n'(t)=0\,\mathrm{d}t+\theta_n\,\mathrm{d}\omega_t\ \ \text{(Wiener, 28.4)},\qquad \mathrm{d}f_n'(t)=-\gamma_n f'(t)\,\mathrm{d}t+\theta_n\,\mathrm{d}\omega_t\ \ \text{(OU, 28.5)},
$$
with Kalman parameters $A_n=1,\ Q=\theta_n^2\tau$ (Wiener) or $A_n=e^{-\gamma_n\tau},\ Q=\tfrac{\theta_n^2}{2\gamma_n}(1-e^{-2\gamma_n\tau})$ (OU). Wiener expects free random-walk drift; OU expects gradients to revert to zero (arguably more realistic for an optimiser driving gradients down).
> [!theorem] Probabilistic gradient descent (Wiener prior)
> With prior mean/variance $m_{i-1},P_{i-1}\in\mathbb{R}^N$ (element-wise) and the optimiser moving $x_i=x_{i-1}+\alpha_i m_{i-1}$, observe $y_i$ with likelihood $p(y_i\mid\nabla f(x_i))=\mathcal{N}(y_i;\nabla f(x_i),\operatorname{diag}R)$ ($R$ estimated as in Eq. 26.18/27.2, $H=1$). The element-wise Kalman update is
> $$
> m_i=(1-K)m_{i-1}+K y_i,\qquad P_i=(1-K)P_i^-=\frac{(P_{i-1}+\theta^2\tau)R}{P_{i-1}+\theta^2\tau+R},
> $$
> with Kalman gain $K=(P_{i-1}+\theta^2\tau)/(P_{i-1}+\theta^2\tau+R)$, and the step
> $$
> x_{i+1}=x_i-\alpha_i m_i=x_i-\alpha_i\big((1-K)m_{i-1}+Ky_i\big).\tag{28.9}
> $$
> **Remarks.** (i) For noise-free observations $R=0$ this reverts to plain gradient descent. (ii) The diffusion scale $\theta$ (equivalently $K$) is a new free parameter, as hard to set as the momentum $\beta$. (iii) Despite superficial similarity to momentum (28.3), the rules differ (note $\alpha_i$ inside vs. outside the bracket) and address *different problems*: momentum dampens under-damped oscillations in *noise-free* optimisation, whereas this filter addresses *evaluation noise*. Conflating the two (common in ML) is a conceptual error; one can combine both into a probabilistic, smoothed momentum method.
^thm-prob-gd

### Second-order: Newton and quasi-Newton methods
> [!definition] Newton's method
> From the second-order Taylor expansion $f(x_i+d)\approx f(x_i)+d^\top\nabla f(x_i)+\tfrac12 d^\top B(x_i)d$, if $B(x_i)$ is spd the quadratic has a unique minimum, giving
> $$
> x_{i+1}=x_i-B^{-1}(x_i)\nabla f(x_i).
> $$
> Newton converges **quadratically** near a spd minimum but requires forming and inverting the Hessian $B(x_i)$ (solving $B(x_i)z=\nabla f(x_i)$) — the dominant cost.
^def-newton

> [!definition] Quasi-Newton / secant equation
> Quasi-Newton methods build an approximation $\hat B(x_i)$ from subsequent gradient observations. Since the Hessian is the rate of change of the gradient,
> $$
> y_i:=\nabla f(x_i)-\nabla f(x_{i-1})=\bar B(x_{i-1}-x_i)=:\bar B s_i,\qquad \bar B:=\int_0^1 B(x_{i-1}+t(x_i-x_{i-1}))\,\mathrm{d}t,
> $$
> so any $\hat B$ satisfying the **secant equation** $y_i=\hat B s_i$ (28.10) is a Hessian candidate (or, with noise-free gradients, the *inverse* secant equation $s_i=\hat H y_i$ estimates $H=B^{-1}$).
^def-secant

> [!definition] The Dennis family
> $$
> B_{i+1}=B_i+\frac{(y_i-B_i s_i)c_i^\top+c_i(y_i-B_i s_i)^\top}{c_i^\top s_i}-\frac{c_i^\top(y_i-B_i s_i)c_i c_i^\top}{(c_i^\top s_i)^2},\tag{28.11}
> $$
> a rank-2 update parameterised by $c_i\in\mathbb{R}^N$. Every non-zero $c_i$ yields a $B_{i+1}$ satisfying the secant equation. Members (Table 28.1):
>
> | Name | $c_i$ | Reference |
> |---|---|---|
> | Symmetric Rank-1 (SR1) | $y_i-B_{i-1}s_i$ | Davidon (1959) |
> | Powell Symmetric Broyden | $s_i$ | Powell (1970) |
> | Greenstadt's method | $B_{i-1}s_i$ | Greenstadt (1970) |
> | DFP | $y_i$ | Davidon; Fletcher & Powell |
> | **BFGS** | $y_i+\sqrt{\tfrac{y_i^\top s_i}{s_i^\top B_{i-1}s_i}}B_{i-1}s_i$ | Broyden/Fletcher/Goldfarb/Shanno |
^def-dennis

The rank-2 form (28.11) is the update already seen in the linear-algebra chapter (Eq. 19.21). Taking a step in the estimated Newton direction $x_{i+1}=x_i-\alpha_i B_{i+1}^{-1}\nabla f(x_i)$ makes quasi-Newton structurally identical to the generic probabilistic linear solver — connecting to [[Conjugate Gradients as Probabilistic Inference]] (on the quadratic with exact line searches, all listed Dennis members produce the *same* sequence as conjugate gradients).

### BFGS/Dennis family as Bayesian inference on the Hessian
> [!theorem] Corollary 28.2 — Dennis family as a matrix-Gaussian posterior mean
> Let $W_i\in\mathbb{R}^{N\times N}$ be spd with $W_i s_i=c_i$. Then the Dennis-family estimate (28.11) equals the **posterior mean on $B$** under the matrix-variate Gaussian prior
> $$
> p(B)=\mathcal{N}(B;B_i,W_i\otimes W_i)
> $$
> and the single Dirac observation likelihood $p(y_i\mid B,s_i)=\delta(y_i-Bs_i)$ (using the posterior form from Eq. 19.11). Thus a *single* quasi-Newton step admits a direct probabilistic interpretation as inference on the Hessian.
^thm-cor282

> [!theorem] No general Kalman-filter interpretation of quasi-Newton
> One can *attempt* to phrase the whole quasi-Newton iteration as a Kalman filter: initialise $m_0=B_0=\varepsilon I$ (so $s_0=-\nabla f(x_0)$), and choose $W_1^-$ with $W_1^- s_1=c_1$ to reproduce a Table-28.1 member, giving $P_1=W_1^--W_1^- s_1(s_1^\top W_1^- s_1)^{-1}s_1^\top W_1^-$ (Eq. 19.11). But to keep the *next* step consistent one needs the prediction $P_2^-=A_1 P_1 A_1^\top+Q_1=W_2^-\otimes W_2^-$ with an spd $W_2$ satisfying $W_2 s_2=c_2$; such a step **does not always exist**, because the required $W_2-W_1$ need not be spd. So, beyond the linear (constant-Hessian) case of Ch. III, there is **no general one-to-one Kalman-filter interpretation** of existing quasi-Newton methods. The root cause: in nonlinear optimisation the Hessian is *not a constant function*, so previously observed aspects become outdated — hence there is no single "best" quasi-Newton method (unlike CG in the linear case).
^thm-no-kalman

## Examples
> [!example] Why so many quasi-Newton methods?
> In the *linear* setting, conjugate gradients is the gold standard for spd problems (a single best method). In *nonlinear* optimisation the Hessian varies, so the solver must make assumptions both about unseen aspects of $B$ and about how observed aspects have changed. This is precisely why the Dennis family is a *family* — BFGS is the most popular but not uniquely best, and other members (e.g. SR1) can be preferable, particularly with noisy gradients.

## Connections
- Uses the [[Probabilistic Step-Size Selection and Line Searches|probabilistic line search]] for $\alpha_i$ (Algorithm 28.1) and its noise estimators (Eq. 26.18/27.2) for $R,\Sigma$.
- Element-wise filtering is [[Bayesian Filtering and Smoothing|Kalman filtering]] on per-coordinate SDEs ([[Gauss-Markov Processes and SDEs]]).
- The rank-2 Hessian update and Corollary 28.2 mirror [[Conjugate Gradients as Probabilistic Inference]] and the matrix-Gaussian solvers of Ch. III.
- Sets up [[The Global Optimisation Problem]]: where each objective evaluation is expensive, *sample* efficiency (converging in fewer steps) outweighs computational efficiency, motivating experimental-design/Bayesian optimisation.

## See Also
- [[Probabilistic Step-Size Selection and Line Searches]] — the inner-loop step size for these directions.
- [[Conjugate Gradients as Probabilistic Inference]] — the linear-case ancestor; matrix-Gaussian priors on $B$.
- [[Bayesian Filtering and Smoothing]] — the Kalman machinery behind probabilistic gradient descent.
- [[The Global Optimisation Problem]] — the pivot from cheap-step to sample-efficient optimisation.
