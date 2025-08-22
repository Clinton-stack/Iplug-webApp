"use client";

import React from "react";
import { Box, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import jobs from "@/constants/jobFeedsData";
import SectionHeader from "./SectionHeader";
import NextLink from "next/link";

interface JobFeed {
  id: number;
  title: string;
  budget: number;
  requester: string;
  link: string;
}

// Helper to group jobs into sets of 3
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const JobFeedHighlights: React.FC = () => {
  const jobChunks = chunkArray(jobs as JobFeed[], 3); // 3 jobs per slide

  return (
    <>
      <SectionHeader title="Job Feed Highlights" actionText="Find New Jobs" />

      <Swiper
        spaceBetween={20}
        modules={[Pagination, Autoplay]}
        pagination={{ dynamicBullets: true }}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {jobChunks.map((chunk, slideIdx) => (
          <SwiperSlide key={`slide-${chunk[0]?.id || slideIdx}`}>
            <VStack gap={4} align="stretch">
              {chunk.map((job: JobFeed) => (
                <ChakraLink key={job.id} as={NextLink} href={job.link} textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Box p={4} bg="gray.50" borderRadius="lg" _hover={{ bg: "gray.100" }} transition="all 0.2s" w="100%">
                    <VStack align="start" gap={1}>
                      <Text fontWeight="semibold" fontSize="sm" color="#004592" lineClamp={2}>
                        {job.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Budget:{" "}
                        <Text as="span" fontWeight="medium" color="green.600">
                          ₦{job.budget.toLocaleString()}
                        </Text>{" "}
                        • Posted by {job.requester}
                      </Text>
                    </VStack>
                  </Box>
                </ChakraLink>
              ))}
            </VStack>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default JobFeedHighlights;
