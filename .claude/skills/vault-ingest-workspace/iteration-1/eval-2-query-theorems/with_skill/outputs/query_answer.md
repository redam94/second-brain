## Answer

> [!summary]
> The vault documents several key theorems and formal results about exchangeability and hierarchical models, primarily from BDA3 (Gelman et al.) and supporting sources. The central results are de Finetti's theorem (justifying hierarchical modeling via exchangeability), the Bernstein-von Mises theorem (posterior convergence), conjugate updating results for standard families, the James-Stein phenomenon (partial pooling dominance), and Bayesian decision-theoretic optimality results linking loss functions to posterior summaries.

### De Finetti's Theorem and Exchangeability

The primary formal result documented is **de Finetti's theorem**, presented in [[Hierarchical Models]] (BDA3, Ch. 5):

- **Exchangeability definition**: Parameters $\theta_1, \ldots, \theta_J$ are exchangeable if their joint distribution is invariant to permutations of the indices.
- **De Finetti's theorem**: An infinitely exchangeable sequence can be represented as conditionally i.i.d. given some parameter $\theta$ and prior $p(\theta)$. This justifies the Bayesian modeling approach -- exchangeability implies the existence of a parameter and prior, yielding $p(y_1, \ldots, y_n) = \int \prod_{i=1}^{n} p(y_i \mid \theta) \, p(\theta) \, d\theta$.
- **Significance**: This theorem is the foundational justification for hierarchical/multilevel modeling, where group-level parameters are modeled as exchangeable draws from a population distribution.

The raw source [[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics]] also discusses de Finetti's theorem in the context of psychometrics, noting (via Mislevy and Levy) that exchangeability is recovered through Bayesian inference, and that by de Finetti's theorem a distribution of an exchangeable sequence of variables can be expressed as a mixture of conditionally independent variables.

### Hierarchical Model Structure (Formal Specification)

[[Hierarchical Models]] (BDA3, Ch. 5) documents the formal three-level hierarchical model structure:

$$y_j \mid \theta_j \sim p(y_j \mid \theta_j) \quad \text{(data model)}$$
$$\theta_j \mid \phi \sim p(\theta_j \mid \phi) \quad \text{(group-level model)}$$
$$\phi \sim p(\phi) \quad \text{(hyperprior)}$$

The **partial pooling** result is also formalized: the Bayes estimate for group $j$ is approximately a precision-weighted average of the group-specific observation and the population mean:

$$\hat{\theta}_j^{\text{Bayes}} \approx \frac{\frac{1}{\sigma_j^2} y_j + \frac{1}{\tau^2} \mu}{\frac{1}{\sigma_j^2} + \frac{1}{\tau^2}}$$

### Hierarchical Linear Models (Formal Specification)

[[Hierarchical Linear Models]] (BDA3, Ch. 15) extends the hierarchical framework to regression with varying intercepts and slopes:

$$y_{ij} \mid \alpha_j, \beta_j, \sigma^2 \sim N(\alpha_j + x_{ij} \beta_j, \sigma^2)$$
$$\begin{pmatrix} \alpha_j \\ \beta_j \end{pmatrix} \sim N\!\left(\begin{pmatrix} \mu_\alpha \\ \mu_\beta \end{pmatrix}, \Sigma_{\alpha\beta}\right)$$

### Bernstein-von Mises Theorem

[[Asymptotics and Frequentist Connections]] (BDA3, Ch. 4) documents the **Bernstein-von Mises theorem** (also called the Bayesian Central Limit Theorem):

- For large $n$, the posterior converges to $p(\theta \mid y) \approx N(\hat{\theta}, [I(\hat{\theta})]^{-1})$, where $\hat{\theta}$ is the MLE and $I(\hat{\theta})$ is the observed Fisher information matrix.
- Bayesian credible intervals and frequentist confidence intervals coincide asymptotically.
- The prior becomes irrelevant as $n \to \infty$.
- **Counterexamples** are documented: underidentified models, parameters near boundaries, multimodal posteriors, and models where the number of parameters grows with $n$.

### Conjugate Updating Results

[[Single-Parameter Models]] (BDA3, Ch. 2) documents formal conjugate posterior results:

- **Beta-Binomial conjugacy**: Prior $\theta \sim \text{Beta}(\alpha, \beta)$ with $y \sim \text{Bin}(n, \theta)$ yields posterior $\theta \mid y \sim \text{Beta}(\alpha + y, \beta + n - y)$. The posterior mean is a precision-weighted average of the prior mean and sample proportion.
- **Normal-Normal conjugacy**: Prior $\mu \sim N(\mu_0, \tau_0^2)$ with data $y_i \sim N(\mu, \sigma^2)$ yields a normal posterior with precision equal to the sum of prior and data precisions.

### James-Stein Phenomenon

[[Forking Paths and Bayesian Approaches]] and [[Asymptotics and Frequentist Connections]] document the **James-Stein phenomenon**: partial pooling (hierarchical) estimates dominate unpooled estimates. This result provides a frequentist justification for hierarchical Bayesian models -- pooled estimates have lower mean squared error than independent estimates when estimating three or more means simultaneously.

### Decision-Theoretic Optimality Results

[[Decision Analysis]] (BDA3, Ch. 9) documents the formal connection between loss functions and Bayesian point estimators:

- Squared error loss $\to$ posterior mean is optimal
- Absolute error loss $\to$ posterior median is optimal
- 0-1 loss $\to$ posterior mode is optimal

The optimal decision minimizes expected posterior loss: $d^* = \arg\min_d \int L(d, \theta) p(\theta \mid y) d\theta$.

### Maximum Entropy Characterization

[[Monsters and Mixtures]] (Statistical Rethinking, Ch. 9-11) documents the **maximum entropy** justification for exponential family distributions: Gaussian, binomial, and Poisson distributions are the maximum entropy distributions given their respective moment constraints. This provides a formal information-theoretic basis for the choice of likelihood in GLMs.

### Dirichlet Process

[[Nonparametric Models Overview]] (BDA3, Ch. 23) documents the **Dirichlet process** $G \sim \text{DP}(\alpha, G_0)$ as a nonparametric extension of finite mixture models to an infinite number of components, with the concentration parameter $\alpha$ controlling cluster count. The hierarchical DP extends this to share clusters across groups.

### Sources

| Source | Location | Relevance |
|--------|----------|-----------|
| [[raw/BDA3.pdf]] | Ch. 5, pp. 117-137 | Primary source for exchangeability and de Finetti's theorem |
| [[raw/BDA3.pdf]] | Ch. 2, pp. 29-62 | Conjugate updating results |
| [[raw/BDA3.pdf]] | Ch. 4, pp. 83-106 | Bernstein-von Mises theorem |
| [[raw/BDA3.pdf]] | Ch. 9, pp. 237-264 | Decision-theoretic optimality |
| [[raw/BDA3.pdf]] | Ch. 15 | Hierarchical linear models |
| [[raw/BDA3.pdf]] | Ch. 23 | Dirichlet processes |
| [[raw/StatRethink-Bayes.pdf]] | Ch. 9-11 | Maximum entropy results |
| [[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics]] | Section on Bayesian justification | De Finetti's theorem in psychometrics |
| [[Hierarchical Models]] | -- | Main vault note on exchangeability |
| [[Asymptotics and Frequentist Connections]] | -- | Bernstein-von Mises theorem |
| [[Single-Parameter Models]] | -- | Conjugate posterior results |
| [[Hierarchical Linear Models]] | -- | Formal hierarchical regression specification |

### Related Notes

- [[Hierarchical Models]] -- core note on exchangeability, de Finetti, partial pooling, eight schools
- [[Single-Parameter Models]] -- conjugate updating results (beta-binomial, normal-normal)
- [[Asymptotics and Frequentist Connections]] -- Bernstein-von Mises, posterior convergence
- [[Hierarchical Linear Models]] -- hierarchical regression formalization
- [[Decision Analysis]] -- loss-function optimality of Bayesian estimators
- [[Monsters and Mixtures]] -- maximum entropy characterization of exponential families
- [[Nonparametric Models Overview]] -- Dirichlet process, Gaussian processes
- [[Forking Paths and Bayesian Approaches]] -- James-Stein phenomenon and hierarchical regularization
- [[Confirmatory Factor Analysis and SEM]] -- de Finetti's theorem applied in psychometrics
- [[Choosing and Building Models]] -- modular construction principles for hierarchical models

### Gaps

- The vault does not contain a standalone note dedicated to de Finetti's theorem with a full proof sketch -- the result is stated within [[Hierarchical Models]] but not given its own note with complete conditions and proof.
- No notes on **partial exchangeability** or extensions of de Finetti's theorem to non-i.i.d. settings.
- The **James-Stein theorem** is mentioned but not given a formal statement with full conditions.
- No coverage of **Hewitt-Savage zero-one law** or other measure-theoretic results related to exchangeability.
- Consider ingesting a dedicated probability theory or measure-theoretic Bayesian source for deeper formal treatment of these foundational results.
