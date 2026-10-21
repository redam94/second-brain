---
title: "REF: Dißmann et al. (2013) — Selecting and Estimating Regular Vine Copulae"
doc_type: paper
download_status: "PDF not downloaded — proxy policy blocks arxiv.org"
free_url: "https://arxiv.org/pdf/1202.2002"
arxiv_id: "1202.2002"
---

# Dißmann et al. (2013) — Selecting and Estimating Regular Vine Copulae

**Full citation:** Dißmann, J., Brechmann, E. C., Czado, C., & Kurowicka, D. (2013). Selecting and estimating regular vine copulae and application to financial returns. *Computational Statistics & Data Analysis*, 59(1), 52–69.

**arXiv preprint:** arXiv:1202.2002 (v2, 19 April 2012)
Free PDF: https://arxiv.org/pdf/1202.2002

## Abstract

The paper proposes a computationally tractable method for selecting and estimating
regular vine (R-vine) copulae from data. Building on the pair-copula construction
of Aas et al. (2009) and the vine theory of Bedford & Cooke (2002), the authors:
(1) derive the general R-vine density formula; (2) propose a greedy tree-by-tree
structure-selection algorithm based on maximum spanning trees (maximising the sum
of |Kendall's tau| at each stage); (3) propose sequential and joint maximum
likelihood estimation; (4) validate in a 16-dimensional simulation; and (5) apply
to a 16-dimensional financial dataset spanning equities, fixed income, and
commodities. Software: VineCopula R package (Schepsmeier et al.).

## Key contributions

1. General R-vine density formula (extends C-vine/D-vine to arbitrary vine structures).
2. Greedy spanning-tree selection algorithm — maximum spanning tree at each tree level
   using |Kendall's tau| as edge weights.
3. Sequential vs joint ML estimation comparison.
4. Implementation in the VineCopula R package (widely used in practice).
