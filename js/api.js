/**
 * Principia: External API Integration
 * Connects to the official Nobel Prize API and arXiv Paper Search API.
 */

/**
 * Fetch Nobel Prize Laureates from api.nobelprize.org
 * @param {string} search - Search query for laureate name
 * @param {string} category - Category filter (e.g., phy, che, med)
 * @param {number} limit - Maximum number of results
 */
export async function fetchNobelLaureates(search = "", category = "", limit = 15) {
  try {
    const url = new URL("https://api.nobelprize.org/2.1/laureates");
    url.searchParams.set("limit", limit.toString());
    
    if (search.trim()) {
      url.searchParams.set("name", search.trim());
    }
    if (category) {
      url.searchParams.set("nobelPrizeCategory", category);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Nobel API returned HTTP status ${response.status}`);
    }

    const data = await response.json();
    const laureates = data.laureates || [];

    return laureates.map(item => {
      const knownName = item.knownName?.en || item.fullName?.en || item.orgName?.en || "Unknown Laureate";
      const prize = item.nobelPrizes?.[0] || {};
      const awardYear = prize.awardYear || "N/A";
      const categoryName = prize.categoryFullName?.en || prize.category?.en || "Nobel Prize";
      const citation = prize.motivation?.en || "For outstanding contributions to science.";
      const birth = item.birth?.date ? item.birth.date.substring(0, 4) : "";
      const death = item.death?.date ? item.death.date.substring(0, 4) : "";
      const affiliations = prize.affiliations?.map(a => a.name?.en).filter(Boolean).join(", ") || "";
      const wikipedia = item.wikipedia?.english || "";

      return {
        id: item.id || Math.random().toString(),
        name: knownName,
        year: awardYear,
        category: categoryName,
        citation: citation,
        lifespan: birth ? `${birth} - ${death || "Present"}` : "",
        affiliations: affiliations,
        wikiUrl: wikipedia
      };
    });
  } catch (error) {
    console.warn("Could not fetch from live Nobel Prize API:", error);
    return null; // Signals controller to fallback to curated data
  }
}

/**
 * Search academic research papers via arXiv API
 * @param {string} query - Search query
 * @param {number} maxResults - Max number of papers to retrieve
 */
export async function searchArxivPapers(query, maxResults = 8) {
  if (!query || !query.trim()) return [];

  const sanitized = query.trim().replace(/[^\w\s-]/g, "");
  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(sanitized)}&start=0&max_results=${maxResults}&sortBy=relevance&sortOrder=descending`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`arXiv API returned status ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const entries = Array.from(xmlDoc.querySelectorAll("entry"));

    return entries.map(entry => {
      const title = entry.querySelector("title")?.textContent?.replace(/\s+/g, " ").trim() || "Untitled Paper";
      const summary = entry.querySelector("summary")?.textContent?.replace(/\s+/g, " ").trim() || "No abstract available.";
      const published = entry.querySelector("published")?.textContent?.substring(0, 10) || "";
      const id = entry.querySelector("id")?.textContent || "";
      const pdfLink = Array.from(entry.querySelectorAll("link")).find(l => l.getAttribute("title") === "pdf")?.getAttribute("href") || id;
      const authors = Array.from(entry.querySelectorAll("author name")).map(a => a.textContent.trim()).slice(0, 4).join(", ");

      return {
        id,
        title,
        authors: authors || "Unknown Author",
        summary,
        published,
        link: id,
        pdfLink
      };
    });
  } catch (error) {
    console.warn("Could not fetch directly from arXiv API (possibly CORS restriction):", error);
    // Provide intelligent fallback research papers based on query topic
    return getCuratedFallbackPapers(sanitized);
  }
}

/**
 * Curated offline fallback papers when network or CORS restricts live arXiv calls
 */
function getCuratedFallbackPapers(query) {
  const q = query.toLowerCase();
  const library = [
    {
      id: "arxiv:2303.08774",
      title: "GPT-4 Technical Report",
      authors: "OpenAI et al.",
      published: "2023-03-15",
      summary: "We report the development of GPT-4, a large-scale, multimodal model capable of accepting image and text inputs and emitting text outputs. We evaluate competitive mathematical reasoning and benchmarks.",
      link: "https://arxiv.org/abs/2303.08774",
      pdfLink: "https://arxiv.org/pdf/2303.08774.pdf"
    },
    {
      id: "arxiv:1706.03762",
      title: "Attention Is All You Need",
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, et al.",
      published: "2017-06-12",
      summary: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, based solely on attention mechanisms, dispensing with recurrence entirely.",
      link: "https://arxiv.org/abs/1706.03762",
      pdfLink: "https://arxiv.org/pdf/1706.03762.pdf"
    },
    {
      id: "arxiv:math/0211159",
      title: "The Entropy Formula for the Ricci Flow and Its Geometric Applications",
      authors: "Grisha Perelman",
      published: "2002-11-11",
      summary: "We present a monotonic functional for the Ricci flow on Riemannian manifolds, leading to a proof of Thurston's Geometrization Conjecture and the 100-year-old Poincaré Conjecture in 3D topology.",
      link: "https://arxiv.org/abs/math/0211159",
      pdfLink: "https://arxiv.org/pdf/math/0211159.pdf"
    },
    {
      id: "arxiv:1910.11333",
      title: "Quantum Computational Advantage Using a Programmable Superconducting Processor",
      authors: "Frank Arute, Kunal Arya, John M. Martinis, et al. (Google Quantum AI)",
      published: "2019-10-23",
      summary: "The promise of quantum computers is that certain computational tasks might be executed exponentially faster on a quantum processor than on a classical processor. We demonstrate computational advantage using 53 qubits.",
      link: "https://arxiv.org/abs/1910.11333",
      pdfLink: "https://arxiv.org/pdf/1910.11333.pdf"
    },
    {
      id: "arxiv:1201.0863",
      title: "Fractional Calculus: Basic Problems in Continuum and Statistical Mechanics",
      authors: "Francesco Mainardi",
      published: "2012-01-04",
      summary: "A foundational review of applications of fractional calculus in continuum mechanics and mathematical modelling of Brownian motion, diffusion, and wave propagation.",
      link: "https://arxiv.org/abs/1201.0863",
      pdfLink: "https://arxiv.org/pdf/1201.0863.pdf"
    }
  ];

  const filtered = library.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q));
  return filtered.length > 0 ? filtered : library;
}
