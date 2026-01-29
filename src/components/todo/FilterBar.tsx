interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  priority: "all" | "low" | "medium" | "high";
  setPriority: (p: "all" | "low" | "medium" | "high") => void;
}

export const FilterBar = ({
  search,
  setSearch,
  priority,
  setPriority,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-between">
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded-lg bg-slate-700 text-white placeholder:text-slate-400 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "all" | "low" | "medium" | "high")
        }
        className="p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};
