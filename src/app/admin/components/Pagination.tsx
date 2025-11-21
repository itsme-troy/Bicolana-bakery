"use client";

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
