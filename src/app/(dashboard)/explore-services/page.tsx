"use client";
import React, { useState, useMemo, useEffect, Suspense, lazy } from "react";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useFilters } from "@/hooks/useServiceFilters";
import { useRequestStore } from "@/store/requestStore";
import type { FilterState, Filters } from "@/types/service";

// Loading component outside of main component
const LoadingFallback = () => (
  <Box textAlign="center" p={4}>
    <Spinner size="lg" color="blue.500" />
    <Text mt={2}>Loading component...</Text>
  </Box>
);

// Dynamic imports for better code splitting
const FiltersPanel = lazy(() => import("@/components/exploreServices/FiltersPanel"));
const ServiceSlider = lazy(() => import("@/components/exploreServices/ServiceResults"));
const PrimaryButton = lazy(() => import("@/components/ui/PrimaryButton"));

// Lazy load heavy data only when needed
const loadServicesData = async () => {
  const module = await import("@/constants/allServiceProvidersData");
  return module.servicesData;
};

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const role: "requester" | "provider" = "requester";
  const openModal = useRequestStore((state) => state.openModal);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    minRating: "0",
    maxDeliveryTime: "",
    sortBy: "none",
    category: "",
  });

  // Load heavy data asynchronously
  useEffect(() => {
    const initializePage = async () => {
      try {
        setIsLoading(true);
        const data = await loadServicesData();
        
        // Convert data to proper array format
        const allServices = data ? Object.values(data).flat() : [];
        setServicesData(allServices);
        setMounted(true);
      } catch (error) {
        console.error('Failed to load services data:', error);
        setServicesData([]);
        setMounted(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, []);

  const onNavigate = (route: string, params?: any) => {
    console.log('Navigate to:', route, params);
  };

  const items = useMemo(() => {
    return role === "requester" ? servicesData : [];
  }, [role, servicesData]);

  const filtersForHook: Filters = useMemo(() => ({
    searchTerm: filters.searchTerm,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: parseFloat(filters.minRating) || 0,
    maxDeliveryTime: filters.maxDeliveryTime,
    sortBy: filters.sortBy,
  }), [filters.searchTerm, filters.minPrice, filters.maxPrice, filters.minRating, filters.maxDeliveryTime, filters.sortBy]);

  const { filteredItems, applyFilters } = useFilters(items as any[], filtersForHook, role);

  if (!mounted || isLoading) {
    return (
      <VStack gap={10} align="stretch" p={5} minH="50vh" justify="center">
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" mb={4} />
          <Heading size="md">Loading Services...</Heading>
          <Text color="gray.600" mt={2}>Please wait while we load the marketplace</Text>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack gap={10} align="stretch" p={5} suppressHydrationWarning>
      {/* Header */}
      <Box textAlign="center">
        <Heading>
          {role === "requester" ? "Explore the Service Marketplace" : "Find Open Projects"}
        </Heading>
        <Text mt={2}>
          {role === "requester" 
            ? "Discover talented providers and services for your needs." 
            : "Browse open custom requests and place your bids."}
        </Text>
        {role === "requester" && (
          <Suspense fallback={<Spinner />}>
            <PrimaryButton 
              name="Post a Custom Request" 
              mt={4} 
              bgColor="#197FCF" 
              onClick={() => openModal()} 
              maxWidth="400px" 
              color="#fff" 
            />
          </Suspense>
        )}
      </Box>

      {/* Filters */}
      <Suspense fallback={<LoadingFallback />}>
        <FiltersPanel 
          filters={filters} 
          setFilters={setFilters} 
          onApply={applyFilters} 
        />
      </Suspense>

      {/* Results */}
      <Box bg="white" p={6} rounded="xl" shadow="sm">
        <Heading fontSize="md" mb={4}>
          Results
        </Heading>
        <Suspense fallback={<LoadingFallback />}>
          <ServiceSlider 
            items={filteredItems} 
            role={role} 
            onCardClick={(item: any) => onNavigate("explore-detail", { id: item.id })} 
          />
        </Suspense>
      </Box>
    </VStack>
  );
}
