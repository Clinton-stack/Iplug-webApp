import { useUserStore } from "@/store/userStore";
import { Flex, HStack, Icon, Image, Input, InputGroup, Menu, Portal, Switch, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import { LuMessageSquareMore, LuSearch } from "react-icons/lu";

const Navbar = () => {
  const { role, setRole } = useUserStore();

  return (
    <Flex align="center" justify="space-between" h="70px" w="full" px={4} bg="#F8FAFB" boxShadow="xs">
      {/* Search */}
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input placeholder="Search" borderRadius="full" maxW="450px" bgColor="#f5f5f5" />
      </InputGroup>

      {/* Right Section */}
      <Flex align="center" gap={5} ml={2}>
        <Icon boxSize={5} color="#197FCF" as={LuMessageSquareMore} />
        <Icon boxSize={5} color="#197FCF" as={HiOutlineBell} />

        {/* Avatar Dropdown */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex align="center" cursor="pointer">
              <Image src="https://i.pravatar.cc/40?img=14" h="30px" borderRadius="full" mr={2} />
              <FaChevronDown style={{ marginLeft: "6px", fontSize: "12px" }} />
            </Flex>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="220px">
                <Menu.Item onSelect={() => alert("Go to profile settings")}>
                  <HStack spacing={2}>
                    <FaUserCog color="#197FCF" />
                    <Text>Profile Settings</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item onSelect={() => alert("Logout")}>
                  <HStack spacing={2}>
                    <FaSignOutAlt color="#197FCF" />
                    <Text>Logout</Text>
                  </HStack>
                </Menu.Item>
                <Menu.Item>
                  <Switch.Root checked={role === "provider"} onCheckedChange={(e) => setRole(e.checked ? "provider" : "requester")} colorPalette="blue">
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label fontWeight="semibold">{role === "provider" ? "Provider" : "Requester"}</Switch.Label>
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
