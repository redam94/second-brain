---
title: "Bayesian Workflow Book - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/overview
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Whole book, 550 pp."
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow"
doc_type: textbook
depends_on:
  - "[[Bayesian Workflow - Overview]]"
used_by:
  - "[[From Inference to Data Analysis to Workflow]]"
aliases:
  - Bayesian Workflow (book)
  - Gelman Vehtari McElreath 2026
  - BW book
---

# Bayesian Workflow (Gelman, Vehtari & McElreath, 2026) — Overview

> [!summary]
> The full-length textbook expansion of the 2020 arXiv paper [[Bayesian Workflow - Overview|*Bayesian Workflow*]]. 31 chapters plus two appendices, in five parts: foundations, building models, evaluating and comparing, computation, and sixteen worked case studies. This vault holds **79 notes** covering all parts in depth — every prior-choice rule, diagnostic threshold, failure mode, and Stan snippet from Parts 1–3, plus one note per case study recording the model specification, what went wrong, and the lesson.

## Overview

The book's thesis is that **Bayesian inference is only one step in Bayesian data analysis, and Bayesian data analysis is only one step in a workflow** that includes model building, computation, checking, expansion, comparison, and decision. Most of what practitioners actually do is not covered by inference theory, and the book's project is to make that tacit knowledge explicit.

The single most important routing artifact is the master workflow diagram, **Figure 2.1**, transcribed as a mermaid graph in [[From Inference to Data Analysis to Workflow]]. Read that first if you want to know where any particular technique sits.

## Routing Table

> [!abstract] Where to go for what
> | If you need… | Go to |
> |---|---|
> | The master workflow diagram | [[From Inference to Data Analysis to Workflow]] |
> | Why Bayes, and when it isn't worth it | [[Why Bayes - Benefits, Costs, and Borders]] |
> | The taxonomy organizing the whole book | [[Four Modeling Scenarios]] |
> | One problem carried end to end | [[Multiple-Choice Exam - A Full Workflow Walkthrough]] |
> | Where to start: the first model to write down | [[Choosing an Initial Model]], [[Generative and Partially Generative Models]] |
> | How to pick and specify a prior | [[Prior Distributions]], [[Constructing Priors for Effect Sizes]], [[Joint Priors and Covariance Matrices]] |
> | Checking a model before seeing data | [[Prior Predictive Checking]] |
> | Testing a model and its code on fake data | [[Designing Simulated-Data Experiments]] |
> | Checking a model after fitting | [[Posterior Predictive Checking]], [[Cross Validation Checking]] |
> | Choosing between models | [[Model Selection Using Predictive Performance]], [[Stacking and Predictive Model Averaging]] |
> | Chains that won't mix | [[What to Do About Convergence Problems]], [[Failure Modes and Steps Forward]] |
> | Validating that your Stan program is correct | [[SBC in the Workflow]], [[Simulation-Based Calibration Checking in Model Development Workflow]] |
> | Keeping the modeling loop fast | [[Fit Fast, Fail Fast]] |
> | A fast approximation to fit-and-fail-fast | [[Variational Inference and Pathfinder]], [[Approximate Algorithms and Approximate Models]] |
> | Causal effects and generalization | [[Causal Inference as Generalization]], [[Poststratification]] |
> | What a fitted model does and does not tell you scientifically | [[Statistical and Scientific Inference]] |
> | A non-Bayesian translation of everything above | [[Statistical and Computational Workflow for Bayesians and Non-Bayesians]] |
> | What to read in BDA3 and what to skip | [[How to Get the Most Out of Bayesian Data Analysis]] |

## Structure

| Part | Chapters | Folder | Notes |
|---|---|---|---|
| **Part 1 — Foundations** | 1–4 | [[Foundations/_Index\|Foundations]] | 8 |
| **Part 2 — Building models** | 5–7 | [[Building Models/_Index\|Building Models]] | 19 |
| **Part 3a — Evaluating and comparing** | 8–10 | [[Evaluating and Comparing/_Index\|Evaluating and Comparing]] | 16 |
| **Part 3b — Computation** | 11–13, 15 | [[Computational Workflow/_Index\|Computational Workflow]] | 16 |
| **Part 3c — SBC** | 14 | [[Simulation-Based Calibration/_Index\|Simulation-Based Calibration]] | 1 |
| **Part 4 — Case studies** | 16–31 | [[Case Studies/_Index\|Case Studies]] | 16 |
| **Appendices** | A–B | [[Appendices/_Index\|Appendices]] | 2 |
| *This overview* | — | (folder root) | 1 |
| **Total** | | | **79** |

## The Sixteen Case Studies

Each case study note records the model specification, what went wrong, and the transferable lesson.

| Ch. | Case study | Central lesson |
|---|---|---|
| 16 | [[Coding a Series of Models - Movie Ratings]] | Build a model as a sequence, not a single artifact |
| 17 | [[Prior Specification for Regression Models - Sleep Study]] | Priors as part of the model, not a formality |
| 18 | [[Predictive Model Checking and Comparison - Clinical Trial]] | Predictive checks drive comparison |
| 19 | [[Building Up to a Hierarchical Model - Coronavirus Testing]] | Hierarchy earned incrementally |
| 20 | [[Using a Fitted Model for Decision Analysis - Classification Competition]] | Inference is not the endpoint |
| 21 | [[Posterior Predictive Checking - Stochastic Learning in Dogs]] | What a graphical check actually reveals |
| 22 | [[Incremental Development and Testing - Black Cat Adoptions]] | Test each component as you add it |
| 23 | [[Debugging a Model - World Cup Football]] | Finding a bug in a model you believe |
| 24 | [[LOO Model Checking and Comparison - Roaches]] | Pareto $\hat{k}$, `p_loo`, and what they mean |
| 25 | [[Model Building and Expansion - Golf Putting]] | Physical reasoning beats flexible curves |
| 26 | [[Model Building with Latent Variables - Animal Movement]] | Latent structure with real interpretation |
| 27 | [[Model Building - Time-Series Decomposition for Birthdays]] | Additive decomposition, GP approximation, and two honest failures |
| 28 | [[Models for Regression Coefficients - Student Grades]] | With a good prior, you don't need variable selection |
| 29 | [[Sampling Problems with Latent Variables - No Vehicles in the Park]] | Non-centered is not always right |
| 30 | [[Challenge of Multimodality - Differential Equation for Planetary Motion]] | Multimodality reparameterization cannot fix |
| 31 | [[Simulation-Based Calibration Checking in Model Development Workflow]] | SBC as a debugging subroutine |

## Relation to the 2020 Paper

The seven notes derived from the 2020 arXiv paper remain in this folder, each carrying an `expanded_by` frontmatter field and a callout pointing to the book's expanded treatment:

- [[Bayesian Workflow - Overview]] → [[From Inference to Data Analysis to Workflow]]
- [[Choosing and Building Models]] → [[Building Models/_Index|Building Models]]
- [[Evaluating Fitted Models]] → [[Evaluating and Comparing/_Index|Evaluating and Comparing]]
- [[Computational Troubleshooting]] → [[Failure Modes and Steps Forward]]
- [[Fitting and Validating Computation]] → [[Computational Workflow/_Index|Computational Workflow]]
- [[Iterative Model Improvement]] → [[Model Expansion - Predictive Consistency and Coherence]]
- [[Modeling as Software Development]] → [[Statistical Modeling as Software Development]]

The six notes from Talts et al. (2018) on SBC are **complementary rather than superseded**: they carry the theory (the data-averaged posterior identity, the uniformity theorem, histogram interpretation), while [[SBC in the Workflow]] and [[Simulation-Based Calibration Checking in Model Development Workflow]] carry the book's practical integration.

## See Also
- [[Bayesian Workflow - Overview]] — the 2020 paper this book expands
- [[Simulation-Based Calibration - Overview]] — the Talts et al. theory notes
- [[_Index]] — the folder index
