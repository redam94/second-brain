---
title: "Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/concept
  - doc/paper
source: "[[raw/Hoff 2002 - Latent Space Approaches to Social Network Analysis.pdf]]"
source_location: "Sec. 1 and 5, pp. 1090-1091, 1096-1097"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis"
doc_type: paper
depends_on:
  - "[[Hoff 2002 - Monks Florentine Families and Classroom Examples]]"
used_by:
  - "[[Network Outcome Models - Stochastic Block Models and Network Checks]]"
aliases:
  - "latent space extensions"
  - "MDS versus latent space"
---

# Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast

> [!summary]
> The authors list four advantages (visual representation of relationships, uncertainty quantification, flexibility via GLMs and time-varying positions, easy handling of missing ties), propose dyad-dependence extensions, suggest clustered priors on $Z$, and contrast the approach with MDS and blockmodels.

## Overview
Compared with blockmodels the latent space avoids hard group membership and models transitivity directly; compared with MDS it models the observed ties (response) and gives uncertainty.

## Main Content

- **Advantages (Sec. 5).** (1) model-based visual representation; (2) uncertainty in the social space is quantifiable and displayable; (3) generalises to multiple relations, tie strengths (GLMs), and time-varying positions as stochastic processes; (4) deals easily with missing data if ties are missing at random (likelihood uses only observed ties); (5) inherently transitive, so it should fit better than non-transitive models such as blockmodels.
- **Dyad dependence.** Extend to treat dyads $(y_{ij},y_{ji})$ as independent given $Z$, $\alpha$ and a parameter $\gamma$ for within-dyad dependence (reciprocity).
- **Model checking.** Compare expected reciprocal/nonreciprocal/null dyad counts with observed ones (see example note).
- **Optimisation.** Non-concavity in $Z$: look for multiple local maxima; MCMC helped (Florentine chain identified and mixed two separated modes). The log-likelihood is concave in $D$ if the distance matrix is not restricted to be Euclidean; one could fit in high dimension and then inspect subnetworks in lower dimensions.
- **Priors.** Diffuse normal priors may not reflect networks' tendency to cluster; better: clustered point processes or mixtures of normals with unknown number of components, adding hierarchy for group tendencies without specifying membership.
- **MDS contrast.** Breiger, Boorman & Arabie (1975), Faust & Romney (1985): MDS uses ad hoc dissimilarities, does not model the stochastic response, large parameter counts, unknown asymptotics. Related Bayesian MDS: DeSarbo, Kim & Fong (1999), Oh & Raftery (2001); latent class MDS (Lazarsfeld & Henry 1968).
- **Software.** R code from the first author's website (as stated in the paper).

> [!definition] Stochastic blockmodel contrast (Sec. 1)
> Wang & Wong (1987): given known groups, tie rates depend on sender group, receiver group and actor effects; Nowicki & Snijders (2001): groups latent, dyads conditionally independent given class. These handle clusters of *stochastically equivalent* actors but fit poorly when many actors lie between clusters or when relations are transitive without clear clustering.

^def-sbm-contrast

## Examples
Missing ties: for a dyad with unobserved $y_{ij}$, drop its term from eq. 4; in a PyMC model `y` observed only at the index set of seen dyads (mask), the latent positions still fill in predictions for the missing ones.

## Connections
[[Network Outcome Models - Stochastic Block Models and Network Checks]] explains SBM variants (mixed membership, degree-corrected) used in E21; link to marketing: missing-at-random assumption matters for sparsely observed referral/co-engagement graphs.

## See Also
[[Hoff 2002 - Latent Space Models Overview]] | [[Social Network Models]]
