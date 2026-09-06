---
title: "Missing Data"
source: "https://www.pymc.io/projects/examples/en/latest/statistical_rethinking_lectures/18-Missing_Data.html"
author:
published:
created: 2026-04-09
description: "This notebook is part of the PyMC port of the Statistical Rethinking 2023 lecture series by Richard McElreath. Video - Lecture 18 - Missing Data# Lecture 18 - Missing Data Missing Data, Found: Obse..."
tags:
  - "clippings"
doc_type: concept
folder: "Clippings"
depends_on: []
used_by: []
source_location: "Full article"
date_ingested: 2026-04-08
---
## Missing Data

This notebook is part of the PyMC port of the [Statistical Rethinking 2023](https://github.com/rmcelreath/stat_rethinking_2023) lecture series by Richard McElreath.

[Video - Lecture 18 - Missing Data](https://youtu.be/Oeq6GChHOzc) # [Lecture 18 - Missing Data](https://www.youtube.com/watch?v=Oeq6GChHOzc)

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

## Missing Data, Found

- Observed data is a special case
	- we trick ourselves into believing there is no error
		- no/little error is rare

Most data are missing

- but there’s still information about the missing data. no data is fully missing with a generative model
1. constraints - e.g. heights are never negative, and bounded
2. relationships to other variables - e.g. weather affects our behavior, our behavior does not affect the weather

## Dealing with missing data is a workflow

### What to do with missing data?

- **Complete case analysis**: drop cases missing values
	- sometimes the right thing to do
		- depends on the context and causal assumptions
- **Imputation**: fill the missing values with reasonable values that are based on the present values
	- often necessary and benefitial for accurate estimation

## Dog ate my homework: looking a different missing data scenarios

```
utils.draw_causal_graph(
    edge_list=[("S", "H"), ("H", "H*"), ("D", "H*")],
    node_props={
        "S": {"color": "red"},
        "H*": {"color": "red"},
        "H": {"style": "dashed"},
        "unobserved": {"style": "dashed"},
    },
    edge_props={
        ("S", "H"): {"color": "red"},
        ("H", "H*"): {"color": "red"},
    },
    graph_direction="LR",
)
```

![../_images/532bd0c84288d1b25783737ab096b208daa2532a061c961af2c360e0ac29521a.svg](https://www.pymc.io/projects/examples/en/latest/_images/532bd0c84288d1b25783737ab096b208daa2532a061c961af2c360e0ac29521a.svg)
- Student ability/knowledge state $S$
- Students would receive score on homework $H$
- We only get to observe the homework the teacher sees $H^{*}$
	- we don’t get to observe the real score, because homework may not make it to teacher
		- e.g. the family dog $D$ randomly eats homework (missingness mechanism)

### Dog usually benign

```
# Helper functions
def plot_regression_line(x, y, color, label, **plot_kwargs):
    valid_idx = ~np.isnan(y)

    X = np.vstack((np.ones_like(x[valid_idx]), x[valid_idx])).T
    intercept, slope = np.linalg.lstsq(X, y[valid_idx])[0]

    xs = np.linspace(x.min(), x.max(), 10)
    ys = xs * slope + intercept
    utils.plot_line(xs, ys, color=color, label=label, **plot_kwargs)

def plot_dog_homework(S, H, Hstar, title=None):

    utils.plot_scatter(S, H, color="k", alpha=1, label="total", s=10)
    plot_regression_line(S, H, label="total trend", color="k", alpha=0.5)

    utils.plot_scatter(S, Hstar, color="C0", alpha=0.8, label="incomplete")
    plot_regression_line(S, Hstar, label="incomplete trend", color="C0", alpha=0.5)

    plt.xlabel("S")
    plt.ylabel("H")
    plt.title(title)
    plt.legend();
```

#### Simulate random homework eating

```
np.random.seed(123)
n_homework = 100
# Student knowledge
S = stats.norm.rvs(size=n_homework)

# Homework score
mu_score = S * 0.5
H = stats.norm.rvs(mu_score)

# Dog eats 50% of of homework _at random_
D = stats.bernoulli(0.5).rvs(size=n_homework)
Hstar = H.copy()
Hstar[D == 1] = np.nan

plot_dog_homework(
    S, H, Hstar, title="Random missing data\ncauses loss of precision; little/no bias"
)
```

![../_images/f38c8113377d38790542b2d1414fa30bf8ac0f2656ba1be613f54ab0ee8e0250.png](https://www.pymc.io/projects/examples/en/latest/_images/f38c8113377d38790542b2d1414fa30bf8ac0f2656ba1be613f54ab0ee8e0250.png)
- When losing outcomes randomly, we obtain a similar linear fit with the similar slope, and no little/no bias.
- Thus dropping complete cases ok, but lose efficiency

### Dog eats homework based on cause of homework (student ability)

Now the student’s ability effects the dog’s behavior (e.g. the student studies too much and doesn’t feed the dog, and the dog is hungry)

```
utils.draw_causal_graph(
    edge_list=[("S", "H"), ("H", "H*"), ("D", "H*"), ("S", "D")],
    node_props={
        "S": {"color": "blue"},
        "H*": {"color": "red"},
        "H": {"style": "dashed"},
        "unobserved": {"style": "dashed"},
    },
    edge_props={
        ("S", "H"): {"color": "red"},
        ("H", "H*"): {"color": "red"},
        ("S", "D"): {"color": "blue", "label": "possible biasing path", "fontcolor": "blue"},
        ("D", "H*"): {"color": "blue"},
    },
    graph_direction="LR",
)
```

![../_images/687bbb0713b1011c8e314be2615fca9bf4e1680af0dd7c8f45a96241358fb2c5.svg](https://www.pymc.io/projects/examples/en/latest/_images/687bbb0713b1011c8e314be2615fca9bf4e1680af0dd7c8f45a96241358fb2c5.svg)

#### Simulate data where treatment effects oucome linearly

```
np.random.seed(12)
n_homework = 100
# Student knowledge
S = stats.norm.rvs(size=n_homework)

# Linear association between student ability and homework score
mu_score = S * 0.5
H = stats.norm.rvs(mu_score)

# Dog eats based on the student's ability
p_dog_eats_homework = np.where(S > 0, 0.9, 0)
D = stats.bernoulli.rvs(p=p_dog_eats_homework)
Hstar = H.copy()
Hstar[D == 1] = np.nan

plot_dog_homework(
    S,
    H,
    Hstar,
    title="Missing data conditioned on common cause\nmay work for linear relationships (rare) ",
)
```

![../_images/9bd849c4283f5576b86592de22d4f1a881e3858614ee50fb8288edff4edddc5e.png](https://www.pymc.io/projects/examples/en/latest/_images/9bd849c4283f5576b86592de22d4f1a881e3858614ee50fb8288edff4edddc5e.png)

When the association between student ability $S$ and homework sckor $H$ is linear, we can still get fairly similar linear fits from the total and incomplete sample, you just lose precision on one the upper end of the $S$ dimenions in this simulation

#### Simulate data where treatment effects oucome nonlinearly

```
np.random.seed(1)
n_homework = 100
# Student knowledge
S = stats.norm.rvs(size=n_homework)

# Nonlinear association between student ability and homework score
mu_score = 1 - np.exp(-0.7 * S)
H = stats.norm.rvs(mu_score)

# Dog eats all the homework of above-average students
p_dog_eats_homework = np.where(S > 0, 1, 0)
D = stats.bernoulli.rvs(p=p_dog_eats_homework)
Hstar = H.copy()
Hstar[D == 1] = np.nan

plot_dog_homework(
    S,
    H,
    Hstar,
    title="Missing data based on common cause\nvery bady for non-linear relationships (common)",
)
```

![../_images/826a97d3ed02a25930a34baa411ea42c33dda1aa9c95e10c11f84a7ff92e5bfa.png](https://www.pymc.io/projects/examples/en/latest/_images/826a97d3ed02a25930a34baa411ea42c33dda1aa9c95e10c11f84a7ff92e5bfa.png)
- When the association between student ability $S$ and homework sckor $H$ is nonlinear, we now get very different linear fits from the total and incomplete sample
	- on nonlinearity: this is why we use generative models with scientifically-motivated functions: **functions matter**
- Therefore need to correctly condition on the cause

### Dog eats homework conditioned on the state of homework itself

```
utils.draw_causal_graph(
    edge_list=[("S", "H"), ("H", "H*"), ("D", "H*"), ("H", "D")],
    node_props={
        "H*": {"color": "red"},
        "H": {"style": "dashed"},
        "unobserved": {"style": "dashed"},
    },
    edge_props={
        ("S", "H"): {"color": "red"},
        ("H", "H*"): {"color": "red"},
        ("H", "D"): {"color": "blue", "label": "biasing path", "fontcolor": "blue"},
        ("D", "H*"): {"color": "blue"},
    },
    graph_direction="LR",
)
```

![../_images/5c91b8d3538cc5781ace06a67acaa12e32a45fc7812062c51171a8f024b4fd5b.svg](https://www.pymc.io/projects/examples/en/latest/_images/5c91b8d3538cc5781ace06a67acaa12e32a45fc7812062c51171a8f024b4fd5b.svg)

#### Simulate some linear data

```
np.random.seed(1)
n_homework = 100
# Student knowledge
S = stats.norm.rvs(size=n_homework)

# Linear association between ability and score
mu_score = S * 0.5
H = stats.norm.rvs(mu_score)

# Dog eats 90% of homework that is below average
p_dog_eats_homework = np.where(H < 0, 0.9, 0)
D = stats.bernoulli.rvs(p=p_dog_eats_homework)
Hstar = H.copy()
Hstar[D == 1] = np.nan

plot_dog_homework(
    S, H, Hstar, title="Missing data conditioned on outcome state\nusually not benign"
)
```

![../_images/a9a9f43d8c4ead4b6e4a02ca71e8b370ad5e3d27ba866f9df8d746c2c2dd6ee3.png](https://www.pymc.io/projects/examples/en/latest/_images/a9a9f43d8c4ead4b6e4a02ca71e8b370ad5e3d27ba866f9df8d746c2c2dd6ee3.png)

```
np.random.seed(1)
n_homework = 100
# Student knowledge
S = stats.norm.rvs(size=n_homework)

# Nonlinear association between student ability and homework score
mu_score = 1 - np.exp(-0.9 * S)
H = stats.norm.rvs(mu_score)

# Dog eats 90% of homework that is below average
p_dog_eats_homework = np.where(H < 0, 0.9, 0)
D = stats.bernoulli.rvs(p=p_dog_eats_homework)
Hstar = H.copy()
Hstar[D == 1] = np.nan

plot_dog_homework(
    S,
    H,
    Hstar,
    title="Missing data conditioned on outcome state\nsimilar for nonlinear relationships",
)
```

![../_images/a42a1538d1b1c7f5728e3bc6c8f3ac147404b14ee762b7597af27b07bb87e35f.png](https://www.pymc.io/projects/examples/en/latest/_images/a42a1538d1b1c7f5728e3bc6c8f3ac147404b14ee762b7597af27b07bb87e35f.png)
- without knowing the causal relationship between the state and the data loss, and the functional forms of how $S$ is associated with $H$, it’s difficult to account for this scenario

## Stereotypical cases

1. Data loss is **random and indpendent of causes**
	- “Dog eats homework randomly”
		- Dropping complete cases ok, but lose efficiency
2. Data loss is **conditioned on the cause**
	- “Dog eats homework based on the student’s study habits”
		- Need to correctly condition on cause
3. Data loss is **conditioned on the outcome**
	- “Dog eats homeowork based on the score of the homework”
		- This is usually hopeless unless we can model the causal process of how state affects data loss (i.e. the dog’s behavior in this simulation)
		- e.g. survival analysis and censored data

## Bayesian Imputation

- Works for **Stereotypical cases** 1), 2) and subsets of 3) (e.g. survival analysis)
- Having a joint (Bayesian) model for all variables (observed data and parameters) provides a means for inferring reasonable bounds on the values that are missing

### Imputing or Marginalizing

- **Imputation**: compute a posterior probability distribution of the missing values
	- usually involves partial pooling
		- we’ve already done this to some extent with the missing district in the Bangladesh dataset
- **Marginalizing unknowns**: average over the distribution of missing values using the posteriors for the other variables
	- no need to calculate posteriors for missing values

#### When to impute? When to marginalize?

- Sometimes imputation is unnecessary – e.g. discrete variables
	- Marginalization works here
- It’s sometimes easier to impute
	- e.g. when the data loss process is well understood as in censoring in survival analysis
		- marginalization may be difficult for more exotic models

## Revisiting Phylogenetic Regression

```
PRIMATES301 = utils.load_data("Primates301")
PRIMATES301.head()
```

|  | name | genus | species | subspecies | spp\_id | genus\_id | social\_learning | research\_effort | brain | body | group\_size | gestation | weaning | longevity | sex\_maturity | maternal\_investment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Allenopithecus\_nigroviridis | Allenopithecus | nigroviridis | NaN | 1 | 1 | 0.0 | 6.0 | 58.02 | 4655.00 | 40.0 | NaN | 106.15 | 276.0 | NaN | NaN |
| 1 | Allocebus\_trichotis | Allocebus | trichotis | NaN | 2 | 2 | 0.0 | 6.0 | NaN | 78.09 | 1.0 | NaN | NaN | NaN | NaN | NaN |
| 2 | Alouatta\_belzebul | Alouatta | belzebul | NaN | 3 | 3 | 0.0 | 15.0 | 52.84 | 6395.00 | 7.4 | NaN | NaN | NaN | NaN | NaN |
| 3 | Alouatta\_caraya | Alouatta | caraya | NaN | 4 | 3 | 0.0 | 45.0 | 52.63 | 5383.00 | 8.9 | 185.92 | 323.16 | 243.6 | 1276.72 | 509.08 |
| 4 | Alouatta\_guariba | Alouatta | guariba | NaN | 5 | 3 | 0.0 | 37.0 | 51.70 | 5175.00 | 7.4 | NaN | NaN | NaN | NaN | NaN |

- 301 Primate profiles
- Life history traits
	- Body Mass $M$
		- Brain size $B$
		- Social Group Size $G$
- Issues
	- Lots of **missing data**
		- Complete case analysis only includes 151 observations
		- measurement error
		- unobserved confounding

## Imputing Primates

- **Key Idea**: missing values have probability distributions
	- Express a causal model for each partially-observed variable
		- Replace each missing value with a parameter, and let the model proceed as normal
		- Duality of parameters and data:
			- In Bayes there is no distinction between params and data: missing value is just a parameter, observed value is data
		- e.g. one variable that *is* available can inform us of reasonable values for missing variable associated with the observation
- **Conceptually weired, technically awkward**

### Revisiting previous causal model

```
utils.draw_causal_graph(
    edge_list=[("G", "B"), ("M", "B"), ("M", "G"), ("u", "M"), ("u", "G"), ("u", "B"), ("H", "u")],
    graph_direction="LR",
)
```

![../_images/a8432fe88a0d0ba9c7814260455d4979fca51463507820ee9723e6208e35a4e7.svg](https://www.pymc.io/projects/examples/en/latest/_images/a8432fe88a0d0ba9c7814260455d4979fca51463507820ee9723e6208e35a4e7.svg)
- where $M , G , B$ are defined above
- shared history $H$, which leads to
- historical-based confounds $u$, which we try to capture with a phylogeny

### Let’s now include how missing values may occur

```
utils.draw_causal_graph(
    edge_list=[
        ("G", "B"),
        ("M", "B"),
        ("M", "G"),
        ("u", "M"),
        ("u", "G"),
        ("u", "B"),
        ("H", "u"),
        ("G", "G*"),
        ("mG", "G*"),
    ],
    graph_direction="LR",
)
```

![../_images/4d8070121224953171afd7209f121e628701a5990ef08ce64ceb0c65fa50b507.svg](https://www.pymc.io/projects/examples/en/latest/_images/4d8070121224953171afd7209f121e628701a5990ef08ce64ceb0c65fa50b507.svg)
- We observe group size $G^{*}$, which has missing values for some observations/species
- What influences the cause of missingness $m_{G}$?
	- often the assumption is that it’s totally random, but this is highly unlikely
		- there are **many possible ways that missingness could occur**.

### Some hypotheses on what causes missing data…

```
utils.draw_causal_graph(
    edge_list=[
        ("G", "B"),
        ("M", "B"),
        ("M", "G"),
        ("u", "M"),
        ("u", "G"),
        ("u", "B"),
        ("H", "u"),
        ("G", "G*"),
        ("mG", "G*"),
        ("M", "mG"),
        ("u", "mG"),
        ("G", "mG"),
    ],
    edge_props={
        ("u", "mG"): {"color": "blue", "fontcolor": "blue", "label": "anthro-narcisism"},
        ("M", "mG"): {"color": "darkcyan", "fontcolor": "darkcyan", "label": "larger species"},
        ("G", "mG"): {"color": "red", "fontcolor": "red", "label": "solitary species"},
    },
    graph_direction="LR",
)
```

![../_images/b4325eb046ea82d5557eaab0d6d7249d83b5fd8274f53cc9fa8af6205d2469b6.svg](https://www.pymc.io/projects/examples/en/latest/_images/b4325eb046ea82d5557eaab0d6d7249d83b5fd8274f53cc9fa8af6205d2469b6.svg)
- All the colored arrows, and assumptions/hypotheses, are potentially in play
	- **anthro-narcisism**: humans are more likely to study primates that are like them
		- **larger species** with larger body mass easier to count: e.g. some species might live in trees and are harder to observe
		- some species have little or no social group; these **solitary species** are difficult to observe and gather data on
- Whatever the assumption, the goal is to **use causal model to infer the probability distribution of each missing value**
- Uncertainty in each missing value will cascade through the model
	- again, no need to be clever
		- trust the axioms of probability

## Modeling missing data for multiple variables simultaneously

### M,G,B all have missing values M∗,G∗,B∗

```
utils.draw_causal_graph(
    edge_list=[
        ("M", "G"),
        ("M", "B"),
        ("G", "B"),
        ("M", "M*"),
        ("G", "G*"),
        ("B", "B*"),
        ("mM", "M*"),
        ("mB", "B*"),
        ("mG", "G*"),
        ("H", "u"),
        ("u", "G"),
        ("u", "M"),
        ("u", "B"),
    ],
    node_props={
        "G": {"style": "dashed"},
        "M": {"style": "dashed"},
        "B": {"style": "dashed"},
        "unobserved": {"style": "dashed"},
    },
    graph_direction="LR",
)
```

![../_images/1952cd1865845d2cc0a0ff373a0df817bb19d717d1db8eb86d5b9a25d17cd8ba.svg](https://www.pymc.io/projects/examples/en/latest/_images/1952cd1865845d2cc0a0ff373a0df817bb19d717d1db8eb86d5b9a25d17cd8ba.svg)

### Dealing with missing values in Brain Size B

It turns out we already handled this using Gaussian processes in the original Phylogenetic Regression example. By leveraging local pooling offered by the Gaussian process, we fill in missing brain size $B$ values using information from species that are similar those species with missing values, but *do* have values for $B$.

The equivalent causal-sub-graph used to modele Brain Size in the “Phylogenetic Regression” section of

#### Brain Size B Model

Assuming missingness is totally at random

```
utils.draw_causal_graph(
    edge_list=[("G", "B"), ("M", "B"), ("u, D", "B"), ("H", "u, D")], graph_direction="LR"
)
```

![../_images/8380dcc2e52d18f81e34fcc47d2a86c9e43fb87c6798f5b0f68a4212a17b01d8.svg](https://www.pymc.io/projects/examples/en/latest/_images/8380dcc2e52d18f81e34fcc47d2a86c9e43fb87c6798f5b0f68a4212a17b01d8.svg) 
$$
\begin{matrix}\textbf{B} & sim \text{MVNormal} \left(\right. \mu_{B} , \textbf{K}_{B} \left.\right) \\ \mu_{B , i} & = \alpha_{B} + \beta_{G B} G_{i} + \beta_{M B} M_{i} \\ \mathbf{K}_{B} & = \eta_{B}^{2} exp ⁡ \left(\right. - \rho_{B} D_{j k} \left.\right) \\ \alpha_{B} & sim \text{Normal} \left(\right. 0 , 1 \left.\right) \\ \beta_{G B , M B} & sim \text{Normal} \left(\right. 0 , 1 \left.\right) \\ \eta_{B}^{2} & sim \text{HalfNormal} \left(\right. 1 , 0.25 \left.\right) \\ \rho_{B} & sim \text{HalfNormal} \left(\right. 3 , 0.25 \left.\right)\end{matrix}
$$

We can use a simular approach to simultaneously formulate parallel models for the other variables $G , M$ that may have missing values, a’ la Full Luxury Bayes.

#### Group Size G Model

```
utils.draw_causal_graph(edge_list=[("M", "G"), ("u, D", "G"), ("H", "u, D")], graph_direction="LR")
```

![../_images/cbc11b16a519f93131c5506268ee04b5dc7a2f6eba35df44cffa3a684c5ae9d2.svg](https://www.pymc.io/projects/examples/en/latest/_images/cbc11b16a519f93131c5506268ee04b5dc7a2f6eba35df44cffa3a684c5ae9d2.svg) 
$$
\begin{matrix}\textbf{G} & sim \text{MVNormal} \left(\right. \mu_{G} , \textbf{K}_{G} \left.\right) \\ \mu_{G , i} & = \alpha_{G} + \beta_{M G} M_{i} \\ \mathbf{K}_{G} & = \eta_{G}^{2} exp ⁡ \left(\right. - \rho_{G} D_{j k} \left.\right) \\ \alpha_{G} & sim \text{Normal} \left(\right. 0 , 1 \left.\right) \\ \beta_{M G} & sim \text{Normal} \left(\right. 0 , 1 \left.\right) \\ \eta_{G}^{2} & sim \text{HalfNormal} \left(\right. 1 , 0.25 \left.\right) \\ \rho_{G} & sim \text{HalfNormal} \left(\right. 3 , 0.25 \left.\right)\end{matrix}
$$

#### Body Mass M model

```
utils.draw_causal_graph(edge_list=[("u, D", "M"), ("H", "u, D")], graph_direction="LR")
```

![../_images/41c538db3aa647e0a24b0d9ba28e5ace56651185fe32c6ab17c651cbf336b173.svg](https://www.pymc.io/projects/examples/en/latest/_images/41c538db3aa647e0a24b0d9ba28e5ace56651185fe32c6ab17c651cbf336b173.svg) 
$$
\begin{matrix}\textbf{M} & sim \text{MVNormal} \left(\right. 0 , \textbf{K}_{M} \left.\right) \\ \mathbf{K}_{M} & = \eta_{M}^{2} exp ⁡ \left(\right. - \rho_{M} D_{j k} \left.\right) \\ \eta_{M}^{2} & sim \text{HalfNormal} \left(\right. 1 , 0.25 \left.\right) \\ \rho_{M} & sim \text{HalfNormal} \left(\right. 3 , 0.25 \left.\right)\end{matrix}
$$

## Drawing the missing owl 🦉

Building a model containing three simultaneous Gaussian processes has a lot of working parts. It’s better to build up model complexity in small steps.

1. Ignore cases with missing $B$ values (for now)
	- $B$ is the outcome, so any imputation would just be prediction
2. Impute $G , M$ ignoring models for each
	- wrong model, correct process
		- allows us to see the consequences of adding complexity to model
3. Impute $G$ using a $G$ -specific submodel
4. Impute $B , G , M$ using a submodel for each

### 1\. Ignore cases with missing B values

#### Filter out observations missing brain volume measurments

```
PRIMATES = PRIMATES301[PRIMATES301.brain.notna()]
PRIMATES
```

|  | name | genus | species | subspecies | spp\_id | genus\_id | social\_learning | research\_effort | brain | body | group\_size | gestation | weaning | longevity | sex\_maturity | maternal\_investment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Allenopithecus\_nigroviridis | Allenopithecus | nigroviridis | NaN | 1 | 1 | 0.0 | 6.0 | 58.02 | 4655.0 | 40.00 | NaN | 106.15 | 276.0 | NaN | NaN |
| 2 | Alouatta\_belzebul | Alouatta | belzebul | NaN | 3 | 3 | 0.0 | 15.0 | 52.84 | 6395.0 | 7.40 | NaN | NaN | NaN | NaN | NaN |
| 3 | Alouatta\_caraya | Alouatta | caraya | NaN | 4 | 3 | 0.0 | 45.0 | 52.63 | 5383.0 | 8.90 | 185.92 | 323.16 | 243.6 | 1276.72 | 509.08 |
| 4 | Alouatta\_guariba | Alouatta | guariba | NaN | 5 | 3 | 0.0 | 37.0 | 51.70 | 5175.0 | 7.40 | NaN | NaN | NaN | NaN | NaN |
| 5 | Alouatta\_palliata | Alouatta | palliata | NaN | 6 | 3 | 3.0 | 79.0 | 49.88 | 6250.0 | 13.10 | 185.42 | 495.60 | 300.0 | 1578.42 | 681.02 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |
| 295 | Trachypithecus\_phayrei | Trachypithecus | phayrei | NaN | 296 | 67 | 0.0 | 16.0 | 72.84 | 7475.0 | 12.90 | 180.61 | 305.87 | NaN | NaN | 486.48 |
| 296 | Trachypithecus\_pileatus | Trachypithecus | pileatus | NaN | 297 | 67 | 0.0 | 5.0 | 103.64 | 11794.0 | 8.50 | NaN | NaN | NaN | NaN | NaN |
| 298 | Trachypithecus\_vetulus | Trachypithecus | vetulus | NaN | 299 | 67 | 0.0 | 2.0 | 61.29 | 6237.0 | 8.35 | 204.72 | 245.78 | 276.0 | 1113.70 | 450.50 |
| 299 | Varecia\_rubra | Varecia | rubra | NaN | 300 | 68 | NaN | NaN | 31.08 | 3470.0 | NaN | NaN | NaN | NaN | NaN | NaN |
| 300 | Varecia\_variegata\_variegata | Varecia | variegata | variegata | 301 | 68 | 0.0 | 57.0 | 32.12 | 3575.0 | 2.80 | 102.50 | 90.73 | 384.0 | 701.52 | 193.23 |

184 rows × 16 columns

#### Cross-tabulate missingess for G,M on the resulting dataset

```
PRIMATES.group_size.isna().sum()
```

```
33
```

```
print("Pattern of missingness:\n")
print(utils.crosstab(PRIMATES.body.notna(), PRIMATES.group_size.notna()))
print(
    f"\nCorrelation of missing values: {np.corrcoef(PRIMATES.body.isna(), PRIMATES.group_size.isna())[0][1]:0.2}"
)
```

```
Pattern of missingness:

group_size  False  True 
body                    
False           2      0
True           31    151

Correlation of missing values: 0.22
```

- True: Observed
- False: Missing
- Group size $G$ missing a lot of values (33)
- Some correlation between the presence/absence of each variable

### 2\. Impute G,M naively, ignoring models for each

Idea here is to treat $G , M$ as independent random variables with no causes, e.g. standard Normals.

$$
M_{i} , G_{i} sim \text{Normal} \left(\right. 0 , 1 \left.\right)
$$
- This is not the correct model, but the correct starting place to build up the model gradually
- Interpretation:
	- When $G_{i}$ is observed, the distribution is the likelihood for a standardized variable
		- When $G_{i}$ is missing, the distribution is the prior for the “parameter”

#### Fit the impuatation model that ignores the submodels for G,M

##### Load the phlogenetic distance matrix

```
PRIMATES_DISTANCE_MATRIX = utils.load_data("Primates301_distance_matrix").values

# Filter out cases without $B$ values from the raw distance matrix
PRIMATES_DISTANCE_MATRIX = PRIMATES_DISTANCE_MATRIX[PRIMATES.index][:, PRIMATES.index]

# Rescale distances
D_mat = PRIMATES_DISTANCE_MATRIX / PRIMATES_DISTANCE_MATRIX.max()
assert D_mat.max() == 1
```

```
# Preprocess the data
G_obs = utils.standardize(np.log(PRIMATES.group_size.values))
N_G_missing = np.isnan(G_obs).sum()
M_obs = utils.standardize(np.log(PRIMATES.body.values))
N_M_missing = np.isnan(M_obs).sum()
B_obs = utils.standardize(np.log(PRIMATES.brain.values))
N_obs = len(B_obs)
```

#### Fit the naive imputation model

Below is an implementation that uses PyMC’s Gaussian process module.

```
PRIMATE_ID, PRIMATE = pd.factorize(PRIMATES["name"], sort=False)
coords = {"primate": PRIMATE}

class MeanBodyMassSocialGroupSize(pm.gp.mean.Linear):
    """
    Custom mean function that separates Social Group Size and
    Body Mass effects from phylogeny
    """

    def __init__(self, alpha, beta_G, beta_M, G, M):
        self.alpha = alpha
        self.beta_G = beta_G
        self.beta_M = beta_M
        self.G = G
        self.M = M

    def __call__(self, X):
        return self.alpha + self.beta_G * self.G + self.beta_M * self.M

# with pm.Model(coords=coords) as naive_imputation_model:

#     # Priors
#     alpha = pm.Normal("alpha", 0, 1)
#     beta_G = pm.Normal("beta_G", 0, 0.5)
#     beta_M = pm.Normal("beta_M", 0, 0.5)
#     sigma = pm.Exponential("sigma", 1)

#     # Naive imputation for G, M
#     G = pm.Normal("G", 0, 1, observed=G_obs, dims='primate')
#     M = pm.Normal("M", 0, 1, observed=M_obs, dims='primate')

#     mean_func = MeanBodyMassSocialGroupSize(alpha, beta_G, beta_M, G, M)

#     # Phylogenetic distance covariance prior, L1-kernel function
#     eta_squared = pm.TruncatedNormal("eta_squared", 1, .25, lower=.01)
#     rho = pm.TruncatedNormal("rho", 3, .25, lower=.01)
#     cov_func = eta_squared * pm.gp.cov.Exponential(1, ls=rho)

#     gp = pm.gp.Marginal(mean_func=mean_func, cov_func=cov_func)
#     gp.marginal_likelihood("B", X=D_mat, y=B_obs, noise=sigma)

#     naive_imputation_inference = pm.sample(cores=1)
```

Below is an alternative implementation that builds the covariance function by hand, and directly models the dataset as a `MVNormal` with mean being the linear function of $G$ and $M$, and covariance defined by the kernel. I find that these `MVNormal` implementations track better with the results from the lecture.

```
def generate_L1_kernel_matrix(D, eta_squared, rho, smoothing=0.01):
    K = eta_squared * pm.math.exp(-rho * D)
    # Smooth the diagonal of the covariance matrix
    N = D.shape[0]
    K += np.eye(N) * smoothing
    return K

coords = {"primate": PRIMATES["name"].values}
with pm.Model(coords=coords) as naive_imputation_model:

    # Priors
    alpha = pm.Normal("alpha", 0, 1)
    beta_G = pm.Normal("beta_G", 0, 0.5)
    beta_M = pm.Normal("beta_M", 0, 0.5)

    # Phylogenetic distance covariance prior, L1-kernel function
    eta_squared = pm.TruncatedNormal("eta_squared", 1, 0.25, lower=0.001)
    rho = pm.TruncatedNormal("rho", 3, 0.25, lower=0.001)
    # K = pm.Deterministic('K', generate_L1_kernel_matrix(D_mat, eta_squared, rho))
    K = pm.Deterministic("K", eta_squared * pm.math.exp(-rho * D_mat))

    # Naive imputation for G, M
    G = pm.Normal("G", 0, 1, observed=G_obs, dims="primate")
    M = pm.Normal("M", 0, 1, observed=M_obs, dims="primate")

    # Likelihood for B
    mu = alpha + beta_G * G + beta_M * M
    pm.MvNormal("B", mu=mu, cov=K, observed=B_obs)

    naive_imputation_inference = pm.sample()
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, beta_G, beta_M, eta_squared, rho, G_unobserved, M_unobserved]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 101 seconds.
```

#### Demonstrate the effect of imputation

##### M Imputation

```
# Now all $M$ have imputed values
az.summary(naive_imputation_inference, var_names=["M"])
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M\[Allenopithecus\_nigroviridis\] | 0.335 | 0.0 | 0.335 | 0.335 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Alouatta\_belzebul\] | 0.542 | 0.0 | 0.542 | 0.542 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Alouatta\_caraya\] | 0.430 | 0.0 | 0.430 | 0.430 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Alouatta\_guariba\] | 0.404 | 0.0 | 0.404 | 0.404 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Alouatta\_palliata\] | 0.527 | 0.0 | 0.527 | 0.527 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |
| M\[Trachypithecus\_phayrei\] | 0.643 | 0.0 | 0.643 | 0.643 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Trachypithecus\_pileatus\] | 0.940 | 0.0 | 0.940 | 0.940 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Trachypithecus\_vetulus\] | 0.526 | 0.0 | 0.526 | 0.526 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Varecia\_rubra\] | 0.144 | 0.0 | 0.144 | 0.144 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |
| M\[Varecia\_variegata\_variegata\] | 0.164 | 0.0 | 0.164 | 0.164 | 0.0 | 0.0 | 4000.0 | 4000.0 | NaN |

184 rows × 9 columns

##### Prior values for M

```
print("Number of missing M values:", N_M_missing)
az.summary(naive_imputation_inference, var_names=["M_unobserved"])
```

```
Number of missing M values: 2
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M\_unobserved\[0\] | \-1.683 | 0.235 | \-2.110 | \-1.231 | 0.002 | 0.002 | 9282.0 | 2806.0 | 1.0 |
| M\_unobserved\[1\] | \-0.738 | 0.095 | \-0.924 | \-0.561 | 0.001 | 0.001 | 8413.0 | 3121.0 | 1.0 |

##### G Imputation

```
# Now all $G$ have imputed values
az.summary(naive_imputation_inference, var_names=["G"])
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G\[Allenopithecus\_nigroviridis\] | 1.402 | 0.000 | 1.402 | 1.402 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Alouatta\_belzebul\] | 0.003 | 0.000 | 0.003 | 0.003 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Alouatta\_caraya\] | 0.156 | 0.000 | 0.156 | 0.156 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Alouatta\_guariba\] | 0.003 | 0.000 | 0.003 | 0.003 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Alouatta\_palliata\] | 0.477 | 0.000 | 0.477 | 0.477 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |
| G\[Trachypithecus\_phayrei\] | 0.464 | 0.000 | 0.464 | 0.464 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Trachypithecus\_pileatus\] | 0.118 | 0.000 | 0.118 | 0.118 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Trachypithecus\_vetulus\] | 0.103 | 0.000 | 0.103 | 0.103 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |
| G\[Varecia\_rubra\] | 0.037 | 0.978 | \-1.812 | 1.864 | 0.01 | 0.017 | 8945.0 | 2991.0 | 1.0 |
| G\[Varecia\_variegata\_variegata\] | \-0.802 | 0.000 | \-0.802 | \-0.802 | 0.00 | 0.000 | 4000.0 | 4000.0 | NaN |

184 rows × 9 columns

##### Prior Values for G

```
print("Number of missing G values:", N_G_missing)
az.summary(naive_imputation_inference, var_names=["G_unobserved"])
```

```
Number of missing G values: 33
```

|  | mean | sd | hdi\_3% | hdi\_97% | mcse\_mean | mcse\_sd | ess\_bulk | ess\_tail | r\_hat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G\_unobserved\[0\] | \-0.210 | 1.032 | \-2.186 | 1.686 | 0.011 | 0.017 | 8286.0 | 3046.0 | 1.0 |
| G\_unobserved\[1\] | \-0.009 | 0.987 | \-1.817 | 1.830 | 0.011 | 0.018 | 7500.0 | 2663.0 | 1.0 |
| G\_unobserved\[2\] | 0.004 | 0.990 | \-1.934 | 1.695 | 0.010 | 0.017 | 9082.0 | 3121.0 | 1.0 |
| G\_unobserved\[3\] | \-0.106 | 1.015 | \-1.947 | 1.805 | 0.011 | 0.019 | 8395.0 | 2736.0 | 1.0 |
| G\_unobserved\[4\] | \-0.073 | 0.981 | \-1.966 | 1.665 | 0.010 | 0.017 | 10506.0 | 2984.0 | 1.0 |
| G\_unobserved\[5\] | 0.030 | 1.011 | \-1.730 | 2.027 | 0.010 | 0.018 | 10854.0 | 2924.0 | 1.0 |
| G\_unobserved\[6\] | 0.006 | 1.023 | \-1.947 | 1.919 | 0.010 | 0.019 | 9689.0 | 2606.0 | 1.0 |
| G\_unobserved\[7\] | \-0.030 | 1.013 | \-2.039 | 1.724 | 0.011 | 0.019 | 8734.0 | 2729.0 | 1.0 |
| G\_unobserved\[8\] | \-0.035 | 1.025 | \-1.955 | 1.857 | 0.010 | 0.019 | 9599.0 | 2984.0 | 1.0 |
| G\_unobserved\[9\] | \-0.014 | 0.978 | \-1.922 | 1.740 | 0.010 | 0.018 | 8977.0 | 2510.0 | 1.0 |
| G\_unobserved\[10\] | \-0.023 | 0.987 | \-1.903 | 1.762 | 0.010 | 0.019 | 9082.0 | 2721.0 | 1.0 |
| G\_unobserved\[11\] | \-0.054 | 1.022 | \-1.922 | 1.831 | 0.010 | 0.018 | 9495.0 | 3107.0 | 1.0 |
| G\_unobserved\[12\] | \-0.022 | 1.011 | \-2.052 | 1.740 | 0.011 | 0.019 | 9152.0 | 2668.0 | 1.0 |
| G\_unobserved\[13\] | \-0.041 | 1.020 | \-1.917 | 1.895 | 0.009 | 0.019 | 12250.0 | 3031.0 | 1.0 |
| G\_unobserved\[14\] | 0.034 | 1.004 | \-1.847 | 1.870 | 0.010 | 0.018 | 9677.0 | 2851.0 | 1.0 |
| G\_unobserved\[15\] | 0.000 | 1.029 | \-1.925 | 1.928 | 0.011 | 0.019 | 8374.0 | 2855.0 | 1.0 |
| G\_unobserved\[16\] | 0.033 | 0.996 | \-1.959 | 1.784 | 0.010 | 0.017 | 9770.0 | 2902.0 | 1.0 |
| G\_unobserved\[17\] | 0.253 | 0.989 | \-1.584 | 2.117 | 0.012 | 0.016 | 6784.0 | 3225.0 | 1.0 |
| G\_unobserved\[18\] | 0.233 | 1.017 | \-1.618 | 2.182 | 0.012 | 0.017 | 7403.0 | 3166.0 | 1.0 |
| G\_unobserved\[19\] | \-0.009 | 1.022 | \-1.810 | 1.947 | 0.011 | 0.019 | 8880.0 | 2995.0 | 1.0 |
| G\_unobserved\[20\] | 0.058 | 1.021 | \-1.771 | 2.078 | 0.011 | 0.020 | 8258.0 | 2748.0 | 1.0 |
| G\_unobserved\[21\] | 0.003 | 1.013 | \-1.863 | 1.987 | 0.011 | 0.018 | 9313.0 | 2865.0 | 1.0 |
| G\_unobserved\[22\] | \-0.010 | 1.008 | \-1.938 | 1.762 | 0.011 | 0.018 | 8994.0 | 3179.0 | 1.0 |
| G\_unobserved\[23\] | 0.025 | 0.990 | \-1.836 | 1.873 | 0.010 | 0.017 | 9597.0 | 2876.0 | 1.0 |
| G\_unobserved\[24\] | 0.023 | 1.011 | \-1.910 | 1.861 | 0.011 | 0.019 | 8736.0 | 3096.0 | 1.0 |
| G\_unobserved\[25\] | \-0.048 | 1.004 | \-1.950 | 1.758 | 0.011 | 0.017 | 7598.0 | 2974.0 | 1.0 |
| G\_unobserved\[26\] | \-0.049 | 0.994 | \-1.998 | 1.702 | 0.010 | 0.019 | 9390.0 | 2874.0 | 1.0 |
| G\_unobserved\[27\] | \-0.003 | 0.995 | \-1.921 | 1.828 | 0.011 | 0.019 | 8586.0 | 2534.0 | 1.0 |
| G\_unobserved\[28\] | \-0.012 | 1.025 | \-1.976 | 1.753 | 0.010 | 0.018 | 10703.0 | 3207.0 | 1.0 |
| G\_unobserved\[29\] | 0.009 | 0.997 | \-1.816 | 1.904 | 0.010 | 0.018 | 9673.0 | 2836.0 | 1.0 |
| G\_unobserved\[30\] | 0.234 | 1.038 | \-1.666 | 2.173 | 0.012 | 0.017 | 6993.0 | 2869.0 | 1.0 |
| G\_unobserved\[31\] | \-0.022 | 0.985 | \-1.909 | 1.861 | 0.011 | 0.018 | 8694.0 | 2780.0 | 1.0 |
| G\_unobserved\[32\] | 0.037 | 0.978 | \-1.812 | 1.864 | 0.010 | 0.017 | 8945.0 | 2991.0 | 1.0 |

#### Plot posterior imputation

```
def plot_posterior_imputation(
    xvar, yvar, inference, impute_color="C0", impute_x=False, impute_y=False, title=None
):
    plot_data = pd.DataFrame({"G": G_obs, "M": M_obs, "B": B_obs})
    # Plot observed
    utils.plot_scatter(plot_data[xvar], plot_data[yvar], color="k", label="observed")

    # Get and plot imputed
    impute_x_values = None
    impute_y_values = None
    if impute_x and f"{xvar}_unobserved" in inference.posterior:
        x_impute_idx = plot_data[plot_data[xvar].isnull()].index.values
        impute_x_values = az.summary(inference, var_names=[f"{xvar}_unobserved"])["mean"].values

    if impute_y and f"{yvar}_unobserved" in inference.posterior:
        y_impute_idx = plot_data[plot_data[yvar].isnull()].index.values
        impute_y_values = az.summary(inference, var_names=[f"{yvar}_unobserved"])["mean"].values

    if impute_x_values is None:
        impute_x_values = plot_data.loc[y_impute_idx, xvar].values

    if impute_y_values is None:
        impute_y_values = plot_data.loc[x_impute_idx, yvar].values

    utils.plot_scatter(
        impute_x_values, impute_y_values, color=impute_color, label="imputed", alpha=1, s=100
    )

    plt.xlabel(f"${xvar}$ (standardized)")
    plt.ylabel(f"${yvar}$ (standardized)")
    plt.legend()
    plt.title(title)
```

#### Looking at imputed values

```
plot_posterior_imputation(
    "M", "B", naive_imputation_inference, impute_x=True, title="Naviely Imputed $M$ values with $B$"
)
```

![../_images/a4de3f54c84e84f5b6e4e2961542aadc23823f1cdf52ab817c063fc71fc60893.png](https://www.pymc.io/projects/examples/en/latest/_images/a4de3f54c84e84f5b6e4e2961542aadc23823f1cdf52ab817c063fc71fc60893.png)
- Because $M$ is strongly associated with $B$, the imputed $M$ values follow the linear relationship

```
plot_posterior_imputation(
    "M", "G", naive_imputation_inference, impute_y=True, title="Naively Imputed $M$ values with $G$"
)
```

![../_images/ede8d395d84c33a6433d56143d9a513aadfd861e7558e6b5cb167db092764ed2.png](https://www.pymc.io/projects/examples/en/latest/_images/ede8d395d84c33a6433d56143d9a513aadfd861e7558e6b5cb167db092764ed2.png)
- Because the association between $M$ and $G$ isn’t modeled, imputed values doesn’t follow the linear trend between $M$ and $G$
- We’ve left some information on the table; this is the result of ignoring the full generative model

### Complete case model for comparison

Here we’ll fit a complet-cases-only model where there’s no need for imputation, but we throw away data.

```
# Complete Case
PRIMATES_CC = PRIMATES301.query(
    "brain.notnull() and body.notnull() and group_size.notnull()", engine="python"
)

G_CC = utils.standardize(np.log(PRIMATES_CC.group_size.values))
M_CC = utils.standardize(np.log(PRIMATES_CC.body.values))
B_CC = utils.standardize(np.log(PRIMATES_CC.brain.values))

# Get complete case distance matrix
PRIMATES_DISTANCE_MATRIX_CC = utils.load_data("Primates301_distance_matrix").values

# Filter out incomplete cases
PRIMATES_DISTANCE_MATRIX_CC = PRIMATES_DISTANCE_MATRIX_CC[PRIMATES_CC.index][:, PRIMATES_CC.index]

# Rescale distances to [0, 1]
D_mat_CC = PRIMATES_DISTANCE_MATRIX_CC / PRIMATES_DISTANCE_MATRIX_CC.max()
assert D_mat_CC.max() == 1
```

Below is an implementation that uses PyMC’s Gaussian process module.

```
# with pm.Model() as complete_case_model:

#     # Priors
#     alpha = pm.Normal("alpha", 0, 1)
#     beta_G = pm.Normal("beta_GB", 0, 0.5)
#     beta_M = pm.Normal("beta_MB", 0, 0.5)
#     sigma = pm.Exponential("sigma", 1)

#     # Phylogenetic distance covariance
#     mean_func = MeanBodyMassSocialGroupSize(alpha, beta_G, beta_M, G_CC, M_CC)

#     # Phylogenetic distance covariance prior, L1-kernel function
#     eta_squared = pm.TruncatedNormal("eta_squared", 1, .25, lower=.01)
#     rho = pm.TruncatedNormal("rho", 3, .25, lower=.01)
#     cov_func = eta_squared * pm.gp.cov.Exponential(1, ls=rho)

#     gp = pm.gp.Marginal(mean_func=mean_func, cov_func=cov_func)
#     gp.marginal_likelihood("B", X=D_mat_CC, y=B_CC, noise=sigma)

#     complete_case_inference = pm.sample(target_accept=.95)
```

Below is an alternative implementation that builds the covariance function by hand, and directly models the dataset as a `MVNormal` with mean being the linear function of $G$ and $M$, and covariance defined by the kernel. I find that these `MVNormal` implementations track better with the results from the lecture.

```
with pm.Model() as complete_case_model:

    # Priors
    alpha = pm.Normal("alpha", 0, 1)
    beta_G = pm.Normal("beta_G", 0, 0.5)
    beta_M = pm.Normal("beta_M", 0, 0.5)

    # Phylogenetic distance covariance
    eta_squared = pm.TruncatedNormal("eta_squared", 1, 0.25, lower=0.001)
    rho = pm.TruncatedNormal("rho", 3, 0.25, lower=0.001)

    K = pm.Deterministic(
        "K", generate_L1_kernel_matrix(D_mat_CC, eta_squared, rho, smoothing=0.001)
    )
    # K = pm.Deterministic('K', eta_squared * pm.math.exp(-rho * D_mat_CC))

    # Likelihood
    mu = alpha + beta_G * G_CC + beta_M * M_CC
    pm.MvNormal("B", mu=mu, cov=K, observed=B_CC)
    complete_case_inference = pm.sample()
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha, beta_G, beta_M, eta_squared, rho]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 27 seconds.
```

### Compare posteriors for naively-imputed and complete case model

```
az.plot_dist(complete_case_inference.posterior["beta_G"], label="complete case", color="k")
az.plot_dist(naive_imputation_inference.posterior["beta_G"], label="imputed", color="C0")
plt.axvline(0, linestyle="--", color="k", label="no effect")
plt.xlabel("effect of Social Group size on Brain size, $\\beta_G$")
plt.ylabel("density")
plt.legend();
```

![../_images/90d0b5b0d3b4dcdae2eaf38d0f987cbdd5ae91f94e64522858bedb983a55d3e9.png](https://www.pymc.io/projects/examples/en/latest/_images/90d0b5b0d3b4dcdae2eaf38d0f987cbdd5ae91f94e64522858bedb983a55d3e9.png)
- we can see that the posterior for the imputed model attenuates the effect of Group size on Brain Size

### 3\. Impute G using a G-specific submodels

Add the generative model for Group Size. But, again, we’ll do this in baby steps, slowly building complexity

1. Model that only models effect of body mass on group size $M \rightarrow G$
2. Model that only includes Social group phylogentic interactions
3. Model that combines phylogeny and $M \rightarrow G$

#### 1\. Model that only models effect of body mass on group size M→G

Below is an implementation that uses PyMC’s Gaussian process module.

```
# PRIMATE_ID, PRIMATE = pd.factorize(PRIMATES['name'].values)
# coords = {'primate': PRIMATE}

# with pm.Model(coords=coords) as G_body_mass_model:

#     # Priors
#     alpha_G = pm.Normal("alpha_G", 0, 1)
#     beta_MG = pm.Normal("beta_MG", 0, 0.5)
#     sigma_G = pm.Exponential("sigma_G", 1)

#     alpha_B = pm.Normal("alpha_B", 0, 1)
#     beta_GB = pm.Normal("beta_GB", 0, 0.5)
#     beta_MB = pm.Normal("beta_MB", 0, 0.5)
#     sigma_B = pm.Exponential("sigma_B", 1)

#     # Naive imputation for M
#     M = pm.Normal("M", 0, 1, observed=M_obs, dims='primate')

#     # G model M->G (performs imputation)
#     mu_G = alpha_G + beta_MG * M
#     G = pm.Normal("G", mu_G, sigma_G, observed=G_obs)

#     # B Model
#     eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, .25, lower=.01)
#     rho_B = pm.TruncatedNormal("rho_B", 3, .25, lower=.01)
#     cov_func_B = eta_squared_B * pm.gp.cov.Exponential(1, ls=rho_B)
#     mean_func_B = MeanBodyMassSocialGroupSize(alpha_B, beta_GB, beta_MB, G, M)

#     # Gaussian Process
#     gp_B = pm.gp.Marginal(mean_func=mean_func_B, cov_func=cov_func_B)
#     gp_B.marginal_likelihood("B", X=D_mat, y=B_obs, noise=sigma_B)

#     G_body_mass_inference = pm.sample(target_accept=.95, cores=1)
```

Below is an alternative implementation that builds the covariance function by hand, and directly models the dataset as a `MVNormal` with mean being the linear function of $G$ and $M$, and covariance defined by the kernel. I find that these `MVNormal` implementations track better with the results from the lecture.

```
PRIMATE_ID, PRIMATE = pd.factorize(PRIMATES["name"].values)
coords = {"primate": PRIMATE}

with pm.Model(coords=coords) as G_body_mass_model:

    # Priors
    alpha_B = pm.Normal("alpha_B", 0, 1)
    beta_GB = pm.Normal("beta_GB", 0, 0.5)
    beta_MB = pm.Normal("beta_MB", 0, 0.5)

    alpha_G = pm.Normal("alpha_G", 0, 1)
    beta_MG = pm.Normal("beta_MG", 0, 0.5)
    sigma_G = pm.Exponential("sigma_G", 1)

    # Naive imputation for M
    M = pm.Normal("M", 0, 1, observed=M_obs, dims="primate")

    # Body-mass only, no interactions
    mu_G = alpha_G + beta_MG * M
    G = pm.Normal("G", mu_G, sigma_G, observed=G_obs)

    # B Model
    eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, 0.25, lower=0.001)
    rho_B = pm.TruncatedNormal("rho_B", 3, 0.25, lower=0.001)
    K_B = pm.Deterministic("K_B", eta_squared_B * pm.math.exp(-rho_B * D_mat))

    # Likelihood for B
    mu_B = alpha_B + beta_GB * G + beta_MB * M
    pm.MvNormal("B", mu=mu_B, cov=K_B, observed=B_obs)

    G_body_mass_inference = pm.sample()
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha_B, beta_GB, beta_MB, alpha_G, beta_MG, sigma_G, M_unobserved, G_unobserved, eta_squared_B, rho_B]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 103 seconds.
```

##### Look at M→G-only imputation

```
plot_posterior_imputation(
    "M", "G", G_body_mass_inference, impute_y=True, title="$M \\rightarrow G$ model"
)
```

![../_images/f47951d1436c94d90c98a0d7ac378c0b0aba37ca8dbf0c16f7f118ffd2d777e5.png](https://www.pymc.io/projects/examples/en/latest/_images/f47951d1436c94d90c98a0d7ac378c0b0aba37ca8dbf0c16f7f118ffd2d777e5.png)
- By modeling the effect of $M$ on $G$, we’re able to capture the linear trend for; imputed variables lie along this trend
- However, by ignoring phylogenetic similarity, we aren’t able to capture nonlinearities in the data
	- e.g. some species with small group size lying along the lower left of the plot do not follow the linear trend

#### 2\. Model that only includes Social group phylogentic interactions

Below is an implementation that uses PyMC’s Gaussian process module.

```
# PRIMATE_ID, PRIMATE = pd.factorize(PRIMATES['name'].values)
# coords = {'primate': PRIMATE}

# with pm.Model(coords=coords) as G_phylogeny_model:

#     # Priors
#     alpha_G = pm.Normal("alpha_G", 0, 1)
#     sigma_G = pm.Exponential("sigma_G", 1)

#     alpha_B = pm.Normal("alpha_B", 0, 1)
#     beta_GB = pm.Normal("beta_GB", 0, 0.5)
#     beta_MB = pm.Normal("beta_MB", 0, 0.5)
#     sigma_B = pm.Exponential("sigma_B", 1)

#     # Naive imputation for M
#     M = pm.Normal("M", 0, 1, observed=M_obs, dims='primate')

#     # G model, interactions only
#     mean_func_G = MeanBodyMassSocialGroupSize(alpha_G, 0, 0, 0, 0)

#     eta_squared_G = pm.TruncatedNormal("eta_squared_G", 1, .25, lower=.01)
#     rho_G = pm.TruncatedNormal("rho_G", 3, .25, lower=.01)
#     cov_func_G = eta_squared_G * pm.gp.cov.Exponential(1, ls=rho_G)

#     gp_G = pm.gp.Marginal(mean_func=mean_func_G, cov_func=cov_func_G)
#     G = gp_G.marginal_likelihood("G", X=D_mat, y=G_obs, noise=sigma_G)

#     # B Model
#     mean_func_B = MeanBodyMassSocialGroupSize(alpha_B, beta_GB, beta_MB, G, M)

#     eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, .25, lower=.01)
#     rho_B = pm.TruncatedNormal("rho_B", 3, .25, lower=.01)
#     cov_func_B = eta_squared_B * pm.gp.cov.Exponential(1, ls=rho_B)

#     gp_B = pm.gp.Marginal(mean_func=mean_func_B, cov_func=cov_func_B)
#     gp_B.marginal_likelihood("B", X=D_mat, y=B_obs, noise=sigma_B)

#     G_phylogeny_inference = pm.sample(target_accept=.95, cores=1)
```

Below is an alternative implementation that builds the covariance function by hand, and directly models the dataset as a `MVNormal` with mean being the linear function of $G$ and $M$, and covariance defined by the kernel. I find that these `MVNormal` implementations track better with the results from lecture.

```
coords = {"primate": PRIMATES["name"].values}
with pm.Model(coords=coords) as G_phylogeny_model:

    # Priors
    alpha_B = pm.Normal("alpha_B", 0, 1)
    beta_GB = pm.Normal("beta_GB", 0, 0.5)
    beta_MB = pm.Normal("beta_MB", 0, 0.5)

    alpha_G = pm.Normal("alpha_G", 0, 1)
    beta_MG = pm.Normal("beta_MG", 0, 0.5)

    # Naive imputation for M
    M = pm.Normal("M", 0, 1, observed=M_obs, dims="primate")

    # G Model Imputation, only phylogenetic interaction
    eta_squared_G = pm.TruncatedNormal("eta_squared_G", 1, 0.25, lower=0.001)
    rho_G = pm.TruncatedNormal("rho_G", 3, 0.25, lower=0.001)
    K_G = pm.Deterministic("K_G", eta_squared_G * pm.math.exp(-rho_G * D_mat))

    mu_G = pm.math.zeros_like(B_obs)  # no linear model
    G = pm.MvNormal("G", mu=mu_G, cov=K_G, observed=G_obs)

    # B Model
    eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, 0.25, lower=0.001)
    rho_B = pm.TruncatedNormal("rho_B", 3, 0.25, lower=0.001)
    K_B = pm.Deterministic("K_B", eta_squared_B * pm.math.exp(-rho_B * D_mat))

    # Likelihood for B
    mu_B = alpha_B + beta_GB * G + beta_MB * M
    pm.MvNormal("B", mu=mu_B, cov=K_B, observed=B_obs)

    G_phylogeny_inference = pm.sample()
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha_B, beta_GB, beta_MB, alpha_G, beta_MG, M_unobserved, eta_squared_G, rho_G, G_unobserved, eta_squared_B, rho_B]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 200 seconds.
```

##### Look at phylogeny-only imputation

```
plot_posterior_imputation(
    "M", "G", G_phylogeny_inference, impute_y=True, impute_color="C1", title="Phylogeny-only Model"
)
```

![../_images/7fa4f006b711230c465e20fa9444c2e231678c0fb14bbe16ddaa313ceca8caab.png](https://www.pymc.io/projects/examples/en/latest/_images/7fa4f006b711230c465e20fa9444c2e231678c0fb14bbe16ddaa313ceca8caab.png)

⚠️ for some reason, after trying two different implementation of GPs using PyMCs `gp` module, as well as using `MVNormal` likelihood (both give similar results), I’m not able to replicate the imputation for solo primates presented in lecture.

**Comments and suggestions are welcome on what I may be doing incorrectly here**

#### 3\. Fit model that combines phylogeny and M→G

Below is an implementation that implements the model using PyMC’s Gaussian process module.

```
# PRIMATE_ID, PRIMATE = pd.factorize(PRIMATES['name'].values)
# coords = {'primate': PRIMATE}

# with pm.Model(coords=coords) as G_imputation_model:

#     # Priors
#     alpha_G = pm.Normal("alpha_G", 0, 1)
#     beta_MG = pm.Normal("beta_MG", 0, 1)
#     sigma_G = pm.Exponential("sigma_G", 1)

#     alpha_B = pm.Normal("alpha_B", 0, 1)
#     beta_GB = pm.Normal("beta_GB", 0, 0.5)
#     beta_MB = pm.Normal("beta_MB", 0, 0.5)
#     sigma_B = pm.Exponential("sigma_B", 1)

#     # Naive imputation for M
#     M = pm.Normal("M", 0, 1, observed=M_obs, dims='primate')

#     # G model, interactions only
#     mean_func_G = MeanBodyMassSocialGroupSize(alpha_G, 0, beta_MG, 0, M)

#     eta_squared_G = pm.TruncatedNormal("eta_squared_G", 1, .25, lower=.01)
#     rho_G = pm.TruncatedNormal("rho_G", 3, .25, lower=.01)
#     cov_func_G = eta_squared_G * pm.gp.cov.Exponential(1, ls=rho_G)

#     gp_G = pm.gp.Marginal(mean_func=mean_func_G, cov_func=cov_func_G)
#     G = gp_G.marginal_likelihood("G", X=D_mat, y=G_obs, noise=sigma_G)

#     # B Model
#     mean_func_B = MeanBodyMassSocialGroupSize(alpha_B, beta_GB, beta_MB, G, M)

#     eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, .25, lower=.01)
#     rho_B = pm.TruncatedNormal("rho_B", 3, .25, lower=.01)
#     cov_func_B = eta_squared_B * pm.gp.cov.Exponential(1, ls=rho_B)

#     gp_B = pm.gp.Marginal(mean_func=mean_func_B, cov_func=cov_func_B)
#     gp_B.marginal_likelihood("B", X=D_mat, y=B_obs, noise=sigma_B)

#     G_imputation_inference = pm.sample(target_accept=.95, cores=1)
```

Below is an alternative implementation that builds the covariance function by hand, and directly models the dataset as a `MVNormal` with mean being the linear function of $G$ and $M$, and covariance defined by the kernel. I find that these `MVNormal` implementations track better with the results from lecture.

```
coords = {"primate": PRIMATES["name"].values}
with pm.Model(coords=coords) as G_imputation_model:

    # Priors
    alpha_B = pm.Normal("alpha_B", 0, 1)
    beta_GB = pm.Normal("beta_GB", 0, 0.5)
    beta_MB = pm.Normal("beta_MB", 0, 0.5)

    alpha_G = pm.Normal("alpha_G", 0, 1)
    beta_MG = pm.Normal("beta_MG", 0, 0.5)

    # Naive imputation for M
    M = pm.Normal("M", 0, 1, observed=M_obs, dims="primate")

    # G Model Imputation
    eta_squared_G = pm.TruncatedNormal("eta_squared_G", 1, 0.25, lower=0.001)
    rho_G = pm.TruncatedNormal("rho_G", 3, 0.25, lower=0.001)

    K_G = pm.Deterministic("K_G", eta_squared_G * pm.math.exp(-rho_G * D_mat))
    mu_G = alpha_G + beta_MG * M
    G = pm.MvNormal("G", mu=mu_G, cov=K_G, observed=G_obs)

    # B Model
    eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, 0.25, lower=0.001)
    rho_B = pm.TruncatedNormal("rho_B", 3, 0.25, lower=0.001)
    K_B = pm.Deterministic("K_B", eta_squared_B * pm.math.exp(-rho_B * D_mat))

    # Likelihood for B
    mu_B = alpha_B + beta_GB * G + beta_MB * M
    pm.MvNormal("B", mu=mu_B, cov=K_B, observed=B_obs)

    G_imputation_inference = pm.sample()
```

```
Initializing NUTS using jitter+adapt_diag...
Multiprocess sampling (4 chains in 4 jobs)
NUTS: [alpha_B, beta_GB, beta_MB, alpha_G, beta_MG, M_unobserved, eta_squared_G, rho_G, G_unobserved, eta_squared_B, rho_B]
```

```
Sampling 4 chains for 1_000 tune and 1_000 draw iterations (4_000 + 4_000 draws total) took 193 seconds.
```

```
plot_posterior_imputation(
    "M",
    "G",
    G_imputation_inference,
    impute_y=True,
    impute_color="C4",
    title="Phylogeny + $M \\rightarrow G$ model",
)
```

![../_images/45b4f3d9989e7b32fc74cbf46d0f6558cce3f8ac4a11673e0f1ad2f41121d09a.png](https://www.pymc.io/projects/examples/en/latest/_images/45b4f3d9989e7b32fc74cbf46d0f6558cce3f8ac4a11673e0f1ad2f41121d09a.png)
- Purple points move toward the regression line

⚠️ for some reason, after trying two different implementation of GPs using PyMCs `gp` module, as well as using `MVNormal` likelihood (both give similar results), I’m not able to replicate the imputation for solo primates presented in lecture.

**Comments and suggestions are welcome on what I may be doing incorrectly here**

```
az.plot_dist(
    G_body_mass_inference.posterior["beta_GB"], color="C0", label="$M \\rightarrow G$ only"
)
az.plot_dist(G_phylogeny_inference.posterior["beta_GB"], color="C1", label="phylogeny only")
az.plot_dist(
    G_imputation_inference.posterior["beta_GB"], color="C4", label="phylogeny + $M \\rightarrow G$"
)
az.plot_dist(complete_case_inference.posterior["beta_G"], color="k", label="observed");
```

![../_images/50392f91bbb4037c23fd70bafd5bc58533c0a2331cbb0aeb2dd2ea3d5b835bb0.png](https://www.pymc.io/projects/examples/en/latest/_images/50392f91bbb4037c23fd70bafd5bc58533c0a2331cbb0aeb2dd2ea3d5b835bb0.png)

### 4\. Impute B,G,M using a submodel for each

Below is an implementation that uses PyMC’s Gaussian process module.

```
# with pm.Model() as full_model:

#     # Priors
#     sigma_M = pm.Exponential("sigma_M", 1

#     alpha_G = pm.Normal("alpha_G", 0, 1)
#     beta_MG = pm.Normal("beta_MG", 0, 1)
#     sigma_G = pm.Exponential("sigma_G", 1)

#     alpha_B = pm.Normal("alpha_B", 0, 1)
#     beta_GB = pm.Normal("beta_GB", 0, 0.5)
#     beta_MB = pm.Normal("beta_MB", 0, 0.5)
#     sigma_B = pm.Exponential("sigma_B", 1))

#     # Naive imputation for M
#     eta_squared_M = pm.TruncatedNormal("eta_squared_M", 1, .25, lower=.01)
#     rho_M = pm.TruncatedNormal("rho_M", 3, .25, lower=.01)

#     cov_func_M = eta_squared_M * pm.gp.cov.Exponential(1, ls=rho_M)
#     mean_func_M = pm.gp.mean.Zero()

#     gp_M = pm.gp.Marginal(mean_func=mean_func_M, cov_func=cov_func_M)
#     M = gp_M.marginal_likelihood("M", X=D_mat, y=M_obs, noise=sigma_M)

#     # G model, interactions only
#     mean_func_G = MeanBodyMassSocialGroupSize(alpha_G, 0, beta_MG, 0, M)

#     eta_squared_G = pm.TruncatedNormal("eta_squared_G", 1, .25, lower=.01)
#     rho_G = pm.TruncatedNormal("rho_G", 3, .25, lower=.01)
#     cov_func_G = eta_squared_G * pm.gp.cov.Exponential(1, ls=rho_G)

#     gp_G = pm.gp.Marginal(mean_func=mean_func_G, cov_func=cov_func_G)
#     G = gp_G.marginal_likelihood("G", X=D_mat, y=G_obs, noise=sigma_G)

#     # B Model
#     mean_func_B = MeanBodyMassSocialGroupSize(alpha_B, beta_GB, beta_MB, G, M)

#     eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, .25, lower=.01)
#     rho_B = pm.TruncatedNormal("rho_B", 3, .25, lower=.01)
#     cov_func_B = eta_squared_B * pm.gp.cov.Exponential(1, ls=rho_B)

#     gp_B = pm.gp.Marginal(mean_func=mean_func_B, cov_func=cov_func_B)
#     gp_B.marginal_likelihood("B", X=D_mat, y=B_obs, noise=sigma_B)

#     full_inference = pm.sample(target_accept=.95, cores=1)
```

Below is an alternative implementation that builds the covariance function by hand, and directly models the dataset as a `MVNormal` with mean being the linear function of $G$ and $M$, and covariance defined by the kernel. I find that these `MVNormal` implementations track better with the results from lecture.

```
coords = {"primate": PRIMATES["name"].values}
with pm.Model(coords=coords) as full_model:

    # Priors
    alpha_B = pm.Normal("alpha_B", 0, 1)
    beta_GB = pm.Normal("beta_GB", 0, 0.5)
    beta_MB = pm.Normal("beta_MB", 0, 0.5)

    alpha_G = pm.Normal("alpha_G", 0, 1)
    beta_MG = pm.Normal("beta_MG", 0, 0.5)

    # M model (imputation)
    eta_squared_M = pm.TruncatedNormal("eta_squared_M", 1, 0.25, lower=0.001)
    rho_M = pm.TruncatedNormal("rho_M", 3, 0.25, lower=0.001)

    K_M = pm.Deterministic("K_M", eta_squared_M * pm.math.exp(-rho_M * D_mat))
    mu_M = pm.math.zeros_like(M_obs)
    M = pm.MvNormal("M", mu=mu_M, cov=K_M, observed=M_obs)

    # G Model (imputation)
    eta_squared_G = pm.TruncatedNormal("eta_squared_G", 1, 0.25, lower=0.001)
    rho_G = pm.TruncatedNormal("rho_G", 3, 0.25, lower=0.001)

    K_G = pm.Deterministic("K_G", eta_squared_G * pm.math.exp(-rho_G * D_mat))
    mu_G = alpha_G + beta_MG * M
    G = pm.MvNormal("G", mu=mu_G, cov=K_G, observed=G_obs)

    # B Model
    eta_squared_B = pm.TruncatedNormal("eta_squared_B", 1, 0.25, lower=0.001)
    rho_B = pm.TruncatedNormal("rho_B", 3, 0.25, lower=0.001)
    K_B = pm.Deterministic("K_B", eta_squared_B * pm.math.exp(-rho_B * D_mat))

    # Likelihood for B
    mu_B = alpha_B + beta_GB * G + beta_MB * M
    pm.MvNormal("B", mu=mu_B, cov=K_B, observed=B_obs)

    full_inference = pm.sample(nuts_sampler="nutpie")
```

**Sampler Progress**

Total Chains: 4

Active Chains: 0

Finished Chains: 4

Sampling for 3 minutes

Estimated Time to Completion: now

| Progress | Draws | Divergences | Step Size | Gradients/Draw |
| --- | --- | --- | --- | --- |
|  | 2000 | 0 | 0.58 | 7 |
|  | 2000 | 0 | 0.61 | 7 |
|  | 2000 | 0 | 0.59 | 7 |
|  | 2000 | 0 | 0.59 | 7 |

```
plot_posterior_imputation(
    "M", "G", full_inference, impute_y=True, impute_color="C5", title="Full model, including M"
)
```

![../_images/2bc66172483f70b571f2739ada187348ede3332c0c65e80b00dfd614b7205774.png](https://www.pymc.io/projects/examples/en/latest/_images/2bc66172483f70b571f2739ada187348ede3332c0c65e80b00dfd614b7205774.png)

Imputation changes little from the previous model that does not directly model the causes of $M$. I would think that this is because there are only two missing $M$ values

```
az.plot_dist(
    G_body_mass_inference.posterior["beta_GB"], color="C0", label="$M \\rightarrow G$ only"
)
az.plot_dist(G_phylogeny_inference.posterior["beta_GB"], color="C1", label="phylogeny only")
az.plot_dist(
    G_imputation_inference.posterior["beta_GB"], color="C4", label="phylogeny + $M \\rightarrow G$"
)
az.plot_dist(full_inference.posterior["beta_GB"], color="C5", label="full model, including M")
az.plot_dist(complete_case_inference.posterior["beta_G"], color="k", label="observed");
```

![../_images/bd2b2db66556f41fb3c4cc8512a37e0d25ee7a86f7b6ed1a4497154c8844c8f1.png](https://www.pymc.io/projects/examples/en/latest/_images/bd2b2db66556f41fb3c4cc8512a37e0d25ee7a86f7b6ed1a4497154c8844c8f1.png)

we also get very similare effects to the phylogeny + $M \rightarrow G$ model

## Review: Imputing Primates

- **Key Idea**: missing values have probability distributions
- Think like a graph, not like a regression
- Blind imputation without relationships among predictorrs may be risky
	- take advantage of partial pooling
- Even if imputation doesn’t change results, it’s scientific duty

## Authors

- Ported to PyMC by Dustin Stansbury (2024)
- Based on Statistical Rethinking (2023) lectures by Richard McElreath

```
%load_ext watermark
%watermark -n -u -v -iv -w -p pytensor,xarray
```

```
Last updated: Tue Dec 17 2024

Python implementation: CPython
Python version       : 3.12.5
IPython version      : 8.27.0

pytensor: 2.26.4
xarray  : 2024.7.0

matplotlib : 3.9.2
arviz      : 0.19.0
xarray     : 2024.7.0
pymc       : 5.19.1
scipy      : 1.14.1
statsmodels: 0.14.2
numpy      : 1.26.4
pandas     : 2.2.2

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

- [[Missing Data Models]] — Missing data mechanisms and Bayesian imputation
