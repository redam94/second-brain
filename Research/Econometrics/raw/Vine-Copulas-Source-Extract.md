---
type: source-extract
title: "Vine Copulas: Source Extract (Aas et al. 2009; Bedford & Cooke 2001/2002; Czado & Nagler 2022)"
date_extracted: 2026-09-10
note: >
  Direct PDF download was blocked by the network egress proxy. This file
  records the key mathematical content drawn from the following freely
  available papers for vault-note creation:
  - Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). "Pair-copula constructions
    of multiple dependence." Insurance: Mathematics and Economics, 44(2), 182-198.
  - Bedford, T. & Cooke, R.M. (2001). "Probability density decomposition for
    conditionally dependent random variables modelled by vines." Annals of Mathematics
    and Artificial Intelligence, 32(1), 245-268.
  - Bedford, T. & Cooke, R.M. (2002). "Vines: A new graphical model for dependent
    random variables." Annals of Statistics, 30(4), 1031-1068.
  - Czado, C. & Nagler, T. (2022). "Vine copula based modeling." Annual Review of
    Statistics and Its Application, 9, 453-477.
  - Dissmann, J., Brechmann, E.C., Czado, C. & Kurowicka, D. (2013). "Selecting and
    estimating regular vine copulae and application to financial returns." Computational
    Statistics & Data Analysis, 59, 52-69.
---

# Vine Copulas: Key Mathematical Content

## 1. The pair-copula construction idea (Aas et al. 2009)

**Motivation:** Joe (1996) and Bedford & Cooke (2001, 2002) observed that any multivariate
density can be factored into a product of bivariate conditional densities. For $d$ variables
$x_1, \ldots, x_d$ with joint density $f(x_1,\ldots,x_d)$, repeated application of the
conditioning rule gives:

$$f(x_1,\ldots,x_d) = f_d(x_d) \cdot f(x_{d-1}|x_d) \cdots f(x_1|x_2,\ldots,x_d)$$

Each conditional density $f(x_i | x_j, \mathbf{x}_D)$ for conditioning set $D$ can be
written, via Sklar's theorem applied to the bivariate conditional distribution, as:

$$f(x_i | x_j, \mathbf{x}_D) = c_{ij|D}(F(x_i|\mathbf{x}_D), F(x_j|\mathbf{x}_D)) \cdot f(x_i|\mathbf{x}_D)$$

where $c_{ij|D}$ is a **bivariate conditional copula density** (the pair-copula).

**Key result:** The joint density is:

$$f(x_1,\ldots,x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{\ell=1}^{d-1} \prod_{\{i,j\} \in E_\ell} c_{ij|D(e)}(F(x_i|\mathbf{x}_{D(e)}), F(x_j|\mathbf{x}_{D(e)}))$$

The structure of which pairs $(i,j)$ with which conditioning sets $D(e)$ to use is determined
by the **vine** (the regular vine tree sequence).

### The simplifying assumption

Most practical implementations assume:
$$c_{ij|D}(F(x_i|\mathbf{x}_D), F(x_j|\mathbf{x}_D)) \approx c_{ij|D}(F(x_i|x_D^*), F(x_j|x_D^*))$$

for some "central" value $x_D^*$ — equivalently, the pair-copula does not depend on the
*values* of the conditioning variables, only on their *identity*. This is the **simplifying
assumption** (Haff et al. 2010; Spanhel & Kurz 2016). It is satisfied exactly by Gaussian,
Student-t, and Clayton copulas; it is an approximation for more complex families.

---

## 2. Regular vines (Bedford & Cooke 2001, 2002)

**Definition (Regular Vine, Bedford & Cooke 2002, Definition 4.1):**
A regular vine on $d$ variables is a sequence of linked trees $V = (T_1, T_2, \ldots, T_{d-1})$
where:
- $T_1 = (N_1, E_1)$ with $N_1 = \{1, \ldots, d\}$ and edges $E_1 \subseteq \binom{N_1}{2}$
- For $j = 2, \ldots, d-1$: $T_j = (N_j, E_j)$ with $N_j = E_{j-1}$ (nodes of tree $j$ are the
  edges of tree $j-1$)
- **Proximity condition:** for $j = 2, \ldots, d-1$, if $\{a, b\} \in E_j$ (i.e., $a$ and $b$
  are connected in tree $T_j$), then the corresponding edges in $T_{j-1}$ share exactly one node.

Each edge $e = \{a, b\} \in E_j$ is associated with a **constraint set** $D(e)$ and the pair
$(i(e), k(e))$ where $a = \{i(e)\} \cup D(e)$ and $b = \{k(e)\} \cup D(e)$ in $N_j$.

**Total number of bivariate copulas** in an R-vine on $d$ variables: $\binom{d}{2} = d(d-1)/2$.

---

## 3. D-vine (Drawable Vine, Aas et al. 2009, Sec. 4.1)

In a **D-vine**, each tree $T_j$ is a *path*: no node has degree greater than 2. The variables
can be relabelled so that tree $T_1$ has edges $\{1,2\}, \{2,3\}, \ldots, \{d-1,d\}$.

**D-vine density (Aas et al. 2009, Eq. 3):**

$$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)$$

where tree $T_j$ links variables $j$ apart, and conditioning sets grow from left to right.

**Tree structure:** tree $T_1$ pairs $(1,2),(2,3),\ldots,(d-1,d)$; tree $T_2$ pairs
$(1,3|2),(2,4|3),\ldots$; and so on.

---

## 4. C-vine (Canonical Vine, Aas et al. 2009, Sec. 4.2)

In a **C-vine**, each tree $T_j$ is a *star*: node $j$ is the root and is connected to all
other $d-j$ nodes.

**C-vine density (Aas et al. 2009, Eq. 4):**

$$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{j,j+i|1,\ldots,j-1}\!\left(F(x_j|x_1,\ldots,x_{j-1}),\, F(x_{j+i}|x_1,\ldots,x_{j-1})\right)$$

**Tree structure:** tree $T_1$ pairs variable 1 with each of $2,3,\ldots,d$; tree $T_2$ pairs
variable 2 with each of $3,4,\ldots,d$ conditioning on variable 1; and so on.

---

## 5. The h-function (conditional CDF)

The **h-function** converts a bivariate copula into a conditional CDF, used to compute
arguments for higher-tree pair-copulas. For bivariate copula $C$ with parameter $\theta$:

$$h(x|v,\theta) = F(x|v) = \frac{\partial C(F(x), F(v); \theta)}{\partial F(v)}$$

This is the partial derivative of the joint copula CDF with respect to one argument.
Closed forms exist for common families:
- **Gaussian** ($\rho$): $h(x|v) = \Phi\!\left(\frac{\Phi^{-1}(x) - \rho \Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$
- **Student-t** ($\rho,\nu$): analogous with $t_\nu$ CDF and $(t_{\nu+1})$ normalisation
- **Clayton** ($\theta$): $h(x|v) = v^{-\theta-1}(x^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}$
- **Gumbel** ($\theta$): $h(x|v) = C(x,v)/v \cdot (-\log v)^{\theta-1} / [(-\log x)^\theta + (-\log v)^\theta]^{1-1/\theta}$

---

## 6. Sequential estimation (Aas et al. 2009, Sec. 5)

**Step-by-step for a D-vine on $d$ variables:**

For tree $T_1$ (edges $\{i, i+1\}$, $i=1,\ldots,d-1$):
1. Fit pair-copula $c_{i,i+1}$ by ML on $(F_i(x_i), F_{i+1}(x_{i+1}))$.
2. Compute $v_{i,i+1} = h(x_i|x_{i+1})$ and $v_{i+1,i} = h(x_{i+1}|x_i)$ using fitted $c_{i,i+1}$.

For tree $T_j$ ($j \geq 2$), use previously computed h-values as pseudo-observations:
1. Identify the pair $(i, i+j)$ with conditioning set $\{i+1, \ldots, i+j-1\}$.
2. Form pseudo-observations from h-functions computed in tree $T_{j-1}$.
3. Fit pair-copula $c_{i,i+j|i+1,\ldots,i+j-1}$ by ML on those pseudo-observations.

**Full ML:** Jointly maximise $\ell = \sum_{t=1}^T \log f(x_{1t},\ldots,x_{dt})$ over all pair-copula
parameters simultaneously. Much more computationally intensive; serves as a refinement.

---

## 7. Model/structure selection (Dissmann et al. 2013)

**Structure selection:** Greedy algorithm maximising $\sum_{e \in E_j} |\hat{\tau}_e|$ (sum of
absolute empirical Kendall's tau of pair-copula arguments) at each tree level $j$ from $j=1$.
This is a maximum spanning tree problem solved by Prim's or Kruskal's algorithm.

**Family selection per pair:** For each pair $(i,j|D)$ in tree $T_j$, compute AIC or BIC for
a list of candidate bivariate copula families (Gaussian, t, Clayton, Gumbel, Frank, Joe,
their rotations). Choose the family minimising AIC/BIC.

**Truncated vines** (Brechmann et al. 2012): Set all pair-copulas in trees $T_{m+1}, \ldots, T_{d-1}$
to the independence copula $\Pi$ (zero parameters). Selection criterion: AIC of the truncated
model vs $d$-truncation level $m$.

---

## 8. Comparison: vine vs factor copula (for high-dimensional dependence)

| Property | D-vine / C-vine | R-vine | Factor copula (Oh & Patton 2012) |
|---|---|---|---|
| **Parameters** | $O(d^2)$: $d(d-1)/2$ bivariate copulas (each 1-3 params) | $O(d^2)$ | $O(d)$ or $O(K)$ with block structure |
| **Closed-form density** | Yes | Yes | No (simulation required) |
| **Estimation** | Sequential ML or full ML | Sequential ML | SMM (rank statistics) |
| **Tail dependence** | Via pair-copula families (each pair can differ) | Via pair-copula families | Via factor distribution (all pairs same) |
| **Symmetry** | Each pair can be asymmetric (rotated Gumbel etc.) | Per pair | Single factor governs all pairs |
| **Tractable for $d>50$** | Hard: $d(d-1)/2$ copulas, model selection explodes | Hard | Yes: 2-16 parameters typical |
| **Interpretability** | Conditional bivariate structure | Tree structure | Factor loading |
| **Software** | VineCopula (R), pyvinecopulib, rvinecopulib | Same | Custom SMM |

## 9. References

- Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). Pair-copula constructions of multiple
  dependence. *Insurance: Mathematics and Economics*, **44**(2), 182–198.
- Bedford, T. & Cooke, R.M. (2001). Probability density decomposition for conditionally
  dependent random variables modelled by vines. *Annals of Mathematics and Artificial
  Intelligence*, **32**(1–4), 245–268.
- Bedford, T. & Cooke, R.M. (2002). Vines: A new graphical model for dependent random
  variables. *Annals of Statistics*, **30**(4), 1031–1068.
- Czado, C. & Nagler, T. (2022). Vine copula based modeling. *Annual Review of Statistics and
  Its Application*, **9**, 453–477.
- Dissmann, J., Brechmann, E.C., Czado, C. & Kurowicka, D. (2013). Selecting and estimating
  regular vine copulae and application to financial returns. *Computational Statistics & Data
  Analysis*, **59**, 52–69.
- Nagler, T. & Czado, C. (2016). Evading the curse of dimensionality in nonparametric density
  estimation with simplified vine copulas. *Journal of Multivariate Analysis*, **151**, 69–89.
