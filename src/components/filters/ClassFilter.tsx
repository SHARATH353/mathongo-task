"use client";

import { useChaptersStore } from "@/store/useChaptersStore";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ClassFilter() {
  const { filteredChapters, setFilters } = useChaptersStore();

  const classes = Array.from(new Set(filteredChapters.map((c) => c.class)));

  return (
    <Select
      onValueChange={(val) =>
        setFilters({ class: val === "all" ? [] : [val] })
      }
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Class" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Classes</SelectItem>
        {classes.map((cls) => (
          <SelectItem key={cls} value={cls}>
            {cls}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
