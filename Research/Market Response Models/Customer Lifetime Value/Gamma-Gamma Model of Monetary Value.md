---
title: Gamma-Gamma Model of Monetary Value
tags:
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
  - topic/probability-models
  - type/method
  - doc/paper
source: "[[raw/Fader Hardie 2013 - The Gamma-Gamma Model of Monetary Value.pdf]]"
source_location: "Fader & Hardie (2013) note 025, Secs. 1-3, pp. 1-9 (Eqs. 1a-6); Fader, Hardie & Lee (2005, JMR preprint) Secs. 2.1-2.2, 3, pp. 9-16"
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
doc_type: paper
depends_on:
  - "[[Customer Lifetime Value - Overview]]"
  - "[[Single-Parameter Models]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
used_by:
  - "[[RFM Sufficient Statistics and Iso-Value Curves]]"
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Gamma-Gamma Model
  - Gamma-Gamma Spend Model
  - GG Model
  - Beta of the Second Kind Spend Model
---

# Gamma-Gamma Model of Monetary Value

> [!summary]
> The **gamma-gamma (GG)** model is the spend sub-model that turns a transaction forecast into a value forecast. Each transaction amount is gamma distributed around a customer-specific mean; the gamma's rate parameter varies across customers as another gamma; and the whole spend process is assumed **independent of the transaction process**. Conjugacy yields a closed-form marginal for a customer's observed average spend $\bar z$ (a beta distribution of the second kind) and a conditional expectation $E(Z\mid\bar z,x)$ that is a **precision-weighted average of the population mean and the customer's own average** — a textbook shrinkage estimator. Fader & Hardie's 2013 note gives the full derivation of the model first used in Fader, Hardie & Lee (2005), which adapted Colombo & Jiang (1999).

## Overview

Why model spend at all, when the customer's average $\bar z$ is observed? Because $\bar z$ is computed from very few transactions. Fader, Hardie & Lee's example: the mean spend across all customers is \$35, but customer A has made one repeat purchase of \$100. "Should we assume that $E(M) = m_1 = \$100$ or should we 'debias' our estimate down towards the population mean?" (2005, Sec. 2.1). The observed mean converges to the true mean as $x\to\infty$, "but this could be a slow process."

Schmittlein & Peterson (1994) used a normal-normal model. The note lists two problems: the normal "is not bounded from below by 0" and "results in a symmetric spend distribution", while real spend data are right-skewed (CDNOW: mean \$35, median \$27, mode \$15, skewness 4, kurtosis 17). A lognormal would fit but "there is no closed-form expression for the convolution of lognormals", so the distribution of $\bar z$ is intractable. The gamma has "similar properties to those of the lognormal (albeit with a slightly thinner tail)" and is closed under convolution and scaling.

## Main Content

> [!definition] Gamma-gamma assumptions ^def-gg-assumptions
> General assumptions (Fader & Hardie 2013, Sec. 1):
> 1. The monetary value of a customer's given transaction varies randomly around their average transaction value.
> 2. Average transaction values vary across customers but **do not vary over time** for any given individual.
> 3. The distribution of average transaction values across customers is **independent of the transaction process**.
>
> Distributional form (Sec. 2): $z_i \sim \text{gamma}(p,\nu)$ with shape $p$ and rate $\nu$, so $E(Z_i\mid p,\nu)=\zeta=p/\nu$; and $\nu\sim\text{gamma}(q,\gamma)$ across customers. The shape $p$ is common to all customers, which "is equivalent to assuming that the individual-level coefficient of variation is the same for all customers ($CV = 1/\sqrt p$)" (2005, Sec. 2.1).

By the convolution property total spend over $x$ transactions is $\text{gamma}(px,\nu)$, and by the scaling property $\bar z \sim \text{gamma}(px,\nu x)$.

> [!theorem] Marginal distribution of average spend ^thm-gg-marginal
> Integrating $\nu$ out (Eqs. 1a–1b):
>
> $$
> f(\bar z\mid p,q,\gamma;x)=\frac{\Gamma(px+q)}{\Gamma(px)\Gamma(q)}\frac{\gamma^{q}\,\bar z^{\,px-1}x^{px}}{(\gamma+x\bar z)^{px+q}}
> =\frac{1}{\bar z\,B(px,q)}\left(\frac{\gamma}{\gamma+x\bar z}\right)^{q}\left(\frac{x\bar z}{\gamma+x\bar z}\right)^{px}.
> $$
>
> This is a beta distribution of the second kind (B2). The second form is numerically safer for large $x$ and $\bar z$ because both bases are below one (note 025, fn. 1). The sample log-likelihood is $LL(p,q,\gamma)=\sum_i \ln f(\bar z_i\mid p,q,\gamma;x_i)$ over customers with $x_i\ge1$ (Eq. 6).

> [!theorem] Distribution of the latent mean spend ^thm-gg-latent-mean
> Since $\zeta=p/\nu$ with $\nu\sim\text{gamma}(q,\gamma)$, a change of variables gives an **inverse-gamma** with shape $q$ and scale $p\gamma$ (Eqs. 2–4):
>
> $$
> f(\zeta\mid p,q,\gamma)=\frac{(p\gamma)^{q}\zeta^{-q-1}e^{-p\gamma/\zeta}}{\Gamma(q)},\qquad
> E(Z)=\frac{p\gamma}{q-1},\qquad
> \operatorname{var}(Z)=\frac{p^2\gamma^2}{(q-1)^2(q-2)}.
> $$

> [!theorem] Conditional expectation of mean spend (shrinkage form) ^thm-gg-conditional-expectation
> The posterior of $\nu$ given $(\bar z, x)$ is $\text{gamma}(px+q,\ \gamma+x\bar z)$, hence (Eq. 5)
>
> $$
> E(Z\mid p,q,\gamma;\bar z,x)=\frac{p(\gamma+x\bar z)}{px+q-1}
> =\underbrace{\frac{q-1}{px+q-1}}_{w(x)}\cdot\frac{p\gamma}{q-1}+\underbrace{\frac{px}{px+q-1}}_{1-w(x)}\cdot\bar z .
> $$
>
> "This is the weighted average of the population mean, $E(Z)$, and the observed average transaction value, $\bar z$. As the number of observations ($x$) used to compute $\bar z$ increases, less weight is placed on the population mean."

This is the same algebra as the normal-normal posterior mean in [[Hierarchical Models]] and the linear shrinkage rule in [[Empirical Bayes Interpretation of Shrinkage]], with $p x$ playing the role of the data's precision and $q-1$ the prior's. For a customer with no repeat transactions ($x=0$), $w=1$ and the forecast is the population mean.

### The independence assumption

Assumption 3 is what lets CLV factor into transactions × spend ([[Customer Lifetime Value - Overview#^def-clv-decomposition|CLV decomposition]]). Fader, Hardie & Lee (2005, Sec. 2.2) check it on the 946 CDNOW customers with at least one repeat purchase: the correlation between average transaction value and number of transactions is **0.11**, "largely driven by one outlier" (21 transactions averaging \$300); removing it gives **0.06** ($p=0.08$). Box plots by frequency show "the variation within each number-of-transactions group dominates the between-group variation." They caution that "any researcher applying our model to a new dataset must test the validity of the assumption", and sketch two relaxations: a bivariate Sarmanov distribution with gamma marginals linking $\nu$ and $\lambda$, or "a hierarchical Bayesian formulation of the basic model" (Sec. 5). Wang, Liu & Miao (2019) call the independence assumption "shaky" — "frequent purchasers may spend less on each purchase" — as motivation for direct regression ([[Bayesian and Hierarchical Extensions of CLV Models]]).

A subtle consequence (2005, Sec. 5): even with true independence, regression to the mean is stronger for low-frequency customers than high-frequency ones, which "creates the illusion" that monetary value and frequency are more tightly connected than they are.

### Empirical results (CDNOW)

- MLEs: $\hat p=6.25$, $\hat q=3.74$, $\hat\gamma=15.44$ (constraints: all $\ge 0.0001$; Excel Solver).
- Implied population mean $p\gamma/(q-1)=\$35.2$; the paper reports the theoretical mean differs from the observed mean of customer averages (\$35.08) "by a mere nine cents".
- Model fit is judged by mixing $f(\bar z\mid x)$ over the empirical distribution of $x$ and comparing with a kernel density of observed $\bar z$. "The fit is reasonable. However, the theoretical mode of \$19 is greater than the observed mode of \$15, which corresponds to the typical price of a CD" — the model knows nothing about price points.
- Stability: parameters estimated on all 78 weeks give a 39-week log-likelihood of $-4661$ versus the 39-week optimum of $-4659$, "strong support for our assumption that the sub-model governing monetary value is stable over time" (2005, Sec. 4).
- Do **not** compare the inverse-gamma $f(\zeta)$ with the histogram of $\bar z$: the former is "effectively the distribution where the means have been computed across $x\to\infty$ transactions" (note 025, Sec. 3).

## Examples

**How fast does shrinkage fade?** With CDNOW parameters the prior weight is $w(x)=2.74/(6.25x+2.74)$.

| $x$ | $w(x)$ | $E(Z\mid\bar z=\$100)$ | $E(Z\mid\bar z=\$20)$ |
|---|---|---|---|
| 0 | 1.000 | 35.22 | 35.22 |
| 1 | 0.305 | 80.26 | 24.64 |
| 2 | 0.180 | 88.35 | 22.74 |
| 7 | 0.059 | 96.18 | 20.90 |
| 10 | 0.042 | 97.28 | 20.64 |

(Own calculation from Eq. 5.) After a single \$100 purchase the model already moves about 70% of the way from \$35 to \$100, because $p=6.25$ implies a fairly tight individual-level coefficient of variation ($1/\sqrt{6.25}=0.4$). The paper's reading of its Figure 12: "Not until the customer has made 7–8 transactions can we trust the observed value of $m_x$."

```python
import numpy as np
from scipy.special import gammaln
from scipy.optimize import minimize

def gg_negloglik(theta, x, zbar):               # Eq. 1a, customers with x >= 1
    p, q, g = np.exp(theta)
    ll = (gammaln(p*x+q) - gammaln(p*x) - gammaln(q) + q*np.log(g)
          + (p*x-1)*np.log(zbar) + p*x*np.log(x) - (p*x+q)*np.log(g + x*zbar))
    return -ll.sum()

def gg_expected_spend(p, q, g, x, zbar):         # Eq. 5
    return p*(g + x*zbar) / (p*x + q - 1)
```

## Connections

- [[Customer Lifetime Value - Overview]] — spend is one of the three factors in CLV = margin × spend × DET.
- [[RFM Sufficient Statistics and Iso-Value Curves]] — uses $E(M\mid m_x,x)$ as the "DET multiplier"; $(m_x,x)$ are the M and F of RFM.
- [[Pareto-NBD Model]] and [[BG-NBD Model]] — the transaction models it is paired with under independence.
- [[Single-Parameter Models]] — gamma likelihood with gamma prior on the rate is a standard conjugate pair.
- [[Empirical Bayes Interpretation of Shrinkage]] and [[James-Stein Estimator]] — same weighted-average structure; here weights come from a fitted gamma prior rather than a normal one.
- [[Hierarchical Models]] — partial pooling of customer means toward the population mean.

## See Also

- [[Bayesian and Hierarchical Extensions of CLV Models]] — PyMC-Marketing's `GammaGammaModel` and relaxing independence.
- [[Monsters and Mixtures]] — continuous mixture models for over-dispersed data.
- [[Generalized Linear Models]] — gamma regression as the covariate-driven alternative for skewed positive outcomes.
