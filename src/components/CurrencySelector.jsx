// components/FloatingCurrencySelector.jsx
"use client";

import React, { useState } from "react";
import { Box, Button, HStack, Text, Portal, Menu } from "@chakra-ui/react";
import { FaChevronDown, FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { PiCurrencyNgnDuotone } from "react-icons/pi";

const FloatingCurrencySelector = () => {
  const [currency, setCurrency] = useState("USD");

  const currencies = [
    { label: "USD", icon: <FaDollarSign /> },
    { label: "EUR", icon: <FaEuroSign /> },
    { label: "NGN", icon: <PiCurrencyNgnDuotone /> },
    { label: "GBP", icon: <FaPoundSign /> },
  ];

  const selectedCurrency = currencies.find((c) => c.label === currency);

  return (
    <Box
      position="fixed"
      top="80px" // to stay below navbar (which is 70px tall)
      right="15px"
      zIndex="1000"
    >
      <Menu.Root onSelect={(e) => setCurrency(e.value)}>
        <Menu.Trigger asChild>
          <Button variant="outline" borderRadius="full" color="gray.600" backgroundColor="#e4e2e2">
            <HStack spacing={2}>
              {selectedCurrency?.icon}
              <Text>{selectedCurrency?.label}</Text> <FaChevronDown />
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
    </Box>
  );
};

export default FloatingCurrencySelector;
