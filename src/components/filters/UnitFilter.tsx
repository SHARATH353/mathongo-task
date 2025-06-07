"use client";

import { useChaptersStore } from "@/store/useChaptersStore";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function UnitFilter() {
  const { filteredChapters, setFilters } = useChaptersStore();
  const unitList = Array.from(new Set(filteredChapters.map((c) => c.unit)));

  return (
    <Select onValueChange={(value) =>
      setFilters({ unit: value === "all" ? [] : [value] })
    }>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {unitList.map((unit) => (
          <SelectItem key={unit} value={unit}>
            {unit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
