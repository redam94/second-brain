---
title: Sample Ratio Mismatch and Trustworthiness Checks
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/data-quality
  - topic/selection-bias
  - type/application
  - doc/paper
source: "[[raw/Fabijan 2019 - Diagnosing Sample Ratio Mismatch.pdf]]"
source_location: "Secs. 1-6 (pp. 1-9); companion sources: [[raw/Kohavi 2012 - Trustworthy Online Controlled Experiments Five Puzzling Outcomes.pdf]] Secs. 3.1-3.5; [[raw/Lindon 2020 - Anytime-Valid Inference for Multinomial Count Data.pdf]] Secs. 1-2 (Theorems 2.1-2.4)"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[Online Experimentation - Overview]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Interference and Marketplace Experiments]]"
aliases:
  - Sample Ratio Mismatch
  - SRM
  - A/A Tests
  - Trustworthy Online Controlled Experiments
  - Experiment Data Quality Checks
---

# Sample Ratio Mismatch and Trustworthiness Checks

> [!summary]
> A **sample ratio mismatch (SRM)** occurs when the observed split of units across variants differs significantly from the configured split (say 50/50). It is tested with a one-degree-of-freedom $\chi^2$ goodness-of-fit test, and it matters because randomization only protects the comparison if the *analysed* sample is the *randomized* sample: a mismatch means units went missing differentially by arm, which is **selection bias** that "in most cases completely invalidates experiment results". Fabijan et al. (KDD 2019) find about **6% of experiments at Microsoft** have an SRM, give a taxonomy of 25 root causes over five stages of the experiment lifecycle, and offer ten rules of thumb for diagnosis. Kohavi et al. (KDD 2012) supply the surrounding toolkit of trust checks: A/A tests, carryover detection, scepticism about early "trends", and an OEC that cannot be gamed. Lindon & Malek (2020) make the SRM test **sequential**, so a broken experiment can be caught on day one rather than at analysis time.

## Overview

A large platform runs thousands of automated experiments a year; the platform itself is a measuring instrument with bugs. Kohavi et al. (2012) put it as "the difference between theory and practice is greater in practice than in theory", and note that reversing a single wrong decision at Bing can fund a team of analysts. The key insight of the trustworthiness literature is that *statistical* validity (type I error, power) is downstream of *data* validity, and that data validity can be tested using quantities whose distribution under a healthy experiment is known exactly: the assignment counts, and the outcome of an A/A test.

Fabijan et al. open with an MSN experiment that increased a carousel from 12 to 16 cards. The scorecard showed a significant *decrease* in engagement. An SRM warning had fired: the treatment had fewer users than configured. The cause was that the most engaged treatment users clicked so much that a bot filter removed them. With the filter corrected, the effect was significantly **positive**. The SRM was the only clue that the headline metric was wrong in sign.

## Main Content

> [!definition] Sample ratio mismatch ^def-srm
> Let the design assign units to arms with probabilities $\theta_0 = (\theta_{0,1}, \dots, \theta_{0,d})$ and let $n_j$ be the number of units *appearing in the analysis* in arm $j$, $n = \sum_j n_j$. An SRM is a statistically significant departure of $(n_1, \dots, n_d)$ from $\text{Multinomial}(n, \theta_0)$, conventionally tested with
>
> $$
> \chi^2 = \sum_{j=1}^d \frac{(n_j - n\theta_{0,j})^2}{n\theta_{0,j}} \;\sim\; \chi^2_{d-1} \text{ under } H_0 .
> $$
>
> Because the check runs on every experiment and an alarm triggers a costly investigation, practitioners use a threshold far stricter than 0.05 ($p < 0.001$ is a common industry convention; Fabijan et al. do not prescribe a value).

Fabijan et al.'s example: 821,588 versus 815,482 users is a 50.2/49.8 split, which looks harmless, yet $\chi^2 \approx 22.8$ and the chance of so large a deviation is below 1 in 500,000.

> [!theorem] Why an SRM invalidates the comparison ^thm-srm-selection
> Randomization makes assignment $W$ independent of potential outcomes, so $\mathbb E[Y \mid W = 1] - \mathbb E[Y \mid W = 0]$ is the ATE. Let $R \in \{0,1\}$ indicate that a unit survives into the analysis. The scorecard estimates
>
> $$
> \mathbb E[Y(1) \mid W = 1, R = 1] - \mathbb E[Y(0) \mid W = 0, R = 1],
> $$
>
> which equals the ATE among survivors only if $R$ is unaffected by $W$. If treatment changes who is logged, $R$ is a post-treatment variable and conditioning on it opens a selection path. An SRM is *direct evidence* that $\mathbb P(R = 1 \mid W = 1) \ne \mathbb P(R = 1 \mid W = 0)$. The converse fails: equal counts do not prove equal composition, so SRM is a necessary-condition check, not a certificate.

This is the same logic as the post-treatment covariate warning in [[CUPED and Regression-Adjusted Variance Reduction#^warn-post-treatment]] and as [[Activity Bias in Advertising]], where who gets observed or exposed is itself correlated with the outcome.

### Taxonomy: five stages where SRMs arise (Fabijan et al. Sec. 5)

| Stage | Example from the paper | Typical causes | Prevention |
|---|---|---|---|
| **Assignment** | MSN A/A test with an SRM: a bug gave control one hash bucket too few (49.9/50 instead of 50/50) | Incorrect bucketing; unstable user IDs; correlated hash seeds across experiments (with 365 seeds, 23 experiments give a 50% chance of a shared seed); carryover from previous experiments | Large, rotating seed pool; mutually exclusive layers for interacting experiments |
| **Execution** | Skype call-quality test collected 30% fewer treatment sessions: a mid-session config refresh overwrote the logged variant ID | Variants started at different times; delayed filters; *telemetry generation* changed by treatment (redirects in one arm only, new logging, faster or slower pages, crashes) | A "first signal" telemetry event fired before any variant code runs |
| **Log processing** | MSN carousel: bot filter removed the most engaged treatment users | Bot removal, joins, de-duplication based on **post-treatment** data | Fix user attributes (e.g. bot status) at first exposure; monitor what gets filtered out; compare two independent pipelines |
| **Analysis** | Teams first-run experience: SRM only in the *triggered* scorecard, because the slower control page lost more trigger events | Wrong trigger or filter condition; missing counterfactual logging | Start analysis from experiment start; relax the trigger to an earlier event |
| **Interference** | Microsoft Store: a search-ad campaign URL pointed directly at one variant | Humans forcing variants; pausing or ramping one arm only; telemetry injection attacks | Warn or block changes to running experiments; monitor assignment over time |

Two findings cut against intuition. First, SRMs can have a **positive cause** (Sec. 4.6): a treatment that makes pages faster or users more engaged *recovers* more telemetry, so the better arm appears larger. The experiment is still biased, since the extra recovered users are marginal, low-engagement ones. Second, triggered analyses are especially fragile; the paper cites LinkedIn's finding that about 10% of triggered analyses there had an SRM.

### Ten rules of thumb for diagnosis (Sec. 6)

1. **Scorecards**: SRM in the triggered scorecard but not the all-users one implicates the trigger or filter.
2. **User segments**: SRM confined to one browser or platform localises the bug.
3. **Time segments**: SRM concentrated on day 1 suggests caching or a delayed variant start.
4. **Performance metrics**: a large load-time or crash difference is probably real *and* the cause.
5. **Engagement metrics**: if average engagement per user is higher in treatment, the root cause probably hits less-engaged users more (and vice versa); in the Skype case the bug hit longer, more engaged sessions.
6. **Frequency**: many disparate experiments with SRM indicates a systemic platform fault.
7. **A/A experiments**: an SRM in an A/A test points to the platform (or the A/A is not truly A/A, e.g. extra telemetry in one arm).
8. **Severity**: an extreme ratio means most users of one arm are affected, likely missing logging.
9. **Downstream**: compare counts at each pipeline stage to find where the ratio breaks.
10. **Across pipelines**: a second independent pipeline isolates log-processing faults.

### The wider trust toolkit (Kohavi et al. 2012)

- **A/A tests.** Run identical arms; metrics should be significant about $\alpha$ of the time and $p$-values uniform. Bing also runs a *retrospective* A/A on the pre-period for each new hash split and re-randomizes if key metrics differ at $p < 0.2$ (Sec. 3.5.4).
- **Carryover effects** (Sec. 3.5). Bucket systems reuse the same hashed users across experiments. After a 47-day experiment, the treated buckets stayed different for about three weeks; after a bug that gave users a very bad experience, they had not recovered after three months. Mitigation: localized re-randomization with a two-level bucket scheme.
- **OEC sanity** (Sec. 3.1). A ranking bug at Bing raised distinct queries per user by over 10% and revenue per user by over 30%, because users had to search more and clicked more ads. A metric that a degraded product can "win" is not an evaluation criterion; the paper decomposes query volume into users $\times$ sessions per user $\times$ distinct queries per session, and makes **sessions per user** (satisfied users return) the key OEC component, with queries per session to be *minimised* subject to task completion. It also notes in passing that a user ratio far from the design "is a good indication of a bug".
- **Early trends are noise** (Sec. 3.3) and **longer is not always more powerful** (Sec. 3.4); see [[The Peeking Problem and Optional Stopping]] and [[Online Experimentation - Overview]].
- **Replicate surprises.** In the carryover case, "metrics unrelated to the change moved in unexpected directions" with high significance, and the effects disappeared on a rerun with a larger, freshly randomized sample. A surprising result is more likely an instrumentation or platform artefact than a discovery; replication also guards against [[Type S and Type M Errors|exaggerated estimates]].

### Sequential SRM detection (Lindon & Malek 2020)

The $\chi^2$ test is a fixed-$n$ test, so it is usually run once at analysis time, after the damage is done. Checking it daily would be [[The Peeking Problem and Optional Stopping|peeking]]. Lindon & Malek build a multinomial [[Always-Valid p-values and the mSPRT|mixture test]]: with $x_i \sim \text{Multinomial}(1,\theta)$, null $\theta = \theta_0$ and a conjugate $\text{Dirichlet}(\alpha_0)$ prior on the alternative, the Bayes factor after counts $S_n$ is

$$
O_n(\theta_0) = \frac{\mathrm B(\alpha_0 + S_n)}{\mathrm B(\alpha_0)} \cdot \frac{1}{\prod_j \theta_{0,j}^{S_{n,j}}},
$$

which is a non-negative martingale under the null (Theorem 2.1), so $\mathbb P_{\theta_0}(\exists n : O_n \ge 1/u) \le u$ (Theorem 2.2), it has power one against any $\theta \ne \theta_0$ (Theorem 2.3), and $p_n = \min_{m \le n} 1/O_m$ is a sequential $p$-value whose inversion gives a [[Confidence Sequences|confidence sequence]] for the assignment probabilities (Theorem 2.4). Concentrating the prior near $\theta_0$ via $\alpha_{0} = k\theta_{0}$ encodes that realistic SRMs are small.

## Examples

**Fixed-$n$ check.**

```python
from scipy.stats import chisquare

def srm_pvalue(n_treat, n_ctrl, ratio=0.5):
    n = n_treat + n_ctrl
    return chisquare([n_treat, n_ctrl], [n * ratio, n * (1 - ratio)]).pvalue

srm_pvalue(821_588, 815_482)   # 1.8e-06  -> SRM, do not read the scorecard
srm_pvalue(50_500, 49_500)     # 1.6e-03  -> a 50.5/49.5 split at n = 100k is borderline
```

**Sequential check (own simulation of the Lindon–Malek test).** Two arms, $\theta_0 = (0.5, 0.5)$, $\alpha_0 = (500, 500)$, monitored after every unit with alarm threshold $p_n < 0.001$. Under a correct 50/50 split there were no alarms in 300 runs of 200,000 units. Under a true 50.5/49.5 split the alarm fired within 200,000 units in 66% of runs, with median detection near 160,000 units. A one-shot $\chi^2$ at that $n$ has comparable sensitivity, but the sequential test may be evaluated continuously, so a gross mismatch such as the Skype 30% loss is flagged within the first few hundred units.

**Marketing-measurement reading.** In a conversion-lift or ghost-ad study, check the ratio of *measured* users per arm against the design ratio, and check it again within the exposed/triggered subset. Differential ad blocking, consent-gated tracking that loads only when the creative renders, or a holdout implemented as "no pixel fired" all make $R$ depend on $W$. In a geo experiment the analogue is differential data availability across treated and control geos (for example a retailer feed that drops stores), which should be verified before fitting [[Time-Based Regression Estimator for Geo Experiments|TBR]].

## Connections

- [[Online Experimentation - Overview]] — trust checks are step one of any analysis pipeline.
- [[The Experimental Ideal]] — SRM is a test of whether the ideal was actually implemented.
- [[Activity Bias in Advertising]] — another case where differential observation by arm masquerades as an effect.
- [[CUPED and Regression-Adjusted Variance Reduction]] — shares the rule "never condition on anything treatment can change"; pre-period A/A differences are also what CUPED corrects for.
- [[Always-Valid p-values and the mSPRT]] and [[Confidence Sequences]] — the machinery behind sequential SRM monitoring.
- [[Interference and Marketplace Experiments]] — "interference SRMs" are human interference with assignment, distinct from SUTVA violations, but both break the mapping from assignment to analysed sample.
- [[Garden of Forking Paths]] — post-hoc filtering of "bad" users or bots is a forking path that can *create* an SRM.
- [[Multiple Testing Corrections]] — an SRM check on every experiment and segment needs a strict threshold.

## See Also

- [[Observational vs Experimental Methods in Advertising]]
- [[Researcher Degrees of Freedom]]
- [[Pre-analysis Plans and the Open Science Ecosystem]]
- [[Delayed and Censored Feedback - Overview]]
- [[Randomization Inference - Overview]]
