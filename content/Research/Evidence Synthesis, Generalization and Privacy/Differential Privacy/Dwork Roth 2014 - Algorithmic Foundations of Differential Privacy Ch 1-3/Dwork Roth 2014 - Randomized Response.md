---
title: "Dwork Roth 2014 - Randomized Response"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/example
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 2.3 (pp. 15-16, introduction of randomized response) and Sec. 3.2 Randomized response, Claim 3.5 (pp. 29-30)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]"
used_by:
  - "[[Dwork Roth 2014 - Laplace Mechanism]]"
aliases:
  - Warner randomized response (Dwork Roth)
  - Two-coin randomized response is (ln 3, 0)-DP
  - Plausible deniability mechanism
---

# Dwork Roth 2014 - Randomized Response

> [!summary]
> Warner's two-coin randomized response (1965) predates DP by four decades and is $(\ln3,0)$-differentially private. Privacy comes from plausible deniability of every answer; accuracy comes from knowing the noise process, so the true proportion can be estimated as twice the "Yes" fraction minus $1/2$. It is the prototype of *local* DP: no curator ever sees true values.

## Overview

"Privacy is obtained by process, there are no 'good' or 'bad' responses. The process by which the responses are obtained affects how they may legitimately be interpreted." Introduced in Sec. 2.3 as an early example of "privacy by randomized process", developed in Sec. 3.2 with the privacy claim.

## Main Content

> [!definition] Randomized response procedure (pp. 15, 29-30)
> Question: "Have you engaged in XYZ in the past week?" (a sensitive property $P$). Each respondent:
> 1. Flips a coin.
> 2. If tails, responds truthfully.
> 3. If heads, flips a second coin and responds "Yes" if heads and "No" if tails.
^def-randomized-response

*Plausible deniability.* A "Yes" occurs with probability at least $1/4$ whether or not the respondent has property $P$ (first and second coin both Heads), so even a "Yes" is not incriminating.

> [!theorem] Claim 3.5 (p. 30)
> The version of randomized response described above is $(\ln3,0)$-differentially private.
^thm-rr-ln3

> [!proof]- Proof (p. 30)
> Fix a respondent. $\Pr[\text{Response}=\text{Yes}\mid\text{Truth}=\text{Yes}]=3/4$: the outcome is "Yes" if the first coin is tails (probability $1/2$) or if the first and second both come up heads (probability $1/4$). $\Pr[\text{Response}=\text{Yes}\mid\text{Truth}=\text{No}]=1/4$ (first heads, second tails). Similarly for "No". Hence
> $$
> \frac{\Pr[\text{Yes}\mid\text{Yes}]}{\Pr[\text{Yes}\mid\text{No}]}=\frac{3/4}{1/4}=3=\frac{\Pr[\text{No}\mid\text{No}]}{\Pr[\text{No}\mid\text{Yes}]}.
> $$
> The two possible responses exhaust the output space, and the ratios are $3$ and $1/3$ in the other direction, so $\ln3$ bounds the privacy loss.

> [!example] Estimating the true fraction (p. 15-16)
> **Setup.** Let $p$ be the true fraction of participants with property $P$. **Expected "Yes" fraction.** $\tfrac14(1-p)+\tfrac34p=\tfrac14+\tfrac p2$. **Estimator.** $\hat p=2\big(\text{fraction answering Yes}\big)-\tfrac12$, since $2(\tfrac14+\tfrac p2)-\tfrac12=p$. Accuracy "comes from an understanding of the noise generation procedure (the introduction of spurious 'Yes' and 'No' answers)".
^ex-rr-estimator

### Generalising the coin biases (derived, not in the book)

Let the first coin show "random" with probability $\lambda$ and the second coin show Yes with probability $1/2$. Then $\Pr[\text{Yes}\mid\text{Yes}]=1-\lambda/2$ and $\Pr[\text{Yes}\mid\text{No}]=\lambda/2$, giving
$$
\varepsilon=\ln\frac{2-\lambda}{\lambda},\qquad\lambda=\frac{2}{e^{\varepsilon}+1},\qquad\hat p=\frac{\bar y-\lambda/2}{1-\lambda}.
$$
The book's $\lambda=1/2$ gives $\varepsilon=\ln3$. The variance of $\hat p$ is $\frac{m(1-m)}{n(1-\lambda)^2}$ with $m=\lambda/2+(1-\lambda)p$. This is the same family as the $\varepsilon$-parameterised randomised response of [[Dwork 2006 - Differential Privacy Definition and Basic Examples]], whose estimator has conditional standard deviation $\sqrt n\,e^{\varepsilon/2}/(e^{\varepsilon}-1)$ for the count.

## Examples

**Numerical check with the book's two coins ($n=10^5$, $p=0.3$).** Expected Yes fraction $0.25+0.15=0.40$; $\hat p$ should be close to $0.30$ with standard deviation $\sqrt{0.4\cdot0.6/n}/0.5\approx0.0031$.

```python
import numpy as np
rng = np.random.default_rng(1)
n, p = 100_000, 0.3
truth = rng.random(n) < p
first, second = rng.random(n) < 0.5, rng.random(n) < 0.5     # heads = True
resp = np.where(~first, truth, second)                       # tails -> truthful; heads -> second coin
y = resp.mean()
print(y, 2 * y - 0.5)                                        # ~0.40 and ~0.30
# privacy ratio from the exact response probabilities
print((0.75 / 0.25), np.log(3))
```

(Running this snippet with seed 1 gives a Yes fraction of $0.4014$ and $\hat p=0.3028$.)

**Cost of local privacy.** At $\varepsilon=\ln3$ the standard error of $\hat p$ with $n=10^5$ is about $0.3$ percentage points; a central $\mathrm{Lap}(1/\varepsilon)$ count would have error $\approx1/\varepsilon\approx0.9$ people, i.e. a standard error on the proportion of about $10^{-5}$. The curator model is orders of magnitude more accurate; the local model needs no trusted party.

## Connections

- **Marketing measurement.** Any on-device or browser-side noising of a conversion indicator (flip with known probability) is randomized response. The analyst must debias with the known flip rate, which is the estimator above, and the variance inflation is $1/(1-\lambda)^2$. This matters for conversion modelling with local noise: the signal-to-noise ratio of a lift measurement degrades by the same factor, so plan sample size accordingly ([[Power Analysis and Sample Size]]).
- Survey measurement of sensitive attitudes (brand safety, health product usage) is the original use.

## See Also

- [[Dwork Roth 2014 - Laplace Mechanism]] (central alternative with $O(1/\varepsilon)$ error)
- [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] (lower bounds for local mechanisms, Prop. 4.2)
- [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]
