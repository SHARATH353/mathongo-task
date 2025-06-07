"use client";

import { Button } from "@/components/ui/button";
import { useChaptersStore } from "@/store/useChaptersStore";
import {
  Atom,
  Flask,
  Function as MathIcon,
  CaretRight,
} from "phosphor-react";

const SUBJECTS = [
  { label: "Physics", icon: <Atom className="w-5 h-5 text-orange-500" /> },
  { label: "Chemistry", icon: <Flask className="w-5 h-5 text-green-500" /> },
  { label: "Mathematics", icon: <MathIcon className="w-5 h-5 text-blue-500" /> },
];

export default function Sidebar() {
  const { selectedSubject, setFilters } = useChaptersStore();

  return (
    <aside className="w-[260px] border-r dark:border-gray-800 hidden md:block">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Subjects</h2>
        <div className="flex flex-col gap-2">
          {SUBJECTS.map((subject) => {
            const isActive = subject.label === selectedSubject;
            return (
              <Button
                key={subject.label}
                variant={isActive ? "default" : "outline"}
                className="justify-start"
                onClick={() =>
                  setFilters({
                    subject: subject.label,
                    search: "",
                    class: [],
                    unit: [],
                    status: "all",
                    weakOnly: false,
                    sortBy: null,
                  })
                }
              >
                {subject.icon}
                <span className="ml-2">{subject.label}</span>
                {isActive && <CaretRight className="ml-auto" weight="bold" />}
              </Button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
