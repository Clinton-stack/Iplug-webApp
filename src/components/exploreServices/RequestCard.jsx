import { Box, Text, Flex, HStack, Badge } from "@chakra-ui/react";
import PrimaryButton from "../ui/PrimaryButton";

export default function RequestCard({ item, onClick }) {

  return (
    <Box p={4} rounded="md" shadow="sm" bg="white" cursor="pointer" onClick={onClick}>
      <Text fontWeight="bold" fontSize="lg">
        {item.title}
      </Text>
      <Text fontSize="sm" color="gray.600" mt={1}>
        {item.description}
      </Text>

      <HStack spacing={3} mt={2} wrap="wrap">
        <Badge colorScheme="blue">{item.category}</Badge>
        <Badge colorScheme="green">{item.service}</Badge>
        <Badge colorScheme="purple">{item.engagementType}</Badge>
      </HStack>

      <Text mt={2} fontSize="sm" color="gray.500">
        By {item.requester?.name || "Unknown"} ⭐ {item.requester?.rating ?? "N/A"} ({item.requester?.totalRequests ?? 0} requests)
      </Text>

      <Text mt={1} fontWeight="bold" color="blue.600">
        Budget: ₦{item.budget.toLocaleString()} ({item.paymentType})
      </Text>

      <Text fontSize="sm" color="red.500">
        Deadline: {new Date(item.deadline).toLocaleDateString()}
      </Text>

      <Flex justify="flex-end" mt={3}>
        <PrimaryButton name="Bid" bgColor="#197FCF" w="80px" />
      </Flex>
    </Box>
  );
}
