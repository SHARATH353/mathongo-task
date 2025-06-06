export type Chapter = {
  id: string;
  name: string;
  subject: string;
  class: string;
  unit: string;
  status: "completed" | "incomplete";
  isWeakChapter: boolean;
};
