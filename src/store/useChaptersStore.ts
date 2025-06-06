import { create } from "zustand";

export type Chapter = {
  id: number;
  name: string;
  subject: string;
  status: string;
};

export type Filter = {
  subject: string | null;
  status: string | null;
};

type Store = {
  chapters: Chapter[];
  setChapters: (data: Chapter[]) => void;

  filter: Filter;
  setFilter: (filter: Partial<Filter>) => void;
};

export const useChaptersStore = create<Store>((set) => ({
  chapters: [],
  setChapters: (data) => set({ chapters: data }),

  filter: { subject: null, status: null },
  setFilter: (partialFilter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...partialFilter,
      },
    })),
}));
