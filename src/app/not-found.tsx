"use client";

import React from "react";
import { Box, VStack, Heading, Text, Button, Image, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxW="4xl" py={16}>
      <VStack gap={8} align="center" textAlign="center">
        {/* 404 Illustration */}
        <Box position="relative">
          <Text
            fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }}
            fontWeight="bold"
            color="gray.200"
            lineHeight="1"
            userSelect="none"
          >
            404
          </Text>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Image
              src="/images/IngeniousplugLogo.png"
              alt="Ingenious Plug"
              maxW="120px"
              maxH="80px"
              objectFit="contain"
              opacity={0.7}
            />
          </Box>
        </Box>

        {/* Error Content */}
        <VStack gap={4} maxW="lg">
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }}
            color="gray.800"
            fontWeight="bold"
          >
            Oops! Page Not Found
          </Heading>
          
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.600"
            lineHeight="tall"
          >
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track to find the services you need.
          </Text>
        </VStack>

        {/* Action Buttons */}
        <VStack gap={4} w="full" maxW="sm">
          <Button
            size="lg"
            bg="linear-gradient(135deg, #3BA3F5 0%, #197FCF 100%)"
            color="white"
            _hover={{
              bg: "linear-gradient(135deg, #2B8CE5 0%, #0F6FBF 100%)",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            _active={{
              transform: "translateY(0)",
            }}
            w="full"
            borderRadius="xl"
            fontWeight="semibold"
            onClick={() => router.push("/home")}
          >
            Go to Dashboard
          </Button>

          <Button
            size="lg"
            variant="outline"
            borderColor="gray.300"
            color="gray.700"
            _hover={{
              bg: "gray.50",
              borderColor: "gray.400",
            }}
            w="full"
            borderRadius="xl"
            fontWeight="semibold"
            onClick={() => router.push("/explore-services")}
          >
            Explore Services
          </Button>
        </VStack>

        {/* Help Links */}
        <VStack gap={2}>
          <Text fontSize="sm" color="gray.500">
            Need help? Try these popular pages:
          </Text>
          <Box display="flex" gap={6} flexWrap="wrap" justifyContent="center">
            <Link href="/home">
              <Text
                fontSize="sm"
                color="blue.500"
                _hover={{ color: "blue.600", textDecoration: "underline" }}
                cursor="pointer"
              >
                Home
              </Text>
            </Link>
            <Link href="/explore-services">
              <Text
                fontSize="sm"
                color="blue.500"
                _hover={{ color: "blue.600", textDecoration: "underline" }}
                cursor="pointer"
              >
                Services
              </Text>
            </Link>
            <Link href="/messages">
              <Text
                fontSize="sm"
                color="blue.500"
                _hover={{ color: "blue.600", textDecoration: "underline" }}
                cursor="pointer"
              >
                Messages
              </Text>
            </Link>
            <Link href="/profile">
              <Text
                fontSize="sm"
                color="blue.500"
                _hover={{ color: "blue.600", textDecoration: "underline" }}
                cursor="pointer"
              >
                Profile
              </Text>
            </Link>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
}
