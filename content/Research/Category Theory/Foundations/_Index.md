---
title: "Index: Foundations"
tags:
  - type/index
  - source/ingested
  - topic/category-theory
parent: "[[../_Index|Category Theory]]"
date_updated: 2026-05-08
concept_count: 4
---

# Foundations

> [!abstract] Routing Summary
> This folder covers the foundational language of category theory: categories, the maps between them (functors), the maps between those maps (natural transformations), and the categories formed by functors. It also includes size issues needed for the Yoneda lemma.
> - Need the definition of a category or examples? → [[Categories]]
> - Need the definition of a functor, full/faithful, equivalence? → [[Functors]]
> - Need the naturality condition or natural isomorphisms? → [[Natural Transformations]]
> - Need presheaf categories or the hom bifunctor? → [[Functor Categories]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Category definition | [[Categories]] | definition | — | Objects + morphisms + composition + identities |
| Isomorphism | [[Categories]] | definition | — | Invertible morphism |
| Opposite category | [[Categories]] | definition | — | Reverse all arrows for duality |
| Small/locally small | [[Categories]] | definition | — | Size distinctions for set-theoretic safety |
| Functor definition | [[Functors]] | definition | [[Categories]] | Preserves composition and identities |
| Full/faithful | [[Functors]] | definition | [[Functors]] | Bijective/injective/surjective on hom-sets |
| Equivalence of categories | [[Functors]] | definition | [[Functors]] | Fully faithful + essentially surjective |
| Diagonal functor | [[Functors]] | definition | [[Functors]] | Used in limits: $\Delta: \mathcal{A} \to [\mathcal{I},\mathcal{A}]$ |
| Natural transformation | [[Natural Transformations]] | definition | [[Functors]] | Commuting squares for every map |
| Natural isomorphism | [[Natural Transformations]] | definition | [[Natural Transformations]] | Components are all isomorphisms |
| Vertical/horizontal composition | [[Natural Transformations]] | definition | [[Natural Transformations]] | Two ways to compose nat. trans. |
| Functor category $[\mathcal{A},\mathcal{B}]$ | [[Functor Categories]] | definition | [[Natural Transformations]] | Objects = functors, morphisms = nat. trans. |
| Presheaf category $\hat{\mathcal{A}}$ | [[Functor Categories]] | definition | [[Functor Categories]] | $[\mathcal{A}^{\mathrm{op}},\mathbf{Set}]$ |

## Notes

- [[Categories]] — CONTAINS: category definition, examples (Set/Grp/Top/monoid/preorder), isomorphisms, opposite category, size distinctions (small/locally small/large)
- [[Functors]] — CONTAINS: functor definition, core examples (forgetful/free/power set), contravariant functors, full/faithful, equivalence of categories, diagonal functor
- [[Natural Transformations]] — CONTAINS: natural transformation definition, natural isomorphisms, double-dual example, vertical and horizontal composition, interchange law
- [[Functor Categories]] — CONTAINS: functor category definition, presheaf category definition, examples (diagrams as functor categories, sheaves), isomorphisms in functor categories, hom bifunctor

## Sources
- 1612.09375v2 — *Basic Category Theory*, Tom Leinster, Ch. 1.1–1.4 and Ch. 3

## See Also
- [[../Adjunctions/_Index|Adjunctions]] — Adjoint functors, built on functors and natural transformations
- [[../Representables/_Index|Representables]] — Yoneda lemma, uses functor categories heavily
