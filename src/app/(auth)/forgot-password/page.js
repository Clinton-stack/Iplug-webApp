import PrimaryButton from "@/components/ui/PrimaryButton";
import TextField from "@/components/ui/TextField";
import { Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <h1> Can't remember your password </h1>
      <p>
        Type the email associated with your account below and we’ll send you
        instructions to help recover your account
      </p>
      <Stack gap={20} mt="25px">
        <TextField name="email" label="Enter your email" isRequired={true} />
        <PrimaryButton name="Reset password" bgColor="#006BFF" />

        <Text className="already-have-account-text" mt="40px">
          Dont have an account?{"  "}
          <Link href="/register" className="link-text">
            Sign up
          </Link>
        </Text>
      </Stack>
    </div>
  );
};

export default ForgotPassword;
