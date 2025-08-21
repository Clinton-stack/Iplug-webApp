"use client";

import { useState, useEffect, useMemo } from "react";
import { Box, HStack, SimpleGrid, VStack, ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuGrid2X2, LuList } from "react-icons/lu";
import ServiceCard from "./ServiceCard";
import ServiceListCard from "./ServiceListCard";
import RequestCard from "./RequestCard";
import RequestListCard from "./RequestListCard";
import { useUserStore } from "@/store/userStore";
import { servicesData } from "@/constants/allServiceProvidersData";
import { requestsData } from "@/constants/requestData";

export default function PaginatedItems({ filters, onCardClick }) {
  const role = useUserStore((s) => s.role); // requester | provider
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // Flatten datasets
  const allServices = useMemo(() => Object.values(servicesData).flat(), []);
  const allRequests = useMemo(() => Object.values(requestsData || {}).flat(), []);

  // Pick dataset based on role
  const items = useMemo(() => {
    if (role === "requester") return allServices;
    if (role === "provider") return allRequests;
    return [];
  }, [role, allServices, allRequests]);

  // Apply filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const { searchTerm, minPrice, maxPrice, minRating, maxDeliveryTime, category } = filters || {};

      // Search term
      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      // Category filter
      if (category && item.category !== category) return false;

      // Price filter (only for services)
      if (role === "requester") {
        if (minPrice && item.pricePerTask < minPrice) return false;
        if (maxPrice && item.pricePerTask > maxPrice) return false;
      }

      // Rating filter (only for services)
      if (role === "requester") {
        if (minRating && item.rating < minRating) return false;
      }

      // Delivery time filter (for requests)
      if (role === "provider" && maxDeliveryTime && item.maxDeliveryTime > maxDeliveryTime) return false;

      return true;
    });
  }, [items, filters, role]);

  // Reset page when items or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems, role]);

  // Select card component
  let CardComponent;
  if (role === "requester") CardComponent = view === "grid" ? ServiceCard : ServiceListCard;
  else if (role === "provider") CardComponent = view === "grid" ? RequestCard : RequestListCard;
  else return null;

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (filteredItems.length === 0) return <Box textAlign="center">No results found</Box>;

  return (
    <VStack spacing={6} align="stretch">
      {/* View toggle */}
      <HStack justify="flex-end">
        <ButtonGroup isAttached size="sm" variant="outline">
          <IconButton
            aria-label="Grid view"
            isActive={view === "grid"}
            onClick={() => setView("grid")}
            bgColor={view === "grid" ? "#197FCF" : ""}
            color={view === "grid" ? "#fff" : "black"}
          >
            <LuGrid2X2 />
          </IconButton>
          <IconButton
            aria-label="List view"
            isActive={view === "list"}
            onClick={() => setView("list")}
            bgColor={view === "list" ? "#197FCF" : ""}
            color={view === "list" ? "#fff" : "black"}
          >
            <LuList />
          </IconButton>
        </ButtonGroup>
      </HStack>

      {/* Grid/List */}
      {view === "grid" ? (
        <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap={4}>
          {currentItems.map((item) => (
            <CardComponent key={item.id} item={item} role={role} onClick={() => onCardClick(item)} />
          ))}
        </SimpleGrid>
      ) : (
        <VStack spacing={4} align="stretch">
          {currentItems.map((item) => (
            <CardComponent key={item.id} item={item} role={role} onClick={() => onCardClick(item)} />
          ))}
        </VStack>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box textAlign="center">
          <Pagination.Root count={totalPages} pageSize={1} defaultPage={currentPage} onChange={setCurrentPage}>
            <ButtonGroup variant="ghost" size="sm" isAttached>
              <Pagination.PrevTrigger asChild color="black">
                <IconButton aria-label="Previous page">
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                color="black"
                render={(page) => (
                  <IconButton
                    aria-label={`Go to page ${page.value}`}
                    variant={{ base: "ghost", _selected: "outline" }}
                    onClick={() => setCurrentPage(page.value)}
                  >
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild color="black">
                <IconButton aria-label="Next page">
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Box>
      )}
    </VStack>
  );
}
