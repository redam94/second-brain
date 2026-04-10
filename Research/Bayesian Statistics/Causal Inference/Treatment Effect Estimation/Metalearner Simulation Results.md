---
title: "Metalearner Simulation Results"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/treatment-effects
  - topic/machine-learning
  - type/example
  - doc/paper
source: "[[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]]"
source_location: "Applications section, pp. 4162-4165"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Treatment Effect Estimation"
doc_type: paper
depends_on:
  - "[[X-Learner]]"
  - "[[T-Learner and Minimax Rate]]"
  - "[[S-Learner]]"
used_by: []
aliases:
  - metalearner applications
  - voter turnout CATE
  - transphobia CATE
---

# Metalearner Simulation Results

> [!summary]
> Two real-data applications validate the metalearner framework: (1) a social pressure mailer experiment on voter turnout in Michigan (n = 38,218 treatment, n = 191,243 control — highly unbalanced), and (2) a door-to-door canvassing experiment on reducing transphobia. In both cases, X-RF outperforms S-RF and T-RF when groups are unbalanced and the CATE varies across covariates.

## Simulation Study Design

The paper first conducts simulations under conditions proposed by prior researchers. Key conditions include:
- Cases where treatment and control groups have completely different distributions → pooling (S-learner) is harmful
- Cases where the CATE is simpler than the response functions → X-learner exploits this

Metrics: **RMSE**, **Average Bias**, **Average Variance** across training sizes (N = 1,000 to 60,000 — Fig. 3).

**Finding:** X-learner has lowest RMSE and variance in unbalanced settings. S-learner has lowest bias when CATE is constant.

## Application 1: Social Pressure and Voter Turnout

> [!example] Example: Social Pressure Mailer Experiment (Michigan Primary, 2006)
> **Setup:** Large-scale field experiment. Households randomly assigned to:
> - Control ($n \approx 191,243$): received no mailing
> - Treatment ($n \approx 38,218$): received "DO YOUR CIVIC DUTY — VOTE!" mailer listing voting history
>
> **Covariates:** Gender, age, past voting record (2000, 2002, 2004 general + 2004 primary elections).
>
> **Outcome:** Voted in 2006 primary (binary); ATE estimated via intent-to-treat.
>
> **CATE pattern (Fig. 2):**
> - Voters with cumulative voting history 0 (never voted in past 5 elections): **largest positive CATE**
> - Voters with cumulative history 3: **largest negative CATE** (social pressure backfires for those who always vote)
>
> **Estimated ATE:** 8.1% increase in voter turnout from simple mailer
>
> **Metalearner comparison:**
> - X-RF and S-RF provide similar CATE estimates (correlation = 0.99)
> - T-RF shows larger spread (larger variance)
> - With unequal sample sizes, X-RF and S-RF perform best; T-RF worst
>
> **Key insight:** CATE histogram (Fig. 2, Lower) shows bimodal distribution — targeting voters who voted 3 times previously is *counterproductive*, while targeting first-time voters is highly effective.

## Application 2: Reducing Transphobia

> [!example] Example: Door-to-Door Canvassing on Transphobia Reduction
> **Reference:** Broockman & Kalla (2016) — received widespread media attention
>
> **Setup:** Field experiment. Registered voters randomized to:
> - Control: 10-minute conversation about recycling (placebo)  
> - Treatment: 10-minute high-quality door-to-door conversation about transgender rights
>
> **Outcome:** Transgender tolerance scale (principal component of survey items); scale coded so larger = more tolerant. Observed 3 days, 3 weeks, 6 weeks, and 3 months post-conversation.
>
> **ATE estimate:** 0.22 (SE = 0.072, t = 3.1) — decrease in transphobia greater than the average national decline over 1980–2012.
>
> **CATE pattern (Fig. 4):**
> - Strong evidence for heterogeneity — CATE estimates spread from −0.5 to +0.5
> - X-RF histogram: most mass near zero with positive tail
> - T-RF: larger spread (higher variance)
> - S-RF: narrow distribution (treatment shrunk toward zero)
>
> **Key insight:** S-RF shrinks CATE toward zero — consistent with regularization pressure on the treatment indicator. The spread found in X-RF and T-RF suggests real heterogeneity. S-RF underestimates this.
>
> **Important note:** With only 501 treated observations, treatment groups are **small and unbalanced** → X-learner's imputation step uses the large control group to improve treated unit counterfactuals.

## Comparison of Convergence Rates

From simulations (SI Appendix):
- X-learner converges at the **parametric rate** when CATE is constant (infinite smoothness)
- T-learner converges at the *slower* non-parametric rate regardless
- S-learner performs well when the treatment effect is constant and nonzero — but the convergence breaks down when CATE is heterogeneous

**Summary rule of thumb:**
- CATE simple, groups balanced → S-learner or T-learner both fine
- CATE complex, groups balanced → T-learner preferred
- CATE any, groups **unbalanced** → **X-learner preferred**

## Connections

- Validates [[X-Learner]] theoretical claims (Theorem 2)
- Shows where [[S-Learner]] regularization creates bias
- Shows where [[T-Learner and Minimax Rate]] variance is problematic

## See Also

- [[X-Learner]] — main novel method validated here
- [[Künzel 2019 - Overview]] — paper context
