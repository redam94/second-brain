---
title: "Basic Category Theory - Overview"
tags:
  - source/ingested
  - topic/category-theory
  - type/overview
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Full text, pp. 1–173"
date_ingested: 2026-05-08
folder: "Category Theory"
doc_type: textbook
depends_on: []
used_by:
  - "[[Categories]]"
  - "[[Functors]]"
  - "[[Natural Transformations]]"

aliases:
  - Leinster Category Theory
  - BCT Overview
---

# Basic Category Theory — Overview

> [!summary]
> Tom Leinster's *Basic Category Theory* (Cambridge, 2014; arXiv 1612.09375v2) is a concise introduction to category theory emphasising universal properties. The book argues that the central concept unifying all of category theory is the **representable functor** and its companion, the **Yoneda lemma**. By the end, every major construction (limits, adjoints, exponentials) is understood as an instance of representability.

## Book Structure → Folder Map

| Chapter | Title | Notes Location |
|---------|-------|---------------|
| 1 | Categories, functors, natural transformations | [[Foundations/_Index\|Foundations]] |
| 2 | Adjoints | [[Research/Category Theory/Adjunctions/_Index\|Adjunctions]] |
| 3 | Interlude on sets | [[Foundations/_Index\|Foundations]] (size) |
| 4 | Representables | [[Research/Category Theory/Representables/_Index\|Representables]] |
| 5 | Limits | [[Research/Category Theory/Limits and Colimits/_Index\|Limits and Colimits]] |
| 6 | Adjoints, representables, limits | [[Research/Category Theory/Synthesis/_Index\|Synthesis]] |
| App | Proof of GAFT | [[Synthesis/Adjoint Functor Theorems]] |

## The Central Thesis

The book is built around one insight: **universal properties** are the right way to define mathematical objects, and universal properties are precisely **initial or terminal objects** in appropriate categories, which are in turn precisely **representations** of functors. The progression:

```
Categories/Functors/Nat. Trans.
         ↓
    Adjoint Functors   ←→   Representable Functors
         ↓                         ↓
              Yoneda Lemma
                   ↓
              Limits & Colimits
                   ↓
           Synthesis (all three unified)
```

## Key Theorems and Results

| Result | Location |
|--------|----------|
| [[Foundations/Natural Transformations#^nat-trans-def\|Natural transformation definition]] | Ch. 1.3 |
| [[Adjunctions/Adjoint Functors#^adjunction-def\|Adjunction definition (4 equivalent forms)]] | Ch. 2.1–2.2 |
| [[Representables/Yoneda Lemma#^yoneda-thm\|Yoneda Lemma]] | Ch. 4.2 |
| [[Representables/Yoneda Embedding and Consequences#^yoneda-embedding\|Yoneda embedding full and faithful]] | Ch. 4.3 |
| [[Limits and Colimits/General Limits#^limit-def\|General limit definition]] | Ch. 5.1 |
| [[Synthesis/Limits via Representables#^cones-representable\|Cones are representable]] | Ch. 6.1 |
| [[Synthesis/Adjoints and Limits#^adjoints-limits\|Adjoints preserve (co)limits]] | Ch. 6.3 |
| [[Synthesis/Adjoint Functor Theorems#^gaft\|General Adjoint Functor Theorem]] | Ch. 6.3 |

## Sub-folder Index

- [[Foundations/_Index|Foundations]] — Categories, functors, natural transformations, functor categories, size
- [[Research/Category Theory/Adjunctions/_Index|Adjunctions]] — Definition, units/counits, adjunctions via initial objects
- [[Research/Category Theory/Representables/_Index|Representables]] — Representable functors, Yoneda lemma, Yoneda embedding
- [[Research/Category Theory/Limits and Colimits/_Index|Limits and Colimits]] — Products, equalizers, pullbacks, general limits, colimits, functors and limits
- [[Research/Category Theory/Synthesis/_Index|Synthesis]] — Limits via representables, adjoints and limits, adjoint functor theorems, cartesian closed categories

## See Also

- [[raw/1612.09375v2.pdf]] — Source PDF
