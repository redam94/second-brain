---
title: "Functors and Limits"
tags:
  - source/ingested
  - topic/category-theory
  - type/concept
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 5.3, pp. 138–140"
date_ingested: 2026-05-08
date_updated: 2026-06-15
folder: "Category Theory/Limits and Colimits"
doc_type: textbook
depends_on:
  - "[[General Limits]]"
  - "[[Colimits]]"
  - "[[Foundations/Functors]]"
used_by:
  - "[[Synthesis/Adjoints and Limits]]"
  - "[[Synthesis/Limits via Representables]]"
aliases:
  - continuous functor
  - cocontinuous functor
  - preserves limits
  - reflects limits
  - creates limits
---

# Functors and Limits

> [!summary]
> A functor **preserves** a limit if it sends limit cones to limit cones. It **reflects** a limit if limit cones in the codomain pull back to limit cones in the domain. It **creates** a limit if limits in the domain can be constructed uniquely from limits in the codomain. Continuous functors preserve all small limits; right adjoints are always continuous.

## Overview

Not all functors interact well with limits. Understanding when a functor preserves, reflects, or creates limits is essential for transferring limit computations between categories. The key theorem — that right adjoints preserve limits — connects functors and limits to the theory of adjoint functors.

## Main Content

> [!definition] Definition 5.3.1: Preservation of Limits
> A functor $F: \mathcal{A} \to \mathcal{B}$ **preserves limits of shape $\mathcal{I}$** if: for every diagram $D: \mathcal{I} \to \mathcal{A}$ and every limit cone $\lambda: \Delta L \Rightarrow D$ in $\mathcal{A}$, the image $F\lambda: \Delta FL \Rightarrow FD$ is a limit cone in $\mathcal{B}$.
>
> Equivalently: $F(\lim D) \cong \lim(FD)$ and the canonical map is an isomorphism.
>
> $F$ is **continuous** if it preserves all small limits.
^preserves-limits-def

> [!definition] Definition 5.3.1: Reflection of Limits
> $F$ **reflects limits of shape $\mathcal{I}$** if: whenever $F\lambda$ is a limit cone in $\mathcal{B}$, $\lambda$ is a limit cone in $\mathcal{A}$.
^reflects-limits-def

> [!definition] Definition 5.3.5: Creation of Limits
> $F$ **creates limits of shape $\mathcal{I}$** if: for every diagram $D: \mathcal{I} \to \mathcal{A}$ such that $FD$ has a limit in $\mathcal{B}$, there exists a unique cone $\lambda$ over $D$ such that $F\lambda$ is a limit cone, and furthermore $\lambda$ is itself a limit cone.
^creates-limits-def

**Hierarchy**: Creation implies reflection; preservation is separate (one can preserve without reflecting and vice versa).

### Examples

> [!example] Example: Forgetful Functor Creates Limits (BCT, Ch. 5.3)
> The forgetful functor $U: \mathbf{Grp} \to \mathbf{Set}$ creates limits: limits in **Grp** are computed on the underlying sets and then given the inherited group structure. E.g., the product of groups has underlying set equal to the product of the underlying sets.
>
> This is a general phenomenon: if $\mathcal{A}$ is defined by "sets with structure," the forgetful functor typically creates limits (because structure is preserved by the set-theoretic limit construction).

> [!example] Example: Forgetful Functor Does Not Create Colimits (BCT, Ch. 5.3)
> The forgetful functor $U: \mathbf{Grp} \to \mathbf{Set}$ does NOT preserve/create coproducts: the coproduct (free product $G * H$) has a different underlying set from $UG \sqcup UH$.

### Lemma on Creating Limits

> [!theorem] Lemma 5.3.6 (BCT, Ch. 5.3)
> If $F: \mathcal{A} \to \mathcal{B}$ creates limits of shape $\mathcal{I}$ and $\mathcal{B}$ has limits of shape $\mathcal{I}$, then $\mathcal{A}$ has limits of shape $\mathcal{I}$ and $F$ preserves them.
^creates-implies-preserves

### Continuous Functors

> [!theorem] Key Fact: Right Adjoints Are Continuous (BCT, Ch. 6.3)
> If $F \dashv G$, then $G$ preserves all small limits: for any small diagram $D: \mathcal{I} \to \mathcal{B}$ with limit, $G(\lim D) \cong \lim(GD)$.
>
> Dually, left adjoints preserve all small colimits.
^adjoints-continuous

This is proved in [[Synthesis/Adjoints and Limits]]. It is one of the most useful practical theorems for computing limits.

**Examples of the adjoint/continuity theorem**:
- $U: \mathbf{Grp} \to \mathbf{Set}$ is a right adjoint (to the free group functor), so it preserves limits.
- $\mathcal{A}(A,-): \mathcal{A} \to \mathbf{Set}$ is a right adjoint (when $\mathcal{A}$ is locally small and has enough structure), so it preserves limits — this is Proposition 6.2.2.

## Connections

- The **adjoints and limits theorem** ([[Synthesis/Adjoints and Limits]]) proves that right adjoints preserve limits.
- **Continuous functors** are exactly the functors that commute with limits, relevant to accessibility and presentability.
- **Limits in presheaf categories** ([[Synthesis/Limits in Presheaf Categories]]): all hom-functors in $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ preserve limits.

## See Also

- [[General Limits]] — What is being preserved/reflected/created
- [[Colimits]] — Dual notions
- [[Synthesis/Adjoints and Limits]] — Key theorem: right adjoints preserve limits
- [[Products and Equalizers]] — concrete limit shapes that functors commonly preserve or create
