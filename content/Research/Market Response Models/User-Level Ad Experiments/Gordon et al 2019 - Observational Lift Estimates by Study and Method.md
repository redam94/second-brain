---
title: Gordon et al 2019 - Observational Lift Estimates by Study and Method
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - topic/propensity-score
  - type/example
  - type/theorem
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) §7.2 pp. 32-35, Table 5, Fig. 8 (p. 34), Fig. 9 (p. 35); §7.3 pp. 36-37, Fig. 10 (p. 36); Online Appendix Figs. A-8 to A-13 (pp. A-8 to A-13)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]"
  - "[[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]]"
  - "[[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]]"
used_by:
  - "[[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
aliases:
  - Gordon 2019 Figure 10
  - Gordon 2019 Table 5
  - Gordon 2019 Lift Estimates by Method
  - Gordon 2019 Figure 10 Shading
---

# Gordon et al 2019 - Observational Lift Estimates by Study and Method

> [!summary]
> The main empirical result of Gordon et al. (2019), §7.2-7.3. Discard the control group, then estimate ATT lift from exposed vs unexposed test users with 6 methods × 4 covariate sets plus the naive E-U contrast, and compare with the RCT. Study 4 is a "success": E-U gives 316% and STRATREG with all covariates gives 74%, against an RCT of 73%. That pattern does not generalize. Study 9 (RCT 2.4%) has no estimate below 1,306%. In Study 15 almost every method gives a *negative* lift against a positive RCT. Overall, methods **mostly overestimate**, sometimes underestimate, are off by more than **3×** in 7 of 14 checkout studies, do better on registration and page-view outcomes, gain most from the match score, and **no method dominates**. This note transcribes every point estimate from Figs. 8-10 and A-8-A-13 (22 study-outcomes × 23 estimates).

^summary-gordon-et-al-2019-observational-lift-est

## Overview

These numbers are the evidence behind the paper's headline. A condensed version across sources, with the 2023 DML follow-up, is in [[Experimental Benchmarks for Observational Ad Measurement]]. Here the full grid is kept so any claim can be checked. The estimators and covariate sets are defined in [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] and [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]].

## Main Content

### The selection to overcome — Study 4 (Table 5, §7.2)

| Variable | Unexposed | Exposed |
|---|---|---|
| Age | 26.4 | 29.3 |
| Female | 88% | 96% |
| Facebook age (days) | 2202 | 2242 |
| # of friends | 618 | 608 |
| Facebook web (days) | 5.1 | 4.0 |
| Facebook mobile (days) | 24.8 | 26.8 |
| Married | 8% | 19% |
| Single | 10% | 14% |
| Phone A | 5% | 2% |
| Phone B | 46% | 52% |
| Phone C | 48% | 45% |

Exposed users are older, about 8 points more likely to be female, more often married, have fewer friends, and use mobile more than desktop. If exposure is (wrongly) treated as random, the E-U contrast of eq. 13 gives an ATT lift of **316%**, "more than four times the lift due to treatment of 73%" (§7.2). It combines treatment and selection.

### Method sequence used in every figure (§7.2)

Without an outcome model: (1) **EM** on age and gender only, "a naive benchmark used widely in industry"; (2) **STRAT**; (3) **PSM**. With an outcome model: (4) **RA**; (5) **IPWRA**; (6) **STRATREG**. Each of methods 2-6 is run with covariate sets 1-4 (suffix 1-4). Significance markers test $H_0:\tau_\ell=\tau_\ell^m$ with eq. 29: `**` reject at 1%, `*` reject at 5%, no marker = fail to reject, `°` = "we cannot draw an inference" because the covariance could not be computed (EM, PSM, IPWRA).

### Study-by-study narrative (§7.2, Figs. 8-9)

> [!example] Study 4 — the friendly case (Fig. 8)
> E-U 316**; EM 222. With sets 1-3, every method except RA overestimates by about the same amount (STRAT 140/136/143, PSM 145/131/143, IPWRA 126/122/134, STRATREG 98/87/96). With **set 4** the estimates approach the RCT: STRAT 99, PSM 95, IPWRA 100, **STRATREG 74** vs RCT 73. RA4 underestimates at 37*. "Overall, whether a method relies on an outcome model seems unimportant."

^ex-g19-fig8

> [!example] Study 1 — same pattern (Fig. 9 top)
> E-U 217**. Every method improves on it. The best (STRATREG4 = 51, RA4 = 49) are statistically indistinguishable from the RCT's 30.

^ex-g19-s1

> [!example] Study 9 — massive failure (Fig. 9 middle)
> RCT lift **2.4%** (significant at 10%). E-U 4,074**, EM 3,414. **The closest estimate is RA4 = 1,306%.** The authors suggest the cause is the unusually low **6.6% exposure rate**, "which leaves the ad-targeting mechanism ample opportunity to target the specific set of consumers most likely to respond". Set 4 helps a lot (e.g. STRAT 2,315 → 1,724) but the estimate stays far from the truth.

^ex-g19-s9

> [!example] Study 15 — wrong sign (Fig. 9 bottom)
> RCT **+2.4%**. E-U 126**, EM 26. Every other method, with every covariate set, gives about **-6% to -14%**, an *under*estimate with the wrong sign. Most are rejected at 1%.

^ex-g19-s15

### Figure 10 / §7.3 — the summary grid

Fig. 10 is a heat map with one row per study-outcome pair. Red cells overestimate and blue cells underestimate. Color is proportional to the misestimation factor and is darkest at 3× over or under. RCT cells are red when significant at 5%. Its columns are EM, PSM1-4, a block labelled "Regression Adjustment" 1-4, and STRATREG1-4. *Reader's check:* the values in the "Regression Adjustment" block of Fig. 10 match the **IPWRA** estimates in Figs. 8-9 and A-8-A-13 exactly (e.g. Study 4: 126/122/134/100), not the RA estimates (63/61/64/37). STRAT and plain RA are not in Fig. 10. Both blocks are given in full below.

**Column labels in Fig. 10 (p. 36).** The columns are lettered (A), (C), (D), ..., (O); no column is labelled (B). (A) is "RCT Lift*". (C) is EM with the sub-header "Age, Gender". Each of the three four-column blocks (PSM D-G, "Regression Adjustment" H-K, "Stratified Regression" L-O) labels its covariate sets cumulatively:

| Fig. 10 sub-header | Equivalent variable set (§5, Table 2) |
|---|---|
| Age, Gender + FB Vars | set 1 (FB variables) |
| Age, Gender + FB Vars + Census Vars | set 2 |
| Age, Gender + FB Vars + Census Vars + Activity Vars | set 3 |
| Age, Gender + FB Vars + Census Vars + Activity Vars +FB Match Vars | set 4 |

The labels make the nesting explicit: every specification includes the EM baseline's age and gender, and each column adds one block. Age and gender are already part of variable set 1 (see [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]]), so "Age, Gender +" adds no variables. It ties the columns back to the EM benchmark.

**RCT column rounding.** Fig. 10's RCT column uses mixed precision. Most values agree with Table 4 to the printed digit, but several are rounded to integers: S11 checkout **9%** (Table 4: 8.6%), S12 **1%** (1.2%), S15 **2%** (2.4%), S10 registration **9%** (8.6%), S5 checkout **450%** (449.6%), S1 registration **781%** (781.4%), S5 page view **609%** (608.8%). S14 registration keeps a decimal (158.1%). The red flags (RCT significant at 5%) mark S1, S3, S4, S5, S11, S12, S14 and S15 checkout; S1, S5, S8 and S14 registration; and all three page-view rows. This matches the Table 4 CIs that exclude 0 (S10 registration, CI [0%, 19%], is not red). See [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]].

> [!theorem] Findings of the 15-study comparison (§7.3, p. 37)
> 1. The observational methods "mostly overestimate the RCT lift, although in some cases, they can significantly underestimate RCT lift."
> 2. "The point estimates in seven of the 14 studies with a checkout-conversion outcome are consistently off by more than a factor of three."
> 3. Registration and page-view outcomes are approximated better than checkouts. Unexposed users (test and control) rarely find a campaign landing page by themselves, so comparing test-exposed with test-unexposed users is close to comparing test-exposed with the always-unexposed control.
> 4. E-U "is always strongly biased up" relative to the RCT given how selection works in this industry. EM on age and gender reduces the bias but it "remains significant".
> 5. "More information helps, but adding census data and activity variables helps less than the Facebook match variable."
> 6. "We do not find that one method consistently dominates: in some cases, a given approach performs better than another for one study but not the other."

^thm-g19-findings

### Which seven checkout studies are "consistently off by more than a factor of three" (Fig. 10, §7.3)

The paper gives the count (seven of 14) but never names the studies. Reading the grid, they are **Studies 2, 7, 8, 9, 10, 12 and 15**. In each of these rows all 13 observational cells of Fig. 10 (EM, PSM1-4, the "Regression Adjustment" block 1-4 and STRATREG1-4) carry the **darkest** shade. Each one also passes a numerical check against the printed values:

| Study (checkout) | RCT ATT lift | Range of the 13 Fig. 10 estimates | Why every cell is off by more than 3× |
|---|---|---|---|
| S2 | 1.3% | 35% to 432% | The smallest estimate (35%) is about 27× the RCT |
| S7 | 2.7% | -36% to 37% | Sets 1-2 give 18-37% (≥ 6.7×); sets 3-4 give -31% to -36%, the **wrong sign** |
| S8 | -2.9% | 27% to 54% | RCT is negative and every estimate is positive (wrong sign) |
| S9 | 2.4% | 1,656% to 3,414% | At least about 690× the RCT |
| S10 | 2.0% | -13% to 43% | Positive cells are 16-43% (≥ 8×); set-4 PSM, IPWRA and STRATREG are -7%, -13%, -11% (wrong sign) |
| S12 | 1.2% | 81% to 129% | At least about 68× the RCT |
| S15 | 2.4% | -14% to 26% | EM 26% (about 11×); every other cell is -9% to -14% (wrong sign) |

*Reader's checks (not stated in the paper).*
- The seven also hold for the estimators that are **not** in Fig. 10. E-U, STRAT1-4 and plain RA1-4 (grid parts A-B below) are off by more than 3× or have the wrong sign in all seven rows. For example, S10 RA gives 9.9, 10, 25 and -4.8 against 2.0, and S15 RA gives -6.2 to -12 against 2.4.
- **Near miss: Study 11 checkout** (RCT 8.6%). Its EM, PSM3, IPWRA3 and STRATREG3 cells are darkest, and most other cells are 29-38% (about 3.4-4.4×). But the set-4 estimates PSM4 = 6.8% and IPWRA4 = 3.5% fall within a factor of three, so the row is not "consistently" off.
- No other checkout row comes close. Studies 1, 3, 4, 5, 13 and 14 have at least several cells well inside the 3× band.

^ex-g19-fig10-seven

### Fig. 10 cell shading, transcribed (p. 36)

**Legend as printed.** "Red: RCT Lift is statistically different from 0 at 5% significance level" (this applies to the RCT column's text colour). The cell fills are red for "Observational method overestimates lift" and blue for "Observational method underestimates lift". The legend continues: "Color proportional to overestimation factor; darkest color reached at 3-times over- or underestimation". The §7.3 text (p. 37) adds that "the darkest shade means the observational method over- or underestimates the RCT lift by a factor of 3 or more."

**How the table below was made.** The page was rendered at 220 dpi and the fill colour was sampled near the left edge of each cell, away from the text. The darkest red is RGB (255, 0, 0) and the darkest blue is RGB (51, 102, 255). Each cell is coded as **R** (red) or **B** (blue), followed by its shade as a percentage of the darkest fill. 0 means white and 100 means darkest. These codes are measurements of the figure, not printed values.

| Row | EM | PSM1 | PSM2 | PSM3 | PSM4 | "RA"1 | "RA"2 | "RA"3 | "RA"4 | SR1 | SR2 | SR3 | SR4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 C | R96 | R88 | R85 | R60 | R70 | R82 | R76 | R64 | R51 | R78 | R71 | R39 | R24 |
| S2 C | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 |
| S3 C | R100 | R44 | R56 | R100 | R31 | R44 | R53 | R100 | B15 | R33 | R40 | R82 | B27 |
| S4 C | R68 | R33 | R26 | R32 | R10 | R24 | R22 | R28 | R12 | R11 | R7 | R10 | R0 |
| S5 C | R4 | B2 | B1 | R1 | B10 | B2 | B1 | B1 | B11 | B0 | B1 | B1 | B11 |
| S7 C | R100 | R100 | R100 | B100 | B100 | R100 | R100 | B100 | B100 | R100 | R100 | B100 | B100 |
| S8 C | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 |
| S9 C | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 |
| S10 C | R100 | R100 | R100 | R100 | B100 | R100 | R100 | R100 | B100 | R100 | R100 | R100 | B100 |
| S11 C | R100 | R77 | R85 | R100 | B7 | R82 | R85 | R100 | B20 | R82 | R87 | R99 | B25 |
| S12 C | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 |
| S13 C | B53 | B44 | B46 | B32 | B36 | B45 | B45 | B35 | B33 | B43 | B44 | B35 | B33 |
| S14 C | R30 | R9 | R12 | R18 | R21 | R9 | R11 | R16 | R15 | R6 | R8 | R11 | R12 |
| S15 C | R100 | B100 | B100 | B100 | B100 | B100 | B100 | B100 | B100 | B100 | B100 | B100 | B100 |
| S1 R | R10 | R8 | R7 | R12 | R8 | R8 | R7 | R13 | R9 | R2 | R0 | B15 | B19 |
| S5 R | R14 | R6 | R6 | R6 | B5 | R6 | R6 | R6 | B6 | R8 | R8 | R7 | B5 |
| S8 R | R62 | R52 | R50 | R58 | R55 | R45 | R47 | R50 | R27 | R49 | R52 | R51 | R32 |
| S10 R | R100 | R42 | R36 | R100 | B44 | R36 | R38 | R87 | B33 | R39 | R38 | R87 | B25 |
| S14 R | R24 | R12 | R13 | R18 | R17 | R13 | R13 | R16 | R16 | R13 | R13 | R17 | R17 |
| S2 P | R60 | R21 | R20 | B8 | B8 | R19 | R20 | B8 | B7 | B8 | B8 | R4 | B6 |
| S5 P | R13 | R9 | R7 | R6 | B7 | R7 | R7 | R5 | B7 | R9 | R9 | R6 | B6 |
| S6 P | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 | R100 |

C = checkout, R = registration, P = page view. "RA" = the block labelled "Regression Adjustment", whose values are the IPWRA estimates (see above). SR = Stratified Regression (STRATREG).

> [!definition] Shading rule implied by Fig. 10 (reader's reconstruction, checked on all 286 cells)
> Let $\hat\ell$ be an observational lift estimate and $\ell$ the RCT lift. The measured shades fit
> $$
> \text{shade}=\min\!\left(1,\ \frac{|\hat\ell-\ell|}{3\,|\ell|}\right),\qquad \text{red if } \hat\ell>\ell,\ \text{blue if } \hat\ell<\ell,
> $$
> to within 2.2 percentage points in every cell, using the Table 4 RCT lifts to one decimal (e.g. 8.6% for S11, 2.4% for S15). Two examples: S1 EM (116 vs 30) gives 86/90 = 0.96, measured R96; S13 EM (-39 vs -15) gives 24/45 = 0.53, measured B53.

^def-g19-fig10-shading

**What the rule implies** (reader's notes):
- "Darkest at 3 times" means an **error equal to three times the RCT lift**. For overestimates that is $\hat\ell\ge4\ell$. For a positive RCT lift, the darkest blue needs $\hat\ell\le-2\ell$, a wrong-sign estimate.
- A same-sign underestimate can reach at most 33% shade, even if it is far more than 3× too small. For example, S3 STRATREG4 is 1.6% against 8.8%, about 5.5× too low, and is shaded only B27. The blue cells therefore understate how badly some estimates miss when the miss is toward zero.
- A negative RCT lift reverses the visual reading. In S13 (RCT -15%) the estimates of -30% to -39% are blue ("underestimate", meaning more negative) at 32-53% shade. In S8 (RCT -2.9%) every positive estimate is darkest red.
- Fully dark rows: checkout S2, S8, S9, S12 (all red); S7 and S10 (red and blue, with blue where the sign flips); S15 (blue except EM). Among non-checkout rows only **S6 page view** is fully dark. S10 registration is dark only in EM, PSM3, and nearly so in "RA"3/SR3 (87).
- Lightest rows (closest to the RCT): S5 checkout (all ≤ 11), S5 registration and S5 page view (≤ 14), S1 registration (≤ 19) and S14 checkout (≤ 30). This matches the §7.3 point that the upper-funnel outcomes are approximated better, although S5 checkout, the largest checkout effect (450%), is the best-approximated row of all.

^ex-g19-fig10-shading

### Full grid of lift estimates (%) — part A: naive, matching and stratification

Transcribed from Figs. 8-9 and Online Appendix Figs. A-8 (checkout S1-S3), A-9 (S4, S5, S7, S8), A-10 (S9-S12), A-11 (S13-S15), A-12 (registration S1, S5, S8, S10) and A-13 (registration S14; page view S2, S5, S6). RCT = ATT lift from Table 4 as printed on each figure.

| Study / outcome | RCT | E-U | EM | STRAT1 | STRAT2 | STRAT3 | STRAT4 | PSM1 | PSM2 | PSM3 | PSM4 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 Checkout | 30 | 217** | 116° | 105** | 100** | 103** | 94* | 109° | 107° | 85° | 93° |
| S2 Checkout | 1.3 | 377** | 432° | 156** | 148** | 39** | 37** | 161° | 149° | 37° | 36° |
| S3 Checkout | 8.8 | 198** | 65° | 22 | 25* | 46** | 18 | 20° | 24° | 41° | 17° |
| S4 Checkout | 73 | 316** | 222° | 140** | 136** | 143** | 99 | 145° | 131° | 143° | 95° |
| S5 Checkout | 450 | 678** | 511° | 427 | 432 | 448 | 306 | 418° | 443° | 463° | 316° |
| S7 Checkout | 2.7 | 131** | 37° | 19** | 20** | -34** | -35** | 20° | 18° | -33° | -36° |
| S8 Checkout | -2.9 | 179** | 48° | 34** | 39** | 52** | 33* | 31° | 36° | 50° | 27° |
| S9 Checkout | 2.4 | 4074** | 3414° | 1994** | 1995** | 2315** | 1724** | 2062° | 1970° | 2314° | 1710° |
| S10 Checkout | 2 | 138** | 38° | 20 | 20 | 36 | -15 | 23° | 16° | 43° | -6.8° |
| S11 Checkout | 8.6 | 392** | 275° | 30** | 30** | 39** | 7.1 | 29° | 31° | 38° | 6.8° |
| S12 Checkout | 1.2 | 233** | 129° | 112** | 110** | 81** | 81** | 111° | 110° | 82° | 82° |
| S13 Checkout | -15 | 61** | -39° | -35 | -35 | -31 | -30 | -35° | -36° | -30° | -31° |
| S14 Checkout | 62 | 365** | 119° | 81 | 86 | 99** | 99** | 80° | 85° | 95° | 101° |
| S15 Checkout | 2.4 | 126** | 26° | -9.2** | -8.9** | -10** | -13** | -9.6° | -9.4° | -10° | -13° |
| S1 Registration | 781 | 1132* | 1024° | 976 | 962 | 1126 | 1023 | 978° | 944° | 1060° | 977° |
| S5 Registration | 893 | 1456** | 1270° | 1064* | 1065* | 1074** | 744* | 1071° | 1055° | 1070° | 765° |
| S8 Registration | 63 | 331** | 180° | 154 | 156 | 161 | 135 | 162° | 159° | 173° | 167° |
| S10 Registration | 8.6 | 136** | 34° | 19 | 19 | 32* | -.33 | 19° | 18° | 34° | -2.6° |
| S14 Registration | 158 | 540** | 275° | 219** | 221** | 245** | 241** | 215° | 219° | 244° | 241° |
| S2 Page View | 1517 | 3363** | 4261° | 2481** | 2479** | 1147** | 1183** | 2493° | 2416° | 1150° | 1177° |
| S5 Page View | 609 | 1010** | 846° | 749** | 747** | 711* | 480** | 771° | 731° | 719° | 484° |
| S6 Page View | 14 | 368** | 227° | 103** | 106** | 262** | 254** | 103° | 105° | 263° | 255° |

### Full grid — part B: outcome-model methods

| Study / outcome | RCT | RA1 | RA2 | RA3 | RA4 | IPWRA1 | IPWRA2 | IPWRA3 | IPWRA4 | STRATREG1 | STRATREG2 | STRATREG3 | STRATREG4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 Checkout | 30 | 99** | 94** | 59 | 49 | 104° | 99° | 88° | 76° | 101** | 94** | 65 | 51 |
| S2 Checkout | 1.3 | 114** | 103** | 33** | 30** | 149° | 140° | 43° | 35° | 97** | 98** | 54** | 40** |
| S3 Checkout | 8.8 | 6.2 | 8.9 | 21 | 4.6 | 21° | 23° | 38° | 5° | 18 | 19 | 30* | 1.6 |
| S4 Checkout | 73 | 63 | 61 | 64 | 37* | 126° | 122° | 134° | 100° | 98 | 87 | 96 | 74 |
| S5 Checkout | 450 | 409 | 415 | 429 | 299 | 428° | 432° | 437° | 305° | 447** | 431** | 435** | 301 |
| S7 Checkout | 2.7 | 22** | 23** | -19** | -21** | 19° | 20° | -33° | -35° | 19** | 19** | -31** | -33** |
| S8 Checkout | -2.9 | 39** | 45** | 60** | 33** | 36° | 41° | 54° | 29° | 32* | 37** | 52** | 28* |
| S9 Checkout | 2.4 | 1925** | 1960** | 2069** | 1306** | 1994° | 1999° | 2319° | 1716° | 1962** | 1962** | 2210** | 1656** |
| S10 Checkout | 2 | 9.9 | 10 | 25 | -4.8 | 20° | 20° | 34° | -13° | 21 | 21 | 35 | -11 |
| S11 Checkout | 8.6 | 16** | 16** | 11 | -2.9** | 30° | 31° | 35° | 3.5° | 30** | 31** | 34** | 2.1 |
| S12 Checkout | 1.2 | 105** | 107** | 73** | 74** | 112° | 111° | 82° | 81° | 112** | 111** | 84** | 82** |
| S13 Checkout | -15 | -36 | -36 | -31 | -30 | -35° | -35° | -31° | -30° | -35 | -35 | -31 | -30 |
| S14 Checkout | 62 | 80 | 83 | 93* | 92* | 80° | 83° | 92° | 90° | 74 | 77 | 82 | 84 |
| S15 Checkout | 2.4 | -6.2** | -6.3** | -9.7** | -12** | -9.1° | -9.1° | -11° | -14° | -9.1** | -9** | -12** | -14** |
| S1 Registration | 781 | 625 | 593* | 205** | 155** | 968° | 960° | 1087° | 985° | 824 | 800 | 432** | 348** |
| S5 Registration | 893 | 1204** | 1189** | 1196** | 681** | 1067° | 1067° | 1063° | 728° | 1112** | 1104** | 1081* | 772 |
| S8 Registration | 63 | 124 | 126 | 139 | 99 | 150° | 153° | 158° | 114° | 157 | 161 | 160 | 125 |
| S10 Registration | 8.6 | 16 | 16 | 27* | 3.4 | 18° | 18° | 31° | .19° | 19 | 18 | 31* | 2.3 |
| S14 Registration | 158 | 234** | 234** | 277** | 281** | 219° | 219° | 238° | 234° | 219** | 218** | 240** | 239** |
| S2 Page View | 1517 | 744** | 747** | 202** | 209** | 2408° | 2422° | 1175° | 1187° | 1162** | 1181** | 1722 | 1268 |
| S5 Page View | 609 | 809** | 803** | 828** | 490** | 751° | 748° | 710° | 477° | 776** | 769** | 717* | 498* |
| S6 Page View | 14 | 66** | 68** | 222** | 236** | 103° | 106° | 250° | 246° | 111** | 115** | 255** | 278** |

### Patterns that can be read off the grid

- **Covariate set 4 (match score) moves estimates most.** For example: S2 STRAT 148 → 39 when activity is added (set 3), then 37; S11 STRAT 39 → 7.1 (set 4) against RCT 8.6; S10 STRAT 36 → -15 (overshooting below the RCT's 2.0).
- **Adding covariates is not monotone toward the truth.** In S7 the sets 1-2 estimates (about +20%) are closer to the RCT's 2.7% in absolute terms than the sets 3-4 estimates (about -35%). In S6 page view, adding sets 3-4 moves STRAT from 106 to 262 against an RCT of 14.
- **Method choice usually matters less than covariates.** Within a study and covariate set, STRAT, PSM, IPWRA and STRATREG often agree within a few points (e.g. S12, S13, S9 set 4: 1,656-1,724). Plain RA sometimes departs sharply (S1 registration RA4 = 155 vs STRAT4 = 1,023; S2 page view RA3-4 ≈ 205 vs ≈ 1,150-1,268 for the others). Most of the spread is across studies.
- **Upper-funnel outcomes.** The closest are S1 registration (STRAT/PSM/IPWRA ≈ 944-1,126 vs 781), S5 page view (set 4 ≈ 477-498 vs 609) and S14 registration (≈ 215-281 vs 158). Even there, most S6 page-view estimates (RCT 14%) are off by 7-20×.

## Examples

> [!example] A generic illustration: the same pipeline, opposite errors
> An analyst applies one propensity pipeline to two campaigns. In the S4-like campaign it lands within 1 point of the experiment and gets reported as "validated". In the S15-like campaign it reports a negative effect for a campaign that truly raised sales. Validating a method on one campaign says almost nothing about the next. The error comes from campaign-specific selection, not from the estimator. This is the measurement version of picking a model because it happened to match one benchmark ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]]).

^exa-g19-observational-lift-e-1

## Connections

- [[Experimental Benchmarks for Observational Ad Measurement]] — the cross-source summary, plus the 663-experiment DML follow-up that reaches the same conclusion.
- [[Activity Bias in Advertising]] and [[Observational vs Experimental Methods in Advertising]] — the first exposed-vs-unexposed benchmark (Yahoo!).
- [[The Selection Problem]] — E-U = treatment + selection, made concrete in Table 5 and in the E-U column above.
- [[Propensity Score Matching - Balancing Theorem and Failure Modes]] — balanced but biased.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — the same selection-by-targeting problem in aggregate data.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — the match score predicts exposure well. Predictive accuracy for treatment does not imply causal accuracy for its effect.

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]] — how strong an omitted variable would have to be to close each gap.
- [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]] — the RCT column with CIs.
