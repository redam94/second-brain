---
title: "Products and Equalizers"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 5.1, pp. 107–121"
date_ingested: 2026-05-08
folder: "Category Theory/Limits and Colimits"
doc_type: textbook
depends_on:
  - "[[Foundations/Categories]]"
  - "[[Foundations/Functors]]"
used_by:
  - "[[General Limits]]"
  - "[[Pullbacks]]"
  - "[[Colimits]]"
  - "[[Synthesis/Limits via Representables]]"
aliases:
  - product
  - binary product
  - equalizer
  - terminal object
---

# Products and Equalizers

> [!summary]
> Binary products and equalizers are the two fundamental building blocks of all limits. Together they generate all finite limits, and with arbitrary products they generate all limits. Products are defined by a universal property: a pair of projections through which all cones factor uniquely.

## Overview

Before defining limits in full generality, Leinster introduces the key special cases: binary products (Ch. 5.1), and then equalizers and pullbacks. These three types of limits suffice to construct all limits (Proposition 5.1.26), making them the "generators" of the theory.

## Main Content

### Binary Products

> [!definition] Definition 5.1.1: Binary Product
> A **binary product** of $A, B \in \mathcal{A}$ is an object $A \times B$ together with maps
> $$A \xleftarrow{p_1} A \times B \xrightarrow{p_2} B$$
> (the **projections**) such that for any object $C$ and any maps $f: C \to A$, $g: C \to B$, there is a **unique** map $\langle f, g \rangle: C \to A \times B$ such that $p_1 \circ \langle f,g \rangle = f$ and $p_2 \circ \langle f,g \rangle = g$.
^product-def

**Universal property diagram**:
$$C \xrightarrow{\langle f,g \rangle} A \times B \xrightarrow{p_1} A, \quad A \times B \xrightarrow{p_2} B$$

> [!definition] Definition 5.1.7: Arbitrary Products
> A **product** of a family $(A_i)_{i \in I}$ is an object $\prod_{i \in I} A_i$ with projections $p_j: \prod_i A_i \to A_j$ (for each $j \in I$) such that for any $C$ and any $(f_i: C \to A_i)_{i \in I}$, there is a unique $\langle f_i \rangle: C \to \prod_i A_i$ with $p_j \circ \langle f_i \rangle = f_j$ for all $j$.
^arb-product-def

**Examples**:
- In **Set**: $A \times B = \{(a,b) : a \in A, b \in B\}$ with coordinate projections.
- In **Top**: product of topological spaces with product topology.
- In **Grp**: direct product of groups.
- In a preorder: $a \times b = \inf(a,b)$ (greatest lower bound).
- In **Ab**: $\prod_i A_i$ = direct product (for infinite families differs from direct sum $\bigoplus_i A_i$).

> [!example] Example: Terminal Object as Empty Product (BCT, Ch. 5.1)
> The product of the **empty family** is the **terminal object** $\mathbf{1}$ (if it exists): a unique map from every $C$ to $\mathbf{1}$. In **Set**, $\mathbf{1} = \{*\}$; in **Grp**, $\mathbf{1}$ = trivial group.

### Equalizers

> [!definition] Definition 5.1.11: Equalizer
> An **equalizer** of a parallel pair $s, t: X \rightrightarrows Y$ is an object $E$ with a map $i: E \to X$ such that $s \circ i = t \circ i$, and which is universal with this property: for any $C$ with $h: C \to X$ satisfying $sh = th$, there is a unique $\bar{h}: C \to E$ with $i \circ \bar{h} = h$.
^equalizer-def

$$E \xrightarrow{i} X \underset{t}{\overset{s}{\rightrightarrows}} Y$$

**Examples**:
- In **Set**: $E = \{x \in X : s(x) = t(x)\}$ with inclusion.
- In **Top**: same as Set, with subspace topology.
- In **Grp**: $E = \ker(s \cdot t^{-1}) = \{x \in X : sx = tx\}$.
- In **Ab**: equalizer of $s, t$ equals equalizer of $s-t$ and $0$, which is $\ker(s-t)$.
- In a preorder: equalizer of $a \rightrightarrows b$ is $a$ if $a \leq b$, and doesn't exist otherwise.

### Products + Equalizers → All Finite Limits

> [!theorem] Proposition 5.1.26: Finite Limits from Products and Equalizers (BCT, Ch. 5.1)
> A category $\mathcal{A}$ has all finite limits if and only if it has all finite products and all equalizers.
>
> Construction: Given a finite diagram $D: \mathcal{I} \to \mathcal{A}$, the limit can be built as:
> $$\lim D = \mathrm{Eq}\left(\prod_{I \in \mathcal{I}} DI \underset{t}{\overset{s}{\rightrightarrows}} \prod_{u: I \to J \text{ in } \mathcal{I}} DJ\right)$$
> where $s(x_I)_u = (Du)(x_I)$ and $t(x_I)_u = x_J$ for $u: I \to J$.
^products-equalizers-all-limits

This generalises to arbitrary (not just finite) limits when we allow arbitrary products.

### Monomorphisms

> [!definition] Definition 5.1.29: Monomorphism
> A map $f: A \to B$ is a **monomorphism** (or **monic**) if for all $g, h: C \to A$, $f \circ g = f \circ h$ implies $g = h$.
>
> In **Set**: monomorphisms are injections. Equalizers are always monomorphisms.
^monic-def

## Connections

- **Pullbacks** ([[Pullbacks]]) are another key special type of limit, combining products and equalizers.
- **General limits** ([[General Limits]]) subsume all of these under one definition.
- **Colimits** ([[Colimits]]) are the dual notion: coproducts and coequalizers.

## See Also

- [[Pullbacks]] — Another key special limit
- [[General Limits]] — The general notion that subsumes these
- [[Colimits]] — Dual constructions: coproducts and coequalizers
- [[Synthesis/Limits via Representables]] — Limits as representable functors
- [[Functors and Limits]] — limit-preservation properties of functors; connects this concrete limit theory to functorial constructions
