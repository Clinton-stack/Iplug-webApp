import { Box, Flex, Heading, Input, NativeSelect, Button } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";

export default function FiltersPanel({ filters, setFilters, onApply }) {
  const handleClear = () => {
    setFilters({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      minRating: "0",
      sortBy: "none",
    });
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
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          maxW="300px"
        />
        <Input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          maxW="300px"
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          maxW="300px"
        />
        <NativeSelect.Root value={filters.minRating} onChange={(e) => setFilters({ ...filters, minRating: e.target.value })} maxW="300px">
          <NativeSelect.Field>
            <option value="0">Any Rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
            <option value="3.0">3.0+</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <NativeSelect.Root value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })} maxW="300px">
          <NativeSelect.Field>
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
}
