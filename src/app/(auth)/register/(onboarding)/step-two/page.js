'use client'
import EmailForm from "@/components/forms/EmailForm";
import PhoneForm from "@/components/forms/PhoneForm";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { Box, Icon, Flex, Text, Heading, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const StepTwo = () => {
  const router = useRouter();
  return (
    <Flex
      w="100%"
      align="center"
      direction="column"
      mb={{ base: "110px", sm: "130px", md: "200px", lg: "300px" }}
    >
      <Tabs.Root
        defaultValue="email"
        orientation="horizontal"
        style={{ width: "100%", maxWidth: "500px" }}
        variant="enclosed"
      >
        <Tabs.List display="flex" justifyContent="center" mb={4}>
          <Tabs.Trigger value="email" className="tab-trigger">
            <CiMail /> Email
          </Tabs.Trigger>
          <Tabs.Trigger value="phone" className="tab-trigger">
            <FiPhone /> Phone
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="email">
          <EmailForm />
        </Tabs.Content>

        <Tabs.Content value="phone">
          <PhoneForm />
        </Tabs.Content>

        <Box w={"100%"} mt={6}>
          <PrimaryButton name="Next" bgColor="#006BFF" onClick= {()=> router.push('/register/step-three')}/>
        </Box>

        <Text
          className="already-have-account-text"
          mt="10px"
          display={{ base: "block", md: "none", lg: "none" }}
        >
          Already have an account?{"  "}
          <Link href="/login" className="link-text">
            Sign in
          </Link>
        </Text>
      </Tabs.Root>
    </Flex>
  );
};

export default StepTwo;
