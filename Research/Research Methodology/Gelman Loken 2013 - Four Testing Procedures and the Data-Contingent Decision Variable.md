---
title: "Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/p-values
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Gelman & Loken 2013, Abstract and §1.1-1.2, pp. 1-3"
date_ingested: 2026-10-13
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Gelman Loken 2013 - Garden of Forking Paths - Overview]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]]"
  - "[[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]]"
  - "[[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]]"
  - "[[Garden of Forking Paths]]"
aliases:
  - "T(y; phi(y))"
  - "Data-contingent test"
  - "Researcher degrees of freedom without fishing"
  - "Gelman Loken four testing procedures"
---

# Gelman & Loken (2013) §1 — Four Testing Procedures and the Data-Contingent Decision Variable

> [!summary]
> Section 1 sets up the paper's only formal device: a decision variable $\varphi$ that indexes every analysis choice (controls, transformations, coding and exclusion rules, which effect to focus on). A test is valid in the classical sense only when $\varphi$ is fixed before seeing the data. The authors claim that most published work is procedure #3, $T(y;\varphi(y))$: one test, but a test that would have been different under different data. Researchers who hear "multiple comparisons" think they are being accused of fishing (#4). A hypothetical Democrats-vs-Republicans math-test study shows how one research hypothesis supports many reasonable $\varphi$'s.
^summary

## Overview

§1.1 (pp. 1-2) explains why the authors now **regret** the metaphors "fishing", "p-hacking" and even "researcher degrees of freedom" (Simmons, Nelson & Simonsohn 2011; see [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]). They give two reasons (p. 2):
1. The terms imply that researchers were *consciously* trying many analyses on one dataset.
2. Researchers who know they did not try many analyses may wrongly conclude they are not subject to the problem.

The authors state that Simmons et al., Vul et al. (2009) and Francis (2013) did not themselves claim researchers were cheating, "But the perception remains, hence the need for this paper" (p. 2).

> [!quote] Key point (p. 2, §1.1)
> "Our key point here is that it is possible to have multiple potential comparisons, in the sense of a data analysis whose details are highly contingent on data, without the researcher performing any conscious procedure of fishing or examining multiple p-values."
^quote-key-point

The background claim (p. 1) is that, because a dataset can be analysed in so many ways ("what statistical test to perform but also decisions on what data to exclude ..., what measures to study, what interactions to consider"), "very little information is provided by the statement that a study came up with a p < .05 result." (The source literally reads "what data to exclude or exclude"; this is a typo, presumably for "include or exclude". See the errata list in [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].)

> [!quote] Good scientists and good stories (§1.1, p. 1)
> "The short version is that it's easy to find a p < .05 comparison even if nothing is going on, if you look hard enough—and good scientists are skilled at looking hard enough and subsequently coming up with good stories (plausible even to themselves, as well as to their colleagues and peer reviewers) to back up any statistically-significant comparisons they happen to come up with."
^quote-gl-good-stories

**The authors' earlier "fishing" wording (p. 1).** After naming the problem "p-hacking" or "researcher degrees of freedom" (Simmons, Nelson & Simonsohn 2011), the authors quote their own recent Slate article (Gelman 2013a, "Too good to be true"), which spoke of "fishing expeditions, with a willingness to look hard for patterns and report any comparisons that happen to be statistically significant."

> [!quote] Why "fishing" is the wrong image (§1.1, p. 1)
> "But we are starting to feel that the term 'fishing' was unfortunate, in that it invokes an image of a researcher trying out comparison after comparison, throwing the line into the lake repeatedly until a fish is snagged. We have no reason to think that researchers regularly do that. We think the real story is that researchers can perform a reasonable analysis given their assumptions and their data, but had the data turned out differently, they could have done other analyses that were just as reasonable in those circumstances."
^quote-gl-fishing-image

This passage is the informal version of procedure #3 below: each analysis is reasonable *given* the data, and the problem lies in the set of analyses that other data would have prompted.

## Main Content

### The framework (§1.2, p. 2)

The framework is explicitly **frequentist**: statistical properties of hypothesis tests under hypothetical replications of the data $y$.

> [!definition] Procedure 1 — Simple classical test
> A unique test statistic $T$, applied to the observed data, gives $T(y)$. There is no choice to make.
^def-gl-proc1

> [!definition] Procedure 2 — Pre-chosen (pre-registered) test
> A test chosen from a family, $T(y;\varphi)$, with $\varphi$ **pre-registered**. The decision variable $\varphi$ might encode the choice of control variables in a regression, transformations, data coding and exclusion rules, and "the decision of which main effect or interaction to focus on."
^def-gl-proc2

> [!definition] Procedure 3 — Researcher degrees of freedom without fishing
> A **single** test is computed on the data, "but in an environment where a different test would have been performed given different data": $T(y;\varphi(y))$, where the function $\varphi(\cdot)$ is observed only at the realised $y$.
^def-gl-proc3

> [!definition] Procedure 4 — Fishing
> Compute $T(y;\varphi_j)$ for $j=1,\dots,J$, i.e. perform $J$ tests, and report the best: $T(y;\varphi^{\text{best}}(y))$.
^def-gl-proc4

> [!theorem] Central claim (§1.2, p. 2)
> Researchers are doing **#3**. When told so, they hear an accusation of **#4**. Because they correctly deny #4, they infer that they are doing **#2**. Even without explicit fishing, a study "can have a huge number of researcher degrees of freedom." This is de Groot's (1956) "trying and selecting" of associations.
^thm-gl-claim

**Why counterfactual analyses are fair game (p. 2).** It may seem unfair to criticise a paper for what its authors *would* have done with other data. However, "this is the (somewhat paradoxical) nature of frequentist reasoning: if you accept the concept of the p-value, you have to respect the legitimacy of modeling what would have been done under alternative data." When challenged, the authors of the criticised papers never claim they fixed every detail in advance. Instead they say they "picked only one analysis for the particular data they saw." That defense "does not address the fundamental frequentist concern of multiple comparisons" (p. 3).

#### Vault gloss — why #3 inflates the error rate (not in source)
Let $R_\varphi$ be the size-$\alpha$ rejection region of test $T(\cdot;\varphi)$ under $H_0$, so $\Pr_0(y\in R_\varphi)=\alpha$ for each fixed $\varphi$. The realised procedure rejects when $y\in R_{\varphi(y)}$. Then
$$
\Pr_0\big(y\in R_{\varphi(y)}\big)\;\le\;\Pr_0\Big(y\in \textstyle\bigcup_{\varphi\in\Phi} R_\varphi\Big),
$$
with equality for fishing (#4), where $\varphi^{\text{best}}(y)$ picks a rejecting $\varphi$ whenever one exists. For #3 the left side is *not* $\alpha$ in general. It is $\alpha$ only if $\varphi(\cdot)$ is independent of whether $y$ falls in the rejection regions. Data-contingent choices made "in light of the patterns seen" are typically positively associated with those regions, so the size lies between $\alpha$ and the union bound. The reported p-value treats $\varphi(y)$ as if it were a constant.

### The hypothetical example (p. 3)

> [!example] Democrats, Republicans and a math test in two contexts
> **Design.** Respondents take a short math test framed either in a health-care context or a military context. The research hypothesis is that "context matters": Democrats do better in health care, Republicans in military. Party ID is on a standard 7-point scale, and demographics are available.
>
> **Forks that all fit the theory** (p. 3):
> - The pattern is significant among **men but not women** ("men are more ideological").
> - Among **women but not men** ("women are more sensitive to context").
> - Significant in **neither** group, but the **difference** between groups is significant.
> - Only among **men interviewed by female interviewers**.
> - A sex difference in the **health-care** context only (health care is politically salient; the military is not).
> - How to **dichotomise** the 7-point party scale.
> - How to treat **independents/nonpartisans**: exclude them, or make partisans vs nonpartisans the key contrast.
>
> One overarching research hypothesis "corresponds to many different possible choices of the decision variable $\varphi$" (p. 3). Significance "could almost certainly be found at the 0.05 or even the 0.01 level, given all the options above". The authors are not claiming researchers run that search. They are saying that a researcher who looks at the data can "construct completely reasonable rules for data exclusion, coding, and data analysis that can lead to statistical significance" (p. 3).
^ex-partisan-math

> [!example] Runnable illustration — null data through five reasonable paths (vault simulation, not in source)
> Simulated: $n=400$, sex, context and 7-point party ID drawn independently, $y\sim N(0,1)$ (**no effect anywhere**), 4,000 replications, seed 2013. The test statistic is the context × party difference-in-differences (normal approximation). Paths: (a) all respondents with pure independents (4) dropped; (b) men only; (c) women only; (d) men-vs-women difference in (b) vs (c); (e) strong partisans only (1-2 vs 6-7).
>
> | Path | Pr($p<0.05$) under null |
> |---|---|
> | (a) pre-registered, all respondents | 0.052 |
> | (b) men only | 0.061 |
> | (c) women only | 0.056 |
> | (d) men-vs-women difference | 0.052 |
> | (e) strong partisans only | 0.055 |
> | **any of (a)-(e)** — the garden | **0.168** |
>
> Each path is a valid 5% test by itself. A researcher who ends up on whichever path "the data suggest" faces up to about a 17% false-positive rate with only five correlated forks. The paper's list has many more.
>
> ```python
> import numpy as np
> from scipy import stats
> rng = np.random.default_rng(2013)
> def did(y, ctx, dem):
>     cells = [y[(ctx==c)&(dem==d)] for d in (1,0) for c in (1,0)]
>     m = [c.mean() for c in cells]; v = [c.var(ddof=1)/len(c) for c in cells]
>     return (m[0]-m[1])-(m[2]-m[3]), np.sqrt(sum(v))
> p = lambda e,s: 2*stats.norm.sf(abs(e/s))
> R, n, any_hit = 4000, 400, 0
> for _ in range(R):
>     sex, ctx, pid = rng.integers(0,2,n), rng.integers(0,2,n), rng.integers(1,8,n)
>     y = rng.normal(size=n); dem = (pid<=3).astype(int); keep = pid!=4
>     ps = [p(*did(y[keep],ctx[keep],dem[keep]))]
>     km, kw = keep&(sex==1), keep&(sex==0)
>     e1,s1 = did(y[km],ctx[km],dem[km]); e0,s0 = did(y[kw],ctx[kw],dem[kw])
>     ps += [p(e1,s1), p(e0,s0), p(e1-e0, np.hypot(s1,s0))]
>     ks = (pid<=2)|(pid>=6); ps.append(p(*did(y[ks],ctx[ks],(pid[ks]<=2).astype(int))))
>     any_hit += min(ps) < 0.05
> print(any_hit/R)   # ~0.17
> ```
^ex-partisan-math-sim

### Two supporting points (p. 3)

> [!definition] The "least noisy measure" fallacy (Humphreys, Sanchez & Windt 2013, as summarised on p. 3)
> Faced with several reasonable measures, a researcher may reason (perhaps correctly) that the one giving a significant result is most likely the *least noisy*. They then (incorrectly) draw inferences from that one measure alone.
^def-gl-least-noisy

**Low-power context.** All of this happens amid "small effect sizes, small sample sizes, large measurement errors, and high variation", which together give low power (Button et al. 2013). "Multiplicity would not be a huge problem in a setting of large real differences, large samples, small measurement errors, and low variation." The authors call this "the familiar Bayesian argument": a data-based claim is more plausible the higher its prior probability and less plausible the noisier its estimate (p. 3). See [[Type S and Type M Errors]] and [[Power Analysis and Sample Size]].

## Examples
- Hypothetical Democrats/Republicans math-test study with its list of theory-consistent forks: [[#^ex-partisan-math]].
- Null-data simulation of five reasonable paths (about 5% each, about 17% for any of them): [[#^ex-partisan-math-sim]].
- The "least noisy measure" fallacy: [[#^def-gl-least-noisy]].

## Connections
- Simulation-based quantification of the same inflation: [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
- Fixing $\varphi$ in advance is pre-registration: [[Pre-registration and Open Science - Overview]], [[Prediction vs Postdiction]].
- Classical multiplicity adjustment assumes the family $\{\varphi_j\}$ is enumerated, which #3 never does: [[Multiple Testing Corrections]].
- Predictive-modeling analogue: tuning a model on the evaluation fold is $\varphi(y)$. Honest held-out evaluation fixes $\varphi$ before scoring: [[Cross Validation Checking]], [[Model Selection and Overfitting]].
- A data-dependent stopping time is another $\varphi(y)$: [[The Peeking Problem and Optional Stopping]].

## See Also
- [[Gelman Loken 2013 - Garden of Forking Paths - Overview]]
- [[Garden of Forking Paths]] · [[Researcher Degrees of Freedom]]
- [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] — real-paper instances of $\varphi(y)$
