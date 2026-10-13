---
title: Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas
tags:
  - source/ingested
  - topic/model-validation
  - topic/optimization
  - type/proof
  - method/fractional-programming
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "App C preamble pp. 67-68 (Eqs C.1-C.4); C.1 pp. 68-69 (Eq C.5); C.2 pp. 69-70 (Eq C.6); C.3 pp. 70-71 (Eqs C.7-C.10); C.4 pp. 71-72 (Eq C.11); C.5 pp. 72-74 (Eqs C.12-C.16)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Class Reliance - Binary Search Computation]]"
used_by:
  - "[[Model Class Reliance - Binary Search Computation]]"
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - MCR Appendix C Proofs
  - Proof of Lemma 14 (MCR)
  - Proofs of MCR Monotonicity Lemmas
---

# Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas

> [!summary]
> Appendix C proves the computational results of §6: the bound lemmas (Lemma 9 for the lower search, Lemma 13 for the upper search), the monotonicity lemmas that justify bisection (Lemma 10, Lemma 14), and Proposition 11 (nonnegative weights suffice). Every proof uses the same three tools. (i) An elementary inequality (C.1): from $a\ge c$ and $a+b\le c+d$, conclude $b\le d$. (ii) Optimality of each minimizer, $\hat h_{\pm,\gamma_1}(\hat g_{\pm,\gamma_1})\le\hat h_{\pm,\gamma_1}(\hat g_{\pm,\gamma_2})$ (C.2). (iii) The linear "shift" identities C.3-C.4 between objectives at two values of $\gamma$. All statements and the algorithm are in [[Model Class Reliance - Binary Search Computation]]; this note holds the full derivations.
^summary

## Overview

Notation follows [[Model Class Reliance - Binary Search Computation]]:
- $\hat h_{-,\gamma}(f)=\gamma\hat e_{\text{orig}}(f)+\hat e_{\text{switch}}(f)$, with minimizer $\hat g_{-,\gamma}$;
- $\hat h_{+,\gamma}(f)=\hat e_{\text{orig}}(f)+\gamma\hat e_{\text{switch}}(f)$, with minimizer $\hat g_{+,\gamma}$;
- $\epsilon_{\text{abs}}>0$ is the absolute loss threshold;
- throughout, $0<\hat e_{\text{orig}}(f)$ for every $f\in\mathcal F$.

**Scope with $\hat e_{\text{divide}}$ (App C preamble, p. 67).** Almost every proof in App C is unchanged if $\hat e_{\text{switch}}$ is replaced by $\hat e_{\text{divide}}$ in the definitions of $\hat h_{\pm,\gamma}$, $\hat g_{\pm,\gamma}$ and $\widehat{MR}$. The **only exception is C.3** (Proposition 11). See [[#^proof-prop11]].

## Main Content

### Preamble identities (pp. 67-68)

> [!definition] Identities C.1-C.4 used in every App C proof
> **(C.1)** For constants $a,b,c,d\in\mathbb R$ with $a\ge c$:
> $$
> a+b\le c+d\ \Rightarrow\ a-c\le d-b\ \Rightarrow\ 0\le d-b\ (\text{since }0\le a-c)\ \Rightarrow\ b\le d.
> $$
> **(C.2)** For any $\gamma_1,\gamma_2\in\mathbb R$, the definitions of the minimizers give
> $$
> \hat h_{+,\gamma_1}(\hat g_{+,\gamma_1})\le\hat h_{+,\gamma_1}(\hat g_{+,\gamma_2}),\qquad\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})\le\hat h_{-,\gamma_1}(\hat g_{-,\gamma_2}).
> $$
> **(C.3)** For any $\gamma_1,\gamma_2$ and any $f$:
> $$
> \hat h_{+,\gamma_1}(f)=\hat e_{\text{orig}}(f)+\gamma_2\hat e_{\text{switch}}(f)+\{\gamma_1\hat e_{\text{switch}}(f)-\gamma_2\hat e_{\text{switch}}(f)\}=\hat h_{+,\gamma_2}(f)+(\gamma_1-\gamma_2)\hat e_{\text{switch}}(f).
> $$
> **(C.4)** By the same steps,
> $$
> \hat h_{-,\gamma_1}(f)=\hat h_{-,\gamma_2}(f)+(\gamma_1-\gamma_2)\hat e_{\text{orig}}(f).
> $$
^def-c-identities

### C.1 Proof of Lemma 9 (lower bound for $\widehat{MR}$), pp. 68-69

> [!theorem] Proof of Lemma 9, Part 1 (C.1.1): Eq 6.1 holds for all $f$ with $\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$
> If $\hat h_{-,\gamma}(\hat g_{-,\gamma})\ge0$ and $\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$, then $1/\epsilon_{\text{abs}}\le1/\hat e_{\text{orig}}(f)$. Multiplying by the nonnegative $\hat h$ gives
> $$
> \frac{\hat h_{-,\gamma}(\hat g_{-,\gamma})}{\epsilon_{\text{abs}}}\le\frac{\hat h_{-,\gamma}(\hat g_{-,\gamma})}{\hat e_{\text{orig}}(f)}.\qquad(C.5)
> $$
> By the definition of $\hat g_{-,\gamma}$:
> $$
> \hat h_{-,\gamma}(f)\ge\hat h_{-,\gamma}(\hat g_{-,\gamma})\ \Rightarrow\ \gamma+\frac{\hat e_{\text{switch}}(f)}{\hat e_{\text{orig}}(f)}\ge\frac{\hat h_{-,\gamma}(\hat g_{-,\gamma})}{\hat e_{\text{orig}}(f)}\ \overset{(C.5)}{\ge}\ \frac{\hat h_{-,\gamma}(\hat g_{-,\gamma})}{\epsilon_{\text{abs}}},
> $$
> so $\widehat{MR}(f)\ge\hat h_{-,\gamma}(\hat g_{-,\gamma})/\epsilon_{\text{abs}}-\gamma$.
^proof-lemma9-p1

> [!theorem] Proof of Lemma 9, Part 2 (C.1.2): equality cases
> Take $f=\hat g_{-,\gamma}$.
> - **If $\hat h_{-,\gamma}(\hat g_{-,\gamma})=0$:** then $0=\gamma\hat e_{\text{orig}}(\hat g_{-,\gamma})+\hat e_{\text{switch}}(\hat g_{-,\gamma})$, so $\gamma=-\hat e_{\text{switch}}(\hat g_{-,\gamma})/\hat e_{\text{orig}}(\hat g_{-,\gamma})$. Hence $\frac{0}{\epsilon_{\text{abs}}}-\gamma=\widehat{MR}(\hat g_{-,\gamma})$.
> - **If $\hat e_{\text{orig}}(\hat g_{-,\gamma})=\epsilon_{\text{abs}}$:** then $\frac{\hat h_{-,\gamma}(\hat g_{-,\gamma})}{\epsilon_{\text{abs}}}-\gamma=\frac{\gamma\hat e_{\text{orig}}(\hat g_{-,\gamma})+\hat e_{\text{switch}}(\hat g_{-,\gamma})}{\hat e_{\text{orig}}(\hat g_{-,\gamma})}-\gamma=\widehat{MR}(\hat g_{-,\gamma})$.
^proof-lemma9-p2

### C.2 Proof of Lemma 10 (monotonicity, lower search), pp. 69-70

> [!theorem] Proof of Lemma 10, Part 1 (C.2.1): $\hat h_{-,\gamma}(\hat g_{-,\gamma})$ increases in $\gamma$
> Let $\gamma_1<\gamma_2$. Since $\hat e_{\text{orig}}(f)>0$ for all $f$,
> $$
> \gamma_1\hat e_{\text{orig}}(f)+\hat e_{\text{switch}}(f)<\gamma_2\hat e_{\text{orig}}(f)+\hat e_{\text{switch}}(f),\ \text{i.e. }\hat h_{-,\gamma_1}(f)<\hat h_{-,\gamma_2}(f).\qquad(C.6)
> $$
> Then $\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})\overset{(C.2)}{\le}\hat h_{-,\gamma_1}(\hat g_{-,\gamma_2})\overset{(C.6)}{\le}\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})$. This is analogous to Lemma 3 of Dinkelbach (1967).
^proof-lemma10-p1

> [!theorem] Proof of Lemma 10, Part 2 (C.2.2): $\hat e_{\text{orig}}(\hat g_{-,\gamma})$ decreases in $\gamma$
> Let $\gamma_1<\gamma_2$. Start from C.2 and rewrite both sides with C.4 (shifting from $\gamma_1$ to $\gamma_2$):
> $$
> \hat h_{-,\gamma_2}(\hat g_{-,\gamma_1})+(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\le\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})+(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_2}).
> $$
> By C.2 at $\gamma_2$, $a:=\hat h_{-,\gamma_2}(\hat g_{-,\gamma_1})\ge c:=\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})$. So C.1 gives $(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\le(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_2})$. Dividing by the negative $\gamma_1-\gamma_2$ gives $\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\ge\hat e_{\text{orig}}(\hat g_{-,\gamma_2})$.
^proof-lemma10-p2

> [!theorem] Proof of Lemma 10, Part 3 (C.2.3): sign-dependent monotonicity of the lower bound
> Claim: $\hat h_{-,\gamma}(\hat g_{-,\gamma})/\epsilon_{\text{abs}}-\gamma$ decreases in $\gamma$ where $\hat e_{\text{orig}}(\hat g_{-,\gamma})\le\epsilon_{\text{abs}}$ and increases otherwise.
>
> **Case $\hat e_{\text{orig}}(\hat g_{-,\gamma_1}),\hat e_{\text{orig}}(\hat g_{-,\gamma_2})\le\epsilon_{\text{abs}}$, with $\gamma_1<\gamma_2$:**
> $$
> \hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})\overset{(C.2)}{\le}\hat h_{-,\gamma_2}(\hat g_{-,\gamma_1})\overset{(C.4)}{=}\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})+(\gamma_2-\gamma_1)\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\le\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})+(\gamma_2-\gamma_1)\epsilon_{\text{abs}}.
> $$
> Dividing by $\epsilon_{\text{abs}}$: $\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})/\epsilon_{\text{abs}}-\gamma_2\le\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})/\epsilon_{\text{abs}}-\gamma_1$ (decreasing).
>
> **Case both $\ge\epsilon_{\text{abs}}$, with $\gamma_1<\gamma_2$:**
> $$
> \hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})\le\hat h_{-,\gamma_1}(\hat g_{-,\gamma_2})=\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})+(\gamma_1-\gamma_2)\hat e_{\text{orig}}(\hat g_{-,\gamma_2})\le\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})+(\gamma_1-\gamma_2)\epsilon_{\text{abs}},
> $$
> where the last step uses $\gamma_1-\gamma_2<0$ and $\hat e_{\text{orig}}(\hat g_{-,\gamma_2})\ge\epsilon_{\text{abs}}$. (The source labels this step "from $\hat e_{\text{orig}}(\hat g_{-,\gamma_1})\ge\epsilon_{\text{abs}}$", but the term that is bounded is $\hat e_{\text{orig}}(\hat g_{-,\gamma_2})$, which the case assumption also covers.) Dividing by $\epsilon_{\text{abs}}$: $\hat h_{-,\gamma_1}(\hat g_{-,\gamma_1})/\epsilon_{\text{abs}}-\gamma_1\le\hat h_{-,\gamma_2}(\hat g_{-,\gamma_2})/\epsilon_{\text{abs}}-\gamma_2$ (increasing).
^proof-lemma10-p3

### C.3 Proof of Proposition 11 (nonnegative weights), pp. 70-71

> [!theorem] Proof of Proposition 11 (C.3, Eqs C.7-C.10)
> 1. **Equal weights at $\gamma_1=1/(n-1)$.** Let $D_s$ be the sample distribution and $D_m$ the product of the sample $(Y,X_2)$ marginal and the sample $X_1$ marginal:
> $$
> \mathbb P_{D_m}\{(Y,X_1,X_2)=(y,x_1,x_2)\}=\frac1{n^2}\sum_{i=1}^n\mathbb 1(y_{[i]}=y,\ \mathbf X_{2[i]}=x_2)\sum_{j=1}^n\mathbb 1(\mathbf X_{1[j]}=x_1).
> $$
> With $\gamma_1=1/(n-1)$, every weight in Eq 6.2 equals $1/\{n(n-1)\}$, so $\hat h_{-,\gamma_1}(f)\propto\mathbb E_{D_m}L\{f,(Y,X_1,X_2)\}$.
> 2. **A minimizer ignores $X_1$.** In $D_m$, $X_1$ is independent of $(Y,X_2)$. Condition 2 of Prop 11 then gives a minimizer $\hat g_{-,\gamma_1}$ with $\hat g_{-,\gamma_1}(x_1^{(a)},x_2)=\hat g_{-,\gamma_1}(x_1^{(b)},x_2)$. Condition 1 makes its loss invariant to $x_1$.
> 3. **So its $\widehat{MR}$ is 1 (C.7).** $\hat e_{\text{switch}}(\hat g_{-,\gamma_1})=\frac1n\sum_i\frac1{n-1}\sum_{j\ne i}L\{\hat g_{-,\gamma_1},(y_{[i]},\mathbf X_{1[j]},\mathbf X_{2[i]})\}=\frac1n\sum_iL\{\hat g_{-,\gamma_1},(y_{[i]},\mathbf X_{1[i]},\mathbf X_{2[i]})\}=\hat e_{\text{orig}}(\hat g_{-,\gamma_1})$.
> 4. **Move to $\gamma_2=0$.** By the definition of $\hat g_{-,0}$: $0+\hat e_{\text{switch}}(\hat g_{-,0})\le0+\hat e_{\text{switch}}(\hat g_{-,\gamma_1})$ (C.8). By Lemma 10 Part 2 (since $0\le\gamma_1$): $\hat e_{\text{orig}}(\hat g_{-,0})\ge\hat e_{\text{orig}}(\hat g_{-,\gamma_1})$ (C.9).
> 5. **Combine (C.10).** $\widehat{MR}(\hat g_{-,0})=\hat e_{\text{switch}}(\hat g_{-,0})/\hat e_{\text{orig}}(\hat g_{-,0})\le\hat e_{\text{switch}}(\hat g_{-,\gamma_1})/\hat e_{\text{orig}}(\hat g_{-,\gamma_1})=1$.
> 6. Since $\hat h_{-,0}(\hat g_{-,0})=\hat e_{\text{switch}}(\hat g_{-,0})\ge0$ automatically, Condition 8 holds at $\gamma=0$ **iff** $\hat e_{\text{orig}}(\hat g_{-,0})\le\epsilon_{\text{abs}}$. Together with C.10 this is the dichotomy in Proposition 11.
>
> **Why it fails for $\hat e_{\text{divide}}$ (p. 71).** $\hat e_{\text{divide}}$ is not an expectation over a distribution in which $X_1$ is independent of $(X_2,Y)$, because of its fixed pairing. So Condition 2 of Prop 11 does not apply.
^proof-prop11

### C.4 Proof of Lemma 13 (upper bound for $\widehat{MR}$), pp. 71-72

> [!theorem] Proof of Lemma 13, Part 1 (C.4.1): Eq 6.4 holds for all $f$ with $\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}}$
> If $\hat h_{+,\gamma}(\hat g_{+,\gamma})\ge0$, then as in C.5, $\hat h_{+,\gamma}(\hat g_{+,\gamma})/\epsilon_{\text{abs}}\le\hat h_{+,\gamma}(\hat g_{+,\gamma})/\hat e_{\text{orig}}(f)$ (C.11). For $\gamma\le0$:
> $$
> \hat e_{\text{orig}}(f)+\gamma\hat e_{\text{switch}}(f)\ge\hat h_{+,\gamma}(\hat g_{+,\gamma})\ \Rightarrow\ 1+\gamma\widehat{MR}(f)\ge\frac{\hat h_{+,\gamma}(\hat g_{+,\gamma})}{\hat e_{\text{orig}}(f)}\overset{(C.11)}{\ge}\frac{\hat h_{+,\gamma}(\hat g_{+,\gamma})}{\epsilon_{\text{abs}}}.
> $$
> Subtracting 1 and multiplying by $\gamma^{-1}<0$ flips the inequality: $\widehat{MR}(f)\le\{\hat h_{+,\gamma}(\hat g_{+,\gamma})/\epsilon_{\text{abs}}-1\}\gamma^{-1}$.
^proof-lemma13-p1

> [!theorem] Proof of Lemma 13, Part 2 (C.4.2): equality cases
> Take $f=\hat g_{+,\gamma}$.
> - **If $\hat h_{+,\gamma}(\hat g_{+,\gamma})=0$:** $0=\hat e_{\text{orig}}(\hat g_{+,\gamma})+\gamma\hat e_{\text{switch}}(\hat g_{+,\gamma})$, so $-\hat e_{\text{switch}}(\hat g_{+,\gamma})/\hat e_{\text{orig}}(\hat g_{+,\gamma})=1/\gamma$. Then $\{0/\epsilon_{\text{abs}}-1\}\gamma^{-1}=-\gamma^{-1}=\widehat{MR}(\hat g_{+,\gamma})$.
> - **If $\hat e_{\text{orig}}(\hat g_{+,\gamma})=\epsilon_{\text{abs}}$:** $\Big\{\frac{\hat e_{\text{orig}}(\hat g_{+,\gamma})+\gamma\hat e_{\text{switch}}(\hat g_{+,\gamma})}{\hat e_{\text{orig}}(\hat g_{+,\gamma})}-1\Big\}\gamma^{-1}=\Big\{1+\gamma\widehat{MR}(\hat g_{+,\gamma})-1\Big\}\gamma^{-1}=\widehat{MR}(\hat g_{+,\gamma})$.
^proof-lemma13-p2

### C.5 Proof of Lemma 14 (monotonicity, upper search), pp. 72-74

> [!theorem] Proof of Lemma 14, Part 1 (C.5.1): $\hat h_{+,\gamma}(\hat g_{+,\gamma})$ increases in $\gamma$
> Let $\gamma_1<\gamma_2$. Using nonnegativity of $\hat e_{\text{switch}}$,
> $$
> \hat e_{\text{orig}}(f)+\gamma_1\hat e_{\text{switch}}(f)<\hat e_{\text{orig}}(f)+\gamma_2\hat e_{\text{switch}}(f),\ \text{i.e. }\hat h_{+,\gamma_1}(f)<\hat h_{+,\gamma_2}(f).\qquad(C.12)
> $$
> Then $\hat h_{+,\gamma_1}(\hat g_{+,\gamma_1})\overset{(C.2)}{\le}\hat h_{+,\gamma_1}(\hat g_{+,\gamma_2})\overset{(C.12)}{<}\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})$.
>
> *Caveat.* The source cites the assumption $0\le\hat e_{\text{switch}}(f)$ but writes the strict inequality in C.12. Strictness needs $\hat e_{\text{switch}}(f)>0$; with only $\ge$, C.12 and the conclusion hold as weak inequalities, which is all the binary search needs.
^proof-lemma14-p1

> [!theorem] Proof of Lemma 14, Part 2 (C.5.2): $\hat e_{\text{orig}}(\hat g_{+,\gamma})$ decreases for $\gamma\le0$, and Condition 12 holds at $\gamma=0$
> Let $\gamma_1<\gamma_2\le0$.
>
> **Step A (C.13): $\hat e_{\text{switch}}$ falls as $\gamma$ rises.** From C.2 rewritten with C.3:
> $$
> \hat h_{+,\gamma_2}(\hat g_{+,\gamma_1})+(\gamma_1-\gamma_2)\hat e_{\text{switch}}(\hat g_{+,\gamma_1})\le\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})+(\gamma_1-\gamma_2)\hat e_{\text{switch}}(\hat g_{+,\gamma_2}).
> $$
> C.1 (with C.2 at $\gamma_2$) gives $(\gamma_1-\gamma_2)\hat e_{\text{switch}}(\hat g_{+,\gamma_1})\le(\gamma_1-\gamma_2)\hat e_{\text{switch}}(\hat g_{+,\gamma_2})$, so $\hat e_{\text{switch}}(\hat g_{+,\gamma_1})\ge\hat e_{\text{switch}}(\hat g_{+,\gamma_2})$. Multiplying by $\gamma_2\le0$ gives $\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_1})\le\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_2})$.
>
> **Step B (C.14): $\hat e_{\text{orig}}$ falls as $\gamma$ rises.** From C.2 at $\gamma_2$:
> $$
> \hat e_{\text{orig}}(\hat g_{+,\gamma_2})+\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_2})\le\hat e_{\text{orig}}(\hat g_{+,\gamma_1})+\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_1}).
> $$
> By C.13 the $\gamma_2\hat e_{\text{switch}}$ term on the left is at least the one on the right. C.1 then gives $\hat e_{\text{orig}}(\hat g_{+,\gamma_2})\le\hat e_{\text{orig}}(\hat g_{+,\gamma_1})$.
>
> **Step C: Condition 12 at $\gamma=0$ when $\epsilon_{\text{abs}}\ge\min_f\hat e_{\text{orig}}(f)$.** At $\gamma=0$, $\hat h_{+,0}(\hat g_{+,0})=\hat e_{\text{orig}}(\hat g_{+,0})$, which is positive by assumption, so the first inequality of Condition 12 holds. Also
> $$
> \hat e_{\text{orig}}(\hat g_{+,0})=\hat h_{+,0}(\hat g_{+,0})=\min_{f\in\mathcal F}\hat h_{+,0}(f)=\min_{f\in\mathcal F}\hat e_{\text{orig}}(f)\le\epsilon_{\text{abs}},
> $$
> so the second holds too. This is why the upper search can always start at $\gamma=0$.
^proof-lemma14-p2

> [!theorem] Proof of Lemma 14, Part 3 (C.5.3): increasing and decreasing ranges of the upper bound
> Claim: $\{\hat h_{+,\gamma}(\hat g_{+,\gamma})/\epsilon_{\text{abs}}-1\}\gamma^{-1}$ increases in $\gamma$ where $\hat e_{\text{orig}}(\hat g_{+,\gamma})\le\epsilon_{\text{abs}}$ and $\gamma<0$, and decreases where $\hat e_{\text{orig}}(\hat g_{+,\gamma})>\epsilon_{\text{abs}}$ and $\gamma<0$.
>
> **Increasing range.** Let $\gamma_1<\gamma_2<0$ with both $\hat e_{\text{orig}}(\hat g_{+,\gamma_i})\le\epsilon_{\text{abs}}$. Then $1/\gamma_2<1/\gamma_1$, and multiplying by $\hat e_{\text{orig}}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}\le0$:
> $$
> \frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}}{\gamma_2}\ \ge\ \frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}}{\gamma_1}.\qquad(C.15)
> $$
> (The source prints C.15 with a strict ">", which needs $\hat e_{\text{orig}}(\hat g_{+,\gamma_1})<\epsilon_{\text{abs}}$.) From C.2, $\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})\le\gamma_2\hat e_{\text{switch}}(\hat g_{+,\gamma_1})+\hat e_{\text{orig}}(\hat g_{+,\gamma_1})$. Subtract $\epsilon_{\text{abs}}$ and divide by $\gamma_2<0$:
> $$
> \frac{\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}}{\gamma_2}\ge\hat e_{\text{switch}}(\hat g_{+,\gamma_1})+\frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}}{\gamma_2}\overset{(C.15)}{\ge}\hat e_{\text{switch}}(\hat g_{+,\gamma_1})+\frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}}{\gamma_1}=\frac{\hat h_{+,\gamma_1}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}}{\gamma_1}.
> $$
> Dividing by $\epsilon_{\text{abs}}$ shows the bound at $\gamma_2$ is at least the bound at $\gamma_1$.
>
> **Decreasing range.** Let $\gamma_1<\gamma_2<0$ with both $\hat e_{\text{orig}}(\hat g_{+,\gamma_i})\ge\epsilon_{\text{abs}}$. Now $\hat e_{\text{orig}}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}\ge0$, so
> $$
> \frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}}{\gamma_2}\ \le\ \frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}}{\gamma_1}.\qquad(C.16)
> $$
> From C.2, $\hat h_{+,\gamma_1}(\hat g_{+,\gamma_1})\le\gamma_1\hat e_{\text{switch}}(\hat g_{+,\gamma_2})+\hat e_{\text{orig}}(\hat g_{+,\gamma_2})$. Subtract $\epsilon_{\text{abs}}$ and divide by $\gamma_1<0$:
> $$
> \frac{\hat h_{+,\gamma_1}(\hat g_{+,\gamma_1})-\epsilon_{\text{abs}}}{\gamma_1}\ge\hat e_{\text{switch}}(\hat g_{+,\gamma_2})+\frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}}{\gamma_1}\overset{(C.16)}{\ge}\hat e_{\text{switch}}(\hat g_{+,\gamma_2})+\frac{\hat e_{\text{orig}}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}}{\gamma_2}=\frac{\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}}{\gamma_2}.
> $$
> Dividing by $\epsilon_{\text{abs}}$ shows the bound at $\gamma_1$ is at least the bound at $\gamma_2$, i.e. decreasing.
>
> *Typo in source (p. 74).* The last line of this chain is printed as $(\hat h_{+,\gamma_1}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}})/\gamma_2$. It should read $\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})$, since $\hat e_{\text{switch}}(\hat g_{+,\gamma_2})+\{\hat e_{\text{orig}}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}\}/\gamma_2=\{\hat h_{+,\gamma_2}(\hat g_{+,\gamma_2})-\epsilon_{\text{abs}}\}/\gamma_2$.
^proof-lemma14-p3

## Examples

> [!example] Why the two monotonicity facts license bisection (illustrative)
> Fix $\epsilon_{\text{abs}}=1$ and suppose that at $\gamma=-0.2$ the upper-search minimizer has $\hat e_{\text{orig}}=0.95\le1$ and $\hat h_{+}=0.95-0.2\times1.6=0.63\ge0$, so Condition 12 holds and Lemma 13 gives $\widehat{MR}\le(0.63-1)/(-0.2)=1.85$. Part 2 says that moving to a more negative $\gamma$ can only *raise* $\hat e_{\text{orig}}$ of the minimizer, so once a $\gamma$ breaks the loss constraint, every smaller $\gamma$ does too. Part 3 says that inside the feasible range the bound *falls* as $\gamma$ falls. So the tightest feasible bound sits at the feasibility boundary, and bisection finds it.
^ex-why-the-two-monotonicity

## Connections

- The structure (parametric linear subproblems plus monotonicity of the optimal value in the parameter) is Dinkelbach's (1967) method for fractional programs. The constraint on the denominator, $\hat e_{\text{orig}}\le\epsilon_{\text{abs}}$, is what makes Part 3 of Lemmas 10 and 14 necessary.
- The same "fit-versus-reliance" trade-off curve appears when screening alternative model fits by in-sample loss: see [[Model Selection and Overfitting]].

## See Also
- [[Model Class Reliance - Binary Search Computation]]: statements, figures and the algorithm
- [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]]: the statistical proofs
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
