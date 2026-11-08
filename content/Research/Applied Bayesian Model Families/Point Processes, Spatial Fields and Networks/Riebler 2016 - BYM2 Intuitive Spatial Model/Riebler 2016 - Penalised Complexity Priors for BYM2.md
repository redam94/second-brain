---
title: "Riebler 2016 - Penalised Complexity Priors for BYM2"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping.pdf]]"
source_location: "Sec. 4 and Appendix C, pp. 8-10, 23-24, Fig. 2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Riebler 2016 - BYM2 Intuitive Spatial Model"
doc_type: paper
depends_on:
  - "[[Riebler 2016 - Scaling and the BYM2 Construction]]"
used_by:
  - "[[Riebler 2016 - Simulation Study and Sardinia IDDM Application]]"
aliases:
  - "PC prior for BYM2"
  - "penalised complexity prior"
  - "type-2 Gumbel"
---

# Riebler 2016 - Penalised Complexity Priors for BYM2

> [!summary]
> PC priors place an exponential prior on the Kullback-Leibler "distance" from a flexible model to a base model. For BYM2: $\pi(\tau_b)=\frac\theta2\tau_b^{-3/2}\exp(-\theta\tau_b^{-1/2})$ (type-2 Gumbel), i.e. an exponential prior on $\sigma=\tau_b^{-1/2}$, calibrated by $\Pr(\sigma>U)=\alpha$ giving $\theta=-\ln\alpha/U$; and a tabulated prior on $\phi$ (via $\text{logit}\,\phi$) calibrated by $\Pr(\phi<U)=\alpha$, shrinking to $\phi=0$.

## Overview
Four principles (Simpson et al.): (1) Occam's razor, (2) KLD measures complexity, (3) constant-rate penalisation, (4) user-defined scaling. BYM2 is a flexible extension of two nested base models: level 1 = constant risk (infinite precision); level 2 (given variance) = unstructured noise only ($\phi=0$).

## Main Content

> [!definition] PC prior distance
> $d(\cdot)=\sqrt{2\,\text{KLD}(\text{flexible}\,\|\,\text{base})}$; prior: $d\sim\text{Exp}(\lambda)$, then transform by change of variables.

^def-pc-distance

> [!theorem] PC prior for the precision $\tau_b$ (Sec. 4.1, App. C.1)
> Base: large fixed precision $\tau_0\gg\tau_b$. The $(n-1)$-dimensional stochastic part gives $\text{KLD}(\tau_b)=\frac{n-1}2\big(\frac{\tau_0}{\tau_b}-1-\log\frac{\tau_0}{\tau_b}\big)\to\frac{n-1}{2}\frac{\tau_0}{\tau_b}$, so $d(\tau_b)\to\sqrt{(n-1)\tau_0/\tau_b}$. With $\theta=\lambda\sqrt{(n-1)\tau_0}$ held fixed as $\tau_0\to\infty$:
> $$
> \pi(\tau_b)=\frac\theta2\,\tau_b^{-3/2}\exp\big(-\theta\tau_b^{-1/2}\big),\qquad \theta=-\frac{\ln\alpha}{U}\ \text{from }\Pr(\tau_b^{-1/2}>U)=\alpha.
> $$
> Interpretation: $\sigma=\tau_b^{-1/2}\sim\text{Exp}(\theta)$. Example: $\Pr(\sigma>1)=0.01$ is about "99% probability that residual relative risk is below 2". The paper's Fig. 2 uses $U=1,\alpha=0.01$ (so $\theta\approx4.605$).

^thm-pc-tau

> [!theorem] PC prior for the mixing parameter $\phi$ (Sec. 4.2, App. C.2)
> With $\Sigma_{base}=I$, $\Sigma_{flex}(\phi)=(1-\phi)I+\phi Q^{\star-}$:
> $$
> \text{KLD}(\phi)=\tfrac12\big(\mathrm{tr}\,\Sigma_{flex}-n-\log|\Sigma_{flex}|\big)=\tfrac12\Big(\phi\,(\mathrm{tr}\,Q^{\star-}-n)-\sum_{i=1}^n\log(1-\phi+\phi\tilde\gamma_i)\Big),
> $$
> $\tilde\gamma_i=1/\gamma_i$ for eigenvalues $\gamma_i>0$ of $Q^\star$ and $0$ for the zero eigenvalue. Put $d(\phi)=\sqrt{2\,\text{KLD}(\phi)}\sim\text{Exp}(\lambda)$ and transform to the logit scale; no closed form. Calibrate $\lambda$ by $\Pr(\phi<U)=\alpha$; INLA: `INLA:::inla.pc.bym.phi(Q, rankdef=1, u=0.5, alpha=2/3)`. Reasonable default: $\Pr(\phi<0.5)=2/3$ (conservative: unstructured part dominates).

^thm-pc-phi

(The printed formula in the paper reads $\frac12 (n\phi\,\mathrm{tr}(Q_\star^{-1})/n\ldots)$ with an extraction ambiguity; the expression above is the algebraic expansion of the trace form and is what the code below uses.)

Why not gamma priors: gamma$(1,0.01)$ has no density at the base model, so the base model can never be reached (overfitting); uniform priors on $\phi$ ignore the shrinkage principle. Figure 2: PC($\tau_b$; $U=1,\alpha=0.01$) vs Gamma(1, rate .01/.02); PC($\phi$; $U=.5,\alpha=2/3$) vs Uniform(0,1).

## Examples

> [!example] Distances and PC density on a 16-node grid
> Using the scaled grid from [[Riebler 2016 - Scaling and the BYM2 Construction]]: $d(\phi)\approx$ 0.029, 0.280, 1.244, 2.298, 2.876 at $\phi=0.01,0.1,0.5,0.9,0.99$ (verified numerically); $\pi(\tau)$ at $\tau=1,10,100$ with $\theta=4.605$ equals 0.0230, 0.0170, 0.00145 (units: per unit precision).

```python
import numpy as np
def pc_tau_pdf(tau, U=1., alpha=.01):
    th = -np.log(alpha)/U; return th/2*tau**-1.5*np.exp(-th*tau**-.5)
def d_phi(phi, Qs):
    n = Qs.shape[0]; ev = np.linalg.eigvalsh(Qs); g = np.where(ev > 1e-9, 1/np.maximum(ev, 1e-9), 0.)
    return np.sqrt(2*0.5*(phi*(g.sum()-n) - np.sum(np.log(1-phi+phi*g))))
```
PyMC: `sigma = pm.Exponential("sigma", rate=-np.log(alpha)/U)` implements the PC prior on $\tau_b$ in standard-deviation form; the $\phi$ prior needs a tabulated log-density via `pm.CustomDist` or a Beta approximation.

## Connections
[[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] tests these priors; compare to default priors in [[Prior Predictive Checking]].

## See Also
[[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]]
