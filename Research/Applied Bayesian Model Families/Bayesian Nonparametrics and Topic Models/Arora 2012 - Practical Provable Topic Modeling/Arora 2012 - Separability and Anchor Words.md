---
title: "Arora 2012 - Separability and Anchor Words"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/definition
  - doc/paper
source: "[[raw/Arora et al 2012 - A Practical Algorithm for Topic Modeling with Provable Guarantees.pdf]]"
source_location: "Secs. 1-2 (Def. 2.1, Thm 2.2), pp. 1-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Arora 2012 - Practical Provable Topic Modeling"
doc_type: paper
depends_on:
  - "[[Arora 2012 - Practical Provable Topic Modeling - Overview]]"
used_by:
  - "[[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]]"
  - "[[Arora 2012 - FastAnchorWords Algorithm and Guarantees]]"
aliases:
  - "separability assumption"
  - "anchor word"
  - "p-separable word-topic matrix"
---

# Arora 2012 - Separability and Anchor Words

> [!summary]
> Topic models (LDA, correlated topic models, Pachinko allocation) are admixtures: a document draws $W_d\sim\tau$, then topic $z_i\sim W_d$ and word $w_i\sim A_{z_i}$. If every topic has an anchor word with nonzero probability only in that topic (separability), topics are recoverable in polynomial time from the second-order moment matrix $Q=ARA^T$.

## Main Content
**Setup.** $V$ words, $K$ topics. Topic $k$ is a column $A_k$ of the $V\times K$ word-topic matrix $A$. Document topic weights $W_d\sim\tau$ ($\tau$ Dirichlet for LDA, logistic-normal for CTM). The topic-document matrix $W$ ($K\times M$) is latent and stochastic; only $A$ (and for LDA the hyperparameters) are learned. Maximum likelihood is NP-hard even for two topics; practical routes are SVD/LSI, variational inference, MCMC.

> [!definition] $p$-separable word-topic matrix (Def. 2.1)
> $A$ is $p$-separable ($p>0$) if for every topic $k$ there exists a word $i$ with $A_{i,k}\ge p$ and $A_{i,k'}=0$ for all $k'\ne k$. Such a word is an **anchor word** for topic $k$: whenever it occurs in a document, that topic is certainly among the topics used.

^def-p-separable

> [!theorem] Original provable recovery (Thm 2.2; Arora et al. 2012b)
> Suppose documents have length $D\ge2$, $R=E_\tau[WW^T]$ is the $K\times K$ topic covariance with condition number $\gamma$, $\alpha_k$ is the expected proportion of topic $k$ and $a=\max_{k,k'}\alpha_k/\alpha_{k'}$. A polynomial-time algorithm learns $A$ and $R$ up to additive error $\epsilon$ if
> $$M\ge\max\Big\{O\Big(\frac{\log V\,a^4K^6}{\epsilon^2p^6\gamma^2D}\Big),\ O\Big(\frac{\log K\,a^2K^4}{\gamma^2}\Big)\Big\}.$$

^thm-original-recovery

The earlier algorithm solves $V$ linear programs and inverts a matrix, making it slow and sensitive to noise. Anandkumar et al. (2012) avoid separability using third-order moments but assume uncorrelated topics. Topics are in practice correlated (economics and politics co-occur more than economics and cooking), which makes the second-order, correlation-tolerant approach attractive.

## Examples
> [!example] Anchors in a baskets setting
> In a grocery basket model, the item "baby formula" may be an anchor for a "new parent" topic if no other topic ever generates it. Real data rarely satisfy exact separability; the paper tests robustness in Sec. 5.4 (adding synthetic anchors) - see [[Arora 2012 - Experiments and Evaluation Metrics]].

^ex-anchor-baskets

## Connections
LDA as the Dirichlet admixture: [[Blei 2003 - LDA Generative Model and Exchangeability]]. Convex-hull view used by the recovery step: [[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]].

## See Also
[[Arora 2012 - Practical Provable Topic Modeling - Overview]]
