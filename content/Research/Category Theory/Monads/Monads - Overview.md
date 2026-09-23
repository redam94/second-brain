---
title: Monads - Overview
tags:
  - source/ingested
  - topic/category-theory
  - type/overview
  - doc/textbook
source: "[[raw/Riehl - Category Theory in Context.pdf]]"
source_location: "Ch. 5 (Monads and their Algebras), pp. 179-216"
date_ingested: 2026-06-28
folder: "Category Theory/Monads"
doc_type: textbook
depends_on:
  - "[[Adjoint Functors]]"
  - "[[Units and Counits]]"
used_by:
  - "[[Monads and the Monad Laws]]"
  - "[[Adjunctions Induce Monads]]"
  - "[[Algebras for a Monad - Eilenberg-Moore and Kleisli]]"
  - "[[Beck's Monadicity Theorem]]"
aliases:
  - Monads
  - Monad Theory
  - Monads and their Algebras
---

# Monads - Overview

> [!summary]
> A **monad** is the "shadow" cast by an adjunction $F \dashv U \colon \mathsf{C} \rightleftarrows \mathsf{D}$ on the category $\mathsf{C}$ serving as the codomain of its right adjoint: from $\mathsf{C}$ only the composite endofunctor $UF$, the unit, and a whiskered counit are visible. Abstractly, a monad packages an endofunctor $T$ with a unit $\eta$ and a multiplication $\mu$ satisfying associativity and unit laws — i.e. a **monoid in the category of endofunctors**. Monads encode "syntactic" algebraic structure on a category; their **algebras** (the [[Algebras for a Monad - Eilenberg-Moore and Kleisli|Eilenberg–Moore category]]) recover the structured objects, and [[Beck's Monadicity Theorem]] characterizes exactly when a category *is* the category of algebras for a monad.

## Overview

Riehl's Chapter 5 develops the theory in six movements, all organized around one slogan: *a monad is the part of an adjunction that survives when you forget the "other" category.* Consider an adjunction
$$
\mathsf{C} \underset{U}{\overset{F}{\rightleftarrows}} \mathsf{D}, \qquad \eta\colon \mathrm{id}_\mathsf{C} \Rightarrow UF, \quad \epsilon\colon FU \Rightarrow \mathrm{id}_\mathsf{D}.
$$
Viewed from $\mathsf{C}$ ("home"), in ignorance of $\mathsf{D}$ ("abroad"), what remains visible is the endofunctor $UF\colon \mathsf{C}\to\mathsf{C}$, the unit $\eta$, and a whiskered version $U\epsilon F$ of the counit. This triple of data is a **monad on $\mathsf{C}$**.

The remarkable converse — that the category $\mathsf{D}$ can often be *reconstructed* from the monad on $\mathsf{C}$ — is the heart of the chapter. When it can, objects of $\mathsf{D}$ are represented as **algebras** for the monad, and a monad is "a syntactic presentation of algebraic structure that is potentially borne by objects in the category on which it acts."

The five notes in this folder cover:

1. **[[Monads and the Monad Laws]]** — the abstract definition: endofunctor $T$, unit $\eta\colon \mathrm{id}_\mathsf{C}\Rightarrow T$, multiplication $\mu\colon T^2\Rightarrow T$, and the associativity & unit coherence laws (Definition 5.1.1).
2. **[[Adjunctions Induce Monads]]** — every adjunction $F\dashv U$ yields a monad $T = UF$ with $\mu = U\epsilon F$ (Lemma 5.1.3).
3. **[[Algebras for a Monad - Eilenberg-Moore and Kleisli]]** — the Eilenberg–Moore category $\mathsf{C}^T$ of all algebras, the Kleisli category $\mathsf{C}_T$ of free algebras, and the comparison functor (§5.2).
4. **[[Beck's Monadicity Theorem]]** — *monadic* adjunctions and the precise characterization via split coequalizers (Theorem 5.5.1), plus what monadicity buys you for limits and colimits (§5.6).

## Main Content

> [!abstract] The big picture
> - **Definition:** a monad $(T,\eta,\mu)$ is a monoid object in the strict monoidal category $\mathsf{C}^\mathsf{C}$ of endofunctors of $\mathsf{C}$, with composition as tensor and $\mathrm{id}_\mathsf{C}$ as unit. *(Wadler's joke: "a monad is a monoid in the category of endofunctors, what's the problem?")*
> - **Source:** every adjunction gives a monad ([[Adjunctions Induce Monads]]). The dual ("shadow" on the codomain of the *left* adjoint) is a **comonad**.
> - **Converse:** every monad arises from an adjunction — in (at least) two universal ways. The **Kleisli** adjunction is initial; the **Eilenberg–Moore** adjunction is terminal, among all adjunctions inducing $T$.
> - **Recognition:** [[Beck's Monadicity Theorem|Beck's theorem]] says a right adjoint $U$ is **monadic** iff it *creates coequalizers of $U$-split pairs* — i.e. iff $\mathsf{D}$ is *equivalent* to the category of algebras.
> - **Payoff:** monadic functors *create all limits* and reflect isomorphisms, so categories monadic over $\mathsf{Set}$ (groups, rings, modules, lattices, compact Hausdorff spaces, …) are automatically complete. ^overview-bigpicture

## Examples

The categories that are **monadic over $\mathsf{Set}$** form the chapter's running motivation (Corollary 5.5.3):

- $\mathsf{Monoid}$, $\mathsf{Group}$, $\mathsf{Ab}$, $\mathsf{Ring}$, commutative rings, $R\text{-}\mathsf{Mod}$, $\mathsf{Vect}_\Bbbk$, affine spaces $\mathsf{Aff}_\Bbbk$;
- $\mathsf{Set}^{BG}$ (sets with a $G$-action), $\mathsf{Lattice}$, pointed sets $\mathsf{Set}_*$;
- compact Hausdorff spaces $\mathsf{cHaus}$ (Corollary 5.5.6, via the ultrafilter/Stone–Čech monad).

By contrast, **fields** do *not* form a category monadic over $\mathsf{Set}$ — which "explains why the category of fields shares few of the properties common to the categories just described." Likewise $\mathsf{Poset}$ and $\mathsf{Top}$ are not monadic over $\mathsf{Set}$ (Lemma 5.6.1 / Corollary 5.6.4: there are bijective continuous maps that are not homeomorphisms).

Concrete monads to keep in mind (see [[Monads and the Monad Laws]] for details): the **list/free-monoid monad** $TA = \coprod_{n\ge 0} A^n$, the **maybe monad** $(-)_+$, the **(covariant) power-set monad** $P$, and the **double power-set monad** $P^2$.

## Connections

- **Builds on adjunctions:** requires [[Adjoint Functors]] and especially the [[Units and Counits|unit/counit (triangle identity) formulation]] — the triangle identities are exactly what make $UF$ a monad.
- **Feeds into algebraic universal algebra:** finitary monads ↔ Lawvere theories ↔ categories of models for an algebraic theory (§5.5).
- **Limits & colimits:** monadicity transfers completeness/cocompleteness; connects to [[Adjoint Functor Theorems]] (the construction of free algebras and of colimits of algebras uses the General Adjoint Functor Theorem).
- **Cartesian closure:** [[Cartesian Closed Categories|cartesian closed structure]] underlies the continuation monads $S^{S^{-}}$ and the self-adjointness of the contravariant power-set functor (used to prove $\mathsf{Set}^{op}$ is monadic, Theorem 5.5.9).

## See Also

- [[Monads and the Monad Laws]]
- [[Adjunctions Induce Monads]]
- [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]
- [[Beck's Monadicity Theorem]]
- [[Adjoint Functors]] · [[Units and Counits]] · [[Adjoint Functor Theorems]] · [[Cartesian Closed Categories]]
- Source: Riehl - Category Theory in Context
