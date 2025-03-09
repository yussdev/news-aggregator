"use client";

import { useNews } from "@/hooks/use-news";
import { NewsCard } from "@/features/news/components/news-card";
import { NewsGridSkeleton } from "@/features/news/components/news-grid-skeleton";

export function NewsGrid() {
  const { data: articles, isLoading, isError } = useNews();

  if (isLoading) {
    return <NewsGridSkeleton />;
  }

  if (isError || !articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No articles found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your preferences or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
