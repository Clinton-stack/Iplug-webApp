"use client";

import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { TbUserQuestion } from "react-icons/tb";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const items = [
  {
    value: "requester",
    title: "Service Requester",
    description: "Individuals or business owners seeking services",
    image: "/images/requester.png",
  },
  {
    value: "provider",
    title: "Service Provider",
    description: "Individuals or business owners providing services",
    image: "/images/provider.png",
  },
];

const StepOne = () => {
  const [selected, setSelected] = useState("requester");
  const router = useRouter();

  return (
    <Flex w="100%" align="center" direction="column" textAlign={{base: "center", lg:"left"}}>
      <Icon as={TbUserQuestion} boxSize={12} color="#011948" border="1px solid #011948" p={2} mb={4} />

      <Heading as="h1" size="lg" mb={2} color="#011948">
        Who are you signing up as?
      </Heading>

      <Text fontSize="sm" color="gray.600" mb={6}>
        Which of the following categories closely describes you?
      </Text>

      <Flex wrap="wrap" justify="center" gap="1rem">
        {items.map((item) => (
          <button key={item.value} onClick={() => setSelected(item.value)} className={`userTypeButton ${selected === item.value ? "selected" : ""}`}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <div className="title">{item.title}</div>
              <div className="description">{item.description}</div>
            </div>
          </button>
        ))}
      </Flex>

      <Box w="100%" maxW="550px" mt={6}>
        <PrimaryButton bgColor="#006BFF" name="Next" onClick={() => router.push("/register/step-two")} />
      </Box>
    </Flex>
  );
};

export default StepOne;
