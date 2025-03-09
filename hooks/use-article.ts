"use client";

import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "@/lib/api";

export function useArticle(id: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
