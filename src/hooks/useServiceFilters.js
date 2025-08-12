import { useState } from "react";

export function useFilters(items, filters, role) {
  const [filteredItems, setFilteredItems] = useState(items);

  const applyFilters = () => {
    let filtered = items.filter((item) => {
      const matchesSearch = filters.searchTerm
        ? item.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;

      const price = role === "requester"
        ? item.pricePerTask || item.price || 0
        : parseFloat(item.budget?.replace(/[^0-9.-]+/g, "") || 0);

      const matchesPrice =
        (!filters.minPrice || price >= filters.minPrice) &&
        (!filters.maxPrice || price <= filters.maxPrice);

      const matchesRating =
        role === "requester" ? item.rating >= filters.minRating : true;

      const matchesDelivery =
        !filters.maxDeliveryTime ||
        (item.deliveryTime || Infinity) <= filters.maxDeliveryTime;

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
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "fastest-delivery":
        filtered.sort(
          (a, b) => (a.deliveryTime || Infinity) - (b.deliveryTime || Infinity)
        );
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  };

  return { filteredItems, applyFilters };
}
