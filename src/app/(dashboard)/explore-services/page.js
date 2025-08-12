"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { categories } from "@/constants/categories";
import { servicesData } from "@/constants/allServiceProvidersData";
import CategoriesGrid from "@/components/exploreServices/CatergoriesGrid";
import FiltersPanel from "@/components/exploreServices/FiltersPanel";
import ServiceCard from "@/components/exploreServices/ServiceCard";
import { useFilters } from "@/hooks/useServiceFilters";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ServiceSlider from "@/components/exploreServices/ServiceSlider";

export default function ExplorePage({ role = "requester", onNavigate }) {
  const allServices = useMemo(() => Object.values(servicesData).flat(), []);
  const items = role === "requester" ? allServices : []; // later replace [] with allRequests

  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    minRating: 0,
    maxDeliveryTime: "",
    sortBy: "none",
  });

  const { filteredItems, applyFilters } = useFilters(items, filters, role);

  useEffect(() => {
    applyFilters();
  }, [filters, items]);

  return (
    <VStack spacing={10} align="stretch" p={5}>
      {/* Header */}
      <Box textAlign="center">
        <Heading>{role === "requester" ? "Explore the Service Marketplace" : "Find Open Projects"}</Heading>
        <Text mt={2}>
          {role === "requester" ? "Discover talented providers and services for your needs." : "Browse open custom requests and place your bids."}
        </Text>
        {role === "requester" && (
          <PrimaryButton name="Post a Custom Request" mt={4} bgColor="#197FCF" onClick={() => onNavigate("create-request")} maxWidth="400px" color="#fff" />
        )}
      </Box>

      {/* Filters */}
      <FiltersPanel filters={filters} setFilters={setFilters} onApply={applyFilters} />

      {/* Categories */}
      <CategoriesGrid categories={categories} onSelectCategory={(cat) => onNavigate("explore-category", { category: cat })} />

      {/* Results */}
      <Box bg="white" p={6} rounded="xl" shadow="sm">
        <Heading fontSize="md" mb={4}>
          Results
        </Heading>
        <ServiceSlider items={filteredItems} role={role} onCardClick={(item) => onNavigate("explore-detail", { id: item.id })} />
      </Box>
    </VStack>
  );
}
