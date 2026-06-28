---
title: Monads and their Algebras — Index
tags:
  - type/index
  - source/ingested
  - topic/category-theory
parent: "[[Category Theory/_Index|Category Theory]]"
date_updated: 2026-06-28
concept_count: 5
aliases:
  - Monads Index
  - Monads and Monadicity
---

# Monads and their Algebras

> [!abstract] Routing Summary
> - Need the **big picture / where to start**? → [[Monads - Overview]]
> - Need the **definition of a monad** (endofunctor $T$, unit $\eta$, multiplication $\mu$, coherence laws)? → [[Monads and the Monad Laws]]
> - Need **why every adjunction gives a monad** ($T = UF = GF$, $\mu = U\epsilon F$)? → [[Adjunctions Induce Monads]]
> - Need **algebras for a monad** — Eilenberg–Moore $\mathsf{C}^T$, Kleisli $\mathsf{C}_T$, the comparison functor? → [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]
> - Need **when is a functor monadic** — Beck's theorem, split coequalizers, monadicity over $\mathsf{Set}$, limits/colimits of algebras? → [[Beck's Monadicity Theorem]]
> - Need a **comonad**, **closure operator**, or the **monoid-in-endofunctors** view? → [[Monads and the Monad Laws]]
> - Need the **list / maybe / power-set / state monad** examples? → [[Monads and the Monad Laws]] and [[Algebras for a Monad - Eilenberg-Moore and Kleisli]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Orientation & motivation | [[Monads - Overview]] | overview | [[Adjoint Functors]], [[Units and Counits]] | Monad = shadow of an adjunction; monoid in endofunctors |
| Monad definition & laws | [[Monads and the Monad Laws]] | definition | [[Functors]], [[Natural Transformations]] | Def 5.1.1: $\mu\cdot T\mu=\mu\cdot\mu T$, $\mu\cdot\eta T=\mathrm{id}=\mu\cdot T\eta$ |
| Adjunction → monad | [[Adjunctions Induce Monads]] | concept | [[Monads and the Monad Laws]], [[Adjoint Functors]] | Lemma 5.1.3: $T=UF$, $\mu=U\epsilon F$ |
| Algebras: EM & Kleisli | [[Algebras for a Monad - Eilenberg-Moore and Kleisli]] | definition | [[Adjunctions Induce Monads]] | Def 5.2.4/5.2.10; $\mathsf{C}_T$ initial, $\mathsf{C}^T$ terminal (5.2.13); comparison full & faithful (5.2.14) |
| Monadicity | [[Beck's Monadicity Theorem]] | theorem | [[Algebras for a Monad - Eilenberg-Moore and Kleisli]] | Thm 5.5.1: $U$ monadic ⟺ creates coequalizers of $U$-split pairs |

## Notes

- [[Monads - Overview]] — CONTAINS: the chapter's organizing slogan ("monad = shadow of an adjunction"); the six-section roadmap; the list of categories monadic over $\mathsf{Set}$; how the five notes interrelate.
- [[Monads and the Monad Laws]] — CONTAINS: Definition 5.1.1 (monad: $T$, $\eta$, $\mu$, associativity + unit diagrams); Remark 5.1.2 (monoid in the monoidal category of endofunctors); Definition 5.1.6 (comonad); Example 5.1.7 (closure/interior operators on a preorder); the list, maybe, power-set, double power-set, free-module, free-group, state, Giry monads.
- [[Adjunctions Induce Monads]] — CONTAINS: Lemma 5.1.3 ($T=UF$, $\mu=U\epsilon F$) with proof via the triangle identities and naturality of $\epsilon$; the $\mathsf{Set}\rightleftarrows\mathsf{Ab}$ worked example; free $\dashv$ forgetful sources of monads; reflective subcategories → idempotent monads.
- [[Algebras for a Monad - Eilenberg-Moore and Kleisli]] — CONTAINS: Definition 5.2.4 ($T$-algebra, EM category $\mathsf{C}^T$, algebra homomorphism); Definition 5.2.8 (free $T$-algebra, free functor $F^T$); Lemma 5.2.9 (EM adjunction $F^T\dashv U^T$, counit = structure map); Definition 5.2.10 (Kleisli category, Kleisli composite); Lemma 5.2.12 (Kleisli adjunction); Proposition 5.2.13 (Kleisli initial, EM terminal); Lemma 5.2.14 (comparison functor full & faithful, image = free algebras); algebra/Kleisli examples.
- [[Beck's Monadicity Theorem]] — CONTAINS: Definition 5.3.1 (monadic / strictly monadic); Definition 5.4.4 (split coequalizer) + Lemma 5.4.6 (absolute colimit); Proposition 5.4.2 (canonical presentation of an algebra); Definition 5.4.8 ($U$-split, creating coequalizers); Theorem 5.5.1 (Beck / PTT); Proposition 5.5.8 (reflexive tripleability) and CTT/VTT variants; Theorem 5.5.9 (Paré: $\mathsf{Set}^{op}$ monadic); §5.6 limits/colimits results (Lemma 5.6.1, Theorem 5.6.5, Corollaries 5.6.6/5.6.7/5.6.9, Prop 5.6.11, Thm 5.6.12); monadic and non-monadic examples over $\mathsf{Set}$.

## Sources

- [[raw/Riehl - Category Theory in Context.pdf]] — Chapter 5, "Monads and their Algebras" (pp. 179–216): §5.1 Monads from adjunctions, §5.2 Adjunctions from monads, §5.3 Monadic functors, §5.4 Canonical presentations via free algebras, §5.5 Recognizing categories of algebras, §5.6 Limits and colimits in categories of algebras.
