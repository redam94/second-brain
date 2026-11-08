---
title: "Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset"
tags:
  - source/ingested
  - topic/benchmarks
  - type/example
  - doc/paper
source: "[[raw/Gebru 2021 - Datasheets for Datasets.pdf]]"
source_location: "Appendix, Figs. 1-4, pp. 14-18"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Gebru 2021 - Datasheets for Datasets"
doc_type: paper
depends_on:
  - "[[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]"
  - "[[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]"
used_by:
  - "[[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]"
aliases:
  - Movie Review Polarity datasheet
  - Pang and Lee datasheet
---

# Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset

> [!summary]
> The appendix answers the full question set for Pang and Lee's *Movie Review Polarity* dataset (from *Thumbs Up? Sentiment Classification using Machine Learning Techniques*). Answers are drawn from five public sources, and several are honestly marked "Unknown to the authors of the datasheet." It is the paper's demonstration of what a completed datasheet looks like and where gaps appear when the datasheet author is not the dataset creator.

## Overview

The datasheet was written by the paper's authors, not the dataset creators, using the dataset webpage, the original arXiv paper (cs/0409058) and the v1.0/v2.0 READMEs. Any errors introduced are the datasheet authors' (footnote 1 of Fig. 1). A creator-authored example is referenced: Cao and Daumé's GICoref datasheet. Instances: English movie reviews with a binary polarity label.

## Main Content

> [!example] Completed datasheet, Fig. 1-4 (condensed answer by answer)
> **Motivation**
> - *Purpose:* enable research on predicting sentiment polarity (positive or negative affect, or stance toward a topic) for English text; created intentionally for that task, with movie reviews chosen because affect is frequently expressed there.
> - *Creators:* Bo Pang and Lillian Lee, Cornell University.
> - *Funders:* National Science Foundation, Department of the Interior, National Business Center, Cornell University, Sloan Foundation.
>
> **Composition**
> - *Instances:* movie reviews extracted from newsgroup postings with a binary polarity rating (strongly positive vs strongly negative by stars).
> - *Count:* 1,400 (v1.x) and 2,000 (v2.0, 2014).
> - *Sample vs population:* a sample, intended as random from newsgroup movie reviews, with no more than 40 posts per author; no representativeness tests were run.
> - *Instance content:* review text with explicit rating information removed (some errors found and fixed); down-cased, HTML tags and newsgroup boilerplate removed, some unspecified automatic filtering. Target: +1 / -1 polarity from stars.
> - *Missing data:* none. *Relationships:* none explicit, though author names and emails in the raw posts would allow extracting threads or same-author groups.
> - *Splits:* a cross-validation tag per instance; results measured in classification accuracy.
> - *Noise:* see preprocessing. *External resources:* self-contained.
> - *Confidential:* unknown. *Offensive:* some reviews may contain moderately inappropriate language, not expected to be the norm.
> - *Subpopulations:* none identified. *Identifiable individuals:* the raw form retains posting names and emails (already public in the newsgroup archive); the preprocessed version removes them. *Sensitive:* none beyond names and emails.
>
> **Collection process**
> - *Acquisition:* mostly directly observable raw text; labels extracted by the described process; downloaded from the IMDb archive of rec.arts.movies.reviews.
> - *Mechanism, collectors, timeframe, ethical review:* all "Unknown to the authors of the datasheet."
> - *Sampling strategy:* English reviews from that newsgroup with an extractable star rating, limited to 40 per author, otherwise arbitrary.
> - *Individuals:* data crawled from public web sources; not notified or asked for consent (posters presumably knew posts were public); revocation and impact analysis N/A.
>
> **Preprocessing/cleaning/labeling**
> - Instances with no explicit rating were discarded; only strong ratings retained. Star ratings extracted by pattern matching text such as "**** out of *****" and removing it. Out of five stars: at least four positive, at most two negative; out of four: three and up positive, one or less negative; middle ratings discarded. At most 20 reviews per label per author. v1.1 removed non-English reviews. Half stars occasionally missed, affecting negative labels.
> - Later fixes: (1) reviews with rating info in several places removed; (2) unexpected rating ranges fixed; (3) boilerplate removal that removed too much text corrected.
> - Raw data saved (the dataset contains it). Software not available.
>
> **Uses**
> - Used in the original paper (and a collection of papers maintained by the authors through April 2012 at a webpage). Other tasks: modelling movie reviews, inducing a sentiment lexicon, generating reviews.
> - *Risks:* minimal; data already public and names/emails removed in the preprocessed version.
> - *Should not be used for:* because data is only movie-domain, systems "may or may not generalize to other sentiment prediction tasks," so should not, without further verification, make consequential decisions about people.
>
> **Distribution**
> - Public on the internet at Bo Pang's Cornell webpage; first released 2002; no DOI; no redundant archive.
> - Licence: none; copyright belongs to review authors unless otherwise stated; request to cite Pang, Lee and Vaithyanathan, EMNLP 2002. No third-party restrictions; export controls "Unknown."
>
> **Maintenance**
> - Maintained by Bo Pang; contacts via personal webpages. No formal erratum; versions v0.9, v1.0, v1.1, v2.0 with READMEs and a diff file. Updates posted on the dataset page. Retention limits N/A. Older versions kept for consistency. Extension: others should contact the original authors about incorporating fixes.
^ex-pang-lee-datasheet

### What the example demonstrates

| Feature | Illustration in the datasheet |
|---|---|
| Unknowns are acceptable and informative | Collection mechanism, timeframe, ethics review, confidentiality, export controls all "Unknown to the authors" |
| Labels are derived, not observed | Polarity inferred by regex over star text, with documented thresholds and known errors (half stars) |
| Representativeness disclosed honestly | "No tests were run to determine representativeness"; cap of 40 posts per author as a deliberate sampling choice |
| Scope-of-validity warning | Domain restriction implies no consequential decisions about people without further verification |
| Versioning visible | v0.9 to v2.0, README and diff files serve as de facto erratum |

## Examples

> [!example] Reading the datasheet as a benchmark consumer
> **Question.** Can accuracy on this dataset support a claim that a model detects customer sentiment in product reviews?
> **Reading.** The datasheet says labels come from star ratings in newsgroup movie reviews, reviews were filtered to extremes, and results "may or may not generalize" beyond movies. Extreme-polarity filtering also removes ambiguous middle cases, so accuracy overstates difficulty relative to real review streams. The claim is therefore not supported without target-domain validation.
> **Interpretation.** The same reasoning, "what population and what filtering produced these labels?", underlies transportability arguments for experiments; see [[Experimental Benchmarks for Observational Ad Measurement]].
^ex-consumer-reading

## Connections

- The preprocessing thresholds are a small example of the "researcher degrees of freedom" in dataset construction: [[Researcher Degrees of Freedom]].
- Dehghani et al. list Gebru et al. as a benchmark-creation checklist: [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]].

## See Also

- [[Gebru 2021 - Datasheets for Datasets - Overview]]
- [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]
