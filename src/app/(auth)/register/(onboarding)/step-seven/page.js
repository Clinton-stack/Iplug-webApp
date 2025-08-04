import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Heading, Icon, NativeSelect, Text } from "@chakra-ui/react";

import { PiRocketBold } from "react-icons/pi";


const StepSeven = () => {
  

  return (
    <Box
      w={{ base: "90%", sm: "400px", md: "500px" }}
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
        <PiRocketBold />
      </Icon>
      <Text fontSize="sm" color="gray.600">
        Welcome onboard Plug! 😄
      </Text>
      <Heading as="h1" size="lg" mb={10} color="#011948">
        We&apos;re thrilled to have you join us, {"John Doe"}!
      </Heading>

      <Box textAlign='left'>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Before you dive into the vast ocean of opportunities that await, let&apos;s
          fine-tune your profile.
        </Text>
        <Text fontSize="sm" color="gray.600" mb={20}>
          By selecting an interest, and taking a career assessment you&apos;re
          enabling us to tailor a journey that&apos;s as unique as you are.
        </Text>
      </Box>

      <PrimaryButton name="Lets Go" bgColor="#006BFF" />
    </Box>
  );
};

export default StepSeven;
