"use client";

interface Option {
  label: string;
  value: string;
}

interface Props {
  search?: string;
  setSearch?: (value: string) => void;

  filter?: string;
  setFilter?: (value: string) => void;
  filterOptions?: Option[];

  sort?: string;
  setSort?: (value: string) => void;
  sortOptions?: Option[];

  placeholder?: string;
  rightSlot?: React.ReactNode; // 🔥 for buttons like "+ Add"
}

export default function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  filterOptions = [],
  sort,
  setSort,
  sortOptions = [],
  placeholder = "Search...",
  rightSlot,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-between">
      {/* LEFT SIDE */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 🔍 SEARCH */}
        {setSearch && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="border px-3 py-2 rounded-lg text-sm w-[220px]"
          />
        )}

        {/* 🔽 FILTER */}
        {setFilter && filterOptions.length > 0 && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* 🔽 SORT */}
        {setSort && sortOptions.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* RIGHT SIDE (e.g. + Add button) */}
      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
}
