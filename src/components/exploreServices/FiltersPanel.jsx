"use client";

import { Box, Flex, Heading, Input, NativeSelect } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";
import { useUserStore } from "@/store/userStore";
import { useState, useEffect } from "react";

export default function FiltersPanel({ filters, onApply }) {
  const { role } = useUserStore();

  // 👇 Local "draft" state for editing
  const [draftFilters, setDraftFilters] = useState(filters);

  // keep draft in sync when parent resets filters
  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const handleChange = (field, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClear = () => {
    const reset = {
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      minRating: "0",
      sortBy: "none",
      category: "",
      maxDeliveryTime: "",
    };
    setDraftFilters(reset);
    onApply(reset); // parent updates + fetches
  };

  const handleApply = () => {
    onApply(draftFilters); // ✅ parent handles update + fetch
  };

  return (
    <Box bg="white" p={6} rounded="xl" shadow="sm">
      <Heading fontSize="16px" mb={4}>
        Filter & Sort
      </Heading>

      <Flex gap={4} wrap="wrap">
        {/* 🔍 Search */}
        <Input
          placeholder={role === "requester" ? "Search services..." : "Search requests..."}
          value={draftFilters.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value)}
          maxW="300px"
        />

        {/* 📂 Categories */}
        <NativeSelect.Root size="sm" width="300px">
          <NativeSelect.Field value={draftFilters.category} onChange={(e) => handleChange("category", e.currentTarget.value)}>
            <option value="">All Categories</option>
            <option value="tech">🔧 Technology & Digital Services</option>
            <option value="creative">🎨 Creative</option>
            <option value="business">💼 Business & Professional Services</option>
            <option value="trades">🛠️ Trades & Home Services</option>
            <option value="culinary">🍲 Food & Catering</option>
            <option value="education">📖 Education & Training</option>
            <option value="automotive">🚗 Automotive Services</option>
            <option value="events-entertainment">🎉 Events & Entertainment</option>
            <option value="home-services">🏠 Home Services</option>
            <option value="professional-services">📚 Professional Services</option>
            <option value="agriculture">🚜 Agriculture & Food Processing</option>
            <option value="fashion-beauty">👗 Fashion & Beauty</option>
            <option value="transportation-logistics">🚚 Transportation & Logistics</option>
            <option value="security-services">🔐 Security Services</option>
            <option value="media-production">📽️ Media & Production</option>
            <option value="health-wellness">💪 Health & Wellness</option>
            <option value="repair-maintenance">🛠️ Repair & Maintenance</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        {/* 💰 Price / Budget */}
        <Input
          type="number"
          placeholder={role === "requester" ? "Min Price" : "Min Budget"}
          value={draftFilters.minPrice}
          onChange={(e) => handleChange("minPrice", e.target.value)}
          maxW="300px"
        />
        <Input
          type="number"
          placeholder={role === "requester" ? "Max Price" : "Max Budget"}
          value={draftFilters.maxPrice}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
          maxW="300px"
        />

        {/* ⭐ Rating (only for services) */}
        {role === "requester" && (
          <NativeSelect.Root maxW="300px">
            <NativeSelect.Field value={draftFilters.minRating} onChange={(e) => handleChange("minRating", e.currentTarget.value)}>
              <option value="0">Any Rating</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
              <option value="3.0">3.0+</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}

        {/* 🔽 Sorting */}
        <NativeSelect.Root maxW="300px">
          <NativeSelect.Field value={draftFilters.sortBy} onChange={(e) => handleChange("sortBy", e.currentTarget.value)}>
            <option value="none">Sort By</option>
            <option value="price-asc">{role === "requester" ? "Price: Low to High" : "Budget: Low to High"}</option>
            <option value="price-desc">{role === "requester" ? "Price: High to Low" : "Budget: High to Low"}</option>
            {role === "requester" && (
              <>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="reviews-desc">Most Reviewed</option>
                <option value="fastest-delivery">Delivery Time: Fastest</option>
              </>
            )}
            <option value="newest">Newest</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <PrimaryButton name="Clear All" variant="outline" bgColor="gray" onClick={handleClear} color="#fff" maxW="100px" />
      </Flex>

      {/* Buttons Row */}
      <Flex mt={4} justify="center" gap={3}>
        <PrimaryButton name="Apply Filters" bgColor="#197FCF" maxWidth="400px" onClick={handleApply} />
      </Flex>
    </Box>
  );
}
