---
title: "Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/replication-crisis
  - type/example
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Gelman & Loken 2013, §3 intro, §3.1 Data exclusion and coding rules, §3.2 Combining information from separate studies, pp. 8-10"
date_ingested: 2026-10-13
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]]"
  - "[[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]]"
used_by:
  - "[[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]]"
  - "[[Researcher Degrees of Freedom]]"
aliases:
  - "Red or pink at peak fertility example"
  - "Beall and Tracy forking paths"
  - "Beall-Tracy vs Durante comparison"
---

# Gelman & Loken (2013) §3 — Data Exclusion, Coding and Pooling Forks in the Red-Pink Study

> [!summary]
> §3 analyses one paper in depth: Beall & Tracy (2013), which reported that women at peak fertility were **three times** more likely to wear red or pink. The forks are **inclusion/exclusion** rules that were not applied consistently, **colour coding** (red and pink combined), the **fertile window** and its comparison days, and **pooling vs splitting** the two samples. The most telling evidence is a companion study (Durante et al. 2013) in the same journal and the same year, with a similar design, that made *different* choices on every one of these forks and also reached $p<0.05$.
^summary

## Overview

The authors' published criticism (Gelman 2013) likened the paper to the arm-circumference and ESP papers. Tracy & Beall (2013) replied that they tested "one specific hypothesis: that conception risk would increase women's tendency to dress in red or pink," grounded in prior work including their own earlier paper, so this was "not to conduct a fishing expedition" (p. 8). Gelman & Loken accept the motive but note that "whether or not the authors of the study were 'mining the data,' it seems clear that their analysis was contingent on the data." The protocol and analysis were not pre-registered (p. 8).

The source cites this criticism as "Gelman, 2013" with no a/b suffix (p. 8). The reference list has only Gelman 2013a (the Slate article "Too good to be true", 24 Jul 2013) and 2013b (the *Chance* column). Tracy & Beall's reply, titled "Too good does not always mean not true" (30 Jul 2013), answers the Slate piece, so the intended citation is almost certainly **2013a**. This is an inference, not stated in the source.

> [!example] The two Beall & Tracy samples (pp. 8-10, 14)
> | Sample | Who | Size | Where the size is given |
> |---|---|---|---|
> | Sample 1 | adult women recruited **on the internet** (described as "middle-aged adult women in their internet sample", p. 9) | about **100** | §4.4, p. 14: "two survey questions asked to 100 volunteers on the internet and 24 college students" |
> | Sample 2 | **college students** | **24** | §3.1, p. 8: "9 of the 24 women" |
>
> The source describes the data as answers to "two survey questions" (p. 14); which two is not stated, though from §3 they concern shirt colour and menstrual-cycle timing. Gelman & Loken use these sizes in §4.4 to argue that, without modern statistics, few would take seriously a claim about "the general population of women" based on so little data. See [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]].
^ex-gl-red-samples

**Durante et al.'s design, for comparison (p. 9).** Gelman & Loken say Durante et al. (2013) "has a lot of similarities to that of Beall and Tracy (it is a between-subjects study on a small sample of internet participants)". The fuller account of that study is in [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies#^ex-gl-durante]].

## Main Content

### §3.1 Data exclusion and coding rules (pp. 8-10)

> [!example] Fork 1 — Inclusion criteria applied inconsistently (p. 8)
> | Stated rule | What happened |
> |---|---|
> | Include only women > 5 days from onset of menses | **Sample 2:** 9 of 24 women did not meet it but were included. **Sample 1:** 22% did not meet it but were included |
> | Sample 1 restricted to women < 40 | Included ages ranged up to **47** |
> | Exclude imprecise/unconfident cycle reports | **31%** of all participants excluded. Gelman & Loken note that precision depends on time since menses ($\pm 1$ day is easier 5 days ago than 22 days ago), so the exclusion is not neutral with respect to cycle phase |
^ex-gl-red-exclusion

> [!example] Fork 2 — Colour coding (p. 9)
> The significant pattern appears only after **combining red and pink**. Red only or pink only "would have fit their theories too". The quoted theory is that "red and shades of red (such as the pinkish swellings seen in ovulating chimpanzees, or the pinkish skin tone observed in attractive and healthy human faces) are associated with sexual interest and attractiveness." Even **white and gray** being more frequent could be argued for: bland colours highlight the pink tones of a (European-coloured) face.
^ex-gl-red-colour

> [!example] Fork 3 — Defining "peak fertility" and the comparison window (p. 9)
> | Source | High-fertility days | Comparison days |
> |---|---|---|
> | Beall & Tracy 2013 | 6-14 (cycle "confusingly" defined as day 0 through day 28) | all other days |
> | Durante et al. 2013 (same journal, same year) | 7-14 | 17-25. Days 1-6, 15-16 and 26-28 excluded; no day 0 |
> | womenshealth.gov (cited by G&L) | 10-17 | — |
> | babycenter.com (cited by G&L) | 12-17 | — |
>
> Beall & Tracy said 6-14 was chosen *a priori* as "the standard practice in our field". "What is standard practice appears a bit flexible in practice" (p. 9). Even granting 6-14, the comparison set is a fork. If they had seen a lot of red on days 0-6, following Durante and comparing against 17-25 "could well be seen as the only legitimate data-analytic choice" (p. 9).
^ex-gl-red-window

**How it happens without fishing (p. 9).** "They start with a somewhat-formed idea in their mind of what comparison to perform, and they refine that idea in light of the data. They saw a pattern in red and pink, and they combined the colors." Had the pattern been in pink only, "we could be having this very same discussion except that the researchers would be explaining why they only considered pink." The same holds for dates and for a pattern in the middle-aged internet sample but not in students.

> [!example] Two studies, one theory family, different choices (pp. 9-10)
> | Fork | Beall & Tracy 2013 (clothing) | Durante et al. 2013 (voting) |
> |---|---|---|
> | Journal / year | *Psychological Science*, 2013 | *Psychological Science*, 2013 |
> | Design | between-subjects; ~100 internet adults + 24 college students | between-subjects; "a small sample of internet participants" (p. 9) |
> | Fertile window | days 6-14 | days 7-14 |
> | Comparison | all other days | days 17-25 only |
> | Exclusions | > 5 days from menses (inconsistently applied); age < 40 | days 1-6, 15-16, 26-28 dropped |
> | Reported effect type | **main effect**, consistent across samples | **interaction** (single vs married), no main effect |
> | Pre-registered? | no | no |
> | Result | $p<0.05$ | $p<0.05$ |
>
> "In the details they made different data-analytic choices, each time finding statistical significance with the comparisons they chose to focus on" (p. 10).
^ex-gl-two-studies

> [!quote] The garden image (p. 10)
> "In this garden of forking paths, whatever route you take seems predetermined, but that's because the choices are done implicitly. ... The mistake is in thinking that, if the particular path that was chosen yields statistical significance, that this is strong evidence in favor of the hypothesis."
^quote-the-garden-image

### §3.2 Choices in combining information from separate studies (p. 10)

> [!example] Fork 4 — Pool, isolate or contrast samples
> Beall & Tracy found the pattern significant in **both** samples (adult internet sample; college students). Alternatives that would also have been reportable:
> - Pattern in **one group only**, explained by the age difference.
> - Striking but non-significant patterns in each, then **combine** the samples or **gather a third** to reach significance.
> - **Contrast** subgroups (an interaction), as Durante et al. did with married vs unmarried women.
>
> **Opposite stories, both fitting the theory** (p. 10):
> - College women at peak fertility dress to signal; older (often married) women don't feel the "subconscious need to attract the male gaze."
> - College women, who are often sexually active and avoiding pregnancy, subconsciously *avoid* signalling when most fertile, while older women signal more urgently.
>
> "It would be the role of the data (in a large, well-powered study with low measurement error) to distinguish among such theories—but it is not particularly informative that one of many possible main effects and interactions happens to have reached the level of statistical significance" (p. 10).
^ex-gl-pooling

## Examples

### Catalogue of forks in §3 (as a decision-variable vector)

In the notation of [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable|§1.2]], $\varphi = (\varphi_{\text{incl}},\varphi_{\text{age}},\varphi_{\text{precision}},\varphi_{\text{colour}},\varphi_{\text{window}},\varphi_{\text{comparison}},\varphi_{\text{pool}})$. The *a priori* plausible options listed in the paper alone give at least $2 \times 2 \times 2 \times 4 \times 3 \times 2 \times 3 = 576$ combinations (vault arithmetic, counting: inclusion rule enforced or not; age cap enforced or not; precision filter or not; colour set ∈ {red, pink, red+pink, bland}; window ∈ {6-14, 7-14, 10-17}; comparison ∈ {all other days, 17-25}; samples ∈ {pooled, separate, contrasted}). These are not independent tests, but any of them would have supported the paper's title.

## Connections
- [[Researcher Degrees of Freedom]] — the general catalogue these forks instantiate. [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] simulates exclusion and covariate forks.
- Specification-level transparency (reporting all variants) is what [[Pre-analysis Plans and the Open Science Ecosystem]] institutionalises.
- Marketing-analytics analogue: outlier-week exclusion, which promotions count as "on", how to define the holiday window, and whether to pool regions or fit them separately are the same kinds of forks in a weekly media model. Modelling regions hierarchically avoids choosing between pooled and separate fits ([[Partial Pooling as Multiple Comparisons Correction]]).

## See Also
- [[Gelman Loken 2013 - Garden of Forking Paths - Overview]]
- [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] — Durante et al. in detail
- [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]] — "Contingency" uses the pink-only counterfactual
