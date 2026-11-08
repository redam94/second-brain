---
title: "Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/example
  - doc/paper
source: "[[raw/Vickers Van Calster Steyerberg 2019 - A Simple Step-by-Step Guide to Interpreting Decision Curve Analysis.pdf]]"
source_location: "Example setup, Steps 1-5, Figs 1-3, pp. 2-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis"
doc_type: paper
depends_on:
  - "[[Vickers 2019 - Net Benefit and Threshold Probability]]"
used_by:
  - "[[Vickers 2019 - Ten Questions and Limits of Decision Curves]]"
aliases:
  - DCA prostate biopsy example
  - Reading a decision curve in five steps
---

# Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example

> [!summary]
> The paper reads one decision curve in five steps: benefit is good; preference varies; the unit of preference is threshold probability; benefit is really net benefit; net benefit can be expressed as interventions avoided. The running example is a hypothetical prostate-biopsy study (prevalence 10%, binary test sens 40% spec 90%, model AUC 0.79) where the model beats "biopsy all" except for thresholds below about 2-3%.

## Overview

**Setting.** Men with elevated PSA (for example 3 ng/mL or higher) are generally advised to biopsy, but only a small proportion have high-grade cancer (the kind that benefits from early treatment); low-grade cancer counts as overdiagnosis. Researchers seek a second test or model so only high-risk men go to biopsy. In the hypothetical study high-grade prevalence is 10%; a binary diagnostic test has sensitivity 40% and specificity 90%; a multi-marker model outputs a predicted probability with AUC 0.79. Curves follow Vickers and Elkin (2006).

## Main Content

**Step 1 - Benefit is good (Fig. 1).** Four lines: model (light grey), test (dashed), intervention-for-all (thin black), intervention-for-none (thick black). "Intervention" is general: biopsy, antibiotics, statins, "best supportive care" for avoiding palliative surgery, extra workup or monitoring. The original paper and many applications say "treat". The model has the highest benefit for nearly all preferences; "biopsy all" is the contemporary practice, so it is the relevant comparator. A study of men with low PSA (not biopsied now) would use "intervene for none" as the reference.

**Step 2 - Preference.** The x-axis extremes are "I'm worried about disease" and "I'm worried about biopsy". A doctor worried about missing disease (young patient with school-age children) has a low threshold; a doctor with an older patient, or one skeptical of early detection, has a high threshold. The model has the highest benefit except for the "very worried" end, where "intervention for all" is slightly higher: a patient who strongly prefers early detection may skip a second test or model that is not 100% accurate.

**Step 3 - Unit of preference is threshold probability (Fig. 2).** Vary risk "counting up from 2% and down from 98% until the doctor is no longer sure". A stated threshold of 10% means he wouldn't do more than 10 biopsies to find one high-grade cancer: odds 1:9, "missing a high-grade cancer is 9 times worse than doing an unnecessary biopsy". The model is worse than "biopsy all" only below roughly 2-3%, "a stretch in prostate cancer ... where biopsy is invasive, painful, and associated with the risk of sepsis" but plausible for skin-cancer biopsy.

**Step 4 - Net benefit.** See [[Vickers 2019 - Net Benefit and Threshold Probability]].

**Step 5 - Interventions avoided (Fig. 3).** Because "biopsy all" is the default here, express benefit as fewer unnecessary biopsies. At 10% threshold the model is equivalent to a strategy that reduces unnecessary biopsies by about 40 per 100 without missing any high-grade cancer. This "does not change any conclusions as to which model or test has the highest net benefit".

> [!example] Verified net-benefit values for the paper's stated parameters
> Closed form for the binary test ($\pi=0.10$, sens 0.40, spec 0.90) and the treat-all rule:
>
> | $p_t$ | $NB_{\text{test}}$ | $NB_{\text{all}}$ | $NB_{\text{none}}$ |
> |---|---|---|---|
> | 0.05 | 0.0353 | 0.0526 | 0 |
> | 0.10 | 0.0300 | 0.0000 | 0 |
> | 0.20 | 0.0175 | -0.1250 | 0 |
>
> A simulated calibrated model with binormal separation giving AUC 0.79 (this vault's illustration, not the paper's data) gives $NB_{\text{model}}=0.0837,\,0.0644,\,0.0432,\,0.0300,\,0.0214$ at $p_t=0.02,0.05,0.10,0.15,0.20$, against treat-all $0.0816,\,0.0526,\,0,\,-0.0588,\,-0.125$. It reproduces the qualitative shape of Fig. 2: the model beats treat-all except at the lowest thresholds, and beats the binary test across the plausible range.
^ex-prostate-nb

```python
import numpy as np
from scipy import stats
prev, rng, n = 0.10, np.random.default_rng(0), 200_000
y = rng.random(n) < prev
score = rng.normal(size=n) + np.sqrt(2)*stats.norm.ppf(0.79)*y      # binormal, AUC 0.79
bins = np.quantile(score, np.linspace(0, 1, 201))
idx = np.clip(np.digitize(score, bins) - 1, 0, 199)
phat = np.array([y[idx == b].mean() for b in range(200)])[idx]      # calibrated risk
def net_benefit(pos, y, pt):
    tp, fp = (pos & y).mean(), (pos & ~y).mean()
    return tp - fp * pt/(1 - pt)
for pt in (0.02, 0.05, 0.10, 0.15, 0.20):
    print(pt, round(net_benefit(phat >= pt, y, pt), 4),
          round(prev - (1 - prev)*pt/(1 - pt), 4))      # model vs treat-all
```

Output (run here): `0.02 0.0837 0.0816`, `0.05 0.0644 0.0526`, `0.1 0.0432 0.0`, `0.15 0.03 -0.0588`, `0.2 0.0214 -0.125`.

PyMC-style sketch (untested): for a Bayesian risk model, compute net benefit per posterior draw of $\hat p$ and threshold on a grid, giving a *distribution* of decision curves. Then the Heath-style EVPPI/EVPI machinery on the draws values the uncertainty in the curve (see [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]).

## Connections
- A nowcast-based "call it today or wait" rule is a threshold decision on a predictive probability; the same curve logic applies (E90).
- Marketing: for uplift-targeted promotions, the threshold is the cost-to-value ratio of the offer; "intervene for all" is a blanket promotion.

## See Also
- [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]
- [[Vickers 2019 - Ten Questions and Limits of Decision Curves]]
