"use client";

import { useChaptersStore } from "@/store/useChaptersStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UnitFilter() {
  const { setFilters, filteredChapters } = useChaptersStore();

  const units = Array.from(new Set(filteredChapters.map((c) => c.unit)));

  return (
    <Select onValueChange={(val) => setFilters({ unit: val === "all" ? [] : [val] })}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Units</SelectItem>
        {units.map((unit) => (
          <SelectItem key={unit} value={unit}>
            {unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
