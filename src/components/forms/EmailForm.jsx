import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { CiMail } from "react-icons/ci";
import TextField from "../ui/TextField";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";

const EmailForm = () => {
  return (
    <Flex
      w="100%"
      align="center"
      direction="column"
    >
      <Icon
        boxSize={12}
        color="#011948"
        border="1px solid #011948"
        p={2}
        mb={4}
      >
        <CiMail />
      </Icon>

      <Heading as="h1" size="lg" mb={2} color="#011948">
        What's your email?
      </Heading>

      <Text fontSize="sm" color="gray.600" mb={6}>
        We'll send a one time pass code to help you verify your email
      </Text>

      <Box w='100%' mt={6}>
        <TextField label="Email" name="email" isRequired={true} mb={4} />
      </Box>

    </Flex>
  );
};

export default EmailForm;
