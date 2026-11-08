---
title: "Hoff 2002 - Monks Florentine Families and Classroom Examples"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Hoff 2002 - Latent Space Approaches to Social Network Analysis.pdf]]"
source_location: "Sec. 4, pp. 1093-1096, Tables 1-2, Figs. 1-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis"
doc_type: paper
depends_on:
  - "[[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]]"
used_by:
aliases:
  - "Sampson monks latent space"
  - "Florentine families latent space"
  - "classroom friendship latent space"
---

# Hoff 2002 - Monks Florentine Families and Classroom Examples

> [!summary]
> Three standard network datasets: Sampson's 18 monks (distance model in $\mathbb R^2$ has log-lik -66.02 with 34 parameters vs -82.12 for the Wang-Wong SBM with 37), Padgett-Ansell Florentine marriages (15 families after dropping an isolate), and Hansell's classroom friendship (27 students; projection model with a same-sex covariate fits best, log-lik -224.58).

## Overview
Each analysis fits ML estimates (MDS start) and then Bayesian MCMC; positions are plotted with marginal posterior clouds.

## Main Content

### 4.1 Monk data (Sampson 1968)
18 monks, directed positive affect; groups: loyal opposition (monks 2-6), young Turks (8-14), outcasts (16-18), waverers (1, 7, 15). Number of nonvacuously transitive ordered triples is 49; in 500 random reallocations of ties (holding out-degrees fixed) the largest was 35, so the data are more transitive than chance. Model: $\text{logit}\,p(y_{ij}=1)=\alpha-|z_i-z_j|$, $z\in\mathbb R^2$; free parameters $18\times2-3+1=34$ ($z$ fixed up to the 3 rigid-motion degrees of freedom, plus $\alpha$).

| Model | Maximised log-likelihood | Parameters |
|---|---|---|
| Distance model ($\mathbb R^3$) | -34.04 | 50 |
| Distance model ($\mathbb R^2$) | -66.02 | 34 |
| Stochastic blockmodel | -82.12 | 37 |

Interpretation: the $\mathbb R^2$ latent-space model beats Wang-Wong's SBM with fewer parameters, and does not presuppose groups; $\mathbb R^3$ gains 16 parameters for a large log-lik gain (-34.04). The paper's argument that the fit cannot be improved by going to higher dimensions: the best-fitting *symmetric* model has $p_{ij}=1$ for mutual ties, $0$ for null dyads and $1/2$ for asymmetric dyads, so its log-likelihood is $-a\log4$ with $a$ the number of asymmetric dyads; for the monks $a=26$, giving $-36.04$, which the distance model in $\mathbb R^3$ essentially achieves (in the paper's wording, there exist positions $\hat z$ and $\hat\alpha$ with the limit equal to $-26\log4$ as $c\to\infty$). Bayesian fit: diffuse $N(0,100^2)$ priors, $2.5\times10^6$ scans (output every 2,000); the chain mixes reasonably fast in $z_i$ and distances but slowly in $\alpha$ (Fig. 2). Posterior clouds validate the loyal/Turks/outcast categorisation; monk 15 lies between groups.

### 4.2 Florentine families (Padgett & Ansell 1993)
16 families; undirected marriage ties; one family with no ties dropped (15 analysed; its ML distance would be infinite). In $\mathbb R^2$, ML positions can make the likelihood arbitrarily close to 1 as $\alpha\to\infty$ (overfitting: fitted tie probabilities all 0 or 1); a prior on $\alpha$ fixes this: exponential with mean 2, $N(0,100^2)$ on $Z$, $5\times10^6$ scans (5,000 saved), mixes faster than the monk chain (Fig. 4). The Medici (family 9) have above-average distance to others; two equivalent $d_2$ representations (Fig. 3a-b) differ in the position of families 1, 9, 14, 10 (bimodal posterior); marginal clouds in Fig. 3c.

### 4.3 Classroom data (Hansell 1984)
13 boys, 14 girls; strong friendship ties; out-ties range 0-19 (mean 5.8, sd 4.7; sd of in-ties 3.2); 72% of ties are same-sex; transitive ordered triples 400 (max 347 in 500 reallocations). Projection models used because of variable send rates.

| Model | Maximised log-likelihood | Parameters |
|---|---|---|
| Projection, with covariate (same sex) | -224.58 | 55 |
| Stochastic blockmodel | -227.57 | 55 |
| Projection, no covariate | -229.05 | 54 |

Interpretation: the sex covariate is nominally significant (LRT); the median angle between boys' and girls' latent vectors is 76 degrees without covariate (two roughly orthogonal groups), 60 degrees after adjusting for same-sex, and 13 degrees with a full model with four baseline rates. Naive logistic regression gives log-odds ratio 1.3 (se 0.2) for same-sex vs different-sex ties; the Bayesian posterior for $\beta$ ($5\times10^6$ scans, saved every 1,000) has a wider interval (ties are not independent given latent positions), Fig. 5c.

## Examples

> [!example] Posterior predictive reciprocity check (Sec. 5)
> Expected numbers of (reciprocal, nonreciprocal, null) dyads from the fitted conditional-independence model vs observed: monk $\mathbb R^2$ model (17.3, 21.4, 114.3) vs observed (15, 26, 112); classroom model (26.7, 103.6, 220.7) vs observed (24, 109, 218). A reasonable fit, though both datasets show slightly less reciprocity than the model predicts.

Workflow for new data (E21-style): draw $Z$ with PyMC, align with Procrustes ([[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]]), then run network posterior predictive checks (degree, transitivity, shared partners, geodesics; see [[Network Outcome Models - Stochastic Block Models and Network Checks]]).

## Connections
[[Social Network Models]] has a simpler network model in PyMC; [[Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast]].

## See Also
[[Hoff 2002 - Latent Space Models Overview]]
