---
title: Beck's Monadicity Theorem
tags:
  - source/ingested
  - topic/category-theory
  - type/theorem
  - doc/textbook
source: "[[raw/Riehl - Category Theory in Context.pdf]]"
source_location: "Ch. 5, §5.3–5.6, esp. Theorem 5.5.1, pp. 193-215"
date_ingested: 2026-06-28
folder: "Category Theory/Monads"
doc_type: textbook
depends_on:
  - "[[Algebras for a Monad - Eilenberg-Moore and Kleisli]]"
  - "[[Adjunctions Induce Monads]]"
  - "[[Adjoint Functors]]"
used_by: []
aliases:
  - Monadicity Theorem
  - Beck's Theorem
  - Precise Tripleability Theorem
  - PTT
  - Monadic Functor
  - Split Coequalizer
  - U-split Coequalizer
---

# Beck's Monadicity Theorem

> [!summary]
> A right adjoint $U\colon\mathsf{D}\to\mathsf{C}$ is **monadic** — meaning the comparison functor $K\colon\mathsf{D}\to\mathsf{C}^T$ to the [[Algebras for a Monad - Eilenberg-Moore and Kleisli|Eilenberg–Moore category]] of its induced monad is an equivalence, so $\mathsf{D}$ "is" the category of algebras — **if and only if $U$ creates coequalizers of $U$-split pairs** (Beck, Theorem 5.5.1). The key technical tool is the **split coequalizer**, an *absolute* colimit (preserved by every functor), together with the fact that every algebra is canonically a coequalizer of free algebras (Proposition 5.4.2). Monadicity is powerful: a monadic functor **reflects isomorphisms** and **creates all limits** (and the colimits the monad preserves), so categories monadic over $\mathsf{Set}$ — groups, rings, modules, lattices, compact Hausdorff spaces — are automatically complete and (for finitary monads) cocomplete.

## Overview

Having seen that every adjunction induces a monad ([[Adjunctions Induce Monads]]) and every monad has an Eilenberg–Moore adjunction ([[Algebras for a Monad - Eilenberg-Moore and Kleisli]]), the recognition problem is: *when is a given adjunction (up to equivalence) the Eilenberg–Moore adjunction of its monad?* Equivalently, when does $\mathsf{D}$ coincide with the category of algebras? Beck's monadicity theorem answers this with a checkable condition about a special class of coequalizers.

## Main Content

> [!definition] Monadic adjunction / monadic functor (Definition 5.3.1)
> An adjunction $F\dashv U\colon\mathsf{C}\rightleftarrows\mathsf{D}$ is **monadic** if the canonical comparison functor $K\colon\mathsf{D}\to\mathsf{C}^T$ (Proposition 5.2.13) to the Eilenberg–Moore category of the induced monad $T = UF$ is an **equivalence of categories**. A functor $U\colon\mathsf{D}\to\mathsf{C}$ is **monadic** if it admits a left adjoint defining a monadic adjunction. It is **strictly monadic** if $K$ is an *isomorphism* of categories. ^def-monadic

> [!definition] Split coequalizer (Definition 5.4.4)
> A **split coequalizer** consists of maps
> $$
> x \underset{g}{\overset{f}{\rightrightarrows}} y \xrightarrow{\ h\ } z, \qquad \text{with sections } t\colon y\to x,\ s\colon z\to y,
> $$
> satisfying $\;hf = hg,\quad hs = \mathrm{id}_z,\quad gt = \mathrm{id}_y,\quad ft = sh.$ The condition $hf=hg$ makes $h$ a **fork** under the pair $f,g$. ^def-splitcoeq

> [!theorem] Split coequalizers are absolute (Lemma 5.4.6)
> The underlying fork of a split coequalizer **is a coequalizer**. Moreover it is an **absolute colimit**: it is preserved by *every* functor (the universal property is witnessed by equations, $ks = kft = kgt = k$, which any functor respects). ^thm-absolute

> [!definition] $U$-split coequalizer; creating coequalizers (Definition 5.4.8)
> Given $U\colon\mathsf{D}\to\mathsf{C}$:
> - A **$U$-split coequalizer** is a parallel pair $f,g\colon x\rightrightarrows y$ in $\mathsf{D}$ together with an extension of $Uf,Ug$ to a split coequalizer in $\mathsf{C}$.
> - $U$ **creates coequalizers of $U$-split pairs** if any such pair admits a coequalizer in $\mathsf{D}$ whose image under $U$ is (isomorphic to) the given split coequalizer, and any such fork in $\mathsf{D}$ is a coequalizer.
> - $U$ **strictly creates** them if there is a *unique* lift to a coequalizer in $\mathsf{D}$. ^def-usplit

> [!note] Every algebra is a coequalizer of free algebras (Proposition 5.4.2)
> For a monad $(T,\eta,\mu)$ and a $T$-algebra $(A,a\colon TA\to A)$, the diagram
> $$
> (T^2A,\mu_{TA}) \underset{\mu_A}{\overset{Ta}{\rightrightarrows}} (TA,\mu_A) \xrightarrow{\ a\ } (A,a)
> $$
> is a **coequalizer in $\mathsf{C}^T$** — the "canonical presentation" of an algebra as a quotient of *free* algebras (generalizing presentation by generators and relations). Its underlying fork in $\mathsf{C}$ is the split coequalizer $T^2A\rightrightarrows TA\to A$ of Example 5.4.7 (with splittings $\eta_{TA},\eta_A$). The monadic forgetful functor $U^T\colon\mathsf{C}^T\to\mathsf{C}$ **strictly creates coequalizers of $U^T$-split pairs** (Proposition 5.4.9). ^note-presentation

> [!theorem] Beck's Monadicity Theorem (Theorem 5.5.1)
> **A right adjoint functor $U\colon\mathsf{D}\to\mathsf{C}$ is monadic if and only if it creates coequalizers of $U$-split pairs.**
>
> More precisely, for the canonical comparison $K\colon\mathsf{D}\to\mathsf{C}^T$, the following are equivalent:
> 1. $K$ is an equivalence (respectively, isomorphism) of categories;
> 2. $U$ creates (respectively, strictly creates) coequalizers of $U$-split pairs.
>
> Due to Beck [Bec67]; sometimes called the **PTT** ("precise tripleability theorem" — "triple" is an old synonym for "monad"; "precise" because the condition is necessary *and* sufficient). ^thm-beck

> [!note] Proof skeleton
> $(1)\Rightarrow(2)$: a monadic adjunction is, up to the equivalence $K$, the Eilenberg–Moore adjunction, and $U^T$ strictly creates such coequalizers (Proposition 5.4.9 / Corollary 5.4.10). $(2)\Rightarrow(1)$: assuming $U$ creates coequalizers of $U$-split pairs, build an inverse equivalence $L\colon\mathsf{C}^T\to\mathsf{D}$ by setting $L(TA,\mu_A):=FA$ on free algebras and, for a general algebra $(A,a)$, letting $L(A,a)$ be the coequalizer in $\mathsf{D}$ of $FUFA\rightrightarrows FA$ (which exists because the parallel pair $Fa,\epsilon_{FA}$ is $U$-split by Example 5.4.7). One checks $LK\cong\mathrm{id}_\mathsf{D}$ and $KL\cong\mathrm{id}_{\mathsf{C}^T}$. ∎ ^proof-beck

> [!theorem] Variants: crude/vulgar/reflexive tripleability
> Inverse-equivalence constructions adapt to other hypotheses; the literature attaches three-letter acronyms (PTT, plus the **crude (CTT)** and **vulgar (VTT)** tripleability theorems, [ML98a §VI.7]). One practical variant:
> - **Reflexive (crude) tripleability — Proposition 5.5.8.** If $U\colon\mathsf{D}\to\mathsf{C}$ has a left adjoint and (i) $\mathsf{D}$ has coequalizers of *reflexive* pairs, (ii) $U$ preserves coequalizers of reflexive pairs, and (iii) $U$ reflects isomorphisms, then $U$ is monadic. *(A parallel pair $f,g\colon A\rightrightarrows B$ is **reflexive** if $f,g$ admit a common section $s\colon B\to A$.)*
> - **Alternate form (Exercise 5.6.i, via Exercise 3.4.iii):** $U$ is monadic iff $U$ has a left adjoint, reflects isomorphisms, and $\mathsf{D}$ has and $U$ preserves coequalizers of $U$-split pairs. ^thm-variants

## Examples

> [!example] Monadic over $\mathsf{Set}$ (Corollary 5.5.3, 5.5.6, 5.5.7)
> The free $\dashv$ forgetful adjunctions make the following **monadic over $\mathsf{Set}$**:
> $\mathsf{Monoid}$, $\mathsf{Group}$, $\mathsf{Ab}$, $\mathsf{Ring}$, $\mathsf{CRing}$ (and non-unital variants); $\mathsf{Set}^{BG}$, $R\text{-}\mathsf{Mod}$, $\mathsf{Vect}_\Bbbk$, affine spaces $\mathsf{Aff}_\Bbbk$; $\mathsf{Lattice}$ (and meet/join semilattices); pointed sets $\mathsf{Set}_*$; and **compact Hausdorff spaces** $\mathsf{cHaus}$ (Corollary 5.5.6, proof via Kuratowski closure operators — uses that split coequalizers are absolute). The proof for $\mathsf{Monoid}$ verifies Beck's condition directly: $U\colon\mathsf{Monoid}\to\mathsf{Set}$ strictly creates the coequalizer of any pair of homomorphisms whose underlying functions extend to a split coequalizer. ^ex-monadicset

> [!example] $\mathsf{Set}^{op}$ is monadic (Paré, Theorem 5.5.9)
> The **contravariant power-set functor** $P\colon\mathsf{Set}^{op}\to\mathsf{Set}$ is monadic. The proof applies the reflexive tripleability theorem (Prop 5.5.8), using that $P$ is self-adjoint (from the [[Cartesian Closed Categories|cartesian closed]] structure $\mathsf{Set}(A,PB)\cong\mathsf{Set}(B,PA)$), that $\mathsf{Set}^{op}$ has the needed coequalizers, and that $P$ reflects isomorphisms (via the subobject classifier $\Omega$). The argument generalizes to any elementary topos. ^ex-paretheorem

> [!example] Non-examples
> $U\colon\mathsf{Field}\to\mathsf{Set}$ is **not** monadic (it has no left adjoint). $U\colon\mathsf{Top}\to\mathsf{Set}$ and $U\colon\mathsf{Poset}\to\mathsf{Set}$ are **not** monadic: a monadic functor reflects isomorphisms (Lemma 5.6.1), but there are bijective continuous maps that are not homeomorphisms and bijective monotone maps that are not order-isomorphisms. ^ex-nonexamples

## What monadicity buys you (§5.6)

> [!theorem] Limits and colimits in categories of algebras
> Let $U\colon\mathsf{A}\to\mathsf{C}$ be monadic.
> - **Lemma 5.6.1:** $U$ **reflects isomorphisms** (is *conservative*).
> - **Theorem 5.6.5:** $U$ **creates** (i) any limits $\mathsf{C}$ has, and (ii) any colimits $\mathsf{C}$ has that the monad $T$ and $T^2$ preserve.
> - **Corollary 5.6.7:** any category monadic over $\mathsf{Set}$ is **complete**, with limits created by the forgetful functor (and $\mathsf{Set}$ is cocomplete, Corollary 5.6.9).
> - **Corollary 5.6.6:** a reflective subcategory of a complete category is complete.
> - **Proposition 5.6.11 / Theorem 5.6.12:** if $\mathsf{C}$ is cocomplete and $U$ monadic, then $\mathsf{A}$ is cocomplete iff it has coequalizers; a **finitary** monad on a complete, cocomplete, locally small $\mathsf{C}$ yields a complete and cocomplete $\mathsf{C}^T$. (A functor is **finitary** if it preserves filtered colimits; **categories of models for an algebraic theory** are finitary-monadic over $\mathsf{Set}$, Def 5.5.4–5.5.5, and are cocomplete, Corollary 5.6.14.) ^thm-limitscolimits

## Connections

- **Directly continues [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]:** "monadic" means the comparison functor $K\colon\mathsf{D}\to\mathsf{C}^T$ there is an equivalence.
- **Uses [[Adjunctions Induce Monads]]:** the monad $T = UF$ being recognized is the one induced by the adjunction.
- **Idempotent case:** the inclusion of a **reflective subcategory** is monadic (Proposition 5.3.3), giving the cleanest examples; the induced monad is idempotent.
- **Connects to [[Adjoint Functor Theorems]]:** constructing colimits of algebras (Theorem 5.6.12) invokes the General Adjoint Functor Theorem and the solution-set condition; finitary monads correspond to locally finitely presentable categories / Lawvere theories.
- **Relies on [[Cartesian Closed Categories]]** for Paré's theorem (self-adjoint power-set functor).

## See Also

- [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]
- [[Adjunctions Induce Monads]]
- [[Monads and the Monad Laws]]
- [[Monads - Overview]]
- [[Adjoint Functors]] · [[Adjoint Functor Theorems]] · [[Cartesian Closed Categories]]
- Source: [[raw/Riehl - Category Theory in Context.pdf]]
