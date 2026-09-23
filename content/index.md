---
title: "Second Brain"
tags:
  - type/index
  - type/vault-root
---

# Second Brain

> [!abstract] About
> A structured knowledge base covering Bayesian statistics, econometrics, causal inference, and agent-based modeling. Notes are cross-linked by topic — use the graph view or search bar to explore connections across the collection.

> [!info] For AI assistants
> Reading this site with a language model? Start at [llms.txt](https://redam94.github.io/second-brain/llms.txt) — a routed index of every note. Any page is also available as raw markdown by appending `.md` to its URL.

<a href="./static/graph3d/" data-router-ignore>
  Explore the 3D knowledge graph →
</a>

---

## Selected Analyses

### [[Q - Partial Pooling Across Statistics and ML and When It Hurts|Partial pooling shows up as hierarchical models, James–Stein / empirical Bayes shrinkage, global-local shrinkage priors, the Gamma-Gamma and NBD customer models, global forecasting models and LLM pretraining. What is the shared mechanism, and when does pooling hurt?]]
*September 18, 2026 · Bayesian Statistics · Hierarchical Models · Machine Learning · Customer Lifetime Value · Forecasting*

The shared mechanism has three parts: (1) many parallel units are treated as draws from one population distribution; (2) that distribution is **learned from the pooled (marginal) data** rather than assumed; (3) each unit's estimate is a compromise between its own data and the population, with the weight set by relative precision.

---

### [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions|How does advertising carryover (adstock) violate the assumptions of switchback experiments, always-valid sequential tests and geo tests, and what design changes fix it?]]
*September 18, 2026 · Online Experimentation · Market Response · Causal Inference · Time Series · Research Methodology*

Adstock is **interference across time**: today's outcome depends on the whole past assignment path.

---

### [[Q - Variational Bounds Compared from the ELBO to EIG Estimators|How do the ELBO, the Barber–Agakov posterior bound and the marginal / VNMC bounds on expected information gain, the contrastive PCE and ACE bounds, neural ratio estimation and the forward-KL objective of neural posterior estimation relate? Which direction of KL does each use, is each an upper or lower bound, and what failure does that choice cause?]]
*September 18, 2026 · Variational Inference · Bayesian Experimental Design · Likelihood Free Inference · Bayesian Statistics*

Every one of these objectives is the same identity, **intractable quantity = computable surrogate ± an expected KL**, obtained by replacing an intractable density with a learned .

---

### [[Q - Exchangeability and What Replaces It When It Fails|Exchangeability underlies permutation/randomization tests, conformal prediction and hierarchical priors. Which vault methods break when it fails (time series, covariate shift, interference, clustering), and what replaces it in each case?]]
*September 18, 2026 · Causal Inference · Conformal Prediction · Econometrics · Bayesian Statistics · Online Experimentation*

Exchangeability is a **symmetry**: the joint law is unchanged by permuting indices, so the rank of any one item among the rest is uniform.

---

### [[Q - Choosing a Simulation-Based Inference Method for ABM Calibration|For calibrating an agent-based model, how do I choose among SMM, indirect inference, EMM, synthetic likelihood, ABC, history matching, genetic-algorithm calibration and neural posterior / likelihood / ratio estimation?]]
*September 18, 2026 · Agent Based Modeling · Likelihood Free Inference · Simulation Estimation · Calibration · Bayesian Statistics*

The eleven methods differ on only three design choices: **what is compared** (hand-picked moments, an auxiliary model's parameters, or learned summaries), **how the comparison is scored** (a quadratic distance to minimise, a threshold to pass, a Gaussian or neural density to evaluate) and **whether the simulator is called inside the search loop or once up front**.

---


## Knowledge Base

| Domain | Core Topics |
|--------|-------------|
| [[Research/Bayesian Statistics/_Index\|Bayesian Statistics]] | Inference fundamentals, hierarchical models, MCMC, model checking |
| [[Research/Econometrics/_Index\|Econometrics]] | Identification strategies, regression foundations, simulation-based estimation |
| [[Research/Agent-Based Modeling/_Index\|Agent-Based Modeling]] | Calibration methods, social dynamics, consumer behavior |
| [[Research/Research Methodology/_Index\|Research Methodology]] | Experimental design, multiple comparisons, causal reasoning |

Browse the full collection via the **search bar** or explore topic connections in the **graph view**.
