---
slug: "/story"
draft: false
toc: true
---

# Our Story

Five years, in order, including the parts that did not work.

## 2021: Prove Me Wrong

Our work began in late 2021 with a project called Prove Me Wrong. The idea: publish a claim with a bounty on it, and let anyone who can prove it false before a [Kleros](https://kleros.io) court take the bounty.

The reasoning starts from a classic example. Proving that all swans are white would mean observing every swan. Proving it false takes one black swan. Where refuting a claim is feasible and cheaper than verifying it, open challenges can do the checking. Our framework still builds on that asymmetry.

We named the organization after the project, with a twist: Prove Us Wrong. [[CONFIRM: Prove Us Wrong, the organization, dates from January 2022.]]

## 2022: The Kleros Incubator

In April 2022 Cooperative Kleros started the second cohort of its incubator, with Prove Me Wrong and Yubiai ([Kleros, July 2022](https://blog.kleros.io/kleros-community-update-june-2022/)). The cohort's demo day was in August 2022. The incubator funded our early work.

The same year we turned the mechanism to one domain, news, and started building The Truth Post.

## 2023: The Truth Post Goes Live

In March 2023 we dropped the Prove Me Wrong name, and the April 2023 Kleros Incubator demo day listed us as Prove Us Wrong. On 6 June 2023 we deployed The Truth Post's contract to Ethereum mainnet, and on 14 June we [announced the launch](https://medium.com/prove-us-wrong/the-revolution-in-news-curation-the-truth-post-launches-on-ethereum-mainnet-89304f3728d9).

What shipped was the accuracy part of the design. An author publishes an article with a bond. Anyone can challenge it. A Kleros jury decides whether the article is accurate according to its curation pool's policy; if the challenge succeeds, the article is marked debunked and the challenger takes the bond. The launch post counted these pools, each with its own policy, as partial relevancy curation.

What did not ship: relevance scoring by curators, rewards for authors, and the removal of the admin rights the contract kept. The launch post said so.

Then the part that did not work. Five items were published on the contract between June and November 2023: a description of the news pool, the launch announcement and three other articles. Two were later withdrawn. As of April 2026 the contract had recorded 16 external transactions and no visible challenge, so the deployment does not show that the dispute path works end to end. The framework paper reads this as unsuccessful bootstrapping and draws design requirements from it.

## 2024 and 2025: Quiet, Then a Thesis

We built no new features in 2024 or 2025; the work was maintenance.

In December 2025 we published [Curation: The Bottleneck of the Information Age](https://medium.com/prove-us-wrong/curation-the-bottleneck-of-the-information-age-194a92df0080). Its argument: access to information is no longer the bottleneck; curation is. Information quality has many dimensions, and they need different mechanisms. Some, like accuracy, can be checked. Others, like relevance, need a consensus. News is the first domain, not the only one.

## 2026: A Framework and an Application

In 2026 Ferit, our founder, published [Decentralized Curation](/projects/decentralized-curation/) as a preprint. It investigates the thesis that decentralized curation games can make the pursuit of private gain produce public benefit, and turns it into a general method: define the curation problem, find the quality dimensions that matter, use challenges wherever proving a claim false is feasible and cheaper than checking everything, and design one mechanism per dimension. The Truth Post is its worked example for news.

In October 2026 his second preprint, [Decentralized Curation for Public Goods](/projects/public-goods/), applied the framework to assessing and funding public goods. It is an application of the framework, not the framework.

[Arrow](/projects/arrow/), a planned curation experiment at Octant, tests one part of the design: invited experts score real work against a published policy.

## What We Have Not Shown

No live deployment has validated the complete design. The 2023 Truth Post was a partial predecessor, and it saw little use. The papers' analysis does not establish that honest answers are each participant's best response, or that the outcomes benefit the public. Arrow assumes its jurors are honest and competent and do not collude, so it does not validate the full permissionless design either. These questions are open.

That is the point of the name. Prove us wrong.

*Last updated [[CONFIRM: month and year of publishing]].*
