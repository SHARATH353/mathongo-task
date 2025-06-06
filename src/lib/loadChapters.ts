// src/lib/loadChapters.ts
import { Chapter } from "@/types";

export async function loadChaptersData(): Promise<Chapter[]> {
  const res = await fetch("/data/chapters.json");

  if (!res.ok) {
    throw new Error("Failed to load chapters data");
  }

  const rawChapters: any[] = await res.json();

  return rawChapters.map((item, index) => ({
    id: String(index),
    name: item.chapter,
    subject: item.subject,
    status: item.status === "Completed" ? "completed" : "incomplete",
    isWeakChapter: item.isWeakChapter,
    class: item.class,
    unit: item.unit,
  }));
}
