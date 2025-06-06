export type Chapter = {
  id: string;
  name: string;
  subject: string;
  status: "completed" | "incomplete";
  class?: string;
  unit?: string;
  isWeakChapter?: boolean;
};
