'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Grid,
  Card,
  Tabs,
  Heading,
  SimpleGrid,
  Switch
} from '@chakra-ui/react';
import {
  FiEdit3,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiStar,
  FiTarget,
  FiAward,
  FiDollarSign,
  FiCheck,
  FiMail,
  FiPhone,
  FiGlobe,
  FiPlus,
  FiBriefcase,
  FiZap,
  FiAlertTriangle,
  FiRefreshCw
} from 'react-icons/fi';
import { useUserRoleSafe } from '@/contexts/UserRoleContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Mock user data with distinct differences between roles
const mockUserData = {
  id: '1',
  fullName: 'Sarah Johnson',
  username: '@sarah_tech',
  bio: 'Experienced project manager and entrepreneur passionate about connecting talented professionals with innovative projects.',
  location: 'San Francisco, CA',
  joinedDate: 'Feb 2025',
  isVerified: true,
  
  requester: {
    trustTier: 'Premium Requester',
    ingeniousPayBalance: 2580.50,
    totalRequests: 47,
    projectsCompleted: 42,
    averageRating: 4.8,
    collaborations: 28,
    interests: ['Technology & Digital Services', 'Creative & Design', 'Business & Marketing'],
    preferredCommunication: ['Email', 'Video Call', 'Chat'],
    recentActivity: {
      lastProjects: ['Mobile App UI/UX Design', 'E-commerce Website Development', 'Brand Identity Package'],
      lastProviderHired: 'Alex Chen - Full Stack Developer',
      mostUsedCategory: 'Technology & Digital Services'
    }
  },
  
  provider: {
    hourlyRate: 85,
    trustInfo: {
      starRating: 4.9,
      gamificationLevel: 'Prime Plug',
      trustTier: 'Elite Provider'
    },
    metrics: {
      totalProjects: 89,
      completedProjects: 85,
      ongoingProjects: 4,
      completionRate: 95.5,
      clientRating: 4.9,
      onTimeDelivery: 96,
      repeatClients: 34
    },
    portfolio: [
      { id: '1', title: 'E-commerce Platform', category: 'Web Development', featured: true, visibility: 'Public' },
      { id: '2', title: 'Mobile Banking App', category: 'Mobile Development', featured: false, visibility: 'Public' },
      { id: '3', title: 'AI Dashboard', category: 'AI/ML Development', featured: true, visibility: 'Private' }
    ],
    skills: [
      { name: 'React.js', experience: '5 years', certified: true, level: 'Expert' },
      { name: 'Node.js', experience: '4 years', certified: true, level: 'Advanced' },
      { name: 'Python', experience: '3 years', certified: false, level: 'Intermediate' },
      { name: 'AWS', experience: '2 years', certified: true, level: 'Intermediate' }
    ],
    availability: {
      availableForWork: true,
      workingHours: '9 AM - 6 PM PST',
      teamInvites: true,
      smartMatch: true,
      maxActiveProjects: 5
    },
    financial: {
      balance: 15420.75,
      totalEarnings: 127800
    }
  }
};

const ProfilePageContent: React.FC = () => {
  const userRoleContext = useUserRoleSafe();
  const [activeTab, setActiveTab] = useState(0);

  if (!userRoleContext) {
    return (
      <Box minH="calc(100vh - 140px)" display="flex" alignItems="center" justifyContent="center" p={8} bg="gray.50">
        <Card.Root maxW="md" w="full">
          <Card.Body p={8} textAlign="center">
            <VStack gap={6}>
              <Box p={4} borderRadius="full" bg="orange.100">
                <FiAlertTriangle size={32} />
              </Box>
              <VStack gap={2}>
                <Text fontSize="xl" fontWeight="bold" color="gray.900">Authentication Required</Text>
                <Text color="gray.600" fontSize="sm">Please refresh the page or navigate back to home.</Text>
              </VStack>
              <VStack gap={3} w="full">
                <Button onClick={() => window.location.reload()} colorScheme="blue" w="full">
                  <FiRefreshCw style={{ marginRight: '8px' }} />
                  Refresh Page
                </Button>
                <Button onClick={() => window.location.href = '/home'} variant="outline" w="full">
                  Go to Home
                </Button>
              </VStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Box>
    );
  }

  const { userRole, toggleUserRole } = userRoleContext;
  const user = mockUserData;
  const isRequester = userRole === 'Requester';
  const isProvider = userRole === 'Provider';

  return (
    <Box p={6} maxW="100%" mx="auto">
      {/* Profile Header */}
      <Card.Root mb={6}>
        <Card.Body p={6}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
            {/* Profile Picture and Basic Info */}
            <VStack align="start" gap={4} minW="300px">
              <HStack gap={4}>
                <Box position="relative">
                  <Box w="80px" h="80px" borderRadius="full" bg="blue.100" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" fontWeight="bold" color="blue.600">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </Box>
                  <Button size="sm" position="absolute" bottom={0} right={0} borderRadius="full" colorScheme="blue" minW="auto" h="auto" p={1}>
                    <FiEdit3 size={12} />
                  </Button>
                </Box>
                
                <VStack align="start" gap={1}>
                  <HStack>
                    <Heading size="lg">{user.fullName}</Heading>
                    {user.isVerified && (
                      <Badge colorScheme="blue" variant="solid">
                        <HStack gap={1}>
                          <FiShield size={12} />
                          <Text fontSize="xs">Verified</Text>
                        </HStack>
                      </Badge>
                    )}
                  </HStack>
                  
                  <Text color="gray.600">{user.username}</Text>
                  
                  <HStack gap={4} fontSize="sm" color="gray.600">
                    <HStack gap={1}>
                      <FiMapPin size={14} />
                      <Text>{user.location}</Text>
                    </HStack>
                    <HStack gap={1}>
                      <FiCalendar size={14} />
                      <Text>Joined {user.joinedDate}</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
              
              <Text fontSize="sm" color="gray.700" maxW="400px">{user.bio}</Text>
            </VStack>

            {/* Role Toggle and Role-Specific Info */}
            <Flex flex={1} justify="space-between" align="start" direction={{ base: 'column', md: 'row' }} gap={4}>
              <VStack align="start" gap={3}>
                {/* Role Toggle */}
                <Card.Root bg="purple.50" borderColor="purple.200">
                  <Card.Body p={3}>
                    <HStack gap={3}>
                      <Text fontSize="sm" fontWeight="medium">Viewing as:</Text>
                      <Badge colorScheme="purple" variant="solid" fontSize="sm" p={2}>{userRole}</Badge>
                      <Button size="sm" colorScheme="purple" variant="outline" onClick={toggleUserRole}>
                        Switch to {userRole === 'Requester' ? 'Provider' : 'Requester'}
                      </Button>
                    </HStack>
                  </Card.Body>
                </Card.Root>
                
                {/* REQUESTER SPECIFIC DISPLAY */}
                {isRequester && (
                  <VStack align="start" gap={2}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">Requester Profile</Text>
                    <HStack gap={2} flexWrap="wrap">
                      <Badge colorScheme="gold" variant="solid">
                        <HStack gap={1}>
                          <FiZap size={12} />
                          <Text>{user.requester.trustTier}</Text>
                        </HStack>
                      </Badge>
                      <Badge colorScheme="green" variant="outline">
                        <HStack gap={1}>
                          <FiDollarSign size={12} />
                          <Text>${user.requester.ingeniousPayBalance.toFixed(2)} Balance</Text>
                        </HStack>
                      </Badge>
                      <Badge colorScheme="blue" variant="outline">
                        <HStack gap={1}>
                          <FiTarget size={12} />
                          <Text>{user.requester.projectsCompleted} Projects</Text>
                        </HStack>
                      </Badge>
                    </HStack>
                  </VStack>
                )}
                
                {/* PROVIDER SPECIFIC DISPLAY */}
                {isProvider && (
                  <VStack align="start" gap={2}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.600">Provider Profile</Text>
                    <HStack gap={2} flexWrap="wrap">
                      <Badge colorScheme="purple" variant="solid">
                        <HStack gap={1}>
                          <FiStar size={12} />
                          <Text>{user.provider.trustInfo.starRating} Rating</Text>
                        </HStack>
                      </Badge>
                      <Badge colorScheme="blue" variant="outline">
                        <HStack gap={1}>
                          <FiAward size={12} />
                          <Text>{user.provider.trustInfo.gamificationLevel}</Text>
                        </HStack>
                      </Badge>
                      <Badge colorScheme="green" variant="outline">
                        <HStack gap={1}>
                          <FiDollarSign size={12} />
                          <Text>${user.provider.hourlyRate}/hr</Text>
                        </HStack>
                      </Badge>
                      <Badge colorScheme="cyan" variant="outline">
                        <HStack gap={1}>
                          <FiBriefcase size={12} />
                          <Text>{user.provider.metrics.completedProjects} Completed</Text>
                        </HStack>
                      </Badge>
                    </HStack>
                  </VStack>
                )}
              </VStack>

              {/* Action Buttons */}
              <VStack gap={3}>
                <Button colorScheme="blue">
                  <FiEdit3 style={{ marginRight: '8px' }} />
                  Edit Profile
                </Button>
                
                {isRequester && (
                  <Button colorScheme="green" variant="outline">Post New Request</Button>
                )}
                
                {isProvider && (
                  <VStack gap={2}>
                    <Button colorScheme="purple" variant="outline">Create Service Listing</Button>
                    <HStack gap={2}>
                      <Text fontSize="xs" color="gray.600">Status:</Text>
                      <Badge colorScheme={user.provider.availability.availableForWork ? "green" : "red"} variant="solid" size="sm">
                        {user.provider.availability.availableForWork ? "Available" : "Busy"}
                      </Badge>
                    </HStack>
                  </VStack>
                )}
              </VStack>
            </Flex>
          </Flex>
        </Card.Body>
      </Card.Root>

      {/* Tab Navigation */}
      <Tabs.Root value={activeTab.toString()} onValueChange={(details) => setActiveTab(parseInt(details.value))}>
        <Tabs.List mb={6}>
          <Tabs.Trigger value="0">{isRequester ? "Request History" : "Portfolio & Services"}</Tabs.Trigger>
          <Tabs.Trigger value="1">{isRequester ? "Payment & Billing" : "Earnings & Performance"}</Tabs.Trigger>
          <Tabs.Trigger value="2">Trust & Verification</Tabs.Trigger>
          <Tabs.Trigger value="3">{isRequester ? "Preferences" : "Skills & Availability"}</Tabs.Trigger>
        </Tabs.List>

        {/* Tab Content */}
        <Tabs.Content value="0">
          {isRequester ? <RequesterHistory user={user} /> : <ProviderPortfolio user={user} />}
        </Tabs.Content>

        <Tabs.Content value="1">
          {isRequester ? <RequesterBilling user={user} /> : <ProviderEarnings user={user} />}
        </Tabs.Content>

        <Tabs.Content value="2">
          <TrustVerification user={user} userRole={userRole} />
        </Tabs.Content>

        <Tabs.Content value="3">
          {isRequester ? <RequesterPreferences user={user} /> : <ProviderSkills user={user} />}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

// REQUESTER SPECIFIC COMPONENTS
const RequesterHistory: React.FC<{ user: typeof mockUserData }> = ({ user }) => {
  return (
    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
      <Card.Root>
        <Card.Header><Heading size="md">Request Statistics</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={4}>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Total Requests Made</Text>
              <Text fontWeight="bold" color="blue.600">{user.requester.totalRequests}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Successfully Completed</Text>
              <Text fontWeight="bold" color="green.600">{user.requester.projectsCompleted}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Average Rating Given</Text>
              <Text fontWeight="bold" color="yellow.600">{user.requester.averageRating}/5</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Repeat Collaborations</Text>
              <Text fontWeight="bold" color="purple.600">{user.requester.collaborations}</Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header><Heading size="md">Recent Request Activity</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={3}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Last 3 Requests</Text>
              {user.requester.recentActivity.lastProjects.map((project, index) => (
                <Text key={index} fontSize="sm" color="gray.600" mb={1}>• {project}</Text>
              ))}
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Latest Provider Hired</Text>
              <Text fontSize="sm" color="gray.600">{user.requester.recentActivity.lastProviderHired}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Most Requested Category</Text>
              <Badge colorScheme="blue" variant="outline">{user.requester.recentActivity.mostUsedCategory}</Badge>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

const RequesterBilling: React.FC<{ user: typeof mockUserData }> = ({ user }) => {
  return (
    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
      <Card.Root>
        <Card.Header><Heading size="md">IngeniousPay Balance</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={4}>
            <Box textAlign="center" w="full">
              <Text fontSize="3xl" fontWeight="bold" color="green.600">${user.requester.ingeniousPayBalance.toFixed(2)}</Text>
              <Text fontSize="sm" color="gray.600">Available Balance</Text>
            </Box>
            <Button colorScheme="blue" w="full">Add Funds</Button>
            <Button variant="outline" w="full">Transaction History</Button>
          </VStack>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header><Heading size="md">Account Benefits</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={3}>
            <Badge colorScheme="gold" variant="solid" size="lg" p={2}>Premium Account</Badge>
            <Text fontSize="sm" color="gray.600">• Priority customer support</Text>
            <Text fontSize="sm" color="gray.600">• Advanced project management tools</Text>
            <Text fontSize="sm" color="gray.600">• Higher payment limits</Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

const RequesterPreferences: React.FC<{ user: typeof mockUserData }> = ({ user }) => {
  return (
    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
      <Card.Root>
        <Card.Header><Heading size="md">Interests & Categories</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={3}>
            {user.requester.interests.map((interest, index) => (
              <HStack key={index} justify="space-between" w="full">
                <Text fontSize="sm">{interest}</Text>
                <Switch.Root defaultChecked colorPalette="blue" size="sm">
                  <Switch.HiddenInput />
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Root>
              </HStack>
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header><Heading size="md">Communication Preferences</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={3}>
            {user.requester.preferredCommunication.map((method, index) => (
              <HStack key={index} justify="space-between" w="full">
                <Text fontSize="sm">{method}</Text>
                <Switch.Root defaultChecked colorPalette="green" size="sm">
                  <Switch.HiddenInput />
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Root>
              </HStack>
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

// PROVIDER SPECIFIC COMPONENTS
const ProviderPortfolio: React.FC<{ user: typeof mockUserData }> = ({ user }) => {
  return (
    <VStack gap={6}>
      <HStack justify="space-between" w="full">
        <VStack align="start" gap={1}>
          <Heading size="md">Portfolio & Services</Heading>
          <Text fontSize="sm" color="gray.600">Showcase your work to attract more clients</Text>
        </VStack>
        <Button colorScheme="blue">
          <FiPlus style={{ marginRight: '8px' }} />
          Add Portfolio Item
        </Button>
      </HStack>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
        {user.provider.portfolio.map((item) => (
          <Card.Root key={item.id}>
            <Box h="200px" bg="gradient-to-br from-blue-100 to-purple-100" borderTopRadius="md" display="flex" alignItems="center" justifyContent="center">
              <Text color="gray.600" fontSize="sm">Portfolio Preview</Text>
            </Box>
            <Card.Body>
              <VStack align="start" gap={2}>
                <HStack justify="space-between" w="full">
                  <Text fontWeight="medium">{item.title}</Text>
                  <HStack gap={1}>
                    {item.featured && (
                      <Badge colorScheme="gold" size="sm">
                        <HStack gap={1}>
                          <FiStar size={10} />
                          <Text fontSize="xs">Featured</Text>
                        </HStack>
                      </Badge>
                    )}
                    <Badge colorScheme={item.visibility === 'Public' ? 'green' : 'gray'} variant="outline" size="sm">
                      {item.visibility}
                    </Badge>
                  </HStack>
                </HStack>
                <Text fontSize="sm" color="gray.600">{item.category}</Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

const ProviderEarnings: React.FC<{ user: typeof mockUserData }> = ({ user }) => {
  return (
    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
      <Card.Root>
        <Card.Header><Heading size="md">Financial Overview</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={4}>
            <Box textAlign="center" w="full">
              <Text fontSize="3xl" fontWeight="bold" color="green.600">${user.provider.financial.balance.toFixed(2)}</Text>
              <Text fontSize="sm" color="gray.600">Available Balance</Text>
            </Box>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Total Earnings</Text>
              <Text fontWeight="bold" color="purple.600">${user.provider.financial.totalEarnings.toLocaleString()}</Text>
            </HStack>
            <Button colorScheme="green" w="full">Request Payout</Button>
          </VStack>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header><Heading size="md">Performance Metrics</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={3}>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Completion Rate</Text>
              <Text fontWeight="bold" color="green.600">{user.provider.metrics.completionRate}%</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Client Rating</Text>
              <Text fontWeight="bold" color="yellow.600">{user.provider.metrics.clientRating}/5</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">On-Time Delivery</Text>
              <Text fontWeight="bold" color="blue.600">{user.provider.metrics.onTimeDelivery}%</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm">Repeat Clients</Text>
              <Text fontWeight="bold" color="purple.600">{user.provider.metrics.repeatClients}</Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

const ProviderSkills: React.FC<{ user: typeof mockUserData }> = ({ user }) => {
  return (
    <VStack gap={6}>
      <Card.Root w="full">
        <Card.Header>
          <HStack justify="space-between">
            <Heading size="md">Skills & Expertise</Heading>
            <Button size="sm" colorScheme="blue" variant="outline">
              <FiPlus style={{ marginRight: '6px' }} />
              Add Skill
            </Button>
          </HStack>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {user.provider.skills.map((skill, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="medium">{skill.name}</Text>
                  <HStack gap={1}>
                    <Badge colorScheme="blue" variant="outline" size="sm">{skill.level}</Badge>
                    {skill.certified && (
                      <Badge colorScheme="green" size="sm">
                        <HStack gap={1}>
                          <FiCheck size={10} />
                          <Text fontSize="xs">Certified</Text>
                        </HStack>
                      </Badge>
                    )}
                  </HStack>
                </HStack>
                <Text fontSize="sm" color="gray.600">{skill.experience} experience</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Card.Body>
      </Card.Root>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6} w="full">
        <Card.Root>
          <Card.Header><Heading size="md">Availability Settings</Heading></Card.Header>
          <Card.Body>
            <VStack align="start" gap={4}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Available for work</Text>
                <Switch.Root defaultChecked={user.provider.availability.availableForWork} colorPalette="green">
                  <Switch.HiddenInput />
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Root>
              </HStack>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={1}>Working Hours</Text>
                <Text fontSize="sm" color="gray.600">{user.provider.availability.workingHours}</Text>
              </Box>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Accept Team Invites</Text>
                <Switch.Root defaultChecked={user.provider.availability.teamInvites} colorPalette="blue">
                  <Switch.HiddenInput />
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Root>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Smart Match Requests</Text>
                <Switch.Root defaultChecked={user.provider.availability.smartMatch} colorPalette="purple">
                  <Switch.HiddenInput />
                  <Switch.Control><Switch.Thumb /></Switch.Control>
                </Switch.Root>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Header><Heading size="md">Service Information</Heading></Card.Header>
          <Card.Body>
            <VStack align="start" gap={3}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">Hourly Rate</Text>
                <Text fontWeight="bold" fontSize="lg" color="green.600">${user.provider.hourlyRate}/hour</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.600">Max Active Projects</Text>
                <Text fontSize="sm">{user.provider.availability.maxActiveProjects} projects</Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Grid>
    </VStack>
  );
};

// SHARED COMPONENTS
const TrustVerification: React.FC<{ user: typeof mockUserData; userRole: string }> = ({ user, userRole }) => {
  const isRequester = userRole === 'Requester';
  
  const verificationItems = [
    { label: 'KYC Status', completed: user.isVerified, icon: FiShield },
    { label: 'Email Verified', completed: true, icon: FiMail },
    { label: 'Phone Number Linked', completed: true, icon: FiPhone },
    { label: 'Social Media Linked', completed: false, icon: FiGlobe }
  ];

  return (
    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
      <Card.Root>
        <Card.Header><Heading size="md">Verification Status</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={4}>
            {verificationItems.map((item, index) => (
              <HStack key={index} justify="space-between" w="full">
                <HStack gap={2}>
                  <item.icon size={16} />
                  <Text fontSize="sm">{item.label}</Text>
                </HStack>
                {item.completed ? (
                  <Badge colorScheme="green" variant="solid" size="sm"><FiCheck size={12} /></Badge>
                ) : (
                  <Badge colorScheme="gray" variant="outline" size="sm">Pending</Badge>
                )}
              </HStack>
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header><Heading size="md">Trust Level</Heading></Card.Header>
        <Card.Body>
          <VStack align="start" gap={4}>
            <Box w="full">
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">{isRequester ? 'Requester Tier' : 'Provider Level'}</Text>
                <Badge colorScheme="purple" variant="solid">
                  <HStack gap={1}>
                    <FiZap size={12} />
                    <Text>{isRequester ? user.requester.trustTier : user.provider.trustInfo.gamificationLevel}</Text>
                  </HStack>
                </Badge>
              </HStack>
              <Box w="full" bg="gray.200" borderRadius="md" h="2">
                <Box w="85%" bg="purple.500" borderRadius="md" h="2" />
              </Box>
              <Text fontSize="xs" color="gray.500" mt={1}>85% Trust Score</Text>
            </Box>
            
            <Button size="sm" colorScheme="blue" variant="outline">
              <FiPlus style={{ marginRight: '6px' }} />
              Increase Trust Level
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Grid>
  );
};

export default function ProfilePage() {
  return (
    <ErrorBoundary>
      <ProfilePageContent />
    </ErrorBoundary>
  );
}
