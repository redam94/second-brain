---
title: "Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder"
tags:
  - source/ingested
  - topic/model-validation
  - topic/statistical-philosophy
  - topic/interpretability
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Statistical Science 16(3): Comment by D. R. Cox (pp. 216-218); Comment by Brad Efron (pp. 218-219); Comment by Bruce Hoadley (pp. 220-224: Introduction, Case Study of an Algorithmic Modeling Culture, Overfitting the Test Sample, Spin-offs from the Data Modeling Culture, A Solution to the Occam Dilemma, The Algorithm Tuning Dilemma, Generalizing the Generalization Error, Measuring Importance, In Summary); Comment by Emanuel Parzen (pp. 224-226: §§1-5); Rejoinder by Leo Breiman (pp. 226-231: C1-C5, E1-E4, Hoadley, Parzen, Where Are We Heading?, Additional References)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]"
  - "[[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]"
  - "[[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]"
used_by:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]"
aliases:
  - Two Cultures discussion
  - Cox comment on Breiman
  - Efron comment on Breiman
  - Hoadley Fat Scorecard
  - Ping-Pong theorem
  - Parzen quantile culture comment
  - Breiman rejoinder 2001
---

# Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder

> [!summary]
> Four published discussions and Breiman's rejoinder (pp. 216-231). **Cox** disagrees with the main thrust: analysis should start from a question, formal models are nearly essential for incisive thinking, much prediction is under conditions unlike the data (where black boxes fail), and the critique partly targets a caricature. **Efron** recasts the paper as the end of "100 years of unbiasedness": black boxes succeed through hidden biased estimation that lacks theory; new methods always look better and complex ones are harder to criticise; prediction alone is rarely enough. **Hoadley** (credit scoring) shows a 1960s algorithmic culture — segmented scorecards fit by maximising divergence — and adds the Fat Scorecard, the "Ping-Pong theorem", test-sample overfitting from tuning, drift over time, and business losses as the real target. **Parzen** recasts the two goals as "management" and "science", argues for many cultures and model-free diagnostic tests, and sets out his quantile/comparison-density methods. Breiman's **rejoinder** concedes data models' place where science or data are limited, defends predictive accuracy as the gate for causal claims, defines importance by predictive loss while admitting it lacks theory, and warns the field against defining itself by familiar tools.
^sum-discussion-by-cox-ef-1

## Overview

The discussion is where the paper's limits are argued. For model validation the main points are Cox's on extrapolation to new conditions, Efron's on inference for biased estimators and on honest method comparisons, Hoadley's on test-set reuse, drift and decision-relevant loss, and the disagreement over what "important" means.

## Main Content

### Comment: D. R. Cox (pp. 216-218)

1. **Caricature.** Breiman's critique of "mainstream statistical thinking" rests "in part on a caricature," which like all good caricatures has enough truth to provoke thought.
2. **Diversity of applications.** Any unqualified statement about "applications" should be treated sceptically. The field has failed to set out clearly the distinctions between kinds of application (decision vs inference, tests vs estimation, estimation vs prediction) and their consequences for strategy. These existing distinctions are useful but, "except perhaps the first, too phrased in terms of the technology rather than the spirit of statistical analysis" (p. 216). Cox agrees it would be "impoverished and extremely unhistorical" to exclude work without an explicit probabilistic base.
3. **Start from a question.** Cox prefers to start with "an issue, a question or a scientific hypothesis" rather than data (p. 216), though he doubts this is a real disagreement; such issues "may evolve, or even change radically, as analysis proceeds." "Data looking for a question are not unknown and raise puzzles but are, I believe, atypical in most contexts." Even starting with data, key issues are the meaning of the data, ascertainment biases, measurement error, missing-data processes and complex time dependence — hard to handle "without some notion of probabilistic modeling."
4. **Prediction.** Prediction matters, and a theory's success is best judged by prediction in new contexts (though rational action theory explains the past without predicting). When prediction is **localised to conditions like the data**, a directly empirical black box may be better — Cox accepts this "although it goes somewhat against the grain," citing short-term economic forecasting and real-time flood forecasting, with stability and recalibration as the issues. A further example of a prediction objective (p. 216): "In a clinical trial context it can be argued that an objective is to predict the consequences of treatment allocation to future patients." But **much prediction is under quite different conditions**: the course of the v-CJD epidemic in the UK, or the effect on US cancer incidence of a 10% cut in medical X-rays. Prediction of something only indirectly addressed by the data, without understanding of process and links to other information, "becomes more and more tentative."
5. **Where mainstream practice is visible.** The central strategy "can most certainly not be discerned" from the pages of *Bernoulli*, *The Annals of Statistics*, the *Scandinavian Journal of Statistics*, *Biometrika*, *JRSS Series B*, or even the applications pages of *JASA* or *Applied Statistics* (p. 217). Along that list "there is an increase from zero to 100% in the papers containing analyses of 'real' data," but those papers nearly always illustrate technique rather than explain the process of analysis and interpretation — legitimate, but different from live analysis for subject-matter conclusions; real analyses appear in subject-matter reports where statistical detail is correctly underplayed. Failure to discuss principles is a major criticism of current theory.
6. **Cox's statement of good practice** (p. 217): formal models are "useful and often almost, if not quite, essential for incisive thinking"; descriptively appealing, transparent methods with a firm model base are ideal; significance tests, confidence and posterior intervals are guides, not mechanical rules, and "are often lower bounds to real uncertainty"; analysis is partly exploratory; "Automatic methods of model selection (and of variable selection in regression-like problems) are to be shunned" or examined carefully for their effect on conclusions; "Unfocused tests of model adequacy are rarely helpful."
7. **Breiman's mainstream is mechanical.** Choosing a default model a priori (e.g. proportional hazards for survival) does happen under time pressure or among non-statisticians; Cox notes that the paper introducing proportional hazards compared several models. The issue "is not whether they could ideally be improved, but whether they capture enough of the essence of the information in the data, together with some reasonable indication of precision as a guard against under or overinterpretation." He asks: "Would more refined analysis, possibly with better predictive power and better fit, produce subject-matter gains?" (p. 217). There is no general answer, but limitations often lie "more in weakness of data quality and study design than in ineffective analysis."
8. **Two current lines of development**: models strongly tied to subject matter (analysed by MCMC, or Markov graphs where knowledge is qualitative), which assume more and more; versus kernel regression, GAMs etc., which assume less and less. The circumstances favouring each need clarifying.
9. **Requirements of a statistical model** (Cox and Wermuth 1996, p. 15): link to background knowledge and previous work; a pointer toward a generating process; primary parameters with clear subject-matter interpretation; haphazard aspects specified well enough for meaningful precision; adequate fit. Fit, "broadly related to predictive success, is not the primary basis for model choice." These are efforts toward potentially causal descriptions; causality "can rarely be established from one type of study."
10. **Defeatism about process.** Rejecting the formulation of underlying processes rejects the base of much scientific progress; Beveridge (1952) shows hypothesised processes leading to progress even when false.
11. **Model choice as translation.** The crucial issue is choosing a model that translates subject-matter questions into analysable form; "there are severe hidden penalties for overelaboration." Yet the statistical literature "concentrates on how to do the analysis, an important and indeed fascinating question, but a secondary step" (p. 218). "Better a rough answer to the right question than an exact answer to the wrong question" (an aphorism he attributes perhaps to Kelvin).
12. **On Vapnik's separation result**: confirms folklore that complete separation in logistic regression is likely with many variables; mainstream thinking regards it as insecure, and "bootstrap and cross-validation ideas may give here a quite misleading illusion of stability." Ultimately an empirical question per application.

Cox closes that he disagrees with the main thrust but found the paper stimulating.

### Comment: Brad Efron (pp. 218-219)

- At first and second glance the paper looks like an argument "against parsimony and scientific insight, and in favor of black boxes with lots of knobs to twiddle."
- **"100 years of unbiasedness."** Following Fisher, twentieth-century statistics centred on unbiased or nearly unbiased estimates (MLEs) and tests. This needs a fairly high signal-to-noise ratio and ratio of sample size to parameters; good experimental design enforces those conditions, so one does not face "100 data points and 50 parameters." Twenty-first-century problems have swollen sample sizes and vaguer goals ("find interesting data structure"). New algorithms for new problems are "a healthy sign ... even if the innovators aren't all professional statisticians": "There are enough physicists to handle the physics case load, but there are fewer statisticians and more statistics problems, and we need all the help we can get" (pp. 218-219). "An attractive feature of Leo's paper is his openness to new ideas whatever their source" (p. 219).
- **Hidden bias.** Unless the bias-variance trade-off has been suspended, black-box success "must hinge on some form of biased estimation" — directly via regularisation, through pruning trees, or "surreptitiously" in SVMs. Fisher's information bound is no help for heavily biased methods, and numerical experimentation without theory "is prone to faddish wandering":

> [!definition] Efron's two rules of faddish method comparison (p. 219)
> - **Rule 1.** "New methods always look better than old ones." Neural nets beat logistic regression, SVMs beat neural nets, and so on. "In fact it is very difficult to run an honest simulation comparison, and easy to inadvertently cheat by choosing favorable examples, or by not putting as much effort into optimizing the dull old standard as the exciting new challenger."
> - **Rule 2.** "Complicated methods are harder to criticize than simple ones." The efficiency of logistic regression is easy to check; an SVM's limitations are not. Statisticians' distinctive contribution is clarifying the inferential basis of new methods (e.g. Friedman, Hastie and Tibshirani 2000 on boosting), as done for nonparametrics, robustness, survival analysis, Stein shrinkage and empirical Bayes. "Papers like Leo's are a call for more analysis and theory, not less."
^def-efron-rules

- **Prediction overstated.** The prediction culture at Stanford is far larger than 2%; estimation and testing are forms of prediction ("would this still be true if we went on to test all possible patients?"); prediction alone is only occasionally sufficient — the post office only needs addresses read, but Gregory's hepatitis study also sought medical understanding, and "Most statistical surveys have the identification of causal factors as their ultimate goal."
- **Hepatitis record.** The data were first analysed in Gail Gong's 1982 thesis on prediction and bootstrap improvements over cross-validation ("Cross-validation itself is an uncertain methodology that deserves further critical scrutiny"; Efron and Tibshirani 1996, the .632+ rule). A fuller account is Efron and Gong (1983). Variables 12 or 17 (13 or 18 in their numbering) appeared as "important" in 60% of bootstrap runs vs 59% for variable 19, the most for any single variable. In what sense are they "important"? Efron and Tibshirani (1998, "The problem of regions") attempt an answer; prediction will "invigorate traditional inference, not eliminate it."
- **A third front** in the frequentist-Bayesian wars, opened by algorithmic advocates who believe in no inferential school. Algorithmic modelling is no more an argument against data modelling "than splines are an argument against polynomials. The whole point of science is to open up black boxes, understand their insides, and build better boxes." He hopes the paper is advocacy rather than "the confessions of a born-again black boxist."

### Comment: Bruce Hoadley (pp. 220-224)

Hoadley (Bell Labs, Bellcore, then seven years in Fair, Isaac's research group) agrees with much of the paper and describes credit scoring as a long-standing algorithmic culture. The Fair, Isaac approach "was developed by engineers and operations research people and was driven by the needs of the [customers] and the quality of the data"; statistical influence came "mostly from the nonparametric side—things like jackknife and bootstrap" (p. 220).

> [!example] Segmented scorecards: a 1960s algorithmic culture (pp. 220-221)
> **Problem (simplified behaviour scoring for credit-card accounts).** Inputs $\mathbf x$: monthly bills and payments over the last 12 months (dimension 24). Output: binary indicator of no severe delinquency over the next 6 months. Target:
> $$f(\mathbf x)=\log\frac{\Pr(y=1\mid\mathbf x)}{\Pr(y=0\mid\mathbf x)}.$$
> **Algorithm.**
> 1. Transform $\mathbf x$ into many interpretable **characteristics**: first derive time series (e.g. months delinquent, a nonlinear function), then define characteristics as operators on them (e.g. number of times in the last six months more than two months delinquent). Thousands result; a subset passes a screen.
> 2. **Segment** the population on screened characteristics — informally, but effectively the leaves of a shallow-to-medium tree built by binary splits, like CART with a different purity index.
> 3. In each segment build a **scorecard**: bin each characteristic into **attributes**; the score is linear in the attribute dummies, with coefficients called **score weights**.
>
> **Dimension.** 24 predictors → hundreds of characteristics → about 100 kept, about 10 attributes each, about 10 segments: $100\times10\times10=10{,}000$ features. "Yes indeed, dimensionality is a blessing."
>
> A scorecard is a GAM with bin smoothing, plus **score engineering** driven by customer demand, legal considerations and robustness over time: monotone constraints (score decreasing in delinquency characteristics), and shrinking or expanding some score weights to correct known weaknesses in the data.
^ex-segmented-scorecard

> [!definition] Divergence and fitting (p. 221)
> Scorecards were fit, under constraints, by maximising the **divergence** of the score $S$ between the two outcome groups:
> $$\text{Div}=\frac{2\,\big[E(S\mid y=1)-E(S\mid y=0)\big]^2}{V(S\mid y=1)+V(S\mid y=0)},$$
> with a heuristic nonlinear-programming algorithm, then a linear transformation to the log-odds scale. Characteristic selection used the change in divergence when adding or removing a candidate, judged informally on test-sample performance. "There were no formal tests of fit and no tests of score weight statistical significance." Divergence was justified by approximate normality of the score — assumptions on the output, not the inputs — via a central limit theorem for sums of dependent dummy-weighted variables. Hoadley argues this belies Breiman's claim that pre-1980s algorithmic methods were primitive; he presented it as "Credit Scoring—A Parallel Universe of Prediction and Classification." At a recent ASA meeting he "heard talks on treed regression, which looked like segmented scorecards to me" (pp. 220-221) — the academic algorithmic culture rediscovering the industry one.
>
> **Margin link.** Good classifiers have large **margin** $M$ (positive when classification is correct, negative otherwise). Because "margin is a random variable, the precise definition of large margin is tricky. It does not mean that $E(M)$ is large" (p. 221). Putting on his data-modelling hat, Hoadley defines "large margin" as large $E(M)/\sqrt{V(M)}$; with that definition, large margin means large divergence.
^def-divergence

Later Fair, Isaac methods: genetic algorithms to screen large characteristic sets, automated segmentation, GAMs with smooth splines and step functions under constraints, constrained GLM likelihood, and computationally intensive optimisation of any business-relevant objective.

**Overfitting the test sample (pp. 221-222).** The test sample is usually a random sample of the *current* population, so high test performance does not guarantee future performance — "things do change." Protections: monitor performance and redevelop on degradation (an 18-24-month cycle for core products); score engineering for robustness — damping individual characteristics, monotone constraints, minimising model size subject to current test performance — moving "from very nonparametric ... to more semiparametric."

**Spin-offs from the Data Modeling Culture (p. 222).** Hoadley quotes Breiman's §6 line that "multivariate analysis tools in statistics are frozen at discriminant analysis and logistic regression in classification" and replies: "This is not necessarily all that bad. These tools can carry you very far as long as you ignore all of the textbook advice on how to use them." The Fat Scorecard is his illustration.

> [!example] The Fat Scorecard (p. 222)
> **Setup.** Seeking an improvement over segmented scorecards: a strong global scorecard plus small adjustments on overlapping segments. Global scorecard = logistic regression on attribute dummies; 36 characteristics available (a typical scorecard has about 15); selection kept whole characteristics in or out.
>
> **Result 1 (Rashomon).** All models with 27 to 36 characteristics had the same test performance. Choosing the smallest (27 characteristics, **162 score weights**), the P-values ranged from 0.0001 to 0.984, **only one below 0.05**, and the confidence intervals were useless. "To get this great scorecard, I had to ignore the conventional wisdom on how to use logistic regression."
>
> **Result 2.** No segment adjustment for interactions improved test performance. The "Fat Scorecard" slightly outperformed a neural network with **2,000 connection weights** built earlier on the same data.
>
> **Result 3 (time).** In an ingredient Hoadley calls rare, there were three further test samples taken one, two and three years later; the Fat Scorecard beat the thinner traditional scorecard on all four, so feared overfitting never materialised. Hoadley adds: "To get a better handle on this you need an understanding of how the relationships between variables evolve over time."
>
> **Why it worked.** Some characteristics may act as surrogates for interactions; and a scorecard is itself a sophisticated neural net — one hidden node per characteristic, input transformations as summation functions, step-function transfer functions from score weights, linear output — highly nonlinear and interactive in the original inputs.
^ex-fat-scorecard

Hoadley also notes that applying discriminant analysis to hundreds of very non-normal attribute dummies can still yield "a great algorithmic model" despite violating its assumptions.

> [!theorem] Hoadley's "Ping-Pong theorem" and solution to the Occam dilemma (p. 223)
> Customers insist on interpretable $f(\mathbf x)$, and regulators and lawyers may need to approve it. Segmented scorecards (10-20 segments, up to 100 characteristics) are claimed to be both very accurate and very interpretable; the shallow-to-medium tree rates "an A++."
>
> **Ping-Pong theorem** (an informal claim): if Fair, Isaac revealed its best model's performance and data to Breiman, he could build a random forest that beats it; if Breiman then revealed his performance, Fair, Isaac could build a segmented scorecard that beats his (perhaps with more characteristics, attributes and segments). All competitors are algorithmic models, "But some of them could be interpretable."
^thm-ping-pong

**The algorithm tuning dilemma (p. 223).** All algorithmic approaches have explicit or implicit tuning parameters (penalties, thresholds for characteristic selection). Analysts learn to set them for good test or CV results, but "there is sometimes a little tinkering, which involves peeking at the test sample," biasing the test or CV estimate — "the same kind of tinkering that upsets test of fit pureness." Challenge: "How do you optimize your results and get an unbiased estimate of the generalization error?"

**Generalizing the generalization error (p. 223).** Models are used for decisions, and misclassification error is a surrogate for profit. Fair, Isaac maximises divergence but argues value to customers with measures they relate to (ROC curves, or simulations of the customer's operation). Example: transaction fraud control, where the measures are false-positive rate, detection speed and **dollars saved when 0.5% of transactions are flagged** (the capacity of the fraud staff). "The challenge for algorithmic modeling is to find an algorithm that maximizes the generalization dollars saved, not generalization error." Reweighting observations in standard algorithms (ideas from SVMs and boosting) improves test performance on any objective, at a computational price.

**Measuring importance — is it really possible? (p. 223).** A Fair, Isaac variant: build accurate models in which no variable dominates, since any variable's relationships may change. And by the Ping-Pong theorem, if $x_1$ is important in one black box, there exists an input set excluding $x_1$ and an algorithm giving an equally accurate black box in which $x_1$ is unimportant.

**In summary (p. 224).** Algorithmic modelling is very important and evolved naturally where there are lots of data and decisions. One can avoid the Occam dilemma (medium trees with interpretable GAMs in the leaves), and use data-modeling tools algorithmically if one (i) ignores most textbook advice, (ii) embraces the blessing of dimensionality, (iii) uses constraints in fitting, (iv) uses regularisation, and (v) validates the results.

### Comment: Emanuel Parzen (pp. 224-226)

**§1 Appreciation.** Statisticians must face the difficulties in their practice of regression. Parzen proposes as a first goal of statistical ethics to guarantee [those we serve] that "any mistakes in our analysis are unlike any mistakes that statisticians have made before." He renames prediction and information as **"management"** (profit, short-run practical answers for decisions) and **"science"** (truth, long-run understanding and control); Student's t-test was a management tool at Guinness. "If the model is a poor emulation of nature, the conclusions may be wrong" is "the right answer to the wrong question" — the **error of the third kind**; MIT engineers call it "suboptimization," "elegantly solving the wrong problem." Parzen summarises what Breiman shows: algorithmic models give better predictive accuracy than data models, "and consequently better information about the underlying mechanism," avoiding the questionable conclusions that follow from weak predictive accuracy; and support vector machines "provide almost perfect separation and discrimination between two classes by increasing the dimension of the feature set." He is convinced algorithmic methods are important contributions to the statistician's tool kit. "If the profession of statistics is to remain healthy, and not limit its research opportunities, statisticians must learn about the cultures in which Breiman works, but also about many other cultures of statistics." (p. 224)

**§2 Hypotheses to test to avoid blunders.** Breiman's examples reveal two generic deviations to check routinely, using tests that diagnose the *direction* of deviation in a model-free way:
- **Bivariate dependence** among inputs, which makes them proxies for each other and models unstable (equally well-fitting forms); test independence of input distributions.
- **Two-sample conditional clustering**: e.g. class I has one mode at low $X$ while class II has modes at low and high $X$, so high $X$ marks class II. Test equality of the pooled distribution and the class-I conditional distribution, equivalently $P(\text{class I}\mid X)=P(\text{class I})$. Successful discrimination raises the input dimension to push $P(\text{class I}\mid X)$ toward 0 or 1.

**§3 Many cultures; statistical methods mining.** Statistics has many cultures (each specialist workshop asks "Why don't all statisticians think like us?"). Parzen's "statistical methods mining" synthesises computationally intensive methods: EDA, functional data analysis, density estimation, model-selection criteria, Bayesian priors on function space, RKHS regression, fast algorithms, Kalman filtering, complexity, information, quantile data analysis, nonparametric regression, conditional quantiles. "Data mining" is a special case of "data modeling." He proposes teaching the **SIEVE** stages: Specify problem and general model form; Identify tentatively the number of parameters and specialised models; Estimate parameters; Validate goodness-of-fit; Estimate final model nonparametrically or algorithmically. MacKay and Oldford (2000) give the stages **PPDAC** (problem, plan, data, analysis, conclusions).

**§4 Quantile culture.** A culture of data modelling based on quantile functions, "initiated in Parzen (1979), has been my main research interest since 1976." In his discussion of Stone (1977) he "outlined a novel approach to estimation of conditional quantile functions which I only recently fully implemented" (p. 225). The quantile culture "has not yet become widely applied because 'you cannot give away a good idea, you have to sell it'" — i.e. by building it into computer programs usable by applied statisticians, thereby promoting statistical methods mining. Parzen extends "algorithmic models" to (1) data fitting by approximation theory and numerical analysis and (2) probability notation for empirical distributions not assumed to be randomly generated.

> [!definition] Parzen's quantile and comparison-density toolkit (§4, pp. 225-226)
> - **Quantile function**: $Q(u)=F^{-1}(u)=\inf\{x: F(x)\ge u\}$, $0\le u\le1$. If $F$ is continuous with density $f$: $F(Q(u))=u$ and $q(u)=Q'(u)=1/f(Q(u))$. Notation: $Q$ true, $\tilde Q$ raw sample estimator, $\hat Q$ smooth estimator.
> - **Five-number summary**: $Q(u)$ at $u=0.5, 0.25, 0.75, 0.1, 0.9$ (or 0.05, 0.95).
> - **Location and scale**: $QM=0.5\,(Q(0.25)+Q(0.75))$, $QD=2\,(Q(0.75)-Q(0.25))$.
> - **Quantile-quartile function**: $Q/Q(u)=(Q(u)-QM)/QD$. Summary: $QM$, $QD$, $Q/Q(0.5)$ (skewness), $Q/Q(0.1)$ (left tail), $Q/Q(0.9)$ (right tail). It takes universal values at $u=0.25, 0.75$; values with $Q/Q(u)>1$ are outliers as defined by Tukey EDA (the source prints "Values Q/Q(u) > 1"; reading this as $|Q/Q(u)|>1$, so that the lower tail also counts, is our interpretation, since $Q/Q(0.25)=-0.25$ and $Q/Q(0.75)=0.25$ make the bound symmetric about $QM$).
> - **Comparison distribution and density** for continuous $F,G$ with $G\ll F$ ($f(x)=0\Rightarrow g(x)=0$): $D(u;F,G)=G(F^{-1}(u))$, $d(u;F,G)=D'(u;F,G)=g(F^{-1}(u))/f(F^{-1}(u))$. Discrete case: $d(u;F,G)=p_G(F^{-1}(u))/p_F(F^{-1}(u))$.
> - **Dependence density** for bivariate $(X,Y)$: $d(t,u)=d(u;F_Y,F_{Y\mid X=Q_X(t)})$; if jointly continuous,
> $$d(t,u)=\frac{f_{X,Y}(Q_X(t),Q_Y(u))}{f_X(Q_X(t))\,f_Y(Q_Y(u))}.$$
> Independence $F_{X,Y}=F_XF_Y$ holds iff $d(t,u)=1$ for all $t,u$.
> - **Conditional quantiles**: $Q_{Y\mid X=x}(u)=Q_Y\big(D^{-1}(u;F_Y,F_{Y\mid X=x})\big)$, i.e. $Q_Y(s)$ where $u=D(s;F_Y,F_{Y\mid X=x})$.
> - **Two-sample comparison** with binary $X$ indicating population and $F_Y$ the pooled distribution: $d_1(u)=d(u;F_Y,F_{Y\mid X=1})=P(X=1\mid Y=Q_Y(u))/P(X=1)$.
^def-parzen-quantile

> [!algorithm] Parzen's high-dimensional quantile-bin tests (§5, p. 226)
> For multivariate data $(Y_1,\dots,Y_m)$, using empirical distributions throughout:
> 1. Note $\int_0^1\!\cdots\!\int_0^1 d(u_1,\dots,u_m)\,du_1\cdots du_m=1$ (likewise for $d_1$).
> 2. Define the **decile quantile bin** $B(k_1,\dots,k_m)$ as observations with $Q_{Y_j}((k_j-1)/10)<Y_j\le Q_{Y_j}(k_j/10)$ for $j=1,\dots,m$ (base $M$ instead of 10 is possible).
> 3. **Independence test**: for all $k_j=1,\dots,10$ form $d(k_1,\dots,k_m)=P(\text{Bin}(k))\,/\,P(\text{Bin}(k)\mid\text{independence})$.
> 4. **Two-sample test** (population I vs pooled): $d_1(k_1,\dots,k_m)=P(\text{Bin}(k)\mid\text{population I})\,/\,P(\text{Bin}(k)\mid\text{pooled})$ where the denominator is positive; equivalently $d_1(k)=P(X=I\mid\text{observation from Bin}(k))/P(X=I)$.
> 5. As a first step, apply quantile data analysis to the values $d(k)$ and $d_1(k)$ to detect the directions of deviation from the null.
^alg-parzen-bins

Conclusion: statistics has many cultures, and statisticians will do better when, like Breiman, they apply as many as possible ("statistical methods mining").

### Rejoinder: Leo Breiman (pp. 226-231)

Breiman reads Parzen and Hoadley as roughly in agreement, Efron as having serious reservations, and Cox in "downright disagreement."

**To Cox.**
- **Start with a question**: agreed, adding the prediction of future events; Breiman has never worked on a project that began "Here is a lot of data; let's look at it."
- **C1 Data models can be useful**: when the science determines the model up to parameters; when complex questions lack enough data, simple models give qualitative understanding and point to further research and data; when policy needs decisions without enough data for prediction, a model built from available data plus subject knowledge is reasonable. Breiman quotes Cox's v-CJD/X-ray passage and agrees.
- **C2 Data models only**: Cox's two concessions to empirical approaches (short-term economic and real-time flood forecasting) are "among the less interesting" algorithmic successes; Cox says nothing about random-forest information or pattern recognition. Breiman examines Cox and Wermuth (1996, ch. 6): the first of four examples has 68 diabetes patients and seven covariates (University of Mainz pilot study; response glycosylated haemoglobin, GHb), fitted by linear regressions validated by residual plots, with the only other validation "$R^2=0.34$, reasonably large by the standards usual for this field of study." No predictive accuracy is computed in any of the four examples. He could not obtain a data set in time to compare approaches.
- **C3 Approach**: quoting Cox's statement of practice, Breiman grants that with small samples and a handful of covariates Cox's craft would produce an illuminating model, "But data characteristics are rapidly changing" and starting with a formal model is often untenable.
- **C4 Changes in problems**: statisticians should be pragmatic — data model, algorithmic model, "(although it is somewhat against my grain), a Bayesian data model" or something else. His 1990 Census adjustment work (Breiman 1994) was a painstaking study of error sources in thousands of pages of evaluation documents; the conclusion that adjustments were largely bad data has not been effectively contested and is supported by the 2000 effort, and "could not be resolved by any amount of statistical modeling." Problems are changing fast: astronomy databases of two billion objects and over 100 terabytes; microarrays with small $n$ and thousands of variables; fMRI runs of 150,000 pixel images; gigabytes of satellite data. John Rice: "Statisticians have to become opportunistic." At both workshops algorithmic methods abounded.
- **C5 Mainstream procedures**: the disagreement is about what "mainstream" means. By counting people using canned packages or SAS licences, Breiman's definition prevails "at a ratio of at least 100 to 1." Many analysts in diverse fields depend on SAS, SPSS etc. and lack time or expertise to build better tools; Breiman's trees arose when BMDP regression, stepwise regression and discriminant analysis could not handle nonstandard data. CART is used in thousands of applications yearly; random forests is free (f77, S+, R) with a second version coming (Java via Weka, with Adele Cutler). Academic statistics has "a responsibility to provide ... useful, reliable, and accurate analysis tools" — wavelets and decision trees being examples.

**To Efron.** Breiman opens: "Brad seems to be a bit puzzled about how to react to my article" (p. 229), and starts with Efron's biggest reservation.
- **E1 Simple to complex**: science evolves from simple to complex — general relativity vs Newton, quantum mechanics of molecules. Physicists accept complex models and extract usable information; statistics should "construct the most accurate possible model, however complex, and then extract usable information from it." Drug companies use random-forest gene importance without worrying about its black-box nature.
- **E2 Prediction**: the point was that fit is hard to judge from goodness-of-fit tests and residuals; test-set accuracy is better. A model barely beating the "all survived" baseline deserves little faith in its causal factors; "the more predictively accurate the model is, the more faith can be put into the variables that it fingers as important."
- **E3 Variable importance**: see [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — operational definitions (best subsets; slope/SE) can mislead; the predictive definition spots both of two correlated variables; no satisfactory theory yet; "The problem begs for research." (He had not located the Efron-Tibshirani paper.)
- **E4 Other reservations**: goals have become more diverse, not fuzzier; "Searching for structure" is rarely seen. "Knobs to twiddle" is puzzling: random forests has one parameter to set, insensitive over a wide range and easy to choose; SVMs have 1-2. On Rule 1 ("New methods always look better than old ones"): at his first NIPS in 1992 he arrived grimly sceptical and "came away a believer" — neural nets "delivered on the bottom line." His stance: "Prove that you've got a better mousetrap and I'll buy it. But the proof had better be concrete and convincing." On bias and variance: methods handling thousands of variables are "not voodoo statistics"; simple theory (Breiman 1999) illuminates random forests, though more is needed. Breiman closes the Efron section: Brad is "an innovative and flexible thinker who has contributed much to our field. He is opportunistic in problem solving and may, perhaps not overtly, already have algorithmic modeling in his bag of tools" (p. 230).

**To Hoadley.** Agreed that models accurate in one context must be modified for others — not necessarily by changing the construction method, but by using data from the new context. On interpretability, Fair, Isaac is "an exception": a machine-learning group at a money manager explained large neural-net stock predictions to its customers by fitting binary trees to the nets' inputs and outputs — "Keeps them happy!" In stock prediction and credit rating "the priority is accuracy. Interpretability is a secondary goal that can be finessed."

**To Parzen.** Not inclined to contest "many cultures"; he likes his division because it is clear-cut — "are you modeling the inside of the box or not?" — and includes Bayesians in data modelling. He will watch the quantile culture.

**Where are we heading? (p. 231).** Many leading statisticians worry about the field's viability at a time with an unprecedented wealth of problems and data. "The danger is that if we define the boundaries of our field in terms of familar tools and familar problems, we will fail to grasp the new opportunities."

**Additional references** (p. 231): Beveridge (1952); Breiman (1994); Cox and Wermuth (1996); Efron and Gong (1983); Efron and Tibshirani (1996, 1998); Gong (1982); MacKay and Oldford (2000); Parzen (1979); Stone (1977).

## Examples

> [!example] Cox's extrapolation point for marketing budgets
> A black-box forecaster fit to historical weekly spend predicts well within the observed spend range. A question like "what if we cut TV by 50%?" asks for prediction "under quite different conditions from the data." Cox's position: that needs an explicit model of process (adstock, saturation, competitive response) linked to other information such as lift tests; Breiman's C1 agrees in this case. See [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] and [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] for testing such extrapolations on simulated ground truth.
^ex-discussion-by-cox-ef-2

> [!example] Hoadley's tuning dilemma in a model-selection pipeline
> An analyst tunes regularisation, lag lengths and saturation priors while repeatedly checking the same 26-week holdout. The final holdout error is optimistically biased — the same issue as data-dependent goodness-of-fit testing. Remedies: a locked final test set, nested cross-validation, or pre-registered analysis choices ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]]).
^ex-discussion-by-cox-ef-3

> [!example] Efron's Rule 1 in a method bake-off
> Comparing a new Bayesian MMM against a "dull old" regression on one favourable simulated scenario, with the new method tuned and the baseline not, is the comparison Efron warns about. A neutral design varies the data-generating mechanisms, tunes all methods equally and reports Monte Carlo error ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]).
^ex-discussion-by-cox-ef-4

## Connections

- Cox's "lower bounds to real uncertainty" and Hoadley's drift point relate to [[Conformal Prediction Under Covariate Shift]] and [[Forecast Evaluation and Backtesting]].
- Hoadley's "generalization dollars saved" is the decision-loss view also behind [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] and Goodhart-type proxy failures ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
- The Ping-Pong theorem on importance is an informal statement of what [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] makes precise.
- Efron's call for inferential theory for biased estimators is answered in part by debiased ML ([[Regularization Bias and the Partially Linear Model]]) and honest forests ([[Honest Trees and Causal Forests]]).
- Parzen's conditional quantiles connect to [[Quantile Regression]].
- Governance analogues: effective challenge and ongoing monitoring in [[SR 11-7 - Model Risk Management Guidance - Overview]].

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]
- [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]
- [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]
