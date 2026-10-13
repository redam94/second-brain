---
title: "Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - type/concept
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, §Claimed Research Findings May Often Be Simply Accurate Measures of the Prevailing Bias, pp. 0700-0701"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
used_by:
  - "[[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]"
aliases:
  - Null field (Ioannidis)
  - Claimed effect sizes as measures of net bias
  - Ioannidis 60 nutrients example
---

# Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias

> [!summary]
> In a **null field**, where nothing being studied is truly related to the outcome, observed effects should scatter around the null by chance alone. Any systematic departure is then "simply a pure measure of the prevailing bias". In the paper's example, a literature claims all 60 studied nutrients affect a tumour's risk with relative risks of 1.2-1.4. If no nutrient truly matters, those effect sizes measure "nothing else but the net bias". Among null fields, those claiming the strongest effects are the most biased. This reverses the usual reading: "too large and too highly significant effects" should prompt suspicion, not excitement.

## Overview

This section (pp. 0700-0701) takes the [[Ioannidis 2005 - Table 4 PPV by Study Design|Table 4]] logic to the limit $R\to0$. If most modern biomedical research operates where pre- and post-study probabilities of truth are very low, then for some fields the published effect-size distribution describes the field's bias rather than nature.

## Main Content

> [!definition] Null field (p. 0700)
> A **null field** is a research field with "no true findings at all to be discovered". The history of science shows effort has often been wasted in fields with "absolutely no yield of true scientific information, at least based on our current understanding."
> In a null field, absent bias, "one would ideally expect all observed effect sizes to vary by chance around the null." Then "the extent that observed findings deviate from what is expected by chance alone would be simply a pure measure of the prevailing bias."
^def-null-field

> [!example] Sixty nutrients and a tumour (p. 0700)
> **Setup:** suppose no nutrients or dietary patterns actually determine the risk of a specific tumour. Suppose the literature has examined 60 nutrients and claims all of them are related to the tumour's risk, with relative risks of 1.2 to 1.4 comparing upper to lower intake tertiles.
> **Conclusion:** "Then the claimed effect sizes are simply measuring nothing else but the net bias that has been involved in the generation of this scientific literature. Claimed effect sizes are in fact the most accurate estimates of the net bias."
> **Corollary for comparing fields:** "between 'null fields,' the fields that claim stronger effects (often with accompanying claims of medical or public health importance) are simply those that have sustained the worst biases."
^ex-nutrients

> [!theorem] Robustness to a few true effects (p. 0700)
> For fields with very low PPV, "the few true relationships would not distort this overall picture much". Even if a few relationships are true, the shape of the distribution of observed effects still yields "a clear measure of the biases involved in the field."
> **Formal reading (added):** with $R\approx0$, the share of claimed findings that are true is $\text{PPV}\approx0$, so the empirical distribution of claimed effects is, to first order, the distribution of $\hat\theta\mid(\theta=0,\text{claimed})$, i.e., noise plus bias-induced selection.
^thm-null-robust

### Reversing the reading of large effects (p. 0700)

"This concept totally reverses the way we view scientific results." Traditionally, large and highly significant effects are greeted with excitement as signs of important discoveries. Ioannidis argues the opposite: "Too large and too highly significant effects may actually be more likely to be signs of large bias in most fields of modern research. They should lead investigators to careful critical thinking about what might have gone wrong with their data, analyses, and results."

### Resistance and use (pp. 0700-0701)

- Investigators are "likely to resist accepting that the whole field in which they have spent their careers is a 'null field.'" Other lines of evidence, or advances in technology and experimentation, may eventually dismantle such a field.
- Measures of net bias in one field may give insight into the range of bias in other fields that use similar analytical methods, technologies and conflicts.

## Examples

> [!example] Null-field diagnostic for an analytics pipeline (generic)
> Run the full modelling pipeline (feature construction, specification search, model selection, reporting rule) on data where the truth is known to be null. Examples: permute the media-spend columns across weeks, or use a synthetic KPI with zero media effect ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]). Under Ioannidis's argument, the distribution of "effects" the pipeline then reports is a direct measure of the pipeline's own $u$. If the null-data incremental ROIs cluster well away from zero (say at 1.2-1.4) rather than scattering around zero, real-data ROIs of that size cannot be distinguished from pipeline bias.
^ex-null-field-diagnostic

```python
import numpy as np
def null_field_bias(pipeline, X_media, y, n_perm=200, rng=np.random.default_rng(1)):
    """Distribution of effects a pipeline reports when media is shuffled in time (a null field)."""
    effects = []
    for _ in range(n_perm):
        Xp = X_media[rng.permutation(len(X_media))]
        effects.append(pipeline(Xp, y))      # e.g. reported ROI per channel, after selection rules
    return np.array(effects)                  # its centre and spread estimate the net bias
```

Note: permuting rows destroys autocorrelation in the media series. For time-series models use block permutations or a simulator ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Granger 2003 - Spurious Regression and Cointegration - Overview]] on how trending nulls produce spurious "effects").

## Connections

- [[Type S and Type M Errors]]: the effect-size side of the same problem. Conditional on significance, magnitudes are inflated.
- [[Experimental Benchmarks for Observational Ad Measurement]]: an observational method's systematic overstatement relative to RCTs is a measured "net bias" of that method.
- [[Designing Simulated-Data Experiments]] and [[Simulated-Data Experimentation as Virtual Replication]]: simulating null worlds.
- [[Fisher Randomization Test and the Sharp Null]]: the randomization null that the permutation diagnostic borrows.

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
- [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]
