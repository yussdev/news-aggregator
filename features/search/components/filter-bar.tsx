"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { sources, categories, dateRanges } from "@/lib/constants";

interface FilterFormValues {
  category: string;
  source: string;
  date: string;
}

interface FilterBarProps {
  initialCategory?: string;
  initialSource?: string;
  initialDate?: string;
}

export function FilterBar({
  initialCategory = "",
  initialSource = "",
  initialDate = "",
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FilterFormValues>({
    defaultValues: {
      category: initialCategory,
      source: initialSource,
      date: initialDate,
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove params based on form values
    Object.entries(data).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const resetFilters = () => {
    reset({
      category: "",
      source: "",
      date: "",
    });
    const params = new URLSearchParams(searchParams.toString());
    ["category", "source", "date"].forEach((key) => params.delete(key));
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const activeFiltersCount = [
    initialCategory,
    initialSource,
    initialDate,
  ].filter(Boolean).length;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {activeFiltersCount > 0 ? (
          <span>
            {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
            applied
          </span>
        ) : (
          <span>No filters applied</span>
        )}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Filter News</SheetTitle>
              <SheetDescription>
                Narrow down your news results with these filters
              </SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              {[
                {
                  name: "category",
                  label: "Category",
                  options: categories,
                  placeholder: "All Categories",
                },
                {
                  name: "source",
                  label: "Source",
                  options: sources,
                  placeholder: "All Sources",
                },
                {
                  name: "date",
                  label: "Date",
                  options: dateRanges,
                  placeholder: "Any Time",
                },
              ].map((filter) => (
                <div key={filter.name} className="space-y-2">
                  <label className="text-sm font-medium">{filter.label}</label>
                  <Controller
                    name={filter.name as keyof FilterFormValues}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={filter.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            {filter.placeholder}
                          </SelectItem>
                          {filter.options.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="flex-row gap-2 sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                className="flex-1"
              >
                Reset
              </Button>
              <Button type="submit" className="flex-1" disabled={!isDirty}>
                Apply Filters
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
