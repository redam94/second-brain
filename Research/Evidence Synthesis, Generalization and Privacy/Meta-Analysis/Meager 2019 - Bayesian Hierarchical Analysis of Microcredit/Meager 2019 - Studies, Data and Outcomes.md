---
title: "Meager 2019 - Studies, Data and Outcomes"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Introduction (pp. 58-60); Sec. I Data (pp. 60-62); Table 1"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]"
used_by:
  - "[[Meager 2019 - Hierarchical Model Specifications]]"
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
aliases:
  - "Seven microcredit RCTs data"
  - "Microcredit study attributes (Table 1)"
---
# Meager 2019 - Studies, Data and Outcomes

> [!summary]
> Seven randomised evaluations of expanded access to microcredit (Bosnia, Ethiopia, India, Mexico, Mongolia, Morocco, Philippines) supply individual-level data on three business outcomes (profit, expenditures, revenues) and, where collected, consumption, consumer durables and temptation goods. The estimand is the intention-to-treat effect of increased access, in USD PPP per fortnight; new businesses are counted by coding missing business data as zero.

## Overview

Why these seven studies, what was measured and how it was harmonised, why ITT rather than complier effects, and the study-attribute table (Table 1). Also the paper's critique of vote counting.

## Main Content

### Inclusion criteria

> [!definition] Inclusion criteria
> The main intervention is an expansion of access to microcredit at the community or individual level; assignment of access is randomised; the study was published before February 2015 (the literature search period). The seven studies are Angelucci, Karlan and Zinman (2015); Attanasio et al. (2015); Augsburg et al. (2015); Banerjee, Duflo, Glennerster and Kinnan (2015); Crepon et al. (2015); Karlan and Zinman (2011); Tarozzi, Desai and Johnson (2015). Full datasets are public because of the policies of AEJ: Applied and Science, which allows full-data models beyond traditional meta-analysis.

^def-inclusion

### Table 1 - Lender and study attributes

| Attribute | Bosnia | Ethiopia | India | Mexico | Mongolia | Morocco | Philippines |
|---|---|---|---|---|---|---|---|
| Study | Augsburg et al. 2015 | Tarozzi, Desai, Johnson 2015 | Banerjee, Duflo, Glennerster, Kinnan 2015 | Angelucci, Karlan, Zinman 2015 | Attanasio et al. 2015 | Crepon et al. 2015 | Karlan and Zinman 2011 |
| Treatment | Lend to marginally rejected borrowers | Open branches | Open branches | Open branches, promote loans | Open branches, target likely borrowers | Open branches | Lend to marginal applicants |
| Randomisation level | Individual | Community | Community | Community | Community | Community | Individual |
| Urban or rural | Both | Rural | Urban | Both | Rural | Rural | Urban |
| Target women | No | No | Yes | Yes | Yes | No | No |
| MFI already operates locally | Yes | No | No | No | No | No | Yes |
| Liability type | Individual | Group | Group | Group | Both | Group | Individual |
| Collateralised | Yes | Yes | No | No | Yes | No | No |
| Other MFIs competing | Yes | No | Yes | Yes | Yes | No | Yes |
| Household panel | Yes | No | No | Partial | Yes | Yes | No |
| Interest rate (intended, avg.) | 22% APR | 12% APR | 24% APR | 100% APR | 24% APR | 13.5% APR | 63% APR |
| Study duration | 14 months | 36 months | 40 months | 16 months | 19 months | 24 months | 36 months |

Sampling frames: Bosnia and Philippines - marginal applicants; Ethiopia - random sample; India - households with at least one woman aged 18-55 of stable residence; Mexico - women aged 18-60 who own businesses or wish to start them; Mongolia - women who registered interest in loans and met eligibility criteria; Morocco - random sample plus likely borrowers. Note: interest rates use the average of the MFI's intended range, unlike Banerjee et al. (2015) who use the maximum; differences are numerically small.

### Outcomes

> [!definition] Outcomes and construction
> *Business outcomes (all seven studies):* household business **profit, expenditures, revenues**, testing the Grameen Bank claim that microloans let poor entrepreneurs grow businesses. To ensure new businesses count as an average increase in profit, households with no business or missing business data have revenues, expenditures and profits coded as **zero** (the decision of many but not all original authors).
> *Other welfare outcomes (not all studies):* total **consumption**, **consumer durables** spending (bulky purchases such as vehicles, school tuition), **temptation goods** spending (possibly decreasing through substitution or greater hope for the future).
> All units standardised to **USD PPP over a two-week period** (2010 dollars). Where possible the original authors' variable constructions are followed, but uniformity across studies sometimes overrode them; infeasible variables were omitted. Outliers are **not** winsorised (most studies did not, and Augsburg et al. found winsorising can make results significant that are not in the full sample - winsorising may understate true uncertainty).

^def-outcomes

### Estimand: access, not take-up

> [!definition] Effect of increased access (ITT)
> The paper analyses the effect of a **randomly assigned increase in access** to MFI credit - branch openings with possible outreach/targeting at the community level, or random offers at the individual level - often called the intention-to-treat (ITT) effect. Because of spillovers and expectations of future borrowing, credit-market interventions are unlikely to satisfy SUTVA at the household level (Kaboski and Townsend 2011; Banerjee et al. 2015), so defining compliers by take-up may not capture the causal effect of interest. The effect is best read as the average impact on an individual in a community with increased microcredit access. Concerns that this understates the effect on eventual borrowers are addressed in Section V.B and in Meager (2016).

^def-itt-access

Data limits: few studies collected individual-level baseline surveys and many household covariates are plausibly affected by microfinance; attrition and sample selection are left as in the public datasets.

### Against vote counting

Review articles often use "vote counting" - tallying statistically significant vs non-significant results - which is a misleading aggregation technique (Hedges and Olkin 1980; Cochrane Handbook 9.4.11). Two predictions by Banerjee, Karlan and Zinman (2015) based on "eyeballing" (pooling would yield significant increases in business size and profits; discretionary spending on temptation goods falls) do not bear out in formal aggregation (see [[Meager 2019 - Average Treatment Effects - Results]]).

## Examples

*Why code missing business data as zero.* Suppose half of a site's households own no business. If the analysis restricted to business owners, a loan that induces 10% of non-owners to open a business would not register at all in the profit average; coding non-owners' profit as 0 lets new businesses raise the site average. (Illustration of the paper's stated rationale.)

## Connections

- The model that aggregates these outcomes: [[Meager 2019 - Hierarchical Model Specifications]].
- Intention-to-treat vs treated effects in ad experiments: [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]].
- Ioannidis-style concerns about significance filtering: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

### Relevance to marketing measurement

Table 1's role - site attributes that could explain effect variation - is played in marketing by market size, media intensity, creative, channel mix and measurement protocol; the "access vs take-up" distinction is the ITT-vs-exposed distinction in lift studies.

## See Also

- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Conversion Lift Studies on Ad Platforms]]
