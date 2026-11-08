---
title: "Blei 2003 - Smoothed LDA, Examples and Experiments"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/example
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Sec. 5.4 (Fig. 7), Sec. 6 (Fig. 8), Sec. 7 (Figs 9-11, Table 1), Sec. 8, pp. 1008-1015"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
depends_on:
  - "[[Blei 2003 - Variational Inference and Parameter Estimation]]"
  - "[[Blei 2003 - Related Models and the Topic Simplex]]"
used_by:
  - "[[Blei 2003 - LDA Beyond Text Baskets and Sessions]]"
aliases:
  - "LDA perplexity experiments"
  - "LDA smoothing"
  - "LDA collaborative filtering experiment"
---

# Blei 2003 - Smoothed LDA, Examples and Experiments

> [!summary]
> Smoothed LDA places an exchangeable $\text{Dir}(\eta)$ prior on each row of $\beta$ and adds the update $\lambda_{ij}=\eta+\sum_d\sum_n\phi^*_{dni}w_{dn}^j$. Experiments: perplexity on C. Elegans and AP, SVM classification on Reuters-21578 with 50 LDA features, and collaborative filtering on EachMovie, where LDA is best.

## Main Content
**Smoothing (5.4, Fig. 7).** Maximum likelihood assigns zero probability to unseen words. Laplace smoothing is not a MAP justification in mixture models. LDA treats $\beta_i\sim\text{Dir}(\eta)$ and uses a separable variational family $q(\beta_{1:k},\mathbf z_{1:M},\theta_{1:M}\mid\lambda,\phi,\gamma)=\prod_i\text{Dir}(\beta_i\mid\lambda_i)\prod_dq_d(\theta_d,\mathbf z_d\mid\phi_d,\gamma_d)$ with the same $\phi,\gamma$ updates and $\lambda_{ij}=\eta+\sum_{d}\sum_{n}\phi^*_{dni}w^j_{dn}$. $\eta$ and $\alpha$ by approximate empirical Bayes.

**Example (Sec. 6, Fig. 8).** 16,000 TREC AP documents, 100-topic LDA, stop words removed. Top words for four topics: "Arts" (new, film, show, music, movie, play), "Budgets" (million, tax, program, budget, billion, federal), "Children" (children, women, people, child, years, families), "Education" (school, students, schools, education, teachers). Posterior inference on a held-out article (Hearst Foundation grants to Lincoln Center, the Metropolitan Opera, New York Philharmonic, Juilliard) loads on arts, budgets, children and education: words are coloured by their most likely topic.

> [!definition] Perplexity (7.1)
> For a held-out set of $M$ documents, $\text{perplexity}=\exp\{-\sum_{d=1}^M\log p(\mathbf w_d)\,/\,\sum_{d=1}^MN_d\}$: the inverse geometric mean per-word likelihood; lower is better.

^def-perplexity

**7.1 Document modelling.** Corpora: C. Elegans abstracts (5,225 documents, 28,414 unique terms) and TREC AP subset (16,333 articles, 23,075 unique terms); 10% held out; 50 stop words removed (AP: also words seen once). Models trained by EM with stopping rule: average change in expected log-likelihood below 0.001%. Compared: unigram, mixture of unigrams, pLSI (folding-in), LDA (smoothed where noted).

Table 1 (AP) shows the overfitting of the unsmoothed models:

| Topics $k$ | Perplexity, mixture of unigrams | Perplexity, pLSI |
|---|---|---|
| 2 | 22,266 | 7,052 |
| 5 | $2.20\times10^8$ | 17,588 |
| 10 | $1.93\times10^{17}$ | 63,800 |
| 20 | $1.20\times10^{22}$ | $2.52\times10^5$ |
| 50 | $4.19\times10^{106}$ | $5.04\times10^6$ |
| 100 | $2.39\times10^{150}$ | $1.72\times10^7$ |
| 200 | $3.51\times10^{264}$ | $1.31\times10^7$ |

Interpretation: perplexity explodes with $k$ because test documents contain words that have tiny probability in the sharp components. After smoothing / folding-in correction, Fig. 9 shows LDA with the lowest perplexity at every $k$ on both corpora; latent variable models beat the smoothed unigram.

**7.2 Classification (Fig. 10).** Reuters-21578 (8,000 documents, 15,818 words), two binary tasks (EARN vs not, GRAIN vs not). An SVM (SVMLight) on 50 LDA features $\gamma^*(\mathbf w)$ (99.6% feature reduction) shows little reduction in accuracy relative to an SVM on all word features and in almost all cases improves it, across training proportions (the authors note the results need further substantiation and suggest LDA as a fast feature-selection filter).

**7.3 Collaborative filtering (Fig. 11).** EachMovie; users with at least 100 positively rated movies (rating at least 4 of 5): 3,300 training users, 390 test users, vocabulary 1,600 movies. Predictive perplexity $\exp\{-\sum_d\log p(w_{d,N_d}\mid w_{d,1:N_d-1})/M\}$ for the held-out movie; LDA predicts via $p(w\mid w_{obs})=\int\sum_zp(w\mid z)p(z\mid\theta)p(\theta\mid w_{obs})d\theta$, a linear combination of $k$ Dirichlet expectations. LDA obtains the best predictive perplexity (mixture of unigrams and pLSI corrected for overfitting).

**8 Discussion.** Extensions listed: Laplace and higher-order variational (Leisink and Kappen 2002), expectation propagation (Minka and Lafferty 2002), MCMC (Griffiths and Steyvers 2002), $n$-gram / paragraph mixtures via partial exchangeability, and generalised exchangeability results (Diaconis 1988).

## Examples
> [!example] Reading the perplexity blow-up
> A test word with per-component probability $10^{-6}$ in the document's assigned component contributes $\log10^{-6}=-13.8$ to the log-likelihood; across hundreds of words and $k=200$ components this accumulates into the astronomically large values in Table 1. Smoothing with $\eta$ lifts every word above zero.

^ex-perplexity-blowup

## Connections
[[Posterior Predictive Checking]] and held-out likelihood as validation tools; yardsticks beyond perplexity: [[Concept - Topic Model Evaluation and Stability]].

## See Also
[[Blei 2003 - Latent Dirichlet Allocation - Overview]]
