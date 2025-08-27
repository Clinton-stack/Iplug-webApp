"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Button,
  Badge,
  Icon,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {
  FiPlus,
  FiEye,
  FiEdit,
  FiPlay,
  FiPause,
  FiBarChart,
  FiDollarSign,
  FiTarget,
  FiTrendingUp,
  FiCreditCard,
  FiDownload,
  FiUpload,
} from "react-icons/fi";
import { useUserRoleSafe } from "@/contexts/UserRoleContext";
import AccessRestriction from "@/components/ui/AccessRestriction";

// Custom Card Components for Chakra UI v3 compatibility
const Card = ({ children, ...props }: any) => (
  <Box bg="white" shadow="base" borderRadius="md" border="1px" borderColor="gray.200" {...props}>
    {children}
  </Box>
);

const CardHeader = ({ children }: any) => (
  <Box p={4} borderBottom="1px" borderColor="gray.200">
    {children}
  </Box>
);

const CardBody = ({ children }: any) => (
  <Box p={4}>
    {children}
  </Box>
);

// Types
interface Campaign {
  id: string;
  title: string;
  description: string;
  service: string;
  status: 'active' | 'pending' | 'rejected' | 'completed' | 'paused';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  targetAudience: {
    categories: string[];
    locations: string[];
    budgetRange: string;
  };
  creative: {
    type: 'image' | 'video' | 'text';
    url?: string;
    content: string;
  };
}

const AdsPromotionsPage: React.FC = () => {
  const userRoleContext = useUserRoleSafe();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data - moved to top level
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Web Development Services Boost',
      description: 'Promote my React and Node.js development services to tech startups',
      service: 'Web Development',
      status: 'active',
      budget: 50000,
      spent: 32000,
      impressions: 12500,
      clicks: 450,
      conversions: 8,
      startDate: '2025-08-15',
      endDate: '2025-08-30',
      targetAudience: {
        categories: ['Technology', 'Startups'],
        locations: ['Lagos', 'Abuja'],
        budgetRange: '₦100k - ₦500k'
      },
      creative: {
        type: 'image',
        url: '/images/provider.png',
        content: 'Professional web development services for modern businesses'
      }
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Showcase mobile app development expertise for e-commerce',
      service: 'Mobile Development',
      status: 'pending',
      budget: 30000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      startDate: '2025-08-28',
      endDate: '2025-09-10',
      targetAudience: {
        categories: ['E-commerce', 'Retail'],
        locations: ['Lagos', 'Port Harcourt'],
        budgetRange: '₦200k - ₦1M'
      },
      creative: {
        type: 'video',
        content: 'Transform your business with custom mobile applications'
      }
    },
    {
      id: '3',
      title: 'UI/UX Design Portfolio',
      description: 'Display design capabilities for fintech and healthcare sectors',
      service: 'UI/UX Design',
      status: 'completed',
      budget: 25000,
      spent: 25000,
      impressions: 8200,
      clicks: 320,
      conversions: 12,
      startDate: '2025-07-15',
      endDate: '2025-08-15',
      targetAudience: {
        categories: ['Fintech', 'Healthcare'],
        locations: ['Lagos', 'Ibadan'],
        budgetRange: '₦50k - ₦300k'
      },
      creative: {
        type: 'image',
        url: '/images/provider.png',
        content: 'Award-winning UI/UX design solutions'
      }
    }
  ]);

  // Handle loading state
  if (!userRoleContext) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack align="center" justify="center" h="400px">
          <Text>Loading...</Text>
        </VStack>
      </Container>
    );
  }

  const { userRole } = userRoleContext;

  // Role-based access control
  if (userRole !== 'Provider') {
    return (
      <AccessRestriction
        requiredRole="Provider"
        pageName="Ads & Promotions"
        description="The Ads & Promotions page is where you can create and manage advertising campaigns to promote your services. Switch to Provider mode to advertise your services and reach more clients."
      />
    );
  }

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'rejected': return 'red';
      case 'completed': return 'blue';
      case 'paused': return 'gray';
      default: return 'gray';
    }
  };

  const getCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00';
  };

  const getConversionRate = (conversions: number, clicks: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00';
  };

  // Calculate total statistics
  const totalStats = campaigns.reduce((acc, campaign) => ({
    totalSpent: acc.totalSpent + campaign.spent,
    totalImpressions: acc.totalImpressions + campaign.impressions,
    totalClicks: acc.totalClicks + campaign.clicks,
    totalConversions: acc.totalConversions + campaign.conversions,
  }), { totalSpent: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0 });

  return (
    <Container maxW="7xl" py={8}>
      <VStack align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="start" mb={6}>
          <Box>
            <Heading size="xl" color="gray.800" mb={2}>
              Ads & Promotions
            </Heading>
            <Text color="gray.600" fontSize="lg">
              🎯 Advertise your services, boost visibility, and reach more requesters through targeted campaigns.
            </Text>
          </Box>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Icon as={FiPlus} mr={2} />
            Create New Campaign
          </Button>
        </HStack>

        {/* Stats Overview */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
          <Card>
            <CardBody>
              <VStack>
                <Icon as={FiDollarSign} boxSize={8} color="blue.500" />
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                  ₦{totalStats.totalSpent.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.600">Total Spent</Text>
                <Text fontSize="xs" color="green.500">↗ 12% this month</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack>
                <Icon as={FiEye} boxSize={8} color="green.500" />
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {totalStats.totalImpressions.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.600">Total Impressions</Text>
                <Text fontSize="xs" color="green.500">↗ 8% this month</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack>
                <Icon as={FiTarget} boxSize={8} color="purple.500" />
                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                  {getCTR(totalStats.totalClicks, totalStats.totalImpressions)}%
                </Text>
                <Text fontSize="sm" color="gray.600">Click-Through Rate</Text>
                <Text fontSize="xs" color="green.500">Above average</Text>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack>
                <Icon as={FiTrendingUp} boxSize={8} color="orange.500" />
                <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                  {totalStats.totalConversions}
                </Text>
                <Text fontSize="sm" color="gray.600">Total Conversions</Text>
                <Text fontSize="xs" color="green.500">5 this week</Text>
              </VStack>
            </CardBody>
          </Card>
        </Grid>

        {/* Navigation Tabs */}
        <Card mb={6}>
          <CardHeader>
            <HStack gap={4}>
              <Button
                variant={activeTab === 'campaigns' ? 'solid' : 'ghost'}
                colorScheme={activeTab === 'campaigns' ? 'blue' : 'gray'}
                onClick={() => setActiveTab('campaigns')}
              >
                My Campaigns
              </Button>
              <Button
                variant={activeTab === 'analytics' ? 'solid' : 'ghost'}
                colorScheme={activeTab === 'analytics' ? 'blue' : 'gray'}
                onClick={() => setActiveTab('analytics')}
              >
                <Icon as={FiBarChart} mr={2} />
                Analytics
              </Button>
              <Button
                variant={activeTab === 'billing' ? 'solid' : 'ghost'}
                colorScheme={activeTab === 'billing' ? 'blue' : 'gray'}
                onClick={() => setActiveTab('billing')}
              >
                <Icon as={FiCreditCard} mr={2} />
                Billing & Payments
              </Button>
            </HStack>
          </CardHeader>
        </Card>

        {/* Tab Content */}
        {activeTab === 'campaigns' && (
          <VStack align="stretch">
            {/* Campaign Filters */}
            <HStack mb={4}>
              <Input placeholder="Search campaigns..." maxW="300px" />
              <Button variant="outline">Filter by Status</Button>
            </HStack>

            {/* Campaigns Grid */}
            <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardBody>
                    <VStack align="stretch">
                      <HStack justify="space-between" align="start">
                        <VStack align="start">
                          <Text fontWeight="bold" fontSize="lg">{campaign.title}</Text>
                          <Text fontSize="sm" color="gray.600">{campaign.description}</Text>
                          <Badge colorScheme={getStatusColor(campaign.status)} size="sm">
                            {campaign.status.toUpperCase()}
                          </Badge>
                        </VStack>
                        <HStack>
                          <Button size="sm" variant="ghost">
                            <Icon as={FiEye} />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Icon as={FiEdit} />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Icon as={campaign.status === 'active' ? FiPause : FiPlay} />
                          </Button>
                        </HStack>
                      </HStack>

                      {/* Campaign Metrics */}
                      <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
                        <Box textAlign="center">
                          <Text fontSize="xs" color="gray.500">IMPRESSIONS</Text>
                          <Text fontWeight="bold">{campaign.impressions.toLocaleString()}</Text>
                        </Box>
                        <Box textAlign="center">
                          <Text fontSize="xs" color="gray.500">CLICKS</Text>
                          <Text fontWeight="bold">{campaign.clicks}</Text>
                        </Box>
                        <Box textAlign="center">
                          <Text fontSize="xs" color="gray.500">CTR</Text>
                          <Text fontWeight="bold">{getCTR(campaign.clicks, campaign.impressions)}%</Text>
                        </Box>
                      </Grid>

                      {/* Budget Progress */}
                      <Box mt={4}>
                        <HStack justify="space-between" mb={2}>
                          <Text fontSize="sm" color="gray.600">Budget Used</Text>
                          <Text fontSize="sm" fontWeight="medium">
                            ₦{campaign.spent.toLocaleString()} / ₦{campaign.budget.toLocaleString()}
                          </Text>
                        </HStack>
                        <Box w="full" bg="gray.200" borderRadius="full" h="2">
                          <Box
                            bg="blue.500"
                            h="2"
                            borderRadius="full"
                            w={`${(campaign.spent / campaign.budget) * 100}%`}
                          />
                        </Box>
                      </Box>

                      {/* Campaign Details */}
                      <HStack justify="space-between" mt={4} fontSize="sm" color="gray.600">
                        <Text>Service: {campaign.service}</Text>
                        <Text>{campaign.startDate} - {campaign.endDate}</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </VStack>
        )}

        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <Heading size="md">Campaign Analytics</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch">
                {/* Analytics Table */}
                <Box overflowX="auto">
                  <Box minW="800px">
                    {/* Table Header */}
                    <Grid templateColumns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" gap={4} p={4} bg="gray.50" borderRadius="md" mb={4}>
                      <Text fontWeight="bold" fontSize="sm">Campaign</Text>
                      <Text fontWeight="bold" fontSize="sm">Status</Text>
                      <Text fontWeight="bold" fontSize="sm">Impressions</Text>
                      <Text fontWeight="bold" fontSize="sm">Clicks</Text>
                      <Text fontWeight="bold" fontSize="sm">CTR</Text>
                      <Text fontWeight="bold" fontSize="sm">Conversions</Text>
                      <Text fontWeight="bold" fontSize="sm">Conv. Rate</Text>
                      <Text fontWeight="bold" fontSize="sm">Spent</Text>
                    </Grid>
                    
                    {/* Table Rows */}
                    {campaigns.map((campaign) => (
                      <Grid key={campaign.id} templateColumns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" gap={4} p={4} borderBottom="1px" borderColor="gray.200">
                        <VStack align="start">
                          <Text fontWeight="medium" fontSize="sm">{campaign.title}</Text>
                          <Text fontSize="xs" color="gray.500">{campaign.service}</Text>
                        </VStack>
                        <Badge colorScheme={getStatusColor(campaign.status)} size="sm" maxW="fit-content">
                          {campaign.status}
                        </Badge>
                        <Text fontSize="sm">{campaign.impressions.toLocaleString()}</Text>
                        <Text fontSize="sm">{campaign.clicks}</Text>
                        <Text fontSize="sm">{getCTR(campaign.clicks, campaign.impressions)}%</Text>
                        <Text fontSize="sm">{campaign.conversions}</Text>
                        <Text fontSize="sm">{getConversionRate(campaign.conversions, campaign.clicks)}%</Text>
                        <Text fontSize="sm">₦{campaign.spent.toLocaleString()}</Text>
                      </Grid>
                    ))}
                  </Box>
                </Box>

                {/* Export Button */}
                <HStack justify="end" mt={4}>
                  <Button variant="outline">
                    <Icon as={FiDownload} mr={2} />
                    Export Analytics Report
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {activeTab === 'billing' && (
          <VStack align="stretch">
            {/* Ingenious Pay Integration */}
            <Card mb={6}>
              <CardHeader>
                <HStack justify="space-between">
                  <Heading size="md">Ingenious Pay Wallet</Heading>
                  <Badge colorScheme="green">Connected</Badge>
                </HStack>
              </CardHeader>
              <CardBody>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  <VStack align="start">
                    <Text color="gray.600">Available Balance</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="green.600">₦125,000.00</Text>
                    <Button size="sm" colorScheme="blue">
                      <Icon as={FiCreditCard} mr={2} />
                      Add Funds
                    </Button>
                  </VStack>
                  <VStack align="start">
                    <Text color="gray.600">Auto-Renew Settings</Text>
                    <HStack>
                      <input type="checkbox" />
                      <Text fontSize="sm">Enable auto-renewal for active campaigns</Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      Campaigns will automatically renew when budget is depleted
                    </Text>
                  </VStack>
                </Grid>
              </CardBody>
            </Card>

            {/* Payment Receipts */}
            <Card>
              <CardHeader>
                <HStack justify="space-between">
                  <Heading size="md">Recent Payment Receipts</Heading>
                  <Button size="sm" variant="outline">
                    <Icon as={FiDownload} mr={2} />
                    Download All
                  </Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack align="stretch">
                  {[
                    { id: 'R001', campaign: 'Web Development Services Boost', amount: 32000, date: '2025-08-25', status: 'paid' },
                    { id: 'R002', campaign: 'UI/UX Design Portfolio', amount: 25000, date: '2025-08-15', status: 'paid' },
                    { id: 'R003', campaign: 'Mobile App Development', amount: 0, date: '2025-08-28', status: 'pending' },
                  ].map((receipt) => (
                    <HStack key={receipt.id} justify="space-between" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                      <VStack align="start">
                        <Text fontWeight="medium">Receipt #{receipt.id}</Text>
                        <Text fontSize="sm" color="gray.600">{receipt.campaign}</Text>
                        <Text fontSize="xs" color="gray.500">{receipt.date}</Text>
                      </VStack>
                      <HStack>
                        <VStack align="end">
                          <Text fontWeight="bold">₦{receipt.amount.toLocaleString()}</Text>
                          <Badge colorScheme={receipt.status === 'paid' ? 'green' : 'yellow'}>
                            {receipt.status}
                          </Badge>
                        </VStack>
                        <Button size="sm" variant="ghost">
                          <Icon as={FiDownload} />
                        </Button>
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        )}

        {/* Create Campaign Modal (Simple Version) */}
        {isCreateModalOpen && (
          <Card position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1000} maxW="600px" w="90%" maxH="80vh" overflowY="auto">
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md">Create New Campaign</Heading>
                <Button size="sm" variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
                  ×
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="stretch">
                <Box>
                  <Text fontWeight="medium" mb={2}>Service Selection</Text>
                  <Input placeholder="Choose service to promote..." />
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={2}>Campaign Title</Text>
                  <Input placeholder="Enter campaign title..." />
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={2}>Description</Text>
                  <Textarea placeholder="Describe your campaign objectives..." rows={3} />
                </Box>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="medium" mb={2}>Target Categories</Text>
                    <Input placeholder="Technology, Healthcare..." />
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>Target Locations</Text>
                    <Input placeholder="Lagos, Abuja..." />
                  </Box>
                </Grid>

                <Box>
                  <Text fontWeight="medium" mb={2}>Target Budget Range</Text>
                  <Input placeholder="₦100k - ₦500k" />
                </Box>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="medium" mb={2}>Daily Budget (₦)</Text>
                    <Input type="number" placeholder="2000" />
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>Total Budget (₦)</Text>
                    <Input type="number" placeholder="30000" />
                  </Box>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="medium" mb={2}>Start Date</Text>
                    <Input type="date" />
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>End Date</Text>
                    <Input type="date" />
                  </Box>
                </Grid>

                <Box>
                  <Text fontWeight="medium" mb={2}>Creative Upload</Text>
                  <Button variant="outline" w="full">
                    <Icon as={FiUpload} mr={2} />
                    Upload Image/Video
                  </Button>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    Recommended: 1200x630px for images, 16:9 for videos
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={2}>Ad Text/Caption</Text>
                  <Textarea placeholder="Write compelling ad text..." rows={3} />
                </Box>

                <HStack>
                  <input type="checkbox" />
                  <Text fontSize="sm">Enable auto-renewal</Text>
                </HStack>

                <HStack justify="end" mt={6}>
                  <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">
                    <Icon as={FiEye} mr={2} />
                    Preview Ad
                  </Button>
                  <Button colorScheme="blue" variant="solid">
                    Submit for Review
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Modal Overlay */}
        {isCreateModalOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.600"
            zIndex={999}
            onClick={() => setIsCreateModalOpen(false)}
          />
        )}
      </VStack>
    </Container>
  );
};

export default AdsPromotionsPage;
