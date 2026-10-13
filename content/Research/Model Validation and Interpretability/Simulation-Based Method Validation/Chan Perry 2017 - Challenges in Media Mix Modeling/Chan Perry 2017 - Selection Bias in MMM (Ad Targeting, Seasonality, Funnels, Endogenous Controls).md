---
title: "Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - topic/causal-inference
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "§4.2 Selection bias (p.8): §4.2.1 Ad targeting (p.8), §4.2.2 Seasonality (p.9), §4.2.3 Funnel effects incl. endogenous controls such as price (p.9)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]]"
  - "[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]"
  - "[[Omitted Variables Bias]]"
  - "[[DAGs and Causal Identification]]"
used_by:
  - "[[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]]"
  - "[[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]]"
aliases:
  - Chan Perry selection bias taxonomy
  - MMM funnel effect bias
  - Paid search selection bias in MMM
  - Endogenous price control in MMM
  - Unobserved demand d_t
---

# Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)

> [!summary]
> Chan & Perry call selection bias "perhaps ... the largest hurdle to MMMs providing valid estimates of advertising
> effectiveness" (§4.2, p.8). It arises when a media input is correlated with an **unobserved demand variable $d_t$** that
> also drives sales; omitting $d_t$ leaves the regression unable to separate media effect from demand. Four mechanisms:
> **ad targeting** (remarketing, paid search reach people who already want the product), **seasonality** (spend follows
> demand; proxies such as category sales are imperfect), **funnel effects** (an upstream channel such as TV raises a
> downstream channel such as paid search, so a single-equation Eq. (3) mis-attributes), and **endogenous controls** (price
> set in response to advertising is not properly controlled for by simply including it).
^summary

## Overview

This note expands the selection-bias bracket of the potential-outcomes decomposition
([[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions#^def-cp-selection-decomp]]) into the
regression setting of Eq. (3). Each mechanism violates trustworthiness condition 4 or 5 of
[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification#^thm-cp-trust-conditions]].

## Main Content

> [!definition] Selection bias in a regression MMM (§4.2, p.8)
> Selection bias occurs when an input media variable $x_{t,m}$ is correlated with an **unobservable demand variable
> $d_t$**, which in turn drives sales. When $d_t$ is omitted from the regression, "the model has no way to attribute sales
> between those due to the media channel or to the underlying demand" (p.8).
^def-cp-selection-bias-regression

**Formal reading (vault sketch, standard omitted-variable algebra).** Suppose the truth is
$y_t=\beta x_t+\delta d_t+\epsilon_t$ and the fitted model omits $d_t$. Then
$$
\operatorname{plim}\hat\beta=\beta+\delta\,\frac{\operatorname{Cov}(x_t,d_t)}{\operatorname{Var}(x_t)}.
$$
Targeting toward demand makes $\operatorname{Cov}(x_t,d_t)>0$ and $\delta>0$, so ROAS is overstated. Including an
imperfect proxy $\tilde d_t=d_t+u_t$ only removes part of the bias (attenuation of the proxy's coefficient leaves the
remainder on $x_t$). See [[Omitted Variables Bias]].

### §4.2.1 Ad targeting (p.8)

> [!theorem] Targeting-induced selection bias (§4.2.1, p.8)
> Targeted ads reach a segment that has *already shown interest* in the product. That interest is not observed and not in
> the model, so the ad channel absorbs credit for it. The paper says this is "particularly acute in digital channels".
> Two severe cases:
> 1. **Remarketing ads**: targeted to users who already visited the advertiser's website.
> 2. **Paid search ads**: targeted to users who issued a related query on a search engine.
^thm-cp-targeting-bias

Both channels are *triggered* by the demand they are supposed to be credited with creating. The field evidence on the
size of this bias for paid search is in [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]; the
individual-level analogue is [[Activity Bias in Advertising]]. The paper's remedy (search query volume as a demand
control) is in [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]].

### §4.2.2 Seasonality (p.9)

> [!theorem] Seasonal targeting and imperfect proxies (§4.2.2, p.9)
> When media is timed to the seasonality of demand, spend and sales co-move for reasons other than the ad effect. The
> paper's example is cold medicine, whose demand follows the cold and flu season; advertisers raise and lower spend
> according to their understanding of that demand.
>
> MMMs try to control for this with **proxies** for demand seasonality, commonly **category sales**, "but there is no
> guarantee these proxies are an accurate reflection of the underlying demand for the product. Inaccurate proxies in turn
> lead to biased estimates of the regression coefficients" (p.9).
>
> **Related omitted-variable cases** (p.9): advertising at times and places chosen for fashions or events that cannot be
> modeled accurately; advertising in reaction to competitor activities the modeler has no data on but which directly
> affect sales.
^thm-cp-seasonality-bias

The time-series side of this problem (trending and seasonal series that co-move without causal connection) is the
spurious-regression problem of [[Granger 2003 - Spurious Regression and Cointegration - Overview]].

### §4.2.3 Funnel effects (p.9)

> [!theorem] Funnel effects bias a single-equation MMM (§4.2.3, p.9)
> If an ad channel also changes the level of another ad channel, fitting all channels simultaneously in one equation
> such as Eq. (3) "will lead to biased estimates". Example: a **TV** campaign drives more related queries, which increase
> the volume of **paid search** ads. The reason: the downstream ads were affected by TV, and in assessing TV's ROAS the
> single-equation linear regression "does not account for the changes in paid search ads caused by TV" (p.9). The paper
> points to Angrist & Krueger (1999) for a derivation of the size of the bias.
>
> **Rule:** "Downstream ads should not be included with exogenously-determined ads in a single regression equation" (p.9).
>
> **Alternatives:** graphical models (Pearl 2009) and structural equation models. **Caveat:** the problem "isn't only a
> matter of model form"; both alternatives must estimate the causal effect of upstream ads on downstream ads, "which has
> just as stringent data requirements as estimating the effect of an ad channel on sales" (p.9).
^thm-cp-funnel-bias

**Proof sketch (vault, linear case).** Let $s_t=\pi\,\mathrm{TV}_t+v_t$ (search volume driven by TV) and
$y_t=\beta_{TV}\mathrm{TV}_t+\beta_S s_t+\epsilon_t$. The **total** effect of TV on sales is $\beta_{TV}+\beta_S\pi$.
Regressing $y_t$ on both $\mathrm{TV}_t$ and $s_t$ returns $\beta_{TV}$ only, the *direct* effect, because conditioning
on the mediator $s_t$ blocks the path $\mathrm{TV}\to s\to y$. TV's ROAS is understated by $\beta_S\pi$, and that credit
lands on paid search. If paid search is also demand-targeted (§4.2.1), its coefficient picks up demand as well, so the
two biases compound. In DAG terms, $s_t$ is a post-treatment variable for TV; see [[DAGs and Causal Identification]] and
[[Spurious Association and Confounds]] (post-treatment bias).

### Endogenous control variables (§4.2.3, p.9)

> [!theorem] Controls partly determined by advertising (§4.2.3, p.9)
> Many important variables "may be partially determined by the advertiser's own ad choices", so including them as
> controls causes the same problem as the TV-search case "through a different mechanism". Example: **price** strongly
> affects sales and must be controlled for somehow, but if the advertiser sets price partly in response to advertising,
> such as supporting a campaign with a discount, "then including price in a regression equation will not properly control
> for this relationship" (p.9).
^thm-cp-endogenous-controls

This is the "bad control" problem: a variable on the causal path from treatment, or jointly determined with it, cannot
be adjusted for like a pre-treatment confounder. See [[Q - Covariate Adjustment for Precision vs Identification]].

## Examples

> [!example] Funnel bias in numbers (vault illustration, not from the paper)
> Each extra \$1k of weekly TV spend raises related queries by $\pi=40$, and each query (through the search ads it
> triggers) brings $\beta_S=\$50$ of incremental sales. The indirect effect of TV is $40\times\$50=\$2{,}000$ per \$1k,
> i.e. \$2 per TV dollar. TV's direct effect is $\beta_{TV}=\$1$ per dollar. True TV ROAS is $\$3$. A single-equation MMM with both TV and search
> volume estimates TV ROAS near $\$1$ and moves $\$2$ per TV dollar onto search. A budget optimizer would then cut TV,
> which also shrinks the search volume it is crediting.
^ex-cp-funnel-numbers

> [!example] Endogenous price control (vault illustration)
> A brand runs a 10% discount in every week with a TV flight. Price and TV are now collinear and price is a consequence
> of the TV decision. Including price absorbs part of the campaign's joint effect into the price coefficient; excluding it
> credits the discount's sales to TV. Neither single equation answers "what does TV do holding the pricing policy
> fixed?"; that requires modeling the decision rule or an experiment that varies one without the other.
^ex-cp-endogenous-price

## Connections

- Figure 5 of the paper (media funnel diagram) is described in
  [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]].
- Observational adjustment's track record against experiments: [[Experimental Benchmarks for Observational Ad Measurement]].
- Interventional vs. observational relevance of a feature (why a model's reliance on a proxy differs from its causal
  role): [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].
- Double-ML adjustment for observed confounders in ad-spend data:
  [[Dillon et al - SHAP and Causal Insights - Overview]].
- Instruments as an alternative identification route for endogenous spend: [[Instrumental Variables]].

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[Directed Acyclic Graphs]]: graphical representation of funnels and confounding
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]: a simulator with a paid-search module whose
  queries are driven by latent demand, built to test exactly these biases
- [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]] — empirical magnitude of paid-search targeting bias
