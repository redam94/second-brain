---
title: BG-NBD Model
tags:
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
  - topic/probability-models
  - type/method
  - doc/paper
source: "[[raw/Fader Hardie Lee 2005 - Counting Your Customers the Easy Way BG-NBD.pdf]]"
source_location: "Marketing Science 24(2), pp. 275-284; Secs. 3-7 and Appendix (Eqs. 1-10, A1-A8; Tables 1-3; Figs. 1-3)"
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
doc_type: paper
depends_on:
  - "[[Customer Lifetime Value - Overview]]"
  - "[[Pareto-NBD Model]]"
  - "[[Single-Parameter Models]]"
used_by:
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[Gamma-Gamma Model of Monetary Value]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - BG/NBD
  - BG/NBD Model
  - Beta-Geometric NBD
  - Counting Your Customers the Easy Way
---

# BG-NBD Model

> [!summary]
> The **beta-geometric/NBD (BG/NBD)** model (Fader, Hardie & Lee 2005, *Marketing Science*) changes one line of the [[Pareto-NBD Model]] story: instead of dying at an exponentially distributed *time*, a customer becomes inactive **immediately after a purchase with probability $p$**, with $p \sim \text{beta}(a,b)$ across customers. The purchase process while alive (Poisson, gamma-mixed) is unchanged. The payoff is a likelihood built from gamma and beta functions only — estimable with Excel's Solver — while fit and forecasts on CDNOW and on 81 simulated Pareto/NBD "worlds" are nearly indistinguishable from the original model (individual-level predictions correlate 0.996). The main limitation is structural: a customer with no repeat purchase cannot have dropped out, so the model struggles when penetration or purchase frequency is very low.

## Overview

The authors "have no misgivings about the [Pareto/NBD] model whatsoever, besides its computational complexity" (Sec. 8). The BG/NBD is proposed as "a small, relatively inconsequential, change" that "does not require any different psychological theories, nor does it have any noteworthy managerial implications", but makes the framework accessible to anyone with a spreadsheet. Data requirements are identical: for each customer, frequency $x$, recency $t_x$ and length of observation $T$.

## Main Content

> [!definition] BG/NBD assumptions ^def-bgnbd-assumptions
> (Sec. 3)
> 1. While active, transactions follow a Poisson process with rate $\lambda$ (exponential interpurchase times).
> 2. $\lambda \sim \text{gamma}(r,\alpha)$ across customers (Eq. 1).
> 3. After **any** transaction the customer becomes inactive with probability $p$, so dropout is distributed across transactions as a shifted geometric: $P(\text{inactive immediately after } j\text{th transaction}) = p(1-p)^{j-1}$.
> 4. $p \sim \text{beta}(a,b)$ across customers (Eq. 2).
> 5. $\lambda$ and $p$ vary independently across customers.
>
> As in SMC, all customers are assumed active at the start of the observation period.

> [!theorem] Individual-level likelihood ^thm-bgnbd-individual-likelihood
> Multiply the exponential density of each interpurchase time by the survival probability $(1-p)$ at each preceding purchase; after the last purchase at $t_x$, either the customer died (probability $p$) or stayed alive and bought nothing in $(t_x,T]$ (probability $(1-p)e^{-\lambda(T-t_x)}$). Collecting terms (Eq. 3):
>
> $$
> L(\lambda,p \mid x,t_x,T) = (1-p)^x\lambda^x e^{-\lambda T} + \delta_{x>0}\,p(1-p)^{x-1}\lambda^x e^{-\lambda t_x},
> $$
>
> with $\delta_{x>0}=1$ if $x>0$ and $0$ otherwise. As with the Pareto/NBD, "information on the timing of the $x$ transactions is not required; a sufficient summary of the customer's purchase history is $(X=x, t_x, T)$."

> [!theorem] Likelihood for a randomly chosen customer ^thm-bgnbd-likelihood
> Integrating over the gamma and beta (Eq. 6):
>
> $$
> L(r,\alpha,a,b \mid x,t_x,T) = \frac{B(a,b+x)}{B(a,b)}\frac{\Gamma(r+x)\alpha^r}{\Gamma(r)(\alpha+T)^{r+x}} + \delta_{x>0}\frac{B(a+1,b+x-1)}{B(a,b)}\frac{\Gamma(r+x)\alpha^r}{\Gamma(r)(\alpha+t_x)^{r+x}}.
> $$
>
> For the spreadsheet (Sec. 7) write $L = A_1 A_2 (A_3 + \delta_{x>0}A_4)$ with
>
> $$
> A_1=\frac{\Gamma(r+x)\alpha^r}{\Gamma(r)},\quad
> A_2=\frac{\Gamma(a+b)\Gamma(b+x)}{\Gamma(b)\Gamma(a+b+x)},\quad
> A_3=\left(\frac{1}{\alpha+T}\right)^{r+x},\quad
> A_4=\frac{a}{b+x-1}\left(\frac{1}{\alpha+t_x}\right)^{r+x}.
> $$
>
> Only `GAMMALN`, `LN` and `EXP` are needed; the sample log-likelihood (Eq. 7) is maximized with Solver.

**Dropout in calendar time.** Conditional on $(\lambda,p)$, $P(\tau>t) = \sum_j (1-p)^j (\lambda t)^j e^{-\lambda t}/j! = e^{-\lambda p t}$, so the lifetime is exponential with rate $\lambda p$ (Sec. 4.3). Unlike the Pareto/NBD, the dropout process is explicitly tied to the purchase rate: heavy buyers face more dropout opportunities per unit time.

> [!theorem] Expected purchases for a new customer ^thm-bgnbd-expected
> Individual level (Eq. 5): $E[X(t)\mid\lambda,p] = \frac{1}{p}-\frac{1}{p}e^{-\lambda p t}$. Randomly chosen customer (Eq. 9):
>
> $$
> E[X(t)\mid r,\alpha,a,b] = \frac{a+b-1}{a-1}\left[1-\left(\frac{\alpha}{\alpha+t}\right)^{r}{}_2F_1\!\left(r,b;\,a+b-1;\,\tfrac{t}{\alpha+t}\right)\right].
> $$
>
> This needs a *single* ${}_2F_1$ evaluation, and only after estimation — "this expectation is only used after the likelihood function has been maximized."

> [!theorem] Conditional expectation and probability alive ^thm-bgnbd-conditional-expectation
> For a customer with history $(x,t_x,T)$, the expected number of purchases in $(T,T+t]$ is (Eq. 10, derived in the Appendix via Eqs. A1–A8):
>
> $$
> E[Y(t)\mid x,t_x,T] = \frac{\dfrac{a+b+x-1}{a-1}\left[1-\left(\dfrac{\alpha+T}{\alpha+T+t}\right)^{r+x}{}_2F_1\!\left(r+x,\,b+x;\,a+b+x-1;\,\tfrac{t}{\alpha+T+t}\right)\right]}{1+\delta_{x>0}\dfrac{a}{b+x-1}\left(\dfrac{\alpha+T}{\alpha+t_x}\right)^{r+x}}.
> $$
>
> The individual-level probability of being active (Eq. A2) is the "alive" term of the likelihood over the whole likelihood, $P(\text{active at }T\mid\lambda,p,x,t_x,T) = (1-p)^x\lambda^xe^{-\lambda T}/L(\lambda,p\mid x,t_x,T)$, and equals 1 when $x=0$. Taking the same ratio with the mixed likelihood (Eq. 6) gives
>
> $$
> P(\text{alive}\mid x,t_x,T) = \left[1+\delta_{x>0}\frac{a}{b+x-1}\left(\frac{\alpha+T}{\alpha+t_x}\right)^{r+x}\right]^{-1},
> $$
>
> which is exactly the reciprocal of the denominator of Eq. 10 (the paper does not display this population-level expression separately; it follows directly from Eqs. 6 and A2). The numerator of Eq. 10 is Eq. 9 with updated parameters $r+x$, $\alpha+T$, $b+x$.

### Simulation: when does BG/NBD fail to mimic Pareto/NBD?

Section 6 simulates a $3^4 = 81$-cell factorial of Pareto/NBD worlds ($r,s\in\{0.25,0.5,0.75\}$; $\alpha,\beta\in\{5,10,15\}$), each with 4,000 households over 104 weeks; penetration ranges from 13% to 76% and mean purchase frequency among buyers from 2.1 to 8.2. BG/NBD is fitted on weeks 1–52 and its weeks 53–104 cumulative forecast scored by MAPE.

| | MAPE | Penetration | Avg. purchase frequency |
|---|---|---|---|
| Worst 10 worlds | 5.29% | 26% | 2.6 |
| Other 71 worlds | 2.32% | 43% | 3.8 |

Average MAPE is 2.68%, worst case 6.97% (Table 1). The failures cluster where buying is sparse: "under the BG/NBD, a customer cannot become inactive before making his first purchase", whereas Pareto/NBD death can precede any repeat purchase. The suggested remedy is a one-parameter extension for a segment of "hard core nonbuyers".

### Empirical comparison on CDNOW

Calibration: 2,357 customers, weeks 1–39; holdout weeks 40–78 (Sec. 7).

| | BG/NBD | Pareto/NBD |
|---|---|---|
| Parameters | $r=0.243,\ \alpha=4.414,\ a=0.793,\ b=2.426$ | $r=0.553,\ \alpha=10.578,\ s=0.606,\ \beta=11.669$ |
| Log-likelihood | $-9582.4$ | $-9595.0$ |
| Histogram fit | $\chi^2_3 = 4.82\ (p=0.19)$ | $\chi^2_3 = 11.99\ (p=0.007)$ |
| Holdout cumulative sales | under-forecast 4% | under-forecast 2% |
| Zero-class cond. expectation (actual $334/1411 = 0.24$) | 0.23 | 0.14 |
| Corr. with actual holdout transactions | 0.626 | 0.630 |

The two models' individual-level conditional expectations correlate **0.996** (Table 3). A three-group ANOVA of actual vs the two predictions is not significant ($F_{2,7068}=2.65$).

### Implementation caveats (Sec. 8)

- Fit **separately by cohort** (acquisition quarter, channel); for a mature base, by coarse RFM segment.
- Transferring one cohort's parameters to another requires the cohorts to be comparable.
- Forecasts assume future marketing resembles the past; the model is a **baseline** for evaluating changes.
- Covariates are possible, but if customers were targeted on past RFM, "we must be aware of econometric issues such as endogeneity bias (Shugan 2004) and sample selection bias."
- A spend model (normal-normal, or the [[Gamma-Gamma Model of Monetary Value]]) is required before CLV can be computed.

## Examples

**Reproducing two rows of the paper's Excel sheet (Fig. 1).** With $(r,\alpha,a,b)=(0.243,4.414,0.793,2.426)$:

- Customer 0001: $x=2$, $t_x=30.43$, $T=38.86$. $\ln A_1=-0.839$, $\ln A_2=-0.491$, $\ln A_3=-8.449$, $\ln A_4=-9.427$, so $\ln L = -0.839-0.491+\ln(e^{-8.449}+e^{-9.427}) = -9.46$. $P(\text{alive}) = [1+e^{-9.427+8.449}]^{-1} = 0.73$; expected purchases in the next 39 weeks $\approx 1.23$ (own calculation from Eq. 10).
- Customer 0003: $x=0$. $\ln L = \ln A_1+\ln A_3 = 0.360-0.914=-0.554$; $P(\text{alive})=1$ by construction; $E[Y(39)]\approx0.20$.
- Customer 0006: $x=7$, $t_x=29.43$: $P(\text{alive})\approx0.64$, $E[Y(39)]\approx3.34$ — lower survival probability than customer 0001 despite far more purchases, because nine silent weeks are more damning for a frequent buyer.

```python
import numpy as np
from scipy.special import gammaln, hyp2f1

def bgnbd_loglik(r, al, a, b, x, tx, T):
    A1 = gammaln(r+x) - gammaln(r) + r*np.log(al)
    A2 = gammaln(a+b) + gammaln(b+x) - gammaln(b) - gammaln(a+b+x)
    A3 = -(r+x)*np.log(al+T)
    A4 = np.where(x > 0, np.log(a) - np.log(np.maximum(b+x-1, 1e-12)) - (r+x)*np.log(al+tx), -np.inf)
    return A1 + A2 + np.logaddexp(A3, A4)

def bgnbd_cond_exp(r, al, a, b, x, tx, T, t):          # Eq. 10
    num = (a+b+x-1)/(a-1) * (1 - ((al+T)/(al+T+t))**(r+x)
          * hyp2f1(r+x, b+x, a+b+x-1, t/(al+T+t)))
    den = 1 + (x > 0) * a/(b+x-1) * ((al+T)/(al+tx))**(r+x)
    return num/den
```

## Connections

- [[Pareto-NBD Model]] — the parent model; same data, same purchase process, different death story.
- [[Customer Lifetime Value - Overview]] — validation yardsticks (histogram, tracking plot, conditional expectations).
- [[Gamma-Gamma Model of Monetary Value]] — spend sub-model needed to turn transactions into value.
- [[Single-Parameter Models]] — beta-binomial/geometric and gamma-Poisson conjugate pairs used for the two mixing distributions.
- [[Empirical Bayes - Overview]] — population MLEs act as the prior in each customer's conditional expectation.
- [[Bayesian and Hierarchical Extensions of CLV Models]] — BG/NBD is the default transaction model in `lifetimes` and PyMC-Marketing.

## See Also

- [[Shifted-Beta-Geometric Model for Contractual Retention]] — the same beta-geometric dropout, but with *observed* churn at renewal dates.
- [[Monsters and Mixtures]] — continuous mixtures and the hurdle/zero-inflation idea behind a "hard core nonbuyer" extension.
- [[Posterior Predictive Checking]] — the paper's histogram/tracking/conditional-expectation plots are predictive checks in all but name.
- [[Survival Analysis]] — geometric (discrete) vs exponential (continuous) lifetime models.
