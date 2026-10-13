---
title: "Stability Selection PFER Bound (Theorem 1) and Its Proof"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/multiple-testing
  - type/theorem
  - type/proof
  - type/definition
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §2.4 Choice of regularisation and error control, Def. 3, Thm 1, eqs (8)-(9), calibration and Pointwise Control (pp. 7-8); Appendix §6.1 Sample splitting, Def. 5, eq. (20), Lemma 1, eq. (21) (pp. 21-22); §6.2 Proof of Theorem 1, Lemma 2 (pp. 22-23)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Paths and the Stable-Variable Set]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Stability Selection for Gaussian Graphical Models and Computational Cost]]"
  - "[[Stability Selection Simulation Study - Designs A-G and Results]]"
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
aliases:
  - Stability Selection Error Control
  - PFER Bound for Stability Selection
  - Meinshausen-Buhlmann Theorem 1
  - Simultaneous Selection Probability
---

# Stability Selection PFER Bound (Theorem 1) and Its Proof

> [!summary]
> Theorem 1 bounds the expected number of falsely selected variables, the **per-family error rate (PFER)** $E(V)$, by $q_\Lambda^2/((2\pi_{thr}-1)p)$. Here $q_\Lambda$ is the average number of variables the base method selects anywhere on the path over $\Lambda$, and $p$ is the number of candidate variables. The bound needs two assumptions: **exchangeability** of the noise variables' selection indicators, and that the base method is **no worse than random guessing**. It holds for any finite $n$ and needs no estimate of the noise level. In practice: fix $\pi_{thr}$ (e.g. 0.9), then choose how far down the path to go ($q_\Lambda$) to hit a target $E(V)$ or FWER. The proof combines a sample-splitting lower bound, $\hat\Pi^{simult}\ge2\hat\Pi-1$ (Lemma 1), with a squared Markov inequality (Lemma 2).
^summary-ss-stability-selection-pfer-bound-theorem-1

## Overview

When recovering $S$ "a natural goal is to include as few variables of the set $N$ of noise variables as possible" (§2.4, p. 7). Stability selection has two advantages here. The initial set $\Lambda$ matters little "as long as $\Lambda$ is varied with reason". And $\Lambda$ can be chosen to guarantee, under stronger assumptions, a bound on expected false selections.

## Main Content

> [!definition] Definition 3 - Additional notation (§2.4, p. 7)
> - $\hat S^\Lambda=\bigcup_{\lambda\in\Lambda}\hat S^\lambda$: variables selected anywhere on the path over $\Lambda$.
> - $q_\Lambda=E\big(|\hat S^\Lambda(I)|\big)$: the average number of selected variables, for a subsample $I$ of size $\lfloor n/2\rfloor$.
> - $V=|N\cap\hat S^{stable}|$: the number of falsely selected variables under stability selection. (The source writes $V=N\cap\hat S^{stable}$; $V$ is used as a count.)
^def-ss-pfer-notation

> [!theorem] Theorem 1 - Error control (§2.4, eqs 8-9, p. 7)
> **Assume:**
> 1. **Exchangeability.** The distribution of $\{\mathbf 1\{k\in\hat S^\lambda\},k\in N\}$ is exchangeable for all $\lambda\in\Lambda$.
> 2. **Not worse than random guessing.** For any $\lambda\in\Lambda$,
> $$
> \frac{E(|S\cap\hat S^\lambda|)}{E(|N\cap\hat S^\lambda|)}\ \ge\ \frac{|S|}{|N|}. \tag{8}
> $$
>
> **Then** the expected number $V$ of falsely selected variables satisfies
> $$
> E(V)\ \le\ \frac{1}{2\pi_{thr}-1}\,\frac{q_\Lambda^2}{p}. \tag{9}
> $$
^thm-ss-pfer

**Error-rate vocabulary.** $E(V)$ is the **per-family error rate (PFER)**. $E(V)/p$ is the **per-comparison error rate** (the source writes "FCER"; Dudoit et al. 2003). Since $P(V>0)\le E(V)$, any PFER bound is also a **familywise error rate (FWER)** bound. The paper says the minimal achievable non-trivial PFER is $1/p^2$ ($\pi_{thr}=1$, $q_\Lambda=1$), and considers this low enough for practical purposes once $p$ exceeds about 10 (pp. 7-8). Lowering $q_\Lambda$ or raising $\pi_{thr}$ lowers $E(V)$.

> [!note] Checking the minimal PFER
> Plugging $\pi_{thr}=1$ and $q_\Lambda=1$ into (9) gives $E(V)\le\frac{1}{(2\cdot1-1)}\cdot\frac{1^2}{p}=1/p$, **not** $1/p^2$. The printed $1/p^2$ looks like a slip, perhaps writing $q_\Lambda^2/p^2$ by analogy with the per-comparison rate $E(V)/p$. Note that $1/p^2$ is exactly the per-comparison error rate $E(V)/p$ at this bound. The ingester checked this arithmetic; it is not flagged in the paper. Its practical point is unaffected: $1/p<0.1$ already for $p>10$. Compare the analogous 2.5-vs-4 discrepancy in the §4 calibration ([[#^note-ss-calibration-check]]).
^note-ss-min-pfer-check

### Discussion of the assumptions (p. 8)

- **Exchangeability** is "perhaps stronger than one would wish", but the authors see no route to error control at this generality without something similar.
  - In regression (1) it holds for "all reasonable procedures" if the design is random and $\{X_k,k\in N\}$ is exchangeable.
  - Independent noise variables are a special case.
  - So is the equicorrelated Gaussian, $\operatorname{Cov}(X_k,X_l)=\rho$ for all $k\ne l\in N$, $0<\rho<1$.
  - For real data there is no guarantee, but §4 shows the bound "holds up very well". See [[Stability Selection Simulation Study - Designs A-G and Results]].
- Exchangeability is needed **only for Theorem 1**. All other benefits (stability paths, Theorem 2) do not use it.
- **Not worse than random guessing** is "quite harmless". If it fails, the results hold with slightly weaker constants.

### Calibration recipe (p. 8)

$\pi_{thr}$ has a small influence: for $\pi_{thr}\in(0.6,0.9)$ results "tend to be very similar". The paper's recipe is to fix $\pi_{thr}$, then let the error target determine $\Lambda$:

| Goal | Choice | Resulting guarantee |
|---|---|---|
| PFER $\le 1$ | $\pi_{thr}=0.9$, $q_\Lambda=\sqrt{0.8p}$ | $E(V)\le \frac{0.8p}{0.8\,p}=1$ |
| FWER $\le\alpha$ | $\pi_{thr}=0.9$, $q_\Lambda=\sqrt{0.8\alpha p}$ | $P(V>0)\le E(V)\le\alpha$ |
| PFER $\le 2.5$ (used in §4) | $\pi_{thr}=0.6$, $q_\Lambda=\sqrt{0.8p}$ | $E(V)\le\frac{0.8p}{0.2p}=4$ by (9). The paper states $\le 2.5$; see note below |
| Fixed $\Lambda$ | choose $\pi_{thr}$ to hit the target | invert (9): $\pi_{thr}=\tfrac12\big(1+\tfrac{q_\Lambda^2}{p\,E(V)_{target}}\big)$ |

> [!note] Checking the §4 calibration
> Plugging $q_\Lambda=\sqrt{0.8p}$ and $\pi_{thr}=0.6$ into (9) gives $0.8/(0.2)=4$, not 2.5. The value 2.5 corresponds to $q_\Lambda^2/p=0.5$. The §4 text states "$q_\Lambda=\sqrt{0.8p}$ and thresholds of $\pi_{thr}=0.6$, corresponding to a control of $E(V)\le2.5$" (p. 20). The arithmetic is reported here as checked by the ingester. The paper's empirical conclusion (false selections controlled near the stated level) is unaffected in direction.
^note-ss-calibration-check

**Choosing $\lambda_{min}$ to fix $q$.** To use (9) we need $q_\Lambda$, which is generally unknown. The fix is to regularise the selector *by the number of selected variables*, $\hat S=\hat S^q$. For $\ell_1$ paths, take the first $q$ variables to enter as $\lambda$ decreases from $\lambda_{max}$, i.e. $\lambda_{min}$ such that $|\bigcup_{\lambda_{max}\ge\lambda\ge\lambda_{min}}\hat S^\lambda|\le q$.

**Noise level not needed.** Without stability selection, the right $\lambda$ "invariably has to depend on the unknown noise level". Stability selection gives (a) exact error control and (b) works with unknown noise. This matters for $p\gg n$, where the noise level is hard to estimate.

> [!definition] Pointwise control (§2.4, p. 8)
> When even one $\lambda$ is expensive, set $\Lambda=\{\lambda\}$ for a single $\lambda$ chosen to **overfit** somewhat, so that $\hat S^\lambda\supseteq S$ with high probability. All results transfer. For **incremental** selectors ($\hat S^\lambda\subseteq\hat S^{\lambda'}$ for all $\lambda\ge\lambda'$), pointwise control at $\lambda$ equals control with $\Lambda=[\lambda,\infty)$, because $\hat\Pi^\lambda_k$ is then monotone increasing as $\lambda$ decreases.
^def-ss-pointwise

### Appendix: sample splitting and the proof

> [!definition] Definition 5 - Simultaneous selection probability (App. §6.1, eq. 20, p. 21)
> Let $I_1,I_2\subset\{1..n\}$ be a random split into disjoint halves, $|I_i|=\lfloor n/2\rfloor$. Define $\hat S^{simult,\lambda}=\hat S^\lambda(I_1)\cap\hat S^\lambda(I_2)$ and, for $K\subseteq\{1..p\}$,
> $$
> \hat\Pi^{simult,\lambda}_K=P^*\big(K\subseteq\hat S^{simult,\lambda}\big),
> $$
> with $P^*$ over the random split (and any algorithmic randomness).
^def-ss-simult

> [!theorem] Lemma 1 - Lower bound for simultaneous selection probabilities (App. §6.1, eq. 21, p. 22)
> For any $K\subseteq\{1..p\}$ and every $\omega\in\Omega$:
> $$
> \hat\Pi^{simult,\lambda}_K\ \ge\ 2\hat\Pi^\lambda_K-1.
> $$
> **Proof.** Let $s_K(\{a,b\})$ be the four joint probabilities for $K$ being selected ($1$) or not ($0$) on $I_1$ and on $I_2$. The two halves are dependent, since they partition the same sample.
> 1. $\hat\Pi^{simult}_K=s_K(\{1,1\})$.
> 2. $\hat\Pi^\lambda_K=s_K(\{1,0\})+s_K(\{1,1\})$ and $1-\hat\Pi^\lambda_K=s_K(\{0,1\})+s_K(\{0,0\})$.
> 3. By symmetry $s_K(\{1,0\})=s_K(\{0,1\})$, and $s_K(\{0,0\})\ge0$, so $s_K(\{1,0\})\le1-\hat\Pi^\lambda_K$.
> 4. Hence $s_K(\{1,1\})=\hat\Pi^\lambda_K-s_K(\{1,0\})\ge2\hat\Pi^\lambda_K-1$. ∎
>
> The bound is tight for probabilities near 1.
^lem-ss-lemma1

> [!theorem] Lemma 2 - Squared Markov bound (App. §6.2, p. 22)
> Let $K\subset\{1..p\}$ and $\hat S^\lambda$ be computed on $\lfloor n/2\rfloor$ samples.
> - If $P(K\subseteq\hat S^\lambda)\le\varepsilon$, then $P(\hat\Pi^{simult,\lambda}_K\ge\xi)\le\varepsilon^2/\xi$.
> - If $P(K\subseteq\bigcup_{\lambda\in\Lambda}\hat S^\lambda)\le\varepsilon$, then $P(\max_{\lambda\in\Lambda}\hat\Pi^{simult,\lambda}_K\ge\xi)\le\varepsilon^2/\xi$.
>
> **Proof sketch.**
> 1. Let $H^\lambda_K=\mathbf 1\{K\subseteq\hat S^\lambda(I_1)\cap\hat S^\lambda(I_2)\}$. Then $\hat\Pi^{simult,\lambda}_K=E^*(H^\lambda_K)=E(H^\lambda_K\mid Z)$.
> 2. The two disjoint halves are i.i.d. samples, so $P(H^\lambda_K=1)\le P(K\subseteq\hat S^\lambda(I_1))^2\le\varepsilon^2$. This squaring is the key gain.
> 3. So $E(\hat\Pi^{simult}_K)=E(H^\lambda_K)\le\varepsilon^2$.
> 4. Markov's inequality gives $\xi P(\hat\Pi^{simult}_K\ge\xi)\le\varepsilon^2$. The max-over-$\Lambda$ case is analogous. ∎
^lem-ss-lemma2

> [!theorem] Proof of Theorem 1 (App. §6.2, pp. 22-23)
> 1. Let $N_\Lambda=N\cap\hat S^\Lambda$ and $U_\Lambda=S\cap\hat S^\Lambda$. Then $E|N_\Lambda|=q_\Lambda-E|U_\Lambda|$.
> 2. Assumption (8) gives $E|U_\Lambda|\ge E|N_\Lambda|\,|S|/|N|$. Hence $(1+|S|/|N|)E|N_\Lambda|\le q_\Lambda$, i.e. $|N|^{-1}E|N_\Lambda|\le q_\Lambda/p$.
> 3. Exchangeability gives $P(k\in\hat S^\Lambda)=E|N_\Lambda|/|N|$ for each $k\in N$, so $P(k\in\hat S^\Lambda)\le q_\Lambda/p$. This holds whatever the subsample size.
> 4. Lemma 2 with $\varepsilon=q_\Lambda/p$: $P(\max_\lambda\hat\Pi^{simult,\lambda}_k\ge\xi)\le(q_\Lambda/p)^2/\xi$ for all $0<\xi<1$, $k\in N$. (Typo in source, p. 22: this step is printed as $\max_{\lambda\in\Lambda}\hat\Pi^{simult,q}_k$. The superscript should be $\lambda$, as in Definition 5 and the next line of the proof.)
> 5. Lemma 1: $\max_\lambda\hat\Pi^\lambda_k\ge\pi_{thr}$ implies $(\max_\lambda\hat\Pi^{simult,\lambda}_k+1)/2\ge\pi_{thr}$. With $\xi=2\pi_{thr}-1$, $P(\max_\lambda\hat\Pi^\lambda_k\ge\pi_{thr})\le(q_\Lambda/p)^2/(2\pi_{thr}-1)$.
> 6. Sum over $k\in N$ ($|N|\le p$): $E(V)\le q_\Lambda^2/(p(2\pi_{thr}-1))$. ∎
^prf-ss-thm1

**Why the bound is quadratic in $q_\Lambda/p$.** A noise variable is selected on one half-sample with probability at most $q_\Lambda/p$. To have a high subsampling frequency it must, roughly, be selected on *both* halves of a split, with probability at most $(q_\Lambda/p)^2$. Requiring agreement across independent halves squares the false-selection rate. That squaring is what buys finite-sample control.

## Examples

> [!example] Worked calibration: 300 candidate drivers
> **Setup:** $p=300$ candidate features (e.g. channel × lag × transform combinations in a media model). Target $E(V)\le1$.
> **Solution:** With $\pi_{thr}=0.9$, (9) requires $q_\Lambda^2\le0.8\cdot300=240$, i.e. $q_\Lambda\le15.5$. Run the Lasso path on each half-sample only until 15 variables have entered. With $\pi_{thr}=0.75$ instead, $q_\Lambda\le\sqrt{0.5\cdot300}=12.2$.
> **Interpretation:** At most about one false driver is expected among the stable set, **if** the noise features are exchangeable. Highly structured lag/transform families violate that assumption, so treat the guarantee as approximate (see [[Stability Selection - Discussion, Limitations and Practice]]).
^example-ss-worked-calibration-300-candidate

> [!example] Graphical model calibration used in §2.5
> For $d=160$ genes there are $p=\binom{160}2=12720$ candidate edges. Targeting $E(V)\le30$ with pointwise control means choosing $\pi_{thr}$ at each $\lambda$ so that $q_\lambda^2/((2\pi_{thr}-1)\cdot12720)\le30$. See [[Stability Selection for Gaussian Graphical Models and Computational Cost]].
^example-ss-graphical-model-calibration-used

## Connections

- A selection-procedure analogue of Bonferroni/FWER control ([[Multiple Testing Corrections]]). It needs no p-values, only selection frequencies. When choosing from hundreds of candidate models the same logic applies: [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].
- Requiring agreement across disjoint halves is a form of sample splitting, which is also a remedy for forking paths: [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].
- The bound limits false *selections*, not false *effect sizes*. For inference on selected effects see [[Simultaneous Inference via Multiplier Bootstrap]].
- PFER bounds express an error rate, not a probability that a given finding is true. For the latter see [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Paths and the Stable-Variable Set]]
- [[Stability Selection Simulation Study - Designs A-G and Results]] - empirical check of the bound (Fig. 7)
