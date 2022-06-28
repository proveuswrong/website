---
slug: "/projects/prove-me-wrong"
draft: true
---

# <a name="PMW"></a> Prove Me Wrong: Curating Important Truth

In economics, a public good is a good that is both non-excludable and non-rivalrous. For such goods, users cannot be barred from accessing or using them for failing to pay for them. Also, use by one person neither prevents access of other people nor does it reduce availability to others. Information satisfies these properties. It's non-rivalrous: someone's consumption of a fact doesn't prevent others from consuming it. And it's non-excludable: one can consume a fact even if they haven't paid for it. But, it's not a good by default until it has two more properties: **trueness** and **importance**.

## Trueness and Verifiability vs Falsifiability

To be true, information needs to be filtered of misinformation. But how do we filter out misinformation? One way is to verify each statement (or claim, we will use both words interchangeably from now on). Verifying, however, is impractical since many statements, if not most, in daily life are infeasible to verify. One famous example is the following statement: all swans are white. Proving that "All swans are white" would logically require observing all swans, which is infeasible. In contrast, observing a single black swan is sufficient to falsify the claim logically. So it is more practical to look for a refutation instead of a proof. Can we know if a black swan (refutation) will be observed eventually? We can't unless we see all swans. But we don't need to know. We still can be confident about the statement because we can estimate its likelihood. And this is what PMW is about: estimating the probability of [falsifiable](https://en.wikipedia.org/wiki/Falsifiability) statements (claims).

## Curating What's Important

Even if information is a public good, thus it's free to use, we still pay with time. How to know if consuming a piece of information will worth our time investment? We can see examples of this problem in daily life. We don't watch random movies, we check their reviews, genre and storyline and decide only after that. We don't read random newsletters, magazines. We don't listen to random music, we listen to radios or artists we know. This is how we make sure the time we spend will be worthwhile. It's called curation and curation helps people everyday to invest their time effectively.

But curation has its own problems too. Consumer needs to trust the curator that curation was done as promised and there are no conflicts of interest. For example, in a curated list of restaurants, the consumer has to trust that the curator did not get bribed by a restaurant and that assessments are done fairly.

To remove the trust requirement from curation, PMW utilizes decentralized dispute resolution via [Kleros](https://kleros.io) and creates a **decentralized curation** for publicizing important information.

## What Is This Good For?

Some usecases:

- News: consume only true and important news
- Bug Bounties: if you address the requirement of private disclosure
- Advertisements: you can have advertisements with true information
- Political Campaigns: gain public trust with ease

## Actions

### To create

To make a falsifiable statement, by offering a security deposit determined by *claimer* of the statement.

### To challenge

To challenge a claim, in pursuit of debunking it and winning the bounty. 

### To curate

To categorize statements according to their importance, subjectively.

### To consume

To read statements which are distilled by curation and probabilistic truth filters.

## Actors

### Claimers

They make statements (claims) and put a bounty on them for anyone who can prove them wrong. They earn a share from reward pool depending on curation score.

### Inspectors

They look for counter-evidence and if they find challenge statements to win their bounty.

### Curators

Using a token, they vote for statements to curate them for importance. What's important depends on the usecase and the community.

### Readers

Enjoying distilled (true and important) information for free.

## Incentive Mechanisms and Token Economy

TODO.

Claimers have external incentives, such as spreading the word or gaining trust. For example, a bug bounty program would benefit spreading the word and bragging about no one is able to win the bounty, which indicates claim was highly likely true. Or, in a political campaign, claiming a politician is not corrupt would let the politician in question gain trust of public, provided high enough *trust score*.

Curators are incentivized by getting good claims rewarded, so that people see good work gets paid and keep doing good work.

Consumers are incentivized to keep using the platform because of the distilled information they get as an end product.



### Claim (Statement) Lifecycle in State Diagram

```mermaid

stateDiagram-v2


[*] --> Live: Create a new claim and put a bounty
Live --> Live: Mint tokens by reward mining
Live --> Challenged: Challenge - Burns tokens by challenge tax
Live --> Withdrawn: Withdraw - Burns tokens by withdrawal tax
Challenged --> Debunked: Arbitrator rules for debunk - Burns tokens by debunking tax
Challenged --> Live

Withdrawn --> [*]
Debunked --> [*]

```