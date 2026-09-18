---
title: Customer Lifetime Value - Overview
tags:
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
  - topic/probability-models
  - type/overview
  - doc/paper
source: "[[raw/Fader Hardie Lee 2005 - RFM and CLV Iso-Value Curves.pdf]]"
source_location: "Fader, Hardie & Lee (2005, JMR preprint) Secs. 1-2, 5, pp. 1-8, 26-30; Fader & Hardie (2007) Sec. 4.1, pp. 12-14"
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
doc_type: paper
depends_on:
  - "[[Single-Parameter Models]]"
  - "[[Hierarchical Models]]"
  - "[[Survival Analysis]]"
used_by:
  - "[[Pareto-NBD Model]]"
  - "[[BG-NBD Model]]"
  - "[[Gamma-Gamma Model of Monetary Value]]"
  - "[[RFM Sufficient Statistics and Iso-Value Curves]]"
  - "[[Shifted-Beta-Geometric Model for Contractual Retention]]"
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
aliases:
  - CLV
  - Customer Lifetime Value
  - Customer-Base Analysis
  - Buy Till You Die Models
  - BTYD
---

# Customer Lifetime Value - Overview

> [!summary]
> **Customer lifetime value (CLV)** is the present value of the future cash flows attributable to a customer. The Fader–Hardie school of **customer-base analysis** estimates it with small, closed-form *probability models*: each customer is described by a few latent traits (a purchase rate, a dropout propensity, a mean spend), the traits vary across customers according to a conjugate mixing distribution, and Bayes' theorem converts a customer's observed history into a posterior over the traits and hence a forecast. In noncontractual settings the workhorses are the [[Pareto-NBD Model]] and its easier cousin the [[BG-NBD Model]] for transaction flow, combined with the [[Gamma-Gamma Model of Monetary Value]] for spend; in contractual settings the [[Shifted-Beta-Geometric Model for Contractual Retention]] projects the survivor curve. A striking structural result is that **recency, frequency and monetary value (RFM) are sufficient statistics** ([[RFM Sufficient Statistics and Iso-Value Curves]]). Where the aggregate response models elsewhere in this section ask "how do sales respond to marketing?", these models ask "who are my customers and what will they do next?".

## Overview

The rest of the Market Response Models section works with *aggregate* data: sales by week, region or brand regressed on marketing instruments ([[Market Response Models - Overview]], [[Bayesian Media Mix Modeling - Overview]]). Customer-base analysis starts instead from the *transaction log* — customer id, date, amount — and produces individual-level forecasts that roll up to the value of a cohort or the whole customer base.

Fader, Hardie & Lee (2005, Sec. 1) motivate a formal model by listing what is wrong with the usual practice of regressing period-2 behaviour on period-1 RFM scores: (i) scoring models predict only the *next* period, while CLV needs periods 3, 4, 5, … tied back to a present value; (ii) two periods of data are required — one to define the RFM regressors and one to create the dependent variable — so not all data can be used for calibration; and (iii) observed RFM variables are "only imperfect indicators of underlying behavioral traits", so different slices of the data yield different RFM values and therefore different scoring-model parameters. Their remedy is to assume "observed behavior is a realization of latent traits", use Bayes' theorem to estimate the traits from observed behaviour, and then predict future behaviour as a function of the traits.

## Main Content

> [!definition] The CLV decomposition ^def-clv-decomposition
> Assuming monetary value is independent of the transaction process, Fader, Hardie & Lee (2005, Eq. 1) factor lifetime value as
>
> $$
> \text{CLV} = \text{margin} \times \text{revenue per transaction} \times \text{DET},
> $$
>
> where **DET** is the number of *discounted expected transactions*: the present value of the customer's expected future transaction stream. A transaction-flow model ([[Pareto-NBD Model]], [[BG-NBD Model]]) supplies DET; a spend model ([[Gamma-Gamma Model of Monetary Value]]) supplies expected revenue per transaction; margin is an accounting input (30% is assumed for CDNOW).

> [!definition] Contractual CLV via the survivor function ^def-contractual-clv
> In a contractual setting churn is observed and the retention rate $r_t$ is well defined. With survivor function $S(t) = \prod_{i=1}^t r_i$, net cash flow $m$ per period and discount rate $d$ (Fader & Hardie 2007, Sec. 1),
>
> $$
> E(\text{CLV}) = \sum_{t=0}^{\infty} m\,\frac{S(t)}{(1+d)^t},
> \qquad \text{expected tenure} = \sum_{t=0}^{\infty} S(t).
> $$
>
> The practical obstacle is that $S(t)$ is observed only over a short window and must be *projected* — the job of the [[Shifted-Beta-Geometric Model for Contractual Retention]].

> [!definition] The two-by-two classification of customer bases ^def-two-by-two
> Fader & Hardie (2007, Sec. 4.1) classify business settings on two dimensions: **type of relationship** (contractual — departure is observed; noncontractual — departure is latent and must be inferred from a lengthening silence) and **opportunities for transactions** (continuous vs discrete time). Each cell has a canonical model:
>
> | | Noncontractual | Contractual |
> |---|---|---|
> | **Continuous time** | Pareto/NBD, BG/NBD | exponential-gamma (Lomax / Pareto II) |
> | **Discrete time** | BG/BB | shifted-beta-geometric (sBG) |

All of these models share one template, often nicknamed "buy till you die":

1. **An individual-level story** with memoryless components — Poisson purchasing, exponential or geometric lifetime, gamma-distributed spend.
2. **Cross-sectional heterogeneity** in each latent trait, captured by the conjugate mixing distribution (gamma for rates, beta for probabilities). This is exactly the gamma-Poisson and beta-binomial machinery of [[Single-Parameter Models]], applied to a population.
3. **Marginalization** to obtain a likelihood for a randomly chosen customer that depends only on a handful of population parameters (four for Pareto/NBD and BG/NBD, three for gamma-gamma, two for sBG), estimated by maximum likelihood — often in a spreadsheet.
4. **Conditional expectations** by Bayes' theorem: $P(\text{alive} \mid \text{history})$, $E[\text{future transactions} \mid \text{history}]$, $E[\text{mean spend} \mid \text{history}]$. Because population parameters are estimated from the data and then used as the prior for each customer, this is parametric [[Empirical Bayes - Overview|empirical Bayes]]; every conditional expectation is a shrinkage estimator ([[Empirical Bayes Interpretation of Shrinkage]]).

> [!theorem] Validation standard for CLV models ^thm-validation-standard
> Fader, Hardie & Lee insist on three holdout diagnostics (2005 JMR Sec. 3 and Sec. 5; 2005 Marketing Science Sec. 7): (a) the fitted vs actual **frequency histogram** of repeat transactions in calibration; (b) the **tracking plot** of cumulative repeat transactions through calibration *and* holdout; (c) **conditional expectations** — mean holdout transactions grouped by calibration frequency. "Given the individual-level nature of CLV, it is not enough to use tracking plots or other purely aggregate summaries to judge the performance of the model." Performance in the **zero class** (customers with no repeat purchase) is singled out as critical because that group is typically the largest.

**Reading map.** Start with the [[Pareto-NBD Model]] (assumptions, likelihood, $P(\text{alive})$, conditional expectation), then the [[BG-NBD Model]] (same data, simpler maths), then the [[Gamma-Gamma Model of Monetary Value]]. [[RFM Sufficient Statistics and Iso-Value Curves]] assembles them into CLV and explains the "increasing frequency paradox". The [[Shifted-Beta-Geometric Model for Contractual Retention]] covers subscription businesses. [[Bayesian and Hierarchical Extensions of CLV Models]] covers covariates, full-Bayes estimation, the PyMC-Marketing / `lifetimes` implementations and the machine-learning alternative.

> [!note] Relevance to marketing measurement and applied work
> - **CLV as the outcome for incrementality.** Media mix models and geo experiments usually measure first-order revenue. When acquisition campaigns differ in the *quality* of customers they bring in, valuing each acquired customer at a model-based CLV (rather than first-purchase revenue) changes the ROAS ranking of channels; see [[ROAS, mROAS, and Optimal Media Mix]] and [[Optimal Marketing Decisions and Forecasting]]. This is an application of the models, not a claim made in the source papers.
> - **Baseline, not causal effect.** The authors are explicit that forecasts assume "future marketing activities targeted at the group of customers will basically be the same as those observed in the past"; the model gives "a baseline against which we can examine the impact of changes in marketing activity" (Marketing Science 2005, Sec. 8). Adding marketing covariates invites endogeneity and selection bias when targeting was based on past RFM — the same identification problem that motivates experiments elsewhere in this vault.
> - **Heterogeneity versus dynamics.** The sBG result that aggregate retention rises with tenure even though every individual's churn probability is constant is a "ruse of heterogeneity". The same sorting effect contaminates any aggregate time series built from a changing population, and is a useful caution for ABM calibration ([[Heterogeneity in Agent Models]]).
> - **Bayesian workflow.** These are small hierarchical models with closed-form marginals — ideal components for a PyMC pipeline that already hosts an MMM ([[Bayesian Estimation and Priors for MMM]]).

## Examples

**One customer, end to end (CDNOW parameters).** A customer acquired 38.86 weeks ago has made $x = 2$ repeat purchases, the last at week $t_x = 30.43$, averaging $\bar z = \$100$.

1. *Transactions.* With the Pareto/NBD estimates $(r,\alpha,s,\beta) = (0.553, 10.578, 0.606, 11.669)$, $P(\text{alive}) \approx 0.87$ and the expected number of purchases over the next 39 weeks is $\approx 1.46$. With weekly discounting at $\delta = \ln(1.15)/52 = 0.0027$, $\text{DET} \approx 6.5$ (computed from the formulas in [[Pareto-NBD Model]] and [[RFM Sufficient Statistics and Iso-Value Curves]]).
2. *Spend.* With gamma-gamma estimates $(p,q,\gamma) = (6.25, 3.74, 15.44)$ the population mean spend is $\$35.2$; two observations at $\$100$ shrink to $E(Z \mid \bar z, x) \approx \$88.4$ ([[Gamma-Gamma Model of Monetary Value]]).
3. *CLV.* $0.30 \times 88.4 \times 6.5 \approx \$172$.

The three numbers $(x, t_x, \bar z)$ — frequency, recency, monetary value — plus the customer's age $T$ are all the customer-level data used.

## Connections

- [[Pareto-NBD Model]] — the original "counting your customers" model (Schmittlein, Morrison & Colombo 1987).
- [[BG-NBD Model]] — dropout after purchases; spreadsheet-friendly likelihood.
- [[Gamma-Gamma Model of Monetary Value]] — spend sub-model and its shrinkage estimator.
- [[RFM Sufficient Statistics and Iso-Value Curves]] — DET, CLV surfaces and the increasing-frequency paradox.
- [[Shifted-Beta-Geometric Model for Contractual Retention]] — retention projection for subscriptions.
- [[Bayesian and Hierarchical Extensions of CLV Models]] — covariates, MCMC, software, ML alternatives.
- [[Single-Parameter Models]] and [[Hierarchical Models]] — the conjugate building blocks and the partial-pooling logic.
- [[Survival Analysis]] — survivor and hazard functions; the latent "death" process is a survival model with unobserved event times.

## See Also

- [[Markets Data and Sales Drivers]] — where transaction-level and panel data sit among marketing data sources.
- [[Delayed Feedback Model for Conversion Prediction]] — another model where "not yet" and "never" must be separated probabilistically.
- [[Robbins Formula and Poisson Empirical Bayes]] — nonparametric counterpart of the NBD's gamma-Poisson shrinkage.
- [[Monsters and Mixtures]] — continuous mixtures (gamma-Poisson, beta-binomial) and zero-inflation.
- [[Discrete Choice Models]] — the other major family of individual-level marketing models.
- [[Product Adoption and Diffusion Models]] — acquisition-side dynamics that feed the cohorts analysed here.
