---
title: Functional Causal Models (LiNGAM, ANM)
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Glymour Zhang Spirtes 2019 - Review of Causal Discovery Methods.pdf]]"
source_location: "Sec. 4 (FCM methods), 4.1 (LiNGAM), 4.2 (nonlinear/ANM/PNL), pp. 5-8; Fig. 3"
date_ingested: 2026-06-28
folder: "Causal Discovery/Constraint and Score-Based Discovery"
doc_type: paper
depends_on:
  - "[[Markov and Faithfulness Assumptions]]"
  - "[[PC Algorithm and Constraint-Based Discovery]]"
  - "[[Causal Discovery - Overview]]"
used_by: []
aliases:
  - LiNGAM
  - Additive Noise Model
  - ANM
  - Post-Nonlinear Model
  - PNL
  - Functional Causal Model
  - FCM
  - Noise Asymmetry
---

# Functional Causal Models (LiNGAM, ANM)

> [!summary]
> Constraint-based and score-based methods can only recover a **Markov equivalence class** — they cannot orient an edge between two variables when no conditioning set distinguishes the directions. **Functional causal model (FCM)** methods break this tie by modeling each effect as $Y = f(X, \varepsilon)$ with **noise $\varepsilon$ independent of cause $X$**, and exploiting a **noise asymmetry**: the independence $\varepsilon \perp X$ holds for the **true** direction but is **violated** for the reverse. This identifies causal **direction beyond the equivalence class**. Key models: **LiNGAM** (linear, non-Gaussian), **ANM** (nonlinear additive noise), and **PNL** (post-nonlinear, the most general).

## Overview

Recall the limitation: with only two variables and no usable conditional-independence relation, CI-based discovery gives no direction at all. FCM methods add **assumptions about the functional form and noise** so that the data distribution carries a footprint of direction. The general FCM:
$$ Y = f(X, \varepsilon; \theta_1), \qquad \varepsilon \perp X, $$
where $f$ lies in a constrained function class $\mathcal{F}$ and the map $(X,\varepsilon)\to(X,Y)$ is invertible so $\varepsilon$ can be recovered. The decisive property: the **independence between estimated noise and the hypothesized cause holds for only one direction** (under the model's identifiability conditions), so one fits the FCM both ways, tests $\hat\varepsilon \perp \text{cause}$, and picks the direction giving independence.

## Main Content

> [!definition] The independence-of-noise test for direction
> Given two variables believed directly causally related with **no confounder**, fit the FCM for **both** directions $X \to Y$ and $Y \to X$; for each, test independence between the **estimated noise** and the **hypothesized cause**. The direction yielding an independent noise term is the plausible causal direction. Without extra assumptions on $f$, an independent-noise representation exists for **both** directions (Hyvärinen-Pajunen; Zhang et al.), so a **constrained** function class is essential. ^noise-asymmetry

> [!definition] LiNGAM — Linear Non-Gaussian Acyclic Model
> Two-variable form $Y = bX + \varepsilon$ with $\varepsilon \perp X$. In matrix form $\mathbf{X} = \mathbf{B}\mathbf{X} + \mathbf{E}$, where $\mathbf{B}$ can be permuted to strictly lower-triangular (acyclicity) and $\mathbf{E}$ has independent components; equivalently $\mathbf{E} = (\mathbf{I} - \mathbf{B})\mathbf{X}$.
> - **Identifiability (Darmois–Skitovich / ICA).** If **at most one** of $X, \varepsilon$ is Gaussian, the causal direction is identifiable. Pure linear-**Gaussian** is the atypical case where the asymmetry vanishes (regression residuals are independent of the predictor in *both* directions).
> - **Estimation.** ICA-LiNGAM applies ICA $\mathbf{Z}=\mathbf{W}\mathbf{X}$ then permutes/rescales $\mathbf{W}$ to recover $\mathbf{B}$. As $n$ grows ICA may hit local optima; remedies impose **sparsity** on $\mathbf{B}$, or use **DirectLiNGAM** (recursive regression + independence tests for ordering), or the Two-Step method. Overcomplete ICA can even estimate **latent confounders** in the linear case. ^lingam

> [!definition] ANM — nonlinear Additive Noise Model
> $$ Y = f_{AN}(X) + \varepsilon, \qquad \varepsilon \perp X, $$
> with $f_{AN}$ a (generally nonlinear) function and additive independent noise. Nonlinearity itself becomes a source of identifiability: for a nonlinear $f_{AN}$ the additive-noise model typically holds in only one direction. ^anm

> [!definition] PNL — Post-Nonlinear model (most general)
> $$ Y = f_2\big(f_1(X) + \varepsilon\big), $$
> with $f_1$ nonlinear, $\varepsilon$ independent noise, and $f_2$ an invertible post-nonlinear distortion (modeling sensor/measurement nonlinearity). PNL **subsumes** LiNGAM and ANM as special cases and is identifiable in the generic case **except for five specified situations** (Zhang & Hyvärinen, 2009b) — the most notable non-identifiable case being the **linear-Gaussian** one. ^pnl

> [!theorem] Why FCMs beat the equivalence class — and their cost
> FCMs add assumptions on the **data distribution / functional form** that CI relations do not, so they can output a fully oriented **DAG** (Table 1) under their identifiability conditions — orienting edges PC/GES must leave undirected. The tradeoffs: (1) they assume **no confounder** between the pair; (2) results can be **misleading** if the assumed function class is too restrictive to approximate the true mechanism; (3) nonlinear FCMs are **less computationally efficient** than the linear case; (4) **discretization** of continuous data tends to destroy the asymmetry, making discrete-case direction hard. A common hybrid: estimate the MEC with CI tests (even kernel-based nonparametric ones), then apply FCMs to **orient the remaining undirected edges**. ^fcm-power

## Examples

- **Figure 3 (linear case).** 1,000 points of $Y = X + \varepsilon$. Regressing $Y$ on $X$ vs. $X$ on $Y$: when $X, \varepsilon$ are **Gaussian** (case 1) residuals look independent both ways — direction **not** identifiable. When $X, \varepsilon$ are **uniform** (case 2) or **super-Gaussian/Laplace** (case 3), the regression residual is independent of the predictor **only in the correct (causal) direction**, exposing the asymmetry $X \to Y$.
- **Cramér's decomposition** (theoretical backing): a sum of independent real variables is Gaussian only if every summand is Gaussian — so non-Gaussian noise is "generic," supporting LiNGAM's applicability while warning that near-Gaussian errors make direction hard to call.
- **Biology (FASK, Two-Step).** These procedures get an initial skeleton from adjacency search, then use **non-Gaussian** signal features to direct edges (FASK allows cycles/2-cycles), recovering much of the Sachs protein-signaling network.

## Connections

- Directly extends what [[PC Algorithm and Constraint-Based Discovery]] and [[GES and Score-Based Discovery]] can recover, by orienting edges left undirected in the **CPDAG** ([[Markov and Faithfulness Assumptions]]).
- Notably does **not** require faithfulness (Table 1), unlike PC/FCI/GES — see [[Causal Discovery - Overview]].
- FCMs are themselves structural equation / DGCM specifications; cf. [[Directed Acyclic Graphs]] and [[Summary Causal DAGs]].

## See Also

- [[Causal Discovery - Overview]]
- [[PC Algorithm and Constraint-Based Discovery]]
- [[GES and Score-Based Discovery]]
- [[Markov and Faithfulness Assumptions]]
