import CTAComponent from "@/components/dashboard/dashboard-components/CTA";
import { Grid, GridItem, Box, VStack, Heading, Text } from "@chakra-ui/react";
import React from "react";
import IngeniousPay from "./dashboard-components/IngeniousPay";
import ActiveProjectsCard from "./dashboard-components/ActiveProjects";
import Inbox from "./dashboard-components/Inbox";
import UpcomingMilestones from "./dashboard-components/UpcomingMilestones";
import StatsAtAGlance from "./dashboard-components/StatsAtAGlance";
import RecentActivities from "./dashboard-components/RecentActivity";
import SmartRecommendations from "./dashboard-components/SmartRecommendations";
import ProfileCompletionTile from "./dashboard-components/ProfileCompletion";

const ServiceRequester = () => {
  const customerName = "John Doe";
  const buttonName = "Post a Service Request";

  return (
    <Box p={6}>
      {/* Dashboard Header */}
      <Box mb={6}>
        <Heading size="lg" color="gray.800" mb={2}>
          Service Requester Dashboard
        </Heading>
        <Text color="gray.600" fontSize="sm">
          For users seeking service providers to fulfill personal or business tasks.
        </Text>
      </Box>

      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        {/* Left Column: Main Content */}
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <VStack gap={6} align="stretch">
            {/* Welcome Banner with Quick CTA */}
            <Box className="dashboard-tile" minHeight="120px">
              <CTAComponent 
                customerName={customerName} 
                buttonName={buttonName}
              />
            </Box>

            {/* Recent Activities */}
            <Box className="dashboard-tile" minHeight="300px">
              <RecentActivities />
            </Box>

            {/* Active & Ongoing Projects */}
            <Box className="dashboard-tile" minHeight="350px">
              <ActiveProjectsCard />
            </Box>

            {/* Smart Recommendations (via Ingenious AI) */}
            <Box className="dashboard-tile" minHeight="320px">
              <SmartRecommendations />
            </Box>
          </VStack>
        </GridItem>

        {/* Right Column: Sidebar */}
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <VStack gap={6} align="stretch">
            {/* Inbox Preview */}
            <Box className="dashboard-tile" minHeight="280px">
              <Inbox />
            </Box>

            {/* Upcoming Milestones */}
            <Box className="dashboard-tile" minHeight="280px">
              <UpcomingMilestones />
            </Box>

            {/* Wallet Snapshot (Ingenious Pay) */}
            <Box className="dashboard-tile" minHeight="200px">
              <IngeniousPay buttonName="Fund Wallet" />
            </Box>

            {/* Gamification & Rewards */}
            <Box className="dashboard-tile" minHeight="200px">
              <StatsAtAGlance />
            </Box>

            {/* Profile Completion / Platform Tips */}
            <Box className="dashboard-tile" minHeight="180px">
              <ProfileCompletionTile />
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ServiceRequester;
