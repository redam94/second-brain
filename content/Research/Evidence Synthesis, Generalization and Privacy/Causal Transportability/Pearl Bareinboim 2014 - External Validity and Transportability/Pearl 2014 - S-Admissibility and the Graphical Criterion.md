---
title: "Pearl 2014 - S-Admissibility and the Graphical Criterion"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Sec. 5, arXiv pp. 12-15 (journal pp. 590-593), Theorems 2-3, Definition 8, Corollaries 1-2, Examples 7-10, Figs. 5-7, Eqs. 5.1-5.10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl 2014 - Selection Diagrams and Definition of Transportability]]"
used_by:
  - "[[Pearl 2014 - Appendix Derivations of Transport Formulas]]"
  - "[[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]]"
aliases:
  - S-admissibility
  - Transportability Theorem 2
  - Transportability Theorem 3
  - Graphical criterion for transportability
---

# Pearl 2014 - S-Admissibility and the Graphical Criterion

> [!summary]
> Theorem 2 gives a simple test for transporting $z$-specific effects: they transport directly if $Z$ d-separates $Y$ from $S$ in the $X$-manipulated selection diagram. The resulting notion of **S-admissibility** (Definition 8) yields Corollary 1: if an observed pre-treatment set $Z$ is S-admissible, the average effect transports with the reweighting formula (3.1). Theorem 3 extends this to post-treatment $Z$ and to multi-step (recursive) derivations, with three sufficient conditions. The criterion is a worst-case analysis and is sound but **not complete**.

## Overview

The paper "states and proves two theorems that permit us to decide algorithmically, given a selection diagram, whether a relation is transportable between two populations, and what the transport formula should be." Both work by converting the transport question into d-separation checks on the graph $D_{\overline X}$ obtained by cutting all arrows into $X$ (notation in [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]]).

## Main Content

### Theorem 2: transportability of stratum-specific effects

> [!theorem] Theorem 2
> Let $D$ be the selection diagram characterizing $\Pi$ and $\Pi^*$, and $S$ the set of selection variables in $D$. The strata-specific causal effect $P^*(y\mid do(x),z)$ is **transportable** from $\Pi$ to $\Pi^*$ if $Z$ d-separates $Y$ from $S$ in the $X$-manipulated version of $D$, that is,
> $$
> (Y\perp S\mid Z,X)_{D_{\overline X}}.
> $$
^thm-2

> [!proof]- Proof
> $P^*(y\mid do(x),z)=P(y\mid do(x),z,s^*)$. From Rule 1 of do-calculus, $P(y\mid do(x),z,s^*)=P(y\mid do(x),z)$ whenever $Z$ satisfies $(Y\perp S\mid Z,X)$ in $D_{\overline X}$. This proves Theorem 2. $\blacksquare$
^proof-thm-2

> [!definition] Definition 8 (S-admissibility)
> A set $T$ of variables satisfying $(Y\perp S\mid T,X)_{D_{\overline X}}$ is called **S-admissible** (with respect to the causal effect of $X$ on $Y$).
^def-s-admissibility

> [!theorem] Corollary 1 (average effect and the reweighting formula)
> The average causal effect $P^*(y\mid do(x))$ is transportable from $\Pi$ to $\Pi^*$ if there exists a set $Z$ of **observed pre-treatment covariates that is S-admissible**. Moreover, the transport formula is the weighting of Eq. (3.1):
> $$
> P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\,P^*(z).
> $$
^cor-1

> [!example] Example 7
> The causal effect is transportable in Fig. 4(a), since $Z$ is S-admissible, and in Fig. 4(b), where the empty set is S-admissible. It is also transportable by the same criterion in Fig. 5(b), where $W$ is S-admissible, but **not** in Fig. 5(a), where no S-admissible set exists.
^example-7

> [!theorem] Corollary 2 (ignorable $S$-variables)
> Any $S$ variable that is pointing directly into $X$ (as in Fig. 6(a)), or that is d-separated from $Y$ in $D_{\overline X}$, can be ignored.
^cor-2

This follows because the empty set is S-admissible relative to any such $S$. Conceptually: differences in propensity to receive treatment do not hinder transportability of treatment effects; the randomization used in the experimental study washes such differences away.

### Theorem 3: post-treatment $Z$ and recursion

For treatment-dependent $Z$ (Fig. 4c) the d-separation criterion alone is insufficient, because the weighting must use $P^*(z\mid do(x))$.

> [!theorem] Theorem 3
> The average causal effect $P^*(y\mid do(x))$ is transportable from $\Pi$ to $\Pi^*$ if **either** of the following conditions holds:
> 1. $P^*(y\mid do(x))$ is **trivially transportable**.
> 2. There exists a set of covariates $Z$ (possibly affected by $X$) such that $Z$ is S-admissible and for which $P^*(z\mid do(x))$ is transportable.
> 3. There exists a set of covariates $W$ satisfying $(X\perp Y\mid W)_{D_{\overline{X(W)}}}$ and for which $P^*(w\mid do(x))$ is transportable.
^thm-3

> [!proof]- Proof (Eqs. 5.1-5.7)
> *Condition 1* entails transportability by definition.
>
> *Condition 2.* If it holds,
> $$
> \begin{aligned}P^*(y\mid do(x))&=P(y\mid do(x),s^*)&&(5.1)\\&=\sum_z P(y\mid do(x),z,s^*)\,P(z\mid do(x),s^*)&&(5.2)\\&=\sum_z P(y\mid do(x),z)\,P^*(z\mid do(x)).&&(5.3)\end{aligned}
> $$
> The last step uses S-admissibility of $Z$ (first factor loses $s$ by Rule 1) and the definition of the $S$-node (second factor becomes a $P^*$ quantity). The transportability of $P(z\mid do(x))$ should reduce $P^*(z\mid do(x))$ to a star-free expression and so renders $P^*(y\mid do(x))$ transportable.
>
> *Condition 3.* If it holds,
> $$
> \begin{aligned}P^*(y\mid do(x))&=P(y\mid do(x),s^*)&&(5.4)\\&=\sum_w P(y\mid do(x),w,s)\,P(w\mid do(x),s)&&(5.5)\\&=\sum_w P(y\mid w,s)\,P^*(w\mid do(x))&&(5.6)\ \text{(by Rule 3 of do-calculus)}\\&=\sum_w P^*(y\mid w)\,P^*(w\mid do(x)).&&(5.7)\end{aligned}
> $$
> Transportability of $P^*(w\mid do(x))$ should reduce $P(w\mid do(x),s)$ to a star-free expression and renders $P^*(y\mid do(x))$ transportable. This proves Theorem 3. $\blacksquare$
^proof-thm-3

**Interpreting condition 3.** The graph $D_{\overline{X}(W)}$ is the modified graph the paper uses for Rule 3 applied to the $W$-nodes (the PDF prints this subscript in a form that is hard to read, so check Eq. (2.7) and Sec. 5 of the original for the exact deletion set). Intuitively, once $W$ is observed, $X$ is separated from $Y$, so the dependence of $Y$ on $x$ is carried entirely by $P(w\mid do(x))$, while $P^*(y\mid w)=P(y\mid w,s^*)$ is read from target observations (Eq. 5.7).

> [!note] Remark: recursion and termination
> The test entailed by Theorem 3 is **recursive**, since the transportability of one causal effect depends on that of another. But because the diagram is finite and acyclic, the sets $Z$ and $W$ needed in conditions 2 and 3 become closer and closer to $X$, and the iteration terminates in a finite number of steps: $P^*(z\mid do(x))$ (likewise $P^*(w\mid do(x))$) is trivially transportable and equals $P(z)$ for any $Z$ node that is not a descendant of $X$. Reiteration applies only to members of $Z$ on causal pathways from $X$ to $Y$. The analyst need not stop upon satisfying Theorem 3; to reduce the number of experiments, continue until no further reduction is feasible.
^remark-thm-3-recursion

### Worked Examples 8-10

> [!example] Example 8 (surrogate endpoint, Fig. 4c; proves Eq. 3.4)
> Goal: $P^*(y\mid do(x))$ in the new population created by changes in how $Z$ responds to $X$. Condition 2 of Theorem 3 is satisfied: $Z$ is S-admissible because $(S\perp Y\mid X,Z)_{D_{\overline X}}$, hence $P^*(y\mid do(x),z)=P(y\mid do(x),z)$; and $P^*(z\mid do(x))$ is trivially transportable because $X$ and $Z$ are unconfounded, so $P^*(z\mid do(x))=P^*(z\mid x)$. Substituting into (5.3):
> $$
> P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\,P^*(z\mid x)\qquad(5.8),
> $$
> which proves Eq. (3.4).
^example-8

> [!example] Example 9 (Fig. 6d; needs both conditions iteratively)
> To satisfy condition 2: $Z$ is S-admissible, and we need $P^*(z\mid do(x))$ to be transportable. To show this, invoke condition 3: $W$ d-separates $X$ from $Z$ in $D$. It remains to confirm the transportability of $P^*(w\mid do(x))$, which holds because the empty set is S-admissible relative to $W$, since $(W\perp S)$. Hence by Theorem 2 (replacing $Y$ with $W$), $P^*(w\mid do(x))$ is transportable, which bestows transportability on $P^*(y\mid do(x))$. The final formula (derived formally in [[Pearl 2014 - Appendix Derivations of Transport Formulas]]) is
> $$
> P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\sum_w P(w\mid do(x))\,P^*(z\mid w)\qquad(5.9).
> $$
> The first two factors are estimable in the experimental study, the third from observational studies on the target. The joint effect $P(y,w,z\mid do(x))$ need **not** be estimated in the experiment: the decomposition reduces measurement cost and sampling variability. A similar analysis proves transportability in Fig. 6(e) (Pearl and Bareinboim 2011). The model of Fig. 6(f) does **not** allow transportability of $P^*(y\mid do(x))$: there is no S-admissible set and condition 3 does not apply.
^example-9

> [!example] Example 10 (Fig. 7; several iterations)
> A more intricate selection diagram requires several iterations of Theorem 3. The transport formula (derived in the Appendix) is
> $$
> P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\sum_w P^*(z\mid w)\sum_t P(w\mid do(x),t)\,P^*(t)\qquad(5.10).
> $$
> The formula guides which measurements are needed in both studies: variables $U$ and $V$ need not be measured; the $W$-specific causal effects need not be estimated in the experimental study; only the conditional probabilities $P^*(z\mid w)$ and $P^*(t)$ need be estimated in the target. (A referee suggested a simplification of this formula.)
^example-10

**Which diagrams are transportable (Fig. 6 summary).** The effect $P(y\mid do(x))$ is trivially transportable in (c); **not** transportable in (b) and (f); transportable in (a), (d) and (e) (see Corollary 2 for (a)).

### Limits of Theorem 3

"Despite its power, Theorem 3 is not complete, namely, it is not guaranteed to approve all transportable relations or to disapprove all nontransportable ones." An example of the former is contrived in Bareinboim and Pearl (2012), where an alternative necessary and sufficient condition is established in graphical and algorithmic form. Theorem 3 nevertheless is "a simple and powerful method of establishing transportability in practice."

> [!example] Python: checking S-admissibility on Figs. 4(a) and 4(c) (toy encodings)
> Uses the `d_separated` helper from [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] (ancestral-moral-graph test). Encoding: parents dictionary; latent confounder $U$ is an explicit parent of $X$ and $Y$.
> ```python
> def cut_into(parents, X):                       # D_{\overline X}: delete arrows into X
>     return {v: ([] if v in X else list(ps)) for v, ps in parents.items()}
> def s_admissible(D, X, Y, Z, S=("S",)):         # (Y _||_ S | Z, X) in D_{\overline X}
>     return d_separated(cut_into(D, set(X)), set(Y), set(S), set(Z) | set(X))
> D4a = {"Z": ["S"], "X": ["Z", "U"], "Y": ["X", "Z", "U"]}   # S->Z, Z->X, Z->Y, X->Y, U->X,Y
> D4c = {"Z": ["X", "S"], "X": ["U"], "Y": ["X", "Z", "U"]}   # X->Z->Y, X->Y, S->Z, U->X,Y
> print(s_admissible(D4a, {"X"}, {"Y"}, {"Z"}))   # True  -> Corollary 1 applies, use Eq. 3.1
> print(s_admissible(D4a, {"X"}, {"Y"}, set()))   # False -> unadjusted transport not licensed
> print(s_admissible(D4c, {"X"}, {"Y"}, {"Z"}))   # True  -> Thm 3 cond. 2; still need P*(z|do(x)), here P*(z|x) (Eq. 3.4)
> ```
> (Run output checked: `True False True`.)
^example-sadm-python

## Examples

> [!example] Decision procedure in practice
> 1. Draw the shared causal diagram; add $S$-nodes only where you believe mechanisms may differ.
> 2. If $S$ points only into $X$ (or is d-separated from $Y$ in $D_{\overline X}$) $\Rightarrow$ no adjustment (Cor. 2).
> 3. Look for an observed pre-treatment S-admissible $Z$ $\Rightarrow$ reweight by $P^*(z)$ (Cor. 1).
> 4. If $Z$ is a mediator, check S-admissibility *and* transportability of $P^*(z\mid do(x))$ (Thm 3, condition 2), then iterate.
> 5. If nothing works $\Rightarrow$ the effect is not transportable from these data, regardless of sample size, unless more is assumed or a second experiment is run.

## Connections

- Marketing mapping of this decision procedure: [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].
- The multi-source, complete generalization (Bareinboim and Pearl 2013b/c) is summarized in [[Bareinboim 2016 - Transportability and Data Fusion]].
- Estimator view of Corollary 1: IPPW and post-stratification in [[Degtiar 2023 - Weighting and Matching Methods]]; the assumption $Y^a\perp S\mid X$ in [[Degtiar 2023 - Identifying Assumptions]].
- Related identification machinery: [[Do-Calculus in Summary Causal DAGs]], [[DAGs and Causal Identification]].

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
