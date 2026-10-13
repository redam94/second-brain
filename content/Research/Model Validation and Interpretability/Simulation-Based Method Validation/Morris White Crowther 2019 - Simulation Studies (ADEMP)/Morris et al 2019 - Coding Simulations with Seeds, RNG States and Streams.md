---
title: "Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§4 intro p.9 (Table 5 p.9); §4.1 Random numbers: setting seeds and storing states pp.10-11 (pseudocode p.10, Stata overlap example p.11); §4.1.1 'Stream' random numbers pp.11-12 (circle figure p.11); §4.2 Start small and build up code p.12; §4.3 Using different software packages pp.12-13. arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
used_by:
  - "[[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]"
  - "[[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
aliases:
  - Random number seeds in simulation studies
  - RNG streams for parallel simulation
  - Datasets of a simulation study
  - Positive and negative controls in simulation
---

# Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams

> [!summary]
> The execution guidance of Morris, White & Crowther (2019, §4). A simulation study involves up to **four datasets** (simulated, estimates, states, performance measures; Table 5). The RNG rule is "simple but strong": **set the seed once and only once, and store the RNG state at the start of every repetition** (plus the final state). Seeding repetition $i$ from the $i$-th element of a pre-drawn vector produces **overlapping draws** (the Stata demonstration: $x_2$ reuses three of $x_1$'s four uniforms). Parallel chunks within a DGM need **separate RNG streams**; check that stochastic sub-routines (MI, bootstrap, MCMC) do not reset the seed. Build code up from **one large dataset**, include **methods with known properties** as checks, trap errors as missing values, and generate data **once** and export it to every software package so methods are matched on the same datasets.
^summary-coding-seeds-states

## Overview

"As with any coding task it is all-too-easy to obtain misleading results in a simulation study through very minor coding errors" (§4.2, p.12). §4 is the tutorial's software-engineering chapter. The paper's own Table 1 adds one organisational rule: **separate scripts** that analyse simulated datasets from scripts that analyse estimates datasets ([[Morris et al 2019 - Motivation and Review of Simulation Practice#^tbl-key-steps|Table 1]]).

## Main Content

### The four datasets (Table 5, p.9)

> [!definition] Table 5: The datasets that may be involved in a simulation study (p.9)
> | Dataset | Description |
> |---|---|
> | **Simulated** | A dataset of size $n_{\text{obs}}$ produced with some random-number generation, to which methods are applied to produce a quantity relating to the target, such as an estimate of $\theta$. |
> | **Estimates**† | $n_{\text{sim}}$ summaries from repetitions (e.g. $\hat\theta$, $\widehat{\text{SE}}(\hat\theta)$, indication of hypothesis rejection) for each combination of DGM, method and target (e.g. each estimand). |
> | **States** | $n_{\text{sim}}+1$ RNG states: the start state of each simulated dataset and the final state. |
> | **Performance measures** | Estimated performance and Monte Carlo SEs for each DGM, method and target. |
>
> † or corresponding summaries for non-estimand targets.
^def-four-datasets

### §4.1 Seeds and states (pp.10-11)

**How a PRNG works (p.10).** Each random number is a deterministic function of the generator's current *state*; the state then advances. A *seed* sets the state, but "Seeds do not necessarily map 1:1 to states, and provide doors onto the path of possible states." After enough draws the state repeats: "the path is circular."

**"Pseudo" is not a weakness (p.10).** Modern generators such as the Mersenne Twister "can, for simulation purposes, be regarded as truly random when used correctly." A coin toss is also deterministic — "many stage magicians can control the flip of a coin!" — so if a generator "is sufficiently unpredictable and passes the various tests for randomness, it is churlish to regard the 'pseudo' aspect as a weakness."

**Three benefits of determinism (p.10):**
1. If $n_{\text{sim}}$ proves insufficient, continue from the end state.
2. If a repetition fails (e.g. non-convergence), re-run it from its stored start state to understand the failure.
3. Others can reproduce the whole study exactly, and add methods.

> [!algorithm] Seed once, store states (§4.1, p.10)
> "1. set the seed at the beginning, once and only once; 2. store the state of the random-number generator often (ideally once at the beginning of each repetition and once following repetition $i=n_{\text{sim}}$)."
> ```
> SET RandomSeed to #
> FOR Repetition 1 to n_sim by 1
>   STORE Repetition and RandomNumberState in StatesData[Repetition]
>   GENERATE simulated dataset
>   ...
> END FOR
> STORE n_sim+1 and RandomNumberState in StatesData[n_sim+1]
> ```
^alg-seed-once

> [!example] Why not seed each repetition from a pre-drawn vector (§4.1, pp.10-11)
> The tempting alternative: set an initial seed, record the state, draw one number, record the new state, and so on, then seed repetition $i$ with the $i$-th recorded state. With $n_{\text{obs}}=n_{\text{sim}}=4$ and $x\sim\text{Uniform}(0,1)$, Stata 15 gives:
>
> | Repetition | Draws of $x$ |
> |---|---|
> | $x_1$ | (0.1338766, 0.1364070, 0.4512149, **0.0210242**) |
> | $x_2$ | (0.1364070, 0.4512149, **0.0210242**, 0.3508981) |
> | $x_3$ | (0.4512149, **0.0210242**, 0.3508981, 0.9113581) |
> | $x_4$ | (**0.0210242**, 0.3508981, 0.9113581, 0.4707521) |
>
> Each repetition is the previous one shifted by one: the fourth element of $x_1$ appears in all four. "Only when $i>n_{\text{obs}}$ is the draw of $x$ actually independent of the first repetition. Such dependency in simulated data can compromise both performance estimates and Monte Carlo SEs and must be avoided" (p.11).
^ex-overlapping-seeds

### §4.1.1 Stream random numbers (pp.11-12)

> [!definition] RNG streams for parallel runs (§4.1.1, p.11)
> If the seed is set once, different DGMs can be parallelised, but "it is inadvisable to parallelise repetitions within a specific data-generating mechanism" — unless streams are used.
>
> **The circle figure (p.11).** Random numbers lie on a circle; each chunk of $n_{\text{sim}}/2$ repetitions uses an arc (drawn as 80° of 360°, a caricature). *Uncontrolled parallel runs* with two arbitrary seeds may produce **overlapping arcs**. *Stream parallel runs* break the circle into separate segments ("quadrants"); the same seed within different streams starts each chunk at the equivalent point of its own segment, so "there is no chance that one stream will enter another."
>
> Syntax: Stata 15+ `set rngstream #` before setting the seed; SAS `call stream(#);` in a data step; R via the `rstream` package. "Regardless of the package, the same seed must be used within different values of #."
>
> **Technical basis (Table 1, p.3: "If running chunks of the simulation in parallel, use separate streams of random numbers (17)").** The single reference is Haramoto, Matsumoto, Nishimura, Panneton & L'Ecuyer (2008) [17], "Efficient jump ahead for $\mathbb{F}_2$-linear random number generators", *INFORMS Journal on Computing* 20(3):385-390. *Context (not stated in the paper):* generators such as the Mersenne Twister are linear over $\mathbb{F}_2$, so advancing the state by a very large number of steps can be computed directly rather than by drawing and discarding. Streams are built by jumping ahead a fixed, very large distance per stream, which is what makes the "quadrants" of the circle figure non-overlapping by construction.
^def-rng-streams

Running different DGMs in parallel with the **same** seeds is less of a problem, since performance is estimated per DGM, and "may in fact be advantageous" ([[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^def-meta-model|§5.4 matched repetitions]]).

> [!warning] Sub-routines that reset the seed (§4.1.1, pp.11-12)
> Multiple imputation, the bootstrap, g-computation, multistate models and MCMC all draw random numbers. Some packages set a default seed internally; then "many of the $n_{\text{sim}}$ results will be highly correlated, if not identical."
>
> **Test:** display the RNG state; run the command twice, displaying the state after each run.
> - First and second states equal → the program probably uses no random numbers.
> - First and second differ but second and third equal → **the program resets the seed.**
^warn-seed-reset

### §4.2 Start small and build up code (p.12)

- **Errors hide in tiny details.** In the comments on Bartlett (2016), fixing one line of code "completely changed the results." An expression such as `a-b*c` leaves unclear whether `(a-b)*c` or `a-(b*c)` was intended; "a machine will interpret this code but will not discern the intention."
- **Built-in checks via known properties.** "Errors are often detected when results are unexpected... One design implication is that methods with known properties should be included where possible as a check that these properties are exhibited."

> [!algorithm] Build-up procedure (§4.2, p.12)
> 1. Generate **one simulated dataset with large $n_{\text{obs}}$**. Add the code for each variable one at a time, checking (a) the code behaves as expected and (b) the data have the desired characteristics.
>    - Example trap: Stata's `rnormal(m,s)` takes a **standard deviation**, not a variance. Checking the SD in a large dataset exposes this — but only for DGMs with $\sigma^2\neq1$; a base case using $N(\mu,1)$ hides it.
> 2. Extend to all DGMs, methods and estimands, checking behaviour. Then apply each method to the large dataset.
> 3. Set the real $n_{\text{obs}}$ and inspect datasets from **a handful of different seeds**.
> 4. Run **a few (tens of) repetitions**; informally check anticipated convergence problems or zero bias.
> 5. Run the full $n_{\text{sim}}$, storing states (if repetition 4,120 of 5,000 fails, its stored start state reproduces the problem dataset quickly).
> 6. **Trap errors** (Stata `capture`, R `try`) so the run continues; record the failure as a **missing value** in the estimates dataset, with reasons if possible.
^alg-build-up

> [!definition] Positive and negative controls (synthesis of §4.2 p.12 and §5.4 p.18)
> The paper's "methods with known properties" act as **positive controls**: a correctly specified model that should be unbiased with nominal coverage. A DGM with a true null effect, where a valid test should reject at rate $\alpha$, acts as a **negative control**. If controls misbehave, the bug is in the harness, not in the method under test. (The control terminology is this note's framing; §5.4 itself prefers "comparator" and "benchmarks".)
^def-controls

### §4.3 Different software packages for different methods (pp.12-13)

> [!definition] Simulate once, export to every package (§4.3, pp.12-13)
> When methods live in different packages, either (a) simulate separately in each package, or (b) simulate in one package and export the datasets. Both are valid "but we advocate the latter":
> 1. **Matched Monte Carlo error.** With the same datasets, Monte Carlo error "will affect methods' performance in the same way because methods are matched on the same generated data" — sharper comparisons (cf. the correlation term in the relative-precision MCSE).
> 2. **Avoid duplicated work and package quirks** — hard to ensure data really are generated identically.
> 3. **Relevance.** The aim is to compare *methods*; how a package simulates data is not of interest — "Whatever data an analyst was faced with would be the same regardless of the software being used."
^def-same-data

Review: 62 studies mentioned software; 7 used more than one package (p.13; Table A1 in [[Morris et al 2019 - Motivation and Review of Simulation Practice]]).

## Examples

> [!example] A Python harness that follows §4 (illustrative, not from the paper)
> ```python
> import numpy as np, pandas as pd
> ss = np.random.SeedSequence(72789)               # seed once
> streams = ss.spawn(n_chunks)                       # independent streams for parallel chunks
> def run_chunk(stream, reps):
>     rng = np.random.default_rng(stream)
>     rows, states = [], []
>     for i in reps:
>         states.append((i, rng.bit_generator.state))  # store state at start of repetition
>         data = simulate(rng, n_obs)                   # same data for every method
>         for m in methods:
>             try:
>                 est, se = m.fit(data)
>             except Exception as e:                    # record failure as missing
>                 est, se = np.nan, np.nan
>             rows.append(dict(rep=i, method=m.name, est=est, se=se))
>     states.append(("final", rng.bit_generator.state))
>     return pd.DataFrame(rows), states
> ```
> `SeedSequence.spawn` plays the role of Stata's `rngstream`. Any library that seeds internally (some MCMC or bootstrap utilities) must receive the `rng` explicitly.
^ex-python-harness-that-follows

## Connections

- Reproducibility via stored states parallels [[Pre-registration and Open Science - Overview]] and the code-release argument in [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]].
- Hidden seeds inside MCMC are an instance of the computational checks in [[Effective Sample Size and Monte Carlo Standard Error]] and [[Simulation-Based Calibration - Overview]].
- Matching methods on the same simulated data is a blocked design, the simulation analogue of paired comparisons in [[Power Analysis and Sample Size]].

## See Also

- [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] — what to do with the estimates dataset
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
