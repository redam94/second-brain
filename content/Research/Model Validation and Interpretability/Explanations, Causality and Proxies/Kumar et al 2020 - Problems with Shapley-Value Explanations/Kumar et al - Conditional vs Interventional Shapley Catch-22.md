---
title: Kumar et al - Conditional vs Interventional Shapley Catch-22
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/explainable-ai
  - topic/causal-inference
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Kumar et al 2020 - Problems with Shapley-Value-Based Explanations.pdf]]"
source_location: "Kumar et al. (2020) §3 intro (p.3); §3.1 indirect-influence debate (p.3); §3.1.1 Issues with conditional distributions, eq. (6)-(13) and Frye et al. asymmetric Shapley values (p.3-4); §3.1.2 Issues with interventional distributions and Figure 1 (p.5)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Kumar et al 2020 - Problems with Shapley-Value Explanations"
doc_type: paper
depends_on:
  - "[[Shapley Values and SHAP Value Functions]]"
used_by:
  - "[[Kumar et al - Shapley Values in Normative Model Evaluation]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
aliases:
  - Indirect influence debate (Kumar et al)
  - Kumar redundant-feature Shapley example
  - Kumar out-of-distribution Shapley problem
  - Asymmetric Shapley values (Frye et al, as discussed by Kumar)
---

# Kumar et al - Conditional vs Interventional Shapley Catch-22

> [!summary]
> §3.1 of Kumar et al. (2020): choosing a value function for Shapley feature attribution is "a catch-22". The **conditional** value function credits features with *no interventional effect* if they predict features the model uses (good for proxy audits, "paradoxical" for others), needs $2^d$ conditional distributions, and — worse — makes attributions depend on which redundant features are counted as players: adding an exact copy $C$ of feature $B$ changes $A$'s attribution even though the function is unchanged on the data (eq. 6-13). Fixes such as **asymmetric Shapley values** require causal knowledge. The **interventional** value function avoids indirect influence but evaluates $f$ on **off-manifold** points (Figure 1; the $X_3=X_1X_2$ example), so explanations reflect how $f$ extrapolates and can be gamed (Slack et al. 2020).
^summary

## Overview

The paper's §3 opens: these problems "arise from the estimation procedures that are in use as well as the fundamental axiomatic structure of Shapley values" (p.3). §3.1 handles the first family — those that come from choosing between the two value functions defined in [[Shapley Values and SHAP Value Functions#^def-conditional-value|eq. 4]] and [[Shapley Values and SHAP Value Functions#^def-interventional-value|eq. 5]]. §3.2 (additivity, common to both) is in [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]].

## Main Content

### 3.1 The indirect-influence debate (p.3)

> [!definition] Definition: Variable with no interventional effect (§3.1, p.3)
> Let $f$ have domain $\mathbb R^d$. Feature $i$ has **no interventional effect** if $f(x)=f(x')$ whenever $x_j=x'_j$ for all $j\neq i$ — intervening on $x_i$ alone never changes the output.
^def-no-interventional-effect

Should such a feature count as an "input"? One could define $f'$ on $\mathbb R^{d-1}$ that reproduces $f$ exactly. But what if, "in the relevant input space, $x_i$ is a statistical proxy for some $x_j$ which does affect the output of $f$?" (p.3).

Two positions:

| Position | Proponent | Value function it favours | Treatment of a proxy with no interventional effect |
|---|---|---|---|
| Information-theoretic: "the information content of a feature can be estimated by trying to predict it from the remaining features" | Adler et al. (2018), auditing indirect influence (e.g. redlining) | Conditional | Non-zero credit: if $i$ predicts features in $\bar S$, then $\mathbb E[f(X)\mid X_{S\cup i}=x_{S\cup i}]\neq\mathbb E[f(X)\mid X_S=x_S]$, so $\Delta(i,S)\neq0$ — "a positive thing" for proxy detection |
| Indirect influence is paradoxical | Merrick & Taly (2019) | Interventional | Interventional methods never attribute influence to such an $x_i$ (shown by Merrick & Taly) — seen as desirable |

Note on wording: the Merrick & Taly entry is more than a position. The source says they "criticize the capacity to attribute indirect influence as being paradoxical, and **show** that interventional methods will never attribute attribute influence to an $x_i$ which has no interventional effect on $f$, which they see as a desirable property" (p.3; "attribute attribute" is duplicated in the original). The *criticism* is a normative stance. The *never attribute* claim is a demonstrated property, stated formally below.

> [!theorem] Property: Interventional Shapley gives zero to a variable with no interventional effect (Merrick & Taly 2019, as reported in §3.1, p.3)
> Let feature $i$ have no interventional effect on $f$ ([[#^def-no-interventional-effect]]), and let $v$ be the interventional value function $v_{f,x}(S)=\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$ (eq. 5), where $\mathcal D$ does not depend on $x_S$ and its marginal over the features outside $S\cup i$ is the same whether or not $i\in S$. Examples are the product of marginals (QII) and the marginal joint of $X_{\bar S}$ (KernelSHAP). Then $\phi_v(i)=0$, whatever the correlation between $X_i$ and the other features.
>
> *Proof sketch (our derivation; the paper only cites the result).* For any $S\subseteq D\setminus\{i\}$, $v(S\cup i)=\mathbb E_{\mathcal D}[f(x_{S\cup i},X_{\overline{S\cup i}})]$ and $v(S)=\mathbb E_{\mathcal D}[f(x_S,X_{\bar S})]$. Couple the two expectations so that the coordinates other than $i$ share the same draw. The integrands then differ only in coordinate $i$ ($x_i$ vs a draw of $X_i$). Because $f$ does not depend on coordinate $i$, they are equal pointwise. So $\Delta_v(i,S)=0$ for every $S$, and the **dummy axiom** gives $\phi_v(i)=0$. The same argument fails for the conditional game: conditioning on $X_i=x_i$ changes the *distribution* of $X_{\bar S}$, so $\Delta_v(i,S)\neq0$ whenever $X_i$ is informative about the features $f$ uses. This is the Adler et al. row above.
^thm-interventional-null-player

**Adler et al.'s follow-on and the conditional value function (§3.1, p.3).** Beyond proxy detection, the paper notes: "While Adler et al. go on to analyze how the accuracy of a model depends on indirect information, the conditional value function aligns with this information-theoretic principle as well" — i.e. the conditional game measures what a feature *tells you* about the others (including how much predictive accuracy rides on information routed through proxies), not what intervening on it would *do*. This is why the conditional Shapley value "may attribute influence to features with no interventional effect, a positive thing from the perspective of Adler et al." (p.3).

> [!theorem] Claim: The value-function choice is a catch-22 (§3.1, p.3)
> "Unfortunately, the decision between the two types of value functions is a catch-22. Both methods introduce serious issues: Choosing a conditional method requires further modeling of how the features are interrelated, which we describe in 3.1.1, while choosing an interventional method induces an 'out-of-distribution' problem which we address in 3.1.2."
^thm-catch-22

### 3.1.1 Issues with conditional distributions (p.3-4)

Two difficulties:

1. **Computation.** Exact conditional Shapley values require $2^d$ different multivariate (conditional) distributions, so substantial approximation or modelling is needed. "The TreeSHAP algorithm estimates the conditional expectations of any tree ensemble directly, without sampling, using information computed during model training. The algorithm utilizes information about the training instances which fall into each leaf node to model each conditional distribution" (p.3). It is, however, limited: "It is not, however, set up to attribute influence to variables without an interventional effect, as the trees contain no information about the distribution of variables not in the model" (p.3-4). For arbitrary models one must model data relationships not captured by $f$ itself; Aas et al. (2019) and Frye et al. (2019) generate in-distribution samples for this.
2. **Choice of players.** Influence "can be computed on an arbitrarily large set of features", so the modeller must decide which features are players and which are redundant — and because attributions must sum to $f(x)$, the choice changes the explanation.

> [!theorem] Result: Redundant players change everyone's attribution (§3.1.1, eq. 6-13, p.4)
> **Setup.** Features $A,B$ and a redundant copy $C$ with $P(X_C=X_B)=1$; a model $f$ is trained on all three. Under the conditional value function
> $$
> \mathbb E[f(X)\mid X_B,X_C]=\mathbb E[f(X)\mid X_B]=\mathbb E[f(X)\mid X_C] \tag{6-7}
> $$
> $$
> \mathbb E[f(X)\mid X_A,X_B,X_C]=\mathbb E[f(X)\mid X_A,X_B]=\mathbb E[f(X)\mid X_A,X_C] \tag{8-9}
> $$
> so $v_{f,x}(B)=v_{f,x}(C)=v_{f,x}(BC)$ and $v_{f,x}(AB)=v_{f,x}(AC)=v_{f,x}(ABC)$. For any instance $x$:
> $$
> \phi_v(A)=\tfrac13\Delta_v(A,\emptyset)+\tfrac23\Delta_v(A,BC) \tag{10}
> $$
> $$
> \phi_v(B)=\phi_v(C)=\tfrac13\Delta_v(B,\emptyset)+\tfrac16\Delta_v(B,A) \tag{11}
> $$
> **Two-player version.** Define $f'(x_A,x_B)=f(x_A,x_B,x_B)$. Since $x_B=x_C$ on the data, $f'(x)=f(x)$: "It is effectively the same model for all in-distribution data points, so the games $v_{f,x}$ and $v_{f',x}$ are the same for all subsets of variables." Restricting the explanation to two players gives
> $$
> \phi'_v(A)=\tfrac12\Delta_v(A,\emptyset)+\tfrac12\Delta_v(A,BC) \tag{12}
> $$
> $$
> \phi'_v(B)=\tfrac12\Delta_v(B,\emptyset)+\tfrac12\Delta_v(B,A) \tag{13}
> $$
> (in eq. 12, $\Delta_v(A,BC)=\Delta_v(A,B)$ because $v(AB)=v(ABC)$ and $v(B)=v(BC)$).
>
> **Conclusion.** $\phi'_v(B)$ "is neither equal to $\phi_v(B)$, its assigned influence in the 3-variable setting, nor $\phi_v(B)+\phi_v(C)$, the 'total' influence of the two identical variables in the 3-variable setting. The relative apparent importances of A and B thus depend on whether C is considered to be a third feature, even though the two functions are effectively the same." (p.4)
>
> **Proof sketch.** Enumerate the $3!=6$ orderings. $A$ first (2 orderings) contributes $\Delta(A,\emptyset)$; $A$ second (after $B$ or after $C$, 2 orderings) contributes $\Delta(A,B)=\Delta(A,C)=\Delta(A,BC)$ by the equalities above; $A$ last (2 orderings) contributes $\Delta(A,BC)$ → eq. 10. $B$ first (2) gives $\Delta(B,\emptyset)$; $B$ after $A$ only (1) gives $\Delta(B,A)$; $B$ after $C$ only (1) gives $v(BC)-v(C)=0$; $B$ last (2) gives $v(ABC)-v(AC)=0$ → eq. 11. With two players each ordering has weight $\tfrac12$ → eq. 12-13.
^thm-redundant-players

> [!example] Fairness-audit consequence (§3.1.1, p.4)
> "Suppose, for instance, that B is a sensitive feature, and C is a non-sensitive feature that happens to perfectly correlate with it. Two different 'fairness' audits of the same function would come out with quantitatively different results."
^ex-fairness-audit

**Causal fix and its cost — asymmetric Shapley values (p.4).** Frye et al. (2019) propose using causal knowledge: "If $x_i$ is known to be the deterministic causal ancestor of $x_j$, one might want to attribute all the importance to $x_i$ and none to $x_j$." They discount fully redundant causal descendants and **relax the symmetry axiom**: instead of averaging over all permutations, a *quasivalue* averages only over some — e.g. orderings placing causal ancestors before descendants.

> [!definition] Definition: Asymmetric Shapley value (Frye et al. 2019, as summarised in §3.1.1, p.4)
> Given a (possibly partial) causal ordering of features, average $\Delta_v(i,S_{i,\pi})$ only over permutations $\pi$ consistent with it (ancestors before descendants), rather than all of $\Pi$. Fully redundant descendants then receive zero attribution and do not change the others': in the $A,B,C$ example, if $C$ is a causal descendant of $B$, the asymmetric Shapley values of $A$ and $B$ under $f'$ equal those under $f$.
>
> A fully specified causal model is not required to use this method: they "span the data-agnosticism continuum in the sense that they allow any knowledge about the data, however incomplete, to be incorporated into an explanation of the models behaviour" (p.4; verbatim, "models" without apostrophe as printed). Kumar et al.'s objection: Frye et al.'s own results show "the sensitivity of the game theoretic approach to the amount of prior knowledge about the relative agency of each feature, which we consider a significant limitation of the approach."
^def-asymmetric-shapley

The authors close §3.1.1: "There are thus both practical and epistemological challenges with computing the Shapley values of games with a conditional value function" (p.4). The causal prerequisites are those of [[DAGs and Causal Identification]].

### 3.1.2 Issues with interventional distributions (p.5)

Those who reject indirect influence may prefer interventional value functions. "These methods, however, are highly sensitive to properties of the model which are not relevant to what it has learned about the data it was trained on." They "fundamentally rely on evaluating a model on out-of-distribution samples" (p.5).

> [!definition] Figure 1 — conditional vs interventional sampling (p.5)
> Caption (paraphrased): samples that might be drawn to estimate $\mathbb E[f(1,Y)]$ and $\mathbb E[f(X,2)]$ to explain $f(1,2)$ for some $f$, given correlated Gaussian $X,Y$, depending on whether the expectation is taken over $X\mid Y=2$ and $Y\mid X=1$ (left) or over $X$ and $Y$ (right).
>
> **What the two panels show** (vault gloss, eyeballed from a render of p.5 — the paper gives no data, correlation or sample size behind the figure, so all ranges below are approximate): grey points are a positively correlated Gaussian cloud ($x$ roughly $-8$ to $10$, $y$ roughly $-4$ to $5$); the red dot is the explained point $(1,2)$; blue crosses are the sampled evaluation points along the horizontal line $y=2$ and the vertical line $x=1$.
> - **Left, "Conditional":** the crosses stay inside the cloud — $X\mid Y=2$ ranges over about $x\in[0,7]$ and $Y\mid X=1$ over about $y\in[-1.5,2]$.
> - **Right, "Marginal":** the crosses cover the full marginal ranges — $x$ from about $-8$ to $7$ at $y=2$ and $y$ from about $-3$ to $3.5$ at $x=1$ — so many evaluation points (e.g. $x=-6,\,y=2$) lie where there is no training data.
^fig-1

> [!example] Example: Engineered product feature (§3.1.2, p.5)
> **Setup.** Training data with $X_1,X_2\sim N(0,1)$ and an engineered feature $X_3=X_1X_2$.
>
> **Computation.** $v_{f,x}(\{1,2\})$ requires $\mathbb E[f(x_1,x_2,X_3)]$ over a distribution for $X_3$ that does not depend on $x_1,x_2$. So $f$ is almost certainly evaluated at $\{x_1,x_2,x'_3\}$ with $x'_3\neq x_1x_2$ — "well outside the domain of the actual data distribution."
>
> **Interpretation.** "The model $f$ has never seen an example like this in training, and has therefore not learned much about this part of the feature space. Its predictions on this feature space are not necessarily relevant to the task of explaining an in-distribution sample, yet the explanations will be affected by them."
^ex-engineered-feature

Supporting literature (p.5):
- **Hooker & Mentch (2019)**: permutation-based importance substitutes values into $\bar S$ that are unlikely or impossible given $S$, forcing extrapolation; importance is "highly sensitive to the way in which the model extrapolates to these edge cases" — see [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Slack et al. (2020)**: models that discriminate on a protected feature for in-distribution inputs but behave differently on KernelSHAP's out-of-distribution samples "simulate 'fairness'" in explanations: "By manipulating the model's behavior on unfamiliar parts of the feature space, they can twist the explanations on the familiar part to their will."

> [!theorem] Claim: Interventional attribution is inherently misleading (§3.1.2, p.5)
> "These challenges illustrate that intervening on a subset of features of a data case before applying a model trained on a sample from a certain distribution is inherently misleading."
^thm-ood-misleading

## Examples

> [!example] Example: Numerical version of eq. 10-13
> **Setup.** $f(x_A,x_B)=x_Ax_B$ (with $C\equiv B$ also fed to the three-feature version), $X_A,X_B$ independent, $\mathbb E X_A=\mathbb E X_B=1$. Explain $x=(3,2)$: $f(x)=6$, $v(\emptyset)=1$, $v(A)=3$, $v(B)=2$, $v(AB)=6$.
>
> **Two players (eq. 12-13).** $\Delta(A,\emptyset)=2$, $\Delta(A,B)=4$, $\Delta(B,\emptyset)=1$, $\Delta(B,A)=3$ → $\phi'(A)=3$, $\phi'(B)=2$ (sum $5$).
>
> **Three players (eq. 10-11).** $\phi(A)=\tfrac13\cdot2+\tfrac23\cdot4=\tfrac{10}{3}\approx3.33$; $\phi(B)=\phi(C)=\tfrac13\cdot1+\tfrac16\cdot3=\tfrac56$; the $B$-block totals $\tfrac53\approx1.67$ (sum $5$).
>
> **Interpretation.** The function is unchanged on the data, yet $A$'s share rises from 60% to 67%. In marketing feature sets near-duplicates are routine — spend and impressions of one channel, two encodings of the same holiday calendar, a brand-search term that tracks TV — so a channel's SHAP share depends on how many proxies of each driver were included.
^ex-numeric-redundancy

> [!example] Example: Indirect influence with correlated Gaussians (illustration of §3.1)
> **Setup.** $(X_1,X_2)$ standard bivariate normal with correlation $\rho$; the model uses only $x_1$: $f(x)=x_1$. So $x_2$ has no interventional effect.
>
> **Conditional game.** $v(\emptyset)=0$, $v(1)=x_1$, $v(2)=\mathbb E[X_1\mid X_2=x_2]=\rho x_2$, $v(12)=x_1$. Then $\phi(1)=\tfrac12x_1+\tfrac12(x_1-\rho x_2)=x_1-\tfrac{\rho}{2}x_2$ and $\phi(2)=\tfrac12\rho x_2+\tfrac12(x_1-x_1)=\tfrac{\rho}{2}x_2$.
>
> **Interventional game.** $v(2)=\mathbb E[f(X_1,x_2)]=0$, so $\phi(1)=x_1$, $\phi(2)=0$.
>
> **Interpretation.** With $\rho=0.9$, $x=(1,1)$: conditional gives $(0.55,0.45)$ — nearly half the credit to a variable the model ignores; interventional gives $(1,0)$. Neither is "wrong"; they answer different questions (Adler et al. vs Merrick & Taly).
^ex-correlated-gaussians

> [!example] Example: Off-manifold evaluation in weekly media data (illustration)
> With 52-156 weekly rows, TV GRPs and branded-search clicks are often highly correlated. KernelSHAP for a tree model evaluates weeks with heavy TV and near-zero search (or the reverse) that never occurred; tree models extrapolate flat outside the data, so the attribution partly reflects arbitrary split placement in empty regions — the [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview|permute-and-predict]] pathology in Shapley form.
^ex-weekly-media-ofm

## Connections

- [[Shapley Values and SHAP Value Functions]] — definitions of both value functions and Table 1.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — argues the interventional choice is conceptually correct for attributing a model's output; Kumar et al. accept that it avoids indirect influence but stress the off-manifold cost.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — the conditional remedy in permutation importance, with the same "what counts as redundant" problem.
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — estimator artefacts in importance rankings.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — redundancy is one reason many equally accurate models assign reliance differently.
- [[Garden of Forking Paths]] / [[Researcher Degrees of Freedom]] — choice of players and value function are analyst degrees of freedom.

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]
- [[Kumar et al - Additivity Axiom Limits for Non-Additive Models]] — the problem common to both value functions.
- [[DAGs and Causal Identification]] — the causal knowledge asymmetric Shapley values require.
- [[Strobl 2008 - Permutation Importance Null Hypotheses]] — same marginal-vs-conditional choice stated as permutation null hypotheses
