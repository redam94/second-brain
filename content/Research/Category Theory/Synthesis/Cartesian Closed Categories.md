---
title: "Cartesian Closed Categories"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 6.3, pp. 168–173"
date_ingested: 2026-05-08
date_updated: 2026-07-13
folder: "Category Theory/Synthesis"
doc_type: textbook
depends_on:
  - "[[Limits and Colimits/Products and Equalizers]]"
  - "[[Adjunctions/Adjoint Functors]]"
  - "[[Foundations/Functor Categories]]"
used_by:
  - "[[Beck's Monadicity Theorem]]"
aliases:
  - CCC
  - cartesian closed category
  - exponential object
  - internal hom
  - lambda calculus
---

# Cartesian Closed Categories

> [!summary]
> A cartesian closed category (CCC) has finite products and, for any two objects $B, C$, an **exponential object** $C^B$ representing the functor $\mathcal{A}(- \times B, C)$. Equivalently, $- \times B \dashv (-)^B$ for each $B$. **Set**, **CAT**, $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ are CCC; $\mathbf{Vect}_k$ is not (but is monoidal closed).

## Overview

A cartesian closed category is a category where "function objects" exist: for any two objects $B$ and $C$, there is an object $C^B$ (the internal hom, or exponential) whose elements are "morphisms from $B$ to $C$." CCCs are the categorical models of the simply-typed lambda calculus and arise naturally in logic, computer science, and sheaf theory.

## Main Content

> [!definition] Definition 6.3.15: Cartesian Closed Category
> A category $\mathcal{A}$ is **cartesian closed** if:
> 1. $\mathcal{A}$ has a terminal object $\mathbf{1}$
> 2. $\mathcal{A}$ has binary products $A \times B$
> 3. For each $B \in \mathcal{A}$, the functor $- \times B: \mathcal{A} \to \mathcal{A}$ has a right adjoint $(-)^B: \mathcal{A} \to \mathcal{A}$
>
> The object $C^B$ is called the **exponential** of $C$ by $B$, or the **internal hom** from $B$ to $C$, written also $[B, C]$.
>
> The adjunction $- \times B \dashv (-)^B$ means: $\mathcal{A}(A \times B, C) \cong \mathcal{A}(A, C^B)$ naturally in $A$ and $C$.
^ccc-def

The natural isomorphism $\mathcal{A}(A \times B, C) \cong \mathcal{A}(A, C^B)$ is called **currying** (or $\lambda$-abstraction) in computer science.

> [!definition] Definition: Evaluation Map
> The **evaluation map** is the counit of the adjunction $- \times B \dashv (-)^B$:
> $$
> \mathrm{ev}_{B,C}: C^B \times B \to C
> $$
> It corresponds to the identity $1_{C^B}$ under the currying bijection.
^eval-def

### Examples of CCCs

> [!example] Example: Set is CCC (BCT, Ch. 6.3)
> In **Set**: $C^B = \{f: B \to C \mid f \text{ is a function}\}$ = the set of all functions from $B$ to $C$. The currying bijection $\mathbf{Set}(A \times B, C) \cong \mathbf{Set}(A, C^B)$ sends $f(a,b)$ to $(a \mapsto (b \mapsto f(a,b)))$.

> [!example] Example: CAT is CCC (BCT, Ch. 6.3)
> In **CAT** (category of small categories): $\mathcal{C}^\mathcal{B} = [\mathcal{B}, \mathcal{C}]$ is the functor category. The currying bijection $\mathrm{Fun}(\mathcal{A} \times \mathcal{B}, \mathcal{C}) \cong \mathrm{Fun}(\mathcal{A}, [\mathcal{B}, \mathcal{C}])$ is the standard "currying" of functors.

> [!example] Example: Presheaf Categories are CCC (BCT, Ch. 6.3)
> For any small $\mathcal{A}$, the presheaf category $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is cartesian closed. The exponential $Z^Y$ for presheaves $Y, Z$ is:
> $$
> Z^Y(A) = [\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A \times Y, Z) = \hat{\mathcal{A}}(H_A \times Y, Z)
> $$
> i.e., the set of natural transformations from $H_A \times Y$ to $Z$.
>
> **Proof**: Pointwise limits ensure the product $H_A \times Y$ exists; the definition above makes $Z^Y$ a presheaf, and one verifies the adjunction.
^presheaf-ccc

> [!example] Example: Vect_k is NOT CCC (BCT, Ch. 6.3)
> The category $\mathbf{Vect}_k$ of $k$-vector spaces is **not** cartesian closed: $- \otimes W \dashv \mathrm{Hom}(W,-)$ is a monoidal closed structure, but the monoidal product is $\otimes$ (tensor product), not $\times$ (direct product). Since $\mathbf{Vect}_k$ has a zero object, it cannot be cartesian closed.
>
> $\mathbf{Vect}_k$ is an example of a **symmetric monoidal closed category** instead.

### Connection to Logic and Type Theory

In the **propositions as types / proofs as programs** correspondence (Curry-Howard):
- Objects of a CCC = types
- Morphisms $A \to B$ = proofs that $A$ implies $B$
- Products $A \times B$ = conjunction $A \wedge B$
- Exponentials $C^B$ = implication $B \Rightarrow C$
- Terminal object = truth

CCCs are the categorical models of the **simply-typed lambda calculus**.

### Closure and Internal Homs in Non-Cartesian Contexts

When the monoidal product $\otimes$ is not the cartesian product $\times$, but still has a right adjoint $- \otimes B \dashv [B,-]$, the category is called **monoidal closed** (or **symmetric monoidal closed** if the monoidal structure is symmetric). $\mathbf{Vect}_k$, $R$-$\mathbf{Mod}$, and chain complexes are examples.

## Connections

- **Presheaf categories** ([[Limits in Presheaf Categories]]): the CCC structure on $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}]$ is proven using pointwise limits.
- **Adjunctions** ([[Adjunctions/Adjoint Functors]]): the CCC condition is exactly that each product functor $- \times B$ has a right adjoint.
- The **density theorem** gives the exponential in presheaf categories via its universal property.

## See Also

- [[Limits and Colimits/Products and Equalizers]] — Products, one ingredient of CCCs
- [[Adjunctions/Adjoint Functors]] — The adjunction $- \times B \dashv (-)^B$
- [[Synthesis/Limits in Presheaf Categories]] — Why presheaf categories are CCC
<<<<<<< HEAD
- [[Beck's Monadicity Theorem]] — monadicity / algebraic structure connection
=======
- [[Adjunctions/Units and Counits]] — The evaluation map $\mathrm{ev}_{B,C}: C^B \times B \to C$ is the counit of $- \times B \dashv (-)^B$
- [[Synthesis/Adjoints and Limits]] — General adjunction-limit connections; CCC is the special case where $- \times B$ has a right adjoint
>>>>>>> main
