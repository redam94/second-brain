---
title: "Categories"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 1.1, pp. 5–18"
date_ingested: 2026-05-08
folder: "Category Theory/Foundations"
doc_type: textbook
depends_on: []
used_by:
  - "[[Functors]]"
  - "[[Natural Transformations]]"
  - "[[Adjunctions/Adjoint Functors]]"
aliases:
  - category
  - small category
  - locally small category
---

# Categories

> [!summary]
> A category consists of objects and morphisms with composition. This note covers the formal definition, elementary examples spanning mathematics, and the size distinctions (small, locally small, large) needed to avoid set-theoretic paradoxes.

## Overview

Category theory begins with a single structure: the **category**. Rather than studying mathematical objects in isolation, category theory studies objects together with the maps between them. The insight is that maps (morphisms) carry as much—often more—information than the objects themselves.

## Main Content

> [!definition] Definition 1.1.1: Category
> A **category** $\mathcal{A}$ consists of:
> - A collection $\mathrm{ob}(\mathcal{A})$ of **objects**
> - For each $A, B \in \mathrm{ob}(\mathcal{A})$, a collection $\mathcal{A}(A, B)$ of **maps** (morphisms, arrows) from $A$ to $B$
> - For each $A, B, C$, a **composition** function $\mathcal{A}(B,C) \times \mathcal{A}(A,B) \to \mathcal{A}(A,C)$, written $(g, f) \mapsto g \circ f$
> - For each $A$, an **identity map** $1_A \in \mathcal{A}(A,A)$
>
> satisfying:
> 1. **Associativity**: $h \circ (g \circ f) = (h \circ g) \circ f$
> 2. **Unit laws**: $f \circ 1_A = f$ and $1_B \circ f = f$ for all $f: A \to B$
^cat-def

**Notation**: Maps $f: A \to B$ may also be written $A \xrightarrow{f} B$. Collections $\mathcal{A}(A,B)$ are called **hom-sets** (when they are sets).

### Core Examples

| Category | Objects | Maps | Composition |
|----------|---------|------|-------------|
| **Set** | sets | functions | function composition |
| **Grp** | groups | group homomorphisms | homomorphism composition |
| **Top** | topological spaces | continuous maps | composition |
| **Vect$_k$** | $k$-vector spaces | linear maps | composition |
| **Ring** | rings | ring homomorphisms | composition |
| **Poset** $(P, \leq)$ | elements of $P$ | unique map $a \to b$ iff $a \leq b$ | transitivity |
| **Discrete** $S$ | elements of $S$ | only identity maps | trivial |
| **Monoid** $M$ | single object $\bullet$ | elements of $M$ | multiplication in $M$ |

> [!example] Example: A Monoid as a Category (BCT, Ch. 1.1)
> Any monoid $(M, \cdot, e)$ is a category with one object $\bullet$. Maps $\bullet \to \bullet$ correspond to elements of $M$, composition is multiplication, and the identity map is $e$. A functor between one-object categories is exactly a monoid homomorphism.

> [!example] Example: A Preorder as a Category (BCT, Ch. 1.1)
> A preorder $(P, \leq)$ is a category where $\mathcal{A}(a,b)$ has exactly one element if $a \leq b$ and is empty otherwise. Composition encodes transitivity; identity maps encode reflexivity. Functors between preorder categories are exactly order-preserving maps.

### Isomorphisms

> [!definition] Definition: Isomorphism
> A map $f: A \to B$ is an **isomorphism** if there exists $g: B \to A$ such that $g \circ f = 1_A$ and $f \circ g = 1_B$. We write $A \cong B$ and call $A$ and $B$ **isomorphic**.
^iso-def

The inverse $g$ is unique when it exists. In **Set**, isomorphisms are bijections; in **Top**, they are homeomorphisms; in **Grp**, they are group isomorphisms.

### Opposite Category

> [!definition] Definition: Opposite Category
> The **opposite** (or **dual**) category $\mathcal{A}^{\mathrm{op}}$ has the same objects as $\mathcal{A}$, with $\mathcal{A}^{\mathrm{op}}(A,B) = \mathcal{A}(B,A)$ and composition reversed. A map in $\mathcal{A}^{\mathrm{op}}$ from $A$ to $B$ is a map $B \to A$ in $\mathcal{A}$.
^opposite-def

Duality is a powerful principle: any theorem about all categories has a dual theorem obtained by reversing all arrows.

### Size: Small, Large, Locally Small

> [!definition] Definition: Size Distinctions (BCT, Ch. 3.1–3.2)
> - A category is **small** if $\mathrm{ob}(\mathcal{A})$ is a set (not a proper class) and each $\mathcal{A}(A,B)$ is a set.
> - A category is **locally small** if each hom-collection $\mathcal{A}(A,B)$ is a set (but $\mathrm{ob}(\mathcal{A})$ may be a proper class).
> - **Set**, **Grp**, **Top** are locally small but not small.
> - **CAT** (category of all categories) is not even locally small — the collection of functors between two large categories need not be a set.
^size-def

Russell's paradox prevents us from forming the category of all sets (or all categories) naively. The Yoneda lemma requires local smallness (so that representable functors land in **Set**).

## Connections

- **Functors** ([[Functors]]) are the maps between categories — they must preserve composition and identities.
- **Natural transformations** ([[Natural Transformations]]) are maps between functors.
- **Limits and colimits** ([[Limits and Colimits/General Limits]]) are defined purely in terms of the categorical structure.
- The **opposite category** construction underlies all duality in category theory; colimits are limits in the opposite category.

## See Also

- [[Functors]] — Maps between categories
- [[Natural Transformations]] — Maps between functors
- [[Adjunctions/Adjoint Functors]] — Special pairs of functors between categories
- [[Limits and Colimits/General Limits]] — Universal cones
