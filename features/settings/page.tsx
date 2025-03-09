"use client";

import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNewsContext } from "@/context/news-context";
import { sources, categories } from "@/lib/constants";

interface SettingsFormValues {
  sources: string[];
  categories: string[];
}

export default function SettingsPage() {
  const { preferences, updatePreferences } = useNewsContext();
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SettingsFormValues>({
    defaultValues: {
      sources: preferences.sources,
      categories: preferences.categories,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    updatePreferences(data);
    toast({
      title: "Preferences saved",
      description: "Your news feed preferences have been updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Personalize Your News</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="sources" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="sources">News Sources</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Preferred News Sources</CardTitle>
                <CardDescription>
                  Choose which news sources you want to see in your personalized
                  feed
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sources.map((source) => (
                  <div key={source.id} className="flex items-center space-x-2">
                    <Controller
                      name="sources"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id={`source-${source.id}`}
                          checked={field.value.includes(source.id)}
                          onCheckedChange={(checked) => {
                            const updatedSources = checked
                              ? [...field.value, source.id]
                              : field.value.filter((id) => id !== source.id);
                            field.onChange(updatedSources);
                          }}
                        />
                      )}
                    />
                    <Label htmlFor={`source-${source.id}`}>{source.name}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Preferred Categories</CardTitle>
                <CardDescription>
                  Choose which news categories you want to see in your
                  personalized feed
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, idx) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Controller
                      name="categories"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          disabled={idx === 0}
                          id={`category-${category.id}`}
                          checked={field.value.includes(category.id)}
                          onCheckedChange={(checked) => {
                            const updatedCategories = checked
                              ? [...field.value, category.id]
                              : field.value.filter((id) => id !== category.id);
                            field.onChange(updatedCategories);
                          }}
                        />
                      )}
                    />
                    <Label htmlFor={`category-${category.id}`}>
                      {category.name}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={!isDirty}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
