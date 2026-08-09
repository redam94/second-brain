---
title: "Q: How can SMM be used to calibrate agent based models?"
tags:
  - type/qa
  - topic/agent-based-modeling
  - topic/calibration
  - topic/simulation-estimation
  - topic/econometrics
date_asked: 2026-04-11
folder: "Questions-and-Answers"
doc_type: qa
answered_from:
  - "[[Method of Simulated Moments]]"
  - "[[SMM Weighting Matrix and Inference]]"
  - "[[SMM Python Implementation]]"
  - "[[Practical Issues in Simulation Estimation]]"
  - "[[ABM Calibration Overview]]"
  - "[[Genetic Algorithm Calibration for ABM]]"
  - "[[GA Fitness Evaluation and the RAM]]"
related_questions:
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - SMM ABM calibration
  - Simulated Method of Moments for ABM
  - How to calibrate ABM with SMM
---

# How can SMM be used to calibrate agent based models?

> [!summary]
> The Simulated Method of Moments (SMM) calibrates an ABM by choosing structural parameters $\theta$ to minimize a weighted distance between observed macro-level data moments and their simulated counterparts produced by running the ABM at $\theta$. SMM transforms the ABM calibration problem — which the vault treats primarily through genetic algorithms ([[Genetic Algorithm Calibration for ABM]]) — into a proper statistical estimation problem with formal asymptotic theory: consistent estimates, asymptotically normal standard errors, and a J-test for overidentifying restrictions. The key practical requirement is **common random numbers**: fix all simulation random draws before optimization so the criterion surface is smooth in $\theta$.

## Answer

### What SMM Is and Why It Applies to ABMs

The [[Method of Simulated Moments]] (McFadden 1989; Pakes & Pollard 1989) is an extension of GMM designed for models where moment conditions cannot be evaluated analytically. The key insight is that even when we cannot *compute* the theoretical moment $E_\theta[m(y)]$ in closed form, we can *simulate* observations from the model and average the sample moment across simulations.

ABMs sit squarely in this setting ([[ABM Calibration Overview]]): the mapping from micro-level agent parameters $\theta$ to macro-level observables (market shares, diffusion curves, purchase rates) is nonlinear, stochastic, and has no closed-form expression. The exact setting SMM was built for.

### The SMM Criterion for ABM Calibration

Let:
- $x = (x_1, \ldots, x_T)$ be observed macro-level data (e.g., market share time series, adoption counts)
- $m_r(x)$ be the $r$-th data moment ($r = 1, \ldots, R$) — e.g., mean adoption rate, variance of purchase timing, fraction in each market segment
- $\tilde{x}^{(s)}(\theta)$ be the $s$-th simulated ABM run at parameter vector $\theta$
- $\hat{m}_r(\theta) = \frac{1}{S} \sum_{s=1}^S m_r(\tilde{x}^{(s)}(\theta))$ be the simulated moment averaged over $S$ runs

The SMM estimator chooses $\theta$ to minimize:

$$\hat{\theta}_{SMM} = \arg\min_\theta \; e(\theta)^T \, W \, e(\theta)$$

where $e(\theta)$ is the $R \times 1$ vector of **percent-deviation moment errors**:

$$e_r(\theta) = \frac{\hat{m}_r(\theta) - m_r(x)}{m_r(x)}$$

and $W$ is an $R \times R$ positive-definite weighting matrix ([[SMM Weighting Matrix and Inference]]).

> [!important] Connection to the RAM Fitness Function
> The [[GA Fitness Evaluation and the RAM|Result-Analysis Module (RAM)]] in Ben Said et al.'s GA calibration does exactly the same thing conceptually: it measures how far the simulated diffusion curves and micro-behavioral probes are from observed market data. SMM provides a **principled, statistically optimal version** of this fitness function: the percent-deviation criterion with optimal weighting $W^{opt} = \hat{\Omega}^{-1}$.

### Step-by-Step Calibration Workflow

#### Step 1: Define Target Moments

Choose $R \geq K$ moments that respond to the ABM parameters you want to identify (where $K$ is the number of parameters). Informed by [[ABM Calibration Overview]]'s calibration challenges:

| Moment Type | Examples | Parameter It Identifies |
|-------------|---------|------------------------|
| **Aggregate dynamics** | Mean market share, adoption rate at $t=5$, $t=10$ | WOM strength, imitation rate |
| **Diffusion shape** | Time to 10%, 50%, 90% penetration | Diffusion speed, innovativeness |
| **Distributional** | Variance of adoption timing | Heterogeneity parameters |
| **Cross-sectional** | Correlation of adoption with social class | Socio-economic sensitivity |
| **Micro-behavioral** | Purchase frequency distribution, return rate | Conditioning, opportunism attitudes |

The CUBES calibration target ([[GA Fitness Evaluation and the RAM]]) used diffusion curves and micro-behavioral probes — both translate directly into SMM moments.

#### Step 2: Fix Common Random Numbers

Before optimization begins, draw and store all simulation random seeds:

```python
np.random.seed(42)
random_seeds = np.random.randint(0, 1e9, size=S)  # S ABM seeds
```

During optimization, each ABM run at parameter $\theta$ uses the same seed $s$. This is the **common random numbers** principle ([[Practical Issues in Simulation Estimation]]): without fixed seeds, the ABM output changes randomly at every optimizer step, making the criterion surface non-differentiable and preventing convergence.

#### Step 3: Simulate and Compute Moments

For each candidate $\theta$ during optimization:

```python
def smm_criterion(theta, data_moments, seeds, W):
    sim_moments = np.zeros((R, S))
    for s, seed in enumerate(seeds):
        abm_output = run_abm(theta, seed=seed)          # full ABM run
        sim_moments[:, s] = compute_moments(abm_output)  # R-vector
    m_hat = sim_moments.mean(axis=1)                     # average over S runs
    e = (m_hat - data_moments) / data_moments            # percent deviations
    return e @ W @ e
```

#### Step 4: Optimize — Identity W First

Minimize with a gradient-free or numerical-gradient optimizer (see [[SMM Python Implementation]] for the `eps` step-size issue with L-BFGS-B):

$$\hat{\theta}_{1,SMM} = \arg\min_\theta \; e(\theta)^T I \; e(\theta)$$

> [!warning] Step Size for ABM SMM
> The L-BFGS-B default `eps=1e-8` will fail when ABM output moments are in large units (market shares ≈ 0.3 or diffusion counts ≈ thousands). Set `options={'eps': 0.01}` or use a gradient-free method like Nelder-Mead for ABM calibration. See [[SMM Python Implementation#^warn-eps-stepsize]].

#### Step 5: Two-Step Optimal Weighting

Use the Step 1 estimates to build the optimal weighting matrix that downweights noisy moments ([[SMM Weighting Matrix and Inference#^def-two-step-smm]]):

$$\hat{\Omega}_2 = \frac{1}{S} E(\hat{\theta}_{1,SMM}) \, E(\hat{\theta}_{1,SMM})^T$$

where $E$ is the $R \times S$ matrix of per-simulation moment errors. Re-estimate:

$$\hat{\theta}_{2,SMM} = \arg\min_\theta \; e(\theta)^T \hat{\Omega}_2^{-1} \; e(\theta)$$

#### Step 6: Compute Standard Errors

The parameter estimates are asymptotically normal ([[SMM Weighting Matrix and Inference#^thm-smm-varcov]]):

$$\hat{\Sigma}_{SMM} = \frac{1}{S}\left[d(\hat{\theta})^T W \, d(\hat{\theta})\right]^{-1}$$

where $d(\hat{\theta})$ is the $R \times K$ Jacobian of the moment error vector with respect to $\theta$, estimated by centered finite differences. The standard error of $\hat{\theta}_k$ is $\sqrt{[\hat{\Sigma}_{SMM}]_{kk}}$.

### How SMM Improves on Existing ABM Calibration Methods

| Feature | Genetic Algorithm (Ben Said) | Experimental Design (Karakaya) | SMM |
|---------|------------------------------|-------------------------------|-----|
| **Standard errors** | None | None | Yes — asymptotically valid |
| **Optimality criterion** | Heuristic fitness function | Qualitative comparison | Optimal weighted distance |
| **Specification testing** | No | No | Yes — J-test when $R > K$ |
| **Parameter uncertainty** | None | None | Confidence intervals |
| **Convergence guarantee** | None (evolutionary heuristic) | None (one-at-a-time search) | Yes — under standard regularity |
| **Moment selection guidance** | Ad hoc | Domain knowledge | Identification-theoretic |

> [!note] SMM Consistency
> From [[Method of Simulated Moments#^thm-msm-consistency]]: the SMM estimator is **consistent for any fixed $S \geq 1$** as the time series length $T \to \infty$ (or in the cross-sectional case, as $N \to \infty$). You do not need to send $S \to \infty$, though larger $S$ reduces the $(1 + 1/S)$ variance inflation factor.

### Choosing Moments: The Identification Problem

A model is identified only if each parameter $\theta_k$ moves at least one moment. For ABM calibration:

- **Equifinality** ([[ABM Calibration Overview]]): different parameter vectors may produce the same moments. Mitigated by using many diverse moments ($R \gg K$) and checking the rank of the Jacobian $d$.
- **Out-of-sample check**: After estimating on moments $\{m_1, \ldots, m_R\}$, verify that *unused moments* $\{m_{R+1}, \ldots\}$ are also matched by $\hat{\theta}$ — a powerful diagnostic that the calibration generalizes.
- **Overidentification J-test**: When $R > K$, the minimized SMM criterion $S \cdot e(\hat{\theta})^T W e(\hat{\theta})$ is asymptotically $\chi^2(R-K)$ under the null that the model is correctly specified. A rejection signals moment mismatch or model misspecification.

### Practical Implications

1. **Number of simulations $S$**: Use $S \geq 20$ per data observation. At $S=20$ the variance inflation relative to an exact GMM is only 5% ([[Practical Issues in Simulation Estimation]]). ABMs are expensive — $S=20$ is often a practical limit.

2. **Moment scaling**: Scale all moments as percent deviations to prevent large-magnitude moments (e.g., population counts) from dominating small-magnitude moments (e.g., proportions). Already handled by the $e_r = (\hat{m}_r - m_r)/m_r$ formula.

3. **Stochastic ABMs**: ABM stochasticity increases the variance of each simulated moment. This is absorbed into $\hat{\Omega}_2$ — highly variable moments get downweighted automatically by the two-step $W$.

4. **ABM with latent dynamics**: For ABMs where the full path is required (e.g., the WOM network evolution in [[Word of Mouth Mechanisms]]), use **path simulations** (unconditional moments) rather than conditional simulations — the [[Method of Simulated Moments#^def-msm-unconditional|unconditional MSM estimator]] applies directly.

5. **ABM behavioral attitude parameters**: The 6-gene chromosome in [[Genetic Algorithm Calibration for ABM#^def-ga-chromosome]] (behavioral attitudes, age, network size, social class, education, necessity) maps directly to a $K=6$ parameter vector $\theta$ for SMM. Choose $R \geq 6$ moments to identify all six.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Method of Simulated Moments]] | Core SMM theory: consistency, asymptotic normality, optimal W |
| [[SMM Weighting Matrix and Inference]] | Two-step W, Newey-West W, Jacobian-based Σ̂ |
| [[SMM Python Implementation]] | Python workflow, common random numbers, eps fix |
| [[Practical Issues in Simulation Estimation]] | Common random numbers, step sizes, variance reduction |
| [[ABM Calibration Overview]] | ABM calibration challenges and existing approaches |
| [[Genetic Algorithm Calibration for ABM]] | GA approach: chromosome encoding, selection, crossover |
| [[GA Fitness Evaluation and the RAM]] | RAM fitness = proto-SMM criterion; macro + micro comparison |
| [[Simulation-Based Estimation - Overview]] | MSM vs. Indirect Inference vs. EMM comparison |

## Related Concepts

- [[Indirect Inference]] — alternative: calibrate by matching parameters of an auxiliary model (e.g., a VAR of the ABM output) rather than raw moments; useful when natural ABM moments are unclear
- [[Efficient Method of Moments]] — uses SNP auxiliary model to achieve MLE-equivalent efficiency; overkill for most ABMs but the upper bound on what is achievable
- [[Population Initialization and Parameter Sensitivity]] — Karakaya's one-at-a-time experimental calibration; complementary diagnostic before SMM
- [[ABM Validation Challenges]] — SMM calibration is not the same as validation; a calibrated model still needs out-of-sample and structural validation
- [[Heterogeneity in Agent Models]] — why ABM parameter spaces are high-dimensional; motivates careful moment selection
- [[Emergent Phenomena in ABM]] — the nonlinear micro-macro mapping that makes analytical moments intractable and SMM necessary

## Gaps

- **No vault note directly applies SMM to ABM**: The SMM notes treat financial econometrics (SV models, copulas); the ABM calibration notes treat GAs and experimental design. The connection synthesized here is not documented in any single vault source.
- **Computational cost**: The vault has no discussion of how to speed up ABM-specific SMM (surrogate models, emulators, parallelization). Consider ingesting sources on ABC (Approximate Bayesian Computation) as an alternative calibration framework for expensive simulations.
- **High-dimensional θ**: With many heterogeneous agents each having $K$ parameters, the number of SMM parameters can be enormous. The vault has no treatment of dimensionality reduction for ABM SMM (PCA on agent attributes, hierarchical parameterization of the population distribution).

## Follow-Up Questions

- How does Indirect Inference compare to SMM for ABM calibration when ABM moments are hard to choose?
- What is Approximate Bayesian Computation (ABC) and how does it relate to SMM for expensive simulators?
- How can the Efficient Method of Moments (EMM) be used to achieve near-MLE efficiency in ABM estimation?
- How does one validate an SMM-calibrated ABM beyond fitting the calibration moments?
- What moment conditions best identify WOM and network diffusion parameters in consumer ABMs?
