---
title: "Friedman 2000 - Being Bayesian about Network Structure - Overview"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/overview
  - doc/paper
source: "[[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]]"
source_location: "Whole paper, UAI 2000 pp. 201-210 (arXiv:1301.3856)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Friedman 2000 - Being Bayesian about Network Structure"
doc_type: paper
depends_on:
  - "[[Friedman 2000 - Bayesian Structure Learning Framework]]"
used_by:
  - "[[Friedman 2000 - Being Bayesian about Network Structure/_Index|Friedman 2000 - Being Bayesian about Network Structure]]"
aliases:
  - "Friedman Koller 2000"
  - "order MCMC overview"
---

# Friedman 2000 - Being Bayesian about Network Structure - Overview

> [!summary]
> Friedman and Koller (UAI 2000; the journal version is *Machine Learning* 2003) compute the Bayesian posterior probability of structural features of a Bayesian network (edges, Markov blankets) by (i) a closed-form sum over *all* DAGs with at most $k$ parents consistent with a fixed node ordering, and (ii) MCMC over orderings rather than over structures. Ordering space is much smaller and smoother, so chains mix faster and give more reliable posteriors than structure-MCMC, and better true-feature recovery than the non-Bayesian bootstrap. Note: the arXiv/UAI 2000 conference paper was used because the journal version has no stable free PDF.

## Overview
**Question.** With modest data relative to model size (e.g. gene-expression: thousands of variables, hundreds of experiments), many DAGs have non-negligible posterior, so MAP model selection is arbitrary. We need $P(f\mid D)=\sum_GP(G\mid D)f(G)$ for features $f$ (eq. 1).

**Contributions.** Closed form for a fixed ordering (eq. 6, Prop. 3.1-3.2); order-MCMC with flip and cut-the-deck proposals; computational tricks; experiments (UCI Flare/Vote, 37-node Alarm).

### Motivating PyMC examples
<https://redam94.github.io/pymc-challenges/examples.html>: **E20** - Learning a directed graph: Bayesian causal discovery (Sachs et al. 2005; "fixed-order horseshoe DAGs, exact BGe + dynamic-programming averaging over all orders", NOTEARS as `pm.Potential`, Markov equivalence through LOO and `pm.do`). Friedman-Koller supplies the order-based averaging idea; the Gaussian BGe score and Sachs data are covered in [[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]].

### Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note |
| 2.1-2.2 Bayesian learning, priors, Theorem 2.1, model averaging | [[Friedman 2000 - Bayesian Structure Learning Framework]] |
| 3.1 Marginal likelihood for known ordering (eq. 5-6) | [[Friedman 2000 - Closed Form for a Known Ordering]] |
| 3.2 Probabilities of features (Prop. 3.1, 3.2, eq. 7-8) | [[Friedman 2000 - Closed Form for a Known Ordering]] |
| 4.1 MCMC over orderings | [[Friedman 2000 - MCMC over Orderings and Computational Tricks]] |
| 4.2 Computational tricks | [[Friedman 2000 - MCMC over Orderings and Computational Tricks]] |
| 5 Experimental results, Figs. 1-7 | [[Friedman 2000 - Experiments Mixing and Feature Recovery]] |
| 6 Discussion and future work | [[Friedman 2000 - Experiments Mixing and Feature Recovery]] |

## Examples
Code: [[Friedman 2000 - Closed Form for a Known Ordering]].

## Connections
- Relevance to marketing measurement: Bayesian structure uncertainty is the honest alternative to a single DAG when drawing causal graphs of marketing variables (spend, awareness, search, sales); posterior edge probabilities show which links the data can support. Analogy only; the paper itself is not about marketing.
- Existing vault: [[Causal Discovery - Overview]], [[PC Algorithm and Constraint-Based Discovery]], [[GES and Score-Based Discovery]], [[NOTEARS - Overview]], [[Markov and Faithfulness Assumptions]], [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] (frequentist stability alternative).

## See Also
[[Friedman 2000 - Being Bayesian about Network Structure/_Index|Friedman 2000 - Being Bayesian about Network Structure]]
