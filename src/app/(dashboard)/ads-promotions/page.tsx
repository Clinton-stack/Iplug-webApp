"use client";

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useUserRole } from "@/contexts/UserRoleContext";
import AccessRestriction from "@/components/ui/AccessRestriction";

const AdsPromotionsPage: React.FC = () => {
  const { userRole } = useUserRole();

  // Role-based access control - only Providers can access this page
  if (userRole !== 'Provider') {
    return (
      <AccessRestriction
        requiredRole="Provider"
        pageName="Ads & Promotions"
        description="The Ads & Promotions page is where you can create and manage advertising campaigns to promote your services. Switch to Provider mode to advertise your services and reach more clients."
      />
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack alignItems="start" gap={6}>
        <Box>
          <Heading size="lg" color="gray.800" mb={2}>
            Ads & Promotions
          </Heading>
          <Text color="gray.600">
            Promote your services and reach more clients through targeted advertising.
          </Text>
        </Box>

        {/* Placeholder content for now */}
        <Box
          w="100%"
          p={8}
          borderRadius="lg"
          border="2px dashed"
          borderColor="gray.300"
          textAlign="center"
        >
          <Text color="gray.500" fontSize="lg" mb={2}>
            Ads & Promotions Dashboard
          </Text>
          <Text color="gray.400" fontSize="sm">
            This page is under development. Soon you'll be able to create and manage promotional campaigns for your services.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdsPromotionsPage;
