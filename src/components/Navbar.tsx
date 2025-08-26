import {Flex, HStack, Icon, Image, Input, InputGroup, Menu, Portal, Switch, Text, IconButton, Box } from "@chakra-ui/react";
import React from "react";
import { FaChevronDown, FaUserCog, FaSignOutAlt} from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import { LuMessageSquareMore, LuSearch } from "react-icons/lu";
import { RiMenuFill } from "react-icons/ri";
import { useUserRole } from "@/contexts/UserRoleContext";

interface NavbarProps {
  isMobile?: boolean;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isMobile = false, 
  mobileMenuOpen = false, 
  setMobileMenuOpen 
}) => {
  const { isProvider, toggleUserRole, userRole } = useUserRole();

  return (
    <Flex align="center" justify="space-between" h="70px" w="full" px={4} bg="#F8FAFB" boxShadow="xs">
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          aria-label="Toggle Mobile Menu"
          onClick={() => setMobileMenuOpen?.(!mobileMenuOpen)}
          variant="ghost"
          color="#197FCF"
          mr={2}
        >
          <RiMenuFill size={20} />
        </IconButton>
      )}

      {/* Search */}
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input 
          placeholder="Search" 
          borderRadius="full" 
          maxW={isMobile ? "200px" : "450px"} 
          bgColor="#f5f5f5" 
          fontSize={isMobile ? "sm" : "md"}
        />
      </InputGroup>

      {/* Right Section */}
      <Flex align="center" gap={isMobile ? 3 : 5} ml={2}>
        {/* Role Badge */}
        {!isMobile && (
          <Flex 
            align="center" 
            px={3} 
            py={1.5}
            borderRadius="full" 
            bg={isProvider ? "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)" : "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)"}
            border={`2px solid ${isProvider ? "#197FCF" : "#9C27B0"}`}
            transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            transform="scale(1)"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: `0 4px 12px ${isProvider ? "rgba(25, 127, 207, 0.25)" : "rgba(156, 39, 176, 0.25)"}`
            }}
            position="relative"
            overflow="hidden"
          >
            {/* Subtle shine effect */}
            <Box
              position="absolute"
              top="0"
              left="-100%"
              width="100%"
              height="100%"
              background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
              animation="shine 3s infinite"
              pointerEvents="none"
            />
            <Text 
              fontSize="xs" 
              fontWeight="bold" 
              color={isProvider ? "#197FCF" : "#9C27B0"}
              textTransform="uppercase"
              letterSpacing="wider"
              position="relative"
              zIndex={1}
            >
              {userRole}
            </Text>
          </Flex>
        )}
        
        {!isMobile && <Icon boxSize={5} color="#197FCF" as={LuMessageSquareMore} />}
        <Icon boxSize={isMobile ? 4 : 5} color="#197FCF" as={HiOutlineBell} />

        {/* Avatar Dropdown */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex align="center" cursor="pointer">
              <Image 
                src="https://i.pravatar.cc/40?img=14" 
                h={isMobile ? "28px" : "30px"} 
                borderRadius="full" 
                mr={isMobile ? 1 : 2} 
                alt="User avatar" 
              />
              <FaChevronDown style={{ marginLeft: "6px", fontSize: isMobile ? "10px" : "12px" }} />
            </Flex>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="220px">
                <Menu.Item value="profile-settings" onSelect={() => alert("Go to profile settings")}>
                  <HStack gap={2}>
                    <FaUserCog color="#197FCF" />
                    <Text>Profile Settings</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item value="logout" onSelect={() => alert("Logout")}>
                  <HStack gap={2}>
                    <FaSignOutAlt color="#197FCF" />
                    <Text>Logout</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item value="toggle-mode">
                  <Box w="full" py={2}>
                    <Flex align="center" justify="space-between" mb={3}>
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">Switch Role:</Text>
                      <Text fontSize="xs" color="gray.500" bg="gray.50" px={2} py={1} borderRadius="md">
                        Current: {userRole}
                      </Text>
                    </Flex>
                    
                    <Flex align="center" justify="center" gap={3}>
                      <Flex align="center" gap={2}>
                        <Box 
                          w={2} 
                          h={2} 
                          bg={!isProvider ? "#197FCF" : "gray.300"} 
                          borderRadius="full"
                          transition="all 0.2s ease"
                        />
                        <Text 
                          fontSize="xs" 
                          fontWeight={!isProvider ? "bold" : "normal"}
                          color={!isProvider ? "#197FCF" : "gray.500"}
                          transition="all 0.2s ease"
                        >
                          Requester
                        </Text>
                      </Flex>
                      
                      <Switch.Root 
                        checked={isProvider} 
                        onCheckedChange={toggleUserRole} 
                        colorPalette="blue"
                        size="sm"
                      >
                        <Switch.HiddenInput />
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                      </Switch.Root>
                      
                      <Flex align="center" gap={2}>
                        <Text 
                          fontSize="xs" 
                          fontWeight={isProvider ? "bold" : "normal"}
                          color={isProvider ? "#197FCF" : "gray.500"}
                          transition="all 0.2s ease"
                        >
                          Provider
                        </Text>
                        <Box 
                          w={2} 
                          h={2} 
                          bg={isProvider ? "#197FCF" : "gray.300"} 
                          borderRadius="full"
                          transition="all 0.2s ease"
                        />
                      </Flex>
                    </Flex>
                    
                    <Text fontSize="xs" color="gray.400" textAlign="center" mt={2}>
                      {isProvider ? "Manage services & earn money" : "Find & hire service providers"}
                    </Text>
                  </Box>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </Flex>
  );
};

export default Navbar;
