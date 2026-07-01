---
title: "Index: Optimisation (Probabilistic Numerics)"
tags: [type/index, source/ingested]
parent: "[[../_Index|Probabilistic Numerics]]"
date_updated: 2026-07-01
concept_count: 8
---
# Optimisation

> [!abstract] Routing Summary
> This leaf covers **Parts IV–V** of *Probabilistic Numerics* (Hennig, Osborne, Kersting 2022), on optimisation as probabilistic inference and decision-making.
>
> - **LOCAL optimisation (Part IV, Ch. 24–28, book pp. 195–241).** Minimise a possibly stochastic/noisy objective $f:\mathbb{R}^N\to\mathbb{R}$ via an iterative loop of **direction** and **step-size** decisions. Under mini-batch (empirical-risk) noise the Dirac likelihood of classical numerics is replaced by an explicit Gaussian likelihood. Start at **[[The Local Optimisation Problem]]** → the inner-loop step size at **[[Probabilistic Step-Size Selection and Line Searches]]** (probabilistic line search, probabilistic Wolfe conditions, batch-size & early-stopping rules) → the outer-loop direction at **[[First- and Second-Order Optimisation Methods]]** (probabilistic gradient descent as Kalman filtering; BFGS/Dennis family as Hessian inference).
> - **GLOBAL optimisation (Part V, Ch. 29–34, book pp. 243–278).** Find the global minimiser of an expensive, multimodal black box; balance **exploration vs. exploitation** with a probabilistic **surrogate**. Start at **[[The Global Optimisation Problem]]** → the loop at **[[Bayesian Optimisation]]** (surrogate + acquisition = expected loss; myopic approximation) → loss framings at **[[Value Loss and Entropy Search]]** (EI, KG, ES/PES/MES, multi-step look-ahead) → concrete formulae at **[[Acquisition Functions]]** (PI, EI, UCB, KG) → extensions at **[[Further Topics in Global Optimisation]]** (batch, multi-fidelity, AutoML).
> - **Which acquisition?** PI (most exploitative) $\lesssim$ EI (balanced default, under-exploratory) $\lesssim$ UCB (explorative, has regret bounds); KG (global, noise-robust, not closed-form); ES/PES/MES (information-theoretic, truly global, noise-robust).

## Concept Map
| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Local setting & batch noise | [[The Local Optimisation Problem]] | concept | Computation as Inference; Numerical Agent | ERM batch gradient $\sim\mathcal{N}(\nabla\mathcal{L},\tfrac1M\Sigma)$; Dirac→explicit likelihood; exact-line-search SD converges linearly (Thm 25.1/25.3) |
| Line search & step size | [[Probabilistic Step-Size Selection and Line Searches]] | concept, theorem | Local Optimisation Problem; GP Regression; Gauss-Markov SDEs | Wolfe conditions (26.5–26.8); cubic spline = noise-free limit of integrated-Wiener GP; Wolfe prob. as bivariate-normal integral; optimal batch $M_*$ (27.3); early-stop test |
| Search directions | [[First- and Second-Order Optimisation Methods]] | concept, theorem | Line Searches; Bayesian Filtering; Conjugate Gradients | Prob. gradient descent = element-wise Kalman filter (28.9); Dennis family (28.11); BFGS-as-inference (Cor. 28.2); no general quasi-Newton Kalman form |
| Global setting | [[The Global Optimisation Problem]] | concept | Local Optimisation Problem; GP Regression; Numerical Agent | Exploration–exploitation trade-off; surrogate required; $\lesssim20$ dims |
| The BO loop | [[Bayesian Optimisation]] | concept, theorem | Global Optimisation Problem; GP Regression; Bayesian Quadrature | Surrogate + loss → acquisition = expected loss; full loss intractable → myopic one-step (int over $y_n$); acquisition easier to optimise than objective |
| Loss framings | [[Value Loss and Entropy Search]] | concept, theorem | Bayesian Optimisation; GP Regression; Bayesian Quadrature | EI (32.1–32.2); KG (32.3); ES/IAGO, PES (33.4), OPES/MES; winner's curse; multi-step = Bellman, exp. in horizon (32.4) |
| Acquisition formulae | [[Acquisition Functions]] | definition, example | Bayesian Optimisation; Value Loss; GP Regression | PI (33.1), EI (32.2), UCB (33.3), KG closed/near-forms; PI$\lesssim$EI$\lesssim$UCB; portfolios |
| Practical extensions | [[Further Topics in Global Optimisation]] | concept, overview | Bayesian Optimisation; Acquisition Functions; Value Loss | Batch/parallel BO; BO vs. RL; AutoML; conditional hyperparams; multi-fidelity; `emukit` |

## Notes
- [[The Local Optimisation Problem]] — CONTAINS: unconstrained nonlinear minimisation, the direction+step-size loop, steepest-descent convergence theorems, empirical risk minimisation, mini-batch Gaussian gradient likelihood.
- [[Probabilistic Step-Size Selection and Line Searches]] — CONTAINS: Wolfe (weak/strong) conditions, classical cubic-spline line search, integrated-Wiener GP line search, probabilistic Wolfe conditions (bivariate-normal integral), EI node selection, runtime noise estimators, optimal batch size, statistical early stopping.
- [[First- and Second-Order Optimisation Methods]] — CONTAINS: gradient descent, momentum/heavy-ball, Nesterov, Adam; probabilistic gradient descent as per-coordinate Kalman filter (Wiener/OU); Newton; quasi-Newton secant equation; Dennis family & BFGS table; BFGS-as-Bayesian-inference (Cor. 28.2); limits of the Kalman interpretation.
- [[The Global Optimisation Problem]] — CONTAINS: global vs. local minimum, expensive noisy black box, exploration–exploitation trade-off, why a probabilistic surrogate is needed.
- [[Bayesian Optimisation]] — CONTAINS: surrogate + loss components, VL/LIL/VIL losses, the decision graphical model, acquisition = expected loss, myopic approximation, why acquisition optimisation is tractable.
- [[Value Loss and Entropy Search]] — CONTAINS: Expected Improvement, Knowledge Gradient, noisy EI/winner's curse, entropy search/IAGO, predictive entropy search, OPES/MES, multi-step look-ahead as dynamic programming.
- [[Acquisition Functions]] — CONTAINS: full closed forms for PI, EI, UCB (GP-UCB), KG; exploration–exploitation ordering; hyperparameters ($\epsilon_n$, $\beta_n$); portfolios; retrospective PI scoring.
- [[Further Topics in Global Optimisation]] — CONTAINS: batch/parallel BO, BO vs. reinforcement learning, AutoML hyperparameter tuning, conditional hyperparameters, training-curve early information, multi-fidelity, software (`emukit`).

## Sources
- [[raw/ProbabilisticNumerics.pdf]] — *Probabilistic Numerics: Computation as Machine Learning*, Hennig, Osborne & Kersting (Cambridge University Press, 2022), **Parts IV–V, book pp. 195–278** (Ch. 24–34).

## See Also
- [[../Foundations/_Index|Foundations]] — Gaussian algebra, GP regression, Gauss-Markov/SDEs, Bayesian filtering, the numerical agent.
- [[../Integration/_Index|Integration]] — Bayesian quadrature; value-of-information/acquisition integrals reused here.
- [[../Linear Algebra/_Index|Linear Algebra]] — probabilistic linear solvers & conjugate gradients (quasi-Newton connection).
- [[../Differential Equations/_Index|Differential Equations]] — implicit ODE solvers (Nesterov's method) and Gauss-Markov priors.
