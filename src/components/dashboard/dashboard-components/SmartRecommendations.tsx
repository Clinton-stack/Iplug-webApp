"use client";

import { Box, Text, VStack, Flex, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import smartRecommendations from "@/constants/smartRecommendationsData";
import SectionHeader from "./SectionHeader";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";

// Define types for the recommendation items
interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

interface ProviderItem {
  id: string;
  name: string;
  category: string;
  avatar: string;
}

interface RecommendationGroup {
  id: number;
  type: string;
  items: ServiceItem[] | ProviderItem[];
}

const SmartRecommendations: React.FC = () => {
  return (
    <Box>
      <SectionHeader title="Smart Recommendations" actionText="See All" />

      <Swiper modules={[Pagination, Autoplay]} pagination={{ dynamicBullets: true}} spaceBetween={20} slidesPerView={1} autoplay={{ delay: 3000, disableOnInteraction: false }} >
        {(smartRecommendations as RecommendationGroup[]).map(({ id, type, items }) => (
          <SwiperSlide key={id}>
            <Text fontWeight="semibold" mb={4} fontSize="md" color="gray.700">
              {type}
            </Text>

            <VStack gap={4} align="stretch">
              {type === "Similar Services"
                ? (items as ServiceItem[]).map(({ id, title, description }) => (
                    <Box key={id} p={3} rounded="md" borderWidth="1px" borderColor="gray.200" _hover={{ bg: "gray.100", cursor: "pointer" }}>
                      <Text fontWeight="bold" fontSize="sm" mb={1}>
                        {title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" lineClamp={2}>
                        {description}
                      </Text>
                    </Box>
                  ))
                : (items as ProviderItem[]).map(({ id, name, category, avatar }) => (
                    <Flex key={id} align="center" p={3} rounded="md" _hover={{ bg: "gray.100", cursor: "pointer" }}>
                      <Image boxSize="40px" rounded="full" src={avatar} alt={name} mr={4} objectFit="cover" />
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm">
                          {name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {category}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
            </VStack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SmartRecommendations;
