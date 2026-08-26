---
title: "Natural Transformations"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 1.3, pp. 31–42"
date_ingested: 2026-05-08
date_updated: 2026-06-29
folder: "Category Theory/Foundations"
doc_type: textbook
depends_on:
  - "[[Categories]]"
  - "[[Functors]]"
used_by:
  - "[[Functor Categories]]"
  - "[[Adjunctions/Adjoint Functors]]"
  - "[[Representables/Yoneda Lemma]]"
  - "[[Basic Category Theory - Overview]]"
aliases:
  - natural transformation
  - natural isomorphism
  - naturality condition
---

# Natural Transformations

> [!summary]
> A natural transformation is a coherent family of morphisms between two functors, one component per object. The naturality condition says these components commute with all morphisms in the domain category. Natural isomorphisms are natural transformations all of whose components are isomorphisms.

## Overview

If functors are maps between categories, natural transformations are maps between functors. This gives the three-tier structure of category theory: objects, morphisms, functors, natural transformations. The naturality condition is the categorical coherence condition: it says the transformation "doesn't make arbitrary choices" as you move through the category.

## Main Content

> [!definition] Definition 1.3.1: Natural Transformation
> Let $F, G: \mathcal{A} \to \mathcal{B}$ be functors. A **natural transformation** $\alpha: F \Rightarrow G$ consists of a family of maps $(\alpha_A: FA \to GA)_{A \in \mathcal{A}}$ in $\mathcal{B}$ such that for every $f: A \to A'$ in $\mathcal{A}$, the following square commutes:
>
> $$\begin{array}{ccc} FA & \xrightarrow{\alpha_A} & GA \\ Ff \downarrow & & \downarrow Gf \\ FA' & \xrightarrow{\alpha_{A'}} & GA' \end{array}$$
>
> i.e., $\alpha_{A'} \circ Ff = Gf \circ \alpha_A$.
>
> The maps $\alpha_A$ are called the **components** of $\alpha$. We write $\alpha: F \Rightarrow G: \mathcal{A} \to \mathcal{B}$.
^nat-trans-def

> [!definition] Definition: Natural Isomorphism
> A natural transformation $\alpha: F \Rightarrow G$ is a **natural isomorphism** if every component $\alpha_A$ is an isomorphism in $\mathcal{B}$. We write $F \cong G$.
^nat-iso-def

### Core Examples

> [!example] Example: Double Dual for Vector Spaces (BCT, Ch. 1.3)
> Let $F = 1_{\mathbf{Vect}_k}$ (identity functor) and $G = (-)^{**}$ (double dual). There is a natural transformation $\alpha: F \Rightarrow G$ with components $\alpha_V: V \to V^{**}$ given by $v \mapsto (\phi \mapsto \phi(v))$.
>
> **Naturality**: For any linear $f: V \to W$, the square $\alpha_W \circ f = f^{**} \circ \alpha_V$ commutes. This is "natural" in $V$: no choice of basis is needed.
>
> For finite-dimensional $V$, $\alpha_V$ is an isomorphism, giving a natural isomorphism $1 \cong (-)^{**}$ on $\mathbf{Vect}_k^{\mathrm{fd}}$.

> [!example] Example: Determinant (BCT, Ch. 1.3)
> The determinant $\det: GL_n(-) \Rightarrow (-)^\times$ is a natural transformation from the functor $GL_n: \mathbf{CRing} \to \mathbf{Grp}$ to the units functor $(-)^\times: \mathbf{CRing} \to \mathbf{Grp}$. Naturality says: for any ring homomorphism $\phi: R \to S$, $\det(\phi(M)) = \phi(\det(M))$.

### Vertical and Horizontal Composition

> [!definition] Definition: Vertical Composition
> If $\alpha: F \Rightarrow G$ and $\beta: G \Rightarrow H$ are natural transformations $\mathcal{A} \to \mathcal{B}$, their **vertical composite** $\beta \circ \alpha: F \Rightarrow H$ has components $(\beta \circ \alpha)_A = \beta_A \circ \alpha_A$.
^vert-comp-def

> [!definition] Definition: Horizontal Composition (Whiskering)
> If $\alpha: F \Rightarrow G: \mathcal{A} \to \mathcal{B}$ and $\beta: H \Rightarrow K: \mathcal{B} \to \mathcal{C}$, the **horizontal composite** $\beta * \alpha: HF \Rightarrow KG: \mathcal{A} \to \mathcal{C}$ has components $(\beta * \alpha)_A = \beta_{GA} \circ H\alpha_A = K\alpha_A \circ \beta_{FA}$.
>
> In particular, for a functor $H: \mathcal{B} \to \mathcal{C}$ and $\alpha: F \Rightarrow G: \mathcal{A} \to \mathcal{B}$, the **whiskering** $H\alpha: HF \Rightarrow HG$ has $(H\alpha)_A = H(\alpha_A)$.

### The Interchange Law

Vertical and horizontal composition satisfy the **interchange law**:
$$(\beta' * \alpha') \circ (\beta * \alpha) = (\beta' \circ \beta) * (\alpha' \circ \alpha)$$
whenever the composites make sense. This makes natural transformations the 2-cells of the 2-category **CAT**.

## Connections

- Natural transformations are the morphisms of **functor categories** $[\mathcal{A}, \mathcal{B}]$ ([[Functor Categories]]).
- The **Yoneda lemma** ([[Representables/Yoneda Lemma]]) characterises natural transformations $[\mathcal{A}^{\mathrm{op}}, \mathbf{Set}](H_A, X) \cong X(A)$.
- **Adjunctions** ([[Adjunctions/Adjoint Functors]]) can be defined as natural isomorphisms $\mathcal{B}(FA, B) \cong \mathcal{A}(A, GB)$ or equivalently via natural transformations $\eta: 1 \Rightarrow GF$ and $\varepsilon: FG \Rightarrow 1$.
- **Limits** are defined in terms of natural transformations (cones are natural transformations to a diagram) via [[Limits and Colimits/General Limits]].

## See Also

- [[Functors]] — What natural transformations transform between
- [[Functor Categories]] — Category whose morphisms are natural transformations
- [[Representables/Yoneda Lemma]] — Fundamental theorem about natural transformations out of representables
- [[Adjunctions/Adjoint Functors]] — Defined via unit/counit natural transformations
- [[Limits and Colimits/General Limits]] — Limits (cones) are defined as natural transformations to a constant diagram
