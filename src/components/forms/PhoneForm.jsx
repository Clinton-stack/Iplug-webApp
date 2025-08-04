"use client";
import React, { useState } from "react";
import { Box, Heading, Text, Icon, Flex } from "@chakra-ui/react";
import { FiPhone } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PrimaryButton from "../ui/PrimaryButton";

const PhoneForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <Flex
      w="100%"
      align="center"
      direction="column"
    >
      <Icon
        as={FiPhone}
        boxSize={12}
        color="#011948"
        border="1px solid #011948"
        p={2}
        mb={4}
        borderRadius="md"
      />
      <Heading as="h1" size="lg" mb={2} color="#011948">
        What’s your Phone Number?
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={6}>
        We’ll send a one time pass code to help you verify your Phone Number
      </Text>
      <Box mb={6} w='100%'>
        <PhoneInput
          country={"ng"}
          value={phone}
          onChange={setPhone}
          inputStyle={{
            width: "100%",
            height: "48px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            paddingLeft: "48px",
          }}
          buttonStyle={{
            border: "1px solid #E2E8F0",
            backgroundColor: "white",
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
