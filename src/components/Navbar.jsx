import { Box, Button, Flex, HStack, Icon, Image, Input, InputGroup, Menu, Portal, Switch, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown, FaUserCog, FaSignOutAlt, FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import { LuMessageSquareMore, LuSearch } from "react-icons/lu";
import { PiCurrencyNgnDuotone } from "react-icons/pi";

const Navbar = () => {
  const [currency, setCurrency] = useState("USD");
  const [isProvider, setIsProvider] = useState(false);

  const currencies = [
    { label: "USD", icon: <FaDollarSign /> },
    { label: "EUR", icon: <FaEuroSign /> },
    { label: "NGN", icon: <PiCurrencyNgnDuotone /> },
    { label: "GBP", icon: <FaPoundSign /> },
  ];

  const selectedCurrency = currencies.find((c) => c.label === currency);

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

        {/* Currency Dropdown */}
        <Menu.Root onSelect={(e) => setCurrency(e.value)}>
          <Menu.Trigger asChild>
            <Button variant="outline" borderRadius="full" color="gray.600" rightIcon={<FaChevronDown />}>
              <HStack spacing={2}>
                {selectedCurrency?.icon}
                <Text>{selectedCurrency?.label}</Text>
              </HStack>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {currencies.map((c) => (
                  <Menu.Item key={c.label} value={c.label}>
                    <HStack spacing={2}>
                      {c.icon}
                      <Text>{c.label}</Text>
                    </HStack>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        {/* Avatar Dropdown */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex align="center" cursor="pointer">
              <Image src="https://i.pravatar.cc/40?img=10" h="30px" borderRadius="full" mr={2} />
              <Box textAlign="left">
                <Text fontSize="15px" color="gray.700">
                  John Doe
                </Text>
                <Text fontSize="10px" color="gray.500">
                  Frontend Designer
                </Text>
              </Box>
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
