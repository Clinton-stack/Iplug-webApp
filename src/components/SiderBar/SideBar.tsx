"use client";

import { Box, Flex, IconButton, Text, VStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/SidebarData";
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from "react-icons/ri";
import React, { useEffect, useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  setCollapsed, 
  isMobile = false, 
  mobileMenuOpen = false, 
  setMobileMenuOpen 
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle link clicks on mobile - close the menu
  const handleLinkClick = () => {
    if (isMobile && setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  if (!mounted) {
    // Return a simplified version during SSR to prevent hydration mismatch
    return (
      <Box
        as="aside"
        w="260px"
        h="100vh"
        position="fixed"
        bg="linear-gradient(180deg, #3BA3F5 0%, #197FCF 100%)"
        display="flex"
        flexDirection="column"
        boxShadow="2xl"
        zIndex={999}
        borderRight="1px solid rgba(255,255,255,0.1)"
      >
        <Box h="70px" />
      </Box>
    );
  }

  // Calculate sidebar width
  let sidebarWidth: string;
  if (isMobile) {
    sidebarWidth = "260px";
  } else {
    sidebarWidth = collapsed ? "70px" : "260px";
  }

  return (
    <Box
      as="aside"
      w={sidebarWidth}
      transition="all 0.3s ease-in-out"
      h="100vh"
      position="fixed"
      bg="linear-gradient(180deg, #3BA3F5 0%, #197FCF 100%)"
      display="flex"
      flexDirection="column"
      boxShadow="2xl"
      zIndex={999}
      borderRight="1px solid rgba(255,255,255,0.1)"
      data-sidebar="true"
    >
      {/* Header */}
      <Flex
        align="center"
        justify={collapsed && !isMobile ? "center" : "space-between"}
        p={3}
        borderBottom="1px solid rgba(255,255,255,0.1)"
        bg="rgba(255,255,255,0.05)"
        transition="all 0.2s ease-in-out"
        h="70px"
        minH="70px"
        flexShrink={0}
      >
        {(!collapsed || isMobile) && (
          <Image 
            src="/images/IngeniousplugLogo.png" 
            alt="Ingenious Plug Logo" 
            maxH="50px" 
            maxW="140px" 
            objectFit="contain" 
          />
        )}
        <IconButton 
          aria-label="Toggle Sidebar" 
          size="sm"
          onClick={() => {
            if (isMobile) {
              setMobileMenuOpen?.(false);
            } else {
              setCollapsed(!collapsed);
            }
          }}
          color="white" 
          bg="rgba(255,255,255,0.1)"
          _hover={{ bg: "rgba(255,255,255,0.2)" }}
          _active={{ bg: "rgba(255,255,255,0.3)" }}
        >
          {isMobile ? (
            <RiMenuFold2Fill size={18} />
          ) : collapsed ? (
            <RiMenuUnfold2Fill size={18} />
          ) : (
            <RiMenuFold2Fill size={18} />
          )}
        </IconButton>
      </Flex>

      {/* Navigation */}
      <Box 
        flex="1" 
        overflowY="auto" 
        overflowX="hidden"
        className="sidebar-scrollbar"
      >
        <VStack align="stretch" gap={0} py={4}>
          {navItems.map((section, sectionIndex) => (
            <Box key={section.heading} mb={sectionIndex < navItems.length - 1 ? 6 : 0}>
              {!collapsed && !isMobile && (
                <Text 
                  fontSize="xs" 
                  fontWeight="bold" 
                  color="rgba(255,255,255,0.7)" 
                  px={4} 
                  mb={3}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {section.heading}
                </Text>
              )}
              <VStack align="stretch" gap={1} px={2}>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const IconComponent = item.icon;
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      style={{ textDecoration: 'none' }}
                      onClick={handleLinkClick}
                    >
                      <Box title={collapsed ? item.label : ''}>
                        <Flex
                          position="relative"
                          align="center"
                          justify={collapsed && !isMobile ? "center" : "flex-start"}
                          py={3}
                          px={collapsed && !isMobile ? 2 : 4}
                          mx={1}
                          borderRadius="lg"
                          cursor="pointer"
                          bg={isActive ? "rgba(255,255,255,0.15)" : "transparent"}
                          color={isActive ? "#ffffff" : "rgba(255,255,255,0.8)"}
                          transition="all 0.2s ease-in-out"
                          _hover={{
                            bg: "rgba(255,255,255,0.1)",
                            color: "#ffffff",
                            transform: "translateX(4px)",
                          }}
                          className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                          borderLeft={isActive ? "3px solid #ffffff" : "3px solid transparent"}
                        >
                          <Box 
                            fontSize={collapsed && !isMobile ? "xl" : "lg"}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            minW={collapsed && !isMobile ? "auto" : "20px"}
                          >
                            <IconComponent />
                          </Box>

                          {(!collapsed || isMobile) && (
                            <Text 
                              ml={3} 
                              fontSize="sm" 
                              fontWeight="medium"
                              whiteSpace="nowrap"
                              overflow="hidden"
                            >
                              {item.label}
                            </Text>
                          )}
                        </Flex>
                      </Box>
                    </Link>
                  );
                })}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
      
      {/* Footer */}
      {(!collapsed || isMobile) && (
        <Box 
          px={4} 
          py={3} 
          borderTop="1px solid rgba(255,255,255,0.1)"
          bg="rgba(0,0,0,0.1)"
          flexShrink={0}
        >
          <Text 
            fontSize="xs" 
            color="rgba(255,255,255,0.6)" 
            textAlign="center"
          >
            Ingenious Plug © 2025
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
