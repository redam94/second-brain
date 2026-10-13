---
title: "Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §3 intro on the exact recovery criterion (p. 11); §3.3 Randomised orthogonal Matching Pursuit, ROMP algorithm, eq. (19) (p. 16), closing paragraph (p. 17); OMP results in §4, Fig. 6 bottom rows (p. 18), values read from the plot"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Randomised Lasso and the Irrepresentable Condition]]"
  - "[[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]"
used_by:
  - "[[Stability Selection Simulation Study - Designs A-G and Results]]"
aliases:
  - ROMP
  - Randomised OMP
  - Exact Recovery Condition (OMP)
---

# Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection

> [!summary]
> Orthogonal matching pursuit (OMP), i.e. greedy forward selection with re-projection, recovers the support only under Tropp's **exact recovery condition** $\max_{k\in N}\|(X_S^\top X_S)^{-1}X_S^\top X_k\|_1<1$. This is close to the Lasso's irrepresentable condition. **ROMP** randomises each greedy step: it picks uniformly among all variables whose residual correlation is within a factor $\alpha$ of the maximum. The authors state, without giving the proof, that stability selection with ROMP is consistent even when the right side of (19) is bounded by a possibly large constant instead of 1. This suggests the benefit of stability selection extends beyond the Lasso.
^summary-ss-randomised-orthogonal-matching-pursuit-r

## Overview

§3.3 notes alternatives with consistency under weak sparse-eigenvalue conditions despite non-convexity: **FoBa** forward-backward search (Zhang 2008) and **MC+** (Zhang 2007). Studying stability selection on them is left open. The paper instead examines OMP, a greedy forward search. Iterative SIS (Fan & Lv 2008) contains OMP as a special case.

## Main Content

> [!algorithm] Randomised orthogonal matching pursuit with weakness $0<\alpha<1$ and $q$ iterations (§3.3, p. 16)
> 1. Set $R_1=Y$, $m=0$ and $\hat S^0=\emptyset$.
> 2. For $m=1,\dots,q$:
>    1. Find $\rho_{max}=\max_{1\le k\le p}|X_k^\top R_m|$.
>    2. Define $K=\{k:|X_k^\top R_m|\ge\alpha\rho_{max}\}$.
>    3. Select a variable $k_{sel}$ at random from $K$; set $\hat S^m=\hat S^{m-1}\cup\{k_{sel}\}$.
>    4. Let $R_{m+1}=Y-P_mY$, with $P_m=X_{\hat S^m}(X_{\hat S^m}^\top X_{\hat S^m})^{-1}X_{\hat S^m}^\top$.
> 3. Return the nested selected sets $\hat S^1\subset\hat S^2\subset\dots\subset\hat S^q$.
>
> Step 2.2 in the source writes $|X_k^\top R|$. Here $R=R_m$.
^alg-ss-romp

**Nested output.** ROMP is an incremental selector: the tuning parameter is the number of steps $q$, and $\hat S^m$ grows with $m$. So **pointwise control** at $q$ equals control over the whole path up to $q$, and $q_\Lambda\le q$ is known exactly ([[Stability Selection PFER Bound (Theorem 1) and Its Proof#^def-ss-pointwise|pointwise control]]).

> [!definition] Exact recovery condition for OMP (Tropp 2004; §3.3, eq. 19)
> $$
> \max_{k\in N}\ \big\|(X_S^\top X_S)^{-1}X_S^\top X_k\big\|_1<1.
> $$
> It is **sufficient** for consistent selection. If it fails, some coefficient vectors exist for which OMP, or its weak variant, does not recover $S$ exactly. It is "rather similar" to the irrepresentable condition (12). It is in fact at least as strong: (19) bounds the full $\ell_1$ norm, while (12) bounds only the sign-weighted sum.
^def-ss-erc

> [!note] "Sufficient" vs "sufficient and necessary"
> The source describes Tropp's criterion two ways.
> - **§3 introduction (p. 11):** the exact recovery criterion (Tropp 2004; Zhang 2009) "is sufficient and necessary for consistent variable selection".
> - **§3.3 (p. 16):** (19) is "a sufficient condition", with the necessity stated in a weaker, coefficient-dependent form: if it fails, *there exist* coefficient vectors for which OMP fails.
>
> These are consistent if "necessary" is read in the worst-case-over-$\beta$ sense of §3.3. The necessity is not that every $\beta$ fails, which parallels the "almost necessary" wording for the Lasso's condition (12). The vault records (19) as sufficient, plus worst-case necessary.
^note-ss-erc-necessity

> [!theorem] Claimed result - consistency of stability selection with ROMP (§3.3, p. 16; proof not included)
> "In the spirit of Theorem 2", the authors report a proof that stability selection with ROMP is asymptotically variable-selection consistent in linear models. This holds even if the right-hand side of (19) is bounded not by 1 but by a possibly large constant, assuming the weakness $\alpha$ is low enough.
> **Caveat (p. 17):** the proof "involves artificial adding of noise covariates". In practice this "seems to help often", but discussion is out of scope.
^thm-ss-romp-claim

**Mechanism (by analogy with Lemma 5).** A noise variable that wins the greedy step deterministically, because it is highly correlated with several true variables, now competes with every near-maximal candidate. It is chosen only some of the time, so its selection frequency drops below $\pi_{thr}$.

### Empirical behaviour (§4, Fig. 6 bottom rows)

In the simulations, randomised OMP uses $\alpha=0.9$, a mild randomisation, against $\alpha=0.5$ for the randomised Lasso. Results for OMP on regression are in Fig. 6 (bottom two rows), with the same layout as Fig. 5. The paper's summary is that stability selection matches or beats the base method except in (A). Approximate readings of the plot ([[Stability Selection Figs 5-6 - Per-Cell Power Readings#^tbl-ss-fig6-omp-cells|OMP table]]) give a more mixed picture for OMP:

| Comparison | P(first $0.1s$ correct): OMP / SS / ROMP | P(first $0.4s$ correct): OMP / SS / ROMP |
|---|---|---|
| Average over 60 cells | 0.43 / 0.53 / 0.53 | 0.27 / 0.26 / 0.27 |
| Largest SS gain: (B) $n=1000$, $s=50$, SNR 2 | 0.20 / 0.89 / 0.84 | 0 / 0 / 0 |
| (D) $p=1000$, $n=1000$, $s=50$, SNR 2 | 0.42 / 0.99 / 1 | 0.08 / 0.08 / 0.11 |
| (F) $s=50$, SNR 2 | 0.06 / 0.66 / 0.67 | 0 / 0 / 0 |
| Clearest ROMP-over-SS gain: (E) $n=1000$, $s=20$, SNR 2 | 0 / 0.37 / 0.66 | 0 / 0 / 0.01 |
| (E) $n=1000$, $s=50$, SNR 2 | 0 / 0.08 / 0.15 | 0 / 0 / 0 |
| OMP wins: (A) $n=100$, $s=4$, SNR 0.5 | 0.90 / 0.93 / 0.93 | 0.52 / 0.27 / 0.31 |
| OMP wins: (A) $n=100$, $s=10$, SNR 2 | 0.96 / 0.96 / 0.90 | 0.46 / 0.13 / 0.23 |
| OMP wins: (G) $s=4$, SNR 2 | 0.52 / 0.30 / 0.25 | 0.28 / 0 / 0.01 |

**Reading.**
- Subsampled OMP helps a lot at large $s$ in (B), (D) and (F).
- ROMP with $\alpha=0.9$ is usually within ±0.05 of subsampled OMP. It clearly adds only in the 10-factor design (E), which has the most irrepresentable-condition violations in the Fig. 5 header. That is consistent with the claimed theory.
- At $0.4s$ the average advantage disappears. Plain OMP wins in small-$n$ (A) cells and in riboflavin (G), where half-samples of $n=115$ leave about 57 rows per fit.

See [[Stability Selection Simulation Study - Designs A-G and Results]].

## Examples

> [!example] Forward stepwise driver selection in a media model
> **Setup:** An analyst builds a weekly KPI model by greedy forward selection over 80 candidate drivers, stopping at $q=12$.
> **ROMP version:** At each step pick at random among drivers whose residual correlation is within 90% of the best ($\alpha=0.9$). Repeat on 100 half-samples (blocked by contiguous weeks if autocorrelation matters). Keep drivers chosen in at least 80% of runs.
> **Error bound:** $q=12$ is fixed, so by (9) $E(V)\le144/((2\cdot0.8-1)\cdot80)=3$ under exchangeability.
> **Reading:** Drivers that a deterministic stepwise run always picks, but that ROMP picks only in about 40% of runs, are near-ties with other drivers. They are not robust findings, a classic forking-path symptom ([[Researcher Degrees of Freedom]]).
^example-ss-forward-stepwise-driver-selection

## Connections

- Greedy selection's path dependence is one reason stepwise models are hard to reproduce. See [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] on analytic flexibility.
- Boosting is another iterative selector the paper lists as compatible (§2); its number of iterations plays the role of $q$.

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Randomised Lasso and the Irrepresentable Condition]]
- [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]
