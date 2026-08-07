# Vine Copulas — Compiled Sources

> Compiled 2026-08-07 from accessible web sources. Primary academic references cited below;
> PDFs unavailable due to network policy — see citations for canonical sources.

## Canonical References

1. **Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009).** "Pair-copula constructions of multiple dependence." *Insurance: Mathematics and Economics*, 44(2), 182–198. — foundational paper establishing the pair-copula construction (PCC) framework for C-vines and D-vines, introducing sequential estimation.

2. **Bedford, T. & Cooke, R.M. (2002).** "Vines — A new graphical model for dependent random variables." *Annals of Statistics*, 30(4), 1031–1068. — defines the regular vine (R-vine) graphical structure and the proximity condition; proves that any regular vine yields a valid factorization of the joint density.

3. **Bedford, T. & Cooke, R.M. (2001).** "Probability density decomposition for conditionally dependent random variables modeled by vines." *Annals of Mathematics and Artificial Intelligence*, 32(1–4), 245–268. — original vine paper; companion to the 2002 Annals of Statistics article.

4. **Czado, C. & Nagler, T. (2022).** "Vine copula based modeling." *Annual Review of Statistics and Its Application*, 9, 453–477. — comprehensive review covering estimation, model selection, current developments, and future directions.

5. **Brechmann, E.C. & Schepsmeier, U. (2013).** "Modeling dependence with C- and D-vine copulas: The R-package CDVine." *Journal of Statistical Software*, 52(3), 1–27. — practical implementation reference with density formulas.

6. **Czado, C. (2010).** "Pair-copula constructions of multivariate copulas." In *Copula Theory and Its Applications*, Springer, pp. 93–109. — pedagogical chapter from TU Munich; summary below drawn from abstract.

---

## Technical Content (from accessible sources)

### Source A: ArbitrageLab vine copula introduction
URL: https://raw.githubusercontent.com/hudson-and-thames/arbitragelab/master/docs/source/copula_approach/vine_copula_intro.rst
(retrieved 2026-08-07)

#### Bivariate copula relation

The key relationship for two variables is:

$$f_{1|2}(x_1 | x_2) = c_{1,2}(F_1(x_1), F_2(x_2)) \cdot f_1(x_1)$$

where $c_{1,2}$ denotes the bivariate copula density and $F_i$ represents CDFs.

For conditional scenarios involving a third variable $X_3$:

$$f_{1|2}(x_1 | x_2, x_3) = c_{1,2|3}(F_{1|3}(x_1|x_3), F_{2|3}(x_2|x_3)) \cdot f_{1|3}(x_1|x_3)$$

#### Three-variable density factorization

$$f(x_1, x_2, x_3) = f_1(x_1) f_2(x_2) f_3(x_3) \cdot c_{2,3}(F_2(x_2), F_3(x_3)) \cdot c_{1,3}(F_1(x_1), F_3(x_3)) \cdot c_{1,2|3}(F_{1|3}(x_1 | x_3), F_{2|3}(x_2 | x_3))$$

This is an example of a D-vine in 3 dimensions.

#### Vine Copula Types

**R-vine (Regular Vine):** Requirements for each tree level:
- Exactly $N-1$ edges connect $N$ nodes
- All nodes remain connected
- Proximity condition satisfied (edges contribute to joint densities in subsequent layers)

An R-vine with $n$ variables uses a lower triangular matrix for representation. The number of possible R-vine configurations for $n$ variables equals:
$$\frac{n(n-1)(n-2)! \cdot 2^{(n-2)(n-3)/2}}{2}$$

**C-vine (Canonical Vine):** Characterized by a center/hub node at each tree level. Useful "when we have a key variable that largely governs the variable interactions." Representable as an ordered tuple by reading backwards through centered components.

**D-vine (Drawable Vine):** Each tree layer forms a path structure where each node connects to at most two others. Beneficial "when we do not wish to have a key node that controls the dependencies."

#### R-vine Matrix Representation

An R-vine with $n$ variables uses an $n \times n$ lower triangular matrix. To extract copula information:
1. Locate diagonal term $a$ at position $M_{i,i}$
2. Follow column downward to term $b$
3. Remaining terms below $b$ form conditioning set $\{c_1, c_2, ...\}$
4. Node $(a, b | c_1, c_2, ...)$ appears in the tree structure

#### Estimation and Fitting

Model fitting involves:
- Determining optimal R-vine structure
- Specifying bivariate copula types (families) for each pair
- Estimating parameters

Key notes:
- Fitting uses pseudo-observations (quantile-transformed uniform data)
- Sequential estimation: pair-by-pair up the tree levels
- Model selection via log-likelihood, AIC, and BIC

---

### Source B: VineCopulaMatlab README
URL: https://raw.githubusercontent.com/MalteKurz/VineCopulaMatlab/master/README.md
(retrieved 2026-08-07)

The toolbox implements:
- **20 pair-copula families** (expanding to 62 including rotations): Gaussian, Student-t, Clayton, Gumbel, Frank, Joe, BB families, and rotated versions
- **Simplified and non-simplified vine copulas**: simplified assumes conditional pair-copulas do not depend on conditioning values; non-simplified allows them to vary
- **Vectorial independence test** for testing the simplifying assumption
- Model selection and sequential estimation

---

### Source C: VineCopula R package features
URL: https://raw.githubusercontent.com/tnagler/VineCopula/main/README.md
(retrieved 2026-08-07)

Bivariate families supported:
- **Elliptical:** Gaussian, Student-t
- **Archimedean:** Clayton, Gumbel, Frank, Joe, BB1, BB6, BB7, BB8
- **Tawn copula** (two parameterizations)
- **Rotated versions** of most families for negative dependence

R-vine functions: structure specification, simulation, sequential parameter estimation, automatic structure and family selection, goodness-of-fit testing.

---

## Key Mathematical Results from Literature

### General n-dimensional density factorization (Bedford & Cooke 2002)

For a regular vine on $n$ variables with trees $T_1, ..., T_{n-1}$, the joint density factorizes as:

$$f(x_1, ..., x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{e \in E_j} c_{j(e),k(e)|D(e)}(F(x_{j(e)}|\mathbf{x}_{D(e)}), F(x_{k(e)}|\mathbf{x}_{D(e)}))$$

where $e = \{j(e), k(e)\}$ is an edge in tree $T_j$ with conditioning set $D(e)$.

### C-vine density (Aas et al. 2009, eq. 4)

For an $n$-dimensional C-vine with root nodes $1, ..., n-1$:

$$f(x_1,...,x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{j,j+i|1,...,j-1}\!\left(F(x_j|x_1,...,x_{j-1}),\, F(x_{j+i}|x_1,...,x_{j-1})\right)$$

### D-vine density (Aas et al. 2009, eq. 3)

For an $n$-dimensional D-vine ordered $x_1, ..., x_n$:

$$f(x_1,...,x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{i,i+j|i+1,...,i+j-1}\!\left(F(x_i|x_{i+1},...,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},...,x_{i+j-1})\right)$$

### H-function (Aas et al. 2009)

The h-function is defined as the conditional CDF:
$$h(u|v;\boldsymbol{\theta}) = P(U_1 \leq u | U_2 = v) = \frac{\partial C(u,v;\boldsymbol{\theta})}{\partial v}$$

Closed forms for standard families:
- **Gaussian:** $h(u|v;\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho \Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
- **Clayton($\theta$):** $h(u|v;\theta) = v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}$
- **Gumbel($\theta$):** $h(u|v;\theta) = C(u,v;\theta) \cdot \frac{1}{v}\frac{(-\log v)^{\theta-1}}{(-\log u)^\theta + (-\log v)^\theta)^{1-1/\theta}}$

### Simplifying assumption

The **simplifying assumption** requires that for each pair-copula $c_{j(e),k(e)|D(e)}$, the copula does not depend on the *values* $\mathbf{x}_{D(e)}$, only on *which* variables are in the conditioning set. Under this assumption:

$$c_{j,k|D}(F(x_j|\mathbf{x}_D), F(x_k|\mathbf{x}_D)) = c_{j,k|D}(F(x_j|\mathbf{x}_D), F(x_k|\mathbf{x}_D);\boldsymbol{\theta}_{jk|D})$$

where $\boldsymbol{\theta}_{jk|D}$ is a constant parameter vector. This enables sequential estimation with closed-form h-functions. The assumption is empirically testable (Stöber et al. 2013; VineCopulaMatlab includes such a test).

---

## Comparison: Factor Copulas vs Vine Copulas

| Aspect | Factor Copula (Oh & Patton 2017) | Vine Copula (Aas et al. 2009) |
|--------|----------------------------------|-------------------------------|
| Structure | Latent factor model | Graphical (nested trees) |
| Parameter count | $O(K)$ for $K$ factors | $O(n^2)$ pair-copulas |
| Tractability in high dim | Scales to 100+ easily (SMM) | Grows fast; truncation needed |
| Tail dependence | Analytically via EVT | Depends on pair-copula families |
| Asymmetric dependence | Skew factor | Different families per pair |
| Interpretability | Factor loadings | Structure hard to read in high dim |
| Estimation | SMM (no closed-form likelihood) | Sequential MLE or joint MLE |
| Software | Custom code | VineCopula (R), pyvinecopulib |
| Best use case | Equidependence or industry blocks | Flexible bivariate pair structures |
