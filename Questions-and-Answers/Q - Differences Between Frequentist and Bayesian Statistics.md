---
title: 'Q: What are some differences between frequentist and Bayesian statistics?'
tags:
- type/qa
- topic/bayesian-statistics
- topic/frequentist
- topic/probability
- topic/research-methodology
date_asked: 2026-04-09
answered_from:
- '[[Probability and Bayesian Inference]]'
- '[[Asymptotics and Frequentist Connections]]'
- '[[Single-Parameter Models]]'
- '[[Posterior Sampling and Summarization]]'
- '[[Multiparameter Models]]'
- '[[Bayesian Linear Regression]]'
- '[[Hierarchical Models]]'
- '[[Overfitting and Information Criteria]]'
- '[[Statistical Rethinking - The Golem of Prague]]'
- '[[Forking Paths and Bayesian Approaches]]'
- '[[Multiple Comparisons - Bayesian Perspective]]'
- '[[Regression and the CEF]]'
related_questions:
- '[[Q - Common Pitfalls in Statistical Modeling]]'
- '[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]'
aliases:
- Frequentist vs Bayesian
- Bayesian vs frequentist statistics
doc_type: qa
source_location: N/A — AI-generated Q&A synthesized from vault notes
depends_on:
- '[[Probability and Bayesian Inference]]'
- '[[Asymptotics and Frequentist Connections]]'
- '[[Single-Parameter Models]]'
- '[[Posterior Sampling and Summarization]]'
- '[[Multiparameter Models]]'
- '[[Bayesian Linear Regression]]'
- '[[Hierarchical Models]]'
- '[[Overfitting and Information Criteria]]'
- '[[Statistical Rethinking - The Golem of Prague]]'
- '[[Forking Paths and Bayesian Approaches]]'
- '[[Multiple Comparisons - Bayesian Perspective]]'
used_by: []
---

# What are some differences between frequentist and Bayesian statistics?

> [!summary]
> The core divide is philosophical: frequentists treat probability as long-run frequency and parameters as fixed unknowns to be estimated, while Bayesians treat probability as a degree of belief and parameters as random variables with distributions. This leads to practical differences in how uncertainty is quantified (confidence intervals vs. credible intervals), how prior knowledge enters the analysis, how multiple parameters are handled, and how models are compared. The two frameworks converge asymptotically but diverge sharply in small-sample, high-dimensional, or hierarchical settings.

## Answer

### 1. What Is Probability?

This is the foundational divide ([[Probability and Bayesian Inference]], [[raw/BDA3.pdf|BDA3 Ch. 1]]):

| Framework | Probability means... | Parameters are... |
|-----------|---------------------|-------------------|
| **Frequentist** | Long-run frequency of events in repeated experiments | Fixed but unknown constants |
| **Bayesian** | Degree of belief (uncertainty) in any proposition | Random variables with distributions |

In the frequentist view, asking "what is the probability that $\theta = 0.4$?" is meaningless — $\theta$ is fixed, so the probability is either 0 or 1. In the Bayesian view, $p(\theta = 0.4 \mid y)$ is a perfectly sensible statement about our uncertainty given data ([[Probability and Bayesian Inference]]).

[[Statistical Rethinking - The Golem of Prague]] frames this as: frequentists treat "randomness" as a property of the world (coins are either fair or not); Bayesians treat randomness as a property of information (we're uncertain about whether the coin is fair).

---

### 2. The Core Mechanics

**Frequentist**: fit a model by maximizing the likelihood $p(y \mid \theta)$; report a point estimate $\hat{\theta}$ and standard errors derived from the sampling distribution of $\hat{\theta}$.

**Bayesian**: combine the prior $p(\theta)$ with the likelihood $p(y \mid \theta)$ to obtain the posterior $p(\theta \mid y)$ via Bayes' theorem ([[Probability and Bayesian Inference]], [[raw/BDA3.pdf|BDA3 Ch. 1]]):

$$p(\theta \mid y) = \frac{p(y \mid \theta)\, p(\theta)}{p(y)} \propto p(y \mid \theta)\, p(\theta)$$

The **posterior** is the complete Bayesian answer — not a point estimate but a full distribution over plausible values of $\theta$.

---

### 3. Uncertainty Quantification: Confidence vs. Credible Intervals

This is the most practically important difference ([[Asymptotics and Frequentist Connections]], [[raw/BDA3.pdf|BDA3 Ch. 4]]):

> [!definition] Frequentist 95% Confidence Interval
> An interval $[L(y), U(y)]$ constructed so that, if the experiment were repeated many times, **95% of such intervals would contain the true $\theta$**. This says nothing about the probability that $\theta$ lies in any *particular* interval — it's a property of the procedure, not the realized interval.

> [!definition] Bayesian 95% Credible Interval (HPDI or PI)
> An interval $[a, b]$ such that $P(a \leq \theta \leq b \mid y) = 0.95$. This *is* a direct probability statement: **given the observed data, there is a 95% probability that $\theta$ lies in this interval** ([[Posterior Sampling and Summarization]]).

In practice, many researchers *interpret* confidence intervals as credible intervals (which is technically wrong frequentism). Bayesian credible intervals give what users actually want to know.

> [!tip] They Converge Asymptotically ([[Asymptotics and Frequentist Connections]])
> As $n \to \infty$, the posterior concentrates around the MLE and the data dominate the prior. Under regularity conditions (Bernstein-von Mises theorem): $p(\theta \mid y) \approx N(\hat{\theta}, [I(\hat{\theta})]^{-1})$. Bayesian credible intervals and frequentist confidence intervals coincide in large samples. They diverge most in small-$n$, high-dimensional, or hierarchical settings.

---

### 4. Prior Information

**The biggest practical distinction in finite samples.**

Frequentist methods have no formal mechanism for incorporating prior knowledge (though regularization methods like ridge and lasso are implicitly Bayesian). Bayesian methods explicitly require a prior $p(\theta)$ ([[Single-Parameter Models]], [[raw/BDA3.pdf|BDA3 Ch. 2]]):

| Prior type | Description | When to use |
|-----------|-------------|-------------|
| **Informative** | Encodes genuine domain knowledge (e.g., cancer rates from neighboring counties) | Strong prior evidence available |
| **Weakly informative** | Constrains to reasonable ranges without dominating the likelihood | Default for most applied work |
| **Noninformative / flat** | "Let the data speak" — uniform prior | Large $n$; recovers frequentist MLE |
| **Jeffreys' prior** | $p(\theta) \propto [I(\theta)]^{1/2}$ — invariant to reparameterization | Reference analysis |

The posterior mean in the Normal-Normal model illustrates the prior-data compromise:

$$E[\mu \mid y] = \frac{\frac{1}{\tau_0^2}\mu_0 + \frac{n}{\sigma^2}\bar{y}}{\frac{1}{\tau_0^2} + \frac{n}{\sigma^2}}$$

This is a precision-weighted average of the prior mean $\mu_0$ and the sample mean $\bar{y}$ — with the prior's influence shrinking as $n$ grows ([[Single-Parameter Models#^thm-posterior-pooling|Gelman et al., BDA3 Ch. 2]]).

> [!warning] Regularizing Priors as Implicit Frequentist Corrections ([[Bayesian Linear Regression]])
> Ridge regression ($L_2$ penalty) is equivalent to a Bayesian Normal prior on coefficients. Lasso ($L_1$) is equivalent to a Laplace prior. The horseshoe prior is a state-of-the-art Bayesian regularizer that allows large signals while strongly shrinking noise — and has no natural frequentist counterpart. Using priors is not a weakness; it's often the only principled way to handle $p \gg n$ settings.

---

### 5. What You Report: Point Estimates vs. Full Posteriors

**Frequentist**: report $\hat{\theta}$ and a standard error (or confidence interval). Uncertainty is summarized by the sampling distribution of $\hat{\theta}$ over hypothetical repeated experiments.

**Bayesian**: report the full posterior $p(\theta \mid y)$. Point summaries are optional ([[Posterior Sampling and Summarization]], [[raw/StatRethink-Bayes.pdf|Statistical Rethinking Ch. 3]]):
- **Median** minimizes expected absolute loss
- **Mean** minimizes expected quadratic loss
- **Mode (MAP)** minimizes zero-one loss

McElreath's insight: "you rarely *need* a point estimate. The entire posterior distribution is the Bayesian answer." This matters most when the posterior is skewed or multimodal — in those cases, any single-number summary is misleading.

The **posterior predictive distribution** propagates full uncertainty into predictions:

$$p(y^{\text{new}} \mid y) = \int p(y^{\text{new}} \mid \theta)\, p(\theta \mid y)\, d\theta$$

Frequentist prediction intervals account for parameter uncertainty only approximately (via plug-in or delta method).

---

### 6. Handling Multiple Parameters and Nuisance Parameters

**Frequentist**: nuisance parameters are profiled out (maximize over them), or eliminated via conditioning or sufficiency. The sampling distribution of profile likelihood estimators may be complex.

**Bayesian**: marginalize over nuisance parameters by integration ([[Multiparameter Models]], [[raw/BDA3.pdf|BDA3 Ch. 3]]):

$$p(\theta_1 \mid y) = \int p(\theta_1, \theta_2 \mid y)\, d\theta_2$$

This is conceptually clean but computationally demanding — motivating MCMC and variational methods. The practical payoff: uncertainty about nuisance parameters flows into uncertainty about parameters of interest automatically. With simulation, this reduces to examining marginals of the joint posterior draws.

---

### 7. Hierarchical / Multilevel Settings

This is where Bayesian methods most clearly dominate frequentist alternatives ([[Hierarchical Models]], [[raw/BDA3.pdf|BDA3 Ch. 5]]).

**Frequentist**: fixed effects (no pooling) or random effects (complete pooling). The frequentist random effects estimator requires approximations that become unreliable with few groups.

**Bayesian**: partial pooling arises naturally from the hierarchical model:

$$y_j \mid \theta_j \sim p(y_j \mid \theta_j), \quad \theta_j \mid \mu, \tau \sim N(\mu, \tau^2), \quad (\mu, \tau) \sim p(\mu, \tau)$$

The posterior for each $\theta_j$ borrows strength from all groups. The degree of pooling is determined by the variance ratio $\tau^2 / \sigma^2$ — inferred from the data, not pre-specified ([[Partial Pooling as Multiple Comparisons Correction]]).

[[Multiple Comparisons - Bayesian Perspective]] shows this also handles multiple comparisons: classical corrections adjust thresholds post-hoc; Bayesian partial pooling adjusts the estimates themselves, reducing [[Type S and Type M Errors|Type S and Type M errors]] simultaneously.

---

### 8. Model Comparison

**Frequentist**: likelihood ratio tests, AIC, adjusted $R^2$, $F$-tests. These penalize model complexity by the raw number of parameters $k$.

**Bayesian**: WAIC, LOO-CV (PSIS-LOO), and Bayes factors ([[Model Comparison]], [[Overfitting and Information Criteria]]):
- **WAIC** uses the effective number of parameters (which differs from $k$ for hierarchical models with partial pooling)
- **PSIS-LOO** approximates leave-one-out cross-validation with diagnostics for reliability
- **Bayes factors** $p(y \mid M_1) / p(y \mid M_2)$ integrate over all parameters, penalizing complexity automatically — but are sensitive to priors on parameters

> [!tip] AIC and WAIC Converge ([[Overfitting and Information Criteria]])
> WAIC converges to AIC when priors are flat and the posterior is Gaussian. The Bayesian WAIC is more general: it uses the full posterior and makes no Gaussian approximation, giving correct effective parameter counts for hierarchical models.

---

### 9. Significance Testing and Multiple Comparisons

**Frequentist**: hypothesis tests produce binary decisions (reject / fail to reject) based on the p-value $P(T(y^{\text{rep}}) \geq T(y) \mid H_0)$. The p-value is a property of the data, not of $H_0$ ([[Forking Paths and Bayesian Approaches]]).

**Bayesian**: no null hypothesis rejection. Instead:
- Report the posterior probability that the effect is positive: $P(\theta > 0 \mid y)$
- Report the full posterior distribution over effect size
- Use posterior predictive checks to assess model fit ([[Model Checking]])

[[Forking Paths and Bayesian Approaches]] emphasizes why this matters: the p-value's validity depends on the sampling distribution of the test statistic under repeated use of the *same procedure*. When the procedure is data-contingent (as in model search), the p-value is invalid. A Bayesian posterior probability remains a coherent statement regardless of how the analysis was chosen.

---

### Practical Implications: When to Use Which

| Situation | Lean Frequentist | Lean Bayesian |
|-----------|-----------------|---------------|
| Large $n$, simple model | ✓ (CLT holds, prior irrelevant) | Either works |
| Small $n$ | — | ✓ (priors encode structure, uncertainty propagated correctly) |
| Many parameters relative to $n$ | — | ✓ (regularizing priors essential) |
| Hierarchical/grouped data | Fragile | ✓ (partial pooling natural) |
| Prediction with uncertainty | Approximate | ✓ (posterior predictive) |
| Multiple comparisons | Corrections needed | ✓ (partial pooling handles it structurally) |
| Preregistered RCT | ✓ (classical inference valid) | Either works |
| Need interpretable probability statements | — | ✓ (credible intervals are what users want) |
| Communicating to non-statisticians | Risky (CI misinterpretation) | ✓ (credible interval is intuitive) |

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Probability and Bayesian Inference]] | Core formula: Bayes' theorem; three steps of Bayesian analysis |
| [[Asymptotics and Frequentist Connections]] | Bernstein-von Mises theorem; when the two frameworks converge |
| [[Single-Parameter Models]] | Posterior as prior-data compromise; conjugate priors |
| [[Posterior Sampling and Summarization]] | Credible intervals, HPDI, posterior predictive distribution |
| [[Multiparameter Models]] | Marginalizing over nuisance parameters |
| [[Bayesian Linear Regression]] | Regularizing priors; connection to ridge/lasso/horseshoe |
| [[Hierarchical Models]] | Partial pooling; where Bayesian methods dominate |
| [[Overfitting and Information Criteria]] | WAIC vs. AIC; regularizing priors vs. model selection |
| [[Statistical Rethinking - The Golem of Prague]] | Philosophy: probability as property of information |
| [[Forking Paths and Bayesian Approaches]] | Why p-values fail under data-contingent analysis |
| [[Multiple Comparisons - Bayesian Perspective]] | Hierarchical models replacing classical corrections |
| [[Regression and the CEF]] | Frequentist regression: best linear approximation to CEF |
| [[raw/BDA3.pdf]] | BDA3 Chs. 1-5 — the canonical Bayesian reference |
| [[raw/StatRethink-Bayes.pdf]] | Statistical Rethinking — accessible Bayesian perspective |
| [[raw/Mostly Harmless Econometrics.pdf]] | Frequentist regression from the econometrics perspective |
| [[raw/multiple2f.pdf]] | Gelman et al. (2009) — Bayesian superiority for multiple comparisons |
| [[raw/p_hacking.pdf]] | Gelman & Loken (2013) — frequentist p-values under model search |

## Related Concepts

- [[Model Checking]] — posterior predictive checks: Bayesian analogue of goodness-of-fit tests
- [[Model Comparison]] — LOO-CV, PSIS-LOO, Bayes factors
- [[Partial Pooling as Multiple Comparisons Correction]] — formal algebra of Bayesian shrinkage
- [[Type S and Type M Errors]] — errors that frequentist corrections don't address
- [[Hierarchical Linear Models]] — Bayesian regression with partial pooling
- [[MCMC Basics]] — computational machinery enabling Bayesian inference
- [[Approximation Methods]] — Laplace approximation, variational Bayes (fast alternatives to MCMC)
- [[BDA3 - Overview]] — the primary reference for the Bayesian framework described here
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] — related Q&A on a key frequentist vs. Bayesian divergence point
- [[Q - Common Pitfalls in Statistical Modeling]] — related Q&A covering pitfalls that differ across paradigms

## Gaps

- **No dedicated note on the likelihood principle** — the Bayesian-frequentist divide has deep roots in whether inference should respect the likelihood principle (Birnbaum 1962); the vault has no formal treatment of this
- **No coverage of fiducial inference** or neo-Fisherian approaches that occupy middle ground
- **No treatment of objective Bayes** (Jeffreys priors, reference priors) beyond a brief mention in [[Single-Parameter Models]]
- **No formal treatment of the Neyman-Pearson framework** (Type 1/Type 2 errors, power) vs. Fisherian p-values — two distinct frequentist traditions that are often conflated
- **Limited coverage of empirical Bayes** — mentioned in passing in [[Partial Pooling as Multiple Comparisons Correction]] but no dedicated note

## Follow-Up Questions

- When should I use informative priors, and how do I choose them?
- What is the posterior predictive check workflow in PyMC or Stan?
- How does MCMC actually work — what are the diagnostics I should monitor?
- How do Bayesian and frequentist approaches compare for causal inference specifically?
- What is empirical Bayes, and how does it relate to hierarchical models?
