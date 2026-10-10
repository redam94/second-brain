# Source Record: Colombo & Maathuis (2014) — PC-stable

**Note:** PDF download was attempted but blocked by network egress policy (arxiv.org is not accessible from this session). This file records the source metadata.

## Citation

Diego Colombo and Marloes H. Maathuis (2014). **"Order-Independent Constraint-Based Causal Structure Learning."**
*Journal of Machine Learning Research* 15(116):3921–3962.

## Free access

- JMLR page: https://jmlr.org/papers/v15/colombo14a.html
- arXiv preprint: https://arxiv.org/abs/1211.3295

## Abstract (summary)

Shows that the PC algorithm (Spirtes & Glymour 1991) and algorithms building on its first step
(FCI, RFCI, CCD) give order-dependent outputs: the skeleton, v-structures, and final CPDAG
can differ depending on the ordering of variables in the input. Proposes order-independent
versions (PC-stable, FCI-stable, RFCI-stable) by saving adjacencies before removing edges in
the skeleton phase. Demonstrates equivalent performance in low dimensions and improved performance
in high-dimensional settings. Software: R package pcalg.

## Key results

- Original PC algorithm is order-dependent in the skeleton phase
- PC-stable: saves adjacencies at each adjacency level before updating, making skeleton order-independent
- When the data are faithful to the underlying DAG and the CI oracle is correct, PC and PC-stable both
  recover the correct CPDAG
- Also covers FCI (for settings with latent confounders) and RFCI (computationally efficient FCI variant)

## Primary source for PC algorithm

The original PC algorithm was introduced in:
  Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd ed. MIT Press.
  (Chapter 5 for the PC algorithm proper)
