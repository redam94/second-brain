---
title: "Social Networks"
source: "https://www.pymc.io/projects/examples/en/latest/statistical_rethinking_lectures/15-Social_Networks.html"
author:
published:
created: 2026-04-09
description: "This notebook is part of the PyMC port of the Statistical Rethinking 2023 lecture series by Richard McElreath. Video - Lecture 15 - Social Networks# Lecture 15 - Social Networks What Motivates Shar..."
tags:
  - "clippings"
---
## Social Networks

This notebook is part of the PyMC port of the [Statistical Rethinking 2023](https://github.com/rmcelreath/stat_rethinking_2023) lecture series by Richard McElreath.

[Video - Lecture 15 - Social Networks](https://youtu.be/L_QumFUv7C8) # [Lecture 15 - Social Networks](https://youtu.be/hnYhJzYAQ60?si=Y9bnH_DopygCafIr)

```
# Ignore warnings
import warnings

import arviz as az
import numpy as np
import pandas as pd
import pymc as pm
import statsmodels.formula.api as smf
import utils as utils
import xarray as xr

from matplotlib import pyplot as plt
from matplotlib import style
from scipy import stats as stats

warnings.filterwarnings("ignore")

# Set matplotlib style
STYLE = "statistical-rethinking-2023.mplstyle"
style.use(STYLE)
```

## What Motivates Sharing?

## Koster & Leckie (2014) Arang Dak dataset

- year of food transfers between 25 households
- 300 dyads, i.e. $\left(\right. \frac{25}{2} \left.\right) = 300$
- 2871 observations of food transfers (“gifts”)

### Scientific Questions: Estimand(s)

- How much sharing is explained by **reciprocity?**
- How much by **generalized giving?**

```
SHARING = utils.load_data("KosterLeckie")
SHARING.head()
```

|  | hidA | hidB | did | giftsAB | giftsBA | offset | drel1 | drel2 | drel3 | drel4 | dlndist | dass | d0125 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 2 | 1 | 0 | 4 | 0.000 | 0 | 0 | 1 | 0 | \-2.790 | 0.000 | 0 |
| 1 | 1 | 3 | 2 | 6 | 31 | \-0.003 | 0 | 1 | 0 | 0 | \-2.817 | 0.044 | 0 |
| 2 | 1 | 4 | 3 | 2 | 5 | \-0.019 | 0 | 1 | 0 | 0 | \-1.886 | 0.025 | 0 |
| 3 | 1 | 5 | 4 | 4 | 2 | 0.000 | 0 | 1 | 0 | 0 | \-1.892 | 0.011 | 0 |
| 4 | 1 | 6 | 5 | 8 | 2 | \-0.003 | 1 | 0 | 0 | 0 | \-3.499 | 0.022 | 0 |

```
utils.plot_scatter(SHARING.giftsAB, SHARING.giftsBA, color="C0", label="dyad", alpha=0.5)
plt.plot((0, 120), (0, 120), linestyle="--", color="gray")
plt.axis("square")
plt.xlabel("A gives B")
plt.ylabel("B gives A")
plt.xlim([-5, 120])
plt.ylim([-5, 120])
plt.title("What not to do with this data")
plt.legend();
```

![../_images/45217681395db0e622cc68fbcdf13a26acb098c411afe621626915f181bfdec2.png](https://www.pymc.io/projects/examples/en/latest/_images/45217681395db0e622cc68fbcdf13a26acb098c411afe621626915f181bfdec2.png)

## Improve analysis with a causal graph

```
utils.draw_causal_graph(
    edge_list=[
        ("H_A", "G_AB"),
        ("H_B", "G_AB"),
        ("H_A", "T_AB"),
        ("H_B", "T_AB"),
        ("H_A", "T_BA"),
        ("H_B", "T_BA"),
        ("T_AB", "G_AB"),
        ("T_BA", "G_AB"),
    ],
    node_props={
        "H_A": {"label": "household A, H_A"},
        "H_B": {"label": "household B, H_B"},
        "G_AB": {"label": "A gives to B, G_AB"},
        "T_AB": {"label": "Social tie from A to B, T_AB", "style": "dashed"},
        "T_BA": {"label": "Social tie from B to A, T_BA", "style": "dashed"},
        "unobserved": {"style": "dashed"},
    },
)
```

![../_images/1a590688f552a216df424f63ef5410a418b54b73302f26c19564e71127a28523.svg](https://www.pymc.io/projects/examples/en/latest/_images/1a590688f552a216df424f63ef5410a418b54b73302f26c19564e71127a28523.svg)

## 1) Estimand

### Starting Simpler, ignoring household effects for now

```
utils.draw_causal_graph(
    edge_list=[
        ("H_A", "G_AB"),
        ("H_B", "G_AB"),
        ("H_A", "T_AB"),
        ("H_B", "T_AB"),
        ("H_A", "T_BA"),
        ("H_B", "T_BA"),
        ("T_AB", "G_AB"),
        ("T_BA", "G_AB"),
    ],
    node_props={
        "H_A": {"color": "blue"},
        "H_B": {"color": "blue"},
        "T_AB": {"style": "dashed", "color": "red"},
        "T_BA": {"style": "dashed", "color": "red"},
        "unobserved": {"style": "dashed"},
    },
    edge_props={
        ("T_AB", "G_AB"): {"color": "red"},
        ("T_BA", "G_AB"): {"color": "red"},
        ("H_A", "G_AB"): {"color": "blue"},
        ("H_B", "G_AB"): {"color": "blue", "label": " backdoor\npaths", "fontcolor": "blue"},
        ("H_A", "T_AB"): {"color": "blue"},
        ("H_A", "T_BA"): {"color": "blue"},
        ("H_B", "T_AB"): {"color": "blue"},
        ("H_B", "T_BA"): {"color": "blue"},
    },
)
```

![../_images/4a057aac1e3c571feb87173bcc12b259af41f43f11119682c3c2dda53c418799.svg](https://www.pymc.io/projects/examples/en/latest/_images/4a057aac1e3c571feb87173bcc12b259af41f43f11119682c3c2dda53c418799.svg)

At first, we’ll ignore the backdoor paths to get a good flow, and get the model running, then add them in later

## 2) Generative Model

### Simulating a Social Network

```
from itertools import combinations

np.random.seed(123)

N = 25
dyads = list(combinations(np.arange(N), 2))

# convert to numpy for np.where
DYADS = np.array(dyads)
N_DYADS = len(DYADS)

print(f"N dyads: {N_DYADS}")
print(dyads[:91])

# Simulate "friendship", in which ties are shared
P_FRIENDSHIP = 0.1
FRIENDSHIP = stats.bernoulli(p=P_FRIENDSHIP).rvs(size=N_DYADS)

# Simulate directed ties. Note: there can be ties that are not reciprocal
ALPHA = -3.0  # base rate has low probability
BASE_TIE_PROBABILITY = utils.invlogit(ALPHA)
print(f"\nBase non-friend social tie probability: {BASE_TIE_PROBABILITY:.2}")

def get_dyad_index(source, target):
    # dyads are symmetric, but ordered by definition,
    # so ensure valid lookup by sorting
    ii, jj = sorted([source, target])
    return np.where((DYADS[:, 0] == ii) & (DYADS[:, 1] == jj))[0][0]

# Simulate gift-giving
TIES = np.zeros((N, N)).astype(int)
for source in range(N):
    for target in range(N):
        if source != target:
            dyad_index = get_dyad_index(source, target)
            # Sample directed edge -- friends always share ties,
            # but there's also a base rate of sharing ties w/o friendship
            is_friend = FRIENDSHIP[dyad_index]
            p_tie = is_friend + (1 - is_friend) * BASE_TIE_PROBABILITY
            TIES[source, target] = stats.bernoulli(p_tie).rvs()
```

```
N dyads: 300
[(0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (0, 8), (0, 9), (0, 10), (0, 11), (0, 12), (0, 13), (0, 14), (0, 15), (0, 16), (0, 17), (0, 18), (0, 19), (0, 20), (0, 21), (0, 22), (0, 23), (0, 24), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20), (1, 21), (1, 22), (1, 23), (1, 24), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19), (2, 20), (2, 21), (2, 22), (2, 23), (2, 24), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11), (3, 12), (3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18), (3, 19), (3, 20), (3, 21), (3, 22), (3, 23), (3, 24), (4, 5)]

Base non-friend social tie probability: 0.047
```

```
plt.matshow(TIES, cmap="gray")
plt.ylabel("Household A")
plt.xlabel("Household B")
plt.title("Simulated Social Ties\nAdjacency Matrix");
```

![../_images/67fbcff9c7fd4b57e21d083d4d1f7f77821919a2e8c0189d56a03c8315a7a428.png](https://www.pymc.io/projects/examples/en/latest/_images/67fbcff9c7fd4b57e21d083d4d1f7f77821919a2e8c0189d56a03c8315a7a428.png)

```
import networkx as nx

TIES_LAYOUT_POSITION = utils.plot_graph(TIES)
plt.title("Simulated Social Ties Network");
```

![../_images/84a67a15a0b6bf221980221088d1205625f4a92d566f4276deba4060321dedff.png](https://www.pymc.io/projects/examples/en/latest/_images/84a67a15a0b6bf221980221088d1205625f4a92d566f4276deba4060321dedff.png)

### Simulate Gift-giving from social net

```
giftsAB = np.zeros(N_DYADS)
giftsBA = np.zeros(N_DYADS)
lam = np.log([0.5, 2])

for ii, (A, B) in enumerate(DYADS):
    lambdaAB = np.exp(lam[TIES[A, B]])
    giftsAB[ii] = stats.poisson(mu=lambdaAB).rvs()

    lambdaBA = np.exp(lam[TIES[B, A]])
    giftsBA[ii] = stats.poisson(mu=lambdaBA).rvs()

## Put simulation into a dataframe for fitting function
simulated_gifts = pd.DataFrame(
    {
        "giftsAB": giftsAB.astype(int),
        "giftsBA": giftsBA.astype(int),
        "did": np.arange(N_DYADS).astype(int),
    }
)

simulated_gifts
```

|  | giftsAB | giftsBA | did |
| --- | --- | --- | --- |
| 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 2 | 2 | 0 | 2 |
| 3 | 0 | 1 | 3 |
| 4 | 0 | 0 | 4 |
| ... | ... | ... | ... |
| 295 | 0 | 1 | 295 |
| 296 | 0 | 0 | 296 |
| 297 | 1 | 0 | 297 |
| 298 | 0 | 0 | 298 |
| 299 | 0 | 0 | 299 |

300 rows × 3 columns

```
plt.hist(simulated_gifts.giftsAB, bins=simulated_gifts.giftsAB.max(), width=0.25)
plt.title("Gifting from A to B");
```

![../_images/93d0f8a59e8f657c457a96eac45b71b46c77d053c81f630fbb7db9483e97a88f.png](https://www.pymc.io/projects/examples/en/latest/_images/93d0f8a59e8f657c457a96eac45b71b46c77d053c81f630fbb7db9483e97a88f.png)

```
plt.hist(simulated_gifts.giftsBA, bins=simulated_gifts.giftsBA.max(), width=0.25)
plt.title("Gifting from B to A");
```

![../_images/5c99b44b2d9e636a2d9cf28372728105770e7d9b70c7c8028735858b618591ca.png](https://www.pymc.io/projects/examples/en/latest/_images/5c99b44b2d9e636a2d9cf28372728105770e7d9b70c7c8028735858b618591ca.png)

## 3) Statistical Model

### Likelihood

$$
\begin{matrix}G_{A B} & sim \text{Poisson} \left(\right. \lambda_{A B} \left.\right) \\ G_{B A} & sim \text{Poisson} \left(\right. \lambda_{B A} \left.\right) \\ log ⁡ \left(\right. \lambda_{A B} \left.\right) & = \alpha + T_{A B} \\ log ⁡ \left(\right. \lambda_{B A} \left.\right) & = \alpha + T_{B A}\end{matrix}
$$

### Global gift-giving prior

$$
\alpha sim \text{Normal} \left(\right. 0 , 1 \left.\right)
$$

### Fitting the social ties model

#### Notes

- We use `LKJCholeskyCov` instead of `LKJCorr` for numerical stability/efficiency

```
def fit_social_ties_model(data, eta=4):
    n_dyads = len(data)

    # ensure zero-indexed IDs
    dyad_id = data.did.values.astype(int)
    if np.min(dyad_id) == 1:
        dyad_id -= 1

    n_correlated_features = 2

    with pm.Model() as model:

        # Single, global alpha
        alpha = pm.Normal("alpha", 0, 1)

        # Single, global sigma
        sigma = pm.Exponential.dist(1)
        chol, corr, stds = pm.LKJCholeskyCov("rho", eta=eta, n=n_correlated_features, sd_dist=sigma)

        # Record quantities for reporting
        pm.Deterministic("corrcoef_T", corr[0, 1])
        pm.Deterministic("std_T", stds)

        z = pm.Normal("z", 0, 1, shape=(n_dyads, n_correlated_features))
        T = pm.Deterministic("T", chol.dot(z.T).T)

        # Likelihood(s)
        lambda_AB = pm.Deterministic("lambda_AB", pm.math.exp(alpha + T[dyad_id, 0]))
        lambda_BA = pm.Deterministic("lambda_BA", pm.math.exp(alpha + T[dyad_id, 1]))

        G_AB = pm.Poisson("G_AB", lambda_AB, observed=data.giftsAB)
        G_BA = pm.Poisson("G_BA", lambda_BA, observed=data.giftsBA)

        inference = pm.sample(target_accept=0.9)
    return model, inference
```

```
simulated_social_ties_model, simulated_social_ties_inference = fit_social_ties_model(
    simulated_gifts
)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, rho, z]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 5 seconds.
```

```
az.summary(simulated_social_ties_inference, var_names="rho_corr")
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rho\_corr\[0, 0\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 4000.0 | 4000.0 | NaN |
| rho\_corr\[0, 1\] | 0.477 | 0.177 | 0.139 | 0.784 | 0.006 | 0.004 | 868.0 | 1709.0 | 1.01 |
| rho\_corr\[1, 0\] | 0.477 | 0.177 | 0.139 | 0.784 | 0.006 | 0.004 | 868.0 | 1709.0 | 1.01 |
| rho\_corr\[1, 1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 4124.0 | 3699.0 | 1.00 |

### Posterior Ties

```
def plot_posterior_reciprocity(inference, ax=None):
    az.plot_dist(inference.posterior["corrcoef_T"], ax=ax)
    posterior_mean = inference.posterior["corrcoef_T"].mean().values
    plt.axvline(
        posterior_mean, label=f"posterior mean={posterior_mean:0.2f}", color="k", linestyle="--"
    )
    plt.xlim([-1, 1])
    plt.xlabel("correlation amongst dyads")
    plt.ylabel("density")
    plt.legend()

def plot_posterior_household_ties(inference, color_friends=False, ax=None):
    T = inference.posterior.mean(dim=("chain", "draw"))["T"]
    T_AB = T[:, 0]
    T_BA = T[:, 1]

    if color_friends:
        colors = ["black", "C4"]
        labels = [None, "friends"]
        for is_friends in [0, 1]:
            mask = FRIENDSHIP == is_friends
            utils.plot_scatter(
                T_AB[mask],
                T_BA[mask],
                color=colors[is_friends],
                alpha=0.5,
                label=labels[is_friends],
            )
    else:
        utils.plot_scatter(T_AB, T_BA, color="C0", label="dyadic ties")

    plt.xlabel("$T_{AB}$")
    plt.ylabel("$T_{BA}$")
    plt.legend();
```

```
_, axs = plt.subplots(1, 2, figsize=(10, 5))
plt.sca(axs[0])
plot_posterior_reciprocity(simulated_social_ties_inference, ax=axs[0])

plt.sca(axs[1])
plot_posterior_household_ties(simulated_social_ties_inference, color_friends=True, ax=axs[1])
```

![../_images/24359c6a8ebdd5245e272936e81dfa6602d9147fca7b10e095b8cddd830b953d.png](https://www.pymc.io/projects/examples/en/latest/_images/24359c6a8ebdd5245e272936e81dfa6602d9147fca7b10e095b8cddd830b953d.png)

## 4) Analyze Data

Run the model on the real data samples

```
social_ties_model, social_ties_inference = fit_social_ties_model(SHARING)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, rho, z]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 11 seconds.
```

### Posterior correlation

```
az.summary(social_ties_inference, var_names="rho_corr")
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rho\_corr\[0, 0\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 4000.0 | 4000.0 | NaN |
| rho\_corr\[0, 1\] | 0.352 | 0.068 | 0.231 | 0.479 | 0.003 | 0.002 | 539.0 | 1272.0 | 1.01 |
| rho\_corr\[1, 0\] | 0.352 | 0.068 | 0.231 | 0.479 | 0.003 | 0.002 | 539.0 | 1272.0 | 1.01 |
| rho\_corr\[1, 1\] | 1.000 | 0.000 | 1.000 | 1.000 | 0.000 | 0.000 | 4089.0 | 3939.0 | 1.00 |

```
plot_posterior_reciprocity(social_ties_inference)
```

![../_images/78518402627ca3401a0f5dab6cde2d9bd5838aaba3d89b9c9774fb8264be0ccb.png](https://www.pymc.io/projects/examples/en/latest/_images/78518402627ca3401a0f5dab6cde2d9bd5838aaba3d89b9c9774fb8264be0ccb.png)

## Introducing Household Giving/Receiving Confounds

## 2) Generative Model

### Simulate Including Unmeasured Household Wealth

We use the same social ties network, but augment gift-giving behavior based on (unmeasured) household wealth:

- Wealthier households give more
- Poorer households recieve more

```
np.random.seed(123)
giftsAB = np.zeros(N_DYADS)
giftsBA = np.zeros(N_DYADS)

LAMBDA = np.log([0.5, 2])
BETA_WG = 0.5  #  Effect of (standardized) household wealth on giving -> the wealthy give more
BETA_WR = -1  # Effect of household wealth on receiving -> weathy recieve less

WEALTH = stats.norm.rvs(size=N)  # standardized wealth

for ii, (A, B) in enumerate(DYADS):
    lambdaAB = np.exp(LAMBDA[TIES[A, B]] + BETA_WG * WEALTH[A] + BETA_WR * WEALTH[B])
    giftsAB[ii] = stats.poisson(mu=lambdaAB).rvs()

    lambdaBA = np.exp(LAMBDA[TIES[B, A]] + BETA_WG * WEALTH[B] + BETA_WR * WEALTH[A])
    giftsBA[ii] = stats.poisson(mu=lambdaBA).rvs()

## Put simulation into a dataframe for fitting function
simulated_wealth_gifts = pd.DataFrame(
    {
        "giftsAB": giftsAB.astype(int),
        "giftsBA": giftsBA.astype(int),
        "hidA": DYADS[:, 0],
        "hidB": DYADS[:, 1],
        "did": np.arange(N_DYADS).astype(int),
    }
)

simulated_wealth_gifts
```

|  | giftsAB | giftsBA | hidA | hidB | did |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 1 | 0 |
| 1 | 0 | 2 | 0 | 2 | 1 |
| 2 | 1 | 2 | 0 | 3 | 2 |
| 3 | 1 | 0 | 0 | 4 | 3 |
| 4 | 0 | 5 | 0 | 5 | 4 |
| ... | ... | ... | ... | ... | ... |
| 295 | 1 | 3 | 21 | 23 | 295 |
| 296 | 5 | 0 | 21 | 24 | 296 |
| 297 | 0 | 2 | 22 | 23 | 297 |
| 298 | 0 | 3 | 22 | 24 | 298 |
| 299 | 3 | 0 | 23 | 24 | 299 |

300 rows × 5 columns

```
# plt.hist(simulated_wealth_gifts.giftsAB, bins=simulated_gifts.giftsAB.max(), width=.25);
# plt.title("Gifting from A to B\n(including household wealth)");
```

```
# plt.hist(simulated_wealth_gifts.giftsBA, bins=simulated_gifts.giftsBA.max(), width=.25);
# plt.title("Gifting from B to A\n(including household wealth)");
```

## 3) Statistical Model

- $G_{A , B}$ - househould $A , B$ ’s generalized *giving*
- $R_{A , B}$ - househould $A , B$ ’s generalized *receiving*
- Model Giving and Receiving covariance vian $\text{MVNormal}$

### Likelihood

$$
\begin{matrix}G_{A B} & sim \text{Poisson} \left(\right. \lambda_{A B} \left.\right) \\ G_{B A} & sim \text{Poisson} \left(\right. \lambda_{B A} \left.\right) \\ log ⁡ \left(\right. \lambda_{A B} \left.\right) & = \alpha + T_{A B} + G_{A} + R_{B} \\ log ⁡ \left(\right. \lambda_{B A} \left.\right) & = \alpha + T_{B A} + G_{B} + R_{A}\end{matrix}
$$

### Global gift-giving prior

$$
\alpha sim \text{Normal} \left(\right. 0 , 1 \left.\right)
$$

### Fit Wealth Gifting model on simulated data (validation)

```
def fit_giving_receiving_model(data, eta=2):
    n_dyads = len(data)
    n_correlated_features = 2

    dyad_id = data.did.values.astype(int)
    household_A_id = data.hidA.values.astype(int)
    household_B_id = data.hidB.values.astype(int)

    # Data are 1-indexed
    if np.min(dyad_id) == 1:
        dyad_id -= 1
        household_A_id -= 1
        household_B_id -= 1

    n_households = np.max([household_A_id, household_B_id]) + 1

    with pm.Model() as model:

        # single, global alpha
        alpha = pm.Normal("alpha", 0, 1)

        # Social ties interaction; shared sigma
        sigma_T = pm.Exponential.dist(1)
        chol_T, corr_T, std_T = pm.LKJCholeskyCov(
            "rho_T", eta=eta, n=n_correlated_features, sd_dist=sigma_T
        )
        z_T = pm.Normal("z_T", 0, 1, shape=(n_dyads, n_correlated_features))
        T = pm.Deterministic("T", chol_T.dot(z_T.T).T)

        # Giving-receiving interaction; full covariance
        sigma_GR = pm.Exponential.dist(1, shape=n_correlated_features)
        chol_GR, corr_GR, std_GR = pm.LKJCholeskyCov(
            "rho_GR", eta=eta, n=n_correlated_features, sd_dist=sigma_GR
        )
        z_GR = pm.Normal("z_GR", 0, 1, shape=(n_households, n_correlated_features))
        GR = pm.Deterministic("GR", chol_GR.dot(z_GR.T).T)

        lambda_AB = pm.Deterministic(
            "lambda_AB",
            pm.math.exp(alpha + T[dyad_id, 0] + GR[household_A_id, 0] + GR[household_B_id, 1]),
        )
        lambda_BA = pm.Deterministic(
            "lambda_BA",
            pm.math.exp(alpha + T[dyad_id, 1] + GR[household_B_id, 0] + GR[household_A_id, 1]),
        )

        # Record quantities for reporting
        pm.Deterministic("corrcoef_T", corr_T[0, 1])
        pm.Deterministic("std_T", std_T)

        pm.Deterministic("corrcoef_GR", corr_GR[0, 1])
        pm.Deterministic("std_GR", std_GR)

        G_AB = pm.Poisson("G_AB", lambda_AB, observed=data.giftsAB)
        G_BA = pm.Poisson("G_BA", lambda_BA, observed=data.giftsBA)

        inference = pm.sample(target_accept=0.9)
        inference = pm.compute_log_likelihood(inference, extend_inferencedata=True)
    return model, inference
```

```
simulated_gr_model, simulated_gr_inference = fit_giving_receiving_model(simulated_wealth_gifts)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, rho_T, z_T, rho_GR, z_GR]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 26 seconds.
The rhat statistic is larger than 1.01 for some parameters. This indicates problems during sampling. See https://arxiv.org/abs/1903.08008 for details
The effective sample size per chain is smaller than 100 for some parameters.  A higher number is needed for reliable rhat and ess computation. See https://arxiv.org/abs/1903.08008 for details
```

```
az.summary(simulated_gr_inference, var_names=["corrcoef_T", "corrcoef_GR"])
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| corrcoef\_T | 0.467 | 0.258 | \-0.008 | 0.921 | 0.016 | 0.011 | 260.0 | 579.0 | 1.02 |
| corrcoef\_GR | \-0.853 | 0.087 | \-0.981 | \-0.694 | 0.003 | 0.002 | 989.0 | 1727.0 | 1.00 |

```
def plot_wealth_gifting_posterior(inference, data_range=None):
    posterior_alpha = inference.posterior["alpha"]
    posterior_GR = inference.posterior["GR"]

    log_posterior_giving = posterior_alpha + posterior_GR[:, :, :, 0]  # Household A
    log_posterior_receiving = posterior_alpha + posterior_GR[:, :, :, 1]  # Household B

    posterior_receiving = np.exp(log_posterior_giving.mean(dim=("chain", "draw")))
    posterior_giving = np.exp(log_posterior_receiving.mean(dim=("chain", "draw")))

    # Household giving/receiving
    _, axs = plt.subplots(1, 2, figsize=(10, 5))
    plt.sca(axs[0])
    utils.plot_scatter(posterior_receiving, posterior_giving, color="C0", label="households")
    if data_range is None:
        axis_max = np.max(posterior_receiving.values.ravel()) * 1.05
        data_range = (0, axis_max)
    plt.xlabel("giving")
    plt.ylabel("receiving")
    plt.legend()
    plt.plot(data_range, data_range, color="k", linestyle="--")
    plt.xlim(data_range)
    plt.ylim(data_range)

    # Giving/receiving correlation distribution
    plt.sca(axs[1])
    az.plot_dist(inference.posterior["corrcoef_GR"], color="C1", plot_kwargs={"linewidth": 3})
    cc_mean = inference.posterior["corrcoef_GR"].mean()
    plt.axvline(cc_mean, color="k", linestyle="--", label=f"posterior mean: {cc_mean:1.2}")
    plt.xlim([-1, 1])
    plt.legend()
    plt.ylabel("density")
    plt.xlabel("correlation, giving-receiving")

def plot_dyadic_ties(inference):
    inference = wealth_gifts_inference
    T = inference.posterior.mean(dim=("chain", "draw"))["T"]
    utils.plot_scatter(T[:, 0], T[:, 1], color="C0", label="dyadic ties")
    plt.xlabel("Household A")
    plt.ylabel("Household B")
    plt.legend()
```

```
plot_wealth_gifting_posterior(simulated_gr_inference)
```

![../_images/8ecfcaa643ee9f8fd8177c6bcc23a5c36473f791dc8432102b0e45bafc2948f8.png](https://www.pymc.io/projects/examples/en/latest/_images/8ecfcaa643ee9f8fd8177c6bcc23a5c36473f791dc8432102b0e45bafc2948f8.png)

```
_, axs = plt.subplots(1, 2, figsize=(8, 4))
plt.sca(axs[0])
plot_posterior_household_ties(simulated_gr_inference, color_friends=True)

plt.sca(axs[1])
plot_posterior_reciprocity(simulated_gr_inference)
```

![../_images/82a68ee43d07ea76abb51b307b5dc5588d5fe2e06f877531a0be1ca7dadf761b.png](https://www.pymc.io/projects/examples/en/latest/_images/82a68ee43d07ea76abb51b307b5dc5588d5fe2e06f877531a0be1ca7dadf761b.png)

### Fit on real data

```
gr_model, gr_inference = fit_giving_receiving_model(SHARING)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, rho_T, z_T, rho_GR, z_GR]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 26 seconds.
```

```
az.summary(gr_inference, var_names=["corrcoef_T", "corrcoef_GR"])
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| corrcoef\_T | 0.941 | 0.027 | 0.893 | 0.988 | 0.001 | 0.001 | 767.0 | 1300.0 | 1.0 |
| corrcoef\_GR | \-0.529 | 0.213 | \-0.892 | \-0.126 | 0.006 | 0.004 | 1327.0 | 1819.0 | 1.0 |

```
plot_wealth_gifting_posterior(gr_inference)
```

![../_images/8554220a7dce65fb605318aa3280b17813e1a3659cc2e7480e109bedceeea7ca.png](https://www.pymc.io/projects/examples/en/latest/_images/8554220a7dce65fb605318aa3280b17813e1a3659cc2e7480e109bedceeea7ca.png)

```
_, axs = plt.subplots(1, 2, figsize=(8, 4))
plt.sca(axs[0])
plot_posterior_household_ties(gr_inference)
plt.sca(axs[1])
plot_posterior_reciprocity(gr_inference)
```

![../_images/6bdc9ff9ba900791a63a9d8eea3efe9d741f2633a065ab135b59a3d0b1acf0fa.png](https://www.pymc.io/projects/examples/en/latest/_images/6bdc9ff9ba900791a63a9d8eea3efe9d741f2633a065ab135b59a3d0b1acf0fa.png)

### Plot the posterior mean social graph

```
def plot_posterior_mean_graph(
    inference, rescale_probs=False, edge_colormap="gray", title=None, **plot_graph_kwargs
):
    """Plot the simulated ties graph, weighting each tie connection's edge color by
    a model's posterior mean probability of T_AB.
    """
    T = inference.posterior["T"]
    mean_lambda_ties = np.exp(T.mean(dim=("chain", "draw"))[:, 0])
    _, axs = plt.subplots(1, 2, figsize=(10, 5), width_ratios=[20, 1])

    plt.sca(axs[0])
    plt.set_cmap(edge_colormap)
    A, B = np.nonzero(TIES)

    G = nx.DiGraph()
    edge_color = []
    for ii, (A, B) in enumerate(DYADS):
        ii, jj = sorted([A, B])
        dyad_idx = np.where((DYADS[:, 0] == A) & (DYADS[:, 1] == B))[0][0].astype(int)
        weight = mean_lambda_ties[dyad_idx]

        # include edges that predict one or more social ties
        if weight >= 1:
            G.add_edge(A, B, weight=weight)
            edge_color.append(weight)

    edge_color = np.log(np.array(edge_color))
    utils.plot_graph(G, edge_color=edge_color, pos=TIES_LAYOUT_POSITION, **plot_graph_kwargs)
    plt.title(title)

    # Fake axis to hold colorbar
    plt.sca(axs[1])
    axs[1].set_aspect(0.0001)
    axs[1].set_visible(False)
    img = plt.imshow(np.array([[edge_color.min(), edge_color.max()]]))
    img.set_visible(False)

    clb = plt.colorbar(orientation="vertical", fraction=0.8, pad=0.1)
    clb.set_label("log(# ties)", rotation=90)
```

#### Posterior Mean social network from gifting model

```
plot_posterior_mean_graph(social_ties_inference)
```

![../_images/3c92df6dfe1aa8c2d33c8dc5b04410732ee4c66acd58219b9413578645b28387.png](https://www.pymc.io/projects/examples/en/latest/_images/3c92df6dfe1aa8c2d33c8dc5b04410732ee4c66acd58219b9413578645b28387.png)

#### Posterior mean social network for model that also incorporates Wealth

```
plot_posterior_mean_graph(gr_inference)
```

![../_images/31062627251e56f95f9d0b112c2a2c6eb8cd95d33b023245a10e7edfc2a2b8c2.png](https://www.pymc.io/projects/examples/en/latest/_images/31062627251e56f95f9d0b112c2a2c6eb8cd95d33b023245a10e7edfc2a2b8c2.png)

## Including Predictive Household features

Now we’ll add predictor featurs to the model. Specifically, we’ll add GLM parameters for

- an association feature $A_{A B}$ for each diad (e.g. friendship), $\beta_{A}$.
- the effect of household wealth $W_{A , B}$ on giving, $\beta_{G}$
- the effect of household wealth $W_{A , B}$ on receiving, $\beta_{R}$

### Likelihood

$$
\begin{matrix}G_{A B} & sim \text{Poisson} \left(\right. \lambda_{A B} \left.\right) \\ G_{B A} & sim \text{Poisson} \left(\right. \lambda_{B A} \left.\right) \\ log ⁡ \left(\right. \lambda_{A B} \left.\right) & = \alpha + \mathcal{T}_{A B} + \mathcal{G}_{A} + \mathcal{R}_{B} \\ log ⁡ \left(\right. \lambda_{B A} \left.\right) & = \alpha + \mathcal{T}_{B A} + \mathcal{G}_{B} + \mathcal{R}_{A} \\ \mathcal{T}_{A B} & = T_{A B} + \beta_{A} A_{A B} \\ \mathcal{G}_{A} & = G_{A} + \beta_{G} W_{A} \\ \mathcal{R}_{B} & = R_{A} + \beta_{R} W_{B}\end{matrix}
$$

### Global priors

$$
\begin{matrix}\alpha & sim \text{Normal} \left(\right. 0 , 1 \left.\right) \\ \beta_{A , G , R} & sim \text{Normal} \left(\right. 0 , 1 \left.\right)\end{matrix}
$$

### Correlated Giving/Recieving prior

$$
\begin{matrix}\left(\right. \begin{matrix}G_{A} \\ R_{A}\end{matrix} \left.\right) & = \text{MVNormal} \left(\right. \left[\right. \begin{matrix}0 \\ 0\end{matrix} \left]\right. , \textbf{R}_{G R} , \textbf{S}_{G R} \left.\right) \\ \textbf{R}_{G R} & sim \text{LKJCorr} \left(\right. \eta \left.\right) \\ \textbf{S}_{G R} & sim \text{Exponential} \left(\right. 1 \left.\right)\end{matrix}
$$

### Add observed confounds variables to simulated dataset

```
# Add **observed** association feature
simulated_wealth_gifts.loc[:, "association"] = FRIENDSHIP

# Add **observed** wealth feature
simulated_wealth_gifts.loc[:, "wealthA"] = simulated_wealth_gifts.hidA.map(
    {ii: WEALTH[ii] for ii in range(N)}
)
simulated_wealth_gifts.loc[:, "wealthB"] = simulated_wealth_gifts.hidB.map(
    {ii: WEALTH[ii] for ii in range(N)}
)
```

```
def fit_giving_receiving_features_model(data, eta=2):
    n_dyads = len(data)
    n_correlated_features = 2

    dyad_id = data.did.values.astype(int)
    household_A_id = data.hidA.values.astype(int)
    household_B_id = data.hidB.values.astype(int)
    association_AB = data.association.values.astype(float)
    wealthA = data.wealthA.values.astype(float)
    wealthB = data.wealthB.values.astype(float)

    # Data are 1-indexed
    if np.min(dyad_id) == 1:
        dyad_id -= 1
        household_A_id -= 1
        household_B_id -= 1

    n_households = np.max([household_A_id, household_B_id]) + 1

    with pm.Model() as model:

        # Priors
        # single, global alpha
        alpha = pm.Normal("alpha", 0, 1)

        # global association and giving-receiving params
        beta_A = pm.Normal("beta_A", 0, 1)
        beta_G = pm.Normal("beta_G", 0, 1)
        beta_R = pm.Normal("beta_R", 0, 1)

        # Social ties interaction; shared sigma
        sigma_T = pm.Exponential.dist(1)
        chol_T, corr_T, std_T = pm.LKJCholeskyCov(
            "rho_T", eta=eta, n=n_correlated_features, sd_dist=sigma_T
        )
        z_T = pm.Normal("z_T", 0, 1, shape=(n_dyads, n_correlated_features))
        T = pm.Deterministic("T", chol_T.dot(z_T.T).T)

        T_AB = T[dyad_id, 0] + beta_A * association_AB
        T_BA = T[dyad_id, 1] + beta_A * association_AB

        # Giving-receiving interaction; full covariance
        sigma_GR = pm.Exponential.dist(1, shape=n_correlated_features)
        chol_GR, corr_GR, std_GR = pm.LKJCholeskyCov(
            "rho_GR", eta=eta, n=n_correlated_features, sd_dist=sigma_GR
        )
        z_GR = pm.Normal("z_GR", 0, 1, shape=(n_households, n_correlated_features))
        GR = pm.Deterministic("GR", chol_GR.dot(z_GR.T).T)

        G_A = GR[household_A_id, 0] + beta_G * wealthA
        G_B = GR[household_B_id, 0] + beta_G * wealthB

        R_A = GR[household_A_id, 1] + beta_R * wealthA
        R_B = GR[household_B_id, 1] + beta_R * wealthB

        lambda_AB = pm.Deterministic("lambda_AB", pm.math.exp(alpha + T_AB + G_A + R_B))
        lambda_BA = pm.Deterministic("lambda_BA", pm.math.exp(alpha + T_BA + G_B + R_A))

        # Record quantities for reporting
        pm.Deterministic("corrcoef_T", corr_T[0, 1])
        pm.Deterministic("std_T", std_T)

        pm.Deterministic("corrcoef_GR", corr_GR[0, 1])
        pm.Deterministic("std_GR", std_GR)
        pm.Deterministic("giving", beta_G)
        pm.Deterministic("receiving", beta_R)

        G_AB = pm.Poisson("G_AB", lambda_AB, observed=data.giftsAB)
        G_BA = pm.Poisson("G_BA", lambda_BA, observed=data.giftsBA)

        inference = pm.sample(target_accept=0.9)

        # Include log-likelihood for model comparison
        inference = pm.compute_log_likelihood(inference, extend_inferencedata=True)
    return model, inference
```

```
simulated_grf_model, simulated_grf_inference = fit_giving_receiving_features_model(
    simulated_wealth_gifts
)
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, beta_A, beta_G, beta_R, rho_T, z_T, rho_GR, z_GR]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 24 seconds.
The rhat statistic is larger than 1.01 for some parameters. This indicates problems during sampling. See https://arxiv.org/abs/1903.08008 for details
The effective sample size per chain is smaller than 100 for some parameters.  A higher number is needed for reliable rhat and ess computation. See https://arxiv.org/abs/1903.08008 for details
```

```
az.plot_dist(simulated_gr_inference.posterior["std_T"], color="C0", label="without Association")
az.plot_dist(simulated_grf_inference.posterior["std_T"], color="C1", label="with Association")
plt.xlabel("std T");
```

![../_images/bc3e3ba9f95febf1b4466b89e5e078f0f2c6e5428843b2979d2c1f51058f020c.png](https://www.pymc.io/projects/examples/en/latest/_images/bc3e3ba9f95febf1b4466b89e5e078f0f2c6e5428843b2979d2c1f51058f020c.png)

We can see that including parameters for giving and receiving reduces posterior standard deviation associated with social ties. This is expected because, we’re explaining away more variance with those additional parameters.

### Model coefficients

```
_, ax = plt.subplots()
plt.sca(ax)
posterior = simulated_grf_inference.posterior

az.plot_dist(posterior["beta_G"], color="C0", label="$\\beta_G$")
plt.axvline(BETA_WG, color="C0", linestyle="--", label="True $\\beta_G$")

az.plot_dist(posterior["beta_R"], color="C1", label="$\\beta_R$")
plt.axvline(BETA_WR, color="C1", linestyle="--", label="True $\\beta_R$")

az.plot_dist(posterior["beta_A"], color="C2", label="$\\beta_A$")
plt.axvline(1, color="C2", linestyle="--", label="True $\\beta_A$")

plt.xlabel("posterior, $\\beta$")
plt.ylabel("density")
plt.legend();
```

![../_images/04a8ea960cd4174f66f68e6a13e2d6b9f206b9f6e80981ba4bad367a0d130261.png](https://www.pymc.io/projects/examples/en/latest/_images/04a8ea960cd4174f66f68e6a13e2d6b9f206b9f6e80981ba4bad367a0d130261.png)

Using this model–which is highly aligned with the data simulation–we’re able to recover the coefficients from the underlying generative model.

- Association (in this case friendship) gets positive coefficient $\beta_{A}$. All friendship associations result in giving
- Wealth positively affects giving, $\beta_{G}$
- Wealth negatively affects receiving $\beta_{R}$

### Model Comparison

Controlling for the correct confounds provides a better model of the data, in terms of cross-validation scores

```
az.compare(
    {"with confounds": simulated_grf_inference, "without confounds": simulated_gr_inference},
    var_name="G_AB",
)
```

|  | rank | elpd\_loo | p\_loo | elpd\_diff | weight | se | dse | warning | scale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| with confounds | 0 | \-312.826182 | 39.968211 | 0.000000 | 1.000000e+00 | 18.536588 | 0.000000 | True | log |
| without confounds | 1 | \-326.921320 | 55.714152 | 14.095138 | 5.648815e-13 | 18.234868 | 4.638331 | True | log |

#### Accounting for the confounding features makes social network abstraction less important

```
plot_wealth_gifting_posterior(simulated_grf_inference, data_range=(0.4, 0.6))
```

![../_images/b1ec9da432f0636922ca03fe13b55741930088eeebd9d2d91c165a21f236ed7d.png](https://www.pymc.io/projects/examples/en/latest/_images/b1ec9da432f0636922ca03fe13b55741930088eeebd9d2d91c165a21f236ed7d.png)

Giving/receiving is mostly explained by friendship and/or household wealth, so after accounting for those variables, the giving receiving dynamics defined in the dyads has less signal

#### Social ties become more independent when controlling for correct predictors

```
_, axs = plt.subplots(1, 2, figsize=(8, 4))
plt.sca(axs[0])
plot_posterior_household_ties(simulated_grf_inference, color_friends=True)

plt.sca(axs[1])
plot_posterior_reciprocity(simulated_grf_inference)
```

![../_images/da284a56794f294c3f9d0aab3eedd0c159d2c26db478f23c1b882aca027c46a5.png](https://www.pymc.io/projects/examples/en/latest/_images/da284a56794f294c3f9d0aab3eedd0c159d2c26db478f23c1b882aca027c46a5.png)

The x-shape in the joint is indicative of an independent set of variables. m

#### When accounting for confounds, a majority of the connection probabilities are around 0.5

This indicates social ties are more-or-less random after accounting for freindship and wealth

```
plot_posterior_mean_graph(simulated_grf_inference)
```

![../_images/96ca05fa96046061c5700065f39a2101047221714cefe97154a510a6d8b3afbe.png](https://www.pymc.io/projects/examples/en/latest/_images/96ca05fa96046061c5700065f39a2101047221714cefe97154a510a6d8b3afbe.png)

### Fitting Giving-receiving Features Model to Real Data

In the lecture McElreath reports results on the real data, but given the version of the dataset I have in hand, it’s somewhat unclear how to move forward.

```
SHARING.head()
```

|  | hidA | hidB | did | giftsAB | giftsBA | offset | drel1 | drel2 | drel3 | drel4 | dlndist | dass | d0125 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 2 | 1 | 0 | 4 | 0.000 | 0 | 0 | 1 | 0 | \-2.790 | 0.000 | 0 |
| 1 | 1 | 3 | 2 | 6 | 31 | \-0.003 | 0 | 1 | 0 | 0 | \-2.817 | 0.044 | 0 |
| 2 | 1 | 4 | 3 | 2 | 5 | \-0.019 | 0 | 1 | 0 | 0 | \-1.886 | 0.025 | 0 |
| 3 | 1 | 5 | 4 | 4 | 2 | 0.000 | 0 | 1 | 0 | 0 | \-1.892 | 0.011 | 0 |
| 4 | 1 | 6 | 5 | 8 | 2 | \-0.003 | 1 | 0 | 0 | 0 | \-3.499 | 0.022 | 0 |

To fit the model we need to know which columns in the real dataset are associated with

- The association metric $A_{A B}$
- Wealth of Household A $W_{A}$
- Wealth of Household B $W_{B}$

Looking at the dataset, it’s not entirely clear which columns we should/could associate with each of those variables to replicate the figure in lecture. That said, if we DID know those columns–or how to derive them–it would be easy to fit the model via

```python
>>> grf_model, grf_inference = fit_giving_receiving_features_model(SHARING)
```

```
# grf_model, grf_inference = fit_giving_receiving_features_model(SHARING)
```

## Additional Structure: Triangle Closures

- Relationships tend to come in triads
- **Block models** – social ties are more common within a social group
	- families
		- classrooms
		- actual city blocks
- Adds additional confounds

```
utils.draw_causal_graph(
    edge_list=[
        ("H_A", "G_AB"),
        ("H_B", "G_AB"),
        ("H_A", "T_AB"),
        ("H_B", "T_AB"),
        ("H_A", "T_BA"),
        ("H_B", "T_BA"),
        ("T_AB", "G_AB"),
        ("T_BA", "G_AB"),
        ("H_A", "K_A"),
        ("H_B", "K_B"),
        ("K_A", "T_AB"),
        ("K_B", "T_AB"),
        ("K_A", "T_BA"),
        ("K_B", "T_BA"),
    ],
    node_props={
        "T_AB": {"style": "dashed"},
        "T_BA": {"style": "dashed"},
        "K_A": {"color": "red", "label": "A's block membership"},
        "K_B": {"color": "red", "label": "B's block membership"},
        "unobserved": {"style": "dashed"},
    },
    edge_props={
        ("K_A", "T_AB"): {"color": "red"},
        ("K_A", "T_BA"): {"color": "red"},
        ("K_B", "T_AB"): {"color": "red"},
        ("K_B", "T_BA"): {"color": "red"},
    },
)
```

![../_images/5aacf140236e8f5d1a8ecbe5068c45d4f26956bab5406faef69bb61718f98e79.svg](https://www.pymc.io/projects/examples/en/latest/_images/5aacf140236e8f5d1a8ecbe5068c45d4f26956bab5406faef69bb61718f98e79.svg)

### Posterior Network is regularized

- Social networks try to express **regularities** in the observations
- Inferred networks are **regularized**

> Blocks and clusters are still discrete subgroups, what about “continuous clusters” like age or spatial distance? The goal of next lecture on Gaussian Processes

```
def plot_gifting_graph(data, title=None, edge_colormap="gray_r", **plot_graph_kwargs):

    G = nx.DiGraph()
    edge_weights = []
    for ii, (A, B) in enumerate(DYADS):
        row = data.iloc[ii]

        if row.giftsAB > 0:
            A_, B_ = A, B
            weight = row.giftsAB

        if row.giftsBA > 0:
            A_, B_ = B, A
            weight = row.giftsBA

        G.add_edge(A, B, weight=weight)
        edge_weights.append(weight)

    edge_weights = np.array(edge_weights)
    edge_color = np.log(edge_weights)

    _, axs = plt.subplots(1, 2, figsize=(10, 5), width_ratios=[20, 1])
    plt.sca(axs[0])
    plt.set_cmap(edge_colormap)
    utils.plot_graph(G, edge_color=edge_color, pos=TIES_LAYOUT_POSITION, **plot_graph_kwargs)
    plt.title(title)

    # Fake axis to hold colorbar
    plt.sca(axs[1])
    axs[1].set_aspect(0.0001)
    axs[1].set_visible(False)
    img = plt.imshow(np.array([[edge_color.min(), edge_color.max()]]))
    img.set_visible(False)

    clb = plt.colorbar(orientation="vertical", fraction=0.8, pad=0.1)
    clb.set_label("log(# gifts)", rotation=90)
```

#### Comparing Gifting Observations to Model Trained on those observations

⚠️ The example below is using the simulated data

```
# Data that is modeled
edge_weight_cmap = "gray"  # switch colorscale to highlight sparsity
plot_gifting_graph(
    simulated_wealth_gifts, edge_colormap=edge_weight_cmap, alpha=1, title="Observed Gifting"
)

# Resulting model is sparser
plot_posterior_mean_graph(
    simulated_grf_inference,
    edge_colormap=edge_weight_cmap,
    alpha=1,
    title="Model Posterior Social Ties",
)
```

![../_images/1ac14c39738d42de1eeed82613454c871714bd3c1e509e29e5fa0bfe6b0db288.png](https://www.pymc.io/projects/examples/en/latest/_images/1ac14c39738d42de1eeed82613454c871714bd3c1e509e29e5fa0bfe6b0db288.png) ![../_images/b9904b51493b443e96a045534b2e60793ab6036ada49b6c25c10bf2328b00057.png](https://www.pymc.io/projects/examples/en/latest/_images/b9904b51493b443e96a045534b2e60793ab6036ada49b6c25c10bf2328b00057.png)

The observed gifting network is denser than the social ties network estimated from the data, indicating that the model’s pooling is adding regularization (compression) to the network’s of social ties.

## Varying effects as technology

- Social nets try to express regularities in observed data
- Inferred nets are thus regularized, capturing those structured regular effects
- What happens when clusters are not discrete?
	- Age, distance, spatial location
		- We need a way to stratify or perform local poolling by “continuous clusters”
		- This is where Gaussian Processes come in next lecture.
				- Allows us to attack problems that require phylogenic and spatial models

## BONUS: Constructed Variables ≠ Stratification

- Outcomes that are deterministic functions of e.g.
	- Body Mass Index: $B M I = \frac{m a s s}{h e i g h t^{2}}$
		- “\*per capita”, “\*per unit time”
- **It’s a common misunderstanding that dividing or rescaling by a variable is equivalent to controlling for that variable.**
- Causal inference can provide a means to combine variables in a more principled manner.

## Example: Dividing GDP by population

```
utils.draw_causal_graph(
    edge_list=[("P", "GDP/P"), ("GDP", "GDP/P"), ("P", "GDP")],
    node_props={
        "P": {"label": "population, P"},
        "GDP": {"label": "gross domestic product, GDP"},
    },
    edge_props={
        ("P", "GDP"): {
            "color": "red",
            "label": "assumed to be linear\n(not realistic)",
            "fontcolor": "red",
        }
    },
    graph_direction="LR",
)
```

![../_images/df98edc6ea6bdbcee9893a5d58c24d3d82067d45cadd4d448892a3c6cbb042e4.svg](https://www.pymc.io/projects/examples/en/latest/_images/df98edc6ea6bdbcee9893a5d58c24d3d82067d45cadd4d448892a3c6cbb042e4.svg)
- makes the assumption that population scales GDP linearly
- dividing by population is not equivalent to stratifying by population

```
utils.draw_causal_graph(
    edge_list=[("P", "GDP/P"), ("GDP", "GDP/P"), ("P", "GDP"), ("P", "X"), ("X", "GDP")],
    node_props={
        "X": {"color": "red", "label": "cause of interest, X"},
        "GDP": {"color": "red"},
    },
    edge_props={
        ("P", "X"): {"color": "blue", "label": "backdoor\npath", "fontcolor": "blue"},
        ("X", "GDP"): {"color": "red", "label": "Causal Path", "fontcolor": "red"},
        ("P", "GDP/P"): {"color": "blue"},
        ("GDP", "GDP/P"): {"color": "red"},
    },
    graph_direction="LR",
)
```

![../_images/283b8bec5d55766a40036cd53135d41a1d1fffbffffb416be31413b5a96fe98b.svg](https://www.pymc.io/projects/examples/en/latest/_images/283b8bec5d55766a40036cd53135d41a1d1fffbffffb416be31413b5a96fe98b.svg)

it gets worse, though. In the scenario below, where we want to estimate the causal effect of $X$ on GDP/P, the fork created by $P$ isn’t removed by simply calculating GDP/P

## Another Example: Rates

```
utils.draw_causal_graph(
    edge_list=[("T", "Y/T"), ("Y", "Y/T"), ("T", "Y"), ("X", "Y")], graph_direction="LR"
)
```

![../_images/bdbc300c33532ce8ae310cabefabbfa78ea8a84eb4fc8ecf0ae6fbe405686c37.svg](https://www.pymc.io/projects/examples/en/latest/_images/bdbc300c33532ce8ae310cabefabbfa78ea8a84eb4fc8ecf0ae6fbe405686c37.svg)
- Rates are often calculated as $\frac{\backslash\#\text{ events}}{\text{unit time}}$ and modeled as outcomes
- Does not consider the varying precision for different amounts of time
	- assuming all Y/T has the same precision, despite larger Y generally having more time to occur, and thus having higher precision
		- collapsing to point estimates removes our ability to talk about uncertainty in rates (e.g. distributions)
		- datapoints with less time/less prcision are given as much credibility to the estimate as data with longer/better precision
- **Division by time does not control for time**
- If rates are the focus of scientific question, **model the counts (e.g. Poisson regression) to estimate the rate parameter**

## Another Example: Difference scores

```
utils.draw_causal_graph(
    edge_list=[("H0", "H1-H0"), ("H1", "H1-H0"), ("H0", "H1"), ("X", "H1")], graph_direction="LR"
)
```

![../_images/166df2ab81ba4a1a78458f50e4609f12b8941734b391540c0e58f0f22a2dfe6a.svg](https://www.pymc.io/projects/examples/en/latest/_images/166df2ab81ba4a1a78458f50e4609f12b8941734b391540c0e58f0f22a2dfe6a.svg)

For example the plant growth experiment, where H0 and H1 are the starting and ending heights of the plant, X is the antifungal treatment.

- difference score H1-H0 makes strong assumptions about the effect of H0 on H1, namely that
	- growth effects are constant for all starting heights
		- there is no floor or ceiling effects on plant height
- **need to model H0 on the right side of the GLM (linear regression), as it is a cause of H1**. This is what we did in the plant growth example

## Review: Constructed Variables are Bad

- **arithmetic is not stratification**
- implicity assume fixed functional relationships amongst causes; you should be estimating these functional relationships
- generally ignores uncertainty
- using residuals as new data does not control for variables; don’t use in causal inference (though it is often common to do so in predictive settings)

### Adhockery

- adhoc procedures that have intuitive justifications
	- “we expect to see a correlation”.
		- Why do you expect to see correlation (make assumptions explicit)?
				- Also, if you don’t see a correlation, why does that mean some NULL contingent on that correlation is disproven?
- if an adhoc procedure *does* work (they sometimes can be correct by chance), it needs to be justified by causal logic and testing
- **Simple rule: Model what you measure**
	- don’t try to model new metrics that are derived from measures

## Authors

- Ported to PyMC by Dustin Stansbury (2024)
- Based on Statistical Rethinking (2023) lectures by Richard McElreath

```
%load_ext watermark
%watermark -n -u -v -iv -w -p pytensor,aeppl,xarray
```

```
Last updated: Tue Dec 17 2024

Python implementation: CPython
Python version       : 3.12.5
IPython version      : 8.27.0

pytensor: 2.26.4
aeppl   : not installed
xarray  : 2024.7.0

arviz      : 0.19.0
matplotlib : 3.9.2
pandas     : 2.2.2
xarray     : 2024.7.0
statsmodels: 0.14.2
numpy      : 1.26.4
pymc       : 5.19.1
scipy      : 1.14.1
networkx   : 3.4.2

Watermark: 2.5.0
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

- [[Social Network Models]] — Bayesian social network analysis in PyMC
