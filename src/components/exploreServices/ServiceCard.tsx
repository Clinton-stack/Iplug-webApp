import { Box, Text, Image, HStack, Flex } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";
import React from "react";
import type { ServiceItem } from "../../types/service";

interface ServiceCardProps {
  item: ServiceItem;
  role: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, role, onClick }) => {
  return (
    <Box p={4} borderWidth="1px" rounded="md" shadow="sm" cursor="pointer" onClick={onClick}>
      <Image src={item.image} alt={item.title} rounded="md" w="full" h={150} objectFit="fit" />

      <Text fontWeight="bold" mt={2}>{item.title}</Text>
      <Text fontSize="sm" color="gray.500">by {item.provider || item.postedBy}</Text>

      {role === "requester" && (
        <>
          <Text fontSize="xs" color="gray.400">
            Category: {item.category} → {item.subcategory}
          </Text>
          <HStack gap={1} mt={1}>
            <Text color="yellow.500">⭐ {item.rating}</Text>
            <Text fontSize="xs" color="gray.500">
              ({item.reviews} reviews)
            </Text>
          </HStack>
          <Text color="green.500" fontWeight="bold" mt={1}>
            ₦{(item.pricePerTask || item.price || 0).toLocaleString()}/task
            {" | "}₦{(item.pricePerHour || 0).toLocaleString()}/hr
          </Text>
          <Text fontSize="xs" mt={1}>
            {item.deliveries} deliveries | Languages: {item.languages?.join(", ")}
          </Text>
          <Text fontSize="xs" color={item.availability?.toLowerCase().includes("available") ? "green.500" : "orange.500"}>
            {item.availability}
          </Text>
          <Flex justify="flex-end">
                <PrimaryButton name="Request" bgColor="#197FCF" w="80px" />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default ServiceCard;
