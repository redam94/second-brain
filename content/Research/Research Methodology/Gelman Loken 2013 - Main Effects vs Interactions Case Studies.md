---
title: "Gelman Loken 2013 - Main Effects vs Interactions Case Studies"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/replication-crisis
  - type/example
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Gelman & Loken 2013, §2 (§2.1 fat arms, §2.2 ESP, §2.3 menstrual cycle and vote intentions), pp. 4-8"
date_ingested: 2026-10-13
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]]"
  - "[[Type S and Type M Errors]]"
used_by:
  - "[[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]]"
  - "[[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]]"
  - "[[Garden of Forking Paths]]"
aliases:
  - "Arm circumference and redistribution example"
  - "Bem ESP forking paths example"
  - "Ovulation and vote intention example"
  - "One-to-many mapping from scientific to statistical hypotheses"
---

# Gelman & Loken (2013) §2 — Main Effects vs Interactions: Three Case Studies

> [!summary]
> Section 2 shows how the choice between reporting a **main effect** and an **interaction** is itself a fork. (1) Petersen et al. (2013) report an arm-circumference × SES interaction with no main effect, omit the age × SES interaction, and drop scale items until the interaction becomes significant. (2) Bem (2011) finds precognition for erotic but not non-erotic pictures; his reply that the hypothesis was pre-specified ignores that **one scientific hypothesis maps to many statistical hypotheses**. (3) Durante et al. (2013) report opposite ovulation effects for single vs married women, a claimed 20-point vote swing that is substantively implausible, with flexible relationship-status coding.
^summary

## Overview

§2 groups three published papers whose significance was reached through "a sort of invisible multiplicity" (p. 8). These were data-dependent choices about which effect to treat as the finding. The authors repeatedly stress that they are not alleging fishing: "it is completely reasonable for good scientists to refine their hypotheses in light of the data" (p. 4).

## Main Content

### §2.1 Fat arms and political attitudes (pp. 4-5)

> [!example] Petersen, Sznycer, Sell, Cosmides & Tooby (2013), *Psychological Science*
> **Claim.** Upper-body strength in men, interacted with socioeconomic status (SES), predicts attitudes to economic redistribution. As quoted on p. 4, the authors wrote that "These effects were replicated across cultures and, as expected, found only among males." So the sex restriction was presented as a prediction ("as expected"), not as a finding discovered in the data. That framing is itself a fork: a male-only effect and an effect in both sexes could each have been given a theoretical story.
>
> **Samples.** The supplement passages quoted on p. 5 name three samples: **Denmark** (the source of the original redistribution scale), the **US** and **Argentina**. Gelman & Loken say "two of their three studies were of college students" (p. 4) and refer to "the two countries where the samples were college students" (p. 4). They do not say which two countries those were, so this note does not name them.
>
> **Problems noted** (quoting Gelman 2013a, *Slate*, then extending):
> 1. **Proxy language.** Two of three studies used college students, and strength was not measured; **arm circumference** was. "Own your research choices!": say "arm circumference" and "male students" (p. 4).
> 2. **Interaction without main effect.** There was no significant main effect of arm circumference. The finding is that the arm–redistribution correlation was higher among high-SES men. Had a main effect appeared (in either direction), "we are sure they could have come up with a good story for that, too". With neither, other interactions were available, e.g. having older siblings (which "was no joke", since family relations are central in evolutionary-psychology explanations, p. 4).
> 3. **Age confound.** In young men, arm circumference may proxy for **age**. In the analyses "from the two countries where the samples were college students" (p. 4), adding age to the model makes the arm-circumference coefficient go away ("goes away", p. 4). The age check is reported only for those two student samples, not for the third sample. The headline interaction does not adjust for **age × SES**, although political attitudes and partisanship change around college age (Mullainathan & Washington 2009). Attributing this to upper-body strength "would be more than a bit of a stretch" (p. 4).
> 4. **Measurement degrees of freedom** (from Petersen et al.'s supplement, p. 5):
>    - With the Danish scale applied to US subjects, the interaction is **not significant**. Items 5 and 6 had inter-item correlations of .11 to .30 and were judged "somewhat unreliable in a US context". After removing them, $\alpha = .72$ and the interaction "becomes significant."
>    - The Argentina redistribution scale "has a low α-level and, hence, is affected by a high level of random noise." Petersen et al. then wrote: "Hence, the consistency of the results across the samples is achieved in spite of this noise" (supplement as quoted on p. 5). A subscale "with an acceptable α = .65" was formed from items 1 and 4.
>    - **Why that sentence matters.** Petersen et al. present the noise as making the cross-sample consistency *more* impressive, as if a result that survives noise must be strong. Gelman & Loken argue the opposite in §1.2 and §4. In small, noisy samples, a significant estimate selected from the garden of forking paths tends to exaggerate the effect, so noise does not make a significant result more credible. The paper does not answer this specific sentence; it only comments: "Again, these decisions may make perfect sense but they are clearly contingent on data" (p. 5).
>
> "Again, these decisions may make perfect sense but they are clearly contingent on data" (p. 5).
^ex-gl-fat-arms

**The authors' position on interactions (p. 5).** They value interactions (Gelman & King 1994; Gelman 2004) and often find them only after seeing data (Gelman et al. 2007, *Rich state, poor state*). "The point is that claims of interactions need to make sense of their own accord. It is not enough to rely on statistical significance." Noisy data plus a nonrepresentative sample mean "the statistically significant p-value cannot be taken at face value."

### §2.2 Appearance or non-appearance of ESP (pp. 5-6)

**Framing (p. 5).** Bem (2011) claimed evidence for extrasensory perception in college students. The article "got huge media attention after being published in a top journal despite the misgivings of many psychologists." The authors note that "After much criticism and some failed attempts at replications, the furor has mostly subsided, but this example remains of interest, partly because it is an example of how generally-accepted research practices can be used to find statistical significance anywhere" (p. 5).

> [!example] Bem (2011), *Feeling the future*, Experiment 1
> **Setup.** Nine experiments with many significant results. In Experiment 1, 100 students guessed the future left/right position of images. The hit rate was significantly above chance for **erotic** pictures but not for **non-erotic** pictures.
>
> **Alternative findings that would also have been reported** (Gelman 2013a, quoted p. 5-6):
> - All images above chance, which "certainly would have been reported."
> - Non-erotic higher, if erotic images are seen as distracting.
> - Second half better than first ("learning") or first better than second ("fatigue").
> - Sex differences, e.g. men better with erotic and women with romantic non-erotic images. Bem reports "no significant sex differences," but such a difference "could have been presented as convincing evidence."
>
> The analogy offered is Bennett et al. (2009), "significant" patterns in an MRI of a **dead salmon**, a cautionary example for multiple comparisons in brain imaging (p. 5).
^ex-gl-bem

**Earlier criticism.** The authors note that "This criticism has been made by others (Wagenmakers et al., 2011), and Bem did reply to it" (p. 6). Wagenmakers, Wetzels, Borsboom & van der Maas (2011), *Why psychologists must change the way they analyze their data: The case of psi*, was the comment on Bem (2011) in the same journal. The Bem-Utts-Johnson piece below is the reply to that comment.

**Bem's reply.** Bem, Utts & Johnson (2011), in a section titled "The Hypotheses Were Not Exploratory," said the erotic-image hypothesis derived from earlier "presentiment" studies (e.g. Radin 1997) showing anomalous physiological arousal *before* erotic images. Non-erotic trials were an open question, and "there was no data exploration that required adjustment for multiple analyses" (p. 6).

> [!quote] Bem, Utts & Johnson (2011), as quoted on p. 6
> "The important point here is that the central psi hypothesis about erotic images was unambiguous, directional, based on previous research, not conditional on any findings about trials with nonerotic images, and was not formulated from a post hoc exploration of the data. In fact, there was no data exploration that required adjustment for multiple analyses in this or any other experiment."
^quote-gl-bem-reply

The four adjectives in this defense (unambiguous, directional, prior-based, not conditional on the non-erotic trials) are the claims the rejoinder below disputes. Each is a statement about the *scientific* hypothesis, and none of them fixes the *statistical* one.

**Gelman & Loken's rejoinder (p. 6).** They have "no reason to disbelieve the above description of motivations". Even so, the scientific hypothesis corresponds to **multiple statistical hypotheses**. If subjects had done significantly *worse* on erotic pictures, that too fits: anomalous arousal could interfere with precognition. And "a data-dependent analysis will not necessarily look 'post hoc'". A sex-by-image-type pattern would have looked like a natural implication of the literature on sex differences in response to erotic stimuli.

> [!definition] One-to-many mapping (§2.2, p. 6)
> "There is a one-to-many mapping from scientific to statistical hypotheses." Stating the *scientific* hypothesis in advance does not fix the *statistical* hypothesis $\varphi$. Several distinct statistical outcomes, including outcomes in opposite directions, can each be read as confirmation.
^def-gl-one-to-many

### §2.3 Menstrual cycle and vote intentions (pp. 6-8)

> [!example] Durante, Arsena & Griskevicius (2013), *Psychological Science* 24
> **Claim.** Their abstract, quoted on pp. 6-7, describes "two studies with large and diverse samples". In these studies ovulation made **single** women more liberal, less religious and more likely to vote Obama, and made **married** women more conservative, more religious and more likely to vote Romney (2012 US election).
>
> **Issues raised:**
> 1. **Causal language on a between-subject design.** Each woman was surveyed once. There were no repeated measures, so no woman was compared with herself across cycle days (set aside by the authors, p. 7).
> 2. **Interaction as the headline.** The single/married interaction fits the theory ("ovulation should lead women to prioritize securing genetic benefits from a mate possessing indicators of genetic fitness"). So would other main effects and interactions. Durante et al. themselves note the hypothesis "is consistent with the idea that women should support the more liberal candidate". The *reverse* interaction also fits a story in which ovulation pulls preferences away from party ID toward "more fundamental biological imperatives" (p. 7).
> 3. **"Is this nitpicking?" No, for two reasons** (p. 7):
>    - The claimed effect, roughly a **20 percentage-point** difference in vote intention across cycle phases, is **substantively implausible**: polling shows very few people change vote intention during a general-election campaign. With inexact, survey-based fertility measurement, power is very low, so the observed difference is "likely attributable to noise" (Button et al. 2013).
>    - Statistical significance is central to the paper's argument and to its publication, so the multiplicity of possible interactions matters.
> 4. **Further forks** (p. 7): several political outcomes (attitudes as well as vote intention); covariates age, ethnicity and parenthood; and relationship-status coding. The abstract says "single" vs "married", but the text classifies "engaged, living with a partner, or married" as *In a Committed Relationship* and all others (e.g. "not dating, dating") as *Single*. Alternatives that "would make just as much theoretical sense" include mothers vs non-mothers, whites vs non-whites, other relationship splits, and *keeping* women in the last days of the cycle (pp. 7-8).
^ex-gl-durante

**"Large and diverse" vs "small sample" (pp. 6-7 vs p. 9).** Durante et al. call their data "two studies with large and diverse samples" (abstract, quoted pp. 6-7). When Gelman & Loken return to the same study in §3.1, they call it "a between-subjects study on a small sample of internet participants" (p. 9). The two descriptions differ because of what "large" has to mean here. A between-subjects comparison of a small effect, with a noisy survey-based measure of fertility, needs far more respondents than a typical psychology study to have useful power. By that standard Gelman & Loken treat the sample as small (see the low-power argument in issue 3 above and [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]]).

> [!quote] Why it doesn't feel like choice (p. 7)
> "...from the researchers' perspective with their single data set, these might not seem like choices at all: it can be perfectly possible to take the data and take a series of steps that flow naturally from theory—not realizing that, with a different data set, other choices could be made..."
^quote-why-it-doesn-t-feel

### Pattern across the three cases

| Case | Reported finding | Forks the authors identify | Extra concern |
|---|---|---|---|
| Petersen et al. 2013 | arm × SES interaction, no main effect | main vs interaction; which interaction; scale items dropped (α .72, .65); covariates (age, age × SES) | proxy measure; student sample; age confound |
| Bem 2011 | erotic-only precognition | stimulus type; halves of session; sex differences; direction of effect | prior implausibility; failed replications |
| Durante et al. 2013 | single vs married opposite effects | outcome measure; covariates; relationship coding; exclusion of cycle days | between-subject causal language; implausible 20-pt swing; low power |

## Examples
The three case studies are the worked examples of this section: arm circumference [[#^ex-gl-fat-arms]], Bem's ESP [[#^ex-gl-bem]] and ovulation and voting [[#^ex-gl-durante]]. The comparison table above sets them side by side.

## Connections
- Why significant estimates from low-power studies exaggerate: [[Type S and Type M Errors]].
- Partial pooling of subgroup effects as the principled alternative to choosing one interaction: [[Partial Pooling as Multiple Comparisons Correction]], [[Hierarchical Models]].
- The age-confounding point is a covariate-adjustment issue; compare [[Table 2 Fallacy]] and [[Logic of Regression Adjustment]].
- In marketing analytics, the equivalent is reporting a channel's lift only in the segment or season where it reached significance. Segment-level effects should be modeled jointly rather than cherry-picked (see [[Model Selection and Exploratory Analysis]]).

## See Also
- [[Gelman Loken 2013 - Garden of Forking Paths - Overview]]
- [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] — the companion ovulation study
- [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]] — Bem's number reread
