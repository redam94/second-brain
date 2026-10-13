---
title: "Ioannidis 2005 - Multiple Independent Teams and PPV Erosion"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - type/theorem
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, §Testing by Several Independent Teams, p. 0697; Table 3, p. 0698; Figure 2 panels and caption, p. 0699; exact monotonicity proof derived in-note"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]"
  - "[[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]"
  - "[[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]"
aliases:
  - Ioannidis Table 3
  - Ioannidis Figure 2
  - PPV with n independent studies
  - Many-teams PPV erosion
---

# Ioannidis 2005 - Multiple Independent Teams and PPV Erosion

> [!summary]
> When $n$ independent teams of equal power test the same question and attention goes to the event that *at least one* claims significance, the relevant positive rates become $1-\beta^n$ (true) and $1-(1-\alpha)^n$ (null). Table 3 then gives
> $$
> \text{PPV}_n=\frac{R(1-\beta^n)}{R+1-(1-\alpha)^n-R\beta^n}.
> $$
> This falls with $n$ (for the usual case $1-\beta>\alpha$) and tends to the pre-study probability $R/(R+1)$ as $n\to\infty$. With unequal powers, replace $\beta^n$ by $\prod_i\beta_i$. Figure 2 plots PPV against $R$ for $n$ = 1, 5, 10, 50 at power 0.80, 0.50 and 0.20. This is the formal basis of Corollary 6 ("hot fields").

## Overview

**Motivation (p. 0697).** As research globalizes, "it is practically the rule that several research teams, often dozens of them, may probe the same or similar questions." The prevailing mentality focuses on isolated discoveries by single teams, and an increasing number of questions have at least one study claiming a finding that "receives unilateral attention". The model asks: if what gets noticed is the one significant study among several, what is its PPV? Bias is not considered in this subsection.

## Main Content

> [!definition] Multiple-studies setup (p. 0697)
> $n$ independent studies of equal power $1-\beta$ and size $\alpha$ address the same relationship. A **research finding** now means at least one of the $n$ studies is significant.
> - $P(\text{at least one significant}\mid\text{true})=1-\beta^n$
> - $P(\text{at least one significant}\mid\text{null})=1-(1-\alpha)^n$
^def-n-studies

### Table 3 (p. 0698): research findings and true relationships in the presence of multiple studies

| Research finding | True relationship: Yes | True relationship: No | Total |
|---|---|---|---|
| Yes | $cR(1-\beta^n)/(R+1)$ | $c(1-[1-\alpha]^n)/(R+1)$ | $c(R+1-[1-\alpha]^n-R\beta^n)/(R+1)$ |
| No | $cR\beta^n/(R+1)$ | $c(1-\alpha)^n/(R+1)$ | $c([1-\alpha]^n+R\beta^n)/(R+1)$ |
| Total | $cR/(R+1)$ | $c/(R+1)$ | $c$ |

> [!theorem] PPV with $n$ independent studies (p. 0697)
> $$
> \text{PPV}_n=\frac{R(1-\beta^n)}{R+1-[1-\alpha]^n-R\beta^n}\quad\text{(not considering bias).}
> $$
> "With increasing number of independent studies, PPV tends to decrease, unless $1-\beta<\alpha$, i.e., typically $1-\beta<0.05$."
> **Unequal powers:** for $n$ studies with Type II rates $\beta_1,\dots,\beta_n$, replace $\beta^n$ by $\prod_{i=1}^n\beta_i$; "inferences are similar".
>
> **Limit (derived).** As $n\to\infty$, $\beta^n\to0$ and $(1-\alpha)^n\to0$, so $\text{PPV}_n\to R/(R+1)$. If enough teams look, someone almost surely finds significance whether or not the effect exists, so the existence of a significant study carries no information.
>
> **Intuition.** Post-study odds are $R\cdot\frac{1-\beta^n}{1-(1-\alpha)^n}$. The numerator saturates at 1 quickly when power is decent ($1-0.2^5\approx1$). The denominator keeps growing roughly like $n\alpha$ until it saturates. So the effective likelihood ratio of "some study was significant" shrinks from $(1-\beta)/\alpha$ toward 1. The exact result is proved below.
^thm-ppv-n

> [!theorem] Exact monotonicity of $\text{PPV}_n$ in $n$ (derived here; the paper states the result without proof)
> Let $b=\beta\in(0,1)$ and $a=1-\alpha\in(0,1)$, and let $R>0$. Then for every $n\ge1$:
> - $\text{PPV}_{n+1}<\text{PPV}_n$ **iff** $1-\beta>\alpha$ (the usual case: power exceeds size);
> - $\text{PPV}_{n+1}=\text{PPV}_n=R/(R+1)$ for all $n$ **iff** $1-\beta=\alpha$ (boundary: each study is uninformative);
> - $\text{PPV}_{n+1}>\text{PPV}_n$ **iff** $1-\beta<\alpha$ (the paper's exception, "typically $1-\beta<0.05$").
>
> In every case $\text{PPV}_n\to R/(R+1)$ as $n\to\infty$.
^thm-ppv-n-monotone

> [!proof]- Proof
> **Step 1 (reduce to a likelihood ratio).** Dividing Table 3's numerator and denominator gives $\text{PPV}_n=\dfrac{R(1-b^n)}{R(1-b^n)+(1-a^n)}=\dfrac{O_n}{1+O_n}$ with post-study odds $O_n=R\,f(n)$, $f(n)=\dfrac{1-b^n}{1-a^n}$. Since $x\mapsto x/(1+x)$ is strictly increasing on $x>0$, PPV$_n$ moves in the same direction as $f(n)$.
>
> **Step 2 (geometric sums).** Write $S_n(x)=\sum_{k=0}^{n-1}x^k$, so $1-x^n=(1-x)S_n(x)$ and
> $$
> f(n)=\frac{1-b}{1-a}\cdot\frac{S_n(b)}{S_n(a)}.
> $$
> The constant $(1-b)/(1-a)=(1-\beta)/\alpha$ is the single-study likelihood ratio, so $f(1)=(1-\beta)/\alpha$.
>
> **Step 3 (compare $n$ and $n+1$).** Using $S_{n+1}(x)=S_n(x)+x^n$ and the positivity of all the sums,
> $$
> f(n+1)<f(n)\iff \big(S_n(b)+b^n\big)S_n(a)<S_n(b)\big(S_n(a)+a^n\big)\iff b^nS_n(a)<a^nS_n(b).
> $$
>
> **Step 4 (sign term by term).**
> $$
> a^nS_n(b)-b^nS_n(a)=\sum_{k=0}^{n-1}\big(a^nb^k-b^na^k\big)=\sum_{k=0}^{n-1}a^kb^k\big(a^{n-k}-b^{n-k}\big).
> $$
> Each term has $n-k\ge1$ and $a^kb^k>0$, so it takes the sign of $a-b$. If $b<a$ (i.e. $\beta<1-\alpha$, i.e. $1-\beta>\alpha$), every term is strictly positive and $f(n+1)<f(n)$. If $b=a$, every term is zero and $f(n)\equiv1$, so $\text{PPV}_n\equiv R/(R+1)$. If $b>a$, every term is negative and $f$ increases. The three cases are exhaustive, which gives the "iff" statements.
>
> **Step 5 (limit).** $a,b\in(0,1)$ gives $a^n,b^n\to0$, so $f(n)\to1$ and $\text{PPV}_n\to R/(R+1)$. In the usual case, $f$ falls strictly from $(1-\beta)/\alpha$ toward 1. In the exceptional case, it rises from $(1-\beta)/\alpha<1$ toward 1, where a single significant result was *evidence against* the effect. $\blacksquare$
^proof-ppv-n-monotone

> [!note] Unequal powers
> With per-study Type II rates $\beta_i$, write $P_n=\prod_{i\le n}\beta_i$ and $Q_n=(1-\alpha)^n$. Adding study $n+1$ lowers PPV iff $\frac{1-P_n\beta_{n+1}}{1-Q_n(1-\alpha)}<\frac{1-P_n}{1-Q_n}$. No single power threshold makes this hold for every $n$, which is why the paper settles for "inferences are similar". A sufficient condition is that every study has $1-\beta_i>\alpha$ *and* the same power. The equal-power proof above then applies.
^note-unequal-powers

### Figure 2 (p. 0699): PPV vs pre-study odds for $n$ studies

*Caption:* "PPV (Probability That a Research Finding Is True) as a Function of the Pre-Study Odds for Various Numbers of Conducted Studies, $n$". Panels: A power = 80%, B 50%, C 20%. The x-axis is pre-study odds $R$ from 0 to 1, the y-axis is post-study probability (%), and the legend shows $n$ = 1, 5, 10, 50.

Values recomputed from the formula ($\alpha=0.05$; PPV in %):

| Power | $n$ | $R$=0.05 | 0.10 | 0.25 | 0.50 | 1.00 |
|---|---|---|---|---|---|---|
| 0.80 | 1 | 44 | 62 | 80 | 89 | 94 |
| 0.80 | 5 | 18 | 31 | 52 | 69 | 82 |
| 0.80 | 10 | 11 | 20 | 38 | 55 | 71 |
| 0.80 | 50 | 5 | 10 | 21 | 35 | 52 |
| 0.50 | 1 | 33 | 50 | 71 | 83 | 91 |
| 0.50 | 5 | 18 | 30 | 52 | 68 | 81 |
| 0.50 | 10 | 11 | 20 | 38 | 55 | 71 |
| 0.50 | 50 | 5 | 10 | 21 | 35 | 52 |
| 0.20 | 1 | 17 | 29 | 50 | 67 | 80 |
| 0.20 | 5 | 13 | 23 | 43 | 60 | 75 |
| 0.20 | 10 | 10 | 18 | 36 | 53 | 69 |
| 0.20 | 50 | 5 | 10 | 21 | 35 | 52 |

**Check against the published panels (read from the figure image).** The plotted endpoints at $R=1$ match the recomputed grid to within reading precision, which confirms that the legend's colour order ($n$ = 1 blue, 5 red, 10 green, 50 orange) matches the formula:

| Panel (label in figure) | $n=1$ | $n=5$ | $n=10$ | $n=50$ | Recomputed |
|---|---|---|---|---|---|
| A, "power = 80%" | ≈95 | ≈82 | ≈72 | ≈52 | 94 / 82 / 71 / 52 |
| B, "power = 50%" | ≈91 | ≈81 | ≈71 | ≈52 | 91 / 81 / 71 / 52 |
| C, "power = 20%" | ≈80 | ≈75 | ≈70 | ≈52 | 80 / 75 / 69 / 52 |

The curves are also ordered as predicted. In every panel $n=1$ lies on top and $n=50$ at the bottom, as the monotonicity theorem requires when $1-\beta>\alpha$. The spread between curves is widest in panel A and narrowest in panel C. All curves start at 0 at $R=0$.

**Caption versus panel order (a small inconsistency in the source).** The caption says "Panels correspond to power of 0.20, 0.50, and 0.80", in ascending order. The panels are actually labelled **A = 80%, B = 50%, C = 20%**, in descending order. The panel labels are correct, as the endpoint check shows (panel A has the highest $n=1$ curve). The caption's list should be read as unordered. Figure 1 has the same layout (A 80%, B 50%, C 20%); see [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]].

Observations: (i) power hardly matters once $n\ge10$, because every curve converges to the $n\to\infty$ floor; the $n=50$ row is within about 2 points of $R/(R+1)$ (e.g. 52% vs 50% at $R=1$, 35% vs 33% at $R=0.5$), since $0.95^{50}\approx0.08$ has not yet vanished; (ii) the biggest loss comes between $n=1$ and $n=5$ for high-power studies, since high power makes "at least one significant" nearly certain for true effects while the false-positive side keeps climbing.

## Examples

> [!example] Many analysts, one KPI question (generic)
> Five independent analysts (or five vendor models) each test whether a channel's ROI is non-zero, each with 80% power, in a domain where $R=0.25$. Single study: PPV = 0.80. If the claim circulated is "at least one model found it significant": $\text{PPV}_5=0.25(1-0.2^5)/(1.25-0.95^5-0.25\cdot0.2^5)=0.2499/0.4761\approx0.52$, essentially a coin flip. The remedy is to report all five results, or to pool them ([[Partial Pooling as Multiple Comparisons Correction]]), rather than the best one.
^ex-many-analysts

```python
import numpy as np
def ppv_n(power, R, n, alpha=0.05, powers=None):
    """Ioannidis (2005) Table 3: P(true | at least one of n studies significant)."""
    b_prod = np.prod([1 - p for p in powers]) if powers is not None else (1 - power) ** n
    return R * (1 - b_prod) / (R + 1 - (1 - alpha) ** n - R * b_prod)
```

## Connections

- [[Multiple Testing Corrections]]: family-wise error across the $n$ teams is exactly $1-(1-\alpha)^n$, but nobody owns the family, so nobody corrects it.
- [[Garden of Forking Data]] and [[Garden of Forking Paths]]: the within-team version, where $n$ is the number of implicit analyses.
- [[Partial Pooling as Multiple Comparisons Correction]] and [[Multiple Comparisons - Bayesian Perspective]]: pooling all $n$ estimates is the constructive answer.
- [[The Replication Crisis and Multiple Levels of Variation]]: why independent replications disagree.
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]: $n$ as the number of model specifications in a selection loop.

## See Also

- [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]: Corollary 6 and the Proteus phenomenon.
- [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]: ten-team calculation.
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
