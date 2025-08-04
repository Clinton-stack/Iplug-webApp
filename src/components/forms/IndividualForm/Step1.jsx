import TextField from "@/components/ui/TextField";
import { Box } from "@chakra-ui/react";
import React from "react";

const Step1 = () => {
  return (
    <Box spaceY={3}>
      <TextField label="First Name" name="firstName" isRequired={true} />
      <TextField label="Last Name" name="lastName" isRequired={true} />
      <TextField label="Referral ID (optional)" name="referralId" type="text" />
    </Box>
  );
};

export default Step1;
