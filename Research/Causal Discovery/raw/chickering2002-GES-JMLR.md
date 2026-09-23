# Source: Chickering (2002) — Optimal Structure Identification with Greedy Search

**Author:** David Maxwell Chickering  
**Title:** "Optimal Structure Identification With Greedy Search"  
**Journal:** *Journal of Machine Learning Research*, Vol. 3, Nov. 2002, pp. 507–554  
**Free access:** Fully open-access at JMLR  
**URL:** https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

## What it covers

The paper introduces the **Greedy Equivalence Search (GES)** algorithm for
Bayesian network structure learning. The central theoretical contribution is the
**proof of the Meek Conjecture**: if a DAG $H$ is an I-map of DAG $G$, there
exists a sequence of covered edge reversals and edge additions that transforms
$G$ into $H$ while keeping all intermediates I-maps. This implies a two-phase
greedy search over Markov Equivalence Classes (MECs) is asymptotically correct
under faithfulness.

Key content:
- §2: Background — MECs, CPDAGs, scoring criteria (BDe, BIC, decomposability)
- §3: The Meek Conjecture and its proof (the paper's main theoretical result)
- §4: **GES algorithm** — Forward Equivalence Search (FES) + Backward Equivalence Search (BES)
- §5: Insert/Delete operators on CPDAGs
- §6: Convergence theorem (asymptotic consistency)
- §7: Simulation experiments

## Download status

Direct download blocked by egress proxy in current environment.  
Vault notes were written from primary knowledge of this text.

## See also

Chickering (2015): "Selective Greedy Equivalence Search" — a later extension  
(manuscript available at microsoft.com/research; copy at `raw/chickering2015-selective-GES.pdf`)
