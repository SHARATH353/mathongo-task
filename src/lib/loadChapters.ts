import { Chapter } from "@/types";

type RawChapter = {
  subject: string;
  chapter: string;
  status: string;
  class: string;
  unit: string;
  isWeakChapter: boolean;
};

export async function loadChaptersData(): Promise<Chapter[]> {
  const res = await fetch("/data/chapters.json");
  if (!res.ok) {
    throw new Error("Failed to load chapters data");
  }

  const rawChapters: RawChapter[] = await res.json();

  const chapters: Chapter[] = rawChapters.map((item, index) => ({
    id: String(index),
    name: item.chapter,
    subject: item.subject,
    status: item.status.toLowerCase() === "completed" ? "completed" : "incomplete",
    class: item.class,
    unit: item.unit,
    isWeakChapter: item.isWeakChapter,
  }));

  return chapters;
}
