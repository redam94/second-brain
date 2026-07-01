---
title: Hierarchical Inference in Gaussian Models
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 6, pp. 55-60"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Foundations"
doc_type: textbook
depends_on:
  - "[[Gaussian Distributions and Algebra]]"
  - "[[Gaussian Process Regression]]"
  - "[[Bayesian Filtering and Smoothing]]"
used_by:
  - "[[Convergence and Priors in Bayesian Quadrature]]"
  - "[[Uncertainty Calibration for Linear Solvers]]"
  - "[[Theory of ODE Filters and Smoothers]]"
  - "[[ODE Filters and Smoothers]]"
aliases:
  - Hyperparameter Inference
  - Marginal Likelihood
  - Evidence
  - Conjugate Priors
  - Gauss-Gamma
  - Empirical Bayes
  - Type-II Likelihood
---
# Hierarchical Inference in Gaussian Models
> [!summary]
> The parameters $\Theta=\{m,k,A,b,\Lambda\}$ of a Gaussian model shape its posterior, but the "right" ones are usually unknown. **Hierarchical inference** places uncertainty on these **hyperparameters** and uses the **marginal likelihood (evidence / type-II likelihood)** to infer them. For the scalar mean and scale of a Gaussian, a **conjugate prior** (Gauss–Gamma; multivariate Gauss-inverse-Wishart) yields closed-form posterior updates and a Student-$t$ predictive. This is what lets a PN solver **calibrate its uncertainty at runtime** — cheaply estimating the one remaining scale so that its error bars are trustworthy.

## Overview
A recurring PN thesis ([[Computation as Probabilistic Inference]]) is that classical methods arise from a *family* of Gaussian priors sharing one mean (the classical estimate) but differing in an overall uncertainty scale. The posterior standard deviation contracts at a rate tied to the classical convergence rate, differing only by that constant scale. If — and only if — that scale is calibrated well does the posterior variance become a trustworthy notion of numerical error. Hierarchical inference supplies the machinery to estimate it with minimal computational overhead, often *during* the solver's run. Without it, PN uncertainty is arbitrary; with it, the error bars mean something.

## Main Content
> [!definition] Hyperparameters and the evidence
> In a Gaussian model $p(f\mid\Theta)=\mathcal{N}(f;m,k)$, $p(y\mid f,\Theta)=\mathcal{N}(y;Af+b,\Lambda)$, the numbers $\Theta$ that specify the model — mean $m$, kernel $k$ (e.g. output scale $\theta$, length-scale $\lambda$), noise $\Lambda$ — are **hyperparameters**. The distinction between a *variable* (of interest) and a *parameter* (nuisance) is conceptual, not formal; so if $\Theta$ is uncertain, assign it a distribution too. Integrating out $f$ gives the **marginal likelihood** (a.k.a. **evidence** or **type-II likelihood**) for $\Theta$:
> $$ p(y\mid\Theta)=\int p(f\mid\Theta)\,p(y\mid f,\Theta)\,\mathrm{d}f=\mathcal{N}(y;\,Am+b,\;k+\Lambda). $$
> Because this "models the model," it is called **hierarchical inference**.
^def-evidence

Hierarchical inference generally raises cost and yields a *non-Gaussian* (nonlinear) optimisation/inference problem. But for special cases — notably the scale and mean of a Gaussian — analytic forms exist via **conjugate priors**: priors whose posterior has the same functional form (only updated hyperparameters).

### Scalar case: Gauss–Gamma conjugate prior
> [!definition] Gauss–Gamma prior and posterior
> Let $y=[y_i]_{i=1,\dots,N}$ be i.i.d. from $\mathcal{N}(\alpha,\beta^2)$ with unknown mean $\alpha$ and variance $\beta^2$, so $p(y\mid\alpha,\beta)=\mathcal{N}(y;\alpha\mathbf 1,\beta^2 I)$. The conjugate **Gauss–Gamma** prior (hyperparameters $\theta_0=(\mu_0,\lambda_0,a_0,b_0)$) puts a Gaussian on $\alpha$ (variance $\propto\beta^2$) and a Gamma on $\beta^{-2}$:
> $$ \eta(\alpha,\beta\mid\mu_0,\lambda_0,a_0,b_0)=\mathcal{N}\!\big(\alpha;\mu_0,\tfrac{\beta^2}{\lambda_0}\big)\,\mathcal{G}(\beta^{-2};a_0,b_0),\qquad \mathcal{G}(z;a,b)=\tfrac{b^a z^{a-1}}{\Gamma(a)}e^{-bz}. $$
> Multiplying by the likelihood and simplifying via the **sufficient statistics** — sample mean $\bar\alpha=\tfrac1N\sum_i y_i$ (Eq. 6.5) and sample variance $\bar\beta^2=\tfrac1N\sum_i(y_i-\bar\alpha)^2$ (Eq. 6.6) — the posterior is again Gauss–Gamma, $\eta(\alpha,\beta\mid\mu_N,\lambda_N,a_N,b_N)$, with
> $$ \mu_N=\frac{\lambda_0\mu_0+N\bar\alpha}{\lambda_0+N},\quad \lambda_N=\lambda_0+N,\quad a_N=a_0+\tfrac N2,\quad b_N=b_0+\tfrac12\Big(N\bar\beta^2+\tfrac{\lambda_0 N}{\lambda_0+N}(\bar\alpha-\mu_0)^2\Big). \tag{6.8} $$
^def-gauss-gamma

Interpretation: $\lambda_N$ and $a_N$ act as **counters** for how many observations have been collected (with $\lambda_0,2a_0$ the "pseudo-observations" encoded in the prior); $\mu_N,b_N$ are sufficient statistics for the population mean and variance. As $N\to\infty$, $\mu_N\to\bar\alpha$ (sample mean) and $\mathbb{E}(\beta^2)=b_N/a_N\to$ the sample variance plus the correction $\tfrac{\lambda_0 N}{\lambda_0+N}(\bar\alpha-\mu_0)^2$, which corrects for the downward bias of $\bar\beta^2$.

> [!definition] Student-$t$ predictive
> The predictive over the next sample $y_{N+1}$, marginalising the posterior over $(\alpha,\beta)$, is a **Student-$t$** distribution:
> $$ p(y_{N+1}\mid y)=\int\!\!\int p(y_{N+1}\mid\alpha,\beta)\,p(\alpha,\beta\mid y)\,\mathrm{d}\alpha\,\mathrm{d}\beta = \mathrm{St}\big(y_{N+1};\mu_N,\tfrac{b_N}{a_N},2a_N\big). $$
> (Eq. 6.9.) Heavier tails than a Gaussian reflect the residual uncertainty about the variance $\beta^2$.
^def-student-t

### Multivariate case
For $Y=[y_1,\dots,y_N]\in\mathbb{R}^{M\times N}$ i.i.d. from $\mathcal{N}(\alpha,B)$ with unknown mean vector $\alpha$ and covariance $B$, the conjugate prior is the **Gauss-inverse-Wishart**, $p(\alpha,B)=\mathcal{N}(\alpha;\mu_0,\tfrac1{\lambda_0}B)\,\mathcal{W}(B^{-1};W_0,\nu_0)$. The posterior is again Gauss-inverse-Wishart with $\mu_N,\lambda_N,\nu_N=\nu_0+N$ and $W_N=W_0+N\bar B+\tfrac{\lambda_0 N}{\lambda_0+N}(\bar\alpha-\mu_0)(\bar\alpha-\mu_0)^\top$, and the predictive is a multivariate Student-$t$ (Eq. 6.12).

### Hierarchical inference inside filters (the PN payoff)
> [!definition] Runtime scale calibration during filtering
> For a linear-Gaussian [[Bayesian Filtering and Smoothing|state-space model]], the marginal likelihood factorises over the Markov chain (**prediction-error decomposition**):
> $$ p(y\mid\theta)=\prod_{i=1}^N p(y_i\mid y_{1:i-1},\theta)=\prod_{i=1}^N\mathcal{N}(y_i;Hm^-_i,\,\theta^2 H\tilde P^-_i H^\top), $$
> where the output scale $\theta$ (from the SDE's $L=\theta\tilde L$, see [[Gauss-Markov Processes and SDEs]]) is factored out using a **unit-scale** predictive covariance $\tilde P^-_i$ (defined via $\tilde Q_{t_i}=\int_0^{h}e^{F\tau}\tilde L\tilde L^\top e^{F^\top\tau}\mathrm{d}\tau$). With an inverse-Gamma prior $p(\theta^{-2})=\mathcal{G}(\theta^{-2};\alpha_0,\beta_0)$, the posterior on $\theta$ updates **recursively during the filtering pass**:
> $$ p(\theta^{-2}\mid y_{1:N})=\mathcal{G}\Big(\theta^{-2};\ \alpha_0+\tfrac N2,\ \beta_0+\tfrac12\sum_{i=1}^N\frac{(y_i-Hm^-_i)^2}{H\tilde P^-_i H^\top}\Big). \tag{6.14} $$
> In `Filter` (Alg. 5.1) this is realised by using $\tilde Q$ instead of $Q$ and adding two scalar updates per step (initialised $\alpha\leftarrow\alpha_0,\beta\leftarrow\beta_0$). The corresponding Student-$t$ marginal on the state can be computed locally each step.
^def-runtime-calibration

This is exactly why "runtime hyperparameter calibration matters for PN uncertainty": the output scale $\theta$ — the single free constant that turns a contraction *rate* into an absolute error bar — is estimated on the fly with negligible ($\mathcal{O}(1)$ per step) overhead, keeping the solver's uncertainty well-calibrated.

### Empirical Bayes vs full Bayes
- **Empirical Bayes (type-II ML):** pick a point estimate $\hat\theta=\arg\max_\theta p(y\mid\theta)$ (maximise the evidence) and plug it in. Cheap; ignores hyperparameter uncertainty.
- **Full Bayes:** integrate over $\theta$ (the predictive Student-$t$ above), propagating hyperparameter uncertainty into the final answer. More faithful; here tractable thanks to conjugacy.
One could iterate hierarchical layers *ad infinitum*, but this is not done in practice to keep cost finite.

## Examples
> [!example] Scaled-observation variant (Exercise 6.1)
> If instead of $y_i$ one observes individually scaled samples $a_i=y_i s_i$ with known scales $s_i$, the same Gauss–Gamma machinery applies with modified sufficient statistics $\bar\alpha=\tfrac1N\sum_i a_i/s_i$ and $\bar\beta^2=\tfrac1N\sum_i(a_i/s_i-\bar\alpha)^2$. This heteroscedastic variant is exactly what appears when calibrating linear-solver uncertainty (§III).

> [!example] Calibrating an ODE filter's error bars
> An [[ODE Filters and Smoothers|ODE filter]] with an IWP prior has an unknown diffusion scale $\theta$ governing how fast its uncertainty grows between steps. Running the recursive Gamma update (Eq. 6.14) alongside the Kalman filter yields a data-driven $\theta$, so the solver's reported credible intervals contract at the right absolute magnitude — the difference between a decorative error bar and a usable one.

## Connections
- Infers the parameters of the Gaussians defined in [[Gaussian Distributions and Algebra]], [[Gaussian Process Regression]], and [[Gauss-Markov Processes and SDEs]].
- The recursive-scale-in-filtering scheme feeds directly into [[ODE Filters and Smoothers]] and [[Theory of ODE Filters and Smoothers]].
- Calibration of the remaining scale is applied in [[Uncertainty Calibration for Linear Solvers]] and [[Convergence and Priors in Bayesian Quadrature]].

## See Also
- [[Gaussian Process Regression]] — the model whose kernel hyperparameters are inferred here.
- [[Bayesian Filtering and Smoothing]] — where runtime scale calibration is embedded (Eq. 6.14).
- [[Uncertainty Calibration for Linear Solvers]] — the same idea for linear-algebra solvers.
- [[Computation as Probabilistic Inference]] — why calibrated scale makes PN error bars meaningful.
