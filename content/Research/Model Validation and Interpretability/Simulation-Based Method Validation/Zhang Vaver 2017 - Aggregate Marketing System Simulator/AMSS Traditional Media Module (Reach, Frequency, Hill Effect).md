---
title: "AMSS Traditional Media Module (Reach, Frequency, Hill Effect)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/definition
  - type/algorithm
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §2.3 intro p.11; §2.3.1 pp.11-14 (Fig. 3, Eq. 3); App. C.1 pp.36-38; Fig. 9 p.25"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]"
  - "[[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]"
aliases:
  - AMSS TV module
  - AMSS media module
  - AMSS Hill effect on frequency
  - AMSS reach and frequency simulation
---

# AMSS Traditional Media Module (Reach, Frequency, Hill Effect)

> [!summary]
> The traditional media module simulates a channel such as TV, radio or print in five steps (§2.3.1; App. C.1 splits
> budget from spend, giving the six steps below). The **audience** is a
> binomial draw by segment reachability. **Weekly spend** is budget × flighting. **Volume** is spend divided by a
> gamma-distributed unit cost. **Reach and frequency** come from a Poisson-exposure normal approximation. The **effect**
> lets the reached people migrate under a maximal transition matrix scaled by a **Hill function of average frequency**,
> $H(f)=1/(1+(f/\kappa)^{-\zeta})$. Spend, volume and GRPs are observed. Audience, reach, frequency and migrations are
> hidden. Diminishing returns therefore act on **frequency per reached person**, not on total spend.

## Overview

AMSS standardises channel events as **media modules** (§2.3, p.11). Each module is a function that takes the current
segmentation, returns an updated one, and emits output variables. A particular channel is a **parameterisation** of a
module. Several parameterised modules in sequence describe a multi-channel environment, and the modeler can specify how
media is implemented (targeting), how it works (which states it moves), and how channels interact (synergy). The
traditional module covers "relatively simple" channels (§2.3.1). Paid search needs its own module
([[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]).

**Figure 3 (p.12)** is a dependency diagram. Modeler inputs are shown as ovals: reachability by segment, media cost
parameters, flighting, maximum effect, Hill parameters and budget parameters. Variables are rectangles. **Observed**
(unshaded): budget, spend, volume. **Hidden** (shaded): audience, reach, frequency, effect scaling, migration, and the
population segmentation before and after the event. The arrows run: budget and flighting → spend → volume (with cost) →
frequency; audience and volume → reach; frequency and Hill parameters → effect scaling; maximum effect, reach and effect
scaling → migration.

**Other marketing interventions (§2.3.2 end, p.17).** The paper states that the traditional and paid search modules
"suffice for describing the behavior of many common media channels". Beyond that, **new modules can be written** to fit
the essential characteristics of other marketing interventions. Modelers describe complex marketing environments by
creating a specific **sequence** of modules, each with its **own parameterisation**. AMSS is therefore extensible: the
two built-in modules are examples, not a closed list.

## Main Content

> [!algorithm] Traditional media module, event $k$ in interval $t$ (§2.3.1, pp.12-14; App. C.1, pp.36-38)
> **Inputs.** Pre-event counts $n_{t,k,\cdot}$; reachability $\pi^{(a)}_s$; budget periods $\nu$ and budgets
> $\beta_u$; flighting $\varphi_t$; unit-cost mean and SD $(\mu^{(c)},\sigma^{(c)})$; per-dimension maximal matrices
> $\mathcal Q^{(k,l)}$, $l=3..6$; Hill parameters $(\kappa,\zeta)$.
>
> 1. **Audience.** $a^*_{t,k,s}\sim\text{Binomial}(n_{t,k,s},\pi^{(a)}_s)$. The reachability $\pi^{(a)}_s$ has two
>    meanings in App. C.1 (p.36): it is the probability that a member of $s$ is exposed to the media, "and also is the
>    maximum reach of advertising in the media channel". However large the budget, no more than a fraction
>    $\pi^{(a)}_s$ of segment $s$ can be reached, because reach is drawn from the audience. By default $\pi^{(a)}_s$ depends only on
>    activity state $s_3$, though it can be generalised. Heterogeneous $\pi^{(a)}$ across segments is how **targeting**
>    is represented.
> 2. **Budget.** Budget is an **observed, advertiser-controlled** variable: the target spend of the channel over a range
>    of intervals called the **budget period** (App. C.1, p.36). It is specified by $\nu=(\nu_t)_{1:T}$, the budget
>    period of each interval, and $\beta=(\beta_u)$, the budget of each period $u$. Interval $t$ then has budget period
>    $u_t=\nu_t$ and budget $b_t=\beta_{\nu_t}$. Since budget is a target, $b_u\approx\sum_{t:u_t=u}x_t$ for all $u$.
>    (The paper's example: an advertiser assigns one million dollars to the newspaper channel in Q4 2016.)
> 3. **Spend.** Flighting $\varphi_t$ sums to 1 within each budget period. Spend per segment is
>    $x_{t,s}=b_t\varphi_t\,a_{t,k,s}/a_{t,k,\mathcal S}$, split in proportion to audience.
> 4. **Volume.** Unit cost $c_t\sim\text{Gamma}\bigl(\mu^{(c)2}/\sigma^{(c)2},\ \mu^{(c)}/\sigma^{(c)2}\bigr)$ (shape,
>    rate), so $E[c_t]=\mu^{(c)}$ and $\text{SD}=\sigma^{(c)}$. Volume is $v_{t,k,s}=x_{t,s}/c_t$. Usually only the
>    aggregate $v_{t,\mathcal S}$ is observed. **GRPs** $=100\,v_{t,\mathcal S}/n_{t,k,\mathcal S}$.
> 5. **Reach and frequency.** Given volume, exposures per audience member are
>    $\text{Multinomial}(v_{t,k,s},(1/a^*,\dots,1/a^*))$, which is the conditional form of independent Poisson exposure
>    processes. The probability a given person is missed is $p(a,v)=(1-1/a)^v\approx e^{-v/a}$. The number missed has
>    first moment $\mu_1=a^*p(a^*,v)$ and second moment $\mu_2=\mu_1(1+(a^*-1)p(a^*-1,v))$. Write $U_{t,k,s}$ for the
>    number missed. $\mu_2=E[U^2]$ is a **raw** second moment, so the normal approximation uses mean $\mu_1$ and
>    variance $\mu_2-\mu_1^2$. Reach, the absolute number of people exposed at least once, is the audience minus the
>    unreached: $a_{t,k,s}=a^*_{t,k,s}-U_{t,k,s}$, with $U_{t,k,s}\approx\mathcal N(\mu_1,\mu_2-\mu_1^2)$. (The paper
>    says only that the moments are used "via a normal approximation" (p.37); the subtraction and the
>    variance $\mu_2-\mu_1^2$ are what that implies.) Average frequency among the reached is
>    $f_{t,k,s}=v_{t,k,s}/a_{t,k,s}$.
> 6. **Effect.** Only the reached migrate: the affected population is $a_{t,k,s}$. The effect size is
>    $e_{t,s}=H(f_{t,k,s};\kappa,\zeta)$ (Eq. 3), and the realised transition matrix is
>    $Q^{(t,k)}=\text{diag}(e_{t,\cdot})\,\mathcal Q^{(k)}+\text{diag}(1-e_{t,\cdot})\,I_{\#\mathcal S}$. Migrate by
>    Eqs. 1-2.
>
> **Outputs.** Observed: $x_t$, $v_{t,\mathcal S}$, GRPs. Hidden: $a^*$, $a$, $f$, $e$, migrations, $n_{t,k+1,\cdot}$.
^alg-amss-traditional-media

> [!warning] Notation clash: $\beta$
> App. C.1 uses $\beta=(\beta_u)$ for budget-period **budgets**. §2.4.1 uses $\beta_s$ for the **slope of the demand curve**
> in segment $s$ ([[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]]). The two are unrelated.
> This is the same kind of reuse as the $\gamma$ clash noted in
> [[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]].
^warn-amss-notation-clash

### The Hill effect curve

> [!definition] Hill transformation of frequency (§2.3.1, Eq. 3, p.14)
> $$
> H(f;\kappa,\zeta)=\frac{1}{1+(f/\kappa)^{-\zeta}}\tag{3}
> $$
> $\kappa$ is the **EC50**, the frequency at which $H=1/2$. $\zeta$ is the slope parameter; the paper calls it "the
> maximal slope of the curve". $H$ is sigmoidal in $f$ for $\zeta>1$ and concave for $\zeta\le1$. $H(0)=0$ and
> $H(\infty)=1$, so $\mathcal Q^{(k)}$ really is the *maximal* migration matrix, reached only at very high frequency.
> The paper cites Hill (1910), Gesztelyi et al. (2012), and Jin et al. (2017) for its use in MMM.
^def-amss-hill

> [!definition] Effect-scaled transition matrix (App. C.1, p.38)
> $$
> q^{(t,k)}_{s,s'}=\begin{cases}e_{t,s}\,\varrho^{(k)}_{s,s'} & s\neq s'\\(1-e_{t,s})+e_{t,s}\,\varrho^{(k)}_{s,s}& s=s'\end{cases}
> $$
> The probability of leaving $s$ is proportional to $e_{t,s}$. At saturating volume, $Q^{(t,k)}=\mathcal Q^{(k)}$.
^def-amss-tv-effect

### Building the maximal matrix from per-dimension matrices

> [!definition] Product construction of $\mathcal Q^{(k)}$ (§2.3.1 p.13; App. C.1 pp.37-38)
> Specifying a $198\times198$ matrix directly is tedious, so the modeler gives one small matrix per marketing-actionable
> dimension, $\mathcal Q^{(k,l)}=(\varrho^{(k,l)}_{i,j})_{S_l\times S_l}$ for $l=3,4,5,6$. Each is lifted to
> $\mathcal S\times\mathcal S$:
> $$
> \varrho^{*(k,l)}_{s,s'}=\begin{cases}\varrho^{(k,l)}_{s_l,s'_l}\prod_{l'\neq l}\mathbf 1_{\{s_{l'}\}}(s'_{l'}) & s\in R_l\\ \mathbf 1_{\{s\}}(s')&\text{otherwise}\end{cases}
> $$
> These are then composed in sequence:
> $$
> \mathcal Q^{(k)}=\mathcal Q^{*(k,3)}\mathcal Q^{*(k,4)}\mathcal Q^{*(k,5)}\mathcal Q^{*(k,6)} .
> $$
> The valid origin sets are $R_3=\mathcal A\cap\mathcal B$ (in-market and unsatiated), $R_4=\mathcal S\setminus\mathcal E$
> (not loyal), $R_5=\mathcal D$ (favorable) and $R_6=\mathcal S$.
>
> **Example (p.14).** For a 20% chance of moving inactive → exploratory and 10% inactive → purchase, set the first row of
> $\mathcal Q^{(k,3)}$ to $(0.7,0.2,0.1)$.
^def-amss-product-construction

## Examples

> [!example] Flighting arithmetic (§2.3.1 step 2, p.13)
> A \$100 budget over a 4-week budget period with flighting $(0.20,0.00,0.65,0.15)$ spends \$20, \$0, \$65 and \$15.
> In the §4 scenario, TV flighting is spiky. **Fig. 8 (p.25)** shows many zero weeks and peaks up to about 0.12 of the
> annual budget in a single week. That spikiness is what gives regression its strong TV signal.
^ex-amss-flighting-arithmetic

> [!example] TV in the simple scenario (§4.1.1, p.24; Fig. 9, p.25)
> TV reaches 40% of every segment ($\pi^{(a)}\equiv0.4$, untargeted). Its yearly budgets are \$109M, \$95M, \$84M and
> \$91M. It moves **favorability only**, with maximal matrix (rows and columns ordered unaware, negative (the paper's §4.1.1 word for Table 1's *unfavorable*), neutral,
> somewhat favorable, favorable):
> $$
> \mathcal Q^{(tv,4)}=\begin{pmatrix}0.4&0&0.4&0.2&0\\0&0.9&0.1&0&0\\0&0&0.6&0.4&0\\0&0&0&0.8&0.2\\0&0&0&0&1\end{pmatrix}
> $$
> At full effect, 60% of the unaware are lifted (40% to neutral, 20% to somewhat favorable). 40% of neutrals move to
> somewhat favorable, 20% of somewhat-favorables move to favorable, and 10% of negatives move to neutral. Hill
> parameters: $\kappa=1.56$, $\zeta=1$. **Fig. 9** plots $H(f)$ for $f\in[0,10]$. It is concave, at 0.5 when $f=1.56$
> and about 0.87 when $f=10$, which shows diminishing returns in frequency.
>
> **Arithmetic check.** $H(10)=1/(1+1.56/10)=0.865$. $H(3)=1/(1+0.52)=0.66$.
^ex-amss-tv-simple-scenario

## Connections

- **Where saturation lives.** In [[Shape (Saturation) Effects]] (Jin et al. 2017), the Hill function acts on adstocked
  **spend** at the aggregate level. In AMSS it acts on **frequency per reached person**, and reach itself saturates
  through $e^{-v/a}$. Aggregate spend → sales in AMSS is a composition of a reach curve, a frequency Hill curve and the
  segment purchase-probability gaps. A spend-Hill MMM can approximate it but is not correctly specified. See also
  [[Shape of the Marketing Response Function]].
- **Observed vs hidden variables.** The split in Fig. 3 is exactly what an MMM analyst has (spend, GRPs) and does not have
  (who moved). It is the aggregate-data limitation behind
  [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].
- **Reach/frequency and GRPs.** The Poisson reach approximation is the textbook
  reach-from-GRPs relationship, reach $\approx1-e^{-\text{GRP}/100}$ within the audience.

## See Also

- [[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]: the other built-in module
- [[AMSS Hidden-State Consumer Segmentation and Migration Formalism]]: Eqs. 1-2
- [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]: TV parameterisation in use
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
