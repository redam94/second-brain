---
title: "Friedman 2000 - Experiments Mixing and Feature Recovery"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]]"
source_location: "Sec. 5-6, pp. 206-210, Figs. 1-7"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Friedman 2000 - Being Bayesian about Network Structure"
doc_type: paper
depends_on:
  - "[[Friedman 2000 - MCMC over Orderings and Computational Tricks]]"
used_by:
aliases:
  - "order MCMC experiments"
  - "Alarm network structure MCMC"
---

# Friedman 2000 - Experiments Mixing and Feature Recovery

> [!summary]
> (1) Exact posteriors by summing over orderings vs equivalence classes (PDAGs) correlate well on 5-variable UCI subsets, so the induced prior does not dominate. (2) Order-MCMC with 5-50 samples closely reproduces exact posteriors on the 9-variable Flare data. (3) On Alarm (37 nodes), structure-MCMC runs get stuck in different regions and give radically different feature posteriors; order-MCMC runs agree. (4) Order-MCMC dominates bootstrap and structure-MCMC in false-positive/false-negative trade-off curves.

## Overview
No numerical tables are printed; the results are figures. Settings below are as stated in the text.

## Main Content

- **Prior effect (Fig. 1).** Vote and Flare (UCI), 5 variables each, datasets of 50 and 200 cases. Exhaustive ordering enumeration feasible up to 10 variables; exhaustive structure enumeration only 5-6. Posteriors over Markov features from orderings (x) vs PDAGs (y): slightly different but well correlated.
- **Accuracy (Fig. 2).** Flare, 9 variables, 100 samples: burn-in 1,000 steps, sample every 100 steps, collecting 5, 20, 50 orderings. Markov features: even 5 orderings give a decent estimate (each ordering carries information about exponentially many structures); edges need more samples since edges against the ordering have probability 0; 20-50 samples give very close agreement.
- **Mixing on Alarm (Figs. 3-5).** Synthetic data from the 37-node Alarm network (100, 500, 1000 instances). Structure-MCMC: burn-in 100,000, sample every 25,000; order-MCMC: burn-in 10,000, sample every 2,500; 50 samples per run; runs seeded from greedy hill-climbing or from empty network / random ordering. At 100 instances both mix (structure after about 20-30k iterations, order after 1-2k); at 500 instances order runs plateau within 10k iterations while structure runs stay in different regions for 500k iterations; at 1000 instances structure runs seeded from empty never reach the greedy-seeded score, differences of 100-500 bits (at least $2^{100}$ in probability). Fig. 4: Markov-feature posteriors from different structure runs disagree radically for some features (near 1 vs near 0); Fig. 5: order runs are tightly correlated. A structure step is about an order of magnitude faster, but runs were budgeted for equal time, and order-MCMC still mixed faster.
- **Why.** The ordering score aggregates many structures so single-graph score differences cancel; most orderings admit some consistent decent structure; with more data the landscape sharpens, especially over structures.
- **Fig. 6.** Where both mix, structure-MCMC posteriors are usually larger than order-MCMC ones.
- **Feature recovery (Fig. 7).** Label Markov features of the generating Alarm network as positive; vary threshold $t$; compare false positives/negatives against the non-parametric bootstrap of Friedman, Goldszmidt & Wyner. Path features sampled with 10 networks per ordering. Order-MCMC dominates except Path features with 100 instances; for $t>0.4$ it makes no false-positive Markov errors at 1000 instances.

### Discussion (Sec. 6)
Extensions: missing data (add MCMC over missing values), full Bayesian averaging for prediction; planned application to gene-expression structure learning.

## Examples
Reading a feature-posterior scatter: points near the diagonal indicate agreement between runs; off-diagonal clusters (near (0,1)) signal non-convergence. In practice run at least two seeds and compare edge posteriors (a convergence diagnostic for structure learning).

## Connections
[[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]] (continuous-data version used for Sachs in E20); [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] (stability as alternative confidence measure).

## See Also
[[Friedman 2000 - Being Bayesian about Network Structure - Overview]]
