---
title: "Bayesian Workflow - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/overview
  - doc/textbook
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Workflow"
aliases:
  - "Bayesian Workflow"
  - "Gelman et al. 2020"
doc_type: overview
source_location: "Bayesian Workflow paper"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[MCMC Basics]]"
  - "[[Hierarchical Models]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Posterior Sampling and Summarization]]"
  - "[[Model Checking]]"
  - "[[BDA3 - Overview]]"
  - "[[Statistical Rethinking - Overview]]"
  - "[[Bayesian Linear Regression]]"
expanded_by:
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[Why Bayes - Benefits, Costs, and Borders]]"
  - "[[Four Modeling Scenarios]]"
  - "[[Multiple-Choice Exam - A Full Workflow Walkthrough]]"
---

> [!info] Superseded by the 2026 textbook
> This note summarizes the 2020 arXiv paper *Bayesian Workflow* (Gelman, Vehtari, Simpson, Margossian, Carpenter, Yao, Kennedy, Gabry, Bürkner & Modrák). That paper has since been expanded into the full-length textbook [[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf|Gelman, Vehtari & McElreath (2026), *Bayesian Workflow*]], ingested into this vault as 79 notes across [[Foundations/_Index|Foundations]], [[Research/Bayesian Statistics/Workflow/Building Models/_Index|Building Models]], [[Research/Bayesian Statistics/Workflow/Evaluating and Comparing/_Index|Evaluating and Comparing]], [[Research/Bayesian Statistics/Workflow/Computational Workflow/_Index|Computational Workflow]], [[Research/Bayesian Statistics/Workflow/Case Studies/_Index|Case Studies]], and [[Research/Bayesian Statistics/Workflow/Appendices/_Index|Appendices]].
>
> **Start with the book notes for the expanded treatment:**
> - [[From Inference to Data Analysis to Workflow]] — the master workflow diagram (Figure 2.1), transcribed as mermaid
> - [[Why Bayes - Benefits, Costs, and Borders]] — the book's own accounting of when Bayes pays off
> - [[Four Modeling Scenarios]] — the taxonomy that organizes the whole book
> - [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — one problem carried end to end
> - [[Bayesian Workflow Book - Overview]] — the routing index for all 79 notes
>
> This note is kept because its compact framing of the 2020 paper remains a useful summary.


> [!summary]
> Bayesian workflow extends far beyond Bayesian inference ($p(\theta|y) \propto p(\theta)p(y|\theta)$). It encompasses the full iterative cycle of model building, fitting, checking, and revision that characterizes real applied Bayesian data analysis. This paper by Gelman, Vehtari, Simpson, Margossian, Carpenter, Yao, Kennedy, Gabry, Burkner, and Modrak (2020) codifies the tacit knowledge practitioners need.

## Workflow vs. Inference

**Bayesian inference** is the computation of conditional probabilities or posterior densities. **Bayesian workflow** includes the three steps of model building, inference, and model checking/improvement, along with the comparison of different models -- not just for model choice but to better understand each model's behavior.

The authors emphasize that in practice we fit *many* models for any given problem, and even poor models serve as unavoidable steps along the way toward fitting useful ones.

## Why a Workflow Is Needed

1. **Computation is hard** -- we must work through various steps including simpler models and approximate computation to reach trustworthy inferences.
2. **We rarely know the final model ahead of time** -- models expand as we gather data and ask more detailed questions.
3. **Data are often not fixed** -- new data require model extensions and re-evaluation.
4. **Understanding requires comparison** -- models are best understood by comparing inferences across a series of related models.

## The Iterative Cycle

The workflow follows a non-linear path (see Figure 1 of the paper):

1. **Pick an initial model** ([[Choosing and Building Models]])
2. **Prior predictive check** to validate priors against domain knowledge
3. **Fit the model** ([[Fitting and Validating Computation]])
4. **Validate computation** -- convergence diagnostics, fake-data simulation, SBC
5. **Address computational issues** if needed ([[Computational Troubleshooting]])
6. **Evaluate and use the model** ([[Evaluating Fitted Models]])
7. **Modify the model** ([[Iterative Model Improvement]])
8. **Compare models** across the topology of fitted models

## Connection to Statistical Methodology

The paper frames methodology development as a progression: Example -> Case study -> Workflow -> Method -> Theory. Workflows are more general than examples but less precisely specified than formal methods, filling an important gap in the literature.

## Related Notes

- [[Choosing and Building Models]]
- [[Fitting and Validating Computation]]
- [[Computational Troubleshooting]]
- [[Evaluating Fitted Models]]
- [[Iterative Model Improvement]]
- [[Modeling as Software Development]]
- [[Model Checking]] | [[Model Comparison]] | [[MCMC Basics]]
- [[Simulation-Based Calibration - Overview]] — the concrete computational validation tool for step 4 of the workflow

## See Also (Cross-Domain)

- [[BDA3 - Overview]] — the textbook that provides the theoretical foundation for this workflow
- [[Forking Paths and Bayesian Approaches]] — workflow as a defense against multiple comparisons problems
- [[The Experimental Ideal]] — how Bayesian workflow complements careful experimental design
- [[Regression and the CEF]] — workflow applies equally to Bayesian regression for causal inference
- [[Overfitting and Information Criteria]] — WAIC and LOO-CV are the quantitative tools for the model comparison step in the workflow
- [[ABM Calibration Overview]] — ABM calibration/validation follows an analogous iterative cycle (simulate → calibrate → validate → improve), with history matching and ABC playing roles parallel to prior predictive checking and model assessment
