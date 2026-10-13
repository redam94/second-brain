---
title: Model Class Reliance - Outer and Inner Finite-Sample Bounds
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/learning-theory
  - type/theorem
  - type/proof
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§4.1 pp. 12-15 (Assumptions 1-3, Thms 4-6, Eqs 4.2-4.7, Fig. 3 p. 16); App A.4 p. 45 (Cor. 22); App A.5 pp. 45-46; App B.1-B.5 pp. 48-62 (Lemmas 23-24, Thm 25; proof summaries, full proofs in the App B proofs note)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
used_by:
  - "[[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]]"
  - "[[Rashomon-Set Confidence Intervals and Profile Likelihood]]"
  - "[[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]"
aliases:
  - Outer MCR Bound
  - Inner MCR Bound
  - Uniform Bound for Model Reliance
  - r-margin-expectation-cover
  - MCR Theorem 4
  - MCR Theorem 6
---

# Model Class Reliance - Outer and Inner Finite-Sample Bounds

> [!summary]
> Under three loss-boundedness assumptions, the paper gives two-sided guarantees that empirical MCR estimates population MCR. **Theorem 4 (outer):** with probability at least $1-\delta$, $MCR_+(\epsilon)\le\widehat{MCR}_+(\epsilon_{\text{out}})+\mathcal Q_{\text{out}}$, with $\epsilon_{\text{out}}=\epsilon+2B_{\text{ref}}\sqrt{\log(3\delta^{-1})/2n}$. It needs no complexity limit, because complexity enters through the size of $\hat{\mathcal R}$. **Theorem 5:** a covering number $\mathcal N(\mathcal F,r)$ bounds $\sup_f|\widehat{MR}-MR|$ uniformly. **Theorem 6 (inner):** $MCR_+(\epsilon)\ge\widehat{MCR}_+(\epsilon_{\text{in}})-\mathcal Q_{\text{in}}$, with a *shrunken* threshold $\epsilon_{\text{in}}<\epsilon$. If $\widehat{MCR}_\pm(\epsilon_{\text{in}})\approx\widehat{MCR}_\pm(\epsilon_{\text{out}})$, then $\widehat{MCR}_\pm(\epsilon)$ is close to its target. The bounds are too wide for practical CIs, so the paper uses the bootstrap in practice.
^summary

## Overview

These results justify the *point estimator* $[\widehat{MCR}_-(\epsilon),\widehat{MCR}_+(\epsilon)]$ (§4.1, p. 12). The authors are explicit that the weak assumptions, "typical for statistical-learning-theoretic analysis", make the implied CIs "impractically large". They therefore serve to show *when* empirical MCR is sensible. Sampling variability in §9.1 and §10 is handled with the bootstrap.

## Main Content

### Assumptions (§4.1, p. 12)

Let $b_{\text{orig}},B_{\text{ind}},B_{\text{ref}},B_{\text{switch}}\in\mathbb R$ be known constants. Each assumption is a property of a given $f\in\mathcal F$.

> [!definition] Assumptions 1-3: Bounded losses (p. 12)
> - **Assumption 1 (bounded individual loss):** $0\le L(f,(y,x_1,x_2))\le B_{\text{ind}}$ for all $(y,x_1,x_2)\in\mathcal Y\times\mathcal X_1\times\mathcal X_2$.
> - **Assumption 2 (bounded relative loss):** $|L(f,(y,x_1,x_2))-L(f_{\text{ref}},(y,x_1,x_2))|\le B_{\text{ref}}$ for all $(y,x_1,x_2)\in\mathcal Z$.
> - **Assumption 3 (bounded aggregate loss):** $\mathbb P\{0<b_{\text{orig}}\le\hat e_{\text{orig}}(f)\}=\mathbb P\{\hat e_{\text{switch}}(f)\le B_{\text{switch}}\}=1$.
>
> **Setting the constants in practice.** An unbounded loss such as squared error is allowed if $Y$ and the predictions lie in a known range; see Lemmas 17-18 in [[Model Class Reliance for Linear and RKHS Model Classes]].
> - $b_{\text{orig}}$: fit a highly flexible model and take half (or any positive fraction) of its cross-validated loss.
> - $B_{\text{switch}}$: set it to $B_{\text{ind}}$, which is conservative. For non-separable binary classification no linear classifier can misclassify every point, so $B_{\text{ind}}>B_{\text{switch}}$.
> - $B_{\text{ref}}$: may be set to $B_{\text{ind}}$ if $f_{\text{ref}}$ satisfies Assumption 1.
>
> With difference-based MR, Assumption 3 is not needed.
^def-assumptions

### Theorem 4: outer bounds

> [!theorem] Theorem 4: "Outer" MCR bounds (pp. 12-13, Eqs 4.2-4.3)
> Given $\epsilon\ge 0$, let $f_{+,\epsilon}\in\arg\max_{\mathcal R(\epsilon)}MR(f)$ and $f_{-,\epsilon}\in\arg\min_{\mathcal R(\epsilon)}MR(f)$. If $f_{+,\epsilon}$ and $f_{-,\epsilon}$ satisfy **Assumptions 1, 2 and 3**, then
> $$
> \mathbb P\Big(MCR_+(\epsilon)>\widehat{MCR}_+(\epsilon_{\text{out}})+\mathcal Q_{\text{out}}\Big)\le\delta,\qquad(4.2)
> $$
> $$
> \mathbb P\Big(MCR_-(\epsilon)<\widehat{MCR}_-(\epsilon_{\text{out}})-\mathcal Q_{\text{out}}\Big)\le\delta,\qquad(4.3)
> $$
> where
> $$
> \epsilon_{\text{out}}:=\epsilon+2B_{\text{ref}}\sqrt{\frac{\log(3\delta^{-1})}{2n}},\qquad \mathcal Q_{\text{out}}:=\frac{B_{\text{switch}}}{b_{\text{orig}}}-\frac{B_{\text{switch}}-B_{\text{ind}}\sqrt{\frac{\log(6\delta^{-1})}{n}}}{b_{\text{orig}}+B_{\text{ind}}\sqrt{\frac{\log(6\delta^{-1})}{2n}}}.
> $$
> As $n\to\infty$, $\epsilon_{\text{out}}\to\epsilon$ and $\mathcal Q_{\text{out}}\to 0$.
>
> **Practical reading.** If $\widehat{MCR}_+(\epsilon)\approx\widehat{MCR}_+(\epsilon_{\text{out}})$, the empirical $\widehat{MCR}_+(\epsilon)$ is unlikely to substantially *underestimate* $MCR_+(\epsilon)$. Symmetrically, $\widehat{MCR}_-(\epsilon)$ is unlikely to substantially overestimate $MCR_-(\epsilon)$.
>
> **Implicit complexity control.** The bound needs no covering number, Rademacher complexity or VC dimension. A more flexible $\mathcal F$ enlarges $\hat{\mathcal R}(\epsilon_{\text{out}})$, so the optimized bound widens automatically. This is why it "naturally account[s] for potential overfitting" (p. 13).
^thm-4

> [!theorem] Proof of Theorem 4, 4 steps (App B.3, pp. 51-54)
> 1. **Step 1.** $\widehat{MR}(f_{+,\epsilon})\le\widehat{MCR}_+(\epsilon_{\text{out}})$ whenever $f_{+,\epsilon}\in\hat{\mathcal R}(\epsilon_{\text{out}})$. By Lemma 23 with $\delta/3$, that membership fails with probability at most $\delta/3$ (Eqs B.10-B.12).
> 2. **Step 2.** On that event, $MR(f_{+,\epsilon})\le\widehat{MCR}_+(\epsilon_{\text{out}})+[MR(f_{+,\epsilon})-\widehat{MR}(f_{+,\epsilon})]$ (Eq B.13).
> 3. **Step 3.** Write $\mathcal Q_{\text{out}}=q_{\text{ratio}}\big(B_{\text{ind}}\sqrt{\log(6\delta^{-1})/n},\,B_{\text{ind}}\sqrt{\log(6\delta^{-1})/2n}\big)$. By Lemma 24, the error exceeds $\mathcal Q_{\text{out}}$ only if $|\hat e_{\text{orig}}-e_{\text{orig}}|$ or $|\hat e_{\text{switch}}-e_{\text{switch}}|$ exceeds its share. Hoeffding's bound for U-statistics (Hoeffding 1963, Eq 5.7; Serfling 1980, Thm A p. 201) plus a union bound gives probability at most $2\delta/6+2\delta/6=2\delta/3$ (Eqs B.14-B.16). The same holds with $\hat e_{\text{divide}}$ in place of $\hat e_{\text{switch}}$.
> 4. **Step 4.** A union bound over Steps 1 and 3 gives $\delta/3+2\delta/3=\delta$. Eq 4.3 follows symmetrically.
>
> The transcribed equations (B.10-B.19, incl. $q(k)=q_{\text{ratio}}(k,k/\sqrt2)$, the Hoeffding exponents and the difference version without Assumption 3, B.3.3-B.3.4) are in [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds#^proof-thm4-step3]].
^proof-thm-4

### Supporting lemmas (App B.1-B.2)

> [!theorem] Lemma 23: Good population models are in the enlarged empirical Rashomon set (App B.1, p. 49)
> For $\epsilon\in\mathbb R$ and $\delta\in(0,1)$ let $\epsilon'_1:=\epsilon+2B_{\text{ref}}\sqrt{\log(\delta^{-1})/2n}$, and let $f_1\in\mathcal R(\epsilon)$ be a specific, possibly unknown model. If $f_1$ satisfies **Assumption 2**, then $\mathbb P\{f_1\in\hat{\mathcal R}(\epsilon'_1)\}\ge 1-\delta$.
>
> **Proof.** $\tilde L(f_1)$ lies in an interval of length $2B_{\text{ref}}$ and $\mathbb E\tilde L(f_1,Z)\le\epsilon$. Hoeffding's inequality bounds $\mathbb P[\hat{\mathbb E}\tilde L-\mathbb E\tilde L>2B_{\text{ref}}\sqrt{\log(\delta^{-1})/2n}]$ by $\exp\{-2n(\cdot)^2/(2B_{\text{ref}})^2\}=\delta$.
^lem-23

> [!theorem] Lemma 24: Transforming bounds on losses into bounds on ratios and differences (App B.2, pp. 49-51)
> Let $X,Z,\mu_X,\mu_Z,k_X,k_Z\in\mathbb R$ satisfy $|Z-\mu_Z|\le k_Z$ and $|X-\mu_X|\le k_X$. Then $|(Z-X)-(\mu_Z-\mu_X)|\le q_{\text{difference}}(k_Z,k_X):=k_Z+k_X$ (B.5-B.6). If moreover $0<b_{\text{orig}}\le X,\mu_X$ and $Z,\mu_Z\le B_{\text{switch}}<\infty$, then
> $$
> \Big|\frac{Z}{X}-\frac{\mu_Z}{\mu_X}\Big|\le q_{\text{ratio}}(k_Z,k_X):=\frac{B_{\text{switch}}}{b_{\text{orig}}}-\frac{B_{\text{switch}}-k_Z}{b_{\text{orig}}+k_X}.\qquad(B.7\text{-}B.8)
> $$
> **Proof idea** (full derivation with B.9 and all four partial derivatives: [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds#^proof-lem-24]]). Both ratios lie in $[(A_Z-d_Z)/(a_X+d_X),\,A_Z/a_X]$, where $A_Z=\max(Z,\mu_Z)$, $a_X=\min(X,\mu_X)$, $d_Z=|Z-\mu_Z|$ and $d_X=|X-\mu_X|$. The width of this interval increases in $A_Z$, $d_Z$ and $d_X$ and decreases in $a_X$ (sign of partial derivatives), so it is maximized at the extreme constants.
^lem-24

### Covering number and Theorem 5

> [!definition] Definition: $r$-margin-expectation-cover and covering number (Eq 4.4, p. 14)
> A set of functions $\mathcal G_r$ is an **$r$-margin-expectation-cover** if for any $f\in\mathcal F$ and **any distribution $D$** there is $g\in\mathcal G_r$ with
> $$
> \mathbb E_{Z\sim D}|L(f,Z)-L(g,Z)|\le r.\qquad(4.4)
> $$
> The **covering number** $\mathcal N(\mathcal F,r)$ is the size of the smallest such cover. Probabilities and expectations are with respect to the population unless subscripted, e.g. $\mathbb P_D$, $\mathbb E_{V\sim D}$.
^def-covering

> [!theorem] Theorem 5: Uniform bound for $\widehat{MR}$ (p. 14, Eq 4.5)
> Given $r>0$, if **Assumptions 1 and 3 hold for all $f\in\mathcal F$**, then
> $$
> \mathbb P\Big[\sup_{f\in\mathcal F}\big|\widehat{MR}(f)-MR(f)\big|>q(\delta,r,n)\Big]\le\delta,
> $$
> $$
> q(\delta,r,n):=\frac{B_{\text{switch}}}{b_{\text{orig}}}-\frac{B_{\text{switch}}-\Big\{B_{\text{ind}}\sqrt{\frac{\log(4\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+2r\sqrt2\Big\}}{b_{\text{orig}}+\Big\{B_{\text{ind}}\sqrt{\frac{\log(4\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big\}}.\qquad(4.5)
> $$
> The bound can be made arbitrarily small by increasing $n$ and decreasing $r$. So a model can be trained *and* have its reliance estimated on the same data, without sample splitting.
^thm-5

> [!theorem] Theorem 25: Uniform deviation bounds via covering number (App B.5.1, p. 55)
> If **Assumptions 1, 2 and 3 hold for all $f\in\mathcal F$**, then for any $r>0$:
> $$
> \mathbb P_D\Big[\sup_f|\hat e_{\text{orig}}(f)-e_{\text{orig}}(f)|>B_{\text{ind}}\sqrt{\tfrac{\log(2\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big]\le\delta\qquad(B.22)
> $$
> $$
> \mathbb P_D\Big[\sup_f|\hat{\mathbb E}\tilde L(f,Z)-\mathbb E\tilde L(f,Z)|>2B_{\text{ref}}\sqrt{\tfrac{\log(2\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}+2r\Big]\le\delta\qquad(B.23)
> $$
> $$
> \mathbb P_D\Big[\sup_f|\hat e_{\text{switch}}(f)-e_{\text{switch}}(f)|>B_{\text{ind}}\sqrt{\tfrac{\log(2\delta^{-1}\mathcal N(\mathcal F,r))}{n}}+2r\Big]\le\delta\qquad(B.24)
> $$
> $$
> \mathbb P\Big[\sup_f\text{|ratio error|}>\mathcal Q_4\Big]\le\delta,\qquad \mathbb P_D\Big[\sup_f|\{\hat e_{\text{switch}}-\hat e_{\text{orig}}\}-\{e_{\text{switch}}-e_{\text{orig}}\}|>\mathcal Q_{4,\text{difference}}\Big]\le\delta\qquad(B.25\text{-}B.26)
> $$
> with $\mathcal Q_4:=q_{\text{ratio}}\big(B_{\text{ind}}\sqrt{\log(4\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))/n}+2r\sqrt2,\ B_{\text{ind}}\sqrt{\log(4\delta^{-1}\mathcal N(\mathcal F,r))/2n}+2r\big)$, and $\mathcal Q_{4,\text{difference}}$ the same with $q_{\text{difference}}$ (B.27-B.28). B.26 does not need Assumption 3. (Eq B.25 is printed with the ratio $\hat e_{\text{orig}}/\hat e_{\text{switch}}$. Theorem 5, the ratio $\hat e_{\text{switch}}/\hat e_{\text{orig}}$, "follows directly" from it.)
>
> **Proof idea for B.22 (App B.5.2).** Let $D^\star$ be the uniform mixture of the population $D_p$ and the sample distribution $D_s$. For any $f$ pick $g\in\mathcal G_r$ with $\mathbb E_{D^\star}|L(g)-L(f)|\le r$. Then $|\hat{\mathbb E}L(f)-\mathbb EL(f)|\le|\hat{\mathbb E}L(g)-\mathbb EL(g)|+2r$. A union bound over the $\mathcal N(\mathcal F,r)$ cover elements and Hoeffding's inequality finish the proof. This is why the cover must work for *any* distribution: the cover is chosen against a data-dependent mixture.
>
> **Where $r\sqrt2$ comes from.** B.24 itself is stated with $\mathcal N(\mathcal F,r)$ and $+2r$. The $r\sqrt2$ appears only when B.24 is plugged into the ratio bound (Eq B.36) at level $\delta/2$ *with radius $r\sqrt2$*. The source gives no further justification for that radius. Full proofs of B.22-B.26 (incl. the switched distributions $\tilde D_p$, $\tilde D_s$, $\tilde D^\star$ and Hoeffding's U-statistic bound in B.34): [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds#^proof-b24]].
^thm-25

### Theorem 6: inner bounds

> [!theorem] Theorem 6: "Inner" MCR bounds (p. 15, Eqs 4.6-4.7)
> Given $\epsilon\ge0$ and $r>0$, if **Assumptions 1, 2 and 3 hold for all $f\in\mathcal F$**, then
> $$
> \mathbb P\Big(MCR_+(\epsilon)<\widehat{MCR}_+(\epsilon_{\text{in}})-\mathcal Q_{\text{in}}\Big)\le\delta,\qquad(4.6)
> $$
> $$
> \mathbb P\Big(MCR_-(\epsilon)>\widehat{MCR}_-(\epsilon_{\text{in}})+\mathcal Q_{\text{in}}\Big)\le\delta,\qquad(4.7)
> $$
> $$
> \epsilon_{\text{in}}:=\epsilon-2B_{\text{ref}}\sqrt{\frac{\log(4\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}-2r,\qquad\mathcal Q_{\text{in}}:=q\!\left(\tfrac\delta2,r,n\right)\ \text{(Eq 4.5)}.
> $$
> This gives an interval *inside* $[MCR_-(\epsilon),MCR_+(\epsilon)]$ with high probability. The source (p. 15) says: if $\widehat{MCR}_+(\epsilon_{\text{in}})\approx\widehat{MCR}_+(\epsilon)$, the estimator is "unlikely ... to substantially underestimate" $MCR_+(\epsilon)$.
>
> > [!warning] Likely typo in the source: "underestimate" should be "overestimate"
> > Eq 4.6 is a *lower* bound on $MCR_+(\epsilon)$: with high probability $MCR_+(\epsilon)\ge\widehat{MCR}_+(\epsilon_{\text{in}})-\mathcal Q_{\text{in}}\approx\widehat{MCR}_+(\epsilon)-\mathcal Q_{\text{in}}$. What follows logically is that $\widehat{MCR}_+(\epsilon)$ is unlikely to substantially **over**estimate $MCR_+(\epsilon)$. Underestimation is ruled out by Theorem 4 (Eq 4.2), not Theorem 6. The source's very next sentence, which combines the two theorems to rule out both errors, is consistent with this reading. The theorem statement also contains a stray "and then" before the displayed equations.
>
> Combined with Theorem 4: if $\widehat{MCR}_+(\epsilon_{\text{in}})\approx\widehat{MCR}_+(\epsilon_{\text{out}})$, then $\widehat{MCR}_+(\epsilon)$ neither over- nor underestimates by much. This is plausible in large samples, since $\epsilon_{\text{in}},\epsilon_{\text{out}}\to\epsilon$.
^thm-6

**Why the inner bound needs complexity control (pp. 13-14).** Theorem 4 does not say whether the outer bounds are attained or whether the estimated range is needlessly wide. The models that drive $\widehat{MCR}_+(\epsilon)$ might fit well in-sample only through overfitting, so they are not truly in $\mathcal R(\epsilon)$. Or they might be truly good but have the largest MR *estimation error*. A covering number controls both worst cases.

> [!theorem] Proof sketch of Theorem 6 (App B.5.7, pp. 59-61)
> *Compressed here; every intermediate inequality (B.38-B.45, incl. the $\delta/2$-level rewrite $\mathcal Q_{\text{in}}=q_{\text{ratio}}(\cdots\log(8\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))\cdots)$ in B.42, Eq 4.7 and the difference version) is in [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds#^proof-thm6-46]].*
> Let $E$ be the event that some $\hat f_{+,\epsilon_{\text{in}}}\in\arg\max_{\hat{\mathcal R}(\epsilon_{\text{in}})}\widehat{MR}$ has $MR>MCR_+(\epsilon)$. That requires some $f\in\hat{\mathcal R}(\epsilon_{\text{in}})\setminus\{f_{\text{ref}}\}$ with $\mathbb E\tilde L>\epsilon$ but $\hat{\mathbb E}\tilde L\le\epsilon_{\text{in}}$, i.e. a uniform deviation of at least $2B_{\text{ref}}\sqrt{\log(4\delta^{-1}\mathcal N)/2n}+2r$. By Theorem 25 (B.23 at $\delta/2$) this has probability at most $\delta/2$ (Eqs B.38-B.40). Off $E$, $MCR_+(\epsilon)<\widehat{MCR}_+(\epsilon_{\text{in}})-\mathcal Q_{\text{in}}$ requires $\sup_f|\widehat{MR}-MR|>\mathcal Q_{\text{in}}$, which has probability at most $\delta/2$ by Theorem 5 at $\delta/2$. The union bound gives $\delta$ (Eq B.43).
^proof-thm-6

> [!example] Figure 3 (p. 16): Terms in Theorems 4 and 6
> The axes are empirical MR (x) and empirical loss (y). A dashed curve traces, for each MR value, the lowest empirical loss attainable in $\mathcal F$, and $f_{\text{ref}}$ is a black point. Horizontal lines mark $\hat e_{\text{orig}}(f_{\text{ref}})+\epsilon_{\text{in}}$, $+\epsilon$ and $+\epsilon_{\text{out}}$.
> - **Blue (Thm 4):** expand to $\epsilon_{\text{out}}$ so that $f_{\pm,\epsilon}$ is captured, then widen by $\mathcal Q_{\text{out}}$.
> - **Purple (Thm 6):** shrink to $\epsilon_{\text{in}}$ so that bad models are excluded, then narrow by $\mathcal Q_{\text{in}}$.
>
> A secondary x-axis shows that $\widehat{MCR}_-(\epsilon)$ and $\widehat{MCR}_+(\epsilon)$ always lie between the inner and outer brackets.
^fig-3

### Best-in-class corollary (App A.4)

> [!theorem] Corollary 22: Bound on best-in-class MR (App A.4, p. 45)
> Let $f^\star\in\arg\min_{f\in\mathcal F}e_{\text{orig}}(f)$, with $f_{\pm,\epsilon}$ as in Theorem 4. If $f_{+,\epsilon}$ and $f_{-,\epsilon}$ satisfy **Assumptions 1, 2 and 3**, then
> $$
> \mathbb P\Big\{MR(f^\star)\in\big[\widehat{MCR}_-(\epsilon_{\text{best}})-\mathcal Q_{\text{best}},\ \widehat{MCR}_+(\epsilon_{\text{best}})+\mathcal Q_{\text{best}}\big]\Big\}\ge1-\delta,
> $$
> $$
> \epsilon_{\text{best}}:=2B_{\text{ref}}\sqrt{\frac{\log(6\delta^{-1})}{2n}},\qquad\mathcal Q_{\text{best}}:=\frac{B_{\text{switch}}}{b_{\text{orig}}}-\frac{B_{\text{switch}}-B_{\text{ind}}\sqrt{\frac{\log(12\delta^{-1})}{n}}}{b_{\text{orig}}+B_{\text{ind}}\sqrt{\frac{\log(12\delta^{-1})}{2n}}}.
> $$
> Uniqueness of $f^\star$ is not required; the bounds hold simultaneously for all minimizers. If $E(Y\mid X_1,X_2)=f^\star$, this bounds the reliance of the true regression function, which Proposition 19 turns into a causal statement ([[Model Reliance, Causal Effects and Conditional Model Reliance#^thm-prop19]]).
>
> **Proof (App B.4, p. 54).** Apply Theorem 4 with $\epsilon=0$ and $\delta/2$ to each side, since $MR(f^\star)\in[MCR_-(0),MCR_+(0)]$, and take a union bound.
^cor-22

### Difference-based versions (App A.5)

> [!definition] Error terms for $MR_{\text{difference}}$ (App A.5, p. 46)
> With $MR_{\text{difference}}=e_{\text{switch}}-e_{\text{orig}}$, Theorems 4 and 6 and Corollary 22 hold **without Assumption 3**, using
> $$
> \mathcal Q_{\text{out,difference}}:=\Big(1+\tfrac1{\sqrt2}\Big)\sqrt{\tfrac{\log(6\delta^{-1})}{n}}\,B_{\text{ind}},\qquad \mathcal Q_{\text{best,difference}}:=\Big(1+\tfrac1{\sqrt2}\Big)\sqrt{\tfrac{\log(12\delta^{-1})}{n}}\,B_{\text{ind}},
> $$
> $$
> \mathcal Q_{\text{in,difference}}:=B_{\text{ind}}\Big\{\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))}{n}}+\sqrt{\tfrac{\log(8\delta^{-1}\mathcal N(\mathcal F,r))}{2n}}\Big\}+2r(\sqrt2+1).
> $$
> $b_{\text{orig}}$ and $B_{\text{switch}}$ disappear.
>
> **Uniform bound for $MR_{\text{difference}}$ (Theorem 5 analogue).** Proved as Eq B.26 of Theorem 25 (App B.5.1, B.5.6): $\mathbb P_D[\sup_f|\{\hat e_{\text{switch}}-\hat e_{\text{orig}}\}-\{e_{\text{switch}}-e_{\text{orig}}\}|>\mathcal Q_{4,\text{difference}}]\le\delta$, with $\mathcal Q_{4,\text{difference}}=q_{\text{difference}}\big(B_{\text{ind}}\sqrt{\log(4\delta^{-1}\mathcal N(\mathcal F,r\sqrt2))/n}+2r\sqrt2,\ B_{\text{ind}}\sqrt{\log(4\delta^{-1}\mathcal N(\mathcal F,r))/2n}+2r\big)$, again without Assumption 3.
>
> **Why the difference is easier (App A.5, p. 45).** The mean, variance and asymptotic distribution of $\widehat{MR}_{\text{difference}}$ follow directly from U-statistic results, *without the delta method* (citing Dorfman 1938 and Lehmann & Casella 2006 for the delta method; see also Ver Hoef 2012). Difference estimates are also more stable when $\min_f e_{\text{orig}}(f)$ is small, and can be normalized by $\mathrm{Var}(Y)$ (as in Williamson et al. 2017) for interpretability.
^def-q-difference

## Examples

> [!example] How large are the terms? (illustrative arithmetic, not from the paper)
> Take squared error with $Y\in[0,1]$ and predictions in $[0,1]$, so $B_{\text{ind}}=B_{\text{ref}}=B_{\text{switch}}=1$. Take $b_{\text{orig}}=0.05$, $\delta=0.05$ and $n=10{,}000$. Then $\epsilon_{\text{out}}-\epsilon=2\sqrt{\log(60)/20000}\approx0.029$, a loss buffer of about 0.03 on a 0-1 scale. $\mathcal Q_{\text{out}}=20-(1-0.022)/(0.05+0.015)\approx20-14.9\approx5.1$, an MR error of about 5. That is useless as a CI, which is why the authors present these as consistency arguments and bootstrap in practice. The ratio form with a small $b_{\text{orig}}$ is especially loose, one motivation for the difference version.
^ex-how-large-are-the

## Connections

- The structure (enlarge the empirical set to catch the population optimizer, shrink it to exclude bad models) is the same logic as profile-likelihood and Rashomon-set CIs ([[Rashomon-Set Confidence Intervals and Profile Likelihood]]).
- The covering-number argument is a uniform law of large numbers. Overfitting control of this kind is the theory behind [[Model Selection and Overfitting]] and [[Overfitting and Information Criteria]].
- Finite-sample, distribution-free guarantees with a similar flavor (Hoeffding, union bounds) underpin split conformal prediction ([[Split Conformal Prediction and the Coverage Guarantee]]). There, though, the guarantee is tight rather than conservative.

## See Also
- [[Model Class Reliance - Appendix B Proofs of the Finite-Sample Bounds]]: full proofs of Lemma 24, Theorems 4, 25, 6 and Corollary 22
- [[Rashomon Sets and Model Class Reliance - Definitions]]
- [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]]: bootstrap used in place of these bounds
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
