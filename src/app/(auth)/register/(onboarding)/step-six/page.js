"use client";

import BusinessForm from "@/components/forms/BusinessForm";
import IndividualForm from "@/components/forms/IndividualForm";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

const StepSix = () => {
  const [userType, setUserType] = useState("individual"); 
  return (
    <Flex
      mb={{ base: "110px", sm: "130px", md: "200px", lg: "200px" }}
      w="100%"
      align="center"
      direction="column"
      py={8}
    >
      {userType === "individual" ? (
        <IndividualForm />
      ) : userType === "business" ? (
        <BusinessForm />
      ) : null}

    </Flex>
  );
};

export default StepSix;
