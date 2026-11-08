---
title: "Dwork 2006 - Sensitivity in General Metric Spaces"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 3.3 (Def. 3.6, Thm. 3.7, Remark 3.1), pp. 36-37; Sec. 3.4 Bibliographic Notes and Discussion, p. 38"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
used_by:
  - "[[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]"
aliases:
  - Metric-space sensitivity (DMNS 2006)
  - Exponential-type noise mechanism (DMNS 2006)
  - Precursor of the exponential mechanism
---

# Dwork 2006 - Sensitivity in General Metric Spaces

> [!summary]
> If one edit to the data moves $f(x)$ by at most $S_Z(f)$ in *any* metric $d_Z$ on the output space, one can release $f(x)$ privately by sampling $y$ with density proportional to $\exp\!\big(\tfrac{\varepsilon}{2S_Z(f)}d_Z(y,f(x))\big)$ (negative exponent, i.e. decaying in distance) - Theorem 3.7. The factor 2 pays for the normalising constant. This is the precursor of McSherry and Talwar's exponential mechanism. Section 3.4 surveys what followed.

## Overview

The intuition (p. 36): "if removing or adding one entry to $x$ induces a small change in $f(x)$ - under any measure of distance on $f(x)$ - then we should be able to release $f(x)$ privately with relatively little noise". The paper only uses symmetry $d_Z(x,y)=d_Z(y,x)$ and the triangle inequality $d_Z(x,y)\le d_Z(x,z)+d_Z(z,y)$.

## Main Content

> [!definition] Definition 3.6 - sensitivity in a metric space (p. 36)
> Let $Z$ be a metric space with distance $d_Z$. The sensitivity of $f:D^*\to Z$ is the largest amount the value varies when a single entry changes:
> $$
> S_Z(f)\overset{\text{def}}{=}\sup_{x,x':\,d_\triangle(x,x')=1}d_Z(f(x),f(x')).
> $$
^def-metric-sensitivity

Given a point $z\in Z$ (and a base measure on $Z$) try the density
$$
p_{z,\varepsilon}(y)\propto\exp\!\left(-\frac{\varepsilon\,d_Z(y,z)}{2S_Z(f)}\right).
$$
(The printed text shows the exponent without an explicit minus sign in the extracted PDF; the proof and normalisation require the decaying form.) This may fail to exist if the right-hand side is not integrable; if it is finite, $p_{z,\varepsilon}$ is a well-defined distribution. To reveal an approximate version of $f(x)$ with sensitivity $S_Z(f)$, sample $y$ from $p_{f(x),\varepsilon/S_Z(f)}$:
$$
p[\mathcal{M}(x)=y]=\frac{\exp\!\big(-\frac{\varepsilon}{2S_Z(f)}d_Z(y,f(x))\big)}{\int_{z\in Z}\exp\!\big(-\frac{\varepsilon}{2S_Z(f)}d_Z(z,f(x))\big)dz}.\tag{6}
$$

> [!theorem] Theorem 3.7 - metric-space noise is $\varepsilon$-DP (p. 37)
> In a metric space where $p_{f(x),\varepsilon/S_Z(f)}(\cdot)$ is well defined for all $x$, adding noise to $f(x)$ as in Eq. (6) preserves $\varepsilon$-differential privacy.
^thm-metric-noise

> [!proof]- Proof (p. 37)
> Let $x,x'$ be neighbours; $d_Z(f(x),f(x'))\le S_Z(f)$. For any $y$, the numerators' ratio is
> $$
> \exp\!\left(\tfrac{\varepsilon}{2S_Z(f)}\big(d_Z(y,f(x'))-d_Z(y,f(x))\big)\right)\le\exp\!\left(\tfrac{\varepsilon}{2S_Z(f)}d_Z(f(x),f(x'))\right)\le e^{\varepsilon/2},
> $$
> by the triangle inequality and the definition of $S_Z$. The same argument applied to the integrand shows the normalising constants at $x$ and $x'$ differ by at most a factor $e^{\varepsilon/2}$. The density ratio is therefore at most $e^{\varepsilon/2}\cdot e^{\varepsilon/2}=e^{\varepsilon}$.

> [!remark] Remark 3.1
> One can drop the factor 2 in $p_{z,\varepsilon}$ when the normalisation factor does not depend on $x$. This introduces slightly less noise.
^rem-drop-factor-two

> [!example] Hamming-cube output (p. 37)
> **Setup.** $f(x)\in\{0,1\}^d$ with $d_Z=$ Hamming distance. **Release.** Flip each output bit independently. With Theorem 3.7's exact form each bit flips with probability $\frac{1}{1+e^{\varepsilon/(2S(f))}}\approx\frac12-\frac{\varepsilon}{4S(f)}$. With the Remark 3.1 variant (the normaliser is the same for every $x$ on the cube), the flip probability is $\frac{1}{1+e^{\varepsilon/S(f)}}\approx\frac12-\frac{\varepsilon}{2S(f)}$, which is the value the paper prints ("roughly $\frac12-\frac{\varepsilon}{2S(f)}$").
^ex-hamming-cube

### Sec. 3.4 - what followed (p. 38)

- The Laplace mechanism "remains widely used, both as is, and as a subroutine", and is the basis for most implementations.
- **$L_2$ sensitivity** is the right notion for Gaussian noise, giving $(\varepsilon,\delta)$-DP (Dwork et al. 2006a).
- **Smooth sensitivity** (Nissim et al. 2007): noise depends on both $f$ and $x$, calibrated to the local variability of $f$ near $x$. **Propose-test-release** (Dwork and Lei 2009): first test, with DP, that sensitivity is low near $x$, then add Laplace noise.
- **Linear queries**: Blum, Ligett, Roth (2008) showed data-dependent noise can release exponentially many linear queries accurately; follow-ups use multiplicative weights (Dwork et al. 2009; Hardt-Rothblum 2010) and geometry (Hardt-Talwar 2010).
- **Non-numeric outputs**: the *exponential mechanism* (McSherry-Talwar 2007) extends Laplace as a basic construction and underlies private learning (Kasiviswanathan et al. 2008). See [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]].

## Examples

Release of a point in a 2-d metric space (own code): sample a location with density $\propto\exp(-\frac{\varepsilon}{2S}\|y-f(x)\|_2)$ over a bounded box by rejection or grid sampling.

```python
import numpy as np
rng = np.random.default_rng(3)
eps, S = 1.0, 0.1                         # one edit moves f(x) by at most 0.1 in Euclidean distance
f_x = np.array([0.4, 0.6])
g = np.linspace(0, 1, 201)
Y1, Y2 = np.meshgrid(g, g)
w = np.exp(-eps / (2 * S) * np.hypot(Y1 - f_x[0], Y2 - f_x[1])).ravel()
w /= w.sum()                               # discrete (grid) version of Eq. (6)
idx = rng.choice(w.size, p=w)
print(Y1.ravel()[idx], Y2.ravel()[idx])
```

## Connections

- **Marketing measurement.** Non-numeric or structured outputs (a selected top-$k$ campaign list, a clipped geography ranking) need this "sample by closeness" rather than additive noise. The modern form is the exponential mechanism.
- **Local sensitivity** (smooth sensitivity, PTR) is relevant when a global bound is very loose, for example when a single large advertiser dominates a cell: global sensitivity must assume the worst case unless contributions are clipped.

## See Also

- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]]
- [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]
- [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]
- [[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]] (statistical accuracy of the exponential mechanism)
