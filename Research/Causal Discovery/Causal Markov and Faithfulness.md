---
title: "Causal Markov and Faithfulness"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS.bib]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 2–3; Kalisch & Bühlmann (2007), §2"
date_ingested: 2026-08-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
aliases:
  - "Causal Markov Condition"
  - "Faithfulness Assumption"
  - "Causal Sufficiency"
  - "CMC"
---

# Causal Markov and Faithfulness

> [!summary]
> Constraint-based causal structure learning rests on three identifying assumptions:
> the **Causal Markov Condition** (d-separation in the DAG implies conditional independence),
> **Faithfulness** (the converse — no cancellations in the distribution), and **Causal
> Sufficiency** (no hidden common causes). Together, they make the DAG's statistical fingerprint
> unique, enabling structure learning from conditional independence tests alone.

## Overview

Any method that learns a DAG from observational conditional-independence (CI) tests — including
the [[PC Algorithm - Overview|PC algorithm]] — implicitly assumes that the true data-generating
process can be *faithfully* represented as a DAG over the observed variables. These assumptions
formalize what it means for a DAG to be a valid causal model of a distribution.

## Main Content

### The Causal Markov Condition (CMC)

> [!definition] Definition: Causal Markov Condition (Spirtes et al. 2000, §2.2)
> A DAG $\mathcal{G}$ and a probability distribution $\mathbb{P}$ over its vertices $\mathbf{V}$
> satisfy the **Causal Markov Condition** if every variable $X_i \in \mathbf{V}$ is
> independent of its **non-descendants** given its **parents** in $\mathcal{G}$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \setminus \text{Pa}_{\mathcal{G}}(X_i) \mid \text{Pa}_{\mathcal{G}}(X_i).$$
> Equivalently, $\mathcal{G}$ and $\mathbb{P}$ satisfy the CMC iff every d-separation statement
> in $\mathcal{G}$ implies the corresponding conditional independence in $\mathbb{P}$:
> $$X \perp_{\mathcal{G}} Y \mid \mathbf{Z} \implies X \perp\!\!\!\perp Y \mid \mathbf{Z} \text{ in } \mathbb{P}.$$
> $\mathcal{G}$ is then called a **Markov model** (or **I-map**) for $\mathbb{P}$.
^def-cmc

The CMC says the DAG is *at least as informative* as the distribution: every independence the
DAG asserts actually holds. It does **not** say the converse — the DAG might assert independences
that are not present (i.e., it might be a supergraph of the true structure).

### Faithfulness

> [!definition] Definition: Faithfulness (Spirtes et al. 2000, §2.3; also Stability in Pearl 2000)
> A probability distribution $\mathbb{P}$ is **faithful** to a DAG $\mathcal{G}$ if **every**
> conditional independence in $\mathbb{P}$ is entailed by d-separation in $\mathcal{G}$:
> $$X \perp\!\!\!\perp Y \mid \mathbf{Z} \text{ in } \mathbb{P} \implies X \perp_{\mathcal{G}} Y \mid \mathbf{Z}.$$
> Together with the CMC, faithfulness gives a **two-way correspondence**:
> $$X \perp\!\!\!\perp Y \mid \mathbf{Z} \text{ in } \mathbb{P} \iff X \perp_{\mathcal{G}} Y \mid \mathbf{Z} \text{ in } \mathcal{G}.$$
^def-faithfulness

Faithfulness is the crucial assumption that allows structure **identification**: without it,
two different DAG structures could produce identical conditional independence patterns in the
data, making them indistinguishable even with infinite samples.

> [!note] When faithfulness fails
> Faithfulness fails when path coefficients cancel exactly — e.g., in a linear SEM
> $X \to Z$ and $X \to Y \to Z$ with coefficients such that the total effect of $X$ on $Z$
> is zero even though both paths exist. This produces "spurious independences" not encoded
> by the DAG. Faithfulness violations are **Lebesgue-measure zero** in coefficient space
> (for linear SEMs), justifying treating them as negligible — but violations can occur near
> boundaries and affect finite-sample performance. Kalisch & Bühlmann (2007) introduce
> the weaker **strong-faithfulness** condition ($|\rho_{XY|\mathbf{Z}}| \geq \lambda/\sqrt{n}$)
> to quantify "how faithful" the distribution is in finite samples.

### Causal Sufficiency

> [!definition] Definition: Causal Sufficiency (Spirtes et al. 2000, §2.6)
> A set of variables $\mathbf{V}$ is **causally sufficient** for a system if every common
> cause (confounder) of any two variables in $\mathbf{V}$ is also in $\mathbf{V}$.
> Equivalently, there are **no hidden (latent) common causes** of the observed variables.
^def-sufficiency

Without causal sufficiency, the true causal graph has additional unmeasured nodes, and
the marginal distribution over $\mathbf{V}$ cannot be faithfully represented by any DAG
over $\mathbf{V}$ alone. Extensions of PC that relax this assumption include:
- **FCI** (Fast Causal Inference, Spirtes et al. 2000): allows latent confounders, returns
  a **PAG** (Partial Ancestral Graph) rather than a CPDAG.
- **RFCI** (Richardson & Spirtes 2002): computationally cheaper FCI variant.

### The Identification Result

> [!theorem] Theorem: Identifiability up to Markov Equivalence (Spirtes et al. 2000; Verma & Pearl 1990)
> Under the CMC, Faithfulness, and Causal Sufficiency, **any** consistent procedure for
> testing conditional independence can recover the **Markov equivalence class** (MEC) of
> the true DAG $\mathcal{G}^*$ from the distribution $\mathbb{P}$ in the large-sample limit.
> The MEC is the finest identifiable structure from observational data alone.
>
> **Proof sketch:** By faithfulness + CMC, the set of CI statements in $\mathbb{P}$ determines the
> d-separation structure of $\mathcal{G}^*$ exactly. By the Verma-Pearl theorem
> ([[Markov Equivalence Classes and CPDAGs]]), the d-separation structure determines the
> Markov equivalence class (skeleton + v-structures), so the MEC is identifiable.
^thm-identifiability

The MEC is the fundamental identification frontier: **in general, one cannot identify a single
DAG from observational data** — only the equivalence class. Additional assumptions
(linear-non-Gaussian errors → LiNGAM; equal error variances; known intervention targets)
can sharpen identification to a single DAG.

## Examples

> [!example] Example: Faithfulness failure in a linear SEM
> Consider three variables with linear SEM:
> $$Z \leftarrow X \xrightarrow{\beta} Y \xrightarrow{\gamma} Z, \quad \text{with } X \to Z \text{ coefficient } \alpha.$$
> If $\alpha + \beta\gamma = 0$ exactly, then $X \perp\!\!\!\perp Z$ marginally even though the path
> $X \to Z$ exists and the path $X \to Y \to Z$ exists. A constraint-based algorithm would
> incorrectly remove the edge $X - Z$ from the skeleton. In practice, exact cancellations
> are rare, but near-cancellations inflate Type I errors in finite samples.

## Connections

- **d-separation**: the central graphical concept underlying the CMC. See [[Directed Acyclic Graphs]]
  for the formal definition and [[Spurious Association and Confounds]] for applied examples.
- **Identifiability frontier**: the MEC is what constraint-based methods recover; the CPDAG
  representing it is defined in [[Markov Equivalence Classes and CPDAGs]].
- **Score-based view**: [[GES - Greedy Equivalence Search]] avoids explicit CI testing by
  optimizing a score, but implicitly relies on faithfulness for its consistency proof.
- **Selection bias / latent confounders**: when causal sufficiency fails, see the vault's
  [[The Selection Problem]] and [[Activity Bias in Advertising]] for applied examples of
  hidden confounders in marketing data.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, Markov factorization
- [[Markov Equivalence Classes and CPDAGs]] — what is identifiable (the MEC)
- [[PC Algorithm - Overview]] — main constraint-based algorithm using CI tests
- [[GES - Greedy Equivalence Search]] — score-based alternative with same identification target
- [[Spurious Association and Confounds]] — fork/pipe/collider d-separation patterns
