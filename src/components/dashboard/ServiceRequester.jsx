import CTA from "@/components/dashboard/dashboard-components/CTA";
import { Grid, GridItem, Box, VStack, Flex } from "@chakra-ui/react";
import React from "react";
import IngeniousPay from "./dashboard-components/IngeniousPay";
import ActiveProjectsCard from "./dashboard-components/ActiveProjects";
import Inbox from "./dashboard-components/Inbox";
import UpcomingMilestones from "./dashboard-components/UpcomingMilestones";
import StatsAtAGlance from "./dashboard-components/StatsAtAGlance";
import RecentActivities from "./dashboard-components/RecentActivity";
import SmartRecommendations from "./dashboard-components/SmartRecommendations";

const ServiceRequester = () => {
  const customerName = "John Doe";
  const buttonName = "Post a Service Request";
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6} p={3}>
      {/* Left Column: CTA + Main Content */}
      <GridItem colSpan={{ base: 12, lg: 9 }}>
        <VStack gap={6} align="stretch">
          {/* CTA */}
          <Box className="dashboard-tile" minHeight="120px">
            <CTA customerName={customerName} buttonName={buttonName} />
          </Box>

          {/* Projects + Spend */}
          <Flex gap={6} flexWrap="wrap">
            <Box flex="1" minW="300px" className="dashboard-tile" minHeight="310px">
              <ActiveProjectsCard />
            </Box>
            <Box flex="1" minW="300px" className="dashboard-tile" minHeight="310px">
              Spend Last 6 Months
            </Box>
          </Flex>

          {/* Milestones + Inbox */}
          <Flex gap={6} flexWrap="wrap">
            <Box flex="1" minW="300px" className="dashboard-tile" minHeight="310px">
              <UpcomingMilestones />
            </Box>
            <Box flex="1" minW="300px" className="dashboard-tile" minHeight="310px">
              <Inbox />
            </Box>
          </Flex>
        </VStack>
      </GridItem>

      {/* Right Column: Sidebar starting from top */}
      <GridItem colSpan={{ base: 12, lg: 3 }}>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)", lg: "repeat(1, 1fr)" }} gap={6}>
          <GridItem colSpan={{ base: 12, md: 3 }}>
            <Box className="dashboard-tile" minHeight="280px">
              <IngeniousPay />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 3 }}>
            <Box className="dashboard-tile" minHeight="280px">
              <StatsAtAGlance />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 3 }}>
            <Box className="dashboard-tile" minHeight="280px">
              <RecentActivities />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 3 }}>
            <Box className="dashboard-tile" minHeight="280px">
              <SmartRecommendations />
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default ServiceRequester;
