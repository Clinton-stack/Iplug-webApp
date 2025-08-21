"use client";

import { Box, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";

export default function RequestListCard({ item, onClick }) {
  return (
    <Box p={4} rounded="md" shadow="sm" cursor="pointer" onClick={onClick}>
      <HStack spacing={4} align="flex-start">
        {/* Content */}
        <VStack align="start" spacing={1} flex="1">
          <Text fontWeight="bold">{item.title}</Text>
          <Text fontSize="sm" color="gray.500">
            by {item.requester?.name}
          </Text>

          <Text fontSize="xs" color="gray.400">
            Category: {item.category} → {item.service}
          </Text>
          <Text fontSize="sm" mt={1}>
            {item.description}
          </Text>
          <Text fontSize="xs" color="gray.500">
            Specification: {item.specification}
          </Text>
          <Text color="green.500" fontWeight="bold" mt={1}>
            Budget: ₦{item.budget?.toLocaleString()} ({item.paymentType})
          </Text>
          <Text fontSize="xs">
            Engagement: {item.engagementType} | Deadline: {item.deadline}
          </Text>
        </VStack>

        {/* Action Button */}
        <Flex>
          <PrimaryButton name="Place Bid" bgColor="#197FCF" w="100px" />
        </Flex>
      </HStack>
    </Box>
  );
}
