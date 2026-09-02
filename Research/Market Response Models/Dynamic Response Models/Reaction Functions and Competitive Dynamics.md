---
title: "Reaction Functions and Competitive Dynamics"
aliases:
  - "Competitive Reaction Marketing"
  - "Cournot Reaction Function"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/competitive-dynamics
  - topic/game-theory
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 4"
chapter: "4"
status: complete
doc_type: concept
source_location: "Ch. 4, Sec. 4.4, pp. 166-172"
depends_on:
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Market Share Models]]"
used_by:
  - "[[Design of Dynamic Response Models]]"
  - "[[Multivariate Persistence and Cointegration]]"
  - "[[Empirical Causal Ordering]]"
  - "[[Price and Distribution Effects]]"
date_ingested: 2026-04-11
folder: "Market Response Models/Dynamic Response Models"
---

# Reaction Functions and Competitive Dynamics

> [!abstract] Summary
> Competitors observe each other's marketing actions and respond. Reaction functions model how one firm's marketing instrument (advertising, price) responds to rivals' actions. This note covers Cournot, Bertrand, Stackelberg, and Sweezy reaction models, the specification of absolute vs. relative reaction equations, and Tobit models for censored competitive responses.

## Why Reaction Functions Matter

A firm's sales response to its own advertising is a partial equilibrium result. In full equilibrium, competitors react, dampening the net gain. Ignoring reactions overstates the value of marketing investments and leads to sub-optimal budgeting. The six channels of total advertising impact (Dekimpe & Hanssens 1995a) include competitive reactions as a key modifier — see [[Multivariate Persistence and Cointegration]].

## Classic Competitive Models

> [!definition] Cournot Reaction
> Firm $j$ treats firm $i$'s quantity (or marketing level) as fixed and optimizes own quantity. Reaction function:
> $$X^j_t = r^j(X^i_{t-1})$$
> At equilibrium, both firms are on their reaction functions simultaneously (Cournot-Nash).
> ^def-cournot

> [!definition] Bertrand Reaction
> Firms compete on price rather than quantity. Reaction function:
> $$P^j_t = r^j(P^i_{t-1})$$
> For differentiated products, Bertrand equilibrium prices exceed marginal cost (unlike Bertrand with homogeneous products).
> ^def-bertrand

> [!definition] Stackelberg Reaction
> One firm (leader) moves first, the other (follower) observes and reacts. The leader anticipates the follower's reaction function and incorporates it into its optimization:
> $$X^{\text{leader}}_t = \arg\max_X \Pi(X, r^{\text{follower}}(X))$$
> Results in leader advantage and higher market share.
> ^def-stackelberg

> [!definition] Sweezy Kinked Demand Curve
> In oligopoly, each firm believes competitors will match price cuts but not price increases:
> - If own price > market price: demand is elastic (rivals do not follow)
> - If own price < market price: demand is inelastic (rivals match)
>
> This creates a "kink" at the current price and a region of price rigidity (marketing analogue: advertising wars where brands match each other's increases but not decreases).
> ^def-sweezy

## Empirical Specification of Reaction Functions

### Absolute Change Model

> [!definition] Absolute Reaction
> $$X^{\text{them}}_t = \beta_0 + \beta_1 X^{\text{us}}_t + u_t \tag{Eq 4.50}$$
>
> where $X^{\text{them}}$ is competitor's advertising and $X^{\text{us}}$ is focal firm's advertising.
> $\beta_1 > 0$: competitors increase spending when we do (escalation)
> $\beta_1 < 0$: competitors cut spending when we do (accommodation)
> ^def-abs-reaction

### Relative (Log-Log) Reaction

> [!definition] Relative Reaction
> $$\ln(X^{\text{them}}_t) = \beta_0 + \beta_1 \ln(X^{\text{us}}_t) + u_t \tag{Eq 4.53}$$
>
> $\beta_1 = 1$: proportional matching (parity strategy)
> $\beta_1 > 1$: over-reaction
> $0 < \beta_1 < 1$: partial reaction
> ^def-rel-reaction

### Generalized Reaction Matrix

For $K$ firms and $M$ marketing instruments, the full reaction matrix (Eq 4.56) is:

$$\mathbf{X}_t = \mathbf{B}_0 + \mathbf{B}_1 \mathbf{X}_{t-1} + \mathbf{u}_t$$

where $\mathbf{X}_t$ is a $KM \times 1$ vector of all firms' marketing decisions and $\mathbf{B}_1$ captures cross-firm reactions. This is the system estimated as a VAR — see [[Multivariate Persistence and Cointegration]].

### Tobit Model for Censored Reactions

Marketing spending is **bounded below at zero** (a firm cannot have negative advertising). If the latent reaction would imply negative spending, the observed reaction is censored at zero:

$$X^*_t = \beta_0 + \beta_1 X^{\text{rival}}_t + u_t \quad (\text{latent})$$
$$X_t = \max(0, X^*_t) \quad (\text{observed})$$

OLS on the observed reaction function understates $\beta_1$. Tobit MLE corrects for this censoring. Related to [[Regression and the CEF]] (truncated regression).

## Dynamic Aspects of Competitive Response

> [!example] Reaction Lags
> Competitive reactions are rarely instantaneous. A distributed lag on rivals' actions captures delayed reactions:
>
> $$X^j_t = \alpha + \sum_{k=0}^{K} \beta_k X^i_{t-k} + u_t$$
>
> The sum $\sum_k \beta_k$ is the **total competitive reaction elasticity**. If competitors are faster reactors, $\beta_0$ dominates; if slower, higher-order lags dominate. This has direct implications for whether first-mover advertising advantages are sustainable.
> ^ex-reaction-lags

## Cross-Links

- ADL model for competitor variables: [[Carryover Effects and Distributed Lags]]
- VAR system for competitive dynamics: [[Multivariate Persistence and Cointegration]]
- Empirical causal ordering: [[Empirical Causal Ordering]]
- Competitive effects in empirical findings: [[Advertising and Promotion Effects]]
