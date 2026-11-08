---
title: "Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Ch. 1 (pp. 5-10), Sec. 2.2 Towards defining private data analysis (pp. 12-15)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]]"
used_by:
  - "[[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]"
  - "[[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]"
aliases:
  - Why anonymization fails (Dwork Roth)
  - Differencing attack
  - Fundamental Law of Information Recovery
  - Impossibility of nothing-is-learned privacy
---

# Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails

> [!summary]
> Chapter 1 argues that the classical approaches to privacy (anonymization, large-set queries, query auditing, summary statistics, "ordinary facts", "just a few") each fail, and that the right goal is not "learn nothing about an individual" (Sec. 2.2 proves this unattainable) but "your outcome is essentially the same whether or not your data are in the database". The *Fundamental Law of Information Recovery* says overly accurate answers to too many questions destroy privacy.

## Overview

Differential privacy "describes a promise, made by a data holder, or curator, to a data subject". It "addresses the paradox of learning nothing about an individual while learning useful information about a population." A medical database may teach that smoking causes cancer, which could raise a smoker's insurance premiums. Has the smoker been harmed or had his privacy compromised? DP's answer: more is known about him after the study, but his information was not "leaked", because "the impact on the smoker is the same independent of whether or not he was in the study. It is the conclusions reached in the study that affect the smoker, not his presence or absence in the data set."

## Main Content

> [!definition] The Fundamental Law of Information Recovery (p. 5)
> "Overly accurate answers to too many questions will destroy privacy in a spectacular way." The result (proved in Section 8.1 of the monograph, outside this capture) applies to all techniques for privacy-preserving data analysis, not just DP. The goal of algorithmic research on DP is to postpone this inevitability as long as possible.
^def-fundamental-law

### Why prior approaches fail (Sec. 1.1, pp. 6-10)

| Approach | Why it fails | Example in the text |
|---|---|---|
| **Anonymization / removing PII** | Rich records can be "named" by surprising attribute combinations; *linkage attacks* match anonymized records to identified records elsewhere | Massachusetts governor's medical records identified by matching medical encounter data to voter registration (zip code, date of birth, sex); Netflix Prize viewing histories identified via IMDb. DP neutralises linkage since it is a property of the access mechanism, unrelated to auxiliary information |
| **Re-identification is not the only risk** | Even without matching a record, membership plus a narrow set of diagnoses discloses | Urgent-care records list few distinct complaints on a given date; learning the neighbour visited narrows the diagnosis |
| **Queries over large sets** | *Differencing attack* | "How many people in the database have the sickle cell trait?" and "How many people, not named X, ... have the sickle cell trait?" together yield Mr. X's status |
| **Query auditing** | Refusing to answer can itself be disclosive; auditing can be computationally infeasible (undecidable for a rich enough query language) | Auditor watches for differencing pairs |
| **Summary statistics** | Reconstruction attacks against a database with a secret bit per person; a linear number of queries lets almost all bits be reconstructed unless sufficient inaccuracy is introduced | Genome-wide association studies: allele frequencies of a case group allow ruling an individual in or out (Homer et al.); NIH and Wellcome Trust ended public access to aggregate frequencies. A hard problem even for DP given $10^5$-$10^6$ measurements and few individuals |
| **"Ordinary" facts** | Revealing ordinary facts can harm a person followed over time | Mr. T regularly buys bread, then stops; analyst concludes Type 2 diabetes (right or wrong, he is harmed) |
| **"Just a few"** | Outliers may be exactly those who most need privacy; there is a social judgment on costs and benefits | For a single dataset, "just a few" privacy can be achieved by releasing a random subset of rows in full (Lemma 4.3, Sec. 4). DP is the alternative when this philosophy is rejected |

Bibliographic notes (p. 10): Sweeney linked voter records to medical data; Narayanan and Shmatikov attacked Netflix; Homer et al. introduced the forensic-mixture technique; first reconstruction attacks by Dinur and Nissim.

### Towards a definition (Sec. 2.2, pp. 12-15)

**Natural but unachievable goal.** Require that the adversary's prior and posterior views about an individual (before and after access to the database) not differ "too much". If the database teaches anything, this is unachievable: if the adversary's prior is that everyone has two left feet, access to the database (almost everyone has one left foot and one right foot) changes the view of any given respondent drastically. The smoking-causes-cancer example shows that even "nothing is learned about an individual" does not guarantee no harm; the culprit is auxiliary information (Mr. X smokes).

> [!theorem] Semantic security analogy and why it breaks (pp. 13-15)
> Semantic security for an encryption system: for every eavesdropper and all auxiliary information, an adversary simulator who has the auxiliary information but not the ciphertext guesses as well. Why the analogy to databases fails:
> 1. *Two parties, not three.* In a cryptosystem the legitimate receiver and eavesdropper are different people. In data analysis the analyst who receives informative answers is also the snooping adversary, so denying all information to the adversary means denying it to the analyst.
> 2. *Utility demands learning.* The mechanism must teach the analyst something unavailable to any simulator. Treat the database as a weak source of random bits from which one can extract a random pad; given as auxiliary information the encryption of a secret under that pad, the analyst (with the database) decrypts the secret but the simulator learns nothing, so semantic-security-style definitions cannot hold. (Result due to Dwork and Naor.)
^thm-no-semantic-security

The obstacle in both cases is *auxiliary information*, and separating reasonable from arbitrary auxiliary knowledge is problematic: "the analyst using a government database might be an employee at a major search engine company." A privacy guarantee must therefore hold regardless of auxiliary knowledge, which leads to the comparison-based definition in the next note.

## Examples

**Differencing attack in numbers (own illustration).** A database of 10,000 patients; $q_1$ counts the sickle-cell trait overall and $q_2$ counts it among everyone except Mr. X. Both queries are over sets of about 10,000 people, yet $q_1-q_2\in\{0,1\}$ is exactly Mr. X's bit. With Laplace noise of scale $1/\varepsilon$ added to each answer, the difference has noise standard deviation $2/\varepsilon$ and the bit is recoverable only to the extent $\varepsilon$ is large; the pair costs $2\varepsilon$ total under composition. Large query sets protect nothing by themselves; noise calibrated to *sensitivity* does.

```python
import numpy as np
rng = np.random.default_rng(5)
n, trait_x = 10_000, 1
others = (rng.random(n - 1) < 0.08).sum()
q1, q2 = others + trait_x, others               # exact answers: the attack
for eps in (0.1, 1.0, 5.0):
    z1 = q1 + rng.laplace(0, 1/eps, 20000); z2 = q2 + rng.laplace(0, 1/eps, 20000)
    guess = ((z1 - z2) > 0.5).astype(int)        # attacker thresholds the difference
    print(eps, (guess == trait_x).mean())        # attack accuracy decays toward 0.5+ as eps shrinks
```

## Connections

- **Marketing measurement.** The differencing attack is the everyday risk of slicing an aggregate report: overall conversions minus conversions excluding a segment isolates a small group or even an individual. Platform thresholding ("do not report cells under $k$") is the heuristic version of query auditing and inherits its disclosure problem. See [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]].
- The "smoking causes cancer" view is the right framing for measurement: population-level findings (an uplift estimate by audience) are intended outputs and are not privacy violations; protecting *participation* is the goal.

## See Also

- [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]
- [[Dwork 2006 - Motivation, Contributions and Related Work]] (the same story in the original paper)
- [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] (Dinur-Nissim reconstruction relation)
