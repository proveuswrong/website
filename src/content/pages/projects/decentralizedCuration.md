---
slug: "/projects/decentralized-curation"
draft: false
toc: false
---

# Decentralized Curation

A general framework for curation in any information domain. It is the research of our founder, Ferit Tunçer, and it investigates one thesis: that decentralized curation games can make people's pursuit of private gain produce public benefit.

## The Idea

Curation decides what we read, trust and fund. Usually someone trusted does it. The framework proposes to replace the trusted curator with open rules designed to reward people for producing, assessing and correcting information.

In the paper, trustless means one thing: no single actor is trusted. The design may still rely on an honest majority of jurors or of curator stake, or on at least one honest challenger. No blockchain application is fully trustless.

## How It Works

The framework is a method in four steps:

1. Define the curation problem.
2. Identify the quality dimensions that matter for it.
3. Where proving a claim false is feasible and cheaper than checking everything, use challenges.
4. Design one mechanism per dimension.

In the news design, two dimensions do most of the work:

- **Accuracy** is about facts, within a claim's stated scope and time. An author posts a claim with a bond, and a challenger may contest it with counter-evidence. An external dispute resolution system decides; for news, that is Kleros. A successful challenger takes the author's bond.
- **Relevance** is about what matters to a community. It is not true or false. Curators score items from 0 to 1 against the pool's published policy, and are rewarded for scores that cohere with the rest.

Accuracy alone is not enough. "One equals one" is accurate. It is not news.

Three commitments shape the architecture. Anyone can create a pool. Contracts are immutable: they change by migrating to a new deployment, not by upgrading in place. Governance is kept to a minimum.

## Where It Applies

The paper works out one information domain in full: news, as [The Truth Post](/projects/the-truth-post/). It sketches a second: advertising. A separate paper applies the framework to [public goods funding](/projects/public-goods/). Generality is a design goal; showing it takes more applications.

## Limits

The analysis does not establish that honest reporting is each participant's best response, or that the outcomes benefit the public. Adjudication can be wrong, and scoring faithfully under a policy does not show the policy is good. No live deployment has validated the complete design; the 2023 Truth Post was a partial predecessor. More in [our story](/story/#what-we-have-not-shown).

## Read It

Ferit Tunçer. *Decentralized Curation: Trustless Transformation of Information into Knowledge.* Preprint, 2026. CC BY 4.0. [doi.org/10.5281/zenodo.20543760](https://doi.org/10.5281/zenodo.20543760). This link always opens the latest version.

Background, in plain words: [Curation: The Bottleneck of the Information Age](https://medium.com/prove-us-wrong/curation-the-bottleneck-of-the-information-age-194a92df0080), December 2025.
