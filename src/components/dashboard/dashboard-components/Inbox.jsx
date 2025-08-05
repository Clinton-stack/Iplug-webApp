"use client";

import { Box, Text, Flex, Avatar, VStack } from "@chakra-ui/react";
import messages from "@/constants/InboxData";
import SectionHeader from "./SectionHeader";

const Inbox = () => {
  return (
    <Box>
      <SectionHeader title="Inbox" actionText="View All" />

      <VStack spacing={4} align="stretch">
        {messages.map((msg) => (
          <Flex key={msg.id} align="center" gap={3} p={2} borderRadius="lg" _hover={{ bg: "gray.50" }} cursor="pointer">
            <Avatar.Root  size="md">
              <Avatar.Fallback name={msg.sender} />
              <Avatar.Image src={msg.avatar} alt={msg.sender} />
            </Avatar.Root>
            <Box flex="1" overflow="hidden">
              <Text fontSize="sm" fontWeight="semibold" color="gray.800" isTruncated>
                {msg.sender}
              </Text>
              <Text fontSize="xs" color="gray.600" isTruncated>
                {msg.preview}
              </Text>
            </Box>
            <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">
              {msg.time}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Inbox;
