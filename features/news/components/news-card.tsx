import Image from "next/image";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      {article.urlToImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{article.source}</Badge>
          </div>
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <h3 className="font-bold line-clamp-2">{article.title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {article.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
        <time dateTime={article.publishedAt}>
          {format(new Date(article.publishedAt), "MMM d, yyyy")}
        </time>
        {article.author && <span>By {article.author}</span>}
      </CardFooter>
    </Card>
  );
}
