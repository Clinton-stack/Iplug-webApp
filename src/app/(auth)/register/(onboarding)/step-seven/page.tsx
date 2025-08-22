"use client";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Flex, Heading, Icon, NativeSelect, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { PiRocketBold } from "react-icons/pi";

const StepSeven = () => {
  const router = useRouter();
  return (
    <Flex maxW="550px" w='100%' direction="column" align="center" textAlign={{base: "center", lg:"left"}}>
      <Icon boxSize={12} color="#011948" border="1px solid #011948" p={2} mb={4}>
        <PiRocketBold />
      </Icon>
      <Text fontSize="sm" color="gray.600">
        Welcome onboard Plug! 😄
      </Text>
      <Heading as="h1" size="lg" mb={10} color="#011948">
        We&apos;re thrilled to have you join us, {"John Doe"}!
      </Heading>

      <Box>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Before you dive into the vast ocean of opportunities that await, let&apos;s fine-tune your profile.
        </Text>
        <Text fontSize="sm" color="gray.600" mb={20}>
          By selecting an interest, and taking a career assessment you&apos;re enabling us to tailor a journey that&apos;s as unique as you are.
        </Text>
      </Box>

      <PrimaryButton name="Lets Go" bgColor="#006BFF" onClick={() => router.push("/home")} />
    </Flex>
  );
};

export default StepSeven;
