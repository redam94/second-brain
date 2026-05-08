---
title: "Pullbacks"
tags:
  - source/ingested
  - topic/category-theory
  - type/definition
  - doc/textbook
source: "[[raw/1612.09375v2.pdf]]"
source_location: "Ch. 5.1, pp. 118–128"
date_ingested: 2026-05-08
doc_type: textbook
depends_on:
  - "[[Products and Equalizers]]"
  - "[[Foundations/Categories]]"
used_by:
  - "[[General Limits]]"
  - "[[Colimits]]"
aliases:
  - pullback
  - fibred product
  - fibered product
  - pushout
  - pullback square
---

# Pullbacks

> [!summary]
> The pullback (fibred product) of $f: Y \to Z$ and $g: X \to Z$ is the universal object $P$ with maps to $X$ and $Y$ such that the two composites to $Z$ agree. Pullbacks are limits of the diagram shape $\bullet \to \bullet \leftarrow \bullet$. Monomorphisms are characterised by pullback squares.

## Overview

The pullback is the categorical version of the set-theoretic construction $\{(x,y) : f(x) = g(y)\}$. It arises naturally in many contexts: intersection of subobjects, base change in algebraic geometry, cartesian squares in topology. Dually, the pushout is the colimit version.

## Main Content

> [!definition] Definition 5.1.16: Pullback (Fibred Product)
> A **pullback** of $f: Y \to Z$ and $g: X \to Z$ is an object $P$ with maps $p_1: P \to X$ and $p_2: P \to Y$ such that $f \circ p_1 = g \circ p_2$ (the square commutes), and universal with this property: for any $Q$ with $q_1: Q \to X$ and $q_2: Q \to Y$ with $fq_1 = gq_2$, there is a unique $u: Q \to P$ with $p_1 \circ u = q_1$ and $p_2 \circ u = q_2$.
>
> $$
> \begin{array}{ccc} P & \xrightarrow{p_2} & Y \\ p_1 \downarrow & & \downarrow f \\ X & \xrightarrow{g} & Z \end{array}
> $$
>
> We write $P = X \times_Z Y$ (the **fibred product** of $X$ and $Y$ over $Z$).
^pullback-def

A diagram of this shape is a **pullback square** or **cartesian square**.

**Examples**:
- In **Set**: $X \times_Z Y = \{(x,y) \in X \times Y : g(x) = f(y)\}$.
- In **Top**: same as Set, with subspace topology from $X \times Y$.
- In **Grp**: pullback of $f: H \to G \leftarrow K :g$ is $\{(h,k) \in H \times K : f(h) = g(k)\}$.
- In a preorder: pullback of $a \leq c$ and $b \leq c$ is $a \times b = \inf(a,b)$ (if exists).
- In **Manifolds**: pullback of bundles; in **schemes**: fibre product.

> [!example] Example: Pullback in Set (BCT, Ch. 5.1)
> For $f: \{a,b\} \to \{0,1\}$ with $f(a)=0, f(b)=1$ and $g: \{c,d\} \to \{0,1\}$ with $g(c)=0, g(d)=0$, the pullback is $\{(a,c), (a,d)\}$ — all pairs mapping to the same element.

### Pullbacks and Monomorphisms

> [!theorem] Lemma 5.1.32: Monos and Pullback Squares (BCT, Ch. 5.1)
> A map $f: X \to Y$ is a **monomorphism** if and only if the following is a pullback square:
> $$
> \begin{array}{ccc} X & \xrightarrow{1_X} & X \\ 1_X \downarrow & & \downarrow f \\ X & \xrightarrow{f} & Y \end{array}
> $$
> i.e., if and only if the diagonal $X \to X \times_Y X$ is an isomorphism.
^mono-pullback

This characterises monomorphisms in purely categorical, limit-theoretic terms, without reference to elements.

### Pullbacks as Limits

The pullback is the limit of the diagram $X \xrightarrow{g} Z \xleftarrow{f} Y$ (shape $\bullet \to \bullet \leftarrow \bullet$, called the **cospan**). All three objects $X, Y, Z$ and the two maps $f, g$ are part of the diagram; the pullback is the universal cone over it.

### Pushouts (Dual Construction)

> [!definition] Definition: Pushout
> Dually, the **pushout** of $f: Z \to Y$ and $g: Z \to X$ is an object $Q$ with maps $i_1: X \to Q$ and $i_2: Y \to Q$ such that $i_1 \circ g = i_2 \circ f$, universal with this property.
>
> $$
> \begin{array}{ccc} Z & \xrightarrow{f} & Y \\ g \downarrow & & \downarrow i_2 \\ X & \xrightarrow{i_1} & Q \end{array}
> $$
>
> In **Set**: $Q = (X \sqcup Y) / \sim$ where $g(z) \sim f(z)$ for all $z \in Z$.
^pushout-def

**Examples**:
- In **Grp**: pushout = amalgamated free product.
- In **Top**: pushout = adjunction space (gluing).
- In **Ab**: pushout = cofibre/mapping cone construction.

### Pasting Lemma for Pullbacks

If you have a commutative grid of squares, the "pasting lemma" says: if the right square is a pullback, then the left square is a pullback if and only if the outer rectangle is a pullback.

## Connections

- **General limits** ([[General Limits]]) subsume pullbacks under the uniform definition.
- **Pushouts** are [[Colimits]] — they are the dual notion.
- **Monomorphisms** ([[Products and Equalizers]]) are characterised by pullback squares.
- In sheaf theory and algebraic geometry, base change = pullback of geometric objects.

## See Also

- [[Products and Equalizers]] — Other key special limits
- [[General Limits]] — The general definition
- [[Colimits]] — Pushouts and other colimits
