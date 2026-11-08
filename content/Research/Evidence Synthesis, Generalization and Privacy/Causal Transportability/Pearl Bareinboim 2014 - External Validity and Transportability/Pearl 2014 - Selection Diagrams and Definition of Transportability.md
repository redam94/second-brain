---
title: "Pearl 2014 - Selection Diagrams and Definition of Transportability"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Sec. 4, arXiv pp. 9-12 (journal pp. 587-590), Definitions 4-7, Theorem 1, Examples 4-6, Fig. 4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]]"
  - "[[Pearl 2014 - Motivating Examples and Transport Formulas]]"
used_by:
  - "[[Pearl 2014 - S-Admissibility and the Graphical Criterion]]"
  - "[[Bareinboim 2016 - Transportability and Data Fusion]]"
aliases:
  - Selection diagram definition
  - Definition of transportability
  - Direct transportability
  - Trivial transportability
  - Theorem 1 transportability do-calculus reduction
---

# Pearl 2014 - Selection Diagrams and Definition of Transportability

> [!summary]
> A **selection diagram** augments the common causal diagram of two populations with square $S$-nodes pointing at exactly those mechanisms (functions or exogenous distributions) that may differ between them. **Transportability** of a causal relation $R$ means $R(\Pi^*)$ is uniquely computable from the source experiments, source observations and target observations in every model inducing the diagram. Theorem 1 reduces it to a do-calculus derivation in which $S$ appears only as a conditioning variable in $do$-free terms.

## Overview

Section 3 showed transportability is a causal notion; Section 4 builds the representation. The key design decision: encode population differences as **local modifications of mechanisms**, represented by selection variables, so that switching between populations is conditioning on different values of $S$.

## Main Content

### 4.1 Selection variables

Let $P(v\mid do(x))$ be the distribution of $V$ in the experimental study on $\Pi$ (with $X$ randomized). Let $P^*(v\mid do(x))$ be the distribution of $V$ if the study were conducted on $\Pi^*$. The difference is attributed to a set $S$ of **selection variables**:
$$
P^*(v\mid do(x))=P(v\mid do(x),s^*)
$$
(footnote 16: alternatively write $P(v\mid do(x),s)$ and $P(v\mid do(x),s^*)$; only the *location* of $S$ matters). $S$ represents all factors by which populations may differ or that "threaten" transport. Each $S_i$ corresponds to a mechanism that differs. In Fig. 4(a), $P(z)\neq P(z\mid s)$ where $S$ stands for all factors responsible for drawing subjects of age $Z=z$ to NYC rather than LA. Equally important is the **absence** of an $S$ pointing to $Y$ in Fig. 4(a): the age-specific effects are invariant.

Footnote 15: disparities can also come from *design* differences (two samples drawn by different criteria from one population), usually called sampling selection bias (Heckman 1979; Hernan et al. 2004; Cole and Stuart 2010; Pearl 2013; Bareinboim, Tian and Pearl 2014). **This paper treats only nature-induced, not man-made, disparities.** (Man-made selection bias is treated in the 2016 paper: [[Bareinboim 2016 - Sample Selection Bias and Recoverability]].)

> [!definition] Definition 4 (Selection diagram)
> Let $\langle M,M^*\rangle$ be a pair of structural causal models (Definition 1) relative to domains $\langle\Pi,\Pi^*\rangle$, sharing a causal diagram $G$. $\langle M,M^*\rangle$ is said to **induce a selection diagram** $D$ if $D$ is constructed as follows:
> 1. every edge in $G$ is also an edge in $D$;
> 2. $D$ contains an extra edge $S_i\to V_i$ whenever there might exist a discrepancy $f_i\neq f_i^*$ or $P(U_i)\neq P^*(U_i)$ between $M$ and $M^*$.
^def-selection-diagram

**Reading a selection diagram.**
- An arrow $S\to V_i$: the mechanism assigning $V_i$ *may* differ. It is a statement of *possible* difference, not a commitment to a specific one.
- **Absence** of an arrow into $V_i$: the mechanism is the same in both populations (a strong, testable-in-principle invariance assumption).
- Extreme case: $S$-nodes on every variable = no shared mechanism = no information can be exchanged. The invariance assumptions are what "open the door" for transporting some findings.
- $S$-variables drawn as **squares**; latent common causes as dashed bidirected arcs.
- Footnote 18: the assumption of *no structural changes* between domains can be relaxed by starting with $D=G^*$ and adding $S$-nodes by the same procedure while enforcing acyclicity. Differences in causal directionality (acyclicity fails) or $G$ a strict edge-superset of $G^*$ need a more elaborate representation (beyond the paper).
- Footnote 17: Pearl (1993, 2009b), Spirtes et al. (1993), Dawid (2002) use conditioning on auxiliary variables to switch between experimental and observational studies; Dawid further uses them for changes in parameters.

**The three examples as selection diagrams (Fig. 4).**

| Fig. | Story | Where $S$ points | Formula dictated |
|---|---|---|---|
| 4(a) | populations differ in age distribution (Example 1) | $S\to Z$ ($Z$ = age); no arrow into $Y$ | (3.1) |
| 4(b) | populations differ in how $Z$ (reading skill) depends on unmeasured age; age distribution the same (Example 2) | $S\to Z$, $\text{age}\to Z$ | (3.2) direct transport |
| 4(c) | populations differ in how $Z$ depends on $X$ (Example 3) | $S\to Z$ with $X\to Z\to Y$ | (3.4) |

All three also contain dashed arcs $X \dashleftarrow\dashrightarrow Y$ for latent confounders. The *location* of $S$ makes the difference: the same observed $P(z)\neq P^*(z)$ yields (3.1) in 4(a) and (3.2) in 4(b).

### 4.2 Transportability

> [!definition] Definition 5 (Transportability)
> Let $D$ be a selection diagram relative to domains $\langle\Pi,\Pi^*\rangle$. Let $\langle P,I\rangle$ be the pair of **observational and interventional** distributions of $\Pi$, and $P^*$ the **observational** distribution of $\Pi^*$. The causal relation $R(\Pi^*)=P^*(y\mid do(x),z)$ is **transportable from $\Pi$ to $\Pi^*$ in $D$** if $R(\Pi^*)$ is uniquely computable from $P,P^*,I$ in any model that induces $D$.
^def-transportability

Two connections to identifiability:
1. All identifiable causal relations in $D$ are transportable, since they can be computed directly from $P^*$ with no experimental information from $\Pi$.
2. Given a causal diagram $G$, one can produce $D$ such that identifiability in $G$ equals transportability in $D$: set $D=G$ and add selection nodes pointing to **all** variables, meaning the target shares no mechanism with the source. Then the only way to achieve transportability is to identify $R$ from scratch in the target.

Proofs of **non**transportability are more involved than proofs of non-identifiability, because they require demonstrating the nonexistence of *two* competing models compatible with $D$, agreeing on $\{P,P^*,I\}$ and disagreeing on $R(\Pi^*)$. Definition 5 is declarative; Theorem 1 gives a method.

> [!theorem] Theorem 1 (do-calculus criterion for transportability)
> Let $D$ be the selection diagram characterizing $\Pi$ and $\Pi^*$, and $S$ a set of selection variables in $D$. The relation $R=P^*(y\mid do(x),z)$ is **transportable** from $\Pi$ to $\Pi^*$ if the expression $P(y\mid do(x),z,s)$ is **reducible, using the rules of do-calculus, to an expression in which $S$ appears only as a conditioning variable in do-free terms**.
^thm-transportability-docalc

> [!proof]- Proof
> Every relation satisfying the condition can be written as an algebraic combination of two kinds of terms: those involving $S$ and those not. The former can be written as $P^*$-terms and are therefore estimable from observations on $\Pi^*$, as Definition 5 requires. All other terms, especially those involving $do$-operators, do not contain $S$; they are experimentally identifiable in $\Pi$. $\blacksquare$
^proof-thm-transportability-docalc

**Status.** The criterion is **sufficient and necessary** for causal effects $R=P^*(y\mid do(x))$ (Bareinboim and Pearl 2012). Theorem 1 is procedural: it does not say *which* sequence of rules reaches the reduction. Bareinboim and Pearl (2013b) gave a complete procedural solution based on graphical methods developed in Tian and Pearl (2002) and Shpitser and Pearl (2006), but it is non-trivial, so the paper takes an alternative route to a simple transparent procedure guided by two subgoals: trivial and direct transportability.

> [!definition] Definition 6 (Trivial transportability)
> A causal relation $R$ is **trivially transportable** from $\Pi$ to $\Pi^*$ if $R(\Pi^*)$ is identifiable from $(G^*,P^*)$.
^def-trivial-transportability

An ordinary graphical identifiability test (Definition 2) on the target diagram; it estimates $R(\Pi^*)$ directly from observational studies on $\Pi^*$, unaided by causal information from $\Pi$.

> [!example] Example 4
> Let $R=P^*(y\mid do(x))$ and let the selection diagram be $X\to Y\leftarrow S$. Then $R$ is trivially transportable since $R(\Pi^*)=P^*(y\mid x)$ (no confounding of $X$ and $Y$ in the target).
^example-4

> [!definition] Definition 7 (Direct transportability)
> A causal relation $R$ is **directly transportable** from $\Pi$ to $\Pi^*$ if $R(\Pi^*)=R(\Pi)$.
^def-direct-transportability

**Graphical test.** For $R=P^*(y\mid do(x),z)$, direct transportability follows from do-calculus and reads: $(S\perp Y\mid X,Z)_{G_{\overline X}}$. In words, $X$ blocks all paths from $S$ to $Y$ once arrows pointing to $X$ are removed and $Z$ is conditioned on. It is satisfied in Fig. 4(a): the $z$-specific effect is the same in both populations, hence directly transportable.

> [!note] Remark: Manski's external validity = direct transportability
> The notion of "external validity" defined by Manski (2007) (footnote 1 in [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]]) corresponds to **Direct Transportability**: $R$ retains its validity without adjustment, as in Eq. (3.2). Such conditions preclude using information from $\Pi^*$ to recalibrate $R$.
^remark-manski-direct

> [!example] Example 5
> Let $R$ be the causal effect of $X$ on $Y$, and let $D$ have a single $S$-node pointing to $X$. Then $R$ is directly transportable, because causal effects are independent of the selection mechanism (Pearl 2009b, pp. 72-73): differences in how treatment is assigned do not matter, since $do(x)$ overrides the assignment mechanism.
^example-5

> [!example] Example 6
> Let $R=P^*(y\mid do(x),z)$ where $Z$ is a set of variables and $P,P^*$ differ only in the conditional probabilities $P(z\mid pa(Z))$ and $P^*(z\mid pa(Z))$, with $(Z\perp Y\mid pa(Z))$, as in Fig. 4(b). Then $R$ is **not** directly transportable. However, the $pa(Z)$-specific effects $P^*(y\mid do(x),pa(Z))$ **are** directly transportable, and so is $P^*(y\mid do(x))$. Due to confounding arcs, none of these quantities is identifiable (in $\Pi^*$ alone).
^example-6

**Hierarchy of transport notions (summary).**

| Notion | Condition | Needs target data? | Needs source experiment? |
|---|---|---|---|
| Trivial (Def. 6) | $R$ identifiable from $(G^*,P^*)$ | yes, observational only | no |
| Direct (Def. 7) | $R(\Pi^*)=R(\Pi)$ ($(S\perp Y\mid X,Z)_{G_{\overline X}}$ for $z$-specific effects) | no | yes |
| General (Def. 5) | reducible per Thm 1 | observational $P^*$ | yes |

## Examples

> [!example] Marketing reading of Definitions 6 and 7
> *Trivial:* if the new market's ad exposure is effectively randomized by a platform lottery (no confounding of $X$ and $Y$), you can read the effect off the target market's own data; no transport needed. *Direct:* if the only difference between test and rollout markets is *how media buyers allocated spend* (an $S$-node into $X$), Example 5 says the experiment's effect transfers without adjustment, because the experiment's randomization washed away the allocation rule.

## Connections

- Motivation: [[Pearl 2014 - Motivating Examples and Transport Formulas]]. Next, the usable theorems: [[Pearl 2014 - S-Admissibility and the Graphical Criterion]].
- Selection-diagram syntax is reused for *sampling* selection in [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] and for multiple sources in [[Bareinboim 2016 - Transportability and Data Fusion]].
- Estimator-level cousin of "$S\to Z$ with no $S\to Y$": the conditional-exchangeability-for-selection assumption $Y^a\perp S\mid X$ in [[Degtiar 2023 - Identifying Assumptions]].
- Identification background: [[DAGs and Causal Identification]].

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
