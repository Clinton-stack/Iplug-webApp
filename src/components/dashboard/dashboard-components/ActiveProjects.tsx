"use client";

import React from 'react';
import { Box, VStack, Text, Flex, Progress, Badge } from "@chakra-ui/react";
import projects from "@/constants/ActiveProjectsdata";
import Link from 'next/link';
import SectionHeader from './SectionHeader';

interface Project {
  id?: string;
  title: string;
  progress: number;
  status: string;
  provider?: string;
  dueDate?: string;
  badgeColor?: string;
  badgeBg?: string;
}

const getProgressColor = (progress: number): string => {
  if (progress >= 75) return "#10b981"; // green
  if (progress >= 50) return "#3b82f6"; // blue
  if (progress >= 25) return "#f59e0b"; // yellow
  return "#ef4444"; // red
};

const chunkProjects = (projects: Project[], size: number = 3): Project[][] => {
  const chunks: Project[][] = [];
  for (let i = 0; i < projects.length; i += size) {
    chunks.push(projects.slice(i, i + size));
  }
  return chunks;
};

const ActiveProjects: React.FC = () => {
  const projectChunks = chunkProjects(projects);

  return (
    <Box>
      <SectionHeader
        title="Active Projects"
        actionText="View All Projects"
      />
      
      <VStack gap={6} align="stretch">
        {projectChunks[0]?.slice(0, 3).map((project: Project, idx: number) => (
          <Link key={project.title + idx} href={`/projects/${project.title}`}>
            <Box
              p={4}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              bg="white"
              _hover={{ shadow: "md", borderColor: "blue.200" }}
              transition="all 0.2s"
              cursor="pointer"
              color="gray.900"
            >
              <Flex justify="space-between" align="start" mb={3}>
                <Box>
                  <Text fontWeight="semibold" fontSize="md">
                    {project.title}
                  </Text>
                  {project.provider && (
                    <Text fontSize="sm" color="gray.600" mt={1}>
                      Provider: {project.provider}
                    </Text>
                  )}
                </Box>
                <Badge 
                  bg={project.badgeBg || "blue.100"} 
                  color={project.badgeColor || "blue.600"}
                  fontWeight="semibold"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  {project.status}
                </Badge>
              </Flex>
              
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" color="gray.600">Progress</Text>
                  <Text fontSize="sm" fontWeight="medium">{project.progress}%</Text>
                </Flex>
                <Progress.Root value={project.progress} max={100} w="full">
                  <Progress.Track bg="gray.200" h="6px" borderRadius="full">
                    <Progress.Range 
                      bg={getProgressColor(project.progress)} 
                      borderRadius="full" 
                      transition="width 0.6s ease" 
                    />
                  </Progress.Track>
                </Progress.Root>
              </Box>
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default ActiveProjects;
