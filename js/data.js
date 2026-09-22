/**
 * Principia: Science & Mathematics Knowledge Base
 * Curated seminal theories, mathematical concepts, peer-reviewed citations,
 * simplified intuitive explanations, daily life applications, and interactive quizzes.
 */

export const CONCEPTS_DATA = [
  {
    id: "euler-identity",
    title: "Euler's Identity & Complex Analysis",
    category: "mathematics",
    categoryLabel: "Pure Mathematics",
    era: "18th Century",
    year: 1748,
    difficulty: "Intermediate",
    latex: "e^{i\\pi} + 1 = 0",
    keyFigures: ["Leonhard Euler"],
    summary: "Often celebrated as the most beautiful equation in mathematics, it links the five fundamental mathematical constants (e, i, π, 1, and 0) with addition, multiplication, and exponentiation in a single profound line.",
    source: {
      title: "Introductio in Analysin Infinitorum (Introduction to the Analysis of the Infinite)",
      authors: "Leonhard Euler",
      year: 1748,
      publisher: "Marcum-Michaelem Bousquet & Socios, Lausanne",
      url: "https://scholarlycommons.pacific.edu/euler-works/101/",
      doi: "Historical Archive / Euler Works E101"
    },
    analogy: {
      title: "The Circular Clockwise Journey",
      text: "Imagine continuous exponential growth (represented by 'e'). Usually, multiplying growth makes things get bigger and bigger on a straight line. But when you introduce the imaginary unit 'i', instead of pushing outward in magnitude, growth turns sideways into rotation! Walking at speed 1 around a circle for a distance of π radians flips you exactly around to the opposite side (-1). Adding 1 brings you cleanly back to home base: 0."
    },
    rigor: {
      title: "Mathematical Derivation & Power Series",
      text: "Euler established this from the Taylor expansions of exponential and trigonometric functions: \\(e^{ix} = \\cos(x) + i\\sin(x)\\). Evaluating at \\(x = \\pi\\), we find \\(\\cos(\\pi) = -1\\) and \\(\\sin(\\pi) = 0\\), yielding \\(e^{i\\pi} = -1\\), or \\(e^{i\\pi} + 1 = 0\\). This bridged algebra, trigonometry, and complex analysis."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**AC Electrical Power**: Alternating current in wall sockets vibrates as sine waves. Electrical engineers use complex numbers and Euler's formula daily to compute electrical impedance and protect power grids from blackouts.",
        "**Audio & Wireless Signals**: Converting audio, Wi-Fi, and 5G radio waves into frequency signals via Fast Fourier Transforms relies intrinsically on complex exponentials \\(e^{i\\omega t}\\).",
        "**Quantum Computing**: Quantum bits (qubits) exist as vectors in complex Hilbert space, governed by phase rotations dictated by Euler's relations."
      ]
    },
    quiz: [
      {
        question: "Why does multiplying a real number by 'i' correspond to a 90-degree rotation in the complex plane?",
        options: [
          "Because i is defined such that i² = -1, meaning two 90° rotations flip a number to its negative on the real line",
          "Because 90 degrees is the ratio of pi to Euler's constant e",
          "Because complex numbers can only represent right-angled triangles",
          "Because the derivative of i is zero in standard calculus"
        ],
        correctIndex: 0,
        explanation: "Since multiplying by i twice gives i² = -1 (which reverses direction by 180° along the number line), a single multiplication by i geometrically represents a 90° counter-clockwise rotation."
      },
      {
        question: "Which field of modern engineering relies heavily on Euler's formula to model alternating current (AC)?",
        options: [
          "Civil Engineering for concrete curing",
          "Electrical Engineering for AC impedance and phasor analysis",
          "Mechanical Engineering for gear tooth ratios only",
          "Petroleum Engineering for viscosity tables"
        ],
        correctIndex: 1,
        explanation: "Phasors express oscillating sinusoidal voltages and currents as complex exponentials A·e^(i(ωt+φ)), turning differential equations into simple algebraic formulas."
      },
      {
        question: "Which five fundamental constants are united in Euler's identity?",
        options: [
          "0, 1, 2, π, and c",
          "e, i, π, 1, and 0",
          "h, G, c, k_B, and π",
          "e, π, φ, 0, and 42"
        ],
        correctIndex: 1,
        explanation: "Euler's identity e^(iπ) + 1 = 0 uniquely links the additive identity (0), multiplicative identity (1), circle ratio (π), natural logarithm base (e), and imaginary unit (i)."
      }
    ]
  },
  {
    id: "fourier-transform",
    title: "Fourier Transform & Signal Decomposition",
    category: "mathematics",
    categoryLabel: "Applied Mathematics",
    era: "19th Century",
    year: 1822,
    difficulty: "Advanced",
    latex: "\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(t) e^{-2\\pi i \\xi t} dt",
    keyFigures: ["Jean-Baptiste Joseph Fourier"],
    summary: "A mathematical lens that decomposes any complex signal or waveform into a sum of simple sinusoidal frequencies, forming the backbone of modern digital media, telecommunications, and spectroscopy.",
    source: {
      title: "Théorie analytique de la chaleur (The Analytical Theory of Heat)",
      authors: "Jean-Baptiste Joseph Fourier",
      year: 1822,
      publisher: "Firmin Didot, Paris",
      url: "https://gallica.bnf.fr/ark:/12148/bpt6k1045508v",
      doi: "Bibliothèque nationale de France (BnF)"
    },
    analogy: {
      title: "Unbaking a Cake into Its Ingredients",
      text: "Imagine eating a finished cake and immediately being able to separate out the exact grams of flour, sugar, butter, and vanilla. A complex sound (like an entire symphony playing simultaneously) is like the cake. The Fourier Transform is the magical sieve that isolates every individual violin pitch, flute trill, and drum beat into distinct frequency bars."
    },
    rigor: {
      title: "Continuous & Discrete Transformations",
      text: "The continuous Fourier transform maps a function from the time (or spatial) domain \\(f(t)\\) to the frequency domain \\(\\hat{f}(\\xi)\\). In digital computing, the Fast Fourier Transform (FFT) algorithm reduces the computational complexity of computing discrete transforms from \\(O(N^2)\\) to \\(O(N \\log N)\\), making real-time digital signal processing viable."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**MP3, Spotify & Streaming**: Your ears cannot hear frequencies masked by louder sounds. The Fourier transform breaks music into frequency bands so audio encoders can discard imperceptible data, shrinking file sizes by 90%.",
        "**JPEG Images**: 2D discrete cosine transforms (closely related to Fourier) compress digital smartphone photos into tiny JPEG files without noticeable quality loss.",
        "**Medical MRI Scanners**: Magnetic resonance imaging sensors detect radio wave echoes from hydrogen atoms in body tissues as raw frequency signals. Fourier transforms instantly rebuild these into sharp cross-sectional scans of your brain and organs.",
        "**Noise-Cancelling Headphones**: Microphones capture ambient background rumble, compute its frequencies in real time, and invert the wave to eliminate the noise."
      ]
    },
    quiz: [
      {
        question: "What does the Fourier Transform convert a time-domain signal into?",
        options: [
          "A spatial coordinate map",
          "A frequency-domain spectrum",
          "A binary hexadecimal hash",
          "A thermodynamic heat gradient"
        ],
        correctIndex: 1,
        explanation: "The Fourier Transform translates signals recorded across time (like sound pressure) into their constituent frequencies (pitches and amplitudes)."
      },
      {
        question: "Why was the invention of the Fast Fourier Transform (FFT) by Cooley and Tukey in 1965 monumental for computer science?",
        options: [
          "It allowed computers to avoid using binary code",
          "It reduced algorithm execution time from O(N²) to O(N log N), making real-time digital audio and radar processing possible",
          "It replaced the need for transistors in digital processors",
          "It solved the P versus NP problem for audio systems"
        ],
        correctIndex: 1,
        explanation: "FFT drastically slashed the calculation steps needed for digital samples, enabling microprocessors to analyze sound, video, and communication signals in real time."
      },
      {
        question: "How does an MRI machine make use of the Fourier transform to create an image of internal organs?",
        options: [
          "It measures the temperature of the skin and calculates heat flow",
          "It samples radiofrequency magnetic resonance signals and mathematically reconstructs spatial voxel slices",
          "It uses optical lenses to reflect laser light off internal bones",
          "It shoots acoustic soundwaves and measures physical vibration"
        ],
        correctIndex: 1,
        explanation: "MRI coils measure frequency and phase-encoded magnetic resonance signals (known as k-space). Applying an inverse 2D or 3D Fourier transform synthesizes the anatomical image."
      }
    ]
  },
  {
    id: "gradient-descent",
    title: "Differential Calculus & Gradient Descent Optimization",
    category: "mathematics",
    categoryLabel: "Calculus & Machine Learning",
    era: "Classical to Modern",
    year: 1687,
    difficulty: "Beginner",
    latex: "\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta L(\\theta)",
    keyFigures: ["Isaac Newton", "Gottfried Leibniz", "Augustin-Louis Cauchy"],
    summary: "Calculus formalizes how quantities change dynamically. Through derivatives and gradients, optimization algorithms systematically steer parameters toward optimal configurations—powering all modern Artificial Intelligence.",
    source: {
      title: "Philosophiae Naturalis Principia Mathematica & Méthode générale pour la résolution des systèmes d'équations",
      authors: "Isaac Newton (1687) & Augustin-Louis Cauchy (1847)",
      year: 1847,
      publisher: "Compte Rendu des Séances de l'Académie des Sciences",
      url: "https://gallica.bnf.fr/ark:/12148/bpt6k29828/f540.item",
      doi: "Comptes Rendus Mathématique / Cauchy 1847"
    },
    analogy: {
      title: "Walking Down a Foggy Mountain",
      text: "Imagine being blindfolded on a foggy mountain peak with one single goal: reach the lowest lake at the bottom of the valley. You cannot see the horizon, but you can feel the slope under your boots. You check which direction slants most steeply downward, take one step in that direction, and repeat. That step-by-step descent is exactly how AI models minimize prediction error."
    },
    rigor: {
      title: "Directional Derivatives & Loss Gradients",
      text: "Given a scalar cost function \\(L(\\theta)\\), the gradient vector \\(\\nabla L(\\theta)\\) points in the direction of greatest rate of increase. Multiplying by a positive learning rate \\(\\eta\\) and subtracting adjusts parameters \\(\\theta\\) opposite to the gradient, guaranteeing decrease on convex surfaces."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Generative AI & LLMs**: Language models (like ChatGPT, Gemini) and image generators learn their billions of weights by iteratively executing gradient descent on loss functions over vast datasets.",
        "**Google Maps Navigation**: Routing engines calculate instantaneous velocity changes and optimize fastest paths through traffic networks using multivariable optimization.",
        "**Aerodynamics & Fuel Economy**: Aircraft wings and electric cars have their curves mathematically sculpted using gradient-based shape optimization to minimize air drag and save energy."
      ]
    },
    quiz: [
      {
        question: "In gradient descent, what happens if the learning rate parameter (η) is chosen to be too large?",
        options: [
          "The algorithm will stop immediately at the global minimum",
          "The parameters can overshoot the valley floor and diverge chaotically rather than converging",
          "The gradient becomes permanently zero",
          "The cost function transforms into a linear polynomial"
        ],
        correctIndex: 1,
        explanation: "If the step size is too large, the updates oscillate wildly back and forth across the valley walls and may explode towards infinity instead of settling into the minimum."
      },
      {
        question: "What does the derivative f'(x) geometrically represent on a curve?",
        options: [
          "The total area enclosed under the curve",
          "The slope of the tangent line to the curve at point x",
          "The distance of the point from the Cartesian origin",
          "The curvature radius of the circle of best fit"
        ],
        correctIndex: 1,
        explanation: "The derivative at a point is the instantaneous rate of change, which is the exact slope of the tangent line touching the function at that point."
      }
    ]
  },
  {
    id: "rsa-cryptography",
    title: "Prime Number Theorem & RSA Asymmetric Encryption",
    category: "mathematics",
    categoryLabel: "Number Theory & Cryptography",
    era: "Modern",
    year: 1977,
    difficulty: "Intermediate",
    latex: "c \\equiv m^e \\pmod{n}, \\quad m \\equiv c^d \\pmod{n}",
    keyFigures: ["Carl Friedrich Gauss", "Ron Rivest", "Adi Shamir", "Leonard Adleman"],
    summary: "Number theory was once considered purely theoretical with no practical use. Today, the fundamental asymmetry between multiplying large prime numbers and factoring their product secures the entire digital world economy.",
    source: {
      title: "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems",
      authors: "R.L. Rivest, A. Shamir, and L. Adleman",
      year: 1978,
      publisher: "Communications of the ACM, Vol 21, Issue 2",
      url: "https://dl.acm.org/doi/10.1145/359340.359342",
      doi: "10.1145/359340.359342"
    },
    analogy: {
      title: "The Public Padlock and the Private Key",
      text: "Imagine a blacksmith who makes thousands of identical open padlocks and leaves them in a public bin for anyone to take. If you want to send the blacksmith a secret letter, you put it in a metal box and snap their padlock shut. Once locked, not even you can reopen it! Only the blacksmith holds the unique physical key that unlocks it. In RSA, public math lets anyone lock data, but only the private prime factors can unlock it."
    },
    rigor: {
      title: "Euler's Totient Theorem & Trapdoor Functions",
      text: "Two large prime numbers \\(p\\) and \\(q\\) form modulus \\(n = pq\\) with totient \\(\\phi(n) = (p-1)(q-1)\\). Choosing exponent \\(e\\) coprime to \\(\\phi(n)\\), the private key \\(d\\) satisfies \\(ed \\equiv 1 \\pmod{\\phi(n)}\\). By Euler's theorem, \\(m^{ed} \\equiv m \\pmod n\\). Finding \\(d\\) without knowing the prime factors \\(p\\) and \\(q\\) is computationally infeasible for 2048-bit numbers."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**HTTPS & Secure Web Browsing**: Whenever you see the padlock icon in your browser address bar when logging into your bank or email, public-key cryptography authenticates the server and establishes an encrypted channel.",
        "**ATM Cards & Credit Card Chips**: EMV chips on debit and credit cards sign transactional challenge codes cryptographically to prevent card cloning.",
        "**Software Updates**: Operating systems verify that app updates are digitally signed by authentic developers and have not been tampered with by malware."
      ]
    },
    quiz: [
      {
        question: "Why is RSA encryption computationally secure against brute-force attacks?",
        options: [
          "It is mathematically proven that prime numbers cannot be divided",
          "Multiplying two large primes takes milliseconds, but factoring their 600-digit product would take supercomputers millions of years",
          "Computers cannot calculate modulo operations",
          "The encryption key changes every millisecond automatically"
        ],
        correctIndex: 1,
        explanation: "RSA is based on the integer factorization problem: multiplication is computationally easy (one-way), but prime factorization is currently conjectured to have no polynomial-time classical algorithm."
      },
      {
        question: "What is the role of the public key in asymmetric cryptography?",
        options: [
          "It is kept strictly secret on the local hard drive",
          "It can be freely shared with anyone to encrypt messages or verify signatures",
          "It decrypts any message that was encrypted by the same public key",
          "It regenerates deleted files from network drives"
        ],
        correctIndex: 1,
        explanation: "In asymmetric cryptography, the public key is distributed openly so anyone can encrypt messages intended for the owner or verify their digital signature."
      }
    ]
  },
  {
    id: "bayes-theorem",
    title: "Bayes' Theorem & Probabilistic Inference",
    category: "mathematics",
    categoryLabel: "Probability & Statistics",
    era: "18th Century",
    year: 1763,
    difficulty: "Beginner",
    latex: "P(A|B) = \\frac{P(B|A) P(A)}{P(B)}",
    keyFigures: ["Thomas Bayes", "Pierre-Simon Laplace"],
    summary: "A fundamental theorem of probability calculus that quantifies how to update the probability of a hypothesis as new evidence or observations come to light.",
    source: {
      title: "An Essay towards solving a Problem in the Doctrine of Chances",
      authors: "Thomas Bayes (communicated by Richard Price)",
      year: 1763,
      publisher: "Philosophical Transactions of the Royal Society of London",
      url: "https://royalsocietypublishing.org/doi/10.1098/rstl.1763.0053",
      doi: "10.1098/rstl.1763.0053"
    },
    analogy: {
      title: "The Wet Umbrella Clue",
      text: "Suppose you work in a windowless room and a colleague walks in carrying a dripping wet umbrella. What is the chance it is raining? If you work in the Sahara desert, your colleague might have just walked under a lawn sprinkler! But if you live in monsoon-season Seattle, it is almost certainly raining. Bayes' Theorem explains mathematically why you must combine the new clue (wet umbrella) with your prior knowledge (where you are) to arrive at the true probability."
    },
    rigor: {
      title: "Prior, Likelihood, Evidence, and Posterior",
      text: "The posterior probability \\(P(A|B)\\) is obtained by multiplying the prior belief \\(P(A)\\) by the likelihood \\(P(B|A)\\) of observing evidence \\(B\\) given hypothesis \\(A\\), divided by the total marginal probability \\(P(B) = \\sum P(B|A_i)P(A_i)\\)."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Email Spam Filters**: Bayesian classification checks the statistical likelihood that words like 'free gift card' or 'wire transfer' appear in spam versus genuine work emails, keeping junk out of your inbox.",
        "**Medical Diagnostics**: If a rare disease affects 1 in 10,000 people and a test is 99% accurate, testing positive still means you have less than a 1% chance of actually having the disease! Doctors use Bayes' theorem to avoid panic and order confirmatory tests.",
        "**Autonomous Vehicles**: Self-driving cars constantly fuse noisy radar, LiDAR, and camera signals with Bayesian filters (like Kalman filters) to pinpoint their exact location on the road."
      ]
    },
    quiz: [
      {
        question: "If a disease has a 0.1% prevalence in a population, why might a 99% accurate test result in many false positives?",
        options: [
          "Because the test was designed incorrectly",
          "Because the healthy population is so vast (99.9%) that the 1% error rate on healthy people generates more positive results than the true cases",
          "Because Bayes' Theorem only applies to coins and dice",
          "Because probability cannot exceed 50% for biological phenomena"
        ],
        correctIndex: 1,
        explanation: "This is the classic Base Rate Fallacy. Out of 10,000 people, 10 have the disease (all test positive) and 9,990 are healthy (around 100 test positive falsely). Thus, a positive test gives only ~10/110 (~9%) posterior probability!"
      }
    ]
  },
  {
    id: "special-general-relativity",
    title: "Special & General Theory of Relativity",
    category: "physics",
    categoryLabel: "Astrophysics & Gravitation",
    era: "20th Century",
    year: 1915,
    difficulty: "Advanced",
    latex: "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}",
    keyFigures: ["Albert Einstein"],
    summary: "Overturned classical Newtonian physics by revealing that space and time are not fixed stages, but an interconnected four-dimensional fabric distorted by mass and energy, creating the phenomenon we feel as gravity.",
    source: {
      title: "Die Feldgleichungen der Gravitation (The Field Equations of Gravitation)",
      authors: "Albert Einstein",
      year: 1915,
      publisher: "Sitzungsberichte der Preussischen Akademie der Wissenschaften zu Berlin",
      url: "https://einsteinpapers.press.princeton.edu/vol6-doc/270",
      doi: "Princeton Einstein Papers Project, Vol 6, Doc 30"
    },
    analogy: {
      title: "The Bowling Ball on a Stretched Trampoline",
      text: "Newton imagined gravity as an invisible rope pulling objects together across empty space. Einstein revealed that space is like a stretchy trampoline. Place a heavy bowling ball (the Sun) in the center, and the fabric dips. If you roll a marble (the Earth) across the trampoline, it does not get pulled by a rope; it simply follows the curved contour sculpted by the bowling ball."
    },
    rigor: {
      title: "Spacetime Curvature & Geodesic Equations",
      text: "In the Einstein field equations, the Einstein tensor \\(G_{\\mu\\nu}\\) represents the local geometry/curvature of spacetime, while the stress-energy tensor \\(T_{\\mu\\nu}\\) describes the density and flux of energy, momentum, shear stress, and pressure. Freely falling matter follows straightest paths known as geodesics."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**GPS Navigation Accuracy**: GPS satellites orbit at 20,000 km altitude and travel at 14,000 km/h. Special relativity makes their clocks tick ~7 microseconds slower daily, while General relativity (weaker gravity) makes them tick ~45 microseconds faster. Without daily 38-microsecond relativistic corrections, Google Maps would drift by over 10 kilometers every day!",
        "**Nuclear Energy & Sun Light**: Einstein's equation \\(E = mc^2\\) proves that mass can convert directly into immense energy, explaining how nuclear fission plants generate electricity and how the Sun illuminates Earth.",
        "**Gravitational Wave Detectors (LIGO)**: Laser interferometers measure distortions in space smaller than one ten-thousandth the diameter of a proton caused by colliding black holes billions of light-years away."
      ]
    },
    quiz: [
      {
        question: "What would happen to smartphone GPS directions if engineers ignored Einstein's relativistic time dilation effects?",
        options: [
          "GPS would continue working with zero errors because speed of light is constant",
          "Location measurements would drift by approximately 10 to 11 kilometers each day, making navigation useless within minutes",
          "Satellite batteries would drain 10 times faster",
          "Radio signals would be reflected into deep space"
        ],
        correctIndex: 1,
        explanation: "Because atomic clocks on GPS satellites gain about 38 microseconds net per day relative to ground clocks, light travel-time errors multiply by c (300,000 km/s), causing position errors of over 10 km/day."
      },
      {
        question: "According to General Relativity, what causes planets to orbit the Sun?",
        options: [
          "A mechanical magnetic tether between solar poles",
          "Planets follow straightest paths (geodesics) through spacetime curved by the Sun's mass",
          "Centrifugal force repels cosmic rays against the planet",
          "Atmospheric pressure differences in outer space"
        ],
        correctIndex: 1,
        explanation: "Einstein showed that mass curves the geometry of 4D spacetime, and orbiting planets simply follow natural unaccelerated paths (geodesics) through this curved spacetime."
      }
    ]
  },
  {
    id: "quantum-mechanics",
    title: "Quantum Superposition & Wave Mechanics",
    category: "physics",
    categoryLabel: "Quantum Physics",
    era: "20th Century",
    year: 1926,
    difficulty: "Advanced",
    latex: "i\\hbar \\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r}, t) = \\hat{H}\\Psi(\\mathbf{r}, t)",
    keyFigures: ["Max Planck", "Erwin Schrödinger", "Werner Heisenberg", "Niels Bohr"],
    summary: "At subatomic scales, matter and energy defy classical intuition, existing not as definitive billiard balls, but as clouds of probability amplitudes that interfere, tunnel through barriers, and collapse upon measurement.",
    source: {
      title: "Quantisierung als Eigenwertproblem (Quantization as an Eigenvalue Problem)",
      authors: "Erwin Schrödinger",
      year: 1926,
      publisher: "Annalen der Physik, 384(4), 361-376",
      url: "https://onlinelibrary.wiley.com/doi/10.1002/andp.19263840404",
      doi: "10.1002/andp.19263840404"
    },
    analogy: {
      title: "The Spinning Coin on the Table",
      text: "When a coin is resting flat on a table, it is unambiguously either Heads or Tails. But while it is spinning rapidly, what is it? It is in a dynamic blend of both states at once—a blur of possibilities! Only when you slap your hand down onto the table (perform an observation) does the spinning state collapse instantaneously into one definitive outcome."
    },
    rigor: {
      title: "Wavefunctions & Born Probability Interpretation",
      text: "The state of a quantum particle is completely specified by its wavefunction \\(\\Psi(\\mathbf{r}, t)\\). The absolute square of the amplitude \\(|\\Psi(\\mathbf{r}, t)|^2\\) gives the probability density of finding the particle at position \\(\\mathbf{r}\\). The Hamiltonian operator \\(\\hat{H}\\) generates time evolution."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Computer Transistors & Microchips**: Every smartphone and laptop contains billions of silicon transistors. Their behavior relies entirely on quantum band gap theory and quantum electron tunneling.",
        "**LEDs & Lasers**: Barcode scanners, fiber optic telecom cables, and TV screens depend on photons emitted when electrons drop across quantized atomic energy levels.",
        "**Solar Energy Panels**: Photovoltaic solar cells convert incoming solar photons directly into electric current via the photoelectric effect (for which Einstein received the 1921 Nobel Prize in Physics)."
      ]
    },
    quiz: [
      {
        question: "What physical quantity is calculated from the square of the absolute value of the quantum wavefunction, |Ψ|²?",
        options: [
          "The mechanical temperature of the particle in Kelvin",
          "The probability density of locating the particle at that position",
          "The exact velocity vector of the particle",
          "The mass density of the atomic nucleus"
        ],
        correctIndex: 1,
        explanation: "Max Born won the 1954 Nobel Prize in Physics for proposing that |Ψ|² represents the probability distribution of finding a particle upon measurement."
      }
    ]
  },
  {
    id: "maxwell-equations",
    title: "Maxwell's Equations & The Electromagnetic Spectrum",
    category: "physics",
    categoryLabel: "Electromagnetism",
    era: "19th Century",
    year: 1865,
    difficulty: "Intermediate",
    latex: "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}, \\quad \\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}",
    keyFigures: ["James Clerk Maxwell"],
    summary: "Unified electricity, magnetism, and optics into four elegant vector equations, discovering that light itself is an oscillating electromagnetic wave traveling at a universal constant speed.",
    source: {
      title: "A Dynamical Theory of the Electromagnetic Field",
      authors: "James Clerk Maxwell",
      year: 1865,
      publisher: "Philosophical Transactions of the Royal Society of London, 155, 459-512",
      url: "https://royalsocietypublishing.org/doi/10.1098/rstl.1865.0008",
      doi: "10.1098/rstl.1865.0008"
    },
    analogy: {
      title: "The Self-Propelling Wave in Empty Space",
      text: "Shake an electric charge, and it creates a ripple in the electric field. Maxwell's genius was realizing that this changing electric ripple automatically generates a perpendicular magnetic ripple, which in turn generates a new electric ripple! They play leapfrog across empty vacuum at 300,000 kilometers per second, forever propagating without needing any wire or medium."
    },
    rigor: {
      title: "The Four Pillars of Classical Electrodynamics",
      text: "The set comprises: Gauss's Law for electric fields (charges are sources), Gauss's Law for magnetism (no magnetic monopoles exist, \\(\\nabla \\cdot \\mathbf{B} = 0\\)), Faraday's Law of induction, and the Ampère-Maxwell Law containing the crucial displacement current term \\(\\mu_0\\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}\\)."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Wi-Fi, Bluetooth & Mobile Networks**: Every wireless communication device broadcasts and receives information carried on electromagnetic waves predicted by Maxwell.",
        "**Microwave Ovens**: Oscillating 2.45 GHz electromagnetic fields rotate water molecules in food back and forth billions of times per second, heating your dinner via dielectric friction.",
        "**Electric Motors & Power Generators**: Power plants turn turbines using steam or water to spin magnets near copper coils, generating city-wide electrical power using Faraday-Maxwell induction."
      ]
    },
    quiz: [
      {
        question: "What revolutionary realization came from Maxwell calculating the theoretical propagation velocity of electromagnetic waves in vacuum?",
        options: [
          "The speed matched the measured speed of light, proving light is an electromagnetic wave",
          "Sound waves travel faster in vacuum than in air",
          "Electricity requires a physical ether medium to flow",
          "Magnetic monopoles are present in ordinary lightning"
        ],
        correctIndex: 0,
        explanation: "Maxwell calculated 1/√(ε₀μ₀) and found it matched the experimentally measured speed of light (~3·10⁸ m/s), leading to his historic conclusion: 'light consists in the transverse undulations of the same medium which is the cause of electric and magnetic oscillations.'"
      }
    ]
  },
  {
    id: "dna-double-helix",
    title: "The Double Helix Structure of DNA",
    category: "biology",
    categoryLabel: "Molecular Biology & Genetics",
    era: "20th Century",
    year: 1953,
    difficulty: "Beginner",
    latex: "\\text{Base Pairing: } A \\equiv T, \\quad G \\equiv C",
    keyFigures: ["James Watson", "Francis Crick", "Rosalind Franklin", "Maurice Wilkins"],
    summary: "Unveiled the molecular architecture of life: an antiparallel double helix of nucleotide base pairs whose complementary chemical structure immediately suggested a self-copying mechanism for genetic inheritance.",
    source: {
      title: "Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid",
      authors: "J.D. Watson and F.H.C. Crick (with acknowledgment of Franklin & Gosling X-ray data)",
      year: 1953,
      publisher: "Nature, 171(4356), 737-738",
      url: "https://www.nature.com/articles/171737a0",
      doi: "10.1038/171737a0"
    },
    analogy: {
      title: "The Zipping Twisted Spiral Staircase",
      text: "Think of DNA as a long flexible spiral staircase. The banisters are made of alternating sugar and phosphate backbones. The steps in the middle are made of two puzzle pieces snapping together: Adenine always fits Thymine, and Guanine always fits Cytosine. To copy a cell, the staircase simply unzips down the center, and each exposed half acts as a template to build a brand new partner staircase."
    },
    rigor: {
      title: "B-DNA Geometry & Chargaff's Rules",
      text: "Franklin's X-ray crystallography 'Photo 51' revealed the cross-shaped helical diffraction pattern. B-DNA has a diameter of \\(2.0\\,\\text{nm}\\), a helical pitch of \\(3.4\\,\\text{nm}\\) per turn with 10.5 base pairs, and major and minor grooves facilitating transcription factor binding."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Forensic DNA Profiling**: Police and legal courts identify criminal suspects or exonerate innocent individuals with 99.9999% accuracy using Short Tandem Repeat (STR) genetic analysis.",
        "**mRNA Vaccines (COVID-19)**: Synthetic molecular biology blueprints teach human immune cells to build target viral spike proteins without ever needing live pathogens.",
        "**Ancestry & Genetic Disease Screening**: Saliva tests decode consumer DNA to identify inherited cancer risks, carrier status for cystic fibrosis, and family lineage."
      ]
    },
    quiz: [
      {
        question: "Why does Adenine pair strictly with Thymine and Guanine with Cytosine in the double helix?",
        options: [
          "Because of complementary hydrogen bonding geometries (2 bonds for A-T, 3 bonds for G-C) and uniform helical width",
          "Because covalent peptide bonds lock them into place",
          "Because cells reject odd numbers of carbon atoms",
          "Because nitrogen atoms only exist in pairs inside cell nuclei"
        ],
        correctIndex: 0,
        explanation: "Specific hydrogen bonding pairing (two hydrogen bonds between A and T, three between G and C) maintains a constant 2-nanometer diameter across the helix."
      }
    ]
  },
  {
    id: "crispr-cas9",
    title: "CRISPR-Cas9 Programmable Gene Editing",
    category: "biology",
    categoryLabel: "Biotechnology & Medicine",
    era: "21st Century",
    year: 2012,
    difficulty: "Intermediate",
    latex: "\\text{sgRNA} + \\text{Cas9} \\rightarrow 5'\\text{-NGG-}'3 \\text{ (PAM Cleavage)}",
    keyFigures: ["Emmanuelle Charpentier", "Jennifer Doudna"],
    summary: "Adapted an ancient bacterial immune defense system into molecular scissors guided by custom RNA sequences, empowering scientists to edit genetic code in living cells with surgical precision.",
    source: {
      title: "A Programmable Dual-RNA–Guided DNA Endonuclease in Adaptive Bacterial Immunity",
      authors: "M. Jinek, K. Chylinski, I. Fonfara, M. Hauer, J.A. Doudna, E. Charpentier",
      year: 2012,
      publisher: "Science, 337(6096), 816-821",
      url: "https://www.science.org/doi/10.1126/science.1225829",
      doi: "10.1126/science.1225829"
    },
    analogy: {
      title: "The Molecular Find & Replace Tool",
      text: "Imagine opening an encyclopedia that contains 3 billion letters (the human genome) and wanting to fix one single misspelled letter on page 4,210. Traditional genetic tools were like a shotgun blast. CRISPR-Cas9 is a GPS-guided drone: an RNA guide spells out the exact search phrase, flies directly to that spot in the chromosome, and makes a clean cut so the cell repairs it correctly."
    },
    rigor: {
      title: "Mechanism of Action & PAM Recognition",
      text: "The chimeric single guide RNA (sgRNA) pairs with the 20-nucleotide target sequence in the genomic DNA adjacent to a Protospacer Adjacent Motif (PAM, typically 5'-NGG-3'). The Cas9 endonuclease HNH and RuvC domains then produce a double-strand break (DSB) 3 base pairs upstream of the PAM."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Curing Sickle Cell Anemia**: In late 2023, health regulators approved Casgevy, the world's first CRISPR-based gene therapy, curing patients of painful lifelong genetic sickle cell disease.",
        "**Cancer Immunotherapy (CAR-T)**: Doctors edit a patient's own white blood cells with CRISPR to give them receptor targets that aggressively destroy leukemia and lymphoma tumors.",
        "**Climate-Resilient Crops**: Scientists edit wheat, rice, and tomatoes to survive severe droughts and resist fungal infections without inserting foreign animal genes."
      ]
    },
    quiz: [
      {
        question: "What original natural role does CRISPR-Cas9 serve in bacteria?",
        options: [
          "It helps bacteria digest complex sugars in milk",
          "It acts as an adaptive immune system to record and chop up invading bacteriophage viral DNA",
          "It allows bacteria to photosynthesize sunlight into glucose",
          "It forms the bacterial flagellum motor for swimming"
        ],
        correctIndex: 1,
        explanation: "Bacteria store fragments of past viral attackers in CRISPR arrays, using matching RNA guides to direct Cas enzymes to slice up reinfecting phages."
      }
    ]
  },
  {
    id: "turing-machine",
    title: "Turing Machines & The Halting Problem",
    category: "computing",
    categoryLabel: "Theoretical Computer Science",
    era: "20th Century",
    year: 1936,
    difficulty: "Advanced",
    latex: "M = \\langle Q, \\Sigma, \\Gamma, \\delta, q_0, q_{accept}, q_{reject} \\rangle",
    keyFigures: ["Alan Turing"],
    summary: "Defined the mathematical boundaries of computation decades before electronic computers existed, proving both what algorithms can compute and that fundamental problems exist which no computer will ever be able to solve.",
    source: {
      title: "On Computable Numbers, with an Application to the Entscheidungsproblem",
      authors: "A.M. Turing",
      year: 1936,
      publisher: "Proceedings of the London Mathematical Society, s2-42(1), 230-265",
      url: "https://doi.org/10.1112/plms/s2-42.1.230",
      doi: "10.1112/plms/s2-42.1.230"
    },
    analogy: {
      title: "The Universal Paper Tape Machine",
      text: "Turing envisioned a simple mechanical scanner on an infinite strip of paper divided into squares. It reads a symbol, looks at a tiny rulebook, writes a new symbol, and moves left or right. Turing proved that this minimal setup can execute any calculation that any supercomputer built now or a trillion years from now can perform! He also showed it is impossible to write a master program that can look at any other program and reliably tell if it will ever finish running or freeze forever."
    },
    rigor: {
      title: "Undecidability of the Halting Problem via Diagonalization",
      text: "Suppose there existed a program \\(H(P, I)\\) returning true if program \\(P\\) halts on input \\(I\\), and false if it loops forever. We construct opposite program \\(D(P)\\): if \\(H(P, P)\\) is true, loop forever; else halt. Calling \\(D(D)\\) forces a logical contradiction: \\(D\\) halts if and only if \\(D\\) loops forever. Hence \\(H\\) cannot exist."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**Every Digital Computer in Existence**: Von Neumann architecture, desktop PCs, cloud servers, and iPhones are all real-world physical realizations of Turing's Universal Machine.",
        "**Software Antivirus & Compilers**: Understanding undecidability prevents software engineers from chasing impossible bugs and underpins formal code verification.",
        "**Artificial Intelligence & Cryptography**: Turing also designed the codebreaking Bombe at Bletchley Park and formulated the famous 'Turing Test' for machine intelligence."
      ]
    },
    quiz: [
      {
        question: "What does Turing's proof of the Halting Problem demonstrate?",
        options: [
          "Any software program will eventually stop running if given enough RAM",
          "There are mathematically well-defined problems that no computer algorithm can ever solve",
          "Computers can never outperform humans at chess",
          "All digital calculations must be performed in base-10 mathematics"
        ],
        correctIndex: 1,
        explanation: "The Halting Problem proves that computability has strict mathematical limits: no general algorithm can decide whether arbitrary programs halt or run forever."
      }
    ]
  },
  {
    id: "information-theory",
    title: "Shannon's Information Theory & Entropy",
    category: "computing",
    categoryLabel: "Information Theory",
    era: "20th Century",
    year: 1948,
    difficulty: "Intermediate",
    latex: "H(X) = -\\sum_{i=1}^n P(x_i) \\log_2 P(x_i), \\quad C = B \\log_2\\left(1 + \\frac{S}{N}\\right)",
    keyFigures: ["Claude Shannon"],
    summary: "Created the digital age in a single paper by quantifying information into 'bits', establishing the theoretical limits of file compression and error-free communication across noisy channels.",
    source: {
      title: "A Mathematical Theory of Communication",
      authors: "C.E. Shannon",
      year: 1948,
      publisher: "Bell System Technical Journal, 27(3), 379-423",
      url: "https://ieeexplore.ieee.org/document/6773024",
      doi: "10.1002/j.1538-7305.1948.tb01338.x"
    },
    analogy: {
      title: "Playing 20 Questions with Surprise",
      text: "Information is mathematically the reduction of uncertainty. If a friend tells you 'The sun rose in the east today', that message gives you 0 bits of real information because you were already 100% certain of it. But if they tell you 'It snowed in the middle of the Sahara desert', that rare surprise carries immense information! Shannon quantified surprise using logarithms, creating the 'bit' (binary digit)."
    },
    rigor: {
      title: "Shannon Entropy & Channel Capacity Theorem",
      text: "Entropy \\(H(X)\\) measures the minimum expected number of bits required to encode the outcomes of a discrete random variable. Shannon's noisy channel coding theorem established the Shannon limit \\(C = B \\log_2(1 + \\text{SNR})\\): data can be transmitted across a noisy medium with arbitrarily small error probability as long as the rate \\(R < C\\)."
    },
    dailyLife: {
      title: "How It Powers Your Daily Life",
      points: [
        "**ZIP Compression & File Storage**: Lossless data compression algorithms (Huffman coding, Lempel-Ziv) rely on Shannon entropy to compress documents without losing a single character.",
        "**Deep Space Voyager & Mars Rovers**: NASA probes transmit photos across billions of miles of solar radiation noise using error-correcting codes derived directly from Shannon's channel theorems.",
        "**5G & Wi-Fi Modulation**: Modern modems dynamically adjust their constellation size (QAM) to get as close to the Shannon channel capacity limit as physics allows."
      ]
    },
    quiz: [
      {
        question: "According to Shannon's definition, which message conveys the highest information entropy?",
        options: [
          "A message that confirms a guaranteed 100% predictable event",
          "A message communicating an outcome with high surprise and high uncertainty prior to transmission",
          "A string of 100 identical zeroes in a row",
          "An empty transmission packet"
        ],
        correctIndex: 1,
        explanation: "Information entropy measures uncertainty. Highly unexpected, low-probability events provide the greatest reduction in uncertainty, conveying the most bits of information."
      }
    ]
  }
];

export const SCIENTISTS_DATA = [
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
    award: "Nobel Prize in Physics (1921)",
    awardCitation: "For his services to Theoretical Physics, and especially for his discovery of the law of the photoelectric effect.",
    birthYear: 1879,
    deathYear: 1955,
    fields: ["Physics", "Cosmology", "Mathematics"],
    achievements: [
      "Special Theory of Relativity and Mass-Energy Equivalence (E = mc²)",
      "General Theory of Relativity (curved spacetime formulation of gravitation)",
      "Explanation of the Photoelectric Effect proving photon quantum nature",
      "Mathematical theory of Brownian motion proving the physical existence of atoms"
    ],
    seminalPapers: [
      { title: "Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt", year: 1905, topic: "Photoelectric Effect" },
      { title: "Zur Elektrodynamik bewegter Körper", year: 1905, topic: "Special Relativity" },
      { title: "Die Grundlage der allgemeinen Relativitätstheorie", year: 1916, topic: "General Relativity" }
    ],
    quote: "Pure mathematics is, in its way, the poetry of logical ideas."
  },
  {
    id: "marie-curie",
    name: "Marie Skłodowska Curie",
    title: "Physicist & Chemist",
    award: "Nobel Prize in Physics (1903) & Chemistry (1911)",
    awardCitation: "First person to win two Nobel Prizes, and only person honored in two distinct scientific disciplines.",
    birthYear: 1867,
    deathYear: 1934,
    fields: ["Physics", "Chemistry", "Radiology"],
    achievements: [
      "Pioneered the theory of radioactivity (coined the term 'radioactivity')",
      "Discovered two chemical elements: Polonium and Radium",
      "Developed mobile radiography units ('Petites Curies') to treat over 1 million wounded soldiers in WWI",
      "Founded the Curie Institute in Paris and Warsaw"
    ],
    seminalPapers: [
      { title: "Rayons émis par les composés de l'uranium et du thorium", year: 1898, topic: "Discovery of Radioactivity" },
      { title: "Recherches sur les substances radioactives", year: 1903, topic: "Doctoral Thesis on Radium" }
    ],
    quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less."
  },
  {
    id: "leonhard-euler",
    name: "Leonhard Euler",
    title: "Master Mathematician & Physicist",
    award: "Pioneer of Modern Mathematics & Analysis",
    awardCitation: "The most prolific mathematician in history, publishing over 850 mathematical treatises across analysis, graph theory, mechanics, and astronomy.",
    birthYear: 1707,
    deathYear: 1783,
    fields: ["Mathematics", "Physics", "Fluid Dynamics", "Astronomy"],
    achievements: [
      "Standardized modern mathematical notation: f(x), e, i, π, Σ, and sin/cos",
      "Solved the Seven Bridges of Königsberg problem, inventing Graph Theory and Topology",
      "Formulated Euler's Identity (e^(iπ) + 1 = 0) and Euler's formula for polyhedra (V - E + F = 2)",
      "Formulated the Euler equations for inviscid fluid flow"
    ],
    seminalPapers: [
      { title: "Introductio in analysin infinitorum", year: 1748, topic: "Foundations of Mathematical Analysis" },
      { title: "Solutio problematis ad geometriam situs pertinentis", year: 1736, topic: "Königsberg Bridges / Graph Theory" }
    ],
    quote: "Mathematicians have tried in vain to this day to discover some order in the sequence of prime numbers, and we have reason to believe that it is a mystery into which the human mind will never penetrate."
  },
  {
    id: "srinivasa-ramanujan",
    name: "Srinivasa Ramanujan",
    title: "Mathematical Genius",
    award: "Fellow of the Royal Society (FRS 1918)",
    awardCitation: "Autodidact mathematical prodigy whose profound intuition produced nearly 3,900 original identities, partition formulas, and mock theta functions.",
    birthYear: 1887,
    deathYear: 1920,
    fields: ["Pure Mathematics", "Number Theory", "Infinite Series"],
    achievements: [
      "Asymptotic formula for the integer partition function p(n) with G.H. Hardy",
      "Rapidly converging infinite series for calculating digits of π",
      "Formulated Ramanujan-Soldner constant and the Ramanujan theta function",
      "Discovered mock theta functions, now fundamental to string theory and black hole entropy"
    ],
    seminalPapers: [
      { title: "Asymptotic Formulae in Combinatory Analysis", year: 1918, topic: "Hardy-Ramanujan Partition Formula" },
      { title: "Modular Equations and Approximations to π", year: 1914, topic: "Fast Pi Calculations" }
    ],
    quote: "An equation for me has no meaning unless it expresses a thought of God."
  },
  {
    id: "emmy-noether",
    name: "Emmy Noether",
    title: "Mathematician & Theoretical Physicist",
    award: "Pioneer of Abstract Algebra & Theoretical Physics",
    awardCitation: "Einstein called her 'the most significant creative mathematical genius thus far produced since the higher education of women began.'",
    birthYear: 1882,
    deathYear: 1935,
    fields: ["Mathematics", "Abstract Algebra", "Theoretical Physics"],
    achievements: [
      "Proved Noether's Theorem: every continuous symmetry of a physical system has a corresponding conservation law (e.g. time symmetry = energy conservation)",
      "Revolutionized abstract ring theory, ideals, and Noetherian rings",
      "Unified quantum mechanics and conservation principles mathematically"
    ],
    seminalPapers: [
      { title: "Invariante Variationsprobleme", year: 1918, topic: "Noether's Theorem on Symmetries and Conservation" },
      { title: "Idealtheorie in Ringbereichen", year: 1921, topic: "Foundations of Modern Commutative Algebra" }
    ],
    quote: "My methods are really methods of working and thinking; this is why they have crept in everywhere anonymously."
  },
  {
    id: "alan-turing",
    name: "Alan Turing",
    title: "Mathematician & Father of Modern Computing",
    award: "OBE, FRS, Computing Icon",
    awardCitation: "Conceived the theoretical foundations of modern computing, algorithms, artificial intelligence, and cracked the Enigma code at Bletchley Park.",
    birthYear: 1912,
    deathYear: 1954,
    fields: ["Mathematics", "Computer Science", "Cryptanalysis", "Morphogenesis"],
    achievements: [
      "Invented the Universal Turing Machine model underpinning all modern software and CPUs",
      "Proved the unsolvability of the Halting Problem",
      "Designed the electro-mechanical Bombe that cracked Enigma ciphers in WWII",
      "Pioneered Artificial Intelligence through the Turing Test",
      "Developed mathematical reaction-diffusion equations explaining pattern formation in biology"
    ],
    seminalPapers: [
      { title: "On Computable Numbers, with an Application to the Entscheidungsproblem", year: 1936, topic: "Universal Turing Machine" },
      { title: "Computing Machinery and Intelligence", year: 1950, topic: "Can Machines Think? / The Turing Test" },
      { title: "The Chemical Basis of Morphogenesis", year: 1952, topic: "Reaction-Diffusion Systems in Nature" }
    ],
    quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done."
  },
  {
    id: "jennifer-doudna",
    name: "Jennifer Doudna",
    title: "Biochemist & Molecular Biologist",
    award: "Nobel Prize in Chemistry (2020)",
    awardCitation: "For the development of a method for genome editing (CRISPR-Cas9).",
    birthYear: 1964,
    deathYear: null,
    fields: ["Biochemistry", "Molecular Genetics", "RNA Biology"],
    achievements: [
      "Co-discovered the programmable CRISPR-Cas9 molecular gene editing scissors",
      "Deciphered structural RNA biology including self-splicing ribozymes",
      "Co-founded multiple biotechnology pioneers creating clinical gene therapies",
      "Advocated global bioethics frameworks for human gene editing"
    ],
    seminalPapers: [
      { title: "A Programmable Dual-RNA–Guided DNA Endonuclease in Adaptive Bacterial Immunity", year: 2012, topic: "CRISPR-Cas9 Gene Editing" }
    ],
    quote: "The power to control our species' genetic future is awesome and terrifying. Deciding how to handle it may be the biggest challenge we have ever faced."
  },
  {
    id: "claude-shannon",
    name: "Claude Shannon",
    title: "Mathematician & Electrical Engineer",
    award: "Father of Information Theory",
    awardCitation: "Single-handedly founded the field of Information Theory, proving that all communications can be quantified into binary digital bits.",
    birthYear: 1916,
    deathYear: 2001,
    fields: ["Mathematics", "Information Theory", "Computer Engineering", "Cryptography"],
    achievements: [
      "Demonstrated that Boolean algebra can implement electrical switching circuits (the basis of all digital logic gates and computers)",
      "Formulated Information Entropy and Channel Capacity limits",
      "Proved that the One-Time Pad is mathematically unbreakable",
      "Built one of the earliest artificial intelligence learning machines ('Theseus' mechanical mouse)"
    ],
    seminalPapers: [
      { title: "A Symbolic Analysis of Relay and Switching Circuits", year: 1938, topic: "Master's Thesis unifying Boolean Logic & Hardware" },
      { title: "A Mathematical Theory of Communication", year: 1948, topic: "Information Theory & Bits" },
      { title: "Communication Theory of Secrecy Systems", year: 1949, topic: "Mathematical Cryptography" }
    ],
    quote: "I just wondered how things were put together."
  },
  {
    id: "roger-penrose",
    name: "Sir Roger Penrose",
    title: "Mathematical Physicist",
    award: "Nobel Prize in Physics (2020)",
    awardCitation: "For the discovery that black hole formation is a robust prediction of the general theory of relativity.",
    birthYear: 1931,
    deathYear: null,
    fields: ["Mathematical Physics", "Differential Geometry", "Cosmology"],
    achievements: [
      "Penrose-Hawking Singularity Theorems proving black holes must form under General Relativity",
      "Discovered Penrose Tilings: aperiodic non-repeating geometric tilings with five-fold symmetry",
      "Developed Twistor Theory connecting complex geometry with quantum spacetime",
      "Formulated Conformal Cyclic Cosmology (CCC)"
    ],
    seminalPapers: [
      { title: "Gravitational Collapse and Space-Time Singularities", year: 1965, topic: "Black Hole Singularity Theorem" }
    ],
    quote: "It is a revelation of mathematics: beauty and truth are intertwined."
  },
  {
    id: "katalin-kariko",
    name: "Katalin Karikó",
    title: "Biochemist",
    award: "Nobel Prize in Physiology or Medicine (2023)",
    awardCitation: "For discoveries concerning nucleoside base modifications that enabled the development of effective mRNA vaccines against COVID-19.",
    birthYear: 1955,
    deathYear: null,
    fields: ["Biochemistry", "RNA Therapeutics", "Immunology"],
    achievements: [
      "Discovered that pseudouridine base modification prevents mRNA from triggering destructive inflammatory responses",
      "Pioneered synthetic mRNA therapeutics through decades of underfunded perseverance",
      "Enabled the rapid development of BioNTech/Pfizer and Moderna COVID-19 mRNA vaccines, saving tens of millions of lives"
    ],
    seminalPapers: [
      { title: "Suppression of RNA recognition by Toll-like receptors: the impact of nucleoside modification", year: 2005, topic: "Pseudouridine modified mRNA" }
    ],
    quote: "You have to believe that the question you are asking is important, and you have to keep working on it."
  }
];

export const TIMELINE_EVENTS = [
  {
    year: "c. 300 BCE",
    title: "Euclid's Elements",
    category: "mathematics",
    desc: "Axiomatized geometry, number theory, and the Euclidean algorithm for greatest common divisors."
  },
  {
    year: "1687",
    title: "Newton's Principia",
    category: "physics",
    desc: "Sir Isaac Newton publishes the laws of motion, universal gravitation, and the foundations of differential calculus."
  },
  {
    year: "1748",
    title: "Euler's Identity & Analysis",
    category: "mathematics",
    desc: "Leonhard Euler publishes 'Introductio in Analysin Infinitorum', connecting e, i, and pi."
  },
  {
    year: "1822",
    title: "Fourier's Waveform Analysis",
    category: "mathematics",
    desc: "Joseph Fourier shows any continuous wave can be disassembled into harmonious sine and cosine components."
  },
  {
    year: "1865",
    title: "Maxwell's Equations",
    category: "physics",
    desc: "James Clerk Maxwell unifies electricity, magnetism, and light into electrodynamics."
  },
  {
    year: "1905",
    title: "Einstein's Annus Mirabilis",
    category: "physics",
    desc: "Einstein publishes papers on the Photoelectric Effect, Brownian Motion, and Special Relativity (E = mc²)."
  },
  {
    year: "1915",
    title: "General Relativity",
    category: "physics",
    desc: "Einstein formulates gravity as the curvature of four-dimensional spacetime."
  },
  {
    year: "1926",
    title: "Schrödinger Equation",
    category: "physics",
    desc: "Erwin Schrödinger publishes wave mechanics, establishing modern quantum mechanics."
  },
  {
    year: "1936",
    title: "Universal Turing Machine",
    category: "computing",
    desc: "Alan Turing defines algorithmic computability and proves the Halting Problem."
  },
  {
    year: "1948",
    title: "Information Theory (Shannon)",
    category: "computing",
    desc: "Claude Shannon establishes the mathematical theory of communication, coining the bit."
  },
  {
    year: "1953",
    title: "DNA Double Helix",
    category: "biology",
    desc: "Watson, Crick, and Franklin reveal the molecular structure and copying mechanism of DNA."
  },
  {
    year: "1977",
    title: "RSA Public-Key Cryptography",
    category: "mathematics",
    desc: "Rivest, Shamir, and Adleman turn prime number theory into the backbone of digital security."
  },
  {
    year: "2012",
    title: "CRISPR-Cas9 Gene Editing",
    category: "biology",
    desc: "Charpentier and Doudna engineer programmable molecular scissors for living genomic DNA."
  },
  {
    year: "2023",
    title: "mRNA Medicine Revolution",
    category: "biology",
    desc: "Karikó and Weissman awarded Nobel Prize for nucleoside-modified mRNA vaccines."
  }
];
