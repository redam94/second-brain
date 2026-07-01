---
title: Bayesian Optimisation
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 31, pp. 251-257"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[The Global Optimisation Problem]]"
  - "[[Gaussian Process Regression]]"
  - "[[The Numerical Agent]]"
  - "[[Bayesian Quadrature]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Value Loss and Entropy Search]]"
  - "[[Acquisition Functions]]"
  - "[[Further Topics in Global Optimisation]]"
aliases:
  - BO
  - Bayesian Optimization
  - Surrogate and Acquisition
  - Acquisition Function
  - Myopic Approximation
---
# Bayesian Optimisation
> [!summary]
> Bayesian optimisation (BO) is the probabilistic framework for [[The Global Optimisation Problem|global optimisation]]. Its designer makes two choices: a **prior/surrogate** $p(f)$ (usually a [[Gaussian Process Regression|GP]]) modelling the objective and its minimum, and a **loss function** encoding the goal. The loss, mapped through the surrogate, becomes an **acquisition function** $\alpha(x_n\mid\mathcal{D}_n)$ — an *expected loss* whose optimiser selects the next evaluation. The full expected loss must marginalise over all *future* evaluations and locations — intractable — so BO adopts **myopic** (one-step look-ahead) approximations. Maximising a cheap acquisition (with closed-form gradients/Hessian) replaces optimising the expensive objective: a numerical problem calling another.

## Overview
As for any [[Computation as Probabilistic Inference|PN procedure]], a BO algorithm has two components: its **prior** and its **loss**. The prior $p(f)$ models the objective — and hence, under mild assumptions, its minimum $p(f(x_*))$ and minimiser $p(x_*)$. The loss specifies the goals. BO is a genuine [[The Numerical Agent|decision-making agent]]: it acts by evaluating $f$, receives evaluations as data, and updates. This note gives the formal setup (the decision problem, the surrogate, the acquisition mechanism); the specific losses are in [[Value Loss and Entropy Search]] and the concrete acquisition formulae in [[Acquisition Functions]].

## Main Content
### The prior / surrogate
> [!definition] Surrogate
> The **surrogate** is the optimiser's probabilistic model of the objective — the global-optimisation equivalent of the *model* in [[Bayesian Quadrature|numerical integration]]. It is usually a [[Gaussian Process Regression|GP]] prior $p(f)$ encoding strong structure (smoothness), for the same reasons priors are built for integrands. It must be probabilistic because (i) evaluations are often noisy, so it must accommodate uncertain data, and (ii) reasoning about uncertainty in **unvisited regions** controls exploration. Alternatives include random forests and neural networks, whose better scaling is often offset by poorer calibration of their uncertainties. The input space need not be $\mathbb{R}^d$: discrete or graph-based inputs (e.g. molecules) are admissible whenever a prior $p(f(x))$ can be defined.
^def-surrogate

### The loss function and its candidate framings
> [!definition] Three candidate loss functions (31.1)
> At termination the algorithm returns a single point $x_N$; with data $\mathcal{D}_N=\{(x_i,y_i)\mid i=0,\dots,N-1\}$ and (for now) exact evaluations $y_i=f(x_i)$, the loss can be framed as:
> $$\lambda_{\text{VL}}(x_N,y_N,\mathcal{D}_N)=y_N\qquad\text{(value loss — VL)},$$
> $$\lambda_{\text{LIL}}(x_N,y_N,\mathcal{D}_N)=\mathbb{H}(x_*\mid x_N,y_N,\mathcal{D}_N)\qquad\text{(location-information loss — LIL)},$$
> $$\lambda_{\text{VIL}}(x_N,y_N,\mathcal{D}_N)=\mathbb{H}(f(x_*)\mid x_N,y_N,\mathcal{D}_N)\qquad\text{(value-information loss — VIL)},$$
> where $\mathbb{H}$ is (Shannon) entropy. **VL**: return a persistent object worth its objective value (e.g. the best drug molecule). **LIL**: the entropy of the minimiser's *location* $x_*$ (appropriate when one can later drill/evaluate near $x_N$). **VIL**: the entropy of the minimum *value* $f(x_*)$ (appropriate when the minimum is of scientific interest). Crucially, the loss must remain the **same throughout** the run for coherent optimisation.
^def-losses

### The decision problem and acquisition functions
Figure 31.2 depicts BO as a graphical model / sequential decision problem: given $\mathcal{D}_n$, decide $x_n$ (a diamond node), evaluate $y_n=f(x_n)$, append to get $\mathcal{D}_{n+1}$, repeat until the final $x_N$ is returned. The joint distribution is challenging because all variables are dependent.
> [!definition] Acquisition function as expected loss
> An **acquisition function** (a.k.a. infill / query-selection function) is the *expected loss* as a function of the next evaluation location $x_n$; its optimum is the optimal placement. In general it must marginalise not only the evaluation $y_n$ but *all future* $y_n,\dots,y_N$ and locations $x_n,\dots,x_N$:
> $$\alpha(x_n\mid\mathcal{D}_n)=\mathbb{E}\big(\lambda(x_n,y_n,\mathcal{D}_n)\big).$$
> This full marginalisation is typically **impossible in closed form** (Kushner 1964: "generally so complicated that it usually is not a practical calculation"). In a decision-theoretic PN framing the acquisition is *derived from* the loss — no separate recommendation strategy is needed. The acquisition fills the same role as a **design rule in integration** ([[Bayesian Quadrature]]).
^def-acquisition

### Myopic approximation
> [!theorem] Myopic (one-step) acquisition
> Under a **myopic** approximation — ignore all future evaluations beyond the very next, $f(x_n)$ — the expected loss reduces to a single integral over $y_n$:
> $$\alpha(x_n\mid\mathcal{D}_n)=\mathbb{E}\big(\lambda(x_n,y_n,\mathcal{D}_n)\big)=\int\lambda(x_n,y_n,\mathcal{D}_n)\,p(y_n\mid\mathcal{D}_n)\,\mathrm{d}y_n.$$
> Justifications (Kushner 1964; Hennig & Schuler 2012): the surrogate is often *wrong*, so relying less on it (myopia) can be helpfully conservative; and active inference has no "dead ends" — an uninformative evaluation can always be overcome by later ones (Bayesian consistency), so myopic losses still promote exploration and perform reasonably. Note $\alpha(x\mid\mathcal{D}_n)$ and $\alpha(x\mid\mathcal{D}_{n+1})$ differ: with fewer future evaluations remaining there are fewer potential "surprises", so $p(x_N\mid\mathcal{D}_n)$ is *more diffuse* than $p(x_N\mid\mathcal{D}_{n+1})$ — the loss must stay fixed but the posteriors sharpen.
^thm-myopic

### Why replacing one global optimisation with another helps
Most acquisition functions are **non-convex** (a diverse set of valuable locations, some near modes, some far), so BO requires a *further* global optimiser to maximise the acquisition. This is not circular because the acquisition is far more tractable than the objective:
> [!definition] Acquisition is easier to optimise than the objective
> 1. It is usually **much cheaper** to evaluate (runs on a computer; the objective might require drilling an oil well).
> 2. It usually admits **closed-form gradients and Hessian**, greatly aiding its optimisation.
> 3. Performance is **relatively insensitive** to how well the acquisition is optimised — even its local optima give usefully informative evaluations — so a "cheap and dirty" optimiser suffices.
>
> This mirrors the numeric hierarchy where important algorithms (quadrature) may call less-important ones (linear solvers); a PN goal is to formalise this hierarchy so uncertainty propagates through the pipeline.
^def-inner-opt

## Examples
> [!example] GP surrogate driving the minimiser posterior (Fig. 31.1)
> A zero-mean GP with a rational-quadratic kernel (unit length scale, $\alpha=0.5$), conditioned on three observations, yields a posterior mean, marginal uncertainties, and sample functions — and thereby an **intractable probability density over the minimiser location $x_*$** (plotted along the bottom, approximable by a histogram from exhaustive sampling). There is finite probability mass for $x_*$ at the domain boundary. This $p(x_*)$ is exactly the object whose entropy the LIL targets, and whose exploitable structure the acquisition functions exploit.

## Connections
- Solves [[The Global Optimisation Problem]]; the surrogate is a [[Gaussian Process Regression|GP]] and the acquisition a design rule as in [[Bayesian Quadrature]].
- Embodies [[The Numerical Agent|the agent view]]: acquisition = expected loss = an action minimising expected loss.
- The three losses are developed in [[Value Loss and Entropy Search]] (VL, VIL/entropy search) and the concrete acquisitions in [[Acquisition Functions]] (PI, EI, UCB, KG).
- Overcoming myopia (multi-step look-ahead) and batch/multi-fidelity extensions are in [[Value Loss and Entropy Search]] §32.4 and [[Further Topics in Global Optimisation]].

## See Also
- [[Value Loss and Entropy Search]] — the VL/EI/KG and information-theoretic loss framings.
- [[Acquisition Functions]] — closed-form PI, EI, UCB, KG.
- [[The Global Optimisation Problem]] — the problem BO solves.
- [[Bayesian Quadrature]] — the integration analogue (surrogate = model, acquisition = design rule).
