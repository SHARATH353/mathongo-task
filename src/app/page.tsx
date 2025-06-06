"use client";

import { useEffect, useState } from "react";
import { loadChaptersData } from "@/lib/loadChapters";
import { useChaptersStore } from "@/store/useChaptersStore";
import ChapterCard from "@/components/ChapterCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HomePage() {
  const setChapters = useChaptersStore((state) => state.setChapters);
  const chapters = useChaptersStore((state) => state.chapters);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "status">("name");

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
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.status.localeCompare(b.status);
    });

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
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

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search chapters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select defaultValue="name" onValueChange={(val) => setSort(val as typeof sort)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="status">Sort by Status</SelectItem>
          </SelectContent>
        </Select>
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
