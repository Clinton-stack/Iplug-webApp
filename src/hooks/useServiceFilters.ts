import { useState, useCallback, useEffect, useMemo } from "react";
import type { ServiceItem, Filters, Role } from "../types/service";

interface UseFiltersReturn {
  filteredItems: ServiceItem[];
  applyFilters: () => void;
}

export function useFilters(
  items: ServiceItem[], 
  filters: Filters, 
  role: Role
): UseFiltersReturn {
  const [filteredItems, setFilteredItems] = useState<ServiceItem[]>([]);

  const applyFilters = useCallback(() => {
    let filtered = items.filter((item) => {
      const matchesSearch = filters.searchTerm
        ? item.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;

      const price = role === "requester"
        ? item.pricePerTask || item.price || 0
        : parseFloat((item.budget?.replace(/[^0-9.-]+/g, "") || "0"));

      const matchesPrice =
        (!filters.minPrice || price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || price <= Number(filters.maxPrice));

      const matchesRating =
        role === "requester" ? item.rating >= filters.minRating : true;

      const deliveryTime = item.deliveryTime || item.avgDeliveryTime || Infinity;
      const maxDeliveryTime = filters.maxDeliveryTime ? Number(filters.maxDeliveryTime) : Infinity;
      const matchesDelivery = !filters.maxDeliveryTime || deliveryTime <= maxDeliveryTime;

      return matchesSearch && matchesPrice && matchesRating && matchesDelivery;
    });

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) =>
          (a.pricePerTask || a.price || 0) - (b.pricePerTask || b.price || 0)
        );
        break;
      case "price-desc":
        filtered.sort((a, b) =>
          (b.pricePerTask || b.price || 0) - (a.pricePerTask || a.price || 0)
        );
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews-desc":
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case "newest":
        filtered.sort((a, b) => {
          const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bDate - aDate;
        });
        break;
      case "fastest-delivery":
        filtered.sort((a, b) => {
          const aDelivery = a.deliveryTime || a.avgDeliveryTime || Infinity;
          const bDelivery = b.deliveryTime || b.avgDeliveryTime || Infinity;
          return aDelivery - bDelivery;
        });
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [
    items,
    filters.searchTerm,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.maxDeliveryTime,
    filters.sortBy,
    role
  ]);

  // Apply filters automatically when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return { filteredItems, applyFilters };
}
