"use client";

import React from 'react';
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import inboxData from "@/constants/InboxData";
import SectionHeader from './SectionHeader';

interface InboxMessage {
  id: number;
  sender: string;
  preview: string;
  avatar: string;
  time: string;
}

const Inbox: React.FC = () => {
  const messages = inboxData as InboxMessage[];

  return (
    <Box>
      <SectionHeader title="Messages" actionText="View All" />

      <VStack gap={4} align="stretch">
        {messages.slice(0, 4).map((message) => (
          <Flex
            key={message.id}
            p={3}
            borderRadius="md"
            border="1px"
            borderColor="gray.200"
            bg="white"
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            transition="all 0.2s"
            justify="space-between"
            align="start"
          >
            <Box flex="1" mr={3}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.800" truncate>
                {message.sender}
              </Text>
              <Text fontSize="xs" color="gray.500" truncate>
                {message.preview}
              </Text>
            </Box>
            <Text fontSize="xs" color="gray.400" whiteSpace="nowrap" flexShrink={0}>
              {message.time}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Inbox;
