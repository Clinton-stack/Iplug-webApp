"use client";

import { Box, Text, Grid, Flex, Icon } from "@chakra-ui/react";
import metrics from "@/constants/metrics";
import React from "react";

const StatsAtAGlance: React.FC = () => {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={5}>
        Stats at a Glance
      </Text>

      <Flex gap={2} wrap='wrap'>
        {metrics.map(({ label, value, bgColor, icon: IconComponent, iconColor }) => (
          <Flex key={label} align="flex-start" gap={3}>
            <Box
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="lg"
              bg={bgColor.replace("bg-", "")} 
              flexShrink={0}
            >
              <Icon as={IconComponent} color={iconColor} />
            </Box>

            <Box>
              <Text fontSize="11px" color="gray.600">
                {label}
              </Text>
              <Text fontSize="md" fontWeight="bold" color="gray.800">
                {value}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default StatsAtAGlance;
