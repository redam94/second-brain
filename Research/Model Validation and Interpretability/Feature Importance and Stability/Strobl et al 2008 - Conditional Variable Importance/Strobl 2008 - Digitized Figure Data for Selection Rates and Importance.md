---
title: "Strobl 2008 - Digitized Figure Data for Selection Rates and Importance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, Figures 1-4 (§2.2, §2.4, §3, §4). Values digitized from the open-access figure images saved as [[raw/Strobl et al 2008 - Figure 1 Selection Rates.jpg]], [[raw/Strobl et al 2008 - Figure 2 Permutation Schemes.jpg]], [[raw/Strobl et al 2008 - Figure 3 Permutation Importance.jpg]], [[raw/Strobl et al 2008 - Figure 4 Peptide Binding.jpg]]"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]"
  - "[[Strobl 2008 - Permutation Importance Null Hypotheses]]"
used_by:
  - "[[Strobl 2008 - Simulation Results for Conditional Importance]]"
  - "[[Strobl 2008 - Peptide-Binding Application]]"
  - "[[Strobl 2008 - Discussion, mtry Guidance and Limitations]]"
aliases:
  - Strobl 2008 Figure Values
  - Strobl 2008 Figures 1-4 Digitized
---

# Strobl 2008 - Digitized Figure Data for Selection Rates and Importance

> [!summary]
> The markdown text of the paper has only image links and captions for its four figures. This note transcribes what the figures show, read from the published images. **All three simulation panels use `mtry` ∈ {1, 3, 8}**, which the text never states. Figure 1 shows that with `mtry = 8`, the correlated $X_1, X_2$ take about 41% of root splits each, while the equally strong uncorrelated $X_5, X_6$ take almost none. Over *all* splits, $X_5, X_6$ end up slightly ahead (≈0.95 vs ≈0.90). In Figure 3 the median **marginal** importance of $X_1$ at `mtry = 8` is about 70, against about 16 for $X_5$. The **conditional** median of $X_1$ is about 31. That is closer to $X_5$, but at about twice its value it is not "almost equal". In Figure 4 (peptide data, `mtry = 104`), 5 bars run off the top of the marginal panel and 2 off the conditional panel. The digitized bar heights reproduce the paper's ranks for h2y8, flex8 and pol3 exactly.
^summary-figdata

## Overview

**How the values were obtained.** The four figure images were downloaded from the open-access copy of the article and saved in `raw/`. Axis tick marks were located by pixel analysis. Bar tops (Figs 1 and 4) and median markers and inter-quartile bands (Fig. 3) were then converted to data units by linear interpolation between ticks. The images are 600 px wide, so expect a reading error of about ±0.01 for Fig. 1 rates, about ±1 importance unit for Fig. 3 (±2 in the `mtry = 8` panel), and about ±0.0003 for Fig. 4. **These are digitized readings, not numbers printed by the authors.** Ranks and orderings are reliable. Second decimals are not.

## Main Content

### Figure 1: selection rates (§2.2)

Layout: 3 rows (`mtry` = 1, 3, 8) × 2 columns ("first split", "all splits"). Dark bars are $X_1$–$X_4$ (correlated block) and light bars are $X_5$–$X_{12}$. The y-axis runs 0-0.4 for first splits and 0-0.8 for all splits.

> [!example] Figure 1 values, first split of each tree (digitized)
> | `mtry` | $X_1$ | $X_2$ | $X_3$ | $X_4$ | $X_5$ | $X_6$ | $X_7$ | $X_8$ | $X_9$–$X_{12}$ (each) |
> |---|---|---|---|---|---|---|---|---|---|
> | 1 | 0.086 | 0.086 | 0.086 | 0.086 | 0.086 | 0.086 | 0.081 | 0.076 | 0.071 |
> | 3 | 0.22 | 0.22 | 0.17 | 0.15 | 0.086 | 0.081 | 0.035 | 0.015 | 0.015 |
> | 8 | 0.41 | 0.41 | 0.13 | 0.046 | ≈0 | ≈0 | ≈0 | ≈0 | ≈0 |
>
> In each row the rates add up to about 1.0 (0.96, 1.04, 1.00). The first-split panel is therefore each variable's share of root splits. That is a check on the reading, not something the paper states.
^ex-fig1-first

> [!example] Figure 1 values, all splits of all trees (digitized)
> | `mtry` | $X_1$ | $X_2$ | $X_3$ | $X_4$ | $X_5$ | $X_6$ | $X_7$ | $X_8$ | $X_9$–$X_{12}$ (each) |
> |---|---|---|---|---|---|---|---|---|---|
> | 1 | 0.48 | 0.48 | 0.48 | 0.48 | 0.48 | 0.48 | 0.46 | 0.44 | 0.42 |
> | 3 | 0.85 | 0.85 | 0.75 | 0.68 | 0.79 | 0.79 | 0.40 | 0.21 | 0.21 |
> | 8 | 0.91 | 0.89 | 0.61 | 0.38 | 0.95 | 0.97 | 0.21 | 0.05 | 0.05 |
>
> These rates do not add up to 1, so this panel is not a share of all splits. The paper calls both panels "relative selection rates" without defining them further.
^ex-fig1-all

**What the numbers add to the text.**
- At `mtry = 3`, a correlated variable with $\beta = 0$ ($X_4$, 0.15) is picked for the root about **twice as often** as an uncorrelated one with $\beta = -5$ ($X_5$, 0.086). This is the "more often than even the highly influential uncorrelated ones" claim of §2.2, in numbers.
- At `mtry = 8`, the uncorrelated drivers essentially never win the root split, because $X_1, X_2$, which have both $\beta = 5$ and correlated support, beat them. Over all splits, though, $X_5, X_6$ are used slightly *more* than $X_1, X_2$. This is how "the correlated predictors loose [*sic*] most of their advantage" (§2.2) looks in the figure.
- Over all splits, the preference for $X_3, X_4$ over $X_7, X_8$ is large: at `mtry = 8` it is 0.61 vs 0.21 and 0.38 vs 0.05.

### Figure 2: the two permutation schemes (§2.4)

> [!example] Figure 2 transcribed
> **Left (marginal scheme).** A data table with columns $Y$, $X_j$, $Z$ and rows $i = 1,\dots,n$. Only the shaded $X_j$ column is permuted: row $i$ holds $x_{\pi_j(i),j}$ next to the unchanged $y_i$ and $z_i$.
>
> **Right (conditional scheme).** The rows are grouped by the value of $Z$. In the block $Z = a$ (rows 1, 3, 27, …), $X_j$ is permuted only among those rows, giving $x_{\pi_{j\mid Z=a}(i),j}$. Likewise in the block $Z = b$ (rows 6, 14, 21, …) with $\pi_{j\mid Z=b}$. $Y$ and $Z$ stay fixed.
^ex-fig2

### Figure 3: permutation importance, marginal vs conditional (§3)

Layout: 3 panels (`mtry` = 1, 3, 8). The caption describes the marginal scheme as dashed and the conditional scheme as solid. **The published image does not match this**: both median lines are dashed (the marginal line with short dashes, the conditional line with longer dashes). The schemes are told apart by colour and marker, not by solid vs dashed: the marginal scheme has dark-red lines with red square markers and a pink inter-quartile band, the conditional scheme has dark-blue lines with blue circle markers and a lavender band. Read the figure by colour, not by the caption's line styles. Each panel has its own y-axis: 0-30, 0-60 and 0-100.

> [!example] Figure 3 medians and IQRs (digitized; 500 replications; $Z$ = variables with $r \ge .2$)
> | `mtry` | Scheme | $X_1$ | $X_2$ | $X_3$ | $X_4$ | $X_5$ | $X_6$ | $X_7$ | $X_8$–$X_{12}$ |
> |---|---|---|---|---|---|---|---|---|---|
> | 1 | marginal median | 29 | 29 | 27 | 26 | ≈9 | ≈9 | ≈1.6 | ≈0 |
> | 1 | marginal IQR | 27–32 | 26–32 | 25–30 | 23–29 | — | — | — | — |
> | 1 | conditional median | 16 | 16 | 14 | 13 | 9 | 9 | 1.6 | ≈0 |
> | 1 | conditional IQR | 15–18 | 15–18 | 13–16 | 12–15 | 7.5–10 | 7–10 | — | ≈ −1 to 1 |
> | 3 | marginal median | 50 | 51 | 35 | 27 | ≈13 | ≈13 | ≈1.2 | ≈0 |
> | 3 | marginal IQR | 45–57 | 44–58 | 30–42 | 24–31 | — | — | — | — |
> | 3 | conditional median | 20 | 20 | 12 | 8 | 13 | 13 | 1.2 | ≈0 |
> | 3 | conditional IQR | 17–23 | 17–23 | 10–14 | 7–10 | 11–14 | 11–15 | 0–3 | ≈ −1 to 1 |
> | 8 | marginal median | 70 | 70 | 17 | 7 | ≈16 | ≈16 | ≈0.4 | ≈0 |
> | 8 | marginal IQR | 49–96 | 49–101 | 14–32 | 6–12 | — | — | — | — |
> | 8 | conditional median | 31 | 33 | 8 | 3 | 16 | 16 | 0.4 | ≈0 |
> | 8 | conditional IQR | 23–43 | 22–44 | 6–14 | ≈3–5 | 13–18 | 13–18 | −1.5 to 3 | ≈ −2 to 2 |
>
> "≈" marks values for $X_5$–$X_{12}$ where the two schemes' markers sit on top of each other and cannot be read separately. "—" means the band is hidden under the other scheme's band or is too narrow to measure. The paper does not print the units of the importance scale. The response is continuous, so the scale is presumably the increase in OOB mean squared error, but this is an inference.
^ex-fig3-values

**What the numbers add to the text.**
1. **Size of the marginal inflation.** For $X_1$ against its uncorrelated twin $X_5$, the marginal median is about 3.2× larger at `mtry = 1`, about 3.9× at `mtry = 3` and about 4.4× at `mtry = 8`. Measured by this ratio, the inflation grows with `mtry`. The text says the effect "is most pronounced for small values of mtry". That holds for the null and small-coefficient correlated variables: the marginal $X_4$, with $\beta = 0$, is about 26 at `mtry = 1` against about 7 at `mtry = 8`, so at small `mtry` it outranks the $\beta = -5$ uncorrelated $X_5$ by about 3×.
2. **"Almost equal" for $X_1$ vs $X_5$ is generous.** The conditional medians are 16 vs 9, 20 vs 13 and 31 vs 16. Conditioning closes most of the gap: the ratio falls from 3.2–4.4× to about 1.5–2×. It does not close all of it. The text's wording, "an almost equal level of importance", overstates how well they agree. The remaining gap fits the coarse-grid explanation in [[Strobl 2008 - Permutation Importance Null Hypotheses#^ex-oracle]].
3. **$X_4$ (true zero).** Conditionally it falls to 13, 8 and 3, still clearly above the uncorrelated null $X_8$ (≈0) at every `mtry`. This matches "still overestimated – however to a much lesser extent" (§3).
4. **Variance.** The IQR widths for $X_1$ are 5, 12 and 47 (marginal) against 3, 6 and 20 (conditional). The spread grows with `mtry`, and conditional is narrower at every `mtry`, as §3 states.
5. **Uncorrelated variables.** For $X_5$–$X_{12}$ the two schemes overlap almost exactly, as §2.4 predicts when $X_j \perp Z$ (their $Z$ is empty in expectation under $r \ge .2$).
^thm-fig3-readings

### Figure 4: peptide-binding importances (§4)

Layout: 2 panels ("unconditional" on top, "conditional" below), one bar per predictor. The bars of the three focus variables are dark. Only the x-axis labels h2y8, flex8 and pol3 are printed, and an asterisk marks pol8. The y-axis is labelled at 0 and 0.005, with an unlabelled tick at 0.010.

> [!example] Figure 4 bar heights (digitized; 1000 trees, `mtry = 104`)
> | Bar (left-to-right position) | Marginal VI | Marginal rank | Conditional VI | Conditional rank |
> |---|---|---|---|---|
> | unlabelled, ≈11% across | off-scale (> 0.0143) | 1–5 | 0.0081 | 5 |
> | **h2y8** (≈14%) | **0.0117** | **8** | **0.0018** | **9** |
> | unlabelled, ≈17% | off-scale | 1–5 | off-scale | 1–2 |
> | unlabelled, ≈29% | off-scale | 1–5 | off-scale | 1–2 |
> | unlabelled, ≈54% | 0.0129 | 6 | 0.0059 | 6 |
> | unlabelled, ≈64% | off-scale | 1–5 | 0.0100 | 4 |
> | **flex8** (≈67%) | **0.0063** | **9** | **0.0024** | **8** |
> | **pol3** (≈83%) | **0.0038** | **11** | **0.0036** | **7** |
> | **pol8\*** (≈88%) | off-scale | 1–5 | 0.0103 | 3 |
> | unlabelled, ≈93% | 0.0052 | 10 | ≈0.0013 | — |
> | unlabelled, ≈96% | 0.0120 | 7 | ≈0.0015 | — |
>
> The ranks are derived from the digitized heights. For the three focus variables they match the paper's stated ranks exactly (8/9/11 → 9/8/7), which supports the reading. The remaining bars are at or below about 0.0025 in the marginal panel and at or below about 0.0016 (just under h2y8) in the conditional panel, so they do not disturb the stated ranks.
^ex-fig4-values

**What the figure adds, and what it cannot.**
- **The top tier.** Five predictors run off the marginal panel and two off the conditional one. pol8 (marked \*) is one of the five marginal off-scale bars and drops to about 0.010, rank 3, after conditioning. That is the "high importance (that is however also moderated by conditioning)" of §4, para. 2.
- **h2y8 loses about 85% of its score** (0.0117 → 0.0018), flex8 about 60% (0.0063 → 0.0024), while pol3 is almost unchanged (0.0038 → 0.0036). The rank reversal is not caused by pol3 rising. It happens because the other two collapse.
- **Identities of the unlabelled top variables.** The figure does not name them, and the text names only pol8. **The names of the other top-ranked predictors cannot be recovered from the source.** The paper also does not say how the 104 predictors are ordered along the x-axis.
- **Other `mtry` values.** The text says the rank change "is most pronounced for large mtry as expected, but similar effects can be observed for smaller values". Figure 4 shows only `mtry = 104`. **The smaller `mtry` values that were run are not reported anywhere in the paper.**
^thm-fig4-readings

## Examples

> [!example] Using digitized benchmarks to validate a re-implementation (generic)
> To test your own conditional-importance code (e.g. `permimp` or a custom grouped-permutation routine), reproduce the §2.1 design at `mtry` = 1, 3 and 8 and compare against the table above. The *ordering* to check is: marginal $X_1 \gg X_5$; conditional $X_1 > X_5$ by roughly 1.5–2×; conditional $X_4 > X_8 \approx 0$; conditional IQR narrower than marginal at each `mtry`. The same matched-twin check carries over to correlated marketing inputs, for example weekly media data with 52-156 rows.
^example-figdata-2

## Connections

- Digitizing figures to recover simulation numbers fills a reporting gap that [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] would flag: no tabulated estimates and no Monte Carlo SE.
- The $X_1$-vs-$X_5$ gap that survives conditioning shows that the conditional score is still not a coefficient estimate. Compare the model-reliance view in [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] and the extrapolation critique in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- The mid-rank reshuffle in Fig. 4 is a case for stability checks: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also

- [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]: design and Fig. 1 text.
- [[Strobl 2008 - Simulation Results for Conditional Importance]]: Fig. 3 text.
- [[Strobl 2008 - Peptide-Binding Application]]: Fig. 4 text.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
