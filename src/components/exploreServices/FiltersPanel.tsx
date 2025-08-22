import { Box, Flex, Heading, Input, NativeSelect, Button } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";
import { categoriesData } from "@/constants/categories";
import React from "react";
import type { FilterState } from "../../types/service";

interface FiltersPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>> | ((filters: FilterState) => void);
  onApply: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, setFilters, onApply }) => {
  const handleClear = () => {
    setFilters({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      minRating: "0",
      sortBy: "none",
      category: "",
      maxDeliveryTime: "",
    });
  };

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    if (typeof setFilters === 'function') {
      if (setFilters.length === 1) {
        // It's a dispatch function
        (setFilters as React.Dispatch<React.SetStateAction<FilterState>>)((prev) => ({
          ...prev,
          [field]: value,
        }));
      } else {
        // It's a direct setter function
        (setFilters as (filters: FilterState) => void)({
          ...filters,
          [field]: value,
        });
      }
    }
  };

  return (
    <Box bg="white" p={6} rounded="xl" shadow="sm">
      <Heading fontSize="16px" mb={4}>
        Filter & Sort
      </Heading>

      <Flex gap={4} wrap="wrap">
        <Input
          placeholder="Search services..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          maxW="300px"
        />
        <NativeSelect.Root size="sm" width="300px">
          <NativeSelect.Field
            value={filters.category || ""}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="technology">🔧 Technology & Digital Services</option>
            <option value="automotive">🚗 Automotive Services</option>
            <option value="creative">🎨 Creative</option>
            <option value="food-catering">🍲 Food & Catering</option>
            <option value="events-entertainment">🎉 Events & Entertainment</option>
            <option value="home-services">🛠️ Home Services</option>
            <option value="professional-services">📚 Professional Services</option>
            <option value="agriculture">🚜 Agriculture & Food Processing</option>
            <option value="fashion-beauty">👗 Fashion & Beauty</option>
            <option value="transportation-logistics">🚚 Transportation & Logistics</option>
            <option value="security-services">🔐 Security Services</option>
            <option value="media-production">📽️ Media & Production</option>
            <option value="education-training">📖 Education & Training</option>
            <option value="health-wellness">💪 Health & Wellness</option>
            <option value="repair-maintenance">🛠️ Repair & Maintenance</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          maxW="300px"
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          maxW="300px"
        />
        <NativeSelect.Root maxW="300px">
          <NativeSelect.Field
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
          >
            <option value="0">Any Rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
            <option value="3.0">3.0+</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <NativeSelect.Root maxW="300px">
          <NativeSelect.Field
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="none">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="reviews-desc">Most Reviewed</option>
            <option value="newest">Newest</option>
            <option value="fastest-delivery">Delivery Time: Fastest</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <PrimaryButton name="Clear All" variant="outline" bgColor="gray" onClick={handleClear} color="#fff" maxW="100px" />
      </Flex>

      {/* Buttons Row */}
      <Flex mt={4} justify="center" gap={3}>
        <PrimaryButton name="Apply Filters" bgColor="#197FCF" maxWidth="400px" onClick={onApply} />
      </Flex>
    </Box>
  );
};

export default FiltersPanel;
