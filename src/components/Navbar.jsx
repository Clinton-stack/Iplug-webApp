import { Box, Button, Flex, HStack, Icon, Image, Input, InputGroup, Menu, Portal, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown, FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import { LuMessageSquareMore, LuSearch } from "react-icons/lu";
import { PiCurrencyNgnDuotone } from "react-icons/pi";

const Navbar = () => {
  const [currency, setCurrency] = useState("USD");

  const currencies = [
    { label: "USD", icon: <FaDollarSign />, symbol: "$" },
    { label: "EUR", icon: <FaEuroSign />, symbol: "€" },
    { label: "NGN", icon: <PiCurrencyNgnDuotone />, symbol: "₦" },
    { label: "GBP", icon: <FaPoundSign />, symbol: "£" },
  ];

  const selectedCurrency = currencies.find((c) => c.label === currency);

  return (
    <Flex align="center" justify="space-between" h="70px" w="full" px={4} bg="#F8FAFB" boxShadow="xs">
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input placeholder="Search" borderRadius="full" maxW="450px" bgColor="#f5f5f5" />
      </InputGroup>

      <Flex align="center" gap={5} ml={2}>
        <Icon boxSize={5} color="#197FCF" as={LuMessageSquareMore} />
        <Icon boxSize={5} color="#197FCF" as={HiOutlineBell} />

        <Menu.Root onSelect={(e) => setCurrency(e.value)}>
          <Menu.Trigger asChild>
            <Button variant="outline" borderRadius="full" color="gray.500">
              <HStack spacing={2}>
                {selectedCurrency?.icon}
                <Text>{selectedCurrency?.label}</Text>
              </HStack>
              <FaChevronDown />
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

        <Flex align="center">
          <Image src="/images/provider.png" h="20px" borderRadius="full" alt="Profile picture" mr={2} />

          <Box>
            <Text fontSize="15px" color="gray.700">
              John Doe
            </Text>
            <Text fontSize="10px" color="gray.500">
              Frontend Designer
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
