---
title: "Dwork Roth 2014 - Sparse Vector Technique"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 3.6 The sparse vector technique: Algorithms 1-3, Thm. 3.23-3.28, Def. 3.9-3.10, pp. 55-64; Sec. 3.7 Bibliographic notes, pp. 64-65"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Laplace Mechanism]]"
  - "[[Dwork Roth 2014 - Basic Composition and Divergence Tools]]"
  - "[[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]"
used_by: []
aliases:
  - Sparse vector technique (Dwork Roth)
  - AboveThreshold algorithm
  - NumericSparse algorithm
  - Sparse vector privacy cost only for above-threshold queries
---

# Dwork Roth 2014 - Sparse Vector Technique

> [!summary]
> When a long (possibly adaptive) stream of sensitivity-1 queries must be monitored but only a few exceed a public threshold $T$, the sparse vector technique answers "above/below" at privacy cost that depends only on the number $c$ of above-threshold queries, not the stream length. **AboveThreshold** (halts after one hit) is $(\varepsilon,0)$-DP with noisy threshold $\mathrm{Lap}(2/\varepsilon)$ and per-query noise $\mathrm{Lap}(4/\varepsilon)$; **Sparse** restarts it $c$ times, using composition; **NumericSparse** also releases noisy values. Accuracy is $O\big(c(\ln k+\ln(c/\beta))/\varepsilon\big)$ for $\delta=0$, matching Laplace answers to the $c$ big queries up to a $\log k$ factor.

## Overview

Independent perturbation of $m$ queries makes privacy degrade proportionally to $m$ (or $\sqrt m$ with advanced composition). If we only care about *which* queries lie above a threshold, we can "discard the numeric answer to queries that lie significantly below the threshold, and merely report that they do indeed lie below". The technique is simple (add noise, report whether the noisy value exceeds the threshold) and "our emphasis is on the analysis, showing that privacy degrades only with the number of queries which actually lie above the threshold". It is an online mechanism; the non-interactive analogue is to iterate Report Noisy Max or the exponential mechanism.

**Setting.** $m$ sensitivity-1 queries (possibly adaptive), one public threshold $T$ (per-query thresholds change nothing), a small number $c$ of expected above-threshold queries. The algorithm works with a *noisy* threshold $\hat T$; $T$ is public but $\hat T$ is not.

## Main Content

> [!definition] Algorithm 1 - AboveThreshold$(D,\{f_i\},T,\varepsilon)$ (p. 57)
> ```
> T_hat = T + Lap(2/eps)
> for each query i:
>     nu_i = Lap(4/eps)
>     if f_i(D) + nu_i >= T_hat:  output a_i = TOP; halt
>     else:                       output a_i = BOTTOM
> ```
> Input: private database $D$, adaptively chosen stream of sensitivity-1 queries $f_1,\dots$, threshold $T$. Output: stream of responses.
^def-above-threshold

> [!theorem] Theorem 3.23 (p. 57)
> AboveThreshold is $(\varepsilon,0)$-differentially private, *no matter how long the stream is*.
^thm-above-threshold-dp

> [!proof]- Proof (pp. 57-58)
> Fix neighbours $D,D'$. Let $A,A'$ be the outputs on $D,D'$; an output has the form $a\in\{\top,\bot\}^k$ with $a_i=\bot$ for $i<k$ and $a_k=\top$. Internal randomness: the noisy threshold $\hat T$ and perturbations $\{\nu_i\}$. Fix $\nu_1,\dots,\nu_{k-1}$ and take probabilities over $\nu_k$ and $\hat T$. Let $g(D)=\max_{i<k}(f_i(D)+\nu_i)$, now deterministic. Then
> $$\Pr[A=a]=\Pr_{\hat T,\nu_k}[\hat T>g(D)\ \text{and}\ f_k(D)+\nu_k\ge\hat T]=\Pr[\hat T\in(g(D),f_k(D)+\nu_k]]=\iint\Pr[\nu_k=v]\Pr[\hat T=t]\mathbf{1}[t\in(g(D),f_k(D)+v]]\,dv\,dt.$$
> Change variables $\hat v=v+g(D)-g(D')+f_k(D')-f_k(D)$ and $\hat t=t+g(D)-g(D')$. Since each $f_i$ is 1-sensitive, so is $g$, hence $|\hat v-v|\le2$ and $|\hat t-t|\le1$. Under this shift the indicator maps to the same event on $D'$: $t\in(g(D'),f_k(D')+v]$. Because the Laplace densities have scales $4/\varepsilon$ and $2/\varepsilon$, shifting $\nu_k$ by at most $2$ costs a factor $\exp(\varepsilon/2)$ and shifting $\hat T$ by at most $1$ costs $\exp(\varepsilon/2)$. Therefore $\Pr[A=a]\le\exp(\varepsilon/2)\exp(\varepsilon/2)\Pr[A'=a]=e^{\varepsilon}\Pr[A'=a]$. (Proof due to Salil Vadhan.)

> [!definition] Definition 3.9 - $(\alpha,\beta)$-accuracy (pp. 58-59)
> A stream-answering algorithm outputting $a_1,\dots\in\{\top,\bot\}^*$ for queries $f_1,\dots,f_k$ is **$(\alpha,\beta)$-accurate** w.r.t. threshold $T$ if, except with probability at most $\beta$, it does not halt before $f_k$ and for all $a_i=\top$: $f_i(D)\ge T-\alpha$ and for all $a_i=\bot$: $f_i(D)\le T+\alpha$.
^def-svt-accuracy

*What can go wrong:* $\hat T$ may be far from $T$; a small count may get large noise and be reported above; a large count may get negative noise and be reported below. Each happens with probability exponentially small in $\alpha$, so $\alpha/2$ is allocated to threshold error and $\alpha/2$ to query noise.

> [!theorem] Theorem 3.24 (p. 59)
> For any sequence of $k$ queries $f_1,\dots,f_k$ with $|\{i<k:f_i(D)\ge T-\alpha\}|=0$ (the only query near or above the threshold is possibly the last), AboveThreshold$(D,\{f_i\},T,\varepsilon)$ is $(\alpha,\beta)$-accurate for
> $$\alpha=\frac{8(\ln k+\ln(2/\beta))}{\varepsilon}.$$
^thm-above-threshold-accuracy

> [!proof]- Proof (pp. 59-60)
> It suffices to show that except with probability $\beta$: $\max_i|\nu_i|+|T-\hat T|\le\alpha$. Then for $a_i=\top$: $f_i(D)+\nu_i\ge\hat T\ge T-|T-\hat T|$, so $f_i(D)\ge T-|T-\hat T|-|\nu_i|\ge T-\alpha$; for $a_i=\bot$: $f_i(D)<\hat T\le T+|T-\hat T|+|\nu_i|\le T+\alpha$; and for $i<k$ with $f_i(D)<T-\alpha<T-|\nu_i|-|T-\hat T|$, $f_i(D)+\nu_i\le\hat T$ so $a_i=\bot$ and the algorithm does not halt early. With $\Pr[|Y|\ge tb]=e^{-t}$: $\Pr[|T-\hat T|\ge\alpha/2]=\exp(-\alpha\varepsilon/4)\le\beta/2$ requires $\alpha\ge4\ln(2/\beta)/\varepsilon$; and by a union bound $\Pr[\max_i|\nu_i|\ge\alpha/2]\le k\exp(-\alpha\varepsilon/8)\le\beta/2$ requires $\alpha\ge8(\ln k+\ln(2/\beta))/\varepsilon$. The second dominates.

### Multiple above-threshold queries: Sparse

> [!definition] Algorithm 2 - Sparse$(D,\{f_i\},T,c,\varepsilon,\delta)$ (p. 61)
> ```
> if delta == 0:  sigma = 2c/eps
> else:           sigma = sqrt(32 c ln(1/delta)) / eps
> T_hat_0 = T + Lap(sigma);  count = 0
> for each query i:
>     nu_i = Lap(2*sigma)
>     if f_i(D) + nu_i >= T_hat_count:
>         output TOP; count += 1; T_hat_count = T + Lap(sigma)
>     else: output BOTTOM
>     if count >= c: halt
> ```
^def-sparse

> [!theorem] Theorem 3.25 (pp. 60-61)
> Sparse is $(\varepsilon,\delta)$-differentially private.
^thm-sparse-dp

> [!proof]- Proof (pp. 60-61)
> Sparse is exactly equivalent to running AboveThreshold$(D,\{f_i\},T,\varepsilon')$ on the stream, restarting it on the remaining stream each time it halts, $c$ times in total, with $\varepsilon'=\varepsilon/c$ if $\delta=0$ and $\varepsilon'=\varepsilon/\sqrt{8c\ln(1/\delta)}$ otherwise. (Check: AboveThreshold's noisy-threshold scale $2/\varepsilon'$ equals $2c/\varepsilon=\sigma$ in the first case and $2\sqrt{8c\ln(1/\delta)}/\varepsilon=\sqrt{32c\ln(1/\delta)}/\varepsilon=\sigma$ in the second.) Each run is $(\varepsilon',0)$-DP by Thm. 3.23. By basic composition $c$ runs with $\varepsilon'=\varepsilon/c$ are $(\varepsilon,0)$-DP; by advanced composition (Thm. 3.20) $c$ runs with $\varepsilon'=\varepsilon/\sqrt{8c\ln(1/\delta)}$ are $(\varepsilon,\delta)$-DP.

> [!theorem] Theorem 3.26 (p. 62)
> For any $k$ queries with $L(T)\equiv|\{i:f_i(D)\ge T-\alpha\}|\le c$, Sparse is $(\alpha,\beta)$-accurate for
> $$\alpha=\frac{(\ln k+\ln\frac{2c}{\beta})\sqrt{512\,c\ln\frac1\delta}}{\varepsilon}\ \ (\delta>0),\qquad\alpha=\frac{8c(\ln k+\ln\frac{2c}{\beta})}{\varepsilon}\ \ (\delta=0).$$
^thm-sparse-accuracy

*Proof (p. 62).* Sparse consists of $c$ calls of AboveThreshold; if each call is $(\alpha,\beta/c)$-accurate then Sparse is $(\alpha,\beta)$-accurate. Apply Thm. 3.24 with $\beta/c$ and $\varepsilon'$ equal to $\varepsilon/\sqrt{8c\ln(1/\delta)}$ or $\varepsilon/c$.

### Releasing the values: NumericSparse

> [!definition] Algorithm 3 - NumericSparse$(D,\{f_i\},T,c,\varepsilon,\delta)$ (p. 63)
> Like Sparse, but when a query is above threshold it outputs $a_i=f_i(D)+\upsilon_i$ with $\upsilon_i\sim\mathrm{Lap}(\sigma(\varepsilon_2))$, where the budget is split as: if $\delta=0$, $\varepsilon_1=\tfrac89\varepsilon$, $\varepsilon_2=\tfrac29\varepsilon$; else $\varepsilon_1=\frac{\sqrt{512}}{\sqrt{512}+1}\varepsilon$, $\varepsilon_2=\frac{2}{\sqrt{512}+1}\varepsilon$; and $\sigma(\varepsilon)=\frac{2c}{\varepsilon}$ if $\delta=0$, else $\sigma(\varepsilon)=\frac{\sqrt{32c\ln(2/\delta)}}{\varepsilon}$. Thresholds and per-query noise use $\sigma(\varepsilon_1)$ (noisy threshold $\mathrm{Lap}(\sigma(\varepsilon_1))$, query noise $\mathrm{Lap}(2\sigma(\varepsilon_1))$). Outputs $\perp$ otherwise.
^def-numeric-sparse

> [!theorem] Theorem 3.27 (p. 62)
> NumericSparse is $(\varepsilon,\delta)$-differentially private.
^thm-numeric-sparse-dp

*Proof (p. 62).* If $\delta=0$, NumericSparse is the adaptive composition of Sparse$(D,\{f_i\},T,c,\tfrac89\varepsilon,0)$ with the Laplace mechanism at privacy parameters $(\tfrac19\varepsilon,0)$ (answering the $c$ released values, noise scale $9c/\varepsilon=\sigma(\varepsilon_2)$). If $\delta>0$ it is the composition of Sparse$(D,\{f_i\},T,c,\frac{\sqrt{512}}{\sqrt{512}+1}\varepsilon,\delta/2)$ with the Laplace mechanism at $(\frac{1}{\sqrt{512}+1}\varepsilon,\delta/2)$. Privacy follows by simple composition.

> [!definition] Definition 3.10 - Numeric accuracy (p. 63)
> For answers in $(\mathbb{R}\cup\{\bot\})^*$: $(\alpha,\beta)$-accurate w.r.t. $T$ if, except with probability at most $\beta$, the algorithm does not halt before $f_k$, for all $a_i\in\mathbb{R}$: $|f_i(D)-a_i|\le\alpha$, and for all $a_i=\bot$: $f_i(D)\le T+\alpha$.
^def-numeric-accuracy

> [!theorem] Theorem 3.28 (pp. 63-64)
> For any $k$ queries with $L(T)\equiv|\{i:f_i(D)\ge T-\alpha\}|\le c$, NumericSparse is $(\alpha,\beta)$-accurate for
> $$\alpha=\frac{(\ln k+\ln\frac{4c}{\beta})\sqrt{c\ln\frac2\delta}\,(\sqrt{512}+1)}{\varepsilon}\ \ (\delta>0),\qquad\alpha=\frac{9c(\ln k+\ln\frac{4c}{\beta})}{\varepsilon}\ \ (\delta=0).$$
^thm-numeric-sparse-accuracy

*Proof (p. 64).* Two conditions: (i) for $a_i=\bot$, $f_i(D)\le T+\alpha$, holding with probability $1-\beta/2$ by the accuracy of Sparse; (ii) for $a_i\in\mathbb{R}$, $|f_i(D)-a_i|\le\alpha$, holding with probability $1-\beta/2$ by the accuracy of the Laplace mechanism.

> [!theorem] Take-away (p. 64)
> If at most $c$ of a stream of queries have answers above $T-\alpha$, those above the threshold can be answered up to error $\alpha$. This accuracy equals, up to constants and a $\log k$ factor, what one would get if the identities of the large queries were known in advance and answered by the Laplace mechanism: the technique "fish[es] out the identities of these large queries almost 'for free', paying only logarithmically for the irrelevant queries". The same guarantee could come from finding them with the exponential mechanism then answering with Laplace, but SVT is trivial to run and allows *adaptively* chosen queries.
^thm-svt-takeaway

**Bibliographic notes (Sec. 3.7, pp. 64-65).** Randomized response: Warner (1965). Laplace mechanism: Dwork et al. Exponential mechanism: McSherry and Talwar. Simple composition claimed in Dwork et al. [21], proof in Appendix B due to Dwork and Lei (McSherry and Mironov obtained a similar proof). Sections 3.5.1-3.5.2 are taken almost verbatim from Dwork, Rothblum, Vadhan; prior "evolution of confidence" arguments (Dinur, Dwork, Nissim) showed $\sqrt k$ deterioration for specific mechanisms. Near-tightness of composition without coordinated noise: Dwork, Naor, Vadhan. SVT abstracts a technique of Dwork-Naor-Reingold-Rothblum-Vadhan (indicator vectors in the proof of their Lemma 4.4) and found wide use (Roth-Roughgarden; Dwork-Naor-Pitassi-Rothblum; Hardt-Rothblum); the proof of Thm. 3.23 is due to Salil Vadhan.

## Examples

**Monitoring 1000 metrics, one anomaly (own simulation).** $k=1000$ sensitivity-1 queries with true value 0 except query 700 with value 200; threshold $T=100$; $\varepsilon=1$. Theorem 3.24 with $\beta=0.05$ gives $\alpha=8(\ln1000+\ln40)/1\approx84.8$. The theorem's condition holds because every query except the last has value $0<T-\alpha=15.2$. In 2000 runs AboveThreshold halted at query 700 every time, with no early false alarm and no miss. With $c=3$ anomalies at queries 100, 400, 800 (value 300, $T=150$, $\varepsilon=2$, $\delta=0$), Sparse returned $\top$ at exactly $[100,400,800]$ and halted after the third; $\alpha=8\cdot3(\ln1000+\ln(6/0.05))/2\approx140.3$.

```python
import numpy as np, math
rng = np.random.default_rng(0)

def above_threshold(values, T, eps, rng=rng):
    """Alg. 1. Returns index of first above-threshold query (or None)."""
    T_hat = T + rng.laplace(0, 2 / eps)
    for i, v in enumerate(values):
        if v + rng.laplace(0, 4 / eps) >= T_hat:
            return i
    return None

def sparse(values, T, c, eps, delta=0.0, rng=rng):
    """Alg. 2. Returns list of booleans (True = above threshold) until c hits."""
    sigma = 2 * c / eps if delta == 0 else math.sqrt(32 * c * math.log(1 / delta)) / eps
    T_hat, count, out = T + rng.laplace(0, sigma), 0, []
    for v in values:
        if v + rng.laplace(0, 2 * sigma) >= T_hat:
            out.append(True); count += 1; T_hat = T + rng.laplace(0, sigma)
        else:
            out.append(False)
        if count >= c:
            break
    return out

values = np.zeros(1000); hits = [100, 400, 800]; values[hits] = 300
print([i for i, b in enumerate(sparse(values, 150, 3, 2.0)) if b])   # [100, 400, 800]
```

## Connections

- **Marketing measurement.** Many measurement systems continuously monitor large panels of metrics (conversion rate by geo, spend pacing, brand lift by creative) and act only when one crosses a threshold. SVT is the DP analogue: the stream of "all clear" answers is free, and privacy is spent only when an alert fires. Practical caveat: the noisy threshold $\hat T$ is *reused* until a hit, so the false-alarm rate depends on the shared noise; choose $T$ with margin $\alpha$ and use $\varepsilon$ per alert.
- Compare multiple testing: monitoring $k$ metrics inflates false alarms by a $\ln k$ factor in $\alpha$, exactly like a Bonferroni-type correction ([[Multiple Testing Corrections]]).

## See Also

- [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]
- [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]
- [[Dwork Roth 2014 - Laplace Mechanism]]
