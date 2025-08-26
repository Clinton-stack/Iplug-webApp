"use client";

import React, { Component, ReactNode } from "react";
import { 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Icon, 
  Box,
  Code,
  Collapsible
} from "@chakra-ui/react";
import { FiAlertTriangle, FiRefreshCw, FiHome, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxW="7xl" py={8}>
          <VStack gap={8} align="center" justify="center" minH="80vh">
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              textAlign="center"
              maxW="2xl"
            >
              <Icon as={FiAlertTriangle} boxSize={16} color="red.400" mb={4} />
              
              <Heading size="xl" color="gray.700" mb={2}>
                Something went wrong
              </Heading>
              
              <Text color="gray.500" fontSize="lg" mb={6} lineHeight="1.6">
                We encountered an unexpected error while loading this page. 
                Don't worry, your data is safe and this issue has been logged for review.
              </Text>

              <VStack gap={3} align="center" mb={6}>
                <Button
                  colorPalette="blue"
                  size="lg"
                  onClick={this.handleReset}
                  minW="200px"
                >
                  <FiRefreshCw />
                  Try Again
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/home'}
                  minW="200px"
                >
                  <FiHome />
                  Go to Dashboard
                </Button>
              </VStack>

              {/* Error Details (for development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box w="full" textAlign="left">
                  <Collapsible.Root>
                    <Collapsible.Trigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        color="gray.600"
                        mb={3}
                      >
                        <FiChevronDown />
                        Show Error Details
                      </Button>
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      <Box
                        p={4}
                        bg="red.50"
                        border="1px solid"
                        borderColor="red.200"
                        borderRadius="lg"
                      >
                        <Text fontWeight="semibold" color="red.700" mb={2}>
                          Error Message:
                        </Text>
                        <Code colorPalette="red" fontSize="sm" mb={4} display="block" p={2}>
                          {this.state.error.message}
                        </Code>
                        
                        {this.state.error.stack && (
                          <>
                            <Text fontWeight="semibold" color="red.700" mb={2}>
                              Stack Trace:
                            </Text>
                            <Code 
                              colorPalette="red" 
                              fontSize="xs" 
                              display="block" 
                              p={2}
                              whiteSpace="pre-wrap"
                              maxH="200px"
                              overflowY="auto"
                            >
                              {this.state.error.stack}
                            </Code>
                          </>
                        )}
                      </Box>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Box>
              )}

              <Text fontSize="sm" color="gray.400" mt={6}>
                If this problem persists, please contact our support team with the error details above.
              </Text>
            </MotionBox>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
