---
title: "Adjoint Functors"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 2.1–2.2, pp. 53–71"
date_ingested: 2026-05-08
doc_type: textbook
depends_on:
  - "[[Foundations/Categories]]"
  - "[[Foundations/Functors]]"
  - "[[Foundations/Natural Transformations]]"
used_by:
  - "[[Units and Counits]]"
  - "[[Adjunctions via Initial Objects]]"
  - "[[Synthesis/Adjoints and Limits]]"
  - "[[Synthesis/Adjoint Functor Theorems]]"
aliases:
  - adjunction
  - adjoint functor
  - left adjoint
  - right adjoint
  - F ⊣ G
folder: "Category Theory/Adjunctions"
---

# Adjoint Functors

> [!summary]
> An adjunction $F \dashv G$ between functors $F: \mathcal{A} \to \mathcal{B}$ and $G: \mathcal{B} \to \mathcal{A}$ is a natural bijection $\mathcal{B}(FA, B) \cong \mathcal{A}(A, GB)$. Adjunctions arise throughout mathematics wherever a "free" construction is paired with a "forgetful" one, and they have four equivalent formulations. Left adjoints preserve colimits; right adjoints preserve limits.

## Overview

Adjunctions are one of the central concepts of category theory. The slogan is: "free constructions are left adjoints to forgetful functors." An adjunction $F \dashv G$ captures the sense in which maps out of a free object $FA$ are in bijection with maps into the underlying object $GB$. This bijection must be **natural** in both variables — not just a random family of bijections, but one that commutes with all morphisms.

## Main Content

> [!definition] Definition 2.1.1: Adjunction (Hom-Set Form)
> Let $F: \mathcal{A} \to \mathcal{B}$ and $G: \mathcal{B} \to \mathcal{A}$ be functors. An **adjunction** between $F$ and $G$, written $F \dashv G$, consists of a bijection
> $$\overline{(-)}: \mathcal{B}(FA, B) \xrightarrow{\sim} \mathcal{A}(A, GB)$$
> natural in $A \in \mathcal{A}$ and $B \in \mathcal{B}$. We call $F$ the **left adjoint** and $G$ the **right adjoint**.
>
> Naturality in $A$: for any $h: A' \to A$, the square
> $$\overline{f \circ Fh} = \bar{f} \circ h$$
> Naturality in $B$: for any $k: B \to B'$, 
> $$\overline{k \circ f} = Gk \circ \bar{f}$$
^adjunction-def

**Notation**: For $f: FA \to B$, write $\bar{f}: A \to GB$ for its **transpose** (or adjunct). The bijection and its inverse are mutual transposes.

### Core Examples

| Adjunction $F \dashv G$ | $F$ | $G$ | Bijection |
|------------------------|-----|-----|-----------|
| Free/forgetful for groups | Free group $F(\mathbf{Set} \to \mathbf{Grp})$ | Forgetful $U$ | $\mathbf{Grp}(FX, G) \cong \mathbf{Set}(X, UG)$ |
| Product/diagonal | $(-) \times B$ | $(-)^B$ (internal hom) | $\mathcal{A}(A \times B, C) \cong \mathcal{A}(A, C^B)$ |
| Diagonal/limit | $\Delta: \mathcal{A} \to [\mathcal{I},\mathcal{A}]$ | $\lim_\mathcal{I}$ | Cones ↔ maps into limit |
| $f^*$/direct image | Inverse image $f^{-1}$ | Direct image $f_*$ | Preorder adjunctions in $\mathcal{O}(X)$ |
| Abelianization/forgetful | $(-)/[−,−]: \mathbf{Grp} \to \mathbf{Ab}$ | inclusion | Hom in Ab ↔ Hom in Grp |
| Tensor/hom for $\mathbf{Vect}_k$ | $(-) \otimes_k W$ | $\mathrm{Hom}_k(W,-)$ | $\mathbf{Vect}_k(V \otimes W, U) \cong \mathbf{Vect}_k(V, \mathrm{Hom}(W,U))$ |

> [!example] Example: Adjunction for Preorders (BCT, Ch. 2.1)
> In a preorder (viewed as a category), an adjunction $F \dashv G$ between monotone maps $F: P \to Q$ and $G: Q \to P$ is exactly a **Galois connection**: $F(a) \leq b$ iff $a \leq G(b)$. Left adjoints in a preorder are exactly lower sets; right adjoints are upper sets. Floor and ceiling are adjoint to inclusion $\mathbb{Z} \hookrightarrow \mathbb{R}$.

### Four Equivalent Definitions

Leinster presents four equivalent ways to define an adjunction $F \dashv G$:

1. **Hom-set bijection** (Definition above): Natural isomorphism $\mathcal{B}(F-, -) \cong \mathcal{A}(-, G-)$.

2. **Unit and counit** ([[Units and Counits]]): Natural transformations $\eta: 1_\mathcal{A} \Rightarrow GF$ and $\varepsilon: FG \Rightarrow 1_\mathcal{B}$ satisfying the triangle identities.

3. **Universal maps**: For each $A$, a universal map $\eta_A: A \to GFA$ such that every $f: A \to GB$ factors uniquely through $\eta_A$.

4. **Initial objects** ([[Adjunctions via Initial Objects]]): For each $A$, $\eta_A: A \to GFA$ is the initial object of the comma category $(A \downarrow G)$.

All four are equivalent; the choice of definition depends on context.

### Uniqueness of Adjoints

> [!theorem] Theorem: Adjoints Are Unique Up to Isomorphism (BCT, Ch. 2.2)
> If $F \dashv G$ and $F \dashv G'$, then $G \cong G'$ (natural isomorphism). Similarly, if $F \dashv G$ and $F' \dashv G$, then $F \cong F'$.
^adj-unique

*Proof sketch*: The natural isomorphisms $\mathcal{A}(A,GB) \cong \mathcal{B}(FA,B) \cong \mathcal{A}(A,G'B)$ hold for all $A$, so by the Yoneda lemma $GB \cong G'B$ naturally.

## Connections

- **Units and counits** ([[Units and Counits]]) give an equivalent, often more computational, formulation.
- **Initial objects** ([[Adjunctions via Initial Objects]]) provide the universal-property formulation.
- **Adjoints preserve (co)limits** ([[Synthesis/Adjoints and Limits]]): left adjoints preserve colimits, right adjoints preserve limits.
- **Adjoint functor theorems** ([[Synthesis/Adjoint Functor Theorems]]) give conditions under which a functor has an adjoint.
- **Representability**: $F \dashv G$ iff for each $B$, the functor $\mathcal{B}(F-, B): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ is representable by $GB$.

## See Also

- [[Units and Counits]] — Alternative formulation of adjunctions
- [[Adjunctions via Initial Objects]] — Universal maps and comma categories
- [[Synthesis/Adjoints and Limits]] — Preservation theorem
- [[Synthesis/Adjoint Functor Theorems]] — Existence theorems
