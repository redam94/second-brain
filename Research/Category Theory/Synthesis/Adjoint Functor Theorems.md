---
title: "Adjoint Functor Theorems"
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 6.3, pp. 163–171; Appendix, pp. 173"
date_ingested: 2026-05-08
folder: "Category Theory/Synthesis"
doc_type: textbook
depends_on:
  - "[[Adjunctions/Adjoint Functors]]"
  - "[[Adjoints and Limits]]"
  - "[[Limits and Colimits/General Limits]]"
used_by: []
aliases:
  - GAFT
  - SAFT
  - General Adjoint Functor Theorem
  - Special Adjoint Functor Theorem
  - solution set condition
---

# Adjoint Functor Theorems

> [!summary]
> The General Adjoint Functor Theorem (GAFT) says: a continuous functor (preserves all small limits) from a complete locally small category has a left adjoint if and only if it satisfies the solution-set condition. The Special Adjoint Functor Theorem (SAFT) replaces the solution set with a "well-powered" and "co-well-powered" condition. These are the primary tools for proving that a functor has an adjoint without constructing it explicitly.

## Overview

The adjoint functor theorems answer the question: "when does a functor have an adjoint?" The answer involves two ingredients: the functor must respect the categorical structure (preserve limits for a right adjoint), and it must satisfy a set-theoretic smallness condition (the solution-set condition or its variants).

## Main Content

### The Adjoint Functor Theorem for Preorders

As a warmup, the GAFT has a clean version for preorders:

> [!theorem] Proposition 6.3.7: AFT for Preorders (BCT, Ch. 6.3)
> Let $P$ be a poset (partial order) in which all meets (infima) exist. A monotone map $G: P \to Q$ has a left adjoint if and only if it preserves all meets.
^aft-preorder

This is the "classical" Galois connection theorem and motivates the general case.

### General Adjoint Functor Theorem (GAFT)

> [!definition] Definition: Solution-Set Condition
> A functor $G: \mathcal{B} \to \mathcal{A}$ satisfies the **solution-set condition** if for each $A \in \mathcal{A}$, there is a **small** set $\mathcal{S}$ of maps $(A \to GB_s)_{s \in \mathcal{S}}$ such that every map $A \to GB$ factors as $A \to GB_s \to GB$ for some $s \in \mathcal{S}$.
>
> I.e., the comma category $(A \downarrow G)$ has a small weakly initial set of objects.
^solution-set-def

> [!theorem] Theorem 6.3.10: General Adjoint Functor Theorem (BCT, Ch. 6.3)
> Let $\mathcal{B}$ be a locally small complete category, and $G: \mathcal{B} \to \mathcal{A}$ a functor. Then $G$ has a left adjoint if and only if:
> 1. $G$ preserves all small limits (i.e., $G$ is continuous), and
> 2. $G$ satisfies the solution-set condition.
^gaft

*Proof sketch*: 
- ($\Rightarrow$): If $F \dashv G$, then $G$ preserves limits by [[Adjoints and Limits#^adjoints-limits]]. The solution set for $A$ is $\{\eta_A: A \to GFA\}$ — a single element.
- ($\Leftarrow$): For each $A$, use the solution set to construct a small diagram, then take the limit of the induced diagram to get the initial object of $(A \downarrow G)$ — which is $FA$ with unit $\eta_A$.

The full proof appears in the Appendix of the book.

> [!example] Example: GAFT for Forgetful Functors (BCT, Ch. 6.3)
> The forgetful functor $G: \mathbf{Grp} \to \mathbf{Set}$ is continuous (preserves limits). The solution set for a set $X$ is $\{f: X \to UG \mid G \text{ is a quotient of } F_X\}$ where $F_X$ is the free group on $X$ — this is essentially just the free group itself. So $G$ has a left adjoint, which is the free group functor.

### Special Adjoint Functor Theorem (SAFT)

> [!definition] Definition: Well-Powered and Cogenerating Set
> - A category is **well-powered** if for each object $A$, the collection of subobjects of $A$ is a small set.
> - A **cogenerating set** for $\mathcal{B}$ is a set $\{C_i\}_{i \in I}$ of objects such that for any $f \neq g: A \to B$, there exists $i$ and $h: B \to C_i$ with $h \circ f \neq h \circ g$.
^saft-conditions-def

> [!theorem] Theorem 6.3.13: Special Adjoint Functor Theorem (BCT, Ch. 6.3)
> Let $\mathcal{B}$ be locally small, complete, well-powered, and having a cogenerating set. Then any continuous functor $G: \mathcal{B} \to \mathcal{A}$ has a left adjoint.
^saft

The SAFT is "special" because the solution-set condition is automatically satisfied from the structural properties of $\mathcal{B}$.

**Applications**:
- The categories **Set**, **Ab**, **Grp**, **Ring**, **Top** all satisfy the hypotheses of SAFT (or GAFT).
- In particular: any limit-preserving functor from **Ab** to **Ab** has a left adjoint.

### Freyd's Original Formulation

Leinster's SAFT follows Freyd (1964). The theorem says that in a "nice" category, continuity is equivalent to having an adjoint — no extra conditions needed beyond the structural ones already satisfied by the category.

### Why "Special"?

The SAFT applies when $\mathcal{B}$ has nice properties (well-powered + cogenerating set), whereas the GAFT is more general but requires verifying the solution-set condition explicitly. In practice:
- Use SAFT when $\mathcal{B}$ is a familiar category like **Set** or **Ab**.
- Use GAFT when $\mathcal{B}$ is more exotic or when you need the solution set explicitly.

## Connections

- **Adjoints and limits** ([[Adjoints and Limits]]): the necessity direction of GAFT (right adjoints preserve limits).
- **Initial objects** ([[Adjunctions/Adjunctions via Initial Objects]]): the construction of the adjoint in GAFT produces initial objects in comma categories.
- The **density theorem** ([[Limits in Presheaf Categories#^density-theorem]]) is used in the appendix proof of GAFT.

## See Also

- [[Adjunctions/Adjoint Functors]] — Adjunction definition
- [[Adjoints and Limits]] — Right adjoints preserve limits (necessity in GAFT)
- [[Adjunctions/Adjunctions via Initial Objects]] — The proof constructs initial objects
