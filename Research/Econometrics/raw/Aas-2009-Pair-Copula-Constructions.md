# Source Reference: Aas et al. (2009)

**Citation:** Aas, K., Czado, C., Frigessi, A., & Bakken, H. (2009). "Pair-copula constructions of multiple dependence." *Insurance: Mathematics and Economics*, 44(2), 182–198.

**DOI:** 10.1016/j.insmatheco.2007.02.001

**Note:** PDF could not be downloaded during ingestion (network egress policy blocked academic journal domains). Notes are based on the paper's contents as documented in academic literature. The paper is freely available from:
- University of Munich preprint server (epub.ub.uni-muenchen.de)
- Author preprint at Norwegian Computing Center (www.nr.no)

## Abstract (from public sources)

Multivariate data, which exhibit complex patterns of dependence in the tails, can be modelled using a cascade of pair-copulae, acting on two variables at a time. We use the pair-copula decomposition of a general multivariate distribution and propose a method for performing inference. The approach is based on the idea of Bedford, Cooke and Joe, but we are able to implement inference for these models in a much more efficient way than is possible with existing techniques and Markov chain Monte Carlo methods. We show that the resulting method of inference leads to models that provide a better fit to financial data than standard multivariate normal or t copula models.

## Key contributions

1. Made Bedford & Cooke (2001/2002) pair copula constructions computationally feasible via sequential ML estimation
2. Introduced C-vine and D-vine as the two canonical special cases of regular vines
3. Derived the h-function formula for conditional CDF computation at each tree level
4. Demonstrated superior fit to financial data (exchange rates, German DAX stocks) vs. Normal and $t$ copulas

## Companion references

- Bedford & Cooke (2001) — "Probability density decomposition for conditionally dependent random variables modelled by vines" (*Annals of Mathematics and Artificial Intelligence*)
- Bedford & Cooke (2002) — "Vines — A new graphical model for dependent random variables" (*Annals of Statistics*)
- Joe (1996) — "Families of $m$-variate distributions with given margins and $m(m-1)/2$ bivariate dependence parameters" (*Distributions with Fixed Marginals and Related Topics*)
- Czado & Nagler (2022) — "Vine copula based modeling" (*Annual Review of Statistics and Its Application*, 9, 453–477)
