---
title: "Index: Synthesis"
tags:
  - type/index
  - source/ingested
  - topic/category-theory
parent: "[[../_Index|Category Theory]]"
date_updated: 2026-05-08
concept_count: 5
doc_type: index
---

# Synthesis

> [!abstract] Routing Summary
> This folder covers Chapter 6 of Leinster, where adjoints, representables, and limits are unified. Each major result connects all three themes.
> - Need limits as representable functors, $\Delta \dashv \lim$? → [[Limits via Representables]]
> - Need pointwise limits in presheaf categories or the density theorem? → [[Limits in Presheaf Categories]]
> - Need the theorem "right adjoints preserve limits"? → [[Adjoints and Limits]]
> - Need GAFT or SAFT? → [[Adjoint Functor Theorems]]
> - Need cartesian closed categories or exponential objects? → [[Cartesian Closed Categories]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Cone functor representable | [[Limits via Representables]] | theorem | Representables, Limits | $\mathrm{Cone}(A,D) \cong [\mathcal{I},\mathcal{A}](\Delta A, D)$ |
| Limits unique up to iso | [[Limits via Representables]] | theorem | [[Limits via Representables]] | From Yoneda uniqueness |
| $\Delta \dashv \lim$ | [[Limits via Representables]] | theorem | [[Limits via Representables]] | Limit functor is right adjoint |
| Limits commute with limits | [[Limits via Representables]] | theorem | [[Limits via Representables]] | Prop. 6.2.8 |
| Pointwise limits in $[\mathcal{A},\mathcal{B}]$ | [[Limits in Presheaf Categories]] | theorem | Functor Categories, Limits | $(\lim X_j)(A) = \lim X_j(A)$ |
| Yoneda preserves limits | [[Limits in Presheaf Categories]] | theorem | [[Limits in Presheaf Categories]] | Cor. 6.2.12 |
| Category of elements $\mathcal{E}(X)$ | [[Limits in Presheaf Categories]] | definition | Functor Categories | Objects = $(A,x)$ with $x \in X(A)$ |
| Density theorem | [[Limits in Presheaf Categories]] | theorem | [[Limits in Presheaf Categories]] | $X \cong \mathrm{colim}_{\mathcal{E}(X)} H_A$ |
| Right adjoints preserve limits | [[Adjoints and Limits]] | theorem | Adjunctions, Limits | Thm. 6.3.1; proof via Yoneda |
| Left adjoints preserve colimits | [[Adjoints and Limits]] | theorem | [[Adjoints and Limits]] | Dual of above |
| Solution-set condition | [[Adjoint Functor Theorems]] | definition | Adjunctions | Small set of factorising maps |
| GAFT | [[Adjoint Functor Theorems]] | theorem | [[Adjoints and Limits]] | Continuous + solution-set ↔ left adjoint exists |
| SAFT | [[Adjoint Functor Theorems]] | theorem | [[Adjoint Functor Theorems]] | Well-powered + cogenerating ↔ continuous has left adjoint |
| Cartesian closed category | [[Cartesian Closed Categories]] | definition | Products, Adjunctions | $- \times B \dashv (-)^B$; exponential $C^B$ |
| Evaluation map | [[Cartesian Closed Categories]] | definition | [[Cartesian Closed Categories]] | Counit $C^B \times B \to C$ |
| Set is CCC | [[Cartesian Closed Categories]] | example | [[Cartesian Closed Categories]] | $C^B$ = function set |
| CAT is CCC | [[Cartesian Closed Categories]] | example | [[Cartesian Closed Categories]] | $\mathcal{C}^\mathcal{B}$ = functor category |
| Presheaf categories are CCC | [[Cartesian Closed Categories]] | theorem | [[Cartesian Closed Categories]] | $Z^Y(A) = \hat{\mathcal{A}}(H_A \times Y, Z)$ |
| Vect_k is NOT CCC | [[Cartesian Closed Categories]] | example | [[Cartesian Closed Categories]] | Monoidal closed but not cartesian |

## Notes

- [[Limits via Representables]] — CONTAINS: cones are representable (Prop 6.1.1), limits unique (Cor 6.1.2), $\Delta \dashv \lim$ (Prop 6.1.4), limits commute with limits (Prop 6.2.8)
- [[Limits in Presheaf Categories]] — CONTAINS: pointwise limits theorem (Thm 6.2.5), limits commute, Yoneda preserves limits (Cor 6.2.12), category of elements, density theorem (Thm 6.2.17)
- [[Adjoints and Limits]] — CONTAINS: right adjoints preserve limits (Thm 6.3.1), proof sketch via Yoneda, examples (forgetful, hom, tensor, free), what is not preserved
- [[Adjoint Functor Theorems]] — CONTAINS: AFT for preorders (Prop 6.3.7), solution-set condition, GAFT (Thm 6.3.10), SAFT (Thm 6.3.13), why "special"
- [[Cartesian Closed Categories]] — CONTAINS: CCC definition, evaluation map, Set/CAT/presheaf CCC, Vect_k not CCC, monoidal closed, connection to lambda calculus

## Sources
- [[raw/1612.09375v2.pdf]] — *Basic Category Theory*, Ch. 6.1–6.3 and Appendix

## See Also
- [[../Representables/_Index|Representables]] — Yoneda lemma used throughout synthesis
- [[../Adjunctions/_Index|Adjunctions]] — Adjunctions used in all synthesis results
- [[../Limits and Colimits/_Index|Limits and Colimits]] — Limits theory underlying synthesis
