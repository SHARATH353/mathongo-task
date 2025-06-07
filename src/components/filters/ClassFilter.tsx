"use client";

import { useChaptersStore } from "@/store/useChaptersStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ClassFilter() {
  const { filteredChapters, setFilters } = useChaptersStore();
  const classList = Array.from(new Set(filteredChapters.map((c) => c.class)));

  return (
    <Select onValueChange={(value) =>
      setFilters({ class: value === "all" ? [] : [value] })
    }>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Class" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {classList.map((cls) => (
          <SelectItem key={cls} value={cls}>
            {cls}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
