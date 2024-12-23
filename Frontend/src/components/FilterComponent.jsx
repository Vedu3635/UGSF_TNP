import React, { useMemo } from "react";
import { Search, Filter } from "lucide-react";

const SelectFilter = ({ placeholder, value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-[200px] px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                appearance-none bg-no-repeat bg-right"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
      backgroundSize: "20px",
      paddingRight: "2rem",
    }}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const FilterComponent = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  filterOptions,
  resetFilters,
}) => {
  const isPlacementsTab = activeTab === "placements";

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search students by name or id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 text-gray-700"
        >
          <Filter className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        {isPlacementsTab ? (
          <>
            <SelectFilter
              placeholder="Filter by Year"
              value={filters.year}
              onChange={(value) => setFilters({ ...filters, year: value })}
              options={filterOptions[activeTab].year}
            />
            <SelectFilter
              placeholder="Filter by Company"
              value={filters.company_name}
              onChange={(value) =>
                setFilters({ ...filters, company_name: value })
              }
              options={filterOptions.placements.company_name}
            />
            <SelectFilter
              placeholder="Filter by Domain"
              value={filters.position}
              onChange={(value) => setFilters({ ...filters, position: value })}
              options={filterOptions.placements.position}
            />
            <SelectFilter
              placeholder="Filter by Program"
              value={filters.Program}
              onChange={(value) => setFilters({ ...filters, Program: value })}
              options={filterOptions.higherStudies.Program}
            />
          </>
        ) : (
          <>
            <SelectFilter
              placeholder="Filter by Intake-year"
              value={filters.intake_year}
              onChange={(value) =>
                setFilters({ ...filters, intake_year: value })
              }
              options={filterOptions[activeTab].intake_year}
            />
            <SelectFilter
              placeholder="Filter by University"
              value={filters.university_name}
              onChange={(value) =>
                setFilters({ ...filters, university_name: value })
              }
              options={filterOptions.higherStudies.university_name}
            />
            <SelectFilter
              placeholder="Filter by Course"
              value={filters.course}
              onChange={(value) =>
                setFilters({ ...filters, course_name: value })
              }
              options={filterOptions.higherStudies.course_name}
            />
            <SelectFilter
              placeholder="Filter by Program"
              value={filters.Program}
              onChange={(value) => setFilters({ ...filters, Program: value })}
              options={filterOptions.higherStudies.Program}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
