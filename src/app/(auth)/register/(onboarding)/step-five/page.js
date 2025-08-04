"use client";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";

import React, { useState } from "react";

const items = [
  {
    value: "individual",
    title: "Individual",
    image: "/images/requester.png",
  },
  {
    value: "business",
    title: "Business Owner",
    image: "/images/provider.png",
  },
];
const StepFive = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("individual");
  return (
    <Flex
      mb={{ base: "110px", sm: "130px", md: "200px", lg: "300px" }}
      w="100%"
      align="center"
      direction="column"
    >
      <Icon
        boxSize={12}
        color="#011948"
        border="1px solid #011948"
        p={2}
        mb={4}
      >
        <BiUser />
      </Icon>

      <Heading as="h1" size="lg" mb={2} color="#011948">
        Who are you?
      </Heading>

      <Text fontSize="sm" color="gray.600" mb={6}>
        Individual or Business?
      </Text>

      <Flex wrap="wrap" justify="center" gap="1rem">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setSelected(item.value)}
            className={`userTypeButton ${
              selected === item.value ? "selected" : ""
            }`}
          >
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
            </div>
          </button>
        ))}
      </Flex>

      <Box mt={6} w="100%" maxW="550px">
        <PrimaryButton name="Next" bgColor="#006BFF" onClick= {()=> router.push('/register/step-six')}/>
      </Box>
    </Flex>
  );
};

export default StepFive;
