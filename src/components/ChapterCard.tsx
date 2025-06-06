// src/components/ChapterCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import type { Chapter } from "@/types";
import { Badge } from "@/components/ui/badge";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Card className="transition-all duration-300 animate-in fade-in zoom-in">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold">{chapter.name}</h2>
          {chapter.isWeakChapter && (
            <Badge variant="destructive" className="text-xs">Weak</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Subject: {chapter.subject}</p>
        <p className="text-sm text-muted-foreground">Status: {chapter.status}</p>
        <p className="text-sm text-muted-foreground">Class: {chapter.class}</p>
        <p className="text-sm text-muted-foreground">Unit: {chapter.unit}</p>
      </CardContent>
    </Card>
  );
}
