"use client";

import { useChaptersStore } from "@/store/useChaptersStore";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubjectTabs() {
  const { selectedSubject, setFilters } = useChaptersStore();

  const subjects = ["Physics", "Chemistry", "Mathematics"];

  return (
    <Tabs
      defaultValue={selectedSubject}
      value={selectedSubject}
      onValueChange={(subject) => setFilters({ subject })}
      className="mb-4"
    >
      <TabsList>
        {subjects.map((subj) => (
          <TabsTrigger key={subj} value={subj}>
            {subj}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
