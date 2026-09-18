---
title: Customer Lifetime Value - Index
tags:
  - type/index
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
parent: "[[Research/Market Response Models/_Index|Market Response Models]]"
---

# Customer Lifetime Value - Index

> [!abstract] Routing Summary
> Customer-level probability models for customer-base analysis and customer lifetime value (CLV), anchored by the Fader–Hardie papers and technical notes: Pareto/NBD and BG/NBD for noncontractual transaction flow, gamma-gamma for spend, RFM iso-value curves for CLV, and the shifted-beta-geometric for contractual retention. Complements the aggregate response models (MMM, adstock, geo experiments) elsewhere in Market Response Models.
>
> - Need the big picture, the CLV decomposition, or which model fits which business setting? → [[Customer Lifetime Value - Overview]]
> - Need the original "counting your customers" model, its likelihood, $P(\text{alive})$ or conditional expectation? → [[Pareto-NBD Model]]
> - Need the easy-to-fit alternative (Excel-level likelihood) and how it compares empirically? → [[BG-NBD Model]]
> - Need expected spend per transaction with shrinkage toward the population mean? → [[Gamma-Gamma Model of Monetary Value]]
> - Need to turn recency/frequency/monetary value into CLV, or to understand why more past purchases can mean *lower* value? → [[RFM Sufficient Statistics and Iso-Value Curves]]
> - Need to project retention or the survivor curve for a subscription business? → [[Shifted-Beta-Geometric Model for Contractual Retention]]
> - Need covariates, full-Bayes / PyMC-Marketing, cohort pooling, or the ML (ZILN) alternative? → [[Bayesian and Hierarchical Extensions of CLV Models]]
> - Need the formula for discounted expected transactions? → [[RFM Sufficient Statistics and Iso-Value Curves#^thm-det|DET closed form]]
> - Need to explain why retention rates rise with tenure? → [[Shifted-Beta-Geometric Model for Contractual Retention#^thm-ruse-of-heterogeneity|ruse of heterogeneity]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| CLV framing and model taxonomy | [[Customer Lifetime Value - Overview]] | overview | Single-Parameter Models; Hierarchical Models; Survival Analysis | CLV = margin × revenue/transaction × DET; contractual vs noncontractual × discrete vs continuous; validation by histogram, tracking plot, conditional expectations |
| Pareto/NBD | [[Pareto-NBD Model]] | method | Overview; Single-Parameter Models | Poisson purchases + exponential lifetime, gamma-mixed; $(x,t_x,T)$ sufficient; likelihood via ${}_2F_1$; $E[Y(t)\mid\cdot]$ = $P(\text{alive})$ × updated-parameter mean |
| BG/NBD | [[BG-NBD Model]] | method | Pareto-NBD Model | Dropout w.p. $p$ after each purchase, $p\sim$ beta; likelihood in gamma/beta functions only; predictions correlate 0.996 with Pareto/NBD on CDNOW |
| Gamma-gamma spend | [[Gamma-Gamma Model of Monetary Value]] | method | Overview; Shrinkage | $E(Z\mid\bar z,x)=\frac{q-1}{px+q-1}E(Z)+\frac{px}{px+q-1}\bar z$; spend independent of transaction process (corr. 0.06–0.11 on CDNOW) |
| RFM, DET and iso-value curves | [[RFM Sufficient Statistics and Iso-Value Curves]] | concept | Pareto-NBD Model; Gamma-Gamma | Closed-form DET with Tricomi $\Psi$; backward-bending iso-value curves (increasing frequency paradox); zero class ≈ 5% of CDNOW cohort value |
| sBG retention | [[Shifted-Beta-Geometric Model for Contractual Retention]] | method | Overview; Survival Analysis | $r_t=(\beta+t-1)/(\alpha+\beta+t-1)$ rises with tenure purely through heterogeneity; year-12 survival projected within ~4% from 7 years of data |
| Bayesian / hierarchical / ML extensions | [[Bayesian and Hierarchical Extensions of CLV Models]] | application | all of the above; Hierarchical Models | Covariates via $\alpha=\alpha_0e^{-\gamma_1'z_1}$ etc.; PyMC-Marketing priors and cohort pooling; ZILN loss for new-customer LTV |

## Notes

- [[Customer Lifetime Value - Overview]] — CONTAINS: critique of RFM scoring regressions, CLV decomposition (margin × spend × DET), contractual CLV as discounted survivor sum, two-by-two taxonomy of settings and models, "buy till you die" template, validation standard, relevance to MMM / incrementality work, end-to-end numeric example.
- [[Pareto-NBD Model]] — CONTAINS: six assumptions, NBD and Pareto II marginals, individual-level likelihood and sufficiency of recency/frequency, population likelihood with $\alpha\gtrless\beta$ branches, mean $E[X(t)]$, $P(\text{alive})$ (individual and population), conditional expectation, estimation difficulties, CDNOW estimates, Python log-likelihood.
- [[BG-NBD Model]] — CONTAINS: five assumptions, likelihood (Eqs. 3, 6) and $A_1$–$A_4$ spreadsheet form, $E[X(t)]$, conditional expectation (Eq. 10) and implied $P(\text{alive})$, 81-world simulation (MAPE table), CDNOW comparison table vs Pareto/NBD, implementation caveats, worked rows of the Excel sheet, Python code.
- [[Gamma-Gamma Model of Monetary Value]] — CONTAINS: assumptions, why not normal or lognormal, marginal density of $\bar z$ (B2 distribution), inverse-gamma latent mean, conditional expectation as shrinkage, independence test on CDNOW, fit diagnostics and stability, shrinkage-weight table, Python MLE code.
- [[RFM Sufficient Statistics and Iso-Value Curves]] — CONTAINS: sufficiency argument, DET derivation and closed form, continuous discounting, CLV-from-RFM formula, increasing frequency paradox with explanation, two-stage holdout validation, CDNOW cohort valuation (Tables 2–3), author-stated limitations, DET grid example, Python code.
- [[Shifted-Beta-Geometric Model for Contractual Retention]] — CONTAINS: failure of curve-fitting extrapolation, coin-flip story, sBG pmf/survivor/retention formulas and recursion, ruse of heterogeneity, censored cohort-table MLE algorithm, Regular/High End estimates and replication (including the 0.688 vs 0.668 typo), limits, BdW and EG relatives, multi-cohort hierarchical proposal, Python code.
- [[Bayesian and Hierarchical Extensions of CLV Models]] — CONTAINS: time-invariant covariate theorem (note 019) and sign convention, beta-logistic rationale, endogeneity warning, empirical-Bayes vs full-Bayes, marginal-likelihood vs data-augmentation sampling, `lifetimes` and PyMC-Marketing classes / default priors / fit methods / covariates / cohort pooling, ZILN loss and evaluation metrics, model-choice table, covariate and API examples.

## External / Cross-Folder Links

- [[Single-Parameter Models]] — gamma-Poisson and beta-binomial conjugate pairs underlying every model here.
- [[Hierarchical Models]] — population distributions over unit-level parameters; partial pooling across cohorts.
- [[Empirical Bayes - Overview]], [[Empirical Bayes Interpretation of Shrinkage]], [[Robbins Formula and Poisson Empirical Bayes]], [[James-Stein Estimator]] — the plug-in prior logic and shrinkage form of all conditional expectations.
- [[Survival Analysis]] — survivor and hazard functions, censoring; latent vs observed churn.
- [[Delayed Feedback Model for Conversion Prediction]], [[Delayed and Censored Feedback - Overview]] — related "not yet vs never" latent-state models.
- [[Monsters and Mixtures]] — continuous mixtures, zero-inflation and hurdle models.
- [[Heterogeneity in Agent Models]] — heterogeneity-driven aggregate dynamics; calibrated trait distributions for consumer agents.
- [[Discrete Choice Models]] — the other individual-level modelling tradition in marketing.
- [[Market Response Models - Overview]], [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]], [[ROAS, mROAS, and Optimal Media Mix]], [[Optimal Marketing Decisions and Forecasting]], [[Markets Data and Sales Drivers]] — aggregate response models and decision layers that can consume CLV as the value metric.
- [[Posterior Predictive Checking]], [[MCMC Basics]], [[Efficient MCMC]], [[Generalized Linear Models]], [[Metalearners for CATE]], [[Partial Pooling as Multiple Comparisons Correction]], [[Product Adoption and Diffusion Models]] — workflow, computation and adjacent methods.

## Sources

- [[raw/Fader Hardie Lee 2005 - Counting Your Customers the Easy Way BG-NBD.pdf]] — Fader, P. S., Hardie, B. G. S. & Lee, K. L. (2005), "'Counting Your Customers' the Easy Way: An Alternative to the Pareto/NBD Model," *Marketing Science* 24(2), 275–284.
- [[raw/Fader Hardie 2005 - A Note on Deriving the Pareto-NBD Model.pdf]] — Fader, P. S. & Hardie, B. G. S. (2005), "A Note on Deriving the Pareto/NBD Model and Related Expressions," brucehardie.com/notes/009. (Derives the results of Schmittlein, Morrison & Colombo 1987, *Management Science* 33(1), 1–24, which is paywalled and not held.)
- [[raw/Fader Hardie Lee 2005 - RFM and CLV Iso-Value Curves.pdf]] — Fader, P. S., Hardie, B. G. S. & Lee, K. L. (2005), "RFM and CLV: Using Iso-Value Curves for Customer Base Analysis," *Journal of Marketing Research* 42(4), 415–430 (author preprint, Feb 2005).
- [[raw/Fader Hardie 2013 - The Gamma-Gamma Model of Monetary Value.pdf]] — Fader, P. S. & Hardie, B. G. S. (2013), "The Gamma-Gamma Model of Monetary Value," brucehardie.com/notes/025.
- [[raw/Fader Hardie 2007 - How to Project Customer Retention.pdf]] — Fader, P. S. & Hardie, B. G. S. (2007), "How to Project Customer Retention," *Journal of Interactive Marketing* 21(1), 76–90 (author preprint, May 2006).
- [[raw/Fader Hardie 2007 - Incorporating Time-Invariant Covariates into the Pareto-NBD and BG-NBD Models.pdf]] — Fader, P. S. & Hardie, B. G. S. (2007), brucehardie.com/notes/019.
- [[raw/Wang Liu Miao 2019 - A Deep Probabilistic Model for Customer Lifetime Value Prediction.pdf]] — Wang, X., Liu, T. & Miao, J. (2019), arXiv:1912.07753.
- Software read for grounding (not stored): PyMC-Marketing `pymc_marketing/clv` source (GitHub main, 2026-09-18); `lifetimes` README.
