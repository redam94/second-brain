---
title: "Ioannidis 2005 - Remedies, Limitations and Later Critiques"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, §How Can We Improve the Situation?, pp. 0700-0701; modelling assumptions from §Modeling the Framework, §Bias, §Testing by Several Independent Teams (pp. 0696-0697). Later critiques are external to the PDF and described, not quoted."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
  - "[[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]"
  - "[[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]"
used_by:
  - "[[Pre-registration and Open Science - Overview]]"
aliases:
  - Ioannidis remedies
  - How can we improve the situation (Ioannidis)
  - Critiques of Ioannidis 2005
---

# Ioannidis 2005 - Remedies, Limitations and Later Critiques

> [!summary]
> Ioannidis's closing section admits that the true "gold standard" is unattainable but proposes four ways to raise post-study probability. (1) Use **better-powered, low-bias evidence**, targeted at questions whose pre-study probability is already high or which test major concepts, while remembering that huge studies can find trivially small "significant" effects. (2) Judge the **totality of the evidence**, not one team's significant result. (3) Reduce bias through **standards, registration and protocols**. (4) Above all, **estimate $R$**: before an experiment, consider how likely the hypothesis is to be true, and accept that significance in one report is only a partial picture. This note also lists the framework's modelling assumptions and summarizes, without quoting, the main published critiques, which are not part of the PDF.

## Overview

The section *How Can We Improve the Situation?* (pp. 0700-0701) opens by asking whether it is unavoidable that most findings are false. It notes it is "impossible to know with 100% certainty what the truth is in any research question". The remedies map onto the formula's levers: power $1-\beta$, number of isolated teams $n$, bias $u$ and pre-study odds $R$.

## Main Content

### Remedy 1: better-powered, low-bias evidence, well targeted (p. 0700)

- Large studies or low-bias meta-analyses come closer to the unknown "gold" standard. But large studies can still be biased, and biases "should be acknowledged and avoided".
- Large-scale evidence cannot be obtained for "all of the millions and trillions of research questions posed in current research". It should be targeted where the pre-study probability is already considerably high, so that a significant result yields a post-test probability "that would be considered quite definitive".
- Large-scale evidence is especially worthwhile when it tests **major concepts** rather than narrow questions: a negative finding can then refute "not only a specific proposed claim, but a whole field or considerable portion thereof."
- Choosing large studies on narrow criteria, "such as the marketing promotion of a specific drug", is "largely wasted research".
- **Caution:** extremely large studies may be more likely to find a formally significant difference for a trivial effect "that is not really meaningfully different from the null" [32-34] (Lindley's paradox; Bartlett; Senn).

### Remedy 2: totality of the evidence (pp. 0700-0701)

Most questions are addressed by many teams, and it is "misleading to emphasize the statistically significant findings of any single team. What matters is the totality of the evidence." This is the constructive counterpart of [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion|Table 3]].

### Remedy 3: lower bias through standards, registration, protocols (p. 0701)

- Diminishing bias through enhanced research standards and curtailing prejudice may help, but "may require a change in scientific mentality that might be difficult to achieve."
- **Upfront registration** may work for some designs, e.g., randomized trials [35]. It is a challenge for hypothesis-generating research, where registering or networking data collections or investigators within a field may be more feasible than registering every experiment.
- Even without registration, "the principles of developing and adhering to a protocol could be more widely borrowed from randomized controlled trials."

### Remedy 4: understand the range of $R$ (p. 0701)

- "Instead of chasing statistical significance, we should improve our understanding of the range of $R$ values—the pre-study odds—where research efforts operate" [10].
- Before running an experiment, investigators should consider the chance that they are testing a true rather than a non-true relationship. Speculated high $R$ values can sometimes be checked: large, minimally biased studies of "relatively established" findings would show how often they are confirmed. Ioannidis suspects "several established 'classics' will fail the test" [36].
- Most new discoveries will still come from hypothesis-generating research with low or very low pre-study odds. Significance testing in a single report "gives only a partial picture, without knowing how much testing has been done outside the report and in the relevant field at large."
- Multiple-testing corrections exist [37], but it is usually impossible to tell how much data dredging preceded a reported finding. Even if one could, that would not reveal the pre-study odds.
- Hence one must make approximate, admittedly subjective assumptions about how many relationships are expected to be true across the relevant fields and designs. The wider field and biases detected in neighbouring fields can guide these assumptions, and they "would still be very useful in interpreting research claims and putting them in context."

> [!algorithm] Applying the remedies to a single claimed finding
> 1. **Elicit $R$**: from the base rate of confirmed effects in comparable past questions (prior experiments, meta-analyses, the "wider field").
> 2. **Assess power** $1-\beta$ for the effect size that matters, not the effect size observed.
> 3. **Assess $u$**: was there a protocol or pre-registration? How many outcomes, windows, specifications and subgroups were available? Who benefits from a positive result?
> 4. **Count $n$**: how many teams, analyses or model runs addressed the same question, including unreported ones?
> 5. Compute $\text{PPV}_u$ or $\text{PPV}_n$ ([[Ioannidis 2005 - Bias Parameter u and Reverse Bias]], [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]). If it is below about 0.5, treat the claim as a hypothesis and target a large, low-bias confirmatory test at it.
^alg-apply-remedies

### Modelling assumptions and internal limitations

These are stated or implicit in the paper.

| Assumption | Where | Consequence |
|---|---|---|
| Relationships are dichotomous: exactly null or "true" | §Modeling | Ignores effect magnitudes. In fields where nothing is exactly zero, "false" is ill-defined (see [[Sharp vs Weak Null Hypotheses]], [[Type S and Type M Errors]]). |
| Findings are dichotomized at $p<\alpha$; the actual p-value is ignored | §Modeling; Box 1 "barely crossing" | Understates the evidence from very small p-values. |
| Similar power across true relationships | §Modeling | Simplification "for computational simplicity". |
| $u$ independent of truth | §Bias | Called "not an unreasonable assumption". Bias that preferentially rescues true effects would raise PPV. |
| Independent teams, and the reported event is "at least one significant" | §Testing by several teams | Assumes the non-significant studies are ignored. If all are reported and pooled, PPV rises instead. |
| Parameter values in Table 4 are illustrative | §Most findings are false | The headline "most are false" depends on these values. No empirical estimate of $R$ or $u$ is given. |
| "Proof" is a derivation under the model | Intro | The model is a proof that *if* $R$, power and $u$ take such values *then* PPV < 0.5. It is not a measurement. |

### Later critiques and follow-ups (external to the PDF; citation-only, paraphrased)

- **Goodman & Greenland (2007, PLoS Medicine)** argued that the essay's conclusion does not follow as a general proof. They criticized treating significance as a dichotomy rather than using the observed p-value, and the way bias was modelled. They agreed that many published claims are less reliable than they appear. Ioannidis replied in the same journal.
- **Jager & Leek (2014, Biostatistics)** estimated a science-wise false discovery rate from the distribution of reported p-values in top medical journals and obtained a figure far below 50% (around 14%). Discussants on that paper pointed out that reported p-values are themselves selected, so such estimates inherit the very biases at issue.
- **Large-scale replication projects** in psychology, experimental economics and cancer biology (2015 onward) found replication rates well below nominal power. This is broadly consistent with Ioannidis's prediction but not a direct estimate of PPV. See [[The Replication Crisis and Multiple Levels of Variation]].
- **Mechanism studies:** [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] showed by simulation how researcher flexibility (Ioannidis's $u$) can push the effective false-positive rate above 60%.

## Examples

> [!example] Remedies in a marketing measurement programme (generic)
> - *Remedy 1:* spend the large, expensive geo experiment on the channel whose effect the MMM already suggests is material, and frame it to test the broad concept ("does upper-funnel video drive incremental sales at all?") rather than one flight. A null result then settles a whole budget line.
> - *Remedy 2:* report all lift tests run on a channel (a running meta-analysis), not the latest significant one.
> - *Remedy 3:* fix KPI, test window, market list and analysis method in a pre-analysis plan before launch ([[Pre-registration and Open Science - Overview]]).
> - *Remedy 4:* keep a ledger of past test outcomes to estimate the programme's own $R$, i.e., what fraction of tested ideas truly win. Use it as the prior in a Bayesian read-out ([[Q - Using Experiment Results as Priors in a Bayesian MMM]]).
^ex-remedies-marketing

## Connections

- [[Pre-registration and Open Science - Overview]], [[Pre-registration vs Registered Reports]] and [[Limits and Objections to Pre-registration]]: Remedy 3 in depth.
- [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]: practical alternatives for exploratory work.
- [[Multiple Testing Corrections]]: what corrections can and cannot do (the corrections paragraph above).
- [[Constructing Priors for Effect Sizes]]: Remedy 4 in continuous form.
- [[SR 11-7 - Model Risk Management Guidance - Overview]] and [[NIST AI RMF 1.0 - Overview]]: institutional effective challenge as a bias-reduction mechanism for models.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: simulation evidence about methods, as opposed to field-level PPV.

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
- [[Ioannidis 2005 - Reference List and Citation Map]]: full entries for refs 32-37 cited in the remedies section.
- [[Q - Common Pitfalls in Statistical Modeling]]
- [[Statistical and Scientific Inference]]
