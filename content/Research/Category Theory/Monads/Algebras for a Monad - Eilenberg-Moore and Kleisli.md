---
title: Algebras for a Monad - Eilenberg-Moore and Kleisli
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/Riehl - Category Theory in Context.pdf]]"
source_location: "Ch. 5, §5.2 (Adjunctions from monads), pp. 185-192"
date_ingested: 2026-06-28
folder: "Category Theory/Monads"
doc_type: textbook
depends_on:
  - "[[Monads and the Monad Laws]]"
  - "[[Adjunctions Induce Monads]]"
  - "[[Adjoint Functors]]"
used_by:
  - "[[Beck's Monadicity Theorem]]"
aliases:
  - Eilenberg-Moore Category
  - Category of T-Algebras
  - Kleisli Category
  - Free Algebra
  - Comparison Functor
  - T-Algebra
---

# Algebras for a Monad — Eilenberg–Moore and Kleisli

> [!summary]
> Every monad $(T,\eta,\mu)$ on $\mathsf{C}$ arises from an adjunction — in two canonical, universal ways. A **$T$-algebra** is a pair $(A, a\colon TA\to A)$ whose action satisfies a unit law $a\cdot\eta_A = \mathrm{id}_A$ and an associativity law $a\cdot Ta = a\cdot\mu_A$; these form the **Eilenberg–Moore category $\mathsf{C}^T$** (the *category of $T$-algebras*), with a free $\dashv$ forgetful adjunction $F^T\dashv U^T$ recovering $T$. The **Kleisli category $\mathsf{C}_T$** has the same objects as $\mathsf{C}$ but morphisms $A\to TB$, and gives another adjunction $F_T\dashv U_T$ recovering $T$; it is (equivalent to) the full subcategory of **free** $T$-algebras. Among *all* adjunctions inducing $T$, Kleisli is **initial** and Eilenberg–Moore is **terminal**, and the **comparison functor** $K\colon\mathsf{C}_T\to\mathsf{C}^T$ is full and faithful with image the free algebras.

## Overview

[[Adjunctions Induce Monads|Lemma 5.1.3]] shows every adjunction induces a monad. Conversely, *every monad arises from an adjunction*: "perhaps surprisingly, the answer is yes — and from two (typically distinct) adjunctions that are moreover *universal* with this property." A monad is a syntactic presentation of algebraic structure; its **algebras** are the actual structured objects (e.g. for the free-monoid monad, the algebras are monoids). This note gives both constructions and the comparison between them; whether the comparison to $\mathsf{C}^T$ is an *equivalence* is the subject of [[Beck's Monadicity Theorem]].

## Main Content

> [!definition] $T$-algebra and the Eilenberg–Moore category $\mathsf{C}^T$ (Definition 5.2.4)
> Let $(T,\eta,\mu)$ be a monad on $\mathsf{C}$. The **Eilenberg–Moore category** $\mathsf{C}^T$, or **category of $T$-algebras**, has:
> - **objects** = pairs $(A,\, a\colon TA\to A)$ ($a$ is the *algebra structure map*) such that the diagrams (5.2.5) commute:
>   - **unit:** $\;a\cdot\eta_A = \mathrm{id}_A$ ($\;A\xrightarrow{\eta_A}TA\xrightarrow{a}A$ equals the identity);
>   - **associativity:** $\;a\cdot Ta = a\cdot\mu_A\colon T^2A\to A$;
> - **morphisms** $f\colon(A,a)\to(B,b)$ = **$T$-algebra homomorphisms**: maps $f\colon A\to B$ in $\mathsf{C}$ such that the square commutes, $\;f\cdot a = b\cdot Tf$.
>
> Composition and identities are as in $\mathsf{C}$. ^def-em

> [!definition] Free $T$-algebra and the free functor (Definition 5.2.8)
> For each $A\in\mathsf{C}$ the **free $T$-algebra** is $(TA,\ \mu_A\colon T^2A\to TA)$; the algebra axioms (5.2.5) hold by the monad's own unit and associativity laws. This is functorial: the **free functor** $F^T\colon\mathsf{C}\to\mathsf{C}^T$ sends $A\mapsto(TA,\mu_A)$ and $f\colon A\to B$ to the homomorphism $F^Tf := Tf\colon(TA,\mu_A)\to(TB,\mu_B)$ (a homomorphism by naturality of $\mu$). ^def-free

> [!theorem] Eilenberg–Moore adjunction $F^T\dashv U^T$ (Lemma 5.2.9)
> For any monad $(T,\eta,\mu)$ on $\mathsf{C}$ there is an adjunction
> $$
> \mathsf{C} \underset{U^T}{\overset{F^T}{\rightleftarrows}} \mathsf{C}^T
> $$
> whose **underlying monad is $(T,\eta,\mu)$**. Here $U^T$ is the **forgetful** functor $(A,a)\mapsto A$ and $F^T$ is the free functor; note $U^TF^T = T$. The unit is $\eta\colon\mathrm{id}_\mathsf{C}\Rightarrow T$, and the counit $\epsilon\colon F^TU^T\Rightarrow\mathrm{id}_{\mathsf{C}^T}$ has components given by the **algebra structure map itself**:
> $$
> \epsilon_{(A,a)} := \big(\,(TA,\mu_A)\xrightarrow{\ a\ }(A,a)\,\big).
> $$
> In particular $U^T\epsilon F^T = \mu$, so the monad underlying $F^T\dashv U^T$ is exactly $(T,\eta,\mu)$. ^thm-emadj

> [!definition] Kleisli category $\mathsf{C}_T$ (Definition 5.2.10)
> The **Kleisli category** $\mathsf{C}_T$ is defined by:
> - **objects** = the objects of $\mathsf{C}$;
> - **morphisms** $A\rightsquigarrow B$ = morphisms $A\to TB$ in $\mathsf{C}$.
>
> The **identity** on $A$ is $\eta_A\colon A\to TA$. The **composite** of $f\colon A\to TB$ with $g\colon B\to TC$ is the *Kleisli composite*
> $$
> A \xrightarrow{\ f\ } TB \xrightarrow{\ Tg\ } T^2C \xrightarrow{\ \mu_C\ } TC.
> $$
> (Associativity and unitality of this composition are the monad laws.) ^def-kleisli

> [!theorem] Kleisli adjunction $F_T\dashv U_T$ (Lemma 5.2.12)
> For any monad on $\mathsf{C}$ there is an adjunction $F_T\dashv U_T\colon\mathsf{C}\rightleftarrows\mathsf{C}_T$ whose underlying monad is $(T,\eta,\mu)$. The left adjoint $F_T$ is the identity on objects and sends $f\colon A\to B$ to $F_Tf := \eta_B\cdot f\ (A\rightsquigarrow B)$; the right adjoint $U_T$ sends $A\mapsto TA$ and a Kleisli map $g\colon A\rightsquigarrow B$ (i.e. $g\colon A\to TB$) to $U_Tg := \mu_B\cdot Tg\colon TA\to TB$. The hom-set isomorphism is $\mathsf{C}_T(F_TA,B)\cong\mathsf{C}(A,U_TB)$, both $\cong\mathsf{C}(A,TB)$. ^thm-kleisliadj

> [!theorem] Universal property: Kleisli initial, Eilenberg–Moore terminal (Proposition 5.2.13)
> Let $\mathsf{Adj}_T$ be the category of adjunctions $F\dashv U\colon\mathsf{C}\rightleftarrows\mathsf{D}$ that induce the monad $(T,\eta,\mu)$ on $\mathsf{C}$ (morphisms = functors commuting with both adjoints). Then the **Kleisli adjunction is initial** and the **Eilenberg–Moore adjunction is terminal**: for any $F\dashv U$ inducing $T$ there exist unique functors
> $$
> \mathsf{C}_T \xrightarrow{\ J\ } \mathsf{D} \xrightarrow{\ K\ } \mathsf{C}^T
> $$
> commuting with the left and right adjoints. ^thm-universal

> [!theorem] The comparison functor (Lemma 5.2.14)
> The canonical **comparison functor** $K\colon\mathsf{C}_T\to\mathsf{C}^T$ (from Prop 5.2.13, $D=\mathsf{C}_T$) is **full and faithful**, and its image consists exactly of the **free $T$-algebras**: $Kc = (Tc,\mu_c)$. Thus the Kleisli category embeds as the full subcategory of free $T$-algebras and all maps between them. Consequently $\mathsf{C}_T\simeq\mathsf{C}^T$ **iff every algebra is free** — e.g. for the free vector space monad (every vector space is free on a basis), or the maybe monad ($\mathsf{Set}_\partial\simeq\mathsf{Set}_*$). ^thm-comparison

## Examples

> [!example] Algebras = the expected structured objects
> - **Free-monoid (list) monad** (Example 5.2.6(iii) / p. 188): a $T$-algebra is a set $A$ with an $n$-ary operation for each $n$ (a map $\coprod_{n\ge 0}A^n\to A$); the unit law forces the unary operation to be the identity and the associativity square forces the operations to come from a single associative binary operation with unit. The category of algebras is isomorphic to $\mathsf{Monoid}$.
> - **Maybe monad** (Example 5.2.6(i)): a $T$-algebra is a set with a chosen basepoint (the image of $*$); $\mathsf{Set}^{(-)_+}\cong\mathsf{Set}_*$.
> - **$R\otimes_\mathbb{Z}-$ monad on $\mathsf{Ab}$** (Example 5.2.6(ii)): an algebra is an $R$-module.
> - **Affine-combination monad** $\mathrm{Aff}_\Bbbk$ (Definition 5.2.3): an algebra is precisely an **affine space**.
> - **Closure operator** (Example 5.2.6(iv)): an algebra for the closure operator on subsets of a space is exactly a *closed subset*; dually a coalgebra for the interior operator is an *open subset*. ^ex-algebras

> [!example] Kleisli categories in computation
> - **Maybe monad** (Example 5.2.11(i)): Kleisli maps $A\rightsquigarrow B$ are **partially-defined functions** $A\to B$; $\mathsf{Set}_T\cong\mathsf{Set}_\partial$.
> - **Free-monoid monad** (5.2.11(ii)): a Kleisli map is a function $A\to\coprod_n B^n$ (each input yields a list of outputs).
> - **State monad** $S\times(-)\dashv(-)^S$ (5.2.11(iii)): a Kleisli map is a function $A\times S\to B\times S$ — input + current state ↦ output + updated state; this models stateful computation ("side effects") in functional languages.
> - **Giry monad** (5.2.11(iv)): Kleisli maps are **Markov kernels**; an endomorphism is a *discrete-time Markov chain*. ^ex-kleisli

## Connections

- **Definitions reuse the monad laws:** the algebra axioms of [[Algebras for a Monad - Eilenberg-Moore and Kleisli#^def-em|Definition 5.2.4]] are the [[Monads and the Monad Laws|monad's own unit & associativity laws]], now for an action $a\colon TA\to A$ rather than $\mu\colon T^2\to A$.
- **Closes the loop with [[Adjunctions Induce Monads]]:** both $F^T\dashv U^T$ and $F_T\dashv U_T$ have underlying monad $(T,\eta,\mu)$, proving every monad comes from an adjunction.
- **Sets up monadicity:** an adjunction is *monadic* exactly when its comparison $K\colon\mathsf{D}\to\mathsf{C}^T$ is an equivalence — see [[Beck's Monadicity Theorem]]. For an *idempotent* monad, $\mathsf{C}^T$ is a reflective subcategory and $\mathsf{C}_T\simeq\mathsf{C}^T$ (Proposition 5.3.3, Exercise 5.3.i).
- **Canonical presentations (§5.4):** every algebra $(A,a)$ is a coequalizer $(T^2A,\mu_{TA})\rightrightarrows(TA,\mu_A)\twoheadrightarrow(A,a)$ of *free* algebras (Proposition 5.4.2) — the categorical "generators and relations." See [[Beck's Monadicity Theorem]].

## See Also

- [[Monads and the Monad Laws]]
- [[Adjunctions Induce Monads]]
- [[Beck's Monadicity Theorem]]
- [[Adjoint Functors]] · [[Units and Counits]] · [[Monads - Overview]]
- Source: [[raw/Riehl - Category Theory in Context.pdf]]
