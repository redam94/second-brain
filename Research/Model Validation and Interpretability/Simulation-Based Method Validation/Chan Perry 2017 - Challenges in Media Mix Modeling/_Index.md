---
title: "Index: Chan Perry 2017 - Challenges in Media Mix Modeling"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Simulation-Based Method Validation]]"
date_updated: 2026-10-13
concept_count: 7
---

# Chan Perry 2017 - Challenges in Media Mix Modeling

> [!abstract] Routing Summary
> This folder fully captures Chan & Perry (2017), *Challenges And Opportunities In Media Mix Modeling* (Google white
> paper, 16 pp.). The paper explains why regression MMMs on aggregate observational data struggle to give causal ROAS and
> what could help, ending with simulation-based validation and transparency. 8 notes: an overview with a complete source
> map, the causal framing, data and model specification, three challenge notes, opportunities, and validation.
> - Need the big picture or a section -> note map? -> [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
> - Why not just run experiments or match? Selection-bias decomposition, Eq. (1)? -> [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]]
> - MMM data sources and quality problems; Eqs. (2)-(3); conditions for trustworthy estimates? -> [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]
> - 156 rows vs. parameters, correlated channels (Fig. 1), extrapolation and average vs. marginal ROAS (Fig. 2)? -> [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]
> - Ad targeting, seasonality, funnel effects (TV -> search), endogenous price controls? -> [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]]
> - Why fit/R^2/MAPE cannot pick the causal model; the five-model case study (Figs. 3-4)? -> [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]
> - Bayesian, category, geo, search-volume controls, graphical models, media-funnel diagram (Fig. 5)? -> [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]]
> - Simulated data with withheld truth, RFP testing, transparency obligations (§5.6, §6)? -> [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]]
^routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Selection-bias decomposition | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] | definition | [[Potential Outcomes Framework]] | Naive on/off = effect on treated + selection bias |
| Matching estimator (Eq. 1) | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] | definition | [[Common Support and Overlap]] | Needs off-periods for every control cell; infeasible with ~156 correlated rows |
| Additive MMM (Eqs. 2-3) | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] | definition | [[Carryover (Adstock) Functional Forms]] | $y_t=\sum_m\beta_mf_m(\cdot)+\gamma^\top z_t+\epsilon_t$ |
| Trustworthiness conditions | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] | theorem | Eq. (3) | Enough data, variability, independent inputs, all drivers, causal structure |
| Sample-size gap | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] | theorem | Eq. (3) | 156 rows vs. 60-80+ parameters; rule 7-10 rows/param |
| Correlated inputs (Fig. 1) | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] | example | Eq. (3) | Equal-fit planes, different slopes, unstable estimates |
| Extrapolation (Fig. 2) | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] | example | [[ROAS, mROAS, and Optimal Media Mix]] | mROAS identifiable near current spend; average ROAS not |
| Selection bias via $d_t$ | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]] | theorem | [[Omitted Variables Bias]] | Targeting, seasonality, funnels, endogenous controls |
| Selection by fit fails | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] | theorem | [[Researcher Degrees of Freedom]] | Predictive accuracy cannot screen wrong ROAS |
| Five-model case study (Figs. 3-4) | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] | example | — | $R^2$ 0.98-0.99; MAPE 6-8%; 50% sales disagreement; per-model Fig. 3 ordering; conflicting allocations incl. kinked Model 3 path |
| Category and geo hierarchical MMM | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] | definition | [[Hierarchical Models]] | More independent variation, lower variance, fewer equal-fit models |
| Demand-proxy controls | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] | theorem | [[DAGs and Causal Identification]] | Query volume for paid search; site visits for remarketing |
| Media funnel graph (Fig. 5) | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] | example | [[Directed Acyclic Graphs]] | Mass media -> interest -> intent signals -> targeted ads -> sales |
| Simulation-based validation | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] | theorem / algorithm | [[Designing Simulated-Data Experiments]] | Known truth; robustness sweeps; blind RFP |
| Transparency obligations | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] | theorem | — | Disclose model choice, model uncertainty, prior vs. data influence |

## Notes

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — CONTAINS: research question, contribution, key-findings table, full Source Map (every section, equation, figure -> note), paper limitations, full reference list.
- [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] — CONTAINS: three causal questions (§1), roadmap, RCT definition and barriers (§2.1), potential-outcomes notation, selection-bias decomposition with derivation, Eq. (1) matching estimator and overlap failure (§2.2), numeric seasonal selection-bias example.
- [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] — CONTAINS: four data types (§3.1), table of six data-quality problems, Eq. (2) general MMM, Eq. (3) additive MMM with all symbols, five trustworthiness conditions mapped to §4, parameter-count example.
- [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] — CONTAINS: §4 intro, sample-size gap (156 rows, 20+ channels, 3-4 params, 7-10 rule) with arithmetic, correlated-input consequences, Figure 1 description and sum-vs-contrast identification sketch, Figure 2 description (four curves, $R^2$=0.8), marginal vs. average ROAS, Python collinearity simulation, SHAP analogue.
- [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]] — CONTAINS: definition via unobserved demand $d_t$, OVB formula, ad targeting (remarketing, paid search), seasonality and imperfect proxies, funnel-effect bias with mediator proof sketch, endogenous price control, numeric funnel example.
- [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] — CONTAINS: footnote 1 (demand-modeling literature), §4.3.1 four reasons selection by fit fails, five-model specification table with $R^2$ and MAPE, footnote 2 (CV limits), Figure 3 table, Figure 4 per-model allocation table, lesson, feature-importance analogue.
- [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] — CONTAINS: three opportunity areas, better data proposal, four Bayesian benefits (§5.1), category model (§5.2), geo model incl. national-to-geo disaggregation (§5.3), demand-proxy controls (§5.4), graphical models and Figure 5 node/edge table (§5.5), remedy-to-failure matrix.
- [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] — CONTAINS: simulator definition, four uses of simulation (§5.6), robustness-sweep algorithm, blind-RFP algorithm, five transparency obligations (§6), acknowledgment, disclosure-table example, SHAP-pipeline validation example.

## Sources

- [[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]] — Chan & Perry (2017), Google Inc. white paper, 16 pp.

## See Also

- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — the simulator cited in §5.6
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — methodology for the simulation studies §5.6 calls for
- [[Bayesian Media Mix Modeling - Overview]] — companion paper Jin et al. (2017), the §5.1 framework
- [[MMM Model Selection and Application]] — Jin et al. sample-size simulation that confirms the §4.1.1 data-limitation argument
- [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] — concrete Stan fit of Eq. (3), a concrete instance of the §5.5 remark that graphical models "can be fitted for example using the STAN package"
- [[Geo-Experiment Methodology - Overview]] — experiments as point-estimate ground truth
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — formal treatment of many equally good models
