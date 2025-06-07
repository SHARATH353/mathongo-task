"use client";

import { useChaptersStore } from "@/store/useChaptersStore";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SortDropdown() {
  const { setFilters } = useChaptersStore();

  return (
    <Select
      onValueChange={(val) =>
        setFilters({ sortBy: val as "name" | "status" })
      }
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="status">Status</SelectItem>
      </SelectContent>
    </Select>
  );
}
