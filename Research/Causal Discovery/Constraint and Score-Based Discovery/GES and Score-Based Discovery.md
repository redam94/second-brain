---
title: GES and Score-Based Discovery
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Glymour Zhang Spirtes 2019 - Review of Causal Discovery Methods.pdf]]"
source_location: "Sec. 3.3 (Greedy Equivalence Search), p. 5; Table 1"
date_ingested: 2026-06-28
folder: "Causal Discovery/Constraint and Score-Based Discovery"
doc_type: paper
depends_on:
  - "[[Markov and Faithfulness Assumptions]]"
  - "[[Causal Discovery - Overview]]"
used_by:
  - "[[PC Algorithm and Constraint-Based Discovery]]"
aliases:
  - GES
  - Greedy Equivalence Search
  - Score-Based Causal Discovery
  - GFCI
  - BIC score
---

# GES and Score-Based Discovery

> [!summary]
> **Score-based** discovery searches the space of causal structures to **optimize a model-fit score** (e.g., BIC) rather than testing conditional independencies one at a time. **Greedy Equivalence Search (GES)** (Chickering, 2003) is a two-phase greedy procedure that searches **directly over Markov equivalence classes**: a **forward phase** greedily **adds** edges to improve the score, then a **backward phase** greedily **removes** edges. Output is a **CPDAG**. In the large-sample limit GES converges to the **same MEC** as [[PC Algorithm and Constraint-Based Discovery|PC]].

## Overview

Where constraint-based methods grow from CI tests, score-based methods define a global **score** measuring how well each candidate structure fits the data (penalized for complexity), then search structure space to maximize it. The key efficiency idea in GES is to move not among individual DAGs but among **equivalence classes** (CPDAGs), so that statistically indistinguishable DAGs are never separately explored. GES assumes **no unknown confounders** and typically a parametric family (linear-Gaussian or multinomial) for the score.

## Main Content

> [!definition] Score function
> A score $\text{Score}(\mathcal{G}, D)$ rates how well structure $\mathcal{G}$ explains data $D$, trading fit against complexity. The paper highlights **BIC**:
> $$ \text{BIC} = -2\,\log \hat{L} + k \log n, $$
> where $\hat L$ is the maximized likelihood, $k$ the number of free parameters, and $n$ the sample size; lower BIC is better. Other quasi-Bayesian scores or the $Z$-score of a hypothesis test can be used. The BIC penalty has an **adjustable** coefficient forcing sparsity, and there is no consensus on its setting in finite samples. ^score-function

> [!theorem] GES — two-phase greedy search
> 1. **Start** from the empty graph (no edges).
> 2. **Forward phase (FES).** Repeatedly consider adding a single directed edge; choose the addition that most **improves** the score (e.g., lowers BIC). After each addition, **map the result to its corresponding CPDAG** (Markov equivalence class) and continue. Stop when no addition improves the score.
> 3. **Backward phase (BES).** Now repeatedly consider **removing** a single edge; choose the removal that most improves the score, re-mapping to the CPDAG each time. Stop when no removal improves the score.
> 4. **Output** the resulting CPDAG.
>
> Searching over equivalence classes (not DAGs) is what makes the greedy moves well-defined and the procedure asymptotically consistent. ^ges-steps

> [!definition] Convergence and finite-sample behavior
> GES is harder to illustrate than PC because its trajectory depends on the **relative strengths** of (conditional) associations. In the **large-sample limit**, PC and GES converge on the **same Markov equivalence class** and are nearly the same; on **finite** samples they may differ. GES requires only a condition **weaker than full faithfulness** (per Table 1, "some weaker condition — not totally clear yet"), and makes **distributional assumptions** (usually linear-Gaussian or multinomial) that PC does not. It does **not** handle latent confounders. ^ges-convergence

> [!definition] GFCI — score + constraint hybrid for confounders
> There is, as yet, **no GES-style algorithm for the unknown-confounder case**. **GFCI** (Ogarrio et al., 2016) combines **GES and FCI**: it uses **GES to find a supergraph of the skeleton**, then uses **FCI to prune that supergraph and orient** edges. GFCI proved **more accurate than the original FCI** in many simulations. ^gfci

## Examples

- On the same problem PC solves by CI tests (Figure 1A: $X \to Z \to W$, $Y \to Z$), GES would instead greedily add edges until BIC stops improving, then prune — arriving (asymptotically) at the identical CPDAG with the $X \to Z \leftarrow Y$ v-structure.
- The Sachs protein-signaling and Arabidopsis applications in the review use constraint-based/hybrid pipelines (PC, FASK, GFCI), illustrating that score-based and hybrid searches are interchangeable building blocks in practice.

## Connections

- Optimizes over the **CPDAG / Markov equivalence class** defined in [[Markov and Faithfulness Assumptions]].
- Converges to the same output as the constraint-based [[PC Algorithm and Constraint-Based Discovery]]; GFCI fuses the two (and adds FCI's latent-confounder handling).
- A different score-based formulation — continuous optimization with an algebraic acyclicity penalty — is [[NOTEARS - Overview]].
- Situated among the method families in [[Causal Discovery - Overview]]; expert-prior alternatives in [[BN Construction Methods Comparison]].

## See Also

- [[Causal Discovery - Overview]]
- [[PC Algorithm and Constraint-Based Discovery]]
- [[Markov and Faithfulness Assumptions]]
- [[NOTEARS - Overview]]
