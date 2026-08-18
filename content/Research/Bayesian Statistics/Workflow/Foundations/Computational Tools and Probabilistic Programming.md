---
title: "Computational Tools and Probabilistic Programming"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - method/brms
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 3.1-3.4, pp. 25-28"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[MCMC Basics]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Bioassay - A First Probabilistic Program]]"
  - "[[Modeling as Software Development]]"
  - "[[Approximate Algorithms and Approximate Models]]"
aliases:
  - "Probabilistic programming languages"
  - "PPL"
  - "Workflow tooling"
---

# Computational Tools and Probabilistic Programming

> [!summary]
> The toolchain that makes the workflow of this book practical: a **probabilistic programming
> framework** (model description language + inference engine) plus a surrounding ecosystem of
> diagnostic and checking packages. The chapter's substantive point is that **inference engines must
> be paired with diagnostics** — an automatic sampler without automatic detection of its own failure
> is not a usable workflow tool. It closes with a candid section on notation, treating naming
> conventions as a genuine part of workflow rather than a style question.

## Overview

"Point-and-click statistical analysis is possible. But beyond simple regression-type applications,
effective and reproducible statistical analysis involves at [least] simple programming or scripting —
that is, construction of an **active plan** for data processing, analysis, and display."

### Statistical programming environments

R was designed for statistical computation; Python and Julia have statistical packages extending them.
The case studies in Part 4 use R extensively, "but the core workflows and model structures are
portable to any statistical programming environment. In practice, a statistical workflow may make use
of more than one programming language."

### A short history of Bayesian computation

| Era | Method | Reference |
|---|---|---|
| Traditional | Analytic calculation + normal approximation | — |
| 1990s | Gibbs and Metropolis algorithms became widespread | Robert and Casella 2011 |
| Current | **Variational inference** | Blei, Kucukelbir, and McAuliffe 2017 |
| Current | **Sequential Monte Carlo** | Doucet, de Freitas, and Gordon 2013 |
| Current | **HMC and NUTS** | Neal 2011; Hoffman and Gelman 2014; Betancourt 2017a |

- **Variational inference** — a class of methods that construct a distributional approximation by
  minimizing (or approximately minimizing) some measure of discrepancy between approximation and
  target. It is the current standard for computationally intensive models such as deep neural
  networks, and "in many Bayesian applications can provide a fast but possibly inaccurate
  approximation."
- **Sequential Monte Carlo** — a generalization of MCMC that can be applied in parallel.
- **HMC/NUTS** — generalizations of Metropolis that use gradient computation to move efficiently
  through continuous probability spaces.

> [!important] The book's computational commitment
> "In the present book we focus on fitting Bayesian models using the **NUTS variant of HMC** and other
> posterior approximations, as implemented in Stan and other probabilistic programming languages.
> While similar principles should apply also to other software and other algorithms, **there will be
> differences in the details.**"

## Main Content

### What a probabilistic programming framework is

> [!definition] Probabilistic programming framework (Ch. 3.2, p. 26)
> A framework includes **at least two components**:
> 1. A **model description language** expressing the statistical model.
> 2. An **inference engine** estimating the posterior (e.g. a variational algorithm and a NUTS/HMC
>    sampler).
>
> The language may be a **domain-specific language** designed for model building (Stan) or a **generic
> host language** (PyMC or JAX in Python). In some frameworks the language also includes components
> for *controlling* the inference algorithms (Pyro).
^def-ppl

**Why a dedicated PPL rather than any programming language:**
- pre-defined model components such as common probability distributions, making model description faster;
- **"syntactic sugar"** matching usual mathematical presentation — most notably the `~` notation shared
  by BUGS and Stan, which makes the code look like the equation.

**Automatic inference and its enabling technology.** Inference engines "aim to make inference
automatic, so that changes in the model code do not require rewriting the inference code." Most modern
frameworks rely on algorithms using **gradients of the log density**, computed by **automatic
differentiation** engines that combine elementary differentiation rules and the chain rule to obtain
partial derivatives from arbitrarily complex model code.

> [!important] Diagnostics are part of the framework, not an add-on
> "In addition to inference algorithms, software environments must provide **diagnostics to detect
> when the computation is unreliable.** … Beyond the details of each diagnostic for each algorithm, we
> emphasize their importance in a general and robust workflow."
>
> Frameworks typically include *minimal* diagnostics; the wider environment supplies the rest, and
> "these additional tools are often crucial for making the overall workflow easier and more reliable."

The Wikipedia page on probabilistic programming currently lists **over 50** PPL frameworks
(Štrumbelj et al. 2024 survey several). Stan is the most popular and is used throughout this book,
called from R.

### The workflow toolchain used in the case studies

Each package maps onto a box in [[From Inference to Data Analysis to Workflow|Figure 2.1]]:

| Package | Workflow step it serves | Note |
|---|---|---|
| **`rstanarm`** (Goodrich et al. 2024) | Pre-compiled common regressions via formula syntax | [[Bayesian Linear Regression]] |
| **`brms`** (Bürkner 2017) | Formula syntax, more flexible but requires compilation | [[Bioassay - A First Probabilistic Program]] |
| **`SBC`** (Modrák et al. 2025) | Simulation-based calibration checking | [[The SBC Algorithm]] |
| **`posterior`** (Bürkner, Gabry, Kay, et al. 2024) | Posterior inference checking, manipulation of draws | [[Chains, Iterations, and Effective Sample Size]] |
| **`bayesplot`** (Gabry and Mahr 2024) | Prior and posterior visualization and checking | [[Visualizing High-Dimensional Inference]] |
| **`priorsense`** (Kallioinen et al. 2024) | Prior sensitivity analysis | [[Influence of Likelihood and Prior]] |
| **`tidybayes`** / **`ggdist`** (Kay 2023, 2024) | Posterior visualization | [[Visualizing High-Dimensional Inference]] |
| **`loo`** (Vehtari, Gabry, et al. 2024) | Model assessment and comparison | [[Cross Validation Checking]] |
| **`projpred`** (Piironen, Paasiniemi, Catalina, et al. 2023) | Variable and model-structure selection | [[Model Selection and Overfitting]] |

**Beyond R:** `ArviZ` (Kumar et al. 2019; Martin et al. 2026) for posterior checking, visualization,
and model comparison in Python and Julia; `multiverse` (Sarma, Kale, et al. 2023) for handling
alternative versions of a model; `targets` (Landau 2021) for automatically re-running only the
necessary workflow steps when data change.

> [!important] Notebooks record a *cleaned* workflow, not the real one
> Programming and documentation are central to workflow — a mix of console commands, scripts, and
> notebooks (Quarto, Jupyter) combining documentation, code, and output. But: "Usually many of the
> intermediate experiments are not recorded, and only a cleaner record of the workflow is visible in
> the final document. **Therefore a final script is not a sufficient description of an analyst's
> workflow, nor should it attempt to be.**"
>
> Compare the psychological point in [[Four Modeling Scenarios#Psychological struggles]] and the
> version-control discussion in [[Modeling as Software Development]].

### Notation as a workflow decision

"Decisions about notation are themselves part of workflow, bridging between your code and how it will
be applied. **Recommendations for notation in mathematics and code are guidelines, not precise rules**
… because they are not necessary for the code to run, but also because **they can conflict.**"

**Recommended conventions:**
- lower case for data vectors: $x$, $y$;
- upper case for data matrices: $X$;
- lower/upper case pairs for counters and their bounds: $j = 1,\dots,J$ (R/Stan `j in (1:J)`);
- Greek letters in mathematics spelled out in code (`alpha` for $\alpha$), since keyboards lack Greek;
- in Stan, `lpdf` and `lpmf` for log probability density and mass functions, where the mathematics
  writes $p(y)$ for densities and $\Pr(y = 1)$ for discrete probabilities.

**Where conventions genuinely conflict:**

| Conflict | Detail |
|---|---|
| Index origin | R and Stan index from 1 following mathematics; Python indexes from 0 following computer science |
| Loop naming | Computer science uses the same letter upper/lower for counter and bound ($n = 1,\dots,N$); statistics indexes data $i = 1,\dots,n$ because **$n$ is the sample size and $N$ the population size** |
| $X$ and $Y$ | Survey sampling uses $x,y$ for sample and $X,Y$ for population — conflicting with regression, where $X$ is the matrix of multiple predictors and $Y$ a random variable. Outside survey sampling and regression, $X$ is the generic random variable |

**The resolution is contextual, not universal:** "with so many concepts to convey and just 52 upper and
lower case letters available," use $x$/$X$ for sample/population in a single-predictor sampling
problem, but $X$ for the data matrix and $X_{\text{pop}}$ for the population matrix when there are
multiple predictors; use $i = 1,\dots,n$ for a simple model and $n = 1,\dots,N$ when there are many
levels of indexing.

> [!warning] Notation should change over the course of a project
> "When working by yourself and exploring modeling possibilities, it can make sense to write programs
> that are clearest to you. Shortcuts that work during the middle of a project might not be
> appropriate more generally. **The best notation for a project may only be clear once the project
> nears completion.** If the code will be used externally or as part of a collaborative project, we
> recommend using a higher standard."
>
> The book itself models this: "you will see different notation and coding preferences (for example,
> base R vs. tidyverse and ggplot2) based on the preferences of different co-authors."

The notation problem becomes acute in hierarchical models, where $\mu$ and $\sigma$ serve both as
parameter names and as operators denoting prior location and scale, producing objects like
$\mu_{\sigma_a}$ and $\sigma_{\mu_a}$ — see the extended complaint in
[[Multiple-Choice Exam - A Full Workflow Walkthrough#Naming of parameters]].

## Connections

- This chapter supplies the *instrument*; [[Bioassay - A First Probabilistic Program]] shows it in use
  end to end on a four-data-point problem.
- The insistence that diagnostics ship with inference engines is developed quantitatively in
  [[Chains, Iterations, and Effective Sample Size]] and [[Fit Fast, Fail Fast]].
- The approximate-inference options listed here are evaluated in
  [[Approximate Algorithms and Approximate Models]].

## See Also
- [[HMC and Stan in Practice]] — the algorithmic detail behind NUTS
- [[Efficient MCMC]] — convergence and efficiency background from BDA3
- [[Modeling as Software Development]] — version control, testing, reproducibility for model code
- [[Introduction to Bayesian Computation]] — BDA3's overview of the computational landscape
