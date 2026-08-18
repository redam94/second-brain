---
title: "Index: Case Studies"
tags:
  - type/index
  - source/ingested
parent: "[[Workflow/_Index|Bayesian Workflow]]"
date_updated: 2026-08-18
concept_count: 16
---

# Case Studies

> [!abstract] Routing Summary
> Part 4 (Chapters 16–31) of [[Bayesian Workflow Book - Overview|Gelman, Vehtari & McElreath (2026)]]. Sixteen complete analyses, each recording the model specification, what went wrong, and the transferable lesson. Route by **the problem you are having**, not by the application domain.
> - **Chains won't mix / aliasing** → [[Sampling Problems with Latent Variables - No Vehicles in the Park]], [[Debugging a Model - World Cup Football]]
> - **Multimodal posterior** → [[Challenge of Multimodality - Differential Equation for Planetary Motion]]
> - **Which prior for many coefficients** → [[Models for Regression Coefficients - Student Grades]], [[Prior Specification for Regression Models - Sleep Study]]
> - **Reading Pareto $\hat{k}$ and `p_loo`** → [[LOO Model Checking and Comparison - Roaches]]
> - **Building a model in steps** → [[Coding a Series of Models - Movie Ratings]], [[Incremental Development and Testing - Black Cat Adoptions]], [[Building Up to a Hierarchical Model - Coronavirus Testing]]
> - **Physical/mechanistic modeling beats curve fitting** → [[Model Building and Expansion - Golf Putting]]
> - **Latent variables with real interpretation** → [[Model Building with Latent Variables - Animal Movement]]
> - **Additive decomposition and GP approximation** → [[Model Building - Time-Series Decomposition for Birthdays]]
> - **Verifying a Stan program is correct** → [[Simulation-Based Calibration Checking in Model Development Workflow]]
> - **Graphical posterior predictive checks** → [[Posterior Predictive Checking - Stochastic Learning in Dogs]]
> - **Comparing models predictively** → [[Predictive Model Checking and Comparison - Clinical Trial]]
> - **Using a fit to make a decision** → [[Using a Fitted Model for Decision Analysis - Classification Competition]]

## Concept Map

| Ch. | Case study | Domain | What went wrong | Lesson |
|---|---|---|---|---|
| 16 | [[Coding a Series of Models - Movie Ratings]] | Ratings | — | A model is a sequence, not an artifact |
| 17 | [[Prior Specification for Regression Models - Sleep Study]] | Psychology | Default priors too weak | Priors are part of the model |
| 18 | [[Predictive Model Checking and Comparison - Clinical Trial]] | Medicine | — | Checks drive comparison |
| 19 | [[Building Up to a Hierarchical Model - Coronavirus Testing]] | Epidemiology | Pooling choices misstate uncertainty | Earn the hierarchy incrementally |
| 20 | [[Using a Fitted Model for Decision Analysis - Classification Competition]] | Competition | — | Inference is not the endpoint |
| 21 | [[Posterior Predictive Checking - Stochastic Learning in Dogs]] | Animal learning | Model misses the learning curve | What a graphical check reveals |
| 22 | [[Incremental Development and Testing - Black Cat Adoptions]] | Animal shelter | Bugs hidden by aggregate fit | Test each component as added |
| 23 | [[Debugging a Model - World Cup Football]] | Sport | A real bug in a believed model | Debug the model, not just the code |
| 24 | [[LOO Model Checking and Comparison - Roaches]] | Pest control | High Pareto $\hat{k}$, large `p_loo` | Read CV diagnostics before elpd |
| 25 | [[Model Building and Expansion - Golf Putting]] | Sport | Flexible curve fits worse than geometry | Mechanistic structure beats flexibility |
| 26 | [[Model Building with Latent Variables - Animal Movement]] | Ecology | Latent states weakly identified | Latents need interpretable structure |
| 27 | [[Model Building - Time-Series Decomposition for Birthdays]] | Demography | Double intercept; overshrunk 13th; "ringing" | Centered can beat non-centered; state your failures |
| 28 | [[Models for Regression Coefficients - Student Grades]] | Education | Flat prior: $R^2$ 0.32 vs. LOO-$R^2$ 0.19 | Good priors remove the need for selection |
| 29 | [[Sampling Problems with Latent Variables - No Vehicles in the Park]] | Survey | Three-way additive aliasing | Sum-to-zero constraint; centered beat non-centered |
| 30 | [[Challenge of Multimodality - Differential Equation for Planetary Motion]] | Physics | Approximate aliasing from a cyclical orbit | Pathfinder initialization; minor modes trap chains |
| 31 | [[Simulation-Based Calibration Checking in Model Development Workflow]] | Synthetic | Five separate bugs | SBC as a development subroutine |

## Notes

- [[Coding a Series of Models - Movie Ratings]] — CONTAINS: Figures 16.1–16.5; Ch. 16
- [[Prior Specification for Regression Models - Sleep Study]] — CONTAINS: Figures 17.1–17.12; Ch. 17
- [[Predictive Model Checking and Comparison - Clinical Trial]] — CONTAINS: Figures 18.1–18.12; Ch. 18
- [[Building Up to a Hierarchical Model - Coronavirus Testing]] — CONTAINS: Eq. 19.1–19.3; Figures 19.1–19.5; Ch. 19
- [[Using a Fitted Model for Decision Analysis - Classification Competition]] — CONTAINS: Figures 20.1–20.2; Ch. 20
- [[Posterior Predictive Checking - Stochastic Learning in Dogs]] — CONTAINS: Figures 21.1–21.14; Ch. 21
- [[Incremental Development and Testing - Black Cat Adoptions]] — CONTAINS: Eq. 22.1–22.3; Figures 22.1–22.3; Ch. 22
- [[Debugging a Model - World Cup Football]] — CONTAINS: Figures 23.1–23.6; Ch. 23
- [[LOO Model Checking and Comparison - Roaches]] — CONTAINS: Figures 24.1–24.21; Pareto $\hat{k}$, `p_loo`, moment matching, integrated LOO; Ch. 24
- [[Model Building and Expansion - Golf Putting]] — CONTAINS: Figures 25.1–25.10; the geometric model; Ch. 25
- [[Model Building with Latent Variables - Animal Movement]] — CONTAINS: Eq. 26.1–26.3; Figures 26.1–26.10; Ch. 26
- [[Model Building - Time-Series Decomposition for Birthdays]] — CONTAINS: Eq. 27.1–27.3; Figures 27.1–27.16; Hilbert-space GP, four-rung approximate ladder, regularized horseshoe; Ch. 27
- [[Models for Regression Coefficients - Student Grades]] — CONTAINS: Figures 28.1–28.14; piranha principle, R2D2, `projpred`; Ch. 28
- [[Sampling Problems with Latent Variables - No Vehicles in the Park]] — CONTAINS: Figures 29.1–29.5; `sum_to_zero_vector`, centered vs. non-centered, full Stan programs; Ch. 29
- [[Challenge of Multimodality - Differential Equation for Planetary Motion]] — CONTAINS: Figures 30.1–30.5; Hamilton's equations, approximate aliasing, Pathfinder; Ch. 30
- [[Simulation-Based Calibration Checking in Model Development Workflow]] — CONTAINS: Figures 31.1–31.11; five bugs, the Fano-factor filter, coverage plots; Ch. 31

## Sources
- [[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]] — Chapters 16–31, pp. 263–482

## See Also
- [[Bayesian Workflow Book - Overview]] — the book's routing index
- [[Computational Workflow/_Index|Computational Workflow]] — the theory the computational case studies exercise
- [[Evaluating and Comparing/_Index|Evaluating and Comparing]] — the theory the checking case studies exercise
- [[Building Models/_Index|Building Models]] — the theory the prior-specification case studies exercise
