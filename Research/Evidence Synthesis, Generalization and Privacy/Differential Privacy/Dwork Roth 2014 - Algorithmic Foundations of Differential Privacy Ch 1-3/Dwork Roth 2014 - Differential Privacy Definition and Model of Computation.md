---
title: "Dwork Roth 2014 - Differential Privacy Definition and Model of Computation"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 2.1 (pp. 11-12), Sec. 2.3 Def. 2.1-2.4 and privacy loss (pp. 15-19), formalisms and Remark 2.1 (pp. 25-26), Sec. 2.4 (pp. 26-27)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]]"
used_by:
  - "[[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]"
  - "[[Dwork Roth 2014 - Randomized Response]]"
  - "[[Dwork Roth 2014 - Laplace Mechanism]]"
  - "[[Dwork Roth 2014 - Basic Composition and Divergence Tools]]"
aliases:
  - (epsilon, delta)-differential privacy definition (Dwork Roth)
  - Privacy loss random variable (Dwork Roth)
  - Curator model and synopsis generator
---

# Dwork Roth 2014 - Differential Privacy Definition and Model of Computation

> [!summary]
> A trusted curator holds a histogram database $x\in\mathbb{N}^{|\mathcal{X}|}$; a randomized mechanism $\mathcal{M}$ is $(\varepsilon,\delta)$-differentially private if $\Pr[\mathcal{M}(x)\in S]\le e^{\varepsilon}\Pr[\mathcal{M}(y)\in S]+\delta$ for all neighbours $x,y$ ($\|x-y\|_1\le1$) and all events $S$. $\varepsilon$ bounds the multiplicative change in output probabilities; $\delta$ is a small additive slack and must be far below $1/\|x\|_1$. Randomization is essential: no non-trivial deterministic algorithm is private against arbitrary auxiliary information.

## Overview

**Model (Sec. 2.1, pp. 11-12).** A trusted and trustworthy *curator* holds the data of individuals in a database $D$ (typically $n$ rows, one per individual). In the **non-interactive (offline)** model the curator releases an object once (synthetic database, summary statistics, sanitized database) and then plays no further role. In the **interactive (online)** model the analyst asks queries adaptively. A **query** is a function applied to a database. When all queries are known in advance the non-interactive model gives the best accuracy (noise can be correlated across queries); when nothing is known, it must answer all possible queries and accuracy "will necessarily deteriorate with the number of questions asked". A **mechanism** takes a database, a data universe $\mathcal{X}$ (all possible rows), random bits and optionally queries, and outputs a string; a **synthetic database** is a multiset drawn from $\mathcal{X}$, decoded by running the query on it and rescaling. The curator may be replaced by a cryptographic protocol among individuals (Ch. 12), but cryptographic assumptions are not used here.

## Main Content

> [!definition] Definition 2.1 - Probability simplex (p. 16)
> For a discrete set $B$, $\Delta(B)=\{x\in\mathbb{R}^{|B|}:x_i\ge0\ \forall i,\ \sum_{i=1}^{|B|}x_i=1\}$.
^def-simplex

> [!definition] Definition 2.2 - Randomized algorithm (p. 16)
> A randomized algorithm $\mathcal{M}$ with domain $A$ and discrete range $B$ is associated with a mapping $\mathcal{M}:A\to\Delta(B)$. On input $a\in A$, it outputs $b\in B$ with probability $(\mathcal{M}(a))_b$; the probability space is over the coin flips of $\mathcal{M}$. (Continuous distributions should be discretized to finite precision with care; see Remark 2.1.)
^def-randomized-algorithm

> [!definition] Definition 2.3 - Distance between databases (p. 17)
> Represent a database as a histogram $x\in\mathbb{N}^{|\mathcal{X}|}$, $x_i$ = number of elements of type $i\in\mathcal{X}$. Then $\|x\|_1=\sum_{i=1}^{|\mathcal{X}|}|x_i|$ is the database size (number of records) and $\|x-y\|_1$ measures how many records differ. (Multiset or ordered-list representations use Hamming distance; unless noted the histogram representation is used.)
^def-distance-databases

> [!definition] Definition 2.4 - Differential privacy (pp. 17-18)
> A randomized algorithm $\mathcal{M}$ with domain $\mathbb{N}^{|\mathcal{X}|}$ is **$(\varepsilon,\delta)$-differentially private** if for all $S\subseteq\mathrm{Range}(\mathcal{M})$ and for all $x,y\in\mathbb{N}^{|\mathcal{X}|}$ such that $\|x-y\|_1\le1$:
> $$\Pr[\mathcal{M}(x)\in S]\le\exp(\varepsilon)\Pr[\mathcal{M}(y)\in S]+\delta,$$
> where the probability space is over the coin flips of the mechanism $\mathcal{M}$. If $\delta=0$, $\mathcal{M}$ is **$\varepsilon$-differentially private**.
^def-dp

### Interpreting $\delta$ and the difference between $(\varepsilon,0)$ and $(\varepsilon,\delta)$

- Typically $\delta$ is smaller than the inverse of any polynomial in the database size. Values of $\delta$ on the order of $1/\|x\|_1$ "are very dangerous": they permit "preserving privacy" by publishing the complete records of a small number of participants, the "just a few" philosophy.
- **Order of quantification.** $(\varepsilon,0)$-DP ensures that for every run, the observed output is almost equally likely on every neighbouring database *simultaneously*. $(\varepsilon,\delta)$-DP says for every pair of neighbours it is extremely unlikely that, ex post, the observed value will be much more or less likely under one than the other. Given an output $\xi\sim\mathcal{M}(x)$ it may be possible to find $y$ such that $\xi$ is much more likely under $y$.

> [!definition] Privacy loss (p. 18)
> The privacy loss incurred by observing output $\xi$ is
> $$\mathcal{L}^{(\xi)}_{\mathcal{M}(x)\|\mathcal{M}(y)}=\ln\left(\frac{\Pr[\mathcal{M}(x)=\xi]}{\Pr[\mathcal{M}(y)=\xi]}\right).$$
> It is positive when the output is more likely under $x$ and negative when more likely under $y$. By Lemma 3.17 (see [[Dwork Roth 2014 - Basic Composition and Divergence Tools]]), $(\varepsilon,\delta)$-DP ensures that for all adjacent $x,y$ the absolute value of the privacy loss is bounded by $\varepsilon$ with probability at least $1-\delta$.
^def-privacy-loss

### Randomization is essential (p. 16)

> [!theorem] No non-trivial deterministic private algorithm
> Any non-trivial privacy guarantee that holds regardless of present *or future* auxiliary information (other databases, studies, web sites, gossip, government statistics) requires randomization. *Sketch (hybrid argument):* suppose a deterministic algorithm is non-trivial, i.e. some query gives different outputs on two databases. Changing one row at a time along a path between them, some adjacent pair $x,y$ (differing in one row) must give different outputs. An adversary who knows the database is $x$ or $y$ then learns the unknown row.
^thm-randomization-essential

### Formalisms: auxiliary parameters, synopsis generators, floating point (pp. 25-26)

- **Auxiliary parameters.** A mechanism $\mathcal{M}(w,x)$ takes parameters $w$ (a query $q_w$, a collection $Q_w$ of queries, or a security parameter $\kappa$). For all $\delta\ge0$, $\mathcal{M}(\cdot,\cdot)$ satisfies $(\varepsilon,\delta)$-DP if for every $w$, $\mathcal{M}(w,\cdot)$ does. With a security parameter, $\mathcal{M}(\kappa,\cdot)$ should be $(\varepsilon,\delta(\kappa))$-DP with $\delta$ negligible: $\delta=\kappa^{-\omega(1)}$, "cryptographically small", while $\varepsilon$ is "a moderately small constant".
- **Synopsis generator.** When $w$ specifies a collection $Q_w=\{q:\mathcal{X}^n\to\mathbb{R}\}$, $\mathcal{M}$ is a *synopsis generator*: it outputs a DP synopsis $A$ with a reconstruction procedure $R$ such that for each $v$ specifying $q_v\in Q_w$, $R(A,v)\in\mathbb{R}$, and with high probability for all or most queries (weighted by some distribution) $|R(A,v)-q_v(x)|$ is bounded. A **synthetic database** is a synopsis whose rows have the same type as the original rows, so existing software can be run unchanged.
- **Remark 2.1 (floating point).** Real-valued mechanisms such as the Laplace mechanism must be implemented with care. Because of rounding, outputs with non-zero probability on $x$ may have zero probability on adjacent $y$, destroying DP. Mironov observed this and proposed a mitigation.

### Bibliographic notes (Sec. 2.4, pp. 26-27)

The definition is due to Dwork, McSherry, Nissim and Smith; the precise $(\varepsilon,\delta)$ formulation used in the literature first appears in Dwork, Kenthapadi, McSherry, Mironov, Naor (2006) and is due to Dwork and McSherry. "Differential privacy" was coined by Michael Schroeder. Impossibility of semantic security is Dwork and Naor. Composition and group privacy for $(\varepsilon,0)$ were first treated by DMNS; composition for $(\varepsilon,\delta)$ by Dwork et al. (with the corrected proof in Appendix B, due to Dwork and Lei).

## Examples

**Reading $\varepsilon$ as a likelihood ratio (own illustration).** For any single output, $\varepsilon=1$ allows probability ratios up to $e\approx2.72$ between neighbouring databases; $\varepsilon=0.1$ allows $1.105$; $\varepsilon=5$ allows $148$. A Bayesian adversary with prior odds $\omega$ on "Alice is in the database" has posterior odds in $[\omega e^{-\varepsilon},\omega e^{\varepsilon}]$ after one $\varepsilon$-DP output (the "Bayes factor between $e^{-\varepsilon}$ and $e^{\varepsilon}$"; the same fact appears for pairs of hypotheses in [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]]).

**Delta of the subsampling mechanism.** Release each record independently with probability $p$. For neighbours differing by one record, the output set "includes that record" has probability $0$ vs $p$, so the mechanism is $(\varepsilon,\delta)$-DP for any $\varepsilon$ only with $\delta\ge p$. With $p=1/\|x\|_1$ this is $\delta\sim1/\|x\|_1$, exactly the dangerous regime flagged above.

## Connections

- **Marketing measurement.** The unit of protection is a *record* in the histogram: if a "record" is an ad impression event but one person generates many, the guarantee protects events, not people. The granularity point (next note) is critical for conversion data keyed by device or user.
- **Floating-point remark.** Teams that implement noisy aggregates in spreadsheets or pandas should use vetted libraries; naive floating-point Laplace sampling can break the guarantee.

## See Also

- [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]
- [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] (the original $\varepsilon$-only definition)
- [[Dwork Roth 2014 - Randomized Response]]
