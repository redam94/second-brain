---
title: "General Limits"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 5.1, pp. 120–134"
date_ingested: 2026-05-08
doc_type: textbook
depends_on:
  - "[[Products and Equalizers]]"
  - "[[Pullbacks]]"
  - "[[Foundations/Functors]]"
  - "[[Foundations/Natural Transformations]]"
used_by:
  - "[[Colimits]]"
  - "[[Functors and Limits]]"
  - "[[Synthesis/Limits via Representables]]"
  - "[[Synthesis/Adjoints and Limits]]"
aliases:
  - limit
  - cone
  - diagram
  - terminal cone
  - lim
folder: "Research/Category Theory/Limits and Colimits"
---

# General Limits

> [!summary]
> A limit of a diagram $D: \mathcal{I} \to \mathcal{A}$ is a terminal cone: an object $\lim D$ with a natural transformation $\lambda: \Delta(\lim D) \Rightarrow D$ through which every cone factors uniquely. Limits in **Set** have a concrete formula as a subset of a product. Products + equalizers generate all limits.

## Overview

The general definition of limit unifies products, equalizers, pullbacks, and all other "meet-like" constructions. A **diagram** is just a functor $D: \mathcal{I} \to \mathcal{A}$, a **cone** is a compatible family of maps into the diagram, and the **limit** is the universal cone.

## Main Content

> [!definition] Definition 5.1.18: Diagram
> A **diagram** in $\mathcal{A}$ of **shape** $\mathcal{I}$ is a functor $D: \mathcal{I} \to \mathcal{A}$. The category $\mathcal{I}$ is called the **index category** (or **shape category**).
^diagram-def

Common index categories:
- $\mathcal{I} = \bullet$: a single object, no non-identity maps. Limit = the object itself.
- $\mathcal{I} = \bullet \; \bullet$: two objects, no maps between them. Limit = product.
- $\mathcal{I} = \bullet \rightrightarrows \bullet$: parallel pair. Limit = equalizer.
- $\mathcal{I} = \bullet \to \bullet \leftarrow \bullet$: cospan. Limit = pullback.
- $\mathcal{I} = \emptyset$: empty diagram. Limit = terminal object.

> [!definition] Definition 5.1.19: Cone
> A **cone** over a diagram $D: \mathcal{I} \to \mathcal{A}$ with **vertex** $A \in \mathcal{A}$ is a natural transformation $\lambda: \Delta A \Rightarrow D$, where $\Delta A: \mathcal{I} \to \mathcal{A}$ is the constant functor at $A$.
>
> Concretely, a cone consists of:
> - Maps $\lambda_I: A \to DI$ for each $I \in \mathcal{I}$
> - Such that for every $u: I \to J$ in $\mathcal{I}$: $Du \circ \lambda_I = \lambda_J$
^cone-def

> [!definition] Definition 5.1.20: Limit
> A **limit** of $D: \mathcal{I} \to \mathcal{A}$ is a **terminal cone**: a cone $\lambda: \Delta L \Rightarrow D$ such that for every cone $\mu: \Delta A \Rightarrow D$, there is a unique map $\bar{\mu}: A \to L$ with $\lambda_I \circ \bar{\mu} = \mu_I$ for all $I \in \mathcal{I}$.
>
> Write $L = \lim D$ or $\lim_{\mathcal{I}} D$ or $\lim_{I \in \mathcal{I}} DI$.
^limit-def

Limits are unique up to isomorphism when they exist (by terminality).

### Limits in Set

> [!example] Example 5.1.22: Limit Formula in Set (BCT, Ch. 5.1)
> For a diagram $D: \mathcal{I} \to \mathbf{Set}$, the limit is:
> $$\lim D = \left\{ (x_I)_{I \in \mathcal{I}} \in \prod_{I \in \mathcal{I}} DI \;\Big|\; \forall u: I \to J \text{ in } \mathcal{I},\; (Du)(x_I) = x_J \right\}$$
> with projections $\lambda_I: \lim D \to DI$, $(x_I)_I \mapsto x_I$.
>
> I.e., the limit is the set of **compatible families of elements**.
^limit-set-formula

> [!example] Example: Special Cases of the Set Limit Formula
> - **Product**: $\lim(A_i)_{i \in I} = \prod_i A_i$ (no compatibility conditions when $\mathcal{I}$ has no non-identity maps).
> - **Equalizer**: $\lim(s,t: X \rightrightarrows Y) = \{x \in X : s(x) = t(x)\}$.
> - **Pullback**: $X \times_Z Y = \{(x,y) : g(x) = f(y)\}$.
> - **Terminal object**: $\lim(\emptyset) = \{*\}$.

### Completeness

> [!definition] Definition: Complete Category
> A category $\mathcal{A}$ is **complete** if it has all small limits (i.e., limits of all diagrams $D: \mathcal{I} \to \mathcal{A}$ with $\mathcal{I}$ small).
>
> $\mathcal{A}$ is **finitely complete** if it has all finite limits.
^complete-def

**Examples**: **Set**, **Top**, **Grp**, **Ab**, **Ring**, $[\mathcal{A}, \mathcal{B}]$ (when $\mathcal{B}$ is complete) are all complete.

### Products + Equalizers Generate All Limits

> [!theorem] Proposition 5.1.26 (BCT, Ch. 5.1)
> A category has all small limits if and only if it has all small products and all equalizers.
>
> For finite limits, the same with "finite."
^limits-from-products-equalizers

## Connections

- **Colimits** ([[Colimits]]) are limits in the opposite category: initial cones.
- **Functors and limits** ([[Functors and Limits]]): not all functors preserve limits; continuous functors are those that do.
- **Limits via representables** ([[Synthesis/Limits via Representables]]): $\lim D$ represents the functor $\mathrm{Cone}(-,D)$.
- **Right adjoints preserve limits** ([[Synthesis/Adjoints and Limits]]).

## See Also

- [[Products and Equalizers]] — Special cases
- [[Pullbacks]] — Another special case
- [[Colimits]] — Dual notion
- [[Functors and Limits]] — Preservation and reflection
- [[Synthesis/Limits via Representables]] — Limits as representable functors
