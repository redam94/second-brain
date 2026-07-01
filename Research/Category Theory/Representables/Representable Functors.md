---
title: "Representable Functors"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 4.1, pp. 84–98"
date_ingested: 2026-05-08
folder: "Category Theory/Representables"
doc_type: textbook
depends_on:
  - "[[Foundations/Functors]]"
  - "[[Foundations/Functor Categories]]"
  - "[[Foundations/Categories]]"
used_by:
  - "[[Yoneda Lemma]]"
  - "[[Yoneda Embedding and Consequences]]"
  - "[[Synthesis/Limits via Representables]]"
aliases:
  - representable functor
  - representable
  - hom functor
  - H^A
  - H_A
  - generalized element
---

# Representable Functors

> [!summary]
> A functor $F: \mathcal{A} \to \mathbf{Set}$ is **representable** if it is naturally isomorphic to the hom-functor $\mathcal{A}(A, -)$ for some object $A$. The representing object $A$ is unique up to isomorphism (by the Yoneda lemma), and the isomorphism $\mathcal{A}(A,-) \cong F$ corresponds to a distinguished "universal element" $u \in F(A)$.

## Overview

The hom-functors $\mathcal{A}(A,-): \mathcal{A} \to \mathbf{Set}$ are the most natural functors associated to any category. A **representable functor** is one that "looks like a hom-functor," i.e., one that is naturally isomorphic to some $\mathcal{A}(A,-)$. The theory of representable functors is the formal foundation for universal properties: to say that an object $A$ represents $F$ is to say that $A$ is the universal object for the construction $F$ describes.

## Main Content

> [!definition] Definition 4.1.1: Representable Functor
> Let $\mathcal{A}$ be a locally small category. A functor $F: \mathcal{A} \to \mathbf{Set}$ is **representable** if there exists $A \in \mathcal{A}$ and a natural isomorphism $\alpha: \mathcal{A}(A, -) \xrightarrow{\sim} F$.
>
> The pair $(A, \alpha)$ is called a **representation** of $F$. The object $A$ is the **representing object**.
^representable-def

For contravariant functors $F: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$, representability means $F \cong \mathcal{A}(-,A)$ for some $A$.

### The Hom-Functors

> [!definition] Definition: Covariant Hom-Functor $H^A$
> For $A \in \mathcal{A}$, the **covariant hom-functor** $H^A = \mathcal{A}(A,-): \mathcal{A} \to \mathbf{Set}$ sends:
> - Object $B \mapsto \mathcal{A}(A,B)$
> - Map $f: B \to C \mapsto f_*: \mathcal{A}(A,B) \to \mathcal{A}(A,C)$, where $f_*(g) = f \circ g$ (postcomposition)
^hom-covariant-def

> [!definition] Definition: Contravariant Hom-Functor $H_A$
> For $A \in \mathcal{A}$, the **contravariant hom-functor** $H_A = \mathcal{A}(-,A): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ sends:
> - Object $B \mapsto \mathcal{A}(B,A)$
> - Map $f: C \to B \mapsto f^*: \mathcal{A}(B,A) \to \mathcal{A}(C,A)$, where $f^*(g) = g \circ f$ (precomposition)
^hom-contravariant-def

> [!definition] Definition: Bifunctor Hom
> The **hom bifunctor** $\mathcal{A}(-,-): \mathcal{A}^{\mathrm{op}} \times \mathcal{A} \to \mathbf{Set}$ sends $(B,C) \mapsto \mathcal{A}(B,C)$ and $(f: B' \to B, g: C \to C') \mapsto (h \mapsto g \circ h \circ f)$.

### Generalized Elements

> [!definition] Definition 4.1.25: Generalized Element
> For $A, S \in \mathcal{A}$, a **generalized element** of $A$ of **shape** $S$ is a map $f: S \to A$. The set of all generalized elements of shape $S$ is $\mathcal{A}(S, A) = H^S(A)$.
>
> For $S = \mathbf{1}$ (terminal object, when it exists), generalized elements of shape $\mathbf{1}$ are **global elements** (ordinary elements of $A$).
^gen-element-def

Generalized elements make the category-theoretic analogy with sets precise: in **Set**, maps $\{*\} \to X$ are exactly elements of $X$. In a general category, maps $S \to A$ are "elements of $A$ as seen from the perspective of $S$."

### Examples of Representable Functors

> [!example] Example: Forgetful Functor on Groups (BCT, Ch. 4.1)
> The forgetful functor $U: \mathbf{Grp} \to \mathbf{Set}$ is representable: $U \cong \mathbf{Grp}(\mathbb{Z}, -)$. The bijection $U(G) \cong \mathbf{Grp}(\mathbb{Z}, G)$ sends $g \in G$ to the unique homomorphism $\mathbb{Z} \to G$ with $1 \mapsto g$.

> [!example] Example: Underlying Set of a Ring (BCT, Ch. 4.1)
> The forgetful functor $\mathbf{Ring} \to \mathbf{Set}$ is representable by the polynomial ring $\mathbb{Z}[x]$: $\mathbf{Ring}(\mathbb{Z}[x], R) \cong R$ as sets (a ring map $\mathbb{Z}[x] \to R$ is determined by where $x$ goes).

> [!example] Example: Non-Representable Functor (BCT, Ch. 4.1)
> The functor $F: \mathbf{Set} \to \mathbf{Set}$ sending $X \mapsto \mathcal{P}(X) / \text{finite}$ (power set modulo finite sets) is not representable, as it does not preserve filtered colimits.

### Representation = Universal Element

> [!theorem] Theorem: Representations via Universal Elements (BCT, Ch. 4.3, Cor. 4.3.2)
> A representation of $F: \mathcal{A} \to \mathbf{Set}$ is equivalently a pair $(A, u)$ where $A \in \mathcal{A}$ and $u \in F(A)$ such that:
>
> For every $B \in \mathcal{A}$ and every $x \in F(B)$, there is a unique $f: A \to B$ with $(Ff)(u) = x$.
>
> The element $u \in F(A)$ is called the **universal element** of the representation.
^universal-element-thm

The universal element corresponds to $\alpha_A(1_A)$ under the natural isomorphism $\alpha: \mathcal{A}(A,-) \cong F$. Every universal property is exactly a universal element of some functor.

## Connections

- The **Yoneda lemma** ([[Yoneda Lemma]]) computes $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, X) \cong X(A)$ — natural transformations from a representable are determined by a single element.
- **Limits** ([[Limits and Colimits/General Limits]]) are representable: $\lim D$ represents the functor $\mathrm{Cone}(-,D)$.
- **Adjunctions** ([[Adjunctions/Adjoint Functors]]): $F \dashv G$ iff $\mathcal{B}(F-, B)$ is representable by $GB$ for each $B$.

## See Also

- [[Yoneda Lemma]] — The fundamental theorem of representability
- [[Yoneda Embedding and Consequences]] — Full faithfulness of the Yoneda embedding
- [[Adjunctions/Adjoint Functors]] — Adjunctions as representability
- [[Synthesis/Limits via Representables]] — Limits as representable functors
