---
title: "SMM Python Implementation"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/concept
  - doc/tutorial
  - method/scipy
source: "[[Clippings/19. Simulated Method of Moments Estimation — Computational Methods for Economists using Python]]"
source_location: "Ch. 19, Sections 19.4–19.6"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: tutorial
depends_on:
  - "[[SMM Weighting Matrix and Inference]]"
  - "[[Method of Simulated Moments]]"
  - "[[Practical Issues in Simulation Estimation]]"
used_by:
  - "[[SMM Copula Simulation and Application]]"
aliases:
  - SMM code
  - SMM scipy
  - SMM truncated normal example
---

# SMM Python Implementation

> [!summary]
> Evans (2024) Ch. 19 demonstrates SMM estimation in Python using `scipy.optimize.minimize` with the L-BFGS-B method. The worked example fits a truncated normal to Econ 381 test scores (N=161) with S=100 simulations. A critical practical lesson: L-BFGS-B defaults to `eps=1e-8` for its internal finite-difference Jacobian, which is too small when moment values are in the hundreds — the optimizer sees zero gradient and returns the initial guess after 3 function evaluations. Fix: `options={'eps': 1.0}`.

## Overview

SMM estimation requires five components in code:

1. **Fixed random draws** — simulate the N×S uniform matrix once before optimization; never re-draw inside the criterion function
2. **Simulation function** — convert uniform draws to model draws via inverse CDF (common random numbers technique)
3. **Moment function** — compute moments from (N,) data or (N,S) simulated matrix
4. **Error vector function** — percent deviations of simulated moments from data moments
5. **Criterion function** — $e^T W e$, the scalar to minimize

The weighting matrix `W_hat` is passed as an argument to the criterion function so the same code handles both identity-W and two-step-W estimation.

## General Workflow

```python
import numpy as np
import numpy.linalg as lin
import scipy.stats as sts
import scipy.optimize as opt

# Step 1: Fix random draws before optimization
np.random.seed(25)
N, S = len(data), 100
unif_vals = sts.uniform.rvs(0, 1, size=(N, S))  # shape (N, S), never re-drawn

# Step 2: Initial estimate with identity W
W_hat_1 = np.eye(R)
params_init = np.array([...])
results_1 = opt.minimize(
    criterion, params_init,
    args=(data, unif_vals, ..., W_hat_1),
    method='L-BFGS-B',
    bounds=[...],
    options={'eps': 1.0}   # CRITICAL when moments are in the 100s
)
theta_hat_1 = results_1.x

# Step 3: Build two-step W from Step 1 estimates
Err_mat = get_Err_mat(data, unif_vals, *theta_hat_1, ...)  # shape (R, S)
VCV = (1 / S) * (Err_mat @ Err_mat.T)                     # shape (R, R)
W_hat_2 = lin.inv(VCV)                                    # or lin.pinv() if ill-conditioned

# Step 4: Re-estimate with optimal W
results_2 = opt.minimize(
    criterion, theta_hat_1,
    args=(data, unif_vals, ..., W_hat_2),
    method='L-BFGS-B',
    bounds=[...],
    options={'eps': 1.0}
)
theta_hat_2 = results_2.x

# Step 5: Compute Sigma_hat via numerical Jacobian
d = Jac_err(data, unif_vals, *theta_hat_2, ...)  # shape (R, K)
Sigma_hat = (1 / S) * lin.inv(d.T @ W_hat_2 @ d) # shape (K, K)
std_errs = np.sqrt(np.diag(Sigma_hat))
```

> [!important] Common Random Numbers
> The `unif_vals` matrix is drawn **once** before the optimizer is called. Inside `criterion()`, these same draws are used for every evaluation of $\theta$. This ensures the criterion function is smooth in $\theta$ — without fixed draws, the stochastic component changes at each optimizer step and the criterion surface becomes non-differentiable. See [[Practical Issues in Simulation Estimation]] for the common random numbers principle.

## Worked Example: Truncated Normal

**Problem:** Fit $(\mu, \sigma)$ of a truncated normal on $[0, 450]$ to 161 macroeconomics test scores using SMM.

### Simulation via Inverse CDF

```python
def trunc_norm_draws(unif_vals, mu, sigma, cut_lb, cut_ub):
    """
    Draw (N x S) matrix from truncated normal N(mu, sigma) on [cut_lb, cut_ub].
    Uses inverse CDF (percent-point function) applied to rescaled uniform draws.
    
    unif_vals : (N, S) matrix of U(0,1) draws — fixed before optimization
    Returns   : (N, S) matrix of truncated normal draws
    """
    cut_ub_cdf = sts.norm.cdf(cut_ub, loc=mu, scale=sigma)
    cut_lb_cdf = sts.norm.cdf(cut_lb, loc=mu, scale=sigma)
    unif2_vals = unif_vals * (cut_ub_cdf - cut_lb_cdf) + cut_lb_cdf
    return sts.norm.ppf(unif2_vals, loc=mu, scale=sigma)
```

### Moment Functions

**Two moments (mean, variance):**

```python
def data_moments2(xvals):
    """
    xvals : (N,) or (N, S) — 1D for data, 2D for S simulations
    Returns: mean_data, var_data (scalars if 1D, (S,) vectors if 2D)
    """
    if xvals.ndim == 1:
        return xvals.mean(), xvals.var()
    elif xvals.ndim == 2:
        return xvals.mean(axis=0), xvals.var(axis=0)
```

**Four moments (bin percentages — better identification):**

```python
def data_moments4(xvals):
    """
    Returns percent of observations in four bins:
    [0, 220), [220, 320), [320, 430), [430, 450]
    """
    if xvals.ndim == 1:
        bpct_1 = (xvals < 220).sum() / xvals.shape[0]
        bpct_2 = ((xvals >= 220) & (xvals < 320)).sum() / xvals.shape[0]
        bpct_3 = ((xvals >= 320) & (xvals < 430)).sum() / xvals.shape[0]
        bpct_4 = (xvals >= 430).sum() / xvals.shape[0]
    elif xvals.ndim == 2:
        bpct_1 = (xvals < 220).sum(axis=0) / xvals.shape[0]
        bpct_2 = ((xvals >= 220) & (xvals < 320)).sum(axis=0) / xvals.shape[0]
        bpct_3 = ((xvals >= 320) & (xvals < 430)).sum(axis=0) / xvals.shape[0]
        bpct_4 = (xvals >= 430).sum(axis=0) / xvals.shape[0]
    return bpct_1, bpct_2, bpct_3, bpct_4
```

### Error Vector (Percent Deviations)

```python
def err_vec2(data_vals, unif_vals, mu, sigma, cut_lb, cut_ub, simple=False):
    """
    Returns (2, 1) column vector of percent deviations of model moments from data.
    simple=True → raw differences; simple=False → percent deviations (preferred).
    """
    sim_vals = trunc_norm_draws(unif_vals, mu, sigma, cut_lb, cut_ub)
    mean_data, var_data = data_moments2(data_vals)
    moms_data = np.array([[mean_data], [var_data]])
    mean_sim, var_sim = data_moments2(sim_vals)
    mean_model = mean_sim.mean()   # average across S simulations
    var_model = var_sim.mean()
    moms_model = np.array([[mean_model], [var_model]])
    if simple:
        return moms_model - moms_data
    else:
        return (moms_model - moms_data) / moms_data
```

### Criterion Function

```python
def criterion(params, *args):
    """
    SMM criterion: scalar e^T @ W @ e.
    args = (xvals, unif_vals, cut_lb, cut_ub, W_hat, simple)
    """
    mu, sigma = params
    xvals, unif_vals, cut_lb, cut_ub, W_hat, simple = args
    err = err_vec2(xvals, unif_vals, mu, sigma, cut_lb, cut_ub, simple)
    return err.T @ W_hat @ err
```

## The eps Step-Size Problem

> [!warning] Critical Practical Issue: eps for L-BFGS-B
> **Symptom:** The optimizer returns the initial guess after exactly 3 function evaluations, with `jac: [0., 0.]` and `nit: 0`.
>
> **Cause:** L-BFGS-B estimates its internal gradient via finite differences with step size `eps=1e-8` (default). It evaluates:
> - Guess 1: $(\mu_0, \sigma_0)$
> - Guess 2: $(\mu_0 + 10^{-8}, \sigma_0)$
> - Guess 3: $(\mu_0, \sigma_0 + 10^{-8})$
>
> When moments are in the hundreds (mean ≈ 342, variance ≈ 7828), a perturbation of $10^{-8}$ in $\mu$ or $\sigma$ produces a negligible change in the simulated moments — the criterion function looks flat at machine precision. The optimizer concludes the gradient is zero and halts.
>
> **Fix:** Set `options={'eps': 1.0}` (or another scale-appropriate value):
> ```python
> results = opt.minimize(criterion, params_init, args=smm_args,
>                        method='L-BFGS-B',
>                        bounds=((1e-10, None), (1e-10, None)),
>                        options={'eps': 1.0})
> ```
> **Rule of thumb:** Set `eps` to roughly 0.1–1% of a typical parameter value, or whatever produces a detectable change in the moments.
^warn-eps-stepsize

### Before fix (identity W, 4 moments):

```
mu_SMM4_1= 300.0  sig_SMM4_1 30.0       ← returned initial guess!
  nit: 0
  jac: [0., 0.]
  nfev: 3
```

### After fix (`options={'eps': 1.0}`):

```
mu_SMM4_1= 362.56  sig_SMM4_1= 46.58
  nit: 8
  nfev: 144
```

## Numerical Jacobian for $\hat{\Sigma}_{SMM}$

Use centered finite differences with step size proportional to the parameter value:

```python
def Jac_err(data_vals, unif_vals, mu, sigma, cut_lb, cut_ub, simple=False):
    """
    Returns (R, K) Jacobian matrix d[e_r]/d[theta_k] by centered differences.
    Step size: 1e-4 * |theta_k| — scales with parameter magnitude.
    """
    Jac = np.zeros((R, K))
    h_mu  = 1e-4 * mu
    h_sig = 1e-4 * sigma
    Jac[:, 0] = (
        (err_vec(data_vals, unif_vals, mu + h_mu, sigma, cut_lb, cut_ub, simple) -
         err_vec(data_vals, unif_vals, mu - h_mu, sigma, cut_lb, cut_ub, simple)) /
        (2 * h_mu)
    ).flatten()
    Jac[:, 1] = (
        (err_vec(data_vals, unif_vals, mu, sigma + h_sig, cut_lb, cut_ub, simple) -
         err_vec(data_vals, unif_vals, mu, sigma - h_sig, cut_lb, cut_ub, simple)) /
        (2 * h_sig)
    ).flatten()
    return Jac

# Compute Sigma_hat
S = unif_vals.shape[1]
d = Jac_err(data, unif_vals, mu_hat, sig_hat, 0.0, 450.0)
Sigma_hat = (1 / S) * lin.inv(d.T @ W_hat @ d)
std_errs = np.sqrt(np.diag(Sigma_hat))
```

The step size `h = 1e-4 * |theta|` (relative step) is much larger than the default `eps=1e-8` used by L-BFGS-B, which is why this manual Jacobian works even when the optimizer's internal Jacobian estimate failed. See [[Practical Issues in Simulation Estimation]] for step-size guidelines.

## Results Comparison

| Setting | $\hat{\mu}$ | $\hat{\sigma}$ | SE($\hat{\mu}$) | SE($\hat{\sigma}$) |
|---------|-------------|----------------|-----------------|---------------------|
| 2 moments, $W=I$ | 612.3 | 197.3 | 776.2 | 211.9 |
| 2 moments, 2-step $W$ | 619.4 | 199.1 | 49.0 | 15.2 |
| 4 moments, $W=I$ | 362.6 | 46.6 | 5.8 | 4.3 |
| 4 moments, 2-step $W$ | 362.6 | 46.6 | 1.9 | 1.3 |

**Key observations:**
- The 2-moment setup produces estimates near the MLE solution ($\hat{\mu} \approx 612$, $\hat{\sigma} \approx 197$) — but with enormous standard errors because mean and variance are highly correlated in the truncated normal
- The 4 bin-percentage moments produce estimates closer to the data histogram shape ($\hat{\mu} \approx 362$, $\hat{\sigma} \approx 47$) with much tighter standard errors
- The two-step $W$ substantially reduces standard errors in both setups, especially the 2-moment case (776 → 49 for $\hat{\mu}$), without changing point estimates much
- Moment selection matters more than weighting matrix choice for point estimate quality

## Two-Step W: Computing the Error Matrix

```python
def get_Err_mat(data, unif_vals, mu, sigma, cut_lb, cut_ub, simple=False):
    """
    Returns (R, S) matrix where column s is the moment error vector
    for simulation s. Used to build the variance-covariance matrix of moments.
    """
    R, S = 4, unif_vals.shape[1]
    Err_mat = np.zeros((R, S))
    bpct_data = data_moments4(data)             # (R,) data moments
    sim_vals = trunc_norm_draws(unif_vals, mu, sigma, cut_lb, cut_ub)
    bpct_sim = data_moments4(sim_vals)          # (R, S) — each column is one sim
    for r in range(R):
        if simple:
            Err_mat[r, :] = bpct_sim[r] - bpct_data[r]
        else:
            Err_mat[r, :] = (bpct_sim[r] - bpct_data[r]) / bpct_data[r]
    return Err_mat

# Build optimal W
Err_mat = get_Err_mat(data, unif_vals, *theta_hat_1, ...)
VCV = (1 / S) * (Err_mat @ Err_mat.T)   # (R, R)
W_hat_2 = lin.inv(VCV)                  # use lin.pinv() if VCV is near-singular
```

> [!note] Pseudo-Inverse for Ill-Conditioned VCV
> With 4 moments and short simulations, VCV can be poorly conditioned. The tutorial uses `lin.pinv(VCV)` (pseudo-inverse via SVD) instead of `lin.inv(VCV)` when the matrix is near-singular. This avoids numerical errors in the weighting matrix.

## Indirect Inference

Indirect inference is SMM where the moments are parameters of an **auxiliary model** — a reduced-form statistical model estimated on both the data and simulated data.

**Setup:**
- Let $H(x_t, z_t | \phi) = 0$ be the auxiliary model with parameter vector $\phi$ (length $R \geq K$)
- **Data moments**: $\hat{\phi}(x_t, z_t)$ — auxiliary model estimated on real data
- **Model moments**: $\hat{\phi}(\tilde{x}_t, \tilde{z}_t | \theta) = \frac{1}{S}\sum_{s=1}^S \hat{\phi}_s(\tilde{x}_{s,t}, \tilde{z}_{s,t} | \theta)$ — averaged auxiliary parameters from simulations

**Estimator:**
$$\hat{\theta}_{II} = \theta : \min_\theta \|\hat{\phi}(\tilde{x}_t | \theta) - \hat{\phi}(x_t)\|$$

**Common auxiliary models:** OLS regression coefficients, VAR parameters, probit/logit coefficients, IV regression estimates.

**Advantage over standard SMM:** When the structural model's moments are intractable, auxiliary model parameters provide tractable, information-rich moments. The auxiliary model need not be the "true" model — it just needs to summarize the data in a way that responds to changes in $\theta$.

See [[Indirect Inference]] for the theoretical framework and [[SMM Estimator for Copulas]] for an application where copula dependence measures (Spearman's $\rho$, tail dependence) serve as the auxiliary moments.

## See Also

- [[SMM Weighting Matrix and Inference]] — theory behind all four W strategies and the Σ̂ formula
- [[Method of Simulated Moments]] — consistency and asymptotic normality theorems
- [[Practical Issues in Simulation Estimation]] — common random numbers, step-size selection, ill-conditioning
- [[Indirect Inference]] — auxiliary model moments as an alternative to direct simulation moments
- [[SMM Estimator for Copulas]] — copula-specific implementation using Spearman's ρ and tail dependence

## Sources

- [Computational Methods for Economists — Ch. 19](https://opensourceecon.github.io/CompMethods/struct_est/SMM.html) — Evans (2024), Sections 19.4–19.6
- `scipy.optimize.minimize` L-BFGS-B documentation — `options={'eps': ...}` parameter
- Adda, J. and R. Cooper (2003), *Dynamic Economics*, MIT Press, pp. 87–100
