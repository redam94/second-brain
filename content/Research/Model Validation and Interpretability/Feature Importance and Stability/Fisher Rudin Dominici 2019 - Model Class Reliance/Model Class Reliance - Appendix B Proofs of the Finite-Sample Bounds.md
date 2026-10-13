---
title: Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds
tags:
  - source/ingested
  - topic/model-validation
  - topic/learning-theory
  - type/proof
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "App B.2 pp. 49-51 (Eqs B.5-B.9); B.3.1-B.3.4 pp. 51-54 (Eqs B.10-B.19); B.4 p. 54 (Eqs B.20-B.21); B.5.1-B.5.7 pp. 55-62 (Eqs B.22-B.45)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]"
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
used_by:
  - "[[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]"
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - MCR Appendix B Proofs
  - Proof of Theorem 25 (MCR)
  - Proof of Lemma 24 (MCR)
---

# Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds

> [!summary]
> Full derivations behind the statistical results in [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]. **Lemma 24** turns bounds on two losses into bounds on their ratio or difference. **Theorem 4** (outer bound) follows in four steps: Lemma 23 (Hoeffding) puts the population optimizer into the enlarged empirical Rashomon set; then Lemma 24 plus Hoeffding's bound for U-statistics controls the MR estimation error at that one model; a $\delta/3+2\delta/3$ union bound finishes. **Theorem 25** gives uniform deviations over $\mathcal F$ through a cover chosen against a data-dependent mixture distribution, which is why the covering number must hold for *any* distribution. **Theorem 6** (inner bound) combines Theorem 25 twice at level $\delta/2$. The difference-based variants drop Assumption 3 throughout.
^summary

## Overview

Notation: $\tilde L(f,z)=L(f,z)-L(f_{\text{ref}},z)$; $\hat{\mathbb E}$ is the sample average; $\mathcal G_r$ is an $r$-margin-expectation-cover of size $\mathcal N(\mathcal F,r)$ (Eq 4.4); $f_{\pm,\epsilon}$ are the population maximizer/minimizer of MR over $\mathcal R(\epsilon)$. The functions
$$
q_{\text{difference}}(k_Z,k_X)=k_Z+k_X,\qquad q_{\text{ratio}}(k_Z,k_X)=\frac{B_{\text{switch}}}{b_{\text{orig}}}-\frac{B_{\text{switch}}-k_Z}{b_{\text{orig}}+k_X}
$$
are from Lemma 24. Two concentration tools recur:
- **Hoeffding's inequality** (Hoeffding 1963, Thm 2) for the iid average $\hat e_{\text{orig}}$: exponent $-2n t^2/(\text{range})^2$.
- **Hoeffding's bound for U-statistics** (Hoeffding 1963, Eq 5.7; Serfling 1980, Thm A p. 201) for the order-2 U-statistic $\hat e_{\text{switch}}$ (and $\hat e_{\text{divide}}$): exponent $-n t^2/(\text{range})^2$, half as strong, which is why every $\hat e_{\text{switch}}$ term has $\log(\cdot)/n$ where the $\hat e_{\text{orig}}$ term has $\log(\cdot)/2n$.

## Main Content

### B.2 Proof of Lemma 24 (pp. 49-51)

> [!theorem] Proof of Lemma 24: from loss bounds to ratio and difference bounds
> **Difference (B.5-B.6).** $|(Z-X)-(\mu_Z-\mu_X)|\le|Z-\mu_Z|+|\mu_X-X|\le k_Z+k_X$.
>
> **Ratio (B.7-B.9).** Let $A_Z=\max(Z,\mu_Z)$, $a_X=\min(X,\mu_X)$, $d_Z=|Z-\mu_Z|$, $d_X=|X-\mu_X|$. Then $\max(X,\mu_X)=a_X+d_X$ and $\min(Z,\mu_Z)=A_Z-d_Z$, so both $Z/X$ and $\mu_Z/\mu_X$ lie in
> $$
> \Big[\frac{\min(Z,\mu_Z)}{\max(X,\mu_X)},\frac{\max(Z,\mu_Z)}{\min(X,\mu_X)}\Big]=\Big[\frac{A_Z-d_Z}{a_X+d_X},\frac{A_Z}{a_X}\Big],\quad\text{hence}\quad\Big|\frac ZX-\frac{\mu_Z}{\mu_X}\Big|\le\frac{A_Z}{a_X}-\frac{A_Z-d_Z}{a_X+d_X}.\qquad(B.9)
> $$
> **Partial derivatives of the right side of B.9:**
> $$
> \frac{\partial}{\partial a_X}=-\frac{A_Z}{a_X^2}+\frac{A_Z-d_Z}{(a_X+d_X)^2}\le0,\quad\frac{\partial}{\partial A_Z}=\frac1{a_X}-\frac1{a_X+d_X}\ge0,\quad\frac{\partial}{\partial d_X}=\frac{A_Z-d_Z}{(a_X+d_X)^2}>0,\quad\frac{\partial}{\partial d_Z}=\frac1{a_X+d_X}>0.
> $$
> So the bound is largest when $d_Z,d_X,A_Z$ are as large as possible and $a_X$ as small as possible. Under $d_Z\le k_Z$, $d_X\le k_X$, $a_X\ge b_{\text{orig}}>0$ and $A_Z\le B_{\text{switch}}$, this gives $q_{\text{ratio}}(k_Z,k_X)$.
^proof-lem-24

### B.3 Proof of Theorem 4 (pp. 51-54)

> [!theorem] Step 1 (B.3.1, Eqs B.10-B.12): $\mathbb P[\widehat{MR}(f_{+,\epsilon})\le\widehat{MCR}_+(\epsilon_{\text{out}})]\ge1-\delta/3$
> The event $\widehat{MR}(f_{+,\epsilon})\le\widehat{MCR}_+(\epsilon_{\text{out}})$ (B.10) always holds if $f_{+,\epsilon}\in\hat{\mathcal R}(\epsilon_{\text{out}})$, because $\widehat{MCR}_+(\epsilon_{\text{out}})$ is the maximum empirical MR over that set. So
> $$
> \mathbb P[\widehat{MR}(f_{+,\epsilon})>\widehat{MCR}_+(\epsilon_{\text{out}})]\le\mathbb P[f_{+,\epsilon}\notin\hat{\mathcal R}(\epsilon_{\text{out}})]\le\delta/3,\qquad(B.11\text{-}B.12)
> $$
> by Lemma 23 at level $\delta/3$ (that is where $\log(3\delta^{-1})$ in $\epsilon_{\text{out}}$ comes from).
^proof-thm4-step1

> [!theorem] Step 2 (B.3.2, Eq B.13): deterministic decomposition
> When B.10 holds, adding and subtracting $MR(f_{+,\epsilon})$:
> $$
> MR(f_{+,\epsilon})\le\widehat{MCR}_+(\epsilon_{\text{out}})+\big[MR(f_{+,\epsilon})-\widehat{MR}(f_{+,\epsilon})\big].\qquad(B.13)
> $$
^proof-thm4-step2

> [!theorem] Step 3 (B.3.3, Eqs B.14-B.16): the bracketed error exceeds $\mathcal Q_{\text{out}}$ with probability at most $2\delta/3$
> Define $q(k):=q_{\text{ratio}}(k,k/\sqrt2)$. Then
> $$
> \mathcal Q_{\text{out}}=q_{\text{ratio}}\Big(B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{n}},\,B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{2n}}\Big)=q\Big(B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{n}}\Big).
> $$
> The chain (B.14-B.16):
> $$
> \mathbb P\big[MR(f_{+,\epsilon})-\widehat{MR}(f_{+,\epsilon})>\mathcal Q_{\text{out}}\big]
> $$
> $$
> \le\mathbb P\Big[\big\{|\hat e_{\text{orig}}-e_{\text{orig}}|>B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{2n}}\big\}\cup\big\{|\hat e_{\text{switch}}-e_{\text{switch}}|>B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{n}}\big\}\Big]\quad\text{(Lemma 24)}
> $$
> $$
> \le2\exp\Big\{-\tfrac{2n}{B_{\text{ind}}^2}B_{\text{ind}}^2\tfrac{\log(6\delta^{-1})}{2n}\Big\}+2\exp\Big\{-\tfrac{n}{B_{\text{ind}}^2}B_{\text{ind}}^2\tfrac{\log(6\delta^{-1})}{n}\Big\}=\frac{2\delta}6+\frac{2\delta}6=\frac{2\delta}3,
> $$
> using a union bound and Hoeffding's bound for U-statistics (all evaluated at the fixed model $f_{+,\epsilon}$). Both $\hat e_{\text{orig}}(f_{+,\epsilon})$ and $\hat e_{\text{switch}}(f_{+,\epsilon})$ are U-statistics whose terms each have expectation $e_{\text{orig}}$ or $e_{\text{switch}}$, so they are unbiased and the bound applies (p. 52).
>
> **Difference version (p. 53).** With $MR_{\text{difference}}$, set $q(k)=q_{\text{difference}}(k,k/\sqrt2)$ and
> $$
> \mathcal Q_{\text{out,difference}}:=\Big(1+\tfrac1{\sqrt2}\Big)B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{n}}=q_{\text{difference}}\Big(B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{n}},B_{\text{ind}}\sqrt{\tfrac{\log(6\delta^{-1})}{2n}}\Big).
> $$
> The same proof then holds **without Assumption 3**. **$\hat e_{\text{divide}}$:** B.14-B.16 also hold with $\hat e_{\text{divide}}$ in place of $\hat e_{\text{switch}}$ throughout (including in Assumption 3), since the same U-statistic bound covers both.
^proof-thm4-step3

> [!theorem] Step 4 (B.3.4, Eqs B.17-B.19): combine
> $$
> \mathbb P\big(MCR_+(\epsilon)>\widehat{MCR}_+(\epsilon_{\text{out}})+\mathcal Q_{\text{out}}\big)=\mathbb P\big(MR(f_{+,\epsilon})>\widehat{MCR}_+(\epsilon_{\text{out}})+\mathcal Q_{\text{out}}\big)
> $$
> $$
> \le\mathbb P\big[\widehat{MR}(f_{+,\epsilon})>\widehat{MCR}_+(\epsilon_{\text{out}})\big]+\mathbb P\big[MR(f_{+,\epsilon})-\widehat{MR}(f_{+,\epsilon})>\mathcal Q_{\text{out}}\big]\le\frac\delta3+\frac{2\delta}3=\delta.\qquad(B.17)
> $$
> **Eq 4.3 (lower side).** Analogously, $\mathbb P[\widehat{MR}(f_{-,\epsilon})<\widehat{MCR}_-(\epsilon_{\text{out}})]\le\delta/3$; on the complement, $MR(f_{-,\epsilon})\ge\widehat{MCR}_-(\epsilon_{\text{out}})-[\widehat{MR}(f_{-,\epsilon})-MR(f_{-,\epsilon})]$; $\mathbb P[\widehat{MR}(f_{-,\epsilon})-MR(f_{-,\epsilon})>q(B_{\text{ind}}\sqrt{\log(6\delta^{-1})/n})]\le2\delta/3$ (B.18); and the union bound gives $\delta$ (B.19). The difference version again holds without Assumption 3, with $q=q_{\text{difference}}(k,k/\sqrt2)$ in B.18-B.19.
^proof-thm4-step4

### B.4 Proof of Corollary 22 (p. 54)

> [!theorem] Proof of Corollary 22 (Eqs B.20-B.21)
> By definition $MR(f_{-,\epsilon})\le MR(f^\star)\le MR(f_{+,\epsilon})$ (with $\epsilon=0$, since $f^\star\in\mathcal R(0)$). So
> $$
> \mathbb P\{MR(f^\star)\in[\widehat{MCR}_-(\epsilon_{\text{best}})-\mathcal Q_{\text{best}},\widehat{MCR}_+(\epsilon_{\text{best}})+\mathcal Q_{\text{best}}]\}\ge1-\mathbb P\{MR(f_{-,\epsilon})<\widehat{MCR}_-(\epsilon_{\text{best}})-\mathcal Q_{\text{best}}\}-\mathbb P\{MR(f_{+,\epsilon})>\widehat{MCR}_+(\epsilon_{\text{best}})+\mathcal Q_{\text{best}}\}\ \ (B.20)
> $$
> $$
> \ge1-\delta/2-\delta/2\quad\text{(Theorem 4)},\qquad(B.21)
> $$
> because $\epsilon_{\text{best}}$ and $\mathcal Q_{\text{best}}$ are $\epsilon_{\text{out}}$ and $\mathcal Q_{\text{out}}$ with $\epsilon=0$ and $\delta$ replaced by $\delta/2$. With $\mathcal Q_{\text{best,difference}}=(1+1/\sqrt2)B_{\text{ind}}\sqrt{\log(12\delta^{-1})/n}$ (= $\mathcal Q_{\text{out,difference}}$ at $\delta/2$), the corollary holds without Assumption 3. (The source calls it "Theorem 22" in this sentence; it is Corollary 22.)
^proof-cor-22

### B.5 Proofs of Theorems 5, 25 and 6 (pp. 55-62)

Theorem 5 "follows directly" from Eq B.25 of Theorem 25 (statement in [[Model Class Reliance - Outer and Inner Finite-Sample Bounds#^thm-25]]).

> [!theorem] Proof of Eq B.22 (B.5.2, Eqs B.29-B.33): uniform deviation of $\hat e_{\text{orig}}$
> Let $\mathcal G_r$ be a minimal $r$-margin-expectation-cover, $D_p$ the population, $D_s$ the sample distribution, and $D^\star$ their uniform mixture: $\mathbb P_{D^\star}(Z\le z)=\tfrac12\mathbb P_{D_p}(Z\le z)+\tfrac12\mathbb P_{D_s}(Z\le z)$ (B.29). For any $f$ pick $g\in\mathcal G_r$ with $\mathbb E_{D^\star}|L(g,Z)-L(f,Z)|\le r$. Then (B.30)
> $$
> |\hat{\mathbb E}L(f)-\mathbb EL(f)|\le|\hat{\mathbb E}L(g)-\mathbb EL(g)|+\mathbb E_{D_p}|L(g)-L(f)|+\mathbb E_{D_s}|L(f)-L(g)|=|\hat{\mathbb E}L(g)-\mathbb EL(g)|+2\mathbb E_{D^\star}|L(g)-L(f)|\le|\hat{\mathbb E}L(g)-\mathbb EL(g)|+2r.
> $$
> Hence (B.31-B.33)
> $$
> \mathbb P\Big(\sup_f|\hat{\mathbb E}L(f)-\mathbb EL(f)|>B_{\text{ind}}\sqrt{\tfrac{\log(2\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big)\le\sum_{g\in\mathcal G_r}\mathbb P\Big(|\hat{\mathbb E}L(g)-\mathbb EL(g)|>B_{\text{ind}}\sqrt{\tfrac{\log(2\delta^{-1}\mathcal N)}{2n}}\Big)\le\mathcal N(\mathcal F,r)\cdot2\exp\{-\log(2\delta^{-1}\mathcal N)\}=\delta,
> $$
> by the union bound and Hoeffding's inequality ($L(g,Z)$ lies in an interval of length $B_{\text{ind}}$). Because $D_s$ depends on the data, the cover has to be valid for any distribution; this is why Eq 4.4 quantifies over all $D$.
^proof-b22

> [!theorem] Proof of Eq B.23 (B.5.3)
> "Nearly identical" to B.22: replace $L$ by $\tilde L$ and $B_{\text{ind}}$ by $2B_{\text{ref}}$ (the range of $\tilde L$ under Assumption 2) in B.30-B.33.
^proof-b23

> [!theorem] Proof of Eq B.24 (B.5.4, Eq B.34): uniform deviation of $\hat e_{\text{switch}}$
> Replace the distributions by "switched" ones:
> - $\tilde D_p$: product of the population $(Y,X_2)$ marginal and the population $X_1$ marginal, $F_{\tilde D_p}(y,x_1,x_2)=F_{D_p}(Y=y,X_2=x_2)F_{D_p}(X_1=x_1)$, so $e_{\text{switch}}(f)=\mathbb E_{\tilde D_p}L(f,Z)$;
> - $\tilde D_s$: the empirical distribution of the $n(n-1)$ off-diagonal pairs, $\mathbb P_{\tilde D_s}(y,x_1,x_2)=\frac1{n(n-1)}\sum_i\sum_{j\ne i}\mathbb 1(y_{[j]}=y,\mathbf X_{1[i,\cdot]}=x_1,\mathbf X_{2[j,\cdot]}=x_2)$, so $\hat e_{\text{switch}}(f)=\mathbb E_{\tilde D_s}L(f,Z)$;
> - $\tilde D^\star$: their uniform mixture, as in B.29.
>
> With $g\in\mathcal G_r$ chosen so $\mathbb E_{\tilde D^\star}|L(g)-L(f)|\le r$, the same argument gives $|\hat e_{\text{switch}}(f)-e_{\text{switch}}(f)|\le|\hat e_{\text{switch}}(g)-e_{\text{switch}}(g)|+2r$. A union bound over $\mathcal G_r$ and Hoeffding's bound for U-statistics (Eq 5.7 of Hoeffding 1963, as in B.15) give
> $$
> \mathbb P\Big(\sup_f|\hat e_{\text{switch}}(f)-e_{\text{switch}}(f)|>B_{\text{ind}}\sqrt{\tfrac{\log(2\delta^{-1}\mathcal N(\mathcal F,r))}{n}}+2r\Big)\le\mathcal N(\mathcal F,r)\,2\exp\Big\{-\tfrac{n}{B_{\text{ind}}^2}B_{\text{ind}}^2\tfrac{\log(2\delta^{-1}\mathcal N)}{n}\Big\}=\delta.\qquad(B.34)
> $$
> Note that B.24 is stated with $\mathcal N(\mathcal F,r)$; there is no $\sqrt2$ in it.
^proof-b24

> [!theorem] Proof of Eq B.25 (B.5.5, Eqs B.35-B.37): uniform ratio bound
> By Lemma 24 and the definition of $\mathcal Q_4$ (B.27), a ratio error above $\mathcal Q_4$ requires one of two deviations:
> $$
> \mathbb P[\sup_f|\text{ratio error}|>\mathcal Q_4]\le\mathbb P\Big[\sup_f|\hat e_{\text{orig}}-e_{\text{orig}}|>B_{\text{ind}}\sqrt{\tfrac{\log(4\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big]+\mathbb P\Big[\sup_f|\hat e_{\text{switch}}-e_{\text{switch}}|>B_{\text{ind}}\sqrt{\tfrac{\log(4\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+2r\sqrt2\Big]\le\frac\delta2+\frac\delta2.\qquad(B.36\text{-}B.37)
> $$
> The first term is B.22 at level $\delta/2$. The second is **B.24 applied at level $\delta/2$ with cover radius $r\sqrt2$** in place of $r$: substituting gives exactly $B_{\text{ind}}\sqrt{\log(4\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))/n}+2r\sqrt2$. That is the only place the $\sqrt2$ enters. The source gives no reason for using radius $r\sqrt2$ rather than $r$ for the switched term. Since B.24 holds for any $r>0$, the choice is valid, but it is not derived from any property of the pairs distribution.
>
> *Printing inconsistency.* B.25 is printed with the ratio $\hat e_{\text{orig}}/\hat e_{\text{switch}}$ against $e_{\text{orig}}/e_{\text{switch}}$, but the first argument of $q_{\text{ratio}}$ in $\mathcal Q_4$ ($k_Z$, the numerator's deviation) is the $\hat e_{\text{switch}}$ term, and Lemma 24's conditions ($0<b_{\text{orig}}\le X$, $Z\le B_{\text{switch}}$) only make sense with $\hat e_{\text{switch}}$ in the numerator. The intended statement is the MR ratio $\hat e_{\text{switch}}/\hat e_{\text{orig}}$, matching Theorem 5.
^proof-b25

> [!theorem] Proof of Eq B.26 (B.5.6): uniform difference bound
> Same steps as B.35-B.37, with B.28 and the difference part of Lemma 24:
> $$
> \mathbb P[\sup_f|\{\hat e_{\text{switch}}-\hat e_{\text{orig}}\}-\{e_{\text{switch}}-e_{\text{orig}}\}|>\mathcal Q_{4,\text{difference}}]\le\frac\delta2+\frac\delta2.
> $$
> No ratio is formed, so Assumption 3 is not needed. This is the uniform bound for $MR_{\text{difference}}$, i.e. the difference analogue of Theorem 5.
^proof-b26

> [!theorem] Proof of Theorem 6, Eq 4.6 (B.5.7, Eqs B.38-B.43)
> **Bad event (B.38).** $E$: some $\hat f_{+,\epsilon_{\text{in}}}\in\arg\max_{f\in\hat{\mathcal R}(\epsilon_{\text{in}})}\widehat{MR}(f)$ has $MCR_+(\epsilon)<MR(\hat f_{+,\epsilon_{\text{in}}})$. Because $\epsilon_{\text{in}}<\epsilon$, $E$ should be unlikely.
>
> **$E$ is unlikely (B.39-B.40).**
> $$
> \mathbb P(E)\le\mathbb P\{\exists f\in\hat{\mathcal R}(\epsilon_{\text{in}}):MCR_+(\epsilon)<MR(f)\}=\mathbb P\{\exists f\in\hat{\mathcal R}(\epsilon_{\text{in}})\setminus f_{\text{ref}}:MCR_+(\epsilon)<MR(f)\}
> $$
> (since $MCR_+(\epsilon)\ge MR(f_{\text{ref}})$)
> $$
> \le\mathbb P\{\exists f\in\hat{\mathcal R}(\epsilon_{\text{in}})\setminus f_{\text{ref}}:\mathbb E\tilde L(f,Z)>\epsilon\}
> $$
> (a model with MR above $MCR_+(\epsilon)$ cannot be in $\mathcal R(\epsilon)$)
> $$
> =\mathbb P\{\exists f\in\mathcal F,\ \mathbb E\tilde L(f,Z)>\epsilon:\ \hat{\mathbb E}\tilde L(f,Z)\le\epsilon_{\text{in}}\}
> $$
> $$
> =\mathbb P\Big\{\exists f,\ \mathbb E\tilde L>\epsilon:\ \hat{\mathbb E}\tilde L-\epsilon\le-2B_{\text{ref}}\sqrt{\tfrac{\log(4\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}-2r\Big\}\quad\text{(definition of }\epsilon_{\text{in}})
> $$
> $$
> \le\mathbb P\Big\{\sup_f|\hat{\mathbb E}\tilde L-\mathbb E\tilde L|\ge2B_{\text{ref}}\sqrt{\tfrac{\log(4\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big\}=\frac\delta2\quad\text{(B.23 at }\delta/2).
> $$
>
> **Off $E$ (B.41).** For every $\hat f_{+,\epsilon_{\text{in}}}$ in the argmax:
> $$
> MCR_+(\epsilon)\ge MR(\hat f_{+,\epsilon_{\text{in}}})=\widehat{MR}(\hat f_{+,\epsilon_{\text{in}}})-\{\widehat{MR}(\hat f_{+,\epsilon_{\text{in}}})-MR(\hat f_{+,\epsilon_{\text{in}}})\}=\widehat{MCR}_+(\epsilon_{\text{in}})-\{\cdots\}\ge\widehat{MCR}_+(\epsilon_{\text{in}})-\sup_{f\in\mathcal F}|\widehat{MR}(f)-MR(f)|.
> $$
>
> **The $\delta/2$-level error term (B.42).**
> $$
> \mathcal Q_{\text{in}}=\frac{B_{\text{switch}}}{b_{\text{orig}}}-\frac{B_{\text{switch}}-\Big\{B_{\text{ind}}\sqrt{\frac{\log(8\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+2r\sqrt2\Big\}}{b_{\text{orig}}+\Big\{B_{\text{ind}}\sqrt{\frac{\log(8\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big\}}=q_{\text{ratio}}\Big(B_{\text{ind}}\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+2r\sqrt2,\ B_{\text{ind}}\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big),
> $$
> i.e. $\mathcal Q_4$ (equivalently $q(\delta,r,n)$ of Eq 4.5) at level $\delta/2$. By Theorem 25 the sup in B.41 is below $\mathcal Q_{\text{in}}$ with probability at least $1-\delta/2$.
>
> **Union bound (B.43).**
> $$
> \mathbb P\{MCR_+(\epsilon)<\widehat{MCR}_+(\epsilon_{\text{in}})-\mathcal Q_{\text{in}}\}\le\mathbb P(E)+\mathbb P\{\sup_f|\widehat{MR}-MR|>\mathcal Q_{\text{in}}\}\le\frac\delta2+\frac\delta2.
> $$
^proof-thm6-46

> [!theorem] Theorem 6 without Assumption 3, and Eq 4.7 (pp. 60-62, Eqs B.44-B.45)
> **Difference version of 4.6.** With $MR=e_{\text{switch}}-e_{\text{orig}}$ and
> $$
> \mathcal Q_{\text{in,difference}}=B_{\text{ind}}\Big\{\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}\Big\}+2r(\sqrt2+1)=q_{\text{difference}}\Big(B_{\text{ind}}\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+2r\sqrt2,\ B_{\text{ind}}\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big),
> $$
> the proof of 4.6 holds without Assumption 3, using B.26 in B.43.
>
> **Eq 4.7.** Bad event (B.44): some $\hat f_{-,\epsilon_{\text{in}}}\in\arg\min_{\hat{\mathcal R}(\epsilon_{\text{in}})}\widehat{MR}$ has $MCR_-(\epsilon)>MR(\hat f_{-,\epsilon_{\text{in}}})$. As in B.40, $\mathbb P(\text{B.44})\le\mathbb P\{\exists f,\mathbb E\tilde L>\epsilon:\hat{\mathbb E}\tilde L\le\epsilon_{\text{in}}\}\le\delta/2$. Off B.44, $MCR_-(\epsilon)\le\widehat{MCR}_-(\epsilon_{\text{in}})+\sup_f|\widehat{MR}(f)-MR(f)|$. The union bound gives $\delta/2+\delta/2$ (B.45). The difference version again uses $\mathcal Q_{\text{in,difference}}$ and B.26.
^proof-thm6-47

## Examples

> [!example] Where the constants $3$, $6$, $4$ and $8$ inside the logs come from
> - $\epsilon_{\text{out}}$ uses $\log(3\delta^{-1})$: Lemma 23 is spent at $\delta/3$.
> - $\mathcal Q_{\text{out}}$ uses $\log(6\delta^{-1})$: the remaining $2\delta/3$ is split over two two-sided Hoeffding bounds, each $2\exp(\cdot)=2\delta/6$.
> - $\epsilon_{\text{in}}$ uses $\log(4\delta^{-1}\mathcal N)$: B.23 at level $\delta/2$, where B.23 itself has $\log(2\delta^{-1}\mathcal N)$.
> - $\mathcal Q_{\text{in}}$ uses $\log(8\delta^{-1}\mathcal N)$: B.25 at level $\delta/2$, where B.25 already spends $\delta/2$ on each of B.22 and B.24.
> - $\epsilon_{\text{best}},\mathcal Q_{\text{best}}$ use $\log(6\delta^{-1}),\log(12\delta^{-1})$: Theorem 4 at $\delta/2$.
^ex-where-the-constants-and

## Connections

- The B.5.2 trick (choose the cover against a mixture of population and sample distributions, so the same $g$ approximates $f$ in both) is a standard route to uniform laws of large numbers; it is the formal reason the in-sample $\epsilon$-band does not overfit when $\mathcal N(\mathcal F,r)$ is controlled. See [[Model Selection and Overfitting]].
- Treating $\hat e_{\text{switch}}$ as a U-statistic, rather than as a single random permutation, is what makes Hoeffding's U-statistic bound available: [[Model Reliance - Permutation Importance as a U-Statistic]].

## See Also
- [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]: the statements these proofs support
- [[Model Class Reliance - Appendix C Proofs of the Binary Search Lemmas]]: the computational proofs
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
