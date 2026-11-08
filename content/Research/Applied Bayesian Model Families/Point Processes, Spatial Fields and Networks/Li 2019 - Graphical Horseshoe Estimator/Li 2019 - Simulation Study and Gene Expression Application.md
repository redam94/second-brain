---
title: "Li 2019 - Simulation Study and Gene Expression Application"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Li 2019 - The Graphical Horseshoe Estimator.pdf]]"
source_location: "Sec. 5-7, pp. 16-24, Tables 1-3, Fig. 3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Li 2019 - Graphical Horseshoe Estimator"
doc_type: paper
depends_on:
  - "[[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]]"
used_by:
aliases:
  - "graphical horseshoe simulation"
  - "CEU gene network"
---

# Li 2019 - Simulation Study and Gene Expression Application

> [!summary]
> GHS has the smallest Stein loss in 11 of 12 and the smallest Frobenius error in 10 of 12 simulation settings, with a very low false-positive rate (about 0.0001-0.0013) but lower true-positive rate when $n=50$. On 100 CEU gene expressions it returns a sparse graph (83 vertices, 109 edges) versus 1,135 edges (GL), 976 (BGL) and 4,950 (GSCAD, nothing zeroed).

## Overview
Design: $p=100,n=50$ (Table 1); $p=100,n=120$ (Table 2); $p=200,n=120$ (Table 3); true $\Omega_0$ with unit diagonal and *Random* (prob 0.01 non-zero, magnitude $-\text{Unif}(0.2,1)$; 35 non-zero pairs at $p=100$), *Hubs* (10 groups of 10, $\omega_{ik}=0.25$; 90 pairs), *Cliques* (10 groups of 3, $\omega=-0.45$ positive partial correlation or $0.75$ negative; 30 pairs). 50 datasets each. Tuning (GL, GSCAD): 5-fold CV on log-likelihood. GHS/BGL: posterior mean estimate; selection by whether the **50% central credible interval** excludes zero. Stein's loss = 2 x KL of $\Omega$ from $\Omega_0$.

## Main Content

### Table 1 (excerpt): $p=100$, $n=50$, Random structure (mean, sd in parentheses)

| Metric | GL1 | GL2 | GSCAD | BGL | GHS |
|---|---|---|---|---|---|
| Stein's loss | 10.20 (0.53) | 13.42 (1.06) | 10.05 (0.55) | 80.92 (1.63) | **6.44** (0.85) |
| F norm | 4.33 (0.18) | 5.30 (0.20) | 4.31 (0.16) | 5.58 (0.26) | **3.31** (0.29) |
| TPR | .8246 | .7097 | .9977 | .8709 | .5903 |
| FPR | .0947 | .0374 | .9955 | .1055 | .0004 |
| CPU (min) | 0.30 | 0.35 | 6.24 | 40.94 | 38.32 |

Hubs ($p=100,n=50$): Stein's loss 10.12, 12.78, 10.01, 77.85, 12.56 (GHS not best here); F norm 3.95, 4.63, 3.94, 5.97, 3.96; TPR GHS .2687; FPR GHS .0013. Cliques positive: Stein GHS 5.87 vs GL1 9.16; cliques negative: GHS 6.28 vs 11.00 (F norm 3.64 vs 6.00).

### Table 3 (excerpt): $p=200$, $n=120$, Random

| Metric | GL1 | GL2 | GSCAD | BGL | GHS |
|---|---|---|---|---|---|
| Stein's loss | 10.06 | 15.80 | 9.96 | 116.61 | **2.94** |
| F norm | 4.49 | 5.97 | 4.45 | 6.76 | **2.44** |
| TPR | .9476 | .8393 | 1 | .9855 | .8421 |
| FPR | .0514 | .0159 | .9951 | .1035 | .0001 |

Hubs: Stein 12.49, 15.12, 12.40, 122.87, 11.67; cliques (positive/negative): GHS 4.09/3.77 vs GL1 11.59/14.56.

Interpretation: BGL has huge Stein loss despite similar structure; GSCAD's CV selects an almost dense matrix (FPR about 0.99); GHS is best when non-zero elements are large and $n-p$ is large (consistent with Thm 4.1) and, with $n=120$ and $p=100$, errors are comparable to an unpenalised refit of GL-selected variables. The supplement adds sensitivity/specificity/precision tables, a larger $p=400,n=120$ case and MCMC diagnostics. Caveat: 50% intervals are a pragmatic selection rule; theory for GHS discoveries is lacking (cf. van der Pas et al. 2017 for coverage in sparse normal means).

### Section 6: human gene expression (CEU)
100 genes, 60 unrelated Utah individuals of Northern and Western European ancestry (data from Bhadra & Mallick 2013); centred expressions, zero-mean multivariate normal.

| Method | Vertices | Edges |
|---|---|---|
| Graphical horseshoe | 83 | 109 |
| Graphical lasso (penalised diagonal) | 100 | 1,135 |
| Bayesian graphical lasso | 100 | 976 |
| Graphical SCAD | 100 | 4,950 (no element zero) |

GHS yields disconnected, much sparser clusters; GL and BGL share dense major clusters. Comparison with Bhadra & Mallick's SNP-adjusted network shows which edges are robust to conditioning on SNPs.

### Section 7 conclusions
All methods fail eventually when KL is the target in high dimensions; sample-size gap affects bias; screen variables first; open: theory for discoveries; compare with spike-and-slab lasso, horseshoe+, Dirichlet-Laplace.

## Examples
Selection rule in code: given draws `d` of shape (nmc,p,p) from the sampler, `lo, hi = np.percentile(d, [25, 75], axis=0)`; edge $(i,j)$ is declared if `lo[i,j] > 0 or hi[i,j] < 0`.

## Connections
[[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]] (alternative priors and selection rules); [[Stability Selection Simulation Study - Designs A-G and Results]] (frequentist comparison on graphical lasso).

## See Also
[[Li 2019 - Graphical Horseshoe Estimator - Overview]]
