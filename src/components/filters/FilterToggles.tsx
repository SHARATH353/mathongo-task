"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChaptersStore } from "@/store/useChaptersStore";

export default function FilterToggles() {
  const { filters, setFilters } = useChaptersStore();

  return (
    <div className="flex gap-2 flex-wrap items-center mb-4">
      <Button
        variant={filters.status === "not_started" ? "default" : "outline"}
        onClick={() =>
          setFilters({
            status: filters.status === "not_started" ? "all" : "not_started",
          })
        }
      >
        Not Started
      </Button>

      <Button
        variant={filters.weakOnly ? "default" : "outline"}
        onClick={() => setFilters({ weakOnly: !filters.weakOnly })}
      >
        Weak Chapters
      </Button>

      <Select
        onValueChange={(val) =>
          setFilters({ sortBy: val as "name" | "status" })
        }
      >
        <SelectTrigger className="w-[140px] ml-auto">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
