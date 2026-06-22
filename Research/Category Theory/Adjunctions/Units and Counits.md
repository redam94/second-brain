---
title: "Units and Counits"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 2.1–2.2, pp. 58–68"
date_ingested: 2026-05-08
date_updated: 2026-06-22
folder: "Category Theory/Adjunctions"
doc_type: textbook
depends_on:
  - "[[Foundations/Natural Transformations]]"
  - "[[Adjoint Functors]]"
used_by:
  - "[[Synthesis/Adjoints and Limits]]"
aliases:
  - unit of adjunction
  - counit of adjunction
  - triangle identities
---

# Units and Counits

> [!summary]
> An adjunction $F \dashv G$ is equivalent to natural transformations $\eta: 1_\mathcal{A} \Rightarrow GF$ (unit) and $\varepsilon: FG \Rightarrow 1_\mathcal{B}$ (counit) satisfying the triangle identities. The unit $\eta_A$ is the universal map from $A$ into $G$-objects; the counit $\varepsilon_B$ is the universal map from $F$-objects onto $B$.

## Overview

The hom-set bijection $\mathcal{B}(FA,B) \cong \mathcal{A}(A,GB)$ of an adjunction can be "encoded" in just two natural transformations: the **unit** $\eta: 1 \Rightarrow GF$ and **counit** $\varepsilon: FG \Rightarrow 1$. These satisfy identities that allow full reconstruction of the bijection, and they are often the most convenient way to specify or work with an adjunction.

## Main Content

> [!definition] Definition: Unit and Counit of an Adjunction
> For an adjunction $F \dashv G$ with bijection $\overline{(-)}$:
>
> - The **unit** $\eta: 1_\mathcal{A} \Rightarrow GF$ has components $\eta_A = \overline{1_{FA}}: A \to GFA$. It is the transpose of the identity on $FA$.
> - The **counit** $\varepsilon: FG \Rightarrow 1_\mathcal{B}$ has components $\varepsilon_B = \overline{1_{GB}}^{-1}: FGB \to B$. It is the inverse-transpose of the identity on $GB$.
^unit-counit-def

**Intuition**: 
- $\eta_A: A \to GFA$ is the "insertion of generators" — the canonical map from $A$ into the object $GFA$ obtained by freely constructing and then forgetting.
- $\varepsilon_B: FGB \to B$ is the "evaluation" — the canonical map from the free object on the underlying set of $B$ back to $B$ itself.

### Triangle Identities

> [!theorem] Theorem: Triangle Identities (BCT, Ch. 2.2)
> The unit $\eta$ and counit $\varepsilon$ of an adjunction $F \dashv G$ satisfy:
> 1. $(G\varepsilon) \circ (\eta G) = 1_G$, i.e., for each $B$: $G\varepsilon_B \circ \eta_{GB} = 1_{GB}$
> 2. $(\varepsilon F) \circ (F\eta) = 1_F$, i.e., for each $A$: $\varepsilon_{FA} \circ F\eta_A = 1_{FA}$
>
> Conversely, any pair of natural transformations $\eta: 1 \Rightarrow GF$ and $\varepsilon: FG \Rightarrow 1$ satisfying these identities determines an adjunction.
^triangle-ids

**Mnemonic**: The triangle identities say that going "around the triangle" composed with the unit/counit is the identity. Diagrammatically:

$$G \xrightarrow{\eta G} GFG \xrightarrow{G\varepsilon} G \quad = \quad G \xrightarrow{1_G} G$$

### Recovering the Bijection from Unit/Counit

Given $\eta$ and $\varepsilon$ satisfying the triangle identities, the bijection $\overline{(-)}$ and its inverse are:
$$\bar{f} = Gf \circ \eta_A \quad \text{for } f: FA \to B$$
$$\tilde{g}^{-1} = \varepsilon_B \circ Fg \quad \text{for } g: A \to GB$$

One checks that these are mutual inverses using the triangle identities.

### Examples

> [!example] Example: Unit/Counit for Free/Forgetful (BCT, Ch. 2.2)
> For the adjunction $F \dashv U$ between the free group functor and the forgetful functor:
> - **Unit** $\eta_X: X \to UFX$: the inclusion of a set $X$ into the underlying set of the free group $FX$ — "generators into their free group."
> - **Counit** $\varepsilon_G: FUG \to G$: the homomorphism from the free group on the underlying set of $G$ to $G$ itself, sending each generator $g$ to itself — "evaluate the free group."
>
> Triangle identity 1: $U\varepsilon_G \circ \eta_{UG} = 1_{UG}$ — inserting generators and then evaluating is the identity on the underlying set.

> [!example] Example: Unit/Counit for Product/Hom (BCT, Ch. 2.2)
> For the cartesian closed adjunction $(-) \times B \dashv (-)^B$ in a cartesian closed category:
> - **Unit** $\eta_A: A \to (A \times B)^B$: the curried identity, $\eta_A(a)(b) = (a,b)$.
> - **Counit** $\varepsilon_C: C^B \times B \to C$: evaluation, $\varepsilon_C(f, b) = f(b)$.

## Connections

- Unit/counit gives an equivalent definition of adjunctions; see [[Adjoint Functors]] for the hom-set definition.
- **Monadicity**: from an adjunction $F \dashv G$, the composite $T = GF: \mathcal{A} \to \mathcal{A}$ with multiplication $\mu = G\varepsilon F: GF \circ GF \Rightarrow GF$ and unit $\eta: 1 \Rightarrow GF$ forms a **monad** (not covered in Leinster but a direct extension).
- The **adjoint functor theorems** ([[Synthesis/Adjoint Functor Theorems]]) produce adjoints by constructing universal maps, which are exactly the unit components.

## See Also

- [[Adjoint Functors]] — The hom-set definition
- [[Adjunctions via Initial Objects]] — Universal maps and the unit's universal property
- [[Synthesis/Adjoints and Limits]] — How units/counits are used in preservation proofs
- [[Cartesian Closed Categories]] — the Product/Hom adjunction example (unit = currying, counit = evaluation) is the canonical CCC instance
