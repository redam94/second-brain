---
title: "Arora 2012 - Experiments and Evaluation Metrics"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/example
  - doc/paper
source: "[[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]"
source_location: "Sec. 5 (5.1-5.6, Figs 1-6, Table 1), Sec. 6, Appendix C (Tables 2-4, Figs 9-13), pp. 6-9, 13-20"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling"
doc_type: paper
depends_on:
  - "[[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]]"
  - "[[Arora 2012 - FastAnchorWords Algorithm and Guarantees]]"
used_by:
  - "[[Concept - Topic Model Evaluation and Stability]]"
aliases:
  - "anchor words experiments"
  - "topic coherence metric"
  - "recover vs Gibbs"
---

# Arora 2012 - Experiments and Evaluation Metrics

> [!summary]
> Compared methods: Recover (original), RecoverKL, RecoverL2 and a fast Gibbs sampler (MALLET). On semi-synthetic NY Times and NIPS corpora the new algorithms beat Recover and approach Gibbs with more data; on real corpora held-out probability is similar, coherence is better for Recover-based topics and unique words per topic are fewer.

## Main Content
**Data.** NY Times: 295k documents, vocabulary 15k, mean length 298. NIPS abstracts: 1,100 documents, vocabulary 2,500, mean length 68. Pruned by document frequency. Semi-synthetic corpora: train $K=100$ model by MCMC, generate documents (length 300 / 70, document-topic Dirichlet with symmetric hyperparameter 0.03). Corpus sizes: NYT 50,000 to 2,000,000 documents; NIPS 2,000 to 100,000; plus "infinite data" (true $Q$). Gibbs: average of 10 saved states, 100 iterations apart, after 1,000 burn-in.

> [!definition] Metrics (5.1)
> *$\ell_1$ reconstruction error*: match learned to true topics by LP (Hungarian-type assignment) then $\ell_1$ per topic. *Held-out probability per token* (approximated, Wallach et al. 2009). *Coherence* (Mimno et al. 2011): $\text{Coherence}(W)=\sum_{w_1,w_2\in W}\log\frac{D(w_1,w_2)+\epsilon}{D(w_2)}$, $D(\cdot)$ document counts, $\epsilon=0.01$. *Unique words*: for each topic take the $N$ most probable words and count those absent from every other topic's top-$N$ set (redundancy measure).

^def-topic-metrics

| Section | Finding |
|---|---|
| 5.2 Efficiency (Fig. 1) | Python Recover algorithms are faster than heavily optimised Java Gibbs (Yao et al. 2009); Gibbs linear in corpus size; RecoverL2 time varies only 33 to 50 s; estimating $Q$ takes 7 s for the largest corpus; FastAnchorWords under 6 s |
| 5.3 Semi-synthetic (Figs 2-3) | Recover is poor except with infinite noiseless data; Gibbs has lower $\ell_1$ for small corpora; RecoverKL/L2 improve and have lower variance with more data (comparable or better after 40,000 NIPS documents); on NIPS with $D=2000$ topic matching fails for Recover |
| 5.4 Separability (Fig. 4) | adding a synthetic anchor to each topic drives $\ell_1$ to 0 for Recover and near 0 for KL/L2 - residual error is a separability violation (and incomplete optimisation) |
| 5.5 Correlation (Fig. 5) | logistic-normal topics with block covariance (10 groups; $\rho=0.05$ and $0.1$): Recover degrades most; others, especially Gibbs, are robust; error rises with correlation and falls with corpus size; infinite-data error equals the uncorrelated case |
| 5.6 Real documents (Fig. 6, Table 1) | Held-out sets: 230 NIPS documents (average over 5 splits), 59k NYT. Recover fails on NIPS (matrix inversion); on NYT Recover has noticeably worse held-out log-probability. Gibbs best on average held-out probability ($p<0.0001$, paired t-test) but within between-document variability; Gibbs lower coherence, more unique words |

Table 1 (closest/median/farthest $\ell_1$ topic pairs, NYT, RecoverL2 vs Gibbs): e.g. baseball topic "run inning game hit season anaheim angel" vs "run inning hit game ball pitch"; Elian Gonzalez topic; internet topic "file sport read internet email" vs "web site com www mail". Recover-based topics tend to have more specific words (Anaheim Angels vs pitch). Appendix C reproduces 100 NYT topics (Tables 2-4) and the full set of semi-synthetic plots (Figs 9-13; for NIPS with $D\in\{2000,6000,8000\}$ Recover yields $-\infty$ log probabilities for some held-out documents).

**Conclusions (Sec. 6).** Runtime is effectively independent of corpus size; sample complexity is somewhat greater than MCMC but RecoverL2 gives comparable results in a fraction of the time; a hybrid (initialising MCMC from the output) had not yet been found to help.

## Examples
> [!example] Coherence by hand
> Two words co-occur in 40 of 100 documents; the second appears in 50 documents: contribution $\log\frac{40+0.01}{50}=-0.22$. A pair that never co-occurs but with the second word in 50 documents: $\log\frac{0.01}{50}=-8.5$. The sum penalises topics mixing unrelated words.

^ex-coherence-hand

## Connections
Yardsticks and stability checks reused for newer topic models: [[Concept - Topic Model Evaluation and Stability]]. The comparison point (LDA with Gibbs): [[Blei 2003 - Smoothed LDA, Examples and Experiments]].

## See Also
[[Arora 2012 - Practical Provable Topic Modeling - Overview]]
