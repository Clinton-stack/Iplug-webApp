"use client";

import { Box, Flex, IconButton, Text, VStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/SidebarData";
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from "react-icons/ri";
import { Tooltip } from "../ui/tooltip";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();

  return (
    <Box
      as="aside"
      w={collapsed ? "70px" : "260px"}
      transition="all 0.3s ease-in-out"
      h="100vh"
      position="fixed"
      bg="linear-gradient(to bottom, #3BA3F5 0%, #197FCF 40%)"
    >
      {/* Header */}
      <Flex
        align="center"
        justify={collapsed ? "center" : "space-between"}
        p={3}
        borderBottom="1px solid"
        borderColor="gray.200"
        bgColor="#F5f5f5"
        transition="all 0.2s ease-in-out"
        boxShadow={"md"}
        h="70px"
        maxH="70px"
      >
        {!collapsed && <Image src="/images/IngeniousplugLogo.png" alt="Logo" boxSize="70px" objectFit="contain" w="100px" />}
        <IconButton aria-label="Toggle Sidebar" size="2xl" onClick={() => setCollapsed(!collapsed)} color="#197FCF" bg={"transparent"}>
          {collapsed ? <RiMenuFold2Fill /> : <RiMenuUnfold2Fill />}
        </IconButton>
      </Flex>

      {/* Navigation */}
      <VStack align="stretch" spacing={4} mt={4} pl={2}>
        {navItems.map((section) => (
          <Box key={section.heading}>
            {!collapsed && (
              <Text fontSize="xs" fontWeight="bold" color="gray.900" px={2} mt={2} mb={1}>
                {section.heading}
              </Text>
            )}
            <VStack align="stretch" spacing={1}>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className="sideNavLink">
                    <Tooltip showArrow content={item.label} positioning={{ placement: "right-end" }} disabled={!collapsed} openDelay={300}>
                      <Flex
                        overflow="visible"
                        position="relative"
                        align="center"
                        justify={collapsed ? "center" : "flex-start"}
                        p={2}
                        pl={collapsed ? 1 : 5}
                        borderStartRadius="full"
                        borderEnd="none"
                        cursor="pointer"
                        bg={isActive ? "#f5f5f5" : "transparent"}
                        // _hover={{ bg: "#f5f5f5", color: "#012949" }}
                        color={isActive ? "#012949" : "white"}
                        _hover={{
                          color: "#012949",
                        }}
                        className={`nav-hover-effect ${isActive ? "active" : ""}`}
                      >
                        <Box className="nav-curved-corner">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 28 86"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ stroke: "none" }}
                          >
                            <path
                              d="
        M0 24.5385
        C0 19.5513 4.04293 15.5084 9.03014 15.5084
        H26.9969
        V2.04743
        C26.4898 6.73822 22.5058 13.7844 9.03014 15.5084
        H26.9969
        V72.5391
        H9.03014
        C4.71849 72.5391 0 67.8206 0 62
        V24.5385
        Z
        M26.9969 72.5391
        H9.03014
        C22.5058 74.2631 26.4898 81.3092 26.9969 86
        V72.5391
        Z
      "
                              fill="#f5f5f5"
                              stroke="none"
                            />
                          </svg>
                        </Box>

                        <Box fontSize={collapsed ? "2xl" : "md"}>{item.icon}</Box>

                        {!collapsed && (
                          <Text ml={3} fontSize="sm" fontWeight="medium">
                            {item.label}
                          </Text>
                        )}
                      </Flex>
                    </Tooltip>
                  </Link>
                );
              })}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
