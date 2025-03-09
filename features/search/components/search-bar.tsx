"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormValues {
  query: string;
}

interface SearchBarProps {
  initialQuery?: string;
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormValues>({
    defaultValues: {
      query: initialQuery,
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    const searchTerm = data.query.trim();
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for news..."
          className="pl-10 pr-12"
          {...register("query")}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
          disabled={isSubmitting}
        >
          Search
        </Button>
      </div>
    </form>
  );
}
