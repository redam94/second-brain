---
title: "Second Brain"
tags:
  - type/index
  - type/vault-root
---

# Second Brain

A public notebook where I work through ideas in statistics, econometrics, causal inference, and agent-based modeling. Think of it as a thinking-out-loud space — research notes, answered questions, and the occasional deep dive.

The [[Questions-and-Answers/_Index|Q&A section]] is the most blog-like part: specific questions I've been working through, written up with the reasoning made explicit and cross-linked to the underlying research notes.

---

## Recent Q&A

### [[Q - Using SMM to Calibrate Agent Based Models|How can SMM be used to calibrate agent based models?]]
*April 11, 2026 · Agent Based Modeling · Calibration · Simulation Estimation · Econometrics*

The Simulated Method of Moments (SMM) calibrates an ABM by choosing structural parameters  to minimize a weighted distance between observed macro-level data moments and their simulated counterparts produced by running the ABM at .

---

### [[Q - Uncovering Causal Estimates from Non-Experimental Data|What are some ways to uncover causal estimates from non-experimental data?]]
*April 10, 2026 · Causal Inference · Econometrics · Identification · Observational Studies*

When randomization is impossible, causal estimates can be recovered through several "quasi-experimental" strategies, each exploiting a different source of exogenous variation or structural assumption.

---

### [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models|How should I handle multiple comparisons when selecting from hundreds of models?]]
*April 9, 2026 · Multiple Comparisons · Research Methodology · Bayesian Statistics · Model Comparison*

Running hundreds of models and selecting variables or transformations based on statistical significance is a textbook instance of the [[Garden of Forking Paths]] problem -- the p-values from selected models are invalid because the selection procedure is data-contingent.

---

### [[Q - Common Pitfalls in Statistical Modeling|What are some common pitfalls in statistical modeling a data scientist should be aware of?]]
*April 9, 2026 · Research Methodology · Bayesian Statistics · Causal Inference · Model Comparison · Statistical Modeling*

The vault identifies eight major pitfall categories: (1) confusing correlation with causation via confounds and selection bias, (2) the garden of forking paths and multiple comparisons, (3) overfitting vs.

---

### [[Q - Differences Between Frequentist and Bayesian Statistics|What are some differences between frequentist and Bayesian statistics?]]
*April 9, 2026 · Bayesian Statistics · Frequentist · Probability · Research Methodology*

The core divide is philosophical: frequentists treat probability as long-run frequency and parameters as fixed unknowns to be estimated, while Bayesians treat probability as a degree of belief and parameters as random variables with distributions.

---


## Research Notes

The [[Research/_Index|Research]] section holds the underlying material — textbook summaries, method overviews, and topic explorations:

- **Bayesian Statistics** — [[BDA3 - Overview|BDA3]], [[Bayesian Workflow - Overview|Workflow]], [[Hierarchical Models]], [[MCMC Basics|MCMC]]
- **Causal Inference** — [[MHE - Overview|Mostly Harmless Econometrics]], [[Instrumental Variables]], [[Regression Discontinuity]]
- **Agent-Based Modeling** — [[Consumer Behavior ABM - Overview|Consumer Behavior]], [[Word-of-Mouth Dynamics]]

Use the **search bar** or **graph view** to explore connections between notes.
