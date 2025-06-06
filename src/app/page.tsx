"use client";

import { useEffect, useState } from "react";
import { loadChaptersData } from "@/lib/loadChapters";
import { useChaptersStore } from "@/store/useChaptersStore";
import { Chapter } from "@/types";
import ChapterCard from "@/components/ChapterCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";

export default function HomePage() {
  const setChapters = useChaptersStore((state) => state.setChapters);
  const chapters = useChaptersStore((state) => state.chapters);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "status">("name");

  useEffect(() => {
    loadChaptersData()
      .then(setChapters)
      .catch((err) => console.error("Error loading chapters:", err));
  }, [setChapters]);

  const filteredChapters = chapters
    .filter((chapter) => {
      const matchesStatus =
        filter === "all" ||
        (filter === "completed" && chapter.status === "completed") ||
        (filter === "incomplete" && chapter.status === "incomplete");

      const matchesSearch =
        typeof chapter.name === "string" &&
        chapter.name.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <main className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">MathonGo Chapters</h1>
        <ModeToggle />
      </div>

      <Tabs defaultValue="all" onValueChange={(val) => setFilter(val as typeof filter)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Search chapters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "status")}
          className="px-3 py-2 border rounded-md bg-background text-foreground"
        >
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {filteredChapters.length === 0 ? (
        <p>No matching chapters found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredChapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      )}
    </main>
  );
}
