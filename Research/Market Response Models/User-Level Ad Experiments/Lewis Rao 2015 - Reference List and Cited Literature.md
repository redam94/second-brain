---
title: Lewis Rao 2015 - Reference List and Cited Literature
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - type/reference
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "References pp. 1972-1973 (31 works); in-text citations pp. 1941-1971 incl. fns. 2-28"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]"
used_by:
  - "[[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]"
aliases:
  - Lewis Rao 2015 bibliography
  - Works cited by Lewis and Rao QJE 2015
---

# Lewis Rao 2015 - Reference List and Cited Literature

> [!summary]
> The paper's reference list (pp. 1972-1973) has 31 works. This note lists every one, with the page and the purpose for which Lewis & Rao cite it, and the vault note that discusses that passage. Grouped by role: framing the question, earlier ad field experiments, statistical method, the Yahoo! experiments themselves, robustness examples, and market implications. Page numbers come from the running heads of the raw PDF. A footnote is assigned to the page whose foot it sits on.
^lr-refs-summary

## Overview

Most references are used once, to support a single claim. Four clusters matter for reading the paper:
- **Yahoo! Labs predecessors** (fn. 13): many of the 25 experiments were first analyzed in earlier papers by the same group.
- **Field-experiment precedents** (fn. 18): earlier randomized ad tests in recruiting, TV, packaged foods and online display.
- **Power and design-analysis literature** (Cohen; Sawyer & Ball; Gelman & Carlin): calibrates how small the ad effect is.
- **Analogies for the market argument** (Bloom et al.; Lee et al.; Shin): other markets with poorly measured returns, and the persuasion-game model.

## Main Content

### 1. Framing the question (§I)

| Reference | Where | Use in the paper | Vault note |
|---|---|---|---|
| Coen, R. (2008), *Coen Structured Advertising Expenditure Dataset* | p. 1941 | Source, with Kantar, for US ad spend of about \$500 per person per year | [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]] |
| Kantar Media (2012), *Kantar AdSpender* | p. 1941; p. 1967 | Second source for the \$500 figure; in §IV.A, Kantar AdSpender and other industry sources support the claim that large, publicly traded advertisers using standard ad formats account for most ad spending | Overview; [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| Abraham, M. & Lodish, L. (1990), "Getting the Most out of Advertising and Promotion," *Harvard Business Review* 68 | p. 1941 | Cited for the open question: does advertising affect purchases as much as ad prices and gross margins imply? | Overview |
| Lewis, R. A., Rao, J. M. & Reiley, D. H. (2015), "Measuring the Effects of Advertising: The Digital Frontier," NBER volume | p. 1942, fn. 2; p. 1955 | Fuller treatment of the complications from intermediate metrics such as clicks; proof of the evaluation-window proposition (an extra week helps only if its effect exceeds half the running average) | [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]] |

### 2. Earlier advertising field experiments (fn. 18, p. 1963)

Footnote 18 supports the statement that most ad-effectiveness papers test whether the causal effect on sales differs from zero (Bagwell 2007). It lists specific field experiments:

| Reference | Setting named in fn. 18 |
|---|---|
| Carroll, V., Rao, A., Lee, H., Shapiro, A. & Bayus, B. (1985), "The Navy Enlistment Marketing Experiment," *Marketing Science* 4 | Enlistment (military recruiting) advertising |
| Lodish, L., Abraham, M., Kalmenson, S., Livelsberger, J., Lubetkin, B., Richardson, B. & Stevens, M. E. (1995), "How TV Advertising Works: A Meta-Analysis of 389 Real World Split Cable TV Advertising Experiments," *Journal of Marketing Research* 32 | TV commercials for retailers |
| Joo, M., Wilbur, K., Cowgill, B. & Zhu, Y. (2013), "Television Advertising and Online Search," *Management Science* 60 | TV commercials for retailers |
| Eastlack, J., Jr. & Rao, A. (1989), "Advertising Experiments at the Campbell Soup Company," *Marketing Science* 8 | Various media for packaged foods |
| Reiley, D. H., Rao, J. M. & Lewis, R. A. (2011), "Here, There, and Everywhere: Correlated Online Behaviors Can Lead to Overestimates of the Effects of Advertising," WWW Conference | Online ads |
| Lewis, R. A. & Reiley, D. H. (2014), "Online Ads and Offline Sales," *Quantitative Marketing and Economics* 12 | Online ads |

The split-cable TV meta-analysis (Lodish et al. 1995) is the classic aggregate precedent. TV ads were randomized by household cable feed, which is the same idea as the user-level display tests here. See [[User-Level vs Geo-Level Experiments - When to Use Which]] and [[Geo-Experiment Design and Power Analysis]] for the geographic alternative that fn. 6 calls more expensive.

### 3. Statistical method and power (§II.B, §III)

| Reference | Where | Use in the paper | Vault note |
|---|---|---|---|
| Cohen, J. (1977), *Statistical Power Analysis for the Behavioral Sciences* | p. 1950, fns. 9-10 | The impact-to-s.d. ratio "is also known as Cohen's d"; the calibrated ratio is less than 1/40 of Cohen's "small" effect size of 0.2 | [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]; [[Power Analysis and Sample Size]] |
| Lovell, M. (2008), "A Simple Proof of the FWL Theorem," *Journal of Economic Education* 39 | p. 1950 | Reference for the Frisch-Waugh-Lovell algebra behind the partial $R^2$ after conditioning on covariates (§II.B) | Impact-to-SD note |
| Sawyer, A. & Ball, A. D. (1981), "Statistical Power and Effect Size in Marketing Research," *Journal of Marketing Research* 18 | p. 1951, fn. 11 | Their low-powered store-level examples have $R^2$ around 6%, more than 10,000 times the user-level $R^2$ here | Impact-to-SD note |
| Card, D. (1999), "The Causal Effect of Education on Earnings," *Handbook of Labor Economics* 3 | p. 1951 | Comparison: in returns-to-schooling work, the bias from omitted variables is thought to be 10-30% of the treatment effect, while in advertising it can be many times larger | Impact-to-SD note |
| Abraham, M. (2008), "The Off-Line Impact of Online Ads," *Harvard Business Review* 86 | p. 1952 | The comScore-style 300% effect from comparing exposed and unexposed users, which would imply ad prices at least ten times higher | Impact-to-SD note; [[Experimental Benchmarks for Observational Ad Measurement]] |
| Blake, T., Nosko, C. & Tadelis, S. (2014), "Consumer Heterogeneity and Paid Search Effectiveness," NBER WP 20171 | p. 1952; p. 1967 | Industry use of observational methods; the one large experiment that changed an advertiser's (eBay's) strategy | [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] |
| Gelman, A. & Carlin, J. (2013), "Beyond Power Calculations," working paper | p. 1951; p. 1952 | The "exaggeration factor" of low-powered tests; one reason point estimates are withheld | [[Type S and Type M Errors]]; [[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]] |
| Deng, A., Xu, Y., Kohavi, R. & Walker, T. (2013), "Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data," WSDM | p. 1957; p. 1969 | Variance reductions from pre-period covariates match related work; future ad servers could include pre-experiment matching | [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]]; [[CUPED and Regression-Adjusted Variance Reduction]] |
| Damgaard, M. & Gravert, C. (2014), "Now or Never! The Effect of Deadlines on Charitable Giving," working paper | p. 1956 | For "buy it now or never" response patterns, the bias from short evaluation windows is minimal | Table II note |
| Bagwell, K. (2007), "The Economic Analysis of Advertising," *Handbook of Industrial Organization* 3 | p. 1963 | Most ad-effectiveness papers test whether the sales effect differs from zero | [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]] |

### 4. The Yahoo! experiments and their predecessors (§II.A, §III.A-B)

| Reference | Where | Use in the paper |
|---|---|---|
| Lewis, R. A. (2010), *Where's the "Wear-Out?"*, MIT PhD dissertation | p. 1946, fn. 7 | Evidence for concave ad response (with Sahni 2013) |
| Sahni, N. (2013), "Effect of Temporal Spacing between Advertising Exposures," Stanford GSB WP | p. 1946, fn. 7 | Evidence for concavity |
| Lewis, R. A. & Schreiner, T. A. (2010), "Can Online Display Advertising Attract New Customers?," MIT thesis | p. 1954 | Design of hold-out vs charity-ad controls, where the size of the would-be-exposed control is unknown |
| Lewis & Reiley (2014) | p. 1944, fn. 5; p. 1954, fn. 13; p. 1959; p. 1963, fn. 18 | Realistic targeting gap (10 percentage points) in the 30x selection example; source experiment; effects through basket size |
| Reiley, D. H., Lewis, R. A. & Schreiner, T. (2012), "Ad Attributes and Attribution," unpublished | p. 1954, fn. 13 | Source of some of the 25 experiments |
| Johnson, G., Lewis, R. A. & Reiley, D. H. (2015), "Location, Location, Location," SSRN WP 2268215 | p. 1954, fn. 13; p. 1959; p. 1965, fn. 21 | Source experiment; effects through purchase frequency; example of a multi-cell experiment that exogenously varies cost per person, used to trace $\beta(c)$ (§III.D) |
| Reiley, Rao & Lewis (2011) | p. 1951; p. 1954, fn. 13 | Correlation over time between ad exposure (web browsing) and shopping can generate an $R^2$ near 0.0001, a full order of magnitude larger than the true treatment effect; also a source experiment |

Notes for these rows: [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] (fn. 7), [[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]] (fn. 13, Schreiner), [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]] (p. 1959 channels). Related design notes: [[Intent-to-Treat, PSA and Ghost Ad Designs]].

### 5. Robustness, ROI targets and market implications (§III.C-§V)

| Reference | Where | Use in the paper | Vault note |
|---|---|---|---|
| Kaiser, H. (2005), *Economics of Commodity Promotion Programs* | p. 1948, fn. 8 | Homogeneous foodstuffs have stable spending, but ad spillovers to competitors reduce own-firm returns | Impact-to-SD note |
| de Bartolome, C. (1995), "Which Tax Rate Do People Use: Average or Marginal?," *Journal of Public Economics* 56 | p. 1965 | Decision makers may confuse average and marginal returns in the over-advertising region | [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] |
| Bloom, N., Eifert, B., Mahajan, A., McKenzie, D. & Roberts, J. (2013), "Does Management Matter? Evidence from India," *QJE* 128 | p. 1945; p. 1965; p. 1971 | Consulting as another hard-to-measure investment (§I); in §III.C, the first RCT of consulting found a positive effect but no precise ROI; in §V, consulting spending rarely has a well-formed counterfactual | [[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]]; Table III note |
| Broockman, D. & Green, D. (2014), "Do Online Advertisements Increase Political Candidates' Name Recognition or Favorability?," *Political Behavior* 36 | p. 1966 | Voting as a category with volatile outcomes | Robustness note |
| Shin, H. S. (1994), "News Management and the Value of Firms," *RAND Journal of Economics* 25 | p. 1970 | The persuasion-game model applied to media buyers | Market Implications note |
| Lee, I-M. et al. (2005), "Vitamin E in the Primary Prevention of Cardiovascular Disease and Cancer," *JAMA* 294 | p. 1971, fn. 28 | Physicians Health Study II: 39,876 women, 12 years, inconclusive 95% CI | Market Implications note |

## Examples

> [!example] Example: Checking a citation's arithmetic (Sawyer & Ball 1981, fn. 11)
> Footnote 11 says the calibrated campaign's $R^2$ of 0.0000054 is "less than 1/10,000" of the roughly 6% $R^2$ in Sawyer & Ball's low-powered store-level examples. Check: $0.06/0.0000054\approx11{,}100$, so the claim holds. The paper also notes their examples are aggregate store-level rather than customer-level models, which is why their $R^2$ is so much larger. See [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]].
^ex-lr-sawyer-ball-check

## Connections
- [[Power Analysis and Sample Size]] and [[Type S and Type M Errors]] — the generic theory behind the Cohen, Sawyer & Ball and Gelman & Carlin citations.
- [[CUPED and Regression-Adjusted Variance Reduction]] — the method family of Deng et al. (2013).
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] — the published version of the eBay working paper.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]] — paper map and Source Map.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — synthesis across this and related Yahoo! papers.
- [[Gordon et al 2019 - Reference List and Cited Literature]] — sibling bibliography
