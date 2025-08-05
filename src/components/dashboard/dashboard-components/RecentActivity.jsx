"use client";

import { Box, Text, VStack, Flex, Spacer, Link } from "@chakra-ui/react";
import recentActivities from "@/constants/recentActivities";
import SectionHeader from "./SectionHeader"; 

const RecentActivities = () => {
  return (
    <Box>
      <SectionHeader title="Recent Activities" actionText="View All" />

      <VStack spacing={4} align="stretch" mt={4}>
        {recentActivities.map(({ id, activity, time }, index) => (
          <Flex
            key={id}
            p={3}
            rounded="md"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            bg={index % 2 === 0 ? "white" : "gray.100"} 
            align="center"
          >
            <Text fontSize="sm" color="gray.700" isTruncated>
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
