---
title: "Blake 2015 - Working Paper vs Econometrica Version Differences"
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - type/reference
  - doc/paper
source: "[[raw/Blake Nosko Tadelis 2015 - Consumer Heterogeneity and Paid Search Effectiveness.pdf]]"
source_location: "Whole paper. Base: NBER WP 20171 (May 2014, the vault's raw file). Compared against (1) the authors' accepted manuscript 'Forthcoming in Econometrica', dated 12 Aug 2014 (faculty.haas.berkeley.edu/stadelis/BNT_ECMA_rev.pdf), and (2) the published online supplement, Econometrica Supplementary Material to Vol. 83 No. 1 (Jan 2015) pp. 155-174, DOI 10.3982/ECTA12423. The typeset journal article itself (paywalled) was not checked."
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments/Paid Search Field Experiment (Blake et al 2015)"
doc_type: paper
depends_on:
  - "[[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]"
used_by:
  - "[[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]"
  - "[[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]"
aliases:
  - Blake Nosko Tadelis WP vs Published Version
  - Blake 2015 Econometrica Table Numbering
---

# Blake 2015 - Working Paper vs Econometrica Version Differences

> [!summary]
> The vault's notes are built on **NBER Working Paper 20171 (May 2014)**. The paper was published as **Econometrica 83(1):155-174 (January 2015)**. This note maps the working paper onto the published version, using the authors' accepted manuscript (12 August 2014) and the journal's published online supplement. **Every estimate is unchanged**: 99.5% retention, Table 2/3 coefficients, ROI −63% [−124%, −3%], −80% in levels, and Germany Table 5. The published version is a compressed re-organisation. The SEM overview is folded into the introduction, the ROI table becomes **Table 1**, the brand and DiD regression tables and the product-category analysis move to an **online appendix** (Tables A.I-A.VI), and several Discussion passages are cut, including the Google AdWords ROI quote and the user-level-randomization paragraph. Two items are added: a frequency-slope estimate and the 95% CI of the DiD effect. Cite the published version for its numbers, and the WP for the passages that were cut.
^versions-summary

## Overview

**Why this matters.** Anyone citing "Table 2" or "eq. (5)" from these notes against the journal article will find different numbers on the labels. Some passages quoted in the vault (the AdWords advice, the Lewis et al. 2011 5.4% vs 871-1,198% comparison, the CLV remark) exist only in the working paper.

**What was checked.** The accepted manuscript ("Forthcoming in Econometrica", 12 August 2014) and the published supplement were text-extracted and compared section by section with the WP. The final typeset article could differ from the accepted manuscript in copy-editing, so treat statements about the main text as "as of the accepted manuscript". Statements about the appendix come from the published supplement.

## Main Content

### Front matter

| Item | NBER WP 20171 | Econometrica (accepted ms. / published) |
|---|---|---|
| Date | May 2014 | Accepted ms. 12 Aug 2014; published Jan 2015, Vol. 83 No. 1, 155-174 |
| First author | Tom Blake | Thomas Blake |
| Affiliations | Blake: eBay Research Labs. Nosko: Chicago Booth and eBay Research Labs. Tadelis: Haas, UC Berkeley and NBER. Title page: "This work was done while Tadelis and Nosko were employed by ebay Research Labs." | Blake: eBay Research Labs. Nosko: University of Chicago and eBay Research Labs. Tadelis: UC Berkeley, NBER and eBay Research Labs |
| JEL | C93, D22, L10, L20, L81, M37 | (not printed in the accepted ms.) |
| Acknowledgements | none | Thanks eBay employees and executives, Athey, Lewis, Rao, Reiley, Zettelmeyer, an Editor and three referees |
| Abstract | "Because search clicks and purchase behavior are correlated … conventional non-experimental estimates" | "Because search clicks and purchase **intent** are correlated … non-experimental estimates" (otherwise the same) |

### Structure map

| NBER WP 20171 | Econometrica (accepted ms. + supplement) |
|---|---|
| §1 Introduction | §1 Introduction, which also absorbs the SEM mechanics and Fig. 1 discussion from WP §2 |
| §2 An Overview of Search Engine Marketing | Merged into §1. Position-auction material (Edelman et al. 2007, Varian 2007, Athey & Ellison 2011 quote) dropped |
| §3 Brand Search Experiments, Table 1 | §2 Brand Search Experiments; the table moves to supplement **Table A.I** ("Brand Keyword Click Magnitude Estimation") |
| §4 / §4.1 Non-brand experiment, eq. (1)-(2), Table 2 | §3 / §3.1. Eq. (1)-(2) move to the supplement as **(A.1)-(A.2)**; Table 2 → **Table A.II** |
| eq. (3)-(4), Table 3 | Main-text **eq. (1)-(2)**; Table 3 is merged into **Table 1** (ROI) cols 1-4 |
| §4.2 Consumer heterogeneity, eq. (5), Fig. 4-5 | §3.2, **eq. (3)**, Fig. 4-5 |
| §4.3 Product Response Heterogeneity | Moved to the supplement ("Product Response Heterogeneity"), with a one-sentence summary in §3.2 |
| §4.4 Where did the Traffic Go? | §3.3 "Where did the Non-Brand Traffic Go?" |
| §5 Deriving ROI, eq. (6), Table 4 | §4, **eq. (4)**, **Table 1** (now also lists DMA/Date FE and N per column) |
| §6 Discussion | §5 Discussion (shortened) |
| Appendix: Controlled Brand-Keyword Experiments, Fig. 6, Table 5 | Supplement: **Fig. A.1**, **Table A.III** |
| Appendix: Randomization Procedure Detail | Supplement (same text) |
| Appendix: Candidacy IV, eq. (7)-(8), Table 6 | Supplement, **(A.3)-(A.4)**, **Table A.IV** (rows relabelled "ln(Test Period Spend)" / "ln(Pre Period Spend)" instead of "Cost") |
| Appendix: Candidacy DiD, Table 7 | Supplement, **Table A.V** (identical numbers) |
| Appendix: ROI Results in Levels, Table 8 | Supplement, **Table A.VI** (identical: 0.199, s.e. 0.161) |
| Appendix: ROI Calculations, eq. (9)-(11) | Supplement, **(A.5)-(A.7)**. Still uses $D_i=1$ for paid search **off**, with no time interaction (see [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects#^warn-appendix-sign]]) |

### Content added in the published version

- **95% CI for the DiD effect:** "the entire regime of paid search adds only 0.66 percent to sales with a 95 percent confidence interval of [-0.42%,1.74%]" (accepted ms. §3.1). The WP gives only the point estimate and s.e.
- **Frequency slope (fn. 19):** "Only the zero purchases effect is statistically distinguishable from other segments, even when pooled into larger buckets". A spline starting at one purchase, with a continuous purchase count replacing $\theta_m$, has slope **−0.0038 (s.e. 0.0014)**, drawn as a dashed line on Fig. 4a. This qualifies the WP's reading of significant m=1-2 effects ([[Blake 2015 - Consumer and Product Heterogeneity in Paid Search Response]]).
- **Segment definition:** $m=0$ is "Users with no purchases in the prior year" (accepted ms.), against "New registered users" (WP).
- **Table 2 / A.II:** adds a "Date Fixed Effects" row, ticked for col (2) only, which clarifies the col (4) specification ([[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]]).
- **Figure notes:** each figure and table gets an explanatory caption. The Fig. 3 caption repeats the units: "thousands of dollars per day, per DMA".
- **New citations:** Lodish et al. (1995), on the tradition of controlled TV ad experiments; Lambrecht & Tucker (2013), on retargeting; Narayanan & Kalyanam (2011), on search position effects by regression discontinuity. New footnotes on Rutz & Bucklin (2011), which distinguishes generic from branded terms but does not measure brand-ad efficacy, and Yang & Ghose (2010), which does not measure sales.
- **Incentives sentence:** the list of parties whose incentives favour bigger budgets adds "marketing executives within companies".
- **Kept, for reference:** the Yang & Ghose (2010) 90-keyword comparison and the "1.5 percent of all paid clicks" remark (WP fn. 16) survive, and so does the "11 separate regressions" remark (WP fn. 24 → fn. 18).
- **Traffic section:** adds "This helps explain why we found that clicks are lost but revenue is not."

### Content dropped from the published version (WP-only)

| WP passage | Location in WP | Vault note holding it |
|---|---|---|
| Wanamaker quote | §1 p. 1 | [[Blake 2015 - SEM Mechanics and the Endogeneity of Click-Priced Spend]] |
| Position-auction incentive argument and Athey & Ellison quote (fn. 15) | §2 p. 7 | SEM Mechanics note |
| Lewis et al. (2011): 5.4% experimental vs 871-1,198% observational (fn. 32) | §6 p. 22 | [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]] |
| Long-run argument that "the lion's share of spending is on customers who seem to be well aware of the site" | §6 p. 22 | Discussion note (the published text keeps only the brand-keyword version of the argument) |
| Google AdWords ROI advice quote and critique (fn. 33) | §6 p. 23 | Discussion note |
| Scholars use natural or controlled experiments; consulting firms use observational data | §6 p. 23 | Discussion note |
| CLV needed to offset −63% short-run ROI (fn. 34) | §6 p. 24 | Discussion note; ROI note |
| "The idealized experiment would have been conducted on a more refined user-level randomization", with Anderson & Simester (2010) (fn. 35) | §6 p. 24 | Discussion note |

### Numbers checked as identical

99.5% / 0.529% / Table 1 brand coefficients. Table 2 (0.00659, 0.00578, −0.0460, 0.150, −0.0141, −0.0119). Table 3 (0.885, 0.126, 0.00401, 0.00188; N 10,500 / 23,730). Table 4 ROIs (4173%, 1632%, −22%, −63%, −63%) and bounds. Inputs \$2,880.64M and \$51M. 72% attributed-sales fall; 30% size gap; 68/65/77 DMAs; 133 candidates. Fig. 4-5 axes; the 0.02 pp/month recency spline (s.e. .00004577). 41% / 2% / 42% click figures; 0.5 / 0.23 visit elasticities. 38 and 378 categories. Germany Table 5 / A.III, including the sentence "Narrowing the window and controlling for state trends reduces the magnitude" (see [[Blake 2015 - Brand Keyword Experiments and Paid-Organic Substitution#^note-table5-monotonicity]]). Candidacy Tables 6-7 / A.IV-A.V. Levels 0.199 / −80%.

> [!note] One residual inconsistency fixed in the published version
> The WP's Discussion twice refers to "Table 5" for the inflated OLS ROIs, which are actually in Tables 3-4 (Table 5 is the German brand test). The accepted manuscript refers to **Table 1**, the merged ROI table, which is correct.
^note-table5-slip

## Examples

> [!example] Citing a number correctly
> To cite the −63% ROI and its interval, cite Blake, Nosko & Tadelis (2015, Econometrica, Table 1, col. 4-5). To cite the 0.00659 DiD coefficient with its specification variants, cite the online supplement, Table A.II. To quote Google's AdWords ROI advice as critiqued by the authors, cite the NBER working paper (w20171, §6, p. 23), because the journal version omits it.
^versions-ex-2

## Connections

- The journal version leans harder on randomization and less on rhetoric about industry practice. The surviving claims are the ones a referee would demand: the DiD CI and the frequency slope. That is a useful model for writing up a geo test for a sceptical audience ([[Geo-Experiment Methodology - Overview]]).
- Versioning matters for reproducibility claims: [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]].

## See Also
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]
- [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]]
- [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]]
- [[_Index|Paid Search Field Experiment (Blake et al 2015)]]
