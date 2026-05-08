---
title: "Index: Representables"
tags:
  - type/index
  - source/ingested
  - topic/category-theory
parent: "[[../_Index|Category Theory]]"
date_updated: 2026-05-08
concept_count: 3
---

# Representables

> [!abstract] Routing Summary
> This folder covers representable functors and the Yoneda lemma — the central theorem of the book. Representability unifies all universal properties.
> - Need hom-functors $H_A$, representable functors, generalized elements? → [[Representable Functors]]
> - Need the Yoneda bijection $[\mathcal{A}^{\mathrm{op}},\mathbf{Set}](H_A,X) \cong X(A)$? → [[Yoneda Lemma]]
> - Need the Yoneda embedding, full faithfulness, or uniqueness of representations? → [[Yoneda Embedding and Consequences]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Covariant hom functor $H^A$ | [[Representable Functors]] | definition | Functors | $\mathcal{A}(A,-): \mathcal{A} \to \mathbf{Set}$ |
| Contravariant hom functor $H_A$ | [[Representable Functors]] | definition | Functors | $\mathcal{A}(-,A): \mathcal{A}^{\mathrm{op}} \to \mathbf{Set}$ |
| Representable functor | [[Representable Functors]] | definition | Functor Categories | $F \cong \mathcal{A}(A,-)$ for some $A$ |
| Generalized element | [[Representable Functors]] | definition | [[Representable Functors]] | Map $S \to A$ = element of $A$ of shape $S$ |
| Universal element | [[Representable Functors]] | theorem | [[Representable Functors]] | Rep. = universal element $u \in F(A)$ |
| Yoneda lemma | [[Yoneda Lemma]] | theorem | [[Representable Functors]] | $[\mathcal{A}^{\mathrm{op}},\mathbf{Set}](H_A,X) \cong X(A)$ natural |
| Yoneda bijection | [[Yoneda Lemma]] | theorem | [[Yoneda Lemma]] | $\alpha \mapsto \alpha_A(1_A)$; $x \mapsto \tilde{x}_B(f) = (Xf)(x)$ |
| Yoneda embedding $H^\bullet$ | [[Yoneda Embedding and Consequences]] | definition | [[Yoneda Lemma]] | $A \mapsto H_A = \mathcal{A}(-,A)$, functor $\mathcal{A} \to [\mathcal{A}^{\mathrm{op}},\mathbf{Set}]$ |
| Yoneda embedding fully faithful | [[Yoneda Embedding and Consequences]] | theorem | [[Yoneda Lemma]] | $\mathcal{A}(A,B) \cong [\mathcal{A}^{\mathrm{op}},\mathbf{Set}](H_A,H_B)$ |
| Uniqueness of representations | [[Yoneda Embedding and Consequences]] | theorem | [[Yoneda Embedding and Consequences]] | $H_A \cong H_{A'}$ iff $A \cong A'$ |
| Representables preserve limits | [[Yoneda Embedding and Consequences]] | theorem | [[Yoneda Embedding and Consequences]] | $\mathcal{A}(A, \lim D) \cong \lim \mathcal{A}(A, D-)$ |

## Notes

- [[Representable Functors]] — CONTAINS: hom-functor definitions, representability definition, generalized elements, examples (forgetful functor on Grp, non-representable example), universal element theorem
- [[Yoneda Lemma]] — CONTAINS: full statement of Yoneda lemma with proof sketch, covariant version, Yoneda and representability corollary, product example, naturality
- [[Yoneda Embedding and Consequences]] — CONTAINS: Yoneda embedding definition, full faithfulness theorem, uniqueness of representations, adjoints unique, tensor product unique, Yoneda preserves limits

## Sources
- [[raw/1612.09375v2.pdf]] — *Basic Category Theory*, Ch. 4.1–4.3

## See Also
- [[../Synthesis/Limits via Representables]] — Limits as representable functors (Ch. 6.1)
- [[../Synthesis/Limits in Presheaf Categories]] — Density theorem
