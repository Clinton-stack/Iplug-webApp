"use client";

import { Box, Text, Image, HStack, VStack, Flex, Divider } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";

export default function ServiceListCard({ item, role, onClick }) {
  return (
    <Box p={4} rounded="md" shadow="sm"  cursor="pointer" onClick={onClick}>
      <HStack spacing={4} align="flex-start">
        {/* Image */}
        <Image src={item.image} alt={item.title} boxSize="100px" rounded="md" objectFit="cover" />

        {/* Content */}
        <VStack align="start" spacing={1} flex="1">
          <Text fontWeight="bold">{item.title}</Text>
          <Text fontSize="sm" color="gray.500">
            by {item.provider || item.postedBy}
          </Text>

          {role === "requester" && (
            <>
              <Text fontSize="xs" color="gray.400">
                Category: {item.category} → {item.subcategory}
              </Text>
              <HStack spacing={1}>
                <Text color="yellow.500">⭐ {item.rating}</Text>
                <Text fontSize="xs" color="gray.500">
                  ({item.reviews} reviews)
                </Text>
              </HStack>
              <Text color="green.500" fontWeight="bold">
                ₦{(item.pricePerTask || item.price || 0).toLocaleString()}/task
                {" | "}₦{(item.pricePerHour || 0).toLocaleString()}/hr
              </Text>
              <Text fontSize="xs">
                {item.deliveries} deliveries | Languages: {item.languages?.join(", ")}
              </Text>
              <Text fontSize="xs" color={item.availability?.toLowerCase().includes("available") ? "green.500" : "orange.500"}>
                {item.availability}
              </Text>
            </>
          )}
        </VStack>

        {/* Button on the right */}
        {role === "requester" && (
          <Flex>
            <PrimaryButton name="Request" bgColor="#197FCF" w="80px" />
          </Flex>
        )}
      </HStack>
    </Box>
  );
}
