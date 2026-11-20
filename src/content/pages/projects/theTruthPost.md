---
slug: "/projects/the-truth-post"
description: "The news application of Decentralized Curation. Its accuracy layer went live on Ethereum mainnet in June 2023: what shipped and what did not."
draft: false
toc: false
---

# The Truth Post

The news application of [Decentralized Curation](/projects/decentralized-curation/). A partial version, the accuracy layer only, went live on Ethereum mainnet in June 2023.

## What It Is

A news protocol, not a single website. The full design, specified in the [framework paper](https://doi.org/10.5281/zenodo.20543760), has authors post articles with a bond, challengers contest inaccurate ones before an external court, and curators in each pool score relevance against that pool's published policy.

## What Shipped in June 2023

The accuracy layer:

- An author publishes an article with a bond in ether.
- Anyone can challenge it by paying a fee.
- A [Kleros](https://kleros.io) jury decides whether the article is accurate according to its curation pool's policy. If it is ruled inaccurate, it is marked debunked and the challenger takes the bond.
- Each article has a trust score: its bond, weighted by how long it has stood.

The launch post counted the curation pools, each with its own policy, as partial relevancy curation. Relevance scoring by curators did not ship, and neither did rewards for authors or the removal of the admin rights the contract kept. The launch post said so.

## What Happened

Five items were published on the contract between June and November 2023: a description of the news pool, the launch announcement and three other articles. Two were later withdrawn. As of April 2026 the contract had recorded 16 external transactions and no visible challenge, so the deployment does not show that the dispute path works end to end. The framework paper reads this as unsuccessful bootstrapping.

## Where It Stands

The contract is still on Ethereum mainnet. The app at [truthpost.news](https://truthpost.news) is the 2023 version and loads its articles from the contract. In September 2026 we repaired the app's indexer, which had stopped showing them. Since 2024 it has had only maintenance.

## Limits

The 2023 deployment is a partial predecessor of the full design. The framework paper, not the deployed contract, is the reference for The Truth Post, and no live deployment validates the complete design.

## Links

- App, 2023 version: [truthpost.news](https://truthpost.news)
- Contract: [0x87aa…b454 on Etherscan](https://etherscan.io/address/0x87aade1067ed0276ec9bef6db8e17abe27a6b454)
- Code: [github.com/proveuswrong](https://github.com/proveuswrong)
- Launch post, June 2023: [The Truth Post Launches on Ethereum Mainnet](https://medium.com/prove-us-wrong/the-revolution-in-news-curation-the-truth-post-launches-on-ethereum-mainnet-89304f3728d9)
