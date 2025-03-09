"use client";

import { useSearchParams } from "next/navigation";
import { SearchResults } from "@/features/search/components/search-results";
import { SearchBar } from "@/features/search/components/search-bar";
import { FilterBar } from "@/features/search/components/filter-bar";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const source = searchParams.get("source") || "";
  const date = searchParams.get("date") || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results</h1>
      <div className="mb-6">
        <SearchBar initialQuery={query} />
      </div>
      <div className="mb-8">
        <FilterBar
          initialCategory={category}
          initialSource={source}
          initialDate={date}
        />
      </div>
      <SearchResults
        query={query}
        category={category}
        source={source}
        date={date}
      />
    </div>
  );
}
