---
title: Dillon et al - Subscriber Retention Data-Generating Process
tags:
  - source/ingested
  - topic/model-validation
  - topic/causal-inference
  - topic/simulation
  - type/concept
  - type/example
  - method/xgboost
  - method/graphviz
  - doc/tutorial
source: "[[raw/Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs).md]]"
source_location: "Section 'A subscriber retention example' cells [1]-[2] (raw lines 9-135); section 'The challenges of estimating causal effects' cell [5] and Fig. 3 (raw lines 191-245)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights"
doc_type: tutorial
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Dillon et al - SHAP Plots vs True Causal Effects]]"
  - "[[Dillon et al - Observed Confounding and Double ML for Ad Spend]]"
  - "[[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]]"
  - "[[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]"
aliases:
  - Subscriber Retention Simulation (Dillon et al)
  - FixableDataFrame
  - Dillon Retention DGP
---

# Dillon et al - Subscriber Retention Data-Generating Process

> [!summary]
> The whole notebook rests on a hand-written structural causal model of subscription renewal. It has 10 features plus the outcome; two are latent (**Product need**, **Bugs faced**) and eight are observed. The `FixableDataFrame` helper turns the generator into a do-operator: any column passed in `fixed` is overwritten after it is computed, so its descendants respond and its ancestors do not. That makes true interventional effects computable. By construction **Ad spend has a coefficient of exactly 0**, **Bugs reported is not a parent of renewal**, and **Discount has a small positive** direct effect. These three facts drive every later failure. XGBoost (depth 2, $\eta = 0.001$, early stopping) is trained on 10,000 simulated customers.
^summary-dgp

## Overview

The opening of the example (raw line 11, complete): "Imagine we are tasked with building a model that predicts whether a customer will renew their product subscription. Let’s assume that after a bit of digging we manage to get eight features which are important for predicting churn: customer discount, ad spending, customer’s monthly usage, last upgrade, bugs reported by a customer, interactions with a customer, sales calls with a customer, and macroeconomic activity. We then use those features to train a basic XGBoost model to predict if a customer will renew their subscription when it expires:" Note the framing: the features were chosen because they are "important for predicting churn", which is a prediction-task criterion. The model is "a basic XGBoost model". Because the data are simulated, "we know the causal graph"; "in practice the true causal graph will not be known, but we may be able to use context-specific domain knowledge about how the world works to infer which relationships can or cannot exist" (line 195). This follows the standard simulation-study logic of [[Designing Simulated-Data Experiments]] and [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: plant the truth, then test whether the method recovers it.

## Main Content

### Structural equations

Notation: $\sigma(z) = 1/(1+e^{-z})$ (`scipy.special.expit`); $U(a,b)$ uniform; $\mathcal N(0,1)$ standard normal; $\text{Pois}(\lambda)$ Poisson; $[\cdot]$ rounding; $\mathbf 1[\cdot]$ indicator. All noise terms are mutually independent.

> [!definition] Definition: Retention structural causal model (cell [1], `generator`, raw lines 40-102)
> | Variable | Symbol | Structural equation | Observed? |
> |---|---|---|---|
> | Sales calls | $S$ | $S = [U(0,4)]$, so $S \in \{0,\dots,4\}$ with probabilities $\tfrac18, \tfrac14, \tfrac14, \tfrac14, \tfrac18$ | yes |
> | Interactions | $I$ | $I = S + \text{Pois}(0.2)$ | yes |
> | Economy | $E$ | $E \sim U(0,1)$ | yes |
> | Last upgrade | $L$ | $L \sim U(0,20)$ | yes |
> | Product need | $N$ | $N = 0.1\,S + \mathcal N(0,1)$ | **no (latent)** |
> | Discount | $D$ | $D = \tfrac12\big[0.5\,(1-\sigma(N)) + 0.5\,U(0,1)\big] \in [0, 0.5]$ | yes |
> | Monthly usage | $M$ | $M = \sigma\big(0.3\,N + \mathcal N(0,1)\big)$ | yes |
> | Ad spend | $A$ | $A = M\cdot U(0.9, 0.99) + \mathbf 1[L<1] + \mathbf 1[L<2]$ | yes |
> | Bugs faced | $B_f$ | $B_f \sim \text{Pois}(2M)$ | **no (latent)** |
> | Bugs reported | $B_r$ | $B_r = [\,B_f\,\sigma(N)\,]$ | yes |
> | Did renew | $R$ | $R \sim \text{Bernoulli}(p)$ with $p$ below | outcome |
>
> $$
> \operatorname{logit} p = 7\Big(0.18N + 0.08M + 0.1E + 0.05D + 0.05\varepsilon + 0.05\big(1-\tfrac{B_f}{20}\big) + 0.005S + 0.015I + \frac{0.1}{L/4+0.25} + 0\cdot A - 0.45\Big),\quad \varepsilon \sim \mathcal N(0,1).
> $$
^def-retention-scm

Direct effects on the logit scale (coefficient times 7): $N$: $+1.26$; $M$: $+0.56$; $E$: $+0.70$; $D$: $+0.35$; $B_f$: $-0.0175$ per bug; $S$: $+0.035$; $I$: $+0.105$; $L$: $0.7/(L/4+0.25)$, which falls from $2.8$ at $L=0$ to $0.13$ at $L=20$; $A$: $0$. The noise term has standard deviation $0.35$.

### Causal graph (cell [5], Fig. 3)

The section opens with this framing (raw line 193, complete): "A useful tool to understanding causal relationships is writing down a causal graph of the data generating process we’re interested in. A causal graph of our example illustrates why the robust predictive relationships picked up by our XGBoost customer retention model differ from the causal relationships of interest to the team that wants to plan interventions to increase retention. This graph is just a summary of the true data generating mechanism (which is defined above). Solid ovals represent features that we observe, while dashed ovals represent hidden features that we don’t measure. Each feature is a function of all the features with an arrow to it, plus some random effects."

Three points follow. (1) The graph is the explanatory device for the gap between "robust predictive relationships" and the causal relationships the *intervention* team needs (see [[Dillon et al - Prediction Tasks vs Causal Tasks#^quote-second-team]]). (2) The graph is "just a summary" of the structural equations below: it records which variables enter which equation, not functional forms or magnitudes. (3) In the rendering, solid nodes are observed, dashed nodes (`Product need`, `Bugs faced`) are hidden, and `Did renew` is filled. The 17 edges in cell [5] are:

| From | To |
|---|---|
| Product need | Did renew, Discount, Bugs reported, Monthly usage |
| Monthly usage | Bugs faced, Did renew, Ad spend |
| Sales calls | Did renew, Product need, Interactions |
| Last upgrade | Did renew, Ad spend |
| Bugs faced | Did renew, Bugs reported |
| Discount | Did renew |
| Economy | Did renew |
| Interactions | Did renew |

**There is no Ad spend → Did renew edge**, which matches the zero coefficient. The graph agrees with the code edge for edge.

### Observed data and model fit

> [!algorithm] Algorithm: Training pipeline (cells [1]-[2])
> 1. `user_retention_dataset()`: simulate $n = 10{,}000$ customers with `generator(n)` (seed 0). Set `y = "Did renew"` and drop `Did renew`, `Product need` and `Bugs faced` from `X`, leaving 8 observed features.
> 2. `fit_xgboost(X, y)`: random train/test split with sklearn's default 75/25. Train `xgboost.train` with `eta=0.001`, `subsample=0.5`, `max_depth=2` and `objective="reg:logistic"`, allowing up to 200,000 rounds with early stopping after 20 rounds without improvement on the test set.
> 3. Explain the fitted booster on all of `X` (cell [3], [[Dillon et al - SHAP Plots vs True Causal Effects]]).
^alg-training-pipeline

The tiny learning rate and depth-2 trees make the model close to a smooth additive model with pairwise interactions. It is *regularized* by early stopping and row subsampling. This matters later, because regularization is why the model prefers the single summary feature Ad spend over its causes ([[Dillon et al - Observed Confounding and Double ML for Ad Spend]]).

### The do-operator: `FixableDataFrame`

> [!definition] Definition: Intervention by overwrite (cell [1], raw lines 26-37)
> `FixableDataFrame` subclasses `pandas.DataFrame` and stores a dictionary `fixed`. Its `__setitem__` first assigns the computed column. If the key is in `fixed`, it then **overwrites** the column with the fixed value. Calling `generator(n, fixed={c: x})` therefore draws every exogenous noise term exactly as before, but replaces column $c$ by the constant $x$ before any downstream column is computed. That is Pearl's $do(c = x)$: ancestors of $c$ are unchanged and descendants are recomputed from the new value.
^def-fixable-dataframe

Because the random draws for $c$ still happen, a fixed seed gives every intervened world the **same noise realization** (common random numbers). True-effect curves computed this way therefore have little Monte Carlo noise between grid points. The helper that uses this, `marginal_effects`, is in [[Dillon et al - SHAP Plots vs True Causal Effects]].

### Full code — cell [1] (data generation and model)

Cell [1] (raw lines 18-125), verbatim:

```python
# This cell defines the functions we use to generate the data in our scenario

import numpy as np
import pandas as pd
import scipy.stats
import sklearn
import xgboost

class FixableDataFrame(pd.DataFrame):
    """Helper class for manipulating generative models."""

    def __init__(self, *args, fixed={}, **kwargs):
        self.__dict__["__fixed_var_dictionary"] = fixed
        super().__init__(*args, **kwargs)

    def __setitem__(self, key, value):
        out = super().__setitem__(key, value)
        if isinstance(key, str) and key in self.__dict__["__fixed_var_dictionary"]:
            out = super().__setitem__(key, self.__dict__["__fixed_var_dictionary"][key])
        return out

# generate the data
def generator(n, fixed={}, seed=0):
    """The generative model for our subscriber retention example."""
    if seed is not None:
        np.random.seed(seed)
    X = FixableDataFrame(fixed=fixed)

    # the number of sales calls made to this customer
    X["Sales calls"] = np.random.uniform(0, 4, size=(n,)).round()

    # the number of sales calls made to this customer
    X["Interactions"] = X["Sales calls"] + np.random.poisson(0.2, size=(n,))

    # the health of the regional economy this customer is a part of
    X["Economy"] = np.random.uniform(0, 1, size=(n,))

    # the time since the last product upgrade when this customer came up for renewal
    X["Last upgrade"] = np.random.uniform(0, 20, size=(n,))

    # how much the user perceives that they need the product
    X["Product need"] = X["Sales calls"] * 0.1 + np.random.normal(0, 1, size=(n,))

    # the fractional discount offered to this customer upon renewal
    X["Discount"] = ((1 - scipy.special.expit(X["Product need"])) * 0.5 + 0.5 * np.random.uniform(0, 1, size=(n,))) / 2

    # What percent of the days in the last period was the user actively using the product
    X["Monthly usage"] = scipy.special.expit(X["Product need"] * 0.3 + np.random.normal(0, 1, size=(n,)))

    # how much ad money we spent per user targeted at this user (or a group this user is in)
    X["Ad spend"] = (
        X["Monthly usage"] * np.random.uniform(0.99, 0.9, size=(n,)) + (X["Last upgrade"] < 1) + (X["Last upgrade"] < 2)
    )

    # how many bugs did this user encounter in the since their last renewal
    X["Bugs faced"] = np.array([np.random.poisson(v * 2) for v in X["Monthly usage"]])

    # how many bugs did the user report?
    X["Bugs reported"] = (X["Bugs faced"] * scipy.special.expit(X["Product need"])).round()

    # did the user renew?
    X["Did renew"] = scipy.special.expit(
        7
        * (
            0.18 * X["Product need"]
            + 0.08 * X["Monthly usage"]
            + 0.1 * X["Economy"]
            + 0.05 * X["Discount"]
            + 0.05 * np.random.normal(0, 1, size=(n,))
            + 0.05 * (1 - X["Bugs faced"] / 20)
            + 0.005 * X["Sales calls"]
            + 0.015 * X["Interactions"]
            + 0.1 / (X["Last upgrade"] / 4 + 0.25)
            + X["Ad spend"] * 0.0
            - 0.45
        )
    )

    # in real life we would make a random draw to get either 0 or 1 for if the
    # customer did or did not renew. but here we leave the label as the probability
    # so that we can get less noise in our plots. Uncomment this line to get
    # noiser causal effect lines but the same basic results
    X["Did renew"] = scipy.stats.bernoulli.rvs(X["Did renew"])

    return X

def user_retention_dataset():
    """The observed data for model training."""
    n = 10000
    X_full = generator(n)
    y = X_full["Did renew"]
    X = X_full.drop(["Did renew", "Product need", "Bugs faced"], axis=1)
    return X, y

def fit_xgboost(X, y):
    """Train an XGBoost model with early stopping."""
    X_train, X_test, y_train, y_test = sklearn.model_selection.train_test_split(X, y)
    dtrain = xgboost.DMatrix(X_train, label=y_train)
    dtest = xgboost.DMatrix(X_test, label=y_test)
    model = xgboost.train(
        {"eta": 0.001, "subsample": 0.5, "max_depth": 2, "objective": "reg:logistic"},
        dtrain,
        num_boost_round=200000,
        evals=((dtest, "test"),),
        early_stopping_rounds=20,
        verbose_eval=False,
    )
    return model
```

### Cell [2] (fit)

Cell [2] (raw lines 133-134), verbatim:

```python
X, y = user_retention_dataset()
model = fit_xgboost(X, y)
```

### Cell [5] (causal graph)

Cell [5] (raw lines 202-238), verbatim:

```python
import graphviz

names = [
    "Bugs reported",
    "Monthly usage",
    "Sales calls",
    "Economy",
    "Discount",
    "Last upgrade",
    "Ad spend",
    "Interactions",
]
g = graphviz.Digraph()
for name in names:
    g.node(name, fontsize="10")
g.node("Product need", style="dashed", fontsize="10")
g.node("Bugs faced", style="dashed", fontsize="10")
g.node("Did renew", style="filled", fontsize="10")

g.edge("Product need", "Did renew")
g.edge("Product need", "Discount")
g.edge("Product need", "Bugs reported")
g.edge("Product need", "Monthly usage")
g.edge("Discount", "Did renew")
g.edge("Monthly usage", "Bugs faced")
g.edge("Monthly usage", "Did renew")
g.edge("Monthly usage", "Ad spend")
g.edge("Economy", "Did renew")
g.edge("Sales calls", "Did renew")
g.edge("Sales calls", "Product need")
g.edge("Sales calls", "Interactions")
g.edge("Interactions", "Did renew")
g.edge("Bugs faced", "Did renew")
g.edge("Bugs faced", "Bugs reported")
g.edge("Last upgrade", "Did renew")
g.edge("Last upgrade", "Ad spend")
g
```

Figure 3 ([image](https://shap.readthedocs.io/en/latest/_images/example_notebooks_overviews_Be_careful_when_interpreting_predictive_models_in_search_of_causal_insights_10_0.svg)) renders this DAG.

### Code-level quirks (checked against the raw text)

| Location | Quirk | Consequence |
|---|---|---|
| cell [1], `Interactions` comment | reuses the comment "the number of sales calls made to this customer" | cosmetic |
| cell [1], `Ad spend` | `np.random.uniform(0.99, 0.9, ...)` has `low > high` | NumPy still returns draws between 0.9 and 0.99; harmless |
| cell [1], end of `generator` | the comment says the label is left as a probability "to get less noise", but the next line draws `bernoulli.rvs` anyway | labels are binary 0/1 |
| cell [1], `Did renew` | `X["Ad spend"] * 0.0` | the zero causal effect is made explicit |

## Examples

> [!example] Example: true interventional effects of the DGP (vault computation, not in the source)
> **Setup.** Run the source's `generator` with $n = 10{,}000$ and seed 0, set each observed feature to its 5th, 50th and 95th percentile with `fixed`, and record $\operatorname{logit}$ of the mean renewal rate (the overlay quantity of cell [6]). The baseline renewal rate is 30.4%. The script was run with numpy/scipy/pandas only; no SHAP or XGBoost was needed.
>
> | Feature | $x$ at p5 / p50 / p95 | logit mean renewal | p95 − p5 |
> |---|---|---|---|
> | Sales calls | 0 / 2 / 4 | −1.217 / −0.811 / −0.435 | **+0.78** |
> | Interactions | 0 / 2 / 4 | −1.006 / −0.834 / −0.692 | +0.31 |
> | Economy | 0.05 / 0.50 / 0.95 | −1.078 / −0.830 / −0.575 | +0.50 |
> | Last upgrade | 1.1 / 10.0 / 19.0 | −0.138 / −0.970 / −1.055 | −0.92 (convex) |
> | Discount | 0.09 / 0.24 / 0.39 | −0.865 / −0.813 / −0.776 | **+0.09** (small positive) |
> | Monthly usage | 0.16 / 0.51 / 0.86 | −0.963 / −0.827 / −0.720 | +0.24 |
> | Ad spend | 0.16 / 0.52 / 1.76 | −0.826 / −0.826 / −0.826 | **0** |
> | Bugs reported | 0 / 0 / 2 | −0.826 / −0.826 / −0.826 | **0** |
>
> The observational correlations with renewal tell a different story. Ad spend $+0.20$, Bugs reported $+0.19$ and Discount $-0.25$ are among the largest in magnitude. Latent Product need is $+0.43$. Key feature correlations: Sales calls–Interactions $0.94$; Discount–Product need $-0.60$; Bugs reported–Product need $+0.44$; Ad spend–Last upgrade $-0.45$; Ad spend–Monthly usage $+0.40$.
>
> **Interpretation.** Sales calls has the largest positive total effect among the observed features because it acts through three paths: directly, through Interactions, and through Product need. Yet its observational correlation, $0.09$, is tiny next to that of Ad spend, a feature with no effect at all.
^ex-true-effects

## Connections

- [[Directed Acyclic Graphs]] and [[DAGs and Causal Identification]] — the graph semantics used here.
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — the same "simulate a known world, test the method" idea at the scale of marketing systems.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — this notebook is a single-replicate simulation. A full study would repeat it over seeds and report Monte Carlo standard errors.

## See Also

- [[Dillon et al - SHAP and Causal Insights - Overview]]
- [[Dillon et al - SHAP Plots vs True Causal Effects]] — `marginal_effects` and the overlays.
