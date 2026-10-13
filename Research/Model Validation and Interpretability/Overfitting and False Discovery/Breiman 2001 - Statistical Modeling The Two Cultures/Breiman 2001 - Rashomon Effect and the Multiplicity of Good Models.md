---
title: "Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/model-multiplicity
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): §8 Rashomon and the Multiplicity of Good Models (p. 206), incl. Pictures 1-3; cross-references §5.3 (pp. 203-204), §11.1 (pp. 210-212), Hoadley's comment (p. 222) and rejoinder E3 (pp. 229-230)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]"
used_by:
  - "[[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]"
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - Breiman Rashomon effect (original statement)
  - Breiman 2001 Pictures 1-3
  - Breiman instability and multiplicity
---

# Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models

> [!summary]
> Breiman's **Rashomon Effect**: within a class of functions there is often "a multitude of different descriptions [equations $f(\mathbf x)$] ... giving about the same minimum error rate." With 30 variables there are about 140,000 five-variable regressions, and many typically have RSS within 1.0% of the minimum while naming different variables as important (Pictures 1-3). It also occurs with trees (dropping a random 2-3% of data gives a very different tree with about the same test error) and neural nets (100 restarts gave 32 distinct minima with about equal test error). It is tied to **instability**: a slight perturbation of the data jumps between models that are close in error but far apart in form. Deleting covariates (e.g. 15 to 4 in logistic or Cox regression) makes it worse; **aggregating** competing models (bagging) reduces non-uniqueness and improves accuracy. This is the original statement that [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] formalises as the Rashomon set.
^sum-rashomon-effect-and-1

## Overview

§8 is the first of the three lessons from machine learning. Its point for validation: a model's good fit does not single out its story. Any conclusion drawn from *which* variables a selected model contains is fragile unless it survives across the set of near-optimal models.

## Main Content

The name comes from Kurosawa's film, in which four witnesses report the same facts but tell very different stories of what happened (p. 206).

> [!definition] Rashomon Effect (§8, p. 206)
> "What I call the Rashomon Effect is that there is often a multitude of different descriptions [equations $f(\mathbf x)$] in a class of functions giving about the same minimum error rate."
>
> In later notation (not Breiman's): for a model class $\mathcal F$, loss $L$ and tolerance $\epsilon$, the set $\{f\in\mathcal F:\ \hat L(f)\le \min_{g\in\mathcal F}\hat L(g)+\epsilon\}$ is typically large and contains functions of very different form.
^def-rashomon-effect

> [!example] Pictures 1-3: three five-variable regressions (§8, p. 206)
> **Setup.** 30 candidate variables; find the best five-variable linear regression. There are $\binom{30}{5}=142{,}506$ — "about 140,000" — subsets. One usually picks the lowest residual sum of squares (RSS), or the lowest test error. But "there may be (and generally are) many five-variable equations that have RSS within 1.0% of the lowest RSS (see Breiman, 1996a). The same is true if test set error is being measured."
>
> Three pictures with RSS or test-set error within 1.0% of each other:
>
> | Picture | Equation |
> |---|---|
> | 1 | $y = 2.1 + 3.8x_3 - 0.6x_8 + 83.2x_{12} - 2.1x_{17} + 3.2x_{27}$ |
> | 2 | $y = -8.9 + 4.6x_5 + 0.01x_6 + 12.0x_{15} + 17.5x_{21} + 0.2x_{22}$ |
> | 3 | $y = -76.7 + 9.3x_2 + 22.0x_7 - 13.2x_8 + 3.4x_{11} + 7.2x_{28}$ |
>
> **Interpretation.** The three share only one variable ($x_8$, in Pictures 1 and 3). "Which one is better? The problem is that each one tells a different story about which variables are important."
^ex-pictures

### Rashomon beyond regression (p. 206)

- **Trees.** Perturbing the training set slightly — "removing a random 2–3% of the data" — gives a tree "quite different from the original but with almost the same test set error."
- **Neural nets.** A small net run 100 times on simple three-dimensional data, with small random initial weights each time, gave "32 distinct minima, each of which gave a different picture, and having about equal test set error."

> [!definition] Instability (§8, p. 206; Breiman 1996a)
> Instability occurs "when there are many different models crowded together that have about the same training or test set error. Then a slight perturbation of the data or in the model construction will cause a skip from one model to another. The two models are close to each other in terms of error, but can be distant in terms of the form of the model."
^def-instability

> [!theorem] Covariate deletion amplifies multiplicity (§8, p. 206)
> In logistic regression or the Cox model, deleting less important covariates makes the model unstable — "there are too many competing models." Deleting from 15 variables to 4, a slight perturbation of the data will very possibly give a different four-variable model and a different conclusion about which variables matter. "The picture of which covariates are important can vary significantly between two models having about the same deviance."
^thm-deletion-instability

> [!example] Bagging as a fix: Arena et al. (2000) (§8, p. 206)
> **Setup.** Logistic regression on a database of toxic and non-toxic chemicals, with each model reduced from 15 to 4 covariates by standard best-subset selection.
>
> **Method.** Bag the procedure (bootstrap the training set, rerun the selection and fit, average; see the glossary in [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]]).
>
> **Result.** On a test set the bagged model was "significantly more accurate than the single model with four covariates. It is also more stable."
>
> Breiman calls aggregation "one possible fix" and concludes: "The multiplicity problem and its effect on conclusions drawn from models needs serious attention."
^ex-arena-bagging

### Where the lesson recurs in the paper

| Place | Rashomon instance |
|---|---|
| §5.3 (pp. 203-204) | equally well-fitting data models give different pictures of the mechanism |
| §11.1 (p. 210) | about 4,000 four-variable subsets of 19 hepatitis covariates; many will have near-minimal deviance |
| §11.1 (p. 212) | variables 12 and 17 are surrogates, so bootstrap selection splits between them |
| Hoadley (p. 222) | all scorecards with 27-36 characteristics had the same test performance |
| Hoadley (p. 223) | "Ping-Pong theorem": a variable important in one accurate black box can be absent from another equally accurate one |

(The paper's §11.1 points back to "Section 7.1" for instability and multiplicity; the material is in §8.)

## Examples

> [!example] Rashomon in per-segment marketing models
> **Setup.** An analyst fits a tree ensemble per region to a shared aggregate KPI and reports the top three drivers per region. Refitting with a different seed or a 3% data subsample reorders the drivers, while held-out error barely moves.
>
> **Breiman's diagnosis.** The regions' models are close in error and far apart in form. Choosing among fits by which gives the most intuitive driver ranking, or by which concentrates the most SHAP mass on a favoured variable, picks one Rashomon member for its story rather than its accuracy.
>
> **Remedies consistent with §8.** Report importance aggregated across bootstrap refits (bagging), report the range of importance across near-optimal models ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]), or report selection frequencies across subsamples ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]).
^ex-rashomon-effect-and-2

## Connections

- Formalised as the $\epsilon$-Rashomon set and model class reliance in [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- Subsample selection frequencies as a cure for unstable selection: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- Correlated surrogates splitting importance: [[Strobl et al 2008 - Conditional Variable Importance - Overview]].
- Many near-equivalent specifications are one source of analytic flexibility: [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]].
- Averaging over competing models: [[Stacking and Predictive Model Averaging]].

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] — the next lesson; forests are aggregation at scale
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — Rashomon in the hepatitis analysis
