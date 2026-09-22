/**
 * Principia: Interactive Quiz Engine
 * Powers concept-specific micro-quizzes and the full Knowledge Challenge mode.
 */

const STORAGE_KEY = "principia_quiz_progress_v1";

export class QuizEngine {
  constructor() {
    this.progress = this.loadProgress();
  }

  loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { solved: {}, totalScore: 0, streak: 0 };
    } catch {
      return { solved: {}, totalScore: 0, streak: 0 };
    }
  }

  saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (e) {
      console.warn("Unable to save quiz progress to localStorage", e);
    }
  }

  recordAnswer(conceptId, questionIndex, isCorrect) {
    const key = `${conceptId}_${questionIndex}`;
    const previous = this.progress.solved[key];

    if (isCorrect) {
      if (!previous) {
        this.progress.totalScore += 10;
        this.progress.streak += 1;
      }
      this.progress.solved[key] = true;
    } else {
      this.progress.streak = 0;
      this.progress.solved[key] = false;
    }

    this.saveProgress();
    return this.progress;
  }

  isQuestionSolved(conceptId, questionIndex) {
    return this.progress.solved[`${conceptId}_${questionIndex}`] === true;
  }

  getRankTitle() {
    const s = this.progress.totalScore;
    if (s >= 150) return { title: "Fields & Nobel Polymath", badge: "🏆", next: null };
    if (s >= 100) return { title: "Distinguished Fellow", badge: "🌟", next: 150 };
    if (s >= 50) return { title: "Scientific Inquirer", badge: "🔬", next: 100 };
    if (s >= 20) return { title: "Curious Scholar", badge: "📐", next: 50 };
    return { title: "Apprentice Thinker", badge: "🌱", next: 20 };
  }

  /**
   * Render interactive micro-quiz for a specific concept into a target container
   */
  renderConceptQuiz(container, concept) {
    if (!container || !concept || !concept.quiz || concept.quiz.length === 0) {
      if (container) container.innerHTML = "<p class='quiz-empty'>No quiz questions registered for this topic yet.</p>";
      return;
    }

    container.innerHTML = `
      <div class="concept-quiz-header">
        <div class="quiz-badge">🧠 Knowledge Check</div>
        <h4>Test Your Intuition on ${concept.title}</h4>
        <p class="quiz-subtext">Answer these conceptual micro-questions to test your grasp of the real-world principle.</p>
      </div>
      <div class="quiz-questions-list">
        ${concept.quiz.map((q, qIndex) => {
          const solved = this.isQuestionSolved(concept.id, qIndex);
          return `
            <div class="quiz-item ${solved ? 'is-solved' : ''}" data-question-index="${qIndex}">
              <div class="quiz-question-text">
                <span class="q-num">Q${qIndex + 1}</span>
                <p>${escapeHtml(q.question)}</p>
              </div>
              <div class="quiz-options">
                ${q.options.map((opt, optIndex) => `
                  <button type="button" class="quiz-opt-btn" data-opt-index="${optIndex}">
                    <span class="opt-indicator">${String.fromCharCode(65 + optIndex)}</span>
                    <span class="opt-label">${escapeHtml(opt)}</span>
                  </button>
                `).join("")}
              </div>
              <div class="quiz-feedback hidden"></div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    // Attach listeners
    container.querySelectorAll(".quiz-item").forEach(itemEl => {
      const qIndex = parseInt(itemEl.dataset.questionIndex, 10);
      const question = concept.quiz[qIndex];
      const feedbackEl = itemEl.querySelector(".quiz-feedback");
      const optionButtons = itemEl.querySelectorAll(".quiz-opt-btn");

      optionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const selectedIndex = parseInt(btn.dataset.optIndex, 10);
          const isCorrect = selectedIndex === question.correctIndex;

          // Freeze options in this question
          optionButtons.forEach((b, idx) => {
            b.disabled = true;
            if (idx === question.correctIndex) {
              b.classList.add("correct-choice");
            } else if (idx === selectedIndex && !isCorrect) {
              b.classList.add("wrong-choice");
            }
          });

          this.recordAnswer(concept.id, qIndex, isCorrect);

          feedbackEl.className = `quiz-feedback ${isCorrect ? "feedback-success" : "feedback-error"}`;
          feedbackEl.innerHTML = `
            <div class="feedback-icon">${isCorrect ? "✓ Correct!" : "✗ Not quite"}</div>
            <div class="feedback-text">${escapeHtml(question.explanation)}</div>
          `;
          feedbackEl.classList.remove("hidden");

          // Dispatch event so UI stats can update live
          window.dispatchEvent(new CustomEvent("principia-quiz-updated"));
        });
      });
    });
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
