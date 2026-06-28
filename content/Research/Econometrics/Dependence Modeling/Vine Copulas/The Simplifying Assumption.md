---
title: The Simplifying Assumption
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Aas 2016 - Pair-Copula Constructions for Financial Applications.pdf]]"
source_location: "Sec. 2.1, p. 4"
date_ingested: 2026-06-28
folder: "Econometrics/Dependence Modeling/Vine Copulas"
doc_type: paper
depends_on:
  - "[[Pair-Copula Constructions]]"
used_by:
  - "[[Estimation and Structure Selection for Vines]]"
aliases:
  - Simplifying assumption
  - Simplified PCC
  - Simplified vine
  - Conditional independence of conditioning value
---

# The Simplifying Assumption

> [!summary]
> The **simplifying assumption** posits that each conditional pair-copula $c_{j,k\mid D}$ depends on the conditioning variables $\mathbf{x}_D$ **only through the conditional distribution functions** that form its arguments — **not** through the conditioning *values* $\mathbf{x}_D$ themselves. The pair-copula function (its family and parameters) is held **constant** as $\mathbf{x}_D$ varies. This yields the **simplified PCC**, the form used in essentially all practical financial applications.

## Overview

In full generality a PCC can represent almost any continuous multivariate distribution, because the conditional copula $C_{j,k\mid D}(\,\cdot,\cdot\,;\mathbf{x}_D)$ is allowed to *change shape* with the value of the conditioning vector $\mathbf{x}_D$. That generality makes inference intractable. The simplifying assumption removes the dependence on $\mathbf{x}_D$ except through the conditional margins, drastically reducing the parameter space and making likelihood-based estimation feasible.

## Main Content

> [!definition] The simplifying assumption (simplified PCC)
> For every edge with conditioned pair $\{j(e),k(e)\}$ and conditioning set $D(e)$, the pair-copula
> $$
> c_{j(e),k(e)\mid D(e)}\big(F(x_{j(e)}\mid \mathbf{x}_{D(e)}),\,F(x_{k(e)}\mid \mathbf{x}_{D(e)})\big)
> $$
> is assumed **independent of the conditioning value** $\mathbf{x}_{D(e)}$ except through its two arguments $F(x_{j(e)}\mid \mathbf{x}_{D(e)})$ and $F(x_{k(e)}\mid \mathbf{x}_{D(e)})$. Equivalently, the conditional copula's family and parameters do **not vary** with $\mathbf{x}_{D(e)}$. The resulting model is the **simplified PCC**. ^def

> [!definition] Pros
> - **Tractable inference** — a fixed copula family/parameter per edge enables sequential estimation, AIC/BIC family selection, and goodness-of-fit testing (see [[Estimation and Structure Selection for Vines]]).
> - **Parsimony** — without it, each conditional copula would be an entire function of $\mathbf{x}_D$, an infinite-dimensional nuisance.
> - **Often a good approximation** — even when the assumption is *far* from being fulfilled, Hobæk Haff, Aas & Frigessi (2010) show the simplified PCC can be a good approximation to the true distribution. ^pros

> [!definition] Cons and caveats
> - **Not universal** — not every multivariate distribution admits an exact simplified-PCC representation; in general it is only an approximation. Limitations are studied by Stöber, Joe & Czado (2013); the assumption is further examined by Killiches et al. (2016) and Spanhel & Kurz (2015).
> - **Non-simplified alternatives exist but are rarely used** — methods for estimating non-simplified vines have been proposed (Acar, Genest & Neslehova 2012; Schellhase & Spanhel 2016), but their use in **financial applications is still very limited**, so the review (and practice) focuses on the simplified form. ^cons

## Examples

> [!example] What "independent of the conditioning value" means concretely
> Consider the edge $13\mid2$ in a D-vine. The simplifying assumption says the copula linking $X_1$ and $X_3$ **given** $X_2=x_2$ has the **same family and parameter** whether $x_2$ is small, medium, or large — only its inputs $F(x_1\mid x_2)$ and $F(x_3\mid x_2)$ shift with $x_2$. A *non-simplified* model would, e.g., let the Kendall's $\tau$ of $c_{13\mid2}$ be a function $\tau(x_2)$ (stronger conditional dependence in the tails of $X_2$).

## Connections

- [[Pair-Copula Constructions]] — the conditional pair-copulae to which the assumption applies.
- [[C-vines, D-vines, and Regular Vines]] — the assumption is invoked for every higher-tree edge in any vine.
- [[Estimation and Structure Selection for Vines]] — the assumption is what makes sequential estimation/selection feasible.

## See Also

- [[Vine Copulas - Overview]]
- [[Research/Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
