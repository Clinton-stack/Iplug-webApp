"use client"

import React from 'react';
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  HStack,
  VStack,
  Text,
  Badge,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { statusColors, filterOptions } from '@/constants/projectsData';

interface FilterPanelProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  providerFilter: string;
  setProviderFilter: (provider: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  dateRange,
  setDateRange,
  providerFilter,
  setProviderFilter,
  sortBy,
  setSortBy,
  onClearFilters,
  activeFiltersCount
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'budget_high', label: 'Budget: High to Low' },
    { value: 'budget_low', label: 'Budget: Low to High' },
    { value: 'deadline', label: 'Deadline: Soonest' },
    { value: 'progress', label: 'Progress: Highest' },
    { value: 'activity', label: 'Recent Activity' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'last_3_months', label: 'Last 3 Months' },
    { value: 'last_6_months', label: 'Last 6 Months' },
    { value: 'this_year', label: 'This Year' }
  ];

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      mb={6}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={2}>
          <FiFilter color="gray" />
          <Text fontWeight="semibold" color="gray.700">
            Filter & Search Projects
          </Text>
          {activeFiltersCount > 0 && (
            <Badge colorScheme="blue" variant="solid">
              {activeFiltersCount} active
            </Badge>
          )}
        </HStack>
        
        {activeFiltersCount > 0 && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<FiX />}
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </Flex>

      {/* Main Search */}
      <VStack spacing={4} align="stretch">
        <InputGroup size="md">
          <InputLeftElement>
            <FiSearch color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search by project title, provider name, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            _focus={{
              bg: "white",
              borderColor: "blue.300",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)"
            }}
          />
        </InputGroup>

        {/* Filter Row 1 */}
        <Flex gap={4} wrap="wrap">
          <Box minW="200px" flex="1">
            <Text fontSize="sm" mb={2} fontWeight="medium" color="gray.700">
              Status
            </Text>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _focus={{
                bg: "white",
                borderColor: "blue.300"
              }}
            >
              <option value="all">All Statuses</option>
              {filterOptions.status.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </Box>

          <Box minW="200px" flex="1">
            <Text fontSize="sm" mb={2} fontWeight="medium" color="gray.700">
              Category
            </Text>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _focus={{
                bg: "white",
                borderColor: "blue.300"
              }}
            >
              <option value="all">All Categories</option>
              {filterOptions.categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Box>

          <Box minW="200px" flex="1">
            <Text fontSize="sm" mb={2} fontWeight="medium" color="gray.700">
              Date Range
            </Text>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _focus={{
                bg: "white",
                borderColor: "blue.300"
              }}
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>

        {/* Filter Row 2 */}
        <Flex gap={4} wrap="wrap">
          <Box minW="200px" flex="1">
            <Text fontSize="sm" mb={2} fontWeight="medium" color="gray.700">
              Provider
            </Text>
            <Input
              placeholder="Filter by provider name..."
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _focus={{
                bg: "white",
                borderColor: "blue.300",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)"
              }}
            />
          </Box>

          <Box minW="200px" flex="1">
            <Text fontSize="sm" mb={2} fontWeight="medium" color="gray.700">
              Sort By
            </Text>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _focus={{
                bg: "white",
                borderColor: "blue.300"
              }}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Box>

          <Box minW="200px" flex="1">
            {/* Spacer for alignment */}
          </Box>
        </Flex>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <Box pt={2}>
            <Text fontSize="sm" mb={2} fontWeight="medium" color="gray.700">
              Active Filters:
            </Text>
            <Wrap spacing={2}>
              {statusFilter !== 'all' && (
                <WrapItem>
                  <Badge
                    colorScheme={statusColors[statusFilter] || 'gray'}
                    variant="solid"
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    Status: {statusFilter}
                  </Badge>
                </WrapItem>
              )}
              {categoryFilter !== 'all' && (
                <WrapItem>
                  <Badge
                    colorScheme="purple"
                    variant="solid"
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    Category: {categoryFilter}
                  </Badge>
                </WrapItem>
              )}
              {dateRange !== 'all' && (
                <WrapItem>
                  <Badge
                    colorScheme="orange"
                    variant="solid"
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    {dateRangeOptions.find(opt => opt.value === dateRange)?.label}
                  </Badge>
                </WrapItem>
              )}
              {providerFilter && (
                <WrapItem>
                  <Badge
                    colorScheme="teal"
                    variant="solid"
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    Provider: {providerFilter}
                  </Badge>
                </WrapItem>
              )}
            </Wrap>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default FilterPanel;
