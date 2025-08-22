"use client";

import { useState, useEffect } from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ServiceCard from "./ServiceCard";
import React from "react";
import type { ServiceItem } from "../../types/service";

interface ServiceResultsProps {
  items: ServiceItem[];
  role: string;
  onCardClick: (item: ServiceItem) => void;
}

const PaginatedServiceGrid: React.FC<ServiceResultsProps> = ({ items, role, onCardClick }) => {
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Slice items for current page
  const currentItems = items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page to 1 if items change (e.g., after filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <VStack gap={6} align="stretch">
      <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap={4}>
        {currentItems.map((item: ServiceItem) => (
          <ServiceCard key={item.id} item={item} role={role} onClick={() => onCardClick(item)} />
        ))}
      </SimpleGrid>

      <Box textAlign="center">
        <Pagination.Root count={totalPages} pageSize={1} defaultPage={currentPage} onPageChange={({ page }) => handlePageChange(page)}>
          <ButtonGroup variant="ghost" size="sm" attached>
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous page" >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton 
                  key={page.value}
                  aria-label={`Go to page ${page.value}`} 
                  variant={{ base: "ghost", _selected: "outline" }} 
                  onClick={() => handlePageChange(page.value)}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton aria-label="Next page">
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>
    </VStack>
  );
};

export default PaginatedServiceGrid;
