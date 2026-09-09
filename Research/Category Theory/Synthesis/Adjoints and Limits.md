---
title: "Adjoints and Limits"
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 6.3, pp. 157–163"
date_ingested: 2026-05-08
doc_type: textbook
folder: "Category Theory/Synthesis"
depends_on:
  - "[[Adjunctions/Adjoint Functors]]"
  - "[[Limits and Colimits/General Limits]]"
  - "[[Limits and Colimits/Colimits]]"
  - "[[Limits and Colimits/Functors and Limits]]"
used_by:
  - "[[Adjoint Functor Theorems]]"
aliases:
  - right adjoints preserve limits
  - left adjoints preserve colimits
  - RAPL
  - LAPC
---

# Adjoints and Limits

> [!summary]
> Right adjoint functors preserve all small limits; left adjoint functors preserve all small colimits. This is one of the most useful theorems in category theory: to show a functor preserves limits, it suffices to find a left adjoint to it. Many concrete preservation results (e.g., hom-functors preserve limits) follow as special cases.

## Overview

The connection between adjunctions and limits is the central theorem of Chapter 6: the three subjects of the book (adjunctions, representables, limits) are unified. The adjoint/limit theorem is proved using the Yoneda lemma.

## Main Content

> [!theorem] Theorem 6.3.1: Right Adjoints Preserve Limits (BCT, Ch. 6.3)
> If $F \dashv G$ (so $F: \mathcal{A} \to \mathcal{B}$ and $G: \mathcal{B} \to \mathcal{A}$), then:
> - $G$ preserves all small limits: $G(\lim D) \cong \lim(GD)$ for any small diagram $D: \mathcal{I} \to \mathcal{B}$.
> - $F$ preserves all small colimits: $F(\mathrm{colim}\, D) \cong \mathrm{colim}(FD)$ for any small diagram $D: \mathcal{I} \to \mathcal{A}$.
^adjoints-limits

*Proof (for limits)*: For any $A \in \mathcal{A}$:
$$\mathcal{A}(A, G(\lim D)) \cong \mathcal{B}(FA, \lim D) \cong \lim_I \mathcal{B}(FA, DI) \cong \lim_I \mathcal{A}(A, GDI) \cong \mathcal{A}(A, \lim(GD))$$
By the Yoneda lemma, $G(\lim D) \cong \lim(GD)$.

### Examples and Applications

> [!example] Example: Forgetful Functors Preserve Limits (BCT, Ch. 6.3)
> The forgetful functor $U: \mathbf{Grp} \to \mathbf{Set}$ is a right adjoint (to the free group functor $F$), so $U$ preserves all limits. In particular: products of groups have the correct underlying set, the equalizer of group homomorphisms is the set-theoretic equalizer with inherited group structure.

> [!example] Example: Hom-Functors Preserve Limits (BCT, Prop. 6.2.2)
> For any $A \in \mathcal{A}$, $\mathcal{A}(A,-): \mathcal{A} \to \mathbf{Set}$ is a right adjoint (it has a left adjoint when $\mathcal{A}$ has coproducts: $- \sqcup A$... actually this is representability). More directly: $\mathcal{A}(A,-)$ is representable/right adjoint in the appropriate sense, hence preserves limits.

> [!example] Example: Tensor Product Preserves Colimits (BCT, Ch. 6.3)
> In $\mathbf{Ab}$ or $R$-$\mathbf{Mod}$, $M \otimes_R -$ is a left adjoint (to $\mathrm{Hom}_R(M,-)$), so it preserves all colimits. In particular: $M \otimes_R (A \oplus B) \cong (M \otimes_R A) \oplus (M \otimes_R B)$.

> [!example] Example: Free Functor Preserves Colimits (BCT, Ch. 6.3)
> The free group functor $F: \mathbf{Set} \to \mathbf{Grp}$ is a left adjoint, so it preserves colimits. In particular: $F(X \sqcup Y) \cong FX * FY$ (free group on a disjoint union is the free product of free groups).

### Corollary: Complete Categories

If $\mathcal{A}$ has all small limits, then the limit functor $\lim: [\mathcal{I}, \mathcal{A}] \to \mathcal{A}$ is a right adjoint (to $\Delta$), so it preserves limits — limits commute with limits (cf. [[Limits in Presheaf Categories#^limits-commute]]).

### What Is NOT Preserved

- Right adjoints do **not** generally preserve colimits. Example: $U: \mathbf{Grp} \to \mathbf{Set}$ does not preserve coproducts (the coproduct of groups is the free product, much larger than the disjoint union of underlying sets).
- Left adjoints do **not** generally preserve limits.

## Connections

- **Adjoint functor theorems** ([[Adjoint Functor Theorems]]): conversely, functors that preserve limits and satisfy a solution-set condition have left adjoints (GAFT), or right adjoints if they preserve colimits (SAFT).
- **Continuous functors** ([[Limits and Colimits/Functors and Limits]]): "right adjoint" implies "continuous."

## See Also

- [[Adjunctions/Adjoint Functors]] — Adjunction definition
- [[Limits and Colimits/Functors and Limits]] — Preservation/reflection/creation
- [[Adjoint Functor Theorems]] — Converse direction
