'use client';

import { Box, Text, VStack, Button, Card, Icon } from '@chakra-ui/react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error | null;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error }) => {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push('/home');
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
                {isPermissionError ? "Access Restricted" : "Something went wrong"}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {isPermissionError 
                  ? "You don't have permission to access this page, or there was an issue loading your user settings."
                  : "An unexpected error occurred. Please try again."
                }
              </Text>
            </VStack>

            {error && (
              <Box
                bg="gray.100"
                p={4}
                borderRadius="md"
                w="full"
                textAlign="left"
              >
                <Text fontSize="xs" color="gray.700" fontFamily="mono">
                  Error: {error.message}
                </Text>
              </Box>
            )}

            <VStack gap={3} w="full">
              <Button
                onClick={handleRefresh}
                colorScheme="blue"
                w="full"
              >
                <RefreshCw size={16} />
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

// Hook version for functional components
export const useErrorHandler = () => {
  const router = useRouter();

  const handleError = React.useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error);
    
    const isPermissionError = error.message.includes('useUserRole must be used within a UserRoleProvider') ||
                             error.message.includes('permission') ||
                             error.message.includes('unauthorized');

    if (isPermissionError) {
      // Redirect to home or login
      router.push('/home');
    }
  }, [router]);

  return { handleError };
};

export default ErrorBoundary;
