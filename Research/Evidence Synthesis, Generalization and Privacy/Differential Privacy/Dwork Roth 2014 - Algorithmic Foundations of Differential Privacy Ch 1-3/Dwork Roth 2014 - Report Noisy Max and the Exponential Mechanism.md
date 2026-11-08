---
title: "Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 3.3 (Examples 3.3-3.4, Report Noisy Max, Claim 3.9, pp. 34-37); Sec. 3.4 The exponential mechanism (Def. 3.4, Thm. 3.10-3.13, Cor. 3.12, Examples 3.5-3.6, Remark 3.1, pp. 37-41)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Laplace Mechanism]]"
used_by:
  - "[[Dwork Roth 2014 - Sparse Vector Technique]]"
aliases:
  - Report Noisy Max (Dwork Roth)
  - Exponential mechanism (Dwork Roth Ch 3)
  - Gumbel max trick (Dwork Roth Remark 3.1)
  - Differentially private selection
---

# Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism

> [!summary]
> Two ways to privately *select* the best item from a discrete set. **Report Noisy Max** adds $\mathrm{Lap}(1/\varepsilon)$ to each of $m$ counts and returns only the argmax index: $(\varepsilon,0)$-DP though the count vector has sensitivity $m$. The **exponential mechanism** samples $r$ with probability $\propto\exp(\varepsilon u(x,r)/2\Delta u)$ for an arbitrary utility $u$: $(\varepsilon,0)$-DP, and with high probability the chosen element's utility is within $O\big(\frac{\Delta u}{\varepsilon}\ln|R|\big)$ of optimal. Instantiating noisy max with Gumbel noise reproduces the exponential mechanism exactly.

## Overview

"Differentially private selection": the space of outcomes is discrete and the task is to produce a "best" answer. Adding noise directly to the *value* is wrong when value and utility are not on a common scale (pricing, structured outputs), and releasing all noisy counts wastes budget. The principle at work in Report Noisy Max is **information minimization**: release only the index of the winner, not the noisy counts.

## Main Content

### Report Noisy Max (pp. 34-37)

> [!example] Example 3.4 - Most common medical condition (p. 35)
> **Setup.** Which of $m$ conditions is (approximately) most common in respondents' medical histories? For each condition, query whether each individual has ever received the diagnosis. An individual can have many conditions, so the vector of $m$ counts has high sensitivity ($\Delta f=m$). **Solution.** Add $\mathrm{Lap}(1/\varepsilon)$ noise to *each* count and publish only the index of the maximum (the noisy counts are not released; the "winning" count can be released at no extra privacy cost). The noise scale $1/\varepsilon$ is independent of $m$.
^ex-most-common-condition

> [!definition] Report Noisy Max
> Given $m$ counting queries: add independent $\mathrm{Lap}(1/\varepsilon)$ noise to each count and return the index of the largest noisy count (ties ignored).
^def-report-noisy-max

> [!theorem] Claim 3.9 (p. 35)
> Report Noisy Max is $(\varepsilon,0)$-differentially private.
^thm-report-noisy-max

> [!proof]- Proof (pp. 35-37)
> Let $D=D_0\cup\{a\}$; let $c$ and $c'$ be the count vectors on $D$ and $D_0$. Two properties: (1) *Monotonicity of counts*: $c_j\ge c'_j$ for all $j$; (2) *Lipschitz*: $1+c'_j\ge c_j$ for all $j$. Fix $i\in[m]$ and fix $r_{-i}$, a draw from $[\mathrm{Lap}(1/\varepsilon)]^{m-1}$ for all coordinates except $i$; argue for each $r_{-i}$ separately.
>
> *Upper bound.* Define $r^*=\min r_i$ such that $c_i+r_i>c_j+r_j$ for all $j\ne i$. On $D$, $i$ wins iff $r_i\ge r^*$. For every $j\ne i$: $c_i+r^*>c_j+r_j$ implies $(1+c'_i)+r^*\ge c_i+r^*>c_j+r_j\ge c'_j+r_j$, so $c'_i+(r^*+1)>c'_j+r_j$. Hence if $r_i\ge r^*+1$, $i$ wins on $D'$. Therefore
> $$\Pr[i\mid D',r_{-i}]\ge\Pr[r_i\ge1+r^*]\ge e^{-\varepsilon}\Pr[r_i\ge r^*]=e^{-\varepsilon}\Pr[i\mid D,r_{-i}].$$
>
> *Lower bound.* Define $r^*=\min r_i$ such that $c'_i+r_i>c'_j+r_j$ for all $j\ne i$ (winning threshold on $D'$). Then $1+c'_i+r^*>1+c'_j+r_j$ gives $c_i+(r^*+1)\ge c'_i+(r^*+1)>(1+c'_j)+r_j\ge c_j+r_j$ so $i$ wins on $D$ if $r_i\ge r^*+1$, and $\Pr[i\mid D,r_{-i}]\ge e^{-\varepsilon}\Pr[i\mid D',r_{-i}]$. Multiply through by $e^{\varepsilon}$ in both directions and integrate over $r_{-i}$.

### The exponential mechanism (Sec. 3.4, pp. 37-41)

**Motivation.** Designed for situations where adding noise directly to the computed quantity "can completely destroy its value", for example setting a price in an auction.

> [!example] Example 3.5 - Pumpkins (p. 37)
> **Setup.** An abundant supply of pumpkins and four bidders A, F, I, K; A, F, I each bid $\$1.00$ and K bids $\$3.01$. "What is the optimal price?" The text states: at $\$3.01$ revenue is $\$3.01$; at $\$3.00$ and at $\$1.00$ revenue is $\$3.00$; at $\$3.02$ the revenue is zero. **Lesson.** Adding a small amount of positive noise to the optimal price can drive revenue to zero, so noise must be added to the *choice* via a utility function, not to the optimal value. *Arithmetic caveat (own check):* revenue at a price $p$ is $p\times\#\{\text{bids}\ge p\}$; at $\$1.00$ all four bidders buy, giving $\$4.00$, which is the true revenue maximiser; the text's "$\$3.00$ at $\$1.00$" appears to be a slip. The fragility at $\$3.02$ (zero revenue) is unaffected.
^ex-pumpkins

> [!definition] Definition 3.4 - Exponential mechanism (pp. 37-38)
> Given a range $R$ and a utility function $u:\mathbb{N}^{|\mathcal{X}|}\times R\to\mathbb{R}$ mapping database/output pairs to scores, define the sensitivity of $u$ with respect to its database argument (it may be arbitrarily sensitive in $r$):
> $$\Delta u\equiv\max_{r\in R}\ \max_{x,y:\|x-y\|_1\le1}|u(x,r)-u(y,r)|.$$
> The exponential mechanism $\mathcal{M}_E(x,u,R)$ selects and outputs $r\in R$ with probability proportional to $\exp\!\big(\frac{\varepsilon u(x,r)}{2\Delta u}\big)$.
^def-exponential-mechanism

*Why the factor 2.* The naive privacy loss is $\ln\frac{\exp(\varepsilon u(x,r)/\Delta u)}{\exp(\varepsilon u(y,r)/\Delta u)}=\varepsilon[u(x,r)-u(y,r)]/\Delta u\le\varepsilon$, but this overlooks the normalisation term, which can change when one person raises some utilities and lowers others. The actual mechanism reserves half the privacy budget for the normaliser. The range $R$ must be independent of the data (pumpkins: the price grid must not depend on actual bids, else some price has non-zero weight on one database and zero on a neighbour). The mechanism may be infeasible to implement if $R$ is super-polynomially large.

> [!theorem] Theorem 3.10 (pp. 38-39)
> The exponential mechanism preserves $(\varepsilon,0)$-differential privacy.
^thm-exponential-dp

> [!proof]- Proof (pp. 38-39; finite $R$, not necessary)
> For neighbours $x,y$ and $r\in R$:
> $$\frac{\Pr[\mathcal{M}_E(x,u,R)=r]}{\Pr[\mathcal{M}_E(y,u,R)=r]}=\frac{\exp\!\big(\frac{\varepsilon u(x,r)}{2\Delta u}\big)}{\exp\!\big(\frac{\varepsilon u(y,r)}{2\Delta u}\big)}\cdot\frac{\sum_{r'}\exp\!\big(\frac{\varepsilon u(y,r')}{2\Delta u}\big)}{\sum_{r'}\exp\!\big(\frac{\varepsilon u(x,r')}{2\Delta u}\big)}=\exp\!\Big(\frac{\varepsilon(u(x,r)-u(y,r))}{2\Delta u}\Big)\cdot\frac{\sum_{r'}\exp(\frac{\varepsilon u(y,r')}{2\Delta u})}{\sum_{r'}\exp(\frac{\varepsilon u(x,r')}{2\Delta u})}\le\exp\!\Big(\frac\varepsilon2\Big)\exp\!\Big(\frac\varepsilon2\Big)\cdot1=e^{\varepsilon}.$$
> The first factor is at most $e^{\varepsilon/2}$ since $|u(x,r)-u(y,r)|\le\Delta u$. In the sum ratio, each term $\exp(\varepsilon u(y,r')/2\Delta u)\le\exp(\varepsilon/2)\exp(\varepsilon u(x,r')/2\Delta u)$, giving the other $e^{\varepsilon/2}$. The ratio $\ge e^{-\varepsilon}$ follows by symmetry.

> [!theorem] Theorem 3.11 - Utility of the exponential mechanism (pp. 39-40)
> Fix a database $x$ and let $R_{\mathrm{OPT}}=\{r\in R:u(x,r)=\mathrm{OPT}_u(x)\}$ with $\mathrm{OPT}_u(x)=\max_{r\in R}u(x,r)$. Then
> $$\Pr\!\left[u(\mathcal{M}_E(x,u,R))\le\mathrm{OPT}_u(x)-\frac{2\Delta u}{\varepsilon}\Big(\ln\frac{|R|}{|R_{\mathrm{OPT}}|}+t\Big)\right]\le e^{-t}.$$
^thm-exponential-utility

> [!proof]- Proof (p. 40)
> Each $r$ with $u(x,r)\le c$ has unnormalised mass at most $\exp(\varepsilon c/2\Delta u)$, so the "bad" set has total unnormalised mass at most $|R|\exp(\varepsilon c/2\Delta u)$. At least $|R_{\mathrm{OPT}}|\ge1$ elements have mass $\exp(\varepsilon\,\mathrm{OPT}_u(x)/2\Delta u)$, a lower bound on the normaliser. Hence $\Pr[u(\mathcal{M}_E)\le c]\le\frac{|R|}{|R_{\mathrm{OPT}}|}\exp\!\big(\frac{\varepsilon(c-\mathrm{OPT}_u(x))}{2\Delta u}\big)$; plug in $c=\mathrm{OPT}-\frac{2\Delta u}{\varepsilon}(\ln\frac{|R|}{|R_{\mathrm{OPT}}|}+t)$.

> [!theorem] Corollary 3.12 (p. 40)
> Since $|R_{\mathrm{OPT}}|\ge1$: $\Pr\!\big[u(\mathcal{M}_E(x,u,R))\le\mathrm{OPT}_u(x)-\frac{2\Delta u}{\varepsilon}(\ln|R|+t)\big]\le e^{-t}$. The returned element is inferior to optimal by more than an additive $O\big(\frac{\Delta u}{\varepsilon}\ln|R|\big)$ with only exponentially small probability.
^cor-exponential-utility

> [!example] Example 3.6 - Best of two (pp. 40-41)
> **Setup.** Which of two conditions is more common? True counts are $0$ for condition A and $c>0$ for B. Utility is the count, $\Delta u=1$. **Exponential mechanism.** Corollary 3.12 gives $\Pr[\text{outcome A}]\le2e^{-c\varepsilon/(2\Delta u)}=2e^{-c\varepsilon/2}$. **Report Noisy Max** is harder to analyse (it needs the probability-$1/4$ case where A's noise is positive and B's is negative). **One-sided variant.** Add one-sided exponential noise with parameter $\varepsilon/\Delta u$ (monotonic utility) or $\varepsilon/2\Delta u$ (non-monotone) and report the argmax; then A is exponentially less likely than B in $c\varepsilon/\Delta u=c\varepsilon$.
^ex-best-of-two

> [!theorem] Theorem 3.13 (p. 41)
> Report One-Sided Noisy Arg-Max, run with parameter $\varepsilon/2\Delta u$, is $\varepsilon$-differentially private. (Proof "almost identical" to Report Noisy Max, losing a factor of 2 when the utility is not monotonic. A utility is *monotonic* if adding an element cannot decrease it, as with counting queries or revenue from a fixed price.)
^thm-one-sided-noisy-argmax

> [!remark] Remark 3.1 - Gumbel max trick (p. 41)
> Report noisy max with Laplace or exponential noise has guarantees similar to the exponential mechanism but yields distinct distributions. Instantiating it with **Gumbel** noise samples *exactly* from the exponential-mechanism distribution (folklore in machine learning).
^rem-gumbel-max

## Examples

**Pumpkin pricing by the exponential mechanism (own simulation).** Price grid $\{0.00,0.01,\dots,5.00\}$ (data independent), utility = revenue, $\Delta u=5$ (the maximum price: adding one bidder can add at most the price). The true optimum is revenue $\$4.00$ at price $\$1.00$.

| $\varepsilon$ | mean revenue of sampled price | $P(\text{price}>\$3.01)$ (revenue zero) |
|---|---|---|
| 0.5 | 1.27 | 0.37 |
| 2 | 1.49 | 0.30 |
| 10 | 2.51 | 0.06 |

With only four bidders and $\Delta u=5$ the privacy-utility trade-off is harsh, since one bidder can swing revenue by up to the whole price range; accuracy improves with more bidders. **Best-of-two numerics.** With $c=20$, $\varepsilon=0.5$ the exponential-mechanism bound is $2e^{-5}\approx0.0135$; a Monte Carlo of Report Noisy Max with Laplace noise gives an error probability near $10^{-4}$ (much smaller than the loose bound); one-sided exponential noise gives $\tfrac12e^{-c\varepsilon}=2.3\times10^{-5}$, matching simulation ($2.5\times10^{-5}$).

```python
import numpy as np
rng = np.random.default_rng(0)

def exponential_mechanism(utilities, eps, sensitivity, rng=rng):
    """Sample index i with prob proportional to exp(eps*u_i/(2*sensitivity))."""
    logits = eps * np.asarray(utilities, float) / (2 * sensitivity)
    p = np.exp(logits - logits.max()); p /= p.sum()
    return rng.choice(len(p), p=p)

def exponential_mechanism_gumbel(utilities, eps, sensitivity, rng=rng):
    """Same distribution via report-noisy-max with Gumbel noise (Remark 3.1)."""
    scores = eps * np.asarray(utilities, float) / (2 * sensitivity) + rng.gumbel(size=len(utilities))
    return int(np.argmax(scores))

def report_noisy_max(counts, eps, rng=rng):
    return int(np.argmax(np.asarray(counts, float) + rng.laplace(0, 1/eps, len(counts))))

u = np.array([0, 3, 10, 10.5, 2])
a = np.bincount([exponential_mechanism(u, 1.0, 1.0) for _ in range(50_000)], minlength=5) / 50_000
b = np.bincount([exponential_mechanism_gumbel(u, 1.0, 1.0) for _ in range(50_000)], minlength=5) / 50_000
print(a.round(3), b.round(3))        # the two empirical distributions agree
```

## Connections

- **Marketing measurement.** Choosing the top-performing creative, geo or channel from many candidates without publishing every score is differentially private selection; the winner can be released at cost $\varepsilon$ regardless of the number of candidates, while releasing all scores would cost sensitivity-$m$ noise. Compare the winner's-curse problem: a naive "best of $m$" estimate is biased upward ([[Multiple Testing Corrections]]); privatising the selection adds noise but the selection bias remains if the winning noisy value is reported.
- The pumpkin example is the pricing analogue of budget optimisation: noise on the *decision* (via utility) is safer than noise on an optimum that is brittle.

## See Also

- [[Dwork Roth 2014 - Laplace Mechanism]]
- [[Dwork Roth 2014 - Sparse Vector Technique]] (selection among a stream of queries)
- [[Dwork 2006 - Sensitivity in General Metric Spaces]] (precursor of the exponential mechanism)
- [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] (statistical accuracy of the exponential mechanism for density estimation)
