import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const IngeniousPay = ({buttonName}) => {
  return (
    <Box w="100%" h="100%">
      <Text fontSize="lg" fontWeight="bold" color="gray.900" mb={4}>
        IngeniousPay
      </Text>
      <Flex direction="column" justifyContent="space-between" alignItems="center" h="100%">
        <Box>
          <Box mb={3}>
            <Text fontSize="clamp(12px, 1.2vw, 14px)" color="gray.500">
              Available Balance
            </Text>
            <Text fontSize="clamp(20px, 2.0vw, 22px)" fontWeight="bold" color="green">
              $75,000.00
            </Text>
          </Box>
          <Box mb={3}>
            <Text fontSize="clamp(12px, 1.2vw, 14px)" color="gray.500">
              Pending Payous
            </Text>
            <Text fontSize="clamp(20px, 2.0vw, 22px)" fontWeight="bold" color="gray.800">
              $125,000.00
            </Text>
          </Box>

          <Box mb={3}>
            <Text fontSize="clamp(12px, 1.2vw, 14px)" color="gray.500">
              Funds in Escrow
            </Text>
            <Text fontSize="clamp(20px, 2.0vw, 22px)" fontWeight="bold" color="gray.800">
              $25,000.00
            </Text>
          </Box>
        </Box>

        <PrimaryButton name={buttonName} bgColor="#197FCF" color="white" />
      </Flex>
    </Box>
  );
};

export default IngeniousPay;
