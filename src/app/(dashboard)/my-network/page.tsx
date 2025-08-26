'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Card,
  Avatar,
  Badge,
  Button,
  Tabs,
  Input,
  Flex,
  IconButton,
  Separator,
  SimpleGrid,
  Switch,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiCalendar,
  FiUsers,
  FiUserPlus,
  FiGift,
  FiMessageSquare,
  FiAward,
  FiTarget,
  FiHeart,
  FiPlus,
  FiEdit3,
  FiCheck,
  FiX,
  FiActivity,
} from 'react-icons/fi';
import { useState } from 'react';

// Interfaces
interface Provider {
  id: number;
  name: string;
  avatar: string;
  serviceType: string;
  rating: number;
  lastHired: string;
  totalJobs: number;
  category: string;
  status: string;
}

interface Collaborator {
  id: number;
  name: string;
  avatar: string;
  category: string;
  skills: string[];
  collaborationCount: number;
  rating: number;
  frequency: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface Team {
  id: number;
  name: string;
  members: TeamMember[];
  pastProjects: number;
  avgRating: number;
}

interface Referral {
  id: number;
  type: string;
  name: string;
  referredTo: string;
  status: string;
  rewardPoints: number;
  date: string;
}

interface PendingRequest {
  id: number;
  type: 'collaboration' | 'team_join';
  requesterName: string;
  requesterAvatar: string;
  projectTitle: string;
  role: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface NetworkStats {
  totalHires?: number;
  teamProjects: number;
  favoriteProviders?: number;
  referralPoints: number;
  totalCollaborators?: number;
  totalReferrals?: number;
  networkImpact?: number;
}

// Mock Data
const mockProviders: Provider[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/images/avatar1.jpg',
    serviceType: 'UI/UX Design',
    rating: 4.9,
    lastHired: '2024-01-15',
    totalJobs: 8,
    category: 'Design',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: '/images/avatar2.jpg',
    serviceType: 'Full-Stack Development',
    rating: 4.8,
    lastHired: '2024-01-10',
    totalJobs: 12,
    category: 'Tech',
    status: 'Busy',
  },
];

const mockCollaborators: Collaborator[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    avatar: '/images/avatar3.jpg',
    category: 'Design',
    skills: ['UI Design', 'Prototyping', 'User Research'],
    collaborationCount: 15,
    rating: 4.8,
    frequency: 'Regular',
  },
  {
    id: 2,
    name: 'Jordan Smith',
    avatar: '/images/avatar4.jpg',
    category: 'Development',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    collaborationCount: 8,
    rating: 4.9,
    frequency: 'Occasional',
  },
];

const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Tech Squad',
    members: [
      { name: 'Sarah Johnson', role: 'UI/UX Designer', avatar: '/images/avatar1.jpg' },
      { name: 'Michael Chen', role: 'Developer', avatar: '/images/avatar2.jpg' },
    ],
    pastProjects: 5,
    avgRating: 4.8,
  },
];

const mockPendingRequests: PendingRequest[] = [
  {
    id: 1,
    type: 'collaboration',
    requesterName: 'TechCorp Inc.',
    requesterAvatar: '/images/company1.jpg',
    projectTitle: 'E-commerce Platform Development',
    role: 'Senior Frontend Developer',
    date: '2024-01-20',
    status: 'pending',
  },
];

const mockReferrals: Referral[] = [
  {
    id: 1,
    type: 'Provider',
    name: 'Emma Davis',
    referredTo: 'StartupXYZ',
    status: 'Hired',
    rewardPoints: 200,
    date: '2024-01-18',
  },
];

// Component Definitions
const RequesterProviderCard = ({ provider }: { provider: Provider }) => (
  <Card.Root p={6} borderRadius="lg" shadow="sm" _hover={{ shadow: 'md' }}>
    <Card.Body>
      <VStack gap={4} align="stretch">
        <HStack gap={4}>
          <Avatar.Root size="lg">
            <Avatar.Image src={provider.avatar} alt={provider.name} />
            <Avatar.Fallback>{provider.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
          </Avatar.Root>
          <Box flex={1}>
            <Heading size="md" mb={1}>{provider.name}</Heading>
            <Text color="gray.600" mb={2}>{provider.serviceType}</Text>
            <HStack gap={2}>
              <HStack gap={1}>
                <FiStar color="#fbbf24" />
                <Text fontWeight="semibold">{provider.rating}</Text>
              </HStack>
              <Badge colorScheme={provider.status === 'Available' ? 'green' : 'orange'}>
                {provider.status}
              </Badge>
            </HStack>
          </Box>
        </HStack>

        <Separator />

        <HStack gap={4} fontSize="sm" color="gray.600">
          <HStack>
            <FiCalendar />
            <Text>Last hired: {new Date(provider.lastHired).toLocaleDateString()}</Text>
          </HStack>
          <HStack>
            <FiTarget />
            <Text>{provider.totalJobs} jobs together</Text>
          </HStack>
        </HStack>

        <HStack gap={2}>
          <Button colorScheme="blue" size="sm" flex={1}>
            <FiUserPlus />
            Hire Again
          </Button>
          <Button variant="outline" size="sm" flex={1}>
            <FiHeart />
            Add to Team
          </Button>
        </HStack>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const CollaboratorCard = ({ collaborator }: { collaborator: Collaborator }) => (
  <Card.Root p={6} borderRadius="lg" shadow="sm" _hover={{ shadow: 'md' }}>
    <Card.Body>
      <VStack gap={4} align="stretch">
        <HStack gap={4}>
          <Avatar.Root size="lg">
            <Avatar.Image src={collaborator.avatar} alt={collaborator.name} />
            <Avatar.Fallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
          </Avatar.Root>
          <Box flex={1}>
            <Heading size="md" mb={1}>{collaborator.name}</Heading>
            <Text color="gray.600" mb={2}>{collaborator.category}</Text>
            <HStack gap={1} mb={2}>
              <FiStar color="#fbbf24" />
              <Text fontWeight="semibold">{collaborator.rating}</Text>
              <Badge variant="outline" ml={2}>{collaborator.frequency}</Badge>
            </HStack>
          </Box>
        </HStack>

        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>Skills:</Text>
          <Flex gap={1} wrap="wrap">
            {collaborator.skills.slice(0, 3).map((skill, index) => (
              <Badge key={`${skill}-${index}`} variant="subtle" fontSize="xs">
                {skill}
              </Badge>
            ))}
            {collaborator.skills.length > 3 && (
              <Badge variant="outline" fontSize="xs">
                +{collaborator.skills.length - 3} more
              </Badge>
            )}
          </Flex>
        </Box>

        <Separator />

        <HStack gap={4} fontSize="sm" color="gray.600">
          <HStack>
            <FiUsers />
            <Text>{collaborator.collaborationCount} collaborations</Text>
          </HStack>
        </HStack>

        <Button colorScheme="blue" size="sm">
          <FiUserPlus />
          Invite to New Project
        </Button>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const PendingRequestCard = ({ request }: { request: PendingRequest }) => (
  <Card.Root p={4} borderRadius="lg" shadow="sm">
    <Card.Body>
      <VStack gap={3} align="stretch">
        <HStack gap={3}>
          <Avatar.Root size="md">
            <Avatar.Image src={request.requesterAvatar} alt={request.requesterName} />
            <Avatar.Fallback>{request.requesterName.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
          </Avatar.Root>
          <Box flex={1}>
            <Text fontWeight="semibold">{request.requesterName}</Text>
            <Text fontSize="sm" color="gray.600">{request.projectTitle}</Text>
            <Badge variant="outline" fontSize="xs" mt={1}>
              {request.type === 'collaboration' ? 'Collaboration' : 'Team Join'}
            </Badge>
          </Box>
        </HStack>

        <Box bg="gray.50" p={3} borderRadius="md">
          <Text fontSize="sm">
            <Text as="span" fontWeight="semibold">Role:</Text> {request.role}
          </Text>
        </Box>

        <HStack gap={2}>
          <Button colorScheme="green" size="sm" flex={1}>
            <FiCheck />
            Accept
          </Button>
          <Button variant="outline" colorScheme="red" size="sm" flex={1}>
            <FiX />
            Decline
          </Button>
        </HStack>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const ReferralTreeCard = ({ referral }: { referral: Referral }) => (
  <Card.Root p={4} borderRadius="lg" shadow="sm">
    <Card.Body>
      <HStack gap={4}>
        <Box position="relative">
          <Avatar.Root size="md">
            <Avatar.Image src="/images/default-avatar.jpg" alt={referral.name} />
            <Avatar.Fallback>{referral.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
          </Avatar.Root>
          {referral.status === 'Hired' && (
            <Box
              position="absolute"
              top="-2"
              right="-2"
              bg="green.500"
              borderRadius="full"
              p={1}
            >
              <FiCheck color="white" size={12} />
            </Box>
          )}
        </Box>
        <Box flex={1}>
          <Text fontWeight="semibold">{referral.name}</Text>
          <Text fontSize="sm" color="gray.600">{referral.type}</Text>
          <Badge colorScheme="green" variant="subtle" fontSize="xs" mt={1}>
            +{referral.rewardPoints} pts
          </Badge>
        </Box>
        <VStack align="end" gap={0}>
          <Badge colorScheme={referral.status === 'Hired' ? 'green' : 'orange'} fontSize="xs">
            {referral.status}
          </Badge>
          <Text fontSize="xs" color="gray.500">
            {new Date(referral.date).toLocaleDateString()}
          </Text>
        </VStack>
      </HStack>
    </Card.Body>
  </Card.Root>
);

const TeamCard = ({ team }: { team: Team }) => (
  <Card.Root p={6} borderRadius="lg" shadow="sm">
    <Card.Body>
      <VStack gap={4} align="stretch">
        <HStack justify="space-between">
          <Heading size="md">{team.name}</Heading>
          <IconButton variant="ghost" size="sm" aria-label="Edit team">
            <FiEdit3 />
          </IconButton>
        </HStack>

        <Flex gap={2} wrap="wrap">
          {team.members.map((member: TeamMember, index: number) => (
            <HStack key={`${member.name}-${index}`} gap={2} bg="gray.50" px={3} py={1} borderRadius="full">
              <Avatar.Root size="xs">
                <Avatar.Image src={member.avatar} alt={member.name} />
                <Avatar.Fallback>{member.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
              </Avatar.Root>
              <Text fontSize="sm">{member.name}</Text>
              <Badge variant="outline" fontSize="xs">{member.role}</Badge>
            </HStack>
          ))}
        </Flex>

        <HStack gap={4} fontSize="sm" color="gray.600">
          <HStack>
            <FiTarget />
            <Text>{team.pastProjects} projects</Text>
          </HStack>
          <HStack>
            <FiStar />
            <Text>{team.avgRating} avg rating</Text>
          </HStack>
        </HStack>

        <Button variant="outline">
          <FiUsers />
          {team.name.includes('Squad') ? 'Invite Team' : 'Hire Team'}
        </Button>
      </VStack>
    </Card.Body>
  </Card.Root>
);

const ReferralCard = ({ referral }: { referral: Referral }) => (
  <Card.Root p={4} borderRadius="lg" shadow="sm">
    <Card.Body>
      <HStack justify="space-between" align="start">
        <VStack align="start" gap={2} flex={1}>
          <HStack>
            <Badge colorScheme={referral.type === 'Provider' ? 'blue' : 'purple'}>
              {referral.type}
            </Badge>
            <Text fontWeight="semibold">{referral.name}</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Referred to: {referral.referredTo}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {new Date(referral.date).toLocaleDateString()}
          </Text>
        </VStack>
        <VStack align="end" gap={1}>
          <Badge colorScheme="green">{referral.status}</Badge>
          <HStack gap={1}>
            <FiGift color="#10b981" />
            <Text fontWeight="bold" color="green.500">
              +{referral.rewardPoints} pts
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card.Body>
  </Card.Root>
);

const NetworkOverview = ({ stats, isProvider = false }: { stats: NetworkStats; isProvider?: boolean }) => (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
    <Card.Root p={4} textAlign="center">
      <Card.Body>
        <VStack>
          <Box p={3} bg="blue.100" borderRadius="full">
            <FiUsers size={24} color="#3182ce" />
          </Box>
          <Heading size="lg">{isProvider ? stats.totalCollaborators : stats.totalHires}</Heading>
          <Text color="gray.600">{isProvider ? 'Total Collaborators' : 'Total Hires'}</Text>
        </VStack>
      </Card.Body>
    </Card.Root>
    <Card.Root p={4} textAlign="center">
      <Card.Body>
        <VStack>
          <Box p={3} bg="green.100" borderRadius="full">
            <FiTarget size={24} color="#38a169" />
          </Box>
          <Heading size="lg">{stats.teamProjects}</Heading>
          <Text color="gray.600">Team Projects</Text>
        </VStack>
      </Card.Body>
    </Card.Root>
    <Card.Root p={4} textAlign="center">
      <Card.Body>
        <VStack>
          <Box p={3} bg="purple.100" borderRadius="full">
            {isProvider ? <FiGift size={24} color="#805ad5" /> : <FiHeart size={24} color="#805ad5" />}
          </Box>
          <Heading size="lg">{isProvider ? stats.totalReferrals : stats.favoriteProviders}</Heading>
          <Text color="gray.600">{isProvider ? 'Total Referrals' : 'Favorite Providers'}</Text>
        </VStack>
      </Card.Body>
    </Card.Root>
    <Card.Root p={4} textAlign="center">
      <Card.Body>
        <VStack>
          <Box p={3} bg="yellow.100" borderRadius="full">
            {isProvider ? <FiActivity size={24} color="#d69e2e" /> : <FiAward size={24} color="#d69e2e" />}
          </Box>
          <Heading size="lg">{isProvider ? stats.networkImpact : stats.referralPoints}</Heading>
          <Text color="gray.600">{isProvider ? 'Network Impact' : 'Referral Points'}</Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  </SimpleGrid>
);

const MyNetworkPage = () => {
  const [isProvider, setIsProvider] = useState(false);
  const [activeTab, setActiveTab] = useState(isProvider ? 'collaborators' : 'providers');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const categories = ['All', 'Design', 'Tech', 'Writing', 'Marketing', 'Events'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];

  // Filter logic for providers/collaborators
  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'All' || provider.category === categoryFilter;
    const matchesRating = !ratingFilter || ratingFilter === 'All' || 
                         (ratingFilter === '4.5+' && provider.rating >= 4.5) ||
                         (ratingFilter === '4.0+' && provider.rating >= 4.0) ||
                         (ratingFilter === '3.5+' && provider.rating >= 3.5);
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  const filteredCollaborators = mockCollaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'All' || collaborator.category === categoryFilter;
    const matchesRating = !ratingFilter || ratingFilter === 'All' || 
                         (ratingFilter === '4.5+' && collaborator.rating >= 4.5) ||
                         (ratingFilter === '4.0+' && collaborator.rating >= 4.0) ||
                         (ratingFilter === '3.5+' && collaborator.rating >= 3.5);
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  // Update active tab when role switches
  const handleRoleSwitch = (checked: boolean) => {
    setIsProvider(checked);
    setActiveTab(checked ? 'collaborators' : 'providers');
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header with Role Switch */}
        <Box>
          <HStack gap={3} mb={4} justify="space-between">
            <HStack gap={3}>
              <Box p={2} bg="blue.100" borderRadius="lg">
                <FiUsers size={24} color="#3182ce" />
              </Box>
              <Heading>My Network</Heading>
            </HStack>
            
            {/* Role Switch */}
            <HStack gap={3}>
              <Text fontSize="sm" color="gray.600">Requester</Text>
              <Switch.Root checked={isProvider} onCheckedChange={(details) => handleRoleSwitch(details.checked)}>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
              <Text fontSize="sm" color="gray.600">Provider</Text>
            </HStack>
          </HStack>
          
          <Text color="gray.600">
            {isProvider 
              ? "Manage collaborations, track referrers, and build professional teams"
              : "Build trusted relationships with go-to providers and manage your professional network"
            }
          </Text>
        </Box>

        {/* Network Overview */}
        <NetworkOverview 
          isProvider={isProvider}
          stats={isProvider ? {
            totalCollaborators: 25,
            teamProjects: 8,
            totalReferrals: 12,
            referralPoints: 1840,
            networkImpact: 94
          } : {
            totalHires: 47,
            teamProjects: 12,
            favoriteProviders: 8,
            referralPoints: 1250
          }} 
        />

        {/* Tabs - Different for Each Role */}
        <Tabs.Root value={activeTab} onValueChange={(details) => setActiveTab(details.value)}>
          <Tabs.List>
            {isProvider ? (
              <>
                <Tabs.Trigger value="collaborators">
                  <HStack>
                    <FiUsers />
                    <Text>My Collaborators</Text>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="referral-tree">
                  <HStack>
                    <FiGift />
                    <Text>Referral Tree</Text>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="teams">
                  <HStack>
                    <FiTarget />
                    <Text>My Teams</Text>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="requests">
                  <HStack>
                    <FiMessageSquare />
                    <Text>Pending Requests</Text>
                  </HStack>
                </Tabs.Trigger>
              </>
            ) : (
              <>
                <Tabs.Trigger value="providers">
                  <HStack>
                    <FiUsers />
                    <Text>My Providers</Text>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="teams">
                  <HStack>
                    <FiTarget />
                    <Text>My Teams</Text>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="referrals">
                  <HStack>
                    <FiGift />
                    <Text>Referrals</Text>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="feedback">
                  <HStack>
                    <FiMessageSquare />
                    <Text>Feedback Log</Text>
                  </HStack>
                </Tabs.Trigger>
              </>
            )}
          </Tabs.List>

          {/* Provider Tabs Content */}
          {isProvider ? (
            <>
              {/* My Collaborators Tab */}
              <Tabs.Content value="collaborators">
                <VStack gap={6} align="stretch">
                  {/* Search and Filters */}
                  <Card.Root p={4}>
                    <Card.Body>
                      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
                        <Box position="relative">
                          <FiSearch 
                            style={{ 
                              position: 'absolute', 
                              left: 12, 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              color: '#718096'
                            }} 
                          />
                          <Input
                            pl={10}
                            placeholder="Search collaborators..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </Box>
                        <select 
                          value={categoryFilter} 
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <select 
                          value={ratingFilter} 
                          onChange={(e) => setRatingFilter(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Rating</option>
                          {ratings.map(rating => (
                            <option key={rating} value={rating}>
                              {rating}
                            </option>
                          ))}
                        </select>
                        <Button variant="outline">
                          <FiFilter />
                          More Filters
                        </Button>
                      </Grid>
                    </Card.Body>
                  </Card.Root>

                  {/* Collaborators Grid */}
                  <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                    {filteredCollaborators.map(collaborator => (
                      <CollaboratorCard key={collaborator.id} collaborator={collaborator} />
                    ))}
                  </Grid>
                </VStack>
              </Tabs.Content>

              {/* Referral Tree Tab */}
              <Tabs.Content value="referral-tree">
                <VStack gap={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="md">My Referral Tree</Heading>
                    <Button colorScheme="green">
                      <FiUserPlus />
                      Make Referral
                    </Button>
                  </HStack>

                  <Card.Root p={6}>
                    <Card.Body>
                      <Text mb={4} fontSize="lg" fontWeight="semibold">Referral Network</Text>
                      <VStack gap={4}>
                        {mockReferrals.map(referral => (
                          <ReferralTreeCard key={referral.id} referral={referral} />
                        ))}
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              </Tabs.Content>

              {/* My Teams Tab */}
              <Tabs.Content value="teams">
                <VStack gap={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="md">Saved Teams</Heading>
                    <Button colorScheme="blue">
                      <FiPlus />
                      Create New Team
                    </Button>
                  </HStack>

                  <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                    {mockTeams.map(team => (
                      <TeamCard key={team.id} team={team} />
                    ))}
                  </Grid>
                </VStack>
              </Tabs.Content>

              {/* Pending Requests Tab */}
              <Tabs.Content value="requests">
                <VStack gap={6} align="stretch">
                  <Heading size="md">Pending Collaboration Requests</Heading>
                  
                  <VStack gap={4}>
                    {mockPendingRequests.map(request => (
                      <PendingRequestCard key={request.id} request={request} />
                    ))}
                  </VStack>

                  {/* Request History */}
                  <Box>
                    <Heading size="sm" mb={4}>Request History</Heading>
                    <Card.Root p={4}>
                      <Card.Body>
                        <Text color="gray.500" textAlign="center">
                          No request history available
                        </Text>
                      </Card.Body>
                    </Card.Root>
                  </Box>
                </VStack>
              </Tabs.Content>
            </>
          ) : (
            <>
              {/* Requester Tabs Content - My Providers Tab */}
              <Tabs.Content value="providers">
                <VStack gap={6} align="stretch">
                  {/* Search and Filters */}
                  <Card.Root p={4}>
                    <Card.Body>
                      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
                        <Box position="relative">
                          <FiSearch 
                            style={{ 
                              position: 'absolute', 
                              left: 12, 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              color: '#718096'
                            }} 
                          />
                          <Input
                            pl={10}
                            placeholder="Search providers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </Box>
                        <select 
                          value={categoryFilter} 
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <select 
                          value={ratingFilter} 
                          onChange={(e) => setRatingFilter(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Rating</option>
                          {ratings.map(rating => (
                            <option key={rating} value={rating}>
                              {rating}
                            </option>
                          ))}
                        </select>
                        <Button variant="outline">
                          <FiFilter />
                          More Filters
                        </Button>
                      </Grid>
                    </Card.Body>
                  </Card.Root>

                  {/* Providers Grid */}
                  <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                    {filteredProviders.map(provider => (
                      <RequesterProviderCard key={provider.id} provider={provider} />
                    ))}
                  </Grid>
                </VStack>
              </Tabs.Content>

              {/* My Teams Tab */}
              <Tabs.Content value="teams">
                <VStack gap={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="md">Your Teams</Heading>
                    <Button colorScheme="blue">
                      <FiPlus />
                      Create New Team
                    </Button>
                  </HStack>

                  <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                    {mockTeams.map(team => (
                      <TeamCard key={team.id} team={team} />
                    ))}
                  </Grid>
                </VStack>
              </Tabs.Content>

              {/* Referrals Tab */}
              <Tabs.Content value="referrals">
                <VStack gap={6} align="stretch">
                  <HStack justify="space-between">
                    <Heading size="md">Referrals Made</Heading>
                    <Button colorScheme="green">
                      <FiUserPlus />
                      Make Referral
                    </Button>
                  </HStack>

                  <VStack gap={4}>
                    {mockReferrals.map(referral => (
                      <ReferralCard key={referral.id} referral={referral} />
                    ))}
                  </VStack>
                </VStack>
              </Tabs.Content>

              {/* Feedback Log Tab */}
              <Tabs.Content value="feedback">
                <VStack gap={6} align="stretch">
                  <Heading size="md">Provider Feedback History</Heading>
                  
                  <Card.Root p={6}>
                    <Card.Body>
                      <VStack gap={4} align="start">
                        <HStack gap={4}>
                          <Avatar.Root size="md">
                            <Avatar.Image src="/images/avatar1.jpg" alt="Sarah Johnson" />
                            <Avatar.Fallback>SJ</Avatar.Fallback>
                          </Avatar.Root>
                          <Box>
                            <Text fontWeight="semibold">Sarah Johnson - UI/UX Design Project</Text>
                            <Text fontSize="sm" color="gray.600">January 15, 2024</Text>
                          </Box>
                        </HStack>
                        <Text>
                          "Exceptional work on the mobile app redesign. Sarah delivered beyond expectations 
                          with creative solutions and timely communication throughout the project."
                        </Text>
                        <HStack>
                          <Badge colorScheme="green">5 Star Rating</Badge>
                          <Badge variant="outline">UI/UX Design</Badge>
                        </HStack>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </VStack>
              </Tabs.Content>
            </>
          )}
        </Tabs.Root>
      </VStack>
    </Container>
  );
};

export default MyNetworkPage;
