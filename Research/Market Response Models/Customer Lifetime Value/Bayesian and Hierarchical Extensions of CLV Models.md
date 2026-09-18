---
title: Bayesian and Hierarchical Extensions of CLV Models
tags:
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
  - topic/hierarchical-models
  - topic/bayesian-inference
  - type/application
  - doc/paper
source: "[[raw/Fader Hardie 2007 - Incorporating Time-Invariant Covariates into the Pareto-NBD and BG-NBD Models.pdf]]"
source_location: "Fader & Hardie (2007) note 019, Secs. 1-4, pp. 1-8; Wang, Liu & Miao (2019, arXiv 1912.07753) Secs. 1-5; PyMC-Marketing clv module source (main branch, read 2026-09-18); lifetimes README"
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
doc_type: paper
depends_on:
  - "[[Pareto-NBD Model]]"
  - "[[BG-NBD Model]]"
  - "[[Gamma-Gamma Model of Monetary Value]]"
  - "[[Shifted-Beta-Geometric Model for Contractual Retention]]"
  - "[[Hierarchical Models]]"
used_by: []
aliases:
  - Bayesian CLV
  - Hierarchical Bayes CLV
  - CLV Covariates
  - PyMC-Marketing CLV
  - ZILN Loss
  - Zero-Inflated Lognormal LTV
---

# Bayesian and Hierarchical Extensions of CLV Models

> [!summary]
> The classical CLV models are already two-level hierarchical models — customers' latent rates are draws from a population distribution — but they are fitted by maximizing the *marginal* likelihood and then plugging point estimates into conditional expectations (parametric empirical Bayes). This note collects the extensions that matter in applied work: (1) **time-invariant covariates**, which enter by rescaling the mixing-distribution parameters and leave every closed form intact (Fader & Hardie 2007, note 019); (2) **full Bayes** — priors on the population parameters and MCMC, as implemented in **PyMC-Marketing** (successor to the archived `lifetimes` package), including hierarchical pooling across cohorts for the sBG; (3) the relaxations the original authors proposed (correlated spend and frequency, cross-cohort layers); and (4) the **supervised machine-learning alternative** for brand-new customers, exemplified by Wang, Liu & Miao's (2019) zero-inflated lognormal (ZILN) loss.

## Overview

Three pressures push beyond the basic models. First, managers want to explain heterogeneity — by acquisition channel, geography, first-basket contents — not just summarize it. Second, a CLV point estimate feeds decisions (bids, retention offers, budget splits) where uncertainty matters. Third, the probability models say nothing useful about a customer with no history: Wang, Liu & Miao observe that the BTYD family "does not apply to new customers because it uses frequency and recency to differentiate customers. New customers, however, have identical purchase frequency and recency."

## Main Content

### 1. Time-invariant covariates (note 019)

> [!theorem] Covariates rescale the mixing distributions ^thm-clv-covariates
> Let $z_1$ be covariates for the purchase process and $z_2$ for dropout (no intercepts). Under a proportional-hazards specification with exponential baseline, $h(t\mid\theta,\gamma,z)=\theta\exp(\gamma'z)$, write $\lambda=\lambda_0e^{\gamma_1'z_1}$ with $\lambda_0\sim\text{gamma}(r,\alpha_0)$. A change of variables shows $\lambda\sim\text{gamma}(r,\alpha_0e^{-\gamma_1'z_1})$. Hence (Fader & Hardie 2007, Secs. 1, 3–4):
>
> - **Pareto/NBD:** replace
>
> $$
> \alpha=\alpha_0\exp(-\gamma_1'z_1),\qquad \beta=\beta_0\exp(-\gamma_2'z_2);
> $$
>
>   $r$ and $s$ are unchanged.
> - **BG/NBD:** replace
>
> $$
> \alpha=\alpha_0\exp(-\gamma_1'z_1),\qquad a=a_0\exp(\gamma_2'z_2),\qquad b=b_0\exp(\gamma_3'z_2);
> $$
>
>   $r$ is unchanged.
>
> The likelihood, $E[X(t)]$, $P(\text{alive})$ and $E[Y(t)\mid x,t_x,T]$ are the basic-model expressions evaluated at these customer-specific parameters.

Details worth remembering:

- **Sign convention.** $\alpha$ is a *rate* parameter of the gamma, so mean purchase rate is $r/\alpha$; a positive $\gamma_1$ *raises* purchasing by *lowering* $\alpha$. The note flags "the addition of minus signs in the exponential terms as we go from multipliers of $\lambda_0,\mu_0$ to multipliers of $\alpha_0,\beta_0$."
- **Branch checks per customer.** For Pareto/NBD the $\alpha\gtrless\beta$ branch of the ${}_2F_1$ expression ([[Pareto-NBD Model#^thm-pnbd-likelihood|likelihood]]) "must now be checked for each $i$", since covariates can flip the ordering across customers.
- **Why BG/NBD needs the beta-logistic.** "It is not possible to include the effects of covariates into $p$ and then allow for unobserved heterogeneity using the beta distribution." Following Heckman & Willis (1977) and Rao & Steckel (1995), covariates enter *both* beta parameters, so BG/NBD carries 50% more covariate coefficients than Pareto/NBD; setting $\gamma_3=0$ "would constrain the way in which the covariates could influence the shape (e.g., variance) of the beta distribution."
- **Identification warning.** Covariates that reflect past targeting (who got the catalogue, who saw the retention offer) are endogenous; the *Marketing Science* and *JMR* papers both warn of "endogeneity bias and sample selection bias" when customers were treated on the basis of past RFM. Coefficients on such covariates are descriptive, not causal lift.

### 2. From empirical Bayes to full Bayes

The classical workflow estimates $(r,\alpha,s,\beta)$ by marginal ML and treats them as known when computing customer-level posteriors — [[Empirical Bayes - Overview|empirical Bayes]]. Full Bayes puts priors on the population parameters and propagates their uncertainty into every $P(\text{alive})$ and CLV. With tens of thousands of customers the population parameters are tightly identified and the difference is small; it matters for small or young cohorts, for covariate coefficients, and whenever a *distribution* of cohort value is needed downstream.

Two architectural choices exist: sample the population parameters using the **closed-form marginal likelihood** (customer traits integrated out analytically, a four-parameter posterior), or sample every customer's $(\lambda_i,\mu_i)$ explicitly by data augmentation. The first is cheap and is what PyMC-Marketing does; the second is what makes non-conjugate or correlated heterogeneity possible — Fader, Hardie & Lee (2005, *JMR* Sec. 5) note that correlation between the spend parameter $\nu$ and purchase rate $\lambda$ "could easily be accommodated by moving to a hierarchical Bayesian formulation of the basic model", as an alternative to a bivariate Sarmanov distribution. (A published example of the individual-level approach is Abe 2009, "Counting Your Customers One by One", *Marketing Science* 28(3), which uses a multivariate lognormal on $(\lambda,\mu)$ with covariates; that paper is **not** ingested in this vault and is cited from memory.)

For contractual data, Fader & Hardie (2007, Sec. 4.3) explicitly propose a third level: let sBG's $(\alpha,\beta)$ vary across cohorts "according to some parametric distribution" so that young cohorts "borrow" strength from old ones — the partial pooling of [[Hierarchical Models]].

### 3. Software: `lifetimes` and PyMC-Marketing

> [!definition] What the packages implement ^def-clv-software
> - **`lifetimes`** (Cameron Davidson-Pilon) exposes `BetaGeoFitter`, `ParetoNBDFitter`, `GammaGammaFitter`, `ModifiedBetaGeoFitter` and `BetaGeoBetaBinomFitter` — maximum-likelihood fitters. Its README states the codebase "has moved to 'archived-mode'" and names **PyMC-Marketing** as the successor.
> - **PyMC-Marketing** (`pymc_marketing.clv`) provides `BetaGeoModel`, `ParetoNBDModel`, `GammaGammaModel` (plus an individual-level variant), `ShiftedBetaGeoModel`, a modified BG and a BG/beta-binomial model, with `rfm_summary()` to build $(x,t_x,T,\bar z)$ from a transaction log. The docstrings cite the same Fader–Hardie papers and notes summarized in this folder, and state that predictive methods were "adapted from the `BetaGeoFitter` class in the legacy `lifetimes` library."

What the PyMC-Marketing source shows (main branch, September 2026; check the installed version before relying on defaults):

- **Priors on population parameters.** `BetaGeoModel` defaults: $r\sim\text{Weibull}(2,1)$, $\alpha\sim\text{Weibull}(2,10)$; the beta parameters are built as $a=\phi\kappa$, $b=(1-\phi)\kappa$ with $\phi\sim\text{Uniform}(0,1)$ and $\kappa\sim\text{Pareto}(1,1)$ — a mean/concentration parametrization the code comments call "hierarchical pooling of dropout rate priors." `GammaGammaModel` defaults: $p,q\sim\text{Weibull}(2,1)$, $v\sim\text{Weibull}(2,10)$.
- **Fitting.** The `BetaGeoModel` docstring describes `fit_method='mcmc'` as the default ("informative predictions and reliable performance on small datasets") and `'map'` as the fast option for large datasets that "will give limited insights into predictive uncertainty." For Pareto/NBD the source registers a graph rewrite that caps iterations in the ${}_2F_1$ gradient loop because "this is critical to get NUTS to converge in the beginning" — the hypergeometric function is still the pain point, now for gradients.
- **Covariates.** `purchase_covariate_cols` and `dropout_covariate_cols` implement note 019 literally: `alpha = alpha_scale * exp(-X @ coef)` in Pareto/NBD, and $a,b$ each scaled by $\exp(X\gamma)$ in BG/NBD, with Normal priors on coefficients.
- **Cohort pooling for sBG.** `ShiftedBetaGeoModel` takes a `cohort` column and gives $\phi,\kappa$ a `cohort` dimension, producing cohort-level $(\alpha,\beta)$; it requires $1\le\text{recency}\le T$ and $T\ge2$.
- **Outputs.** `expected_purchases`, `expected_probability_alive`, `expected_purchases_new_customer`, `expected_customer_spend`, and `expected_customer_lifetime_value` (which combines a fitted transaction model with gamma-gamma spend and a discount rate) return posterior draws per customer, so CLV comes with a credible interval. Note that `expected_customer_lifetime_value` is a period-by-period discounted sum over `future_t` months, "adapted from the legacy `lifetimes` library" — a finite-horizon calculation, not the closed-form infinite-horizon DET of [[RFM Sufficient Statistics and Iso-Value Curves]].

### 4. The machine-learning alternative: ZILN

Wang, Liu & Miao (2019) treat LTV prediction for **new** customers as supervised regression of total spend over a fixed horizon (1–3 years after the first purchase) on sign-up and first-purchase features. Two data problems break MSE: "many customers are one-time purchasers", producing a spike of zeros, and returning customers' LTV spans orders of magnitude.

> [!definition] Zero-inflated lognormal loss ^def-ziln
> With $p$ the probability of returning and $(\mu,\sigma)$ the lognormal parameters for returning customers (Eqs. 1–4):
>
> $$
> L_{\text{Lognormal}}(x;\mu,\sigma)=\log\!\big(x\sigma\sqrt{2\pi}\big)+\frac{(\log x-\mu)^2}{2\sigma^2},
> $$
>
> $$
> L_{\text{ZILN}}(x;p,\mu,\sigma)=L_{\text{CrossEntropy}}\big(\mathbf 1_{\{x>0\}};p\big)+\mathbf 1_{\{x>0\}}\,L_{\text{Lognormal}}(x;\mu,\sigma).
> $$
>
> A network's last layer emits three logits mapped by sigmoid, identity and softplus to $(p,\mu,\sigma)$; the prediction is $p\cdot\exp(\mu+\sigma^2/2)$. One model replaces the usual two-stage (classifier then regressor) pipeline and yields a full predictive distribution.

They recommend evaluating **discrimination** with the normalized Gini coefficient and **calibration** with decile charts, rather than MSE. On the Kaggle Acquire Valued Shoppers data, ZILN raises Spearman correlation over MSE "on average 23.9% higher for the linear model and 48.0% higher for DNN"; on KDD Cup 1998 donation data (50 repeat runs), ZILN versus MSE gives Spearman 0.027 vs 0.020, normalized Gini 0.190 vs 0.184, and decile-level MAPE 0.176 vs 0.210.

The ZILN model is the hurdle/zero-inflation idea of [[Monsters and Mixtures]] with a neural mean function. It trades the behavioural structure of BTYD (extrapolation beyond the label horizon, the increasing-frequency paradox, coherent $P(\text{alive})$) for the ability to use arbitrary features and to score customers on day one.

### Choosing among them

| Situation | Reasonable default |
|---|---|
| Existing customers, transaction log only, noncontractual | [[BG-NBD Model]] or [[Pareto-NBD Model]] + [[Gamma-Gamma Model of Monetary Value]], by cohort |
| Subscription with renewal dates | [[Shifted-Beta-Geometric Model for Contractual Retention]], cohort-pooled |
| Need uncertainty, small cohorts, or covariates | Full Bayes (PyMC-Marketing), covariates per note 019 |
| Brand-new customers, rich features, fixed horizon | Supervised model with ZILN-type loss |
| Need the *effect* of a marketing action on CLV | None of the above alone: use an experiment or a causal design with model-based CLV as the outcome |

## Examples

**Channel as a purchase-rate covariate.** Let $z_1=1$ for customers acquired through paid social and $0$ otherwise, with CDNOW-like BG/NBD baseline $r=0.243$, $\alpha_0=4.414$, and suppose $\hat\gamma_1=-0.4$. Then $\alpha=4.414\,e^{0.4}=6.58$ for paid-social customers, and their mean purchase rate while alive is $r/\alpha=0.037$ per week versus $0.055$ for the rest — a ratio of $e^{-0.4}=0.67$. Every downstream quantity (expected purchases, DET, CLV) is recomputed with $\alpha=6.58$. Whether the channel *caused* lower-value customers or merely *selected* them is not identified by this model.

**Full-Bayes fit (API as shown in the PyMC-Marketing main-branch docstrings; older releases pass `data=` to the constructor instead of `fit`):**

```python
from pymc_marketing.clv import BetaGeoModel, GammaGammaModel, rfm_summary

rfm = rfm_summary(transactions, "customer_id", "date", monetary_value_col="amount")
# -> customer_id, frequency, recency, T, monetary_value

bg = BetaGeoModel()                        # optional model_config / sampler_config dicts
bg.fit(data=rfm)                           # MCMC by default; bg.fit(data=rfm, fit_method="map") for large data
p_alive = bg.expected_probability_alive()  # posterior draws per customer
n_next = bg.expected_purchases(future_t=39)

gg = GammaGammaModel()
gg.fit(data=rfm[rfm.frequency > 0])
clv = gg.expected_customer_lifetime_value(
    transaction_model=bg, data=rfm, future_t=12, discount_rate=0.01, time_unit="W",
)                                          # future_t is in months
```

Check calibration exactly as the 2005 papers do — histogram, tracking plot, conditional expectations on a holdout — which in Bayesian terms is [[Posterior Predictive Checking]].

## Connections

- [[Pareto-NBD Model]], [[BG-NBD Model]], [[Gamma-Gamma Model of Monetary Value]], [[Shifted-Beta-Geometric Model for Contractual Retention]] — the base models being extended.
- [[Hierarchical Models]] — population distribution over customer traits; a further level over cohorts.
- [[Empirical Bayes - Overview]] — the classical plug-in workflow as an approximation to full Bayes.
- [[MCMC Basics]] and [[Efficient MCMC]] — NUTS on the marginal likelihood; the ${}_2F_1$ gradient as the computational bottleneck.
- [[Bayesian Estimation and Priors for MMM]] — same PyMC tooling and prior-elicitation habits used for media mix models.
- [[Monsters and Mixtures]] — zero-inflated and hurdle likelihoods behind ZILN.
- [[Generalized Linear Models]] — log-link covariate effects on rates; proportional hazards with an exponential baseline.

## See Also

- [[RFM Sufficient Statistics and Iso-Value Curves]] — what the behavioural model buys you that a feature-based regressor does not.
- [[Metalearners for CATE]] — for targeting decisions, predicted value is not predicted uplift.
- [[ROAS, mROAS, and Optimal Media Mix]] and [[Optimal Marketing Decisions and Forecasting]] — consuming CLV as the value metric in budget allocation.
- [[Partial Pooling as Multiple Comparisons Correction]] — why pooled cohort estimates are safer to compare than separately fitted ones.
- [[Discrete Choice Models]] — random-coefficient heterogeneity in choice models, the closest methodological cousin elsewhere in the vault.
