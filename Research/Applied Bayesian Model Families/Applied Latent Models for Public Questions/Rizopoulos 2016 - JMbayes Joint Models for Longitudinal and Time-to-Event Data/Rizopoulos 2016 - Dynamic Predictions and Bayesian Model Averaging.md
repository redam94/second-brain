---
title: "Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Sec. 5.1-5.2, pp. 23-30; Eq. 10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on:
  - "[[Rizopoulos 2016 - Joint Model Specification and Posterior]]"
  - "[[Rizopoulos 2016 - Association Structures and Transformation Functions]]"
used_by:
  - "[[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]]"
  - "[[Rizopoulos 2016 - JMbayes Joint Models Overview]]"
aliases:
  - "dynamic predictions joint models"
  - "Bayesian model averaging joint models"
  - "conditional survival probability longitudinal"
---

# Rizopoulos 2016 - Dynamic Predictions and Bayesian Model Averaging

> [!summary]
> For a new patient with biomarker history $Y_j(t)$ and survival to $t$, the model gives the conditional survival probability $\pi_j(u\mid t)=P(T_j^*\ge u\mid T_j^*>t,Y_j(t),\mathcal D_n)$ and expected future biomarker $\omega_j(u\mid t)$, updated as new measurements arrive. Predictions from several association structures are combined with subject- and time-specific posterior model weights, computed by Laplace approximation.

## Main Content

> [!definition] Dynamic predictions (Sec. 5.1)
> $$\pi_j(u\mid t)=\int P(T_j^*\ge u\mid T_j^*>t,Y_j(t),\theta)\,p(\theta\mid\mathcal D_n)\,d\theta,\quad \omega_j(u\mid t)=\int\mathbb E[y_j(u)\mid T_j^*>t,Y_j(t),\theta]\,p(\theta\mid\mathcal D_n)\,d\theta.$$
^def-dynamic

> [!theorem] Conditional survival via random effects
> $$P(T_j^*\ge u\mid T_j^*>t,Y_j(t),\theta)=\int\frac{S_j(u\mid H_j(u,\mathbf b_j),\theta)}{S_j(t\mid H_j(t,\mathbf b_j),\theta)}\,p(\mathbf b_j\mid T_j^*>t,Y_j(t),\theta)\,d\mathbf b_j,$$
> and $\mathbb E[y_j(u)\mid\dots]=\mathbf x_j(u)^\top\boldsymbol\beta+\mathbf z_j(u)^\top\bar{\mathbf b}_j^{(t)}$ with $\bar{\mathbf b}_j^{(t)}=\int\mathbf b_jp(\mathbf b_j\mid T_j^*>t,Y_j(t),\theta)d\mathbf b_j$. Estimated by Monte Carlo over posterior draws of $\theta$ and $\mathbf b_j$ (200 samples by default; `survfitJM()`, `predict()`); a first-order version $\tilde\pi_j(u\mid t)=S_j(u\mid H_j(u,\hat{\mathbf b}_j),\hat\theta)/S_j(t\mid H_j(t,\hat{\mathbf b}_j),\hat\theta)$ is available with `simulate=FALSE`. Conditional independence (Eqs. 4-5) makes the first factor tractable.
^thm-dynamic-surv

**Patient 2 example.** Using `jointFit.pbc15` and last measurement at about 8.83 years, the event-free probability falls from 1.00 to 0.99 (8.92 y), 0.945 (9.25 y), 0.90 (9.58 y), 0.857 (9.90 y), 0.81 (10.23 y), 0.77 (10.55 y), 0.72 (10.88 y), 0.68 (11.21 y) (posterior mean, widening 95% intervals: at 11.21 y the interval is 0.27-0.93). `predict(type="Subject", interval=...)` gives future log bilirubin with intervals; a shiny app (`runDynPred()`) provides the same interactively.

> [!theorem] Bayesian model averaging (Eq. 10)
> For models $M_1..M_K$ (different association structures):
> $$P(T_j^*>u\mid \mathcal D_j(t),\mathcal D_n)=\sum_{k=1}^KP(T_j^*>u\mid M_k,\mathcal D_j(t),\mathcal D_n)\,p(M_k\mid\mathcal D_j(t),\mathcal D_n),$$
> with weights $p(M_k\mid\mathcal D_j(t),\mathcal D_n)=\dfrac{p(\mathcal D_j(t)\mid M_k)\,p(\mathcal D_n\mid M_k)\,p(M_k)}{\sum_\ell p(\mathcal D_j(t)\mid M_\ell)\,p(\mathcal D_n\mid M_\ell)\,p(M_\ell)}$, where $\mathcal D_j(t)=\{T_j^*>t,Y_j(t),\mathbf w_j\}$. Marginal densities use Laplace approximations (first integrate random effects, then parameters; Tierney and Kadane 1986). The new patient informs only the weights, not $\theta$; priors $p(M_k)=1/K$. Weights are subject- and time-specific (Rizopoulos et al. 2014). In `JMbayes`: `marglogLik()`, `logLik(marginal.thetas=TRUE)`, `bma.combine()`.
^thm-bma

> [!example] BMA for Patient 2 (first five measurements)
> Models pbc1, pbc12, pbc13, pbc14, pbc15. The weights are dominated by pbc14 (shared random effects). BMA event-free probabilities fall from 0.99 at 5.0 y to 0.74 at 7.9 y and 0.43 at 11.2 y (95% bands 0.09-0.75 at the end). Interpretation: with only five measurements the model that captures baseline level and slope through random effects explains this patient's trajectory best; a different patient or later time could favour other structures.
^ex-bma
```python
import numpy as np
def bma_weights(log_pDj, log_pDn, log_prior):
    w = np.asarray(log_pDj) + np.asarray(log_pDn) + np.asarray(log_prior)
    w = np.exp(w - w.max()); return w / w.sum()       # stabilised softmax, as in the paper's R code
```

## Connections
[[Model Comparison]], [[Survival Analysis]], [[Rizopoulos 2016 - Predictive Accuracy and Cross-Validation]].

## See Also
[[Rizopoulos 2016 - JMbayes Joint Models Overview]]
