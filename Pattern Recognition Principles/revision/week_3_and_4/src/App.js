import { useState } from "react";

const sections = [
  {
    id: "conditional",
    emoji: "🌧️",
    title: "Conditional Probability",
    subtitle: "Updating beliefs with new evidence",
    color: "from-blue-600 to-blue-800",
    accent: "blue",
    story: "You're at IIT Jodhpur. It's a random day. Will it rain?",
    concept: `Conditional probability answers: "How does new information change what I believe?"

P(A|B) = P(A∩B) / P(B)

Read as: "Probability of A, **given** B already happened."`,
    visual: {
      type: "rain",
    },
    keyFormula: "P(A|B) = P(A∩B) / P(B)",
    mnemonics: "P(A given B) = Both happening / B definitely happening",
    quiz: [
      {
        q: "P(rain) = 0.1, P(cloudy) = 0.45, P(rain AND cloudy) = 0.08. What is P(rain | cloudy)?",
        options: ["0.08", "0.18", "0.45", "0.10"],
        answer: 1,
        explanation: "P(rain|cloudy) = P(rain∩cloudy)/P(cloudy) = 0.08/0.45 ≈ 0.178 ≈ 0.18"
      },
      {
        q: "Which statement correctly defines conditional probability?",
        options: [
          "P(A|B) = P(A) × P(B)",
          "P(A|B) = P(A∩B) / P(B)",
          "P(A|B) = P(B|A)",
          "P(A|B) = P(A) + P(B)"
        ],
        answer: 1,
        explanation: "P(A|B) = P(A∩B)/P(B) — joint probability divided by the conditioning event's probability."
      }
    ]
  },
  {
    id: "bayes",
    emoji: "🔮",
    title: "Bayes' Theorem",
    subtitle: "The most powerful update rule in all of ML",
    color: "from-purple-600 to-purple-900",
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
      {
        q: "In Bayes' theorem, what is P(rain) called before any observation?",
        options: ["Likelihood", "Posterior", "Prior", "Evidence"],
        answer: 2,
        explanation: "P(rain) before seeing any evidence is the Prior — your initial belief."
      },
      {
        q: "P(rain)=0.1, P(cloudy|rain)=0.7, P(cloudy|no rain)=0.5, P(no rain)=0.9. What is P(cloudy)?",
        options: ["0.52", "0.70", "0.07", "0.45"],
        answer: 0,
        explanation: "P(cloudy) = P(cloudy|rain)×P(rain) + P(cloudy|no rain)×P(no rain) = 0.7×0.1 + 0.5×0.9 = 0.07 + 0.45 = 0.52"
      },
      {
        q: "Using above values, what is P(rain|cloudy)?",
        options: ["0.135", "0.70", "0.10", "0.07"],
        answer: 0,
        explanation: "P(rain|cloudy) = P(cloudy|rain)×P(rain)/P(cloudy) = (0.7×0.1)/0.52 = 0.07/0.52 ≈ 0.135"
      }
    ]
  },
  {
    id: "independence",
    emoji: "⚡",
    title: "Independence & Conditional Independence",
    subtitle: "When events don't care about each other",
    color: "from-green-600 to-green-900",
    accent: "green",
    story: "You had idli for breakfast. Will it rain today? These have NOTHING to do with each other.",
    concept: `**Independent Events:**
A and B are independent if knowing B tells you nothing about A.

P(A|B) = P(A)   or equivalently   P(A∩B) = P(A)·P(B)

**Conditional Independence** is trickier:
A and B may be DEPENDENT overall, but become independent GIVEN C.

P(A∩B|C) = P(A|C) · P(B|C)

Example: "It rained yesterday" (A) and "forgot sprinkler" (B) seem unrelated.
But given "park is muddy" (C), they become linked! Neither is independent anymore given C.`,
    keyFormula: "Independent: P(A∩B) = P(A)·P(B)",
    mnemonics: "🍚 Idli ≠ Rain. But muddy park? Now both rain AND sprinkler matter.",
    quiz: [
      {
        q: "Events A and B are independent. P(A)=0.4, P(B)=0.3. What is P(A∩B)?",
        options: ["0.70", "0.12", "0.40", "0.10"],
        answer: 1,
        explanation: "Independent means P(A∩B) = P(A)×P(B) = 0.4×0.3 = 0.12"
      },
      {
        q: "If P(A|B) = P(A), what can you conclude?",
        options: [
          "A and B are mutually exclusive",
          "A and B are independent",
          "A causes B",
          "P(B) = 0"
        ],
        answer: 1,
        explanation: "P(A|B) = P(A) is the definition of independence — B gives no new info about A."
      }
    ]
  },
  {
    id: "distributions",
    emoji: "📊",
    title: "Uniform & Gaussian Distributions",
    subtitle: "The two most important distributions in Pattern Recognition",
    color: "from-orange-500 to-orange-800",
    accent: "orange",
    story: "Roll a die: each face equally likely = Uniform. Roll 6 dice and sum them: suddenly bell-shaped = Gaussian. Why?",
    concept: `**Uniform Distribution:**
Every value equally likely between a and b.
- Discrete: P(x) = 1/(b−a+1)
- Continuous: f(x) = 1/(b−a)

**Gaussian (Normal) Distribution:**
f(x|μ,σ²) = (1/σ√2π) · exp(−(x−μ)²/2σ²)

By the **Central Limit Theorem**: sum of many independent random variables → Gaussian, no matter what the original distribution was!

**Key properties:**
- Symmetric about μ (mean = median = mode)
- 68% data within μ±σ
- 95% data within μ±2σ  
- 99.7% data within μ±3σ`,
    keyFormula: "N(μ, σ²) — fully determined by just mean and variance",
    mnemonics: "🎲 One die = flat. Many dice summed = bell. That's CLT.",
    quiz: [
      {
        q: "For a Gaussian distribution N(μ, σ²), approximately what % of data lies within μ±2σ?",
        options: ["68%", "95%", "99.7%", "50%"],
        answer: 1,
        explanation: "The 68-95-99.7 rule: ±1σ=68%, ±2σ=95%, ±3σ=99.7%"
      },
      {
        q: "What does the Central Limit Theorem tell us?",
        options: [
          "All distributions are uniform",
          "Sum of many independent variables tends to Gaussian",
          "Gaussian distribution has infinite variance",
          "Mean always equals mode"
        ],
        answer: 1,
        explanation: "CLT: regardless of original distribution, the sum/average of many independent variables converges to Gaussian."
      }
    ]
  },
  {
    id: "bdt",
    emoji: "🎯",
    title: "Bayesian Decision Theory",
    subtitle: "Using Bayes to make optimal classification decisions",
    color: "from-red-600 to-red-900",
    accent: "red",
    story: "You're an AI classifier. A data point x arrives. Which class does it belong to? Make the optimal decision.",
    concept: `**The Rule:** Assign x to class ωᵢ if it has the highest posterior probability.

Assign to ωᵢ if: P(ωᵢ|x) > P(ωⱼ|x) for all j≠i

Since P(x) is the same for all classes, just compare:
**p(x|ωᵢ) · P(ωᵢ)** — likelihood × prior

This is the **minimum error** decision — no other rule does better!

**Why it matters for AI/ML:**
- Naïve Bayes classifier (next week) is built entirely on this
- It's the theoretical optimum — all other classifiers try to approximate this`,
    keyFormula: "Decide ωᵢ if p(x|ωᵢ)·P(ωᵢ) is maximum",
    mnemonics: "🎯 Drop the denominator P(x) — it's same for all classes, irrelevant for comparison.",
    quiz: [
      {
        q: "You have P(ω₁|x)=0.3 and P(ω₂|x)=0.7. Which class do you assign x to?",
        options: ["ω₁", "ω₂", "Either — it's a tie", "Cannot determine"],
        answer: 1,
        explanation: "Assign to highest posterior. P(ω₂|x)=0.7 > P(ω₁|x)=0.3, so assign to ω₂."
      },
      {
        q: "Why can we drop P(x) when comparing posteriors across classes?",
        options: [
          "P(x) = 0 always",
          "P(x) is the same for all classes so doesn't affect comparison",
          "P(x) = 1 always",
          "It cancels only for 2 classes"
        ],
        answer: 1,
        explanation: "P(x) is the normalizing constant — identical for all classes. Dropping it doesn't change which class has maximum posterior."
      }
    ]
  },
  {
    id: "discriminant",
    emoji: "✂️",
    title: "Discriminant Functions",
    subtitle: "Drawing boundaries between classes",
    color: "from-teal-600 to-teal-900",
    accent: "teal",
    story: "Instead of computing full posteriors, let's just define a score function per class and pick the winner.",
    concept: `**Definition:** A set of functions {g₁(x), g₂(x), ..., gc(x)}, one per class.
Assign x to ωᵢ if gᵢ(x) > gⱼ(x) for all j≠i

**Three equivalent forms** (all give same decision):
1. gᵢ(x) = P(ωᵢ|x) — posterior directly
2. gᵢ(x) = p(x|ωᵢ)·P(ωᵢ) — drop denominator  
3. gᵢ(x) = ln p(x|ωᵢ) + ln P(ωᵢ) — log form ✓ most used

**Linear Discriminant (Example 1):**
gᵢ(x) = **w**ᵢᵀ**x** + bᵢ
Decision boundary: **w**ᵀ**x** + b = 0 → a LINE/HYPERPLANE

**Quadratic Discriminant (Example 2):**
gᵢ(x) = **x**ᵀAᵢ**x** + **b**ᵢᵀ**x** + cᵢ
Decision boundary: **x**ᵀA**x** + **b**ᵀ**x** + c = 0 → CURVE/ELLIPSE`,
    keyFormula: "Linear boundary = same Σ | Quadratic boundary = different Σᵢ",
    mnemonics: "✂️ Linear cuts with a straight knife. Quadratic cuts with a curved one.",
    quiz: [
      {
        q: "What is the decision boundary between two classes with linear discriminants g₁ and g₂?",
        options: [
          "Where g₁(x) is maximum",
          "Where g₁(x) = g₂(x)",
          "Where g₁(x) = 0",
          "Where g₂(x) is minimum"
        ],
        answer: 1,
        explanation: "The decision boundary is where two discriminant functions are equal — the transition zone between class regions."
      },
      {
        q: "If two classes have DIFFERENT covariance matrices Σ₁ ≠ Σ₂, what kind of boundary forms?",
        options: ["Linear", "Circular only", "Quadratic", "No boundary"],
        answer: 2,
        explanation: "Different covariance matrices → quadratic discriminant → curved (quadratic) decision boundary."
      },
      {
        q: "Why is the log form gᵢ(x) = ln p(x|ωᵢ) + ln P(ωᵢ) preferred?",
        options: [
          "It gives different decisions than the original",
          "It's easier to compute and avoids tiny floating point numbers",
          "It only works for 2 classes",
          "It removes the prior"
        ],
        answer: 1,
        explanation: "Log is monotonic so decisions are identical, but Gaussian PDFs involve exp() which creates tiny numbers. Log converts multiplication to addition and exp to polynomial — much cleaner."
      }
    ]
  }
];

const RainVisual = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  return (
    <div className="bg-gray-900 rounded-xl p-4 my-4 border border-blue-500">
      <p className="text-gray-300 text-sm mb-3">🎮 Click to add evidence:</p>
      <div className="flex gap-3 flex-wrap">
        <div className="bg-blue-900 rounded-lg p-3 flex-1 min-w-32 text-center">
          <div className="text-3xl mb-1">☁️</div>
          <div className="text-blue-300 text-xs font-bold">Base Rate</div>
          <div className="text-white text-xl font-bold">&lt;10%</div>
          <div className="text-gray-400 text-xs">P(rain) any day</div>
        </div>
        <button
          onClick={() => setShowUpdate(!showUpdate)}
          className="bg-gray-700 hover:bg-blue-700 transition-all rounded-lg p-3 flex-1 min-w-32 text-center cursor-pointer border border-gray-600 hover:border-blue-400"
        >
          <div className="text-3xl mb-1">{showUpdate ? "🌩️" : "➕"}</div>
          <div className="text-gray-300 text-xs font-bold">{showUpdate ? "Evidence Added!" : "Add Evidence"}</div>
          <div className="text-gray-400 text-xs">"It's cloudy & windy"</div>
        </button>
        {showUpdate && (
          <div className="bg-green-900 rounded-lg p-3 flex-1 min-w-32 text-center border border-green-500">
            <div className="text-3xl mb-1">🌧️</div>
            <div className="text-green-300 text-xs font-bold">Updated Belief</div>
            <div className="text-white text-xl font-bold">&gt;50%</div>
            <div className="text-gray-400 text-xs">P(rain | cloudy, windy)</div>
          </div>
        )}
      </div>
      {showUpdate && (
        <div className="mt-3 bg-yellow-900 border border-yellow-600 rounded-lg p-3">
          <p className="text-yellow-300 text-xs">💡 <strong>This IS conditional probability.</strong> Your belief updated from &lt;10% → &gt;50% when you learned new evidence (cloudy + windy). That update process is exactly P(rain | cloudy, windy).</p>
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
  const [answers, setAnswers] = useState([]);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { selected: idx, correct }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswers([]);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-700 text-center">
        <div className="text-4xl mb-2">{pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📖"}</div>
        <div className="text-white text-xl font-bold mb-1">{score}/{questions.length} correct</div>
        <div className="text-gray-400 text-sm mb-4">{pct === 100 ? "Perfect! You've got this." : pct >= 60 ? "Good grasp — review the misses." : "Re-read the concept above."}</div>
        <button onClick={handleReset} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-all">Try Again</button>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-400 text-xs">Question {current + 1} of {questions.length}</span>
        <span className="text-gray-400 text-xs">Score: {score}</span>
      </div>
      <p className="text-white text-sm font-medium mb-4">{q.q}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let cls = "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-400 cursor-pointer";
          if (selected !== null) {
            if (i === q.answer) cls = "bg-green-900 border-green-500 text-green-200";
            else if (i === selected && selected !== q.answer) cls = "bg-red-900 border-red-500 text-red-200";
            else cls = "bg-gray-800 border-gray-700 text-gray-500";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-2 rounded-lg border text-sm transition-all ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-3">
          <div className={`rounded-lg p-3 text-xs mb-3 ${selected === q.answer ? "bg-green-900 border border-green-700 text-green-200" : "bg-red-900 border border-red-700 text-red-200"}`}>
            💡 {q.explanation}
          </div>
          <button onClick={handleNext} className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition-all">
            {current + 1 >= questions.length ? "See Results" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
};

const parseMarkdown = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

export default function App() {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("learn");

  const openSection = (id) => {
    setActive(id);
    setTab("learn");
  };

  const section = sections.find(s => s.id === active);

  if (active && section) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className={`bg-gradient-to-r ${section.color} px-4 py-6`}>
          <button onClick={() => setActive(null)} className="text-white/70 hover:text-white text-sm mb-3 flex items-center gap-1">
            ← All Topics
          </button>
          <div className="text-4xl mb-2">{section.emoji}</div>
          <h1 className="text-2xl font-bold">{section.title}</h1>
          <p className="text-white/70 text-sm mt-1">{section.subtitle}</p>
        </div>

        <div className="flex border-b border-gray-800 bg-gray-900">
          {["learn", "quiz"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium transition-all ${tab === t ? "text-white border-b-2 border-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              {t === "learn" ? "📖 Learn" : "🧠 Quiz"}
            </button>
          ))}
        </div>

        <div className="p-4 max-w-2xl mx-auto">
          {tab === "learn" && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-500">
                <p className="text-yellow-400 text-xs font-bold uppercase mb-1">📖 The Story</p>
                <p className="text-gray-200 text-sm">{section.story}</p>
              </div>

              {section.id === "conditional" && <RainVisual />}

              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-400 text-xs font-bold uppercase mb-3">Concept</p>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {section.concept.split("\n").map((line, i) => (
                    <p key={i} className={line.trim() === "" ? "mb-2" : "mb-1"}>{parseMarkdown(line)}</p>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 border border-yellow-800">
                <p className="text-yellow-400 text-xs font-bold uppercase mb-2">⚡ Key Formula</p>
                <p className="text-white font-mono text-sm bg-gray-800 rounded-lg p-3">{section.keyFormula}</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 border border-green-800">
                <p className="text-green-400 text-xs font-bold uppercase mb-2">🧠 Remember It As</p>
                <p className="text-gray-200 text-sm">{section.mnemonics}</p>
              </div>

              <button
                onClick={() => setTab("quiz")}
                className={`w-full bg-gradient-to-r ${section.color} text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-all`}
              >
                Test Yourself →
              </button>
            </div>
          )}

          {tab === "quiz" && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                <p className="text-gray-400 text-xs">Topic: <span className="text-white">{section.title}</span></p>
              </div>
              <QuizSection questions={section.quiz} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const week3 = sections.slice(0, 3);
  const week4 = sections.slice(3);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-2xl p-5">
          <p className="text-yellow-200 text-xs font-bold uppercase mb-1">Pattern Recognition Principles</p>
          <h1 className="text-2xl font-bold">Weeks 3 & 4</h1>
          <p className="text-yellow-100/70 text-sm mt-1">Tap any topic to learn + quiz yourself</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-gray-400 uppercase">Week 3</span>
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="text-xs text-gray-500">Probability Foundations</span>
        </div>
        <div className="space-y-3">
          {week3.map(s => (
            <button
              key={s.id}
              onClick={() => openSection(s.id)}
              className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 rounded-xl p-4 text-left transition-all flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {s.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{s.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.subtitle}</p>
              </div>
              <span className="text-gray-600 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-gray-400 uppercase">Week 4</span>
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="text-xs text-gray-500">Decision Theory + Classifiers</span>
        </div>
        <div className="space-y-3">
          {week4.map(s => (
            <button
              key={s.id}
              onClick={() => openSection(s.id)}
              className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 rounded-xl p-4 text-left transition-all flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {s.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{s.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.subtitle}</p>
              </div>
              <span className="text-gray-600 text-lg">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <p className="text-gray-400 text-xs font-bold uppercase mb-2">🔗 How they connect</p>
        <p className="text-gray-300 text-xs leading-relaxed">Week 3 builds probability tools → Week 4 uses them to make decisions. Gaussian from Week 3 plugs directly into discriminant functions in Week 4. Naïve Bayes next week builds on all of this.</p>
      </div>
    </div>
  );
}