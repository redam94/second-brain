---
title: "Limits in Presheaf Categories"
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 6.2, pp. 148–157"
date_ingested: 2026-05-08
folder: "Category Theory/Synthesis"
doc_type: textbook
depends_on:
  - "[[Foundations/Functor Categories]]"
  - "[[Limits and Colimits/General Limits]]"
  - "[[Representables/Yoneda Lemma]]"
  - "[[Representables/Yoneda Embedding and Consequences]]"
used_by:
  - "[[Synthesis/Cartesian Closed Categories]]"
aliases:
  - pointwise limits
  - density theorem
  - limits in functor categories
  - category of elements
---

# Limits in Presheaf Categories

> [!summary]
> Limits (and colimits) in functor categories $[\mathcal{A}, \mathcal{B}]$ are computed pointwise when $\mathcal{B}$ has the relevant limits. Applying this to $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$: all limits and colimits exist and are pointwise. The Density Theorem says every presheaf is a colimit of representables, with the colimit shaped by the category of elements.

## Overview

Presheaf categories inherit excellent limit/colimit properties from **Set**. The pointwise computation makes checking limits easy. The density theorem, in contrast, shows that the representables "generate" the entire presheaf category via colimits — a deep structural fact.

## Main Content

### Pointwise Limits in Functor Categories

> [!theorem] Theorem 6.2.5: Limits in Functor Categories are Pointwise (BCT, Ch. 6.2)
> Let $\mathcal{B}$ have all limits of shape $\mathcal{I}$, and let $\mathcal{D}: \mathcal{J} \to [\mathcal{I}, \mathcal{B}]$ be a diagram of functors. Then:
> 1. $[\mathcal{I}, \mathcal{B}]$ has limits of shape $\mathcal{J}$.
> 2. The limit $\lim \mathcal{D}$ is computed **pointwise**: $(\lim \mathcal{D})_I = \lim_J \mathcal{D}_J(I)$ for each $I \in \mathcal{I}$.
^pointwise-limits

**Consequence for presheaf categories**: Since **Set** is complete and cocomplete, $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is complete and cocomplete, with all limits and colimits computed pointwise:
$$(\lim X_j)(A) = \lim_j X_j(A), \quad (\mathrm{colim}\, X_j)(A) = \mathrm{colim}_j X_j(A)$$

> [!example] Example: Product of Presheaves (BCT, Ch. 6.2)
> For presheaves $X, Y: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$, their product is $(X \times Y)(A) = X(A) \times Y(A)$.

### Limits Commute with Limits

> [!theorem] Proposition 6.2.8: Limits Commute (BCT, Ch. 6.2)
> For a diagram $D: \mathcal{I} \times \mathcal{J} \to \mathcal{A}$ (when all relevant limits exist):
> $$\lim_{\mathcal{I} \times \mathcal{J}} D \cong \lim_I \lim_J D(I,J) \cong \lim_J \lim_I D(I,J)$$
^limits-commute

This generalises the commutativity of products and intersections in set theory.

### Yoneda Embedding Preserves Limits

> [!theorem] Corollary 6.2.12: Yoneda Preserves Limits (BCT, Ch. 6.2)
> The Yoneda embedding $H^\bullet: \mathcal{A} \to [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ preserves all small limits.
^yoneda-preserves-limits

*Proof*: By Proposition 6.2.2, each $H_A = \mathcal{A}(-,A)$ preserves limits (as a right adjoint in the representable sense). Since the limit in $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is pointwise, $H^\bullet(\lim D)(A) = \mathcal{A}(A, \lim D) \cong \lim \mathcal{A}(A, D(-)) = \lim H^\bullet(D)(A)$.

### Category of Elements

> [!definition] Definition 6.2.16: Category of Elements
> For a functor $X: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$, the **category of elements** $\mathcal{E}(X)$ (also written $\int X$ or $\int^A X(A)$) has:
> - **Objects**: pairs $(A, x)$ where $A \in \mathcal{A}$ and $x \in X(A)$
> - **Morphisms** $(A,x) \to (B,y)$: maps $f: A \to B$ in $\mathcal{A}$ such that $(Xf)(y) = x$
>
> There is a forgetful functor $P: \mathcal{E}(X) \to \mathcal{A}$, $(A,x) \mapsto A$.
^category-of-elements-def

### Density Theorem

> [!theorem] Theorem 6.2.17: Density Theorem (BCT, Ch. 6.2)
> For any small $\mathcal{A}$ and any presheaf $X \in [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$:
> $$X \cong \mathrm{colim}_{(A,x) \in \mathcal{E}(X)} H_A$$
> i.e., $X$ is the colimit of the diagram $\mathcal{E}(X) \xrightarrow{P} \mathcal{A} \xrightarrow{H^\bullet} [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$.
^density-theorem

**Interpretation**: Every presheaf is "built from" representable presheaves via colimits. The category of elements $\mathcal{E}(X)$ encodes exactly how to assemble $X$ from representables.

**Analogy**: A set is a colimit of one-element sets; a presheaf is a colimit of representables (which are the "one-element sets" of the presheaf world).

> [!example] Example: Density for Representables
> When $X = H_B$, the category of elements has objects $(A, f: A \to B)$ — i.e., maps into $B$. The density colimit is $H_B \cong \mathrm{colim}_{f: A \to B} H_A$, which is a Yoneda-type statement.

## Connections

- The **cartesian closed** structure of $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ ([[Cartesian Closed Categories]]) also relies on limits being pointwise.
- The density theorem is used in the proof of the **General Adjoint Functor Theorem** ([[Adjoint Functor Theorems]]).

## See Also

- [[Foundations/Functor Categories]] — Presheaf categories
- [[Limits and Colimits/General Limits]] — Limits in general
- [[Representables/Yoneda Embedding and Consequences]] — Yoneda embedding preserves limits
- [[Synthesis/Cartesian Closed Categories]] — Presheaf categories are cartesian closed
