---
title: "Q: The Kalman filter appears in the vault in three places — BSTS / CausalImpact, the linear-Gaussian state-space notes, and probabilistic ODE solvers (plus Gauss–Markov priors in probabilistic numerics). What is shared, what differs, and what does seeing them together buy?"
tags:
  - type/qa
  - topic/time-series
  - topic/bayesian-statistics
  - topic/probabilistic-numerics
  - topic/causal-inference
  - topic/market-response
date_asked: 2026-09-18
answered_from:
  - "[[State-Space Models and the Kalman Filter - Overview]]"
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[The Kalman Filter]]"
  - "[[The RTS Smoother]]"
  - "[[Marginal Likelihood via the Kalman Filter]]"
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Local Linear Trend and Seasonality]]"
  - "[[MCMC Inference for CausalImpact]]"
  - "[[Counterfactual Impact Estimation]]"
  - "[[Bayesian Filtering and Smoothing]]"
  - "[[Gauss-Markov Processes and SDEs]]"
  - "[[Hierarchical Inference in Gaussian Models]]"
  - "[[Solving ODEs as Inference]]"
  - "[[ODE Filters and Smoothers]]"
  - "[[Theory of ODE Filters and Smoothers]]"
  - "[[Further Topics in ODE Solvers]]"
  - "[[Gaussian Process Regression]]"
  - "[[Hilbert Space Gaussian Processes]]"
  - "[[Model Building - Time-Series Decomposition for Birthdays]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Transfer Function Model]]"
  - "[[DeepAR and Global Autoregressive Neural Forecasters]]"
related_questions:
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - Kalman filter in BSTS vs ODE filters
  - One filter three uses
  - State-space models across causal inference and probabilistic numerics
---

# The Kalman filter appears in the vault in three places — BSTS / CausalImpact, the linear-Gaussian state-space notes, and probabilistic ODE solvers. What is shared, what differs, and what does seeing them together buy?

> [!summary]
> All three are the **same algorithm on the same model class**: a Markov latent state with local observations, solved by a forward predict/update pass, a backward RTS pass, and a free marginal likelihood from the innovations — i.e. $\mathcal O(N)$ Gaussian-process regression with a Gauss–Markov prior. What differs is *what is plugged in*: in BSTS the state is trend + seasonality + regression, the data are real noisy sales, and the posterior is **extrapolated without updates** to give a counterfactual; in an ODE filter the state is the solution and its derivatives, the "data" are self-generated zeros $x'-f(x)=0$ with $R=0$, and the posterior covariance is a **numerical error estimate**. Seeing them together gives one notation, portable engineering (square-root filtering, EKF1/IEKS linearisation, innovation-based calibration), a state-space reading of adstock, and — the real prize — a single filter that fuses a mechanistic ODE with observed data.

## Answer

### 1. The shared core (what is genuinely the same idea)

The three clusters cite two books — Särkkä (2013) for the [[State-Space Models and the Kalman Filter - Overview|State-Space and Kalman Filter folder]] and Hennig–Osborne–Kersting for [[Bayesian Filtering and Smoothing]] — but state identical mathematics.

1. **Model.** A hidden Markov state and conditionally independent measurements: $p(\mathbf x_k\mid\mathbf x_{k-1})$, $p(\mathbf y_k\mid\mathbf x_k)$ ([[Linear-Gaussian State-Space Models#^def-ssm]]; Def. 5.1 in [[Bayesian Filtering and Smoothing#^def-markov-chain]]). These "two properties are exactly what makes the predict/update recursion valid".
2. **Forward pass.** Chapman–Kolmogorov prediction then Bayes update; in the linear-Gaussian case only $(\mathbf m_k,\mathbf P_k)$ move:

> [!theorem] Kalman filter ([[The Kalman Filter#^thm-kalman]]; identical to [[Bayesian Filtering and Smoothing#^thm-kalman-filter]])
> $$
> \mathbf m_k^- = \mathbf A\mathbf m_{k-1},\qquad \mathbf P_k^- = \mathbf A\mathbf P_{k-1}\mathbf A^{\mathsf T}+\mathbf Q
> $$
> $$
> \mathbf v_k=\mathbf y_k-\mathbf H\mathbf m_k^-,\quad \mathbf S_k=\mathbf H\mathbf P_k^-\mathbf H^{\mathsf T}+\mathbf R,\quad \mathbf K_k=\mathbf P_k^-\mathbf H^{\mathsf T}\mathbf S_k^{-1}
> $$
> $$
> \mathbf m_k=\mathbf m_k^-+\mathbf K_k\mathbf v_k,\qquad \mathbf P_k=\mathbf P_k^--\mathbf K_k\mathbf S_k\mathbf K_k^{\mathsf T}
> $$

3. **Backward pass.** The RTS smoother with gain $\mathbf G_k=\mathbf P_k\mathbf A^{\mathsf T}[\mathbf P_{k+1}^-]^{-1}$ gives $p(\mathbf x_k\mid\mathbf y_{1:T})$, and $\mathbf P_k^s\preceq\mathbf P_k$ except at the endpoint ([[The RTS Smoother#^thm-rts]]). The ODE smoothers EKS0/EKS1 use the very same recursion ([[ODE Filters and Smoothers]], Eqs. 38.23–38.25).
4. **Free marginal likelihood.** The update normaliser is $p(\mathbf y_k\mid\mathbf y_{1:k-1})=\mathcal N(\mathbf H\mathbf m_k^-,\mathbf S_k)$, so $p(\mathbf y_{1:T}\mid\boldsymbol\theta)$ is a recursive sum of $\tfrac12\log|2\pi\mathbf S_k|+\tfrac12\mathbf v_k^{\mathsf T}\mathbf S_k^{-1}\mathbf v_k$ ([[Marginal Likelihood via the Kalman Filter#^thm-energy]]). The PN book states the same prediction-error decomposition and uses it to calibrate the prior scale ([[Hierarchical Inference in Gaussian Models#^def-runtime-calibration]]).
5. **What it "is".** Filter + smoother return marginals **exactly equal** to GP regression under the corresponding Gauss–Markov prior, at $\mathcal O(N)$ instead of $\mathcal O(N^3)$ ([[Bayesian Filtering and Smoothing#^thm-filter-gp-equivalence]]; [[Gaussian Process Regression]]). Discretising a linear SDE $\mathrm dx=Fx\,\mathrm dt+L\,\mathrm d\omega_t$ supplies $A(h)=e^{Fh}$ and $Q(h)=\int_0^h e^{F\tau}LL^{\mathsf T}e^{F^{\mathsf T}\tau}\mathrm d\tau$ ([[Gauss-Markov Processes and SDEs]]).

So "the Kalman filter" is never the model — it is the inference routine for any chain-structured Gaussian model. The content is always in $\mathbf A,\mathbf H,\mathbf Q,\mathbf R$ and in what you do with the posterior.

### 2. Side by side: what plays each role

| Role | Särkkä notes (generic) | BSTS / CausalImpact | Probabilistic ODE filter | Koyck / adstock / TF (*synthesis*) |
|---|---|---|---|---|
| Notation | $\mathbf A,\mathbf H,\mathbf Q,\mathbf R$ | $T_t, Z_t, R_tQ_tR_t^\top,\sigma_\varepsilon^2$ ([[Bayesian Structural Time-Series Model#^def-bsts]]) | $A(h),\tilde H,Q(h),R{=}0$ | $\lambda$ (retention), $\beta$ |
| **State** | position + velocity (car tracking) | $(\mu_t,\delta_t,\gamma_t,\dots,\beta_t)$: level, slope, $S{-}1$ seasonals, dynamic coefficients | $[x,x',\dots,x^{(q)}]$: the solution and $q$ derivatives | goodwill / adstock stock $s_t$; or time-varying $\beta_t$ |
| **Transition** | Wiener-velocity discretisation | block-diagonal: $\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$ trend, sum-to-zero seasonal matrix, identity for $\beta_t$ ([[Local Linear Trend and Seasonality]]) | $q$-times integrated Wiener process: $[A(h)]_{ij}=h^{j-i}/(j-i)!$ — a **Taylor extrapolation** ([[ODE Filters and Smoothers#^thm-iwp-taylor]]) | $s_t=\lambda s_{t-1}+x_t$; return-to-normality $\beta_t=(1-\phi)\bar\beta+\phi\beta_{t-1}+\nu_t$ |
| **Observation** | noisy position | $y_t=Z_t^\top\alpha_t+\varepsilon_t$: real KPI, $Z_t$ carries control series $\mathbf x_t$ | $z_n=Hx_n-f(H_0x_n)\overset{!}{=}0$: a Dirac likelihood on the ODE residual; nonlinear in the state | sales $=\beta s_t+$ noise (then Hill saturation makes it nonlinear) |
| Where data come from | sensors | the world (pre-period only) | the solver itself, by evaluating $f$ at its own predicted mean | the world |
| Observation noise | $\mathbf R>0$ | $\sigma_\varepsilon^2>0$, learned | $R=0$ recommended ("a positive $R$ can absorb linearisation error") | learned |
| Linear? | yes | yes given $\theta$ | prediction exact; update linearised: EKF0 ($\tilde H=H$) or EKF1 ($\tilde H=H-J_fH_0$) | linear only before saturation |
| Hyperparameters | MAP / MCMC / EM on $\varphi_T(\theta)$, states integrated out | Gibbs: states by Durbin–Koopman simulation smoother, variances by conjugate Gamma, $\beta$ by spike-and-slab ([[MCMC Inference for CausalImpact]]) | one scale $\sigma^2$: quasi-ML $\hat\sigma^2=\tfrac1N\sum\hat z_n^\top\tilde S_n^{-1}\hat z_n$, or recursive Gamma update | $\lambda,\phi$ by GLS / Kalman |
| **Posterior used for** | denoising (RMSE $0.77\to0.43\to0.27$) | **counterfactual forecast** $p(\tilde{\mathbf y}_{n+1:m}\mid\mathbf y_{1:n},\mathbf x_{1:m})$, then $\phi_t=y_t-\tilde y_t$ ([[Counterfactual Impact Estimation]]) | **numerical error estimate**: $\sqrt{P(T)}\le C h^q$, step-size control, uncertainty-aware likelihood | long-run multiplier, carryover attribution |
| Filter or smoother? | both | smoothing inside the pre-period, **pure prediction** after the intervention | EKS1 by default; EKF1 if only $x(T)$ matters | either |

Three observations the table makes visible:

**(a) The BSTS trend is nearly the ODE solver's prior.** *Synthesis:* the local linear trend $\mu_{t+1}=\mu_t+\delta_t+\eta_\mu$, $\delta_{t+1}=\delta_t+\eta_\delta$ has the transition $\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$, which is $A(h)$ of the once-integrated Wiener process at $h=1$. The difference is the noise: BSTS takes independent $\operatorname{diag}(\sigma_\mu^2,\sigma_\delta^2)$, whereas the exact discretisation gives the correlated $\theta^2\left(\begin{smallmatrix}h^3/3&h^2/2\\h^2/2&h\end{smallmatrix}\right)$ — the matrix that appears verbatim in Särkkä's car-tracking example in [[Linear-Gaussian State-Space Models]]. With $\sigma_\mu^2=0$ the BSTS trend is an integrated random walk whose smoothed mean is, by [[Gaussian Process Regression]], a **cubic smoothing spline**. The AR(1)-slope variant ($\delta_{t+1}=D+\rho(\delta_t-D)+\eta$) is the discrete cousin of the integrated Ornstein–Uhlenbeck prior (IOUP) that ODE filters use for decaying solutions.

**(b) The same widening band means opposite things.** In CausalImpact the post-period is handled by running the filter forward with **no update step**, so $\mathbf P^-$ accumulates $\mathbf Q$ each step; intervals "widen progressively" because "the local linear trend $\delta_t$ drifts as a random walk" ([[Counterfactual Impact Estimation]]). In an ODE filter the prediction step inflates uncertainty identically — "exactly the intuition of accumulating numerical error between evaluation nodes" ([[Gauss-Markov Processes and SDEs]]) — but an update follows at every grid point, so the band contracts at rate $h^q$ ([[Theory of ODE Filters and Smoothers#^thm-calib]]). BSTS uncertainty is about a world that was never observed; ODE-filter uncertainty is about a deterministic quantity not yet computed (the vault flags this as an open philosophical question, §42.7 in [[Further Topics in ODE Solvers]]).

**(c) States out, or states in.** [[Marginal Likelihood via the Kalman Filter]] integrates states out and samples $\theta$ from $\exp(-\varphi_T(\theta))$; [[MCMC Inference for CausalImpact]] does the complement — it *draws* states and then samples variances conditionally, because the spike-and-slab prior breaks the closed form. The ODE filter does neither: it has one hyperparameter and estimates it in closed form from the innovations. All three put an inverse-Gamma on the variance scale ($1/\sigma^2\sim\mathcal G(\nu/2,s/2)$ in BSTS; $\theta^{-2}\sim\mathcal G(\alpha_0,\beta_0)$ in PN).

### 3. What only looks similar

- **[[Hilbert Space Gaussian Processes|HSGP]] vs state-space GPs.** Both make GP time-series decompositions cheap, and the birthdays model (trend + annual cycle + weekday, [[Model Building - Time-Series Decomposition for Birthdays]]) is the GP twin of BSTS. But HSGP gets $\mathcal O(nm^2)$ from a truncated **basis expansion** on $[-L,L]$ with kernel-independent basis functions; the Kalman route gets $\mathcal O(N)$ from the **Markov property**, exactly and only for Gauss–Markov kernels (IWP, Matérn-$\nu=q+\tfrac12$). HSGP handles the squared-exponential and periodic kernels, works inside HMC with non-Gaussian likelihoods, and is not recursive.
- **[[DeepAR and Global Autoregressive Neural Forecasters|DeepAR]]'s hidden state is not a latent state.** $h_{i,t}$ is a deterministic function of observed inputs, so "in contrast to state space models with latent variables — no inference is required". There is no filtering, no smoothing, no component you can switch off to form a counterfactual.
- **Adstock is a state only in a degenerate sense.** *Synthesis:* geometric adstock $s_t=\lambda s_{t-1}+x_t$ (the Koyck recursion of [[Carryover Effects and Distributed Lags#^def-koyck]], equivalently $\omega_0/(1-\delta L)$ in the [[Transfer Function Model]]) is a transition with a *known input* and *zero process noise*: given $\lambda$ the state is computed, not inferred. The Kalman filter becomes useful only when something stochastic is added — a random-walk or return-to-normality coefficient $\beta_t$ (which the MRM book says is "estimated via Kalman filter", and which is BSTS's dynamic regression with AR(1) instead of random-walk dynamics), or process noise on the goodwill stock. Delayed adstock with window $L$ ([[Carryover (Adstock) Functional Forms]]) needs an $L$-dimensional shift-register state, structurally like the seasonal block. And $\lambda$ sits inside $\mathbf A$, so it is a *parameter* learned through the marginal likelihood, never a state.

### 4. What seeing them together buys

1. **One implementation, one diagnostic.** Standardised innovations $\mathbf S_k^{-1/2}\mathbf v_k$ should be white and unit-variance in any of these models; the ODE filter's $\hat\sigma^2$ is literally their mean square. *Synthesis:* run the same check on a BSTS pre-period before trusting the counterfactual interval.
2. **Numerical engineering transfers.** PN had to solve ill-conditioning ($Q(h)$ entries span $2q$ orders of magnitude) with Nordsieck rescaling and square-root (Cholesky/QR) filtering ([[Theory of ODE Filters and Smoothers]]). A BSTS with $S=52$ seasonals plus dynamic regression has the same covariance-conditioning problem.
3. **A ladder for nonlinearity.** The ODE notes supply what the Särkkä folder omits: EKF0 (no Jacobian) → EKF1 → IEKS (MAP, re-linearise to a fixed point) → particle filter for bimodal posteriors (the Bernoulli-ODE bifurcation, which "a Gaussian ODE filter would … miss entirely"). That is the menu for a state-space MMM with a saturating observation equation.
4. **Filter vs smoother is a question about the estimand.** PN: "EKF1 … good if only final-time $T$ matters", EKS1 when the whole path matters. Causal analogue: retrospective decomposition of the pre-period is smoothing; the counterfactual is prediction; real-time monitoring of a live test is filtering.
5. **Fusing mechanism and data.** §41.3 of [[Further Topics in ODE Solvers]]: add a linear observation $p(y^{\text{obs}}_n\mid x_n)=\mathcal N(H^{\text{obs}}x_n,R^{\text{obs}})$ to the ODE state-space model and one EKF1/EKS1 pass infers the solution *and* a latent GP forcing (the Covid contact-rate example) in linear time. That extended model is precisely a BSTS whose trend block is replaced by mechanistic dynamics.
6. **Uncertainty-aware likelihoods.** When a simulator is fitted to data, the solver's covariance enters as $p(z\mid\theta)=\mathcal N(m_\theta,P+\sigma^2I)$, which "corrects the overconfidence" of treating the numerical solution as exact.

### Practical Implications

**Decision rule for a time-series measurement problem**

1. *Is there a latent quantity that evolves stochastically?* If not (fixed-$\lambda$ adstock, fixed coefficients), you do not need a filter; fit the regression with HMC.
2. *Linear-Gaussian given hyperparameters, single series, want a counterfactual?* BSTS: smooth the pre-period, predict the post-period with no updates, difference. Report the running average for stock KPIs and the cumulative sum only for flows. Expect the interval to grow with horizon — keep test windows short relative to $\sigma_\delta$, or use the AR(1) slope.
3. *Ad effectiveness drifting (wear-out, creative refresh)?* Dynamic regression / return-to-normality $\beta_t$; this is the case the MRM literature assigns to the Kalman filter.
4. *Saturating or count observation?* Either EKF1/IEKS-style linearisation or drop the filter and sample states with HMC; if multimodal, particle filter.
5. *Smooth nonparametric trend + several seasonalities inside a PyMC/Stan model?* HSGP rather than a state-space block.
6. *Thousands of related series, forecast only?* DeepAR-style global model; you give up components and counterfactual semantics.
7. *ABM mean-field or compartmental ODE calibrated to sales?* Use an ODE filter so numerical error enters the likelihood, and consider the extended state-space model to infer a latent time-varying rate in one pass.

**Checklist whenever a Kalman filter is involved:** write down $\mathbf A,\mathbf H,\mathbf Q,\mathbf R$ explicitly; decide filter / smoother / predictor from the estimand; check innovation whiteness; use square-root form when the state is large; never read a post-period gap as causal without the placebo backtests linked from [[Counterfactual Impact Estimation]].

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Linear-Gaussian State-Space Models]], [[The Kalman Filter]], [[The RTS Smoother]], [[Marginal Likelihood via the Kalman Filter]], [[State-Space Models and the Kalman Filter - Overview]] | Generic model, recursions, energy function; [[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf|Särkkä 2013]] Ch. 4, 8, 12 |
| [[Bayesian Structural Time-Series Model]], [[Local Linear Trend and Seasonality]] | BSTS matrices, state blocks, variance priors |
| [[MCMC Inference for CausalImpact]], [[Counterfactual Impact Estimation]] | Simulation smoother, posterior predictive counterfactual, widening intervals |
| [[Bayesian Filtering and Smoothing]], [[Gauss-Markov Processes and SDEs]], [[Gaussian Process Regression]] | Filter = $\mathcal O(N)$ GP regression; SDE discretisation; IWP/Matérn; [[raw/ProbabilisticNumerics.pdf|Hennig et al.]] Ch. 4–5 |
| [[Hierarchical Inference in Gaussian Models]] | Recursive Gamma scale calibration during filtering |
| [[Solving ODEs as Inference]], [[ODE Filters and Smoothers]], [[Theory of ODE Filters and Smoothers]] | IVP as regression on $x'$; EKF0/EKF1/EKS/IEKS/particle; $h^q$ rates, calibration, A-stability, square-root filtering |
| [[Further Topics in ODE Solvers]] | Uncertainty-aware likelihood; extended SSM fusing ODE and data |
| [[Hilbert Space Gaussian Processes]], [[Model Building - Time-Series Decomposition for Birthdays]] | Basis-function alternative for GP decompositions |
| [[Carryover Effects and Distributed Lags]], [[Carryover (Adstock) Functional Forms]], [[Transfer Function Model]] | Koyck recursion, time-varying parameters via Kalman filter, rational-lag form |
| [[DeepAR and Global Autoregressive Neural Forecasters]] | Deterministic-state contrast |

## Related Concepts

- [[Single Marketing Time Series]] — ARIMA models have state-space representations and Kalman-evaluated likelihoods
- [[Model Building with Latent Variables - Animal Movement]] — the HMM forward algorithm is the discrete-state analogue of the Kalman recursion
- [[Approximate Thompson Sampling and Practical Extensions]] — incremental Laplace is described there as "closely related to an extended Kalman filter"
- [[Bayesian Quadrature]] — EKF0/EKS0 reduce to Kalman-form Bayesian quadrature when $f$ does not depend on $x$
- [[Spike-and-Slab Prior for Covariate Selection]] — why BSTS samples states instead of integrating them out
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — carryover as a latent state for experiment timing
- [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] — where BSTS sits among geo estimators

## Gaps

- **No control-input form.** Neither filtering cluster writes $\mathbf x_k=\mathbf A\mathbf x_{k-1}+\mathbf B\mathbf u_k+\mathbf q_k$, so the adstock-as-state mapping in §3 is synthesis, not something a vault note derives. No note gives a state-space MMM.
- **Nonlinear / non-Gaussian filtering exists only inside the ODE notes.** There is no general note on EKF/UKF, particle filters, or count-valued (Poisson / negative-binomial) state-space models — the Särkkä ingestion stopped at the linear-Gaussian core.
- **Durbin–Koopman simulation smoother** is named but not derived; its relation to RTS is stated in one sentence.
- **State-space ↔ GP duality** is asserted in See-Also links of [[Hilbert Space Gaussian Processes]] but only proved (for Gauss–Markov priors) in the PN notes; periodic/quasi-periodic kernels in state-space form are not covered.
- The vault does not discuss steady-state gains ($K_\infty$, DARE) for BSTS, nor identification assumptions of CausalImpact (controls unaffected by treatment, stable pre-period relationship) in the notes read here.

## Follow-Up Questions

- What does a state-space MMM look like — adstock as a controlled state, random-walk channel coefficients, Hill observation — and does EKF1/IEKS beat plain HMC on it?
- Can the extended state-space model of §41.3 calibrate a mean-field ODE approximation of an agent-based market model against weekly sales in one smoothing pass?
- When does a Matérn-3/2 state-space trend give materially different CausalImpact intervals from the local linear trend?
- How should innovation-whiteness diagnostics be combined with placebo backtests to validate a BSTS counterfactual?
