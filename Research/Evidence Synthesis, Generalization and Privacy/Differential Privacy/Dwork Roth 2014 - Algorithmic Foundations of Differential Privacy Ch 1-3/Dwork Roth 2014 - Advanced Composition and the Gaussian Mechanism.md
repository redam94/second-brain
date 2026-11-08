---
title: "Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 3.5.2 Advanced composition (Def. 3.7, Thm. 3.20, Cor. 3.21, Example 3.7, pp. 48-53); Sec. 3.5.3 Laplace versus Gauss (Def. 3.8, Thm. 3.22, pp. 53-54); Sec. 3.5.4 Remarks on composition (pp. 54-55)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Basic Composition and Divergence Tools]]"
  - "[[Dwork Roth 2014 - Laplace Mechanism]]"
used_by:
  - "[[Dwork Roth 2014 - Sparse Vector Technique]]"
aliases:
  - Advanced composition theorem (Dwork Roth)
  - Gaussian mechanism (Dwork Roth)
  - sqrt(k) composition
  - Humans and ghosts
---

# Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism

> [!summary]
> Over $k$ adaptive uses of $(\varepsilon,\delta)$-DP mechanisms, the privacy loss grows like $\sqrt{k}\,\varepsilon$ rather than $k\varepsilon$ if one accepts a small extra $\delta'$: $\varepsilon'=\sqrt{2k\ln(1/\delta')}\,\varepsilon+k\varepsilon(e^{\varepsilon}-1)$ with $\delta_{\text{total}}=k\delta+\delta'$ (Thm. 3.20). The proof turns the privacy loss into a sum of bounded martingale differences and applies Azuma's inequality. The same section introduces the Gaussian mechanism ($\ell_2$ sensitivity, $(\varepsilon,\delta)$-DP) and remarks on what composition does and does not guarantee.

## Overview

Basic composition is linear in $k$; the question is whether it can be improved, and for what kinds of composition. Two scenarios the definitions must cover (p. 48): (1) repeated use of DP algorithms on the *same* database (the same or different mechanisms, modular construction); (2) repeated use on *different* databases that may contain information about the same individual, where the adversary may even influence the makeup of the new databases. This is "fundamentally different" from repeatedly querying a fixed database.

## Main Content

> [!definition] The composition experiment (pp. 48-49)
> Let $\mathcal{F}$ be a family of database access mechanisms and $\mathcal{A}$ a probabilistic, stateful adversary. **Experiment $b\in\{0,1\}$:** for $i=1,\dots,k$: (1) $\mathcal{A}$ outputs two adjacent databases $x_i^0,x_i^1$, a mechanism $\mathcal{M}_i\in\mathcal{F}$ and parameters $w_i$; (2) $\mathcal{A}$ receives $y_i\in_R\mathcal{M}_i(w_i,x_i^{b})$. $\mathcal{A}$'s *view* is its coin tosses and all outputs $(y_1,\dots,y_k)$. Intuition: let $x_i^0$ hold Bob's data and $x_i^1$ be the same with Bob deleted. Experiment 0 is the "real world" where Bob's data is used in many releases; experiment 1 the "ideal world". DP requires the views to be "close".
^def-composition-experiment

> [!definition] Definition 3.7 - DP under $k$-fold adaptive composition (p. 49)
> $\mathcal{F}$ satisfies **$\varepsilon$-differential privacy under $k$-fold adaptive composition** if for every adversary $\mathcal{A}$, $D_\infty(V^0\|V^1)\le\varepsilon$, where $V^b$ is the view in experiment $b$. **$(\varepsilon,\delta)$-DP under $k$-fold adaptive composition** instead requires $D_\infty^{\delta}(V^0\|V^1)\le\varepsilon$.
^def-adaptive-composition

> [!theorem] Theorem 3.20 - Advanced composition (p. 49)
> For all $\varepsilon,\delta,\delta'\ge0$, the class of $(\varepsilon,\delta)$-differentially private mechanisms satisfies $(\varepsilon',k\delta+\delta')$-differential privacy under $k$-fold adaptive composition for
> $$\varepsilon'=\sqrt{2k\ln(1/\delta')}\;\varepsilon+k\varepsilon\,(e^{\varepsilon}-1).$$
^thm-advanced-composition

> [!proof]- Proof (pp. 50-52)
> *Case $\delta=0$.* A view is $v=(r,y_1,\dots,y_k)$ ($r$ = adversary's coins). Let $B=\{v:\Pr[V^0=v]>e^{\varepsilon'}\Pr[V^1=v]\}$. If $\Pr[V^0\in B]\le\delta'$, then for every $S$: $\Pr[V^0\in S]\le\Pr[V^0\in B]+\Pr[V^0\in S\setminus B]\le\delta'+e^{\varepsilon'}\Pr[V^1\in S]$, i.e. $D^{\delta'}_\infty(V^0\|V^1)\le\varepsilon'$.
> The log-likelihood ratio decomposes by the chain rule: $\ln\frac{\Pr[V^0=v]}{\Pr[V^1=v]}=\ln\frac{\Pr[R^0=r]}{\Pr[R^1=r]}+\sum_{i=1}^k\ln\frac{\Pr[Y_i^0=y_i\mid R^0=r,Y^0_{<i}=y_{<i}]}{\Pr[Y_i^1=y_i\mid R^1=r,Y^1_{<i}=y_{<i}]}\overset{\text{def}}{=}\sum_ic_i(r,y_1,\dots,y_i)$ (the adversary's coin term cancels since $R^0,R^1$ have the same law). Conditioning on a prefix fixes $x_i^0,x_i^1,\mathcal{M}_i,w_i$, so $Y_i^0\sim\mathcal{M}_i(w_i,x_i^0)$ and $c_i=\ln\frac{\Pr[\mathcal{M}_i(w_i,x_i^0)=y_i]}{\Pr[\mathcal{M}_i(w_i,x_i^1)=y_i]}$. By $\varepsilon$-DP, $|c_i|\le\varepsilon$ ($\alpha=\varepsilon$); by Lemma 3.18, $\mathbb{E}[c_i\mid\text{prefix}]=D(\mathcal{M}_i(w_i,x_i^0)\|\mathcal{M}_i(w_i,x_i^1))\le\varepsilon(e^{\varepsilon}-1)$ ($\beta=\varepsilon(e^{\varepsilon}-1)$). Azuma (Lemma 3.19) with $z=\sqrt{2\ln(1/\delta')}$ gives $\Pr[\sum c_i>k\varepsilon(e^{\varepsilon}-1)+\sqrt{2k\ln(1/\delta')}\varepsilon]\le e^{-z^2/2}=\delta'$, which is the claim. (The printed proof writes $\beta=\varepsilon\cdot\varepsilon'$ for the mean bound, a notational slip for $\varepsilon(e^{\varepsilon}-1)$.)
> *Case $\delta>0$.* Use Lemma 3.17 part 2 for each mechanism chosen: $V^0$ is $k\delta$-close to a variable $W=(R,Z_1,\dots,Z_k)$ such that conditioned on every prefix, $D_\infty(Z_i\|Y_i^1)\le\varepsilon$ and $D_\infty(Y_i^1\|Z_i)\le\varepsilon$ (triangle inequality for statistical distance). That reduces to the $\delta=0$ case: $D_\infty^{\delta'}(W\|V^1)\le\varepsilon'$, and since $V^0$ is $k\delta$-close to $W$, Lemma 3.17 part 1 gives $D_\infty^{\delta'+k\delta}(V^0\|W)\le\varepsilon'$ and hence the stated guarantee.

> [!theorem] Corollary 3.21 - Choosing per-mechanism $\varepsilon$ (p. 52)
> Given target $0<\varepsilon'<1$ and $\delta'>0$, to ensure $(\varepsilon',k\delta+\delta')$ cumulative privacy loss over $k$ mechanisms, it suffices that each is $(\varepsilon,\delta)$-DP with
> $$\varepsilon=\frac{\varepsilon'}{2\sqrt{2k\ln(1/\delta')}}.$$
^cor-per-mechanism-epsilon

*Proof (p. 52).* By Thm. 3.20 the composition is $(\varepsilon^*,k\delta+\delta')$ with $\varepsilon^*=\sqrt{2k\ln(1/\delta')}\varepsilon+k\varepsilon^2$ (the printed proof writes the second term as $k\varepsilon^2$, simplifying $k\varepsilon(e^{\varepsilon}-1)$; for $\varepsilon\le1$ one has $e^{\varepsilon}-1\le(e-1)\varepsilon\le1.72\varepsilon$, and the first term equals $\varepsilon'/2$ while the second is at most $0.22\,\varepsilon'^2/\ln(1/\delta')\le\varepsilon'/2$ for $\varepsilon'<1$ and $\delta'\le0.65$, so $\varepsilon^*\le\varepsilon'$ still holds). "When one cares about optimizing constants... $\varepsilon$ can be set more tightly by appealing directly to the composition theorem."

> [!example] Example 3.7 - Bob's lifetime (p. 52)
> **Setup.** Over a lifetime Bob is in $k=10{,}000$ databases, each $(\varepsilon_0,0)$-DP, with no coordination among administrators. **Question.** What $\varepsilon_0$ keeps cumulative privacy loss at most $\varepsilon=1$ with probability at least $1-e^{-32}$? **Solution as printed.** Take $\delta'=e^{-32}$; then $\sqrt{2k\ln(1/\delta')}=\sqrt{2\cdot10^4\cdot32}=800$, and Theorem 3.20 "says" $\varepsilon_0\le1/801$. **Interpretation.** Essentially optimal against an arbitrary adversary when there is no coordination among databases. *Own check:* plugging $\varepsilon_0=1/801$ into the full formula gives $\varepsilon'=800/801+10^4(1/801)(e^{1/801}-1)\approx1.014$, slightly above 1; solving $800\varepsilon_0+10^4\varepsilon_0(e^{\varepsilon_0}-1)=1$ gives $\varepsilon_0\approx1/812.3$. The printed $1/801$ keeps only the leading $\sqrt{k}$ term. Corollary 3.21's conservative choice is $1/1600$.
^ex-bobs-lifetime

**How many queries?** For fixed $\varepsilon,\delta$, Theorem 3.20 allows close to $n^2$ counting queries with non-trivial accuracy (error $o(n)$) on a database of size $n$, and close to $n$ queries with noise $o(\sqrt n)$, below the sampling error. By coordinating noise one can do dramatically better (even exponentially many queries, Ch. 4), and without coordination the advanced-composition bound is almost tight (Dwork, Naor, Vadhan).

### Laplace versus Gauss (Sec. 3.5.3, pp. 53-54)

> [!definition] Definition 3.8 - $\ell_2$-sensitivity (p. 53)
> $\Delta_2(f)=\max_{x,y\in\mathbb{N}^{|\mathcal{X}|},\ \|x-y\|_1=1}\|f(x)-f(y)\|_2$. The Gaussian mechanism with parameter $b$ adds zero-mean Gaussian noise with variance $b$ (the book's wording; read as $\sigma\ge$ the bound below) in each of $k$ coordinates.
^def-l2-sensitivity

> [!theorem] Theorem 3.22 - Gaussian mechanism (p. 53)
> Let $\varepsilon\in(0,1)$ be arbitrary. For $c^2>2\ln(1.25/\delta)$, the Gaussian mechanism with parameter $\sigma\ge c\,\Delta_2(f)/\varepsilon$ is $(\varepsilon,\delta)$-differentially private. (Proved in Appendix A, outside this capture.)
^thm-gaussian-mechanism

Advantages of Gaussian noise: it is the same type as other noise sources; the sum of Gaussians is Gaussian, so the effect on statistical analysis is easier to understand and correct for. The two mechanisms give the same cumulative loss under composition, so although each Gaussian release has a weaker guarantee, the cumulative effects are comparable; if $\delta$ is sufficiently (subpolynomially) small, "in practice we will never experience the weakness of the guarantee." **Theoretical disadvantage:** Report Noisy Max with Laplace noise is $(\varepsilon,0)$-DP independent of the number of candidates when all scores are equal on neighbouring databases. With Gaussian noise and a number of candidates large compared to $1/\delta$, the max selects exactly the events with large Gaussian noise (probability less than $\delta$), far out on the tail where the $e^{\pm\varepsilon}$ guarantee no longer holds.

### Remarks on composition (Sec. 3.5.4, pp. 54-55)

- **Weak quantification.** With the adversary choosing $x_i^0$ with Bob's data and $x_i^1$ without, the adversary has little advantage determining $b$. But this is weak quantification: the adversary is unlikely to distinguish reality from *any given* alternative, not from *all* alternatives simultaneously. If there are a zillion databases and Bob is in 10,000, we are not simultaneously protecting Bob's absence from all the others (analogous to the quantification in $(\varepsilon,\delta)$-DP where a pair of neighbours is fixed in advance).
- **Humans and ghosts.** Intuitively an $(\varepsilon,0)$-DP database with few bits per record is less protective than one with the same $\varepsilon$ containing our whole medical history. The composition theorems resolve this: imagine beings (humans have records in databases; ghosts have none) who otherwise behave identically. The adversary has 50 years to decide whether a 50-year-old target is a ghost or human: it can enrol patients, populate databases, expose the target to chemicals, and know every database the target would appear in. The composition theorems say the guarantee of each database, regardless of data type, complexity or sensitivity, gives comparable protection for the human/ghost bit.

## Examples

**Basic vs advanced composition (own computation, $\delta'=10^{-6}$, $\delta=0$).**

| $k$ | per-query $\varepsilon$ | basic $k\varepsilon$ | advanced $\varepsilon'$ |
|---|---|---|---|
| 10 | 0.1 | 1.0 | 1.77 |
| 100 | 0.1 | 10.0 | 6.31 |
| 1000 | 0.1 | 100.0 | 27.1 |
| 100 | 0.01 | 1.0 | 0.54 |
| 10,000 | 0.01 | 100.0 | 6.26 |

Advanced composition is *worse* than basic for small $k$ or large $\varepsilon$ (first row) because of the $\sqrt{2k\ln(1/\delta')}$ constant, and wins once $k\gtrsim2\ln(1/\delta')$ with small per-query $\varepsilon$; use the smaller of the two valid bounds.

```python
import math
def advanced(k, eps, delta_prime):
    return math.sqrt(2*k*math.log(1/delta_prime))*eps + k*eps*(math.exp(eps)-1)

def per_query_eps(k, target_eps, delta_prime, tol=1e-12):
    """Largest eps with advanced(k, eps, delta_prime) <= target_eps (bisection)."""
    lo, hi = 0.0, target_eps
    while hi - lo > tol:
        mid = (lo+hi)/2
        if advanced(k, mid, delta_prime) <= target_eps: lo = mid
        else: hi = mid
    return lo

k, dp = 10_000, math.exp(-32)
print(1/per_query_eps(k, 1.0, dp))      # 812.3 (Example 3.7: printed 1/801 is the leading-term approximation)
print(advanced(k, 1/801, dp))           # 1.0143

# Gaussian mechanism calibration (Thm 3.22): eps in (0,1), L2 sensitivity 1
eps, delta = 0.5, 1e-5
sigma = math.sqrt(2*math.log(1.25/delta)) / eps
print(sigma)                            # about 9.69
```

## Connections

- **Marketing measurement.** A reporting programme with many weekly or daily cuts of the same users composes. Under basic composition 365 daily reports at $\varepsilon=0.01$ cost $3.65$; with advanced composition ($\delta'=10^{-6}$) about $\sqrt{2\cdot365\cdot13.8}\cdot0.01+365\cdot0.01\cdot0.01\approx1.0+0.04=1.04$. The accounting method can change the usable noise level by a factor of three or more, so ask which composition theorem a platform's stated $\varepsilon$ uses.
- Gaussian noise is attractive for downstream Bayesian models because it is conjugate to Gaussian likelihoods ([[Gaussian Distributions and Algebra]]): DP noise adds a known variance term to the observation model.
- "Humans and ghosts": the guarantee is per *person across all databases*, which is the relevant protection for users appearing in many advertiser and platform datasets ([[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]).

## See Also

- [[Dwork Roth 2014 - Basic Composition and Divergence Tools]]
- [[Dwork Roth 2014 - Sparse Vector Technique]]
- [[Dwork 2006 - Sensitivity in General Metric Spaces]] (original mention of $L_2$ sensitivity and Gaussian noise)
- [[Mironov 2017 - Renyi Differential Privacy - Overview]] and [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]] (tighter composition accounting than Thm. 3.20)
