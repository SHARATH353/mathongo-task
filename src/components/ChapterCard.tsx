"use client";

import { Chapter } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  BookOpen,
  Flask,
  Function as MathIcon,
  Warning,
  CheckCircle,
  Clock,
} from "phosphor-react";

const subjectIcons: Record<string, JSX.Element> = {
  Physics: <BookOpen className="w-5 h-5 text-orange-500" />,
  Chemistry: <Flask className="w-5 h-5 text-green-500" />,
  Mathematics: <MathIcon className="w-5 h-5 text-blue-500" />,
};

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount || {}).reduce(
    (acc, val) => acc + val,
    0
  );

  const statusColor =
    chapter.status === "completed"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";

  return (
    <Card>
      <CardContent className="p-4">
        {/* Chapter Name + Icon */}
        <div className="flex items-center gap-2 mb-2">
          {subjectIcons[chapter.subject] ?? <BookOpen className="w-5 h-5 text-muted-foreground" />}
          <h2 className="text-lg font-semibold">{chapter.name}</h2>
        </div>

        {/* Meta Info: Class, Unit, Total Qs */}
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span>📘 {chapter.class}</span>
          <span>📦 {chapter.unit}</span>
          <span>❓ {totalQuestions} Questions</span>
        </div>

        {/* Status + Weak Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={statusColor}>
            {chapter.status === "completed" ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 mr-1" />
                Not Started
              </>
            )}
          </Badge>

          {chapter.isWeakChapter && (
            <Badge variant="destructive">
              <Warning className="w-4 h-4 mr-1" />
              Weak
            </Badge>
          )}
        </div>

        {/* Year-wise Qs */}
        <div className="border-t pt-3 mt-3 text-xs text-muted-foreground grid grid-cols-3 gap-2">
          {Object.entries(chapter.yearWiseQuestionCount || {}).map(([year, count]) => (
            <div key={year} className="flex justify-between">
              <span>{year}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
