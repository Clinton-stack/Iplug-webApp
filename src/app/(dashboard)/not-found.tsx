"use client";

import React from "react";
import { Box, VStack, Heading, Text, Button, Icon, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiHome, FiSearch, FiMessageSquare, FiUser } from "react-icons/fi";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function DashboardNotFound() {
  const router = useRouter();

  const quickLinks = [
    { icon: FiHome, label: "Dashboard", href: "/home" },
    { icon: FiSearch, label: "Explore Services", href: "/explore-services" },
    { icon: FiMessageSquare, label: "Messages", href: "/messages" },
    { icon: FiUser, label: "Profile", href: "/profile" },
  ];

  return (
    <Box 
      minH="calc(100vh - 140px)" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      px={5}
      py={10}
    >
      <VStack gap={8} align="center" textAlign="center" maxW="2xl">
        {/* 404 Number with Animation */}
        <Box position="relative">
          <Text
            fontSize={{ base: "8xl", md: "9xl" }}
            fontWeight="bold"
            background="linear-gradient(135deg, #3BA3F5 0%, #197FCF 100%)"
            backgroundClip="text"
            color="transparent"
            lineHeight="0.8"
            userSelect="none"
          >
            404
          </Text>
          <Box
            position="absolute"
            top="-10px"
            right="-10px"
            w="20px"
            h="20px"
            bg="red.400"
            borderRadius="full"
            animation="pulse 2s infinite"
          />
        </Box>

        {/* Error Message */}
        <VStack gap={4}>
          <Heading
            as="h1"
            size="xl"
            color="gray.800"
            fontWeight="bold"
          >
            Page Not Found
          </Heading>
          
          <Text
            fontSize="lg"
            color="gray.600"
            maxW="md"
            lineHeight="relaxed"
          >
            The dashboard page you&apos;re looking for doesn&apos;t exist. 
            Let&apos;s get you back to managing your services and projects.
          </Text>
        </VStack>

        {/* Primary Actions */}
        <VStack gap={3} w="full" maxW="sm">
          <PrimaryButton
            name="Back to Dashboard"
            bgColor="#197FCF"
            color="white"
            size="lg"
            onClick={() => router.push("/home")}
            width="full"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          />

          <Button
            size="lg"
            variant="ghost"
            color="gray.600"
            w="full"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </VStack>

        {/* Quick Navigation */}
        <Box>
          <Text fontSize="sm" color="gray.500" mb={4}>
            Quick Navigation:
          </Text>
          <VStack gap={3}>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <HStack
                  p={3}
                  borderRadius="lg"
                  _hover={{
                    bg: "gray.50",
                    transform: "translateX(4px)",
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                  w="250px"
                  justify="flex-start"
                >
                  <Box
                    p={2}
                    borderRadius="md"
                    bg="blue.50"
                    color="blue.500"
                  >
                    <Icon as={link.icon} />
                  </Box>
                  <Text fontWeight="medium" color="gray.700">
                    {link.label}
                  </Text>
                </HStack>
              </Link>
            ))}
          </VStack>
        </Box>

        {/* Help Text */}
        <Box
          bg="blue.50"
          p={4}
          borderRadius="lg"
          borderLeft="4px solid"
          borderColor="blue.400"
          maxW="md"
        >
          <Text fontSize="sm" color="blue.700">
            <strong>Need help?</strong> If you believe this page should exist, 
            please contact our support team or check if you have the correct permissions.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
