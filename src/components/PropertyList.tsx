"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import PropertyCard from "./PropertyCard";

export default function PropertyList({ initialProperties }: { initialProperties: any[] }) {
  const [filters, setFilters] = useState({ search: "", type: "ALL" });

  const filteredProperties = initialProperties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          p.neighborhood.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === "ALL" || p.type === filters.type;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <FilterBar onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {filteredProperties.length === 0 && (
        <p className="text-center text-gray-500 py-20 font-medium">Nenhum imóvel encontrado nesta categoria.</p>
      )}
    </>
  );
}