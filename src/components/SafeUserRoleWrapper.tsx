'use client';

import React, { Component, ReactNode } from 'react';
import { Box, Text, VStack, Button, Card, Icon } from '@chakra-ui/react';
import { AlertTriangle, Home } from 'lucide-react';

interface SafeUserRoleWrapperProps {
  children: ReactNode;
}

interface SafeUserRoleWrapperState {
  hasError: boolean;
  error: Error | null;
}

// Class component to catch context errors
class SafeUserRoleWrapper extends Component<SafeUserRoleWrapperProps, SafeUserRoleWrapperState> {
  constructor(props: SafeUserRoleWrapperProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SafeUserRoleWrapperState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SafeUserRoleWrapper caught an error:', error, errorInfo);
    
    // Check if it's a UserRoleProvider error
    if (error.message.includes('useUserRole must be used within a UserRoleProvider')) {
      console.log('UserRoleProvider context error detected');
    }
  }

  render() {
    if (this.state.hasError) {
      return <ContextErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ContextErrorFallbackProps {
  error: Error | null;
}

const ContextErrorFallback: React.FC<ContextErrorFallbackProps> = ({ error }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/home';
  };

  const isPermissionError = error?.message.includes('useUserRole must be used within a UserRoleProvider') ||
                           error?.message.includes('permission') ||
                           error?.message.includes('unauthorized');

  return (
    <Box 
      minH="calc(100vh - 140px)" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      p={8}
      bg="gray.50"
    >
      <Card.Root maxW="md" w="full" textAlign="center">
        <Card.Body p={8}>
          <VStack gap={6}>
            <Box
              p={4}
              borderRadius="full"
              bg={isPermissionError ? "orange.100" : "red.100"}
            >
              <Icon
                boxSize={8}
                color={isPermissionError ? "orange.600" : "red.600"}
              >
                <AlertTriangle />
              </Icon>
            </Box>

            <VStack gap={2}>
              <Text fontSize="xl" fontWeight="bold" color="gray.900">
                {isPermissionError ? "Authentication Error" : "Something went wrong"}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {isPermissionError 
                  ? "There was an issue loading your user settings. Please try refreshing the page or go back to home."
                  : "An unexpected error occurred. Please try again."
                }
              </Text>
            </VStack>

            <VStack gap={3} w="full">
              <Button
                onClick={handleRefresh}
                colorScheme="blue"
                w="full"
              >
                Refresh Page
              </Button>
              <Button
                onClick={handleGoHome}
                variant="outline"
                w="full"
              >
                <Home size={16} />
                Go to Home
              </Button>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default SafeUserRoleWrapper;
