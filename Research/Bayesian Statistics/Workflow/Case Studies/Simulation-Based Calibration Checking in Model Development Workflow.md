---
title: "Simulation-Based Calibration Checking in Model Development Workflow"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - topic/simulation-based-calibration
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 31, pp. 471-482 (Figures 31.1-31.11)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[SBC in the Workflow]]"
  - "[[The SBC Algorithm]]"
  - "[[Rank Statistics and Uniformity]]"
  - "[[Interpreting SBC Histograms]]"
  - "[[Statistical Modeling as Software Development]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[SBC Case Studies]]"
aliases:
  - Poisson mixture SBC case study
  - SBC model development workflow
  - Label switching case study
  - Fano factor filter
---

# Simulation-Based Calibration Checking in Model Development Workflow

> [!summary]
> A worked account of using SBC as a **subroutine of the full workflow**: given a precise mathematical description of a two-component Poisson mixture with covariate-dependent mixing ratio, produce a Stan program you trust. Four real bugs and pathologies are found in sequence — a misused `log_mix` over an array, label switching, an intercept that never enters the likelihood, and a doubled prior on `beta[1]` — each caught by a different diagnostic. The chapter's most transferable trick: **filter problematic simulated datasets using a statistic of the data only (the Fano factor), which preserves the SBC identity** while eliminating wasted fits.

## Overview

The process here takes **a relatively precise description of a model as input** and tries to produce **a Stan program that implements it**. Once the program is trusted, it is still necessary to validate its fit to actual data and other properties, which may trigger a need to change the model — at which point you return to simulations to make sure the modified model is implemented correctly.

**Scope caveat:** this workflow focuses on **small models** — fast to fit, where computation time is not a worry. Once running 100 or so fits becomes too costly, additional considerations apply. Still, many of the approaches — **especially starting small and building each model component separately** — carry over to complex models, and with proper separation into components you can validate big chunks of a large model's Stan code while working with small, manageable models.

## Main Content

### The target model

> [!definition] Two-component Poisson mixture with covariate-dependent mixing ratio
> $$y_i \sim \text{Poisson}(\mu_{z_i})$$
> $$z_i \sim \text{Bernoulli}\!\left(\text{logit}^{-1}(\theta_i)\right)$$
> $$\theta_i = \alpha + \sum_k \beta_k X_{i,k} = \alpha + X\beta$$
> $$\log \mu_{\{1,2\}} \sim \text{normal}(3,1), \quad \alpha \sim \text{normal}(0,2), \quad \beta_k \sim \text{normal}(0,1)$$
> **The mixing ratio varies with predictors; the component means are the same for all observations.**
^def-poisson-mixture

**Cover story:** two subspecies of an animal are hard to observe directly but identifiable by the droppings they leave behind. The number of droppings is noisy information about which subspecies was present at a location. Droppings are counted at multiple locations along with environmental predictors (temperature, altitude), and the goal is the association between those predictors and subspecies prevalence.

### Decompose, and start where the trouble is

The model decomposes into two submodels:
1. **The mixture submodel** — mixing ratio the same for all observations.
2. **A logistic regression** predicting a binary outcome.

> [!tip] Two ordering principles for incremental development
> **Start small:** implement and validate each submodel separately, then put them together and validate the bigger model. This makes it substantially easier to locate problems, which can include **bugs in the code, poorly specified priors, and conceptual errors in the model**.
>
> **Start with the riskiest part:** any issue may force you to change the model or abandon it entirely, so **find that out before investing effort in the other submodels.** Here the mixture submodel appears trickier, so it goes first.

### Writing the simulator: deliberately different from the model

> [!warning] A bug in the simulator fails the check just as loudly as a bug in the model
> Because any simulator bug causes failed checks even when the Stan program is correct, implement the simulator **in the simplest possible way, without optimizing for speed**. If there are multiple ways to implement the same model, **prefer a simulator that takes a different approach than the model**, to avoid making the same mistake in both.
>
> **The stringency of a simulation check scales with the independence of simulator and model code.** Concretely: implement the simulator **in a different language than Stan** (R here). If correctness matters enough, **have a completely different person or team implement another version of the simulator** for final checks of the full model.
>
> Cost acknowledged: more code to write, and additional risk of simulator bugs causing spurious failures. "However, we do not really have a better way of checking for bugs, and the added effort tends to be manageable, so we believe it is worth it."

```r
N <- 30
mu1 <- rnorm(n=1, 3, 1)
mu2 <- rnorm(n=1, 3, 1)
theta <- runif(n=1, 0, 1)
y <- numeric(N)
for (n in 1:N) {
  if (runif(1) < theta)
    y[n] <- rpois(n=1, exp(mu1))
  else
    y[n] <- rpois(n=1, exp(mu2))
}
```

### Bug 1 — `log_mix` applied to a whole array

```stan
data {
  int<lower=0> N;
  array[N] int y;
}
parameters {
  real mu1;
  real mu2;
  real<lower=0, upper=1> theta;
}
model {
  target += log_mix(theta,
                    poisson_log_lpmf(y | mu1),
                    poisson_log_lpmf(y | mu2));
  target += normal_lpdf(mu1 | 3, 1);
  target += normal_lpdf(mu2 | 3, 1);
}
```

Fitting a single simulated dataset produces $\hat R$ warnings and divergent transitions; the pairs plot (Figure 31.1) shows "either `mu1` is tightly determined and `mu2` is allowed the full prior range or the other way around," with `theta`'s posterior barely differing from its prior.

> [!warning] `poisson_log_lpmf(y | mu1)` with array `y` returns the **sum** of log probabilities
> It does not return per-element log probabilities. So the code implements a mixture in which **all observations come from the first component or all come from the second** — a wildly different model. To let each observation come from a different component, **loop and call `log_mix` separately for each observation**:
> ```stan
> for (n in 1:N) {
>   target += log_mix(theta,
>                     poisson_log_lpmf(y[n] | mu1), poisson_log_lpmf(y[n] | mu2));
> }
> ```

### Bug 2 — label switching

The corrected model has "a non-negligible chance (roughly 1/8 if we are running 4 chains) of working without visible problems," but simulating multiple datasets soon produces large $\hat R$. Figure 31.2 shows two distinct modes.

> [!definition] Label switching
> Swapping $\mu_1$ with $\mu_2$ while replacing $\theta$ with $1-\theta$ **leaves the posterior density unchanged** — the ordering does not matter. This multimodality in mixture models is a form of **aliasing** called **label switching**. It makes convergence diagnostics harder but **does not necessarily affect the end result if appropriate post-processing is applied to the draws** (Stephens 2000).
^def-label-switching

**Fix:** replace `mu1`, `mu2` with `ordered[2] mu`, constraining the model to one ordering.

> [!warning] Ordering is not a universal fix
> Although the ordering removes multimodality, **it can cause other challenges for posterior inference**. And **in models with more than one parameter per mixture component there is no unique ordering constraint.** So ordering is not always a good solution for multimodality in mixture models.

> [!tip] A computational issue forcing a change to the mathematical model
> "Here a computational issue — our inability to sample multimodal posteriors — leads us to modify the mathematical model." In this particular case **nothing is lost**: any inference under the ordered model can be transformed back to the original unordered model by **randomizing the order of the components**. More generally, though, we sometimes discover that the model we set out to implement has computational issues and must be modified.

**The simulator must change in lockstep.** If the marginal priors on the components of an ordered vector are identical, draws from the implied distribution can be simulated by ordering independent draws:
```r
mu <- sort(rnorm(2, 3, 1))
```

### Pathology 3 — components that collapse, and the divergence filter

After the ordering change, convergence improves but some high $\hat R$ values and divergent transitions remain. Figure 31.3 diagnoses it: `theta`'s marginal shows **a lot of uncertainty with modes near both 0 and 1** — the ordering has **not** removed the identifiability problem. Either component could explain the data, so `mu[1]` and `mu[2]` marginals overlap strongly, and **the ordering constraint has made the posterior geometry challenging for dynamic HMC**.

**Cause:** the simulated component means for that particular dataset are almost identical. **With infinite data the model would resolve even the tiniest difference; with finite data it cannot distinguish a single component from two similar components.**

> [!tip] Encode the assumption in the *simulator*, not only in the model
> If we assume the studied phenomenon has two components with **non-similar** means, that should be reflected in the simulation. If the real phenomenon would produce data lacking the information to separate the component means, we would still have a problem — **but we would likely notice it thanks to the diagnostics.**
>
> Expressing a prior that avoids similar components is possible but is "additional work with little direct benefit: **if HMC inference on real data resulted in divergent transitions, we would not trust the model anyway.**" We still want SBC to check that the model works for the cases where components do not collapse.

> [!definition] Filtering simulations without breaking the SBC identity
> **If we remove datasets in a way that depends only on the observed data (and not on unobserved parameters), the SBC identity is preserved** and SBC can be used without modification. The resulting check tells us something only for datasets that do not produce divergent transitions — **but those are usually the only datasets we care about anyway.**
^def-sbc-filtering

Applying this crudely — discarding datasets that had divergences — costs computation: roughly **1 in 4 datasets** turn out to be problematic. With 100 simulated datasets and diverged fits discarded, the rank and ECDF plots (Figure 31.4) show no big problems. "Although we would need more simulations to rule out small issues in the model, we are satisfied for now."

### Bug 4 — the intercept that never enters the likelihood

First attempt at the logistic regression submodel, separating intercept `alpha` from the other coefficients `beta`:

```stan
data {
  int<lower=0> N_obs;
  array[N_obs] int<lower=0, upper=1> y;
  int<lower=1> N_predictors;
  matrix[N_obs, N_predictors] X;
}
parameters {
  real alpha;
  vector[N_predictors] beta;
}
model {
  target += bernoulli_logit_lpmf(y | X * beta);
  target += normal_lpdf(alpha | 0, 2);
  target += normal_lpdf(beta | 0, 1);
}
```

The R simulator uses **an explicit loop over observations and predictors** where the Stan code uses matrix multiplication — deliberately different structure, "decreasing the risk of making the same mistake in both versions":

```r
N_obs <- 50
N_predictors <- 2
alpha <- rnorm(1, 0, 2)
beta <- rnorm(N_predictors, 0, 1)
X <- matrix(rnorm(N_predictors * N_obs, 0, 1), nrow=N_obs, ncol=N_predictors)
linpred <- array(alpha, N_obs)
for (p in 1:N_predictors) {
  linpred <- linpred + X[,p] * beta[p]
}
y <- rbinom(N_obs, size=1, prob=plogis(linpred))
```

Fitting a single simulation shows no obvious problems. **SBC with only 10 simulated datasets already gives suspicious rank/ECDF plots** (Figure 31.5).

> [!example] Three diagnostics converging on one missing `alpha +`
> **The bug:** `X * beta` should have been `alpha + X * beta`. **`alpha` never enters the likelihood.**
>
> **Diagnostic A — rank/ECDF plots (Fig. 31.5):** the discrepancy shows up in the **`beta`** parameters, not in `alpha`. With 10 simulations it is suspicious but not conclusive.
>
> **Diagnostic B — simulated value vs. posterior estimate (Fig. 31.6):** plot the true simulated value against the posterior mean and 90% interval. What immediately stands out: **the posterior inferences for `alpha` are independent of the simulated value** — a flat scatter. That points straight at the bug.
>
> **Why SBC alone can never catch it for `alpha`:** with `alpha` absent from the likelihood, its posterior *is* its prior, and **sampling from the prior always satisfies the SBC equality.** SBC will never show a failure for `alpha` in this model.
>
> **Diagnostic C — SBC on a derived quantity (Fig. 31.7):** **the SBC identity must hold not only for model parameters but for all quantities derived from parameters and data.** Adding the **log likelihood** as an additional quantity often increases sensitivity, since it is a complex function of all parameters:
> ```r
> log_lik = sum(dbinom(y, size=1, prob=plogis(alpha + X %*% beta), log=TRUE))
> ```
> On the *same* 10 simulations, while the `beta` failures are barely visible, **`log_lik` signals a clear failure.**

### Bug 5 — the doubled prior introduced by the fix

The fix chosen — also how most common regression packages work — is to treat the intercept as **just another predictor whose column of `X` is all 1s, with a different prior**:

```stan
parameters {
  vector[N_predictors] beta;
}
model {
  target += bernoulli_logit_lpmf(y | X*beta);
  target += normal_lpdf(beta[1] | 0, 2);
  target += normal_lpdf(beta | 0, 1);   // BUG: also applies to beta[1]
}
```

The R simulator is updated to put the intercept in the design matrix, **keeping the explicit loop** so the same mistake is unlikely in both.

SBC with 10 simulations (Figure 31.8) flags **`beta[1]`**: the model contains **two separate prior statements for `beta[1]`** — `normal(0,2)` *and* `normal(0,1)`.

> [!warning] `log_lik` is not magic
> "This example shows that **the `log_lik` term is not magic**, as it does not signal this failure earlier than `beta[1]`." A prior-specification error affects the prior, not the likelihood, so the likelihood-based derived quantity has no extra sensitivity to it. Different bugs need different diagnostics.

The fix:
```stan
target += normal_lpdf(beta[2:N_predictors] | 0, 1);
```
**At this point the model passes all SBC checks, as it finally matches the simulator.**

### Putting it together

Substituting the mixture's `theta` with the logistic regression's predicted probability:

```stan
data {
  int<lower=0> N_obs;
  array[N_obs] int y;
  int<lower=1> N_predictors;
  matrix[N_obs, N_predictors] X;
}
parameters {
  ordered[2] mu;
  vector[N_predictors] beta;
}
model {
  vector[N_obs] theta = inv_logit(X * beta);
  for (n in 1:N_obs) {
    target += log_mix(theta[n],
                      poisson_log_lpmf(y[n] | mu[1]), poisson_log_lpmf(y[n] | mu[2]));
  }
  target += normal_lpdf(mu | 3, 1);
  target += normal_lpdf(beta[1] | 0, 2);
  target += normal_lpdf(beta[2:N_predictors] | 0, 1);
}
```

```r
N_obs <- 50
N_predictors <- 3
mu <- sort(rnorm(2, 3, 1))
beta <- c(rnorm(1, 0, 2), rnorm(N_predictors - 1 , 0, 1))
X <- matrix(rnorm(N_predictors * N_obs, 0, 1), nrow=N_obs, ncol=N_predictors)
X[,1] <- 1 # Intercept
y <- array(NA, N_obs)
for (n in 1:N_obs) {
  linpred <- 0
  for (p in 1:N_predictors) {
    linpred <- linpred + X[n,p] * beta[p]
  }
  theta <- plogis(linpred)
  if (runif(1) < theta)
    y[n] <- rpois(1, exp(mu[1]))
  else
    y[n] <- rpois(1, exp(mu[2]))
}
```

**Many fits do not converge** — for the reason already found in the mixture submodel, plus **an additional mechanism**: beyond `mu[1]` being similar to `mu[2]`, **if the `theta` values from the logistic submodel are extreme, all observations can actually be drawn from the same component.**

### The Fano-factor filter

We could again ignore the problematic fits, but since verifying the final model will take many simulations, it is worth **avoiding the wasted fits in the first place.**

> [!tip] A prior on the scale of the data, not on the parameters
> "Although we might not want to or be able to express a key assumption of the model (here that the two mixture components are distinct) by priors on model parameters, **we still may be able to set up a prior on the scale of the data.** If we remove simulations based on criteria that only depend on data (and not on parameters), the validity of SBC is not compromised."

> [!example] Screening datasets by variance-to-mean ratio
> **The statistic:** for a Poisson variable the **ratio of variance to mean (the Fano factor) is always 1**. If the components are too similar, the data resemble a single Poisson and the variance is close to the mean; if the components are distinct, the variance should be **larger** than the mean.
>
> **The evidence (Figure 31.9):** histograms of variance/mean, plotted separately for fits with at least one divergent transition and fits with none, separate cleanly.
>
> **The rule:** reject datasets where **variance < 1.8 × mean**.
>
> **The safety condition:** "as long as the ratio of variance to mean is larger in the real dataset, we have not compromised our checks in any way." The threshold depends only on $y$, so the SBC identity survives.
>
> **Result:** an acceptably low number of problematic fits, and **the model passes SBC checks with 500 simulations neatly.**

### Quantifying what is left: coverage and learnable precision

> [!definition] Coverage plot (Figure 31.10)
> Compares **actual against expected coverage of central posterior intervals** across all possible central interval widths. The black line is the nominal-minus-observed difference; the gray band is approximate uncertainty about coverage derived from the Beta distribution; a horizontal line marks perfect calibration.
^def-coverage-plot

Reading it honestly: **some coverage differences remain consistent with the simulation results.** For example, the observed coverage of the 95% posterior interval for `beta[1]` is "reasonably consistent with the actual coverage lying somewhere between 93% and 97%." **Narrowing the scope of possible discrepancies further is possible but becomes increasingly computationally costly.**

> [!example] Using the same simulations as a design calculation
> **Question:** what can be learned from an experiment matching these simulations — 50 observations, 3 predictors?
>
> **Figure 31.11:** true simulated values against posterior means and 90% intervals. We get **precise information about `mu`** and **a decent picture of all `beta` elements, but the remaining uncertainty is large.**
>
> **A sharp summary statistic:** the proportion of times the 90% posterior interval for `beta[2]` excludes zero is **only around 50%.**
>
> **Implication:** "Depending on your aims, this might be a reason to plan for a larger sample size." The SBC simulation set doubles as a [[Designing Simulated-Data Experiments|design calculation]] at no extra cost.

## Examples

> [!example] The full bug-and-diagnostic ledger
> | # | Problem | Symptom | Diagnostic that caught it | Fix |
> |---|---|---|---|---|
> | 1 | `log_mix` applied to whole array `y` | $\hat R$ warnings, divergences; one $\mu$ pinned, the other at prior; `theta` posterior ≈ prior | Pairs plot on a **single** simulated dataset (Fig. 31.1) | Loop over `n`, one `log_mix` per observation |
> | 2 | Label switching | Large $\hat R$ on **some** datasets (~7/8 of 4-chain runs) | Pairs plot showing two modes across **multiple** datasets (Fig. 31.2) | `ordered[2] mu` + `sort()` in simulator |
> | 3 | Collapsed components | Residual high $\hat R$, divergences; `theta` bimodal at 0 and 1 | Pairs plot (Fig. 31.3); ~1 in 4 datasets affected | Discard diverged fits (data-only criterion) |
> | 4 | `alpha` missing from likelihood | Suspicious ranks for **`beta`**, never for `alpha` | Simulated-vs-posterior plot (Fig. 31.6) + **SBC on `log_lik`** (Fig. 31.7) | `alpha + X * beta`; then merge intercept into `X` |
> | 5 | Doubled prior on `beta[1]` | SBC failure on `beta[1]` only | Rank/ECDF with 10 sims (Fig. 31.8); **`log_lik` gave no advance warning** | `normal_lpdf(beta[2:N_predictors] \| 0, 1)` |
> | 6 | All observations from one component under extreme `theta` | Many non-converging fits in the combined model | Fano factor histogram split by divergence status (Fig. 31.9) | Reject datasets with variance < 1.8 × mean |

## Connections

The chapter's own general lessons:

- **Building models you can trust is hard work, and it is easy to make mistakes.** Despite these models being relatively simple, diagnosing the problems was not straightforward and **required nontrivial background knowledge**.
- **Moving in small steps during model development is crucial** and saves time compared with trying to diagnose the same problems in "a 300-line Stan program with 50 parameters."
- **Even when only implementing a model, we needed to update the mathematical description** (the ordering constraint) to make it amenable to computational methods. This often happens in practice: **simulations can tell us a lot of useful things about our model.**

How the pieces relate to the rest of the workflow:
- The **independence-of-implementation** principle for simulators is the statistical analogue of not writing your unit test by copying the implementation — see [[Statistical Modeling as Software Development]].
- **SBC on derived quantities** — especially `log_lik` — extends [[The SBC Algorithm]] beyond the parameter vector, and the counterexample (bug 5) marks the limit of that trick.
- The **data-only filtering** rule is the operational form of the SBC identity in [[Data-Averaged Posterior Self-Consistency]]: conditioning on a function of $y$ alone leaves the joint $(θ, y)$ draws still exchangeable in the required sense.
- Label switching is the mixture-model instance of the aliasing family that also appears additively in [[Sampling Problems with Latent Variables - No Vehicles in the Park]] and geometrically in [[Challenge of Multimodality - Differential Equation for Planetary Motion]].
- Reading rank histograms and ECDF difference plots is covered in [[Interpreting SBC Histograms]] and [[Rank Statistics and Uniformity]].

Exercises (§31.6): **31.1** asks when linear regression can be fitted to binary data, by simulating from a logistic regression with $\Pr(y_i=1)=\text{logit}^{-1}(a+bx_i+\theta z_i)$ ($x_i$ uniform on $[0,100]$, $z_i$ a randomly assigned treatment), choosing $a,b$ so that 60% of controls pass and controls scoring 100 on the pre-test pass with probability 80%, and $\theta$ so the average pass probability rises 10 percentage points under treatment — then fitting a **linear** regression to $n=50$ points and computing normal-theory 50% and 95% interval coverage over 10,000 replications. **31.2** extends the chapter's model to a **third mixture component** and repeats every calibration check.

## See Also
- [[SBC in the Workflow]] — where this subroutine sits in the larger process
- [[The SBC Algorithm]] — the procedure being applied here
- [[Rank Statistics and Uniformity]] — why uniform ranks are the target
- [[Interpreting SBC Histograms]] — reading the rank and ECDF plots in Figures 31.4, 31.5, 31.8
- [[Data-Averaged Posterior Self-Consistency]] — the identity that data-only filtering preserves
- [[Statistical Modeling as Software Development]] — incremental building, independent test implementations
- [[Designing Simulated-Data Experiments]] — the design-calculation use of Figure 31.11
- [[Failure Modes and Steps Forward]] — aliasing, label switching, and divergences as named failure modes
- [[Challenge of Multimodality - Differential Equation for Planetary Motion]] — multimodality that ordering cannot fix
- [[Sampling Problems with Latent Variables - No Vehicles in the Park]] — additive aliasing fixed by a constraint
- [[Fit Fast, Fail Fast]] — why the riskiest submodel is developed first
