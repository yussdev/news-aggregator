"use client";

import { useSearch } from "@/hooks/use-search";
import { NewsCard } from "@/features/news/components/news-card";
import { NewsGridSkeleton } from "@/features/news/components/news-grid-skeleton";

interface SearchResultsProps {
  query: string;
  category?: string;
  source?: string;
  date?: string;
}

export function SearchResults({
  query,
  category,
  source,
  date,
}: SearchResultsProps) {
  const {
    data: articles,
    isLoading,
    isError,
  } = useSearch(query, category, source, date);

  if (isLoading) {
    return <NewsGridSkeleton />;
  }

  if (isError || !articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No results found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      {Boolean(query) && (
        <p className="mb-6 text-muted-foreground">
          Found {articles.length} result{articles.length !== 1 ? "s" : ""} for "
          {query}"
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
