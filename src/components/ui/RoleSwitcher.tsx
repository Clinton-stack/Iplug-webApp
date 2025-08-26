"use client";

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Switch,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FiUser, FiBriefcase } from 'react-icons/fi';
import { useUserRole } from '@/contexts/UserRoleContext';

const RoleSwitcher: React.FC = () => {
  const { userRole, toggleUserRole } = useUserRole();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const activeColor = useColorModeValue('blue.500', 'blue.300');
  const inactiveColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            User Role
          </Text>
          <Text fontSize="sm" color="gray.600">
            Switch between Requester and Provider modes to access different features
          </Text>
        </Box>

        <Flex
          p={4}
          bg={useColorModeValue('gray.50', 'gray.700')}
          borderRadius="md"
          align="center"
          justify="space-between"
        >
          <HStack spacing={4} flex="1">
            {/* Requester Option */}
            <Flex
              align="center"
              justify="center"
              direction="column"
              p={3}
              borderRadius="md"
              bg={userRole === 'Requester' ? activeColor : 'transparent'}
              color={userRole === 'Requester' ? 'white' : inactiveColor}
              transition="all 0.2s"
              flex="1"
            >
              <Icon as={FiUser} boxSize={6} mb={1} />
              <Text fontSize="sm" fontWeight="medium">
                Requester
              </Text>
              {userRole === 'Requester' && (
                <Badge colorScheme="white" size="sm" mt={1}>
                  Active
                </Badge>
              )}
            </Flex>

            {/* Switch */}
            <Box px={2}>
              <Switch
                isChecked={userRole === 'Provider'}
                onChange={toggleUserRole}
                colorScheme="blue"
                size="lg"
              />
            </Box>

            {/* Provider Option */}
            <Flex
              align="center"
              justify="center"
              direction="column"
              p={3}
              borderRadius="md"
              bg={userRole === 'Provider' ? activeColor : 'transparent'}
              color={userRole === 'Provider' ? 'white' : inactiveColor}
              transition="all 0.2s"
              flex="1"
            >
              <Icon as={FiBriefcase} boxSize={6} mb={1} />
              <Text fontSize="sm" fontWeight="medium">
                Provider
              </Text>
              {userRole === 'Provider' && (
                <Badge colorScheme="white" size="sm" mt={1}>
                  Active
                </Badge>
              )}
            </Flex>
          </HStack>
        </Flex>

        <Box>
          <Text fontSize="xs" color="gray.500">
            <strong>Current Role:</strong> {userRole}
            <br />
            {userRole === 'Requester' 
              ? 'Access to service browsing, messaging, and hiring providers'
              : 'Access to job management, client communication, and earnings tracking'
            }
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default RoleSwitcher;
