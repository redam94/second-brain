---
title: "Rabiner 1989 - Speech Recognition Applications and Results"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/example
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. VI-IX and References, pp. 275-286; eqs 114-125; Figs 11-23; Tables 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]]"
  - "[[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]"
used_by:
aliases:
  - "HMM speech recognition results"
  - "Rabiner Table 1 digit error rates"
---

# Rabiner 1989 - Speech Recognition Applications and Results

> [!summary]
> Illustrates HMM theory on isolated-word recognition (word model per vocabulary item scored by Viterbi), connected-digit recognition by level building, and large-vocabulary sub-word HMMs. Table 1: on speaker-independent isolated digits, continuous-density HMMs (0.2-1.8% error) rival DTW templates (0.2-2.0%), VQ HMMs degrade (3.7%), and autoregressive HMMs are worst (1.8-4.1%). Table 2: connected digits, 0.78-2.94% error with unknown length and 0.35-1.75% with known length on test sets. Limitations of HMMs are listed at the end.

## Overview

The goal is to show how specific HMM aspects are applied, not to make the reader a speech-recognition expert. Components of a continuous recogniser (Fig. 11): feature analysis, unit matching (sub-word units: phones, diphones, syllables, or whole words), lexical decoding, syntactic analysis, semantic analysis. Silence handling: explicit speech detection, a silence model (signal = silence - speech - silence), or silence built into each unit model.

## Main Content

### Isolated word recognition (Sec. VI.B, Fig. 12)
$V$ words, one HMM $\lambda^v$ per word trained on $K$ occurrences; recognition computes $P(O\mid\lambda^v)$ for each model and picks $v^*=\arg\max_vP(O\mid\lambda^v)$ (eq. 114). With Viterbi scoring it costs about $V\cdot N^2\cdot T$ (e.g. $V=100$, $N=5$, $T=40$: $10^5$ computations).

### Feature analysis (Sec. VI.C-D, Figs 13-14)
LPC front end: pre-emphasis ($\alpha=0.95$), frame blocking ($N_A=300$ samples = 45 ms, spacing $M_A=100$), Hamming window, autocorrelation ($p=8$), LPC/cepstral analysis (Q=12), cepstral weighting $W_c(m)=1+\tfrac Q2\sin(\pi m/Q)$ (eq. 115), delta cepstrum over $2K+1=5$ frames (eq. 117), observation $Q_t=\{\hat c_t(m),\Delta\hat c_t(m)\}$ with 24 coefficients (eq. 118). Vector quantisation (codebook size $M$) maps vectors to indices; distortion vs $M$ flattens beyond $M\approx32$ (Fig. 14), so codebooks of 32-256 are used.

### Model choices (Sec. VI.E-G, Figs 15-20)
- Left-right models; number of states $N$: digit error rate is flat near a minimum at $N=6$ (Fig. 15).
- Continuous densities: up to $M=9$ mixtures per state with **diagonal** covariance (off-diagonal covariances are hard to estimate); Fig. 16 shows multimodal marginals so $M>1$ is needed.
- Floors: error is flat over $\epsilon\in[10^{-10},10^{-3}]$ for the minimum discrete density but rises sharply at $\epsilon=0$ (Fig. 17), a concrete case of zero-probability overfitting.
- **Segmental $k$-means** (Fig. 18-19): initialise, segment training sequences into states by Viterbi, cluster observations within states ($\hat c_{jm}$, $\hat\mu_{jm}$, $\hat U_{jm}$ as counts, means, covariances), estimate $a_{ij}$ by transition counts, reestimate, test model distance, repeat. About an order of magnitude faster than Baum-Welch with essentially the same likelihood values.
- **Duration:** instead of the $D^2$-cost explicit model, measure $p_i(d)$ from the Viterbi segmentation (Fig. 20) and add a postprocessor score $\log\hat P(q,O\mid\lambda)=\log P(q,O\mid\lambda)+\alpha_d\sum_{j=1}^N\log[p_j(d_j)]$ (eq. 119); performance as good as the theoretically correct duration model at negligible cost.

> [!example] Table 1: average digit error rates (%), isolated digits
> | Recogniser | Original training | TS2 | TS3 | TS4 |
> |---|---|---|---|---|
> | LPC/DTW | 0.1 | 0.2 | 2.0 | 1.1 |
> | LPC/DTW/VQ | - | 3.5 | - | - |
> | HMM/VQ ($M=64$) | - | 3.7 | - | - |
> | HMM/CD (5 mixtures) | 0 | 0.2 | 1.3 | 1.8 |
> | HMM/AR | 0.3 | 1.8 | 3.4 | 4.1 |
> Setup: 100 talkers $\times$ 100 occurrences of each digit; half male. TS2: the training talkers; TS3 and TS4: new sets of 100 talkers (50 male, 50 female). Interpretation: VQ degrades both template and HMM recognisers; continuous-density HMMs are comparable to DTW; autoregressive HMMs are poorer.
^ex-table1-speech

### Connected word recognition (Sec. VII, Figs 21-23, eqs 120-125)
Level building: a Viterbi match of the digit HMMs against the observation sequence at each level (word position in the string) with $P^v_\ell(t)$, $F^v_\ell(t)$ (best accumulated log-probability and backpointer); best model per frame $P^B_\ell(t)=\max_vP^v_\ell(t)$ (eq. 122). Digit HMMs: $N=5$ or 8 states (single talker) or $N=8$/10, continuous mixtures $M=3$ or 5 (single talker) or 9 (multi-talker), energy probability $p_j(\epsilon)$ with scale $\gamma_\epsilon=0.375$ (eq. 121), state duration $p_j(d)$, $1\le d\le D=25$, and word duration $p_v(D)=\mathcal N(\bar D_v,\sigma_v^2)$ (eq. 120). Word duration enters as $\hat P^v_\ell(t)=P^v_\ell(t)[\mathcal N(\tau_v(t),\bar D_v,\sigma_v^2)]^{\gamma_{wD}}K_2$ with $\gamma_{wD}=3.0$ (eqs 123-124); state durations enter in a postprocessor over $R^L$ candidate strings with $\gamma_{sD}=0.75$ (eq. 125).

> [!example] Table 2: connected digit error rates (% string errors)
> | Mode | Train UL | Train KL | Test UL | Test KL |
> |---|---|---|---|---|
> | Speaker trained (50 talkers) | 0.39 | 0.16 | 0.78 | 0.35 |
> | Multispeaker (50 talkers) | 1.74 | 0.98 | 2.85 | 1.65 |
> | Speaker independent (112/113 talkers) | 1.24 | 0.36 | 2.94 | 1.75 |
> UL: string length unknown a priori; KL: length known. Knowing the length roughly halves errors. Training uses segmental $k$-means with Viterbi digit segmentation.
^ex-table2-speech

### Large vocabulary (Sec. VIII) and limitations
Sub-word units (phoneme-like) as HMMs, words as concatenations, syntax as an embedded network; alternatives to exhaustive search include stack decoding and Viterbi beam search (handling 5000-word vocabularies with branching factor about 100). **Limitations (Sec. VIII.A):** (1) conditional independence of successive observations, $P(O_1..O_T)=\prod_tP(O_t)$ given states, "clearly inappropriate" where dependencies extend over several frames; (2) emission densities assumed to be mixtures of Gaussians or autoregressive densities; (3) first-order Markov assumption on states. Despite these, the model "has worked extremely well". **Summary (Sec. IX):** the paper focuses on physical explanations of the maths rather than drawn-out proofs.

## Relevance to marketing measurement

The speech material is a template for sequence-classification with one HMM per class (customer-journey archetypes), for training with limited data via tying and floors, and for combining duration scoring with Viterbi decoding. The limitation list is exactly what a marketing HMM user should check: conditional independence of observations given regime, first-order regime dynamics, and emission misspecification.

## Connections

Algorithms: [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]; model families: [[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]]; practice: [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]].

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]
