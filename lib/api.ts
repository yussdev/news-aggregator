import type { Article } from "@/types";

// API keys would normally be stored in environment variables
const NEWS_API_KEY =
  process.env.NEXT_PUBLIC_NEWS_API_KEY || "7d0e4c9494374e7ca378eed0a137597e";
const GUARDIAN_API_KEY =
  process.env.NEXT_PUBLIC_GUARDIAN_API_KEY ||
  "2377d327-0f16-42a6-abfc-43d771e53f7f";
const NYT_API_KEY =
  process.env.NEXT_PUBLIC_NYT_API_KEY || "7d0e4c9494374e7ca378eed0a137597e";

// Helper to format articles from different sources into a common format
function formatArticle(article: any, source: string): Article {
  let formattedArticle: Article = {
    id: "",
    title: "",
    description: "",
    content: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    source: source,
    author: "",
  };

  switch (source) {
    case "NewsAPI":
      formattedArticle = {
        id: `newsapi-${article.source.id || ""}-${Math.random()}-${Date.now()}`,
        title: article.title || "",
        description: article.description || "",
        content: article.content || "",
        url: article.url || "",
        urlToImage: article.urlToImage || "",
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: "NewsAPI",
        author: article.author || "",
      };
      break;
    case "Guardian":
      formattedArticle = {
        id: `guardian-${article.id || ""}`,
        title: article.webTitle || "",
        description: article.fields?.trailText || "",
        content: article.fields?.bodyText || "",
        url: article.webUrl || "",
        urlToImage: article.fields?.thumbnail || "",
        publishedAt: article.webPublicationDate || new Date().toISOString(),
        source: "The Guardian",
        author: article.fields?.byline || "",
      };
      break;
    case "NYTimes":
      formattedArticle = {
        id: `nyt-${article.uri?.split("/").pop() || ""}`,
        title: article.headline?.main || "",
        description: article.abstract || "",
        content: article.lead_paragraph || "",
        url: article.web_url || "",
        urlToImage:
          article.multimedia?.length > 0
            ? `https://www.nytimes.com/${article.multimedia[0].url}`
            : "",
        publishedAt: article.pub_date || new Date().toISOString(),
        source: "New York Times",
        author: article.byline?.original?.replace("By ", "") || "",
      };
      break;
  }

  return formattedArticle;
}

// Fetch articles from all sources based on preferences
export async function getNews(preferences: any): Promise<Article[]> {
  const sourcesToFetch = preferences.sources || [
    "newsapi",
    "guardian",
    "nytimes",
  ];
  const fetchPromises = [];

  // Create fetch promises for each selected source
  if (sourcesToFetch.includes("newsapi")) {
    fetchPromises.push(fetchFromSource("NewsAPI", preferences));
  }

  if (sourcesToFetch.includes("guardian")) {
    fetchPromises.push(fetchFromSource("Guardian", preferences));
  }

  if (sourcesToFetch.includes("nytimes")) {
    fetchPromises.push(fetchFromSource("NYTimes", preferences));
  }

  // Fetch from all selected sources in parallel
  const results = await Promise.all(fetchPromises);

  // Combine and sort by date (newest first)
  return results
    .flat()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

// Generic function to fetch from a specific source
async function fetchFromSource(
  source: string,
  preferences: any
): Promise<Article[]> {
  try {
    let url = "";
    let apiKey = "";

    switch (source) {
      case "NewsAPI":
        apiKey = NEWS_API_KEY;
        const categoryParam = preferences.categories.includes("general")
          ? ""
          : `&category=${preferences.categories[0]}`;
        url = `https://newsapi.org/v2/top-headlines?country=us${categoryParam}&apiKey=${apiKey}`;
        break;

      case "Guardian":
        apiKey = GUARDIAN_API_KEY;
        const sectionParam = preferences.categories.includes("general")
          ? ""
          : `&section=${preferences.categories.join("|")}`;
        url = `https://content.guardianapis.com/search?show-fields=byline,trailText,bodyText,thumbnail${sectionParam}&api-key=${apiKey}`;
        break;

      case "NYTimes":
        apiKey = NYT_API_KEY;
        const fqParam = preferences.categories.includes("general")
          ? ""
          : `&fq=section_name:(${preferences.categories.join(" ")})`;
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}${fqParam}`;
        break;

      default:
        return [];
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `${source} API responded with status: ${response.status}`
      );
    }

    const data = await response.json();

    // Extract and format articles based on source
    if (source === "NewsAPI") {
      return data.articles.map((article: any) =>
        formatArticle(article, source)
      );
    } else if (source === "Guardian") {
      return data.response.results.map((article: any) =>
        formatArticle(article, source)
      );
    } else if (source === "NYTimes") {
      return data.response.docs.map((article: any) =>
        formatArticle(article, source)
      );
    }

    return [];
  } catch (error) {
    console.error(`Error fetching from ${source}:`, error);
    return [];
  }
}

// Search articles across all sources
export async function searchArticles(
  query: string,
  category?: string,
  source?: string,
  date?: string
): Promise<Article[]> {
  // Create preferences object based on filters
  const preferences = {
    sources: source ? [source] : ["newsapi", "guardian", "nytimes"],
    categories: category ? [category] : ["general", "technology", "business"],
  };

  // Get articles from selected sources
  let articles = await getNews(preferences);

  // Filter by query (case insensitive)
  const queryLower = query.toLowerCase();
  articles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(queryLower) ||
      article.description.toLowerCase().includes(queryLower) ||
      article.content.toLowerCase().includes(queryLower)
  );

  // Apply date filter if provided
  if (date && date !== "all") {
    const now = new Date();
    let startDate: Date;

    switch (date) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "week":
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "year":
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }

    articles = articles.filter(
      (article) => new Date(article.publishedAt) >= startDate
    );
  }

  return articles;
}

// Get a single article by ID
export async function getArticleById(id: string): Promise<Article | null> {
  if (!id) return null;

  // In a real app, you would have a dedicated endpoint for fetching a single article
  // For this example, we fetch all articles and find the matching one
  const allArticles = await getNews({
    sources: ["newsapi", "guardian", "nytimes"],
    categories: ["general", "technology", "business"],
  });

  return allArticles.find((a) => a.id === id) || null;
}
