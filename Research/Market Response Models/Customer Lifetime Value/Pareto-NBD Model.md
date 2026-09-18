---
title: Pareto-NBD Model
tags:
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
  - topic/probability-models
  - type/method
  - doc/paper
source: "[[raw/Fader Hardie 2005 - A Note on Deriving the Pareto-NBD Model.pdf]]"
source_location: "Fader & Hardie (2005) note 009, Secs. 2-6, pp. 2-14 (Eqs. 4-6, 13-14, 18-20, 27, 31, 34-35, 38-41)"
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
doc_type: paper
depends_on:
  - "[[Customer Lifetime Value - Overview]]"
  - "[[Single-Parameter Models]]"
  - "[[Survival Analysis]]"
used_by:
  - "[[BG-NBD Model]]"
  - "[[RFM Sufficient Statistics and Iso-Value Curves]]"
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Pareto/NBD
  - Pareto/NBD Model
  - Counting Your Customers
  - SMC Model
---

# Pareto-NBD Model

> [!summary]
> The **Pareto/NBD** model of Schmittlein, Morrison & Colombo (1987, "SMC") describes repeat buying in a **noncontractual, continuous-time** setting where customer "death" is never observed. While alive a customer buys as a Poisson process with rate $\lambda$; the customer's unobserved lifetime is exponential with rate $\mu$; $\lambda$ and $\mu$ vary independently across customers as gammas. Mixing gives an **NBD** for purchases while alive and a **Pareto (type II)** for lifetimes. Fader & Hardie's 2005 note re-derives SMC's results more transparently and adds the explicit likelihood: the customer's history enters only through frequency $x$, recency $t_x$ and observation length $T$, and $P(\text{alive})$ and the expected number of future purchases follow by Bayes' theorem. The cost is repeated evaluation of the Gaussian hypergeometric function ${}_2F_1$ — the motivation for the [[BG-NBD Model]].

## Overview

The firm sees a transaction log and, for each customer, a silence since the last purchase. Is the customer gone, or just between purchases? The Pareto/NBD answers probabilistically by combining a counting process with a latent survival process ([[Survival Analysis]] with an *unobserved* event time). SMC derived $P(\text{alive})$ and the conditional expectation but never wrote down the likelihood, which — together with reported numerical difficulty — left the model rarely implemented for almost two decades. The note summarized here (Fader & Hardie 2005, brucehardie.com/notes/009) supplies the missing likelihood and a "key intermediate result" that makes every derivation a one-liner.

## Main Content

> [!definition] Pareto/NBD assumptions ^def-pnbd-assumptions
> (Fader & Hardie 2005, Sec. 2)
> 1. Customers are "alive" for some time, then become **permanently inactive**.
> 2. While alive, purchases follow a **Poisson process** with rate $\lambda$: $P(X(t)=x \mid \lambda) = (\lambda t)^x e^{-\lambda t}/x!$; equivalently, interpurchase times are exponential.
> 3. The unobserved lifetime $\tau$ is **exponential** with dropout rate $\mu$: $f(\tau \mid \mu) = \mu e^{-\mu\tau}$.
> 4. $\lambda \sim \text{gamma}(r, \alpha)$ across customers: $g(\lambda \mid r,\alpha) = \alpha^r \lambda^{r-1} e^{-\lambda\alpha}/\Gamma(r)$ ($\alpha$ is a *rate*, despite being called "scale" in the paper).
> 5. $\mu \sim \text{gamma}(s, \beta)$ across customers.
> 6. $\lambda$ and $\mu$ vary **independently** across customers.

Assumptions 2 and 4 give the **NBD** for purchases while alive, and 3 and 5 give the **Pareto distribution of the second kind** (Lomax) for lifetimes (Eqs. 4–6):

$$
P(X(t)=x \mid r,\alpha) = \frac{\Gamma(r+x)}{\Gamma(r)\,x!}\left(\frac{\alpha}{\alpha+t}\right)^{r}\left(\frac{t}{\alpha+t}\right)^{x},
\qquad
P(\tau > t \mid s,\beta) = \left(\frac{\beta}{\beta+t}\right)^{s}.
$$

The NBD is the gamma-Poisson marginal of [[Single-Parameter Models]]; the Pareto is a gamma mixture of exponentials, whose decreasing aggregate hazard is a pure sorting effect (compare [[Shifted-Beta-Geometric Model for Contractual Retention]]).

> [!theorem] Individual-level likelihood and sufficiency of $(x, t_x, T)$ ^thm-pnbd-individual-likelihood
> Given purchase times $t_1,\dots,t_x$ in $(0,T]$, either the customer is still alive at $T$, contributing $\lambda^x e^{-\lambda T}$, or died at some $\tau \in (t_x, T]$, contributing $\lambda^x e^{-\lambda \tau}$. "In both cases, information on when each of the $x$ transactions occurred is not required" — $t_x$ (recency) and $x$ (frequency) are sufficient. Integrating out $\tau$ (Eqs. 12–14):
>
> $$
> L(\lambda,\mu \mid x,t_x,T) = \lambda^x e^{-(\lambda+\mu)T} + \lambda^x\!\int_{t_x}^{T}\! e^{-\lambda\tau}\mu e^{-\mu\tau}\,d\tau
> = \frac{\lambda^{x}\mu}{\lambda+\mu}e^{-(\lambda+\mu)t_x} + \frac{\lambda^{x+1}}{\lambda+\mu}e^{-(\lambda+\mu)T}.
> $$
>
> The authors note "this is a new result, as SMC do not present an explicit expression for the model likelihood function."

> [!theorem] Likelihood for a randomly chosen customer ^thm-pnbd-likelihood
> Taking the expectation over the two gammas (Eq. 18):
>
> $$
> L(r,\alpha,s,\beta \mid x,t_x,T) = \frac{\Gamma(r+x)\,\alpha^r\beta^s}{\Gamma(r)}\left\{\frac{1}{(\alpha+T)^{r+x}(\beta+T)^{s}} + \left(\frac{s}{r+s+x}\right)A_0\right\},
> $$
>
> where, for $\alpha \ge \beta$ (Eq. 19),
>
> $$
> A_0 = \frac{{}_2F_1\!\left(r+s+x,\,s+1;\,r+s+x+1;\,\tfrac{\alpha-\beta}{\alpha+t_x}\right)}{(\alpha+t_x)^{r+s+x}} - \frac{{}_2F_1\!\left(r+s+x,\,s+1;\,r+s+x+1;\,\tfrac{\alpha-\beta}{\alpha+T}\right)}{(\alpha+T)^{r+s+x}},
> $$
>
> and for $\alpha \le \beta$ (Eq. 20) the same with second argument $r+x$, ratio $\tfrac{\beta-\alpha}{\beta+\cdot}$ and base $(\beta+\cdot)$. Two forms are needed because the series for ${}_2F_1(a,b;c;z)$ converges only for $|z|<1$; choosing the branch by the sign of $\alpha-\beta$ keeps $z \in [0,1)$ (Sec. 2.1). Parameters are estimated by maximizing $\sum_i \ln L(r,\alpha,s,\beta \mid x_i,t_{x_i},T_i)$.

The derivation trick (Sec. 2.1) is a change of variables $p=\mu/(\lambda+\mu)$, $z=\lambda+\mu$ (Jacobian $z$), which turns every double integral of the form $\iint \lambda^\gamma\mu^\delta (\lambda+\mu)^{-1}e^{-(\lambda+\mu)t}g(\lambda)g(\mu)$ into Euler's integral for ${}_2F_1$. A second route (Eq. 21) integrates over $\lambda,\mu$ first and $\tau$ last, displaying the likelihood as "NBD likelihood × Pareto survivor" plus an integral over death times.

> [!theorem] Mean of the Pareto/NBD ^thm-pnbd-mean
> Conditional on the traits, $E[X(t)\mid\lambda,\mu] = \frac{\lambda}{\mu}\left(1-e^{-\mu t}\right)$ (Eq. 26); for a randomly chosen customer (Eq. 27, SMC Eq. 17), for $s \neq 1$,
>
> $$
> E[X(t) \mid r,\alpha,s,\beta] = \frac{r\beta}{\alpha(s-1)}\left[1-\left(\frac{\beta}{\beta+t}\right)^{s-1}\right].
> $$
>
> This drives the aggregate tracking plot of cumulative repeat sales for a cohort.

> [!theorem] Probability alive ^thm-pnbd-palive
> By Bayes' theorem $P(\tau>T \mid \lambda,\mu,x,t_x,T) = \lambda^x e^{-(\lambda+\mu)T}/L(\lambda,\mu\mid x,t_x,T)$, which simplifies to SMC's (A10) (Eq. 31):
>
> $$
> P(\tau > T \mid \lambda,\mu,x,t_x,T) = \frac{1}{1+\frac{\mu}{\lambda+\mu}\left[e^{(\lambda+\mu)(T-t_x)}-1\right]}.
> $$
>
> Averaging over the posterior of $(\lambda,\mu)$ gives (Eqs. 34–35)
>
> $$
> P(\text{alive} \mid x,t_x,T) = \frac{\Gamma(r+x)\alpha^r\beta^s}{\Gamma(r)(\alpha+T)^{r+x}(\beta+T)^s}\Big/ L(r,\alpha,s,\beta\mid x,t_x,T)
> = \left\{1+\frac{s}{r+s+x}(\alpha+T)^{r+x}(\beta+T)^{s}A_0\right\}^{-1}.
> $$
>
> The individual-level form shows the mechanics: $P(\text{alive})$ decays with the silence $T-t_x$ at rate $\lambda+\mu$, so a *high-frequency* customer is declared dead much sooner after going quiet — the root of the "increasing frequency paradox" in [[RFM Sufficient Statistics and Iso-Value Curves]]. (The note also flags an error in SMC's Eq. A25.)

> [!theorem] Conditional expectation of future purchases ^thm-pnbd-conditional-expectation
> Let $Y(t)$ be purchases in $(T,T+t]$. If alive at $T$, memorylessness gives $E[Y(t)\mid\lambda,\mu,\text{alive}] = \frac{\lambda}{\mu}(1-e^{-\mu t})$ (Eq. 38). Multiplying by $P(\text{alive})$ and averaging over the posterior (Eq. 41 rearranged; SMC Eq. 22):
>
> $$
> E[Y(t) \mid x,t_x,T] = P(\text{alive}\mid x,t_x,T)\times\frac{(r+x)(\beta+T)}{(\alpha+T)(s-1)}\left[1-\left(\frac{\beta+T}{\beta+T+t}\right)^{s-1}\right].
> $$
>
> The second factor is the Pareto/NBD mean (above) with **updated parameters** $r\to r+x$, $\alpha\to\alpha+T$, $\beta\to\beta+T$ — the conjugate gamma posterior of a customer who survived to $T$.

**Estimation difficulty.** Fader, Hardie & Lee (2005, Marketing Science, Sec. 2) describe the likelihood as "quite complex, involving numerous evaluations of the Gaussian hypergeometric function", whose numerical precision "can vary substantially over the parameter space", causing trouble for optimizers; they knew of only one published MLE implementation (Reinartz & Kumar 2003), and SMC's own three-step method-of-moments procedure lacks MLE's properties. Their own Pareto/NBD fit had to be done in MATLAB.

## Examples

**CDNOW cohort.** For a 1/10 sample (2,357 customers) of the Q1-1997 CDNOW cohort, calibrated on 39 weeks, the MLEs are $\hat r = 0.553$, $\hat\alpha = 10.578$, $\hat s = 0.606$, $\hat\beta = 11.669$ with $LL = -9595.0$ (Marketing Science 2005, Table 2). The cumulative tracking plot under-forecasts week-78 repeat sales by less than 2%.

Plugging these into the formulas above (own calculation, $\alpha<\beta$ branch, $T = 38.86$ weeks, horizon $t=39$):

| History $(x, t_x)$ | $P(\text{alive})$ | $E[Y(39)]$ |
|---|---|---|
| $(0,\ 0)$ | 0.30 | 0.11 |
| $(1,\ 1.71)$ | 0.17 | 0.17 |
| $(2,\ 30.43)$ | 0.87 | 1.46 |
| $(7,\ 29.43)$ | 0.75 | 3.71 |

Note the zero class: under Pareto/NBD a customer who never repurchased may already be dead ($P \approx 0.30$), whereas the BG/NBD forces $P(\text{alive}) = 1$ for $x=0$. A new customer is expected to make $E[X(39)] = 1.21$ repeat purchases in the first 39 weeks.

```python
import numpy as np
from scipy.special import hyp2f1, gammaln

def pnbd_loglik(r, a, s, b, x, tx, T):
    """Eq. 18 with A0 from Eq. 19 (a >= b) or Eq. 20 (a <= b)."""
    if a >= b:
        F = lambda u: hyp2f1(r+s+x, s+1, r+s+x+1, (a-b)/(a+u)) / (a+u)**(r+s+x)
    else:
        F = lambda u: hyp2f1(r+s+x, r+x, r+s+x+1, (b-a)/(b+u)) / (b+u)**(r+s+x)
    A0 = F(tx) - F(T)
    alive = 1.0 / ((a+T)**(r+x) * (b+T)**s)
    pre = gammaln(r+x) - gammaln(r) + r*np.log(a) + s*np.log(b)
    return pre + np.log(alive + s/(r+s+x) * A0)      # P(alive) = alive / (alive + s/(r+s+x)*A0)
```

## Connections

- [[Customer Lifetime Value - Overview]] — where the model sits in the contractual/noncontractual taxonomy.
- [[BG-NBD Model]] — replaces continuous-time exponential death with a coin flip after each purchase, eliminating ${}_2F_1$ from the likelihood.
- [[RFM Sufficient Statistics and Iso-Value Curves]] — uses this likelihood to derive discounted expected transactions (DET) and CLV.
- [[Gamma-Gamma Model of Monetary Value]] — the independent spend sub-model paired with Pareto/NBD.
- [[Single-Parameter Models]] — gamma-Poisson conjugacy; the updated parameters $(r+x, \alpha+T)$ are the conjugate posterior.
- [[Empirical Bayes - Overview]] — population parameters estimated by marginal ML, then reused as each customer's prior.
- [[Survival Analysis]] — exponential lifetimes, hazards and the survivor function; here the death time is fully latent.

## See Also

- [[Robbins Formula and Poisson Empirical Bayes]] — the nonparametric analogue of NBD conditional expectations.
- [[Delayed Feedback Model for Conversion Prediction]] — same "silent because slow, or silent because never?" structure with an exponential delay.
- [[Bayesian and Hierarchical Extensions of CLV Models]] — covariates via $\alpha = \alpha_0 e^{-\gamma_1' z_1}$, $\beta = \beta_0 e^{-\gamma_2' z_2}$; NUTS estimation in PyMC-Marketing.
- [[Heterogeneity in Agent Models]] — gamma-distributed rates as a calibrated heterogeneity specification for consumer agents.
