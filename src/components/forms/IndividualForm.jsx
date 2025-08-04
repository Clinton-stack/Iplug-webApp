
'use client';
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { Box, Button, Flex, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { BsArrowLeftCircle } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "./IndividualForm/Step1";
import Step2 from "./IndividualForm/Step2";
import Step3 from "./IndividualForm/Step3";
import PrimaryButton from "../ui/PrimaryButton";
import Step4 from "./IndividualForm/Step4";
const MotionFlex = motion.create(Flex);


const IndividualForm = () => {

  const [step, setStep] = useState(0);

  const steps = [
    <Step1 key="step1" />,
    <Step2 key="step2" />,
    <Step3 key="step3" />,
    <Step4 key="step4" />
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  return (
    <Flex direction="column" gap={3} align="center" py={8}>
      <Icon
        as={BiUser}
        boxSize={12}
        color="#011948"
        border="1px solid #011948"
        mb={4}
        p={2}
      />

      <Heading as="h1" size="lg" mb={2} color="#011948">
        Lets get to know you and verify your identity
      </Heading>

      <Text fontSize="sm" color="gray.600" mb={6}>
        Individual
      </Text>

      <Flex justify="space-between" width="100%">
        {step > 0 && (
          <IconButton
            onClick={prevStep}
            aria-label="Back"
            variant="ghost"
          >
            <BsArrowLeftCircle />
            </IconButton>
        )}
        <Heading as='h3' size="sm">Step {step + 1} of {steps.length}</Heading>
        <Box width="40px" />
      </Flex>

      <AnimatePresence mode="popLayout">
        <MotionFlex
          key={step}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          width="100%"
          direction="column"
          mt={6}
        >
          {steps[step]}
        </MotionFlex>
      </AnimatePresence>

      <Box w={{ base: "100%", sm: "100%", md: "90%", lg: "80%" }} mt={6}>
        <PrimaryButton name={step === steps.length - 1 ? "Submit" : "Next"} bgColor="#006BFF" onClick={nextStep} />
      </Box>
    </Flex>
  );
};

export default IndividualForm;
