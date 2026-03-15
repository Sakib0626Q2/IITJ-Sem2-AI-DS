import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const sections = [
  {
    id: "what_is_opt",
    week: "Week 1",
    emoji: "🗺️",
    title: "What is Optimisation?",
    subtitle: "The engine behind all of machine learning",
    color: "from-violet-600 to-indigo-700",
    shadow: "hover:shadow-violet-500/20",
    accentHex: "#7c3aed",
    story: "You're going from class to the mess. Three routes exist. Which do you take? If the goal is speed, you minimise time. If you want a workout, you maximise distance. That choice — and the maths behind it — is optimisation.",
    concept: [
      { type: "body", text: "An optimisation problem has three ingredients:" },
      { type: "table", rows: [
        ["Objective (Loss) Function", "f(x) — what you're minimising or maximising"],
        ["Decision Variables", "x — the things you can control (model parameters)"],
        ["Constraints", "S ⊆ Rⁿ — the allowed region (optional)"],
      ]},
      { type: "body", text: "Formally:" },
      { type: "formula", text: "min f(x)  subject to  x ∈ S" },
      { type: "body", text: "where f: Rⁿ → R is a map and S is a nonempty constraint set." },
      { type: "bold", label: "Two types of problems:", text: "" },
      { type: "table", rows: [
        ["Unconstrained", "Model gets the whole playground. Figures out patterns freely."],
        ["Constrained", "Model gets the playground with directions/hints. Learns with guidance."],
        ["Convex", "Easy problem. One bowl. Any local minimum is the global minimum."],
        ["Non-convex", "Extremely hard. Multiple bowls. Local ≠ global minimum. Neural nets live here."],
      ]},
    ],
    keyFormula: "min f(x) s.t. x ∈ S,  where f: Rⁿ → R",
    mnemonics: "Go to mess = minimise time. Need a workout = maximise distance. Same walk, different objective.",
    visual: "convex_demo",
    quiz: [
      { q: "In an optimisation problem, what does the constraint set S represent?", options: ["The objective function", "The allowed region for x", "The gradient of f", "The minimum value"], answer: 1, explanation: "S ⊆ Rⁿ is the set of feasible (allowed) values for the decision variable x. If S = Rⁿ, the problem is unconstrained." },
      { q: "Why are convex problems considered 'easy' compared to non-convex ones?", options: ["They have no solution", "Any local minimum is also the global minimum", "They require no gradient", "They only work in 1D"], answer: 1, explanation: "Convexity guarantees that any local minimiser you find is automatically the global minimiser. Non-convex problems can have many local minima and finding the global one is NP-hard in general." },
      { q: "What are the three components of an optimisation problem?", options: ["Data, model, loss", "Objective, variables, constraints", "Gradient, Hessian, step size", "Prior, likelihood, posterior"], answer: 1, explanation: "Every optimisation problem has: (1) objective/loss function f(x), (2) decision variables x, and (3) optional constraints S." },
    ]
  },
  {
    id: "mse_loss",
    week: "Week 1",
    emoji: "📉",
    title: "MSE Loss & Linear Regression",
    subtitle: "How we turn 'find the best line' into a maths problem",
    color: "from-blue-600 to-cyan-600",
    shadow: "hover:shadow-blue-500/20",
    accentHex: "#2563eb",
    story: "You have house size vs price data scattered on a graph. You guess there's a linear relationship: price = α·size + β. The question is: which α and β? This is where optimisation enters.",
    concept: [
      { type: "body", text: "We assume a linear model: price(p) = α · size(s) + β" },
      { type: "body", text: "But fitting the line perfectly through all points is typically impossible. There will always be errors." },
      { type: "bold", label: "Why square the errors?", text: "Raw errors (predicted − actual) can be positive or negative and cancel out when summed. Squaring makes all errors positive and penalises large errors more." },
      { type: "formula", text: "f(a, b) = Σᵢ (a·xᵢ + b − yᵢ)²" },
      { type: "body", text: "This is the Mean Squared Error (MSE) loss. We want to find the a and b that minimise it." },
      { type: "formula", text: "min f(a,b) = Σᵢ₌₁ⁿ (axᵢ + b − yᵢ)²" },
      { type: "body", text: "The loss surface f(a,b) is a bowl (convex). The bottom of the bowl is the optimal α, β. Gradient descent rolls us down to it." },
    ],
    keyFormula: "MSE = (1/n) Σ (ŷᵢ − yᵢ)²  →  minimise over parameters",
    mnemonics: "Square so negatives don't cancel. Sum to get total error. Minimise to find best line.",
    visual: "mse_demo",
    quiz: [
      { q: "Why do we square the errors instead of just summing them?", options: ["To make computation faster", "Positive and negative errors cancel when summed raw", "Squaring is easier to differentiate", "To make the loss non-negative only"], answer: 1, explanation: "Without squaring, errors like +5 and −5 cancel to 0, falsely suggesting a perfect fit. Squaring ensures all terms are positive and large errors are penalised more." },
      { q: "What shape does the MSE loss surface f(a,b) have for linear regression?", options: ["A saddle", "Multiple bowls", "A single bowl (convex)", "A flat plane"], answer: 2, explanation: "MSE for linear regression is a quadratic (convex) function of the parameters. It has one global minimum — a single bowl shape." },
      { q: "The MSE loss for linear regression is f(a,b) = Σ(axᵢ+b−yᵢ)². What does minimising this give you?", options: ["The largest errors", "The optimal parameters a and b for the best-fit line", "The mean of all yᵢ", "The covariance"], answer: 1, explanation: "Minimising MSE finds the a and b (slope and intercept) that make the line as close as possible to all data points in the least-squares sense." },
    ]
  },
  {
    id: "solution_concepts",
    week: "Week 1",
    emoji: "🎯",
    title: "Solution Concepts",
    subtitle: "Global vs local minimisers — not all minima are equal",
    color: "from-emerald-600 to-teal-600",
    shadow: "hover:shadow-emerald-500/20",
    accentHex: "#059669",
    story: "f(x) = x² has one bowl. The bottom is x*=0. Clear winner. But f(x) = x³ has no minimum — it keeps going to −∞. And some functions have multiple bowls. You need to know which kind you're dealing with.",
    concept: [
      { type: "bold", label: "Global Minimiser x*:", text: "f(x*) ≤ f(x) for all x in S. The absolute best point everywhere." },
      { type: "formula", text: "x* → Minimiser,  f(x*) → Minimum Value" },
      { type: "bold", label: "Local Minimiser x*:", text: "f(x*) ≤ f(x) for all x in a small neighbourhood Bδ(x*) ∩ S. Only the best nearby." },
      { type: "body", text: "A point x* is a local minimiser if there exists δ > 0 such that f(x*) ≤ f(x) for all x ∈ Bδ(x*) ∩ S." },
      { type: "bold", label: "Key Insight:", text: "Most numerical algorithms find LOCAL minimisers. This is usually acceptable — unless the problem is non-convex and local ≠ global." },
      { type: "table", rows: [
        ["Convex problem", "Local minimiser IS the global minimiser. Guaranteed."],
        ["Non-convex problem", "Local minimiser may NOT be global. No guarantee."],
        ["f(x) = x²", "x*=0 is global minimiser. Only one bowl."],
        ["f(x) = x³", "No minimiser exists — goes to −∞."],
      ]},
      { type: "body", text: "Lecture takeaway: Numerical optimisation asks three questions — (1) Does a solution exist? (2) What kind (local/global)? (3) How to find it numerically?" },
    ],
    keyFormula: "x* is local minimiser iff ∃δ>0: f(x*)≤f(x) for all x in Bδ(x*)∩S",
    mnemonics: "Global = best on the whole mountain. Local = best in your neighbourhood. Convexity turns local into global.",
    visual: "minimiser_demo",
    quiz: [
      { q: "What is the difference between a global and local minimiser?", options: ["Global is faster to find", "Global is best everywhere; local is only best nearby", "Local minimiser always has f=0", "They are the same for all functions"], answer: 1, explanation: "A global minimiser x* satisfies f(x*)≤f(x) for ALL x. A local minimiser only satisfies this within a small neighbourhood Bδ(x*)." },
      { q: "When does convexity guarantee that local = global minimiser?", options: ["Never", "Always for any function", "Only when f is convex over S", "Only for 1D functions"], answer: 2, explanation: "For convex problems, any local minimiser is automatically the global minimiser. This is why convex problems are called 'easy'." },
      { q: "For f(x) = x³ over all of R, what can you say about the minimiser?", options: ["x*=0 is the global minimiser", "x*=1 is the local minimiser", "No minimiser exists", "x*=−1 is the global minimiser"], answer: 2, explanation: "f(x)=x³ has no lower bound — it goes to −∞ as x→−∞. So no minimiser exists (no global or local minimum)." },
    ]
  },
  {
    id: "calculus_review",
    week: "Week 1",
    emoji: "∂",
    title: "Derivatives, Gradient & Hessian",
    subtitle: "The maths toolkit for all optimisation algorithms",
    color: "from-orange-500 to-amber-600",
    shadow: "hover:shadow-orange-500/20",
    accentHex: "#d97706",
    story: "The derivative tells you the slope at a point. For 1D: which way is downhill? For multi-dimensional: the gradient is a vector pointing uphill. The Hessian tells you the curvature — are you in a bowl or on a hill?",
    concept: [
      { type: "bold", label: "1D Derivative:", text: "" },
      { type: "formula", text: "f'(x₀) = lim_{t→0} [f(x₀+t) − f(x₀)] / t" },
      { type: "body", text: "Rules: (f+g)' = f'+g',  (fg)' = f'g+g'f,  (f/g)' = g'/(g)²" },
      { type: "bold", label: "Partial Derivative:", text: "For f: Rⁿ→R, fix all variables except xᵢ." },
      { type: "formula", text: "∂f/∂xᵢ (x) = lim_{t→0} [f(x+teᵢ) − f(x)] / t" },
      { type: "bold", label: "Gradient ∇f(x):", text: "Vector of all partial derivatives — points in the direction of steepest ascent." },
      { type: "formula", text: "∇f(x) = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]ᵀ" },
      { type: "body", text: "Example: f(x,y) = x²+xy+y². Then ∇f = [2x+y, x+2y]ᵀ. At (1,0): ∇f = [2, 1]ᵀ" },
      { type: "bold", label: "Hessian ∇²f(x):", text: "Matrix of all second-order partial derivatives — captures curvature." },
      { type: "formula", text: "H(x) = ∇²f(x) = [∂²f/∂xᵢ∂xⱼ]" },
      { type: "body", text: "Example: f(x,y) = x²+xy+y². Then H = [[2,1],[1,2]] (constant everywhere)." },
    ],
    keyFormula: "∇f(x) = [∂f/∂x₁ ... ∂f/∂xₙ]ᵀ  |  H = ∇²f(x) = [∂²f/∂xᵢ∂xⱼ]",
    mnemonics: "Gradient = uphill direction vector. Negate it to go downhill = gradient descent.",
    visual: "gradient_demo",
    quiz: [
      { q: "What does the gradient ∇f(x) represent geometrically?", options: ["The minimum value of f", "Direction of steepest ascent at x", "Second derivative of f", "The constraint set S"], answer: 1, explanation: "The gradient ∇f(x) is a vector pointing in the direction of steepest increase of f at point x. Gradient descent goes in the −∇f direction (downhill)." },
      { q: "For f(x,y) = x² + xy + y², what is ∂f/∂x?", options: ["2x + y", "x + 2y", "2x", "y"], answer: 0, explanation: "Differentiating x²+xy+y² with respect to x: d(x²)/dx=2x, d(xy)/dx=y, d(y²)/dx=0. Total: 2x+y." },
      { q: "What does the Hessian matrix H = ∇²f(x) encode?", options: ["The gradient direction", "All second-order partial derivatives — curvature information", "The constraint boundary", "The step size"], answer: 1, explanation: "The Hessian is a matrix of second partial derivatives. It captures the curvature of f at a point — whether you're in a bowl (positive definite), on a hill (negative definite), or at a saddle." },
    ]
  },
  {
    id: "taylor",
    week: "Week 1",
    emoji: "🔭",
    title: "Taylor's Expansion",
    subtitle: "Approximating any function near a point",
    color: "from-rose-500 to-pink-600",
    shadow: "hover:shadow-rose-500/20",
    accentHex: "#e11d48",
    story: "You're at x₀ and want to know f at a nearby point x. You don't need the full function — just its value and derivatives at x₀. Taylor's theorem lets you build a polynomial approximation that gets more accurate as x gets closer to x₀.",
    concept: [
      { type: "bold", label: "1D — First Order:", text: "" },
      { type: "formula", text: "f(x) ≈ f(x₀) + f'(x₀)(x − x₀)" },
      { type: "body", text: "This is a linear approximation — a tangent line at x₀. Works well when x is very close to x₀." },
      { type: "bold", label: "1D — Second Order:", text: "" },
      { type: "formula", text: "f(x) ≈ f(x₀) + f'(x₀)(x−x₀) + ½f''(x₀)(x−x₀)²" },
      { type: "body", text: "Adds the curvature term. Example: f(x)=eˣ at x₀=0. 1st order: eˣ≈1+x. 2nd order: eˣ≈1+x+x²/2." },
      { type: "bold", label: "Multivariate — First Order:", text: "" },
      { type: "formula", text: "f(x+h) = f(x) + ⟨∇f(x), h⟩ + O(‖h‖²)" },
      { type: "body", text: "The gradient replaces f', and dot product replaces multiplication. 'Roughly: f(x+h) ≈ f(x) + ⟨∇f(x),h⟩'" },
      { type: "bold", label: "Multivariate — Second Order:", text: "" },
      { type: "formula", text: "f(x+h) ≈ f(x) + ⟨∇f(x),h⟩ + ½⟨h, ∇²f(x)h⟩" },
      { type: "body", text: "The Hessian ∇²f(x) replaces f''. This quadratic approximation is what Newton's method uses." },
    ],
    keyFormula: "f(x+h) ≈ f(x) + ⟨∇f(x),h⟩ + ½⟨h,Hh⟩",
    mnemonics: "1st order = tangent line. 2nd order = tangent parabola. More terms = better fit near x₀.",
    visual: "taylor_demo",
    quiz: [
      { q: "What does the first-order Taylor approximation f(x) ≈ f(x₀)+f'(x₀)(x−x₀) represent geometrically?", options: ["A parabola", "The tangent line to f at x₀", "The Hessian approximation", "The global minimum"], answer: 1, explanation: "The first-order Taylor approximation is a linear function — it's exactly the tangent line to f at the point x₀. It's a good approximation when x is close to x₀." },
      { q: "For f(x)=eˣ at x₀=0, what is the second-order Taylor approximation?", options: ["1+x", "1+x+x²/2", "x²/2", "eˣ exactly"], answer: 1, explanation: "f(0)=1, f'(0)=1, f''(0)=1. So: f(x)≈1+1·x+½·1·x²=1+x+x²/2." },
      { q: "In the multivariate Taylor expansion f(x+h)≈f(x)+⟨∇f(x),h⟩+½⟨h,Hh⟩, what does the last term capture?", options: ["The gradient direction", "The curvature via the Hessian", "The constraint boundary", "The norm of h"], answer: 1, explanation: "The term ½⟨h,∇²f(x)h⟩ captures the second-order curvature of f in the direction h, using the Hessian matrix. This is the quadratic correction term." },
    ]
  },
  {
    id: "fermat",
    week: "Week 2",
    emoji: "🧪",
    title: "Fermat's Theorem & Critical Points",
    subtitle: "Necessary condition for a minimiser — but not sufficient",
    color: "from-teal-500 to-cyan-600",
    shadow: "hover:shadow-teal-500/20",
    accentHex: "#0d9488",
    story: "You found a valley. The slope is zero. Is this the bottom? Maybe. Maybe it's a mountain peak (slope also zero at top). Maybe it's a saddle. Fermat's theorem tells you where to look — but not what you found.",
    concept: [
      { type: "bold", label: "Fermat's Theorem (1D):", text: "If f is differentiable at x* and x* is a local minimiser, then f'(x*) = 0." },
      { type: "formula", text: "f'(x*) = 0  ← necessary condition" },
      { type: "body", text: "Intuition: At a local minimum, the derivative is 0 on both sides. Coming from the left (t<0): the ratio [f(x*+t)−f(x*)]/t ≤ 0. From the right (t>0): ≥ 0. For the limit (derivative) to exist, RHL=LHL, which forces f'(x*)=0." },
      { type: "bold", label: "But f'(x*)=0 is NOT sufficient!", text: "" },
      { type: "table", rows: [
        ["f'(x*)=0 and f''(x*)>0", "Strict local MINIMUM"],
        ["f'(x*)=0 and f''(x*)<0", "Strict local MAXIMUM"],
        ["f'(x*)=0 and f''(x*)=0", "Inconclusive — check higher derivatives"],
      ]},
      { type: "body", text: "Example: f(x)=(x−1)². f'(x)=2x−2. f'(1)=0, f'(0)=−2. Only x=1 is a stationary point. x* where f'(x*)=0 is called a critical point or stationary point." },
      { type: "bold", label: "Multivariate Fermat's Rule:", text: "∇f(x*) = 0 — all partial derivatives are zero at a minimiser." },
      { type: "formula", text: "∇f(x*) = 0  (gradient is the zero vector)" },
    ],
    keyFormula: "Necessary: f'(x*)=0  |  Sufficient: also check f''(x*)",
    mnemonics: "Zero gradient = candidate. Not a winner until you check the second derivative (curvature).",
    visual: "fermat_demo",
    quiz: [
      { q: "Fermat's theorem says f'(x*)=0 is a necessary condition for a local min. What does 'necessary' mean here?", options: ["If f'(x*)=0 then x* is a minimum", "If x* is a minimum then f'(x*)=0", "f'(x*)=0 guarantees global minimum", "f is convex"], answer: 1, explanation: "'Necessary' means: if x* is a local minimum, then f'(x*)=0 MUST hold. But the converse isn't true — f'(x*)=0 doesn't guarantee a minimum (could be max or saddle)." },
      { q: "f(x) = x³. f'(x) = 3x². f'(0) = 0. What is x=0 for this function?", options: ["Local minimum", "Local maximum", "Global minimum", "Neither min nor max — it's a saddle/inflection"], answer: 3, explanation: "f'(0)=0 so it's a critical point. But f''(x)=6x, f''(0)=0 — inconclusive. Looking at the graph: f(x)=x³ keeps going through 0 without turning. x=0 is an inflection point — neither min nor max." },
      { q: "What is the multivariate version of Fermat's necessary condition?", options: ["H(x*) > 0", "∇f(x*) = 0", "f(x*) = 0", "det(H) > 0"], answer: 1, explanation: "In multiple dimensions, Fermat's condition generalises to ∇f(x*)=0 — the gradient vector is zero at a local minimiser. This means ALL partial derivatives are zero simultaneously." },
    ]
  },
  {
    id: "second_order",
    week: "Week 2",
    emoji: "🏔️",
    title: "Second-Order Conditions & Definiteness",
    subtitle: "Using the Hessian to classify critical points",
    color: "from-purple-600 to-fuchsia-600",
    shadow: "hover:shadow-purple-500/20",
    accentHex: "#9333ea",
    story: "You're at a stationary point — gradient is zero. Now what? You look at the curvature. If the ground curves UP in all directions, you're in a bowl = minimum. If it curves DOWN, you're on a hill = maximum. If it curves both ways, you're at a saddle.",
    concept: [
      { type: "bold", label: "1D Second-Order Conditions:", text: "" },
      { type: "table", rows: [
        ["f''(x*) > 0", "Positive curvature → strict local MINIMUM"],
        ["f''(x*) < 0", "Negative curvature → strict local MAXIMUM"],
        ["f''(x*) = 0", "Inconclusive — use Taylor expansion or higher derivatives"],
      ]},
      { type: "bold", label: "Multivariate: Hessian Definiteness", text: "" },
      { type: "body", text: "Let x* be a stationary point (∇f(x*)=0) and H = ∇²f(x*) be the Hessian." },
      { type: "table", rows: [
        ["H ≻ 0 (positive definite)", "xᵀHx > 0 for all x≠0 → strict local MINIMUM"],
        ["H ≺ 0 (negative definite)", "xᵀHx < 0 for all x≠0 → strict local MAXIMUM"],
        ["H indefinite", "Positive in some directions, negative in others → SADDLE point"],
      ]},
      { type: "bold", label: "How to check definiteness: Eigenvalues!", text: "" },
      { type: "body", text: "A matrix A is positive definite iff ALL eigenvalues λ > 0. Find eigenvalues by solving det(A−λI) = 0." },
      { type: "body", text: "Example from lecture: f(x,y)=x²+xy+y². Stationary point: (0,0). H=[[2,1],[1,2]]." },
      { type: "formula", text: "det([[2−λ, 1],[1, 2−λ]]) = (2−λ)²−1 = 0" },
      { type: "formula", text: "λ = 1 and λ = 3  →  both > 0  →  H ≻ 0  →  strict local min at (0,0)" },
    ],
    keyFormula: "H≻0 (all eigenvalues>0) → min  |  H≺0 → max  |  mixed → saddle",
    mnemonics: "Positive definite = bowl (curves up everywhere). Negative definite = hill (curves down). Mixed = saddle.",
    visual: "hessian_demo",
    quiz: [
      { q: "At a stationary point x*, the Hessian H=∇²f(x*) is positive definite. What does this mean?", options: ["x* is a saddle point", "x* is a strict local maximum", "x* is a strict local minimum", "x* is a global minimum always"], answer: 2, explanation: "If H≻0 (positive definite) at a stationary point, the function curves upward in all directions — you're at the bottom of a bowl — which is a strict local minimum." },
      { q: "For H=[[2,1],[1,2]], how do you check if it's positive definite?", options: ["Check if det(H)>0", "Find eigenvalues — check all λ>0", "Check if trace>0", "Compute the gradient"], answer: 1, explanation: "Solve det(H−λI)=0 to find eigenvalues. For this H: (2−λ)²−1=0 → λ=1 and λ=3. Both>0 → H is positive definite → strict local minimum." },
      { q: "What does it mean for H to be indefinite at a stationary point?", options: ["All eigenvalues are zero", "H has both positive and negative eigenvalues → saddle point", "The function has no minimum", "H equals the identity matrix"], answer: 1, explanation: "An indefinite Hessian has both positive and negative eigenvalues. This means the function curves up in some directions and down in others — the stationary point is a saddle point, neither min nor max." },
      { q: "Why is Fermat's condition (∇f=0) necessary but not sufficient for a minimum?", options: ["Because the gradient is a vector", "Because ∇f=0 at maxima and saddle points too", "Because the Hessian might not exist", "Because S might be empty"], answer: 1, explanation: "∇f(x*)=0 at ALL critical points: minima, maxima, and saddles. So knowing the gradient is zero only tells you that x* is a candidate. You need second-order (Hessian) information to determine the type." },
    ]
  },
  // ───────────────────────── WEEK 3 ────────────────────────────────────────
  {
    id: "convexity",
    week: "Week 3",
    emoji: "🥣",
    title: "Convexity — Sets & Functions",
    subtitle: "Why convex problems are the 'easy mode' of optimisation",
    color: "from-sky-600 to-blue-700",
    shadow: "hover:shadow-sky-500/20",
    accentHex: "#0284c7",
    story: "You're at IIT Jodhpur choosing a mess route. If every shortcut between any two valid paths is also valid — that's a convex set. A convex function is a bowl: the chord between any two points on the curve always sits above (or on) the curve. This one property determines whether optimisation is easy or NP-hard.",
    concept: [
      { type: "bold", label: "Why Convexity Matters:", text: "" },
      { type: "table", rows: [
        ["General (non-convex)", "Local min ≠ global min. NP-hard in general."],
        ["Convex problem", "Every local min IS the global min. ∇f=0 is sufficient."],
        ["Key ML models", "Linear regression, logistic regression, SVMs — all convex!"],
      ]},
      { type: "bold", label: "Convex Set Definition:", text: "" },
      { type: "formula", text: "C ⊆ ℝⁿ is convex iff: θx + (1−θ)y ∈ C  for all x,y ∈ C, θ ∈ [0,1]" },
      { type: "body", text: "Intuition: Draw a segment between any two points in C — it stays inside C. A disk is convex. A crescent is not." },
      { type: "bold", label: "Convex Function Definition:", text: "" },
      { type: "formula", text: "f(θx + (1−θ)y) ≤ θf(x) + (1−θ)f(y)  for all x,y, θ ∈ [0,1]" },
      { type: "body", text: "The chord between any two points on the graph lies ABOVE or ON the curve. The function bows inward." },
      { type: "bold", label: "Examples:", text: "" },
      { type: "table", rows: [
        ["Convex", "f(x)=x², f(x)=|x|, f(x)=eˣ, f(x)=log(Σeˣⁱ)"],
        ["Non-convex", "f(x)=−x², f(x)=sin(x), f(x)=x³"],
        ["Quadratic f=xᵀAx+bᵀx+c", "Convex iff A is symmetric positive semidefinite (A⪰0)"],
      ]},
      { type: "bold", label: "Key Implications:", text: "1) Local solutions are global  2) ∇f=0 is sufficient (not just necessary)  3) Subgradient methods and duality rely on convexity" },
    ],
    keyFormula: "f convex ↔ chord above curve ↔ f(θx+(1−θ)y)≤θf(x)+(1−θ)f(y)",
    mnemonics: "BOWL = convex. HILL = concave. For convex: any local min = global min. ML loss surfaces for linear/logistic regression are bowls.",
    visual: "convexity_demo",
    quiz: [
      { q: "What does it mean for a set C to be convex?", options: ["All points have positive coordinates", "The line segment between any two points in C stays inside C", "C has no boundary", "C is a subset of ℝ²"], answer: 1, explanation: "C is convex if for any x,y∈C, the entire segment θx+(1−θ)y (θ∈[0,1]) lies in C. Think: you can draw a straight path between any two points without leaving the set. A circle is convex; a crescent is not." },
      { q: "Which of these functions is convex?", options: ["f(x)=sin(x)", "f(x)=−x²", "f(x)=x²", "f(x)=x³"], answer: 2, explanation: "f(x)=x² is the classic convex function — a bowl. −x² is concave (a hill). sin(x) and x³ are neither globally convex nor concave." },
      { q: "For a convex problem, what is guaranteed about any local minimum?", options: ["It equals zero", "It is also the global minimum", "The gradient is non-zero there", "The Hessian is negative definite"], answer: 1, explanation: "This is THE key property: for convex functions over convex sets, any local minimum is automatically the global minimum. This makes convex optimisation tractable — you don't need to worry about getting stuck." },
      { q: "The quadratic f(x)=xᵀAx+bᵀx+c is convex iff:", options: ["det(A)>0", "A is positive semidefinite (A⪰0)", "A is invertible", "b=0"], answer: 1, explanation: "For a quadratic, ∇²f(x)=A (constant). f is convex iff ∇²f⪰0 everywhere, i.e., A⪰0 (positive semidefinite). All eigenvalues of A must be ≥0." },
      { q: "First-order condition ∇f(x*)=0 is sufficient for a global minimum ONLY when:", options: ["f is twice differentiable", "f is convex", "The Hessian is indefinite", "f has only one variable"], answer: 1, explanation: "For general functions, ∇f=0 is necessary but not sufficient (could be saddle or max). For CONVEX functions, ∇f(x*)=0 is both necessary AND sufficient for x* to be the global minimum." },
      { q: "Why is the logistic regression loss function important from a convexity standpoint?", options: ["It is non-convex, making training hard", "It is convex — gradient descent finds the global optimum", "It has no gradient", "It requires special non-convex solvers"], answer: 1, explanation: "Logistic loss f(w)=Σlog(1+exp(−yᵢwᵀxᵢ)) is convex in w. This guarantees gradient descent converges to the globally optimal weights — a huge advantage over non-convex neural network losses." },
      { q: "Which of these is NOT a convex function?", options: ["f(x)=eˣ", "f(x)=‖x‖₂", "f(x)=log(Σeˣⁱ)", "f(x)=sin(x)"], answer: 3, explanation: "sin(x) alternates between bowls and hills — neither globally convex nor concave. eˣ, ‖x‖₂ (norms are always convex), and log-sum-exp are all standard convex functions you should recognise." },
    ]
  },
  {
    id: "convex_characterization",
    week: "Week 3",
    emoji: "📐",
    title: "1st & 2nd Order Characterization of Convexity",
    subtitle: "Two calculus-based tests to prove convexity",
    color: "from-indigo-600 to-violet-700",
    shadow: "hover:shadow-indigo-500/20",
    accentHex: "#4f46e5",
    story: "Checking the chord condition for every pair of points is impractical. Calculus gives you two powerful shortcuts: the tangent line test (1st order) and the Hessian test (2nd order). Master these and you can classify any function in an exam in under a minute.",
    concept: [
      { type: "bold", label: "First-Order Characterization (Tangent Below):", text: "" },
      { type: "formula", text: "f differentiable is convex iff: f(y) ≥ f(x) + ∇f(x)ᵀ(y−x)  for ALL x,y" },
      { type: "body", text: "Meaning: The tangent (hyper)plane at any point lies BELOW (or on) the function everywhere. The function is always at or above its linearisation." },
      { type: "body", text: "Example: f(x)=x² at x=1. Tangent: y=2x−1. Check: x²≥2x−1 → (x−1)²≥0. Always true! ✓" },
      { type: "bold", label: "Second-Order Characterization:", text: "" },
      { type: "formula", text: "f twice differentiable is convex iff: ∇²f(x) ⪰ 0  for ALL x" },
      { type: "body", text: "Hessian must be positive semidefinite everywhere. For 1D: f''(x)≥0 everywhere = curve never bends downward." },
      { type: "bold", label: "Exam Checklist for 2×2 Matrix Definiteness:", text: "" },
      { type: "table", rows: [
        ["All λ>0", "Positive Definite (PD) → strict local MIN"],
        ["All λ≥0", "Positive Semidefinite (PSD) → convex (min may not be strict)"],
        ["All λ<0", "Negative Definite → local MAX"],
        ["Mixed λ signs", "Indefinite → SADDLE"],
        ["2×2 PSD shortcut", "trace≥0 AND det≥0 (necessary & sufficient for 2×2)"],
      ]},
      { type: "bold", label: "Positive Definite ≠ Positive Entries!", text: "The matrix [[1,−5],[−5,1]] has positive diagonal entries but negative eigenvalues (det=1−25=−24<0) → indefinite." },
    ],
    keyFormula: "1st: f(y)≥f(x)+∇f(x)ᵀ(y−x)  |  2nd: ∇²f(x)⪰0 everywhere",
    mnemonics: "1st order: tangent always under the bowl. 2nd order: Hessian PSD = no 'downward curves' in any direction.",
    visual: "firstorder_demo",
    quiz: [
      { q: "What does the first-order condition f(y)≥f(x)+∇f(x)ᵀ(y−x) mean geometrically?", options: ["Gradient is zero everywhere", "Tangent hyperplane at any x is a global underestimator of f", "The function has no local minima", "Hessian is zero"], answer: 1, explanation: "The condition says: the linear approximation (tangent plane) at any point x always lies BELOW or ON the function. Equivalently, you can never 'look up' from a tangent plane and see the function below you. This is the tangent-below-curve characterisation of convexity." },
      { q: "For f(x)=x², verify the 1st-order condition at x=1 for y=3:", options: ["LHS=9, RHS=f(1)+f'(1)·(3−1)=1+2·2=5. Since 9≥5 ✓", "LHS=9, RHS=7. Fails.", "LHS=3, RHS=1. Passes.", "Cannot verify without Hessian"], answer: 0, explanation: "f(1)=1, f'(1)=2(1)=2. RHS=1+2(3−1)=1+4=5. LHS=f(3)=9. Since 9≥5 ✓. The condition holds (as it must for the convex f=x²)." },
      { q: "The second-order test says: f is convex iff ∇²f(x)⪰0 everywhere. For f(x,y)=8x+12y+x²−2y², compute H:", options: ["[[1,0],[0,−2]]", "[[2,0],[0,−4]]", "[[2,0],[0,4]]", "[[8,0],[0,12]]"], answer: 1, explanation: "∂²f/∂x²=2, ∂²f/∂y²=−4, ∂²f/∂x∂y=0. So H=[[2,0],[0,−4]]. Eigenvalues: 2 and −4. Mixed signs → indefinite → NOT convex. (This is from the lecture PD/ND examples.)" },
      { q: "For H=[[3,1],[1,3]], is it positive definite?", options: ["No, because det=9−1=8>0 is misleading", "Yes — eigenvalues are 3−1=2 and 3+1=4, both >0", "No — trace=6<0", "Cannot determine without computing gradients"], answer: 1, explanation: "For [[a,b],[b,a]], eigenvalues are a−b and a+b. Here: 3−1=2>0 and 3+1=4>0. Both positive → PD ✓. Alternatively: trace=6>0 and det=9−1=8>0 → PD (for 2×2, these two conditions are equivalent to PD)." },
      { q: "Is f(x,y)=100(y−x²)²+(1−x)² (Rosenbrock function) convex?", options: ["Yes, all squared terms mean it's convex", "No — Rosenbrock is a classic non-convex function with a curved valley", "Yes, if we restrict to x>0", "Cannot determine"], answer: 1, explanation: "The Rosenbrock 'banana' function is non-convex despite looking like squared terms. The composition f(g(x)) is not always convex even when f is convex. Its Hessian has negative eigenvalues in some regions. It's a standard non-convex benchmark." },
      { q: "Positive definite means positive entries. True or False?", options: ["True — PD matrices always have positive entries", "False — PD means all eigenvalues>0, NOT all entries>0", "True only for diagonal matrices", "True for symmetric matrices"], answer: 1, explanation: "FALSE. PD means xᵀHx>0 for all x≠0, equivalently all eigenvalues>0. A matrix can have positive entries but negative eigenvalues (indefinite), or negative entries but positive eigenvalues (impossible for diagonals but possible with off-diagonal terms). Never confuse entry signs with eigenvalue signs." },
    ]
  },
  {
    id: "gradient_descent",
    week: "Week 3",
    emoji: "⛷️",
    title: "Gradient Descent Algorithm",
    subtitle: "The engine of ML — always ski downhill",
    color: "from-green-600 to-emerald-700",
    shadow: "hover:shadow-green-500/20",
    accentHex: "#16a34a",
    story: "You're blindfolded on a hilly terrain. You can only feel the slope under your feet. The steepest downhill direction is −∇f. You take a step, re-measure the slope, take another step. Repeat until you can't go lower. That's gradient descent — and it powers every neural network on the planet.",
    concept: [
      { type: "bold", label: "Why Numerical Methods?", text: "Finding ∇f(x)=0 analytically fails for nonlinear f. Example: f(x)=(x−1)eˣ−x gives f'(x)=xeˣ=1 — unsolvable in closed form. We need iterative methods." },
      { type: "bold", label: "General Line Search Framework:", text: "" },
      { type: "table", rows: [
        ["Initialize", "x⁰ ∈ ℝⁿ, tolerance tol, k=0"],
        ["While ‖∇f(xᵏ)‖>tol", "Iterate:"],
        ["Direction dᵏ", "Choose dᵏ with ∇f(xᵏ)ᵀdᵏ<0 (descent direction)"],
        ["Step size αᵏ", "Choose αᵏ so f(xᵏ+αᵏdᵏ)<f(xᵏ)"],
        ["Update", "xᵏ⁺¹=xᵏ+αᵏdᵏ, k←k+1"],
        ["Output", "xᵏ as critical point"],
      ]},
      { type: "bold", label: "Gradient Descent = Steepest Descent:", text: "" },
      { type: "formula", text: "dᵏ = −∇f(xᵏ)   →   xᵏ⁺¹ = xᵏ − αᵏ∇f(xᵏ)" },
      { type: "bold", label: "Why −∇f is steepest descent (Theorem):", text: "" },
      { type: "formula", text: "⟨∇f(x), −∇f(x)/‖∇f(x)‖⟩ ≤ ⟨∇f(x),d⟩  for all unit vectors d" },
      { type: "body", text: "The negative gradient direction minimises the directional derivative — it's the steepest downhill direction." },
      { type: "bold", label: "Worked Lecture Example:", text: "" },
      { type: "body", text: "f(x₁,x₂)=x₁−x₂+2x₁x₂+2x₁²+x₂². ∇f=[1+2x₂+4x₁, −1+2x₁+2x₂]ᵀ. Start x⁰=(0,0), α=1: d⁰=−(1,−1)=(−1,1). x¹=(−1,1). d¹=−∇f(−1,1)=(1,1). x²=(0,2). H=[[4,2],[2,2]], x*=(−1/2, 3/2)." },
    ],
    keyFormula: "xᵏ⁺¹ = xᵏ − αᵏ∇f(xᵏ)  where αᵏ is the learning rate / step size",
    mnemonics: "Ski downhill. Measure slope (∇f). Take step (−α∇f). Repeat. Stop when slope≈0 (‖∇f‖<tol).",
    visual: "gd_demo",
    quiz: [
      { q: "In gradient descent xᵏ⁺¹=xᵏ−α∇f(xᵏ), why −∇f?", options: ["Gradients are always positive", "−∇f is the steepest descent direction — it decreases f fastest locally", "It makes computation cheaper", "It guarantees global convergence"], answer: 1, explanation: "∇f points in the direction of steepest ASCENT. The negative −∇f points downhill — the unit vector that minimises ⟨∇f,d⟩ over all unit vectors d. This is proven by the steepest descent theorem from the lecture." },
      { q: "What does the descent condition ∇f(xᵏ)ᵀdᵏ<0 ensure?", options: ["dᵏ is an ascent direction", "dᵏ is a descent direction — moving in dᵏ decreases f locally", "f is convex", "The step size is correct"], answer: 1, explanation: "The directional derivative of f in direction d is ⟨∇f,d⟩. If this is negative, moving in direction d locally decreases f — making it a descent direction. This is the fundamental condition for line search methods." },
      { q: "For f(x)=x² starting at x⁰=4 with α=0.1, what is x¹?", options: ["3.2", "4.8", "2.0", "0"], answer: 0, explanation: "∇f(x)=2x. At x⁰=4: ∇f=8. x¹=x⁰−α·∇f=4−0.1·8=4−0.8=3.2. The gradient (slope=8) tells us to move left; step size α=0.1 controls how far." },
      { q: "The stopping criterion ‖∇f(xᵏ)‖≤tol means:", options: ["f(xᵏ)=0", "We're near a stationary point (all partial derivatives ≈ 0)", "We've run k iterations", "Step size is zero"], answer: 1, explanation: "‖∇f(xᵏ)‖ is the magnitude of the gradient. When it's small (≤tol), all partial derivatives are approximately zero — we're near a critical point. For convex problems, this means we're near the global minimum." },
      { q: "For f(x₁,x₂)=x₁−x₂+2x₁x₂+2x₁²+x₂², ∇f at (0,0) is:", options: ["(0,0)", "(1,−1)", "(4,2)", "(2,2)"], answer: 1, explanation: "∇f=[1+2x₂+4x₁, −1+2x₁+2x₂]ᵀ. At (0,0): ∇f=[1+0+0, −1+0+0]=[1,−1]ᵀ. So the first descent direction d⁰=−∇f=(−1,1)." },
      { q: "Why can't we always solve ∇f(x)=0 analytically?", options: ["∇f is always zero", "For nonlinear equations (e.g. xeˣ=1) there is no closed-form solution", "Gradients don't exist for smooth functions", "The equation always has infinitely many solutions"], answer: 1, explanation: "Setting ∇f=0 gives a system of equations. For linear f: linear equations (solvable). For nonlinear f like (x−1)eˣ−x, you get xeˣ=1 — transcendental, no closed form. This is why iterative numerical methods exist." },
      { q: "Line search is a general framework. Gradient descent is a special case where:", options: ["αᵏ=1 always", "dᵏ=−∇f(xᵏ) (steepest descent direction)", "dᵏ=+∇f(xᵏ) (ascent)", "The Hessian is used for direction"], answer: 1, explanation: "Line search says: pick any descent direction dᵏ and any valid step αᵏ. Gradient descent specialises this by always choosing dᵏ=−∇f(xᵏ) — the steepest descent direction. Other choices of dᵏ (e.g., Newton direction) give different algorithms." },
    ]
  },
  // ───────────────────────── WEEK 4 ────────────────────────────────────────
  {
    id: "least_squares",
    week: "Week 4",
    emoji: "📊",
    title: "Least Squares & Linear Regression",
    subtitle: "The closed-form solution and its gradient descent derivation",
    color: "from-amber-500 to-orange-600",
    shadow: "hover:shadow-amber-500/20",
    accentHex: "#d97706",
    story: "You have housing data: sizes x and prices y. You want the best line ŷ=w₀+w₁x. 'Best' means minimise total squared prediction error. This is a convex quadratic — solvable exactly with linear algebra (Normal Equation), or iteratively with gradient descent. Week 4 shows you both approaches and when each is preferred.",
    concept: [
      { type: "bold", label: "Least Squares Problem:", text: "" },
      { type: "formula", text: "min L(w) = (1/2m)Σᵢ(yᵢ−wᵀxᵢ)²  =  ‖Xw−y‖²" },
      { type: "body", text: "Model: ŷᵢ=w₀+w₁xᵢ=xᵢᵀw (augment x with 1 for bias). Stack all data:" },
      { type: "formula", text: "X=[[1,x₁],...,[1,xₘ]] ∈ ℝᵐˣ², y=[y₁,...,yₘ]ᵀ, ŷ=Xw" },
      { type: "bold", label: "Gradient:", text: "" },
      { type: "formula", text: "∇_w L(w) = 2Xᵀ(Xw−y)  [from matrix calculus: ∇‖Ax−b‖²=2Aᵀ(Ax−b)]" },
      { type: "bold", label: "Closed-Form Solution (Normal Equation):", text: "" },
      { type: "body", text: "Set ∇L=0: XᵀXw=Xᵀy → w*=(XᵀX)⁻¹Xᵀy. Works because L is convex (∇²L=2XᵀX⪰0)." },
      { type: "formula", text: "w* = (XᵀX)⁻¹Xᵀy  ← Normal Equation" },
      { type: "bold", label: "Gradient Descent Update:", text: "" },
      { type: "formula", text: "w⁽ᵏ⁺¹⁾ = w⁽ᵏ⁾ − α∇L = w⁽ᵏ⁾ + (α/m)Xᵀ(y−Xw⁽ᵏ⁾)" },
      { type: "table", rows: [
        ["Normal Equation", "O(n³) — exact, one-shot", "Small n (≤10⁴ features)"],
        ["Gradient Descent", "O(mn) per step — iterative", "Large n (millions of params, deep learning)"],
      ]},
    ],
    keyFormula: "w*=(XᵀX)⁻¹Xᵀy  |  GD: wᵏ⁺¹=wᵏ+(α/m)Xᵀ(y−Xwᵏ)",
    mnemonics: "Normal equation = exact answer with one matrix inversion. GD = iterative, needed when matrix is huge or singular.",
    visual: "lsq_demo",
    quiz: [
      { q: "What does least squares minimise?", options: ["Sum of absolute errors", "Sum of SQUARED prediction errors Σ(ŷᵢ−yᵢ)²", "Maximum error", "Gradient norm"], answer: 1, explanation: "Least squares minimises Σ(ŷᵢ−yᵢ)²=‖Xw−y‖². Squaring ensures all errors are positive and penalises large errors more heavily than small ones." },
      { q: "What is ∇_w L(w) where L=‖Xw−y‖²?", options: ["2X(Xw−y)", "2Xᵀ(Xw−y)", "−2Xᵀy", "2Xw"], answer: 1, explanation: "By matrix calculus: ∇_w‖Xw−y‖²=2Xᵀ(Xw−y). Note the transpose: Xᵀ appears because we differentiate with respect to w, not the rows of X." },
      { q: "The normal equation w*=(XᵀX)⁻¹Xᵀy requires:", options: ["X is square", "XᵀX is invertible (no redundant/collinear features)", "y=0", "w must be sparse"], answer: 1, explanation: "XᵀX must be invertible, which requires the columns of X to be linearly independent (no redundant features). If not, use pseudoinverse or add regularisation (ridge regression)." },
      { q: "For X={−1,0,1,4}, y={2,5,8,17}, what is the true linear relationship?", options: ["y=x+5", "y=3x+5", "y=2x+5", "y=4x+1"], answer: 1, explanation: "Check: x=−1→3(−1)+5=2✓, x=0→5✓, x=1→8✓, x=4→17✓. True relationship: y=3x+5, perfectly recoverable by least squares with clean data." },
      { q: "Why does the GD update become wᵏ⁺¹=wᵏ+(α/m)Xᵀ(y−Xwᵏ)?", options: ["Random update rule", "We negate the gradient: −α∇L=−α·(−(1/m)Xᵀ(y−Xw))=+(α/m)Xᵀ(y−Xw)", "We add gradient to go uphill", "Newton's method formula"], answer: 1, explanation: "GD: wᵏ⁺¹=wᵏ−α∇L. With ∇L=−(1/m)Xᵀ(y−Xwᵏ): wᵏ⁺¹=wᵏ−α·(−(1/m)Xᵀ(y−Xwᵏ))=wᵏ+(α/m)Xᵀ(y−Xwᵏ). The residual y−Xwᵏ is the error signal." },
      { q: "When would you prefer gradient descent over the normal equation?", options: ["Always — GD is always better", "For small n (features)", "For large-scale problems (millions of parameters) where O(n³) matrix inversion is infeasible", "When the loss is non-convex"], answer: 2, explanation: "Normal equation costs O(n³) to invert XᵀX. For n=10⁶ parameters: that's 10¹⁸ operations — impossible. GD costs O(mn) per step (m samples, n params). For deep learning with millions of params, only GD (or its variants) is feasible." },
      { q: "The least squares loss L=‖Xw−y‖² is convex because:", options: ["It has a unique minimum", "∇²L=2XᵀX which is PSD for any X", "The data X is always full rank", "Gradient exists everywhere"], answer: 1, explanation: "∇²_wL(w)=2XᵀX. For any vector v: vᵀ(XᵀX)v=‖Xv‖²≥0. So XᵀX⪰0 always — PSD. Hence L is always convex in w, regardless of the data. This is why there's always a global minimum for least squares." },
    ]
  },
  {
    id: "step_length",
    week: "Week 4",
    emoji: "📏",
    title: "Step Length & Backtracking Line Search",
    subtitle: "Armijo condition, Wolfe conditions, and safe step sizes",
    color: "from-rose-600 to-red-700",
    shadow: "hover:shadow-rose-500/20",
    accentHex: "#dc2626",
    story: "You're skiing downhill. Too-small steps: reach the bottom next semester. Too-large steps: overshoot, oscillate, diverge. The step size (learning rate) is the most critical hyperparameter in GD. Backtracking line search is the principled algorithm to choose it automatically — and it's provably safe.",
    concept: [
      { type: "bold", label: "Why Step Size is Critical:", text: "" },
      { type: "body", text: "Even ensuring descent at each step isn't sufficient! Counter-example: f(x)=x², xₖ=(−1)ᵏ(1+1/2ᵏ). Each step descends locally but the sequence oscillates forever without converging." },
      { type: "bold", label: "Three Strategies:", text: "" },
      { type: "table", rows: [
        ["Constant α", "Simple but may oscillate or be too slow"],
        ["Exact line search", "αᵏ=argmin_α{f(xᵏ+αdᵏ)}. Optimal but requires solving sub-problem!"],
        ["Inexact (backtracking)", "Satisfy Armijo condition cheaply. Best trade-off in practice."],
      ]},
      { type: "bold", label: "Armijo Condition (Sufficient Decrease):", text: "" },
      { type: "formula", text: "f(xₖ+αdₖ) ≤ f(xₖ) + c₁α⟨∇f(xₖ),dₖ⟩   c₁∈(0,1), typically c₁=10⁻⁴" },
      { type: "body", text: "The actual decrease must be ≥ c₁ times the predicted linear decrease. Prevents fake progress." },
      { type: "bold", label: "Wolfe's Conditions = Armijo + Curvature:", text: "" },
      { type: "formula", text: "⟨∇f(xₖ+αdₖ),dₖ⟩ ≥ c₂⟨∇f(xₖ),dₖ⟩   c₂∈(c₁,1)" },
      { type: "bold", label: "Backtracking Algorithm:", text: "" },
      { type: "table", rows: [
        ["1. Init", "α>0, ρ∈(0,1) (e.g. 0.8), c₁∈(0,1)"],
        ["2. While Armijo fails", "f(x+αd)−f(x)>c₁α∇f(x)ᵀd"],
        ["3. Shrink", "α ← ρα"],
        ["4. Output", "α as step size"],
      ]},
      { type: "bold", label: "Lipschitz Gradient & Safe Step:", text: "" },
      { type: "formula", text: "‖∇f(x)−∇f(y)‖≤L‖x−y‖  →  Safe step: α≤1/L" },
      { type: "body", text: "Convergence rate for convex f with Lipschitz gradient: f(xᵏ)−f(x*)≤L‖x⁰−x*‖²/(2k). This is O(1/k) — sublinear convergence." },
    ],
    keyFormula: "Armijo: f(xₖ+αdₖ)≤f(xₖ)+c₁α⟨∇f,dₖ⟩  |  Safe step: α≤1/L",
    mnemonics: "Backtrack: start big, shrink by ρ until Armijo holds. Like adjusting ski step to avoid falling — methodical, provably safe.",
    visual: "backtrack_demo",
    quiz: [
      { q: "What is the Armijo (sufficient decrease) condition?", options: ["f(xₖ+αdₖ)=f(xₖ)", "f(xₖ+αdₖ)≤f(xₖ)+c₁α⟨∇f(xₖ),dₖ⟩", "‖∇f(xₖ)‖<tol", "α must equal 1/L"], answer: 1, explanation: "Armijo: actual decrease ≥ c₁ × predicted linear decrease. It ensures the step makes sufficient progress — not just any tiny positive decrease. c₁∈(0,1) is typically 10⁻⁴ (very lenient)." },
      { q: "In backtracking, what happens in each iteration?", options: ["α increases by ρ", "α multiplies by ρ∈(0,1) — shrinking", "Direction d changes", "Gradient recomputed"], answer: 1, explanation: "Backtracking starts with a large α (e.g. 1) and repeatedly shrinks: α←ρα (e.g. α←0.8α) until Armijo is satisfied. This systematically finds a safe step without solving an optimisation sub-problem." },
      { q: "For f=(a/2)x²−bx with a=4, b=2 starting at x⁰=0, what is the Lipschitz constant L?", options: ["L=2", "L=4 (since ‖∇f(x)−∇f(y)‖=a|x−y|, so L=a)", "L=1/4", "L=1"], answer: 1, explanation: "∇f(x)=ax−b. ‖∇f(x)−∇f(y)‖=|a(x−y)|=a|x−y|. So L=a=4. Safe step: α≤1/L=1/4. With α=1/4, xₖ converges linearly to x*=b/a=0.5." },
      { q: "What is the convergence rate of GD on a convex L-smooth function?", options: ["O(cᵏ) — linear (exponential)", "O(1/k) — sublinear", "O(1/k²) — quadratic improvement", "O(k) — diverges"], answer: 1, explanation: "GD on convex L-smooth f achieves f(xᵏ)−f(x*)≤L‖x⁰−x*‖²/(2k) — this is O(1/k). Sublinear: to halve the error you need to double the iterations. For STRONGLY convex functions, this improves to linear O(cᵏ)." },
      { q: "Wolfe conditions = Armijo + curvature. What does the curvature condition prevent?", options: ["Steps that are too large", "Steps too small where gradient barely changes", "Non-convex problems", "Negative gradients"], answer: 1, explanation: "⟨∇f(xₖ+αdₖ),dₖ⟩≥c₂⟨∇f(xₖ),dₖ⟩ says: the gradient at the new point must be 'less steep' than at the old point by at least factor c₂. This prevents accepting steps so tiny that we barely move." },
      { q: "Zoutendijk's theorem guarantees what under Wolfe conditions?", options: ["f→0", "Σcos²θₖ‖∇f(xₖ)‖²<∞ → ‖∇f(xₖ)‖→0", "Finite termination", "Quadratic convergence"], answer: 1, explanation: "Zoutendijk: for bounded-below f with Lipschitz gradient, if αₖ satisfies Wolfe conditions, then Σcos²θₖ‖∇f(xₖ)‖²<∞. For GD, θₖ=0 (cos²θₖ=1), so Σ‖∇f(xₖ)‖²<∞ → ‖∇f(xₖ)‖→0. We converge to a stationary point." },
      { q: "For f(x)=x² with x₀=2, backtracking with α₀=2, ρ=0.8, c₁=0.5: does the first α=2 satisfy Armijo?", options: ["Yes, f decreases so Armijo always holds", "No — check: f(2−2·4)=f(−6)=36 > f(2)+c₁·2·(−4)·(−1)=4+4=8. Fails!", "Yes — 36≥8 so it passes", "Cannot determine without more data"], answer: 1, explanation: "At x=2: f=4, ∇f=4, d=−4 (gradient descent direction). α=2: new x=2−2(4)=−6, f(−6)=36. Armijo RHS=f(2)+c₁·α·∇f·d=4+0.5·2·(−16)=4−16=−12. Since 36>−12... wait, more carefully: ⟨∇f,d⟩=−16<0. RHS=4+0.5·2·(−16)=−12. Since 36>−12 on the RHS... Actually we need f(new)≤RHS: 36≤−12 is FALSE. So Armijo fails → shrink α." },
    ]
  },
  // ───────────────────────── WEEK 5 ────────────────────────────────────────
  {
    id: "gd_variants",
    week: "Week 5",
    emoji: "🚀",
    title: "Gradient Descent Variants",
    subtitle: "SGD, Mini-Batch, Momentum, AdaGrad, RMSProp, Adam",
    color: "from-fuchsia-600 to-pink-700",
    shadow: "hover:shadow-fuchsia-500/20",
    accentHex: "#c026d3",
    story: "Plain batch GD uses ALL data every step — fine for 100 samples, impossible for 100 million. Each variant solves a specific bottleneck: SGD trades noise for speed, momentum accelerates through flat regions, Adam adapts the learning rate per parameter. Every modern ML paper uses one of these. Know them inside-out.",
    concept: [
      { type: "bold", label: "Core update rule:", text: "" },
      { type: "formula", text: "xₖ₊₁ = xₖ − α∇f(xₖ)   (all variants modify this)" },
      { type: "table", rows: [
        ["Method", "Idea", "Analogy", "ML Use"],
        ["Batch GD", "Full dataset each step", "Study every textbook", "Small datasets"],
        ["SGD", "One sample at a time", "Learn from one mistake", "Online learning, RL"],
        ["Mini-Batch", "Small batch (16–128)", "Study group of 20", "Deep learning standard"],
        ["Momentum", "Past gradients accelerate", "Rolling ball downhill", "CNN training"],
        ["AdaGrad", "Adaptive rate per param", "Practice hard piano keys more", "NLP sparse features"],
        ["RMSProp", "Fix AdaGrad decay", "Adaptive walking speed", "RNN training"],
        ["Adam", "Momentum + RMSProp", "Smart GPS driver", "Transformers, GPT — most common"],
      ]},
      { type: "bold", label: "Momentum update:", text: "" },
      { type: "formula", text: "vₜ=βvₜ₋₁+α∇f(xₜ)  |  xₜ₊₁=xₜ−vₜ   [β=0.9 typical]" },
      { type: "bold", label: "AdaGrad:", text: "" },
      { type: "formula", text: "αₜ=α/√Gₜ  where Gₜ=Σᵢgᵢ² (accumulates squared gradients)" },
      { type: "bold", label: "RMSProp (fixes AdaGrad decay):", text: "" },
      { type: "formula", text: "E[g²]ₜ=βE[g²]ₜ₋₁+(1−β)gₜ²  |  θ←θ−α·gₜ/√(E[g²]ₜ+ε)" },
      { type: "bold", label: "Adam (Adaptive Moment Estimation):", text: "" },
      { type: "formula", text: "mₜ=β₁mₜ₋₁+(1−β₁)gₜ  |  vₜ=β₂vₜ₋₁+(1−β₂)gₜ²  |  θ←θ−α·m̂ₜ/√(v̂ₜ+ε)" },
      { type: "body", text: "m̂ₜ=mₜ/(1−β₁ᵗ), v̂ₜ=vₜ/(1−β₂ᵗ) are bias-corrected. Typical: β₁=0.9, β₂=0.999, ε=1e-8." },
    ],
    keyFormula: "Adam: mₜ=β₁mₜ₋₁+(1−β₁)gₜ, vₜ=β₂vₜ₋₁+(1−β₂)gₜ², θ←θ−α·m̂/√(v̂+ε)",
    mnemonics: "SGD=1 mistake. Mini-batch=study group. Momentum=rolling ball. AdaGrad=slow down on frequent features. Adam=smart GPS (momentum+adaptive rate). Default choice: Adam.",
    visual: "variants_demo",
    quiz: [
      { q: "Key difference between SGD and Mini-Batch GD?", options: ["SGD uses full dataset; mini-batch uses a random subset", "SGD uses one sample; mini-batch uses a small batch (16–128)", "They are identical", "Mini-batch needs the Hessian"], answer: 1, explanation: "SGD: gradient from single random sample (very noisy, very fast per step). Mini-batch: gradient from small random batch — better gradient estimate, moderate cost. Mini-batch is the deep learning standard (batch size 32–128)." },
      { q: "In Momentum vₜ=βvₜ₋₁+α∇f, what does β=0.9 mean physically?", options: ["90% gradient descent each step", "90% of past velocity carried forward — like a ball that keeps rolling", "Step size reduced by 10%", "90% of data used"], answer: 1, explanation: "β=0.9 means 90% of the previous velocity is retained. Like a heavy ball on a slope: it builds up speed in consistent directions and smooths out oscillations in inconsistent directions. Crucial for navigating narrow valleys." },
      { q: "AdaGrad divides learning rate by √Gₜ where Gₜ accumulates squared gradients. What does this achieve?", options: ["Makes algorithm non-convex", "Frequently updated params (large Gₜ) get smaller α; rare params get bigger α — great for sparse NLP features", "Removes need for learning rate", "Prevents saddle points"], answer: 1, explanation: "Gₜ=Σᵢgᵢ² accumulates. Params updated frequently have large Gₜ→small effective α (don't overshoot). Params updated rarely have small Gₜ→large effective α (learn more from each signal). Perfect for NLP where most word features are rare." },
      { q: "What limitation of AdaGrad does RMSProp fix?", options: ["AdaGrad is too fast", "Gₜ grows forever → αₜ→0 → learning stops. RMSProp uses exponential moving average instead", "AdaGrad needs a momentum term", "AdaGrad only works for convex problems"], answer: 1, explanation: "Gₜ=Σgᵢ² only grows (never forgets). Eventually αₜ=α/√Gₜ→0 and training stops. RMSProp: E[g²]ₜ=βE[g²]ₜ₋₁+(1−β)gₜ² — exponential moving average forgets old gradients. Keeps learning rate stable." },
      { q: "Adam's first moment mₜ tracks:", options: ["Squared gradients (variance)", "Running average of gradients — direction/momentum", "Learning rate schedule", "Hessian approximation"], answer: 1, explanation: "mₜ=β₁mₜ₋₁+(1−β₁)gₜ is the EMA of gradients — the first moment (mean). It captures direction momentum. vₜ tracks the second moment (mean of g²) for adaptive scaling. Together they give Adam its power." },
      { q: "For f(x)=x², x⁰=4, apply ONE Newton step. Result?", options: ["3.2 (same as GD with α=0.1)", "4.8", "0 (exact minimum in 1 step!)", "2"], answer: 2, explanation: "Newton: xₖ₊₁=xₖ−f'(xₖ)/f''(xₖ)=4−(2·4)/2=4−4=0. Newton reaches the exact minimum of any quadratic in ONE step. Compare: GD with α=0.1 gives x¹=3.2, needs many more steps." },
      { q: "Which model-optimizer pairing is standard?", options: ["CNN → AdaGrad, RNN → Adam, Transformers → SGD", "CNN → Momentum/Adam, RNN → RMSProp, Transformers → Adam", "All use batch GD", "Random choice — no standard"], answer: 1, explanation: "Standard pairings from TA slides: CNN→Momentum or Adam (spatially consistent gradients), RNN→RMSProp (temporal sequences with varying gradient magnitudes), Transformers/GPT→Adam (sparse attention gradients benefit from adaptive rates). Adam is the safe default." },
      { q: "Why does Adam use bias correction m̂ₜ=mₜ/(1−β₁ᵗ) and v̂ₜ=vₜ/(1−β₂ᵗ)?", options: ["To make updates larger", "Because mₜ and vₜ are initialised at 0 and biased toward 0 early in training — correction ensures unbiased estimates", "To prevent exploding gradients", "To add regularisation"], answer: 1, explanation: "At t=1: mₜ=(1−β₁)g₁ (close to 0 since β₁=0.9). Without correction, early updates would be very small (biased toward 0 due to zero initialisation). Dividing by (1−β₁ᵗ) rescales to get an unbiased estimate of the true mean gradient." },
    ]
  },
  {
    id: "newton_quasinewton",
    week: "Week 5",
    emoji: "🔬",
    title: "Newton's Method & Quasi-Newton (BFGS)",
    subtitle: "Using curvature for superlinear convergence",
    color: "from-cyan-600 to-teal-700",
    shadow: "hover:shadow-cyan-500/20",
    accentHex: "#0891b2",
    story: "GD only looks at slope. Newton looks at both slope AND curvature — like knowing the shape of the road to drive faster. It converges quadratically (error²  each step). But computing the Hessian costs O(n³) — infeasible at scale. BFGS approximates it with O(n²) updates. L-BFGS brings it down to O(n). The whole story is about the trade-off between information and cost.",
    concept: [
      { type: "bold", label: "Newton's Method:", text: "" },
      { type: "formula", text: "xₖ₊₁ = xₖ − [∇²f(xₖ)]⁻¹∇f(xₖ)  [= xₖ − H⁻¹∇f]" },
      { type: "body", text: "Derived from: minimise the 2nd-order Taylor approx f(x)+∇fᵀd+½dᵀHd over d. Solution: d=−H⁻¹∇f. For quadratics: finds exact minimum in 1 step!" },
      { type: "bold", label: "Damped Newton (safer):", text: "" },
      { type: "formula", text: "xₖ₊₁ = xₖ − αH⁻¹∇f   where α<1 avoids overshooting" },
      { type: "bold", label: "Problem: Hessian cost is O(n²) storage + O(n³) inversion. For n=10⁶: infeasible.", text: "" },
      { type: "bold", label: "Quasi-Newton — Approximate H:", text: "" },
      { type: "body", text: "Maintain Hessian approximation Bₖ updated cheaply. Must satisfy Secant Equation: Bₖ₊₁sₖ=yₖ where sₖ=xₖ₊₁−xₖ, yₖ=∇fₖ₊₁−∇fₖ." },
      { type: "bold", label: "BFGS Update (most widely used):", text: "" },
      { type: "formula", text: "Bₖ₊₁ = Bₖ − BₖssᵀBₖ/(sᵀBₖs) + yyᵀ/(yᵀs)" },
      { type: "table", rows: [
        ["Method", "Convergence", "Cost/iter", "Use case"],
        ["GD", "Sublinear O(1/k) or linear", "O(n)", "Large-scale ML, deep learning"],
        ["Newton", "Quadratic (superfast!)", "O(n³) — impractical", "Small n, theoretical analysis"],
        ["BFGS", "Superlinear", "O(n²)", "Medium-scale, no exact Hessian"],
        ["L-BFGS", "Superlinear", "O(n)", "Large-scale: scipy, scikit-learn"],
      ]},
      { type: "body", text: "L-BFGS stores only the last m≈10 (sₖ,yₖ) pairs instead of full Bₖ. Standard for large ML: logistic regression in scikit-learn, scipy's minimize." },
    ],
    keyFormula: "Newton: xₖ₊₁=xₖ−H⁻¹∇f  |  BFGS: Bₖ₊₁=Bₖ−BₖssᵀBₖ/(sᵀBₖs)+yyᵀ/(yᵀs)",
    mnemonics: "Newton=use road curvature to drive faster (quadratic). BFGS=GPS updating route estimate each step. L-BFGS=GPS with 10-step memory only.",
    visual: "newton_demo",
    quiz: [
      { q: "Newton's update is xₖ₊₁=xₖ−H⁻¹∇f. What does H represent?", options: ["Gradient vector", "Hessian ∇²f(xₖ) — matrix of second partial derivatives", "Step size", "Identity matrix"], answer: 1, explanation: "H=∇²f(xₖ) is the Hessian — the n×n matrix of second partial derivatives. It captures curvature. H⁻¹ scales and rotates the gradient step using curvature information, giving the Newton direction toward the minimum of the quadratic approximation." },
      { q: "For f(x)=x², x⁰=4: how many Newton steps to reach x*=0?", options: ["Many like GD", "2", "1 (Newton is exact on quadratics)", "Impossible"], answer: 2, explanation: "Newton on quadratics finds the exact minimum in 1 step. f'=2x, f''=2. x¹=4−(2·4)/2=0. Done. This is Newton's key advantage: quadratic convergence. For nearly-quadratic functions near a minimum, errors roughly square each step." },
      { q: "The secant equation is Bₖ₊₁sₖ=yₖ. What are s and y?", options: ["s=gradient, y=step", "s=xₖ₊₁−xₖ (step taken), y=∇fₖ₊₁−∇fₖ (gradient change)", "s=Hessian, y=eigenvalue", "Hyperparameters"], answer: 1, explanation: "sₖ=xₖ₊₁−xₖ is the step (position change). yₖ=∇f(xₖ₊₁)−∇f(xₖ) is the gradient change. Together they encode curvature info: Bₖ₊₁sₖ=yₖ says 'the Hessian approx, applied to the step, should give the gradient change' — the discrete analogue of H·Δx≈Δ(∇f)." },
      { q: "Why is L-BFGS preferred over full BFGS for large-scale problems?", options: ["L-BFGS is more accurate", "L-BFGS stores only last m≈10 (s,y) pairs → O(mn) memory vs O(n²) for full Bₖ", "L-BFGS uses the exact Hessian", "L-BFGS has linear convergence"], answer: 1, explanation: "BFGS: stores full n×n Bₖ — O(n²) memory. For n=10⁶: 10¹² entries = terabytes. L-BFGS: stores only last m≈10 vector pairs → O(mn) = O(10n) memory. Approximates Hessian-vector products implicitly. This makes L-BFGS practical for large ML." },
      { q: "Convergence hierarchy for smooth strongly convex f — fastest first:", options: ["GD > Newton > BFGS", "Newton (quadratic) > BFGS (superlinear) > GD (linear)", "GD > BFGS > Newton", "All converge at the same rate"], answer: 1, explanation: "Newton: quadratic convergence εₖ₊₁≤Cεₖ² (near solution: errors square each step — extremely fast). BFGS: superlinear (between linear and quadratic). GD: linear εₖ≤ρᵏε₀. Newton is fastest per iteration but O(n³) cost. Trade-off: Newton<Newton<L-BFGS<GD in cost per step." },
      { q: "DFP vs BFGS — what is the key difference?", options: ["DFP uses gradient, BFGS uses Hessian", "DFP updates Hessian approx Bₖ; BFGS updates the INVERSE Hessian approx Hₖ directly (more stable numerically)", "They are identical", "DFP is a first-order method"], answer: 1, explanation: "Both DFP and BFGS maintain Hessian approximations satisfying the secant equation, but with different update formulas. In practice, BFGS (Broyden-Fletcher-Goldfarb-Shanno) is more numerically stable and is the standard. DFP was historically first (1959/1963)." },
      { q: "Why can't pure Newton's method be used for training GPT-scale models?", options: ["Newton doesn't work for non-convex functions", "The Hessian requires O(n²) storage and O(n³) inversion — for n=175 billion params in GPT-3, this is ~10²³ operations per step — computationally impossible", "Newton only works in 1D", "SGD is patented"], answer: 1, explanation: "GPT-3 has n≈175×10⁹ parameters. Hessian: n²≈3×10²² entries — needs zettabytes of memory. Even computing ∇²f is infeasible. This is why all large-scale deep learning uses first-order methods (Adam, SGD) despite their slower per-iteration convergence." },
    ]
  },
];

// ─── VISUALS ─────────────────────────────────────────────────────────────────
const ConvexDemo = () => {
  const [type, setType] = useState("convex");
  const W = 280, H = 130;
  const convexPoints = () => {
    return Array.from({length:281},(_,i)=>{
      const x=(i-140)/50; const y=H-10-(x*x)*18;
      return `${i},${Math.max(5,y)}`;
    }).join(" ");
  };
  const nonconvexPoints = () => {
    return Array.from({length:281},(_,i)=>{
      const x=(i-140)/45;
      const y=H-20-((x*x*x*x)-4*x*x)*6;
      return `${i},${Math.max(5,Math.min(H-5,y))}`;
    }).join(" ");
  };
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Convex vs Non-Convex</p>
      <div className="flex gap-2 mb-3">
        {["convex","nonconvex"].map(t=>(
          <button key={t} onClick={()=>setType(t)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${type===t?"bg-violet-600 text-white shadow-lg":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            {t==="convex"?"✅ Convex (Easy)":"⚠️ Non-Convex (Hard)"}
          </button>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        {type==="convex"?(
          <>
            <polyline points={convexPoints()} fill="none" stroke="#7c3aed" strokeWidth="2.5"/>
            <circle cx="140" cy={H-10} r="5" fill="#7c3aed"/>
            <text x="140" y={H-15} textAnchor="middle" fill="white" fontSize="8">x* = global min</text>
            <text x="140" y={H+12} fontSize="9" textAnchor="middle" fill="#94a3b8">One bowl. Local = Global. Easy.</text>
          </>
        ):(
          <>
            <polyline points={nonconvexPoints()} fill="none" stroke="#ef4444" strokeWidth="2.5"/>
            {[85,195].map((cx,i)=>{
              const x2=(cx-140)/45; const y2=H-20-((x2**4)-4*x2**2)*6;
              return <circle key={i} cx={cx} cy={Math.max(5,Math.min(H-5,y2))} r="5" fill={i===0?"#f59e0b":"#ef4444"}/>;
            })}
            <text x="85" y="20" textAnchor="middle" fill="#f59e0b" fontSize="8">local min</text>
            <text x="195" y="20" textAnchor="middle" fill="#ef4444" fontSize="8">global min</text>
            <text x="140" y={H+12} fontSize="9" textAnchor="middle" fill="#94a3b8">Multiple bowls. Local ≠ Global. Hard!</text>
          </>
        )}
      </svg>
    </div>
  );
};

const MSEDemo = () => {
  const [alpha, setAlpha] = useState(0.5);
  const points = [[1,2],[2,2.5],[3,4],[4,4.5],[5,5]];
  const beta = 1.2;
  const mse = points.reduce((s,[x,y])=>s+(alpha*x+beta-y)**2,0)/points.length;
  const W=280,H=150,px=x=>x*40+20,py=y=>H-y*22-10;
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">🎮 MSE Interactive</p>
      <p className="text-xs text-gray-400 mb-1">Drag slope α: <span className="text-white font-bold">{alpha.toFixed(2)}</span></p>
      <input type="range" min="0" max="1.5" step="0.01" value={alpha} onChange={e=>setAlpha(Number(e.target.value))} className="w-full accent-blue-500 mb-3"/>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <line x1={px(0)} y1={py(beta)} x2={px(6)} y2={py(alpha*6+beta)} stroke="#3b82f6" strokeWidth="1.5"/>
        {points.map(([x,y],i)=>{
          const pred=alpha*x+beta;
          return <g key={i}>
            <circle cx={px(x)} cy={py(y)} r="4" fill="#60a5fa"/>
            <line x1={px(x)} y1={py(y)} x2={px(x)} y2={py(pred)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2"/>
            <circle cx={px(x)} cy={py(pred)} r="3" fill="#3b82f6" opacity="0.6"/>
          </g>;
        })}
      </svg>
      <div className="mt-3 bg-blue-950/40 border border-blue-800/50 rounded-xl p-3 shadow-inner">
        <p className="text-blue-300 text-xs text-center">MSE = <span className="font-bold text-white">{mse.toFixed(3)}</span> — yellow lines are the errors being squared and summed</p>
      </div>
    </div>
  );
};

const MinimizerDemo = () => {
  const [fn, setFn] = useState("x2");
  const W=280,H=130;
  const fns = {
    x2: {label:"f(x)=x²",color:"#7c3aed",pts:()=>Array.from({length:281},(_,i)=>{const x=(i-140)/35;return `${i},${Math.max(5,H-10-x*x*20)}`;}).join(" "),minX:140,minLabel:"x*=0 (global min)"},
    x3: {label:"f(x)=x³",color:"#ef4444",pts:()=>Array.from({length:281},(_,i)=>{const x=(i-140)/45;return `${i},${Math.max(5,Math.min(H-5,H/2-x*x*x*12))}`;}).join(" "),minX:null,minLabel:"No minimum exists!"},
    multi: {label:"f(x)=x⁴−4x²",color:"#f59e0b",pts:()=>Array.from({length:281},(_,i)=>{const x=(i-140)/50;return `${i},${Math.max(5,Math.min(H-5,H-20-(x*x*x*x-4*x*x)*8))}`;}).join(" "),minX:[70,210],minLabel:"Two local minima"},
  };
  const f=fns[fn];
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Minimiser Explorer</p>
      <div className="flex gap-1 mb-3 flex-wrap">
        {Object.entries(fns).map(([k,v])=>(
          <button key={k} onClick={()=>setFn(k)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${fn===k?"bg-gray-200 text-gray-900 shadow":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{v.label}</button>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <line x1="0" y1={H/2} x2={W} y2={H/2} stroke="#1e293b" strokeWidth="1"/>
        <line x1={W/2} y1="0" x2={W/2} y2={H} stroke="#1e293b" strokeWidth="1"/>
        <polyline points={f.pts()} fill="none" stroke={f.color} strokeWidth="2.5"/>
        {f.minX && (Array.isArray(f.minX)?f.minX:[f.minX]).map((mx,i)=>(
          <g key={i}>
            <circle cx={mx} cy={Math.max(5,Math.min(H-5,...f.pts().split(" ").filter((_,j)=>Math.abs(j-(mx))<=2).map(p=>parseFloat(p.split(",")[1]))))} r="5" fill={f.color}/>
          </g>
        ))}
      </svg>
      <p className="text-xs text-center text-gray-400 mt-2">{f.minLabel}</p>
    </div>
  );
};

const GradientDemo = () => {
  const [x, setX] = useState(1);
  const [y, setY] = useState(0);
  const gx = 2*x+y, gy = x+2*y;
  const norm = Math.sqrt(gx*gx+gy*gy);
  const W=200,H=200,cx=100,cy=100,scale=30;
  const arrowX=cx+gx*scale/Math.max(norm,0.1)*40;
  const arrowY=cy-gy*scale/Math.max(norm,0.1)*40;
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Gradient Visualiser — f(x,y)=x²+xy+y²</p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">x = <span className="text-white font-bold">{x.toFixed(1)}</span></p>
          <input type="range" min="-3" max="3" step="0.1" value={x} onChange={e=>setX(Number(e.target.value))} className="w-full accent-orange-500"/>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">y = <span className="text-white font-bold">{y.toFixed(1)}</span></p>
          <input type="range" min="-3" max="3" step="0.1" value={y} onChange={e=>setY(Number(e.target.value))} className="w-full accent-orange-500"/>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <svg width="160" height="160" viewBox={`0 0 ${W} ${H}`} className="rounded-xl bg-[#0f172a] flex-shrink-0 shadow-inner">
          <line x1="0" y1={cy} x2={W} y2={cy} stroke="#1e293b" strokeWidth="1"/>
          <line x1={cx} y1="0" x2={cx} y2={H} stroke="#1e293b" strokeWidth="1"/>
          {[-3,-2,-1,1,2,3].map(v=>(
            <g key={v}>
              <line x1={cx+v*scale} y1={cy-3} x2={cx+v*scale} y2={cy+3} stroke="#334155" strokeWidth="0.5"/>
              <line x1={cx-3} y1={cy-v*scale} x2={cx+3} y2={cy-v*scale} stroke="#334155" strokeWidth="0.5"/>
            </g>
          ))}
          <circle cx={cx+x*scale} cy={cy-y*scale} r="5" fill="#f59e0b"/>
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444"/>
            </marker>
          </defs>
          <line x1={cx+x*scale} y1={cy-y*scale} x2={cx+x*scale+(gx/Math.max(norm,0.1))*35} y2={cy-y*scale-(gy/Math.max(norm,0.1))*35} stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr)"/>
          <text x={cx+x*scale} y={cy-y*scale-40} textAnchor="middle" fill="white" fontSize="8">∇f</text>
        </svg>
        <div className="flex-1 space-y-2">
          <div className="bg-gray-800/80 rounded-lg p-2 text-xs"><span className="text-gray-400">∂f/∂x = 2x+y = </span><span className="text-orange-400 font-bold">{gx.toFixed(2)}</span></div>
          <div className="bg-gray-800/80 rounded-lg p-2 text-xs"><span className="text-gray-400">∂f/∂y = x+2y = </span><span className="text-orange-400 font-bold">{gy.toFixed(2)}</span></div>
          <div className="bg-orange-950/40 border border-orange-800/50 rounded-lg p-2 text-xs shadow-inner"><span className="text-orange-300">‖∇f‖ = </span><span className="text-white font-bold">{norm.toFixed(2)}</span></div>
          {norm < 0.15 && <div className="bg-green-950/40 border border-green-700/50 rounded-lg p-2 text-xs text-green-300 shadow-inner">✓ Near stationary point!</div>}
        </div>
      </div>
    </div>
  );
};

const TaylorDemo = () => {
  const [order, setOrder] = useState(1);
  const [x0, setX0] = useState(0);
  const W=280,H=130;
  const trueF = x => Math.exp(x);
  const approx = (x,x0,ord) => {
    if(ord===1) return Math.exp(x0)*(1+(x-x0));
    return Math.exp(x0)*(1+(x-x0)+((x-x0)**2)/2);
  };
  const toSVG = (x,y) => [((x+2.5)/5)*W, H-((y-0)/(10))*H];
  const truePts = Array.from({length:100},(_,i)=>{
    const x=-2.5+(i/99)*5; const y=Math.min(9,Math.max(0.01,trueF(x)));
    const [sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  const approxPts = Array.from({length:100},(_,i)=>{
    const x=-2.5+(i/99)*5; const y=Math.min(9,Math.max(0.01,approx(x,x0,order)));
    const [sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  const [cx,cy]=toSVG(x0,trueF(x0));
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Taylor Approximation — f(x)=eˣ</p>
      <div className="flex gap-2 mb-3">
        <button onClick={()=>setOrder(1)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${order===1?"bg-rose-600 text-white shadow-lg":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>1st Order</button>
        <button onClick={()=>setOrder(2)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${order===2?"bg-rose-600 text-white shadow-lg":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>2nd Order</button>
      </div>
      <p className="text-xs text-gray-400 mb-1">Expand around x₀ = <span className="text-white font-bold">{x0.toFixed(1)}</span></p>
      <input type="range" min="-2" max="2" step="0.1" value={x0} onChange={e=>setX0(Number(e.target.value))} className="w-full accent-rose-500 mb-3"/>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <polyline points={truePts} fill="none" stroke="#60a5fa" strokeWidth="2"/>
        <polyline points={approxPts} fill="none" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="5,3"/>
        <circle cx={Math.max(5,Math.min(W-5,cx))} cy={Math.max(5,Math.min(H-5,cy))} r="5" fill="white"/>
        <text x="10" y="15" fill="#60a5fa" fontSize="8">— true eˣ</text>
        <text x="10" y="26" fill="#fb7185" fontSize="8">-- Taylor approx</text>
      </svg>
      <p className="text-xs text-center text-gray-400 mt-2">{order===1?"1st order: eˣ≈eˣ⁰(1+(x−x₀))":"2nd order: eˣ≈eˣ⁰(1+(x−x₀)+(x−x₀)²/2)"}</p>
    </div>
  );
};

const FermatDemo = () => {
  const [fn, setFn] = useState("x2");
  const fns = {
    x2: {label:"(x−1)²",f:x=>(x-1)**2,df:x=>2*(x-1),d2f:()=>2,critical:[1],type:["min"]},
    x3: {label:"x³",f:x=>x**3,df:x=>3*x**2,d2f:x=>6*x,critical:[0],type:["inflection"]},
    cosx: {label:"−x²",f:x=>-(x**2),df:x=>-2*x,d2f:()=>-2,critical:[0],type:["max"]},
  };
  const fn_=fns[fn];
  const W=280,H=130;
  const toSVG=(x,y)=>[((x+3)/6)*W, H-5-((y+5)/12)*(H-10)];
  const pts=Array.from({length:200},(_,i)=>{
    const x=-3+(i/199)*6;
    const y=Math.max(-5,Math.min(7,fn_.f(x)));
    const[sx,sy]=toSVG(x,y);
    return `${sx},${sy}`;
  }).join(" ");
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Critical Point Explorer</p>
      <div className="flex gap-1 mb-3">
        {Object.entries(fns).map(([k,v])=>(
          <button key={k} onClick={()=>setFn(k)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${fn===k?"bg-teal-600 text-white shadow-md":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>f(x)={v.label}</button>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <line x1="0" y1={H/2} x2={W} y2={H/2} stroke="#1e293b" strokeWidth="1"/>
        <line x1={W/2} y1="0" x2={W/2} y2={H} stroke="#1e293b" strokeWidth="1"/>
        <polyline points={pts} fill="none" stroke="#14b8a6" strokeWidth="2.5"/>
        {fn_.critical.map((cx_,i)=>{
          const y_=fn_.f(cx_);
          const[sx,sy]=toSVG(cx_,Math.max(-5,Math.min(7,y_)));
          const type=fn_.type[i];
          return <g key={i}>
            <circle cx={sx} cy={sy} r="6" fill={type==="min"?"#10b981":type==="max"?"#ef4444":"#f59e0b"}/>
            <text x={sx} y={sy-10} textAnchor="middle" fill="white" fontSize="8">{type==="min"?"MIN":type==="max"?"MAX":"SADDLE/INFL"}</text>
          </g>;
        })}
      </svg>
      <div className="mt-3 bg-teal-950/40 border border-teal-800/50 rounded-xl p-3 text-xs shadow-inner">
        <p className="text-teal-300">f'(x) = {fn==="x2"?"2(x−1)":fn==="x3"?"3x²":"−2x"}  →  f'(x*)=0 at x*={fn_.critical.join(", ")}</p>
        <p className="text-teal-300 mt-1">f''(x*) = {fn_.d2f(fn_.critical[0]).toFixed(1)} → {fn_.type[0]==="min"?"✅ positive → local MIN":fn_.type[0]==="max"?"❌ negative → local MAX":"0 → inconclusive"}</p>
      </div>
    </div>
  );
};

const HessianDemo = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const H = [[a,b],[b,a]];
  const lam1 = a-b, lam2 = a+b;
  const pd = lam1>0&&lam2>0;
  const nd = lam1<0&&lam2<0;
  const indef = (lam1>0&&lam2<0)||(lam1<0&&lam2>0);
  const type = pd?"✅ Positive Definite → LOCAL MIN":nd?"❌ Negative Definite → LOCAL MAX":indef?"⚠️ Indefinite → SADDLE POINT":"⚠️ Semi-definite → Inconclusive";
  const color = pd?"text-emerald-400":nd?"text-rose-400":indef?"text-yellow-400":"text-gray-400";
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Hessian Definiteness Checker — H=[[a,b],[b,a]]</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div><p className="text-xs text-gray-400 mb-1">a = <span className="text-white font-bold">{a.toFixed(1)}</span></p>
          <input type="range" min="-3" max="3" step="0.1" value={a} onChange={e=>setA(Number(e.target.value))} className="w-full accent-purple-500"/></div>
        <div><p className="text-xs text-gray-400 mb-1">b = <span className="text-white font-bold">{b.toFixed(1)}</span></p>
          <input type="range" min="-3" max="3" step="0.1" value={b} onChange={e=>setB(Number(e.target.value))} className="w-full accent-purple-500"/></div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-800/80 rounded-xl p-3 text-center shadow-inner">
          <p className="text-gray-400 text-xs mb-1">Matrix H</p>
          <p className="text-white font-mono text-xs">[{a.toFixed(1)}, {b.toFixed(1)}]</p>
          <p className="text-white font-mono text-xs">[{b.toFixed(1)}, {a.toFixed(1)}]</p>
        </div>
        <div className="bg-gray-800/80 rounded-xl p-3 text-center shadow-inner">
          <p className="text-gray-400 text-xs mb-1">Eigenvalues</p>
          <p className="text-white font-mono text-xs">λ₁ = {lam1.toFixed(2)}</p>
          <p className="text-white font-mono text-xs">λ₂ = {lam2.toFixed(2)}</p>
        </div>
      </div>
      <div className={`rounded-xl p-3 border shadow-inner ${pd?"bg-emerald-950/40 border-emerald-700/50":nd?"bg-rose-950/40 border-rose-800/50":indef?"bg-yellow-950/40 border-yellow-700/50":"bg-gray-800/50 border-gray-600"}`}>
        <p className={`text-sm font-bold ${color}`}>{type}</p>
        <p className="text-gray-400 text-xs mt-1">{pd?"All eigenvalues > 0 → bowl curves up in all directions":nd?"All eigenvalues < 0 → bowl curves down in all directions":indef?"Eigenvalues have mixed signs → saddle point":""}</p>
      </div>
    </div>
  );
};



// ─── NEW VISUALS FOR WEEKS 3-5 ───────────────────────────────────────────────

const ConvexityDemo = () => {
  const [mode, setMode] = useState("function");
  const W = 300, H = 140;
  const convexPts = Array.from({length:301},(_,i)=>{
    const x=(i-150)/55; const y=H-15-(x*x)*16;
    return `${i},${Math.max(5,y)}`;
  }).join(" ");
  const x1=60, x2=240;
  const y1=H-15-((x1-150)/55)**2*16, y2=H-15-((x2-150)/55)**2*16;
  const chordMid=y1+(y2-y1)*0.5;
  const curveMid=H-15-((150-150)/55)**2*16;
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Convex Function — Chord Test</p>
      <div className="flex gap-2 mb-3">
        {[["function","📐 f(x)=x² (convex)"],["hill","📐 f(x)=−x² (concave)"]].map(([k,l])=>(
          <button key={k} onClick={()=>setMode(k)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${mode===k?"bg-sky-600 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{l}</button>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        {mode==="function" ? <>
          <polyline points={convexPts} fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
          <line x1={x1} y1={Math.max(5,y1)} x2={x2} y2={Math.max(5,y2)} stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3"/>
          <circle cx={(x1+x2)/2} cy={chordMid} r="5" fill="#f59e0b"/>
          <circle cx={(x1+x2)/2} cy={Math.max(5,curveMid)} r="5" fill="#38bdf8"/>
          <text x={W/2} y={H-2} textAnchor="middle" fill="#94a3b8" fontSize="8">chord (yellow) ABOVE curve (blue) → CONVEX ✓</text>
        </> : <>
          <polyline points={Array.from({length:301},(_,i)=>{const x=(i-150)/55;const y=H/2-(x*x)*14;return `${i},${Math.max(5,Math.min(H-5,y))}`;}).join(" ")} fill="none" stroke="#f87171" strokeWidth="2.5"/>
          <line x1={x1} y1={H/2-(((x1-150)/55)**2)*14} x2={x2} y2={H/2-(((x2-150)/55)**2)*14} stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3"/>
          <text x={W/2} y={H-2} textAnchor="middle" fill="#94a3b8" fontSize="8">chord (yellow) BELOW curve → CONCAVE ✗</text>
        </>}
      </svg>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-sky-950/40 border border-sky-800/50 rounded-lg p-2 text-center text-sky-300">Convex: chord above curve</div>
        <div className="bg-red-950/40 border border-red-800/50 rounded-lg p-2 text-center text-red-300">Concave: chord below curve</div>
      </div>
    </div>
  );
};

const FirstOrderDemo = () => {
  const [x0, setX0] = useState(1.5);
  const W=300, H=150;
  const f=x=>x*x, df=x=>2*x;
  const toSVG=(x,y)=>[((x+3)/6)*W, H-5-((Math.min(y,8.5))/9)*(H-10)];
  const curvePts=Array.from({length:200},(_,i)=>{
    const x=-3+(i/199)*6; const y=Math.min(8.5,f(x));
    const[sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  const tangentPts=[-3,3].map(x=>{
    const y=Math.min(8.5,Math.max(0,f(x0)+df(x0)*(x-x0)));
    const[sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  const[cx,cy]=toSVG(x0,f(x0));
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 1st-Order Condition: Tangent Below Curve — f(x)=x²</p>
      <p className="text-xs text-gray-400 mb-1">x₀ = <span className="text-white font-bold">{x0.toFixed(1)}</span>  |  f({x0.toFixed(1)})={f(x0).toFixed(2)}, ∇f={df(x0).toFixed(2)}</p>
      <input type="range" min="-2.5" max="2.5" step="0.1" value={x0} onChange={e=>setX0(Number(e.target.value))} className="w-full accent-indigo-500 mb-3"/>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <polyline points={curvePts} fill="none" stroke="#818cf8" strokeWidth="2.5"/>
        <polyline points={tangentPts} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,3"/>
        <circle cx={cx} cy={cy} r="5" fill="white"/>
        <text x="10" y="15" fill="#818cf8" fontSize="8">— f(x)=x² (convex)</text>
        <text x="10" y="26" fill="#f59e0b" fontSize="8">-- tangent at x₀={x0.toFixed(1)}</text>
        <text x={W/2} y={H-2} textAnchor="middle" fill="#94a3b8" fontSize="8">tangent always ≤ curve → first-order convexity condition ✓</text>
      </svg>
    </div>
  );
};

const GDDemo = () => {
  const [lr, setLr] = useState(0.15);
  const [path, setPath] = useState([{x:3,y:9}]);
  const W=300, H=165;
  const f=x=>x*x, df=x=>2*x;
  const toSVG=(x,y)=>[(x/6+0.5)*W, H-10-(Math.min(y,10)/11)*(H-20)];
  const curvePts=Array.from({length:200},(_,i)=>{
    const x=-0.5+(i/199)*6.5; const y=Math.min(10,f(x));
    const[sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  const runStep=()=>{
    if(path.length>18) return;
    const last=path[path.length-1];
    const newX=last.x-lr*df(last.x);
    setPath(p=>[...p,{x:newX,y:f(newX)}]);
  };
  const reset=()=>setPath([{x:3,y:9}]);
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Gradient Descent — f(x)=x², x⁰=3</p>
      <div className="flex gap-3 mb-3 items-center">
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">α = <span className="text-white font-bold">{lr.toFixed(2)}</span>{lr>0.9?" ⚠️ Unstable!":lr>0.5?" ⚡ Try α≤0.5":""}</p>
          <input type="range" min="0.01" max="0.99" step="0.01" value={lr} onChange={e=>{setLr(Number(e.target.value));reset();}} className="w-full accent-green-500"/>
        </div>
        <button onClick={runStep} disabled={path.length>18} className="bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-xl">Step</button>
        <button onClick={reset} className="bg-gray-700 text-gray-300 text-xs font-bold px-3 py-2 rounded-xl">Reset</button>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <polyline points={curvePts} fill="none" stroke="#22c55e" strokeWidth="2"/>
        {path.map(({x,y},i)=>{
          const[sx,sy]=toSVG(x,Math.min(10,y));
          return <circle key={i} cx={sx} cy={Math.max(5,sy)} r={i===path.length-1?5:3} fill={i===path.length-1?"#fbbf24":"#86efac"} opacity={0.3+0.7*(i/Math.max(path.length-1,1))}/>;
        })}
        {path.length>1 && path.slice(0,-1).map(({x,y},i)=>{
          const[x1,y1]=toSVG(x,Math.min(10,y)); const[x2,y2]=toSVG(path[i+1].x,Math.min(10,path[i+1].y));
          return <line key={i} x1={x1} y1={Math.max(5,y1)} x2={x2} y2={Math.max(5,y2)} stroke="#86efac" strokeWidth="1.2" opacity="0.6"/>;
        })}
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-gray-800 rounded-lg p-2 text-center"><p className="text-gray-400">Steps</p><p className="text-white font-bold">{path.length-1}</p></div>
        <div className="bg-gray-800 rounded-lg p-2 text-center"><p className="text-gray-400">x</p><p className="text-white font-bold">{path[path.length-1].x.toFixed(4)}</p></div>
        <div className={`rounded-lg p-2 text-center border ${Math.abs(path[path.length-1].x)<0.01?"bg-green-950/40 border-green-700":"bg-gray-800 border-gray-700"}`}><p className="text-gray-400">f(x)</p><p className="text-white font-bold">{path[path.length-1].y.toFixed(5)}</p></div>
      </div>
    </div>
  );
};

const LsqDemo = () => {
  const [slope, setSlope] = useState(3);
  const [intercept, setIntercept] = useState(5);
  const dataX=[-1,0,1,4], dataY=[2,5,8,17];
  const W=280, H=160;
  const toSVG=(x,y)=>[(x/6+0.2)*W, H-15-(y/22)*(H-20)];
  const mse=dataX.reduce((s,x,i)=>s+(slope*x+intercept-dataY[i])**2,0)/dataX.length;
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Normal Equation — y=3x+5 dataset</p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div><p className="text-xs text-gray-400 mb-1">w₁ (slope) = <span className="text-white font-bold">{slope.toFixed(1)}</span></p>
          <input type="range" min="0" max="6" step="0.1" value={slope} onChange={e=>setSlope(Number(e.target.value))} className="w-full accent-amber-500"/></div>
        <div><p className="text-xs text-gray-400 mb-1">w₀ (intercept) = <span className="text-white font-bold">{intercept.toFixed(1)}</span></p>
          <input type="range" min="-2" max="12" step="0.1" value={intercept} onChange={e=>setIntercept(Number(e.target.value))} className="w-full accent-amber-500"/></div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        {[0].map(()=>{
          const[x1,y1]=toSVG(-1,slope*(-1)+intercept); const[x2,y2]=toSVG(4,slope*4+intercept);
          return <line key="line" x1={x1} y1={Math.max(5,y1)} x2={x2} y2={Math.max(5,y2)} stroke="#f59e0b" strokeWidth="2"/>;
        })}
        {dataX.map((x,i)=>{
          const[sx,sy]=toSVG(x,dataY[i]); const[,py]=toSVG(x,slope*x+intercept);
          return <g key={i}>
            <line x1={sx} y1={Math.max(5,sy)} x2={sx} y2={Math.max(5,Math.min(H-5,py))} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2"/>
            <circle cx={sx} cy={Math.max(5,sy)} r="5" fill="#60a5fa"/>
            <text x={sx+6} y={Math.max(12,sy-2)} fill="#94a3b8" fontSize="7">({x},{dataY[i]})</text>
          </g>;
        })}
      </svg>
      <div className={`mt-2 rounded-xl p-3 text-xs border ${mse<0.01?"bg-green-950/40 border-green-700/50":"bg-gray-800/60 border-gray-700"}`}>
        <p className={mse<0.01?"text-green-300":"text-gray-300"}>MSE = <span className="font-bold text-white">{mse.toFixed(4)}</span>{mse<0.01?" ✓ Perfect! w*=(XᵀX)⁻¹Xᵀy → w₁=3, w₀=5":""}</p>
      </div>
    </div>
  );
};

const BacktrackDemo = () => {
  const [alpha0, setAlpha0] = useState(2.0);
  const [rho, setRho] = useState(0.8);
  const W=300, H=155;
  const f=x=>x*x, df=x=>2*x;
  const x0=2, c1=0.0001;
  let alpha=alpha0;
  const steps=[];
  for(let i=0;i<25;i++){
    const newX=x0-alpha*df(x0);
    const armijoRHS=f(x0)+c1*alpha*df(x0)*(-df(x0));
    const armijo=f(newX)<=armijoRHS;
    steps.push({alpha,newX:newX,fNew:f(newX),armijo});
    if(armijo) break;
    alpha*=rho;
  }
  const accepted=steps[steps.length-1];
  const toSVG=(x,y)=>[((x+1)/5)*W, H-10-(Math.min(y,8)/9)*(H-20)];
  const curvePts=Array.from({length:150},(_,i)=>{
    const x=-0.5+(i/149)*4.5; const y=Math.min(8,f(x));
    const[sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Backtracking Line Search — f(x)=x², x₀=2</p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div><p className="text-xs text-gray-400 mb-1">α₀ = <span className="text-white font-bold">{alpha0.toFixed(1)}</span></p>
          <input type="range" min="0.2" max="4" step="0.1" value={alpha0} onChange={e=>setAlpha0(Number(e.target.value))} className="w-full accent-rose-500"/></div>
        <div><p className="text-xs text-gray-400 mb-1">ρ (shrink) = <span className="text-white font-bold">{rho.toFixed(2)}</span></p>
          <input type="range" min="0.3" max="0.99" step="0.01" value={rho} onChange={e=>setRho(Number(e.target.value))} className="w-full accent-rose-500"/></div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <polyline points={curvePts} fill="none" stroke="#fb7185" strokeWidth="2.5"/>
        {steps.map((s,i)=>{
          const[sx,sy]=toSVG(s.newX,Math.min(8,s.fNew));
          return <circle key={i} cx={Math.max(5,Math.min(W-5,sx))} cy={Math.max(5,sy)} r={i===steps.length-1?6:3} fill={s.armijo?"#22c55e":"#ef4444"} opacity={s.armijo?1:0.7}/>;
        })}
        <circle cx={toSVG(x0,f(x0))[0]} cy={Math.max(5,toSVG(x0,f(x0))[1])} r="6" fill="white"/>
        <text x={toSVG(x0,f(x0))[0]+8} y={Math.max(15,toSVG(x0,f(x0))[1])} fill="white" fontSize="8">x₀=2</text>
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-gray-800 rounded-lg p-2 text-center"><p className="text-gray-400">Shrinks</p><p className="text-red-400 font-bold">{steps.length-1}</p></div>
        <div className="bg-gray-800 rounded-lg p-2 text-center"><p className="text-gray-400">Final α</p><p className="text-white font-bold">{accepted.alpha.toFixed(4)}</p></div>
        <div className={`rounded-lg p-2 text-center border ${accepted.armijo?"bg-green-950/40 border-green-700":"bg-red-950/40 border-red-700"}`}><p className="text-gray-400">Armijo</p><p className={accepted.armijo?"text-green-400 font-bold":"text-red-400 font-bold"}>{accepted.armijo?"✓ PASS":"✗ FAIL"}</p></div>
      </div>
    </div>
  );
};

const VariantsDemo = () => {
  const [method, setMethod] = useState("gd");
  const W=300, H=160;
  const f=x=>x*x, df=x=>2*x;
  const simulate=(m)=>{
    let x=4, v=0, G=0, mm=0, vv=0;
    const path=[{x,y:f(x)}];
    const α=0.1, β=0.9, β2=0.999, ε=1e-8;
    for(let t=1;t<=30;t++){
      const noise=m==="sgd"?(Math.random()-0.5)*4:m==="minibatch"?(Math.random()-0.5)*1.5:0;
      const g=df(x)+noise;
      if(m==="gd"||m==="sgd"||m==="minibatch") x=x-α*g;
      else if(m==="momentum"){v=β*v+(1-β)*g; x=x-α*v;}
      else if(m==="adam"){
        mm=β*mm+(1-β)*g; vv=β2*vv+(1-β2)*g*g;
        const mh=mm/(1-Math.pow(β,t)), vh=vv/(1-Math.pow(β2,t));
        x=x-α*mh/(Math.sqrt(vh)+ε);
      }
      path.push({x,y:f(x)});
    }
    return path;
  };
  const path=simulate(method);
  const toSVG=(x,y)=>[(x/9+0.55)*W, H-10-(Math.min(Math.max(y,0),18)/19)*(H-20)];
  const curvePts=Array.from({length:100},(_,i)=>{
    const x=-0.3+(i/99)*9; const y=Math.min(18,f(x));
    const[sx,sy]=toSVG(x,y); return `${sx},${sy}`;
  }).join(" ");
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 GD Variants on f(x)=x², x⁰=4</p>
      <div className="grid grid-cols-3 gap-1 mb-3">
        {[["gd","Batch GD"],["sgd","SGD"],["minibatch","Mini-batch"],["momentum","Momentum"],["adam","Adam"]].map(([k,l])=>(
          <button key={k} onClick={()=>setMethod(k)} className={`py-2 rounded-xl text-xs font-bold transition-all ${method===k?"bg-fuchsia-600 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>{l}</button>
        ))}
        <div/>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <polyline points={curvePts} fill="none" stroke="#a78bfa" strokeWidth="2"/>
        {path.slice(0,-1).map(({x,y},i)=>{
          const[x1,y1]=toSVG(x,Math.min(18,Math.max(0,y))); const[x2,y2]=toSVG(path[i+1].x,Math.min(18,Math.max(0,path[i+1].y)));
          return <line key={i} x1={x1} y1={Math.max(5,y1)} x2={x2} y2={Math.max(5,y2)} stroke="#e879f9" strokeWidth="1.5" opacity={0.2+0.8*(i/path.length)}/>;
        })}
        {path.map(({x,y},i)=>{
          const[sx,sy]=toSVG(x,Math.min(18,Math.max(0,y)));
          return <circle key={i} cx={Math.max(5,Math.min(W-5,sx))} cy={Math.max(5,Math.min(H-5,sy))} r={i===path.length-1?5:2} fill={i===path.length-1?"#fbbf24":"#e879f9"} opacity={0.2+0.8*(i/path.length)}/>;
        })}
      </svg>
      <p className="text-xs text-center text-gray-400 mt-2">Final: x=<span className="text-white font-bold">{path[path.length-1].x.toFixed(4)}</span>, f(x)=<span className="text-white font-bold">{Math.max(0,path[path.length-1].y).toFixed(5)}</span></p>
    </div>
  );
};

const NewtonDemo = () => {
  const [x0, setX0] = useState(5);
  const f=t=>t*t, df=t=>2*t, ddf=()=>2;
  const newtonPath=()=>{const p=[{x:x0,y:f(x0)}];let c=x0;for(let i=0;i<6;i++){c=c-df(c)/ddf();p.push({x:c,y:f(c)});if(Math.abs(c)<1e-6)break;} return p;};
  const gdPath=()=>{const p=[{x:x0,y:f(x0)}];let c=x0;for(let i=0;i<12;i++){c=c-0.2*df(c);p.push({x:c,y:f(c)});}return p;};
  const np=newtonPath(), gp=gdPath();
  const W=300, H=160;
  const toSVG=(x,y)=>[((x)/9+0.1)*W, H-10-(Math.min(Math.max(y,0),28)/29)*(H-20)];
  const curvePts=Array.from({length:120},(_,i)=>{const x=(i/119)*9;const y=Math.min(28,f(x));const[sx,sy]=toSVG(x,y);return `${sx},${sy}`;}).join(" ");
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 my-6 border border-gray-800 shadow-md">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎮 Newton vs GD — f(x)=x², x⁰ adjustable</p>
      <p className="text-xs text-gray-400 mb-1">x⁰ = <span className="text-white font-bold">{x0.toFixed(1)}</span></p>
      <input type="range" min="0.5" max="8" step="0.1" value={x0} onChange={e=>setX0(Number(e.target.value))} className="w-full accent-cyan-500 mb-3"/>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-xl overflow-hidden bg-[#0f172a]">
        <polyline points={curvePts} fill="none" stroke="#67e8f9" strokeWidth="2"/>
        {gp.map(({x,y},i)=>{const[sx,sy]=toSVG(x,Math.min(28,Math.max(0,y)));return <circle key={i} cx={Math.max(5,Math.min(W-5,sx))} cy={Math.max(5,sy)} r={3} fill="#f59e0b" opacity={0.3+0.7*(i/gp.length)}/>;}) }
        {np.map(({x,y},i)=>{const[sx,sy]=toSVG(x,Math.min(28,Math.max(0,y)));return <circle key={i} cx={Math.max(5,Math.min(W-5,sx))} cy={Math.max(5,sy)} r={i===0?6:5} fill="#22c55e" opacity={0.4+0.6*(i/np.length)}/>;}) }
        <text x="8" y="16" fill="#f59e0b" fontSize="8">● GD (α=0.2) — {gp.length-1} steps</text>
        <text x="8" y="27" fill="#22c55e" fontSize="8">● Newton — {np.length-1} steps (exact!)</text>
      </svg>
      <p className="text-xs text-center text-gray-400 mt-2">Newton: <span className="text-green-400 font-bold">{np.length-1} step(s)</span> to reach 0 | GD: <span className="text-amber-400 font-bold">{gp.length-1} steps</span>, final x={gp[gp.length-1].x.toFixed(4)}</p>
    </div>
  );
};

const VISUALS = {
  convex_demo: ConvexDemo,
  mse_demo: MSEDemo,
  minimiser_demo: MinimizerDemo,
  gradient_demo: GradientDemo,
  taylor_demo: TaylorDemo,
  fermat_demo: FermatDemo,
  hessian_demo: HessianDemo,
  convexity_demo: ConvexityDemo,
  firstorder_demo: FirstOrderDemo,
  gd_demo: GDDemo,
  lsq_demo: LsqDemo,
  backtrack_demo: BacktrackDemo,
  variants_demo: VariantsDemo,
  newton_demo: NewtonDemo,
};

// ─── CONCEPT RENDERER ─────────────────────────────────────────────────────────
const renderConcept = (items) => items.map((item, i) => {
  if (item.type === "body") return <p key={i} className="text-gray-300 text-[15px] leading-loose mb-3">{item.text}</p>;
  if (item.type === "bold") return <p key={i} className="text-white text-[15px] font-semibold mt-4 mb-2 bg-white/5 inline-block px-2 py-1 rounded-md">{item.label} <span className="text-gray-300 font-normal">{item.text}</span></p>;
  if (item.type === "formula") return <div key={i} className="bg-black/40 border border-indigo-500/30 rounded-xl p-4 font-mono text-sm text-indigo-300 text-center my-4 shadow-inner">{item.text}</div>;
  if (item.type === "table") return (
    <div key={i} className="rounded-xl overflow-hidden border border-gray-700 my-4 shadow-sm">
      {item.rows.map((r, j) => (
        <div key={j} className={`flex text-sm ${j % 2 === 0 ? "bg-gray-800/80" : "bg-gray-900/50"}`}>
          <div className="w-2/5 px-4 py-3 text-gray-200 font-medium border-r border-gray-700">{r[0]}</div>
          <div className="flex-1 px-4 py-3 text-gray-400">{r[1]}</div>
        </div>
      ))}
    </div>
  );
  return null;
});

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
const QuizSection = ({ questions, color }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].answer;
    if (correct) setScore(s => s + 1);
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
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="animate-in fade-in zoom-in bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-700 shadow-2xl text-center">
        <div className="text-6xl mb-4 bounce">{pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📖"}</div>
        <h2 className="text-white text-2xl font-bold mb-2">{score}/{questions.length} Correct</h2>
        <div className="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
          <div className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }}></div>
        </div>
        <p className="text-gray-400 text-md mb-8">{pct === 100 ? "Perfect! You've mastered this concept." : pct >= 60 ? "Good grasp! Review the misses to perfect it." : "Take a quick re-read of the concept above."}</p>
        <button onClick={handleReset} className="bg-white hover:bg-gray-200 text-gray-900 font-bold px-8 py-3 rounded-xl text-sm transition-all hover:scale-105 shadow-lg">Try Again</button>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-xl">
      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-6 overflow-hidden">
        <div className={`bg-gradient-to-r ${color} h-1.5 transition-all duration-300 ease-out`} style={{ width: `${progress}%` }}></div>
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
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 font-medium ${cls}`}
            >
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
          <button 
            onClick={handleNext} 
            className="w-full bg-white hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2"
          >
            {current + 1 >= questions.length ? "See Results 🏆" : "Next Question ➔"}
          </button>
        </div>
      )}
    </div>
  );
};


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(null);
  const [tab, setTab] = useState("learn");

  const openSection = (id) => {
    setActive(id); setTab("learn");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const section = sections.find(s => s.id === active);

  if (active && section) {
    const Visual = VISUALS[section.visual];
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-violet-500/30">
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
                <div className="mb-1"><span className="bg-black/30 text-white/80 text-xs font-bold px-2 py-0.5 rounded-full">{section.week}</span></div>
                <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">{section.title}</h1>
                <p className="text-white/80 font-medium mt-1 text-lg drop-shadow-sm">{section.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-20 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-gray-800 shadow-md">
          <div className="max-w-2xl mx-auto flex p-2 gap-2">
            {["learn","quiz"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex justify-center items-center gap-2 ${tab===t?"bg-gray-800 text-white shadow-lg":"text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"}`}>
                {t==="learn" ? "📖 Learn Concept" : `🧠 Practice Quiz (${section.quiz.length}Q)`}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 max-w-2xl mx-auto pb-20">
          {tab === "learn" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border-l-4 border-yellow-500 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-4xl opacity-5">📖</div>
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">The Scene</p>
                <p className="text-gray-200 text-base leading-relaxed font-medium">{section.story}</p>
              </div>

              {Visual && <Visual />}

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-md">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Core Concept</p>
                <div className="mt-2">{renderConcept(section.concept)}</div>
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
                Test Your Knowledge — {section.quiz.length} Questions <span className="text-xl">➔</span>
              </button>
            </div>
          )}
          {tab === "quiz" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 fade-in">
              <QuizSection questions={section.quiz} color={section.color} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const weekGroups = [
    { title:"Week 1", subtitle:"Foundations — Optimisation, MSE, Calculus Review", badge:"bg-violet-900/30 text-violet-300", items: sections.filter(s=>s.week==="Week 1") },
    { title:"Week 2", subtitle:"Conditions for Optimality", badge:"bg-purple-900/30 text-purple-300", items: sections.filter(s=>s.week==="Week 2") },
    { title:"Week 3", subtitle:"Convexity & Gradient Descent Algorithm", badge:"bg-sky-900/30 text-sky-300", items: sections.filter(s=>s.week==="Week 3") },
    { title:"Week 4", subtitle:"Least Squares, Step Length & Backtracking", badge:"bg-amber-900/30 text-amber-300", items: sections.filter(s=>s.week==="Week 4") },
    { title:"Week 5", subtitle:"GD Variants (Adam, SGD), Newton & Quasi-Newton (BFGS)", badge:"bg-fuchsia-900/30 text-fuchsia-300", items: sections.filter(s=>s.week==="Week 5") },
  ];
  const totalQ = sections.reduce((s,t)=>s+t.quiz.length,0);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-violet-400 text-xs font-extrabold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                  Numerical Optimisation — IIT Jodhpur Sem 2
                </p>
                <h1 className="text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Weeks 1–5</h1>
                <p className="text-gray-400 text-sm font-medium">From "what is optimisation?" to gradient descent variants and quasi-Newton methods</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {weekGroups.map((g,i)=>(
                    <span key={i} className={`text-xs px-2 py-1 rounded-lg font-bold ${g.badge}`}>{g.items.length} topics <span className="opacity-60">{g.title}</span></span>
                  ))}
                  <span className="text-xs px-2 py-1 rounded-lg font-bold bg-green-900/30 text-green-300">{totalQ} questions total</span>
                </div>
              </div>
              <div className="text-5xl opacity-80">📐</div>
            </div>
          </div>
        </div>

        {weekGroups.map((block, idx) => (
          <div key={idx} className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-widest uppercase ${block.badge}`}>{block.title}</span>
              <span className="text-sm font-medium text-gray-400 truncate">{block.subtitle}</span>
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
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full font-bold">{s.quiz.length}Q</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-all text-sm">➔</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-violet-900/10 border border-violet-900/30 rounded-2xl p-6 mt-12 text-center backdrop-blur-sm">
          <div className="text-2xl mb-2">🔗</div>
          <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">The Full Chain: Weeks 1→5</p>
          <div className="flex items-center justify-center gap-1 flex-wrap mb-4 text-xs">
            {["MSE Loss","→","Derivatives","→","Fermat","→","Hessian","→","Convexity","→","GD","→","Step Size","→","SGD/Adam","→","Newton/BFGS"].map((item,i)=>(
              <span key={i} className={item==="→"?"text-gray-600":`text-gray-300 bg-gray-800 px-2 py-1 rounded-lg border border-gray-700`}>{item}</span>
            ))}
          </div>
          <p className="text-violet-100/70 text-sm leading-relaxed max-w-md mx-auto">
            MSE shows WHY we optimise. Derivatives show HOW to compute direction. Fermat+Hessian tell you WHEN you've found it. Convexity tells you IF it's global. GD finds it iteratively. Backtracking makes GD safe. Adam makes GD fast. BFGS makes it smarter.
          </p>
        </div>

      </div>
    </div>
  );
}