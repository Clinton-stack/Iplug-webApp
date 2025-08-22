import PrimaryButton from "@/components/ui/PrimaryButton";
import { PinInput, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const VerifyPin = () => {
  return (
    <div>
      <p> Verify your email</p>
      <h1>Enter the code we sent to your email</h1>
      <Stack mt={10}>
        <PinInput.Root>
          <PinInput.HiddenInput />
          <PinInput.Control>
            <PinInput.Input index={0} className='pin-input' />
            <PinInput.Input index={1} className='pin-input' />
            <PinInput.Input index={2} className='pin-input' />
            <PinInput.Input index={3} className='pin-input' />
          </PinInput.Control>
        </PinInput.Root>
        <Text className="dont-have-an-account" mb={20}>
          Didnt receive a code?{"  "}
          <Link href="/resend" className="link-text">
            Resend
          </Link>
        </Text>
        <PrimaryButton name='Next' bgColor='#006BFF' />

        <Text className="already-have-account-text" mt={40}>
          Dont have an account?{"  "}
          <Link href="/register" className="link-text">
            Sign up
          </Link>
        </Text>
      </Stack>
    </div>
  );
};

export default VerifyPin;
