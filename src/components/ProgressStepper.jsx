"use client";
import { VStack, Box, Text, Flex, Icon, HStack } from "@chakra-ui/react";
import {
  FaLock,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaSmile,
} from "react-icons/fa";
import { PiRocketBold } from "react-icons/pi";
import { BsHash } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { TbUserQuestion } from "react-icons/tb";

import { usePathname } from "next/navigation";

const rawSteps = [
  {
    title: "Select account type",
    subtitle: "Requester or Provider?",
    icon: TbUserQuestion,
  },
  {
    title: "Enter email or phone number",
    subtitle: "We’ll send you a verification code",
    icon: FaEnvelope,
  },
  {
    title: "Verify your account",
    subtitle: "Enter the verification code",
    icon: BsHash,
  },
  {
    title: "Create a password",
    subtitle: "Make sure it’s something secure",
    icon: FaLock,
  },
  {
    title: "Who are you?",
    subtitle: "Individual or Business?",
    icon: FaUser,
  },
  {
    title: "Set up your profile",
    subtitle: "Basic details or business verification",
    icon: FaBuilding,
  },
  {
    title: "Welcome aboard!",
    subtitle: "You're all set up 🎉",
    icon: PiRocketBold,
  },
];

const StepIcon = ({ status, icon: IconComponent }) => {
  const bg = {
    done: "#012949",
    active: "#006BFF",
    upcoming: "gray.100",
  }[status];

  const color = {
    done: "white",
    active: "white",
    upcoming: "gray.400",
  }[status];

  return (
    <Flex
      boxSize="36px"
      borderRadius="md"
      align="center"
      justify="center"
      bg={bg}
      color={color}
      border="1px solid"
      borderColor={status === "active" ? "blue.500" : "#011948"}
      mb={3}
    >
      <Icon as={IconComponent} boxSize="22px" />
    </Flex>
  );
};

export default function ProgressStepper() {
  const pathToStepIndex = {
    "/register/step-one": 0,
    "/register/step-two": 1,
    "/register/step-three": 2,
    "/register/step-four": 3,
    "/register/step-five": 4,
    "/register/step-six": 5,
    "/register/step-seven": 6,
  };

  const pathname = usePathname();
  const currentStepPath = pathToStepIndex[pathname] ?? 0;

  const steps = rawSteps.map((step, i) => ({
    ...step,
    status:
      i < currentStepPath
        ? "done"
        : i === currentStepPath
        ? "active"
        : "upcoming",
  }));

  return (
    <VStack spacing={10} align="stretch" position="relative" pl={4}>
      {steps.map((step, i) => (
        <Box key={i} spaceY={10} position="relative">
          <HStack align="flex-start">
            <Flex direction="column" align="center" minH="80px">
              <StepIcon status={step.status} icon={step.icon}  />
              {i !== steps.length - 1 && (
                <Box w="2px" flex="1" bg="gray.200" mt="1" mb={1} />
              )}
            </Flex>

            <Box>
              <Text
                fontWeight={step.status === "active" ? "bold" : "normal"}
                fontSize="sm"
              >
                {step.title}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {step.subtitle}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
