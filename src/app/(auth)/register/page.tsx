'use client'
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Flex, HStack, Stack, Text, Box, VStack } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsDashLg } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  return (
    <Flex direction="column" justify='space-between' h={{base:'70vh', md: '60vh', lg: '60vh'}}>
      <Box>
        <h1> Create your account</h1>
        <p>
          Plug is customised for you. Create an account, choose a plan and lets
          guide you through your career
        </p>
        <PrimaryButton name="Create account" bgColor="#006BFF" mt={10} onClick= {()=> router.push('/register/step-one')} />
        <Text className="already-have-account-text" mt="10px" textAlign='center'>
          Already have an account?{"  "}
          <Link href="/register" className="link-text">
            Sign in
          </Link>
        </Text>
      </Box>
      <VStack justifyContent='center'>
        <HStack>
          <BsDashLg />
          <Text>Or</Text>
          <BsDashLg />
        </HStack>
        <PrimaryButton
          name="Continue with Google"
          icon={<FcGoogle />}
          bgColor={"#fff"}
          color="#011948"
          border="1px solid #E5E7EB"
        />
      </VStack>

      <Text className="already-have-account-text" textAlign='center'>
        By signing up, you agree to our{" "}
        <Link href="/terms" className="link-text">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="link-text">
          Privacy Policy
        </Link>
      </Text>
    </Flex>
  );
};

export default Register;
