---
title: "Index: Ioannidis 2005 - Why Most Published Findings Are False"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
parent: "[[../_Index|Overfitting and False Discovery]]"
date_updated: 2026-10-13
concept_count: 10
---

# Ioannidis 2005 - Why Most Published Findings Are False

> [!abstract] Routing Summary
> This folder fully captures Ioannidis (2005), *Why most published research findings are false* (PLoS Medicine 2(8): e124): the positive predictive value (PPV) of a claimed significant finding as a function of pre-study odds $R$, power $1-\beta$, $\alpha$, bias $u$ and the number of independent teams $n$; six corollaries; the Box 1 GWAS example; Table 4 design scenarios; null fields; and the remedies. It contains 10 notes covering all four tables, both figures (checked against the plotted panels), recomputed values, and the full 37-item reference list.
> - Need the paper on one page, headline numbers, or the section-to-note map? → [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
> - Need the definitions of research finding, $R$, PPV, FPRP, Table 1, or the condition $(1-\beta)R>\alpha$? → [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]
> - Need how bias $u$ enters (Table 2), the proof that PPV falls with $u$, Figure 1, or reverse bias? → [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]
> - Need PPV when $n$ teams test the same question (Table 3), Figure 2, or unequal powers? → [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]
> - Need Corollaries 1-6, how they interact, or the Proteus phenomenon? → [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]
> - Need the worked GWAS example (Box 1) with step-by-step numbers? → [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]
> - Need Table 4 (PPV for nine study designs), a Monte Carlo replication, or marketing archetypes? → [[Ioannidis 2005 - Table 4 PPV by Study Design]]
> - Need null fields, the 60-nutrient example, or why large effects signal bias? → [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]
> - Need the full bibliography, or which reference supports which claim? → [[Ioannidis 2005 - Reference List and Citation Map]]
> - Need the abstract item by item, the introduction's claims, or the publication context (Essay section, affiliations, competing interests, licence)? → [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
> - Need remedies, modelling assumptions, or later critiques (Goodman & Greenland; Jager & Leek)? → [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Research finding; pre-study odds $R$; PPV; FPRP | [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] | definition | [[Power Analysis and Sample Size]] | $\text{PPV}=(1-\beta)R/(R-\beta R+\alpha)$ |
| More-likely-true condition | [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] | theorem | Table 1 | PPV > 1/2 iff $(1-\beta)R>\alpha$ |
| Likelihood ratio of significance | [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] | concept | Bayes' rule | post-odds = $R(1-\beta)/\alpha$ |
| Bias $u$ | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] | definition | [[Researcher Degrees of Freedom]] | share of would-be non-findings reported as findings |
| PPV with bias | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] | theorem | Table 2 | decreasing in $u$ iff $1-\beta>\alpha$; $u=1\Rightarrow$ PPV $=R/(R+1)$ |
| Reverse bias | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] | concept | bias $u$ | true findings lost to noise or burial; judged rarer |
| PPV with $n$ studies | [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] | theorem | Table 3 | $R(1-\beta^n)/(R+1-(1-\alpha)^n-R\beta^n)\to R/(R+1)$ |
| Monotonicity of PPV$_n$ | [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] | theorem | PPV$_n$ | strictly decreasing in $n$ iff $1-\beta>\alpha$; constant iff equal (proof) |
| Reference list and citation map | [[Ioannidis 2005 - Reference List and Citation Map]] | reference | all sections | 37 refs; core derivations cite none |
| Corollaries 1-6 | [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] | theorem | Tables 1-3 | small studies, small effects, many hypotheses, flexibility, interests, hot fields lower PPV |
| Proteus phenomenon | [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] | definition | Corollary 6 | alternating extreme claims and refutations |
| Box 1 GWAS | [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]] | example | all three PPV formulas | $10^{-4}\to12\times10^{-4}$; $4.4\times10^{-4}$ with $u=0.1$ |
| Table 4 scenarios | [[Ioannidis 2005 - Table 4 PPV by Study Design]] | example | PPV with bias | only confirmatory designs exceed 0.5 (0.85) |
| Null field | [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]] | definition | Table 4 | claimed effects measure net bias |
| Remedies; applying them | [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]] | algorithm | all of the above | power, totality, registration, estimate $R$ |

## Notes

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — CONTAINS: research question, contributions, headline PPV table, full Source Map (every section, table, figure → note), analytics relevance.
- [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] — CONTAINS: motivation (p-value-only interpretation); Def. research finding; Def. $R$, $c$, $\alpha$, $\beta$, PPV, FPRP; Table 1; Thm. PPV without bias + proof; odds/likelihood-ratio form; threshold-$R$ table; creative-testing example; Python.
- [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] — CONTAINS: Def. bias and $u$; mechanics; Table 2 (with transcription note); Thm. PPV with bias + monotonicity proof; $u\to1$ limit; Figure 1 description; Grid A (legend's $u$) and Grid B (plotted $u$=0/0.05/0.20/0.80); verified legend-mismatch resolution; reverse bias; worked bias example; analytics forms of $u$.
- [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] — CONTAINS: motivation; Def. $n$-study setup; Table 3; Thm. PPV$_n$, unequal powers, $n\to\infty$ limit; exact monotonicity theorem with proof (incl. boundary $1-\beta=\alpha$); Figure 2 description, recomputed grid, panel-endpoint check and caption/panel-order note; many-analysts example; Python.
- [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] — CONTAINS: Corollaries 1-6 (bold statements, mechanism, paper's examples, analytics reading); Def. Proteus phenomenon; interactions among corollaries; corollary-to-parameter table; "hot ad format" example.
- [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]] — CONTAINS: Box 1 setup; Step 1 single study ($12\times10^{-4}$); Step 2 bias catalogue and $u=0.1$ ($4.4\times10^{-4}$); Step 3 ten teams (printed $1.5\times10^{-4}$ vs recomputed $2.5\times10^{-4}$); table testing which assumptions reproduce 1.5 ($\alpha\approx0.10$ or $n\approx21$); cascade table; Python; driver-screen analogue.
- [[Ioannidis 2005 - Table 4 PPV by Study Design]] — CONTAINS: Table 4 transcribed + recomputed + bias-free column; section narrative; section claim; Monte Carlo replication code (ADEMP framing); marketing archetype table.
- [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]] — CONTAINS: Def. null field; 60-nutrient example; robustness to a few true effects; reversal of reading large effects; resistance; permutation null-field diagnostic for a pipeline.
- [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]] — CONTAINS: Remedies 1-4 in full; algorithm for applying them; modelling-assumptions table; external critiques (Goodman & Greenland 2007; Jager & Leek 2014; replication projects; Simmons et al.); marketing-programme example.
- [[Ioannidis 2005 - Reference List and Citation Map]] — CONTAINS: all 37 references transcribed; citation site and supported claim for each; citation map by section; observations on self-citation and methodological precursors.

## Sources
- Ioannidis 2005 - Why Most Published Research Findings Are False — Ioannidis JPA (2005), PLoS Medicine 2(8): e124, pp. 0696-0701, the sole source for all notes. The critiques section also cites external literature (citation-only).

## See Also
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] — sibling source in Overfitting and False Discovery.
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — simulations of analytic flexibility ($u$).
- [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Multiple Testing Corrections]], [[Type S and Type M Errors]] — Research Methodology cluster.
- [[The Replication Crisis and Multiple Levels of Variation]] — empirical follow-up.
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] — low-$R$ model selection in practice.
