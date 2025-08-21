import { useState } from "react";

export function useFilters(items, filters, role) {
  const [filteredItems, setFilteredItems] = useState(items);

  const getPrice = (item) => {
    if (role === "requester") {
      return item.pricePerTask || item.price || 0;
    }
    // Providers see "requests" which use budget
    if (typeof item.budget === "string") {
      return parseFloat(item.budget.replace(/[^0-9.-]+/g, "")) || 0;
    }
    return Number(item.budget) || 0;
  };

  const getRating = (item) => {
    return role === "requester" ? item.rating || 0 : 0; // requests usually don't have ratings
  };

  const getDeliveryTime = (item) => {
    return item.deliveryTime || Infinity; // works for services, ignore for requests
  };

  const applyFilters = () => {
    let filtered = items.filter((item) => {
      // ✅ Search
      const matchesSearch = filters.searchTerm
        ? item.title?.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;

      // ✅ Price
      const price = getPrice(item);
      const matchesPrice =
        (!filters.minPrice || price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || price <= Number(filters.maxPrice));

      // ✅ Rating (only for services)
      const matchesRating =
        role === "requester" ? getRating(item) >= filters.minRating : true;

      // ✅ Delivery Time (only for services)
      const matchesDelivery =
        !filters.maxDeliveryTime ||
        getDeliveryTime(item) <= Number(filters.maxDeliveryTime);

      return matchesSearch && matchesPrice && matchesRating && matchesDelivery;
    });

    // ✅ Sorting
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-desc":
        filtered.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "rating-desc":
        filtered.sort((a, b) => getRating(b) - getRating(a));
        break;
      case "reviews-desc":
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "fastest-delivery":
        filtered.sort(
          (a, b) => getDeliveryTime(a) - getDeliveryTime(b)
        );
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  };

  return { filteredItems, applyFilters };
}
