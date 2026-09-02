---
title: "Yoneda Lemma"
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 4.2, pp. 95–103"
date_ingested: 2026-05-08
doc_type: textbook
depends_on:
  - "[[Representable Functors]]"
  - "[[Foundations/Natural Transformations]]"
  - "[[Foundations/Functor Categories]]"
used_by:
  - "[[Yoneda Embedding and Consequences]]"
  - "[[Synthesis/Limits via Representables]]"
  - "[[Synthesis/Limits in Presheaf Categories]]"
aliases:
  - Yoneda lemma
  - Yoneda
folder: "Category Theory/Representables"
---

# Yoneda Lemma

> [!summary]
> The Yoneda lemma states that for a locally small category $\mathcal{A}$, any functor $X: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$, and any $A \in \mathcal{A}$, there is a natural bijection $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, X) \cong X(A)$. Natural transformations from a representable functor are determined by a single element — what a representable "sees" in $X$ is exactly the data of $X$ at the representing object.

## Overview

The Yoneda lemma is arguably the single most important result in category theory. It says that an object $A$ is completely determined by the functor it represents: to know $A$ is to know $H_A = \mathcal{A}(-,A)$. This has the immediate corollary that the Yoneda embedding $A \mapsto H_A$ is fully faithful — the category $\mathcal{A}$ embeds into its presheaf category without loss of information.

## Main Content

> [!theorem] Theorem 4.2.1: Yoneda Lemma
> Let $\mathcal{A}$ be a locally small category, $X: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ a functor, and $A \in \mathcal{A}$. There is a bijection
> $$[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, X) \xrightarrow{\sim} X(A)$$
> $$\alpha \mapsto \alpha_A(1_A)$$
> that is **natural** in both $A$ and $X$.
>
> The inverse sends $x \in X(A)$ to the natural transformation $\tilde{x}: H_A \Rightarrow X$ with components
> $$\tilde{x}_B(f) = (Xf)(x) \quad \text{for } f: B \to A \in \mathcal{A}(B,A)$$
^yoneda-thm

**How to read the bijection**: A natural transformation $\alpha: H_A \Rightarrow X$ is a coherent family of functions $\alpha_B: \mathcal{A}(B,A) \to X(B)$ for all $B$. The lemma says this entire infinite family is determined by just one piece of data: the single element $\alpha_A(1_A) \in X(A)$ obtained by evaluating the $A$-component on the identity $1_A$.

**Proof sketch**: 
Given $\alpha: H_A \Rightarrow X$ and $f: B \to A$, naturality forces:
$$\alpha_B(f) = \alpha_B(f^*(1_A)) = (Xf)(\alpha_A(1_A))$$
so $\alpha$ is completely determined by $\alpha_A(1_A)$. Conversely, given $x \in X(A)$, defining $\tilde{x}_B(f) = (Xf)(x)$ yields a natural transformation by functoriality of $X$.

### Covariant Yoneda Lemma

The covariant version: for $X: \mathcal{A} \to \mathbf{Set}$ and $A \in \mathcal{A}$:
$$[\mathcal{A}, \mathbf{Set}](H^A, X) \xrightarrow{\sim} X(A)$$
$$\alpha \mapsto \alpha_A(1_A)$$
where $H^A = \mathcal{A}(A,-)$.

### Yoneda Lemma and Representability

> [!theorem] Corollary 4.2.3: Yoneda and Representations
> A functor $F: \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ is representable by $A$ if and only if $F(A)$ contains a **universal element** $u \in F(A)$ such that for all $B$ and $x \in F(B)$, there is a unique $f: B \to A$ with $(Ff)(u) = x$.
>
> The natural isomorphism $\alpha: H_A \xrightarrow{\sim} F$ corresponds to $u = \alpha_A(1_A)$.
^yoneda-representability

> [!example] Example: Yoneda for the Product (BCT, Ch. 4.2)
> The product $A \times B$ in a category $\mathcal{A}$ represents the functor $F(C) = \mathcal{A}(C,A) \times \mathcal{A}(C,B)$. The universal element is the pair of projections $(p_1: A \times B \to A, p_2: A \times B \to B) \in F(A \times B)$.
>
> The Yoneda bijection recovers the universal property: every pair of maps $(f: C \to A, g: C \to B)$ corresponds to a unique map $\langle f,g \rangle: C \to A \times B$.

> [!example] Example: Yoneda Applied to Hom-Sets (BCT, Ch. 4.2)
> Taking $X = H_B = \mathcal{A}(-,B)$, the Yoneda lemma gives:
> $$[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, H_B) \cong H_B(A) = \mathcal{A}(A,B)$$
> Natural transformations $H_A \Rightarrow H_B$ are in bijection with maps $A \to B$. This is the key computation for full faithfulness of the Yoneda embedding.

### Naturality of the Yoneda Bijection

The bijection $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, X) \cong X(A)$ is natural in both $A$ (contravariantly) and $X$ (covariantly). This naturality is essential for the consequences in [[Yoneda Embedding and Consequences]].

## Connections

- The Yoneda lemma is the foundation for the **Yoneda embedding** ([[Yoneda Embedding and Consequences]]).
- **Limits via representables** ([[Synthesis/Limits via Representables]]): the cone functor $\mathrm{Cone}(-, D): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ is a presheaf, and the limit represents it.
- **Density theorem** ([[Synthesis/Limits in Presheaf Categories]]): every presheaf is a colimit of representables.
- In **Adjunctions**: the natural bijection $\mathcal{B}(FA, B) \cong \mathcal{A}(A,GB)$ is a Yoneda-type statement about representability.

## See Also

- [[Representable Functors]] — What the Yoneda lemma is about
- [[Yoneda Embedding and Consequences]] — Full faithfulness and uniqueness of representing objects
- [[Synthesis/Limits via Representables]] — Limits as universal elements
- [[Synthesis/Limits in Presheaf Categories]] — Density theorem
