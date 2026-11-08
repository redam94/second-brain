---
title: "Krause 2008 - Related Work and Why Other Criteria Lack Guarantees"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 7, 8, 10, 11, pp. 255-266, 275-277"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
  - "[[Krause 2008 - Entropy versus Mutual Information Criteria]]"
used_by:
  - "[[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]"
aliases:
  - Disk model as submodular coverage
  - Information gain not submodular
---

# Krause 2008 - Related Work and Why Other Criteria Lack Guarantees

> [!summary]
> Surveys geometric and model-based placement, then proves what other criteria cannot do: the disk model is a special submodular case; entropy is submodular but arbitrarily non-monotone (Remark 12); information gain $I(A;U)$ is not submodular (Remark 13); Bayesian A-, D-, E-optimality fail the Nemhauser conditions (Remark 14). Future work: sequential strategies, submodular costs, constrained placements.

## Overview

Sections 7-8 position MI against geometric designs, experimental design (frequentist and Bayesian), active learning and feature selection, and give four "notes" that are proofs of what does and does not hold. Sections 10-11 close the paper.

## Main Content

**Geometric approaches (7.1.1, 8.1).** The disk model assumes each sensor observes everything within radius $r$. Coverage $F_D(A)=|\bigcup_{y\in A}D_y|$ is monotone submodular, so greedy covers within $1-1/e$. A GP with a compactly supported isotropic kernel generalises it: for the first sensors greedy MI also places disjoint "disks", but once disks overlap the GP model rewards overlap (better prediction in the intersection) while the disk model does not.

**Model-based criteria (7.1.2).** Entropy (Shewry and Wynn 1987), classical A-, D-, E-optimal design on the inverse moment matrix $M_A=(X_A^TX_A)^{-1}$, Bayesian design with utilities of the posterior (Chaloner and Verdinelli 1995), and the MI criterion of Caselton and Zidek (1984). In Bayesian linear regression with independent homoscedastic noise, maximising $H(A)$ is Bayesian D-optimal design (Sebastiani and Wynn 2000).

**Optimisation (7.2).** Heuristics (exchange methods, simulated annealing, forward/backward greedy) without guarantees; branch and bound for small instances; continuous relaxation of the design measure with rounding but no integrality bounds.

> [!theorem] Remark 12 (entropy is not approximately monotone)
> Under Lemma 5's assumptions, for any $\varepsilon>0$ there is a mesh width $\delta>0$ such that for every finer discretisation $\delta'\le\delta$, entropy violates monotonicity by at least $\varepsilon$ if $\sigma^2<1/(4\pi e)$. (Condition as printed; $H(y\mid A)$ can become arbitrarily negative as the mesh refines.) Entropy is submodular (Ko et al. 1995) but the Nemhauser theorem cannot be applied directly.
^thm-entropy-nonmonotone

> [!theorem] Remark 13 (information gain is not submodular)
> $IG(A)=I(A;U)=H(U)-H(U\mid A)$ is not submodular even for multivariate normals. *Counterexample:* $X=(X_1,X_2,X_3)$ zero-mean with $\Sigma=\begin{pmatrix}2&1&1\\1&1&0\\1&0&2\end{pmatrix}$, $U=\{X_3\}$. $X_2,X_3$ are marginally independent, so $X_2$ alone adds no information on $X_3$, but $X_2$ helps once $X_1$ is observed. Hence $IG(\{X_2\})-IG(\emptyset)<IG(\{X_1,X_2\})-IG(\{X_1\})$, contradicting diminishing returns.
^thm-ig-not-submodular

> [!theorem] Remark 14 (Bayesian A-, D-, E-optimality)
> Nemhauser's analysis applies to none of Bayesian A-, D-, E-optimality in general. (A) Take $y=\theta^TX+w$ with $X=\begin{pmatrix}1&1&2\\1&2&1\end{pmatrix}$ and $\theta=(\theta_1,\theta_2)$, $w=(w_1,w_2,w_3)$ independent $N(0,1)$; for $F(A)=\mathrm{tr}\Sigma_\theta-\mathrm{tr}\Sigma_{\theta\mid A}$ one has $F(\{y_1,y_2,y_3\})-F(\{y_1,y_2\})\ge F(\{y_1,y_3\})-F(\{y_1\})$, contradicting submodularity (verified here: $0.4167$ versus $0.3333$). (D) D-optimality equals entropy, so submodular but arbitrarily non-monotone (or equals IG with $U=\{\theta\}$ in the heteroscedastic case, then not submodular); (E) $\lambda_{\max}$ reduction fails: observing either $y_1$ or $y_2$ alone leaves $\lambda_{\max}=1$ ($F=0$) but both give $F>0$. For classical (non-Bayesian) discrete designs with fewer than $p$ observations, $M_A$ is infinite so designs are incomparable and greedy has no notion of improvement. Das and Kempe (2008) show variance reduction is submodular under conditional suppressor-freeness.
^thm-bayes-optimal-fail

**Related work in machine learning (7.4).** Feature selection and dimension reduction, active learning (MacKay), fast GP methods. **Relation to authors' previous work (7.5).** Builds on Krause, Singh and Guestrin conference papers and Krause and Guestrin (2005) budgeted submodular maximisation.

**Future work (Sec. 10).** (1) Because variance does not depend on observations, closed-loop and open-loop placements coincide for a known kernel; with kernel-parameter uncertainty a sequential strategy should help (Krause and Guestrin 2007 give a bound comparing the optimal sequential strategy with the best fixed placement). (2) Exploration strategies reducing parameter entropy, with sample complexity bounds. (3) Submodular cost functions (volume discounts): Narasimhan and Bilmes (2006) give a submodular-supermodular procedure without guarantees. (4) Constrained placements (routing trees, paths), partially addressed in Krause et al. (2006).

**Conclusions (Sec. 11).** NP-completeness; $(1-1/e)$ greedy; online bounds; lazy evaluation and local kernels; robustness; MI often beats entropy and classical criteria; greedy is near optimal where optimum is computable.

## Examples

**Information-gain counterexample numerically (verified here).** For the $\Sigma$ above and $U=\{X_3\}$: $IG(\{X_2\})-IG(\emptyset)=0$ because $\mathrm{Cov}(X_2,X_3)=0$, while $IG(\{X_1,X_2\})-IG(\{X_1\})=0.2027$ nats, so adding $X_2$ is worth strictly more after $X_1$ than before.

## Connections
- Why this matters for value-of-information work: EVSI and expected-posterior-variance objectives for siting are not automatically submodular, so a greedy guarantee needs checking rather than assuming; E89 checks "simulated joint value against summed gains".
- See [[Expected Information Gain]] for the Bayesian experimental design view, [[Bayesian Experimental Design - Overview]].

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
