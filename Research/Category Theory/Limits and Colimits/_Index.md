---
title: "Index: Limits and Colimits"
tags:
  - type/index
  - source/ingested
  - topic/category-theory
parent: "[[../_Index|Category Theory]]"
date_updated: 2026-05-08
concept_count: 5
doc_type: index
folder: "Research/Category Theory/Limits and Colimits"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Limits and Colimits

> [!abstract] Routing Summary
> This folder covers the theory of limits (products, equalizers, pullbacks, general limits) and their duals (colimits). Also covers how functors interact with limits.
> - Need products, equalizers, terminal objects? → [[Products and Equalizers]]
> - Need pullbacks, pushouts, or the mono-pullback characterisation? → [[Pullbacks]]
> - Need the general limit definition, diagrams, cones? → [[General Limits]]
> - Need colimits, coproducts, coequalizers, pushouts in detail? → [[Colimits]]
> - Need preservation/reflection/creation of limits by functors? → [[Functors and Limits]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Binary product $A \times B$ | [[Products and Equalizers]] | definition | Categories | Universal property with projections |
| Terminal object | [[Products and Equalizers]] | definition | — | Empty product; unique map into it |
| Equalizer | [[Products and Equalizers]] | definition | — | Kernel-like construction $E \to X \rightrightarrows Y$ |
| Monomorphism | [[Products and Equalizers]] | definition | — | Categorical injection |
| Products + equalizers → all limits | [[Products and Equalizers]] | theorem | [[Products and Equalizers]] | Prop. 5.1.26 |
| Pullback $X \times_Z Y$ | [[Pullbacks]] | definition | [[Products and Equalizers]] | Fibred product; universal square |
| Mono ↔ pullback square | [[Pullbacks]] | theorem | [[Pullbacks]] | $f$ mono iff diagonal iso |
| Pushout | [[Pullbacks]] | definition | [[General Limits]] | Dual of pullback; span colimit |
| Diagram $D: \mathcal{I} \to \mathcal{A}$ | [[General Limits]] | definition | Functors | Shape category $\mathcal{I}$, diagram is a functor |
| Cone | [[General Limits]] | definition | [[General Limits]] | Family of maps into diagram, compatible |
| Limit = terminal cone | [[General Limits]] | definition | [[General Limits]] | Unique factorisation of all cones |
| Limit formula in Set | [[General Limits]] | example | [[General Limits]] | Compatible families in $\prod DI$ |
| Complete category | [[General Limits]] | definition | [[General Limits]] | Has all small limits |
| Colimit = initial cocone | [[Colimits]] | definition | [[General Limits]] | Dual of limit |
| Coproduct $A \sqcup B$ | [[Colimits]] | definition | — | Dual of product; injections |
| Coequalizer | [[Colimits]] | definition | — | Quotient-like construction |
| Colimit formula in Set | [[Colimits]] | example | [[Colimits]] | Quotient of coproduct |
| Epimorphism | [[Colimits]] | definition | — | Categorical surjection |
| Preserves limits | [[Functors and Limits]] | definition | [[General Limits]] | $F(\lim D) \cong \lim(FD)$ |
| Reflects limits | [[Functors and Limits]] | definition | [[Functors and Limits]] | Limit in codomain → limit in domain |
| Creates limits | [[Functors and Limits]] | definition | [[Functors and Limits]] | Forgetful functors typically create |
| Right adjoints continuous | [[Functors and Limits]] | theorem | [[Functors and Limits]] | Proved in [[../Synthesis/Adjoints and Limits]] |

## Notes

- [[Products and Equalizers]] — CONTAINS: binary products, arbitrary products, terminal objects, equalizers, products+equalizers generate all limits (Prop 5.1.26), monomorphisms
- [[Pullbacks]] — CONTAINS: pullback definition with commutative square, examples in Set/Top/Grp, mono ↔ pullback square lemma, pushout definition, pasting lemma
- [[General Limits]] — CONTAINS: diagram and cone definitions, limit = terminal cone, limit formula in Set, complete categories, products+equalizers generate limits
- [[Colimits]] — CONTAINS: cocone and colimit definitions, coproducts, coequalizers, colimit formula in Set, epimorphisms, cocomplete categories
- [[Functors and Limits]] — CONTAINS: preservation/reflection/creation definitions, forgetful functor creates limits example, right adjoints are continuous

## Sources
- [[raw/1612.09375v2.pdf]] — *Basic Category Theory*, Ch. 5.1–5.3

## See Also
- [[../Synthesis/_Index|Synthesis]] — Limits via representables, adjoints and limits, functor theorem
