---
title: "Index: Adjunctions"
tags:
  - type/index
  - source/ingested
  - topic/category-theory
parent: "[[../_Index|Category Theory]]"
date_updated: 2026-05-08
concept_count: 3
---

# Adjunctions

> [!abstract] Routing Summary
> This folder covers adjoint functors: definition via hom-set bijection, units and counits, and the universal-property formulation via initial objects in comma categories.
> - Need the definition of adjunction or core examples (free/forgetful)? → [[Adjoint Functors]]
> - Need units, counits, or triangle identities? → [[Units and Counits]]
> - Need the universal-property / initial-object formulation? → [[Adjunctions via Initial Objects]]
> - Need results about adjoints and limits? → [[../Synthesis/Adjoints and Limits]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Adjunction (hom-set) | [[Adjoint Functors]] | definition | Functors, Nat. Trans. | $\mathcal{B}(FA,B) \cong \mathcal{A}(A,GB)$ natural |
| Transpose | [[Adjoint Functors]] | definition | [[Adjoint Functors]] | $\bar{f}: A \to GB$ from $f: FA \to B$ |
| Adjoint uniqueness | [[Adjoint Functors]] | theorem | [[Adjoint Functors]] | Adjoints unique up to natural iso (Yoneda) |
| Unit $\eta$ | [[Units and Counits]] | definition | [[Adjoint Functors]] | $1_\mathcal{A} \Rightarrow GF$; universal map |
| Counit $\varepsilon$ | [[Units and Counits]] | definition | [[Adjoint Functors]] | $FG \Rightarrow 1_\mathcal{B}$; evaluation map |
| Triangle identities | [[Units and Counits]] | theorem | [[Units and Counits]] | $(G\varepsilon) \circ (\eta G) = 1_G$, etc. |
| Initial/terminal objects | [[Adjunctions via Initial Objects]] | definition | — | Unique maps from/to every object |
| Comma category | [[Adjunctions via Initial Objects]] | definition | [[Adjoint Functors]] | $(A \downarrow G)$ = maps $A \to G-$ |
| Adjunction ↔ initial objects | [[Adjunctions via Initial Objects]] | theorem | [[Units and Counits]] | Unit = initial object of $(A \downarrow G)$ |
| Limits as terminal cones | [[Adjunctions via Initial Objects]] | theorem | [[Adjunctions via Initial Objects]] | $\lim D$ = terminal in Cone$(D)$ |

## Notes

- [[Adjoint Functors]] — CONTAINS: hom-set definition, adjunction table of examples, Galois connections, four equivalent definitions, uniqueness theorem
- [[Units and Counits]] — CONTAINS: unit/counit definitions, triangle identities, recovering bijection from unit/counit, free/forgetful and product/hom examples
- [[Adjunctions via Initial Objects]] — CONTAINS: initial/terminal object definition, comma category definition, adjunction ↔ initial objects theorem, limits as terminal cones

## Sources
- 1612.09375v2 — *Basic Category Theory*, Ch. 2.1–2.3

## See Also
- [[../Synthesis/Adjoints and Limits]] — Right adjoints preserve limits
- [[../Synthesis/Adjoint Functor Theorems]] — GAFT and SAFT
