---
title: "Morris et al 2019 - Protocols, Code Release, Consortia and Limits"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§8 Concluding remarks pp.24-26; §8.1 Future directions p.26; §8.2 Final remark pp.26-27; Conflicts of interest and Acknowledgements p.27. arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
  - "[[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]]"
  - "[[Garden of Forking Paths]]"
used_by:
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
aliases:
  - Simulation protocols
  - Late-phase simulation studies
  - Points of light on a landscape
  - Selective reporting in simulation studies
---

# Morris et al 2019 - Protocols, Code Release, Consortia and Limits

> [!summary]
> The discussion section of Morris, White & Crowther (2019, §8). The two main shortcomings of current practice are **unclear design** (which ADEMP addresses) and **unreported Monte Carlo uncertainty**. For contradictory simulation literatures the authors offer a charitable explanation (developers simulate the problems they have seen) and a less charitable one (**selective reporting** of favourable DGMs and seeds). Their three remedies: **simulation protocols written before coding** that justify each choice, **public code**, and **consortia of rival method authors** for "late-phase" comparisons, because implementation skill confounds benchmark results. The closing caution, quoting Patrick Royston: simulation studies "reveal points of light on a landscape, but can not illuminate the entire landscape."
^summary-protocols-limits

## Overview

§8 is the paper's discussion. It restates the two failures the review documented (unclear design, unreported Monte Carlo uncertainty), names the tools that fix the second (`simsum`, `rsimsum`, Boos & Osborne), and then turns to a problem the rest of the tutorial cannot solve on its own: simulation literatures that contradict each other. The proposed remedies (protocols, consortia, code release) mirror pre-registration and replication in substantive research. The closing Royston quotation sets the epistemic limit on everything else in the note set.

## Main Content

### §8 Concluding remarks (pp.24-26)

- Simulation studies are invaluable — most Vol. 34 articles relied on them in part — and because methods promoted this way are used in medical research, "transparent reporting of the design and execution of simulation studies is critical" (p.24).
- **Two main shortcomings** (p.25): "(i) lack of clarity over the design, which ADEMP aims to deal with, and (ii) failure to report estimates of Monte-Carlo uncertainty."
- All ADEMP elements "and the rationale for decisions should be included in reporting" (p.25). Exemplars: Austin & Stuart (2015) for a clearly described design; explicit ADEMP use in Thompson et al., Sayers et al., Morris et al., Keogh & Morris, Pham et al.
- Tools (p.26): Stata `simsum` [12] and R `rsimsum` [67] "automate this process for commonly used performance measures" — the process being computation of performance and its Monte Carlo SE. For complex performance measures, Boos & Osborne (2015) [73] give a resampling-based assessment of Monte Carlo SEs.

### §8.1 Future directions (p.26)

> [!definition] Contradictory simulation results: two explanations (§8.1, p.26)
> - **Charitable** (the authors' own leaning): methods are developed by researchers handling specific problems they have seen in practice, so they run simulations relevant to those problems, which "may not be relevant to others."
> - **Less charitable:** "selective reporting of only the most favourable (or unfavourable) configurations of data-generating mechanisms, running the simulations many times under different seeds and selecting the most favourable, and more (left to the reader's imagination)."
^def-contradictory-results

The less charitable possibility is the [[Garden of Forking Paths]] / [[Researcher Degrees of Freedom]] problem moved from substantive research to methods research: the DGM grid, the seed and the performance measure are all forking paths.

> [!definition] Three remedies (§8.1, p.26)
> 1. **Simulation protocols before code.** "A starting point to addressing this issue is to write detailed simulation protocols before writing code." This protects against favourable-result reporting and forces clarity about ADEMP in advance. *Weak point:* simulation studies need no approval before "data collection," so protocols could be written after the fact. *Counterargument:* "protocols must justify the rationale for choices: as well as describing what is planned, there is a burden to explain why."
> 2. **Consortia for "late-phase" simulation studies** (an analogy with late-phase drug trials). Authors who produced contradictory results should work together, allowing "robust discussion of the design and exploration of disparities among previous work." Exemplar: three groups with methods for multilevel incomplete data jointly evaluated them (Audigier et al. 2018). This is preferred to one group running a large late-phase study without previous authors' input (as in Langan et al. 2017). Boulesteix, Wilson & Hapfelmeier (2017) add that benchmark performance reflects implementers' "knowledge and skill": "A poor implementation may make a superior method appear weak."
> 3. **Release code publicly.** Replication or extension needs the earlier design "written out fully and unambiguously." Some journals encourage (e.g. *Biometrical Journal*) or require it. External scrutiny means authors check code more thoroughly. "There is generally no excuse for withholding code." Caveat: resampling studies may lack permission to release data, but the code can still be shared.
^def-three-remedies

### §8.2 Final remark (pp.26-27)

> [!quote] Points of light (§8.2, p.26)
> "Simulation studies are a powerful tool. However, it is important to be aware that, because a simulation study took hard work and thought, we are liable to believe it tells us more than it truly does. To quote Patrick Royston, 'Simulation studies reveal points of light on a landscape, but can not illuminate the entire landscape.'"
>
> The aim is to "illuminate important points and to build up a picture of the landscape, particularly where terrain may be particularly rocky or particularly fertile."
^quote-points-light

### Declared interests and provenance (p.27)

The authors declare that they developed and regularly deliver a short course on simulation studies, from which this work grew and from which they benefit financially. The paper was released as preprints and revised after public comments, including from Stephen Senn (credited for the DGM pitfalls) and Rick Wicklin (zip-plot zooming). Funding (Acknowledgements, p.27): Morris and White are supported by the UK Medical Research Council (grant numbers MC_UU_12023/21 and MC_UU_12023/29). Crowther is partly supported by an MRC New Investigator Research Grant (MR/P015433/1).

Acknowledged for discussion and input: Alessandro Gasparini, Tra Pham, Brennan Kahan, Ruth Keogh, Clémence Leyrat, Kristian Brock, Christian Hennig and Patrick Royston, plus participants in the authors' courses. Preprint reviewers credited with important substantive comments: Maarten van Smeden, Rolf Groenwold, Bas Penning-de Vries, Kim Luijken, Martina McMenamin, Paula Dhiman, Leane McCabe, Alessandro Gasparini, Stephen Senn, Adrian Sayers, Richard Torkar, David Mannheim, Daniel Oberski, Teague Henry and Rick Wicklin.

## Limitations of the tutorial itself (assessment, not from the paper)

- **Frequentist framing.** Performance is evaluated at fixed $\theta$. For Bayesian methods, prior-averaged checks ([[Simulation-Based Calibration - Overview]], [[Data-Averaged Posterior Self-Consistency]]) answer a different, complementary question; the paper notes the distinction only as DGM pitfall 2.
- **Estimation-centric MCSEs.** Table 6 covers estimation and testing measures; prediction targets (calibration, discrimination, ranking metrics) have no closed-form MCSE in the paper, and Boos & Osborne's resampling approach is needed.
- **Independence assumed.** MCSE formulas assume independent repetitions. Time-series backtests and rolling-origin evaluations reuse overlapping data, so naive binomial MCSEs are too small ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]).
- **Single worked example with two DGMs.** The authors acknowledge it covers no "real breadth of scenarios."

## Examples

> [!example] Seed-shopping and DGM-shopping, made concrete (illustrative, not from the paper)
> A team compares two estimators over a 3 × 3 DGM grid with $n_{	ext{sim}}=500$. Run under 20 different starting seeds, the estimated coverage of the new method in one DGM ranges over roughly ±2 MCSE ($\sqrt{0.95	imes0.05/500}pprox1.0$ pp), so picking the best seed can turn 93.5% into 95.5%. Dropping the three DGMs where the new method looks worst then makes it "dominate". A protocol that fixes the seed, the full grid and the headline measures before coding (§8.1, p.26) removes both choices, and publishing the code lets a reader rerun the omitted DGMs.
^ex-seed-shopping

> [!example] A late-phase consortium for marketing models (illustrative, not from the paper)
> Two vendors report contradictory simulation results for adstock estimation, each on its own simulator. Following §8.1, the late-phase step is a shared DGM grid (for example built on [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview|AMSS]]) agreed by both, with each team implementing its own method, because "A poor implementation may make a superior method appear weak."
^ex-late-phase-consortium

## Connections

- [[Pre-registration and Open Science - Overview]], [[Pre-registration vs Registered Reports]], [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]] — protocol logic in substantive research.
- [[Simulated-Data Experimentation as Virtual Replication]] — simulation as pre-registration of a modelling workflow.
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] and [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — the substantive-research analogues of seed- and DGM-shopping.
- Model-governance analogues: independent validation and documentation in [[SR 11-7 - Model Risk Management Guidance - Overview]] and test, evaluation, verification and validation in [[NIST AI RMF 1.0 - Overview]].

## See Also

- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — what a protocol looks like for a marketing pipeline
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
