---
title: Multilevel Modeling
type: concept
tags:
  - statistics
  - methodology
  - bayesian-statistics
aliases:
  - multilevel modeling
  - hierarchical modeling
---

# Multilevel Modeling

A statistical approach that models data with multiple levels of grouping or nesting, allowing partial pooling of information across groups.

## Role in Addressing Multiple Comparisons

[[Gelman and Loken 2013 - The Garden of Forking Paths]] recommend multilevel modeling as a way to resolve [[Multiple Comparisons Problem|multiple comparisons issues]] (see Gelman, Hill, and Yajima, 2012). Rather than focusing on a single comparison or small set of comparisons, multilevel models analyze all relevant comparisons simultaneously, with partial pooling shrinking estimates toward a common mean.

## Advantages

- Handles multiplicity naturally through shrinkage
- Does not require pre-specifying which comparisons to focus on
- Appropriate Bayesian analysis should be conditional on all the data, not just one highlighted comparison

## Limitations

- Practical difficulties when comparisons are few or the problem is highly structured
- Inference can be sensitive to model assumptions
- Requires additional modeling effort

## Related

- [[Multiple Comparisons Problem]]
- [[Bayesian Statistics]]
- [[Gelman and Loken 2013 - The Garden of Forking Paths]]
