---
title: "s-Separation in Summary DAGs: Sound and Complete CI Identification"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/causal-dag
  - type/theorem
  - doc/paper
source: "[[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]]"
source_location: "§4.2, pp. 8–9"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Canonical Causal DAGs]]"
  - "[[Summary Causal DAGs]]"
used_by:
  - "[[Do-Calculus in Summary Causal DAGs]]"
aliases:
  - s-separation
  - CI identification in summary DAGs
---

# s-Separation in Summary DAGs: Sound and Complete CI Identification

> [!summary]
> *s-Separation* extends d-separation to summary causal DAGs. A CI statement $X \perp\!\!\!\perp Y \mid Z$ holds in a summary DAG $(\mathcal{H}, f)$ if $X$ and $Y$ are d-separated in *every* causal DAG compatible with $\mathcal{H}$. This is equivalently characterized by d-separation in the canonical causal DAG $\mathcal{G}_\mathcal{H}$. Theorem 4.2 establishes that s-separation is sound and complete: the s-separation algorithm correctly identifies exactly those CIs that are valid across all compatible DAGs.

## Overview

In a standard causal DAG, d-separation identifies all conditional independence relationships encoded in the graph. For a summary DAG — which represents a *set* of compatible causal DAGs — we need a stricter notion: a CI should only be claimed if it holds in all compatible DAGs (conservative inference). s-Separation provides this.

## Main Content

### CI Validity in Summary DAGs

> [!definition] Valid CI in a Summary Causal DAG (Definition 6)
> A CI statement $(X \perp\!\!\!\perp Y \mid Z)$ is **valid** in a summary causal DAG $(\mathcal{H}, f)$ if and only if it holds in every causal DAG $\mathcal{G} \in \{\mathcal{G}_i\}_\mathcal{H}$ (every DAG compatible with $\mathcal{H}$).
>
> Equivalently: $X$ and $Y$ are d-separated given $Z$ in every compatible $\mathcal{G}$.
^def-valid-ci

This is stricter than d-separation in $\mathcal{H}$ alone, because $\mathcal{H}$ might encode a CI that not all compatible DAGs share.

### s-Separation

> [!definition] s-Separation (Definition 7)
> Given a summary causal DAG $(\mathcal{H}, f)$ and disjoint sets $X, Y, Z \subseteq \mathcal{V}(\mathcal{H})$, nodes $X$ and $Y$ are **s-separated** given $Z$ in $(\mathcal{H}, f)$, denoted:
> $$X \perp\!\!\!\perp_s Y \mid Z_{(\mathcal{H}, f)}$$
> if and only if $f^{-1}(X)$ and $f^{-1}(Y)$ are **d-separated** given $f^{-1}(Z)$ in the **canonical causal DAG** $\mathcal{G}_\mathcal{H}$.
>
> That is: expand the summary DAG nodes back to their original variable sets, then apply standard d-separation in the canonical DAG.
^def-s-separation

**Key property**: Because $\mathcal{G}_\mathcal{H}$ is a supergraph of any compatible $\mathcal{G}$ (it has the most edges), d-separation in $\mathcal{G}_\mathcal{H}$ is the *strictest* criterion — it identifies only CIs present in all compatible DAGs, not just some.

### Algorithm for s-Separation

> [!definition] s-Separation Algorithm
> Given summary DAG $(\mathcal{H}, f)$:
> 1. Construct the canonical causal DAG $\mathcal{G}_\mathcal{H}$ (using Definition 5 in [[Canonical Causal DAGs]]).
> 2. For query $(X \perp\!\!\!\perp Y \mid Z)$ in the summary: expand to $(f^{-1}(X) \perp\!\!\!\perp f^{-1}(Y) \mid f^{-1}(Z))$ in $\mathcal{G}_\mathcal{H}$.
> 3. Apply any standard d-separation algorithm on $\mathcal{G}_\mathcal{H}$.
>
> Result: the CI holds in the summary DAG iff it holds in this expanded query.
^def-s-sep-algorithm

**Why naive d-separation on $\mathcal{H}$ fails**: Consider a 5-node summary. Two nodes $A$ and $C$ may appear d-separated in $\mathcal{H}$, but in the canonical DAG the within-cluster edges create a path between $f^{-1}(A)$ and $f^{-1}(C)$ — so the CI does not actually hold in all compatible DAGs.

> [!example] s-Separation Example (from §4.2.1)
> Referring to Fig. 3, consider summary $\mathcal{H}_1$ (Fig. 4a, contracting $B$ and $C$ into cluster $BC$).
>
> Query: $(B \perp\!\!\!\perp_d E \mid D)$ in $\mathcal{H}_1$ — does this hold?
>
> In the canonical DAG $\mathcal{G}_{\mathcal{H}_1}$: the cluster $BC$ is expanded; check d-separation of $f^{-1}(B) = \{B, C\}$ and $f^{-1}(E) = \{E\}$ given $f^{-1}(D) = \{D\}$ in $\mathcal{G}_{\mathcal{H}_1}$.
>
> Result: $(B \perp\!\!\!\perp E \mid D)$ and $(C \perp\!\!\!\perp E \mid D)$ hold in $\mathcal{H}_1$ (established in the paper), but $(BC \perp\!\!\!\perp E \mid D)$ with the canonical expansion shows this holds only if the within-cluster $B \to C$ edge doesn't create a path — which must be checked explicitly.
^ex-s-sep

### Soundness and Completeness

> [!theorem] Theorem 4.2 — Soundness and Completeness of s-Separation
> Let $(\mathcal{H}, f)$ be a summary causal DAG for $\mathcal{G}$, and let $X, Y, Z \subseteq \mathcal{V}(\mathcal{H})$ be disjoint sets.
>
> $X$ and $Y$ are **s-separated** given $Z$ in $(\mathcal{H}, f)$ **if and only if** $X$ and $Y$ are **d-separated** given $Z$ in every causal DAG $\mathcal{G} \in \{\mathcal{G}_i\}_\mathcal{H}$ compatible with $\mathcal{H}$.
>
> Formally:
> $$(X \perp\!\!\!\perp_s Y \mid Z)_{(\mathcal{H},f)} \iff \forall \mathcal{G} \in \{\mathcal{G}_i\}_\mathcal{H}: (f^{-1}(X) \perp\!\!\!\perp_d f^{-1}(Y) \mid f^{-1}(Z))_\mathcal{G}$$
>
> **Soundness**: If s-separation says $X \perp\!\!\!\perp Y \mid Z$, then this CI holds in all compatible DAGs (no false claims of independence).
>
> **Completeness**: If $X \perp\!\!\!\perp Y \mid Z$ holds in all compatible DAGs, s-separation will identify it (no missed valid CIs).
>
> **Proof**: Uses the equivalence of RBs (Theorem 4.1): the canonical DAG $\mathcal{G}_\mathcal{H}$ is compatible with $\mathcal{H}$ and is a supergraph of any other compatible DAG. Therefore d-separation in $\mathcal{G}_\mathcal{H}$ is equivalent to d-separation in all compatible DAGs.
^thm-s-sep-soundness-completeness

### Practical Implication

s-Separation provides a **conservative** but **correct** inference tool:
- It may identify fewer CIs than the true original DAG (because it uses the strictest compatible DAG).
- But every CI it identifies is guaranteed to hold — no spurious independence assumptions.
- This is the correct tradeoff for summarization: we lose some precision but never introduce incorrect assumptions into a causal analysis.

## Connections

- Extends [[Directed Acyclic Graphs]]'s d-separation to the summary context.
- The soundness guarantee is critical for [[Do-Calculus in Summary Causal DAGs]] — do-calculus requires valid CI statements as its core primitive.
- The conservative nature parallels the approach in [[Frequentist Causal Estimation]] — using larger adjustment sets (more confounders) is conservative but unbiased.

## See Also
- [[Canonical Causal DAGs]] — provides the mathematical basis for s-separation
- [[Summary Causal DAGs]] — the object s-separation operates on
- [[Do-Calculus in Summary Causal DAGs]] — uses s-separation for causal effect identification
