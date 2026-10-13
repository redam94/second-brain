---
title: Model Class Reliance - Binary Search Computation
tags:
  - source/ingested
  - topic/model-validation
  - topic/optimization
  - type/theorem
  - type/concept
  - method/fractional-programming
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§2.1 Fig. 2 p. 7; §6 pp. 18-20 (Table 1); §6.1 pp. 20-24 (Cond. 8, Lemma 9, Fig. 4, Lemma 10, Eq 6.2, Prop. 11, Fig. 5); §6.2 pp. 24-25 (Cond. 12, Lemmas 13-14, Eqs 6.4-6.5); §6.3 p. 25; App C pp. 67-75"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
used_by:
  - "[[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]]"
  - "[[Model Class Reliance for Linear and RKHS Model Classes]]"
  - "[[Model Class Reliance - Recidivism Case Study]]"
aliases:
  - MCR Binary Search
  - Dinkelbach Search for Model Reliance
  - Computing Empirical MCR
  - MR Lower Bound Lemma
  - MR Upper Bound Lemma
---

# Model Class Reliance - Binary Search Computation

> [!summary]
> Empirical MCR means minimizing and maximizing a *ratio* $\hat e_{\text{switch}}/\hat e_{\text{orig}}$ over $\{f:\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}\}$. The paper reduces this to repeatedly minimizing *linear* combinations: $\hat h_{-,\gamma}=\gamma\hat e_{\text{orig}}+\hat e_{\text{switch}}$ for the lower bound and $\hat h_{+,\gamma}=\hat e_{\text{orig}}+\gamma\hat e_{\text{switch}}$ ($\gamma\le0$) for the upper bound. This is a Dinkelbach-style fractional-programming search. Each minimum gives a valid bound *function* holding for every loss level at once (the "bowl" envelope of Figs 2 and 8). Monotonicity lemmas justify a binary search over $\gamma$. When irrelevant information cannot help (Prop 11), the lower-bound search needs only $\gamma\ge0$, i.e. a reweighted empirical-risk minimization on an $n^2$-row expanded sample.
^summary

## Overview

The bound is stated on the **absolute** loss scale $\epsilon_{\text{abs}}$; set $\epsilon_{\text{abs}}=\hat e_{\text{orig}}(f_{\text{ref}})+\epsilon$. The output is a pair of functions $b_-,b_+$ with
$$b_-(\epsilon_{\text{abs}})\le\widehat{MR}(f)\le b_+(\epsilon_{\text{abs}})\quad\text{for all }\{f,\epsilon_{\text{abs}}:\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}},\ f\in\mathcal F,\ \epsilon_{\text{abs}}>0\}.$$
The binary search tightens them at the $\epsilon_{\text{abs}}$ of interest. Throughout, $0<\min_{f\in\mathcal F}\hat e_{\text{orig}}(f)$, so MR is finite. Almost everything holds with $\hat e_{\text{divide}}$ in place of $\hat e_{\text{switch}}$. The App C preamble (p. 67) states this explicitly: every App C proof is unchanged with $\hat e_{\text{divide}}$ in the definitions of $\hat h_{\pm,\gamma}$, $\hat g_{\pm,\gamma}$ and $\widehat{MR}$, **except C.3** (Proposition 11).

**Preamble identities (App C, pp. 67-68)** used by all proofs below:
- (C.1) for $a\ge c$, $a+b\le c+d$ implies $b\le d$;
- (C.2) $\hat h_{\pm,\gamma_1}(\hat g_{\pm,\gamma_1})\le\hat h_{\pm,\gamma_1}(\hat g_{\pm,\gamma_2})$;
- (C.3) $\hat h_{+,\gamma_1}(f)=\hat h_{+,\gamma_2}(f)+(\gamma_1-\gamma_2)\hat e_{\text{switch}}(f)$;
- (C.4) $\hat h_{-,\gamma_1}(f)=\hat h_{-,\gamma_2}(f)+(\gamma_1-\gamma_2)\hat e_{\text{orig}}(f)$.

Full App C derivations are in [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]].

**Heuristic alternatives (p. 19).** Any model in $\hat{\mathcal R}(\epsilon)$ gives a lower bound on $\widehat{MCR}_+$ and an upper bound on $\widehat{MCR}_-$. So heuristic search, e.g. simulated annealing, tightens the bounds *from inside*, while the binary search bounds them *from outside*.

> [!example] Table 1 (p. 19): Tractability of empirical MCR computation
> | Model class and loss | Computing $\widehat{MCR}_-$ | Computing $\widehat{MCR}_+$ |
> |---|---|---|
> | (L2-regularized) linear models, squared error | Highly tractable (QP1QC; §§7.2-7.3) | Highly tractable (QP1QC; §§7.2-7.3) |
> | Linear models in an RKHS, squared error | Moderately tractable (QP1QC; §7.4.1) | Moderately tractable (QP1QC; §7.4.1) |
> | Cases where irrelevant covariates do not improve predictions | Moderately tractable (convex problems; Prop 11) | Potentially intractable |
> | Cases where minimizing empirical loss is convex | Potentially intractable (DC programs; §6.3) | Potentially intractable (DC programs; §6.3) |
^tbl-1

## Main Content

### Lower bound (§6.1)

> [!definition] Definition: Lower-search objective and Condition 8 (p. 20)
> For $\gamma\in\mathbb R$: $\hat h_{-,\gamma}(f):=\gamma\,\hat e_{\text{orig}}(f)+\hat e_{\text{switch}}(f)$ and $\hat g_{-,\gamma}\in\arg\min_{f\in\mathcal F}\hat h_{-,\gamma}(f)$. The minimizer need not be unique.
> **Condition 8 (criteria to continue the search for the MR lower bound):** $\hat h_{-,\gamma}(\hat g_{-,\gamma})\ge0$ and $\hat e_{\text{orig}}(\hat g_{-,\gamma})\le\epsilon_{\text{abs}}$.
^def-cond8

> [!theorem] Lemma 9: Lower bound for $\widehat{MR}$ (p. 20, Eq 6.1)
> If $\gamma\in\mathbb R$ satisfies $\hat h_{-,\gamma}(\hat g_{-,\gamma})\ge0$, then
> $$\frac{\hat h_{-,\gamma}(\hat g_{-,\gamma})}{\epsilon_{\text{abs}}}-\gamma\ \le\ \widehat{MR}(f)\qquad(6.1)$$
> for all $f\in\mathcal F$ with $\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$. Also $-\gamma\le\widehat{MR}(f)$ for all $f\in\mathcal F$. If $f=\hat g_{-,\gamma}$ and at least one inequality in Condition 8 holds with equality, then (6.1) holds with equality.
>
> **Proof (App C.1).** Since $\hat h\ge0$ and $\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$: $\hat h(\hat g)/\epsilon_{\text{abs}}\le\hat h(\hat g)/\hat e_{\text{orig}}(f)$. Optimality gives $\gamma\hat e_{\text{orig}}(f)+\hat e_{\text{switch}}(f)\ge\hat h(\hat g)$. Dividing by $\hat e_{\text{orig}}(f)$ gives $\gamma+\widehat{MR}(f)\ge\hat h(\hat g)/\hat e_{\text{orig}}(f)\ge\hat h(\hat g)/\epsilon_{\text{abs}}$. Equality: if $\hat h(\hat g)=0$ then $\gamma=-\widehat{MR}(\hat g)$; if $\hat e_{\text{orig}}(\hat g)=\epsilon_{\text{abs}}$ the two sides coincide algebraically.
>
> **Boundary-function reading (p. 20).** Lemma 9 reduces lower-bounding $\widehat{MR}(f)$ to minimizing the linear combination $\hat h_{-,\gamma}(f)$. For a fixed $\gamma$, the result is not a single bound at one $\epsilon_{\text{abs}}$ but a **boundary function** that holds for all $\epsilon_{\text{abs}}>0$. Lower values of $\epsilon_{\text{abs}}$ give more restrictive (higher) lower bounds on $\widehat{MR}(f)$, because the left side of (6.1) is decreasing in $\epsilon_{\text{abs}}$ when $\hat h_{-,\gamma}(\hat g_{-,\gamma})\ge0$. One minimization per $\gamma$ therefore yields a whole curve, which is how the "bowls" in Figure 8 are drawn.
^thm-lemma9

> [!example] Figure 4 (p. 21): Geometry of Lemma 9
> Plot each $f\in\mathcal F$ as the point $(\hat e_{\text{orig}}(f),\hat e_{\text{switch}}(f))$. The slope from the origin to $f$ is $\widehat{MR}(f)$.
> - **(A)** The class is a region bounded away from the vertical axis.
> - **(B)** For $\gamma=1$, contour lines of $\hat h_{-,\gamma}$ are lines of slope $-\gamma$. The tangent line at the minimum excludes the half-plane below it. If $\min\hat h\ge0$, the origin is excluded or on the boundary.
> - **(C)** Intersecting with $\hat e_{\text{orig}}\le\epsilon_{\text{abs}}$ leaves an unshaded region. Every ray from the origin into it has slope at least that of the black line through the origin and the point where the tangent meets $\epsilon_{\text{abs}}$. That slope is the left side of (6.1).
^fig-4

> [!theorem] Lemma 10: Monotonicity for the lower-bound binary search (p. 22)
> 1. $\hat h_{-,\gamma}(\hat g_{-,\gamma})$ is monotonically increasing in $\gamma$ (analogous to Lemma 3 of Dinkelbach 1967).
> 2. $\hat e_{\text{orig}}(\hat g_{-,\gamma})$ is monotonically decreasing in $\gamma$.
> 3. Given $\epsilon_{\text{abs}}$, the bound $\hat h_{-,\gamma}(\hat g_{-,\gamma})/\epsilon_{\text{abs}}-\gamma$ is monotonically decreasing in $\gamma$ where $\hat e_{\text{orig}}(\hat g_{-,\gamma})\le\epsilon_{\text{abs}}$, and increasing otherwise.
>
> **Implication (p. 22).** By point 3, the tightest lower bound from (6.1) uses the *smallest* $\gamma$ still satisfying Condition 8. The paper states the monotonicity claim with a qualifier: by points 1-2, if $\gamma_0$ satisfies Condition 8 **and one of the inequalities in Condition 8 holds with equality**, then Condition 8 holds for all $\gamma\ge\gamma_0$. Together these justify a binary search that lowers $\gamma$ until Condition 8 is no longer met. Figure 5 illustrates the result. (Our reading of the qualifier: point 1 alone makes $\hat h_{-,\gamma}(\hat g_{-,\gamma})\ge0$ persist as $\gamma$ grows, and point 2 alone makes $\hat e_{\text{orig}}(\hat g_{-,\gamma})\le\epsilon_{\text{abs}}$ persist. The paper attaches the equality qualifier as written, so it is recorded here rather than dropped.)
>
> **Proof (App C.2).** Uses $\hat h_{-,\gamma_1}(f)=\hat h_{-,\gamma_2}(f)+(\gamma_1-\gamma_2)\hat e_{\text{orig}}(f)$ (C.4), optimality of each $\hat g$ (C.2), the elementary rule C.1 ($a\ge c$ and $a+b\le c+d$ imply $b\le d$), and $\hat e_{\text{orig}}>0$.
> - Part 1: $\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})\le\hat h_{-,\gamma_1}(\hat g_{-,\gamma_2})<\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})$.
> - Part 2: rewrite C.2 with C.4 and apply C.1, giving $(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\le(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_2})$; dividing by $\gamma_1-\gamma_2<0$ gives $\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\ge\hat e_{\text{orig}}(\hat g_{-,\gamma_2})$.
> - Part 3: if both minimizers have $\hat e_{\text{orig}}\le\epsilon_{\text{abs}}$, then $\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})\le\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})+(\gamma_2-\gamma_1)\epsilon_{\text{abs}}$, so the bound falls; if both are $\ge\epsilon_{\text{abs}}$ the mirror-image chain shows it rises.
>
> Full derivations: [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas#^proof-lemma10-p2]] and [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas#^proof-lemma10-p3]].
^thm-lemma10

> [!example] Figure 5 (p. 23): Monotonicity illustrated
> Two values $\gamma_1<\gamma_2$ on Fig. 4-C. A larger $\gamma$ means a flatter tangent line.
> 1. Intercepts satisfy $\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})\le\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})$.
> 2. The tangent points move left: $\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\ge\hat e_{\text{orig}}(\hat g_{-,\gamma_2})$.
> 3. The implied lower-bound slope falls as $\gamma$ rises in the feasible range.
^fig-5

**Reweighting identity (Eq 6.2, p. 22).** For $\gamma\ge0$, minimizing $\hat h_{-,\gamma}$ is a weighted empirical risk minimization over the $n^2$ "expanded" rows:
$$\hat h_{-,\gamma}(f)=\sum_{i=1}^n\sum_{j=1}^n w_\gamma(i,j)\,L\{f,(\mathbf y_{[i]},\mathbf X_{1[j,\cdot]},\mathbf X_{2[i,\cdot]})\},\qquad w_\gamma(i,j)=\frac{\gamma\,\mathbb 1(i=j)}{n}+\frac{\mathbb 1(i\ne j)}{n(n-1)}\ge0.$$

> [!theorem] Proposition 11: Nonnegative weights suffice for the lower-bound search (pp. 22-23)
> Assume:
> 1. **Predictions are sufficient for computing the loss.** $L\{f,(y,x_1^{(a)},x_2^{(a)})\}=L\{f,(y,x_1^{(b)},x_2^{(b)})\}$ whenever $f(x_1^{(a)},x_2^{(a)})=f(x_1^{(b)},x_2^{(b)})$.
> 2. **Irrelevant information does not improve predictions.** For any distribution $D$ with $X_1\perp_D(X_2,Y)$, there is $f_D$ attaining $\min_{f\in\mathcal F}\mathbb E_DL\{f,(Y,X_1,X_2)\}$ with $f_D(x_1^{(a)},x_2)=f_D(x_1^{(b)},x_2)$ for all $x_1^{(a)},x_1^{(b)},x_2$ (6.3).
>
> Let $\gamma=0$. Then either (i) some minimizer $\hat g_{-,0}$ of $\hat h_{-,0}$ violates Condition 8, or (ii) $\hat e_{\text{orig}}(\hat g_{-,0})\le\epsilon_{\text{abs}}$ and $\widehat{MR}(\hat g_{-,0})\le1$ for every minimizer.
>
> **Implication.** In case (i), the search for $\gamma$ can be restricted to $\gamma\ge0$, so every subproblem is a nonnegatively weighted ERM, which is convex whenever ordinary ERM is. In case (ii), a well-performing model with $\widehat{MR}\le1$ exists, so $\widehat{MCR}_-(\epsilon)\le1$. That is "sufficiently precise ... for most interpretational purposes" (p. 23).
>
> **Proof (App C.3).** At $\gamma_1=1/(n-1)$ all $n^2$ weights are equal, so $\hat h_{-,\gamma_1}\propto\mathbb E_{D_m}L$ under the product distribution $D_m$ of the sample's $(Y,X_2)$ and $X_1$ marginals. Condition 2 gives a minimizer ignoring $x_1$. Condition 1 makes its loss invariant to permuting $X_1$, so $\widehat{MR}(\hat g_{-,\gamma_1})=1$. For $\gamma_2=0\le\gamma_1$: $\hat e_{\text{switch}}(\hat g_{-,0})\le\hat e_{\text{switch}}(\hat g_{-,\gamma_1})$ and, by Lemma 10.2, $\hat e_{\text{orig}}(\hat g_{-,0})\ge\hat e_{\text{orig}}(\hat g_{-,\gamma_1})$. Hence $\widehat{MR}(\hat g_{-,0})\le1$.
>
> **Does not transfer to $\hat e_{\text{divide}}$.** The fixed pairing is not the expectation under a distribution with $X_1$ independent of $(X_2,Y)$. It holds approximately, and (6.1) remains a valid but possibly looser bound with $\gamma\ge0$.
^thm-prop11

### Upper bound (§6.2)

> [!definition] Definition: Upper-search objective and Condition 12 (p. 24)
> $\hat h_{+,\gamma}(f):=\hat e_{\text{orig}}(f)+\gamma\,\hat e_{\text{switch}}(f)$, $\hat g_{+,\gamma}\in\arg\min_{f\in\mathcal F}\hat h_{+,\gamma}(f)$.
> **Condition 12 (criteria to continue the search for the MR upper bound)**, for $(\gamma,\epsilon_{\text{abs}})\in\mathbb R_{\le0}\times\mathbb R_{>0}$: $\hat h_{+,\gamma}(\hat g_{+,\gamma})\ge0$ and $\hat e_{\text{orig}}(\hat g_{+,\gamma})\le\epsilon_{\text{abs}}$.
^def-cond12

> [!theorem] Lemma 13: Upper bound for $\widehat{MR}$ (p. 24, Eqs 6.4-6.5)
> If $\gamma\le0$ and $\hat h_{+,\gamma}(\hat g_{+,\gamma})\ge0$, then for all $f\in\mathcal F$ with $\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$:
> $$\widehat{MR}(f)\le\Big\{\frac{\hat h_{+,\gamma}(\hat g_{+,\gamma})}{\epsilon_{\text{abs}}}-1\Big\}\gamma^{-1},\qquad(6.4)$$
> and globally $\widehat{MR}(f)\le|\gamma^{-1}|$ for all $f\in\mathcal F$ (6.5). Equality in (6.4) holds at $f=\hat g_{+,\gamma}$ if at least one inequality of Condition 12 is tight.
>
> **Proof idea (App C.4).** As for Lemma 9: $\hat e_{\text{orig}}(f)+\gamma\hat e_{\text{switch}}(f)\ge\hat h(\hat g)\ge\hat h(\hat g)\,\hat e_{\text{orig}}(f)/\epsilon_{\text{abs}}$. Divide by $\gamma\,\hat e_{\text{orig}}(f)<0$, which flips the inequality. **Equality (C.4.2):** if $\hat h_{+,\gamma}(\hat g_{+,\gamma})=0$ then $-\gamma^{-1}=\widehat{MR}(\hat g_{+,\gamma})$, which is the right side of (6.4); if $\hat e_{\text{orig}}(\hat g_{+,\gamma})=\epsilon_{\text{abs}}$ the right side reduces to $\{1+\gamma\widehat{MR}(\hat g_{+,\gamma})-1\}\gamma^{-1}$. Details: [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas#^proof-lemma13-p2]].
^thm-lemma13

> [!theorem] Lemma 14: Monotonicity for the upper-bound binary search (pp. 24-25)
> 1. $\hat h_{+,\gamma}(\hat g_{+,\gamma})$ is monotonically increasing in $\gamma$.
> 2. $\hat e_{\text{orig}}(\hat g_{+,\gamma})$ is monotonically decreasing in $\gamma$ for $\gamma\le0$, and Condition 12 holds at $\gamma=0$ whenever $\epsilon_{\text{abs}}\ge\min_f\hat e_{\text{orig}}(f)$.
> 3. Given $\epsilon_{\text{abs}}$, the bound $\{\hat h_{+,\gamma}(\hat g_{+,\gamma})/\epsilon_{\text{abs}}-1\}\gamma^{-1}$ is monotonically increasing in $\gamma$ where $\hat e_{\text{orig}}(\hat g_{+,\gamma})\le\epsilon_{\text{abs}}$ and $\gamma<0$, and decreasing where $\hat e_{\text{orig}}(\hat g_{+,\gamma})>\epsilon_{\text{abs}}$ and $\gamma<0$.
>
> **Implication.** The tightest upper bound uses the smallest $\gamma$ (most negative) still satisfying Condition 12. Binary-search over $\gamma\le0$, starting from $\gamma=0$, which is always feasible.
>
> **Proof sketch (App C.5, pp. 72-74).**
> - **Part 1 (C.5.1, Eq C.12).** Since $\hat e_{\text{switch}}\ge0$, $\hat h_{+,\gamma_1}(f)\le\hat h_{+,\gamma_2}(f)$ for $\gamma_1<\gamma_2$; combine with optimality C.2.
> - **Part 2 (C.5.2, Eqs C.13-C.14).** For $\gamma_1<\gamma_2\le0$, C.2 plus the shift identity C.3 ($\hat h_{+,\gamma_1}=\hat h_{+,\gamma_2}+(\gamma_1-\gamma_2)\hat e_{\text{switch}}$) and C.1 give $\hat e_{\text{switch}}(\hat g_{+,\gamma_1})\ge\hat e_{\text{switch}}(\hat g_{+,\gamma_2})$, hence $\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_1})\le\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_2})$ (C.13). Feeding that into C.2 at $\gamma_2$ with C.1 gives $\hat e_{\text{orig}}(\hat g_{+,\gamma_2})\le\hat e_{\text{orig}}(\hat g_{+,\gamma_1})$ (C.14). Condition 12 holds at $\gamma=0$ because $\hat h_{+,0}(\hat g_{+,0})=\hat e_{\text{orig}}(\hat g_{+,0})>0$ and $\hat e_{\text{orig}}(\hat g_{+,0})=\min_f\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$.
> - **Part 3 (C.5.3, Eqs C.15-C.16).** For $\gamma_1<\gamma_2<0$, $1/\gamma_2<1/\gamma_1$. Multiplying by $\hat e_{\text{orig}}-\epsilon_{\text{abs}}$ ($\le0$ in the feasible range, C.15; $\ge0$ outside it, C.16) and combining with C.2 (subtract $\epsilon_{\text{abs}}$, divide by the negative $\gamma$) shows the bound rises with $\gamma$ in the feasible range and falls outside it.
>
> Full derivations, plus a typo in the source's last line of C.5.3: [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas#^proof-lemma14-p1]], [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas#^proof-lemma14-p2]], [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas#^proof-lemma14-p3]].
^thm-lemma14

### The algorithm

> [!algorithm] Algorithm: Binary search for empirical MCR (assembled from §6.1-6.2, Lemmas 9-14)
> **Input:** data; class $\mathcal F$; loss $L$; target $\epsilon_{\text{abs}}=\hat e_{\text{orig}}(f_{\text{ref}})+\epsilon$; an oracle that minimizes $\xi_{\text{orig}}\hat e_{\text{orig}}+\xi_{\text{switch}}\hat e_{\text{switch}}$ over $\mathcal F$.
>
> **Lower end $\widehat{MCR}_-$:**
> 1. Set $\gamma_{hi}$ to a value satisfying Condition 8. Lemma 10 implies large $\gamma$ works. Under Prop 11, first try $\gamma=0$: if $\hat g_{-,0}$ meets Condition 8, stop and report $\widehat{MCR}_-\le1$.
> 2. Set $\gamma_{lo}$ to a value violating Condition 8 (under Prop 11, $\gamma_{lo}=0$).
> 3. Repeat: $\gamma\leftarrow(\gamma_{lo}+\gamma_{hi})/2$; compute $\hat g_{-,\gamma}$. If Condition 8 holds, set $\gamma_{hi}\leftarrow\gamma$, otherwise $\gamma_{lo}\leftarrow\gamma$.
> 4. Report $b_-(\epsilon_{\text{abs}})=\hat h_{-,\gamma_{hi}}(\hat g_{-,\gamma_{hi}})/\epsilon_{\text{abs}}-\gamma_{hi}$ (Lemma 9). The model $\hat g_{-,\gamma_{hi}}$ gives an attained value $\widehat{MR}(\hat g_{-,\gamma_{hi}})\ge b_-$, so the gap shows how tight the bound is.
>
> **Upper end $\widehat{MCR}_+$:**
> 5. Set $\gamma_{hi}=0$ (feasible by Lemma 14.2) and choose $\gamma_{lo}<0$ violating Condition 12.
> 6. Bisect in the same way, keeping the smallest feasible $\gamma$.
> 7. Report $b_+(\epsilon_{\text{abs}})=\{\hat h_{+,\gamma}(\hat g_{+,\gamma})/\epsilon_{\text{abs}}-1\}\gamma^{-1}$ (Lemma 13).
>
> **Envelope:** every evaluated $\gamma$ gives a bound valid at *all* $\epsilon_{\text{abs}}$. Taking the pointwise best over the evaluated $\gamma$s gives the closed-form convex "bowl" of Fig. 2, which is tightest near the target $\epsilon$.
^alg-mcr-search

> [!example] Figure 2 (p. 7): Output of the computation
> The axes are $\widehat{MR}(f)$ (x) and in-sample loss (y). A purple convex envelope contains every model in $\mathcal F$, and its intersection with the horizontal line at $\hat e_{\text{orig}}(f_{\text{ref}})+\epsilon$ brackets $[\widehat{MCR}_-(\epsilon),\widehat{MCR}_+(\epsilon)]$. The procedure works sequentially, tightening the envelope near the $\epsilon$ of interest. Fig. 8 (COMPAS) uses the same format.
^fig-2

### Convex model classes: DC programming (§6.3, p. 25)

For $f_\theta$ with $\theta\in\Theta\subseteq\mathbb R^d$ and $L$ convex in $\theta$, the lemmas need only a **lower bound** on $\min\hat h_{\pm,\gamma}$, not the exact minimum. The subproblems are either convex or **difference-of-convex (DC) programs**:
$$\min_{\{\theta:c_{DC}(\theta)\le k,\ \theta\in\Theta\}}g_{DC}(\theta)-h_{DC}(\theta),\qquad g_{DC},h_{DC},c_{DC}\text{ convex}.$$

> [!algorithm] Algorithm: Simplex branch-and-bound lower bound for a DC program (§6.3; Horst & Thoai 1999)
> 1. Partition $\Theta$ into simplexes.
> 2. On simplex $j$, replace $h_{DC}$ by the affine $h_j$ interpolating $h_{DC}$ at the vertices. Since $h_{DC}$ is convex, $h_j\ge h_{DC}$ on the simplex, so $l_j:=\min_\theta g_{DC}(\theta)-h_j(\theta)$ is a convex problem and a valid lower bound.
> 3. Discard partitions whose $l_j$ is too high.
> 4. Subdivide the partition with the lowest $l_j$ and recompute the bounds.
> 5. Stop when the lower bound is tight enough, then plug it into (6.1) or (6.4) in place of $\hat h(\hat g)$.
>
> The bounds are always valid, but convergence can be slow in high dimension, giving very conservative results.
^alg-dc-bb

## Examples

> [!example] One step of the lower search (illustrative)
> Suppose $\epsilon_{\text{abs}}=1.0$. At $\gamma=0.5$ the minimizer has $\hat e_{\text{orig}}=0.9$ and $\hat e_{\text{switch}}=1.2$, so $\hat h=0.45+1.2=1.65\ge0$ and Condition 8 holds. Lemma 9 gives $\widehat{MR}\ge1.65/1.0-0.5=1.15$ for every model with loss at most 1.0. The minimizer itself has $\widehat{MR}=1.2/0.9=1.33$. So $\widehat{MCR}_-\in[1.15,1.33]$, and lowering $\gamma$ while Condition 8 holds narrows the gap.
^ex-one-step-of-the

## Connections

- **Dinkelbach (1967)** fractional programming minimizes a ratio by a sequence of parametric linear problems. The novelty here is the constraint on the denominator $\hat e_{\text{orig}}\le\epsilon_{\text{abs}}$.
- Using the reweighted $n^2$-row sample is like augmenting data with "permuted" copies. A similar trick is used to build knockoff or null features.
- In MMM practice the "oracle" is just a weighted regression solver, so MCR for a ridge-type response model costs a few dozen solves; see [[Model Class Reliance for Linear and RKHS Model Classes]].

## See Also
- [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]]: every App C proof in full
- [[Model Class Reliance for Linear and RKHS Model Classes]]: exact subproblem solvers
- [[Model Class Reliance - Recidivism Case Study]]: Fig. 8 envelopes in practice
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
