"use client";

import { Box, Text, Grid, Flex } from "@chakra-ui/react";
import metrics from "@/constants/metrics";

const StatsAtAGlance = () => {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={5}>
        Stats at a Glance
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" gapX={4} gapY={6}>
        {metrics.map(({ label, value, bgColor, icon }) => (
          <Flex key={label} align="flex-start" gap={3}>
            <Box
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="lg"
              bg={bgColor.replace("bg-", "")} // converts bg-blue.100 to blue.100 for Chakra
              flexShrink={0}
            >
              {icon}
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">
                {label}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                {value}
              </Text>
            </Box>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsAtAGlance;
