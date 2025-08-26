"use client";

import {
  Container,
  VStack,
  Text,
  Button,
  Heading,
  Icon,
  Box,
} from "@chakra-ui/react";
import {
  FiLock,
  FiUsers,
  FiHome,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useUserRole, UserRole } from "@/contexts/UserRoleContext";

const MotionBox = motion.create(Box);

interface AccessRestrictionProps {
  requiredRole: UserRole;
  pageName: string;
  description?: string;
  showRoleToggle?: boolean;
  showHomeButton?: boolean;
}

const AccessRestriction: React.FC<AccessRestrictionProps> = ({
  requiredRole,
  pageName,
  description,
  showRoleToggle = true,
  showHomeButton = true,
}) => {
  const { userRole, toggleUserRole } = useUserRole();

  const defaultDescriptions = {
    Requester: `This page is only available for users in Requester mode. Switch to Requester mode to access ${pageName}.`,
    Provider: `This page is only available for users in Provider mode. Switch to Provider mode to access ${pageName}.`,
  };

  const finalDescription = description || defaultDescriptions[requiredRole];

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="center" justify="center" minH="60vh">
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          maxW="lg"
        >
          <Icon as={FiLock} boxSize={16} color="gray.400" mb={4} />
          
          <Heading size="lg" color="gray.600" mb={2}>
            Access Restricted
          </Heading>
          
          <Text color="gray.500" fontSize="lg" mb={6} lineHeight="1.6">
            {finalDescription}
          </Text>

          <VStack gap={3} align="center">
            {showRoleToggle && (
              <Button
                colorPalette="blue"
                size="lg"
                onClick={toggleUserRole}
                minW="200px"
              >
                <FiUsers />
                Switch to {requiredRole} Mode
              </Button>
            )}
            
            {showHomeButton && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/home'}
                minW="200px"
              >
                <FiHome />
                Go to Home
              </Button>
            )}
          </VStack>

          {showRoleToggle && (
            <Text fontSize="sm" color="gray.400" mt={4}>
              You are currently in <Text as="span" fontWeight="semibold">{userRole}</Text> mode
            </Text>
          )}
        </MotionBox>
      </VStack>
    </Container>
  );
};

export default AccessRestriction;
