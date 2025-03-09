"use client";

import { NewsGrid } from "@/features/news/components/news-grid";
import { SearchBar } from "@/features/search/components/search-bar";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Today's Headlines</h1>
      <div className="mb-6">
        <SearchBar />
      </div>
      <NewsGrid />
    </div>
  );
}
