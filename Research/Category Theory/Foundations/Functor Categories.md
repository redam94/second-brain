---
title: "Functor Categories"
tags:
  - source/ingested
  - topic/category-theory
  - type/concept
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 1.3–1.4, pp. 38–52"
date_ingested: 2026-05-08
date_updated: 2026-07-13
folder: "Category Theory/Foundations"
doc_type: textbook
depends_on:
  - "[[Functors]]"
  - "[[Natural Transformations]]"
  - "[[Categories]]"
used_by:
  - "[[Representables/Representable Functors]]"
  - "[[Representables/Yoneda Lemma]]"
  - "[[Synthesis/Limits in Presheaf Categories]]"
  - "[[Synthesis/Cartesian Closed Categories]]"
  - "[[Basic Category Theory - Overview]]"
aliases:
  - functor category
  - presheaf category
  - presheaf
  - "[[A, B]]"
---

# Functor Categories

> [!summary]
> The functor category $[\mathcal{A}, \mathcal{B}]$ has functors $\mathcal{A} \to \mathcal{B}$ as objects and natural transformations as morphisms. The special case $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is the **presheaf category** on $\mathcal{A}$, central to representability and the Yoneda embedding. Limits in presheaf categories are computed pointwise.

## Overview

Categories themselves form a category: **CAT** has (small) categories as objects and functors as morphisms. But we can also form a category whose objects are functors between two fixed categories. This is the functor category, and it is the home for the Yoneda lemma and for much of the synthesis in Chapter 6.

## Main Content

> [!definition] Definition 1.3.18: Functor Category
> Let $\mathcal{A}$ and $\mathcal{B}$ be categories. The **functor category** $[\mathcal{A}, \mathcal{B}]$ (also written $\mathcal{B}^\mathcal{A}$ or $\mathrm{Fun}(\mathcal{A},\mathcal{B})$) has:
> - **Objects**: functors $F: \mathcal{A} \to \mathcal{B}$
> - **Morphisms**: natural transformations $\alpha: F \Rightarrow G$
> - **Composition**: vertical composition of natural transformations
> - **Identities**: identity natural transformation $1_F$ with $(1_F)_A = 1_{FA}$
^functor-cat-def

Well-definedness requires that $[\mathcal{A}, \mathcal{B}]$ is locally small whenever $\mathcal{A}$ is small and $\mathcal{B}$ is locally small.

### Presheaf Categories

> [!definition] Definition: Presheaf and Presheaf Category
> A **presheaf** on a category $\mathcal{A}$ is a functor $X: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$. The **presheaf category** (or **category of presheaves**) on $\mathcal{A}$ is:
> $$\hat{\mathcal{A}} = [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$$
^presheaf-def

**Key fact**: When $\mathcal{A}$ is small, $\hat{\mathcal{A}}$ is a very well-behaved category. It has all limits and colimits (computed pointwise for limits), it is cartesian closed ([[Synthesis/Cartesian Closed Categories]]), and the Yoneda embedding $H^\bullet: \mathcal{A} \to \hat{\mathcal{A}}$ is fully faithful.

### Examples of Functor Categories

> [!example] Example: Diagrams as Functor Categories (BCT, Ch. 1.4)
> - $[\mathbf{2}, \mathcal{A}]$ where $\mathbf{2} = \{0 \to 1\}$ is the category of maps (arrows) in $\mathcal{A}$.
> - $[\mathbf{3}, \mathcal{A}]$ where $\mathbf{3} = \{0 \to 1 \to 2\}$ is the category of composable pairs in $\mathcal{A}$.
> - $[\bullet \rightrightarrows \bullet, \mathcal{A}]$ is the category of parallel pairs in $\mathcal{A}$.
> - For a group $G$ (one-object category), $[G, \mathbf{Set}]$ is the category of $G$-sets.
> - For a poset $P$, $[P, \mathbf{Ab}]$ is the category of $P$-indexed diagrams of abelian groups.

> [!example] Example: Presheaves on a Topological Space (BCT, Ch. 1.4)
> Let $\mathcal{O}(X)$ be the poset of open sets of a topological space $X$ (ordered by inclusion). A presheaf on $\mathcal{O}(X)$ in the classical sense is exactly a presheaf $\mathcal{O}(X)^{\mathrm{op}} \to \mathbf{Set}$ in the categorical sense: it assigns a set to each open set, and restriction maps go the right way.

### Isomorphisms in Functor Categories

A natural transformation $\alpha: F \Rightarrow G$ is an isomorphism in $[\mathcal{A}, \mathcal{B}]$ if and only if every component $\alpha_A$ is an isomorphism in $\mathcal{B}$ — i.e., $\alpha$ is a natural isomorphism. This is standard: in any functor category, isomorphisms are exactly the natural isomorphisms.

### The Hom Bifunctor

For a locally small category $\mathcal{A}$, the **hom bifunctor** is:
$$\mathcal{A}(-, -): \mathcal{A}^{\mathrm{op}} \times \mathcal{A} \to \mathbf{Set}$$
sending $(A, B) \mapsto \mathcal{A}(A, B)$ and $(f, g) \mapsto (h \mapsto g \circ h \circ f)$.

For fixed $A$, this gives the **representable functor** $\mathcal{A}(A, -): \mathcal{A} \to \mathbf{Set}$ ([[Representables/Representable Functors]]).

## Connections

- The objects of $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ are the targets of the Yoneda embedding $H^\bullet: \mathcal{A} \to [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ ([[Representables/Yoneda Embedding and Consequences]]).
- Limits in $[\mathcal{A}, \mathcal{B}]$ are computed **pointwise** when $\mathcal{B}$ has limits ([[Synthesis/Limits in Presheaf Categories]]).
- $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is **cartesian closed** for any small $\mathcal{A}$ ([[Synthesis/Cartesian Closed Categories]]).
- A **diagram** in $\mathcal{A}$ of shape $\mathcal{I}$ is an object of $[\mathcal{I}, \mathcal{A}]$; limits and colimits are about such diagrams ([[Limits and Colimits/General Limits]]).

## See Also

- [[Natural Transformations]] — Morphisms in functor categories
- [[Representables/Representable Functors]] — Special functors in presheaf categories
- [[Representables/Yoneda Lemma]] — Natural transformations out of representables
- [[Synthesis/Limits in Presheaf Categories]] — Pointwise limits
- [[Synthesis/Cartesian Closed Categories]] — Presheaf categories are CCC
- [[Adjunctions/Adjoint Functors]] — Adjunctions between functor categories are the source of many structural results; the functor category $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ carries the CCC adjunction $- \times B \dashv (-)^B$
