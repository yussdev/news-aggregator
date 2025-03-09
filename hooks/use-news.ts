"use client";

import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/api";
import { useNewsContext } from "@/context/news-context";

export function useNews() {
  const { preferences } = useNewsContext();

  return useQuery({
    queryKey: ["news", preferences],
    queryFn: () => getNews(preferences),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
