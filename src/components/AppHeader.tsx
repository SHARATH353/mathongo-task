"use client";

import { GraduationCap } from "lucide-react";

export default function AppHeader() {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <GraduationCap className="text-green-600 w-6 h-6" />
        <div>
          <h1 className="text-xl font-bold">JEE Main</h1>
          <p className="text-sm text-muted-foreground">
            2025 - 2009 | <span className="font-medium">173 Papers</span> |{" "}
            <span className="font-medium">15825 Qs</span>
          </p>
        </div>
      </div>
    </div>
  );
}
