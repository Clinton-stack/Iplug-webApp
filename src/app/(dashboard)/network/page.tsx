'use client';

import React, { useState } from 'react';
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
  Input,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiShare2,
  FiStar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiUserCheck,
  FiTrendingUp,
  FiGitBranch,
  FiLink,
  FiAward,
  FiHeart,
  FiTarget,
} from 'react-icons/fi';

// Custom Avatar Component for Chakra UI v3 compatibility
const Avatar = ({ size, src, ...props }: any) => {
  const sizeMap = {
    sm: '32px',
    lg: '56px'
  };
  
  return (
    <Box
      w={sizeMap[size as keyof typeof sizeMap] || '40px'}
      h={sizeMap[size as keyof typeof sizeMap] || '40px'}
      borderRadius="full"
      bg="gray.200"
      bgImage={`url(${src})`}
      bgSize="cover"
      bgPosition="center"
      {...props}
    />
  );
};
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

// Interfaces
interface Connection {
  id: string;
  name: string;
  avatar: string;
  role: string;
  level: 1 | 2 | 3;
  connectionType: 'completed_job' | 'referral' | 'collaboration' | 'mutual_connection';
  rating: number;
  projectsCompleted: number;
  mutualConnections: number;
  skills: string[];
  lastActive: string;
  status: 'available' | 'busy' | 'offline';
}

interface TeamInvite {
  id: string;
  projectTitle: string;
  requesterName: string;
  teamSize: number;
  status: 'pending' | 'accepted' | 'declined';
  invitedDate: string;
  skills: string[];
  budget: string;
}

interface Invitation {
  id: string;
  name: string;
  email: string;
  status: 'sent' | 'joined' | 'expired';
  sentDate: string;
  type: 'provider' | 'requester';
}

const NetworkPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tree');
  const [connectionLevel, setConnectionLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const networkStats = {
    totalConnections: 247,
    firstDegree: 45,
    secondDegree: 128,
    thirdDegree: 74,
    pendingInvites: 8,
    teamInvites: 3
  };

  const connections: Connection[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/40/40',
      role: 'UI/UX Designer',
      level: 1,
      connectionType: 'completed_job',
      rating: 4.9,
      projectsCompleted: 12,
      mutualConnections: 8,
      skills: ['UI Design', 'Prototyping', 'User Research'],
      lastActive: '2 hours ago',
      status: 'available'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: '/api/placeholder/40/40',
      role: 'Full Stack Developer',
      level: 1,
      connectionType: 'collaboration',
      rating: 4.8,
      projectsCompleted: 23,
      mutualConnections: 15,
      skills: ['React', 'Node.js', 'Python'],
      lastActive: '1 day ago',
      status: 'busy'
    },
    {
      id: '3',
      name: 'David Wilson',
      avatar: '/api/placeholder/40/40',
      role: 'Mobile Developer',
      level: 2,
      connectionType: 'referral',
      rating: 4.7,
      projectsCompleted: 18,
      mutualConnections: 5,
      skills: ['Flutter', 'React Native', 'iOS'],
      lastActive: '3 days ago',
      status: 'available'
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: '/api/placeholder/40/40',
      role: 'Content Writer',
      level: 2,
      connectionType: 'mutual_connection',
      rating: 4.6,
      projectsCompleted: 31,
      mutualConnections: 12,
      skills: ['Content Writing', 'SEO', 'Copywriting'],
      lastActive: '1 week ago',
      status: 'offline'
    },
    {
      id: '5',
      name: 'James Rodriguez',
      avatar: '/api/placeholder/40/40',
      role: 'Graphic Designer',
      level: 3,
      connectionType: 'mutual_connection',
      rating: 4.5,
      projectsCompleted: 15,
      mutualConnections: 3,
      skills: ['Brand Design', 'Illustration', 'Print Design'],
      lastActive: '2 weeks ago',
      status: 'available'
    }
  ];

  const teamInvites: TeamInvite[] = [
    {
      id: '1',
      projectTitle: 'E-commerce Platform Development',
      requesterName: 'Tech Startup Inc.',
      teamSize: 4,
      status: 'pending',
      invitedDate: '2025-08-20',
      skills: ['React', 'Node.js', 'UI/UX'],
      budget: '₦500,000 - ₦800,000'
    },
    {
      id: '2',
      projectTitle: 'Mobile Banking App',
      requesterName: 'Financial Services Ltd',
      teamSize: 6,
      status: 'pending',
      invitedDate: '2025-08-18',
      skills: ['Flutter', 'Backend', 'Security'],
      budget: '₦1,200,000 - ₦2,000,000'
    },
    {
      id: '3',
      projectTitle: 'Brand Identity Redesign',
      requesterName: 'Creative Agency',
      teamSize: 3,
      status: 'accepted',
      invitedDate: '2025-08-15',
      skills: ['Branding', 'Logo Design', 'Marketing'],
      budget: '₦300,000 - ₦500,000'
    }
  ];

  const invitations: Invitation[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      status: 'sent',
      sentDate: '2025-08-19',
      type: 'provider'
    },
    {
      id: '2',
      name: 'Lisa Parker',
      email: 'lisa.parker@email.com',
      status: 'joined',
      sentDate: '2025-08-10',
      type: 'provider'
    },
    {
      id: '3',
      name: 'Robert Kim',
      email: 'robert.kim@email.com',
      status: 'expired',
      sentDate: '2025-07-25',
      type: 'requester'
    }
  ];

  const getConnectionTypeIcon = (type: string) => {
    switch (type) {
      case 'completed_job': return FiCheckCircle;
      case 'referral': return FiShare2;
      case 'collaboration': return FiUsers;
      case 'mutual_connection': return FiLink;
      default: return FiUsers;
    }
  };

  const getConnectionTypeLabel = (type: string) => {
    switch (type) {
      case 'completed_job': return 'Completed Job';
      case 'referral': return 'Referral';
      case 'collaboration': return 'Collaboration';
      case 'mutual_connection': return 'Mutual Connection';
      default: return 'Connection';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green.500';
      case 'busy': return 'yellow.500';
      case 'offline': return 'gray.400';
      default: return 'gray.400';
    }
  };

  const getInviteStatusColor = (status: string) => {
    if (status === 'joined') return 'green';
    if (status === 'sent') return 'blue';
    return 'red';
  };

  const getTeamInviteStatusColor = (status: string) => {
    if (status === 'accepted') return 'green';
    if (status === 'declined') return 'red';
    return 'yellow';
  };

  const getConnectionLevelBadgeColor = (level: number) => {
    if (level === 1) return 'green';
    if (level === 2) return 'purple';
    return 'orange';
  };

  const getConnectionLevelLabel = (level: number) => {
    if (level === 1) return '1st';
    if (level === 2) return '2nd';
    return '3rd';
  };

  const filteredConnections = connections.filter(connection => {
    const matchesLevel = connectionLevel === 'all' || connection.level.toString() === connectionLevel;
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const sectionOptions = [
    { key: 'tree', label: 'Professional Tree', icon: FiGitBranch },
    { key: 'connections', label: 'My Connections', icon: FiUsers },
    { key: 'invites', label: 'Invites & Recommendations', icon: FiUserPlus },
    { key: 'teams', label: 'Team Collaboration', icon: FiTarget },
  ];

  const levelOptions = [
    { key: 'all', label: 'All Levels' },
    { key: '1', label: '1st Degree' },
    { key: '2', label: '2nd Degree' },
    { key: '3', label: '3rd Degree' },
  ];

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack gap={3} mb={2}>
            <FiUsers size={32} color="#3182ce" />
            <Heading size="xl">My Network</Heading>
            <Badge colorScheme="blue" px={2} py={1} fontSize="sm">
              Social Graph
            </Badge>
          </HStack>
          <Text color="gray.600" fontSize="lg">
            🎯 Visual display of service connections based on completed jobs, referrals, and collaborations. Social-professional graph for collaboration and trust tracking.
          </Text>
        </Box>

        {/* Network Stats Overview */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }} gap={4}>
          <Card>
            <CardBody textAlign="center">
              <FiUsers size={20} color="#3182ce" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="blue.500">
                {networkStats.totalConnections}
              </Text>
              <Text fontSize="sm" color="gray.600">Total Network</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiUserCheck size={20} color="#38a169" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="green.500">
                {networkStats.firstDegree}
              </Text>
              <Text fontSize="sm" color="gray.600">1st Degree</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiLink size={20} color="#805ad5" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="purple.500">
                {networkStats.secondDegree}
              </Text>
              <Text fontSize="sm" color="gray.600">2nd Degree</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiGitBranch size={20} color="#dd6b20" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="orange.500">
                {networkStats.thirdDegree}
              </Text>
              <Text fontSize="sm" color="gray.600">3rd Degree</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiMail size={20} color="#00b5d8" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="cyan.500">
                {networkStats.pendingInvites}
              </Text>
              <Text fontSize="sm" color="gray.600">Pending Invites</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiTarget size={20} color="#d53f8c" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="pink.500">
                {networkStats.teamInvites}
              </Text>
              <Text fontSize="sm" color="gray.600">Team Invites</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Navigation */}
        <Card>
          <CardHeader>
            <HStack gap={2} flexWrap="wrap" justify="space-between">
              <HStack gap={2} flexWrap="wrap">
                {sectionOptions.map((section) => (
                  <Button
                    key={section.key}
                    size="sm"
                    variant={activeSection === section.key ? "solid" : "ghost"}
                    colorScheme={activeSection === section.key ? "blue" : "gray"}
                    onClick={() => setActiveSection(section.key)}
                  >
                    <section.icon style={{ marginRight: '8px' }} />
                    {section.label}
                  </Button>
                ))}
              </HStack>

              {(activeSection === 'tree' || activeSection === 'connections') && (
                <HStack gap={2}>
                  <HStack gap={2}>
                    <FiSearch color="#9ca3af" />
                    <Input
                      size="sm"
                      maxW="200px"
                      placeholder="Search connections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </HStack>
                  <HStack gap={1}>
                    {levelOptions.map((level) => (
                      <Button
                        key={level.key}
                        size="xs"
                        variant={connectionLevel === level.key ? "solid" : "outline"}
                        colorScheme={connectionLevel === level.key ? "blue" : "gray"}
                        onClick={() => setConnectionLevel(level.key)}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </HStack>
                </HStack>
              )}
            </HStack>
          </CardHeader>

          <CardBody>
            {/* Professional Tree Section */}
            {activeSection === 'tree' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                  🔹 Visual Graph of Connected Users (First to Third Level)
                </Text>

                {/* Connection Levels Visualization */}
                <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
                  <Card bg="green.50" borderColor="green.200">
                    <CardHeader>
                      <HStack gap={2}>
                        <FiUserCheck color="#38a169" />
                        <Text fontWeight="bold" color="green.700">1st Degree Connections</Text>
                        <Badge colorScheme="green">{networkStats.firstDegree}</Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={3} align="stretch">
                        <Text fontSize="sm" color="green.600" mb={2}>Direct connections from completed work</Text>
                        {filteredConnections.filter(c => c.level === 1).slice(0, 3).map((connection) => (
                          <HStack key={connection.id} gap={3}>
                            <Avatar size="sm" src={connection.avatar} />
                            <VStack align="start" gap={0} flex={1}>
                              <Text fontSize="sm" fontWeight="medium">{connection.name}</Text>
                              <Text fontSize="xs" color="gray.500">{connection.role}</Text>
                            </VStack>
                            <Box w="8px" h="8px" borderRadius="full" bg={getStatusColor(connection.status)} />
                          </HStack>
                        ))}
                        {filteredConnections.filter(c => c.level === 1).length > 3 && (
                          <Text fontSize="sm" color="green.600" fontWeight="medium">
                            +{filteredConnections.filter(c => c.level === 1).length - 3} more
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="purple.50" borderColor="purple.200">
                    <CardHeader>
                      <HStack gap={2}>
                        <FiLink color="#805ad5" />
                        <Text fontWeight="bold" color="purple.700">2nd Degree Connections</Text>
                        <Badge colorScheme="purple">{networkStats.secondDegree}</Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={3} align="stretch">
                        <Text fontSize="sm" color="purple.600" mb={2}>Through mutual connections</Text>
                        {filteredConnections.filter(c => c.level === 2).slice(0, 3).map((connection) => (
                          <HStack key={connection.id} gap={3}>
                            <Avatar size="sm" src={connection.avatar} />
                            <VStack align="start" gap={0} flex={1}>
                              <Text fontSize="sm" fontWeight="medium">{connection.name}</Text>
                              <Text fontSize="xs" color="gray.500">{connection.mutualConnections} mutual</Text>
                            </VStack>
                            <Box w="8px" h="8px" borderRadius="full" bg={getStatusColor(connection.status)} />
                          </HStack>
                        ))}
                        {filteredConnections.filter(c => c.level === 2).length > 3 && (
                          <Text fontSize="sm" color="purple.600" fontWeight="medium">
                            +{filteredConnections.filter(c => c.level === 2).length - 3} more
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="orange.50" borderColor="orange.200">
                    <CardHeader>
                      <HStack gap={2}>
                        <FiGitBranch color="#dd6b20" />
                        <Text fontWeight="bold" color="orange.700">3rd Degree Connections</Text>
                        <Badge colorScheme="orange">{networkStats.thirdDegree}</Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={3} align="stretch">
                        <Text fontSize="sm" color="orange.600" mb={2}>Extended network reach</Text>
                        {filteredConnections.filter(c => c.level === 3).slice(0, 3).map((connection) => (
                          <HStack key={connection.id} gap={3}>
                            <Avatar size="sm" src={connection.avatar} />
                            <VStack align="start" gap={0} flex={1}>
                              <Text fontSize="sm" fontWeight="medium">{connection.name}</Text>
                              <Text fontSize="xs" color="gray.500">Extended network</Text>
                            </VStack>
                            <Box w="8px" h="8px" borderRadius="full" bg={getStatusColor(connection.status)} />
                          </HStack>
                        ))}
                        {filteredConnections.filter(c => c.level === 3).length > 3 && (
                          <Text fontSize="sm" color="orange.600" fontWeight="medium">
                            +{filteredConnections.filter(c => c.level === 3).length - 3} more
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                {/* Network Growth Chart */}
                <Card>
                  <CardHeader>
                    <Heading size="md">Network Growth Overview</Heading>
                  </CardHeader>
                  <CardBody>
                    <HStack gap={6} justify="center" py={4}>
                      <VStack align="center">
                        <FiTrendingUp size={32} color="#3182ce" />
                        <Text fontSize="2xl" fontWeight="bold" color="blue.500">+23</Text>
                        <Text fontSize="sm" color="gray.600">This Month</Text>
                      </VStack>
                      <VStack align="center">
                        <FiAward size={32} color="#38a169" />
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">4.8</Text>
                        <Text fontSize="sm" color="gray.600">Avg Rating</Text>
                      </VStack>
                      <VStack align="center">
                        <FiHeart size={32} color="#d53f8c" />
                        <Text fontSize="2xl" fontWeight="bold" color="pink.500">95%</Text>
                        <Text fontSize="sm" color="gray.600">Trust Score</Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Connections List Section */}
            {activeSection === 'connections' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                  My Professional Connections ({filteredConnections.length})
                </Text>

                <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4}>
                  {filteredConnections.map((connection) => (
                    <Card key={connection.id}>
                      <CardBody>
                        <HStack gap={4} align="start">
                          <Box position="relative">
                            <Avatar size="lg" src={connection.avatar} />
                            <Box
                              position="absolute"
                              bottom="0"
                              right="0"
                              w="16px"
                              h="16px"
                              borderRadius="full"
                              bg={getStatusColor(connection.status)}
                              border="2px white solid"
                            />
                          </Box>

                          <VStack align="stretch" flex={1} gap={2}>
                            <HStack justify="space-between">
                              <VStack align="start" gap={0}>
                                <Text fontWeight="bold">{connection.name}</Text>
                                <Text fontSize="sm" color="gray.600">{connection.role}</Text>
                              </VStack>
                              <VStack align="end" gap={1}>
                                <Badge colorScheme={getConnectionLevelBadgeColor(connection.level)}>
                                  {getConnectionLevelLabel(connection.level)} degree
                                </Badge>
                                <HStack gap={1}>
                                  <FiStar size={12} color="#eab308" />
                                  <Text fontSize="xs" color="gray.500">{connection.rating}</Text>
                                </HStack>
                              </VStack>
                            </HStack>

                            <HStack gap={2} mb={2}>
                              {React.createElement(getConnectionTypeIcon(connection.connectionType), { 
                                size: 16, 
                                color: "#3182ce" 
                              })}
                              <Text fontSize="sm" color="blue.600">
                                {getConnectionTypeLabel(connection.connectionType)}
                              </Text>
                            </HStack>

                            <HStack gap={4} fontSize="sm" color="gray.500">
                              <Text>{connection.projectsCompleted} projects</Text>
                              <Text>{connection.mutualConnections} mutual</Text>
                              <Text>{connection.lastActive}</Text>
                            </HStack>

                            <HStack gap={1} flexWrap="wrap">
                              {connection.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} size="sm" variant="outline" colorScheme="gray">
                                  {skill}
                                </Badge>
                              ))}
                              {connection.skills.length > 3 && (
                                <Badge size="sm" variant="outline" colorScheme="blue">
                                  +{connection.skills.length - 3}
                                </Badge>
                              )}
                            </HStack>

                            <HStack gap={2} mt={2}>
                              <Button size="xs" colorScheme="blue" variant="outline">
                                View Profile
                              </Button>
                              <Button size="xs" variant="outline">
                                Message
                              </Button>
                              <Button size="xs" variant="outline">
                                <FiShare2 style={{ marginRight: '4px' }} size={12} />
                                Refer
                              </Button>
                            </HStack>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            )}

            {/* Invites & Recommendations Section */}
            {activeSection === 'invites' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                  🔹 Refer Others & Invite to Plug
                </Text>

                <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                  <Card>
                    <CardHeader>
                      <HStack justify="space-between">
                        <Heading size="md">Send Invitations</Heading>
                        <Button colorScheme="blue" size="sm">
                          <FiUserPlus style={{ marginRight: '8px' }} size={16} />
                          Invite New User
                        </Button>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={4} align="stretch">
                        <HStack gap={2}>
                          <FiMail color="#9ca3af" />
                          <Input placeholder="Enter email address..." />
                        </HStack>
                        
                        <HStack gap={2}>
                          <Button size="sm" colorScheme="blue" flex={1}>
                            Invite as Provider
                          </Button>
                          <Button size="sm" colorScheme="green" variant="outline" flex={1}>
                            Invite as Requester
                          </Button>
                        </HStack>

                        <Text fontSize="sm" color="gray.600">
                          Earn ₦500 for each successful referral that completes their first project.
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Pending Invitations</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={3} align="stretch">
                        {invitations.map((invite) => (
                          <Box key={invite.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                            <HStack justify="space-between">
                              <VStack align="start" gap={0}>
                                <Text fontWeight="medium">{invite.name}</Text>
                                <Text fontSize="sm" color="gray.500">{invite.email}</Text>
                                <Text fontSize="xs" color="gray.400">
                                  Sent: {new Date(invite.sentDate).toLocaleDateString()}
                                </Text>
                              </VStack>
                              <VStack align="end" gap={1}>
                                <Badge 
                                  colorScheme={getInviteStatusColor(invite.status)}
                                >
                                  {invite.status}
                                </Badge>
                                <Badge size="sm" variant="outline">
                                  {invite.type}
                                </Badge>
                              </VStack>
                            </HStack>
                            {invite.status === 'sent' && (
                              <HStack gap={2} mt={2}>
                                <Button size="xs" variant="outline">
                                  Resend
                                </Button>
                                <Button size="xs" variant="outline" colorScheme="red">
                                  Cancel
                                </Button>
                              </HStack>
                            )}
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>
              </VStack>
            )}

            {/* Team Collaboration Section */}
            {activeSection === 'teams' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                  🔹 Team Invite Status & Collaboration Opportunities
                </Text>

                <Card>
                  <CardHeader>
                    <Heading size="md">Team Invitations</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {teamInvites.map((invite) => (
                        <Card key={invite.id} variant="outline">
                          <CardBody>
                            <HStack justify="space-between" align="start">
                              <VStack align="start" gap={2} flex={1}>
                                <Text fontWeight="bold" fontSize="lg">{invite.projectTitle}</Text>
                                <Text color="gray.600">by {invite.requesterName}</Text>
                                
                                <HStack gap={4} fontSize="sm" color="gray.500">
                                  <HStack gap={1}>
                                    <FiUsers size={14} />
                                    <Text>Team of {invite.teamSize}</Text>
                                  </HStack>
                                  <Text>•</Text>
                                  <Text>Invited: {new Date(invite.invitedDate).toLocaleDateString()}</Text>
                                </HStack>

                                <Text fontSize="sm" fontWeight="medium" color="green.600">
                                  Budget: {invite.budget}
                                </Text>

                                <HStack gap={1} flexWrap="wrap">
                                  {invite.skills.map((skill) => (
                                    <Badge key={skill} size="sm" colorScheme="blue" variant="outline">
                                      {skill}
                                    </Badge>
                                  ))}
                                </HStack>
                              </VStack>

                              <VStack align="end" gap={2}>
                                <Badge 
                                  colorScheme={
                                    invite.status === 'accepted' ? 'green' : 
                                    invite.status === 'declined' ? 'red' : 'yellow'
                                  }
                                  px={3}
                                  py={1}
                                >
                                  {invite.status}
                                </Badge>

                                {invite.status === 'pending' && (
                                  <VStack gap={2}>
                                    <Button size="sm" colorScheme="green">
                                      <FiCheckCircle style={{ marginRight: '8px' }} size={14} />
                                      Accept
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      View Details
                                    </Button>
                                    <Button size="sm" colorScheme="red" variant="outline">
                                      Decline
                                    </Button>
                                  </VStack>
                                )}
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <Heading size="md">Suggest Teams to Requesters</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      <Text color="gray.600">
                        Help requesters find the perfect team by recommending skilled providers from your network.
                      </Text>
                      
                      <HStack gap={4}>
                        <Button colorScheme="blue">
                          <FiUsers style={{ marginRight: '8px' }} size={16} />
                          Create Team Recommendation
                        </Button>
                        <Button variant="outline">
                          <FiSearch style={{ marginRight: '8px' }} size={16} />
                          Browse Projects Needing Teams
                        </Button>
                      </HStack>

                      <Box p={4} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                        <HStack gap={3}>
                          <FiTarget size={20} color="#3182ce" />
                          <VStack align="start" gap={1}>
                            <Text fontWeight="semibold" color="blue.700">Pro Tip</Text>
                            <Text fontSize="sm" color="blue.600">
                              Earn 2% commission for successful team recommendations that complete projects.
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default NetworkPage;
