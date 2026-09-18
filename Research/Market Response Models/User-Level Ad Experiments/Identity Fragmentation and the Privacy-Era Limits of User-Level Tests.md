---
title: Identity Fragmentation and the Privacy-Era Limits of User-Level Tests
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/privacy
  - topic/measurement-error
  - type/concept
  - doc/paper
source:
  - "[[raw/Lin Misra 2022 - The Identity Fragmentation Bias.pdf]]"
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
  - "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
  - "[[raw/Barajas Bhamidipati Shanahan 2021 - Online Advertising Incrementality Testing Tutorial.pdf]]"
source_location: "Lin & Misra (arXiv 2008.12849v2; Marketing Science 41(3) 2022) §1-2 Table 1, §3.1-3.4 eq. (1)-(8), §4.1-4.3, §5 Tables 2-3, Fig. 3, §6; Johnson, Lewis & Nubbemeyer §5.3; Gordon et al. 2019 §1 fn. 3, §2.1; Barajas, Bhamidipati & Shanahan 2021 tutorial outline Part 3"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[User-Level Ad Experiments - Overview]]"
  - "[[Omitted Variables Bias]]"
  - "[[Activity Bias in Advertising]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
used_by:
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Identity Fragmentation Bias
  - Cookie-Level vs User-Level Measurement
  - Cross-Device Measurement Bias
  - Stratified Aggregation
  - Lin and Misra 2022
---

# Identity Fragmentation and the Privacy-Era Limits of User-Level Tests

> [!summary]
> A user-level experiment presumes that the unit randomized, the unit exposed and the unit whose outcome is measured are the same person. On the open web they are not: cookies are "browser, device, and site specific", device IDs miss cross-device journeys, and privacy changes (third-party-cookie blocking, IDFA opt-in) are removing the linking tools. Lin & Misra (2022) characterise the resulting **identity fragmentation bias** in a linear model as the sum of three terms — **purchase fragmentation** $\Delta_1$ (always attenuating), **exposure fragmentation** $\Delta_2$ (an omitted-variable term of either sign) and **spurious covariance** $\Delta_3$ (device-level activity bias and cross-device substitution, either sign). Contrary to the folk wisdom that fragmentation merely attenuates, the total "cannot be signed or bounded under standard assumptions. Instead, upward biases and sign reversals can occur even in experimental settings." Only under *symmetric and independent exposures* — deliverable by a fully randomized ITT design — does the bias reduce to division by the number of fragments. Partial identity linking can make things worse; **aggregation to groups that contain all of a person's fragments** — in the limit, geographies — is unbiased at the cost of power.

## Overview

Earlier notes in this cluster treat identity as solved. Johnson, Lewis & Nubbemeyer acknowledge it is not: in their cookie-based Google Display Network test, cookie churn loses post-exposure purchases, a cookie-switching consumer "could switch treatment groups", and "each computer, browser, tablet, or mobile device has its own unique anonymous cookie that is independently randomized. Hence, if a user's ad exposures are linked to one cookie but her purchases are linked to another, our estimates will be further attenuated" — so they "interpret the absolute ad lift estimates as lower bounds" (§5.3). Gordon et al. (2019, fn. 3) list the two consequences of cookie-level data: "users in an experimental control group may inadvertently be simultaneously assigned to the treatment group", and "advertising exposure across devices may not be fully captured"; Facebook avoids both only because users must log in everywhere.

Lin & Misra formalise what is lost, and show the "lower bound" reading is safe only in special cases.

**Scale of the problem** (their §1): Facebook reported 32% of users who show interest in mobile ads convert on desktop; cookie syncing "can match only up to 60% of fragmented records"; iOS 14 made IDFA collection opt-in; Safari and Firefox block third-party cookies and Chrome had announced it would follow. (Chrome's deprecation timeline subsequently slipped and changed form, but the direction the authors describe — "identity fragmentation is here to stay" — has held.)

## Main Content

### Framework

> [!definition] Fragmented data (Lin & Misra §3.1) ^def-fragmented
> True model at the person level, with two devices $j\in\{1,2\}$:
> $$
> y=\alpha+x'\beta+\epsilon,\qquad y=y_1+y_2,\quad x=x_1+x_2,\quad E[\epsilon\mid x_1,x_2]=0 .
> $$
> The analyst sees $2N$ "users": stacked outcomes $\tilde Y=(Y_1',Y_2')'$ and exposures $\tilde X$. A person buys on device 1 with indicator $s^{(i)}$ (on device 2 otherwise), so $\tilde Y=SY$ with $S=(\mathbf s',(I-\mathbf s)')'$, and $\Lambda_x=E[\mathbf s\mid X_1,X_2]$ is the device-preference matrix. Assumptions: $s\perp\epsilon\mid(x_1,x_2)$ and standard OLS conditions, so that any remaining bias is due to fragmentation alone.

> [!theorem] Bias decomposition (Lin & Misra eq. 8) ^thm-bias-decomposition
> With $\vartheta$ the (positive-definite) lower-right block of $(\tilde X'\tilde X)^{-1}$,
> $$
> E[\hat\beta\mid X_1,X_2]-\beta=\vartheta\,(\Delta_3+\Delta_2+\Delta_1),
> $$
> $$
> \Delta_1=-\big[X_1'(I-\Lambda_x)X_1+X_2'\Lambda_xX_2\big]\beta,\qquad
> \Delta_2=[X_1'X_2]\beta,\qquad
> \Delta_3=(X_1-X_2)'\big[\Lambda_x-\tfrac12I\big]\eta\,\alpha .
> $$
> - **$\Delta_1$ — purchase fragmentation.** Each row captures only part of the outcome variation while the row count doubles: pure attenuation, $-I<\vartheta\Delta_1<0$. Always present unless $\beta=0$.
> - **$\Delta_2$ — exposure fragmentation.** Exposure on the *other* device is an omitted variable ([[Omitted Variables Bias]]); sign and size follow the cross-device exposure correlation $X_1'X_2$. Vanishes when exposures are independent across devices and mean-centred.
> - **$\Delta_3$ — spurious covariance.** Proportional to the baseline $\alpha$ and to $\text{cov}(\tilde X,S)$, the covariance between where ads are seen and where purchases happen. Positive under **device-level activity bias** (people see ads and buy on the same device); negative if ads are seen on the phone and purchases made on the desktop; also generated by **cross-device substitution** (an ad shifts a purchase between devices without changing the total).
>
> "The latter two bias components have arbitrary signs and magnitudes ... Moreover, this bias does not converge to zero in the limit." $\Delta_1+\Delta_2$ is bounded in $[-\beta,\beta]$, so only when the baseline $\alpha\approx0$ (e.g. new products) is $\hat\beta\in[0,2\beta]$ with the correct sign. "In most digital ad effect studies, $\alpha\gg\beta$" — the low signal-to-noise regime of [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — and $\Delta_3$ dominates.

Device-level [[Activity Bias in Advertising|activity bias]] is removable by estimating separate models per device ("unstacking"); cross-device substitution is not (§3.2). The results extend to device-specific coefficients, $J>2$ fragments, and mixtures of fragmented and complete identities (§3.4-3.5), and the sources of bias persist in GLMs such as logit and Poisson, where attenuation is if anything stronger (§6).

### Does randomization rescue the estimate?

> [!theorem] Symmetric and independent exposures (SIE) (Lin & Misra §3.3, §4.2) ^thm-sie
> Suppose (1) $E[x_1]=E[x_2]$, $\text{Var}[x_1]=\text{Var}[x_2]$ and $x_1\perp x_2$, and (2) $E[\mathbf s\mid X_1,X_2]=\Lambda$ does not depend on exposures. Then with mean-centred covariates $E[\hat\beta]=\beta/2$; with $J$ fragments per user $E[\hat\beta]=\beta/J$, and $J\hat\beta$ is unbiased, with a confidence interval "at least $\sqrt J$ times" that of unfragmented data. Coey & Bailey's (2016) people-and-cookies correction is the special case of i.i.d. cookie exposures and equiprobable purchase cookies.
>
> **Both conditions are needed.** With randomized ($x_1\perp x_2$) but *asymmetric* treatment intensity — $E[x_1]=3$, $E[x_2]=1$, $E[x_1^2]=10$, $E[x_2^2]=2$, $\alpha=0$, constant device preference $\lambda$ — the bias is $(2\lambda-\tfrac74)\beta$:
> $$
> \lambda\in(\tfrac78,1]\Rightarrow\hat\beta>\beta;\qquad \lambda\in(\tfrac38,\tfrac78)\Rightarrow0<\hat\beta<\beta;\qquad \lambda\in[0,\tfrac38)\Rightarrow\hat\beta<0 .
> $$
> "Randomization by itself does not provide additional guarantees regarding the sign of the fragmentation bias."

Implications for experiment design:

- **Randomize at the fragment level with equal probabilities across fragment types** and **analyse as ITT.** Condition (1) then holds by design, and condition (2) holds for *assignment* even though it fails for *realized exposure* (activity bias). "We recommend researchers focus on intent-to-treat." The ATT scaling of [[From ITT to Treatment-on-the-Treated in Ad Experiments]] is then contaminated twice: through the ITT numerator (by $1/J$ under SIE) and through an exposure rate measured on fragments rather than people.
- **Contamination is attenuation plus.** If one person's cookies fall in different arms, "control" people are partly treated. Under SIE this is the $1/J$ factor; without symmetry (most mobile inventory in one arm's reach, most purchases on desktop) the direction is not guaranteed.
- **$J$ varies across people**, and the corrected estimator "will assign more weights to users with more fragments ... likely users with more activities."

### Three remedies compared (Lin & Misra §4)

| Remedy | Idea | Strength | Weakness |
|---|---|---|---|
| **Identity linking** | Deterministic (login, hashed email) or probabilistic (fingerprint, cookie sync) stitching | Intuitive; industry default | Only partial in practice. The pooled estimator is $\hat\theta_m=\omega\hat\theta_f+(I-\omega)\hat\theta_l$ with *matrix* weight $\omega=(r\tilde X'\tilde X+(1-r)X'X)^{-1}r\tilde X'\tilde X$; bias need not fall monotonically in the linked share, and in simulations intermediate linkage is "often further away from $\theta$, and sometimes the bias takes the reversed sign". Report match rates. |
| **Experiment-based adjustment** | Multiply the ITT by $J$ under SIE | Simple | Needs full randomization across fragment types, a common-effect model, known $J$; $\sqrt J$ wider intervals |
| **Stratified aggregation** | Aggregate to groups guaranteed to contain all fragments of each person — geography (county, city, store), refined by covariate cells such as zipcode × gender × age × education | "Requires the least assumptions"; works for nonlinear and structural models; no linking or experiment needed | Less power, less heterogeneity; sensitive to error in the binning covariates |

The third row is the formal bridge to [[Geo-Experiment Methodology - Overview|geo experiments]]: "A simple form of aggregation is analyzing data at the geographic level ... While simple aggregation provides robustness, it significantly reduces statistical power." A geo test is the design in which every fragment of a person shares one treatment assignment (they live in one place) and outcomes are summed over all fragments and channels, so $\Delta_1,\Delta_2,\Delta_3$ are zero by construction.

### Empirical illustration (Lin & Misra §5)

Matched person-level data from an online durable-goods seller (391,195 consumers; display, search and social exposures; engagement outcome), artificially fragmented into mobile / desktop / tablet records. Ads and engagements concentrate on the same devices; own-device ad-outcome correlations are positive (0.06-0.24) while cross-device correlations are *negative* — the signature of device substitution.

| Coefficient | True (person level) | Fragmented | Ratio |
|---|---|---|---|
| Search | 0.2584 | 0.3626 | 1.40 |
| Social | 0.1439 | 0.2157 | 1.50 |
| Display | 0.0428 | 0.0806 | 1.88 |

Fragmentation **inflates** effects by 40-88% — the opposite of the attenuation intuition — and, because the row count triples, standard errors shrink, leaving "zero overlap between the fragmented and true estimates". Stratified aggregation on simulated MSA × age × income cells gives intervals that are wider but cover the truth (Fig. 3).

### Identity tiers in practice

Barajas, Bhamidipati & Shanahan's tutorial outline ranks the units available to an incrementality platform:

1. **Cookie-based** — the DSP display standard; "cookie deletion, one per device".
2. **Device-ID based** — standard for in-app and open-exchange buying; "id reset, normalization, hashing".
3. **Logged-in users** — "common within the walled gardens"; cross-device execution and attribution; "as reliable as product experimentation".
4. **Household-level** — identity graphs built on IP clustering; "IP churn and reset, traveling, moving".

The privacy era removes tiers 1-2 for a growing share of traffic, leaves tier 3 to platforms with login walls — Lin & Misra's concluding worry about "a stronger incumbent advantage", echoing Lewis & Rao's scale argument — and makes tier 4 and geography the fallbacks for everyone else.

## Examples

**Lin & Misra's Table 1, reproduced.** Two people, each with a desktop (D) and mobile (M); both buy one unit; person 1 saw 2 ads, person 2 saw 4. True $\beta=0$.

```python
import numpy as np
slope = lambda x, y: np.polyfit(x, y, 1)[0]

# person level: ads (2, 4), purchases (1, 1)  -> slope 0
print(slope([2, 4], [1, 1]))                        # 0.0

# (b) ads seen mostly on the purchase device
print(slope([2, 0, 3, 1], [1, 0, 1, 0]))            # +0.4

# (c) ads seen on mobile, purchases on desktop
print(slope([0, 2, 1, 3], [1, 0, 1, 0]))            # -0.4
```

The same zero effect reads as strongly positive or strongly negative depending only on the cross-device pattern of exposure and purchase — $\Delta_3$ in action. Aggregating rows back to the person (or to any group containing both devices) restores the zero.

**A quick diagnostic from their §5.2.** Without cross-device substitution, the matrix of correlations between device-level outcomes $Y_j$ and device-level exposures $X_{j'}$ has proportional columns. Large positive diagonals with negative off-diagonals, as in their Table 2, flag substitution and hence upward bias in cookie- or device-level attribution.

## Connections

- [[User-Level vs Geo-Level Experiments - When to Use Which]] — fragmentation is the main reason to move a measurement question to geo level.
- [[Geo-Experiment Methodology - Overview]] and [[Geo-Experiment Design and Power Analysis]] — aggregation pushed to its limit; [[Time-Based Regression Estimator for Geo Experiments]] and [[SDID for Geo Experiments and Marketing Panels]] recover some of the power lost.
- [[Conversion Lift Studies on Ad Platforms]] — logged-in identity is what makes walled-garden lift studies internally valid; the advertiser-side outcome link (pixel, SDK, offline upload) remains a fragmentation point.
- [[Predicted Ghost Ads and Ghost Bids Mechanics]] — cookie-based, hence reported as lower bounds; this note qualifies that reading.
- [[Activity Bias in Advertising]] — $\Delta_3$ is activity bias at the device level.
- [[Omitted Variables Bias]] — $\Delta_2$ is a textbook omitted-variable term.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — why ITT is the robust estimand under fragmentation.
- [[User-Level Ad Experiments - Overview]].

## See Also

- [[Interference and Marketplace Experiments]] — a person split across arms is a within-person interference problem; Lin & Misra relate their setting to unknown network interference (fn. 4).
- [[Sample Ratio Mismatch and Trustworthiness Checks]] — cookie churn that differs by arm shows up as SRM.
- [[Experimental Benchmarks for Observational Ad Measurement]] — those benchmarks hold identity fixed; off-platform observational attribution has fragmentation bias *on top of* selection bias.
- [[Bayesian Media Mix Modeling - Overview]] — aggregate models are immune to fragmentation, one reason MMM has returned to favour.
