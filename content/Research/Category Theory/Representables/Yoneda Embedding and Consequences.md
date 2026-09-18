---
title: "Yoneda Embedding and Consequences"
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 4.3, pp. 101–106"
date_ingested: 2026-05-08
date_updated: 2026-07-13
folder: "Category Theory/Representables"
doc_type: textbook
depends_on:
  - "[[Yoneda Lemma]]"
  - "[[Representable Functors]]"
  - "[[Foundations/Functors]]"
used_by:
  - "[[Synthesis/Limits in Presheaf Categories]]"
  - "[[Synthesis/Adjoints and Limits]]"
aliases:
  - Yoneda embedding
  - H bullet
  - full and faithful embedding
  - Cayley's theorem category theory
---

# Yoneda Embedding and Consequences

> [!summary]
> The Yoneda embedding $H^\bullet: \mathcal{A} \to [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$, $A \mapsto H_A = \mathcal{A}(-,A)$, is fully faithful: every category embeds into its presheaf category without loss of information. Consequently, representing objects are unique up to isomorphism, and the Yoneda embedding preserves limits.

## Overview

The Yoneda lemma has immediate powerful consequences. The most fundamental is that the assignment $A \mapsto H_A$ is a full and faithful functor — the category $\mathcal{A}$ sits inside the much larger presheaf category $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ as a full subcategory. This is the categorical analogue of Cayley's theorem (every group embeds into a symmetric group).

## Main Content

### The Yoneda Embedding

> [!definition] Definition: Yoneda Embedding
> For a locally small category $\mathcal{A}$, the **Yoneda embedding** is the functor
> $$
> H^\bullet: \mathcal{A} \to [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}], \quad A \mapsto H_A = \mathcal{A}(-,A)
> $$
>
> On morphisms: for $f: A \to B$, the natural transformation $H^\bullet(f) = f_*: H_A \Rightarrow H_B$ has components $(f_*)_C: \mathcal{A}(C,A) \to \mathcal{A}(C,B)$, $g \mapsto f \circ g$ (postcomposition by $f$).
^yoneda-embedding

### Full Faithfulness

> [!theorem] Corollary 4.3.7: Yoneda Embedding is Fully Faithful (BCT, Ch. 4.3)
> The Yoneda embedding $H^\bullet: \mathcal{A} \to [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is **fully faithful**: for all $A, B \in \mathcal{A}$,
> $$
> \mathcal{A}(A, B) \xrightarrow{\sim} [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, H_B)
> $$
> $$
> f \mapsto f_*
> $$
> is a bijection (natural in $A$ and $B$).
^yoneda-ff

*Proof*: Apply the Yoneda lemma with $X = H_B$: $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, H_B) \cong H_B(A) = \mathcal{A}(A,B)$.

**Interpretation**: An object $A \in \mathcal{A}$ is completely determined (up to isomorphism) by knowing all the sets $\mathcal{A}(C, A)$ and how they transform. "To know an object is to know all maps into it."

### Uniqueness of Representations

> [!theorem] Corollary 4.3.10: Representing Objects Are Unique (BCT, Ch. 4.3)
> If $A, A' \in \mathcal{A}$ both represent the same functor $F: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ (i.e., $H_A \cong F \cong H_{A'}$), then $A \cong A'$ in $\mathcal{A}$.
>
> More precisely: if $H_A \cong H_{A'}$ as functors $\mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$, then $A \cong A'$ in $\mathcal{A}$.
^unique-rep

*Proof*: Since $H^\bullet$ is faithful, $H_A \cong H_{A'}$ implies $A \cong A'$.

**Consequence**: All universal properties define their objects uniquely up to isomorphism. Products, limits, free objects, tensor products — they are all representing objects and hence unique up to unique isomorphism (when the isomorphism is required to be compatible with the universal element).

### Key Applications of Uniqueness

> [!example] Example: Adjoints Are Unique (BCT, Ex. 4.3.13)
> If $F \dashv G$ and $F \dashv G'$, then $G \cong G'$. Proof: for each $B$, both $GB$ and $G'B$ represent the functor $\mathcal{B}(F-, B): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$. By uniqueness of representations, $GB \cong G'B$ naturally.

> [!example] Example: Tensor Product Is Unique (BCT, Ex. 4.3.14)
> The tensor product $M \otimes_R N$ (if it exists) represents $\mathrm{Bilin}(M, N; -)$. Any two objects with this universal property are isomorphic.

### The Yoneda Embedding Preserves Limits

> [!theorem] Proposition 6.2.2: Representables Preserve Limits (BCT, Ch. 6.2)
> For any $A \in \mathcal{A}$ and diagram $D: \mathcal{I} \to \mathcal{A}$:
> $$
> \mathcal{A}(A, \lim D) \cong \lim_{I \in \mathcal{I}} \mathcal{A}(A, DI)
> $$
> i.e., $H^A = \mathcal{A}(A,-)$ sends limits in $\mathcal{A}$ to limits in **Set**.
>
> Equivalently: the Yoneda embedding $H^\bullet$ preserves limits.
^representables-preserve-limits

This follows from the Yoneda lemma and the fact that cones into $D$ with vertex $A$ correspond to cones into $H^A \circ D$ with vertex $\{*\}$.

### The Contravariant Yoneda Embedding

Dually, the **contravariant Yoneda embedding**
$$
H_\bullet: \mathcal{A}^{\mathrm{op}} \to [\mathcal{A}, \mathbf{Set}], \quad A \mapsto H^A = \mathcal{A}(A,-)
$$
is also fully faithful, and preserves limits (= colimits in $\mathcal{A}$).

## Connections

- **Density theorem** ([[Synthesis/Limits in Presheaf Categories]]): Every presheaf $X \in [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is a colimit of representables — the Yoneda embedding is dense.
- **Limits in presheaf categories** are computed pointwise, and the Yoneda embedding is limit-preserving ([[Synthesis/Limits in Presheaf Categories]]).
- The **cartesian closed structure** of $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is related to the universal properties of representables ([[Synthesis/Cartesian Closed Categories]]).

## See Also

- [[Yoneda Lemma]] — The theorem this builds on
- [[Representable Functors]] — What is being embedded
- [[Synthesis/Limits in Presheaf Categories]] — Density theorem and pointwise limits
- [[Synthesis/Adjoints and Limits]] — Representables preserve limits
- [[Synthesis/Cartesian Closed Categories]] — The density theorem (every presheaf is a colimit of representables) underpins the CCC exponential formula $Z^Y(A) = \hat{\mathcal{A}}(H_A \times Y, Z)$
- [[Adjunctions/Adjoint Functors]] — Adjoints are unique up to natural isomorphism by Yoneda (Cor. 4.3.13): both $G$ and $G'$ represent $\mathcal{B}(F-, B)$, so $G \cong G'$
- [[Synthesis/Adjoint Functor Theorems]] — Freyd's GAFT characterises when a functor is representable (and hence when it has a left adjoint)
