---
title: Monads and the Monad Laws
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/Riehl - Category Theory in Context.pdf]]"
source_location: "Ch. 5, §5.1 (Monads from adjunctions), pp. 179-184"
date_ingested: 2026-06-28
folder: "Category Theory/Monads"
doc_type: textbook
depends_on:
  - "[[Monads - Overview]]"
  - "[[Functors]]"
  - "[[Natural Transformations]]"
used_by:
  - "[[Adjunctions Induce Monads]]"
  - "[[Algebras for a Monad - Eilenberg-Moore and Kleisli]]"
  - "[[Beck's Monadicity Theorem]]"
aliases:
  - Monad
  - Monad Laws
  - Unit and Multiplication
  - Monoid in the Category of Endofunctors
  - Comonad
---

# Monads and the Monad Laws

> [!summary]
> A **monad** on a category $\mathsf{C}$ is an endofunctor $T\colon\mathsf{C}\to\mathsf{C}$ equipped with two natural transformations — a **unit** $\eta\colon\mathrm{id}_\mathsf{C}\Rightarrow T$ and a **multiplication** $\mu\colon T^2\Rightarrow T$ — satisfying an **associativity law** $\mu\cdot T\mu = \mu\cdot\mu T$ and a **unit law** $\mu\cdot\eta T = \mathrm{id}_T = \mu\cdot T\eta$. These are exactly the associativity and unit axioms for a **monoid**, internalized in the strict monoidal category $\mathsf{C}^\mathsf{C}$ of endofunctors (composition as the tensor product, $\mathrm{id}_\mathsf{C}$ as the unit object). The dual notion on $\mathsf{C}^{op}$ is a **comonad**.

## Overview

The abstract definition is simple to state but it is the engine of the whole chapter. The data $(T,\eta,\mu)$ is "potentially borne by objects" — it is a syntactic description of an algebraic structure, which gets *interpreted* via [[Algebras for a Monad - Eilenberg-Moore and Kleisli|algebras]]. Crucially, the two coherence diagrams are *literally* the monoid axioms once one views composition of endofunctors as a (strict) monoidal product; see [[Monads - Overview]].

## Main Content

> [!definition] Monad (Definition 5.1.1)
> A **monad** on a category $\mathsf{C}$ consists of
> - an **endofunctor** $T\colon\mathsf{C}\to\mathsf{C}$,
> - a **unit** natural transformation $\eta\colon\mathrm{id}_\mathsf{C}\Rightarrow T$, and
> - a **multiplication** natural transformation $\mu\colon T^2\Rightarrow T$,
>
> so that the following diagrams commute in the functor category $\mathsf{C}^\mathsf{C}$:
>
> **Associativity.**
> $$
> T^3 \xrightarrow{\;T\mu\;} T^2, \qquad \mu T\big\downarrow \quad \big\downarrow\mu, \qquad T^2 \xrightarrow{\;\mu\;} T
> $$
> i.e. $\quad \mu \cdot T\mu \;=\; \mu \cdot \mu T \colon T^3 \Rightarrow T.$
>
> **Unit (left and right).** With $\eta T, T\eta\colon T \Rightarrow T^2$ flanking $\mu\colon T^2\Rightarrow T$ and identities on the diagonals:
> $$
> \mu \cdot \eta T \;=\; \mathrm{id}_T \;=\; \mu \cdot T\eta \colon T \Rightarrow T.
> $$
>
> Here $T\mu, \mu T$ etc. are *whiskered* composites of $\mu$ with $T$. ^def-monad

> [!note] A monad is a monoid in $\mathsf{C}^\mathsf{C}$ (Remark 5.1.2)
> The diagrams of Definition 5.1.1 are exactly the **associativity and unit laws for a monoid**. This is no coincidence: a **monad on $\mathsf{C}$ is precisely a monoid in the monoidal category** $\mathsf{C}^\mathsf{C}$ of endofunctors of $\mathsf{C}$, where the binary functor $\mathsf{C}^\mathsf{C}\times\mathsf{C}^\mathsf{C}\to\mathsf{C}^\mathsf{C}$ is **composition** and the unit object is the identity endofunctor $\mathrm{id}_\mathsf{C}$. (The category of endofunctors is a *strict* monoidal category, so the coherence isomorphisms are identities.) This is the precise content of Wadler's quip "a monad is a monoid in the category of endofunctors, what's the problem?" ^remark-monoid

> [!definition] Comonad (Definition 5.1.6)
> A **comonad** on $\mathsf{C}$ is a monad on $\mathsf{C}^{op}$: explicitly, an endofunctor $K\colon\mathsf{C}\to\mathsf{C}$ together with a **counit** $\epsilon\colon K\Rightarrow\mathrm{id}_\mathsf{C}$ and a **comultiplication** $\delta\colon K\Rightarrow K^2$ satisfying the dual coassociativity ($K\delta\cdot\delta = \delta K\cdot\delta$) and counit ($\epsilon K\cdot\delta = \mathrm{id}_K = K\epsilon\cdot\delta$) laws. A comonad is a comonoid in $\mathsf{C}^\mathsf{C}$; dually to [[Adjunctions Induce Monads|Lemma 5.1.3]], any adjunction induces a comonad on the codomain of its *left* adjoint. ^def-comonad

> [!example] Monads/comonads on a preorder (Example 5.1.7)
> A monad on a preorder $(\mathsf{P},\le)$ is an order-preserving function $T\colon\mathsf{P}\to\mathsf{P}$ with $p\le Tp$ and $T^2p\le Tp$. If $\mathsf{P}$ is a poset these force $T^2p = Tp$, and such a $T$ is a **closure operator**. Dually a comonad on a poset is a **kernel (interior) operator**: $Kp\le p$ and $Kp = K^2p$. *Example:* on the powerset $PX$ of subsets of a topological space, $A\mapsto\overline{A}$ (closure) is a closure operator and $A\mapsto A^\circ$ (interior) is a kernel operator. ^ex-preorder

## Examples

These are the canonical monads on $\mathsf{Set}$ (Examples 5.1.4–5.1.5); each comes from a free $\dashv$ forgetful adjunction (see [[Adjunctions Induce Monads]]):

> [!example] The free-monoid / list monad (Example 5.1.4(ii))
> Induced by the free $\dashv$ forgetful adjunction between monoids and sets. The endofunctor is
> $$
> TA \;:=\; \coprod_{n\ge 0} A^n,
> $$
> the set of finite **lists** of elements of $A$ (hence "list monad" in CS). The unit $\eta_A\colon A\to TA$ sends $a$ to the singleton list $[a]$ (the evident coproduct inclusion). The multiplication $\mu_A\colon T^2A\to TA$ is **concatenation**: it flattens a list of lists into a single list. ^ex-list

> [!example] The maybe monad (Example 5.1.4(i))
> Induced by the free $\dashv$ forgetful adjunction between pointed sets and sets. The endofunctor $(-)_+\colon\mathsf{Set}\to\mathsf{Set}$ adjoins a new disjoint basepoint, $A\mapsto A_+ := A\sqcup\{*\}$. The unit $\eta_A\colon A\to A_+$ is the inclusion; the multiplication $\mu_A\colon (A_+)_+\to A_+$ sends both new points to the single new point. In CS this models partially-defined ("nullable") values. ^ex-maybe

> [!example] The (covariant) power-set monad (Example 5.1.5(i))
> $P\colon\mathsf{Set}\to\mathsf{Set}$, the covariant power-set functor (acting on maps by *direct image* $f_*$). The unit $\eta_A\colon A\to PA$ sends $a$ to the singleton $\{a\}$; the multiplication $\mu_A\colon P^2A\to PA$ takes the **union** of a set of subsets. (Naturality of $\mu$ uses that direct image, being a left adjoint, preserves unions.) Related: the **double power-set monad** $P^2$ (Example 5.1.4(vii)) and, with $P$ replaced by an arbitrary set, the **continuation monads** $S^{S^{-}}$. ^ex-powerset

> [!example] Other notable monads
> - **Free $R$-module monad** $R[-]$ (Example 5.1.4(iii)): finite formal $R$-linear combinations; special cases are the free abelian group monad and free vector space monad.
> - **Free group monad** $A\mapsto F(A)$ of reduced words in letters $a, a^{-1}$ (Example 5.1.4(iv)).
> - **Ultrafilter / Stone–Čech monad** $\beta\colon\mathsf{Set}\to\mathsf{Set}$, $\beta(A) = $ the set of ultrafilters on $A$ (Example 5.1.4(v)).
> - **State monad** $S\times(-)$ and the **$- \times \mathbb{N}$** "discrete time" monad (Example 5.1.5(iii)); the **Giry monad** of probability measures on $\mathsf{Meas}$ (Example 5.1.5(iv)). ^ex-others

## Connections

- This definition is the abstract counterpart of the construction in [[Adjunctions Induce Monads]]: there $T = UF$, $\eta$ is the adjunction unit, and $\mu = U\epsilon F$, and the monad laws follow from the [[Units and Counits|triangle identities]].
- The laws reappear *verbatim* as the conditions defining an [[Algebras for a Monad - Eilenberg-Moore and Kleisli|algebra]] $(A, a\colon TA\to A)$ (unit and associativity of the action).
- Requires [[Functors]] (endofunctor) and [[Natural Transformations]] (the components $\eta, \mu$; whiskering $T\mu$, $\mu T$).
- See [[Monads - Overview]] for how these fit into the larger story.

## See Also

- [[Monads - Overview]]
- [[Adjunctions Induce Monads]]
- [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]
- [[Beck's Monadicity Theorem]]
- [[Natural Transformations]] · [[Functors]] · [[Units and Counits]]
- Source: [[raw/Riehl - Category Theory in Context.pdf]]
