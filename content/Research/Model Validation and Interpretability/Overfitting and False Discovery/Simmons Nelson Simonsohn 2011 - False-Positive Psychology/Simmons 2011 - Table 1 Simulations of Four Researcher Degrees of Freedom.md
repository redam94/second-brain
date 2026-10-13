---
title: "Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - topic/simulation
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons, Nelson & Simonsohn (2011), pp. 1360-1361: '\"How Bad Can It Be?\" Simulations' / 'Simulations of common researcher degrees of freedom', Table 1 and its note; notes 2, 3 and 4 (p. 1365-1366)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]]"
  - "[[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]"
  - "[[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]"
aliases:
  - Simmons 2011 Table 1
  - Likelihood of Obtaining a False-Positive Result
  - 61 percent false-positive rate
  - Situations A-D simulation
---

# Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom

> [!summary]
> Monte Carlo simulation (15,000 samples per scenario, null true, normal data, two cells of n = 20) of four common forks: **(A)** two correlated DVs plus their average, **(B)** adding 10 per cell if the first test fails, **(C)** optionally controlling for a binary covariate or its interaction, and **(D)** reporting any pair or the trend among three conditions. At p < .05 each fork alone gives **9.5%, 7.7%, 11.7% and 12.6%** false positives. Combined, A+B give 14.4%, A+B+C 30.9%, and **A+B+C+D 60.7%**: "A researcher is more likely than not to falsely detect a significant effect by just using these four common researcher degrees of freedom." The authors call these figures conservative. A reproduction of the single-fork rows is included below.
^summary

## Overview

The simulation answers the question "how bad can it be?" with numbers. The design is deliberately simple: no real effect, normal data, ordinary tests, so all inflation comes from **choosing among analyses after seeing results**. It turns the qualitative concept in [[Researcher Degrees of Freedom]] into a quantitative claim, and it is a textbook use of [[Designing Simulated-Data Experiments|simulation to evaluate a procedure]]. In ADEMP terms (see [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]):

| ADEMP element | Simmons et al. Table 1 |
|---|---|
| **A**ims | Estimate the realised Type I error of "test several analyses, report any significant one" |
| **D**ata-generating mechanism | Every observation i.i.d. $N(0,1)$, so the null is true by construction. Two conditions (three for D), 20 per cell (30 under B). Binary "gender" ~ Bernoulli(0.5). Two DVs with correlation $r=.50$ |
| **E**stimand | $\Pr(\min_j p_j < \alpha \mid H_0)$, the family-wise false-positive rate of the researcher's procedure |
| **M**ethods | Two-sample $t$ tests, ANCOVA with a covariate main effect or interaction, OLS linear trend |
| **P**erformance | Percentage of 15,000 samples with at least one significant analysis, at $\alpha\in\{.10,.05,.01\}$. Monte Carlo SE at 5%: $\sqrt{.05\cdot.95/15000}\approx0.18$ percentage points |

Note 2 (p. 1365) explains the choice of simulation over closed-form results: the combinations "would lead to fairly complex derivations without adding much insight over simulation results."

## Main Content

### The generic procedure

> [!definition] Definition: Flexible-analysis false-positive rate
> Let $\mathcal{A}=\{a_1,\dots,a_k\}$ be the analyses the researcher is willing to report, each giving a p-value $p_j$ for "the effect of condition". Under $H_0$ each $p_j\sim U(0,1)$ marginally. The researcher reports significance if any $p_j<\alpha$. The **realised false-positive rate** is
> $$
> \text{FPR}(\mathcal{A},\alpha)=\Pr\Big(\min_{j\le k}p_j<\alpha\;\Big|\;H_0\Big)\;\in\;\big[\alpha,\;\min(1,k\alpha)\big].
> $$
> The lower bound holds when the analyses are perfectly correlated. The Bonferroni upper bound $k\alpha$ is approached when the rejection events are nearly disjoint. If the tests were independent the rate would be $1-(1-\alpha)^k$.
^def-flexible-fpr

> [!theorem] Proposition: Correlation limits but does not remove inflation (note 3, p. 1365)
> For Situation A, "The lower the correlation between the two dependent variables, the higher the false-positive rate produced by considering both. Intuitively, if r = 1, then both variables are the same; if r = 0, then the two tests are entirely independent."
>
> **Check:** three tests at $\alpha=.05$ would give $1-.95^3=14.3\%$ if independent and $5\%$ if identical. With $r=.50$, and the third test being the average of the first two, the simulated rate is **9.5%**, in between.
^prop-correlation

### Simulation design: the four situations (Table 1 note, p. 1361)

Baseline: two conditions, 20 observations per cell, all draws independent normal.

> [!algorithm] Situation A: two dependent variables ($r=.50$)
> 1. Draw two DVs per observation from a bivariate normal with correlation .50.
> 2. Run three $t$ tests: DV1, DV2 and the mean of DV1 and DV2.
> 3. Declare significance if any $p<\alpha$.
^alg-sit-a

> [!algorithm] Situation B: addition of 10 more observations per cell
> 1. Collect 20 per cell and run a $t$ test.
> 2. If significant, stop and report.
> 3. Otherwise collect 10 more per cell (30 in total) and run the $t$ test again.
> 4. Declare significance if either test has $p<\alpha$.
^alg-sit-b

> [!algorithm] Situation C: controlling for gender or the interaction of gender with treatment
> 1. Assign each observation "gender" = 1 with probability .5, else 0, independently. Note 4: "'gender' is a placeholder for any covariate with similar properties."
> 2. Run (i) a $t$ test, (ii) ANCOVA with a gender main effect, (iii) ANCOVA with a Gender × Condition interaction.
> 3. Declare significance if the condition effect is significant in any analysis, **or** if the Gender × Condition interaction is significant.
^alg-sit-c

> [!algorithm] Situation D: dropping (or not dropping) one of three conditions
> 1. Generate three conditions (low, medium, high), 20 per cell.
> 2. Run $t$ tests for all three pairs (low-medium, low-high, medium-high) and an OLS regression on the linear trend across all three (coding low = −1, medium = 0, high = 1).
> 3. Declare significance if any of the four tests has $p<\alpha$.
^alg-sit-d

The paper does not say how the forks are crossed in the combined rows. The text (p. 1361) says only: "The bottom three rows of Table 1 show results for combinations of the situations described in the top four rows", and the table note describes Situations A-D alone. **The construction that follows is this note's own inference, not the paper's.** The natural reading is that every combination of choices is allowed. Under that reading, A+B runs the Situation A tests at n = 20 and again at n = 30, and A+B+C runs the Situation C variants on each DV at each n. The reproduction below supports this reading but does not prove it.

### Results (Table 1, p. 1361)

> [!theorem] Table 1. Likelihood of Obtaining a False-Positive Result (p. 1361)
> Percentage of 15,000 simulated samples in which at least one of a set of analyses was significant.
>
> | Researcher degrees of freedom | p < .1 | p < .05 | p < .01 |
> |---|---|---|---|
> | Situation A: two dependent variables (r = .50) | 17.8% | 9.5% | 2.2% |
> | Situation B: addition of 10 more observations per cell | 14.5% | 7.7% | 1.6% |
> | Situation C: controlling for gender or interaction of gender with treatment | 21.6% | 11.7% | 2.7% |
> | Situation D: dropping (or not dropping) one of three conditions | 23.2% | 12.6% | 2.8% |
> | Combine Situations A and B | 26.0% | 14.4% | 3.3% |
> | Combine Situations A, B, and C | 50.9% | 30.9% | 8.4% |
> | Combine Situations A, B, C, and D | 81.5% | 60.7% | 21.5% |
^tbl-1

**Reading the table (pp. 1360-1361):**
- Row 1: flexibility over two correlated DVs "nearly doubles the probability of obtaining a false-positive finding" (5% → 9.5%).
- Row 2: the "seemingly small" option of collecting 10 more per cell "increases the false-positive rate by approximately 50%" (5% → 7.7%).
- Row 3: covariate flexibility gives 11.7%. Row 4: condition flexibility gives 12.6%.
- Bottom row: all four forks give "a stunning 61% false-positive rate!" At p < .01 the rate is still 21.5%, more than double the *nominal* .10 level.
- **Forks compound.** Under the fully crossed reading (this note's inference, see above), each extra fork multiplies the size of the analysis set rather than adding to it: A+B has 3 × 2 = 6 analyses, adding C gives 24, and adding D multiplies again. Single-fork excesses of 3-8 points over the nominal 5% therefore combine to a 56-point excess.

> [!theorem] Claim: The estimates are conservative (p. 1361)
> The simulation leaves out many common forks: choosing among more than two DVs "(and the various ways to combine them)", among more than one covariate, "excluding subsets of participants or trials", and "flexibility in deciding whether early data were part of a pilot study or part of the experiment proper". Each would add to the analysis set $\mathcal{A}$ and raise the rate further.
^claim-conservative

### Reproduction

A re-implementation of the four single-fork situations (5,000 replications each, `numpy`/`scipy`, OLS via least squares) gives results close to the published rows (re-run of the code below, seed 1). Most cells are within about one Monte Carlo SE; the largest gap, Situation B at p < .1 (15.6 vs 14.5), is about two SEs:

| Situation | Paper p<.1 / .05 / .01 | Reproduction p<.1 / .05 / .01 |
|---|---|---|
| A | 17.8 / 9.5 / 2.2 | 18.1 / 9.3 / 1.9 |
| B | 14.5 / 7.7 / 1.6 | 15.6 / 8.1 / 1.7 |
| C | 21.6 / 11.7 / 2.7 | 21.8 / 11.6 / 2.3 |
| D | 23.2 / 12.6 / 2.8 | 23.1 / 12.2 / 2.8 |

(Monte Carlo SE at 5,000 replications is about 0.3 pp at the 5% level and about 0.55 pp at 15-20%.)

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(1); R = 5000
tt = lambda a, b: stats.ttest_ind(a, b).pvalue
def ols_p(y, X):                      # two-sided OLS p-values, intercept added
    X = np.c_[np.ones(len(y)), X]; b, *_ = np.linalg.lstsq(X, y, rcond=None)
    r = y - X @ b; df = len(y) - X.shape[1]
    se = np.sqrt(np.diag(r @ r / df * np.linalg.inv(X.T @ X)))
    return 2 * stats.t.sf(abs(b / se), df)
L = np.linalg.cholesky([[1, .5], [.5, 1]])
def sitA(n=20):                       # DV1, DV2, mean(DV1, DV2)
    x, y = rng.normal(size=(n, 2)) @ L.T, rng.normal(size=(n, 2)) @ L.T
    return min(tt(x[:, 0], y[:, 0]), tt(x[:, 1], y[:, 1]), tt(x.mean(1), y.mean(1)))
def sitB():                           # test at 20, then at 30 per cell
    x, y = rng.normal(size=30), rng.normal(size=30)
    return min(tt(x[:20], y[:20]), tt(x, y))
def sitC():                           # t test, + gender, + gender x condition
    x, y = rng.normal(size=20), rng.normal(size=20)
    yv = np.r_[x, y]; t = np.r_[np.zeros(20), np.ones(20)]; g = rng.integers(0, 2, 40)
    f = ols_p(yv, np.c_[t, g, t * g])
    return min(tt(x, y), ols_p(yv, np.c_[t, g])[1], f[1], f[3])
def sitD():                           # three pairs + linear trend
    a, b, c = (rng.normal(size=20) for _ in range(3))
    trend = ols_p(np.r_[a, b, c], np.repeat([-1., 0., 1.], 20)[:, None])[1]
    return min(tt(a, b), tt(a, c), tt(b, c), trend)
for f in (sitA, sitB, sitC, sitD):
    p = np.array([f() for _ in range(R)])
    print(f.__name__, [round(100 * (p < a).mean(), 1) for a in (.1, .05, .01)])
```

The two combined rows A+B and A+B+C were reproduced the same way (3,000 replications), using the crossing *inferred above*. The paper does not specify it. **A+B**: three DV tests at n = 20 and again at n = 30 per cell, 6 tests. **A+B+C**: the four Situation C analyses on each of the three DVs at each n, 24 tests.

| Combination | Paper p<.1 / .05 / .01 | Reproduction p<.1 / .05 / .01 |
|---|---|---|
| A + B | 26.0 / 14.4 / 3.3 | 25.5 / 14.0 / 3.7 |
| A + B + C | 50.9 / 30.9 / 8.4 | 50.5 / 32.0 / 9.0 |

The A+B+C+D row was not reproduced, because there is no unambiguous way to cross D with the other forks (for example, whether the Situation B top-up applies to all three cells). The close agreement suggests that the table measures nothing more than the minimum p-value over a fully crossed analysis set. That is still an inference from matching numbers. No hidden mechanism is involved.

## Examples

> [!example] Example: Table 1 in a marketing-measurement workflow (generic illustration)
> A brand-lift readout with no true effect has:
> - **A:** two correlated KPIs (awareness, consideration) plus a composite;
> - **B:** a readout at week 2 and, if flat, a longer flight;
> - **C:** an optional demographic covariate or a demographic × exposure interaction;
> - **D:** three creative arms, any pair of which can be reported.
>
> These are Table 1's four forks, so the chance of *some* "significant lift" is about 61% at the 5% level. The same arithmetic applies to a modeller choosing among KPI definitions, holdout windows, controls and model variants in a weekly response model. When choosing among many fits, the selected fit's p-values or intervals no longer mean what they claim ([[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]], [[Model Selection and Overfitting]]).
^ex-generic-application

## Connections

- Formal multiplicity control, and why it cannot be applied when $k$ is unknown: [[Multiple Testing Corrections]] and [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^nonsol-alpha]].
- Situation B is the two-look case of optional stopping, generalised in [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]] and [[The Peeking Problem and Optional Stopping]].
- How these per-study rates feed into field-level PPV (Ioannidis's bias parameter $u$): [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- Reporting conventions for simulation studies (Monte Carlo SE, ADEMP): [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- Gelman & Loken's point that $\mathcal{A}$ need not be searched explicitly, since it is enough that the analysis *would* have differed with other data: [[Garden of Forking Paths]].

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]
- [[Researcher Degrees of Freedom]]
- [[Nuisance Parameter Bias Simulation]]: another vault simulation of analytic-choice consequences
