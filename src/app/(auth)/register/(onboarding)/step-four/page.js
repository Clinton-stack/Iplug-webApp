import PasswordField from "@/components/ui/PasswordField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Em, Heading, Icon, PinInput, Text } from "@chakra-ui/react";
import { RiLock2Line } from "react-icons/ri";

const StepThree = () => {
  return (
    <Box
      w='100%'
      maxW="550px"
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
        <RiLock2Line />
      </Icon>

      <Heading as="h1" size="lg" mb={2} color="#011948">
        Create your <Em>secure</Em> password
      </Heading>

      <Text fontSize="sm" color="gray.600" mb={6}>
        Great job so far! Now, 😄 let&apos;s set up a secure password for your
        account.
      </Text>

      <Box spaceY={10} mb={20}>
        <PasswordField label="Type your secure password" name="password" />
        <PasswordField
          label="Confirm your secure password"
          name="passwordReapeat"
        />
      </Box>

      <PrimaryButton name="Next" bgColor="#006BFF" />
    </Box>
  );
};

export default StepThree;
