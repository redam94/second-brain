---
title: Adjunctions Induce Monads
tags:
  - source/ingested
  - topic/category-theory
  - type/concept
  - doc/textbook
source: "[[raw/Riehl - Category Theory in Context.pdf]]"
source_location: "Ch. 5, §5.1 (Monads from adjunctions), Lemma 5.1.3, pp. 180-181"
date_ingested: 2026-06-28
folder: "Category Theory/Monads"
doc_type: textbook
depends_on:
  - "[[Monads and the Monad Laws]]"
  - "[[Adjoint Functors]]"
  - "[[Units and Counits]]"
used_by:
  - "[[Algebras for a Monad - Eilenberg-Moore and Kleisli]]"
  - "[[Beck's Monadicity Theorem]]"
aliases:
  - Monad from an Adjunction
  - T = GF
  - Whiskered Counit Multiplication
---

# Adjunctions Induce Monads

> [!summary]
> **Every adjunction induces a monad.** Given $F\dashv U\colon\mathsf{C}\rightleftarrows\mathsf{D}$ with unit $\eta\colon\mathrm{id}_\mathsf{C}\Rightarrow UF$ and counit $\epsilon\colon FU\Rightarrow\mathrm{id}_\mathsf{D}$, the data $(T = UF,\ \eta,\ \mu = U\epsilon F)$ is a monad on $\mathsf{C}$ — the codomain of the right adjoint. The endofunctor is the composite $UF$, the unit is the adjunction's unit, and the multiplication is the **whiskered counit** $U\epsilon F\colon UFUF\Rightarrow UF$. The monad laws are precisely the [[Units and Counits|triangle identities]] (for the unit law) plus naturality of $\epsilon$ (for associativity). (Writing the right adjoint as $G$, this is the familiar construction $T = GF$, $\mu = G\epsilon F$.)

## Overview

This is the source of "almost all" monads in practice. Riehl frames it as the *shadow* an adjunction casts on the "home" category $\mathsf{C}$: from $\mathsf{C}$, in ignorance of $\mathsf{D}$, only the composite endofunctor $UF$, the unit $\eta$, and a whiskered version of the counit are visible — and exactly that data is a monad. The dual statement (Definition 5.1.6 / [[Monads and the Monad Laws#^def-comonad|comonad]]) is that an adjunction casts a *comonad* on $\mathsf{D}$, the codomain of the left adjoint.

The converse question — *does every monad arise this way?* — is answered "yes" in [[Algebras for a Monad - Eilenberg-Moore and Kleisli]] (two canonical such adjunctions: Kleisli and Eilenberg–Moore).

## Main Content

> [!theorem] Every adjunction gives a monad (Lemma 5.1.3)
> Any adjunction
> $$\mathsf{C} \underset{U}{\overset{F}{\rightleftarrows}} \mathsf{D}, \qquad \eta\colon\mathrm{id}_\mathsf{C}\Rightarrow UF, \quad \epsilon\colon FU\Rightarrow\mathrm{id}_\mathsf{D}$$
> gives rise to a **monad on the category $\mathsf{C}$** serving as the codomain of the right adjoint $U$, with
> - the **endofunctor** $T := UF$,
> - the **unit** $\eta\colon\mathrm{id}_\mathsf{C}\Rightarrow UF$ of the adjunction serving as the monad unit $\eta\colon\mathrm{id}_\mathsf{C}\Rightarrow T$, and
> - the **whiskered counit** $U\epsilon F\colon UFUF\Rightarrow UF$ serving as the multiplication $\mu\colon T^2\Rightarrow T$.
>
> Equivalently, with the right adjoint named $G$: $T = GF$ and $\mu = G\epsilon F$. ^thm-lemma513

> [!note] Proof idea
> The two **unit-law triangles** for the monad,
> $$UF \xrightarrow{\eta UF} UFUF \xleftarrow{UF\eta} UF, \qquad U\epsilon F \text{ down the middle, } \mathrm{id}_{UF} \text{ on the diagonals,}$$
> commute **by the triangle identities of the adjunction** ($\epsilon F\cdot F\eta = \mathrm{id}_F$ and $U\epsilon\cdot\eta U = \mathrm{id}_U$, whiskered appropriately). The **associativity square**,
> $$UFUFUF \xrightarrow{UFU\epsilon F} UFUF, \qquad U\epsilon FUF \big\downarrow \quad \big\downarrow U\epsilon F, \qquad UFUF \xrightarrow{U\epsilon F} UF,$$
> commutes **by naturality of the vertical natural transformation $U\epsilon\colon UFU\Rightarrow U$**. The two composites $U\epsilon F\cdot UFU\epsilon F$ and $U\epsilon F\cdot U\epsilon FUF$ together define the horizontal composite of $\epsilon$ with itself. ∎ ^proof-513

## Examples

> [!example] $\mathsf{Set}\rightleftarrows\mathsf{Ab}$ → free abelian group monad
> Take the free $\dashv$ forgetful adjunction $F\dashv U\colon\mathsf{Set}\rightleftarrows\mathsf{Ab}$, then "forget abelian groups entirely." What remains on $\mathsf{Set}$: the endofunctor $UF$ sends a set to the set of *finite formal integer sums* of its elements; the unit $\eta_S\colon S\to UFS$ sends an element to its singleton sum; and the multiplication $U\epsilon F$ has components that are instances of the **evaluation map** (regarded as a function, not a group homomorphism) on free groups. The counit $\epsilon_A\colon FUA\to A$ itself (evaluate a formal sum to its actual sum in $A$) is *not* visible from $\mathsf{Set}$ — only its whiskering is. ^ex-ab

> [!example] Free $\dashv$ forgetful adjunctions
> Each canonical monad on $\mathsf{Set}$ (see [[Monads and the Monad Laws#Examples]]) arises this way:
> - pointed sets ⊣ → **maybe monad** $(-)_+$;
> - monoids ⊣ → **list / free-monoid monad** $\coprod_{n\ge 0}A^n$;
> - $R$-modules ⊣ → **free $R$-module monad** $R[-]$; groups ⊣ → **free group monad**;
> - $\mathsf{Set}\to\mathsf{Top}\to\mathsf{cHaus}$ (composite adjunction) → **Stone–Čech / ultrafilter monad** $\beta$;
> - quivers ⊣ $\mathsf{Cat}$ → the **free-category monad** on quivers. ^ex-free
>
> Adjunctions need not be of "free ⊣ forgetful" type: the self-adjoint **contravariant power-set functor** $P\colon\mathsf{Set}^{op}\rightleftarrows\mathsf{Set}$ induces the **double power-set monad** $P^2$ (Example 5.1.4(vii)).

> [!note] Reflective subcategories → idempotent monads
> When $F\dashv U$ exhibits $\mathsf{D}$ as a **reflective subcategory** of $\mathsf{C}$, the induced monad is **idempotent**: its multiplication $\mu\colon T^2\Rightarrow T$ is a natural *isomorphism* (Exercise 5.1.iii). Idempotent monads have a very simple algebra theory — see [[Algebras for a Monad - Eilenberg-Moore and Kleisli]] and [[Beck's Monadicity Theorem|Proposition 5.3.3]]. ^note-idempotent

## Connections

- **Upstream:** this is the concrete realization of the abstract [[Monads and the Monad Laws]]; the verification *is* the [[Units and Counits|triangle identities]] of [[Adjoint Functors]].
- **Downstream — the converse:** every monad arises from *some* adjunction. [[Algebras for a Monad - Eilenberg-Moore and Kleisli|§5.2]] constructs the two canonical ones (Kleisli $F_T\dashv U_T$ and Eilenberg–Moore $F^T\dashv U^T$); both have underlying monad exactly $(T,\eta,\mu)$.
- **Recognition:** an adjunction that recovers $\mathsf{D}$ from its monad is called *monadic* — see [[Beck's Monadicity Theorem]].
- **Comonad dual:** the same construction on $\mathsf{C}^{op}$ casts a comonad on $\mathsf{D}$ (the codomain of the left adjoint).

## See Also

- [[Monads and the Monad Laws]]
- [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]
- [[Beck's Monadicity Theorem]]
- [[Adjoint Functors]] · [[Units and Counits]] · [[Monads - Overview]]
- Source: [[raw/Riehl - Category Theory in Context.pdf]]
