---
title: "Bareinboim 2016 - SCM Principles and Confounding Bias"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Bareinboim 2016 - Causal Inference and the Data-Fusion Problem.pdf]]"
source_location: "Intro through Identification Through Auxiliary Experiments, pp. 7345-7349 (PDF pp. 1-5), Fig. 1-3, Defs. 1-3, Eqs. 1-12, Summary Result 1"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Bareinboim Pearl 2016 - Causal Inference and Data Fusion"
doc_type: paper
depends_on:
  - "[[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Bareinboim 2016 - Sample Selection Bias and Recoverability]]"
  - "[[Bareinboim 2016 - Transportability and Data Fusion]]"
aliases:
  - Backdoor criterion (Bareinboim Pearl)
  - Front-door adjustment (Bareinboim Pearl)
  - z-identification
  - Two principles of causal inference
  - Four generalization tasks
---

# Bareinboim 2016 - SCM Principles and Confounding Bias

> [!summary]
> This note covers the paper's setup: the four data-fusion "tasks" of Fig. 1, the structural causal model with its two principles (structural counterfactuals and structural independences), the do-calculus, and the complete treatment of **confounding bias**: backdoor adjustment, front-door adjustment, and identification using an experiment on an auxiliary variable $Z$ (**z-identification**). Summary Result 1: policy-evaluation identification is complete for DAG assumptions.

## Overview

The Introduction frames every generalization problem as a mismatch between the query and the *design* of the data, with each design a triplet **(population, regime, sampling method)**. The four archetypes are (Fig. 1; $V=\{X,Y,Z,W\}$):

| Task | Population | Regime | Sampling | Data available | Bias problem |
|---|---|---|---|---|---|
| 1 | same as target | observational | random | $P(y,x,z,w)$ | confounding bias |
| 2 | same | experimental on $Z$ (more accessible than $X$) | random | $P(y,x,w\mid do(z))$ | confounding; IV special case |
| 3 | same | experimental ($do(x)$) or observational | biased: $S=1$ | $P(y,z,w\mid do(x),S=1)$, maybe $P(y,x,z,w\mid S=1)$ | sampling selection bias |
| 4 | different ($S=s$) | experimental source, observational target | random | $P(y,z,w\mid do(x))$ and $P(y,x,z,w\mid S=s)$ | transportability bias |

Query throughout: $Q=P(Y=y\mid do(X=x))$ (task 4: $P(y\mid do(X=x),S=s)$).

## Main Content

### The structural causal model

> [!definition] Structural causal model (SCM)
> $M=\langle U,V,F\rangle$ (with $P(u)$): $U$ exogenous (background) variables, $V$ endogenous variables, $F$ functions with $v_i=f_i(v,u)$. A unit $U=u$ stands for the "sum total of all relevant factors that govern the behavior of an individual or experimental circumstances" (subject, agricultural lot, time of day). The causal graph $G$ (DAGs in this paper) shows which variables enter which function; dependence among $U$'s is drawn as double-arrowed arcs. Notation: uppercase variables, lowercase values, family-relations vocabulary for graph relations.
^def-scm-2016

**Counterfactuals.** For $M_x$ = $M$ with equations for $X$ replaced by $X=x$:
$$Y_x(u)\triangleq Y_{M_x}(u)\qquad[1]$$
"$Y$ would be $y$ had $X$ been $x$ in unit $U=u$." $P(u)$ induces $P(Y_x=y)$ and probabilities of any combination of counterfactuals. Galles and Pearl (1998) and Halpern (1998) give complete axiomatizations; the axioms coincide with those governing Rubin's potential outcomes, so the two systems are logically equivalent (any valid inference in one is valid in the other); they differ in how assumptions are articulated and scrutinized. The SCM framework is described as a "symbiosis" of Neyman-Rubin-Robins counterfactuals and the Haavelmo-Marschak-Heckman econometric tradition.

> [!theorem] The two principles of causal inference
> 1. **Law of structural counterfactuals** (Eq. 1): semantics of counterfactuals, how to compute them and their probabilities from the structural model and data.
> 2. **Law of structural independences**: regardless of the functional form of $F$ and the distribution of $U$, a recursive model's $P(v)$ obeys conditional independences read from the graph: if $X$ and $Y$ are separated by $Z$ (d-separation), then $X\perp Y\mid Z$ in $P$. This links causal assumptions (missing arrows) to observed data.
^thm-two-principles

> [!definition] Definition 1 (d-separation)
> A set $Z$ of nodes **blocks** a path $p$ if either (i) $p$ contains at least one arrow-emitting node in $Z$, or (ii) $p$ contains at least one collision node outside $Z$ with no descendant in $Z$. If $Z$ blocks all paths from $X$ to $Y$ it **d-separates** them, written $(X\perp Y\mid Z)$. (Footnote: a path is a sequence of consecutive edges regardless of direction.)
^def-dsep-2016

Illustration (Fig. 2A): $Z_1\perp Y\mid\{X,Z_3,W_2\}$ because that set blocks all paths from $Z_1$ to $Y$. The set $\{X,Z_3,W_3\}$ leaves the path $Z_1\to Z_3\leftarrow Z_2\to W_2\to Y$ open (collider at $Z_3$ conditioned on), so the independence is not implied. Unlike "ignorability"-type assumptions, graph assumptions "can be meaningfully scrutinized for scientific plausibility or be submitted to statistical tests".

### Policy evaluation and the problem of confounding

**Intervention.** For atomic intervention:
$$P(y\mid do(x))\triangleq P(Y_x=y)\qquad[2]$$
Fig. 2B shows $M_x$ with the arrows into $X$ (the *assignment mechanism*, e.g. $\{W_1,Z_3\}$) cut. Stratum-specific effect:
$$P(y\mid do(x),z)\triangleq P(y,z\mid do(x))/P(z\mid do(x))=P(Y_x=y\mid Z_x=z)\qquad[3]$$
For pretreatment $Z$ (sex, age, ethnicity), $Z_x=Z$.

> [!definition] Definition 2 (Identifiability; Pearl 2009 p. 77)
> A causal query $Q$ is identifiable from a distribution $P(v)$ compatible with graph $G$ if for any two fully specified models $M_1,M_2$ satisfying the assumptions in $G$,
> $$P_1(v)=P_2(v)\Rightarrow Q(M_1)=Q(M_2).\qquad[4]$$
> Then $Q$ depends on $P(v)$ and $G$ only and can be expressed in terms of $P(v)$'s parameters regardless of the true mechanisms $F$ and $P(u)$.
^def-identifiability-2016

> [!theorem] Rules of do-calculus (Eqs. 5-7)
> With $G_{\overline X}$ (arrows into $X$ deleted), $G_{\underline X}$ (arrows out of $X$ deleted), and combinations:
> - **Rule 1** (insertion/deletion of observations): $P(y\mid do(x),z,w)=P(y\mid do(x),w)$ if $(Y\perp Z\mid X,W)_{G_{\overline X}}$. [5]
> - **Rule 2** (action/observation exchange): $P(y\mid do(x),do(z),w)=P(y\mid do(x),z,w)$ if $(Y\perp Z\mid X,W)_{G_{\overline X\underline Z}}$. [6]
> - **Rule 3** (insertion/deletion of actions): $P(y\mid do(x),do(z),w)=P(y\mid do(x),w)$ if $(Y\perp Z\mid X,W)_{G_{\overline{X}\,\overline{Z(W)}}}$, with $Z(W)$ the $Z$-nodes that are not ancestors of any $W$-node in $G_{\overline X}$. [7]
>
> To identify $Q$, repeatedly apply the rules until no $do$ remains. The calculus is **complete** for queries $P(y\mid do(x),z)$ (Shpitser and Pearl; Huang and Valtorta): if $Q$ cannot be reduced to observables, it is not identifiable.
^thm-docalc-2016

(Identical statement in [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]].)

### Covariate selection: backdoor criterion

> [!definition] Definition 3 (admissible sets, the backdoor criterion)
> A set $Z$ is admissible (sufficient) for estimating the causal effect of $X$ on $Y$ if
> (i) no element of $Z$ is a descendant of $X$, and
> (ii) the elements of $Z$ block all **backdoor paths** from $X$ to $Y$, i.e. all paths that end with an arrow pointing to $X$.
^def-backdoor

In Fig. 2A: $\{Z_1,Z_2,Z_3\}$, $\{Z_1,Z_3\}$, $\{W_1,Z_3\}$, $\{W_2,Z_3\}$ are each sufficient; $\{Z_3\}$ alone is not, because it leaves open $X\leftarrow W_1\leftarrow Z_1\to Z_3\leftarrow Z_2\to W_2\to Y$ (conditioning on the collider $Z_3$ opens it). Intuition: backdoor paths carry *spurious* association; paths along arrows carry *causative* association; after deleting outgoing edges from $X$ (Fig. 2C), $Z$ separating $X$ from $Y$ means the remaining association is causal.

> [!theorem] Adjustment formula and the definition of confounding bias
> If $Z$ is admissible,
> $$P(Y=y\mid do(X=x))=\sum_z P(y\mid x,Z=z)\,P(Z=z)\qquad[8]$$
> whereas the plain conditional is
> $$P(Y=y\mid X=x)=\sum_z P(y\mid x,Z=z)\,P(Z=z\mid x).\qquad[9]$$
> The difference between [8] and [9] (weight $P(z)$ versus $P(z\mid x)$) defines **confounding bias**.
^thm-adjustment

Further points: (a) the backdoor criterion implies conditional ignorability $X\perp Y_x\mid Z$ (Rosenbaum-Rubin) and is the scientific basis for potential-outcome inference; covariates entering a propensity score must be backdoor-sufficient or bias arises. (b) The criterion can be applied systematically to diagrams of any size, replacing the "formidable mental task" of judging ignorability. (c) It supports optimal-set search (minimum cost or variance; refs 22, 23). (d) Footnote ††: Shpitser et al.'s relaxation adds to condition (ii) the requirement that $X$ and its nondescendants (in $Z$) separate its descendants (in $Z$) from $Y$.

### Beyond adjustment: front-door

If only $\{X,Y,W_3\}$ are observed in Fig. 2A, backdoor admissibility fails, but the do-calculus gives the **front-door** expression:
$$P(Y=y\mid do(X=x))=\sum_{w_3}P(w_3\mid x)\sum_{x'}P(y\mid x',w_3)\,P(x')\qquad[10]$$
(almost always different from [8]). If $W_3$ is also unobserved, only $P(x,y)$ is available and the calculus finds no reduction: by completeness the query is **not identifiable** without further assumptions.

### Identification through auxiliary experiments (task 2): z-identification

Example (Fig. 3A): effect of cholesterol $X$ on heart disease $Y$ with diet $Z$ recorded. Cholesterol cannot be directly controlled, so $P(y\mid do(x))$ cannot be obtained from a trial of $X$, but a trial in which $Z$ is randomized is feasible. The extended identifiability problem adds the interventional input $P(v\mid do(z))$ to $P(v)$ and $G$; it is the nonparametric version of instrumental variables, named **z-identification**.

Under the Fig. 3A assumptions the target reduces to
$$Q=P(Y=y\mid do(X=x))=P(y,x\mid do(z))/P(x\mid do(z))\qquad[11]$$
for any level $Z=z$. Since all $do$-terms apply only to $Z$, $Q$ is estimable from the available data (the Wald-ratio analogue).

> [!theorem] z-identifiability criterion (ref. 24)
> $Q=P(y\mid do(x))$ is z-identifiable **if and only if** (a) $X$ intercepts all directed paths from $Z$ to $Y$, and (b) $P(y\mid do(x))$ is identifiable in $G_{\overline Z}$ (the graph with arrows into $Z$ removed).
^thm-z-identification

Note: these conditions are stronger than those for LATE (Angrist-Imbens-Rubin) or other functionally restricted IV analyses because the problem is nonparametric.

**Fig. 3B example.** $Z_1$ serves as an auxiliary variable because (i) there is no directed path from $Z_1$ to $Y$ in $G_{\overline X}$ and (ii) $Z_2$ is a sufficient set in $G_{\overline{Z_1}}$. The result needs both experimental and observational data:
$$P(Y=y\mid do(X=x))=\sum_{z_2}P(y\mid x,do(z_1),z_2)\,P(z_2)\qquad[12]$$
The first factor is estimable from the experimental dataset and the second from the observational one. Figs. 3C and 3D are negative examples where $Q$ is not estimable even with both distributions available; "contrary to intuition, non-confoundedness of $X$ and $Y$ in $G_{\overline Z}$ is not sufficient."

> [!summary] Summary Result 1 (Identification in policy evaluation)
> Policy evaluation has reached a fairly satisfactory maturity: with DAG assumptions there is (i) graphical and algorithmic criteria for deciding identifiability, (ii) automated procedures for extracting every identifiable estimand, (iii) extensions to sequential dynamic decisions with unmeasured confounders (refs 14, 16, 18, 24-26). Scope note: the analysis is nonparametric; parametric or functional restrictions allow more (refs 3, 24).
^summary-result-1

## Examples

> [!example] Backdoor versus plain conditioning in numbers
> Binary $Z$ (sex), $X$ (treatment), $Y$. $P(Z{=}1)=0.5$; $P(Z{=}1\mid x{=}1)=0.8$, $P(Z{=}1\mid x{=}0)=0.2$; $P(Y{=}1\mid x,z)$: $(1,1){:}0.6,(1,0){:}0.4,(0,1){:}0.5,(0,0){:}0.2$.
> - Adjustment [8] $x{=}1$: $0.5(0.6)+0.5(0.4)=0.50$; $x{=}0$: $0.5(0.5)+0.5(0.2)=0.35$. Causal risk difference $0.15$.
> - Conditional [9] $x{=}1$: $0.8(0.6)+0.2(0.4)=0.56$; $x{=}0$: $0.2(0.5)+0.8(0.2)=0.26$. Observed difference $0.30$ (twice the causal one), the gap is confounding bias.
> ```python
> py = {(1,1):.6,(1,0):.4,(0,1):.5,(0,0):.2}       # P(Y=1|x,z)
> pz = .5; pz_x = {1:.8, 0:.2}
> adj = {x: sum(py[(x,z)]*(pz if z else 1-pz) for z in (0,1)) for x in (0,1)}
> cnd = {x: sum(py[(x,z)]*(pz_x[x] if z else 1-pz_x[x]) for z in (0,1)) for x in (0,1)}
> print(adj[1]-adj[0], cnd[1]-cnd[0])          # 0.15  vs 0.30
> ```
^example-backdoor-numbers

> [!example] Marketing reading of z-identification
> $X$ = realized ad exposure (cannot be randomized directly), $Z$ = randomized eligibility/ghost-ad assignment (an encouragement), $Y$ = conversion. If $Z$ affects $Y$ only through $X$ and the other conditions hold, $Q=P(y,x\mid do(z))/P(x\mid do(z))$ for binary $X$ is the Wald-type exposure effect; the paper's criterion says when that remains valid without monotonicity or other functional assumptions. See [[Instrumental Variables]], [[Conversion Lift Studies on Ad Platforms]].

## Connections

- Task 3 and its solution: [[Bareinboim 2016 - Sample Selection Bias and Recoverability]]. Task 4: [[Bareinboim 2016 - Transportability and Data Fusion]].
- Backdoor is the graph analogue of conditional exchangeability in [[Potential Outcomes Framework]]; propensity methods: [[Propensity Score Matching - Overview]].
- More on identification from graphs: [[DAGs and Causal Identification]], [[Do-Calculus in Summary Causal DAGs]].

## See Also

- [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]
