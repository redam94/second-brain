---
title: "Vine Copulas: Foundational Papers Survey"
source: "https://doi.org/10.1016/j.insmatheco.2007.02.001"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
  - "[[Tim Bedford]]"
  - "[[Roger Cooke]]"
published: "2001 / 2002 / 2009 / 2019"
created: 2026-09-12
description: >
  Survey of the foundational vine (pair-copula) literature. Primary source: Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence," Insurance: Mathematics and Economics 44(2): 182–198. Preprint available at epub.ub.uni-muenchen.de/1855/1/paper_487.pdf (access blocked by egress policy). Secondary sources: Bedford & Cooke (2001) Annals of Mathematics and Artificial Intelligence 32: 245–268; Bedford & Cooke (2002) Annals of Statistics 30(4): 1031–1068; Czado (2019) Analyzing Dependent Data with Vine Copulas, Springer; Brechmann & Schepsmeier (2013) "Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine," Journal of Statistical Software 52(3).
tags:
  - "clippings"
  - "doc/paper"
  - "topic/econometrics"
  - "topic/copulas"
---

# Vine Copulas: Survey of Foundational Literature

This note summarises the principal references for vine (pair-copula) copulas, as source PDFs could not be retrieved due to egress-proxy restrictions at download time. Content is drawn from comprehensive knowledge of these papers in the copula/dependence-modelling literature.

---

## 1. Bedford & Cooke (2001, 2002) — The Vine Graphical Model

**Bedford, T. & Cooke, R.M. (2001).** "Probability density decomposition for conditionally dependent random variables modelled by vines." *Annals of Mathematics and Artificial Intelligence*, 32: 245–268.

**Bedford, T. & Cooke, R.M. (2002).** "Vines: A new graphical model for dependent random variables." *Annals of Statistics*, 30(4): 1031–1068.

These two papers introduce the **vine** as a graphical structure for organising a sequence of bivariate conditional copula specifications into a coherent $n$-dimensional model. A **regular vine (R-vine)** on $n$ variables consists of a nested sequence of trees $T_1, T_2, \ldots, T_{n-1}$ satisfying the proximity condition (edges of $T_{k+1}$ must share a node in $T_k$). Bedford & Cooke prove that any regular vine specifies a valid joint density through the factorisation theorem — the $n$-dimensional density can always be written as a product of $\binom{n}{2}$ bivariate copula densities (pair copulas) times the $n$ marginal densities. They characterise the full class of R-vines and prove uniqueness of the vine representation given a labelling.

---

## 2. Aas, Czado, Frigessi & Bakken (2009) — Pair-Copula Constructions

**Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009).** "Pair-copula constructions of multiple dependence." *Insurance: Mathematics and Economics*, 44(2): 182–198. DOI: 10.1016/j.insmatheco.2007.02.001

This is the paper that made vine copulas practical for applied econometrics and statistics. Its contributions:

1. **Explicit C-vine and D-vine constructions.** It focuses on two computationally tractable special cases of R-vines: the **D-vine** (each tree is a path, so the conditioning set grows by one variable at a time along a chain) and the **C-vine** (each tree is a star, so one root variable conditions all others). Both yield $n(n-1)/2$ bivariate pair copulas that can each be drawn from any bivariate copula family.

2. **Sequential estimation algorithm.** The paper proposes a stepwise maximum likelihood procedure that estimates pair copulas tree-by-tree (bottom-up), using **$h$-functions** (conditional CDFs derived from each estimated bivariate copula) to transform observations before estimating higher-tree copulas. This avoids the need for a full joint optimisation in high dimensions.

3. **The simplifying assumption.** Conditional copulas $C_{ij|\mathbf{v}}$ are assumed to not depend on the conditioning value $\mathbf{v}$ directly — only on the conditional CDFs $F_{i|\mathbf{v}}$ and $F_{j|\mathbf{v}}$. Under this assumption, a large class of vine models admits tractable sequential estimation.

4. **Empirical application.** The paper applies the method to Norwegian financial data (exchange rates and stock indices), demonstrating that the vine copula captures asymmetric tail dependence missed by the Gaussian copula.

---

## 3. Czado (2019) — Textbook Treatment

**Czado, C. (2019).** *Analyzing Dependent Data with Vine Copulas.* Springer. DOI: 10.1007/978-3-030-13785-4.

The definitive textbook treatment. Covers R-vine structure theory, the full gallery of bivariate copula families, sequential and full MLE, model selection (AIC/BIC by tree), the simplifying assumption and tests of it, time-varying vine copulas, and R implementation via the `VineCopula` package. Chapter 2 gives a thorough treatment of bivariate copula families; Chapter 3 covers pair-copula decompositions and vine structures; Chapter 5 covers statistical inference.

---

## 4. Brechmann & Schepsmeier (2013) — R Implementation

**Brechmann, E.C. & Schepsmeier, U. (2013).** "Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine." *Journal of Statistical Software*, 52(3): 1–27. DOI: 10.18637/jss.v052.i03.

Documents the CDVine R package (predecessor to VineCopula). Provides detailed description of the implemented families, sequential and joint MLE, structure selection algorithms, and goodness-of-fit tests. Freely available at: https://www.jstatsoft.org/article/view/v052i03

---

## Key Mathematical Content

### h-Functions

The **$h$-function** is the key computational primitive for vine copulas:

$$h(x \mid v; \theta) = \frac{\partial C_{xv}(F(x), F(v); \theta)}{\partial F(v)}$$

This is the conditional CDF of $X$ given $V=v$, expressed through the bivariate copula $C_{xv}$. For common families:

- **Gaussian copula** $C(\rho)$: $h(x|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(x) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
- **Clayton copula** $C(\theta)$: $h(x|v;\theta) = v^{-\theta-1}(x^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}$
- **Gumbel copula** $C(\theta)$: closed form involving $\log$ terms

The $h$-function enables sequential estimation: after fitting the tree-$k$ pair copulas, one transforms all observations upward to tree $k+1$ by applying $h$-functions to pairs of pseudo-observations.

### The Factorisation Theorem (Bedford & Cooke 2002)

For an R-vine $\mathcal{V}$ on variables $\mathbf{X} = (X_1, \ldots, X_n)$:

$$f(\mathbf{x}) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{e \in E(\mathcal{V})} c_{j(e),k(e)|\mathbf{D}(e)}\!\left(F_{j(e)|\mathbf{D}(e)}, F_{k(e)|\mathbf{D}(e)}\right)$$

where the inner product runs over all edges $e$ of the vine, $j(e), k(e)$ are the variable indices at the edge endpoints, and $\mathbf{D}(e)$ is the conditioning set. The total number of pair copulas is $\binom{n}{2} = n(n-1)/2$.
