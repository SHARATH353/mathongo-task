import { create } from "zustand";
import { Chapter } from "@/types";

type Filters = {
  subject: string;
  class: string[];
  unit: string[];
  status: "all" | "not_started";
  weakOnly: boolean;
  sortBy: "name" | "status";
  search: string;
};

interface ChaptersState {
  allChapters: Chapter[];
  filteredChapters: Chapter[];
  selectedSubject: string;
  filters: Filters;
  setChapters: (chapters: Chapter[]) => void;
  setFilters: (updates: Partial<Filters>) => void;
}

const defaultFilters: Filters = {
  subject: "Physics",
  class: [],
  unit: [],
  status: "all",
  weakOnly: false,
  sortBy: "name",
  search: "",
};

export const useChaptersStore = create<ChaptersState>((set, get) => ({
  allChapters: [],
  filteredChapters: [],
  selectedSubject: defaultFilters.subject,
  filters: defaultFilters,

  setChapters: (chapters) => {
    set({ allChapters: chapters });
    // Filter immediately when data is loaded
    const { filters } = get();
    set({ filteredChapters: applyFilters(chapters, filters) });
  },

  setFilters: (updates) => {
    const current = get().filters;
    const newFilters = { ...current, ...updates };

    const subject = updates.subject || current.subject;
    const allChapters = get().allChapters;

    const filtered = applyFilters(allChapters, newFilters);

    set({
      filters: newFilters,
      selectedSubject: subject,
      filteredChapters: filtered,
    });
  },
}));

function applyFilters(chapters: Chapter[], filters: Filters): Chapter[] {
  return chapters
    .filter((c) => c.subject === filters.subject)
    .filter((c) =>
      filters.class.length > 0 ? filters.class.includes(c.class) : true
    )
    .filter((c) =>
      filters.unit.length > 0 ? filters.unit.includes(c.unit) : true
    )
    .filter((c) =>
      filters.status === "not_started"
        ? c.status.toLowerCase() === "not started"
        : true
    )
    .filter((c) => (filters.weakOnly ? c.isWeakChapter : true))
    .filter((c) =>
      c.name.toLowerCase().includes(filters.search.toLowerCase())
    )
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.status.localeCompare(b.status);
      }
    });
}
