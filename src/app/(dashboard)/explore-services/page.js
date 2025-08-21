"use client";

import React, { useState, useEffect } from "react";
import { Box, Heading, Text, VStack, Center, Spinner } from "@chakra-ui/react";
import FiltersPanel from "@/components/exploreServices/FiltersPanel";
import PaginatedItems from "@/components/exploreServices/ServiceResults";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useRequestStore } from "@/store/requestStore";
import { useUserStore } from "@/store/userStore";

export default function ExplorePage({ onNavigate }) {
  const { role } = useUserStore(); // "requester" | "provider"
  const openModal = useRequestStore((state) => state.openModal);

  const [loading, setLoading] = useState(false);

  // ✅ active filters always used for fetching results
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    minRating: "0",
    maxDeliveryTime: "",
    sortBy: "none",
    category: "",
  });

  // Reset filters whenever role changes
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const resetFilters = {
        searchTerm: "",
        minPrice: "",
        maxPrice: "",
        minRating: "0",
        maxDeliveryTime: "",
        sortBy: "none",
        category: "",
      };
      setFilters(resetFilters);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [role]);

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <VStack key={role} spacing={10} align="stretch" p={5}>
      {/* Header */}
      <Box textAlign="center">
        <Heading>{role === "requester" ? "Explore the Service Marketplace" : "Find Open Projects"}</Heading>
        <Text mt={2}>
          {role === "requester" ? "Discover talented providers and services for your needs." : "Browse open custom requests and place your bids."}
        </Text>

        {role === "requester" ? (
          <PrimaryButton name="Post a Custom Request" mt={4} bgColor="#197FCF" onClick={openModal} maxWidth="400px" color="#fff" />
        ) : (
          <PrimaryButton
            name="Create a Custom Specialization"
            mt={4}
            bgColor="#197FCF"
            onClick={() => onNavigate("explore-services")}
            maxWidth="400px"
            color="#fff"
          />
        )}
      </Box>

      {/* Filters */}
      <FiltersPanel
        filters={filters}
        onApply={setFilters} // 👈 only one callback now
      />

      {/* Results */}
      <Box bg="white" p={6} rounded="xl" shadow="sm">
        <Heading fontSize="md" mb={4}>
          Results
        </Heading>

        <PaginatedItems
          filters={filters} // 👈 directly pass filters
          onCardClick={(item) => onNavigate("explore-detail", { id: item.id })}
        />
      </Box>
    </VStack>
  );
}
