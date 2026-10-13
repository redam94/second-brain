---
title: "Index: Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
parent: "[[../_Index|Overfitting and False Discovery]]"
date_updated: 2026-10-13
concept_count: 7
---

# Simmons Nelson Simonsohn 2011 - False-Positive Psychology

> [!abstract] Routing Summary
> This folder holds the full note set for Simmons, Nelson & Simonsohn (2011, *Psychological Science* 22(11): 1359-1366), the paper that named and quantified **researcher degrees of freedom**. It contains 7 notes covering the motivation, the staged "chronological rejuvenation" experiments, the Table 1 and Figure 1-2 simulations (with reproduction code), the six author requirements and four reviewer guidelines, and the General Discussion. The general concept is in [[Researcher Degrees of Freedom]]; this folder does not duplicate it.
> - Need the paper map or the headline numbers? → [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]
> - Need why flexibility happens without fraud (ambiguity + motivated reasoning)? → [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]
> - Need the "When I'm Sixty-Four" studies or Table 3? → [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]
> - Need the 61% false-positive table (Situations A-D) or reproduction code? → [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]
> - Need optional-stopping / peeking rates (22%) or the p-value path? → [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]]
> - Need the disclosure checklist (Table 2)? → [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]
> - Need why Bonferroni, Bayes, conceptual replication or data posting don't fix it? → [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]
^routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Three costs of false positives | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]] | concept | [[Researcher Degrees of Freedom]] | Persistence, waste, credibility |
| Ambiguity × desire mechanism | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]] | claim | — | Self-serving justification, not malice |
| Reaction-time outlier rules | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]] | example | — | many different cut-offs in about 30 articles (paper gives no count; 6 fast + 12 slow is the note's own tally) |
| Study 1 / Study 2 | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]] | example | [[Logic of Regression Adjustment]] | p = .033; p = .040 for a false hypothesis |
| Table 3 compliant report | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]] | example | Table 2 | Without the covariate p = .33 |
| Flexible-analysis FPR | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] | definition | [[Multiple Testing Corrections]] | $\Pr(\min_j p_j<\alpha)\in[\alpha,k\alpha]$ |
| Table 1 Situations A-D | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] | theorem (simulation) | — | 9.5 / 7.7 / 11.7 / 12.6%; combined 60.7% (how forks are combined is not specified in the paper) |
| Optional stopping (Fig. 1) | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]] | theorem (simulation) | [[The Peeking Problem and Optional Stopping]] | 22.1% (min 10, test every observation) |
| p-value path (Fig. 2) | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]] | example | — | Significant early ≠ significant later |
| Six requirements / four guidelines | [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]] | definition | Table 1, Fig. 1 | Disclosure, not prohibition |
| Nonsolutions | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]] | definition | [[Multiple Testing Corrections]] | Alpha correction, Bayes, conceptual replication and data posting rejected |

## Notes

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]: CONTAINS: article metadata (type, keywords, received/accepted/online dates; ^meta), verified abstract quotes incl. "more likely to falsely find evidence that an effect exists" (^abstract), research question, key-findings table, contributions, full Source Map (every section, table, figure and footnote → note), reading path
- [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]: CONTAINS: opening premise ("errors are inevitable"); three costs of false positives; Definition of researcher degrees of freedom (^def-rdf-simmons); ambiguity × desire claim (^claim-ambiguity-desire); reaction-time outlier-rule example (^ex-rt-outliers)
- [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]: CONTAINS: Study 1 (^ex-study1), Study 2 (^ex-study2), Discussion, Table 3 transcription (^tbl-3), table mapping hidden forks to Table 1 situations and requirements, the three highlights, Study 1 non-replication result
- [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]: CONTAINS: ADEMP framing; flexible-FPR definition and bounds (^def-flexible-fpr); note 3 correlation proposition (^prop-correlation); Situations A-D algorithms (^alg-sit-a … ^alg-sit-d); Table 1 (^tbl-1); conservativeness claim (^claim-conservative); Python reproduction of rows A-D, A+B and A+B+C
- [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]]: CONTAINS: John et al. 70% prevalence; Figure 1 algorithm (^alg-fig1), values, caption, axes and legend (^fig-1); law-of-iterated-logarithm background (^thm-lil); Figure 2 p-value path with its two sub-.05 excursions (approximate by-eye readings: n of about 22-23 and 25-28, minimum about .02) (^fig-2); reproduction and the ambiguity at k = 20
- [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]: CONTAINS: Table 2 (^tbl-2); rationale for each requirement (^req-5-6); minimum-n proposition (^prop-min-n); four reviewer guidelines plus note 5 (^guidelines); model-validation translation example
- [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]: CONTAINS: file-drawer objection (^crit-file-drawer), disincentive objection (^crit-disincentive), exploratory-research objection (^crit-exploratory); nonsolutions: alpha correction (^nonsol-alpha), Bayesian statistics (^nonsol-bayes), conceptual replications (^nonsol-conceptual), posting data (^nonsol-data); concluding remarks (^concl); acknowledgments

## Sources

- Simmons Nelson Simonsohn 2011 - False-Positive Psychology: Simmons, Nelson & Simonsohn (2011), *Psychological Science* 22(11): 1359-1366, with the publisher cover page

## See Also

- [[Researcher Degrees of Freedom]]: the concept note (taxonomy of forks)
- [[Garden of Forking Paths]]: Gelman & Loken on implicit multiplicity
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]: field-level PPV consequences
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: how to design and report simulations like Table 1
- [[Pre-registration and Open Science - Overview]]: the remedy ecosystem that followed
