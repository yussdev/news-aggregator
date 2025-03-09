"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface NewsPreferences {
  sources: string[];
  categories: string[];
}

interface NewsContextType {
  preferences: NewsPreferences;
  updatePreferences: (newPreferences: NewsPreferences) => void;
}

const defaultPreferences: NewsPreferences = {
  sources: ["newsapi", "guardian", "nytimes"],
  categories: ["general", "technology", "business"],
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] =
    useState<NewsPreferences>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("newsPreferences");
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error("Failed to parse saved preferences:", error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: NewsPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("newsPreferences", JSON.stringify(newPreferences));
  };

  return (
    <NewsContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNewsContext() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
}
