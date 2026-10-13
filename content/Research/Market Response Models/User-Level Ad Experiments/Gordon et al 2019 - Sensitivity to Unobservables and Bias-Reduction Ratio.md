---
title: Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - topic/sensitivity-analysis
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) §8 pp. 37-41, eq. (30), Fig. 11 (p. 39), Table 6 (p. 40), fn. 23; Online Appendix 'Incorporating an Unobservable into an Observational Model' pp. A-14 to A-16, eq. (A1)-(A5), fn. 24-27; Figs. A-14, A-15 (pp. A-17, A-18) incl. per-study marker and locus read-off"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]"
  - "[[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]"
  - "[[Sensitivity Analysis in Observational Studies]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Gordon et al 2019 - Conclusions, Caveats and Related Literature]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
aliases:
  - Gordon 2019 Table 6
  - Bias Reduction Ratio
  - Ichino-Mealli-Nannicini Simulated Confounder in Ad Measurement
  - Relative R2 of an Unobservable
---

# Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio

> [!summary]
> Section 8 and the online appendix of Gordon et al. (2019). Matching achieved balance (§6.3) yet left bias (§7), so the authors ask: "If we could obtain new observables, how much better would they need to be to eliminate the bias between the observational and RCT estimates?" Using the Rosenbaum-Rubin (1983a) / Ichino-Mealli-Nannicini (2008) approach, they simulate a binary confounder $U$ with cell probabilities $p_{jk}=\Pr(U=1\mid W=j,Y=k)$ chosen so that stratification including $U$ reproduces the RCT ATT. They then express $U$'s strength as **relative $R^2$** against all observed covariates combined. The **bias-reduction ratio** $brr$ (remaining bias / total selection effect) ranks the 14 checkout studies from 0.4% (S11) to 63% (S5). In S4 a confounder as weak as the Census block would do. In S1 it must be as strong as the match score. In S9 it must have **5-10×** the explanatory power of all observables. Activity and match-score variables explain *exposure* much more than *outcomes*.

^summary-gordon-et-al-2019-sensitivity-to-unobser

## Overview

The paper's second contribution is "to characterize the nature of the unobservable needed to use observational methods successfully" (§1). This answers the natural objection that the authors simply lacked Facebook's internal data. The analysis estimates how much better the data would have to be. In several studies the answer is "much more than everything observed", which supports the conclusion that "eliminating bias from observational methods would be hard, even for industry insiders with access to additional data" (§8, p. 41).

## Main Content

### Set-up (§8, eq. 30)

Suppose unconfoundedness fails, $(Y_i(0),Y_i(1))\not\perp\!\!\!\perp W_i\mid X_i$, but there is a scalar $U\in\mathbb R$ that would restore it:
$$
(Y_i(0),Y_i(1))\perp\!\!\!\perp W_i\mid X_i,U_i.\tag{30}
$$
The bias from omitting $U$ depends on how strongly it correlates with $Y$ and $W$. The approach simulates a $U$ that **exactly removes** the bias between observational and RCT estimates, then compares its explanatory power with the observables.

> [!definition] Relative explanatory power of the unobservable (§8, p. 38; App. p. A-16)
> Let $R^2_Y(X,U)$ be the $R^2$ from regressing the outcome on $(X,U)$ **among untreated users** ($W_i=0$), and $R^2_Y(X)\equiv R^2_Y(X,0)$ the $R^2$ on $X$ alone. Then
> $$
> R^2_{Y,rel}=\frac{R^2_Y(X,U)-R^2_Y(X)}{R^2_Y(X)},
> $$
> and $R^2_{W,rel}$ is defined the same way for treatment. In appendix notation $R^2_{Y,rel}=[R^2_Y(p)-R^2_Y(0)]/R^2_Y(0)$.
> **Reading.** $R^2_{rel}=1$ equals the combined power of all four variable sets. A $U$ with $R^2_{Y,rel}=2$ and $R^2_{W,rel}=3$ "would have to explain two times as much of the outcome variation and three times as much of the treatment variation as our combined variable sets". (Imbens 2003 instead normalizes by the *unexplained* variation $1-R^2(0)$; fn. 27.)

^def-g19-relr2

> [!definition] Bias-reduction ratio (§8, p. 40)
> $$
> brr=\frac{|\text{STRAT lift}-\text{RCT lift}|}{|\text{EU lift}-\text{RCT lift}|}
> $$
> The fraction of the total selection effect (E-U bias) that is **left** after stratification with all observables. Small $brr$ means the observables already removed most of the selection.

^def-g19-brr

### The Rosenbaum-Rubin sensitivity model (Appendix, eq. A1-A5)

> [!theorem] Parametric sensitivity model (App. p. A-14; Rosenbaum & Rubin 1983a, Imbens 2003)
> Let $U\sim\text{Bern}(0.5)$ be independent of $X$. Footnote 24 calls this innocuous, since any $X$-$U$ correlation would be absorbed by a flexible model. Then
> $$
> \Pr(W_i=1\mid X_i,U_i)=\frac{\exp(\gamma'X_i+\alpha U_i)}{1+\exp(\gamma'X_i+\alpha U_i)}\tag{A1}
> $$
> $$
> Y_i=\tau W_i-\beta X_i-\delta U_i+\varepsilon_i,\qquad\varepsilon_i\sim N(0,\sigma^2)\tag{A2}
> $$
> where $(\alpha,\delta)$ set $U$'s strength in selection and outcome. Integrating out $U$ gives the log-likelihood
> $$
> L=\sum_{i=1}^N\ln\Big[\tfrac12\,\phi(Y_i-\tau W_i-\beta X_i;\sigma^2)\frac{(e^{\gamma'X})^{W_i}}{1+e^{\gamma'X}}+\tfrac12\,\phi(Y_i-\tau W_i-\beta X_i-\delta;\sigma^2)\frac{(e^{\gamma'X+\alpha})^{W_i}}{1+e^{\gamma'X+\alpha}}\Big]\tag{A3-A4}
> $$
> The data say little about $(\alpha,\delta)$, so they are **fixed** and $\theta=(\tau,\beta,\gamma,\sigma^2)$ is estimated, giving $\tau(\alpha,\delta)$. The target is any $(\alpha^*,\delta^*)$ with
> $$
> \hat\tau_{rct}=\tau(\alpha^*,\delta^*),\tag{A5}
> $$
> and "many values of $(\alpha^*,\delta^*)$ might satisfy (5)". (Note the sign convention $-\delta U_i$ in A2 as printed. The appendix then states that $\delta>0$ means omitting $U$ biases $\tau$ upward.)

^thm-g19-rr

### The nonparametric version actually used (Ichino, Mealli & Nannicini 2008)

(The working paper cites this as "Ichino, Fabrizia, and Nannicini (2008)", using the second author's given name. The *Journal of Applied Econometrics* paper is by Andrea Ichino, Fabrizia Mealli and Tommaso Nannicini.)

> [!definition] Cell-probability parameterization of $U$ (App. pp. A-14-A-15)
> To avoid a parametric outcome model, specify
> $$
> p_{jk}\equiv\Pr(U_i=1\mid W_i=j,\,Y_i=k),\qquad j,k\in\{0,1\},
> $$
> four numbers $p=\{p_{00},p_{01},p_{10},p_{11}\}$. Simulate $U$ for each user from these and add it to the propensity covariates.
> - **Outcome confounding** (the analogue of $\delta>0$): $p_{01}>p_{00}$. This implies $\Pr(Y=1\mid W=0,U=1,X)>\Pr(Y=1\mid W=0,U=0,X)$, so without $U$ the unexposed outcomes are biased stand-ins for the exposed counterfactual. Footnote 25 points to a proof in the Ichino et al. discussion paper.
> - **Selection** (the analogue of $\alpha$): $p_j=\Pr(U=1\mid W=j)=\sum_{k=0}^1 p_{jk}\Pr(Y=k\mid W=j)$. Setting $p_1>p_0$ makes $U=1$ users more likely to be exposed.

^def-g19-pjk

> [!algorithm] Simulating the bias-eliminating confounder (App. pp. A-15-A-16)
> Stratification is used because the outcome model did not help much (§7) and STRAT is cheap enough to repeat over Monte Carlo draws.
> **Inner loop**: for fixed $p$ and draws $r=1,\dots,R$:
> 1. For each user draw $U_i^r\sim\text{Bern}(p_{jk})$ with $j=W_i$, $k=Y_i$.
> 2. Estimate the propensity $\hat e_i^r=e(X_i,U_i^r;\hat\phi^r)$.
> 3. Stratify into $M$ bins, $B_{im}^r=\mathbb 1\{b_{m-1}^r<\hat e_i^r\le b_m^r\}$.
> 4. Compute the stratified ATT $\tau^{sen,r}(p)$ as in §4.2.
> 5. Average: $\tau^{sen}(p)=\frac1R\sum_r\tau^{sen,r}(p)$.
>
> **Outer search**: fix $p_{11}=0.5$. For each pair $p_{10},p_{01}\in\{0,0.25,0.5,0.75,1\}$, use **Brent's method** on the bracket $[0,1]$ to find $p_{00}$ with $\hat\tau_{rct}=\tau^{sen}(p^*)$. If none exists, retry with $p_{11}=0$ and $p_{11}=1$. Footnote 26 explains the strategy: if a $p_{00}$ solves $\tau^{sen}(p^*)=\hat\tau_{rct}$ at $p_{11}=0.5$ for some $(p_{10},p_{01})$, and a solution also exists at another $p_{11}$ for the same pair, then that $p_{00}$ "will be the same as under $p_{11}=.5$ (as will be d and s)" (App. p. A-16, fn. 26). *Reader's flag:* the symbols **$d$ and $s$ are never defined** in the paper or the appendix. Footnote 26 is their only appearance. A plausible reading (an interpretation, not stated) is that they are Ichino-Mealli-Nannicini's outcome effect $d$ and selection effect $s$ of the simulated confounder, i.e. $d=\Pr(Y=1\mid W=0,U=1)-\Pr(Y=1\mid W=0,U=0)$ and $s=\Pr(U=1\mid W=1)-\Pr(U=1\mid W=0)$. These would be the analogues of $\delta$ and $\alpha$ in eq. (A1)-(A2). Each solution $p^*$ is then converted to $(R^2_{W,rel},R^2_{Y,rel})$ and plotted.
>
> **Related approaches** (fn. 23): methods that use selection on observables to bound selection on unobservables, namely Murphy & Topel (1990), Altonji, Elder & Taber (2005) and Oster.

^alg-g19-sens

### Figure 11 — sensitivity plots for Studies 4, 1 and 9 (p. 39)

Each panel plots relative $R^2$ for treatment (x-axis) against relative $R^2$ for outcome (y-axis). Black dots mark bias-eliminating $U$s. "+" markers show the strength of each observed variable set on its own: **FB**, **C** (Census), **UA** (user activity), **M** (match score).

> [!example] Three studies, three answers (§8, pp. 38-40)
> | Study | E-U lift | STRAT lift | RCT lift | Required unobservable |
> |---|---|---|---|---|
> | S4 checkout | 316 | 99 | 72.8 | **Weak.** Census strength would do (about 7% of relative treatment and 5% of relative outcome variation), or less outcome power if paired with more treatment power. For reference, UA alone explains about 35% (treatment) and 20% (outcome). |
> | S1 checkout | 217 | 93.6 | 30 | **Moderate.** About the strength of set 4 (M), about 40% of relative treatment and outcome variation. |
> | S9 checkout | 4,074 | 1,724 | 2.36 | **Massive.** "between 5 and 10 times as much explanatory power as the observables in our data." |
>
> The text gives S9's combined effect as "4047%" once (p. 40). Fig. 11, Table 6 and Fig. A-14 all give 4,074%, so 4047 is a transposition.

^ex-g19-fig11

**Fig. 11 axis and marker detail (p. 39; read off the plot, approximate).** Dotted reference lines mark relative $R^2=1$ on each axis, i.e. "as strong as all observables combined". The three panels are stacked vertically. The text's "bottom right panel" (p. 40) means the bottom panel.

| Panel | Axis ranges (treatment × outcome) | Observed-set markers (rel. $R^2_W$, rel. $R^2_Y$) | Locus of bias-eliminating $U$ (black dots) |
|---|---|---|---|
| S4 | 0-1.2 × 0-1.2 | C (0.07, 0.05); UA (0.33, 0.21); FB (0.50, 0.80); M (0.71, 0.30) | An L-shaped frontier hugging the axes. Points sit at (0.05-0.08, 0.11-0.14), along the floor from (0.2, 0.03) to (1.18, 0.01), and up the left wall to (0.0, 1.1). The frontier passes **just above C**, so a census-strength $U$ is enough. FB, UA and M all lie outside it. |
| S1 | 0-1.5 × 0-1.5 | C (0.02, 0.33); FB (0.11, 0.37); M (0.25, 0.39); UA (0.82, 0.42) | A convex frontier from (0.10, 1.47) through (0.18, 0.54), (0.30, 0.45), (0.46, 0.43), (0.52, 0.14), (0.82, 0.19), (1.18, 0.37) to (1.35, 0.08). The C, FB and M markers sit at outcome 0.33-0.39, **just below** the frontier, so a $U$ about as strong as one set is needed. |
| S9 | 0-8 × 0-50+ | C, UA, FB, M all crammed near the origin (treatment 0-0.8, outcome about 0-0.5) | Every solution has relative treatment $R^2\ge1.1$. The frontier runs from (1.1, 52), (1.3, 41), (1.7, 45) down through (2.2, 24), (2.9, 13), (3.9, 12) to (7.35, 2.7). The closest points need a $U$ several times stronger than all observables combined on at least one axis. |

*Reader's check on S1:* the text says M "explains about 40% of the relative treatment and outcome variation" (p. 40). In the plot, M sits at about 0.39 on the outcome axis but only about **0.25** on the treatment axis. UA is the marker near 0.8 on treatment. The "40%" is accurate for outcome only.

*Reader's check on S9:* the text's "between 5 and 10 times as much explanatory power" fits the lower-right end of the frontier (treatment about 5-7.4 with outcome about 3-8). Points with smaller treatment strength need outcome strength of 13-52 times.

^tbl-g19-fig11-detail

### Table 6 — bias reduction through stratification (p. 40), sorted by $brr$

| Study | Outcome | EU lift | STRAT lift | RCT lift | brr |
|---|---|---|---|---|---|
| 11 | checkout | 392% | 7.1% | 8.6% | 0.4% |
| 3 | checkout | 198% | 18% | 8.8% | 5% |
| 2 | checkout | 377% | 37% | 1.3% | 10% |
| 4 | checkout | 316% | 99% | 73% | 11% |
| 14 | checkout | 365% | 99% | 62% | 12% |
| 15 | checkout | 126% | -13% | 2.4% | 12% |
| 10 | checkout | 138% | -15% | 2% | 13% |
| 8 | checkout | 179% | 33% | -2.9% | 20% |
| 13 | checkout | 61% | -30% | -15% | 20% |
| 7 | checkout | 131% | 35% | 2.7% | 25% |
| 1 | checkout | 217% | 94% | 30% | 34% |
| 12 | checkout | 233% | 81% | 1.2% | 34% |
| 9 | checkout | 4074% | 1724% | 2.4% | 42% |
| 5 | checkout | 678% | 306% | 450% | 63% |

*Reader's check on Study 7:* Fig. A-14 and Fig. A-9 give STRAT4 = **-35.3%**, not +35%. The printed $brr$ of 25% matches $|35-2.7|/|131-2.7|$. With -35.3 it would be about 30%. Either way S7 stays in the middle group.

Only checkout outcomes are analyzed, "because they are the outcomes for which observational methods performed the worst." Figs. A-14 (Studies 1-5, 7-9) and A-15 (10-15) give the panels for every study. Their headers repeat the EU/STRAT/RCT lifts above, with more precision for some values (e.g. S2 RCT 1.27, S3 STRAT 17.9, S8 STRAT 32.8, S10 STRAT -15.3, S11 STRAT 7.06, S12 STRAT 81.2, S13 EU 60.9, S15 STRAT -12.7).

### Figs. A-14 / A-15 — per-study sensitivity panels (pp. A-17, A-18)

Read off the plots, so values are approximate. Markers: **C** census, **UA** user activity, **FB** Facebook variables, **M** match score, each at (relative $R^2_W$, relative $R^2_Y$). Solutions are drawn as **black dots** in some panels and **black triangles** in others. The paper never explains the triangles. They appear in exactly the five studies where STRAT *under*-estimates the RCT lift (S5, S7, S10, S13, S15). A plausible reading, not stated in the paper, is that these are solutions with the opposite bias direction, or solutions found only in the $p_{11}\in\{0,1\}$ fallback search.

| Study | Header lifts (EU / STRAT / RCT) | Axes (W × Y) | Marker positions | Where the bias-eliminating locus sits | Paper's group (p. 40) |
|---|---|---|---|---|---|
| S1 | 217 / 93.6 / 30 | 0-1.5 × 0-1.5 | C (0.02, 0.33), FB (0.11, 0.37), M (0.25, 0.39), UA (0.82, 0.42) | Just above C/FB/M. Same as Fig. 11. | middle |
| S2 | 377 / 36.8 / 1.27 | 0-1 × 0-1 | C (0.02, 0.48), M (0.52, 0.23), FB (0.58, 0.63), UA (0.78, 0.17) | Steep curve near the axes: (0.01, 0.62), (0.02, 0.36), (0.05, 0.14), then along the floor to (0.85, 0.01). It lies **inside** M, FB and UA. | little |
| S3 | 198 / 17.9 / 8.81 | 0-1.2 × 0-1.2 | C (0.02, 0.37), FB (0.38, 0.50), M (0.39, 0.55), UA (0.85, 0.13) | Hugs the axes: (0.01, 1.19), (0.03, 0.38), (0.06, 0.19), (0.2, 0.05) ... (1.16, 0.01). It is **inside** FB, M and UA, and about level with C. | little |
| S4 | 316 / 99 / 72.8 | 0-1.2 × 0-1.2 | C (0.07, 0.05), UA (0.33, 0.21), FB (0.50, 0.80), M (0.71, 0.30) | Just beyond C, well inside the others. Same as Fig. 11. | little |
| S5 | 678 / 306 / 450 | 0-1.5 × 0-1.5 | C (0.03, 0.04), UA (0.27, 0.18), M (0.78, 0.18), FB (0.40, 0.75) | Triangles at (0.07, 1.13), (0.11, 0.33), (0.28, 0.37), (1.30, 0.06). This is beyond UA and M on outcome, but within FB. | middle |
| S7 | 131 / -35.3 / 2.66 | 0-1.2 × 0-1.2 | C (0.03, 0.05), FB (0.37, 0.60), M (0.63, 0.40), UA (0.77, 0.46) | Triangles at (0.06, 0.73), (0.13, 0.77) and (1.01, 0.06). This needs FB-level outcome power, or treatment power equal to all observables. | middle |
| S8 | 179 / 32.8 / -2.92 | 0-1 × 0-1 | UA (0.07, 0.37), C (0.08, 0.56), FB (0.59, 0.49), M (0.86, 0.06) | (0.05, 0.89), (0.06, 0.59), (0.07, 0.41), (0.11, 0.31), (0.16-0.29, 0.12), (0.44-0.54, 0.03-0.05), (0.97, 0.02). It passes **through the C/UA markers**, so about one set's worth. | middle |
| S9 | 4074 / 1724 / 2.36 | 0-8 × 0-50+ | All four near the origin | Treatment ≥1.1 everywhere. Same as Fig. 11. | massive |
| S10 | 138 / -15.3 / 2.02 | 0-1 × 0-1 | C (0.03, 0.03), FB (0.26, 0.19), M (0.22, 0.61), UA (0.82, 0.19) | Triangles hugging the axes: (0.0, 0.64), (0.0, 0.50), (0.0, 0.10), then the floor (0.09-0.76, about 0.01). Inside FB, M and UA. | little |
| S11 | 392 / 7.06 / 8.62 | 0-1 × 0-1 | C (0.06, 0.13), UA (0.33, 0.13), M (0.65, 0.25), FB (0.66, 0.85) | Almost on the axes: (0.0, 0.74), (0.0, 0.26), (0.01, 0.09), then outcome about 0 out to 0.82. The weakest requirement of all (brr 0.4%). | little |
| S12 | 233 / 81.2 / 1.23 | **0-6 × 0-6** | C (0.10, 0.07), FB (0.40, 0.25), M (0.40, 0.53), UA (0.65, 0.80) | All markers are inside a unit box. Solutions run from (0.22, 5.2), (0.32, 3.1), (0.48, 2.7), (0.28-0.73, 1.5-1.75) through (1.2, 0.79) and (2.55, 0.79) to (4.65, 0.17). The nearest point, about (0.75, 0.57), is just beyond UA/M. Most require 1.5-5× the combined observables. | massive |
| S13 | 60.9 / -30.1 / -15.1 | 0-2.5 × 0-2.5 | C (0.03, 0.13), M (0.37, 0.17), UA (0.55, 0.27), FB (0.57, 0.84) | Triangles at (0.02, 2.35), (0.12, 1.82), (0.14, 0.44), (0.87, 0.15), (2.16, 0.05). These are beyond C/M/UA but inside FB on outcome. | middle |
| S14 | 365 / 99 / 62 | 0-1.5 × 0-1.5 | C (0.02, 0.07), M (0.37, 0.22), UA (0.63, 0.24), FB (0.78, 0.85) | (0.02, 1.47), (0.02, 1.07), (0.02, 0.57), (0.03, 0.45), (0.06-0.17, 0.14-0.17), (0.27-0.37, 0.05), (0.67-0.70, 0.02), (1.35, 0.01). Inside M and UA. | little |
| S15 | 126 / -12.7 / 2.39 | 0-2 × 0-2 | C (0.02, 0.04), M (0.24, 0.12), UA (0.61, 0.21), FB (0.60, 0.85) | Triangles at (0.01, 1.82), (0.02, 1.56), (0.20, 0.51), (0.30, 0.04), (0.77, 0.11), (1.68, 0.03). Comparable to UA/M, or FB on outcome. | middle |

**What the panels add beyond the text.** (i) The marker positions confirm the §8 claims panel by panel. **C** is never beyond about 0.1 on treatment. **UA** and **M** mostly sit far right (treatment 0.22-0.86) but low (outcome mostly 0.1-0.4). The exception is S8, where UA is at treatment 0.07. **FB** is high on both axes (outcome 0.5-0.85 in 10 of 14 panels). (ii) The axis range alone sorts the groups: the "massive" studies (S9, S12) are the only ones whose axes extend well beyond 2, to 6 and 50. (iii) In "little" studies the frontier lies between the C marker and the others. In "middle" studies it runs through or just past one of UA/M/C/FB. (iv) Census outcome strength: C's outcome coordinate is 0.13-0.56 in exactly six panels (S1, S2, S3, S8, S11, S13), which matches the text's "6 of 14 cases" in which census variables account for 10-60% of explained outcome variation.

^tbl-g19-a14-a15

> [!theorem] What the sensitivity analysis shows (§8, pp. 40-41)
> 1. **Required strength rises roughly with $brr$.** Little extra information is needed for Studies **11, 3, 2, 4, 14, 10**. About one or two variable sets' worth is needed for **15, 8, 13, 7, 1, 5**. "Massive additional information relative to what we observe" is needed for **12 and 9**.
> 2. **Census variables** explain little. They never account for more than 10% of explained exposure variation, but in 6 of 14 cases they account for 10-60% of explained *outcome* variation.
> 3. **User-activity variables** mostly explain *exposure*, not outcome. This is consistent with Lewis, Rao & Reiley's (2011) finding that unobserved activity drove selection into exposure ([[Activity Bias in Advertising]]).
> 4. **The match score** also mostly explains exposure rather than outcome, which is "not ex-ante obvious" for a composite of many behaviors.
> 5. **FB variables** have high explanatory power for both exposure and outcome about equally.
> 6. For some studies the required covariates would "exceed considerably our combined observables' explanatory power".

^thm-g19-sens

**Why the asymmetry matters.** A good deconfounder has to predict *both* exposure and the untreated outcome. Variables that mainly predict exposure (activity, match score) sharpen the propensity model and separate the propensity densities (Fig. 5) without removing much outcome confounding. They can even absorb the exogenous variation the method relies on.

## Examples

> [!example] A generic analogue for model validation
> Suppose an observational attribution model on a 52-156-week panel claims a channel effect three times larger than a single geo test found. The §8 logic suggests asking: how strong would an omitted driver (seasonality, promotions, competitor activity) have to be, *relative to all included controls*, to close that gap? If the answer is "weaker than the controls already included", the discrepancy is plausibly fixable with better data. If it is "several times everything we have", the model's causal claim should be dropped rather than patched. Pair this with the E-value-style tools in [[Sensitivity Analysis in Observational Studies]] and [[Q - A Unified View of Sensitivity to Assumption Violations]].

^exa-g19-sensitivity-to-unobs-1

## Connections

- [[Sensitivity Analysis in Observational Studies]] — Rosenbaum-style bounds. This paper calibrates the confounder's strength against observed covariates instead of using a $\Gamma$ parameter.
- [[Honest DiD - Sensitivity to Parallel Trends Violations]] — the same "how big a violation breaks the conclusion" logic for a different identifying assumption.
- [[Omitted Variables Bias]] — the parametric model A1-A2 is the textbook OVB structure with a binary omitted variable.
- [[Experimental Benchmarks for Observational Ad Measurement]] — its brr summary (median ≈ 16%) comes from Table 6.
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — when the bias term is comparable to or larger than the effect, more data (larger $N$) does not help.

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] — the STRAT and E-U values used in $brr$.
- [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] — what the authors conclude from this.
