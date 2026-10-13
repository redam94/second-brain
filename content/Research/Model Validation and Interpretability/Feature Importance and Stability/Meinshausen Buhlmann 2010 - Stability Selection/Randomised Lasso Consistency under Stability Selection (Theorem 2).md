---
title: "Randomised Lasso Consistency under Stability Selection (Theorem 2)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/high-dimensional-statistics
  - type/theorem
  - type/proof
  - type/definition
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §3.1 Def. 4, Assumption 1, eqs (14)-(16), Thm 2, eqs (17)-(18) (p. 13); Remarks 2-4 (p. 14); Appendix §6.3 Proof of Theorem 2, Def. 6, Lemmas 3-7, eqs (22)-(34) (pp. 23-27)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Randomised Lasso and the Irrepresentable Condition]]"
  - "[[Stability Paths and the Stable-Variable Set]]"
used_by:
  - "[[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]"
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
aliases:
  - Meinshausen-Buhlmann Theorem 2
  - Sparse Eigenvalue Condition (Stability Selection)
  - Randomised Lasso Consistency Theorem
---

# Randomised Lasso Consistency under Stability Selection (Theorem 2)

> [!summary]
> Assume only a **sparse-eigenvalue** condition on the design (Assumption 1), not the irrepresentable condition. Choose the weakness by $\alpha^2=\nu\phi_{min}(m)/m$ with $m=Cs^2$. Then with probability at least $1-5/(p\vee a_n)$, stability selection with the randomised Lasso selects **no noise variables** for every $\lambda\ge\lambda_{min}=2\sigma(\sqrt{2C}\,s+1)\sqrt{\log(p\vee a_n)/n}$. It also selects every relevant variable whose coefficient exceeds $0.3(Cs)^{3/2}\lambda$. With a beta-min condition this is consistent selection. Because no noise enters for *any* large $\lambda$, the procedure is **conservative**: choosing $\lambda$ too big only costs power. The proof uses five lemmas. Reweighting keeps sparse eigenvalues controlled (L3). Relevant variables are always selected (L4, via Zhang & Huang 2008). For each noise variable the irrepresentable bound holds with probability at least $p_w(1-p_w)^{Cs^2}$ over the weights (L5). The noise is bounded uniformly (L6). L7 assembles these.
^summary-ss-randomised-lasso-consistency-under-stabi

## Overview

The theorem formalises what Fig. 1 (right) and Fig. 4 show: adding penalty randomisation to stability selection removes the need for the irrepresentable condition (12). Only the analysis for the Lasso is given in detail; OMP is "just indicated" (see [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]).

## Main Content

### Sparse eigenvalues

> [!definition] Definition 4 - Sparse eigenvalues (p. 13, eq. 14)
> For $K\subseteq\{1..p\}$ let $X_K$ be the columns of $X$ in $K$. For $k\le p$, the **minimal sparse eigenvalue** is
> $$
> \phi_{min}(k)=\inf_{a\in\mathbb R^{\lceil k\rceil},\,K\subseteq\{1..p\}:|K|\le\lceil k\rceil}\ \frac{\|X_Ka\|_2}{\|a\|_2},
> $$
> and the **maximal sparse eigenvalue** $\phi_{max}(k)$ is defined analogously with sup. These are related to Candès & Tao (2007), van de Geer (2008), Meinshausen & Yu (2009) and Bickel et al. (2007), and to the **sparse Riesz condition** of Zhang & Huang (2008).
^def-ss-sparse-eig

> [!definition] Assumption 1 - Sparse eigenvalues (p. 13, eq. 15)
> There exist $C>1$ and $\kappa\ge9$ such that, with $s=|S|$,
> $$
> \frac{\phi_{max}(Cs^2)}{\phi_{min}^{3/2}(Cs^2)}<\sqrt C/\kappa.
> $$
> **Comparison (eq. 16).** The sparse Riesz condition of Zhang & Huang (2008) requires some $\bar C>0$ with $\phi_{max}((2+4\bar C)s+1)/\phi_{min}((2+4\bar C)s+1)<\bar C$. (The source writes $\bar C$ here, a constant distinct from Assumption 1's $C$.) That is, eigenvalues over $O(s)$-sized subsets are bounded away from $0$ and $\infty$. Assumption 1 is "significantly stronger" than (16) but "typically much weaker" than the irrepresentable condition needed for comparable results.
^asm-ss-sparse-eig

### The theorem

> [!theorem] Theorem 2 (p. 13, eqs 17-18)
> Consider model (10).
> - **Weakness:** $\alpha^2=\nu\,\phi_{min}(m)/m$ for any $\nu\in\big((7/\kappa)^2,\,1/\sqrt2\big)$, with $m=Cs^2$.
> - **Sequence:** $a_n\to\infty$ as $n\to\infty$.
> - **Penalty floor:** $\lambda_{min}=2\sigma(\sqrt{2C}\,s+1)\sqrt{\log(p\vee a_n)/n}$.
> - **Conditions:** $p>10$, $s\ge7$, and Assumption 1 holds.
> - **Weights:** $W_k=\alpha$ w.p. $p_w$, else $1$, independently.
>
> **Then** there is $\delta=\delta_s\in(0,1)$ such that for all $\pi_{thr}\ge1-\delta$, stability selection with the randomised Lasso satisfies, on a set $\Omega_A$ with $P(\Omega_A)\ge1-5/(p\vee a_n)$:
> $$
> N\cap\hat S^{stable}_\lambda=\emptyset, \tag{17}
> $$
> $$
> \big(S\setminus S_{small;\lambda}\big)\subseteq\hat S^{stable}_\lambda, \tag{18}
> $$
> where $\hat S^{stable}_\lambda=\{k:\hat\Pi^\lambda_k\ge\pi_{thr}\}$ for any $\lambda\ge\lambda_{min}$, and $S_{small;\lambda}=\{k:|\beta_k|\le0.3(Cs)^{3/2}\lambda\}$.
>
> In words: **no noise variable is selected**, and all variables with large enough coefficients are selected.
^thm-ss-thm2

The text layer of the PDF loses the extent of the square roots in $\nu$'s range and in $\lambda_{min}$. The forms above were checked against the rendered page (p. 13): $\nu\in((7/\kappa)^2,1/\sqrt2)$ and $\lambda_{min}=2\sigma(\sqrt{2C}\,s+1)\sqrt{\log(p\vee a_n)/n}$, with the radical over $2C$ only. This equals Lemma 6's bound $2\sigma(\sqrt{2m}+1)\sqrt{\log(p\vee a_n)/n}$ at $m=Cs^2$, since $\sqrt{2Cs^2}=\sqrt{2C}\,s$.

> [!theorem] Remark 2 - Consistency under beta-min (p. 14)
> If $\min_{k\in S}|\beta_k|\ge(Cs)^{3/2}(0.3\lambda)$, then
> $$
> P\big(S=\hat S^{stable}_\lambda\big)\ge1-1/(p\vee a_n).
> $$
> This is consistent variable selection in the sense of (11) as $p\vee a_n\to\infty$, **even if the irrepresentable condition (12) is violated**. Without the lower bound, variables with too-small coefficients (those in $S_{small;\lambda}$) may be missed.
^rem-ss-remark2

The bound stated in Remark 2 is $1-1/(p\vee a_n)$, whereas the theorem gives $1-5/(p\vee a_n)$. This is recorded as printed.

> [!theorem] Remark 3 - Conservativeness for any large $\lambda$ (p. 14)
> Theorem 2 holds for **all** $\lambda\ge\lambda_{min}$. If $\lambda$ is chosen too large, (17) still guarantees no noise variables; only some important variables may be missed. This matches the empirical insensitivity to $\lambda$. By contrast, a hard-thresholded Lasso with $\lambda$ too large includes noise variables. In the paper's words, stability selection with the randomised Lasso has "an important property of being conservative and guarding against false positive selections."
^rem-ss-remark3

> [!theorem] Remark 4 - Adding subsampling (p. 14)
> Theorem 2 randomises only the weights. Combining this with subsampling $n/2$ of $n$ works better empirically, and the theory extends. Let $\tilde\Pi^\lambda_k$ be the selection probability under both weights and subsampling, for $k\in S\setminus S_{small;\lambda}$. A Markov-type inequality gives
> $$
> P(\tilde\Pi^\lambda_k\ge\pi_{thr})\ \ge\ \frac{E(\tilde\Pi^\lambda_k)-\pi_{thr}}{1-\pi_{thr}}\ \ge\ 1-\frac{5}{(p\vee a_{n/2})(1-\pi_{thr})},
> $$
> using $E(\tilde\Pi^\lambda_k)\ge1-5/(p\vee a_{n/2})$ from Theorem 2. If $5/(p\vee a_{n/2})\ll1-\pi_{thr}$, important variables are still selected w.h.p. A similar argument keeps noise variables out. **Recommendation:** "combining random weight perturbations with subsampling yields very competitive results and this is what we recommend to use."
^rem-ss-remark4

### Proof architecture (App. §6.3, pp. 23-27)

Work with the equivalent formulation where columns are rescaled by their weights.

> [!definition] Definition 6 - Reweighted design (p. 23)
> $X^w_k=X_k\cdot W_k$ for each $k$; i.e. $X^w=XW$ with $W=\operatorname{diag}(W_1..W_p)$. $\phi^w_{max},\phi^w_{min}$ are the sparse eigenvalues (14) of $X^w$.
^def-ss-reweighted

A weakness $\alpha<1$ has two effects. **(i)** It distorts the design's singular values, which gives a *lower* bound on useful $\alpha$ (Lemma 3). **(ii)** It makes the irrepresentable condition hold sometimes for each noise variable (Lemma 5).

> [!theorem] Lemma 3 - Eigenvalue ratio under reweighting (p. 23, eq. 22)
> Define $\bar C$ by $(2+4\bar C)s+1=Cs^2$ and assume $s\ge7$. ($\bar C$ is a second constant, determined by Assumption 1's $C$ and $s$: $\bar C=(Cs^2-2s-1)/(4s)$.) For weights in $[\alpha,1]$ with $\alpha^2\ge\nu\phi_{min}(Cs^2)/(Cs^2)$, $\nu\in\mathbb R^+$, under Assumption 1, for all realisations $W$:
> $$
> \frac{\phi^w_{max}(Cs^2)}{\phi^w_{min}(Cs^2)}\le\frac{7\bar C}{\kappa\sqrt\nu}.
> $$
> **Sketch.**
> 1. The source's explicit chain (p. 23) is
>    $$
>    \frac{\phi_{max}(Cs^2)}{\phi_{min}^{3/2}(Cs^2)}\ <\ \frac{\sqrt C}{\kappa}\ =\ (Cs^2)^{-1/2}\,\frac{((2+4\bar C)s+1)/s}{\kappa}\ \le\ (Cs^2)^{-1/2}\,\frac{3+4\bar C}{\kappa}.
>    $$
>    - The first inequality is Assumption 1, eq. (15).
>    - The equality uses the definition $(2+4\bar C)s+1=Cs^2$: $\sqrt C=(Cs^2)^{1/2}/s=(Cs^2)^{-1/2}\cdot Cs^2/s=(Cs^2)^{-1/2}((2+4\bar C)s+1)/s$.
>    - The second inequality is "by $s\ge1$" (source wording): $((2+4\bar C)s+1)/s=2+4\bar C+1/s\le3+4\bar C$.
>    - Multiplying through by $\phi_{min}^{1/2}(Cs^2)$ gives eq. (23): $\phi_{max}(Cs^2)/\phi_{min}(Cs^2)\le\frac{3+4\bar C}{\kappa}\sqrt{\phi_{min}(Cs^2)/(Cs^2)}$.
> 2. Reweighting cannot increase $\phi_{max}$, since $\sup_W\sup_v v^\top W^\top X^\top XWv/v^\top v\le\phi_{max}^2$.
> 3. Reweighting shrinks $\phi_{min}$ by at most a factor $\alpha$: $\phi^w_{min}\ge\alpha\phi_{min}$. This uses $\tilde v=Wv$, with $\tilde v^\top\tilde v\le v^\top v\le\alpha^{-2}\tilde v^\top\tilde v$.
> 4. Combine with $3+4\bar C\le7\bar C$. The source argues \"$\bar C\ge1$ for $s\ge7$, since $C\ge1$ by Assumption 1\"; e.g. $s=7$, $C=1$ gives $\bar C=34/28\approx1.21$.
^lem-ss-lemma3

> [!theorem] Lemma 4 - Relevant variables always selected (p. 24, eqs 24-26)
> Let $\hat A^{\lambda,W}=\{k:\hat\beta^{\lambda,W}_k\ne0\}$. Suppose $\alpha^2\ge(7/\kappa)^2\phi_{min}(Cs^2)/(Cs^2)$. Under Theorem 2's assumptions there is $\Omega_0$ with $P(Y\in\Omega_0)\ge1-3/(p\vee a_n)$ such that for **all** weight realisations $w$, $p\ge5$, and $Y\in\Omega_0$:
> $$
> |\hat A^{\lambda,w}\cup S|\le Cs^2\quad\text{and}\quad (S\setminus S_{small;\lambda})\subseteq\hat A^{\lambda,w}. \tag{24}
> $$
> **Proof (pp. 24).**
> 1. The proof "follows mostly from Theorem 1 in Zhang and Huang (2008)" (Annals of Statistics 36:1567-1594), with $c_0=0$ in their notation. By definition $(2+4\bar C)s+1=Cs^2$, as in Lemma 3, so $Cs^2\le(2+4\bar C)s+1$.
> 2. Their quantity $c^*/c_*$ equals $\phi^w_{max}(Cs^2)/\phi^w_{min}(Cs^2)$ here. For every realisation $W=w$, as long as $\alpha^2\ge(7/\kappa)^2\phi_{min}(Cs^2)/(Cs^2)$, Lemma 3 gives $\phi^w_{max}((2+4\bar C)s+1)/\phi^w_{min}((2+4\bar C)s+1)\le\bar C$. So all assumptions of their Theorem 1 hold with $\eta_1=0$, for every weight realisation.
> 3. By their (2.20)-(2.24) there is $\Omega_0$ with $P(Y\in\Omega_0)\ge2-\exp(2/(p\vee a_n))-2/(p\vee a_n)^2\ge1-3/(p\vee a_n)$ for all $p\ge5$.
> 4. On $\Omega_0$, their (2.21) gives $|\hat A^{\lambda,w}\cup S|\le(2+4\bar C)s\le Cs^2$ (eq. 25).
> 5. Their (2.23) gives (eq. 26)
> $$
> \sum_{k\in S}|\beta_k|^2\mathbf 1\{k\notin\hat A^{\lambda,w}\}\le\Big(\tfrac23\bar C+\tfrac{28}9\bar C^2+\tfrac{16}9\bar C^3\Big)s\lambda^2\le5.6\,\bar C^3s^3\lambda^2\le\big(0.3(Cs)^{3/2}\lambda\big)^2.
> $$
>    - **First inequality:** in Zhang & Huang's notation, $1/(c_*c^*)\le c^*/c_*$. Their $n^{-2}$ factor is omitted because of the different normalisation of $X$ (unit-norm columns here).
>    - **Second inequality:** the paper says it uses $4\bar C\le Cs$ (true, since $4\bar C s=Cs^2-2s-1<Cs^2$). A direct check: with $\bar C\ge1$ the bracket is at most $(\tfrac23+\tfrac{28}9+\tfrac{16}9)\bar C^3\approx5.56\,\bar C^3\le5.6\,\bar C^3$, and $s\le s^3$.
>    - **Last inequality:** this is what defines $S_{small;\lambda}$. Squared, the right side is $0.09\,C^3s^3\lambda^2$, so read literally the step needs $5.6\,\bar C^3\le0.09\,C^3$, i.e. $\bar C\le0.25\,C$. But $\bar C=Cs/4-(2s+1)/(4s)\ge1.2\,C$ for $s\ge7$, $C>1$, so the step fails. See the note after this callout.
> 6. Any $k\in S$ missed by $\hat A^{\lambda,w}$ therefore has $|\beta_k|\le0.3(Cs)^{3/2}\lambda$, i.e. it lies in $S_{small;\lambda}$. This gives $(S\setminus S_{small;\lambda})\subseteq\hat A^{\lambda,w}$.
^lem-ss-lemma4

> [!note] Constant check in eq. (26)
> As printed, (26) ends with $5.6\,\bar C^3s^3\lambda^2\le(0.3(Cs)^{3/2}\lambda)^2=0.09\,C^3s^3\lambda^2$. With $\bar C=(Cs^2-2s-1)/(4s)$ this needs $\bar C\le0.25\,C$, which fails for every $s\ge7$, $C>1$ (there $\bar C\ge1.2\,C$). Since $\bar C<Cs/4$, a bound of the form $5.6\,\bar C^3s^3\le0.09\,C^3s^6$, i.e. $S_{small;\lambda}$ defined with $(Cs^2)^{3/2}$-type scaling, or a larger leading constant, would make the chain valid. Alternatively, the normalisation change mentioned in the proof (dropping the $n^{-2}$ factor) may also rescale $\lambda$. This affects only the numerical constant in the definition of $S_{small;\lambda}$ (and hence in Remark 2's beta-min condition), not the structure of Theorem 2. The paper does not flag it; this is an ingester arithmetic check of the arXiv v2 text, and the JRSS-B version may differ.
^note-ss-eq26-constant

> [!theorem] Lemma 5 - Irrepresentability holds with positive probability over weights (p. 25, eqs 27-28)
> Let $m=Cs^2$, $k\in\{1..p\}$, and let $K(w)\subseteq\{1..p\}$ depend on the weights, with $|K(w)|\le m$ and $k\notin K(w)$. Suppose a **monotonicity** property holds: $K(w)=A$ implies $K(v)=A$ whenever $v_j\le w_j$ for all $j$ with equality on $A$. Then for $\alpha^2\le\phi_{min}(m)/(\sqrt2\,m)$ (this matches Theorem 2's upper limit $\nu<1/\sqrt2$):
> $$
> P_w\Big(\big\|\big((X^w_{K(w)})^\top X^w_{K(w)}\big)^{-1}(X^w_{K(w)})^\top X^w_k\big\|_1\le2^{-1/4}\Big)\ \ge\ p_w(1-p_w)^m. \tag{27}
> $$
> **Proof (p. 25).**
> 1. Let $\tilde w$ be the realisation with $\tilde w_k=\alpha$ and $\tilde w_j=1$ for all $j\ne k$. Under the weight-sampling scheme it has probability $P(W=\tilde w)=p_w(1-p_w)^{p-1}$. This is tiny, so the proof does not use this single point.
> 2. Let $A:=K(\tilde w)$. Define $\mathcal W\subseteq\{\alpha,1\}^p$ as all weights with $w_k=\alpha$, $w_j=1$ for $j\in A$, and arbitrary values for $j\notin A\cup\{k\}$. Then $P_w(w\in\mathcal W)=p_w(1-p_w)^{|A|}\ge p_w(1-p_w)^m$.
> 3. Every $w\in\mathcal W$ satisfies $w_j\le\tilde w_j$ for all $j$, with equality on $A$. By the monotonicity assumption, $K(w)=A$ for all $w\in\mathcal W$.
> 4. For $w\in\mathcal W$, the columns in $A$ are unscaled and column $k$ is scaled by $\alpha$, so
> $$
> \big((X^w_A)^\top X^w_A\big)^{-1}(X^w_A)^\top X^w_k=\alpha\,(X_A^\top X_A)^{-1}X_A^\top X_k.
> $$
> 5. With $\alpha^2\le\phi_{min}(m)/(\sqrt2 m)$, the result follows once one shows, for unit-norm columns,
> $$
> \sup_{A:|A|\le m}\ \sup_{k\notin A}\ \|(X_A^\top X_A)^{-1}X_A^\top X_k\|_1^2\le m/\phi_{min}(m).\tag{28}
> $$
>    Then $\|\cdot\|_1^2\le\alpha^2m/\phi_{min}(m)\le1/\sqrt2$, i.e. $\|\cdot\|_1\le2^{-1/4}$.
> 6. **Proof of (28).**
>    - Let $\gamma:=(X_A^\top X_A)^{-1}X_A^\top X_k$. Since $\|\gamma\|_1\le\sqrt{|A|}\,\|\gamma\|_2$, it suffices to show $\sup\|\gamma\|_2^2\le1/\phi_{min}(m)$.
>    - $X_A\gamma$ is the projection of $X_k$ onto the span of $X_A$, and $\|X_k\|_2^2=1$, so $\|X_A\gamma\|_2^2\le1$.
>    - Also $\|X_A\gamma\|_2^2=\gamma^\top X_A^\top X_A\gamma\ge\phi_{min}(|A|)\|\gamma\|_2^2$. The source writes $X_S$ here, evidently meaning $X_A$, and uses $\phi_{min}$ as the minimal eigenvalue of the Gram matrix in this step.
>    - Hence $\|\gamma\|_2^2\le1/\phi_{min}(|A|)\le1/\phi_{min}(m)$, which proves (28).
>
> **Intuition.** Down-weighting the noise variable alone (which happens with positive probability) shrinks its representability by $\alpha$, enough to fall below 1.
^lem-ss-lemma5

> [!theorem] Lemma 6 - Uniform noise bound (p. 25, eqs 29-30)
> Let $P_A=X_A(X_A^\top X_A)^{-1}X_A^\top$. For $p>10$ there is $\Omega_1$ with $P(\Omega_1)\ge1-2/(p\vee a_n)$ on which
> $$
> \sup_{|A|\le m}\ \sup_{k\notin A}\ |X_k^\top(1-P_A)\varepsilon|<2\sigma(\sqrt{2m}+1)\sqrt{\log(p\vee a_n)/n}.
> $$
> **Proof (pp. 25-26).**
> 1. **Split.** For $k\notin A$, $|X_k^\top(1-P_A)\varepsilon|\le|X_k^\top\varepsilon|+|X_k^\top P_A\varepsilon|$ and $|X_k^\top P_A\varepsilon|\le\|P_A\varepsilon\|_2$ (unit-norm $X_k$).
> 2. **Event $\Omega_1'$:** $\max_{k}|X_k^\top\varepsilon|\le2\sigma\sqrt{\log(p\vee a_n)/n}$. Since $\varepsilon_i$ are i.i.d. $\mathcal N(0,\sigma^2)$, the Gaussian tail gives $P(\Omega_1')\ge1-1/(p\vee a_n)$.
> 3. **Event $\Omega_1''$:** $\sup_{|A|\le m}\|P_A\varepsilon\|_2\le2\sigma\sqrt{2m\log(p\vee a_n)/n}$ (eq. 30). The goal is $P(\Omega_1'')\ge1-1/(p\vee a_n)$. The argument follows a bound in Zhang & Huang (2008).
> 4. **$\chi^2$ tail.** If $X_A$ has full rank $|A|$, then $n\|P_A\varepsilon\|_2^2/\sigma^2\sim\chi^2_{|A|}$. The standard tail bound used in the proof of Zhang & Huang's Theorem 3 gives
> $$
> P\Big(n\|P_A\varepsilon\|_2^2/\sigma^2\ge|A|\big(1+4\log(p\vee a_n)\big)\Big)\le\Big((p\vee a_n)^{-4}\big(1+4\log(p\vee a_n)\big)\Big)^{|A|/2}\le(p\vee a_n)^{-3|A|/2}.
> $$
>    The last step uses $1+4\log(p\vee a_n)\le p\vee a_n$, which holds for all $p>10$. The paper does not spell out how the threshold $|A|(1+4\log(p\vee a_n))$ maps onto the radius in (30).
> 5. **Union bound.** Using $\binom p{|A|}\le p^{|A|}/|A|!$ and summing over subset sizes $|A|=2,\dots,m$:
> $$
> P(\Omega_1'')\ge1-\sum_{|A|=2}^m\binom p{|A|}(p\vee a_n)^{-3|A|/2}\ge1-\sum_{|A|=2}^m\frac{(p\vee a_n)^{-|A|/2}}{|A|!}\ge1-\frac1{p\vee a_n}.
> $$
> 6. Set $\Omega_1=\Omega_1'\cap\Omega_1''$, so $P(\Omega_1)\ge1-2/(p\vee a_n)$ for all $p>10$. On $\Omega_1$ the two bounds add to $2\sigma(\sqrt{2m}+1)\sqrt{\log(p\vee a_n)/n}$.
>
> The source text says $P(\Omega_1')\ge1-1/(p\vee a_n)$ "for all $\delta\in(0,1)$", although no $\delta$ appears. The sum starts at $|A|=2$ as printed.
^lem-ss-lemma6

> [!theorem] Lemma 7 - Separation of selection probabilities (pp. 26-27, eqs 31-34)
> Let $\delta_w=p_w(1-p_w)^{Cs^2}$ and $\hat\Pi^\lambda_k=P_w(k\in\hat A^{\lambda,W})$. Under Theorem 2's assumptions, with $p>10$, on $\Omega_A=\Omega_0\cap\Omega_1$ ($P\ge1-5/(p\vee a_n)$), for all $\lambda\ge\lambda_{min}$:
> $$
> \max_{k\in N}\hat\Pi^\lambda_k<1-\delta_w,\tag{31}
> $$
> $$
> \min_{k\in S\setminus S_{small;\lambda}}\hat\Pi^\lambda_k\ge1-\delta_w.\tag{32}
> $$
> **Sketch of (31).**
> 1. A noise variable $k$ enters only if the KKT condition $|(X^w_k)^\top(Y-X^w_{-k}\hat\beta^{\lambda,W,-k})|\ge\lambda$ holds (eq. 33). Here $\hat\beta^{\lambda,W,-k}$ is the fit with $\beta_k$ forced to 0.
> 2. Let $\hat B=\hat A^{\lambda,W,-k}\cup S$ and split the residual into a $(1-P_{\hat B})$ part and a $P_{\hat B}$ part (eq. 34).
> 3. **Projection invariance.** For every $w$, $P^w_{\hat B}=X^w_{\hat B}((X^w_{\hat B})^\top X^w_{\hat B})^{-1}(X^w_{\hat B})^\top=X_{\hat B}(X_{\hat B}^\top X_{\hat B})^{-1}X_{\hat B}^\top=P_{\hat B}$. Rescaling columns does not change their span, so the projection does not depend on the weights.
> 4. **Left term of (34).** On $\Omega_0$, Lemma 4 gives $|\hat B|\le Cs^2$, and $S\subseteq\hat B$ by definition. So $(1-P_{\hat B})X\beta=0$ and the left term is pure noise:
> $$
> (X^w_k)^\top(1-P^w_{\hat B})\varepsilon\le\sup_{A:|A|\le Cs^2}\ \sup_{k\notin A}|X_k^\top(1-P_A)\varepsilon|\cdot\frac{\|X^w_k\|_2}{\|X_k\|_2}<\lambda_{min}\frac{\|X^w_k\|_2}{\|X_k\|_2},
> $$
>    by Lemma 6 with $m=Cs^2$. This matches $\lambda_{min}=2\sigma(\sqrt{2C}\,s+1)\sqrt{\log(p\vee a_n)/n}$, because $\sqrt{2m}=\sqrt{2C}\,s$.
> 5. **Right term of (34).** Using the KKT conditions of the restricted fit,
> $$
> (X^w_k)^\top P^w_{\hat B}(Y-X^w_{-k}\hat\beta^{\lambda,W,-k})\le(X^w_k)^\top X^w_{\hat B}\big((X^w_{\hat B})^\top X^w_{\hat B}\big)^{-1}\operatorname{sign}(\hat\beta^{\lambda,W,-k})\lambda\le\big\|\big((X^w_{\hat B})^\top X^w_{\hat B}\big)^{-1}(X^w_{\hat B})^\top X^w_k\big\|_1\lambda.
> $$
> 6. **Applying Lemma 5 with $K(w)=\hat B$.** Check its three conditions:
>    - $|\hat B|\le Cs^2$.
>    - $k\notin\hat B$ for all $w$, by construction.
>    - Monotonicity. By the Lasso KKT conditions, $\hat\beta^{\lambda,w,-k}$ and $\hat\beta^{\lambda,v,-k}$ have the same non-zero set whenever $v_j=w_j$ on $\hat A^{\lambda,W,-k}$ and $v_j\le w_j$ off it. In the paper's words, "increasing the penalty on zero coefficients will leave them at zero, if the penalty for non-zero coefficients is kept constant"; a smaller weight means a larger effective penalty $\lambda/w_j$.
>
>    So there is a weight event $\Omega_w$ with $P_w(\Omega_w)\ge\delta_w$ on which the $\ell_1$ term is $\le2^{-1/4}$. (The source prints "$\ge1-\delta_w$" at this point. Lemma 5 gives $\ge p_w(1-p_w)^m=\delta_w$, which is what (31) needs.)
> 7. **Weight ratio.** On $\Omega_w$, $w_k=\alpha$, so $\|X^w_k\|_2/\|X_k\|_2=\alpha\le1/s\le1/7$. This is where $s\ge7$ enters. The paper states $\alpha\le1/s$ without derivation. It follows (ingester's check) from $\alpha^2=\nu\phi_{min}(m)/m$ with $\nu<1$, $\phi_{min}\le1$ (unit-norm columns) and $m=Cs^2\ge s^2$.
> 8. **Conclusion.** For $\omega\in\Omega_0\cap\Omega_1$ and weights in $\Omega_w$, the left side of (33) is $\le\lambda_{min}/7+2^{-1/4}\lambda<\lambda$, since $\lambda\ge\lambda_{min}$ and $1/7+2^{-1/4}\approx0.98<1$. So $k\notin\hat A^{\lambda,W}$, and $\max_{\lambda}\hat\Pi^\lambda_k<1-\delta_w$ for every $k\notin S$.
>
> **(32)** follows from Lemma 4: on $\Omega_0$, $S\setminus S_{small;\lambda}\subseteq\hat A^{\lambda,W}$ for every $w$, so $\hat\Pi^\lambda_k=1$.
>
> Lemma 7 is a reformulation of Theorem 2, with $\delta=\delta_w$, which completes its proof.
^lem-ss-lemma7

### Proof map

| Step | Lemma | What it buys |
|---|---|---|
| Reweighting keeps the design well-conditioned | L3 | Lower bound on usable $\alpha$ |
| Relevant variables always in, model size $\le Cs^2$ | L4 (Zhang & Huang 2008) | (18); support size for L5-L6 |
| Each noise variable "irrepresentable" with prob $\ge\delta_w$ over weights | L5 | Selection probability of noise $<1-\delta_w$ |
| Noise correlations uniformly small | L6 | Sets $\lambda_{min}$ |
| Assemble on $\Omega_0\cap\Omega_1$ | L7 | (17) with $\pi_{thr}\ge1-\delta_w$ |

The threshold needed, $\pi_{thr}\ge1-\delta_w$ with $\delta_w=p_w(1-p_w)^{Cs^2}$, is extremely close to 1 for moderate $s$. The theorem is a qualitative statement about *why* randomisation helps, not a calibration rule. Practical thresholds come from Theorem 1 ([[Stability Selection PFER Bound (Theorem 1) and Its Proof]]).

## Examples

> [!example] Size of $\delta_w$
> With $p_w=0.5$, $s=7$ and $C=1.1$, $Cs^2\approx54$ and $\delta_w=0.5\cdot0.5^{54}\approx3\times10^{-17}$. The theorem's threshold $1-\delta_w$ is essentially 1. This shows the gap between the asymptotic guarantee and the practical recommendation $\pi_{thr}\in(0.6,0.9)$ and $\alpha\in(0.2,0.8)$, which is backed instead by §4's simulations.
^example-ss-size-of-delta-w

## Connections

- Sparse-eigenvalue / restricted-eigenvalue conditions also underlie Lasso nuisance estimation in DML ([[DML Estimators for ATE and the Interactive Model]], [[Regularization Bias and the Partially Linear Model]]).
- The conservativeness of Remark 3 (wrong $\lambda$ costs power, not false positives) is the property a validation reviewer wants when selection feeds into reported drivers. Compare [[SR 11-7 - Model Risk Management Guidance - Overview]] on effective challenge.

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Randomised Lasso and the Irrepresentable Condition]]
- [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]
