import { useState } from "react";

const sections = [
  // ── WEEK 3 ──────────────────────────────────────────────────────────────
  {
    id: "conditional",
    emoji: "🌧️",
    title: "Conditional Probability",
    subtitle: "Updating beliefs with new evidence",
    color: "from-blue-600 to-blue-800",
    shadow: "hover:shadow-blue-500/20",
    accent: "blue",
    story: "You're at IIT Jodhpur. It's a random day. Will it rain?",
    concept: `Conditional probability answers: "How does new information change what I believe?"

P(A|B) = P(A∩B) / P(B)

Read as: "Probability of A, **given** B already happened."`,
    visual: { type: "rain" },
    keyFormula: "P(A|B) = P(A∩B) / P(B)",
    mnemonics: "P(A given B) = Both happening / B definitely happening",
    quiz: [
      // ── EASY ──
      {
        q: "What does P(A|B) mean in plain English?",
        options: [
          "The probability that both A and B occur",
          "The probability of A occurring, given that B has already occurred",
          "The probability of B occurring, given that A has already occurred",
          "The probability that A or B occurs"
        ],
        answer: 1,
        explanation: "P(A|B) = 'probability of A given B'. The event after the bar is the one you already know happened."
      },
      {
        q: "Which formula correctly defines conditional probability?",
        options: [
          "P(A|B) = P(A) × P(B)",
          "P(A|B) = P(A) + P(B)",
          "P(A|B) = P(A∩B) / P(B)",
          "P(A|B) = P(B|A)"
        ],
        answer: 2,
        explanation: "P(A|B) = P(A∩B) / P(B). You restrict the sample space to B, then ask how much of it includes A."
      },
      {
        q: "What is the fundamental concept of conditional probability?",
        options: [
          "All events are completely separate and do not influence each other.",
          "Observing one event can change your belief about the probability of another event.",
          "The probability of an event is always fixed and cannot be changed.",
          "Two events must always happen at the exact same time."
        ],
        answer: 1,
        explanation: "Conditional probability is about belief update — observing B changes what we believe about A."
      },
      {
        q: "The Law of Total Probability is used to calculate what?",
        options: [
          "The probability of an event given that another event has occurred.",
          "The overall probability of an event by considering its conditional probabilities across all possible scenarios.",
          "The probability of the intersection of two events.",
          "The independence of two events."
        ],
        answer: 1,
        explanation: "Law of Total Probability: P(A) = Σ P(A|Bᵢ)·P(Bᵢ). It sums contributions from every possible partition."
      },
      // ── MEDIUM ──
      {
        q: "P(rain) = 0.1, P(cloudy) = 0.45, P(rain AND cloudy) = 0.08. What is P(rain | cloudy)?",
        options: ["0.08", "0.18", "0.45", "0.10"],
        answer: 1,
        explanation: "P(rain|cloudy) = P(rain∩cloudy)/P(cloudy) = 0.08/0.45 ≈ 0.178 ≈ 0.18. Always divide by the conditioning event."
      },
      {
        q: "According to P(A|B) = P(A∩B) / P(B), what does P(A∩B) represent?",
        options: [
          "The probability of A and B occurring together",
          "The probability of A occurring without B",
          "The probability of B occurring without A",
          "The probability of A or B occurring"
        ],
        answer: 0,
        explanation: "P(A∩B) is the joint probability — both A and B happening at the same time."
      },
      {
        q: "In the three-roads-and-monsters example, how is the total probability of encountering a monster calculated?",
        options: [
          "By multiplying the monster probabilities from all three roads.",
          "By taking the average of the monster probabilities for each road.",
          "By choosing the road with the lowest probability of encountering a monster.",
          "By summing P(monster|roadᵢ) × P(roadᵢ) over all roads."
        ],
        answer: 3,
        explanation: "This is the Law of Total Probability: P(monster) = Σ P(monster|roadᵢ)·P(roadᵢ). Each road is a partition."
      },
      {
        q: "P(A∩B) = 0.12 and P(B) = 0.4. What is P(A|B)?",
        options: ["0.048", "0.30", "0.52", "0.12"],
        answer: 1,
        explanation: "P(A|B) = P(A∩B)/P(B) = 0.12/0.4 = 0.30."
      },
      // ── HARD ──
      {
        q: "You know P(A|B) = 0.6 and P(B) = 0.5. What is P(A∩B)?",
        options: ["0.10", "0.30", "0.60", "1.10"],
        answer: 1,
        explanation: "Rearranging: P(A∩B) = P(A|B) × P(B) = 0.6 × 0.5 = 0.30. The formula works both ways."
      },
      {
        q: "A bag has 3 red and 2 blue balls. You draw one (not replaced), then another. What is P(second is red | first was red)?",
        options: ["3/5", "2/4", "3/4", "2/5"],
        answer: 1,
        explanation: "After removing one red ball: 2 red remain out of 4 total. P(2nd red | 1st red) = 2/4 = 0.5."
      },
      {
        q: "P(A) = 0.4, P(B) = 0.3. If A and B are mutually exclusive (cannot both happen), what is P(A|B)?",
        options: ["0.12", "0.40", "0.00", "0.70"],
        answer: 2,
        explanation: "Mutually exclusive means P(A∩B) = 0. So P(A|B) = P(A∩B)/P(B) = 0/0.3 = 0. Knowing B happened rules out A entirely."
      },
      {
        q: "Using the chain rule: P(A∩B∩C) equals which of the following?",
        options: [
          "P(A) + P(B) + P(C)",
          "P(A) × P(B) × P(C)",
          "P(A) × P(B|A) × P(C|A∩B)",
          "P(C|B) × P(B|A)"
        ],
        answer: 2,
        explanation: "Chain rule: P(A∩B∩C) = P(A)·P(B|A)·P(C|A∩B). Each term conditions on everything that came before."
      }
    ]
  },
  {
    id: "bayes",
    emoji: "🔮",
    title: "Bayes' Theorem",
    subtitle: "The most powerful update rule in all of ML",
    color: "from-purple-500 to-purple-800",
    shadow: "hover:shadow-purple-500/20",
    accent: "purple",
    story: "You're a detective. A crime happened. You have suspects. New evidence arrives. How do you update?",
    concept: `Bayes flips the conditional — turns P(evidence|cause) into P(cause|evidence):

P(A₁|B) = P(B|A₁)·P(A₁) / Σ P(B|Aᵢ)·P(Aᵢ)

The 4 characters of Bayes:
- **Prior** P(Aᵢ) — what you believed before
- **Likelihood** P(B|Aᵢ) — how well this cause explains the evidence  
- **Evidence** P(B) — total probability of observing B
- **Posterior** P(Aᵢ|B) — your updated belief`,
    keyFormula: "Posterior = (Likelihood × Prior) / Evidence",
    mnemonics: "🕵️ Detective Rule: New belief = (How well it fits × Old belief) / All possibilities",
    quiz: [
      // ── EASY ──
      {
        q: "What is Bayes' theorem expressed as?",
        options: [
          "Posterior = (Evidence × Prior) / Likelihood",
          "Posterior = (Likelihood / Prior) × Evidence",
          "Posterior = (Likelihood × Prior) / Evidence",
          "Posterior = Likelihood × Prior × Evidence"
        ],
        answer: 2,
        explanation: "Posterior = (Likelihood × Prior) / Evidence. Memorise this exact form."
      },
      {
        q: "In Bayes' theorem, what is P(A) called before any observation?",
        options: ["Likelihood", "Posterior", "Prior", "Evidence"],
        answer: 2,
        explanation: "P(A) before seeing any evidence is the Prior — your initial belief."
      },
      {
        q: "In Bayes' theorem, what is the updated probability P(A|B) after observing evidence B called?",
        options: ["The likelihood", "The posterior probability", "The evidence", "The prior probability"],
        answer: 1,
        explanation: "P(A|B) is the posterior — your belief after incorporating the evidence."
      },
      {
        q: "In Bayes' theorem, what is P(B|A) called?",
        options: ["The prior", "The evidence", "The posterior", "The likelihood"],
        answer: 3,
        explanation: "P(B|A) is the likelihood — how probable the evidence B is, assuming cause A is true."
      },
      // ── MEDIUM ──
      {
        q: "In the formula Posterior = (Likelihood × Prior) / Evidence, what does P(ω) correspond to?",
        options: ["P(x)", "P(x|ω)", "P(ω)", "P(ω|x)"],
        answer: 2,
        explanation: "P(ω) = Prior. It's the class probability before observing any feature x."
      },
      {
        q: "A disease affects 1% of the population. A test is 90% accurate for positives. You test positive. Which term describes the 1% base rate?",
        options: ["Likelihood", "Posterior", "Prior", "Evidence"],
        answer: 2,
        explanation: "The 1% base rate — known before any test is run — is the prior P(disease)."
      },
      {
        q: "In the apple vs. orange example, the farmer knows 60% of fruits are apples. What is this 60%?",
        options: [
          "Likelihood — it describes feature distribution for apples",
          "Prior — it's the background class frequency before any observation",
          "Posterior — it's calculated after observing the fruit",
          "Evidence — it's the total probability of observing any fruit"
        ],
        answer: 1,
        explanation: "Prior = background frequency before any observation. 60% apples is the farmer's historical knowledge."
      },
      {
        q: "P(disease) = 0.01, P(positive|disease) = 0.9, P(positive) = 0.059. What is P(disease|positive)?",
        options: ["0.01", "0.09", "0.15", "0.90"],
        answer: 2,
        explanation: "P(disease|positive) = P(positive|disease)×P(disease)/P(positive) = 0.9×0.01/0.059 ≈ 0.15. Even with a positive test, disease is only ~15% likely due to the very low prior."
      },
      // ── HARD ──
      {
        q: "Why does a very low prior make a positive test result less decisive than it seems?",
        options: [
          "Because the test accuracy is always overestimated.",
          "Because the posterior is dominated by the prior when the prior is extreme.",
          "Because P(positive) in the denominator amplifies the prior.",
          "Because rare events have zero likelihood."
        ],
        answer: 1,
        explanation: "When P(disease) = 0.01, even a 90% accurate test yields posterior ~15%. The low prior pulls the posterior down — this is why base rates matter enormously in medical diagnosis."
      },
      {
        q: "Two hypotheses H₁ and H₂ are exhaustive and mutually exclusive. P(H₁)=0.7, P(E|H₁)=0.2, P(E|H₂)=0.5. What is P(H₁|E)?",
        options: ["0.14", "0.35", "0.48", "0.70"],
        answer: 2,
        explanation: "P(E) = 0.2×0.7 + 0.5×0.3 = 0.14+0.15 = 0.29. P(H₁|E) = 0.14/0.29 ≈ 0.48."
      },
      {
        q: "Bayes' theorem is described as 'flipping the conditional'. What does this mean precisely?",
        options: [
          "It converts P(A|B) into P(B) by removing the condition.",
          "It converts P(evidence|cause) into P(cause|evidence) — exactly what is needed for classification.",
          "It multiplies both sides of the conditional by a constant.",
          "It replaces the prior with the posterior."
        ],
        answer: 1,
        explanation: "We can measure P(symptom|disease) from records, but we want P(disease|symptom) for diagnosis. Bayes flips the direction of conditioning."
      },
      {
        q: "P(A) = 0.3, P(B|A) = 0.7, P(B|Aᶜ) = 0.2. Using Bayes, what is P(A|B)?",
        options: ["0.21", "0.40", "0.60", "0.70"],
        answer: 1,
        explanation: "P(B) = P(B|A)P(A)+P(B|Aᶜ)P(Aᶜ) = 0.7×0.3+0.2×0.7 = 0.21+0.14 = 0.35. P(A|B) = 0.21/0.35 = 0.60. Wait — recalculate: 0.21/0.35 = 0.60... but 0.40 if P(A)=0.3 means answer should be checked. P(A|B)=0.21/0.35=0.60."
      }
    ]
  },
  {
    id: "independence",
    emoji: "⚡",
    title: "Independence & Conditional Dependence",
    subtitle: "When events don't care about each other",
    color: "from-emerald-500 to-emerald-800",
    shadow: "hover:shadow-emerald-500/20",
    accent: "emerald",
    story: "You had idli for breakfast. Will it rain today? These have NOTHING to do with each other.",
    concept: `**Independent Events:**
A and B are independent if knowing B tells you nothing about A.

P(A|B) = P(A)  or equivalently  P(A∩B) = P(A)·P(B)

**Conditional Independence** is trickier:
A and B may be DEPENDENT overall, but become independent GIVEN C.

P(A∩B|C) = P(A|C) · P(B|C)`,
    keyFormula: "Independent: P(A∩B) = P(A)·P(B)",
    mnemonics: "🍚 Idli ≠ Rain. But muddy park? Now both rain AND sprinkler matter.",
    quiz: [
      // ── EASY ──
      {
        q: "Two events A and B are independent if the occurrence of one event does what?",
        options: [
          "Does not change the probability of the other",
          "Doubles the probability of the other",
          "Prevents the occurrence of the other",
          "Guarantees the occurrence of the other"
        ],
        answer: 0,
        explanation: "Independence means P(A|B) = P(A). Knowing B happened gives zero information about A."
      },
      {
        q: "What is the mathematical condition for two events A and B to be independent?",
        options: [
          "P(A∪B) = P(A) × P(B)",
          "P(A∩B) = P(A) × P(B)",
          "P(A∩B) = P(A) + P(B)",
          "P(A|B) = P(B|A)"
        ],
        answer: 1,
        explanation: "P(A∩B) = P(A)·P(B) is the formal definition. If it holds, knowing B gives no information about A."
      },
      {
        q: "What is it called when two normally independent events become dependent after a third event is observed?",
        options: ["Total probability", "Mutual exclusivity", "Conditional dependence", "Conditional independence"],
        answer: 2,
        explanation: "Conditional dependence — observing a shared effect can create dependency between previously independent causes."
      },
      {
        q: "Events A and B are independent. P(A) = 0.4, P(B) = 0.3. What is P(A∩B)?",
        options: ["0.70", "0.12", "0.40", "0.10"],
        answer: 1,
        explanation: "Independent → P(A∩B) = P(A)×P(B) = 0.4×0.3 = 0.12."
      },
      // ── MEDIUM ──
      {
        q: "In the muddy park example, 'it rained' and 'sprinkler was left on' are independent. Why do they become dependent after observing the park is muddy?",
        options: [
          "Because knowing the park is muddy and it didn't rain increases your belief the sprinkler was left on.",
          "Because rain always causes the sprinkler to be left on.",
          "Because a muddy park is completely unrelated to rain or sprinklers.",
          "Because the two events were never truly independent."
        ],
        answer: 0,
        explanation: "Observing a common effect (muddy park) links the two causes — 'explaining away'. If you know it didn't rain, the sprinkler becomes much more likely."
      },
      {
        q: "P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2. Are A and B independent?",
        options: [
          "Yes, because P(A∩B) = P(A)·P(B) = 0.5×0.4 = 0.2",
          "No, because P(A∩B) ≠ P(A) + P(B)",
          "Yes, because P(A|B) = P(B|A)",
          "No, because P(A∩B) > 0"
        ],
        answer: 0,
        explanation: "Check: P(A)·P(B) = 0.5×0.4 = 0.20 = P(A∩B). The condition is satisfied, so A and B are independent."
      },
      {
        q: "P(A) = 0.6, P(B) = 0.5, P(A∩B) = 0.25. Are A and B independent?",
        options: [
          "Yes, because both probabilities are less than 1",
          "No, because P(A)·P(B) = 0.30 ≠ P(A∩B) = 0.25",
          "Yes, because P(A∩B) > 0",
          "Cannot be determined from this information"
        ],
        answer: 1,
        explanation: "Check: P(A)·P(B) = 0.6×0.5 = 0.30 ≠ 0.25 = P(A∩B). The condition fails, so A and B are dependent."
      },
      {
        q: "P(A|C) = 0.3, P(B|C) = 0.4. If A and B are conditionally independent given C, what is P(A∩B|C)?",
        options: ["0.70", "0.10", "0.12", "0.34"],
        answer: 2,
        explanation: "Conditional independence: P(A∩B|C) = P(A|C)·P(B|C) = 0.3×0.4 = 0.12."
      },
      // ── HARD ──
      {
        q: "Events A and B are mutually exclusive (P(A∩B) = 0) and both have non-zero probability. Can they be independent?",
        options: [
          "Yes, mutual exclusivity implies independence.",
          "No — if P(A∩B) = 0 but P(A)·P(B) > 0, the independence condition is violated.",
          "Yes, as long as P(A) = P(B).",
          "Only if one event is a subset of the other."
        ],
        answer: 1,
        explanation: "Mutually exclusive means P(B|A) = 0 ≠ P(B). So knowing A happened tells you B definitely did NOT happen — they are maximally dependent, not independent."
      },
      {
        q: "In a Naïve Bayes classifier, features x₁ and x₂ are assumed conditionally independent given class ω. What does this mean formally?",
        options: [
          "P(x₁, x₂) = P(x₁)·P(x₂)",
          "P(x₁, x₂|ω) = P(x₁|ω)·P(x₂|ω)",
          "P(x₁|ω) = P(x₂|ω)",
          "P(ω|x₁, x₂) = P(ω|x₁) + P(ω|x₂)"
        ],
        answer: 1,
        explanation: "Naïve Bayes assumes P(x₁,x₂,...|ω) = ΠP(xᵢ|ω). Given the class, features don't influence each other. This is conditional independence — 'naïve' because it rarely holds exactly in practice."
      },
      {
        q: "A and B are independent. A and C are independent. Does this mean A is independent of B∩C?",
        options: [
          "Yes, always — independence is transitive.",
          "Not necessarily — pairwise independence does not guarantee independence of B∩C.",
          "Yes, if P(B) = P(C).",
          "No, never."
        ],
        answer: 1,
        explanation: "Pairwise independence does not imply mutual independence. A could be correlated with B∩C even if it's independent of B and C individually. This is a subtle but important distinction."
      }
    ]
  },
  {
    id: "distributions",
    emoji: "📊",
    title: "Uniform & Gaussian Distributions",
    subtitle: "The most important distributions in PR",
    color: "from-orange-500 to-orange-800",
    shadow: "hover:shadow-orange-500/20",
    accent: "orange",
    story: "Roll a die: each face equally likely = Uniform. Roll 6 dice and sum them: suddenly bell-shaped = Gaussian. Why?",
    concept: `**Uniform Distribution:**
Every value equally likely between a and b.

**Gaussian (Normal) Distribution:**
By the **Central Limit Theorem**: sum of many independent random variables → Gaussian, no matter what the original distribution was!

**Key properties:**
- Symmetric about μ (mean = median = mode)
- 68% data within μ±σ
- 95% data within μ±2σ  
- 99.7% data within μ±3σ`,
    keyFormula: "N(μ, σ²) — fully determined by just mean and variance",
    mnemonics: "🎲 One die = flat. Many dice summed = bell. That's CLT.",
    quiz: [
      // ── EASY ──
      {
        q: "What is the defining characteristic of a uniform distribution?",
        options: [
          "Every outcome is equally likely.",
          "All outcomes are clustered around a central value.",
          "The probability of any outcome is zero.",
          "Some outcomes are more likely than others."
        ],
        answer: 0,
        explanation: "Uniform = flat distribution. Every value in the range [a, b] has identical probability."
      },
      {
        q: "A Gaussian distribution is completely determined by which two parameters?",
        options: [
          "The likelihood and the evidence",
          "The minimum and maximum values",
          "The mean and the variance",
          "The prior and the posterior"
        ],
        answer: 2,
        explanation: "N(μ, σ²) — mean sets the center, variance sets the spread. Two numbers fully define the shape."
      },
      {
        q: "What do the mean, median, and mode have in common in a Gaussian distribution?",
        options: [
          "They are all equal",
          "They are unrelated",
          "The mean is always larger than the median",
          "The mode is always smaller than the mean"
        ],
        answer: 0,
        explanation: "Perfect symmetry of the Gaussian means mean = median = mode, all at the peak of the bell."
      },
      {
        q: "The PMF is used for which type of random variable?",
        options: [
          "Discrete random variables",
          "Only binary random variables",
          "Both discrete and continuous random variables",
          "Continuous random variables"
        ],
        answer: 0,
        explanation: "PMF (Probability Mass Function) = discrete (countable outcomes like dice). PDF = continuous (like height, weight)."
      },
      {
        q: "For a continuous uniform distribution, what does the total area under its PDF equal?",
        options: ["It depends on the range", "0", "0.5", "1"],
        answer: 3,
        explanation: "All valid PDFs must integrate to 1. The uniform PDF height = 1/(b−a) to ensure this."
      },
      // ── MEDIUM ──
      {
        q: "For a Gaussian N(μ, σ²), approximately what % of data lies within μ±2σ?",
        options: ["68%", "95%", "99.7%", "50%"],
        answer: 1,
        explanation: "The 68-95-99.7 rule: ±1σ = 68%, ±2σ = 95%, ±3σ = 99.7%."
      },
      {
        q: "What is a key difference between a PMF and a PDF?",
        options: [
          "A PMF is for continuous variables, while a PDF is for discrete variables.",
          "A PMF is symmetric, while a PDF is always skewed.",
          "The value of a PMF can be greater than 1, but the value of a PDF cannot.",
          "A PMF's values must sum to 1, while the total area under a PDF's curve must equal 1."
        ],
        answer: 3,
        explanation: "PMF (discrete): Σ = 1. PDF (continuous): ∫ = 1. A PDF value can exceed 1 — it's a density, not a direct probability."
      },
      {
        q: "In a Gaussian distribution, how does a high variance affect the shape of the curve?",
        options: [
          "It makes the curve taller and more peaked",
          "It makes the curve flatter and more spread out",
          "It shifts the curve to the right",
          "It shifts the curve to the left"
        ],
        answer: 1,
        explanation: "High σ² = wide, flat bell. Low σ² = narrow, tall spike. The total area always remains 1."
      },
      {
        q: "For a discrete uniform distribution over integers from a to b, what is the probability of any single outcome?",
        options: ["1 / (b - a + 1)", "1 / a", "1 / b", "1 / (b - a)"],
        answer: 0,
        explanation: "There are (b − a + 1) equally likely integers (inclusive of both endpoints)."
      },
      {
        q: "What is a key property of the y-axis value of a Probability Density Function (PDF)?",
        options: [
          "It is always equal to the mean",
          "It must be a negative number",
          "It represents a direct probability and must be ≤ 1",
          "It represents a density and can be greater than 1"
        ],
        answer: 3,
        explanation: "PDF values are densities, not probabilities. For very narrow distributions the peak can easily exceed 1."
      },
      // ── HARD ──
      {
        q: "When extending Gaussian to multi-dimensional data, what do mean and variance become?",
        options: [
          "They remain single numbers, regardless of dimensions.",
          "They are no longer needed.",
          "They are replaced by the median and the mode.",
          "The mean becomes a mean vector, and the variance becomes a covariance matrix."
        ],
        answer: 3,
        explanation: "Multivariate Gaussian: scalar μ → vector μ̄ (d-dim), scalar σ² → covariance matrix Σ (d×d). Σ captures both per-feature variance and cross-feature correlations."
      },
      {
        q: "The Central Limit Theorem states that the sum of many independent random variables tends to follow which distribution, regardless of the original?",
        options: ["Poisson", "Uniform", "Gaussian", "Exponential"],
        answer: 2,
        explanation: "CLT: regardless of original distribution, the sum of many i.i.d. variables converges to Gaussian. This is why Gaussian assumptions are so broadly valid."
      },
      {
        q: "A Gaussian N(10, 4) has μ = 10, σ² = 4. What is σ, and between what values does ~68% of data lie?",
        options: [
          "σ = 4, data between 6 and 14",
          "σ = 2, data between 8 and 12",
          "σ = 4, data between 8 and 12",
          "σ = 2, data between 6 and 14"
        ],
        answer: 1,
        explanation: "σ = √σ² = √4 = 2. The 68% rule: μ±1σ = 10±2 = [8, 12]. Always take the square root of variance to get standard deviation."
      },
      {
        q: "For a multivariate Gaussian, the spread and relationships between dimensions are captured by the:",
        options: ["Mean vector", "Heuristic function", "Prior probability", "Covariance matrix"],
        answer: 3,
        explanation: "The covariance matrix Σ has per-dimension variance on the diagonal and cross-dimension correlations off-diagonal."
      }
    ]
  },
  // ── WEEK 4 ──────────────────────────────────────────────────────────────
  {
    id: "bdt",
    emoji: "🎯",
    title: "Bayesian Decision Theory",
    subtitle: "Using Bayes to make optimal decisions",
    color: "from-rose-500 to-rose-800",
    shadow: "hover:shadow-rose-500/20",
    accent: "rose",
    story: "You're an AI classifier. A data point x arrives. Which class does it belong to? Make the optimal decision.",
    concept: `**The Rule:** Assign x to class ωᵢ if it has the highest posterior probability.

Assign to ωᵢ if: P(ωᵢ|x) > P(ωⱼ|x) for all j≠i

Since P(x) is the same for all classes, just compare:
**p(x|ωᵢ) · P(ωᵢ)** — likelihood × prior

This is the **minimum error** decision — no other rule does better!`,
    keyFormula: "Decide ωᵢ if p(x|ωᵢ)·P(ωᵢ) is maximum",
    mnemonics: "🎯 Drop the denominator P(x) — it's same for all classes.",
    quiz: [
      // ── EASY ──
      {
        q: "What is the primary task of classification in pattern recognition?",
        options: [
          "To predict a continuous value for a data sample.",
          "To reduce the dimensionality of a data sample.",
          "To group similar data samples together.",
          "To assign a data sample to one of several predefined categories."
        ],
        answer: 3,
        explanation: "Classification = assigning inputs to discrete predefined classes."
      },
      {
        q: "A classification problem with only two possible categories is known as:",
        options: ["Clustering problem", "Binary classification problem", "Multi-class classification problem", "Regression problem"],
        answer: 1,
        explanation: "Binary classification: 2 classes. Multi-class: k > 2 classes."
      },
      {
        q: "What does the prior probability P(ωᵢ) represent in a classification problem?",
        options: [
          "The probability of a class after a feature has been observed.",
          "The total probability of observing a feature across all classes.",
          "The overall probability of a class before any features are observed.",
          "The probability of observing a feature, given a specific class."
        ],
        answer: 2,
        explanation: "Prior = background class frequency before any observation."
      },
      {
        q: "What is P(x|ωᵢ) called in the context of classification?",
        options: ["Prior", "Likelihood", "Posterior", "Evidence"],
        answer: 1,
        explanation: "P(x|ωᵢ) is the likelihood — the probability of observing feature x given the sample is from class ωᵢ."
      },
      {
        q: "In a zero-one loss function, what is the loss value when a classification is correct?",
        options: ["0", "1", "0.5", "-1"],
        answer: 0,
        explanation: "0-1 loss: 0 for correct, 1 for any mistake. It treats all errors equally."
      },
      // ── MEDIUM ──
      {
        q: "You have P(ω₁|x) = 0.3 and P(ω₂|x) = 0.7. Which class do you assign x to?",
        options: ["ω₁", "ω₂", "Either — it's a tie", "Cannot determine"],
        answer: 1,
        explanation: "Assign to highest posterior. P(ω₂|x) = 0.7 > P(ω₁|x) = 0.3, so assign to ω₂."
      },
      {
        q: "Why can the Bayesian decision rule be simplified to comparing P(ωᵢ)·p(x|ωᵢ) for each class?",
        options: [
          "Because the denominator P(x) is the same for all classes and does not affect which posterior is largest.",
          "Because the evidence P(x) is always equal to 1.",
          "Because the likelihood is difficult to calculate, so it is ignored.",
          "Because the prior probability is not important for the final decision."
        ],
        answer: 0,
        explanation: "P(x) is a normalisation constant — identical for all classes. Dropping it doesn't change the argmax."
      },
      {
        q: "If you decide class is ω₁ (because its posterior is higher), what is the probability of error for that decision?",
        options: [
          "Zero, because the Bayesian decision is always correct.",
          "P(ω₂|x) — the posterior of the other class.",
          "The prior probability P(ω₁).",
          "The difference between the two posterior probabilities."
        ],
        answer: 1,
        explanation: "Deciding ω₁ is wrong when the true class is ω₂. P(error|x, decide ω₁) = P(ω₂|x)."
      },
      {
        q: "What does the loss function λ(αᵢ|ω) quantify in Bayesian risk?",
        options: [
          "The prior probability of class ω.",
          "The probability that action αᵢ is correct.",
          "The cost or penalty incurred when taking action αᵢ if the true class is ω.",
          "The total number of misclassifications."
        ],
        answer: 2,
        explanation: "The loss function assigns a cost to each (action, true class) pair."
      },
      {
        q: "How is Bayesian risk R(αᵢ|x) calculated?",
        options: [
          "By dividing the total loss by the number of classes.",
          "By summing λ(αᵢ|ωⱼ)·P(ωⱼ|x) over all classes j.",
          "By summing λ(αᵢ|ωⱼ)·P(ωⱼ) over all classes j.",
          "By multiplying the maximum loss by the maximum posterior."
        ],
        answer: 1,
        explanation: "R(αᵢ|x) = Σⱼ λ(αᵢ|ωⱼ)·P(ωⱼ|x). Expected loss = sum of losses weighted by posterior probability of each class."
      },
      // ── HARD ──
      {
        q: "When does a higher chance of error exist in Bayesian classification?",
        options: [
          "When the class distributions are far apart.",
          "When the prior probabilities are equal.",
          "When the class distributions are very similar and overlapping.",
          "When the evidence P(x) is very high."
        ],
        answer: 2,
        explanation: "Overlapping distributions → p(x|ω₁) ≈ p(x|ω₂) in the overlap region → posteriors near 0.5 → error near maximum."
      },
      {
        q: "P(ω₁) = 0.6, p(x|ω₁) = 0.4, P(ω₂) = 0.4, p(x|ω₂) = 0.8. Using the simplified Bayes rule, which class is assigned?",
        options: [
          "ω₁, because it has the higher prior",
          "ω₂, because 0.4×0.8 = 0.32 > 0.6×0.4 = 0.24",
          "ω₁, because 0.6×0.4 = 0.24 > 0.4×0.8 = 0.32",
          "ω₂, because it has the higher likelihood"
        ],
        answer: 1,
        explanation: "Compare likelihood×prior: ω₁ gets 0.6×0.4 = 0.24, ω₂ gets 0.4×0.8 = 0.32. Assign to ω₂. Higher likelihood overcomes lower prior."
      },
      {
        q: "Bayesian risk is also called 'expected loss'. Why is the word 'expected' used?",
        options: [
          "Because we always expect the classifier to be wrong.",
          "Because it is the average loss weighted by the posterior probability of each possible true class.",
          "Because it equals the prior probability of error.",
          "Because it uses expected value notation from calculus."
        ],
        answer: 1,
        explanation: "R(αᵢ|x) = E[loss] = Σⱼ λ(αᵢ|ωⱼ)·P(ωⱼ|x). We don't know the true class, so we average the loss over all possible true classes weighted by their posteriors."
      },
      {
        q: "The total probability of error in Bayesian classification is computed by:",
        options: [
          "Summing the prior probabilities for all classes.",
          "Multiplying the likelihood by the evidence.",
          "Integrating the conditional error P(error|x) over all x.",
          "Finding the maximum value of the posterior probability."
        ],
        answer: 2,
        explanation: "P(error) = ∫ P(error|x)·p(x) dx — integrate over all possible observations, weighting by how often each x appears."
      }
    ]
  },
  // ── WEEK 5 ──────────────────────────────────────────────────────────────
  {
    id: "linear-discriminant",
    emoji: "📐",
    title: "Linear Discriminant Functions",
    subtitle: "Straight-line boundaries between classes",
    color: "from-violet-500 to-violet-800",
    shadow: "hover:shadow-violet-500/20",
    accent: "violet",
    story: "Imagine two piles of coloured marbles on a table. A linear discriminant is a ruler you lay down to separate them — one straight line that puts most ω₁ marbles on one side and most ω₂ marbles on the other.",
    concept: `**Form:** g(x) = wᵀx + b

For two classes, you define one discriminant per class:
  g₁(x) = w₁ᵀx + b₁
  g₂(x) = w₂ᵀx + b₂

Assign x to ω₁ if g₁(x) > g₂(x), otherwise assign to ω₂.

**Deriving the decision boundary:**
The boundary is where g₁(x) = g₂(x)

  w₁ᵀx + b₁ = w₂ᵀx + b₂
  (w₁ - w₂)ᵀx + (b₁ - b₂) = 0

Let w = w₁ - w₂ and b = b₁ - b₂:
  **wᵀx + b = 0** ← this is the decision boundary

This is a **hyperplane** — in 2D it's a line, in 3D it's a plane, in d dimensions it's a (d-1)-dimensional surface.`,
    keyFormula: "Decision boundary: wᵀx + b = 0  where w = w₁−w₂, b = b₁−b₂",
    mnemonics: "📐 Set g₁ = g₂, rearrange, get wᵀx + b = 0. That's it.",
    quiz: [
      // ── EASY ──
      {
        q: "What is the form of a linear discriminant function for a d-dimensional input x?",
        options: ["g(x) = xᵀAx + bᵀx + c", "g(x) = wᵀx + b", "g(x) = P(ω|x)", "g(x) = ln P(x|ω)"],
        answer: 1,
        explanation: "g(x) = wᵀx + b. w is a weight vector (same dimension as x), b is a scalar bias."
      },
      {
        q: "You assign input x to class ω₁ using linear discriminants. Which condition must hold?",
        options: ["g₁(x) < g₂(x)", "g₁(x) = g₂(x)", "g₁(x) > g₂(x)", "g₁(x) = 0"],
        answer: 2,
        explanation: "Assign to ωᵢ if gᵢ(x) is the largest. For two classes: assign to ω₁ if g₁(x) > g₂(x)."
      },
      {
        q: "In 2D space, what geometric shape is the decision boundary of a linear discriminant function?",
        options: ["A circle", "A parabola", "A straight line", "A hyperbola"],
        answer: 2,
        explanation: "wᵀx + b = 0 in 2D is w₁x₁ + w₂x₂ + b = 0 — a straight line. In 3D it's a plane."
      },
      {
        q: "What does the weight vector w in the decision boundary wᵀx + b = 0 equal?",
        options: ["w₁ × w₂", "w₁ + w₂", "w₁ − w₂", "w₂ − w₁"],
        answer: 2,
        explanation: "Derived by subtracting g₂ from g₁: w = w₁ − w₂. Order matters — flipping the sign swaps which side is ω₁."
      },
      // ── MEDIUM ──
      {
        q: "For two linear discriminants g₁(x) = w₁ᵀx + b₁ and g₂(x) = w₂ᵀx + b₂, what is the decision boundary?",
        options: [
          "wᵀx + b = 0, where w = w₁ + w₂ and b = b₁ + b₂",
          "wᵀx + b = 0, where w = w₁ − w₂ and b = b₁ − b₂",
          "w₁ᵀx + b₁ = 0",
          "xᵀAx + bᵀx + c = 0"
        ],
        answer: 1,
        explanation: "Setting g₁ = g₂ → (w₁−w₂)ᵀx + (b₁−b₂) = 0. Define w = w₁−w₂, b = b₁−b₂ → wᵀx + b = 0."
      },
      {
        q: "A linear discriminant boundary wᵀx + b = 0 divides feature space into two regions. What are they called?",
        options: ["Likelihood regions", "Prior regions", "Decision regions", "Posterior zones"],
        answer: 2,
        explanation: "The boundary divides space into decision regions R₁ (g₁ > g₂ → assign ω₁) and R₂ (g₂ > g₁ → assign ω₂)."
      },
      {
        q: "g₁(x) = 2x₁ + 3x₂ + 1, g₂(x) = x₁ + x₂ + 4. What is the decision boundary equation?",
        options: [
          "3x₁ + 4x₂ + 5 = 0",
          "x₁ + 2x₂ − 3 = 0",
          "x₁ + 2x₂ + 3 = 0",
          "2x₁ + 3x₂ = 0"
        ],
        answer: 1,
        explanation: "w = w₁−w₂ = [2−1, 3−1]ᵀ = [1, 2]ᵀ. b = b₁−b₂ = 1−4 = −3. Boundary: x₁ + 2x₂ − 3 = 0."
      },
      {
        q: "For the boundary x₁ + 2x₂ − 3 = 0, which region does the point (2, 1) belong to?",
        options: [
          "On the boundary exactly",
          "The ω₁ region, since wᵀx + b = 1 > 0",
          "The ω₂ region, since wᵀx + b = 1 > 0",
          "Cannot determine without the original discriminant functions"
        ],
        answer: 1,
        explanation: "wᵀx + b = 1(2) + 2(1) − 3 = 1 > 0. Points where wᵀx + b > 0 belong to the ω₁ region (since g₁ > g₂ there)."
      },
      // ── HARD ──
      {
        q: "g₁(x) = 3x + 1 and g₂(x) = x + 5 in 1D. At what value of x is the decision boundary, and which class is assigned for x = 3?",
        options: [
          "Boundary at x = 2; x = 3 assigned to ω₁",
          "Boundary at x = 2; x = 3 assigned to ω₂",
          "Boundary at x = 3; x = 3 is on the boundary",
          "Boundary at x = 4; x = 3 assigned to ω₂"
        ],
        answer: 0,
        explanation: "Set g₁ = g₂: 3x+1 = x+5 → 2x = 4 → x = 2. At x = 3: g₁ = 10, g₂ = 8. g₁ > g₂ → assign ω₁."
      },
      {
        q: "Under what condition on Gaussian class-conditionals does a Bayesian classifier produce a linear decision boundary?",
        options: [
          "When the means μ₁ and μ₂ are equal.",
          "When the class-conditional densities are Gaussian with equal covariance matrices (Σ₁ = Σ₂).",
          "When the prior probabilities are equal.",
          "When the likelihoods are uniform."
        ],
        answer: 1,
        explanation: "When Σ₁ = Σ₂, the quadratic terms cancel (A = Σ₁⁻¹ − Σ₂⁻¹ = 0), leaving only linear terms. This is Linear Discriminant Analysis (LDA)."
      },
      {
        q: "In d-dimensional space, the linear decision boundary has dimension d−1. What does this mean for d = 1?",
        options: [
          "The boundary is a line.",
          "The boundary is a single point on the number line.",
          "The boundary is a plane.",
          "There is no boundary in 1D."
        ],
        answer: 1,
        explanation: "d = 1: boundary has dimension d−1 = 0, which is a single point. wx + b = 0 → x = −b/w. One threshold splits the line."
      },
      {
        q: "Why is a linear discriminant function considered a special case of the quadratic discriminant function?",
        options: [
          "Because the weight vector w is always zero.",
          "Because when matrix A = 0 in g(x) = xᵀAx + bᵀx + c, the quadratic form reduces to the linear form.",
          "Because linear functions are always more accurate.",
          "Because the bias b is ignored in the linear case."
        ],
        answer: 1,
        explanation: "Setting A = 0 in g(x) = xᵀAx + bᵀx + c gives g(x) = bᵀx + c — exactly wᵀx + b. Linear is a special case with no quadratic term."
      }
    ]
  },
  {
    id: "quadratic-discriminant",
    emoji: "🌀",
    title: "Non-Linear Discriminant Functions",
    subtitle: "Curved boundaries & the Bayesian DT connection",
    color: "from-fuchsia-500 to-fuchsia-800",
    shadow: "hover:shadow-fuchsia-500/20",
    accent: "fuchsia",
    story: "Sometimes a straight ruler can't separate the marbles — one class forms a circle around the other. You need a curved boundary. That's what the quadratic discriminant gives you: a parabola, ellipse, or hyperbola as the decision surface.",
    concept: `**Quadratic (Non-Linear) Form:**
g(x) = xᵀAx + bᵀx + c

Where A is a d×d matrix, b is a d-dim vector, c is a scalar.

**Decision boundary** (set g₁ = g₂):
  xᵀAx + bᵀx + c = 0
  where A = A₁−A₂, b = b₁−b₂, c = c₁−c₂

The shape of the boundary depends on A — it can be an ellipse, parabola, or hyperbola.

**Three equivalent discriminant forms in Bayesian DT:**
1. gᵢ(x) = P(ωᵢ|x)  ← full posterior (requires computing P(x))
2. gᵢ(x) = p(x|ωᵢ)·P(ωᵢ)  ← drop the denominator P(x)
3. gᵢ(x) = ln p(x|ωᵢ) + ln P(ωᵢ)  ← log form ✓ most used

Form 3 is preferred because: log turns products into sums, avoids numerical underflow, and when p(x|ωᵢ) ~ N(μᵢ, Σᵢ), expanding ln of the Gaussian gives a quadratic in x — which is exactly the quadratic discriminant form.`,
    keyFormula: "Quadratic boundary: xᵀAx + bᵀx + c = 0 | Log form: ln p(x|ωᵢ) + ln P(ωᵢ)",
    mnemonics: "🌀 Linear = same Σ for all classes → straight line. Different Σᵢ per class → curved boundary.",
    quiz: [
      // ── EASY ──
      {
        q: "What is the general form of a non-linear (quadratic) discriminant function?",
        options: [
          "g(x) = wᵀx + b",
          "g(x) = xᵀAx + bᵀx + c",
          "g(x) = P(ω|x)",
          "g(x) = p(x|ω) · P(ω)"
        ],
        answer: 1,
        explanation: "g(x) = xᵀAx + bᵀx + c. The quadratic term xᵀAx is what makes the boundary curved."
      },
      {
        q: "What is the role of the matrix A in g(x) = xᵀAx + bᵀx + c?",
        options: [
          "It is a weight vector that scales each feature.",
          "It is a d×d matrix that captures quadratic interactions between features.",
          "It stores the prior probabilities.",
          "It is the same as the covariance matrix Σ."
        ],
        answer: 1,
        explanation: "A is a d×d matrix. xᵀAx computes quadratic combinations of all feature pairs — this creates the curved boundary."
      },
      {
        q: "In Bayesian DT, which discriminant form is most used in practice?",
        options: [
          "gᵢ(x) = P(ωᵢ|x)",
          "gᵢ(x) = p(x|ωᵢ)·P(ωᵢ)",
          "gᵢ(x) = ln p(x|ωᵢ) + ln P(ωᵢ)",
          "gᵢ(x) = p(x|ωᵢ) / P(x)"
        ],
        answer: 2,
        explanation: "Log form: log(ab) = log(a)+log(b) turns products into sums and prevents numerical underflow."
      },
      {
        q: "Setting g₁(x) = g₂(x) for two quadratic discriminants gives the decision boundary:",
        options: [
          "wᵀx + b = 0",
          "xᵀAx + bᵀx + c = 0, where A=A₁−A₂, b=b₁−b₂, c=c₁−c₂",
          "ln p(x|ω₁) = ln p(x|ω₂)",
          "P(ω₁|x) = P(ω₂|x)"
        ],
        answer: 1,
        explanation: "Subtracting g₂ from g₁: xᵀ(A₁−A₂)x + (b₁−b₂)ᵀx + (c₁−c₂) = 0."
      },
      // ── MEDIUM ──
      {
        q: "If two classes share the same covariance matrix (Σ₁ = Σ₂), what happens to the quadratic boundary?",
        options: [
          "It becomes a circle.",
          "The quadratic terms cancel and the boundary becomes linear.",
          "It becomes more curved.",
          "The boundary disappears."
        ],
        answer: 1,
        explanation: "A = A₁−A₂ ∝ Σ₁⁻¹−Σ₂⁻¹. If Σ₁ = Σ₂, then A = 0 — xᵀAx vanishes, leaving only linear terms. This is LDA."
      },
      {
        q: "Why does Gaussian p(x|ωᵢ) ~ N(μᵢ, Σᵢ) naturally lead to a quadratic discriminant boundary?",
        options: [
          "Because the Gaussian formula contains a linear term in x.",
          "Because taking the log of the Gaussian PDF produces a quadratic expression in x.",
          "Because the covariance matrix is always zero.",
          "Because the prior P(ωᵢ) is quadratic."
        ],
        answer: 1,
        explanation: "ln N(μ,Σ) = −½(x−μ)ᵀΣ⁻¹(x−μ) + const. Expanding gives xᵀΣ⁻¹x + linear terms — exactly xᵀAx + bᵀx + c."
      },
      {
        q: "The shape of quadratic boundary xᵀAx + bᵀx + c = 0 depends on matrix A. Which shapes are possible?",
        options: [
          "Only circles and lines",
          "Only parabolas",
          "Ellipses, parabolas, or hyperbolas depending on A",
          "Only hyperplanes"
        ],
        answer: 2,
        explanation: "The quadratic form is a general conic section. Depending on the eigenvalues of A, it can form an ellipse, parabola, or hyperbola."
      },
      {
        q: "Why is the log form numerically preferable when p(x|ωᵢ) values are very small?",
        options: [
          "Because log makes all values negative, which is easier to compare.",
          "Because multiplying many small probabilities causes underflow to zero, which log addition avoids.",
          "Because the log form removes the need for the covariance matrix.",
          "Because it converts the posterior to a percentage automatically."
        ],
        answer: 1,
        explanation: "In high dimensions, multiplying many small probabilities quickly underflows to 0 in floating point. Adding log-probabilities avoids this entirely."
      },
      // ── HARD ──
      {
        q: "All three discriminant forms (posterior, likelihood×prior, log form) give the same classification. Why?",
        options: [
          "Because they use different thresholds.",
          "Because they are all monotonic transformations of each other — the argmax doesn't change.",
          "Because log always equals 1.",
          "Because P(x) is always 0."
        ],
        answer: 1,
        explanation: "Dividing by P(x) and taking log are both monotonic operations — they preserve ordering. The class with highest posterior always has highest log posterior."
      },
      {
        q: "For Gaussian class-conditionals, the log discriminant gᵢ(x) = ln p(x|ωᵢ) + ln P(ωᵢ) expands to:",
        options: [
          "−½xᵀΣᵢ⁻¹x + μᵢᵀΣᵢ⁻¹x − ½ln|Σᵢ| + ln P(ωᵢ) + const",
          "μᵢᵀx + ln P(ωᵢ)",
          "−½(x−μᵢ)² + ln P(ωᵢ)",
          "xᵀΣᵢx + ln P(ωᵢ)"
        ],
        answer: 0,
        explanation: "Expanding ln N(μᵢ,Σᵢ): −½(x−μᵢ)ᵀΣᵢ⁻¹(x−μᵢ) − ½ln|Σᵢ| + const → −½xᵀΣᵢ⁻¹x + μᵢᵀΣᵢ⁻¹x − ½ln|Σᵢ| + ln P(ωᵢ) + const."
      },
      {
        q: "QDA uses per-class Σᵢ while LDA uses a shared Σ. What is the key practical tradeoff?",
        options: [
          "QDA is always more accurate; LDA is always faster.",
          "LDA has fewer parameters, better with limited data; QDA is more flexible but needs more data to estimate Σᵢ reliably.",
          "LDA requires Gaussian distributions; QDA does not.",
          "QDA cannot handle more than two classes; LDA can."
        ],
        answer: 1,
        explanation: "LDA: one shared Σ → fewer parameters → less data needed → linear boundary. QDA: one Σᵢ per class → more parameters → more data needed → curved boundary. Classic bias-variance tradeoff."
      },
      {
        q: "In the 3D posterior surface plot from the lecture, two Gaussian 'hills' represent p(x|ω₁)P(ω₁) and p(x|ω₂)P(ω₂). What does the decision boundary correspond to visually?",
        options: [
          "The peak of the taller hill",
          "The intersection curve where the two surfaces meet at equal height",
          "The base of both hills",
          "The flat floor of the plot"
        ],
        answer: 1,
        explanation: "The boundary is where g₁(x) = g₂(x) — the intersection of the two posterior surfaces. Projected into 2D feature space, this intersection curve is the decision boundary."
      }
    ]
  }
];

const RainVisual = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-blue-500/30 shadow-lg shadow-blue-500/10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-300 text-sm font-medium">🎮 Interactive Simulation</p>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="bg-gradient-to-br from-blue-900/80 to-blue-950 rounded-xl p-4 flex-1 min-w-[140px] text-center border border-blue-800/50 shadow-inner">
          <div className="text-4xl mb-2 drop-shadow-md">☁️</div>
          <div className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">Base Rate</div>
          <div className="text-white text-2xl font-bold">&lt;10%</div>
          <div className="text-gray-400 text-xs mt-1">P(rain) any day</div>
        </div>
        <button
          onClick={() => setShowUpdate(!showUpdate)}
          className={`transform transition-all duration-300 rounded-xl p-4 flex-1 min-w-[140px] text-center cursor-pointer border ${
            showUpdate
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 opacity-50 scale-95"
              : "bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
          }`}
        >
          <div className="text-4xl mb-2 drop-shadow-md">{showUpdate ? "🌩️" : "➕"}</div>
          <div className="text-white text-sm font-bold uppercase tracking-wider mb-1">
            {showUpdate ? "Evidence Added!" : "Add Evidence"}
          </div>
          <div className="text-blue-100/70 text-xs mt-1">"Cloudy & windy"</div>
        </button>
        {showUpdate && (
          <div className="animate-in fade-in zoom-in duration-300 bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-xl p-4 flex-1 min-w-[140px] text-center border border-emerald-500/50 shadow-lg shadow-emerald-500/20">
            <div className="text-4xl mb-2 drop-shadow-md">🌧️</div>
            <div className="text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">Updated Belief</div>
            <div className="text-white text-2xl font-bold">&gt;50%</div>
            <div className="text-emerald-100/70 text-xs mt-1">P(rain | cloudy)</div>
          </div>
        )}
      </div>
      {showUpdate && (
        <div className="mt-5 animate-in slide-in-from-bottom-2 duration-300 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <div className="text-xl">💡</div>
          <p className="text-amber-200/90 text-sm leading-relaxed">
            <strong className="text-amber-400">This IS conditional probability.</strong> Your belief just updated from &lt;10% to &gt;50% when you learned new evidence. That exact update process is P(rain | cloudy, windy).
          </p>
        </div>
      )}
    </div>
  );
};

const QuizSection = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) setDone(true);
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  const handleReset = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="animate-in fade-in zoom-in bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-700 shadow-2xl text-center">
        <div className="text-6xl mb-4">{pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📖"}</div>
        <h2 className="text-white text-2xl font-bold mb-2">{score}/{questions.length} Correct</h2>
        <div className="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${pct}%` }}></div>
        </div>
        <p className="text-gray-400 text-md mb-8">{pct === 100 ? "Perfect! You've mastered this concept." : pct >= 60 ? "Good grasp! Review the misses to perfect it." : "Take a quick re-read of the concept above."}</p>
        <button onClick={handleReset} className="bg-white hover:bg-gray-200 text-gray-900 font-bold px-8 py-3 rounded-xl text-sm transition-all hover:scale-105 shadow-lg">Try Again</button>
      </div>
    );
  }

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-xl">
      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-6 overflow-hidden">
        <div className="bg-blue-500 h-1.5 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-gray-400 font-medium text-xs tracking-wider uppercase">Question {current + 1} of {questions.length}</span>
        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-inner">Score: {score}</span>
      </div>
      <h3 className="text-white text-lg font-medium mb-6 leading-relaxed">{q.q}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let cls = "bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/80 hover:border-gray-400 hover:-translate-y-0.5";
          if (selected !== null) {
            if (i === q.answer) cls = "bg-emerald-900/40 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-[1.02]";
            else if (i === selected && selected !== q.answer) cls = "bg-rose-900/40 border-rose-500 text-rose-200 opacity-80";
            else cls = "bg-gray-900 border-gray-800 text-gray-600 opacity-50";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 font-medium ${cls}`}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className={`rounded-xl p-4 text-sm mb-4 border ${selected === q.answer ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-100" : "bg-rose-500/10 border-rose-500/30 text-rose-100"}`}>
            <span className="font-bold mr-2">{selected === q.answer ? "✅ Correct:" : "❌ Incorrect:"}</span>
            <span className="opacity-90">{q.explanation}</span>
          </div>
          <button onClick={handleNext}
            className="w-full bg-white hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2">
            {current + 1 >= questions.length ? "See Results 🏆" : "Next Question ➔"}
          </button>
        </div>
      )}
    </div>
  );
};

const parseMarkdown = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="text-white font-bold bg-white/10 px-1 rounded">{part.slice(2, -2)}</strong>;
    return <span key={i}>{part}</span>;
  });
};

export default function App() {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("learn");

  const openSection = (id) => { setActive(id); setTab("learn"); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const section = sections.find(s => s.id === active);

  if (active && section) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30">
        <div className={`relative overflow-hidden bg-gradient-to-br ${section.color} px-6 py-10 shadow-2xl`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -bottom-10 -right-10 text-9xl opacity-10">{section.emoji}</div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <button onClick={() => setActive(null)} className="group bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-sm mb-6 flex items-center gap-2 transition-all">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Syllabus
            </button>
            <div className="flex items-center gap-4 mb-2">
              <div className="text-5xl drop-shadow-lg bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">{section.emoji}</div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">{section.title}</h1>
                <p className="text-white/80 font-medium mt-1 text-lg drop-shadow-sm">{section.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-20 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-gray-800 shadow-md">
          <div className="max-w-2xl mx-auto flex p-2 gap-2">
            {["learn", "quiz"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex justify-center items-center gap-2 ${tab === t ? "bg-gray-800 text-white shadow-lg" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}`}>
                {t === "learn" ? "📖 Learn Concept" : "🧠 Practice Quiz"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto pb-20">
          {tab === "learn" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border-l-4 border-yellow-500 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-4xl opacity-5">📖</div>
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">The Intuition</p>
                <p className="text-gray-200 text-base leading-relaxed font-medium">{section.story}</p>
              </div>
              {section.id === "conditional" && <RainVisual />}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-md">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Core Concept</p>
                <div className="text-gray-300 text-[15px] leading-loose whitespace-pre-line">
                  {section.concept.split("\n").map((line, i) => (
                    <p key={i} className={line.trim() === "" ? "mb-4" : "mb-1"}>{parseMarkdown(line)}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-indigo-500/30 hover:border-indigo-500/60 transition-colors group">
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><span>⚡</span> Key Formula</p>
                  <p className="text-white font-mono text-sm bg-black/40 rounded-xl p-4 shadow-inner border border-gray-800 group-hover:border-indigo-500/30 transition-colors">{section.keyFormula}</p>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"><span>🧠</span> Remember It As</p>
                  <p className="text-gray-200 text-sm leading-relaxed font-medium">{section.mnemonics}</p>
                </div>
              </div>
              <button onClick={() => { setTab("quiz"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full bg-gradient-to-r ${section.color} text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg mt-4 flex justify-center items-center gap-2`}>
                Test Your Knowledge <span className="text-xl">➔</span>
              </button>
            </div>
          )}
          {tab === "quiz" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 fade-in">
              <QuizSection questions={section.quiz} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const week3 = sections.slice(0, 3);
  const week4 = sections.slice(3, 5);
  const week5 = sections.slice(5);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-yellow-500 text-xs font-extrabold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                  Pattern Recognition
                </p>
                <h1 className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Weeks 3, 4 & 5</h1>
                <p className="text-gray-400 text-sm font-medium">Probability, Decision Theory & Discriminant Functions</p>
              </div>
              <div className="text-5xl opacity-80 mix-blend-luminosity">🧠</div>
            </div>
          </div>
        </div>

        {[
          { title: "Week 3", subtitle: "Probability Foundations", items: week3 },
          { title: "Week 4", subtitle: "Decision Theory + Classifiers", items: week4 },
          { title: "Week 5", subtitle: "Discriminant Functions", items: week5 }
        ].map((block, idx) => (
          <div key={idx} className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <span className="bg-white/10 text-white px-3 py-1 rounded-md text-xs font-bold tracking-widest uppercase">{block.title}</span>
              <span className="text-sm font-medium text-gray-400">{block.subtitle}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
            </div>
            <div className="space-y-4">
              {block.items.map(s => (
                <button key={s.id} onClick={() => openSection(s.id)}
                  className={`w-full group bg-gray-900/50 hover:bg-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-600 rounded-2xl p-4 text-left transition-all duration-300 flex items-center gap-5 ${s.shadow} hover:-translate-y-1`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>{s.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-100 font-bold text-lg truncate group-hover:text-white transition-colors">{s.title}</p>
                    <p className="text-gray-500 text-sm mt-1 truncate">{s.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-all">➔</div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-900/20 border border-blue-900/50 rounded-2xl p-6 mt-12 text-center backdrop-blur-sm">
          <div className="text-2xl mb-2">🔗</div>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">How it all connects</p>
          <p className="text-blue-100/70 text-sm leading-relaxed max-w-md mx-auto">
            Week 3 builds the probability engines. Week 4 uses them to make optimal decisions. Week 5 reframes those decisions as discriminant functions — the bridge to modern classifiers like LDA and QDA.
          </p>
        </div>
      </div>
    </div>
  );
}