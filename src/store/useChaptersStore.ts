import { create } from "zustand";
import { Chapter } from "@/types"; // ✅ not RawChapter

interface ChaptersState {
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
}

export const useChaptersStore = create<ChaptersState>((set) => ({
  chapters: [],
  setChapters: (chapters) => set({ chapters }),
}));
