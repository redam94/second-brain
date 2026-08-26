---
title: Confirmatory Factor Analysis and Structural Equation Models in Psychometrics
source: https://www.pymc.io/projects/examples/en/latest/case_studies/CFA_SEM.html
author: null
published: null
created: 2026-04-09
description: “Evidently, the notions of relevance and dependence are far more basic
  to human reasoning than the numerical values attached to probability judgments…the
  language used for representing probabilisti...
tags:
- clippings
doc_type: article
source_location: web article (see source URL)
depends_on: []
used_by: []
---
## Confirmatory Factor Analysis and Structural Equation Models in Psychometrics

> “Evidently, the notions of relevance and dependence are far more basic to human reasoning than the numerical values attached to probability judgments…the language used for representing probabilistic information should allow assertions about dependency relationships to be expressed qualitatively, directly, and explicitly” - Pearl in *Probabilistic Reasoning in Intelligent Systems*

Measurement data in psychometrics is often derived from a strategically constructed survey aimed at a particular target phenomena. Some intuited, but not yet measured, concept that arguably plays a determining role in human action, motivation or sentiment. The relative “fuzziness” of the subject matter in psychometrics has had a catalyzing effect on the methodological rigour sought in the science.

Survey designs are agonized over for correct tone and rhythm of sentence structure. Measurement scales are doubly checked for reliability and correctness. The literature is consulted and questions are refined. Analysis steps are justified and tested under a wealth of modelling routines. Model architectures are defined and refined to better express the hypothesized structures in the data-generating process. We will see how such due diligence leads to powerful and expressive models that grant us tractability on thorny questions of human affect.

Throughout we draw on Roy Levy and Robert J. Mislevy’s excellent *Bayesian Psychometric Modeling*.

```
import warnings

import arviz as az
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pymc as pm
import pytensor.tensor as pt
import seaborn as sns

warnings.filterwarnings("ignore", category=RuntimeWarning)
warnings.filterwarnings("ignore", category=UserWarning)
```

```
%config InlineBackend.figure_format = 'retina'  # high resolution figures
az.style.use("arviz-darkgrid")
rng = np.random.default_rng(42)
```

## Latent Constructs and Measurement

Our data is borrowed from work by Boris Mayer and Andrew Ellis found [here](https://methodenlehre.github.io/SGSCLM-R-course/cfa-and-sem-with-lavaan.html#structural-equation-modelling-sem). They demonstrate CFA and SEM modelling with lavaan.

We have survey responses from ~300 individuals who have answered questions regarding their upbringing, self-efficacy and reported life-satisfaction. The hypothetical dependency structure in this life-satisfaction dataset posits a moderated relationship between scores related to life-satisfaction, parental and family support and self-efficacy. It is not a trivial task to be able to design a survey that can elicit answers plausibly mapped to each of these “factors” or themes, never mind finding a model of their relationship that can inform us as to the relative of impact of each on life-satisfaction outcomes.

First let’s pull out the data and examine some summary statistics.

```
df = pd.read_csv("../data/sem_data.csv")
df.head()
```

|  | ID | region | gender | age | se\_acad\_p1 | se\_acad\_p2 | se\_acad\_p3 | se\_social\_p1 | se\_social\_p2 | se\_social\_p3 | sup\_friends\_p1 | sup\_friends\_p2 | sup\_friends\_p3 | sup\_parents\_p1 | sup\_parents\_p2 | sup\_parents\_p3 | ls\_p1 | ls\_p2 | ls\_p3 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | west | female | 13 | 4.857143 | 5.571429 | 4.500000 | 5.80 | 5.500000 | 5.40 | 6.5 | 6.5 | 7.0 | 7.0 | 7.0 | 6.0 | 5.333333 | 6.75 | 5.50 |
| 1 | 2 | west | male | 14 | 4.571429 | 4.285714 | 4.666667 | 5.00 | 5.500000 | 4.80 | 4.5 | 4.5 | 5.5 | 5.0 | 6.0 | 4.5 | 4.333333 | 5.00 | 4.50 |
| 2 | 10 | west | female | 14 | 4.142857 | 6.142857 | 5.333333 | 5.20 | 4.666667 | 6.00 | 4.0 | 4.5 | 3.5 | 7.0 | 7.0 | 6.5 | 6.333333 | 5.50 | 4.00 |
| 3 | 11 | west | female | 14 | 5.000000 | 5.428571 | 4.833333 | 6.40 | 5.833333 | 6.40 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 7.0 | 4.333333 | 6.50 | 6.25 |
| 4 | 12 | west | female | 14 | 5.166667 | 5.600000 | 4.800000 | 5.25 | 5.400000 | 5.25 | 7.0 | 7.0 | 7.0 | 6.5 | 6.5 | 7.0 | 5.666667 | 6.00 | 5.75 |

```
fig, ax = plt.subplots(figsize=(20, 10))
drivers = [c for c in df.columns if not c in ["region", "gender", "age", "ID"]]
corr_df = df[drivers].corr()
mask = np.triu(np.ones_like(corr_df, dtype=bool))
sns.heatmap(corr_df, annot=True, cmap="Blues", ax=ax, center=0, mask=mask)
ax.set_title("Sample Correlations between indicator Metrics")
fig, ax = plt.subplots(figsize=(20, 10))
sns.heatmap(df[drivers].cov(), annot=True, cmap="Blues", ax=ax, center=0, mask=mask)
ax.set_title("Sample Covariances between indicator Metrics");
```

 [![../_images/aebe547ee33a40d30f0b8eee41e262900255ed6a7c431ab65a9927b9e13d1573.png](https://www.pymc.io/projects/examples/en/latest/_images/aebe547ee33a40d30f0b8eee41e262900255ed6a7c431ab65a9927b9e13d1573.png)](https://www.pymc.io/projects/examples/en/latest/_images/aebe547ee33a40d30f0b8eee41e262900255ed6a7c431ab65a9927b9e13d1573.png)[![../_images/48b5e32241718dd511a178f3afaaa08d2a769bab7e76adc4fbcb378bc9aa4645.png](https://www.pymc.io/projects/examples/en/latest/_images/48b5e32241718dd511a178f3afaaa08d2a769bab7e76adc4fbcb378bc9aa4645.png)](https://www.pymc.io/projects/examples/en/latest/_images/48b5e32241718dd511a178f3afaaa08d2a769bab7e76adc4fbcb378bc9aa4645.png)

The lens here on the sample covariance matrix is common in the traditional [SEM](https://en.wikipedia.org/wiki/Structural_equation_modeling) modeling. [CFA](https://en.wikipedia.org/wiki/Confirmatory_factor_analysis) and SEM models are often estimated by fitting parameters to the data by optimising the parameter structure of the covariance matrix. Model assessment routines often gauge the model’s ability to recover the sample covariance relations. There is a slightyly different (less constrained) approach taken in the Bayesian approach to estimating these models which focuses on the observed data rather than the derived summary statistics.

Next we’ll plot the pairplot to visualise the nature of the correlations

```
ax = sns.pairplot(df[drivers], kind="reg", corner=True, diag_kind="kde")
plt.suptitle("Pair Plot of Indicator Metrics with Regression Fits", fontsize=30);
```

[![../_images/a49851190a023e7bff812b7aa218623b0f48e12a4c2909779b1d9898a99de95d.png](https://www.pymc.io/projects/examples/en/latest/_images/a49851190a023e7bff812b7aa218623b0f48e12a4c2909779b1d9898a99de95d.png)](https://www.pymc.io/projects/examples/en/latest/_images/a49851190a023e7bff812b7aa218623b0f48e12a4c2909779b1d9898a99de95d.png)

It’s this wide-ranging set of relationships that we seek to distill in our CFA models. How can we take this complex joint distribution and structure it in a way that is plausible and interpretable?

## Measurement Models

A measurement model is a key component within the more general structural equation model. A measurement model specifies the relationships between observed variables (typically survey items or indicators) and their underlying latent constructs (often referred to as factors or latent variables). We start our presentation of SEM models more generally by focusing on a type of measurement model with it’s own history - the confirmatory factor model (CFA) which specifies a particular structure to the relationships between our indicator variables and the latent factors. It is this structure which is up for confirmation in our modelling.

We’ll start by fitting a “simple” CFA model in `PyMC` to demonstrate how the pieces fit together, we’ll then expand our focus. Here we ignore the majority of our indicator variables and focus on the idea that there are two latent constructs: (1) Social Self-efficacy and (2) Life Satisfaction.

We’re aiming to articulate a mathematical structure where our indicator variables $x_{i j}$ are determined by a latent factor $\text{Ksi}_{j}$ through an estimated factor loading $\lambda_{i j}$. We keep close to the notation used in Levy and Mislevy’s Bayesian Psychometric Modelling. Functionally we have a set of equations with error terms $\psi_{i}$ for each individual.

$$
x_{1} = \tau_{1} + \lambda_{11} \text{Ksi}_{1} + \psi_{1} \\ x_{2} = \tau_{2} + \lambda_{21} \text{Ksi}_{1} + \psi_{2} \\ . . . \\ x_{n} = \tau_{n} + \lambda_{n 2} \text{Ksi}_{2} + \psi_{n}
$$

or more compactly

$$
\mathbf{x} = \tau + \Lambda \text{Ksi} + \Psi
$$

We have greek letters to highlight traditional model parameters and use $\text{Ksi}$ to highlight latent constructs as a distinct kind of parameter. The goal is to articulate the relationship between the different factors in terms of the covariances between these latent terms and estimate the relationships each latent factor has with the manifest indicator variables. At a high level, we’re saying the joint distribution of the observed data can be represented through conditionalisation in the following schema.

$$
p \left(\right. \mathbf{x}_{\mathbf{i}}^{T} . . . . . \mathbf{x}_{\mathbf{q}}^{T} \left|\right. \text{Ksi} , \Psi , \tau , \Lambda \left.\right) sim N o r m a l \left(\right. \tau + \Lambda \cdot \text{Ksi} , \Psi \left.\right)
$$

We’re making an argument that the multivariate observations $\mathbf{x}$ from each individual $q$ can be considered conditionally exchangeable and in this way represented through Bayesian conditionalisation via De Finetti’s theorem. This is the Bayesian approach to the estimation of CFA and SEM models. We’re seeking a conditionalisation structure that can retrodict the observed data based on latent constructs and hypothetical relationships among the constructs and the observed data points. We will show how to build these structures into our model below

```
# Set up coordinates for appropriate indexing of latent factors
coords = {
    "obs": list(range(len(df))),
    "indicators": ["se_social_p1", "se_social_p2", "se_social_p3", "ls_p1", "ls_p2", "ls_p3"],
    "indicators_1": ["se_social_p1", "se_social_p2", "se_social_p3"],
    "indicators_2": ["ls_p1", "ls_p2", "ls_p3"],
    "latent": ["SE_SOC", "LS"],
}

obs_idx = list(range(len(df)))
with pm.Model(coords=coords) as model:

    # Set up Factor Loadings
    lambdas_ = pm.Normal("lambdas_1", 1, 10, dims=("indicators_1"))
    # Force a fixed scale on the factor loadings for factor 1
    lambdas_1 = pm.Deterministic(
        "lambdas1", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_1")
    )
    lambdas_ = pm.Normal("lambdas_2", 1, 10, dims=("indicators_2"))
    # Force a fixed scale on the factor loadings for factor 2
    lambdas_2 = pm.Deterministic(
        "lambdas2", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_2")
    )

    # Specify covariance structure between latent factors
    kappa = 0
    sd_dist = pm.Exponential.dist(1.0, shape=2)
    chol, _, _ = pm.LKJCholeskyCov("chol_cov", n=2, eta=2, sd_dist=sd_dist, compute_corr=True)
    ksi = pm.MvNormal("ksi", kappa, chol=chol, dims=("obs", "latent"))

    # Construct Pseudo Observation matrix based on Factor Loadings
    tau = pm.Normal("tau", 3, 10, dims="indicators")
    m1 = tau[0] + ksi[obs_idx, 0] * lambdas_1[0]
    m2 = tau[1] + ksi[obs_idx, 0] * lambdas_1[1]
    m3 = tau[2] + ksi[obs_idx, 0] * lambdas_1[2]
    m4 = tau[3] + ksi[obs_idx, 1] * lambdas_2[0]
    m5 = tau[4] + ksi[obs_idx, 1] * lambdas_2[1]
    m6 = tau[5] + ksi[obs_idx, 1] * lambdas_2[2]

    mu = pm.Deterministic("mu", pm.math.stack([m1, m2, m3, m4, m5, m6]).T)

    ## Error Terms
    Psi = pm.InverseGamma("Psi", 5, 10, dims="indicators")

    # Likelihood
    _ = pm.Normal(
        "likelihood",
        mu,
        Psi,
        observed=df[
            ["se_social_p1", "se_social_p2", "se_social_p3", "ls_p1", "ls_p2", "ls_p3"]
        ].values,
    )

    idata = pm.sample(
        nuts_sampler="numpyro", target_accept=0.95, idata_kwargs={"log_likelihood": True}
    )
    idata.extend(pm.sample_posterior_predictive(idata))

pm.model_to_graphviz(model)
```

```
Compiling...
Compilation time = 0:00:02.366536
Sampling...
```

```
Sampling time = 0:00:04.817171
Transforming variables...
Transformation time = 0:00:00.373360
Computing Log Likelihood...
Log Likelihood time = 0:00:00.248103
Sampling: [likelihood]
```

![../_images/5bccdcffc28353114b60e9aab245735842b38468dfe8d6e69fba9fddf078aefd.svg](https://www.pymc.io/projects/examples/en/latest/_images/5bccdcffc28353114b60e9aab245735842b38468dfe8d6e69fba9fddf078aefd.svg)

Here the model structure and dependency graph becomes a little clearer. Our likelihood term models a outcome matrix of 283x6 observations i.e. the survey responses for 6 questions. These survey responses are modelled as regression-like outcomes from a multivariate normal $K s i$ with a prior correlation structure between the latent constructs. We then specify how each of the outcome measures is a function of one of the latent factor modified by the appropriate factor loading `lambda`.

### Meausurement Model Structure

We can now see how the covariance structure among the latent constructs is integral piece of the overarching model design which is fed forward into our pseudo regression components and weighted with the respective lambda terms.

```
az.summary(idata, var_names=["lambdas1", "lambdas2"])
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| lambdas1\[se\_social\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 4000.0 | 4000.0 | NaN |
| lambdas1\[se\_social\_p2\] | 0.980 | 0.061 | 0.872 | 1.099 | 0.002 | 0.001 | 1001.0 | 1747.0 | 1.01 |
| lambdas1\[se\_social\_p3\] | 0.950 | 0.075 | 0.814 | 1.092 | 0.002 | 0.001 | 1552.0 | 2734.0 | 1.00 |
| lambdas2\[ls\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 4000.0 | 4000.0 | NaN |
| lambdas2\[ls\_p2\] | 0.817 | 0.081 | 0.670 | 0.966 | 0.003 | 0.002 | 602.0 | 988.0 | 1.00 |
| lambdas2\[ls\_p3\] | 0.865 | 0.095 | 0.689 | 1.040 | 0.003 | 0.002 | 858.0 | 1222.0 | 1.00 |

These factor loadings are generally important to interpret in terms of construct validity. Because we’ve specified one of the indicator variables to be fixed at 1, the other indicators which load on that factor should have a loading coefficient in broadly the same scale as the fixed point indicator that defines the construct scale. We’re looking for consistency among the loadings to assess whether the indicators are reliable measures of the construct i.e. if the indicator loadings deviates too far from unit 1 then there is an argument to be made that these indicators don’t belong in the same factor construct. The closer the factor loading parameters within a construct are to 1 the better.

```
idata
```

arviz.InferenceData

- ```
	<xarray.Dataset>
	Dimensions:              (chain: 4, draw: 1000, indicators_1: 3,
	                          indicators_2: 3, obs: 283, latent: 2, indicators: 6,
	                          chol_cov_dim_0: 3, chol_cov_corr_dim_0: 2,
	                          chol_cov_corr_dim_1: 2, chol_cov_stds_dim_0: 2,
	                          mu_dim_0: 283, mu_dim_1: 6)
	Coordinates: (12/13)
	  * chain                (chain) int64 0 1 2 3
	  * draw                 (draw) int64 0 1 2 3 4 5 6 ... 994 995 996 997 998 999
	  * indicators_1         (indicators_1) <U12 'se_social_p1' ... 'se_social_p3'
	  * indicators_2         (indicators_2) <U5 'ls_p1' 'ls_p2' 'ls_p3'
	  * obs                  (obs) int64 0 1 2 3 4 5 6 ... 277 278 279 280 281 282
	  * latent               (latent) <U6 'SE_SOC' 'LS'
	    ...                   ...
	  * chol_cov_dim_0       (chol_cov_dim_0) int64 0 1 2
	  * chol_cov_corr_dim_0  (chol_cov_corr_dim_0) int64 0 1
	  * chol_cov_corr_dim_1  (chol_cov_corr_dim_1) int64 0 1
	  * chol_cov_stds_dim_0  (chol_cov_stds_dim_0) int64 0 1
	  * mu_dim_0             (mu_dim_0) int64 0 1 2 3 4 5 ... 278 279 280 281 282
	  * mu_dim_1             (mu_dim_1) int64 0 1 2 3 4 5
	Data variables:
	    lambdas_1            (chain, draw, indicators_1) float64 1.326 ... 0.9853
	    lambdas_2            (chain, draw, indicators_2) float64 3.699 ... 0.9711
	    ksi                  (chain, draw, obs, latent) float64 -0.5373 ... 0.3594
	    tau                  (chain, draw, indicators) float64 5.333 5.483 ... 5.29
	    chol_cov             (chain, draw, chol_cov_dim_0) float64 0.5704 ... 0.3516
	    Psi                  (chain, draw, indicators) float64 0.4809 ... 0.7488
	    lambdas1             (chain, draw, indicators_1) float64 1.0 ... 0.9853
	    lambdas2             (chain, draw, indicators_2) float64 1.0 ... 0.9711
	    chol_cov_corr        (chain, draw, chol_cov_corr_dim_0, chol_cov_corr_dim_1) float64 ...
	    chol_cov_stds        (chain, draw, chol_cov_stds_dim_0) float64 0.5704 .....
	    mu                   (chain, draw, mu_dim_0, mu_dim_1) float64 4.796 ... ...
	Attributes:
	    created_at:     2025-04-06T20:28:09.942349
	    arviz_version:  0.17.0
	```
- ```
	<xarray.Dataset>
	Dimensions:           (chain: 4, draw: 1000, likelihood_dim_2: 283,
	                       likelihood_dim_3: 6)
	Coordinates:
	  * chain             (chain) int64 0 1 2 3
	  * draw              (draw) int64 0 1 2 3 4 5 6 ... 993 994 995 996 997 998 999
	  * likelihood_dim_2  (likelihood_dim_2) int64 0 1 2 3 4 ... 278 279 280 281 282
	  * likelihood_dim_3  (likelihood_dim_3) int64 0 1 2 3 4 5
	Data variables:
	    likelihood        (chain, draw, likelihood_dim_2, likelihood_dim_3) float64 ...
	Attributes:
	    created_at:                 2025-04-06T20:28:10.167808
	    arviz_version:              0.17.0
	    inference_library:          pymc
	    inference_library_version:  5.10.3
	```
- ```
	<xarray.Dataset>
	Dimensions:           (chain: 4, draw: 1000, likelihood_dim_0: 283,
	                       likelihood_dim_1: 6)
	Coordinates:
	  * chain             (chain) int64 0 1 2 3
	  * draw              (draw) int64 0 1 2 3 4 5 6 ... 993 994 995 996 997 998 999
	  * likelihood_dim_0  (likelihood_dim_0) int64 0 1 2 3 4 ... 278 279 280 281 282
	  * likelihood_dim_1  (likelihood_dim_1) int64 0 1 2 3 4 5
	Data variables:
	    likelihood        (chain, draw, likelihood_dim_0, likelihood_dim_1) float64 ...
	Attributes:
	    created_at:     2025-04-06T20:28:09.946961
	    arviz_version:  0.17.0
	```
- ```
	<xarray.Dataset>
	Dimensions:          (chain: 4, draw: 1000)
	Coordinates:
	  * chain            (chain) int64 0 1 2 3
	  * draw             (draw) int64 0 1 2 3 4 5 6 ... 993 994 995 996 997 998 999
	Data variables:
	    acceptance_rate  (chain, draw) float64 0.9807 0.949 0.9917 ... 0.9999 0.965
	    step_size        (chain, draw) float64 0.145 0.145 0.145 ... 0.1329 0.1329
	    diverging        (chain, draw) bool False False False ... False False False
	    energy           (chain, draw) float64 2.086e+03 2.08e+03 ... 2.058e+03
	    n_steps          (chain, draw) int64 31 31 31 31 31 31 ... 31 31 31 31 31 31
	    tree_depth       (chain, draw) int64 5 5 5 5 5 5 5 5 5 ... 5 5 5 5 5 5 5 5 5
	    lp               (chain, draw) float64 1.788e+03 1.785e+03 ... 1.741e+03
	Attributes:
	    created_at:     2025-04-06T20:28:09.945908
	    arviz_version:  0.17.0
	```
- ```
	<xarray.Dataset>
	Dimensions:           (likelihood_dim_0: 283, likelihood_dim_1: 6)
	Coordinates:
	  * likelihood_dim_0  (likelihood_dim_0) int64 0 1 2 3 4 ... 278 279 280 281 282
	  * likelihood_dim_1  (likelihood_dim_1) int64 0 1 2 3 4 5
	Data variables:
	    likelihood        (likelihood_dim_0, likelihood_dim_1) float64 5.8 ... 5.75
	Attributes:
	    created_at:                 2025-04-06T20:28:09.947311
	    arviz_version:              0.17.0
	    inference_library:          numpyro
	    inference_library_version:  0.13.2
	    sampling_time:              4.817171
	```

Let’s plot the trace diagnostics to validate the sampler has converged well to the posterior distribution.

```
az.plot_trace(idata, var_names=["lambdas1", "lambdas2", "tau", "Psi", "ksi"]);
```

[![../_images/914ef474393978c14a9885f8ea27cce098b7014345884bf87c7c8b85bf971fe3.png](https://www.pymc.io/projects/examples/en/latest/_images/914ef474393978c14a9885f8ea27cce098b7014345884bf87c7c8b85bf971fe3.png)](https://www.pymc.io/projects/examples/en/latest/_images/914ef474393978c14a9885f8ea27cce098b7014345884bf87c7c8b85bf971fe3.png)

We also examine the energy plot to assess sampling diagnostics. This looks quite healthy.

```
fig, axs = plt.subplots(1, 2, figsize=(20, 7))
axs = axs.flatten()
az.plot_energy(idata, ax=axs[0])
az.plot_forest(idata, var_names=["lambdas1", "lambdas2"], combined=True, ax=axs[1])
axs[1].set_title("Factor Loading Estimates")
axs[0].set_title("Energy Plot")
axs[1].axvline(1, color="black");
```

[![../_images/b3ba5a11693b42fc1caef9c606bfbb8204ec6701f74c82c677700789fc02a94d.png](https://www.pymc.io/projects/examples/en/latest/_images/b3ba5a11693b42fc1caef9c606bfbb8204ec6701f74c82c677700789fc02a94d.png)](https://www.pymc.io/projects/examples/en/latest/_images/b3ba5a11693b42fc1caef9c606bfbb8204ec6701f74c82c677700789fc02a94d.png)

### Sampling the Latent Constructs

One thing to highlight in particular about the Bayesian manner of fitting CFA and SEM models is that we now have access to the posterior distribution of the latent quantities. These samples can offer insight into particular individuals in our survey that is harder to glean from the multivariate presentation of the manifest variables.

Show code cell source

Hide code cell source

```
fig, axs = plt.subplots(1, 2, figsize=(20, 9))
axs = axs.flatten()
ax1 = axs[0]
ax2 = axs[1]
az.plot_forest(
    idata,
    var_names=["ksi"],
    combined=True,
    ax=ax1,
    colors="forestgreen",
    coords={"latent": ["SE_SOC"]},
)
az.plot_forest(
    idata, var_names=["ksi"], combined=True, ax=ax2, colors="slateblue", coords={"latent": ["LS"]}
)
ax1.set_yticklabels([])
ax1.set_xlabel("SE_SOCIAL")
ax2.set_yticklabels([])
ax2.set_xlabel("LS")
ax1.axvline(-2, color="red")
ax2.axvline(-2, color="red")
ax1.set_title("Individual Social Self Efficacy \n On Latent Factor SE_SOCIAL")
ax2.set_title("Individual Life Satisfaction Metric \n On Latent Factor LS")
plt.show();
```

[![../_images/1b8a4b7d71d9c386a3b1b8dc94cce43c51471dee30087bb488acde515bf1ec98.png](https://www.pymc.io/projects/examples/en/latest/_images/1b8a4b7d71d9c386a3b1b8dc94cce43c51471dee30087bb488acde515bf1ec98.png)](https://www.pymc.io/projects/examples/en/latest/_images/1b8a4b7d71d9c386a3b1b8dc94cce43c51471dee30087bb488acde515bf1ec98.png)

In this way we can identify and zero-in on individuals that appear to be outliers on one or more of the latent constructs.

### Posterior Predictive Checks

As in more traditional Bayesian modelling, a core component of model evaluation is the assessment of the posterior predictive distribution i.e. the implied outcome distribution. Here too we can pull out draws against each of the indicator variables to assess for coherence and adequacy.

```
def make_ppc(
    idata,
    samples=100,
    drivers=["se_social_p1", "se_social_p2", "se_social_p3", "ls_p1", "ls_p2", "ls_p3"],
    dims=(2, 3),
):
    fig, axs = plt.subplots(dims[0], dims[1], figsize=(20, 10))
    axs = axs.flatten()
    for i in range(len(drivers)):
        for j in range(samples):
            temp = az.extract(idata["posterior_predictive"].sel({"likelihood_dim_3": i}))[
                "likelihood"
            ].values[:, j]
            temp = pd.DataFrame(temp, columns=["likelihood"])
            if j == 0:
                axs[i].hist(df[drivers[i]], alpha=0.3, ec="black", bins=20, label="Observed Scores")
                axs[i].hist(
                    temp["likelihood"], color="purple", alpha=0.1, bins=20, label="Predicted Scores"
                )
            else:
                axs[i].hist(df[drivers[i]], alpha=0.3, ec="black", bins=20)
                axs[i].hist(temp["likelihood"], color="purple", alpha=0.1, bins=20)
            axs[i].set_title(f"Posterior Predictive Checks {drivers[i]}")
            axs[i].legend()
    plt.tight_layout()
    plt.show()

make_ppc(idata)
del idata
```

[![../_images/621b66be45c0b746f9219d58e39467dc0e92cc1c63f77d1a59431e0156908edb.png](https://www.pymc.io/projects/examples/en/latest/_images/621b66be45c0b746f9219d58e39467dc0e92cc1c63f77d1a59431e0156908edb.png)](https://www.pymc.io/projects/examples/en/latest/_images/621b66be45c0b746f9219d58e39467dc0e92cc1c63f77d1a59431e0156908edb.png)

Which shows a relatively sound recovery of the observed data.

### Intermediate Cross-Loading Model

The idea of a measurement model is maybe a little opaque when we only see models that fit well. Instead we want to briefly show how an inappropriate measurement model gets reflected in the estimated parameters for the factor loadings. Here we specify a measurement model which attempts to couple the `se_social` and `sup_parents` indicators and bundle them into the same factor.

```
coords = {
    "obs": list(range(len(df))),
    "indicators": [
        "se_social_p1",
        "se_social_p2",
        "se_social_p3",
        "sup_parents_p1",
        "sup_parents_p2",
        "sup_parents_p3",
        "ls_p1",
        "ls_p2",
        "ls_p3",
    ],
    ## Attempt Cross-Loading of two metric types on one factor
    "indicators_1": [
        "se_social_p1",
        "se_social_p2",
        "se_social_p3",
        "sup_parents_p1",
        "sup_parents_p2",
        "sup_parents_p3",
    ],
    "indicators_2": ["ls_p1", "ls_p2", "ls_p3"],
    "latent": ["SE_SOC", "LS"],
}

obs_idx = list(range(len(df)))
with pm.Model(coords=coords) as model:

    Psi = pm.InverseGamma("Psi", 5, 10, dims="indicators")
    lambdas_ = pm.Normal("lambdas_1", 1, 10, dims=("indicators_1"))
    # Force a fixed scale on the factor loadings for factor 1
    lambdas_1 = pm.Deterministic(
        "lambdas1", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_1")
    )
    lambdas_ = pm.Normal("lambdas_2", 1, 10, dims=("indicators_2"))
    # Force a fixed scale on the factor loadings for factor 2
    lambdas_2 = pm.Deterministic(
        "lambdas2", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_2")
    )
    tau = pm.Normal("tau", 3, 10, dims="indicators")
    # Specify covariance structure between latent factors
    kappa = 0
    sd_dist = pm.Exponential.dist(1.0, shape=2)
    chol, _, _ = pm.LKJCholeskyCov("chol_cov", n=2, eta=2, sd_dist=sd_dist, compute_corr=True)
    ksi = pm.MvNormal("ksi", kappa, chol=chol, dims=("obs", "latent"))

    # Construct Observation matrix
    m1 = tau[0] + ksi[obs_idx, 0] * lambdas_1[0]
    m2 = tau[1] + ksi[obs_idx, 0] * lambdas_1[1]
    m3 = tau[2] + ksi[obs_idx, 0] * lambdas_1[2]
    m4 = tau[3] + ksi[obs_idx, 0] * lambdas_1[3]
    m5 = tau[4] + ksi[obs_idx, 0] * lambdas_1[4]
    m6 = tau[5] + ksi[obs_idx, 0] * lambdas_1[5]
    m7 = tau[3] + ksi[obs_idx, 1] * lambdas_2[0]
    m8 = tau[4] + ksi[obs_idx, 1] * lambdas_2[1]
    m9 = tau[5] + ksi[obs_idx, 1] * lambdas_2[2]

    mu = pm.Deterministic("mu", pm.math.stack([m1, m2, m3, m4, m5, m6, m7, m8, m9]).T)
    _ = pm.Normal(
        "likelihood",
        mu,
        Psi,
        observed=df[
            [
                "se_social_p1",
                "se_social_p2",
                "se_social_p3",
                "sup_parents_p1",
                "sup_parents_p2",
                "sup_parents_p3",
                "ls_p1",
                "ls_p2",
                "ls_p3",
            ]
        ].values,
    )

    idata = pm.sample(
        # draws = 4000,
        draws=10000,
        nuts_sampler="numpyro",
        target_accept=0.99,
        idata_kwargs={"log_likelihood": True},
        random_seed=114,
    )
    idata.extend(pm.sample_posterior_predictive(idata))
```

```
Compiling...
Compilation time = 0:00:01.827559
Sampling...
```

```
Sampling time = 0:00:26.142915
Transforming variables...
Transformation time = 0:00:01.419382
Computing Log Likelihood...
Log Likelihood time = 0:00:01.012155
Sampling: [likelihood]
```

Again our model samples well but the parameter estimates suggest that there is some inconsistency between the scale on which we’re trying to force both sets of metrics.

```
az.summary(idata, var_names=["lambdas1", "lambdas2"])
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| lambdas1\[se\_social\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 40000.0 | 40000.0 | NaN |
| lambdas1\[se\_social\_p2\] | 0.928 | 0.128 | 0.694 | 1.172 | 0.002 | 0.002 | 3090.0 | 5423.0 | 1.0 |
| lambdas1\[se\_social\_p3\] | 0.854 | 0.139 | 0.598 | 1.121 | 0.002 | 0.002 | 4600.0 | 8366.0 | 1.0 |
| lambdas1\[sup\_parents\_p1\] | 2.321 | 0.289 | 1.807 | 2.867 | 0.008 | 0.005 | 1421.0 | 2736.0 | 1.0 |
| lambdas1\[sup\_parents\_p2\] | 2.171 | 0.278 | 1.684 | 2.699 | 0.008 | 0.005 | 1333.0 | 2592.0 | 1.0 |
| lambdas1\[sup\_parents\_p3\] | 2.334 | 0.290 | 1.832 | 2.898 | 0.008 | 0.005 | 1442.0 | 2795.0 | 1.0 |
| lambdas2\[ls\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 40000.0 | 40000.0 | NaN |
| lambdas2\[ls\_p2\] | 0.777 | 0.105 | 0.589 | 0.975 | 0.002 | 0.002 | 2530.0 | 4296.0 | 1.0 |
| lambdas2\[ls\_p3\] | 1.080 | 0.135 | 0.840 | 1.335 | 0.003 | 0.002 | 2271.0 | 3902.0 | 1.0 |

This is similarly reflected in the diagnostic energy plots here too.

```
fig, axs = plt.subplots(1, 2, figsize=(20, 9))
axs = axs.flatten()
az.plot_energy(idata, ax=axs[0])
az.plot_forest(idata, var_names=["lambdas1", "lambdas2"], combined=True, ax=axs[1])
axs[1].axvline(1, color="black")
axs[1].set_title("Factor Loadings Estimates")
axs[0].set_title("Energy Plot");
```

[![../_images/6f4ef165651439c99f55536e7b4c7e3156faae89fd20a1f113072cc7f41b90d0.png](https://www.pymc.io/projects/examples/en/latest/_images/6f4ef165651439c99f55536e7b4c7e3156faae89fd20a1f113072cc7f41b90d0.png)](https://www.pymc.io/projects/examples/en/latest/_images/6f4ef165651439c99f55536e7b4c7e3156faae89fd20a1f113072cc7f41b90d0.png)

This hints at a variety of measurement model misspecification and should force us back to the drawing board. An appropriate measurement model maps the indicator variables to a consistently defined latent construct that plausibly reflects aspects of the realised indicator metrics.

## Full Measurement Model

With this in mind we’ll now specify a full measurement that maps each of our thematically similar indicator metrics to an individual latent construct. This mandates the postulation of 5 distinct constructs where we only admit three metrics load on each construct. The choice of which metric loads on the latent construct is determined in our case by the constructs each measure is intended to measure. In the typical `lavaan` syntax we might write the model as follows:

```
SUP_Parents =~ sup_parents_p1 + sup_parents_p2 + sup_parents_p3
SUP_Friends =~ sup_friends_p1 + sup_friends_p2 + sup_friends_p3
SE_Academic =~ se_acad_p1 + se_acad_p2 + se_acad_p3
SE_Social =~ se_social_p1 + se_social_p2 + se_social_p3
LS  =~ ls_p1 + ls_p2 + ls_p3
```

where the `=~` syntax denotes “is measured by” relation. It is the manner in which each of these indicator variables is determined by the latent construct that we seek to estimate when fitting a measurement model of this type.

```
drivers = [
    "se_acad_p1",
    "se_acad_p2",
    "se_acad_p3",
    "se_social_p1",
    "se_social_p2",
    "se_social_p3",
    "sup_friends_p1",
    "sup_friends_p2",
    "sup_friends_p3",
    "sup_parents_p1",
    "sup_parents_p2",
    "sup_parents_p3",
    "ls_p1",
    "ls_p2",
    "ls_p3",
]

coords = {
    "obs": list(range(len(df))),
    "indicators": drivers,
    "indicators_1": ["se_acad_p1", "se_acad_p2", "se_acad_p3"],
    "indicators_2": ["se_social_p1", "se_social_p2", "se_social_p3"],
    "indicators_3": ["sup_friends_p1", "sup_friends_p2", "sup_friends_p3"],
    "indicators_4": ["sup_parents_p1", "sup_parents_p2", "sup_parents_p3"],
    "indicators_5": ["ls_p1", "ls_p2", "ls_p3"],
    "latent": ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P", "LS"],
    "latent1": ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P", "LS"],
}

obs_idx = list(range(len(df)))
with pm.Model(coords=coords) as model:

    Psi = pm.InverseGamma("Psi", 5, 10, dims="indicators")
    lambdas_ = pm.Normal("lambdas_1", 1, 10, dims=("indicators_1"))
    lambdas_1 = pm.Deterministic(
        "lambdas1", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_1")
    )
    lambdas_ = pm.Normal("lambdas_2", 1, 10, dims=("indicators_2"))
    lambdas_2 = pm.Deterministic(
        "lambdas2", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_2")
    )
    lambdas_ = pm.Normal("lambdas_3", 1, 10, dims=("indicators_3"))
    lambdas_3 = pm.Deterministic(
        "lambdas3", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_3")
    )
    lambdas_ = pm.Normal("lambdas_4", 1, 10, dims=("indicators_4"))
    lambdas_4 = pm.Deterministic(
        "lambdas4", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_4")
    )
    lambdas_ = pm.Normal("lambdas_5", 1, 10, dims=("indicators_5"))
    lambdas_5 = pm.Deterministic(
        "lambdas5", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_5")
    )
    tau = pm.Normal("tau", 3, 10, dims="indicators")
    kappa = 0
    sd_dist = pm.Exponential.dist(1.0, shape=5)
    chol, _, _ = pm.LKJCholeskyCov("chol_cov", n=5, eta=2, sd_dist=sd_dist, compute_corr=True)
    cov = pm.Deterministic("cov", chol.dot(chol.T), dims=("latent", "latent1"))
    ksi = pm.MvNormal("ksi", kappa, chol=chol, dims=("obs", "latent"))

    m0 = tau[0] + ksi[obs_idx, 0] * lambdas_1[0]
    m1 = tau[1] + ksi[obs_idx, 0] * lambdas_1[1]
    m2 = tau[2] + ksi[obs_idx, 0] * lambdas_1[2]
    m3 = tau[3] + ksi[obs_idx, 1] * lambdas_2[0]
    m4 = tau[4] + ksi[obs_idx, 1] * lambdas_2[1]
    m5 = tau[5] + ksi[obs_idx, 1] * lambdas_2[2]
    m6 = tau[6] + ksi[obs_idx, 2] * lambdas_3[0]
    m7 = tau[7] + ksi[obs_idx, 2] * lambdas_3[1]
    m8 = tau[8] + ksi[obs_idx, 2] * lambdas_3[2]
    m9 = tau[9] + ksi[obs_idx, 3] * lambdas_4[0]
    m10 = tau[10] + ksi[obs_idx, 3] * lambdas_4[1]
    m11 = tau[11] + ksi[obs_idx, 3] * lambdas_4[2]
    m12 = tau[12] + ksi[obs_idx, 4] * lambdas_5[0]
    m13 = tau[13] + ksi[obs_idx, 4] * lambdas_5[1]
    m14 = tau[14] + ksi[obs_idx, 4] * lambdas_5[2]

    mu = pm.Deterministic(
        "mu", pm.math.stack([m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14]).T
    )
    _ = pm.Normal("likelihood", mu, Psi, observed=df[drivers].values)

    idata_mm = pm.sample(
        draws=10000,
        nuts_sampler="numpyro",
        target_accept=0.98,
        tune=1000,
        idata_kwargs={"log_likelihood": True},
        random_seed=100,
    )
    idata_mm.extend(pm.sample_posterior_predictive(idata_mm))
```

```
Compiling...
Compilation time = 0:00:02.876795
Sampling...
```

```
Sampling time = 0:05:47.678511
Transforming variables...
Transformation time = 0:00:02.847776
Computing Log Likelihood...
Log Likelihood time = 0:00:01.713610
Sampling: [likelihood]
```

### Model Evaluation Checks

We can see quickly here how this factor structure seems to sample better and retains a consistency of scale.

```
fig, axs = plt.subplots(1, 2, figsize=(20, 9))
axs = axs.flatten()
az.plot_energy(idata_mm, ax=axs[0])
az.plot_forest(idata_mm, var_names=["lambdas1", "lambdas2", "lambdas3"], combined=True, ax=axs[1]);
```

[![../_images/4c0e10189f28ca821f00442de44ac417512623425ca9fdcc5c1951e84d8d1d14.png](https://www.pymc.io/projects/examples/en/latest/_images/4c0e10189f28ca821f00442de44ac417512623425ca9fdcc5c1951e84d8d1d14.png)](https://www.pymc.io/projects/examples/en/latest/_images/4c0e10189f28ca821f00442de44ac417512623425ca9fdcc5c1951e84d8d1d14.png)

We can also pull out the more typical patterns of model evaluation by assessing the fit between the posterior predicted covariances and the sample covariances. This is a sanity check to assess local model fit statistics. The below code iterates over draws from the posterior predictive distribution and calculates the covariance or correlation matrix on each draw, we calculate the residuals on each draw between each of the covariances and then average across the draws.

```
def get_posterior_resids(idata, samples=100, metric="cov"):
    resids = []
    for i in range(100):
        if metric == "cov":
            model_cov = pd.DataFrame(
                az.extract(idata["posterior_predictive"])["likelihood"][:, :, i]
            ).cov()
            obs_cov = df[drivers].cov()
        else:
            model_cov = pd.DataFrame(
                az.extract(idata["posterior_predictive"])["likelihood"][:, :, i]
            ).corr()
            obs_cov = df[drivers].corr()
        model_cov.index = obs_cov.index
        model_cov.columns = obs_cov.columns
        residuals = model_cov - obs_cov
        resids.append(residuals.values.flatten())

    residuals_posterior = pd.DataFrame(pd.DataFrame(resids).mean().values.reshape(15, 15))
    residuals_posterior.index = obs_cov.index
    residuals_posterior.columns = obs_cov.index
    return residuals_posterior

residuals_posterior_cov = get_posterior_resids(idata_mm, 2500)
residuals_posterior_corr = get_posterior_resids(idata_mm, 2500, metric="corr")
```

These tables lend themselves to nice plots where we can highlight the deviation from the sample covariance and correlation statistics.

```
fig, ax = plt.subplots(figsize=(20, 10))
mask = np.triu(np.ones_like(residuals_posterior_corr, dtype=bool))
ax = sns.heatmap(residuals_posterior_corr, annot=True, cmap="bwr", mask=mask)
ax.set_title("Residuals between Model Implied and Sample Correlations", fontsize=25);
```

[![../_images/e0c24d50f3eb0eeaf252f5b3380ebb96b936b398b56e51339913ea6bbe9fe321.png](https://www.pymc.io/projects/examples/en/latest/_images/e0c24d50f3eb0eeaf252f5b3380ebb96b936b398b56e51339913ea6bbe9fe321.png)](https://www.pymc.io/projects/examples/en/latest/_images/e0c24d50f3eb0eeaf252f5b3380ebb96b936b398b56e51339913ea6bbe9fe321.png)

```
fig, ax = plt.subplots(figsize=(20, 10))
ax = sns.heatmap(residuals_posterior_cov, annot=True, cmap="bwr", mask=mask)
ax.set_title("Residuals between Model Implied and Sample Covariances", fontsize=25);
```

[![../_images/de5be888a8fd75e0daa7d55eb3f3d0e959c8b32f26223862ee27f4ef46520e38.png](https://www.pymc.io/projects/examples/en/latest/_images/de5be888a8fd75e0daa7d55eb3f3d0e959c8b32f26223862ee27f4ef46520e38.png)](https://www.pymc.io/projects/examples/en/latest/_images/de5be888a8fd75e0daa7d55eb3f3d0e959c8b32f26223862ee27f4ef46520e38.png)

However the focus on recovering a fit to such summary statistics is less compelling and more indirect than recovering the observed data itself. We can also do more contemporary Bayesian posterior predictive checks as we pull out the predictive posterior distribution for each of the observed metrics.

```
make_ppc(idata_mm, 100, drivers=residuals_posterior_cov.columns, dims=(5, 3));
```

[![../_images/5980d468fc692b8ac96d741e145ca1834b5f1bbf7318c63a4bbf90a1ce2185af.png](https://www.pymc.io/projects/examples/en/latest/_images/5980d468fc692b8ac96d741e145ca1834b5f1bbf7318c63a4bbf90a1ce2185af.png)](https://www.pymc.io/projects/examples/en/latest/_images/5980d468fc692b8ac96d741e145ca1834b5f1bbf7318c63a4bbf90a1ce2185af.png)

### Model Analysis

We’re not just interested in recovering the observed data patterns we also want a way of pulling out the inferences relating to the latent constructs. For instance we can pull out the factor loadings and calculate measures of variance accounted for by each of the indicator variables in this factor system and for the factors themselves.

```
def make_factor_loadings_df(idata):
    factor_loadings = pd.DataFrame(
        az.summary(
            idata_mm, var_names=["lambdas1", "lambdas2", "lambdas3", "lambdas4", "lambdas5"]
        )["mean"]
    ).reset_index()
    factor_loadings["factor"] = factor_loadings["index"].str.split("[", expand=True)[0]
    factor_loadings.columns = ["factor_loading", "factor_loading_weight", "factor"]
    factor_loadings["factor_loading_weight_sq"] = factor_loadings["factor_loading_weight"] ** 2
    factor_loadings["sum_sq_loadings"] = factor_loadings.groupby("factor")[
        "factor_loading_weight_sq"
    ].transform(sum)
    factor_loadings["error_variances"] = az.summary(idata_mm, var_names=["Psi"])["mean"].values
    factor_loadings["total_indicator_variance"] = (
        factor_loadings["factor_loading_weight_sq"] + factor_loadings["error_variances"]
    )
    factor_loadings["total_variance"] = factor_loadings["total_indicator_variance"].sum()
    factor_loadings["indicator_explained_variance"] = (
        factor_loadings["factor_loading_weight_sq"] / factor_loadings["total_variance"]
    )
    factor_loadings["factor_explained_variance"] = (
        factor_loadings["sum_sq_loadings"] / factor_loadings["total_variance"]
    )
    num_cols = [c for c in factor_loadings.columns if not c in ["factor_loading", "factor"]]
    return factor_loadings

pd.set_option("display.max_colwidth", 15)
factor_loadings = make_factor_loadings_df(idata_mm)
num_cols = [c for c in factor_loadings.columns if not c in ["factor_loading", "factor"]]
factor_loadings.style.format("{:.2f}", subset=num_cols).background_gradient(
    axis=0, subset=["indicator_explained_variance", "factor_explained_variance"]
)
```

```
/var/folders/__/ng_3_9pn1f11ftyml_qr69vh0000gn/T/ipykernel_7200/1650813745.py:12: FutureWarning: The provided callable <built-in function sum> is currently using SeriesGroupBy.sum. In a future version of pandas, the provided callable will be used directly. To keep current behavior pass the string "sum" instead.
  ].transform(sum)
```

|  | factor\_loading | factor\_loading\_weight | factor | factor\_loading\_weight\_sq | sum\_sq\_loadings | error\_variances | total\_indicator\_variance | total\_variance | indicator\_explained\_variance | factor\_explained\_variance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | lambdas1\[se\_acad\_p1\] | 1.00 | lambdas1 | 1.00 | 2.61 | 0.41 | 1.41 | 21.47 | 0.05 | 0.12 |
| 1 | lambdas1\[se\_acad\_p2\] | 0.82 | lambdas1 | 0.67 | 2.61 | 0.41 | 1.09 | 21.47 | 0.03 | 0.12 |
| 2 | lambdas1\[se\_acad\_p3\] | 0.97 | lambdas1 | 0.94 | 2.61 | 0.47 | 1.41 | 21.47 | 0.04 | 0.12 |
| 3 | lambdas2\[se\_social\_p1\] | 1.00 | lambdas2 | 1.00 | 2.81 | 0.43 | 1.43 | 21.47 | 0.05 | 0.13 |
| 4 | lambdas2\[se\_social\_p2\] | 0.96 | lambdas2 | 0.92 | 2.81 | 0.36 | 1.29 | 21.47 | 0.04 | 0.13 |
| 5 | lambdas2\[se\_social\_p3\] | 0.94 | lambdas2 | 0.88 | 2.81 | 0.55 | 1.43 | 21.47 | 0.04 | 0.13 |
| 6 | lambdas3\[sup\_friends\_p1\] | 1.00 | lambdas3 | 1.00 | 2.46 | 0.52 | 1.52 | 21.47 | 0.05 | 0.11 |
| 7 | lambdas3\[sup\_friends\_p2\] | 0.80 | lambdas3 | 0.64 | 2.46 | 0.51 | 1.15 | 21.47 | 0.03 | 0.11 |
| 8 | lambdas3\[sup\_friends\_p3\] | 0.91 | lambdas3 | 0.82 | 2.46 | 0.62 | 1.44 | 21.47 | 0.04 | 0.11 |
| 9 | lambdas4\[sup\_parents\_p1\] | 1.00 | lambdas4 | 1.00 | 3.11 | 0.55 | 1.55 | 21.47 | 0.05 | 0.14 |
| 10 | lambdas4\[sup\_parents\_p2\] | 1.04 | lambdas4 | 1.08 | 3.11 | 0.54 | 1.62 | 21.47 | 0.05 | 0.14 |
| 11 | lambdas4\[sup\_parents\_p3\] | 1.01 | lambdas4 | 1.02 | 3.11 | 0.68 | 1.70 | 21.47 | 0.05 | 0.14 |
| 12 | lambdas5\[ls\_p1\] | 1.00 | lambdas5 | 1.00 | 2.61 | 0.67 | 1.67 | 21.47 | 0.05 | 0.12 |
| 13 | lambdas5\[ls\_p2\] | 0.79 | lambdas5 | 0.63 | 2.61 | 0.53 | 1.16 | 21.47 | 0.03 | 0.12 |
| 14 | lambdas5\[ls\_p3\] | 0.99 | lambdas5 | 0.98 | 2.61 | 0.62 | 1.61 | 21.47 | 0.05 | 0.12 |

We can pull out and plot the ordered weightings as a kind of feature importance plot.

```
fig, ax = plt.subplots(figsize=(15, 8))
temp = factor_loadings[["factor_loading", "indicator_explained_variance"]].sort_values(
    by="indicator_explained_variance"
)
ax.barh(
    temp["factor_loading"], temp["indicator_explained_variance"], align="center", color="slateblue"
)
ax.set_title("Explained Variance");
```

[![../_images/dbe8dcc773c0b6c1c167cad397d7ae115ab8eadf3820db11505d0866b5cbc803.png](https://www.pymc.io/projects/examples/en/latest/_images/dbe8dcc773c0b6c1c167cad397d7ae115ab8eadf3820db11505d0866b5cbc803.png)](https://www.pymc.io/projects/examples/en/latest/_images/dbe8dcc773c0b6c1c167cad397d7ae115ab8eadf3820db11505d0866b5cbc803.png)

The goal of this kind of view isn’t necessarily to find useful features as in the machine learning context, but to help understand the nature of the variation in our system. We can also pull out covariances and correlations among the latent factors

Show code cell source

Hide code cell source

```
cov_df = pd.DataFrame(az.extract(idata_mm["posterior"])["cov"].mean(axis=2))
cov_df.index = ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P", "LS"]
cov_df.columns = ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P", "LS"]

correlation_df = pd.DataFrame(az.extract(idata_mm["posterior"])["chol_cov_corr"].mean(axis=2))
correlation_df.index = ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P", "LS"]
correlation_df.columns = ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P", "LS"]

fig, axs = plt.subplots(1, 2, figsize=(20, 10))
axs = axs.flatten()
mask = np.triu(np.ones_like(cov_df, dtype=bool))
sns.heatmap(cov_df, annot=True, cmap="Blues", ax=axs[0], mask=mask)
axs[0].set_title("Covariance of Latent Constructs")
axs[1].set_title("Correlation of Latent Constructs")
sns.heatmap(correlation_df, annot=True, cmap="Blues", ax=axs[1], mask=mask);
```

[![../_images/1ade688e154c04497a38ba00d9a4659a708a2cb7bbbb3bcb3cb8ab786111b498.png](https://www.pymc.io/projects/examples/en/latest/_images/1ade688e154c04497a38ba00d9a4659a708a2cb7bbbb3bcb3cb8ab786111b498.png)](https://www.pymc.io/projects/examples/en/latest/_images/1ade688e154c04497a38ba00d9a4659a708a2cb7bbbb3bcb3cb8ab786111b498.png)

Which highlights the strong relationships between life-satisfaction `LS` construct, parental support `SUP_P` and social self-efficacy `SE_SOCIAL`. We can observe these patterns in the draws of our latent constructs too

Show code cell source

Hide code cell source

```
fig, axs = plt.subplots(1, 3, figsize=(15, 10))
axs = axs.flatten()
ax = axs[0]
ax1 = axs[1]
ax2 = axs[2]
az.plot_forest(idata_mm, var_names=["ksi"], combined=True, ax=ax, coords={"latent": ["SUP_P"]})
az.plot_forest(
    idata_mm,
    var_names=["ksi"],
    combined=True,
    ax=ax1,
    colors="forestgreen",
    coords={"latent": ["SE_SOCIAL"]},
)
az.plot_forest(
    idata_mm,
    var_names=["ksi"],
    combined=True,
    ax=ax2,
    colors="slateblue",
    coords={"latent": ["LS"]},
)
ax.set_yticklabels([])
ax.set_xlabel("SUP_P")
ax1.set_yticklabels([])
ax1.set_xlabel("SE_SOCIAL")
ax2.set_yticklabels([])
ax2.set_xlabel("LS")
ax.axvline(-2, color="red")
ax1.axvline(-2, color="red")
ax2.axvline(-2, color="red")
ax.set_title("Individual Parental Support Metric \n On Latent Factor SUP_P")
ax1.set_title("Individual Social Self Efficacy \n On Latent Factor SE_SOCIAL")
ax2.set_title("Individual Life Satisfaction Metric \n On Latent Factor LS")
plt.show();
```

[![../_images/d4f878c84a78103fda35b6e78442b2ad929b90e7f4dc29532a7903f370f9f341.png](https://www.pymc.io/projects/examples/en/latest/_images/d4f878c84a78103fda35b6e78442b2ad929b90e7f4dc29532a7903f370f9f341.png)](https://www.pymc.io/projects/examples/en/latest/_images/d4f878c84a78103fda35b6e78442b2ad929b90e7f4dc29532a7903f370f9f341.png)

It’s worth highlighting here the cohort on the top left of the `SUP_P` graph which have low parental support scores, seem to have less severe `SE_SOCIAL` scores. This combination seems to result in fairly standard `LS` scores suggesting some kind of moderated relationship.

## Bayesian Structural Equation Models

We’ve now seen how measurement models help us understand the relationships between disparate indicator variables in a kind of crude way. We have postulated a system of latent factors and derived the correlations between these factors to help us understand the strength of relationships between the broader constructs of interest. This is kind a special case of a structural equation models. In the SEM tradition we’re interested in figuring out aspects of the structural relations between variables that means want to posit dependence and independence relationship to interrogate our beliefs about influence flows through the system.

For our data set we can postulate the following chain of dependencies

![Candidate Structural Model](https://www.pymc.io/projects/examples/en/latest/_images/structural_model_sem.png)

This picture introduces specific claims of dependence and the question then becomes how to model these patterns? In the next section we’ll build on the structures of the basic measurement model to articulate these chain of dependence as functional equations of the “root” constructs. This allows to evaluate the same questions of model adequacy as before, but additionally we can now phrase questions about direct and indirect relationships between the latent constructs. In particular, since our focus is on what drives life-satisfaction, we can ask our model about the mediated effects of parental and peer support.

### Model Complexity and Bayesian Sensitivity Analysis

These models are already complicated and now we’re adding a bunch of new parameters and structure to the model. Each of the parameters is equipped with a prior that shapes the implications of the model specification. This is a hugely expressive framework where we can encode a large variety of dependencies and correlations. With this freedom to structure our inferential model we need to be careful to assess the robustness of our inferences. As such we will here perform a quick sensitivity analysis to show how the central implications of this model vary under differing prior settings.

```
drivers = [
    "se_acad_p1",
    "se_acad_p2",
    "se_acad_p3",
    "se_social_p1",
    "se_social_p2",
    "se_social_p3",
    "sup_friends_p1",
    "sup_friends_p2",
    "sup_friends_p3",
    "sup_parents_p1",
    "sup_parents_p2",
    "sup_parents_p3",
    "ls_p1",
    "ls_p2",
    "ls_p3",
]

def make_indirect_sem(priors):

    coords = {
        "obs": list(range(len(df))),
        "indicators": drivers,
        "indicators_1": ["se_acad_p1", "se_acad_p2", "se_acad_p3"],
        "indicators_2": ["se_social_p1", "se_social_p2", "se_social_p3"],
        "indicators_3": ["sup_friends_p1", "sup_friends_p2", "sup_friends_p3"],
        "indicators_4": ["sup_parents_p1", "sup_parents_p2", "sup_parents_p3"],
        "indicators_5": ["ls_p1", "ls_p2", "ls_p3"],
        "latent": ["SUP_F", "SUP_P"],
        "latent1": ["SUP_F", "SUP_P"],
        "latent_regression": ["SUP_F->SE_ACAD", "SUP_P->SE_ACAD", "SUP_F->SE_SOC", "SUP_P->SE_SOC"],
        "regression": ["SE_ACAD", "SE_SOCIAL", "SUP_F", "SUP_P"],
    }

    obs_idx = list(range(len(df)))
    with pm.Model(coords=coords) as model:

        Psi = pm.Gamma("Psi", priors["gamma"], 0.5, dims="indicators")
        lambdas_ = pm.Normal(
            "lambdas_1", priors["lambda"][0], priors["lambda"][1], dims=("indicators_1")
        )
        lambdas_1 = pm.Deterministic(
            "lambdas1", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_1")
        )
        lambdas_ = pm.Normal(
            "lambdas_2", priors["lambda"][0], priors["lambda"][1], dims=("indicators_2")
        )
        lambdas_2 = pm.Deterministic(
            "lambdas2", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_2")
        )
        lambdas_ = pm.Normal(
            "lambdas_3", priors["lambda"][0], priors["lambda"][1], dims=("indicators_3")
        )
        lambdas_3 = pm.Deterministic(
            "lambdas3", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_3")
        )
        lambdas_ = pm.Normal(
            "lambdas_4", priors["lambda"][0], priors["lambda"][1], dims=("indicators_4")
        )
        lambdas_4 = pm.Deterministic(
            "lambdas4", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_4")
        )
        lambdas_ = pm.Normal(
            "lambdas_5", priors["lambda"][0], priors["lambda"][1], dims=("indicators_5")
        )
        lambdas_5 = pm.Deterministic(
            "lambdas5", pt.set_subtensor(lambdas_[0], 1), dims=("indicators_5")
        )
        kappa = 0
        sd_dist = pm.Gamma.dist(priors["gamma"], 0.5, shape=2)
        chol, _, _ = pm.LKJCholeskyCov(
            "chol_cov", n=2, eta=priors["eta"], sd_dist=sd_dist, compute_corr=True
        )
        cov = pm.Deterministic("cov", chol.dot(chol.T), dims=("latent", "latent1"))
        ksi = pm.MvNormal("ksi", kappa, chol=chol, dims=("obs", "latent"))

        # Regression Components
        beta_r = pm.Normal("beta_r", 0, priors["beta_r"], dims="latent_regression")
        beta_r2 = pm.Normal("beta_r2", 0, priors["beta_r2"], dims="regression")
        sd_dist1 = pm.Gamma.dist(1, 0.5, shape=2)
        resid_chol, _, _ = pm.LKJCholeskyCov(
            "resid_chol", n=2, eta=3, sd_dist=sd_dist1, compute_corr=True
        )
        _ = pm.Deterministic("resid_cov", resid_chol.dot(resid_chol.T))
        sigmas_resid = pm.MvNormal("sigmas_resid", 1, chol=resid_chol)
        sigma_regr = pm.HalfNormal("sigma_regr", 1)

        # SE_ACAD ~ SUP_FRIENDS + SUP_PARENTS
        regression_se_acad = pm.Normal(
            "regr_se_acad",
            beta_r[0] * ksi[obs_idx, 0] + beta_r[1] * ksi[obs_idx, 1],
            pm.math.abs(sigmas_resid[0]),  # ensuring positivity
        )
        # SE_SOCIAL ~ SUP_FRIENDS + SUP_PARENTS
        regression_se_social = pm.Normal(
            "regr_se_social",
            beta_r[2] * ksi[obs_idx, 0] + beta_r[3] * ksi[obs_idx, 1],
            pm.math.abs(sigmas_resid[1]),  # ensuring positivity
        )

        # LS ~ SE_ACAD + SE_SOCIAL + SUP_FRIEND + SUP_PARENTS
        regression = pm.Normal(
            "regr",
            beta_r2[0] * regression_se_acad
            + beta_r2[1] * regression_se_social
            + beta_r2[2] * ksi[obs_idx, 0]
            + beta_r2[3] * ksi[obs_idx, 1],
            sigma_regr,
        )

        tau = pm.Normal("tau", 3, 0.5, dims="indicators")
        m0 = tau[0] + regression_se_acad * lambdas_1[0]
        m1 = tau[1] + regression_se_acad * lambdas_1[1]
        m2 = tau[2] + regression_se_acad * lambdas_1[2]
        m3 = tau[3] + regression_se_social * lambdas_2[0]
        m4 = tau[4] + regression_se_social * lambdas_2[1]
        m5 = tau[5] + regression_se_social * lambdas_2[2]
        m6 = tau[6] + ksi[obs_idx, 0] * lambdas_3[0]
        m7 = tau[7] + ksi[obs_idx, 0] * lambdas_3[1]
        m8 = tau[8] + ksi[obs_idx, 0] * lambdas_3[2]
        m9 = tau[9] + ksi[obs_idx, 1] * lambdas_4[0]
        m10 = tau[10] + ksi[obs_idx, 1] * lambdas_4[1]
        m11 = tau[11] + ksi[obs_idx, 1] * lambdas_4[2]
        m12 = tau[12] + regression * lambdas_5[0]
        m13 = tau[13] + regression * lambdas_5[1]
        m14 = tau[14] + regression * lambdas_5[2]

        mu = pm.Deterministic(
            "mu", pm.math.stack([m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14]).T
        )
        # independent_residuals_cov = pm.Deterministic('cov_residuals', pt.diag(Psi))
        # _ = pm.MvNormal('likelihood', mu, independent_residuals_cov, observed=df[drivers].values)
        _ = pm.Normal("likelihood", mu, Psi, observed=df[drivers].values)

        idata = pm.sample_prior_predictive()
        idata.extend(
            pm.sample(
                2000,
                chains=4,
                nuts_sampler="numpyro",
                target_accept=0.99,
                tune=1000,
                idata_kwargs={"log_likelihood": True},
                nuts_sampler_kwargs={"chain_method": "vectorized"},
                random_seed=110,
            )
        )
        idata.extend(pm.sample_posterior_predictive(idata))

        return model, idata

model_sem0, idata_sem0 = make_indirect_sem(
    priors={"eta": 1, "lambda": [1, 2], "beta_r": 3, "beta_r2": 3, "gamma": 1},
)
model_sem1, idata_sem1 = make_indirect_sem(
    priors={"eta": 3, "lambda": [1, 2], "beta_r": 2, "beta_r2": 2, "gamma": 2}
)
model_sem2, idata_sem2 = make_indirect_sem(
    priors={"eta": 1, "lambda": [1, 2], "beta_r": 10, "beta_r2": 10, "gamma": 3}
)
```

```
Sampling: [Psi, beta_r, beta_r2, chol_cov, ksi, lambdas_1, lambdas_2, lambdas_3, lambdas_4, lambdas_5, likelihood, regr, regr_se_acad, regr_se_social, resid_chol, sigma_regr, sigmas_resid, tau]
Compiling...
Compilation time = 0:00:04.450004
Sampling...
sample: 100%|██████████| 3000/3000 [01:57<00:00, 25.50it/s]
Sampling time = 0:02:03.713631
Transforming variables...
Transformation time = 0:00:01.037740
Computing Log Likelihood...
Log Likelihood time = 0:00:00.610742
Sampling: [likelihood]
```

```
Sampling: [Psi, beta_r, beta_r2, chol_cov, ksi, lambdas_1, lambdas_2, lambdas_3, lambdas_4, lambdas_5, likelihood, regr, regr_se_acad, regr_se_social, resid_chol, sigma_regr, sigmas_resid, tau]
Compiling...
Compilation time = 0:00:04.518141
Sampling...
sample: 100%|██████████| 3000/3000 [01:57<00:00, 25.47it/s]
Sampling time = 0:01:58.432051
Transforming variables...
Transformation time = 0:00:00.835798
Computing Log Likelihood...
Log Likelihood time = 0:00:00.620430
Sampling: [likelihood]
```

```
Sampling: [Psi, beta_r, beta_r2, chol_cov, ksi, lambdas_1, lambdas_2, lambdas_3, lambdas_4, lambdas_5, likelihood, regr, regr_se_acad, regr_se_social, resid_chol, sigma_regr, sigmas_resid, tau]
Compiling...
Compilation time = 0:00:04.524251
Sampling...
sample: 100%|██████████| 3000/3000 [01:57<00:00, 25.57it/s]
Sampling time = 0:01:57.898936
Transforming variables...
Transformation time = 0:00:00.819425
Computing Log Likelihood...
Log Likelihood time = 0:00:00.646661
Sampling: [likelihood]
```

The main structural feature to observe is that we’ve now added a bunch of regressions to our model such that some of the constructs that we took as given in the measurement model are now derived as a linear combination of others. Because we removed the correlation effect between `SE_SOCIAL` AND `SE_ACAD` we re-introduce the possibility of their correlation by adding correlated error terms to their regression equations. In the `lavaan` syntax we’re aiming for something like

```
Measurement model
SUP_Parents =~ sup_parents_p1 + sup_parents_p2 + sup_parents_p3
SUP_Friends =~ sup_friends_p1 + sup_friends_p2 + sup_friends_p3
SE_Academic =~ se_acad_p1 + se_acad_p2 + se_acad_p3
SE_Social =~ se_social_p1 + se_social_p2 + se_social_p3
LS  =~ ls_p1 + ls_p2 + ls_p3

Regressions
SE_Academic ~ SUP_Parents + SUP_Friends
SE_Social ~ SUP_Parents + SUP_Friends
LS ~ SE_Academic + SE_Social + SUP_Parents + SUP_Friends

Residual covariances
SE_Academic ~~ SE_Social
```

Often you will see SEM models with a multivariate normal likelihood term, but here we’ve specified independent Normal distributions as the model doesn’t call for a richly structured covariance matrix on the residuals terms. More complicated models are possible, but it’s always a question of how much structure is needed?

```
pm.model_to_graphviz(model_sem0)
```

![../_images/ec4f6498949f82f80ad6700f293f2ed113dfad5838527f3be583ea683d0c7c1a.svg](https://www.pymc.io/projects/examples/en/latest/_images/ec4f6498949f82f80ad6700f293f2ed113dfad5838527f3be583ea683d0c7c1a.svg)

It’s worth pausing to examine the nature of the dependencies sketched in this diagram. We can see here how we’ve replaced the simpler measurement model structure and added three regression functions that replace the draws from the multivariate normal $K s i$. In other words we’ve expressed a dependency as a series of regressions all within the one model. Next we’ll see how the parameter estimates change across our prior specifications for the model. Notice the relative stability of the factor loadings and regression coefficients indicating a robustness in these parameter estimates.

```
fig, ax = plt.subplots(figsize=(15, 15))
az.plot_forest(
    [idata_sem0, idata_sem1, idata_sem2],
    model_names=["SEM0", "SEM1", "SEM2"],
    var_names=["lambdas1", "lambdas2", "lambdas3", "lambdas4", "lambdas5", "beta_r", "beta_r2"],
    combined=True,
    ax=ax,
);
```

[![../_images/16220f6f9a1a936b50095ebfdab9cb295235e99175864a267c869ee0fd23b2bb.png](https://www.pymc.io/projects/examples/en/latest/_images/16220f6f9a1a936b50095ebfdab9cb295235e99175864a267c869ee0fd23b2bb.png)](https://www.pymc.io/projects/examples/en/latest/_images/16220f6f9a1a936b50095ebfdab9cb295235e99175864a267c869ee0fd23b2bb.png)

### Model Evaluation Checks

A quick evaluation of model performance suggests we do somewhat less well in recovering the sample covariance structures than we did with simpler measurement model.

```
residuals_posterior_cov = get_posterior_resids(idata_sem0, 2500)
residuals_posterior_corr = get_posterior_resids(idata_sem0, 2500, metric="corr")

fig, ax = plt.subplots(figsize=(20, 10))
mask = np.triu(np.ones_like(residuals_posterior_corr, dtype=bool))
ax = sns.heatmap(residuals_posterior_corr, annot=True, cmap="bwr", center=0, mask=mask)
ax.set_title("Residuals between Model Implied and Sample Correlations", fontsize=25);
```

[![../_images/2335f6c41b503b6f6c05d468eaeacf3072bab3eefa877011c066ddc9066d4277.png](https://www.pymc.io/projects/examples/en/latest/_images/2335f6c41b503b6f6c05d468eaeacf3072bab3eefa877011c066ddc9066d4277.png)](https://www.pymc.io/projects/examples/en/latest/_images/2335f6c41b503b6f6c05d468eaeacf3072bab3eefa877011c066ddc9066d4277.png)

But the posterior predictive checks still look reasonable. Our focal quantity of life-satisfaction seems to be recovered well.

```
make_ppc(idata_sem0, 100, drivers=drivers, dims=(5, 3))
```

[![../_images/e0d2c9a5e7169de7481ed7d91ed2bf14431ed88223a68217e88f18f57892ac50.png](https://www.pymc.io/projects/examples/en/latest/_images/e0d2c9a5e7169de7481ed7d91ed2bf14431ed88223a68217e88f18f57892ac50.png)](https://www.pymc.io/projects/examples/en/latest/_images/e0d2c9a5e7169de7481ed7d91ed2bf14431ed88223a68217e88f18f57892ac50.png)

Model diagnostics show generally healthy looking trace plots with some divergences, but the effective sample sizea and r-hat measures are fine so we should be generally pretty happy that the model has converged to the posterior distribution well.

```
az.plot_trace(
    idata_sem0,
    var_names=["lambdas1", "lambdas2", "lambdas3", "lambdas4", "lambdas5", "beta_r", "beta_r2"],
);
```

[![../_images/bbfcec6488bfd6975805267b4a311153b3c05553d49791c6ebf9fe5750355234.png](https://www.pymc.io/projects/examples/en/latest/_images/bbfcec6488bfd6975805267b4a311153b3c05553d49791c6ebf9fe5750355234.png)](https://www.pymc.io/projects/examples/en/latest/_images/bbfcec6488bfd6975805267b4a311153b3c05553d49791c6ebf9fe5750355234.png)

```
az.summary(
    idata_sem0,
    var_names=[
        "lambdas1",
        "lambdas2",
        "lambdas3",
        "lambdas4",
        "lambdas5",
        "beta_r",
        "beta_r2",
        "Psi",
        "tau",
    ],
)
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| lambdas1\[se\_acad\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 8000.0 | 8000.0 | NaN |
| lambdas1\[se\_acad\_p2\] | 0.811 | 0.052 | 0.714 | 0.907 | 0.001 | 0.001 | 1810.0 | 3006.0 | 1.00 |
| lambdas1\[se\_acad\_p3\] | 0.964 | 0.061 | 0.848 | 1.076 | 0.002 | 0.001 | 1594.0 | 2543.0 | 1.00 |
| lambdas2\[se\_social\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 8000.0 | 8000.0 | NaN |
| lambdas2\[se\_social\_p2\] | 1.015 | 0.062 | 0.903 | 1.138 | 0.002 | 0.002 | 846.0 | 1443.0 | 1.00 |
| lambdas2\[se\_social\_p3\] | 0.947 | 0.072 | 0.815 | 1.084 | 0.002 | 0.001 | 1618.0 | 3621.0 | 1.00 |
| lambdas3\[sup\_friends\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 8000.0 | 8000.0 | NaN |
| lambdas3\[sup\_friends\_p2\] | 0.800 | 0.044 | 0.720 | 0.885 | 0.001 | 0.001 | 1759.0 | 2647.0 | 1.00 |
| lambdas3\[sup\_friends\_p3\] | 0.900 | 0.051 | 0.808 | 1.002 | 0.001 | 0.001 | 2089.0 | 3676.0 | 1.00 |
| lambdas4\[sup\_parents\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 8000.0 | 8000.0 | NaN |
| lambdas4\[sup\_parents\_p2\] | 1.047 | 0.055 | 0.940 | 1.149 | 0.001 | 0.001 | 1621.0 | 2940.0 | 1.00 |
| lambdas4\[sup\_parents\_p3\] | 1.022 | 0.063 | 0.904 | 1.139 | 0.002 | 0.001 | 1581.0 | 2828.0 | 1.00 |
| lambdas5\[ls\_p1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 8000.0 | 8000.0 | NaN |
| lambdas5\[ls\_p2\] | 0.774 | 0.075 | 0.643 | 0.924 | 0.002 | 0.002 | 1085.0 | 2292.0 | 1.01 |
| lambdas5\[ls\_p3\] | 0.968 | 0.096 | 0.789 | 1.145 | 0.003 | 0.002 | 878.0 | 1815.0 | 1.00 |
| beta\_r\[SUP\_F->SE\_ACAD\] | 0.051 | 0.045 | \-0.035 | 0.131 | 0.001 | 0.001 | 4317.0 | 5455.0 | 1.00 |
| beta\_r\[SUP\_P->SE\_ACAD\] | 0.277 | 0.050 | 0.186 | 0.375 | 0.001 | 0.001 | 3283.0 | 5068.0 | 1.00 |
| beta\_r\[SUP\_F->SE\_SOC\] | 0.160 | 0.037 | 0.089 | 0.229 | 0.001 | 0.000 | 4117.0 | 5717.0 | 1.00 |
| beta\_r\[SUP\_P->SE\_SOC\] | 0.315 | 0.045 | 0.232 | 0.400 | 0.001 | 0.001 | 1818.0 | 3507.0 | 1.00 |
| beta\_r2\[SE\_ACAD\] | 0.106 | 0.067 | \-0.021 | 0.230 | 0.002 | 0.001 | 1841.0 | 3272.0 | 1.00 |
| beta\_r2\[SE\_SOCIAL\] | 0.526 | 0.092 | 0.362 | 0.703 | 0.003 | 0.002 | 1289.0 | 2625.0 | 1.00 |
| beta\_r2\[SUP\_F\] | 0.031 | 0.038 | \-0.041 | 0.103 | 0.001 | 0.001 | 2773.0 | 4374.0 | 1.00 |
| beta\_r2\[SUP\_P\] | 0.280 | 0.050 | 0.185 | 0.375 | 0.001 | 0.001 | 1980.0 | 3489.0 | 1.00 |
| Psi\[se\_acad\_p1\] | 0.387 | 0.031 | 0.326 | 0.444 | 0.001 | 0.001 | 1191.0 | 1614.0 | 1.00 |
| Psi\[se\_acad\_p2\] | 0.396 | 0.024 | 0.352 | 0.442 | 0.000 | 0.000 | 2809.0 | 4515.0 | 1.00 |
| Psi\[se\_acad\_p3\] | 0.446 | 0.029 | 0.396 | 0.503 | 0.001 | 0.000 | 2278.0 | 3249.0 | 1.00 |
| Psi\[se\_social\_p1\] | 0.432 | 0.026 | 0.383 | 0.483 | 0.001 | 0.000 | 1922.0 | 3015.0 | 1.00 |
| Psi\[se\_social\_p2\] | 0.297 | 0.030 | 0.240 | 0.351 | 0.001 | 0.001 | 894.0 | 1277.0 | 1.01 |
| Psi\[se\_social\_p3\] | 0.546 | 0.027 | 0.497 | 0.597 | 0.000 | 0.000 | 4873.0 | 5705.0 | 1.00 |
| Psi\[sup\_friends\_p1\] | 0.485 | 0.043 | 0.401 | 0.561 | 0.001 | 0.001 | 1295.0 | 1582.0 | 1.00 |
| Psi\[sup\_friends\_p2\] | 0.491 | 0.032 | 0.432 | 0.552 | 0.001 | 0.000 | 2404.0 | 3164.0 | 1.00 |
| Psi\[sup\_friends\_p3\] | 0.614 | 0.036 | 0.547 | 0.682 | 0.001 | 0.000 | 2775.0 | 4337.0 | 1.00 |
| Psi\[sup\_parents\_p1\] | 0.537 | 0.035 | 0.473 | 0.604 | 0.001 | 0.000 | 2471.0 | 3822.0 | 1.00 |
| Psi\[sup\_parents\_p2\] | 0.520 | 0.037 | 0.451 | 0.589 | 0.001 | 0.001 | 2342.0 | 3608.0 | 1.00 |
| Psi\[sup\_parents\_p3\] | 0.657 | 0.038 | 0.587 | 0.729 | 0.001 | 0.000 | 2884.0 | 3960.0 | 1.00 |
| Psi\[ls\_p1\] | 0.651 | 0.037 | 0.583 | 0.721 | 0.001 | 0.001 | 1895.0 | 3253.0 | 1.00 |
| Psi\[ls\_p2\] | 0.518 | 0.030 | 0.462 | 0.575 | 0.001 | 0.000 | 2464.0 | 4101.0 | 1.00 |
| Psi\[ls\_p3\] | 0.605 | 0.036 | 0.539 | 0.674 | 0.001 | 0.001 | 2200.0 | 4319.0 | 1.00 |
| tau\[se\_acad\_p1\] | 5.043 | 0.050 | 4.952 | 5.141 | 0.002 | 0.001 | 574.0 | 1511.0 | 1.00 |
| tau\[se\_acad\_p2\] | 5.255 | 0.043 | 5.175 | 5.335 | 0.002 | 0.001 | 657.0 | 1675.0 | 1.00 |
| tau\[se\_acad\_p3\] | 5.102 | 0.050 | 5.012 | 5.200 | 0.002 | 0.001 | 615.0 | 1517.0 | 1.00 |
| tau\[se\_social\_p1\] | 5.148 | 0.049 | 5.057 | 5.239 | 0.003 | 0.002 | 330.0 | 1122.0 | 1.01 |
| tau\[se\_social\_p2\] | 5.336 | 0.045 | 5.248 | 5.418 | 0.003 | 0.002 | 264.0 | 900.0 | 1.01 |
| tau\[se\_social\_p3\] | 5.303 | 0.051 | 5.211 | 5.403 | 0.003 | 0.002 | 370.0 | 1220.0 | 1.01 |
| tau\[sup\_friends\_p1\] | 5.597 | 0.068 | 5.474 | 5.729 | 0.003 | 0.002 | 508.0 | 1397.0 | 1.01 |
| tau\[sup\_friends\_p2\] | 5.856 | 0.058 | 5.749 | 5.966 | 0.003 | 0.002 | 503.0 | 1446.0 | 1.01 |
| tau\[sup\_friends\_p3\] | 5.813 | 0.067 | 5.688 | 5.939 | 0.003 | 0.002 | 603.0 | 1760.0 | 1.01 |
| tau\[sup\_parents\_p1\] | 5.754 | 0.067 | 5.628 | 5.877 | 0.003 | 0.002 | 410.0 | 1144.0 | 1.01 |
| tau\[sup\_parents\_p2\] | 5.697 | 0.068 | 5.565 | 5.821 | 0.003 | 0.002 | 403.0 | 1085.0 | 1.01 |
| tau\[sup\_parents\_p3\] | 5.490 | 0.071 | 5.356 | 5.622 | 0.003 | 0.002 | 449.0 | 1311.0 | 1.01 |
| tau\[ls\_p1\] | 5.019 | 0.060 | 4.908 | 5.131 | 0.003 | 0.002 | 525.0 | 1750.0 | 1.01 |
| tau\[ls\_p2\] | 5.644 | 0.047 | 5.554 | 5.731 | 0.002 | 0.001 | 572.0 | 1517.0 | 1.01 |
| tau\[ls\_p3\] | 5.058 | 0.056 | 4.952 | 5.162 | 0.002 | 0.002 | 511.0 | 1746.0 | 1.01 |

Similar diagnostic results hold for the other models. We now continue to assess questions of direct and indirect effects that were obscure in the simpler measurement model. By which I mean we trace out the total paths that influence life-satisfaction and assess the relative strength of impact due to parental and peer support.

### Indirect and Direct Effects

We now turn to the additional regression structures that we’ve encoded into the model graph. First we pull out the regression coefficients

```
fig, axs = plt.subplots(1, 2, figsize=(20, 8))

az.plot_energy(idata_sem0, ax=axs[0])

az.plot_forest(idata_sem0, var_names=["beta_r", "beta_r2"], combined=True, ax=axs[1])
axs[1].axvline(0, color="red", label="zero-effect")
axs[1].legend();
```

[![../_images/2bfd0b671d812009bb92478853a607be722fd23bace0925a7901a4c7050f13c3.png](https://www.pymc.io/projects/examples/en/latest/_images/2bfd0b671d812009bb92478853a607be722fd23bace0925a7901a4c7050f13c3.png)](https://www.pymc.io/projects/examples/en/latest/_images/2bfd0b671d812009bb92478853a607be722fd23bace0925a7901a4c7050f13c3.png)

The coefficients indicate a strong effect of social self-efficacy on life satisfaction, and smaller relative weight accorded to the effects of peer support than we see with parental support. This is borne out as we trace out the cumulative causal effects (direct and indirect) through our DAG or chain of regression coefficients.

```
def calculate_effects(idata, var="SUP_P"):
    summary_df = az.summary(idata, var_names=["beta_r", "beta_r2"])
    # Indirect Paths
    ## VAR -> SE_SOC ->LS
    indirect_parent_soc = (
        summary_df.loc[f"beta_r[{var}->SE_SOC]"]["mean"]
        * summary_df.loc["beta_r2[SE_SOCIAL]"]["mean"]
    )

    ## VAR -> SE_SOC ->LS
    indirect_parent_acad = (
        summary_df.loc[f"beta_r[{var}->SE_ACAD]"]["mean"]
        * summary_df.loc["beta_r2[SE_ACAD]"]["mean"]
    )

    ## Total Indirect Effects
    total_indirect = indirect_parent_soc + indirect_parent_acad

    ## Total Effects
    total_effect = total_indirect + summary_df.loc[f"beta_r2[{var}]"]["mean"]

    return pd.DataFrame(
        [[indirect_parent_soc, indirect_parent_acad, total_indirect, total_effect]],
        columns=[
            f"{var} -> SE_SOC ->LS",
            f"{var} -> SE_ACAD ->LS",
            f"Total Indirect Effects {var}",
            f"Total Effects {var}",
        ],
    )
```

It remains clear that the impact of parental support dwarfs the effects due to peer support.

```
summary_p = pd.concat(
    [calculate_effects(idata_sem0), calculate_effects(idata_sem1), calculate_effects(idata_sem2)]
)

summary_p.index = ["SEM0", "SEM1", "SEM2"]
summary_p
```

|  | SUP\_P -> SE\_SOC ->LS | SUP\_P -> SE\_ACAD ->LS | Total Indirect Effects SUP\_P | Total Effects SUP\_P |
| --- | --- | --- | --- | --- |
| SEM0 | 0.16569 | 0.029362 | 0.195052 | 0.475052 |
| SEM1 | 0.16569 | 0.029362 | 0.195052 | 0.475052 |
| SEM2 | 0.16632 | 0.029085 | 0.195405 | 0.474405 |

The sensitivity of the estimated impact due to parental support does not vary strongly as a function of our prior on the variances. However, the example here is not to dispute the issue at hand, but highlight the importance of sensitivity checks. We will not always find consistency of parameter identification across model specifications.

```
summary_f = pd.concat(
    [
        calculate_effects(idata_sem0, "SUP_F"),
        calculate_effects(idata_sem1, "SUP_F"),
        calculate_effects(idata_sem2, "SUP_F"),
    ]
)

summary_f.index = ["SEM0", "SEM1", "SEM2"]
summary_f
```

|  | SUP\_F -> SE\_SOC ->LS | SUP\_F -> SE\_ACAD ->LS | Total Indirect Effects SUP\_F | Total Effects SUP\_F |
| --- | --- | --- | --- | --- |
| SEM0 | 0.08416 | 0.005406 | 0.089566 | 0.120566 |
| SEM1 | 0.08416 | 0.005406 | 0.089566 | 0.120566 |
| SEM2 | 0.08448 | 0.005355 | 0.089835 | 0.120835 |

### Calculating Global Model Fit

We can also calculate global measures of model fit. Here we compare, somewhat unfairly, the measurement model and various incarnations of our SEM model. The SEM models are attempting to articulate more complex structures and can suffer in the simple measures of global fit against comparably simpler models. The complexity is not arbitrary and you need to make a decision regarding trade-offs between expressive power and global model fit against the observed data points.

```
compare_df = az.compare(
    {"SEM0": idata_sem0, "SEM1": idata_sem1, "SEM2": idata_sem2, "MM": idata_mm}
)
compare_df
```

```
/Users/nathanielforde/mambaforge/envs/pymc_causal/lib/python3.11/site-packages/arviz/stats/stats.py:309: FutureWarning: Setting an item of incompatible dtype is deprecated and will raise an error in a future version of pandas. Value 'True' has dtype incompatible with float64, please explicitly cast to a compatible dtype first.
  df_comp.loc[val] = (
/Users/nathanielforde/mambaforge/envs/pymc_causal/lib/python3.11/site-packages/arviz/stats/stats.py:309: FutureWarning: Setting an item of incompatible dtype is deprecated and will raise an error in a future version of pandas. Value 'log' has dtype incompatible with float64, please explicitly cast to a compatible dtype first.
  df_comp.loc[val] = (
```

|  | rank | elpd\_loo | p\_loo | elpd\_diff | weight | se | dse | warning | scale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEM0 | 0 | \-3728.074488 | 1105.222054 | 0.000000 | 0.531797 | 69.304139 | 0.000000 | True | log |
| MM | 1 | \-3728.300062 | 994.604514 | 0.225573 | 0.468203 | 65.332293 | 8.544519 | True | log |
| SEM1 | 2 | \-3728.693232 | 1098.773451 | 0.618744 | 0.000000 | 68.969850 | 0.442567 | True | log |
| SEM2 | 3 | \-3728.916363 | 1092.031110 | 0.841875 | 0.000000 | 68.595017 | 0.846216 | True | log |

## Conclusion

We’ve just seen how we can go from thinking about the measurement of abstract psychometric constructs, through the evaluation of complex patterns of correlation and covariances among these latent constructs to evaluating hypothetical causal structures amongst the latent factors. This is a bit of whirlwind tour of psychometric models and the expressive power of SEM and CFA models, which we’re ending by linking them to the realm of causal inference! This is not an accident, but rather evidence that causal concerns sit at the heart of most modeling endeavours. When we’re interested in any kind of complex joint-distribution of variables, we’re likely interested in the causal structure of the system - how are the realised values of some observed metrics dependent on or related to others? Importantly, we need to understand how these observations are realised without confusing simple correlation for cause through naive or confounded inference.

Mislevy and Levy highlight this connection by focusing on the role of De Finetti’s theorem in the recovery of exchangeablility through Bayesian inference. By De Finetti’s theorem a distribution of exchangeable sequence of variables be expressed as mixture of conditional independent variables.

$$
p \left(\right. \mathbf{x}_{1}^{T} . . . . \mathbf{x}_{\mathbf{q}}^{T} \left.\right) = \frac{p \left(\right. X \left|\right. \theta \left.\right) p \left(\right. \theta \left.\right)}{p_{i} \left(\right. X \left.\right)} = \frac{p \left(\right. \mathbf{x}_{\mathbf{i}}^{T} . . . . . \mathbf{x}_{\mathbf{n}}^{T} \left|\right. \text{Ksi} , \Psi , \tau , \Lambda , \beta \left.\right) p \left(\right. \text{Ksi} , \Psi , \tau , \Lambda , \beta \left.\right)}{p \left(\right. \mathbf{x}_{\mathbf{i}}^{T} . . . . . \mathbf{x}_{\mathbf{n}}^{T} \left.\right)}
$$

This representation licenses substantive claims about the system. So if we specify the conditional distribution **correctly**, we recover the conditions that warrant inference with a well designed model because the subject’s outcomes are considered exchangeable conditional on our model. The mixture distribution is just the vector of parameters upon which we condition our model. This plays out nicely in SEM and CFA models because we explicitly structure the interaction of the system to remove biasing dependence structure and license clean inferences. Holding fixed levels of the latent constructs we expect to be able to draw generalisable claims the expected realisations of the indicator metrics.

> \[C\]onditional independence is not a grace of nature for which we must wait passively, but rather a psychological necessity which we satisfy by organising our knowledge in a specific way. An important tool in such an organisation is the identification of intermediate variables that induce conditional independence among observables; if such variables are not in our vocabulary, we create them. In medical diagnosis, for instance, when some symptoms directly influence one another, the medical profession invents a name for that interaction (e.g. “syndrome”, “complication”, “pathological state”) and treats it as a new auxiliary variable that induces conditional independence.” - Pearl quoted in Levy and Mislevy \[\] p61

It’s this deliberate and careful focus on the structure of conditionalisation that unites the seemingly disparate disciplines of psychometrics and causal inference. Both disciplines cultivate careful thinking about the structure of the data generating process and, more, they proffer conditionalisation strategies to better target some estimand of interest. Both are well phrased in the expressive lexicon of a probabilistic programming language like `PyMC`. We encourage you to explore the rich possibilities for yourself!

## Authors

- Authored by [Nathaniel Forde](https://nathanielf.github.io/posts/post-with-code/CFA_AND_SEM/CFA_AND_SEM.html) in September 2024

## References

## Watermark

```
%load_ext watermark
%watermark -n -u -v -iv -w -p pytensor
```

```
Last updated: Sun Apr 06 2025

Python implementation: CPython
Python version       : 3.11.7
IPython version      : 8.20.0

pytensor: 2.18.6

pytensor  : 2.18.6
seaborn   : 0.13.2
matplotlib: 3.8.2
arviz     : 0.17.0
numpy     : 1.24.4
pandas    : 2.2.0
pymc      : 5.10.3

Watermark: 2.4.3
```

## Vault Notes

- [[Confirmatory Factor Analysis and SEM]] — CFA and SEM in PyMC
