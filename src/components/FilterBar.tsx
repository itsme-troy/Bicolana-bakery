"use client";

import React from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  filters?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;

  actionLabel?: string;
  onActionClick?: () => void;
};

export default function FilterBar({
  search,
  onSearchChange,
  filters = [],
  activeFilter,
  onFilterChange,
  actionLabel,
  onActionClick,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
      {/* LEFT: Filters */}
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange?.(filter.value)}
            className={`px-3 py-1 rounded-md text-sm capitalize transition
              ${
                activeFilter === filter.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* RIGHT: Search + Action */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        />

        {actionLabel && (
          <button
            onClick={onActionClick}
            className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600"
          >
            + {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
