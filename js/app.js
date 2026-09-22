/**
 * Principia: Main Application Controller
 * Handles view switching, search, filtering, modals, KaTeX rendering, and APIs.
 */

import { CONCEPTS_DATA, SCIENTISTS_DATA, TIMELINE_EVENTS } from "./data.js";
import { fetchNobelLaureates, searchArxivPapers } from "./api.js";
import { QuizEngine } from "./quiz.js";

class PrincipiaApp {
  constructor() {
    this.quizEngine = new QuizEngine();
    this.activeTab = "discover";
    this.activeCategory = "all";
    this.searchQuery = "";
    this.bookmarks = this.loadBookmarks();
    this.currentConcept = null;

    this.initDOM();
    this.initTheme();
    this.bindEvents();
    this.render();
    this.updateQuizBadgeInHeader();
  }

  loadBookmarks() {
    try {
      const raw = localStorage.getItem("principia_bookmarks");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem("principia_bookmarks", JSON.stringify(this.bookmarks));
    } catch (e) {
      console.warn("Could not save bookmarks", e);
    }
  }

  toggleBookmark(id) {
    if (this.bookmarks.includes(id)) {
      this.bookmarks = this.bookmarks.filter(b => b !== id);
    } else {
      this.bookmarks.push(id);
    }
    this.saveBookmarks();
    this.renderDiscoverGrid();
    if (this.currentConcept && this.currentConcept.id === id) {
      this.updateModalBookmarkButton();
    }
  }

  initDOM() {
    // Navigation tabs
    this.navBtns = document.querySelectorAll("[data-nav-tab]");
    this.tabSections = document.querySelectorAll(".tab-section");

    // Discover view elements
    this.categoryChips = document.querySelectorAll(".category-chip");
    this.searchInput = document.getElementById("global-search");
    this.conceptsGrid = document.getElementById("concepts-grid");
    this.conceptCountEl = document.getElementById("concept-count");

    // Modal elements
    this.modal = document.getElementById("concept-modal");
    this.modalCloseBtn = document.getElementById("modal-close-btn");
    this.modalContent = document.getElementById("modal-body");

    // Scientists view
    this.scientistsGrid = document.getElementById("scientists-grid");
    this.nobelSearchInput = document.getElementById("nobel-search-input");
    this.nobelSearchBtn = document.getElementById("nobel-search-btn");
    this.nobelCategorySelect = document.getElementById("nobel-category-select");
    this.liveNobelIndicator = document.getElementById("live-nobel-results");

    // Papers view
    this.paperSearchInput = document.getElementById("arxiv-search-input");
    this.paperSearchBtn = document.getElementById("arxiv-search-btn");
    this.paperChips = document.querySelectorAll(".paper-query-chip");
    this.papersGrid = document.getElementById("papers-grid");
    this.paperLoading = document.getElementById("papers-loading");

    // Timeline view
    this.timelineContainer = document.getElementById("timeline-container");

    // Quiz Challenge view
    this.quizContainer = document.getElementById("quiz-challenge-container");
    this.quizScoreBadge = document.getElementById("quiz-score-badge");
    this.quizRankTitle = document.getElementById("quiz-rank-title");
    this.quizStreak = document.getElementById("quiz-streak");

    // Theme toggle
    this.themeToggleBtn = document.getElementById("theme-toggle-btn");
  }

  initTheme() {
    const saved = localStorage.getItem("principia_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    this.updateThemeButton(saved);
  }

  updateThemeButton(theme) {
    if (!this.themeToggleBtn) return;
    this.themeToggleBtn.innerHTML = theme === "dark" 
      ? `<span>☀️</span> <span class="nav-text">Light</span>` 
      : `<span>🌙</span> <span class="nav-text">Dark</span>`;
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("principia_theme", next);
    this.updateThemeButton(next);
  }

  bindEvents() {
    // Nav tab clicks
    this.navBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.navTab;
        this.switchTab(tab);
      });
    });

    // Category filtering
    this.categoryChips.forEach(chip => {
      chip.addEventListener("click", () => {
        this.categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeCategory = chip.dataset.category;
        this.renderDiscoverGrid();
      });
    });

    // Global search input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderDiscoverGrid();
      });
    }

    // Modal close events
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener("click", () => this.closeModal());
    }
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal && !this.modal.classList.contains("hidden")) {
        this.closeModal();
      }
    });

    // Theme toggle
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Nobel API search
    if (this.nobelSearchBtn) {
      this.nobelSearchBtn.addEventListener("click", () => this.performNobelSearch());
    }
    if (this.nobelSearchInput) {
      this.nobelSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.performNobelSearch();
      });
    }

    // arXiv search
    if (this.paperSearchBtn) {
      this.paperSearchBtn.addEventListener("click", () => this.performArxivSearch());
    }
    if (this.paperSearchInput) {
      this.paperSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.performArxivSearch();
      });
    }
    this.paperChips.forEach(chip => {
      chip.addEventListener("click", () => {
        if (this.paperSearchInput) {
          this.paperSearchInput.value = chip.dataset.query;
          this.performArxivSearch();
        }
      });
    });

    // Hero quick actions
    const heroExploreBtn = document.getElementById("hero-explore-btn");
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener("click", () => {
        this.switchTab("discover");
        window.scrollTo({ top: 400, behavior: "smooth" });
      });
    }
    const heroQuizBtn = document.getElementById("hero-quiz-btn");
    if (heroQuizBtn) {
      heroQuizBtn.addEventListener("click", () => {
        this.switchTab("quiz");
      });
    }

    // Custom event when a quiz is answered
    window.addEventListener("principia-quiz-updated", () => {
      this.updateQuizBadgeInHeader();
      this.renderQuizChallengeView();
    });
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    this.navBtns.forEach(b => {
      b.classList.toggle("active", b.dataset.navTab === tabName);
    });
    this.tabSections.forEach(section => {
      const isTarget = section.id === `tab-${tabName}`;
      section.classList.toggle("hidden", !isTarget);
    });

    if (tabName === "scientists") this.renderScientistsView();
    if (tabName === "papers" && (!this.papersGrid.children.length)) this.performArxivSearch("Quantum Computing");
    if (tabName === "timeline") this.renderTimelineView();
    if (tabName === "quiz") this.renderQuizChallengeView();
  }

  render() {
    this.renderDiscoverGrid();
    this.renderScientistsView();
    this.renderTimelineView();
  }

  renderDiscoverGrid() {
    if (!this.conceptsGrid) return;

    let items = CONCEPTS_DATA;

    // Filter by category
    if (this.activeCategory !== "all") {
      if (this.activeCategory === "bookmarks") {
        items = items.filter(c => this.bookmarks.includes(c.id));
      } else {
        items = items.filter(c => c.category === this.activeCategory);
      }
    }

    // Search query filter
    if (this.searchQuery) {
      items = items.filter(c => {
        return (
          c.title.toLowerCase().includes(this.searchQuery) ||
          c.summary.toLowerCase().includes(this.searchQuery) ||
          c.keyFigures.some(f => f.toLowerCase().includes(this.searchQuery)) ||
          c.categoryLabel.toLowerCase().includes(this.searchQuery) ||
          c.dailyLife.points.some(p => p.toLowerCase().includes(this.searchQuery))
        );
      });
    }

    if (this.conceptCountEl) {
      this.conceptCountEl.textContent = `${items.length} Concept${items.length === 1 ? '' : 's'} Available`;
    }

    if (items.length === 0) {
      this.conceptsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No Concepts Found</h3>
          <p>Try searching for a different scientific term, equation, or category.</p>
        </div>
      `;
      return;
    }

    this.conceptsGrid.innerHTML = items.map(concept => {
      const isBookmarked = this.bookmarks.includes(concept.id);
      return `
        <article class="concept-card" data-concept-id="${concept.id}">
          <div class="card-top">
            <div class="card-tags">
              <span class="category-badge badge-${concept.category}">${escapeHtml(concept.categoryLabel)}</span>
              <span class="era-badge">${concept.year || concept.era}</span>
            </div>
            <button type="button" class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-bookmark-id="${concept.id}" title="Save Concept">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </div>

          <h3 class="concept-card-title">${escapeHtml(concept.title)}</h3>

          <div class="formula-preview">
            <div class="latex-formula" data-formula="${escapeHtml(concept.latex)}">
              \\(${concept.latex}\\)
            </div>
          </div>

          <p class="concept-card-desc">${escapeHtml(concept.summary)}</p>

          <div class="card-footer">
            <div class="card-meta">
              <span class="meta-label">Key Figures:</span>
              <span class="meta-value">${escapeHtml(concept.keyFigures.join(", "))}</span>
            </div>
            <button type="button" class="btn btn-primary open-concept-btn" data-open-id="${concept.id}">
              Explore & Quiz →
            </button>
          </div>
        </article>
      `;
    }).join("");

    // Attach card action listeners
    this.conceptsGrid.querySelectorAll(".open-concept-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openConceptModal(btn.dataset.openId);
      });
    });

    this.conceptsGrid.querySelectorAll(".bookmark-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleBookmark(btn.dataset.bookmarkId);
      });
    });

    this.typesetMath(this.conceptsGrid);
  }

  openConceptModal(conceptId) {
    const concept = CONCEPTS_DATA.find(c => c.id === conceptId);
    if (!concept || !this.modal) return;
    this.currentConcept = concept;

    const isBookmarked = this.bookmarks.includes(concept.id);

    this.modalContent.innerHTML = `
      <div class="modal-header-banner">
        <div class="modal-badges">
          <span class="category-badge badge-${concept.category}">${escapeHtml(concept.categoryLabel)}</span>
          <span class="era-badge">Discovered: ${concept.year} (${concept.era})</span>
          <span class="difficulty-badge">${concept.difficulty}</span>
        </div>
        <div class="modal-title-row">
          <h2>${escapeHtml(concept.title)}</h2>
          <button type="button" id="modal-bookmark-action" class="modal-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}">
            ${isBookmarked ? '★ Saved to Library' : '☆ Save Concept'}
          </button>
        </div>
        <div class="modal-key-figures">
          <strong>Key Pioneers:</strong> ${escapeHtml(concept.keyFigures.join(", "))}
        </div>
      </div>

      <!-- Main Equation Display -->
      <div class="modal-equation-showcase">
        <div class="showcase-label">Core Mathematical Expression</div>
        <div class="showcase-formula">
          \\[${concept.latex}\\]
        </div>
      </div>

      <!-- Multi-Tier Explanation Views -->
      <div class="explanation-tabs-bar">
        <button type="button" class="exp-tab-btn active" data-exp-tab="analogy">💡 Everyday Analogy</button>
        <button type="button" class="exp-tab-btn" data-exp-tab="rigor">📐 Mathematical Rigor</button>
        <button type="button" class="exp-tab-btn" data-exp-tab="dailylife">🌍 Real-World Impact</button>
        <button type="button" class="exp-tab-btn" data-exp-tab="source">📄 Verified Paper & Source</button>
        <button type="button" class="exp-tab-btn" data-exp-tab="quiz">🧠 Interactive Quiz</button>
      </div>

      <div class="explanation-content-area">
        <!-- Analogy Tab -->
        <div class="exp-panel" id="exp-panel-analogy">
          <div class="analogy-card">
            <h3>${escapeHtml(concept.analogy.title)}</h3>
            <p>${escapeHtml(concept.analogy.text)}</p>
          </div>
        </div>

        <!-- Mathematical Rigor Tab -->
        <div class="exp-panel hidden" id="exp-panel-rigor">
          <div class="rigor-card">
            <h3>${escapeHtml(concept.rigor.title)}</h3>
            <p>${concept.rigor.text}</p>
          </div>
        </div>

        <!-- Daily Life Applications Tab -->
        <div class="exp-panel hidden" id="exp-panel-dailylife">
          <div class="dailylife-card">
            <h3>${escapeHtml(concept.dailyLife.title)}</h3>
            <ul class="dailylife-list">
              ${concept.dailyLife.points.map(pt => `
                <li>${formatMarkdownBold(pt)}</li>
              `).join("")}
            </ul>
          </div>
        </div>

        <!-- Verified Source Tab -->
        <div class="exp-panel hidden" id="exp-panel-source">
          <div class="source-card">
            <div class="source-header">
              <span class="source-icon">📚</span>
              <div>
                <h4>Seminal Research Paper Citation</h4>
                <p class="source-status">Peer-reviewed & verified historical document</p>
              </div>
            </div>
            <div class="source-details">
              <p><strong>Title:</strong> ${escapeHtml(concept.source.title)}</p>
              <p><strong>Author(s):</strong> ${escapeHtml(concept.source.authors)}</p>
              <p><strong>Publication / Year:</strong> ${escapeHtml(concept.source.publisher)} (${concept.source.year})</p>
              <p><strong>DOI / Archive ID:</strong> <code>${escapeHtml(concept.source.doi)}</code></p>
            </div>
            <a href="${concept.source.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline source-link-btn">
              Open Original Paper / Archive Record ↗
            </a>
          </div>
        </div>

        <!-- Embedded Quiz Tab -->
        <div class="exp-panel hidden" id="exp-panel-quiz">
          <div id="modal-quiz-container"></div>
        </div>
      </div>
    `;

    // Hook up explanation tab buttons
    const tabBtns = this.modalContent.querySelectorAll(".exp-tab-btn");
    const tabPanels = this.modalContent.querySelectorAll(".exp-panel");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.dataset.expTab;

        tabPanels.forEach(panel => {
          panel.classList.toggle("hidden", panel.id !== `exp-panel-${target}`);
        });

        if (target === "quiz") {
          const quizBox = document.getElementById("modal-quiz-container");
          this.quizEngine.renderConceptQuiz(quizBox, concept);
        }
      });
    });

    // Bookmark action inside modal
    const modalBmBtn = document.getElementById("modal-bookmark-action");
    if (modalBmBtn) {
      modalBmBtn.addEventListener("click", () => {
        this.toggleBookmark(concept.id);
      });
    }

    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.typesetMath(this.modalContent);
  }

  updateModalBookmarkButton() {
    const modalBmBtn = document.getElementById("modal-bookmark-action");
    if (!modalBmBtn || !this.currentConcept) return;
    const isBookmarked = this.bookmarks.includes(this.currentConcept.id);
    modalBmBtn.className = `modal-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`;
    modalBmBtn.textContent = isBookmarked ? '★ Saved to Library' : '☆ Save Concept';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add("hidden");
    document.body.style.overflow = "";
    this.currentConcept = null;
  }

  renderScientistsView() {
    if (!this.scientistsGrid) return;

    this.scientistsGrid.innerHTML = SCIENTISTS_DATA.map(scientist => {
      return `
        <article class="scientist-card">
          <div class="scientist-header">
            <div class="scientist-avatar-badge">${scientist.name.charAt(0)}</div>
            <div>
              <h3 class="scientist-name">${escapeHtml(scientist.name)}</h3>
              <div class="scientist-title">${escapeHtml(scientist.title)}</div>
              <div class="scientist-years">${scientist.birthYear} – ${scientist.deathYear || "Present"}</div>
            </div>
          </div>

          <div class="scientist-award">
            <span class="award-icon">🎖️</span>
            <div>
              <strong>${escapeHtml(scientist.award)}</strong>
              <p class="award-citation">${escapeHtml(scientist.awardCitation)}</p>
            </div>
          </div>

          <div class="scientist-achievements">
            <h4>Key Breakthroughs:</h4>
            <ul>
              ${scientist.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join("")}
            </ul>
          </div>

          <div class="scientist-papers">
            <h4>Seminal Papers:</h4>
            <ul>
              ${scientist.seminalPapers.map(p => `
                <li>
                  <span class="paper-year">(${p.year})</span>
                  <em>${escapeHtml(p.title)}</em> — <span class="paper-topic">${escapeHtml(p.topic)}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <blockquote class="scientist-quote">
            "${escapeHtml(scientist.quote)}"
          </blockquote>
        </article>
      `;
    }).join("");
  }

  async performNobelSearch() {
    const query = this.nobelSearchInput ? this.nobelSearchInput.value.trim() : "";
    const category = this.nobelCategorySelect ? this.nobelCategorySelect.value : "";

    if (this.liveNobelIndicator) {
      this.liveNobelIndicator.classList.remove("hidden");
      this.liveNobelIndicator.innerHTML = `<div class="spinner"></div> Searching Nobel Prize Foundation Official Records...`;
    }

    const liveData = await fetchNobelLaureates(query, category, 12);

    if (this.liveNobelIndicator) {
      if (!liveData || liveData.length === 0) {
        this.liveNobelIndicator.innerHTML = `
          <div class="api-notice">
            <span>ℹ️</span> No new records found for "${escapeHtml(query)}". Showing curated laureate collection.
          </div>
        `;
        return;
      }

      this.liveNobelIndicator.innerHTML = `
        <div class="api-success-banner">
          ✓ Loaded ${liveData.length} Laureates directly from <strong>api.nobelprize.org</strong>
        </div>
      `;
    }

    if (liveData && liveData.length > 0) {
      this.scientistsGrid.innerHTML = liveData.map(l => `
        <article class="scientist-card live-laureate-card">
          <div class="scientist-header">
            <div class="scientist-avatar-badge">N</div>
            <div>
              <h3 class="scientist-name">${escapeHtml(l.name)}</h3>
              <div class="scientist-title">${escapeHtml(l.category)} (${l.year})</div>
              <div class="scientist-years">${escapeHtml(l.lifespan)}</div>
            </div>
          </div>

          <div class="scientist-award">
            <span class="award-icon">🏅</span>
            <div>
              <strong>Official Motivation:</strong>
              <p class="award-citation">"${escapeHtml(l.citation)}"</p>
            </div>
          </div>

          ${l.affiliations ? `
            <div class="scientist-affiliations">
              <strong>Institution / Affiliation:</strong> ${escapeHtml(l.affiliations)}
            </div>
          ` : ""}

          ${l.wikiUrl ? `
            <div class="scientist-footer-link">
              <a href="${l.wikiUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                Wikipedia Biographical Entry ↗
              </a>
            </div>
          ` : ""}
        </article>
      `).join("");
    }
  }

  async performArxivSearch(customQuery = null) {
    const query = customQuery || (this.paperSearchInput ? this.paperSearchInput.value.trim() : "Calculus");
    if (!query) return;

    if (this.paperLoading) this.paperLoading.classList.remove("hidden");
    if (this.papersGrid) this.papersGrid.innerHTML = "";

    const papers = await searchArxivPapers(query, 6);

    if (this.paperLoading) this.paperLoading.classList.add("hidden");

    if (!papers || papers.length === 0) {
      this.papersGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📄</div>
          <h3>No Papers Found</h3>
          <p>Try searching for mathematics, quantum mechanics, relativity, or cryptography.</p>
        </div>
      `;
      return;
    }

    this.papersGrid.innerHTML = papers.map(paper => `
      <article class="paper-card">
        <div class="paper-card-header">
          <span class="paper-id-tag">arXiv e-Print</span>
          <span class="paper-date">${escapeHtml(paper.published)}</span>
        </div>
        <h3 class="paper-title">${escapeHtml(paper.title)}</h3>
        <div class="paper-authors"><strong>Authors:</strong> ${escapeHtml(paper.authors)}</div>
        <p class="paper-abstract">${escapeHtml(paper.summary.length > 280 ? paper.summary.substring(0, 280) + '...' : paper.summary)}</p>
        <div class="paper-actions">
          <a href="${paper.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Abstract ↗</a>
          <a href="${paper.pdfLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Download PDF ↗</a>
        </div>
      </article>
    `).join("");
  }

  renderTimelineView() {
    if (!this.timelineContainer) return;

    this.timelineContainer.innerHTML = `
      <div class="timeline-track">
        ${TIMELINE_EVENTS.map((evt, idx) => `
          <div class="timeline-node ${idx % 2 === 0 ? 'node-left' : 'node-right'}">
            <div class="timeline-dot"></div>
            <div class="timeline-content-box">
              <span class="timeline-year">${escapeHtml(evt.year)}</span>
              <span class="category-badge badge-${evt.category}">${evt.category}</span>
              <h4 class="timeline-title">${escapeHtml(evt.title)}</h4>
              <p class="timeline-desc">${escapeHtml(evt.desc)}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderQuizChallengeView() {
    if (!this.quizContainer) return;

    const rankInfo = this.quizEngine.getRankTitle();
    if (this.quizScoreBadge) this.quizScoreBadge.textContent = `${this.quizEngine.progress.totalScore} pts`;
    if (this.quizRankTitle) this.quizRankTitle.textContent = `${rankInfo.badge} ${rankInfo.title}`;
    if (this.quizStreak) this.quizStreak.textContent = `${this.quizEngine.progress.streak} in a row`;

    this.quizContainer.innerHTML = `
      <div class="quiz-challenge-grid">
        ${CONCEPTS_DATA.map(concept => {
          const totalQ = concept.quiz.length;
          const solvedCount = concept.quiz.filter((q, idx) => this.quizEngine.isQuestionSolved(concept.id, idx)).length;
          const isComplete = solvedCount === totalQ && totalQ > 0;

          return `
            <div class="quiz-topic-card ${isComplete ? 'is-complete' : ''}">
              <div class="quiz-topic-header">
                <span class="category-badge badge-${concept.category}">${escapeHtml(concept.categoryLabel)}</span>
                <span class="quiz-progress-pill">${solvedCount}/${totalQ} Solved</span>
              </div>
              <h4>${escapeHtml(concept.title)}</h4>
              <p>${escapeHtml(concept.summary.substring(0, 110))}...</p>
              <button type="button" class="btn btn-outline btn-sm take-quiz-btn" data-concept-id="${concept.id}">
                ${isComplete ? 'Review Quiz ✓' : 'Start Micro-Quiz →'}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    `;

    this.quizContainer.querySelectorAll(".take-quiz-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openConceptModal(btn.dataset.conceptId);
        // Switch modal directly to quiz tab
        setTimeout(() => {
          const quizTabBtn = document.querySelector(".exp-tab-btn[data-exp-tab='quiz']");
          if (quizTabBtn) quizTabBtn.click();
        }, 50);
      });
    });
  }

  updateQuizBadgeInHeader() {
    const headerQuizBadge = document.getElementById("header-quiz-score");
    if (headerQuizBadge) {
      const rank = this.quizEngine.getRankTitle();
      headerQuizBadge.innerHTML = `${rank.badge} <strong>${this.quizEngine.progress.totalScore}</strong> pts`;
    }
  }

  typesetMath(container) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX renderMathInElement error:", err);
      }
    }
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

function formatMarkdownBold(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

// Initialize on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  window.principiaApp = new PrincipiaApp();
});
