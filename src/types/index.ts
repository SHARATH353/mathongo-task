export type Chapter = {
  id: string;
  name: string;
  subject: string;
  status: "completed" | "incomplete";
  isWeakChapter: boolean;
  class: string;
  unit: string;
};
