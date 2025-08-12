"use client";

import { Box, Text, Flex, Link, Badge, Progress, VStack, HStack, Spacer } from "@chakra-ui/react";
import projects from "@/constants/ActiveProjectsdata";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import SectionHeader from "./SectionHeader";
import NextLink from "next/link";

const getProgressColor = (progress) => {
  const red = Math.round(255 * (1 - progress / 100));
  const green = Math.round(255 * (progress / 100));
  return `rgb(${red}, ${green}, 0)`;
};

const chunkProjects = (projects, size = 3) => {
  const chunks = [];
  for (let i = 0; i < projects.length; i += size) {
    chunks.push(projects.slice(i, i + size));
  }
  return chunks;
};

const ActiveProjectsCard = () => {
  const projectChunks = chunkProjects(projects, 3);

  return (
    <div>
      {/* Header */}
      <SectionHeader title="Active Projects" actionText="View All" />

      {/* Projects */}
      <Box position="relative" h="100%">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ dynamicBullets: true }}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="MySwiper"
        >
          {projectChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <VStack spacing={6} align="stretch">
                {chunk.map((project, idx) => (
                  <Box
                    key={idx}
                    as={NextLink}
                    href={`/projects/${project.id}`}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                    textDecoration="none"
                    color="gray.900"
                  >
                    <Flex justify="space-between" align="center" mb={1}>
                      <Box>
                        <Text fontWeight="semibold">{project.title}</Text>
                        <HStack>
                          <Text fontSize="sm" color="gray.500">
                            Provider:{" "}
                          </Text>
                          <Text color="#197FCF" fontWeight="medium" fontSize="sm">
                            {project.provider}
                          </Text>
                        </HStack>
                      </Box>
                      <Badge bg={project.badgeBg} color={project.badgeColor} fontWeight="semibold" px={3} py={1} borderRadius="md">
                        {project.status}
                      </Badge>
                    </Flex>
                    <Progress.Root value={project.progress} max={100} w="full" mt={2}>
                      <Progress.Track bg="gray.200" h="6px" borderRadius="full">
                        <Progress.Range bg={getProgressColor(project.progress)} borderRadius="full" transition="width 0.6s ease" />
                      </Progress.Track>
                    </Progress.Root>
                  </Box>
                ))}
              </VStack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
};

export default ActiveProjectsCard;
