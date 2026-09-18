---
title: "Comparing Models Visually"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9.3, pp. 160-162 (Figures 9.1, 9.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Topology of Models]]"
  - "[[Causal Inference as Generalization]]"
  - "[[Visualizing High-Dimensional Inference]]"
used_by:
  - "[[Model Selection and Overfitting]]"
  - "[[Stacking and Predictive Model Averaging]]"
aliases:
  - "Multiverse analysis"
  - "Eight reasons to fit multiple models"
  - "Explore the process of model fitting"
---

# Comparing Models Visually

> [!summary]
> **"The key aspect of Bayesian workflow, which takes it beyond Bayesian data analysis, is that we are
> fitting many models while working on a single problem"** — and the point is not selection or averaging
> but **understanding how an inference for a fixed quantity of interest moves as adjustments are added.**
> Figure 9.1 does exactly this: SATE and PATE plotted across four nested models. The section also
> introduces **multiverse analysis** as the honest response to finding several models that all pass the
> checks, along with its main caveat: researcher degrees of freedom.

## Overview

> [!important] The thesis (Ch. 9.3, p. 160)
> "**We are not talking here about model selection or model averaging, but rather of the use of a series of
> fitted models to better understand each one.** In the words of Wickham, Cook, and Hofmann (2015), we seek
> to '**explore the process of model fitting, not just the end result.**'"

> [!definition] Eight reasons we fit multiple models (Ch. 9.3, p. 160)
> 1. "**It can be hard to fit and understand a big model, so we build up from simple models.**"
> 2. "**When constructing models, we make a lot of mistakes: typos, coding errors, conceptual errors** (for
>    example, **not realizing that the observations don't contain useful information for some parts of the
>    model**), etc."
> 3. "**As we get more data, we typically expand our models accordingly.** For example, if we're doing
>    pharmacology and we get data on a new group of patients, we might let certain parameters vary by
>    group."
> 4. "**Often we fit a model that is mathematically well specified, but once we fit it to data we realize
>    that there's more we can do, so we expand it.**"
> 5. "**When we first fit a model, we often put it together with various placeholders.** We're often
>    starting with weak priors and making them stronger, or starting with strong priors and relaxing them.
>    Similarly we will typically begin with a data model with known simplifications, such as assuming
>    linearity, with the understanding that we will add complexity later."
> 6. "**We'll check a model, find problems, and then expand or replace it.** This is part of 'Bayesian data
>    analysis'; **the extra 'workflow' part is that we still keep the old model, not for the purpose of
>    averaging but for the purpose of understanding what we are doing.**"
> 7. "**Sometimes we fit simple models as comparisons.** For example, if you're doing a big regression for
>    causal inference, **you'll also want to do a simple unadjusted comparison and then see what the
>    adjustments have done.**"
> 8. "**The above ideas are listed as being motivated by statistical considerations, but sometimes we're
>    jolted into action because of computational problems.**"
^def-eight-reasons

> [!warning] Researcher degrees of freedom — two distinct dangers
> "Given that we are fitting multiple models, we also have to be concerned with **researcher degrees of
> freedom** (Simmons, Nelson, and Simonsohn 2011):
> 1. "**most directly from overfitting if a single best model is picked**";
> 2. "**more subtly that if we are not careful, we can consider our inferences from a set of fitted models
>    to bracket some total uncertainty, without recognizing that there are other models we could have
>    fit.**"
>
> "**This concern arises in our election forecasting model, where ultimately we only have a handful of past
> presidential elections with which to calibrate our predictions.**"
>
> Danger 2 is the subtler one and is easy to commit unknowingly: a spread across four fitted models is not
> a posterior over model space. See [[Model Selection and Overfitting]].
^wrn-researcher-dof

## Main Content

### The worked example: treatment effects across four models

> [!example] Figure 9.1 — SATE and PATE across a sequence of adjustments (Ch. 9.3, pp. 161-162)
> Continuing the unbalanced-assignment simulation of
> [[Causal Inference as Generalization]] (Figure 7.7), now with a **logistic** outcome ($y > 0$ coded 1).
>
> **The motivation, stated plainly:** "In our simulation, as in many real-world studies, **the raw
> difference between treatment and control groups yields a bad estimate of the treatment effect because it
> does not account for important pre-treatment differences between the two groups.**"
>
> | Model | Specification |
> |---|---|
> | **1** | logistic regression of $y$ on $z$ — "**equivalent to a simple comparison of $\bar{y}_{z=1} - \bar{y}_{z=0}$**" |
> | **2** | $y$ on $z$ and $x$ |
> | **3** | $y$ on $z$, $x$, and their **interaction** |
> | **4** | $y$ on $z$, $x$, $x^2$, and the interactions of $x$ and $x^2$ with $z$ |
>
> **Two quantities computed for every model:**
> $$
> \text{SATE} = \frac{1}{N}\sum_{i=1}^N \left(E(y|X_i, z=1) - E(y|X_i, z=0)\right)
> $$
> $$
> \text{PATE} = \frac{1}{N_{\text{new}}}\sum_{i=1}^{N_{\text{new}}} \left(E(y|X_i^{\text{new}}, z=1) - E(y|X_i^{\text{new}}, z=0)\right)
> $$
>
> **The display:** both quantities plotted against model index, with **uncertainty intervals at ±1 and ±2
> posterior standard deviations.**
>
> **What it shows:** "**The pre-treatment predictor $x$ shows imbalance between treated and control units
> in the data, so it is no surprise that adjusting for $x$ in the regression has a big effect on the
> inferences. For this example, further adjustments have relatively small effects.**"
>
> > **"In this comparison across multiple models, the goal is not to perform model selection or model
> > averaging but to understand how inference for a quantity of interest changes as we move from a simple
> > comparison (on the left side of the graph) through the final model (on the right side of the graph).
> > Even if the ultimate interest is only in the final model, it can be useful to understand how the
> > inference changes as adjustments are added."**
>
> **The design of this graph is the transferable part.** *x*-axis = position in the model sequence;
> *y*-axis = the quantity you actually care about, which is comparable across models because it is a
> [[Topology of Models#Parameters that talk across models|shared inferential quantity]]. Parameters would
> not work here — the models do not share them.

### Multiverse analysis

> [!definition] What to do when several models pass all the checks (Ch. 9.3, p. 162)
> "**Following the proposed workflow and exploring the topology of models can often lead us to multiple
> models that pass all the checks. Instead of selecting just one model, we can perform a multiverse
> analysis, fit all the options and see how the conclusions change across the models**" (Steegen et al.
> 2016; Dragicevic et al. 2019; Kale, Kay, and Hullman 2019; Young and Cumberworth 2025), "**or work with
> a filtered set of models passing model checking**" (Riha et al. 2024).
>
> **The efficiency argument:** "**Multiverse analysis can also relieve some of the effort in validating
> models and priors: if the conclusions do not change, it is less important to decide which model is
> 'best.'**"
>
> **Scope:** "**Other analytical choices (data pre-processing, response distribution, metric to evaluate,
> and so forth) can also be subject to multiverse analysis.**"
^def-multiverse

> [!example] Figure 9.2 — a published multiverse heat map (Niederlová et al. 2019)
> **The design.** A heat map whose **rows are conclusions** (e.g. "cLOF mutations more severe," "BBS3 less
> severe than BBSome," "BBS4 most #phenotypes," and phenotype-specific claims about PD, CI, and REN) and
> whose **columns are model specifications** — a set of Bayesian hierarchical logistic regressions plus
> pairwise frequentist tests, differing "**in both predictors that are included and priors
> (default/wide/narrow/very narrow).**"
>
> **The column grouping is the key move.** Based on posterior predictive checks the Bayesian models were
> categorized as:
> - **"Main"** — passing all checks;
> - **"Secondary"** — minor problems in some checks;
> - **"Problematic fits."**
>
> Frequentist tests get their own block, and cells are shaded by **posterior probability** (0.01 to 0.99)
> or by **$p$-value** (0.05 to $10^{-8}$) with **ND = no data**.
>
> **The finding:** "**most conclusions hold across all possible models.**"
>
> This is what makes the display persuasive: it does not hide the problematic fits, it **labels** them —
> so a reader can see both that the conclusions survive the good models and that they survive the bad
> ones too.

## Connections

- Reason 6 — "we still keep the old model … for the purpose of understanding what we are doing" — is what
  separates *workflow* from *data analysis* in the vocabulary of
  [[From Inference to Data Analysis to Workflow]].
- The two researcher-degrees-of-freedom dangers are exactly what
  [[Model Selection and Overfitting]] analyzes and partially defuses.
- Filtered multiverse (Riha et al. 2024) is the practical way to make
  [[Topology of Models|the topology]] tractable for a human.

## See Also
- [[Topology of Models]] — the structure this section traverses
- [[Model Selection and Overfitting]] — the overfitting risk of picking one path's endpoint
- [[Influence of Likelihood and Prior]] — multiverse over priors specifically
- [[Causal Inference as Generalization]] — the example Figure 9.1 continues
