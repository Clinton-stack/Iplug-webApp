import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { BsFillEmojiLaughingFill } from "react-icons/bs";

const ResetPassword = () => {
  return (
    <div>
      <HStack mb={5}>
        <p>Great job so far! </p>
        <BsFillEmojiLaughingFill className="text-plug-blue !text-2xl" />
      </HStack>

      <h1>Now, create a secure password</h1>
      <Stack mt={10} mb={20}>
        <PasswordField
          label="Type your secure password"
          isRequired={true}
          name="newPassword"
        />
        <PasswordField
          label="Confirm your secure password"
          isRequired={true}
          name="confirmPassword"
        />
      </Stack>
      <PrimaryButton name="Confirm" bgColor="#006BFF" />
    </div>
  );
};

export default ResetPassword;
