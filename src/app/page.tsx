"use client";

import { useEffect } from "react";
import { loadChaptersData } from "@/lib/loadChapters";
import { useChaptersStore } from "@/store/useChaptersStore";
import ChapterCard from "@/components/ChapterCard";
import Sidebar from "@/components/Sidebar";
import SubjectTabs from "@/components/SubjectTabs";
import FilterToggles from "@/components/filters/FilterToggles";
import ClassFilter from "@/components/filters/ClassFilter";
import UnitFilter from "@/components/filters/UnitFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import ClientOnly from "@/components/ClientOnly"; // ✅ Add this

export default function HomePage() {
  const {
    setChapters,
    filteredChapters,
    filters,
    setFilters,
  } = useChaptersStore();

  useEffect(() => {
    loadChaptersData()
      .then(setChapters)
      .catch((err) => console.error("Error loading chapters:", err));
  }, [setChapters]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <ClientOnly>
          <AppHeader />
          <SubjectTabs />

          <div className="flex flex-wrap gap-3 mb-4 items-center">
            <ClassFilter />
            <UnitFilter />
            <FilterToggles />
            <SortDropdown />
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </div>

          <Input
            placeholder="Search chapters..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="mb-4"
          />

          {filteredChapters.length === 0 ? (
            <p>No chapters found.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredChapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          )}
        </ClientOnly>
      </main>
    </div>
  );
}
