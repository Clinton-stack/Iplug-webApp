"use client";
import React, { useState } from "react";
import { Box, Heading, Text, Icon, Flex } from "@chakra-ui/react";
import { FiPhone } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <Flex w="100%" align="center" direction="column">
      <Icon as={FiPhone} boxSize={12} color="#011948" border="1px solid #011948" p={2} mb={4} borderRadius="md" />
      <Heading as="h1" size="lg" mb={2} color="#011948">
        What&apos;s your Phone Number?
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={6}>
        We&apos;ll send a one time pass code to help you verify your Phone Number
      </Text>
      <Box mb={6} w="100%">
        <PhoneInput
          country={"ng"}
          value={phone}
          onChange={setPhone}
          inputStyle={{
            width: "100%",
            height: "48px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #E2E8F0",
            paddingLeft: "48px",
            background: "transparent",
          }}
          buttonStyle={{
            border: "1px solid #E2E8F0",
            backgroundColor: "#FAFAFA",
            borderRadius: "10px",
          }}
          containerStyle={{
            width: "100%",
          }}
          inputClass="chakra-phone-input"
        />
      </Box>
    </Flex>
  );
};

export default PhoneForm;
