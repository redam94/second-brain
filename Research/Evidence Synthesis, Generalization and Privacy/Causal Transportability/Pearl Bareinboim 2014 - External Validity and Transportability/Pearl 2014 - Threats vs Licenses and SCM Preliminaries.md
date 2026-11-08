---
title: "Pearl 2014 - Threats vs Licenses and SCM Preliminaries"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Secs. 1-2, arXiv pp. 1-6 (journal pp. 579-585)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Pearl 2014 - Motivating Examples and Transport Formulas]]"
  - "[[Pearl 2014 - Selection Diagrams and Definition of Transportability]]"
aliases:
  - Threats vs licenses to transport
  - Structural equation model definition (Pearl Bareinboim)
  - Do-calculus rules (Pearl Bareinboim 2014)
---

# Pearl 2014 - Threats vs Licenses and SCM Preliminaries

> [!summary]
> The paper argues that external-validity thinking has been dominated by *threats* (what could go wrong) rather than *licensing assumptions* (formal conditions under which transport is valid), and that causal diagrams plus the do-calculus finally let us state licenses precisely. This note covers the motivation (Sec. 1) and the review of structural equation models, interventions, identifiability, d-separation and the three rules of do-calculus (Sec. 2) that everything later builds on.

## Overview

Sections 1 and 2 contain no new theorem. They fix the language: a **structural equation model** (SEM, here used for the nonparametric structural causal model), the $do(x)$ operator, **identifiability**, **d-separation** and the **three rules of do-calculus**. Transportability will be defined by re-using exactly these objects, with one change of goal: instead of eliminating $do$-operators from a query, we will *separate them from the selection variables $S$*.

## Main Content

### Sec. 1: threats versus assumptions

The paper's opening claim: "Science is about generalization." If the target environment is arbitrary, nothing transfers; the fact that most studies are meant to be applied elsewhere means we usually deem the target "sufficiently similar".

**What the literature offers.**
- Statistical practice combines studies by meta-analysis (Glass; Hedges and Olkin; Owen) or hierarchical models (Gelman and Hill): inverse-variance reweighting, partial pooling, with no explicit distinction between experimental and observational regimes, and performance judged by simulation.
- Theory falls under "external validity" (Campbell and Stanley 1963; Manski 2007), "heterogeneity", "quasi-experiments" and consists mostly of **threats**: explanations of what may go wrong when differences are ignored.

**Why threats dominate (the paper's three reasons).**
1. Threats are safer to cite than assumptions. "He who cites threats appears prudent, cautious and thoughtful, whereas he who seeks licensing assumptions risks suspicions of attempting to endorse those assumptions."
2. Assumptions are self-destructive in their honesty: the more explicit, the more criticism, because explicitness triggers a richer space of alternatives in which the assumption fails. Researchers "declare threats in public and make assumptions in private".
3. Threats can be communicated in plain English; assumptions need a formal language in which "environment" or "population" is precisely characterized and differences can be encoded. Causal diagrams (Wright, Heise, Verma and Pearl, Spirtes-Glymour-Scheines, Pearl 1995), models of intervention (Haavelmo; Strotz and Wold) and counterfactuals (Neyman, Rubin, Robins, Balke and Pearl) now provide that.

> [!definition] Manski's external validity (footnote 1)
> "An experiment is said to have external validity if the distribution of outcomes realized by a treatment group is the same as the distribution of outcome that would be realized in an actual program." Campbell and Stanley take the broader view: to what populations, settings, treatment variables and measurement variables can this effect be generalized. The paper later shows Manski's notion equals **direct transportability** (Definition 7).
^def-manski-external-validity

Footnote 2: Hernan and VanderWeele (2011) studied licensing conditions for compound treatments (predicting the effect of one treatment version from experiments with another); their analysis is a special case of this theory (Petersen 2011). Robins, Orellana and Rotnitzky (2008) extrapolate a treatment strategy between two biologically similar populations under different observational regimes.

### Sec. 2.1: causal models as inference engines

Causal modeling is viewed as an **inference engine** with three inputs and three outputs (Fig. 1).

| Item | Symbol | Meaning |
|---|---|---|
| Input I-1 | $A$, $M_A$ | qualitative causal assumptions the investigator will defend, and a model encoding them (in SEM, a diagram or a set of unspecified functions); e.g. exclusion restrictions, independence of error terms |
| Input I-2 | $Q$ | queries, e.g. $Q_1$: effect of $X$ on $Y$; $Q_2$: is this employer discriminating? Each $Q_i$ must be computable from any fully specified model compatible with $A$ |
| Input I-3 | $D$ | experimental or non-experimental data from a joint distribution presumably consistent with $A$ |
| Output O-1 | $A^*$ | logical implications of $A$ alone (e.g. $Z$ is an instrument for $\{X,Y\}$) |
| Output O-2 | $C$ | data-dependent claims about queries, contingent on $A$; an estimand $Q_i(P)$ or a determination that $Q_i$ is not identifiable |
| Output O-3 | $T$, $g(T_i)$ | testable statistical implications of $A$ (conditional independences, equality constraints) and the degree to which data agree with each |

Transportability fits as follows: data come from two sources (experimental from the study, nonexperimental from the target), assumptions are encoded as **selection diagrams**, and the query is the target-population causal effect $P^*(y\mid do(x))$.

### Sec. 2.2: structural equation models

> [!definition] Definition 1 (Structural equation model; Pearl 2000, p. 203)
> An SEM $M$ consists of:
> 1. a set $U$ of **background (exogenous) variables**, factors outside the model that affect relationships within it;
> 2. a set $V=\{V_1,\dots,V_n\}$ of **endogenous variables**, assumed observable, each functionally dependent on some subset $PA_i\subseteq U\cup V$;
> 3. a set $F=\{f_1,\dots,f_n\}$ of functions with $v_i=f_i(pa_i,u)$;
> 4. a joint probability distribution $P(u)$ over $U$.
^def-sem

Each function is a *mechanism* (assumed invariant unless intervened on). Absence of a variable from the arguments of $f_i$ encodes the assumption that nature ignores it. Example, Fig. 2(a):

$$z=f_Z(u_Z),\qquad x=f_X(z,u_X),\qquad y=f_Y(x,u_Y)\qquad(2.1)$$

with $U_Z,U_X,U_Y$ jointly independent but otherwise arbitrary. Dependence between exogenous variables is drawn as a **bidirected arrow** (footnote 4: absence of bidirected arrows implies marginal independences among the exogenous variables, i.e. the bidirected edges form an I-map of $P(U)$). The absence of $Z$ from $f_Y$ says that varying $Z$ leaves $Y$ unchanged as long as $U_Y$ and $X$ are held constant.

A **fully specified** model fixes $P(U)$ and $F$ and entails exactly one $P(V)$. A **partially specified** model (usually only the diagram) entails the set of all distributions generated by some $\langle F,P(u)\rangle$.

### Sec. 2.3: interventions

The operator $do(x)$ simulates a physical intervention by deleting the equation for $X$ and replacing it with the constant $X=x$, leaving the rest of the model unchanged (Haavelmo; Strotz and Wold). For model (2.1) and $do(x_0)$:

$$z=f_Z(u_Z),\qquad x=x_0,\qquad y=f_Y(x,u_Y)\qquad(2.2)$$

shown as Fig. 2(b). The post-intervention distribution $P(z,y\mid do(x_0))$ differs from the pre-intervention $P(x,y,z)$.

$$P_M(y\mid do(x))=P_{M_x}(y)\qquad(2.3)$$

Footnote 5: $P(z,y\mid do(x_0))$ equals the joint probability of $(Z,Y)$ under a randomized experiment with $X=x_0$ for all units. Footnote 6: in potential outcomes, $P(y\mid do(x),z)=P(Y_x=y\mid Z_x=z)$; counterfactuals $Y_x(u)=Y_{M_x}(u)$ are not needed in this paper.

### Sec. 2.4: identification and d-separation

> [!definition] Definition 2 (Identifiability)
> A causal query $Q(M)$ is identifiable, given assumptions $A$, if for any two fully specified models $M_1,M_2$ satisfying $A$,
> $$P(M_1)=P(M_2)\;\Rightarrow\;Q(M_1)=Q(M_2).\qquad(2.4)$$
> In words: assumptions in $A$ constrain the variability of unspecified functional details so that equality of observational distributions entails equality of the query.
^def-identifiability

Footnote 7: this is the usual parameter identification implication (uniqueness of $\theta$ given $P_\theta$), with the query seen as $Q=g(\theta)$ where $\theta=F\cup P(u)$.

> [!definition] Definition 3 (d-separation)
> A set $S$ of nodes **blocks** a path $p$ if either (1) $p$ contains at least one arrow-emitting node in $S$, or (2) $p$ contains at least one collision node outside $S$ with no descendant in $S$. If $S$ blocks all paths from $X$ to $Y$, then $S$ **d-separates** $X$ and $Y$, written $(X\perp Y\mid S)$, and $X$ and $Y$ are independent given $S$ in every distribution compatible with the diagram.
^def-d-separation

Worked check on Fig. 2(a): the path $U_Z\to Z\to X\to Y$ is blocked by $\{Z\}$ and by $\{X\}$ (each emits an arrow along the path), so $U_Z\perp Y\mid Z$ and $U_Z\perp Y\mid X$ hold for any parameterization. The path $U_Z\to Z\to X\leftarrow U_X$ is blocked by the empty set (collider $X$) but not by $\{Y\}$ because $Y$ is a descendant of the collider; so $U_Z\perp U_X$ holds marginally and $U_Z\perp U_X\mid Y$ may or may not (Berkson's paradox; footnote 9 gives the two-coin example: observing that at least one coin is a tail makes the independent coins dependent).

### Sec. 2.5: the rules of do-calculus

Notation: for disjoint node sets $X,Y,Z,W$ in a causal DAG $G$: $G_{\overline X}$ is $G$ with all arrows **into** $X$ deleted; $G_{\underline X}$ is $G$ with all arrows **out of** $X$ deleted; $G_{\overline{X}\,\underline{Z}}$ deletes both kinds.

> [!theorem] Do-calculus (Pearl 1995), valid for every interventional distribution compatible with $G$
> **Rule 1** (insertion/deletion of observations):
> $$P(y\mid do(x),z,w)=P(y\mid do(x),w)\quad\text{if }(Y\perp Z\mid X,W)_{G_{\overline X}}\qquad(2.5)$$
> **Rule 2** (action/observation exchange):
> $$P(y\mid do(x),do(z),w)=P(y\mid do(x),z,w)\quad\text{if }(Y\perp Z\mid X,W)_{G_{\overline X\,\underline Z}}\qquad(2.6)$$
> **Rule 3** (insertion/deletion of actions):
> $$P(y\mid do(x),do(z),w)=P(y\mid do(x),w)\quad\text{if }(Y\perp Z\mid X,W)_{G_{\overline X\,\overline{Z(W)}}}\qquad(2.7)$$
> where $Z(W)$ is the set of $Z$-nodes that are not ancestors of any $W$-node in $G_{\overline X}$.
^thm-do-calculus-rules

**Use.** To establish identifiability of $Q$, apply the rules repeatedly until the expression has no $do$-operator (footnote 10; worked examples in Pearl 2009b, p. 87). The do-calculus is **complete** for identification of effects of the form $Q=P(y\mid do(x),z)$ (Shpitser and Pearl 2006; Huang and Valtorta 2006): if $Q$ cannot be reduced to observables by these rules, no expression exists without further assumptions (linearity, monotonicity, additivity, no interactions, ...).

**What changes for transportability.** "Instead of eliminating do-operators from the query expression, we will need to separate them from a set of variables $S$ that represent disparities between populations." (end of Sec. 2.5)

> [!example] Python: d-separation check by moralization on the paper's Fig. 2(a)
> A minimal d-separation test (ancestral moral graph method) used to verify the paper's statements.
> ```python
> import itertools
> def ancestors(parents, nodes):
>     seen, stack = set(nodes), list(nodes)
>     while stack:
>         v = stack.pop()
>         for p in parents.get(v, []):
>             if p not in seen: seen.add(p); stack.append(p)
>     return seen
> def d_separated(parents, X, Y, Z):
>     keep = ancestors(parents, set(X)|set(Y)|set(Z))
>     und = {v:set() for v in keep}
>     for v in keep:
>         ps = [p for p in parents.get(v, []) if p in keep]
>         for p in ps: und[v].add(p); und[p].add(v)
>         for a,b in itertools.combinations(ps,2): und[a].add(b); und[b].add(a)   # marry parents
>     # remove Z, test connectivity X -> Y
>     stack, seen = [x for x in X if x not in Z], set()
>     while stack:
>         v = stack.pop()
>         if v in seen: continue
>         seen.add(v)
>         if v in Y: return False
>         stack += [n for n in und[v] if n not in Z]
>     return True
> g = {"Z":["UZ"], "X":["Z","UX"], "Y":["X","UY"]}      # Eq. 2.1 / Fig. 2(a)
> print(d_separated(g, {"UZ"}, {"Y"}, {"Z"}))   # True: Z blocks UZ -> Z -> X -> Y
> print(d_separated(g, {"UZ"}, {"UX"}, set()))  # True: collider X blocks
> print(d_separated(g, {"UZ"}, {"UX"}, {"Y"}))  # False: Y descends from the collider X
> ```
^example-dsep-python

## Examples

> [!example] A marketing reading of Eq. 2.1
> Let $Z$ = whether a market is a high-income DMA, $X$ = media spend level chosen by the planner (depends on $Z$), $Y$ = weekly sales. $do(x_0)$ is the geo experiment that overrides the planner's rule with randomly assigned spend. $P(y\mid do(x_0))$ is the experimental response curve; $P(y\mid x_0)$ is the observational association that mixes in the planner's targeting. See [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].

## Connections

- Foundations shared with [[Directed Acyclic Graphs]], [[DAGs and Causal Identification]], [[Markov and Faithfulness Assumptions]] and the rules restated for summary graphs in [[Do-Calculus in Summary Causal DAGs]].
- Definition 2 (identifiability) is what the later Definition 5 (transportability) generalizes; see [[Pearl 2014 - Selection Diagrams and Definition of Transportability]].
- The 2016 PNAS paper restates the same SCM, d-separation and do-calculus material: [[Bareinboim 2016 - SCM Principles and Confounding Bias]].

## See Also

- [[Potential Outcomes Framework]] for the Rubin counterpart of $P(Y_x=y)$.
- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
