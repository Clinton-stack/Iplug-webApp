"use client";

import React from 'react';
import { Box, Text, VStack, Flex, Spacer } from "@chakra-ui/react";
import recentActivities from "@/constants/recentActivities";
import SectionHeader from "./SectionHeader";

interface RecentActivity {
  id: number;
  activity: string;
  time: string;
}

const RecentActivities: React.FC = () => {
  const activities = recentActivities as RecentActivity[];

  return (
    <Box>
      <SectionHeader title="Recent Activities" actionText="View All" />

      <VStack gap={4} align="stretch" mt={4}>
        {activities.map(({ id, activity, time }, index) => (
          <Flex
            key={id}
            p={3}
            rounded="md"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            bg={index % 2 === 0 ? "white" : "gray.100"} 
            align="center"
          >
            <Text fontSize="sm" color="gray.700" truncate>
              {activity}
            </Text>
            <Spacer />
            <Text fontSize="xs" color="gray.400" whiteSpace="nowrap" flexShrink={0}>
              {time}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default RecentActivities;
