---
title: "Factor analysis"
source: "https://www.pymc.io/projects/examples/en/latest/case_studies/factor_analysis.html"
author:
published:
created: 2026-04-08
description: "Factor analysis is a widely used probabilistic model for identifying low-rank structure in multivariate data as encoded in latent variables. It is very closely related to principal components analy..."
tags:
  - "clippings"
---
## Factor analysis

Factor analysis is a widely used probabilistic model for identifying low-rank structure in multivariate data as encoded in latent variables. It is very closely related to principal components analysis, and differs only in the prior distributions assumed for these latent variables. It is also a good example of a linear Gaussian model as it can be described entirely as a linear transformation of underlying Gaussian variates. For a high-level view of how factor analysis relates to other models, you can check out [this diagram](https://www.cs.ubc.ca/~murphyk/Bayes/Figures/gmka.gif) originally published by Ghahramani and Roweis.

Attention

This notebook uses libraries that are not PyMC dependencies and therefore need to be installed specifically to run this notebook. Open the dropdown below for extra guidance.

```
import arviz.preview as az
import numpy as np
import pymc as pm
import pytensor.tensor as pt
import scipy as sp
import seaborn as sns
import xarray as xr

from matplotlib import pyplot as plt
from numpy.random import default_rng
from xarray_einstats import linalg
from xarray_einstats.stats import XrContinuousRV

print(f"Running on PyMC v{pm.__version__}")
```

```
Running on PyMC v5.27.0
```

```
%config InlineBackend.figure_format = 'retina'
az.style.use("arviz-variat")

np.set_printoptions(precision=3, suppress=True)
RANDOM_SEED = 31415
rng = default_rng(RANDOM_SEED)
```

## Simulated data generation

To work through a few examples, we’ll first generate some data. The data will not follow the exact generative process assumed by the factor analysis model, as the latent variates will not be Gaussian. We’ll assume that we have an observed data set with $N$ rows and $d$ columns which are actually a noisy linear function of $k_{t r u e}$ latent variables.

```
n = 250
k_true = 4
d = 10
```

The next code cell generates the data via creating latent variable arrays `M` and linear transformation `Q`. Then, the matrix product $Q M$ is perturbed with additive Gaussian noise controlled by the variance parameter `err_sd`.

```
err_sd = 2
M = rng.binomial(1, 0.25, size=(k_true, n))
Q = np.hstack([rng.exponential(2 * k_true - k, size=(d, 1)) for k in range(k_true)]) * rng.binomial(
    1, 0.75, size=(d, k_true)
)
Y = np.round(1000 * Q @ M + rng.standard_normal(size=(d, n)) * err_sd) / 1000
```

Because of the way we have generated the data, the covariance matrix expressing correlations between columns of $Y$ will be equal to $Q Q^{T}$. The fundamental assumption of PCA and factor analysis is that $Q Q^{T}$ is not full rank. We can see hints of this if we plot the covariance matrix:

```
plt.figure(figsize=(4, 3))
sns.heatmap(np.corrcoef(Y));
```

[![../_images/31a5e85a45cd88bc4c7baca027566ffc68cfd7d5aec2ef7d9e4dd264803f2bbe.png](https://www.pymc.io/projects/examples/en/latest/_images/31a5e85a45cd88bc4c7baca027566ffc68cfd7d5aec2ef7d9e4dd264803f2bbe.png)](https://www.pymc.io/projects/examples/en/latest/_images/31a5e85a45cd88bc4c7baca027566ffc68cfd7d5aec2ef7d9e4dd264803f2bbe.png)

If you squint long enough, you may be able to glimpse a few places where distinct columns are likely linear functions of each other.

## Model

Probabilistic PCA (PPCA) and factor analysis (FA) are a common source of topics on [PyMC Discourse](https://discourse.pymc.io/). The posts linked below handle different aspects of the problem including:

- [Minibatched FA for large datasets](https://discourse.pymc.io/t/large-scale-factor-analysis-with-minibatch-advi/246)
- [Handling missing data in FA](https://discourse.pymc.io/t/dealing-with-missing-data/252)
- [Identifiability in FA / PPCA](https://discourse.pymc.io/t/unique-solution-for-probabilistic-pca/1324/14)

### Direct implementation

The model for factor analysis is the probabilistic matrix factorization

$X_{\left(\right. d , n \left.\right)} \left|\right. W_{\left(\right. d , k \left.\right)} , F_{\left(\right. k , n \left.\right)} sim \mathcal{N} \left(\right. W F , \Psi \left.\right)$

with $\Psi$ a diagonal matrix. Subscripts denote the dimensionality of the matrices. Probabilistic PCA is a variant that sets $\Psi = \sigma^{2} I$. A basic implementation (taken from [this gist](https://gist.github.com/twiecki/c95578a6539d2098be2d83575e3d15fe)) is shown in the next cell. Unfortunately, it has undesirable properties for model fitting.

```
k = 2

coords = {"latent_columns": np.arange(k), "rows": np.arange(n), "observed_columns": np.arange(d)}

with pm.Model(coords=coords) as PPCA:
    W = pm.Normal("W", dims=("observed_columns", "latent_columns"))
    F = pm.Normal("F", dims=("latent_columns", "rows"))
    sigma = pm.HalfNormal("sigma", 1.0)
    X = pm.Normal("X", mu=W @ F, sigma=sigma, observed=Y, dims=("observed_columns", "rows"))

    trace = pm.sample(tune=2000, random_seed=rng)  # target_accept=0.9
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [W, F, sigma]
```

```
Sampling 4 chains for 2_000 tune and 1_000 draw iterations (8_000 + 4_000 draws total) took 12 seconds.
The rhat statistic is larger than 1.01 for some parameters. This indicates problems during sampling. See https://arxiv.org/abs/1903.08008 for details
The effective sample size per chain is smaller than 100 for some parameters.  A higher number is needed for reliable rhat and ess computation. See https://arxiv.org/abs/1903.08008 for details
```

At this point, there are already several warnings regarding failed convergence checks. We can see further problems in the trace plot below. This plot shows the path taken by each sampler chain for a single entry in the matrix $W$ as well as the average evaluated over samples for each chain.

```
az.plot_trace(
    trace,
    var_names="W",
    coords={"observed_columns": 3, "latent_columns": 1},
    sample_dims=["draw"],
    figure_kwargs={"sharey": True},
);
```

[![../_images/33f39baf2f3af7ae369ef90ed798ecb6228d3f947126333782e9cc318839be4f.png](https://www.pymc.io/projects/examples/en/latest/_images/33f39baf2f3af7ae369ef90ed798ecb6228d3f947126333782e9cc318839be4f.png)](https://www.pymc.io/projects/examples/en/latest/_images/33f39baf2f3af7ae369ef90ed798ecb6228d3f947126333782e9cc318839be4f.png)

Each chain appears to have a different sample mean and we can also see that there is a great deal of autocorrelation across chains, manifest as long-range trends over sampling iterations.

One of the primary drawbacks for this model formulation is its lack of identifiability. With this model representation, only the product $W F$ matters for the likelihood of $X$, so $P \left(\right. X \left|\right. W , F \left.\right) = P \left(\right. X \left|\right. W \Omega , \Omega^{- 1} F \left.\right)$ for any invertible matrix $\Omega$. While the priors on $W$ and $F$ constrain $\left|\right. \Omega \left|\right.$ to be neither too large or too small, factors and loadings can still be rotated, reflected, and/or permuted *without changing the model likelihood*. Expect it to happen between runs of the sampler, or even for the parametrization to “drift” within run, and to produce the highly autocorrelated $W$ traceplot above.

### Alternative parametrization

This can be fixed by constraining the form of W to be:

- Lower triangular
- Positive and increasing values along the diagonal

We can adapt `expand_block_triangular` to fill out a non-square matrix. This function mimics `pm.expand_packed_triangular`, but while the latter only works on packed versions of square matrices (i.e. $d = k$ in our model, the former can also be used with nonsquare matrices.

```
def expand_packed_block_triangular(d, k, packed, diag=None, mtype="pytensor"):
    # like expand_packed_triangular, but with d > k.
    assert mtype in {"pytensor", "numpy"}
    assert d >= k

    def set_(M, i_, v_):
        if mtype == "pytensor":
            return pt.set_subtensor(M[i_], v_)
        M[i_] = v_
        return M

    out = pt.zeros((d, k), dtype=float) if mtype == "pytensor" else np.zeros((d, k), dtype=float)
    if diag is None:
        idxs = np.tril_indices(d, m=k)
        out = set_(out, idxs, packed)
    else:
        idxs = np.tril_indices(d, k=-1, m=k)
        out = set_(out, idxs, packed)
        idxs = (np.arange(k), np.arange(k))
        out = set_(out, idxs, diag)
    return out
```

We’ll also define another function which helps create a diagonal matrix with increasing entries along the main diagonal.

```
def makeW(d, k, dim_names):
    # make a W matrix adapted to the data shape
    n_od = int(k * d - k * (k - 1) / 2 - k)

    # trick: the cumulative sum of z will be positive increasing
    z = pm.HalfNormal("W_z", 1.0, dims="latent_columns")
    b = pm.Normal("W_b", 0.0, 1.0, shape=(n_od,), dims="packed_dim")
    L = expand_packed_block_triangular(d, k, b, pt.ones(k))
    W = pm.Deterministic("W", L @ pt.diag(pt.extra_ops.cumsum(z)), dims=dim_names)
    return W
```

With these modifications, we remake the model and run the MCMC sampler again.

```
with pm.Model(coords=coords) as PPCA_identified:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    F = pm.Normal("F", dims=("latent_columns", "rows"))
    sigma = pm.HalfNormal("sigma", 1.0)
    X = pm.Normal("X", mu=W @ F, sigma=sigma, observed=Y, dims=("observed_columns", "rows"))
    trace = pm.sample(tune=2000, random_seed=rng, target_accept=0.9)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [W_z, W_b, F, sigma]
```

```
Sampling 4 chains for 2_000 tune and 1_000 draw iterations (8_000 + 4_000 draws total) took 19 seconds.
The effective sample size per chain is smaller than 100 for some parameters.  A higher number is needed for reliable rhat and ess computation. See https://arxiv.org/abs/1903.08008 for details
```

$W$ (and $F$!) now have entries with identical posterior distributions as compared between sampler chains, although it’s apparent that some autocorrelation remains.

Because the $k \times n$ parameters in F all need to be sampled, sampling can become quite expensive for very large `n`. In addition, the link between an observed data point $X_{i}$ and an associated latent value $F_{i}$ means that streaming inference with mini-batching cannot be performed.

This scalability problem can be addressed analytically by integrating $F$ out of the model. By doing so, we postpone any calculation for individual values of $F_{i}$ until later. Hence, this approach is often described as *amortized inference*. However, this fixes the prior on $F$, allowing for less modeling flexibility. In keeping with $F_{i j} sim \mathcal{N} \left(\right. 0 , I \left.\right)$ we have:

$X \left|\right. W F sim \mathcal{N} \left(\right. W F , \sigma^{2} I \left.\right) .$

We can therefore write $X$ as

$X = W F + \sigma I \epsilon ,$

where $\epsilon sim \mathcal{N} \left(\right. 0 , I \left.\right)$. Fixing $W$ but treating $F$ and $\epsilon$ as random variables, both $sim \mathcal{N} \left(\right. 0 , I \left.\right)$, we see that $X$ is the sum of two multivariate normal variables, with means $0$ and covariances $W W^{T}$ and $\sigma^{2} I$, respectively. It follows that

$X \left|\right. W sim \mathcal{N} \left(\right. 0 , W W^{T} + \sigma^{2} I \left.\right)$.

```
with pm.Model(coords=coords) as PPCA_amortized:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    # MvNormal parametrizes covariance of columns, so transpose Y
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y.T, dims=("rows", "observed_columns"))
    trace_amortized = pm.sample(tune=30, draws=100, random_seed=rng)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [W_z, W_b, sigma]
```

```
Sampling 4 chains for 30 tune and 100 draw iterations (120 + 400 draws total) took 3 seconds.
The rhat statistic is larger than 1.01 for some parameters. This indicates problems during sampling. See https://arxiv.org/abs/1903.08008 for details
The effective sample size per chain is smaller than 100 for some parameters.  A higher number is needed for reliable rhat and ess computation. See https://arxiv.org/abs/1903.08008 for details
```

Unfortunately sampling of this model is very slow, presumably because calculating the logprob of the `MvNormal` requires inverting the covariance matrix. However, the explicit integration of $F$ also enables batching the observations for faster computation of `ADVI` and `FullRankADVI` approximations.

```
coords["observed_columns2"] = coords["observed_columns"]
with pm.Model(coords=coords) as PPCA_amortized_batched:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    Y_mb = pm.Minibatch(
        Y.T, batch_size=50
    )  # MvNormal parametrizes covariance of columns, so transpose Y
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y_mb)
    trace_vi = pm.fit(n=50000, method="fullrank_advi", obj_n_mc=1).sample()
```

```
/home/osvaldo/anaconda3/envs/eabm/lib/python3.13/site-packages/pymc/model/core.py:1254: UserWarning: total_size not provided for observed variable \`X\` that uses pm.Minibatch
  warnings.warn(
```

```
Finished [100%]: Average Loss = 1,756.8
```

## Results

When we compare the posteriors calculated using MCMC and VI, we find that (for at least this specific parameter we are looking at) the two distributions are close, but they do differ in their mean. The two MCMC posteriors agree with each other quite well with each other and the ADVI estimate is not far off.

```
col_selection = dict(observed_columns=3, latent_columns=1)

dt = az.from_dict(
    {
        "posterior": {
            "MCMC_explicit": trace.posterior["W"].sel(**col_selection),
            "MCMC_amortized": trace_amortized.posterior["W"].sel(**col_selection),
            "FR-ADVI_amortized": trace_vi.posterior["W"].sel(**col_selection),
        }
    }
)

pc = az.plot_dist(
    dt,
    cols=None,
    aes={"color": ["__variable__"]},
    visuals={
        "title": False,
        "point_estimate_text": False,
        "point_estimate": False,
        "credible_interval": False,
    },
)
pc.add_legend("__variable__")
```

[![../_images/3b81e8e30296c86f34fcdef65598feda4f1fc9e9b9a15dba36903aeda5f70e90.png](https://www.pymc.io/projects/examples/en/latest/_images/3b81e8e30296c86f34fcdef65598feda4f1fc9e9b9a15dba36903aeda5f70e90.png)](https://www.pymc.io/projects/examples/en/latest/_images/3b81e8e30296c86f34fcdef65598feda4f1fc9e9b9a15dba36903aeda5f70e90.png)

### Post-hoc identification of F

The matrix $F$ is typically of interest for factor analysis, and is often used as a feature matrix for dimensionality reduction. However, $F$ has been marginalized away in order to make fitting the model easier; and now we need it back. Transforming

$X \left|\right. W F sim \mathcal{N} \left(\right. W F , \sigma^{2} \left.\right)$

into

$\left(\right. W^{T} W \left.\right)^{- 1} W^{T} X \left|\right. W , F sim \mathcal{N} \left(\right. F , \sigma^{2} \left(\right. W^{T} W \left.\right)^{- 1} \left.\right)$

we have represented $F$ as the mean of a multivariate normal distribution with a known covariance matrix. Using the prior $F sim \mathcal{N} \left(\right. 0 , I \left.\right)$ and updating according to the expression for the [conjugate prior](https://en.wikipedia.org/wiki/Conjugate_prior), we find

$F \left|\right. X , W sim \mathcal{N} \left(\right. \mu_{F} , \Sigma_{F} \left.\right)$,

where

$\mu_{F} = \left(\left(\right. I + \sigma^{- 2} W^{T} W \left.\right)\right)^{- 1} \sigma^{- 2} W^{T} X$

$\Sigma_{F} = \left(\left(\right. I + \sigma^{- 2} W^{T} W \left.\right)\right)^{- 1}$

For each value of $W$ and $X$ found in the trace, we now draw a sample from this distribution.

```
# configure xarray-einstats
def get_default_dims(dims, dims2):
    proposed_dims = [dim for dim in dims if dim not in {"chain", "draw"}]
    assert len(proposed_dims) == 2
    if dims2 is None:
        return proposed_dims

linalg.get_default_dims = get_default_dims
```

```
post = trace_vi.posterior
obs = trace.observed_data

WW = linalg.matmul(
    post["W"], post["W"], dims=("latent_columns", "observed_columns", "latent_columns")
)

# Constructing an identity matrix following https://einstats.python.arviz.org/en/latest/tutorials/np_linalg_tutorial_port.html
I = xr.zeros_like(WW)
idx = xr.DataArray(WW.coords["latent_columns"])
I.loc[{"latent_columns": idx, "latent_columns2": idx}] = 1
Sigma_F = linalg.inv(I + post["sigma"] ** (-2) * WW)
X_transform = linalg.matmul(
    Sigma_F,
    post["sigma"] ** (-2) * post["W"],
    dims=("latent_columns2", "latent_columns", "observed_columns"),
)
mu_F = xr.dot(X_transform, obs["X"], dims="observed_columns").rename(
    latent_columns2="latent_columns"
)
Sigma_chol = linalg.cholesky(Sigma_F)
norm_dist = XrContinuousRV(sp.stats.norm, xr.zeros_like(mu_F))  # the zeros_like defines the shape
F_sampled = mu_F + linalg.matmul(
    post["sigma"] * Sigma_F,
    norm_dist.rvs(),
    dims=(("latent_columns", "latent_columns2"), ("latent_columns", "rows")),
)
```

### Comparison to original data

To check how well our model has captured the original data, we will test how well we can reconstruct it from the sampled $W$ and $F$ matrices. For each element of $Y$ we plot the mean and standard deviation of $X = W F$, which is the reconstructed value based on our model.

```
X_sampled_amortized = linalg.matmul(
    post["W"],
    F_sampled,
    dims=("observed_columns", "latent_columns", "rows"),
)
reconstruction_mean = X_sampled_amortized.mean(dim=("chain", "draw")).values
reconstruction_sd = X_sampled_amortized.std(dim=("chain", "draw")).values
plt.errorbar(
    Y.ravel(),
    reconstruction_mean.ravel(),
    yerr=reconstruction_sd.ravel(),
    marker=".",
    ls="none",
    alpha=0.3,
)

slope, intercept, r_value, p_value, std_err = sp.stats.linregress(
    Y.ravel(), reconstruction_mean.ravel()
)
plt.plot(
    [Y.min(), Y.max()],
    np.array([Y.min(), Y.max()]) * slope + intercept,
    "k--",
    label=f"Linear regression for the mean, R²={r_value**2:.2f}",
)
plt.plot([Y.min(), Y.max()], [Y.min(), Y.max()], "k:", label="Perfect reconstruction")

plt.xlabel("Elements of Y")
plt.ylabel("Model reconstruction")
plt.legend(loc="upper left");
```

[![../_images/fcfa9fc86bdf0e8d775d5ef7e114ecebf02544dc66f2cbb347edceff09b8b5af.png](https://www.pymc.io/projects/examples/en/latest/_images/fcfa9fc86bdf0e8d775d5ef7e114ecebf02544dc66f2cbb347edceff09b8b5af.png)](https://www.pymc.io/projects/examples/en/latest/_images/fcfa9fc86bdf0e8d775d5ef7e114ecebf02544dc66f2cbb347edceff09b8b5af.png)

We find that our model does a decent job of capturing the variation in the original data, despite only using two latent factors instead of the actual four.

## Authors

- Authored by [chartl](https://github.com/chartl) on May 6, 2019
- Updated by [Christopher Krapu](https://github.com/ckrapu) on April 4, 2021
- Updated by Oriol Abril-Pla to use PyMC v4 and xarray-einstats on March, 2022
- Updated by Erik Werner on Dec, 2023 ([pymc-examples#612](https://github.com/pymc-devs/pymc-examples/pull/612))
- Updated by Osvaldo Martin on January, 2026

## Watermark

```
%load_ext watermark
%watermark -n -u -v -iv -w
```

```
Last updated: Mon, 12 Jan 2026

Python implementation: CPython
Python version       : 3.13.11
IPython version      : 8.29.0

arviz          : 0.23.0
matplotlib     : 3.10.1
numpy          : 2.2.6
pymc           : 5.27.0
pytensor       : 2.36.1
scipy          : 1.16.3
seaborn        : 0.13.2
xarray         : 2025.1.2
xarray_einstats: 0.8.0

Watermark: 2.6.0
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

## Vault Notes

- [[Factor Analysis and PPCA]] — Factor analysis and probabilistic PCA in PyMC
