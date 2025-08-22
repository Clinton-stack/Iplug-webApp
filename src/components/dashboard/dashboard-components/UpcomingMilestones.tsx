"use client";

import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import SectionHeader from "./SectionHeader";


const milestones = [
    { id: 1, day: "12", month: "Aug", title: "Design Review", project: "Corporate Website" },
    { id: 2, day: "18", month: "Aug", title: "App Launch", project: "Mobile App UI/UX" },
    { id: 3, day: "25", month: "Aug", title: "Final Branding", project: "Brand Logo Design" },
    { id: 4, day: "30", month: "Aug", title: "Sprint Planning", project: "Internal Tools" },
  ];
  
const UpcomingMilestones = () => {
  return (
    <Box>
      <SectionHeader title="Upcoming Milestones" />

      <VStack gap={4} align="stretch" as="ul" listStyleType="none" m={0} p={0}>
        {milestones.map((m) => (
          <Flex key={m.id} as="li" align="flex-start" gap={3}>
            <Flex w="40px" h="40px" flexShrink={0} direction="column" align="center" justify="center" bg="gray.100" borderRadius="lg" userSelect="none">
              <Text fontSize="xs" fontWeight="bold" color="#004592" lineHeight="1">
                {m.day}
              </Text>
              <Text fontSize="xs" color="gray.500" lineHeight="1">
                {m.month}
              </Text>
            </Flex>

            <Box>
              <Text fontWeight="semibold" fontSize="sm" color="gray.800" lineHeight="1.2">
                {m.title}
              </Text>
              <Text fontSize="xs" color="gray.500" lineHeight="1.2">
                {m.project}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default UpcomingMilestones;
