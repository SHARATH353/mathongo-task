import { Chapter } from "@/types";

export async function loadChaptersData(): Promise<Chapter[]> {
  const res = await fetch("/data/chapters.json");

  if (!res.ok) {
    throw new Error("Failed to load chapters data");
  }

  const raw = await res.json();

  const chapters: Chapter[] = raw.map((item: any, idx: number) => ({
    id: String(idx),
    name: item.chapter,
    subject: item.subject,
    class: item.class,
    unit: item.unit,
    isWeakChapter: Boolean(item.isWeakChapter),
    status: item.status?.toLowerCase() === "completed" ? "completed" : "incomplete",
  }));

  return chapters;
}
