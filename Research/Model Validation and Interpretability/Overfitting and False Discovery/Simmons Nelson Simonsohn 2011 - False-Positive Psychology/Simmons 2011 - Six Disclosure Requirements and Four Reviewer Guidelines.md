---
title: "Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - topic/pre-registration
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons, Nelson & Simonsohn (2011), p. 1362 ('Solution', Table 2), pp. 1362-1363 ('Requirements for authors' 1-6, 'Guidelines for reviewers' 1-4), p. 1363 note 5, p. 1364 (Table 3 as worked application)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]"
  - "[[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]"
  - "[[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]]"
used_by:
  - "[[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]"
  - "[[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]"
  - "[[Pre-registration and Open Science - Overview]]"
aliases:
  - Simmons 2011 Table 2
  - Six requirements for authors
  - Four guidelines for reviewers
  - Disclosure-based solution to false positives
---

# Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines

> [!summary]
> The paper's remedy (Table 2, p. 1362) is **disclosure, not prohibition**. Authors must (1) fix and report the stopping rule before collecting data, (2) collect at least 20 observations per cell or justify fewer, (3) list every variable collected, (4) report every condition, (5) report results with excluded observations put back, and (6) report results without covariates. Reviewers should (1) enforce these rules, (2) tolerate imperfect results, (3) ask for robustness to arbitrary choices and (4) require an exact replication when justifications are weak. The authors claim the scheme "substantially mitigates the problem but imposes only a minimal burden", and they say it will not stop willful deception.
^summary

## Overview

[[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives|The diagnosis]] was that researchers exploit forks because the forks are ambiguous and the exploration is invisible. The remedy therefore targets visibility. Each requirement closes off one of the [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom|simulated degrees of freedom]] by making it reportable. The solution "leaves the right and responsibility of identifying the most appropriate way to conduct research in the hands of researchers" and asks only for "appropriately transparent descriptions of their methods" (p. 1362). It assumes "the vast majority of researchers strive for honesty".

This is a precursor to pre-registration ([[Pre-registration and Open Science - Overview]]). It does not ask researchers to commit to an analysis in advance (except the stopping rule). It asks them to **disclose the path actually taken** and to show **robustness to the paths not taken**.

## Main Content

### Table 2 (p. 1362)

> [!definition] Table 2. Simple Solution to the Problem of False-Positive Publications (p. 1362)
> **Requirements for authors**
> 1. Authors must decide the rule for terminating data collection before data collection begins and report this rule in the article.
> 2. Authors must collect at least 20 observations per cell or else provide a compelling cost-of-data-collection justification.
> 3. Authors must list all variables collected in a study.
> 4. Authors must report all experimental conditions, including failed manipulations.
> 5. If observations are eliminated, authors must also report what the statistical results are if those observations are included.
> 6. If an analysis includes a covariate, authors must report the statistical results of the analysis without the covariate.
>
> **Guidelines for reviewers**
> 1. Reviewers should ensure that authors follow the requirements.
> 2. Reviewers should be more tolerant of imperfections in results.
> 3. Reviewers should require authors to demonstrate that their results do not hinge on arbitrary analytic decisions.
> 4. If justifications of data collection or analysis are not compelling, reviewers should require the authors to conduct an exact replication.
^tbl-2

### Requirements for authors: rationale (pp. 1362-1363)

| # | Requirement | Fork it targets | Rationale given in the paper |
|---|---|---|---|
| 1 | Stopping rule fixed ex ante and reported | Sample size (Table 1 B, Fig. 1) | May mean reporting a power calculation or an arbitrary rule ("we decided to collect 100 observations", "as many observations as we could before the end of the semester"). "The rule itself is secondary, but it must be determined ex ante and be reported." |
| 2 | ≥ 20 observations per cell, or a compelling cost justification | Sample size | "extra protection for the first requirement". Samples under 20 per cell "are simply not powerful enough to detect most effects", so choosing one in advance rarely makes sense; small samples are "much more likely to reflect interim data analysis and a flexible termination rule". Fig. 1 shows a larger minimum n also reduces the damage from breaking Requirement 1. |
| 3 | List all variables collected | DV choice (Table 1 A), covariate choice (C) | "This requirement prevents researchers from reporting only a convenient subset of the many measures that were collected, allowing readers and reviewers to easily identify possible researcher degrees of freedom." Cost is small: "Because authors are required to just list those variables rather than describe them in detail, this requirement increases the length of an article by only a few words per otherwise shrouded variable" (p. 1363). Authors are encouraged to begin the list with "**only**" ("participants reported only their age and gender"). |
| 4 | Report all conditions, including failed manipulations | Dropping conditions (Table 1 D) | "This requirement prevents authors from selectively choosing only to report the condition comparisons that yield results that are consistent with their hypothesis" (p. 1363). Again, use "**only**" ("randomly assigned to one of only three conditions"). |
| 5 | If observations are excluded, also report results with them included | Exclusion / outlier rules (the [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives#^ex-rt-outliers\|reaction-time example]]) | Shows how far a finding relies on exclusions, pressures authors to justify them and prompts reviewers to judge them. "Correctly interpreting a finding may require some data exclusions". The aim is only to flag results "that hinge on ex post decisions". |
| 6 | If a covariate is used, also report results without it | Covariate flexibility (Table 1 C) | Shows reliance on the covariate and pressures justification. "Some findings may be persuasive even if covariates are required for their detection, but one should place greater scrutiny on results that do hinge on covariates despite random assignment." |
^req-5-6

> [!theorem] Proposition: Larger minimum n blunts optional stopping (Requirement 2, via Fig. 1)
> In the [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)|Figure 1 simulation]], raising the minimum per-cell n from 10 to 20 lowers the false-positive rate at every peeking frequency: 22.1% → 16.3% (every observation), 17.0% → 13.3% (every 5), 14.3% → 11.5% (every 10), 12.7% → 10.4% (every 20). Requirement 2 is a backstop for violations of Requirement 1.
>
> **Why:** with a larger n before the first look, fewer looks remain before the cap of 50, and the test statistic path starts from a more stable point. The cumulative crossing probability of a random-walk-like $z$-path grows with the number of looks ([[The Peeking Problem and Optional Stopping]]).
^prop-min-n

### Guidelines for reviewers (p. 1363)

1. **Ensure that authors follow the requirements.** Reviewers are "the gatekeepers of the scientific community". They "should encourage authors not only to rule out alternative explanations, but also to more convincingly demonstrate that their findings are not due to chance alone" (p. 1363). The usual review task of ruling out confounds is not enough: chance itself has to be ruled out as well. This means "prioritizing transparency over tidiness". If a strong study has a "peculiar exclusion or an inconsistent condition, those imperfections should be retained." Enforcement works: "If reviewers require authors to follow these requirements, they will."
2. **Be more tolerant of imperfections.** Researchers exploit flexibility partly because reviewers expect "every data pattern to be (significantly) as predicted." The paper reverses the usual heuristic: "Underpowered studies with perfect results are the ones that should invite extra scrutiny."
3. **Require robustness to arbitrary analytic decisions.** Some arbitrary choices remain even under full compliance, for example whether to subtract a baseline measure from the outcome or enter it as a covariate. Reviewers should ask for the alternatives ("Do the results also hold if the baseline measure is instead used as a covariate?") and for consistency across studies ("Do the results hold for Study 3 if gender is entered as a covariate, as was done in Study 2?"). **Note 5:** these alternatives should be reported in the manuscript or an appendix, not only in a private response to reviewers, "so that the research community has access to the results." If a result holds for only one arbitrary specification, "then everyone involved has learned a great deal about the robustness (or lack thereof) of the effect."
4. **Require an exact replication when justifications are not compelling.** This is costly and "should be used selectively; however, 'never' is too selective."
^guidelines

### Worked application: Study 2 re-reported

Table 3 (p. 1364) applies the rules to the authors' own fake finding. It is transcribed in [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies#^tbl-3]]. Requirements 1-4 and 6 each expose a concealed fork. Disclosing the covariate-free result (p = .33) alone ends the claim.

## Examples

> [!example] Example: Translating Table 2 into a model-validation checklist (generic marketing analytics)
> Suppose a team picks among dozens of media-mix specifications on a weekly dataset and reports one channel ROI. The six requirements carry over directly:
> 1. **Stopping rule.** State in advance how many specifications or hyperparameter settings will be searched, or the time budget. Do not stop "when the ROI looks right".
> 2. **Minimum data.** Do not report channel-level effects from a fit with fewer than a pre-agreed number of observations per estimated parameter (compare [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]).
> 3. **List all variables.** List every candidate control and transformation tried.
> 4. **All conditions.** Report all model variants fitted, including ones that "failed" convergence or sign checks.
> 5. **Exclusions.** If outlier weeks were dropped, show the fit with them included.
> 6. **Covariates.** Show the channel estimate without the optional controls.
>
> Reviewer guideline 3 corresponds to a specification curve or [[Sensitivity Analysis in Observational Studies|sensitivity analysis]], and guideline 4 corresponds to validating on a holdout or an experiment ([[Cross Validation Checking]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]). Choosing among fits by a criterion other than held-out accuracy, for example the one with the largest attribution mass, is exactly the hidden fork Requirement 4 aims to expose.
^ex-generic-application

## Connections

- **Pre-registration** commits to the analysis before seeing data. Simmons et al. require only the *stopping rule* in advance and disclosure of everything else. See [[Pre-registration and Open Science - Overview]], [[Pre-analysis Plans and the Open Science Ecosystem]] and [[Pre-registration vs Registered Reports]].
- Requirement 1 has a statistical alternative: sequential designs with valid inference under continuous monitoring ([[Always-Valid p-values and the mSPRT]]). The paper's [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^nonsol-alpha|alpha-correction nonsolution]] cites Pocock's group-sequential methods.
- Reviewer guideline 3 is an early form of what became multiverse or specification-curve analysis. The vault's [[Sensitivity Analysis in Observational Studies]] covers a related idea for unmeasured confounding.
- In model-risk governance, "effective challenge" plays the same role as reviewer guidelines 3-4: [[SR 11-7 - Model Risk Management Guidance - Overview]].

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]
- [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]: objections and rejected alternatives
- [[Researcher Degrees of Freedom]]
- [[Limits and Objections to Pre-registration]]
