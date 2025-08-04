'use client';
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Heading, Icon, PinInput, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsHash } from "react-icons/bs";

const StepThree = () => {
  const router = useRouter();
  return (
    <Box
      w="100%"
      maxW="550px"
      p={8}
      textAlign="center"
      mb={{ base: "110px", sm: "130px", md: "200px", lg: "300px" }}
    >
      <Icon
        boxSize={12}
        color="#011948"
        border="1px solid #011948"
        p={2}
        mb={4}
      >
        <BsHash />
      </Icon>

      <Heading as="h1" size="lg" mb={2} color="#011948">
        Verify your account?
      </Heading>

      <Text fontSize="sm" color="gray.600" mb={6}>
        We&apos;ve sent a 6-digit one time passcode to your email. Please enter it
        below to verify your email address.
      </Text>

      <Box>
        <Box mb={10}>
          <PinInput.Root>
            <PinInput.Control>
              <PinInput.Input
                index={0}
                className="pin-input"
              />
              <PinInput.Input
                index={1}
                className="pin-input"
              />
              <PinInput.Input
                index={2}
                className="pin-input"
              />
              <PinInput.Input
                index={3}
                className="pin-input"
              />
              <PinInput.Input
                index={4}
                className="pin-input"
              />
              <PinInput.Input
                index={5}
                className="pin-input"
              />
            </PinInput.Control>
          </PinInput.Root>
        </Box>

        <Text
        className="already-have-account-text"
        mb={10}
      >
        Didn&lsquo;t receive a code?{"  "}
        <Link href="/login" className="link-text">
          Click to resend
        </Link>
      </Text>

        <PrimaryButton name="Next" bgColor="#006BFF" onClick={()=> router.push('/register/step-four')} />
      </Box>
      <Text
        className="already-have-account-text"
        mt={40}
        display={{ base: "block", md: "none", lg: "none" }}
      >
        Already have an account?{"  "}
        <Link href="/login" className="link-text">
          Sign in
        </Link>
      </Text>
    </Box>
  );
};

export default StepThree;
