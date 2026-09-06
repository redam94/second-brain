---
title: "Bayesian moderation analysis"
source: "https://www.pymc.io/projects/examples/en/latest/causal_inference/moderation_analysis.html#does-the-effect-of-training-upon-muscularity-decrease-with-age"
author:
published:
created: 2026-04-09
description: "This notebook covers Bayesian moderation analysis. This is appropriate when we believe that one predictor variable (the moderator) may influence the linear relationship between another predictor va..."
tags:
  - "clippings"
doc_type: concept
folder: "Clippings"
depends_on: []
used_by: []
source_location: "Full article"
date_ingested: 2026-04-08
---
## Bayesian moderation analysis

This notebook covers Bayesian [moderation analysis](https://en.wikipedia.org/wiki/Moderation_\(statistics\)). This is appropriate when we believe that one predictor variable (the moderator) may influence the linear relationship between another predictor variable and an outcome. Here we look at an example where we look at the relationship between hours of training and muscle mass, where it may be that age (the moderating variable) affects this relationship.

This is not intended as a one-stop solution to a wide variety of data analysis problems, rather, it is intended as an educational exposition to show how moderation analysis works and how to conduct Bayesian parameter estimation in PyMC.

Note that this is sometimes mixed up with [mediation analysis](https://en.wikipedia.org/wiki/Mediation_\(statistics\)). Mediation analysis is appropriate when we believe the effect of a predictor variable upon an outcome variable is (partially, or fully) mediated through a 3rd mediating variable. Readers are referred to the textbook by [^1] as a comprehensive (albeit Frequentist) guide to moderation and related models as well as the PyMC example [Bayesian mediation analysis](https://www.pymc.io/projects/examples/en/latest/causal_inference/mediation_analysis.html#mediation_analysis).

```
import arviz as az
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pymc as pm
import xarray as xr

from matplotlib.cm import ScalarMappable
from matplotlib.colors import Normalize
```

```
az.style.use("arviz-darkgrid")
%config InlineBackend.figure_format = 'retina'
```

First in the (hidden) code cell below, we define some helper functions for plotting that we will use later.

Show code cell source

Hide code cell source

```
def make_scalarMap(m):
    """Create a Matplotlib \`ScalarMappable\` so we can use a consistent colormap across both data points and posterior predictive lines. We can use \`scalarMap.cmap\` to use as a colormap, and \`scalarMap.to_rgba(moderator_value)\` to grab a colour for a given moderator value."""
    return ScalarMappable(norm=Normalize(vmin=np.min(m), vmax=np.max(m)), cmap="viridis")

def plot_data(x, moderator, y, ax=None):
    if ax is None:
        fig, ax = plt.subplots(1, 1)
    else:
        fig = plt.gcf()

    h = ax.scatter(x, y, c=moderator, cmap=scalarMap.cmap)
    ax.set(xlabel="x", ylabel="y")
    # colourbar for moderator
    cbar = fig.colorbar(h)
    cbar.ax.set_ylabel("moderator")
    return ax

def posterior_prediction_plot(result, x, moderator, m_quantiles, ax=None):
    """Plot posterior predicted \`y\`"""
    if ax is None:
        fig, ax = plt.subplots(1, 1)

    post = az.extract(result)
    xi = xr.DataArray(np.linspace(np.min(x), np.max(x), 20), dims=["x_plot"])
    m_levels = result.constant_data["m"].quantile(m_quantiles).rename({"quantile": "m_level"})

    for p, m in zip(m_quantiles, m_levels):
        y = post.β0 + post.β1 * xi + post.β2 * xi * m + post.β3 * m
        region = y.quantile([0.025, 0.5, 0.975], dim="sample")
        ax.fill_between(
            xi,
            region.sel(quantile=0.025),
            region.sel(quantile=0.975),
            alpha=0.2,
            color=scalarMap.to_rgba(m),
            edgecolor="w",
        )
        ax.plot(
            xi,
            region.sel(quantile=0.5),
            color=scalarMap.to_rgba(m),
            linewidth=2,
            label=f"{p*100}th percentile of moderator",
        )

    ax.legend(fontsize=9)
    ax.set(xlabel="x", ylabel="y")
    return ax

def plot_moderation_effect(result, m, m_quantiles, ax=None):
    """Spotlight graph"""

    if ax is None:
        fig, ax = plt.subplots(1, 1)

    post = az.extract(result)

    # calculate 95% CI region and median
    xi = xr.DataArray(np.linspace(np.min(m), np.max(m), 20), dims=["x_plot"])
    rate = post.β1 + post.β2 * xi
    region = rate.quantile([0.025, 0.5, 0.975], dim="sample")

    ax.fill_between(
        xi,
        region.sel(quantile=0.025),
        region.sel(quantile=0.975),
        alpha=0.2,
        color="k",
        edgecolor="w",
    )

    ax.plot(xi, region.sel(quantile=0.5), color="k", linewidth=2)

    # plot points at each percentile of m
    percentile_list = np.array(m_quantiles) * 100
    m_levels = np.percentile(m, percentile_list)
    for p, m in zip(percentile_list, m_levels):
        ax.plot(
            m,
            np.mean(post.β1) + np.mean(post.β2) * m,
            "o",
            c=scalarMap.to_rgba(m),
            markersize=10,
            label=f"{p}th percentile of moderator",
        )

    ax.legend(fontsize=9)

    ax.set(
        title="Spotlight graph",
        xlabel="$moderator$",
        ylabel=r"$\beta_1 + \beta_2 \cdot moderator$",
    )
```

## Does the effect of training upon muscularity decrease with age?

I’ve taken inspiration from a blog post which examines whether age influences (moderates) the effect of training on muscle percentage. We might speculate that more training results in higher muscle mass, at least for younger people. But it might be the case that the relationship between training and muscle mass changes with age - perhaps training is less effective at increasing muscle mass in older age?

The schematic box and arrow notation often used to represent moderation is shown by an arrow from the moderating variable to the line between a predictor and an outcome variable.

![](https://www.pymc.io/projects/examples/en/latest/_images/moderation_figure.png)

It can be useful to use consistent notation, so we will define:

- $x$ as the main predictor variable. In this example it is training.
- $y$ as the outcome variable. In this example it is muscle percentage.
- $m$ as the moderator. In this example it is age.

## The moderation model

While the visual schematic (above) is a useful shorthand to understand complex models when you already know what moderation is, you can’t derive it from the diagram alone. So let us formally specify the moderation model - it defines an outcome variable $y$ as:

$$
y sim Normal \left(\right. \beta_{0} + \beta_{1} \cdot x + \beta_{2} \cdot x \cdot m + \beta_{3} \cdot m , \sigma^{2} \left.\right)
$$

where $y$, $x$, and $m$ are your observed data, and the following are the model parameters:

- $\beta_{0}$ is the intercept, its value does not have that much importance in the interpretation of this model.
- $\beta_{1}$ is the rate at which $y$ (muscle percentage) increases per unit of $x$ (training hours).
- $\beta_{2}$ is the coefficient for the interaction term $x \cdot m$.
- $\beta_{3}$ is the rate at which $y$ (muscle percentage) increases per unit of $m$ (age).
- $\sigma$ is the standard deviation of the observation noise.

We can see that the mean $y$ is simply a multiple linear regression with an interaction term between the two predictors, $x$ and $m$.

We can get some insight into why this is the case by thinking about this as a multiple linear regression with $x$ and $m$ as predictor variables, but where the value of $m$ influences the relationship between $x$ and $y$. This is achieved by making the regression coefficient for $x$ is a function of $m$:

$$
y sim Normal \left(\right. \beta_{0} + f \left(\right. m \left.\right) \cdot x + \beta_{3} \cdot m , \sigma^{2} \left.\right)
$$

and if we define that as a linear function, $f \left(\right. m \left.\right) = \beta_{1} + \beta_{2} \cdot m$, we get

$$
y sim Normal \left(\right. \beta_{0} + \left(\right. \beta_{1} + \beta_{2} \cdot m \left.\right) \cdot x + \beta_{3} \cdot m , \sigma^{2} \left.\right)
$$

We can use $f \left(\right. m \left.\right) = \beta_{1} + \beta_{2} \cdot m$ later to visualise the moderation effect.

## Import data

First, we will load up our example data and do some basic data visualisation. The dataset is taken from but it is unclear if this corresponds to real life research data or if it was simulated.

```
def load_data():
    try:
        df = pd.read_csv("../data/muscle-percent-males-interaction.csv")
    except:
        df = pd.read_csv(pm.get_data("muscle-percent-males-interaction.csv"))

    x = df["thours"].values
    m = df["age"].values
    y = df["mperc"].values
    return (x, y, m)

x, y, m = load_data()

# Make a scalar color map for this dataset (Just for plotting, nothing to do with inference)
scalarMap = make_scalarMap(m)
```

```
fig, ax = plt.subplots(1, 3, figsize=(14, 3))

ax[0].hist(x, alpha=0.5)
ax[0].set(xlabel="training, $x$")

ax[1].hist(m, alpha=0.5)
ax[1].set(xlabel="age, $m$")

ax[2].hist(y, alpha=0.5)
ax[2].set(xlabel="muscle percentage, $y$");
```

[![../_images/2982eac5fa44000b39dbebc2a8d72b87692faa9b0f24032657814eb074ae89f8.png](https://www.pymc.io/projects/examples/en/latest/_images/2982eac5fa44000b39dbebc2a8d72b87692faa9b0f24032657814eb074ae89f8.png)](https://www.pymc.io/projects/examples/en/latest/_images/2982eac5fa44000b39dbebc2a8d72b87692faa9b0f24032657814eb074ae89f8.png)

## Define the PyMC model and conduct inference

```
def model_factory(x, m, y):
    with pm.Model() as model:
        x = pm.ConstantData("x", x)
        m = pm.ConstantData("m", m)
        # priors
        β0 = pm.Normal("β0", mu=0, sigma=10)
        β1 = pm.Normal("β1", mu=0, sigma=10)
        β2 = pm.Normal("β2", mu=0, sigma=10)
        β3 = pm.Normal("β3", mu=0, sigma=10)
        σ = pm.HalfCauchy("σ", 1)
        # likelihood
        y = pm.Normal("y", mu=β0 + (β1 * x) + (β2 * x * m) + (β3 * m), sigma=σ, observed=y)

    return model
```

```
model = model_factory(x, m, y)
```

Plot the model graph to confirm it is as intended.

```
pm.model_to_graphviz(model)
```

![../_images/52a605d3a57e9654796ab7e79bf5f168e16a7ff60dc25e8d95d8bf046a5128fe.svg](https://www.pymc.io/projects/examples/en/latest/_images/52a605d3a57e9654796ab7e79bf5f168e16a7ff60dc25e8d95d8bf046a5128fe.svg)

```
with model:
    result = pm.sample(draws=1000, tune=1000, random_seed=42, nuts={"target_accept": 0.9})
```

100.00% \[8000/8000 00:08<00:00 Sampling 4 chains, 0 divergences\]

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 9 seconds.
```

Visualise the trace to check for convergence.

```
az.plot_trace(result);
```

[![../_images/ceb6b37eae6bb4f997e2a9e77eb34e2f795f1f429333adec644e7f8c6098812a.png](https://www.pymc.io/projects/examples/en/latest/_images/ceb6b37eae6bb4f997e2a9e77eb34e2f795f1f429333adec644e7f8c6098812a.png)](https://www.pymc.io/projects/examples/en/latest/_images/ceb6b37eae6bb4f997e2a9e77eb34e2f795f1f429333adec644e7f8c6098812a.png)

We have good chain mixing and the posteriors for each chain look very similar, so no problems in that regard.

## Visualise the important parameters

First we will use a pair plot to look at joint posterior distributions. This might help us identify any estimation issues with the interaction term (see the discussion below about multicollinearity).

```
az.plot_pair(
    result,
    marginals=True,
    point_estimate="median",
    figsize=(12, 12),
    scatter_kwargs={"alpha": 0.01},
);
```

[![../_images/e0d4e32d0cda693b15bd1aedeeb04c146c6998e3ebfa2ca5aee875d6ca4fc5ad.png](https://www.pymc.io/projects/examples/en/latest/_images/e0d4e32d0cda693b15bd1aedeeb04c146c6998e3ebfa2ca5aee875d6ca4fc5ad.png)](https://www.pymc.io/projects/examples/en/latest/_images/e0d4e32d0cda693b15bd1aedeeb04c146c6998e3ebfa2ca5aee875d6ca4fc5ad.png)

And just for the sake of completeness, we can plot the posterior distributions for each of the $\beta$ parameters and use this to arrive at research conclusions.

```
az.plot_posterior(result, var_names=["β1", "β2", "β3"], figsize=(14, 4));
```

[![../_images/0b2a9f4a313c8cbe4ba870142ee00e26e39306a62c98dbdd0d5d680345cf0551.png](https://www.pymc.io/projects/examples/en/latest/_images/0b2a9f4a313c8cbe4ba870142ee00e26e39306a62c98dbdd0d5d680345cf0551.png)](https://www.pymc.io/projects/examples/en/latest/_images/0b2a9f4a313c8cbe4ba870142ee00e26e39306a62c98dbdd0d5d680345cf0551.png)

For example, from an estimation (in contrast to a hypothesis testing) perspective, we could look at the posterior over $\beta_{2}$ and claim a credibly less than zero moderation effect.

## Posterior predictive checks

Define a set of quantiles of $m$ that we are interested in visualising.

```
m_quantiles = [0.025, 0.25, 0.5, 0.75, 0.975]
```

### Visualisation in data space

Here we will plot the data alongside model posterior predictive checks. This can be a useful visual method of comparing the model predictions against the data.

```
fig, ax = plt.subplots(figsize=(10, 6))
ax = plot_data(x, m, y, ax=ax)
posterior_prediction_plot(result, x, m, m_quantiles, ax=ax)
ax.set_title("Data and posterior prediction");
```

[![../_images/a26b7b61e4d185410d5e6f0af1da9270397eab627b9040395d4a7fffa8e8b2cd.png](https://www.pymc.io/projects/examples/en/latest/_images/a26b7b61e4d185410d5e6f0af1da9270397eab627b9040395d4a7fffa8e8b2cd.png)](https://www.pymc.io/projects/examples/en/latest/_images/a26b7b61e4d185410d5e6f0af1da9270397eab627b9040395d4a7fffa8e8b2cd.png)

### Spotlight graph

We can also visualise the moderation effect by plotting $\beta_{1} + \beta_{2} \cdot m$ as a function of the $m$. This was named a spotlight graph, see and [^2].

```
fig, ax = plt.subplots(1, 2, figsize=(10, 5))
plot_moderation_effect(result, m, m_quantiles, ax[0])
az.plot_posterior(result, var_names="β2", ax=ax[1]);
```

[![../_images/953650a7c68fbd32d437b33c6b8f6b25c898df29ec435c3e393ad4ccc879e147.png](https://www.pymc.io/projects/examples/en/latest/_images/953650a7c68fbd32d437b33c6b8f6b25c898df29ec435c3e393ad4ccc879e147.png)](https://www.pymc.io/projects/examples/en/latest/_images/953650a7c68fbd32d437b33c6b8f6b25c898df29ec435c3e393ad4ccc879e147.png)

The expression $\beta_{1} + \beta_{2} \cdot \text{moderator}$ defines the rate of change of the outcome (muscle percentage) per unit of $x$ (training hours/week). We can see that as age (the moderator) increases, this effect of training hours/week on muscle percentage decreases.

## Authors

- Authored by Benjamin T. Vincent in June 2021
- Updated by Benjamin T. Vincent in March 2022
- Updated by Benjamin T. Vincent in February 2023 to run on PyMC v5
- Updated to use `az.extract` by [Benjamin T. Vincent](https://github.com/drbenvincent) in February 2023 ([pymc-examples#522](https://github.com/pymc-devs/pymc-examples/pull/522))

## References

## Watermark

```
%load_ext watermark
%watermark -n -u -v -iv -w -p pytensor,aeppl,xarray
```

```
Last updated: Sun Feb 05 2023

Python implementation: CPython
Python version       : 3.10.9
IPython version      : 8.9.0

pytensor: 2.8.11
aeppl   : not installed
xarray  : 2023.1.0

pandas    : 1.5.3
arviz     : 0.14.0
xarray    : 2023.1.0
numpy     : 1.24.1
pymc      : 5.0.1
matplotlib: 3.6.3

Watermark: 2.3.1
```

## Citing PyMC examples

To cite this notebook, use the DOI provided by Zenodo for the pymc-examples repository.

Important

Many notebooks are adapted from other sources: blogs, books… In such cases you should cite the original source as well.

Also remember to cite the relevant libraries used by your code.

Here is an citation template in bibtex:

```
@incollection{citekey,
  author    = "<notebook authors, see above>",
  title     = "<notebook title>",
  editor    = "PyMC Team",
  booktitle = "PyMC examples",
  doi       = "10.5281/zenodo.5654871"
}
```

which once rendered could look like:

[^1]: \[3\] ([1](#id1),[2](#id6))

Andrew F Hayes. *Introduction to mediation, moderation, and conditional process analysis: A regression-based approach*. Guilford publications, 2017.

[^2]: \[4\] ([1](#id5),[2](#id8),[3](#id10),[4](#id11),[5](#id13),[6](#id14),[7](#id15))

Gary H McClelland, Julie R Irwin, David Disatnik, and Liron Sivan. Multicollinearity is a red herring in the search for moderator variables: a guide to interpreting moderated multiple regression models and a critique of iacobucci, schneider, popovich, and bakamitsos (2016). *Behavior research methods*, 49(1):394–402, 2017.

[^3]: \[5\] ([1](#id7),[2](#id9))

Dawn Iacobucci, Matthew J Schneider, Deidre L Popovich, and Georgios A Bakamitsos. Mean centering helps alleviate “micro” but not “macro” multicollinearity. *Behavior research methods*, 48(4):1308–1317, 2016.

[^4]: \[[6](#id12)\]

Dawn Iacobucci, Matthew J Schneider, Deidre L Popovich, and Georgios A Bakamitsos. Mean centering, multicollinearity, and moderators in multiple regression: the reconciliation redux. *Behavior research methods*, 49(1):403–404, 2017.

[^5]: \[[7](#id16)\]

Daniel J Bauer and Patrick J Curran. Probing interactions in fixed and multilevel regression: inferential and graphical techniques. *Multivariate behavioral research*, 40(3):373–400, 2005.

## Vault Notes

- [[Moderation Analysis]] — Bayesian moderation analysis with PyMC
