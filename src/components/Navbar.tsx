import {Flex, HStack, Icon, Image, Input, InputGroup, Menu, Portal, Switch, Text, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown, FaUserCog, FaSignOutAlt,} from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import { LuMessageSquareMore, LuSearch } from "react-icons/lu";
import { RiMenuFill } from "react-icons/ri";

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
  const [isProvider, setIsProvider] = useState(false);



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
                  <Switch.Root checked={isProvider} onCheckedChange={() => setIsProvider((prev) => !prev)} colorPalette="blue">
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label fontWeight="semibold">{isProvider ? "Provider" : "Requester"}</Switch.Label>
                  </Switch.Root>
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
