---
title: "Limits via Representables"
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 6.1, pp. 141–147"
date_ingested: 2026-05-08
doc_type: textbook
depends_on:
  - "[[Limits and Colimits/General Limits]]"
  - "[[Representables/Representable Functors]]"
  - "[[Representables/Yoneda Lemma]]"
  - "[[Foundations/Functor Categories]]"
used_by:
  - "[[Limits in Presheaf Categories]]"
  - "[[Adjoints and Limits]]"
aliases:
  - limits as representables
  - cone functor
  - lim ⊣ Δ
---

# Limits via Representables

> [!summary]
> The cone functor $\mathrm{Cone}(-,D): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ sending $A \mapsto \mathrm{Cone}(A,D)$ is a presheaf. The limit $\lim D$ is exactly the representing object of this functor: $\mathrm{Cone}(A,D) \cong \mathcal{A}(A, \lim D)$ naturally. Consequently, limits are unique up to isomorphism, and the limit functor $\lim: [\mathcal{I}, \mathcal{A}] \to \mathcal{A}$ is right adjoint to the diagonal functor $\Delta$.

## Overview

Chapter 6 unifies the three main themes of the book. It begins by showing that limits are representable functors (Ch. 6.1). This is the formal unification: the language of representability and the Yoneda lemma now governs limits directly.

## Main Content

### Cones as Natural Transformations

Recall that a cone over $D: \mathcal{I} \to \mathcal{A}$ with vertex $A$ is a natural transformation $\Delta A \Rightarrow D$ in $[\mathcal{I}, \mathcal{A}]$.

> [!theorem] Proposition 6.1.1: Cones are Representable (BCT, Ch. 6.1)
> There is a natural isomorphism
> $$
> \mathrm{Cone}(A, D) \cong [\mathcal{I}, \mathcal{A}](\Delta A, D)
> $$
> So the functor $\mathrm{Cone}(-,D): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$, $A \mapsto \mathrm{Cone}(A,D)$, is the functor $[\mathcal{I},\mathcal{A}](\Delta -, D)$.
^cones-representable

A **limit** of $D$ is a representation of $\mathrm{Cone}(-,D)$: an object $L \in \mathcal{A}$ and a natural isomorphism $\mathrm{Cone}(-,D) \cong \mathcal{A}(-, L)$.

### Limits are Unique Up to Isomorphism

> [!theorem] Corollary 6.1.2: Limits Are Unique (BCT, Ch. 6.1)
> If $L$ and $L'$ both represent $\mathrm{Cone}(-,D)$ (i.e., are both limits of $D$), then $L \cong L'$ via a unique isomorphism compatible with the universal cones.
^limit-unique

*Proof*: Any two representations of the same functor are isomorphic, by the Yoneda lemma ([[Representables/Yoneda Embedding and Consequences#^unique-rep]]).

### The Limit Functor and Its Adjoint

> [!theorem] Proposition 6.1.4: $\lim \dashv \Delta$ (BCT, Ch. 6.1)
> If $\mathcal{A}$ has all limits of shape $\mathcal{I}$, then the limit construction is a functor $\lim: [\mathcal{I}, \mathcal{A}] \to \mathcal{A}$ that is **right adjoint** to the diagonal functor $\Delta: \mathcal{A} \to [\mathcal{I}, \mathcal{A}]$.
>
> The adjunction bijection is:
> $$
> [\mathcal{I}, \mathcal{A}](D, \Delta A) \cong \mathcal{A}(A, \lim D)
> $$
> Wait — actually this is for limits: $[\mathcal{I},\mathcal{A}](\Delta A, D) \cong \mathcal{A}(A, \lim D)$, so $\Delta \dashv \lim$.
^lim-adjoint

**Correction**: It is $\Delta \dashv \lim$ (diagonal is left adjoint to limit). The unit is the universal cone $\eta_D: \Delta(\lim D) \Rightarrow D$; the counit is $\varepsilon_A: \lim(\Delta A) \xrightarrow{\sim} A$ (limit of constant diagram is that object).

Dually, $\mathrm{colim} \dashv \Delta$: the diagonal is right adjoint to the colimit functor.

### Limits of Functors

> [!example] Example: Limits of Sequences (BCT, Ch. 6.1)
> For $\mathcal{I} = \mathbb{N}^{\mathrm{op}}$ (reverse natural numbers as a poset), a diagram $D: \mathcal{I} \to \mathcal{A}$ is a sequence $D_0 \leftarrow D_1 \leftarrow D_2 \leftarrow \cdots$ (inverse system). Its limit is the inverse limit $\varprojlim D_n$.
>
> Example in **Set**: $\varprojlim(\mathbb{Z}/p^n\mathbb{Z}) = \mathbb{Z}_p$ (the $p$-adic integers).

> [!example] Example: Limits Commute with Limits (BCT, Prop. 6.2.8)
> For any diagram shape $\mathcal{I}$ and $\mathcal{J}$ and any diagram $D: \mathcal{I} \times \mathcal{J} \to \mathcal{A}$:
> $$
> \lim_{I \in \mathcal{I}} \lim_{J \in \mathcal{J}} D(I,J) \cong \lim_{J \in \mathcal{J}} \lim_{I \in \mathcal{I}} D(I,J) \cong \lim_{\mathcal{I} \times \mathcal{J}} D
> $$
> whenever the relevant limits exist.

## Connections

- **Limits in presheaf categories** ([[Limits in Presheaf Categories]]): in $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$, limits are pointwise — this is computed via the representability of cones.
- **Adjoints and limits** ([[Adjoints and Limits]]): the right adjoint $\lim$ preserves limits; the left adjoint $\mathrm{colim}$ preserves colimits.
- **Yoneda** ([[Representables/Yoneda Embedding and Consequences]]): the Yoneda embedding preserves limits, proven using this representability.

## See Also

- [[Limits and Colimits/General Limits]] — Limit definition
- [[Representables/Representable Functors]] — What representability means
- [[Representables/Yoneda Lemma]] — Used to prove uniqueness
- [[Adjoints and Limits]] — Adjoint functors and limits
