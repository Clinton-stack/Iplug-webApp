"use client";

import { Box, Text, VStack, Flex, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import smartRecommendations from "@/constants/smartRecommendationsData";
import SectionHeader from "./SectionHeader";

import "swiper/css";
import "swiper/css/pagination";

const SmartRecommendations = () => {
  return (
    <Box>
      <SectionHeader title="Smart Recommendations" />

      <Swiper modules={[Pagination, Autoplay]} pagination={{ dynamicBullets: true}} spaceBetween={20} slidesPerView={1} autoplay={{ delay: 3000, disableOnInteraction: false }} >
        {smartRecommendations.map(({ id, type, items }) => (
          <SwiperSlide key={id}>
            <Text fontWeight="semibold" mb={4} fontSize="md" color="gray.700">
              {type}
            </Text>

            <VStack spacing={4} align="stretch">
              {type === "Similar Services"
                ? items.map(({ id, title, description }) => (
                    <Box key={id} p={3} rounded="md" borderWidth="1px" borderColor="gray.200" _hover={{ bg: "gray.100", cursor: "pointer" }}>
                      <Text fontWeight="bold" fontSize="sm" mb={1}>
                        {title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" noOfLines={2}>
                        {description}
                      </Text>
                    </Box>
                  ))
                : items.map(({ id, name, category, avatar }) => (
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
