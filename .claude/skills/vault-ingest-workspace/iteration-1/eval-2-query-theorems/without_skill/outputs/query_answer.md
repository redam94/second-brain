# Theorems and Formal Results about Exchangeability and Hierarchical Models

## Summary

The vault documents several major theorems and formal results related to exchangeability and hierarchical models, primarily sourced from BDA3 (Gelman et al.) with additional material from PyMC tutorials and methodology papers. Below is a comprehensive inventory.

---

## 1. De Finetti's Theorem

**Source**: [[Hierarchical Models]] (BDA3 Ch. 5, Section 5.2); also referenced in the vault-ingest skill template.

**Statement (as documented)**: Parameters $\theta_1, \ldots, \theta_J$ are *exchangeable* if their joint distribution is invariant to permutations of the indices. De Finetti's theorem states that in the limit as $J \to \infty$, any suitably well-behaved exchangeable distribution on $(\theta_1, \ldots, \theta_J)$ can be expressed as a mixture of independent and identical distributions:

$$p(\theta) = \int \left(\prod_{j=1}^{J} p(\theta_j \mid \phi)\right) p(\phi) \, d\phi$$

The vault notes that the theorem does not hold when $J$ is finite (BDA3 references Exercises 5.1, 5.2, and 5.4 for counterexamples). The mixture representation characterizes parameters $\theta$ as drawn from a common "superpopulation" governed by unknown hyperparameters $\phi$.

**Vault locations**:
- `Research/Bayesian Statistics/Inference Fundamentals/Hierarchical Models.md`
- `Research/raw/BDA3.pdf` (pp. 105)

---

## 2. Bernstein-von Mises Theorem

**Source**: [[Asymptotics and Frequentist Connections]] (BDA3 Ch. 4).

**Statement (as documented)**: Under regularity conditions, the posterior distribution converges to a normal distribution centered at the MLE as $n \to \infty$:

$$p(\theta \mid y) \approx N\!\left(\hat{\theta},\; [I(\hat{\theta})]^{-1}\right)$$

where $\hat{\theta}$ is the posterior mode (asymptotically equal to the MLE) and $I(\hat{\theta})$ is the observed Fisher information matrix.

**Key corollaries documented in the vault**:
- The prior becomes irrelevant as $n \to \infty$ (data dominate).
- Bayesian credible intervals and frequentist confidence intervals coincide asymptotically.
- Counterexamples: underidentified models, parameters near boundaries, multimodal posteriors, and models where the number of parameters grows with $n$.

**Vault locations**:
- `Research/Bayesian Statistics/Inference Fundamentals/Asymptotics and Frequentist Connections.md`
- `Research/Bayesian Statistics/Inference Fundamentals/_Index.md`

---

## 3. Exchangeability and Conditional Independence (Hierarchical Model Structure)

**Source**: [[Hierarchical Models]] (BDA3 Ch. 5, Sections 5.1-5.3).

**Formal structure documented**:
- The simplest exchangeable model has each $\theta_j$ as an independent sample from a population distribution: $p(\theta \mid \phi) = \prod_{j=1}^{J} p(\theta_j \mid \phi)$
- The full hierarchical model structure:
  - Data model: $y_j \mid \theta_j \sim p(y_j \mid \theta_j)$
  - Group-level model: $\theta_j \mid \phi \sim p(\theta_j \mid \phi)$
  - Hyperprior: $\phi \sim p(\phi)$
- Joint posterior: $p(\phi, \theta \mid y) \propto p(\phi, \theta) p(y \mid \phi, \theta)$

**Partial and conditional exchangeability**: The vault documents that observations are often not fully exchangeable but are *partially* or *conditionally exchangeable*. If observations can be grouped, each group has its own submodel with exchangeable group properties. If covariate information $x_i$ is available, $(y_i, x_i)$ pairs may still be exchangeable even when $y_i$ alone is not.

**Vault locations**:
- `Research/Bayesian Statistics/Inference Fundamentals/Hierarchical Models.md`
- `Research/raw/BDA3.pdf` (pp. 101-110)

---

## 4. Partial Pooling and the James-Stein Phenomenon

**Source**: [[Hierarchical Models]], [[Asymptotics and Frequentist Connections]], [[Forking Paths and Bayesian Approaches]].

**Result (as documented)**: Hierarchical models yield partial pooling estimators that *dominate* classical unpooled estimators (the James-Stein phenomenon). The Bayes estimator for each group shrinks toward the grand mean:

$$\hat{\theta}_j^{\text{Bayes}} \approx \frac{\frac{1}{\sigma_j^2} y_j + \frac{1}{\tau^2} \mu}{\frac{1}{\sigma_j^2} + \frac{1}{\tau^2}}$$

Groups with less data are regularized more heavily. This is documented as providing a natural Bayesian solution to the multiple comparisons problem -- partial pooling acts as an implicit multiplicity correction derived from model structure rather than an ad hoc penalty.

**Vault locations**:
- `Research/Bayesian Statistics/Inference Fundamentals/Hierarchical Models.md`
- `Research/Bayesian Statistics/Inference Fundamentals/Asymptotics and Frequentist Connections.md`
- `Research/Research Methodology/Forking Paths and Bayesian Approaches.md`
- `Research/Research Methodology/Experimental Design/Multiple Testing Corrections.md`

---

## 5. Conjugate Posterior Results

**Source**: [[Single-Parameter Models]] (BDA3 Ch. 2), [[Multiparameter Models]] (BDA3 Ch. 3).

**Formal results documented**:

- **Beta-binomial conjugacy**: Prior $\theta \sim \text{Beta}(\alpha, \beta)$ with data $y \sim \text{Bin}(n, \theta)$ gives posterior $\theta \mid y \sim \text{Beta}(\alpha + y, \beta + n - y)$.
- **Normal-normal conjugacy**: Prior $\mu \sim N(\mu_0, \tau_0^2)$ with data $y_i \sim N(\mu, \sigma^2)$ gives posterior with precision equal to the sum of prior and data precisions.
- **Normal with unknown mean and variance**: Marginal posterior for $\mu$ yields a $t_{n-1}$ distribution (recovering the frequentist $t$-distribution).
- **Dirichlet-multinomial conjugacy**: For categorical data.
- **Hierarchical beta-binomial**: Full joint posterior $p(\theta, \alpha, \beta \mid y)$ for the rat tumor example (BDA3 Section 5.3, Eq. 5.6-5.8).

**Vault locations**:
- `Research/Bayesian Statistics/Inference Fundamentals/Single-Parameter Models.md`
- `Research/Bayesian Statistics/Inference Fundamentals/Multiparameter Models.md`
- `Research/Bayesian Statistics/Inference Fundamentals/Hierarchical Models.md`

---

## 6. Sklar's Theorem (Copulas)

**Source**: [[Bayesian Copula Estimation]].

**Statement (as documented)**: Any joint distribution $P(a, b)$ can be decomposed as:

$$P(a, b) = C(F_a(a),\ F_b(b))$$

where $C$ is the *copula* (a joint distribution on $[0,1]^2$) and $F_a, F_b$ are the marginal CDFs. The vault documents the Gaussian copula implementation in PyMC with a two-stage estimation approach.

**Vault location**:
- `Research/Bayesian Statistics/Advanced Models/Copula Estimation.md`

---

## 7. Rosenbaum-Rubin Theorem (Propensity Scores)

**Source**: [[Bayesian Non-parametric Causal Inference]].

**Statement (as documented)**: If $(Y_0, Y_1) \perp T \mid X$ (strong ignorability), then $(Y_0, Y_1) \perp T \mid e(X)$, where $e(X) = P(T=1 \mid X)$ is the propensity score. This reduces high-dimensional covariate adjustment to a single dimension. The vault documents BART-based nonparametric Bayesian implementations for estimating ATE and ATT with full posterior uncertainty.

**Vault location**:
- `Research/Bayesian Statistics/Advanced Models/Nonparametric Causal Inference.md`
- `Clippings/Bayesian Non-parametric Causal Inference.md`

---

## 8. Central Limit Theorem (Bayesian Context)

**Source**: [[Linear Models in Statistical Rethinking]] (Statistical Rethinking Ch. 4).

**Result (as documented)**: The Gaussian distribution arises naturally from addition of many small effects. McElreath's vault note documents two justifications: (1) ontological -- many measurements are approximately Gaussian from additive processes; (2) epistemological -- the Gaussian is the maximum entropy distribution for a given mean and variance.

**Vault location**:
- `Research/Bayesian Statistics/Regression Models/Linear Models in Statistical Rethinking.md`

---

## 9. Bayes Estimator Optimality Results

**Source**: [[Asymptotics and Frequentist Connections]] (BDA3 Ch. 4, Exercises).

**Results documented**:
- Under squared error loss $L(\theta, a) = (\theta - a)^2$, the posterior mean is the unique Bayes estimate.
- Under absolute error loss $L(\theta, a) = |\theta - a|$, any posterior median is a Bayes estimate.
- Under asymmetric linear loss, the $\frac{k_0}{k_0 + k_1}$ quantile of the posterior is a Bayes estimate.
- The Bayesian posterior mean, based on a proper prior, cannot be an unbiased estimator except in degenerate problems.

**Vault location**:
- `Research/raw/BDA3.pdf` (Ch. 4 exercises, p. 99)

---

## 10. Dirichlet Process and Nonparametric Bayesian Results

**Source**: [[Nonparametric Models Overview]] (BDA3 Part V, Ch. 23).

**Results documented**:
- The Dirichlet process $G \sim \text{DP}(\alpha, G_0)$ extends finite mixtures to an infinite number of components.
- Concentration parameter $\alpha$ controls the number of clusters.
- Hierarchical DP allows sharing clusters across groups.
- Gaussian processes define distributions over functions: $f \sim \mathcal{GP}(m(x), k(x, x'))$.
- Label switching invariance in finite mixture models: the posterior is invariant to permutation of component labels.

**Vault location**:
- `Research/Bayesian Statistics/Advanced Models/Nonparametric Models Overview.md`

---

## 11. Law of Total Variance

**Source**: [[Probability and Bayesian Inference]] (BDA3 Ch. 1).

**Statement (as documented)**:

$$\text{var}(u) = \text{E}(\text{var}(u \mid v)) + \text{var}(\text{E}(u \mid v))$$

Used throughout BDA3 for decomposing uncertainty in hierarchical models into within-group and between-group components.

**Vault location**:
- `Research/Bayesian Statistics/Inference Fundamentals/Probability and Bayesian Inference.md`

---

## Cross-References and Connections

The vault extensively cross-links these formal results:
- De Finetti's theorem justifies the hierarchical model structure, which in turn justifies partial pooling.
- The Bernstein-von Mises theorem connects Bayesian posteriors to frequentist confidence intervals asymptotically.
- The James-Stein phenomenon provides a decision-theoretic justification for hierarchical models over unpooled estimates.
- Exchangeability assumptions underpin both hierarchical Bayesian models and econometric panel-data methods (linked to [[Differences-in-Differences]], [[Local Average Treatment Effects]], [[Instrumental Variables]]).
- The Rosenbaum-Rubin theorem bridges causal inference with the Bayesian nonparametric framework via BART.
- Sklar's theorem enables modeling complex multivariate dependencies while maintaining flexible marginals.
