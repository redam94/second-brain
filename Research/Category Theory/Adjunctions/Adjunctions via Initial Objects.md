---
title: "Adjunctions via Initial Objects"
tags:
  - source/ingested
  - topic/category-theory
  - type/concept
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 2.3, pp. 68–74"
date_ingested: 2026-05-08
folder: "Category Theory/Adjunctions"
doc_type: textbook
depends_on:
  - "[[Adjoint Functors]]"
  - "[[Foundations/Categories]]"
used_by:
  - "[[Synthesis/Adjoint Functor Theorems]]"
  - "[[Universal Properties/Universal Properties - Introduction]]"
aliases:
  - comma category
  - universal arrow
  - initial object
  - terminal object
---

# Adjunctions via Initial Objects

> [!summary]
> An adjunction $F \dashv G$ is equivalent to: for each $A \in \mathcal{A}$, a universal map (= initial object of the comma category $(A \downarrow G)$). This formulation makes the universal property of the unit transparent, and shows that adjunctions are equivalent to universal constructions. Terminal objects and limits are special cases of this framework.

## Overview

The comma category formulation of adjunctions makes the universal-property aspect primary. An adjunction $F \dashv G$ says that for each $A$, the map $\eta_A: A \to GFA$ is **initial among all maps** $A \to GB$. This is the categorical meaning of "$FA$ is the free object on $A$."

## Main Content

### Initial and Terminal Objects

> [!definition] Definition: Initial and Terminal Objects
> In a category $\mathcal{A}$:
> - An **initial object** $\varnothing$ satisfies: for every $A$, there is exactly one map $\varnothing \to A$.
> - A **terminal object** $1$ satisfies: for every $A$, there is exactly one map $A \to 1$.
>
> Both are unique up to isomorphism when they exist. In **Set**: $\varnothing$ is initial, $\{*\}$ is terminal. In **Grp**: trivial group is both.
^init-term-def

### Comma Categories

> [!definition] Definition: Comma Category
> For functors $F: \mathcal{A} \to \mathcal{C}$ and $G: \mathcal{B} \to \mathcal{C}$, the **comma category** $(F \downarrow G)$ has:
> - **Objects**: triples $(A, B, f)$ where $A \in \mathcal{A}$, $B \in \mathcal{B}$, $f: FA \to GB$ in $\mathcal{C}$
> - **Morphisms** $(A,B,f) \to (A',B',f')$: pairs $(h: A \to A', k: B \to B')$ such that $Gk \circ f = f' \circ Fh$
>
> Special cases:
> - $(A \downarrow G)$ = comma category of $A$ (viewed as functor from $\mathbf{1}$) over $G$. Objects are maps $A \to GB$.
> - $(F \downarrow B)$ = objects are maps $FA \to B$.
^comma-def

### Adjunctions as Initial Objects in Comma Categories

> [!theorem] Theorem: Adjunction ↔ Initial Objects in Comma Categories (BCT, Ch. 2.3)
> The following are equivalent:
> 1. $F \dashv G$ (adjunction with unit $\eta$)
> 2. For each $A \in \mathcal{A}$, the pair $(FA, \eta_A)$ is an **initial object** of the comma category $(A \downarrow G)$.
>
> Explicitly: condition 2 says that for every $g: A \to GB$, there is a unique $\tilde{g}: FA \to B$ such that $G\tilde{g} \circ \eta_A = g$:
> $$\forall\, g: A \to GB,\; \exists!\, \tilde{g}: FA \to B \text{ s.t. } G\tilde{g} \circ \eta_A = g$$
^adj-initial-thm

This is the **universal property of the unit**: $\eta_A: A \to GFA$ is the initial map from $A$ into a $G$-image.

> [!example] Example: Free Group as Initial Object (BCT, Ch. 2.3)
> For the free/forgetful adjunction $F \dashv U: \mathbf{Grp} \to \mathbf{Set}$:
>
> The universal property says: for any set $X$ and any group homomorphism $g: X \to UG$ (i.e., any function from $X$ to the underlying set of a group $G$), there is a unique group homomorphism $\tilde{g}: FX \to G$ such that $U\tilde{g} \circ \eta_X = g$.
>
> This is exactly the universal property of the free group: a function on generators extends uniquely to a homomorphism.

### Limits and Terminal Objects

> [!theorem] Theorem: Limits as Terminal Objects (BCT, Ch. 2.3)
> The limit of a diagram $D: \mathcal{I} \to \mathcal{A}$ is the **terminal object** of the category of **cones** over $D$, written $\mathrm{Cone}(D)$.
>
> A cone over $D$ with vertex $A$ is a natural transformation $\lambda: \Delta A \Rightarrow D$, i.e., a family of maps $\lambda_I: A \to DI$ commuting with all $Du$.
>
> $\mathrm{Cone}(D)$ has cones as objects and cone morphisms as morphisms. The limit is the terminal cone.
^limits-terminal

This unifies limits with the adjunction/initial-object perspective: limits are right adjoints to the diagonal functor $\Delta: \mathcal{A} \to [\mathcal{I}, \mathcal{A}]$.

## Connections

- This formulation underlies the **Adjoint Functor Theorems** ([[Synthesis/Adjoint Functor Theorems]]): to construct a left adjoint to $G$, one constructs initial objects in each $(A \downarrow G)$.
- **Universal properties** throughout mathematics are initial or terminal objects in appropriate categories ([[Universal Properties/Universal Properties - Introduction]]).
- The **limit** $\lim D$ is the terminal object of $\mathrm{Cone}(D)$; the **colimit** $\mathrm{colim}\, D$ is the initial object of $\mathrm{CoCone}(D)$.
- The **Yoneda lemma** ([[Representables/Yoneda Lemma]]) identifies elements of $X(A)$ with natural transformations $H_A \Rightarrow X$, which is another instance of "elements as maps from representables."

## See Also

- [[Adjoint Functors]] — Hom-set definition of adjunction
- [[Units and Counits]] — Unit/counit definition
- [[Limits and Colimits/General Limits]] — Limits as terminal cones
- [[Synthesis/Adjoint Functor Theorems]] — Constructing adjoints via initial objects
- [[Universal Properties/Universal Properties - Introduction]] — Unification of universal constructions
- [[Synthesis/Adjoints and Limits]] — derives the equivalence between right adjoints and limit-preserving functors; limits as right adjoints to the diagonal is a direct consequence of the terminal-cone characterisation in this note
- [[Representables/Yoneda Lemma]] — Yoneda identifies elements of $X(A)$ with natural transformations $H_A \Rightarrow X$; this is the representable analogue of the initial-object / comma-category perspective
