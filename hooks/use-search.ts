"use client";

import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "@/lib/api";

export function useSearch(
  query: string,
  category?: string,
  source?: string,
  date?: string
) {
  return useQuery({
    queryKey: ["search", query, category, source, date],
    queryFn: () => searchArticles(query, category, source, date),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
