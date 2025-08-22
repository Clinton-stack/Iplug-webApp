"use client";

import React from "react";
import { Box, Flex, Text, IconButton, HStack } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import SectionHeader from "./SectionHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfileCompletionTile = () => {
  const completion = 75;

  const data = {
    datasets: [
      {
        data: [completion, 100 - completion],
        backgroundColor: ["#197FCF", "#E2E8F0"], // Blue + light gray
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <
    >
    <SectionHeader title="Profile Completion" actionText="View"/>
      <Flex align="center" gap={4}>
        {/* Chart */}
        <Box w="90px" h="90px" position="relative">
          <Doughnut data={data} options={options} />
          <Flex
            position="absolute"
            inset="0"
            align="center"
            justify="center"
            fontWeight="bold"
            fontSize="lg"
          >
            {completion}%
          </Flex>
        </Box>

        {/* Text Content */}
        <Box flex="1">
          <Text fontSize="sm" color="gray.600" mt={1}>
            Your profile is almost complete. Add more details to reach 100%.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default ProfileCompletionTile;
