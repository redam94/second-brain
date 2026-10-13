---
title: Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/power-analysis
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§I pp. 1943-1944 fns. 4-5; §II.B pp. 1947-1952, eqs. (1)-(8), fns. 8-12"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
aliases:
  - Lewis-Rao R-squared of a profitable campaign
  - Lewis-Rao representative campaign calibration
  - Selection effect 30 times the causal effect
---

# Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign

> [!summary]
> For a two-arm experiment with equal arms and variances, the $R^2$ of the treatment dummy equals $\tfrac14(\Delta\bar y/\hat\sigma)^2$ and the $t$-statistic equals $\sqrt{N/2}\,(\Delta\bar y/\hat\sigma)$, so everything hinges on the impact-to-standard-deviation ratio (Cohen's $d$). In the paper's representative campaign (\$0.14 per user, 50% margin, mean sales \$7, s.d. \$75, 25% ROI target), $d=0.0047$ and $R^2=0.0000054$. With 2M users $E[t]=3.30$ (about 95% power); with 200k users $E[t]=1.04$ and a profitable campaign is missed 74% of the time. Any omitted variable or misspecification worth $R^2\approx10^{-4}$ dwarfs the true effect, which is why observational methods fail.
^lr-impact-summary

## Overview

Section II.B calibrates the model of [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] with real cost and sales data, then derives two statistics (eqs. 6-7) that make the measurement problem transparent.

## Main Content

### Cost side (p. 1947-1948)
Display campaigns delivering a few ads per exposed user per day cost about 1-2 cents per person per day and typically run about two weeks, totalling **10-40 cents per person**, roughly one 30-second TV ad per person per day. Against the total volume of ads a consumer sees across media, even an intense campaign captures about **2% of a user's advertising "attention"**. Online prices are more dispersed than other media because of targeting granularity, hence wide ranges in exposures per dollar (fn. 1).

### Sales volatility (p. 1948)
Individual sales volatility has three components: (i) purchase probability, (ii) basket size given purchase, (iii) purchase frequency. Across the study's large retailers, mean and s.d. of weekly sales vary a lot, but their ratio (coefficient of variation) is "far more uniform": 4 to 23, clustered between 10 and 15. Customers buy infrequently and transaction values are volatile. For financial firms a uniform lifetime value per new account removes the basket-size component, yet the CV is higher still because new accounts are rare and valuable; automobiles and other big-ticket goods share this feature. Fn. 8: homogeneous foodstuffs have more stable expenditure, but their homogeneity likely means advertising spills over to competitors, lowering own-firm returns (Kaiser 2005).

### Estimator and notation

> [!definition] Definition: Experimental estimator (eqs. 1-5, pp. 1948-1949)
> Let $y_i$ be sales of individual $i$, $x_i\in\{0,1\}$ exposure (each exposed person gets the same campaign, so $c$ is suppressed). Exposed group $E$, unexposed group $U$, with $N_E=N_U=N$ and $\sigma_E=\sigma_U=\sigma$ (the best case for design).
> $$
> (1)\quad y_i=\beta x_i+\epsilon_i
> $$
> $$
> (2)\quad \bar y_E=\frac1{N_E}\sum_{i\in E}y_i,\qquad \bar y_U=\frac1{N_U}\sum_{i\in U}y_i
> $$
> $$
> (3)\quad \hat\sigma_E^2=\frac1{N_E-1}\sum_{i\in E}(y_i-\bar y_E)^2,\qquad \hat\sigma_U^2=\frac1{N_U-1}\sum_{i\in U}(y_i-\bar y_U)^2
> $$
> $$
> (4)\quad \Delta\bar y=\bar y_E-\bar y_U
> $$
> $$
> (5)\quad \hat\sigma_{\Delta\bar y}=\sqrt{\frac{\hat\sigma_E^2}{N_E}+\frac{\hat\sigma_U^2}{N_U}}=\sqrt{\frac2N}\,\hat\sigma
> $$
> $\hat\beta$ converts to ROI by multiplying by margin, subtracting per-person cost and dividing by cost. In an observational study one would also condition on covariates $W$ and a functional form (possibly individual fixed effects), writing $y\mid W$; even in an experiment, predetermined covariates such as pre-campaign sales improve power. All results then hold with $R^2$ replaced by the **partial** $R^2$ of the treatment (Lovell 2008, i.e. Frisch-Waugh-Lovell algebra; see [[Regression and the CEF]]).
^def-lr-estimator

> [!theorem] Proposition: $R^2$ and $t$ in terms of the impact-to-standard-deviation ratio (eqs. 6-7, p. 1950)
> Under the equal-size, equal-variance design,
> $$
> (6)\quad R^2=\frac{\sum_{i\in U}(\bar y_U-\bar y)^2+\sum_{i\in E}(\bar y_E-\bar y)^2}{\sum_i (y_i-\bar y)^2}=\frac{2N\left(\tfrac12\Delta\bar y\right)^2}{2N\hat\sigma^2}=\frac14\left(\frac{\Delta\bar y}{\hat\sigma}\right)^2,
> $$
> $$
> (7)\quad t_{\Delta\bar y}=\frac{\Delta\bar y}{\hat\sigma_{\Delta\bar y}}=\sqrt{\frac N2}\left(\frac{\Delta\bar y}{\hat\sigma}\right).
> $$
> The ratio $\Delta\bar y/\hat\sigma$ is the **impact-to-standard-deviation ratio**, also known as Cohen's $d$ (fn. 9).
>
> **Proof sketch.** With equal arms the grand mean is $\bar y=(\bar y_E+\bar y_U)/2$, so each group mean sits $\tfrac12\Delta\bar y$ from it; the explained sum of squares is $2N\cdot(\tfrac12\Delta\bar y)^2$. The total sum of squares is approximately $2N\hat\sigma^2$ because the treatment explains a negligible share. Eq. (7) follows by dividing (4) by (5). Combining, $t^2=2N R^2$: for fixed $N$, power is a function of $R^2$ alone.
^thm-lr-r2-t

### The representative campaign (pp. 1950-1951)

> [!example] Example: Calibrated campaign (slightly larger than the median experiment)
> - Cost per exposed user $c=\$0.14$ (roughly 20-80 display ads or 7-10 TV commercials); gross margin $m=50\%$.
> - Mean sales over the period \$7, s.d. \$75.
> - ROI target 25% ⇒ $\beta=(1.25)(0.14)/0.5=\$0.35$ per person, a **5% sales lift** over the two weeks, large in percentage terms.
> - $d=0.35/75=0.0047$, "less than 1/40 the 'small' effect size of 0.2" in Cohen (1977) (fn. 10).
> - $$(8)\quad R^2=\frac14\left(\frac{\$0.35}{\$75}\right)^2=0.0000054.$$
> This is less than 1/10,000 of the $R^2\approx6\%$ in the low-powered aggregate store-level examples of Sawyer & Ball (1981) (fn. 11).
^ex-lr-calibrated-campaign

> [!example] Example: Power at two sample sizes (p. 1951)
> Null: ROI $=-100\%$ (zero causal effect). Alternative: ROI $=25\%$.
> - **2,000,000 users**, split evenly: $E[t]=3.30$. Power is about 95% at the 10% two-sided (5% one-sided) level, since the approximately normal $t$ falls below the 1.65 critical value about 5% of the time.
> - **200,000 users**: $E[t]=1.04$, "hopelessly underpowered": the test fails to reject zero effect 74% of the time even though the campaign earns 25%.
> - Fn. 12: when such a low-powered test does reject, the point estimate conditional on rejection is biased upward ("exaggeration factor", Gelman & Carlin 2013; see [[Type S and Type M Errors]]).
^ex-lr-power-two-sizes

Check: $\sqrt{10^6/2}\times0.00467=3.30$; $\sqrt{10^5/2}\times0.00467=1.04$; $\Phi(1.65-1.04)=\Phi(0.61)\approx0.73$.

### Implication for observational methods (pp. 1951-1952, 1943-1944)

> [!theorem] Claim: Tiny treatment $R^2$ makes observational estimates fragile (§II.B, §I)
> Because a profitable campaign explains $R^2\sim10^{-6}$ to $10^{-5}$ of sales variance, an omitted variable, misspecified functional form, or slight intertemporal correlation between ad exposure (web browsing) and shopping (Reiley, Rao & Lewis 2011; see [[Activity Bias in Advertising]]) that generates $R^2$ on the order of $10^{-4}$ is a full order of magnitude larger than the true effect. A successful observational method must avoid specification errors worth $R^2\approx10^{-6}$ (p. 1944), "an impossible statistical feat" when selection effects can be 30 times the treatment effect.
^thm-lr-observational-fragility

Contrast drawn by the authors: in wage-schooling regressions endogeneity bias is typically 10-30% of the treatment effect (Card 1999); here it can be many multiples.

> [!example] Example: Selection 30 times the causal effect (fn. 5, p. 1944)
> A campaign costs \$0.10 per person (20-40 premium display ads, about 10 prime-time TV ads). Consumers have unit demand for a product with \$30 marginal profit, so the campaign breaks even if 1 in 300 people is converted, a causal lift of about 0.33 percentage points. If targeting means exposed individuals have a 10-percentage-point higher baseline purchase probability (realistic; similar in size to Lewis & Reiley 2014), the selection effect in a naive exposed-vs-unexposed comparison is $10/0.33\approx30$ times the causal effect.
^ex-lr-selection-30x

**Industry practice (p. 1952).** These methods are not a straw man: a Harvard Business Review article co-authored by the president of comScore (Abraham 2008) reported a 300% effect of online advertising from a regression comparison of endogenously exposed and unexposed groups, an estimate implying ad prices should be at least an order of magnitude higher. Blake, Nosko & Tadelis (2014) also document such practice; see [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].

**Intermediate metrics (fn. 2).** The paper deliberately measures sales, not clicks; using intermediate metrics can induce serious complications (treated at length in Lewis, Rao & Reiley 2015).

## Examples

> [!example] Example: How many users does the calibrated campaign need for $E[t]=3$?
> Invert eq. (7): $N_{\text{per arm}}=2\,(3/d)^2$. With $d=0.35/75\approx0.00467$, $3/d\approx643$, so $N_{\text{per arm}}\approx2\times413{,}000\approx826{,}000$, about **1.65 million users in total**. This is consistent with the paper's figures: 2 million users give $E[t]=3.30$ and 200,000 give $1.04$. Because $N$ scales with $1/d^2$, halving the sales effect to be detected quadruples $N$. (My arithmetic from eq. (7) and the calibrated values on pp. 1950-1951.)
^ex-lr-calibrated-n

## Connections
- [[Power Analysis and Sample Size]] — $t^2=2NR^2$ is the two-sample $z$-test power formula in $R^2$ form.
- [[CUPED and Regression-Adjusted Variance Reduction]] — the "partial $R^2$" extension.
- [[Experimental Benchmarks for Observational Ad Measurement]] — empirical confirmation of the fragility claim.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — the same tiny-signal problem, plus targeting-induced selection, in aggregate MMM data.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — synthesis note with a Python planning snippet.
- [[Blake 2015 - OLS vs IV Spend Elasticities and the Endogeneity Gap]] — OLS 0.885 vs IV 0.002 comparison
