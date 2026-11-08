---
title: "Dwork 2006 - Interactive versus Non-Interactive Separation Results"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 4 and 4.1 (Observation 1, Thm. 4.1, Prop. 4.2), pp. 38-41; Sec. 4.4 Bibliographic Notes, p. 45"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
  - "[[Dwork 2006 - Differential Privacy Definition and Basic Examples]]"
used_by:
  - "[[Dwork 2006 - Proof of the Separation Lemma]]"
aliases:
  - Non-interactive impossibility (DMNS 2006)
  - Local mechanism lower bound (DMNS 2006)
  - Separation of interactive and non-interactive release
---

# Dwork 2006 - Interactive versus Non-Interactive Separation Results

> [!summary]
> Any single low-sensitivity query can be answered with $\mathrm{Lap}(1/\varepsilon)$ noise, but a single non-interactive $\varepsilon$-DP synopsis cannot answer most parity-sum queries over $d$-bit rows unless $n$ is about $2^{d/3}$ (Thm. 4.1), and a local (randomized-response) mechanism needs $n=\Omega((k/\varepsilon^2)^{1/3})$ to answer $k=2^d$ such queries (Prop. 4.2). The strong multiplicative form of DP is essential: weaker "statistically close" releases can do much better but leak.

## Overview

Ideally one would release one "synopsis" from which users compute many different queries. A **non-interactive** $\varepsilon$-DP mechanism for a query set $\mathcal{F}$ is a pair $\mathcal{M}_{NI}=(\mathcal{M},\mathrm{Eval})$: $\mathcal{M}$, an $\varepsilon$-DP mechanism, maps dataset $x$ to a summary $s$ (an arbitrary data structure); $\mathrm{Eval}(s,f)$ then answers $f\in\mathcal{F}$. The section proves such synopses are impossible when $\mathcal{F}$ is very large. For this section the Hamming version is used: datasets are ordered vectors $x\in D^n$, neighbours differ in one element.

## Main Content

### The query class

Counting queries are specified by a predicate $v:[n]\times D\to\{0,1\}$, with value $\mathrm{SUM}_v(x)=\sum_{i=1}^{|x|}v(i,x_i)$ (note the predicate also sees the index $i$).

> [!theorem] Observation 1 - single queries are easy (p. 39)
> $S(\mathrm{SUM}_v)=\max_{x\in D}v(i,x)\le1$. Hence the mechanism that answers any single query with $\mathrm{Lap}(1/\varepsilon)$ noise is $\varepsilon$-DP and gives a good additive approximation as long as $\varepsilon$ is larger than $1/|x|$.
^obs-single-query-easy

Let $D=\{0,1\}^d$. For $r,x\in\{0,1\}^d$ let $r\odot x=\bigoplus_j x(j)r(j)$ be the inner product mod 2. Given $\mathbf{r}=(r_1,\dots,r_n)\in(\{0,1\}^d)^n$ define $v_{\mathbf r}(i,x)=r_i\odot x$, so $\mathrm{SUM}_{v_{\mathbf r}}(x)=\sum_{i=1}^n r_i\odot x_i$.

> [!theorem] Theorem 4.1 - non-interactive mechanisms require large databases (p. 39)
> Suppose $\mathcal{M}$ is an $\varepsilon$-DP non-interactive mechanism with domain $D=\{0,1\}^d$. For all $n$ and for at least $2/3$ of the strings $\mathbf r=(r_1,\dots,r_n)\in(\{0,1\}^d)^n$, the following two distributions have statistical difference $O\!\left(n^{4/3}\varepsilon^{2/3}2^{-d/3}\right)$:
> - **Distribution 0:** $\mathcal{M}(x)$ with $x=\{(1,x_1),\dots,(n,x_n)\}$ and $x$ uniform over $\{x\in D^n:\mathrm{SUM}_{v_{\mathbf r}}(x)=0\}$.
> - **Distribution 1:** the same, with $x$ uniform over $\{x\in D^n:\mathrm{SUM}_{v_{\mathbf r}}(x)=n\}$.
>
> (The paper writes $x_2,\dots,x_n$ for the free coordinates after fixing the index labels; the content is that every row is drawn from the half-space on which $r_i\odot x_i=0$ (resp. $1$).)
^thm-noninteractive-large-db

*Interpretation.* In any run of $\mathcal{M}$, one cannot even distinguish between the extreme values $0$ and $n$ of $\mathrm{SUM}_{v_{\mathbf r}}$, so no reasonable approximation is possible. Quantifier order matters: for *each* $\mathbf r$ some mechanism answers accurately (Observation 1), but no *single* non-interactive scheme handles most $\mathbf r$ simultaneously unless $n$ grows exponentially in $d$ (about $|D|^{1/3}$ points). The multiplicative notion in Def. 2.1 "is essential": the candidate synopsis that outputs $m$ pairs $(i,x_i)$ at random indices (essentially Example 3) is not DP but yields $O(1/n)$-close distributions on neighbours, and permits estimating $\mathrm{SUM}_{v_{\mathbf r}}(x)$ for most $\mathbf r$ within additive error $O(n/\sqrt m)$, better than any DP scheme when $n=2^{o(d)}$.

### Relation to Dinur-Nissim reconstruction (p. 40)

Dinur and Nissim (2003) showed that a synopsis answering all $2^n$ counting queries within additive error $cn$ ($c$ small) allows reconstruction of almost the entire dataset, a breach of any reasonable privacy notion. Theorem 4.1 is incomparable: weaker in being specific to differential privacy, stronger in that it rules out answering most queries within *any* nontrivial error. Parameters: $|D|$ domain size, $n$ database size, $k$ number of unanswerable queries. Dinur-Nissim use $k=2^n=|D|^n$ queries to reconstruct a dataset with $n$ rows; here $k=2^{nd}=|D|^n$ (larger $D$, same relation among $D,n,k$).

### Local mechanisms (Sec. 4.1, pp. 40-41)

> [!definition] Local mechanism (randomized response scheme)
> A local algorithm is a randomization operator $Z:D\to\{0,1\}^*$ with $\mathcal{M}_Z(x_1,\dots,x_n)=(Z(x_1),\dots,Z(x_n))$. No central server sees raw data: each user computes $Z(x_i)$ and releases only that. Roots in Warner (1965). Local DP is equivalent to $\gamma$-amplification of Evfimievski et al. (2003) with $\gamma=e^{\varepsilon}$.
^def-local-mechanism

Use the simpler query class where the same parity predicate is applied to every element: $D=\{0,1\}^d$, $v_r(x)=r\odot x$ for $r\in\{0,1\}^d$.

> [!theorem] Proposition 4.2 - impossibility for local mechanisms (p. 41)
> Suppose $\mathcal{M}$ is an $\varepsilon$-DP randomized response mechanism. For at least $2/3$ of $r\in\{0,1\}^d\setminus\{0^d\}$ the following two distributions have statistical difference $O\!\left(n\varepsilon^{2/3}2^{-d/3}\right)$:
> - **Distribution 0:** $\mathcal{M}_Z(x)$ with each $x_i$ uniform in $\{x\in\{0,1\}^d:r\odot x=0\}$.
> - **Distribution 1:** each $x_i$ uniform in $\{x:r\odot x=1\}$.
>
> In particular if $n=o(2^{d/3}/\varepsilon^{2/3})$, no user can learn the relative frequency of items satisfying $g_r(x)=r\odot x$ for most $r$. Substituting $k=2^d$: $n=\Omega\big((k/\varepsilon^2)^{1/3}\big)$ data points are necessary to answer $k$ counting queries when $|D|\ge\log(k)$.
^prop-local-impossibility

### Sec. 4.4 discussion (p. 45)

Lower-bound literature splits into results specific to DP (like those here) and general attacks (Dinur-Nissim). To answer $k$ counting queries accurately one needs roughly $n$ at least logarithmic in $k$ (unless $|D|$ is small). The algorithms of Blum-Ligett-Roth (2008) and successors give nontrivial answers (error $o(n)$) to $k$ counting queries provided $n\ge\mathrm{poly}(\log k,\log|D|)$, the polynomial depending on the algorithm.

## Examples

**What the theorem means numerically (derived; constants in the $O(\cdot)$ ignored).** The statistical-difference bound $n^{4/3}\varepsilon^{2/3}2^{-d/3}$ is below 1 exactly when $n<2^{d/4}\varepsilon^{-1/2}$. For $d=60$-bit rows and $\varepsilon=1$ that threshold is $2^{15}\approx3.3\times10^4$. At $n=10^4$ the bound is $10^{16/3}\cdot2^{-20}\approx0.2$: a single non-interactive synopsis cannot reliably tell $\mathrm{SUM}=0$ from $\mathrm{SUM}=n$ for most $\mathbf r$. At $n=10^6$ the bound is about 95 (vacuous), so the theorem no longer forbids learning; the impossibility is a statement about databases that are small relative to $2^{\Theta(d)}$. In contrast the Laplace mechanism answers each single query with error about $1/\varepsilon=1$ regardless of $n$.

**Local vs central (own code).** Compare the standard deviation of a count under the Laplace mechanism and under $\varepsilon$-randomized response (see [[Dwork 2006 - Differential Privacy Definition and Basic Examples]]): $\sqrt2/\varepsilon$ vs $\sqrt n e^{\varepsilon/2}/(e^{\varepsilon}-1)$; at $n=10^6,\varepsilon=1$ that is 1.4 vs about 960.

## Connections

- **Marketing measurement.** The separation is the theory behind the practical split between *clean-room / aggregation-service* style measurement (a trusted aggregator adds noise to a pre-declared query set) and *on-device or local-noise* signals (each user randomises). Local noise can only support a small, fixed set of statistics at accuracy comparable to the sampling error; any new cut of the data costs fresh noise (and fresh budget). Plan the query set (campaign, geo, week) in advance.
- The reconstruction results (Dinur-Nissim) explain why releasing many exact or lightly-noised aggregate cuts is itself a privacy hazard; compare [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]].

## See Also

- [[Dwork 2006 - Proof of the Separation Lemma]]
- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]]
- [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] (differencing and reconstruction attacks)
