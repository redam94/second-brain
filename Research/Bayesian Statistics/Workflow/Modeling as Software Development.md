---
title: "Modeling as Software Development"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-06-15
folder: "Bayesian Statistics/Workflow"
aliases:
  - "Bayesian software engineering"
  - "Statistical reproducibility"
doc_type: concept
source_location: "Bayesian Workflow paper"
depends_on:
  - "[[Bayesian Workflow - Overview]]"
  - "[[Fitting and Validating Computation]]"
  - "[[Choosing and Building Models]]"
  - "[[Evaluating Fitted Models]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Iterative Model Improvement]]"
---

# Modeling as Software Development

> [!summary]
> Section 9 of Gelman et al. (2020) argues that developing a statistical model in a probabilistic programming language is a form of software development, and practitioners should adopt software engineering best practices: version control, testing, reproducibility, and readable/maintainable code. These practices complement and reinforce the statistical workflow.

## Version Control (Section 9.1)

Version control (e.g., Git) should be the **first piece of infrastructure** for any modeling project. Benefits include:

- Revert to a previously working version with a single command
- Compare differences between model iterations
- Keep clearly different models in different files for easy comparison
- Track notes on findings and decisions in the iterative process
- Package "release candidate" versions of models and data for milestone reports

Version control applies not just to code but also to **reports, graphs, and data**. For models used in policy decisions, a public repository increases transparency about what model, data, and inference parameters produced specific results (e.g., the Imperial College COVID-19 repository).

## Testing as You Go (Section 9.2)

Software design proceeds **top-down** (from goals to implementation); development proceeds **bottom-up** (from well-tested foundational functions to larger modules). For Bayesian modeling, testing includes:

- **Unit tests** of low-level functions (e.g., the standardization function $z(v) = (v - \text{mean}(v))/\text{sd}(v)$ -- is sd computed with $n$ or $n-1$?)
- **Simulation-based calibration** as a model-level test ([[Fitting and Validating Computation]])
- **Posterior predictive checks** as integration tests ([[Evaluating Fitted Models]])

> [!tip] Modularity Is Key
> Big tangled functions are hard to document, hard to read, hard to debug, and nearly impossible to maintain. Encapsulate repeated code into small, well-tested functions. This mirrors the modular model construction described in [[Choosing and Building Models]].

Input-output checks in functions help catch errors early rather than letting them percolate into mysterious downstream failures.

## Making It Reproducible (Section 9.3)

The goal is **essential reproducibility**: another person on another machine could recreate the analysis and produce equivalent results. Practical steps:

- Write self-contained **scripts** (R, Python, shell) that do not depend on global state
- Scripts serve as concrete documentation of what is being run
- For complex projects, a series of well-constructed scripts can be more practical than a single large notebook
- For **bit-level reproducibility**, pin all software versions and consider Docker containers, though this is nearly impossible to maintain over time

## Making It Readable and Maintainable (Section 9.4)

Stan was designed to be **self-documenting** through meaningful variable names, types (e.g., `real<lower = 0> oxygen_level;` instead of `real x17;`), and declarative syntax (e.g., `normal_lpdf(y | mu, sigma)` instead of manual log-probability arithmetic).

Principles for readable modeling code:

- **Consistency** in naming and layout across files
- **Avoid repetition** -- pull shared code into reusable functions
- Write readable code rather than code with comments explaining opaque logic
- Document **user-facing functions** at the API level (argument types, return types, behavior)
- Keep functions at manageable size; replace long expressions with well-named functions

When fitting a series of similar models, keep model code modular so that fixing an error in a shared module automatically propagates to all models that use it.

## See Also

- [[Bayesian Workflow - Overview]] — the full workflow that software engineering practices support
- [[Iterative Model Improvement]] — the iterative cycle that version control and testing enable
- [[Fitting and Validating Computation]] — simulation-based calibration as a model-level unit test
- [[Choosing and Building Models]] — modular model construction that maps to the modularity principles here
- [[Evaluating Fitted Models]] — posterior predictive checks as integration tests
- [[Garden of Forking Paths]] — version control and pre-registration are the practical defenses against forking paths
