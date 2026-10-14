---
title: "Functors"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 1.2, pp. 18–31"
date_ingested: 2026-05-08
folder: "Category Theory/Foundations"
doc_type: textbook
depends_on:
  - "[[Categories]]"
used_by:
  - "[[Natural Transformations]]"
  - "[[Functor Categories]]"
  - "[[Representables/Representable Functors]]"
  - "[[Adjunctions/Adjoint Functors]]"
aliases:
  - functor
  - covariant functor
  - contravariant functor
  - full functor
  - faithful functor
---

# Functors

> [!summary]
> A functor is a structure-preserving map between categories, sending objects to objects and morphisms to morphisms while respecting composition and identities. Functors that are both full and faithful are the categorical notion of "embedding." Contravariant functors go into the opposite category.

## Overview

If categories are mathematical universes, functors are the translations between them. A functor from $\mathcal{A}$ to $\mathcal{B}$ carries every object and morphism of $\mathcal{A}$ over to $\mathcal{B}$ in a way that preserves all compositional structure. This makes functors the maps in the category **CAT** of categories.

## Main Content

> [!definition] Definition 1.2.1: Functor
> A **functor** $F: \mathcal{A} \to \mathcal{B}$ consists of:
> - A function $F: \mathrm{ob}(\mathcal{A}) \to \mathrm{ob}(\mathcal{B})$
> - For each $A, A' \in \mathcal{A}$, a function $F: \mathcal{A}(A, A') \to \mathcal{B}(FA, FA')$
>
> satisfying:
> 1. $F(g \circ f) = F(g) \circ F(f)$ (preserves composition)
> 2. $F(1_A) = 1_{FA}$ (preserves identities)
^functor-def

**Notation**: The image of a map $f: A \to A'$ under $F$ is written $Ff$ or $F(f)$.

### Key Examples

| Functor | Domain → Codomain | Action |
|---------|-------------------|--------|
| Forgetful $U: \mathbf{Grp} \to \mathbf{Set}$ | groups → sets | Forgets group structure |
| Free $F: \mathbf{Set} \to \mathbf{Grp}$ | sets → free groups | Generates free group |
| Power set $\mathcal{P}: \mathbf{Set} \to \mathbf{Set}$ | sets → sets | $\mathcal{P}(f)(S) = f(S)$ (direct image) |
| Abelianization $(-)/[−,−]: \mathbf{Grp} \to \mathbf{Ab}$ | groups → abelian groups | Quotients by commutator |
| Fundamental group $\pi_1: \mathbf{Top}_* \to \mathbf{Grp}$ | pointed spaces → groups | Assigns $\pi_1$ |
| Identity $1_\mathcal{A}: \mathcal{A} \to \mathcal{A}$ | any → same | Does nothing |
| Constant $\Delta B: \mathcal{A} \to \mathcal{B}$ | any → any | Sends everything to $B$ |

> [!example] Example: Power Set as a Functor (BCT, Ch. 1.2)
> The **direct image** power set functor $\mathcal{P}: \mathbf{Set} \to \mathbf{Set}$ sends a set $X$ to $\mathcal{P}(X)$ (its set of subsets) and a function $f: X \to Y$ to $f_*: \mathcal{P}(X) \to \mathcal{P}(Y)$ where $f_*(S) = \{f(s) : s \in S\}$.
>
> The **inverse image** version $f^{-1}: \mathcal{P}(Y) \to \mathcal{P}(X)$ is **contravariant** — it reverses arrows.

### Contravariant Functors

> [!definition] Definition: Contravariant Functor
> A **contravariant functor** from $\mathcal{A}$ to $\mathcal{B}$ is a (covariant) functor $\mathcal{A}^{\mathrm{op}} \to \mathcal{B}$. It sends $f: A \to A'$ to $Ff: FA' \to FA$ (arrow reversed).
^contravariant-def

The key example is the **hom-functor**: for fixed $B \in \mathcal{A}$, the functor $\mathcal{A}(-, B): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ sends $A \mapsto \mathcal{A}(A,B)$ and $f: A \to A'$ to the precomposition map $f^*: \mathcal{A}(A',B) \to \mathcal{A}(A,B)$.

### Full and Faithful Functors

> [!definition] Definition 1.2.15: Full, Faithful, Fully Faithful
> A functor $F: \mathcal{A} \to \mathcal{B}$ is:
> - **Faithful** if for all $A, A'$, the function $F: \mathcal{A}(A,A') \to \mathcal{B}(FA,FA')$ is injective
> - **Full** if for all $A, A'$, the function $F: \mathcal{A}(A,A') \to \mathcal{B}(FA,FA')$ is surjective
> - **Fully faithful** if it is both full and faithful (i.e., each such function is a bijection)
^full-faithful-def

Fully faithful functors are the categorical embedding: they identify $\mathcal{A}$ as a full subcategory of $\mathcal{B}$. The Yoneda embedding $H^\bullet: \mathcal{A} \to [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is a key example ([[Representables/Yoneda Embedding and Consequences]]).

**Proposition**: If $F$ is fully faithful and $FA \cong FA'$ in $\mathcal{B}$, then $A \cong A'$ in $\mathcal{A}$.

### Equivalence of Categories

> [!definition] Definition: Equivalence of Categories
> A functor $F: \mathcal{A} \to \mathcal{B}$ is an **equivalence of categories** if there exists $G: \mathcal{B} \to \mathcal{A}$ such that $GF \cong 1_\mathcal{A}$ and $FG \cong 1_\mathcal{B}$ (natural isomorphisms). Write $\mathcal{A} \simeq \mathcal{B}$.
>
> $F$ is an equivalence if and only if $F$ is fully faithful and **essentially surjective** (every $B \in \mathcal{B}$ is isomorphic to $FA$ for some $A$).
^equivalence-def

Equivalence is weaker than isomorphism of categories (which requires $GF = 1$ and $FG = 1$ on the nose) but is the correct notion of "sameness" in category theory.

### The Diagonal (Constant) Functor

> [!definition] Definition: Diagonal Functor
> For categories $\mathcal{A}$ and $\mathcal{I}$, the **diagonal functor** $\Delta: \mathcal{A} \to [\mathcal{I}, \mathcal{A}]$ sends each $A \in \mathcal{A}$ to the constant functor at $A$ (mapping every object of $\mathcal{I}$ to $A$ and every map to $1_A$). Used to define cones and limits.
^diagonal-def

## Connections

- A **natural transformation** ([[Natural Transformations]]) is a "map between functors" — making functors into objects of a category.
- **Functor categories** $[\mathcal{A}, \mathcal{B}]$ ([[Functor Categories]]) are categories whose objects are functors.
- **Representable functors** ([[Representables/Representable Functors]]) are functors $\mathcal{A} \to \mathbf{Set}$ isomorphic to a hom-functor.
- **Adjoints** ([[Adjunctions/Adjoint Functors]]) are pairs of functors between categories with a special natural bijection.

## See Also

- [[Categories]] — What functors map between
- [[Natural Transformations]] — Maps between functors
- [[Functor Categories]] — Categories of functors
- [[Representables/Representable Functors]] — Functors isomorphic to hom-functors
