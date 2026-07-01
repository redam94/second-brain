---
title: Computation as Probabilistic Inference
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Introduction, pp. 1-16; Ch. 2, pp. 21-22"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Gaussian Distributions and Algebra]]"
used_by:
  - "[[The Numerical Agent]]"
  - "[[Gaussian Process Regression]]"
  - "[[The Integration Problem]]"
  - "[[The Linear Algebra Problem and Evaluation Strategies]]"
  - "[[The Local Optimisation Problem]]"
  - "[[Solving ODEs as Inference]]"
  - "[[Probabilistic Numerics - Overview]]"
aliases:
  - PN Thesis
  - Computation as Inference
  - Probabilistic Numerics Thesis
---
# Computation as Probabilistic Inference
> [!summary]
> The central thesis of Probabilistic Numerics (PN): a numerical problem (integration, linear algebra, optimisation, ODEs) whose exact solution has no closed form can be recast as *Bayesian inference* on the intractable latent quantity. One places a **prior** over that quantity, treats each computed number (function/matrix/gradient evaluation) as data delivered through a **likelihood**, and returns a full **posterior** rather than a point estimate. This unifies numerics and statistics: both convert information from a noisy channel into an estimate of a quantity of interest.

## Overview
Numerical problems are those whose solutions are numbers with *no analytic form* — there is no rule-based way to write down their exact value (e.g. an integral $\int f\,\mathrm{d}x$, a solution $x$ of $Ax=b$, a minimiser $\arg\min f$, an ODE solution curve). Any method that computes them, by machine or by hand, is *approximate*: its result is not exactly right, and we do not know precisely how far off it is. That we are *uncertain* about the answer to a fully determined numerical problem is the first of the two central insights of PN (the second being [[The Numerical Agent|the agent view]]).

Classical numerics does not ignore this uncertainty — it reduces it to scalar error bounds. PN instead brings the full statistical machinery of probability measures to numerics. The payoff is fourfold, and forms a recurring thesis throughout the book:
1. **Classical methods are already probabilistic.** Many foundational, widely trusted numerical algorithms can be derived as maximum a posteriori (MAP) or posterior-mean point estimates under concrete (typically Gaussian) prior assumptions. PN is therefore not a philosophical pipe dream: the very methods people trust *are* PN methods, just not usually presented as such.
2. **A full posterior enables uncertainty propagation.** When a numerical result feeds the next computational task (matrix inversion for least squares, solving ODEs for engineering systems, pipelines of big-data processing), a probability distribution propagates uncertainty through the computational graph, rather than discarding it at each step.
3. **Priors encode structure and enable principled early stopping.** A prior distributes probability mass toward expected subsets of the solution space, exploiting less-than-certain expert expectations that a bare function space cannot encode. Well-quantified uncertainty lets a solver stop *early* with a cheap, quantifiably-vague answer.
4. **PN does not equate uncertainty with randomness.** Uncertainty (epistemic, a lack of knowledge) is captured by spreading unit probability mass over a hypothesis space; randomness (aleatory/stochastic) is only *one* way uncertainty can arise. This distinction matters for concepts like bias and for the [[The Numerical Agent|agent's]] decision-making.

Poincaré (1896) already mused about assigning probabilities to not-yet-computed numbers; the idea of computation-as-inference recurred through Sul'din (1959/60), Sard (1963), Kimeldorf & Wahba (1970), Larkin (1972), Diaconis (1988), O'Hagan (1992), and was consolidated under the "Probabilistic Numerics" banner following a 2012 NIPS workshop.

## Main Content
### The information-channel view
> [!definition] Numerical problem as inference
> A **numerical problem** seeks a latent quantity $x^\star$ (an integral value, a linear-system solution, a minimiser, a solution curve) that is *formally determined* by the problem but has no analytic form. PN models it by:
> - a **prior** $p(x)$ over the latent quantity, encoding structural knowledge (e.g. smoothness of an integrand);
> - a **likelihood** $p(y \mid x)$ linking accessible *computations* $y$ (evaluations of an analytic expression: integrand values, matrix–vector products, gradients) to $x$;
> - a **posterior** $p(x \mid y)$ combining them, obtained by Bayes' theorem.
>
> The insight (MacKay's information-theoretic view) is that numerical "data" (outputs of a function) and statistical "data" (noisy measurements) are the same thing: **the output of a (possibly noisy) communication channel**. Numerics and statistics are thus consolidated into one activity.
^def-numerical-inference

The mechanics are those of [[Gaussian Distributions and Algebra|Gaussian algebra]] and [[The Numerical Agent|probabilistic decision theory]]. Bayes' theorem (Ch. 2) reads:
$$ \underbrace{p(x \mid y)}_{\text{posterior}} = \frac{\overbrace{p(y \mid x)}^{\text{likelihood}}\,\overbrace{p(x)}^{\text{prior}}}{\underbrace{\int p(y \mid x)\,p(x)\,\mathrm{d}x}_{\text{evidence}}}. $$
Here $p(y\mid x)$, read as a function of $x$, is the **likelihood** (not a probability density in $x$); computing $p(x\mid y)$ is *inference on $x$ from $y$*. The two rules underlying this are the **sum rule** (marginalisation) $p(y)=\int p(x,y)\,\mathrm{d}x$ and the **product rule** $p(x\mid y)\,p(y)=p(x,y)$. See [[Gaussian Process Regression]] for the Gaussian instantiation.
^bayes-theorem

### Why probabilities, and which probabilities
Probability theory is the accepted formal framework for reasoning with imperfect knowledge (Jaynes & Bretthorst 2003; Cox 1946; Pearl 1988). PN restricts attention, for computational tractability, to **Gaussian** distributions on continuous quantities, because they are closed under the linear operations computers do well (see [[Gaussian Distributions and Algebra]]). A recurring structural result: classical methods arise from a *family* of Gaussian priors sharing one mean (equal to the classical estimate) but scaled uncertainty; the posterior standard deviation contracts at a rate related to classical convergence rates, and the one remaining scale can be calibrated cheaply at runtime (see [[Hierarchical Inference in Gaussian Models]] and [[Uncertainty Calibration for Linear Solvers]]).

### Bayesian vs frequentist framing of PN
> [!definition] Loss-driven prior selection
> The Bayesian norm separates *modelling* (write a prior, compute a posterior) from *decision-making* (choose a loss, minimise expected loss). In numerics, richly-informed priors are computationally expensive; whether to pay for a more elaborate model is itself judged by a **loss function on computation**. PN is thus, unusually, closer to the *frequentist* stance: a (vaguely specified) loss on computation dictates which elements of the prior are worth incorporating.
^def-loss-driven-prior

## Examples
> [!example] Classical quadrature as inference
> The trapezoidal / Gaussian quadrature estimate of $F=\int_a^b f(t)\,\mathrm{d}t$ can be recovered as the posterior *mean* of $F$ under a Gaussian process prior on the integrand $f$, conditioned on the evaluations $f(t_i)$. The classical weights $w_i$ in $\hat F = \sum_i w_i f(t_i)$ are exactly the Bayesian posterior-mean weights. Crucially, the *same* posterior additionally supplies a variance — a calibrated error bar the classical rule discards. See [[Classical Quadrature as Inference]].

> [!example] A computation pipeline
> Solving $Ax=b$ (a linear solve) to feed a least-squares fit, whose output feeds an ODE simulation of a physical system: at each stage the exact answer is intractable and approximated. Classical methods return a point at each stage, silently truncating error. PN carries a posterior distribution from stage to stage, so the final ODE estimate reflects accumulated uncertainty from the earlier linear solve — the "harmonisation of computational pipelines" via graphical models. See [[The Linear Algebra Problem and Evaluation Strategies]], [[Solving ODEs as Inference]].

## Connections
- Generalises the classical view: point estimates become posterior modes/means; see [[Classical Quadrature as Inference]], [[Conjugate Gradients as Probabilistic Inference]], [[Classical ODE Solvers as Regression]].
- The complementary insight — a solver as a decision-making agent — is [[The Numerical Agent]].
- The computational engine is [[Gaussian Distributions and Algebra]]; its function-space form is [[Gaussian Process Regression]].
- Applied per-domain in [[The Integration Problem]], [[The Linear Algebra Problem and Evaluation Strategies]], [[The Local Optimisation Problem]], [[Solving ODEs as Inference]].

## See Also
- [[The Numerical Agent]] — the second PN insight: solvers as expected-loss-minimising agents.
- [[Gaussian Distributions and Algebra]] — the arithmetic that makes inference computationally cheap.
- [[Gaussian Process Regression]] — inference on functions, the canonical PN latent object.
- [[Probabilistic Numerics - Overview]] — top-level map of the whole framework.
