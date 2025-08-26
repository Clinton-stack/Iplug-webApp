"use client"

import React, { useState, useMemo } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Button,
  HStack,
  VStack,
  Heading,
  Input,
  Badge,
  Card
} from '@chakra-ui/react';
import {
  FiGrid,
  FiList,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiMessageSquare,
  FiFile,
  FiUser,
  FiDollarSign,
  FiStar,
  FiAlertTriangle,
  FiEye,
  FiSettings,
  FiPlay
} from 'react-icons/fi';
import { useUserRoleSafe } from '@/contexts/UserRoleContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { mockProjectsData, PROJECT_STATUS, statusColors, type Project } from '@/constants/projectsData';

// Provider-specific project data structure
interface ProviderProject {
  id: string;
  title: string;
  client: {
    name: string;
    avatar: string;
    rating: number;
  };
  status: 'Active' | 'Completed' | 'Pending' | 'Cancelled';
  totalValue: number;
  earningsProgress: number;
  currentMilestone: string;
  milestonesInProgress: number;
  totalMilestones: number;
  collaborators: Array<{ name: string; role: string; avatar: string }>;
  isAISmartRequest: boolean;
  timeRemaining: string;
  category: string;
  submittedDate: string;
  lastActivity: string;
  proposalStatus?: 'pending' | 'accepted' | 'rejected';
  paymentStatus: 'funded' | 'partially_funded' | 'unfunded';
  messages: number;
}

// Mock provider projects data
const mockProviderProjects: ProviderProject[] = [
  {
    id: 'prov-1',
    title: 'E-commerce Website Development',
    client: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 4.8
    },
    status: 'Active',
    totalValue: 5000,
    earningsProgress: 60,
    currentMilestone: 'Backend API Development',
    milestonesInProgress: 2,
    totalMilestones: 5,
    collaborators: [
      { name: 'You', role: 'Full Stack Dev', avatar: 'YU' },
      { name: 'Alex Chen', role: 'UI Designer', avatar: 'AC' }
    ],
    isAISmartRequest: true,
    timeRemaining: '12 days',
    category: 'Web Development',
    submittedDate: '2024-12-15',
    lastActivity: '2024-12-20',
    paymentStatus: 'funded',
    messages: 28
  },
  {
    id: 'prov-2',
    title: 'Mobile App UI/UX Design',
    client: {
      name: 'Mike Rodriguez',
      avatar: 'MR',
      rating: 4.9
    },
    status: 'Pending',
    totalValue: 3500,
    earningsProgress: 0,
    currentMilestone: 'Proposal Review',
    milestonesInProgress: 0,
    totalMilestones: 4,
    collaborators: [
      { name: 'You', role: 'UX Designer', avatar: 'YU' }
    ],
    isAISmartRequest: false,
    timeRemaining: 'Pending approval',
    category: 'UI/UX Design',
    submittedDate: '2024-12-18',
    lastActivity: '2024-12-18',
    proposalStatus: 'pending',
    paymentStatus: 'unfunded',
    messages: 5
  },
  {
    id: 'prov-3',
    title: 'Brand Identity Package',
    client: {
      name: 'Lisa Wang',
      avatar: 'LW',
      rating: 4.7
    },
    status: 'Completed',
    totalValue: 2800,
    earningsProgress: 100,
    currentMilestone: 'Project Completed',
    milestonesInProgress: 0,
    totalMilestones: 3,
    collaborators: [
      { name: 'You', role: 'Brand Designer', avatar: 'YU' }
    ],
    isAISmartRequest: false,
    timeRemaining: 'Completed',
    category: 'Design',
    submittedDate: '2024-11-20',
    lastActivity: '2024-12-10',
    paymentStatus: 'funded',
    messages: 15
  }
];

// Provider Project Card Component
const ProviderProjectCard: React.FC<{ project: ProviderProject }> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Completed': return 'blue';
      case 'Pending': return 'orange';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getActionButton = () => {
    switch (project.status) {
      case 'Active':
        return { label: 'Continue Work', icon: FiPlay, colorScheme: 'green' };
      case 'Pending':
        return { label: 'View Proposal', icon: FiEye, colorScheme: 'orange' };
      case 'Completed':
        return { label: 'View Details', icon: FiEye, colorScheme: 'blue' };
      default:
        return { label: 'View', icon: FiEye, colorScheme: 'gray' };
    }
  };

  const actionBtn = getActionButton();
  const ActionIcon = actionBtn.icon;

  return (
    <Card.Root
      cursor="pointer"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
      transition="all 0.2s ease"
      border="1px solid"
      borderColor="gray.200"
    >
      <Card.Body p={6}>
        <VStack gap={4} align="stretch">
          {/* Header with AI tag */}
          <VStack align="start" gap={2}>
            <HStack justify="space-between" w="full">
              <Text fontSize="lg" fontWeight="bold" lineHeight="short">
                {project.title}
              </Text>
              {project.isAISmartRequest && (
                <Badge colorScheme="purple" variant="solid" fontSize="10px">
                  AI Smart Request
                </Badge>
              )}
            </HStack>
            
            <HStack gap={2}>
              <Badge colorScheme={getStatusColor(project.status)} variant="solid">
                {project.status}
              </Badge>
              <Text fontSize="sm" color="gray.600">{project.category}</Text>
            </HStack>
          </VStack>

          {/* Client Info */}
          <HStack gap={3}>
            <Box
              w={10}
              h={10}
              bg="blue.500"
              color="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
              fontWeight="bold"
            >
              {project.client.avatar}
            </Box>
            <VStack align="start" gap={0}>
              <Text fontSize="sm" fontWeight="medium">
                {project.client.name}
              </Text>
              <HStack gap={2}>
                <HStack gap={1}>
                  <FiStar size={12} color="orange" />
                  <Text fontSize="xs" color="gray.600">
                    {project.client.rating}
                  </Text>
                </HStack>
                <Text fontSize="xs" color="gray.500">Service Requester</Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Project Value & Earnings */}
          <VStack align="start" gap={2}>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" fontWeight="medium">Total Project Value</Text>
              <Text fontSize="sm" fontWeight="bold" color="green.600">
                ${project.totalValue.toLocaleString()}
              </Text>
            </HStack>
            
            <Box w="full">
              <HStack justify="space-between" mb={1}>
                <Text fontSize="xs" color="gray.600">Earnings Progress</Text>
                <Text fontSize="xs" color="gray.600">{project.earningsProgress}%</Text>
              </HStack>
              <Box w="full" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
                <Box
                  h="full"
                  bg="green.500"
                  borderRadius="md"
                  width={`${project.earningsProgress}%`}
                />
              </Box>
            </Box>
          </VStack>

          {/* Milestones */}
          <VStack align="start" gap={2}>
            <Text fontSize="sm" fontWeight="medium">Current Milestone</Text>
            <Text fontSize="sm" color="gray.700">{project.currentMilestone}</Text>
            <HStack gap={4}>
              <Text fontSize="xs" color="gray.600">
                {project.milestonesInProgress} in progress
              </Text>
              <Text fontSize="xs" color="gray.600">
                {project.totalMilestones} total milestones
              </Text>
            </HStack>
          </VStack>

          {/* Collaborators */}
          <VStack align="start" gap={2}>
            <Text fontSize="sm" fontWeight="medium">Team</Text>
            <HStack gap={2} flexWrap="wrap">
              {project.collaborators.map((collaborator) => (
                <HStack key={`${project.id}-${collaborator.name}-${collaborator.role}`} gap={2}>
                  <Box
                    w={6}
                    h={6}
                    bg="purple.500"
                    color="white"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="10px"
                    fontWeight="bold"
                  >
                    {collaborator.avatar}
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontSize="xs" fontWeight="medium">{collaborator.name}</Text>
                    <Text fontSize="xs" color="gray.600">{collaborator.role}</Text>
                  </VStack>
                </HStack>
              ))}
            </HStack>
          </VStack>

          {/* Time & Payment Status */}
          <HStack justify="space-between">
            <VStack align="start" gap={1}>
              <Text fontSize="xs" color="gray.600">Time Remaining</Text>
              <Text fontSize="sm" fontWeight="medium">{project.timeRemaining}</Text>
            </VStack>
            <VStack align="end" gap={1}>
              <Text fontSize="xs" color="gray.600">Payment Status</Text>
              <Badge 
                colorScheme={(() => {
                  if (project.paymentStatus === 'funded') return 'green';
                  if (project.paymentStatus === 'partially_funded') return 'orange';
                  return 'red';
                })()} 
                variant="solid" 
                size="sm"
              >
                {project.paymentStatus.replace('_', ' ').toUpperCase()}
              </Badge>
            </VStack>
          </HStack>

          {/* Activity Stats */}
          <HStack justify="space-between" align="center">
            <HStack gap={3}>
              <HStack gap={1}>
                <FiMessageSquare size={14} color="gray" />
                <Text fontSize="sm" color="gray.600">{project.messages}</Text>
              </HStack>
              <Text fontSize="xs" color="gray.500">
                Last activity: {new Date(project.lastActivity).toLocaleDateString()}
              </Text>
            </HStack>
          </HStack>

          {/* Action Button */}
          <Button
            size="sm"
            width="full"
            colorScheme={actionBtn.colorScheme}
            onClick={(e) => {
              e.stopPropagation();
              // Handle provider action
              console.log(`Provider action: ${actionBtn.label} for project ${project.id}`);
            }}
          >
            <HStack gap={2}>
              <ActionIcon size={16} />
              <Text>{actionBtn.label}</Text>
            </HStack>
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

// Provider Projects View Component
const ProviderProjectsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = [...mockProviderProjects];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.client.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status.toLowerCase() === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      if (typeFilter === 'ai-smart') {
        filtered = filtered.filter(project => project.isAISmartRequest);
      } else if (typeFilter === 'manual') {
        filtered = filtered.filter(project => !project.isAISmartRequest);
      }
    }

    return filtered;
  }, [searchQuery, statusFilter, typeFilter]);

  // Project counts
  const projectCounts = useMemo(() => {
    return {
      all: mockProviderProjects.length,
      active: mockProviderProjects.filter(p => p.status === 'Active').length,
      completed: mockProviderProjects.filter(p => p.status === 'Completed').length,
      pending: mockProviderProjects.filter(p => p.status === 'Pending').length,
    };
  }, []);

  return (
    <Box p={6} maxW="100%" mx="auto">
      {/* Provider Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" gap={1}>
          <Heading size="lg">My Projects</Heading>
          <Text color="gray.600">
            Manage all your engagements, proposals, and client work
          </Text>
        </VStack>
        
        <HStack gap={3}>
          <Button colorScheme="purple" variant="outline">
            <HStack gap={2}>
              <FiDollarSign size={16} />
              <Text>Withdraw Earnings</Text>
            </HStack>
          </Button>
          
          <HStack gap={1}>
            <Button
              variant={viewMode === 'grid' ? 'solid' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'solid' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </Button>
          </HStack>
        </HStack>
      </Flex>

      {/* Provider Filter Panel */}
      <Card.Root mb={6}>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Flex gap={4} wrap="wrap">
              <Box flex="1" minW="250px">
                <Text fontSize="sm" mb={2} fontWeight="medium">Search Projects</Text>
                <HStack>
                  <FiSearch color="gray" />
                  <Input
                    placeholder="Search by project, client, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </HStack>
              </Box>
              
              <Box minW="150px">
                <Text fontSize="sm" mb={2} fontWeight="medium">Status</Text>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    width: '100%'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </Box>

              <Box minW="150px">
                <Text fontSize="sm" mb={2} fontWeight="medium">Type</Text>
                <select 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    width: '100%'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="ai-smart">AI Smart</option>
                  <option value="manual">Manual</option>
                </select>
              </Box>
            </Flex>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Provider Project Tabs */}
      <HStack gap={2} mb={6} wrap="wrap">
        <Button
          variant={statusFilter === 'all' ? 'solid' : 'outline'}
          onClick={() => setStatusFilter('all')}
          size="sm"
        >
          All Projects ({projectCounts.all})
        </Button>
        <Button
          variant={statusFilter === 'active' ? 'solid' : 'outline'}
          onClick={() => setStatusFilter('active')}
          size="sm"
          colorScheme="green"
        >
          Active ({projectCounts.active})
        </Button>
        <Button
          variant={statusFilter === 'completed' ? 'solid' : 'outline'}
          onClick={() => setStatusFilter('completed')}
          size="sm"
          colorScheme="blue"
        >
          Completed ({projectCounts.completed})
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'solid' : 'outline'}
          onClick={() => setStatusFilter('pending')}
          size="sm"
          colorScheme="orange"
        >
          Pending ({projectCounts.pending})
        </Button>
      </HStack>

      {/* Provider Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={12}
          bg="gray.50"
          borderRadius="xl"
          border="2px dashed"
          borderColor="gray.300"
        >
          <Text fontSize="lg" fontWeight="semibold" color="gray.600" mb={2}>
            No projects found
          </Text>
          <Text fontSize="sm" color="gray.500" mb={4}>
            {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
              ? "Try adjusting your search filters"
              : "You haven't received any project assignments yet"
            }
          </Text>
          <Button colorScheme="purple">
            Browse Available Projects
          </Button>
        </Flex>
      ) : (
        <Grid
          templateColumns={viewMode === 'grid' 
            ? "repeat(auto-fill, minmax(400px, 1fr))" 
            : "1fr"
          }
          gap={6}
        >
          {filteredProjects.map((project) => (
            <GridItem key={project.id}>
              <ProviderProjectCard project={project} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCurrentMilestone = () => {
    if (!project.milestones || project.milestones.length === 0) return null;
    return project.milestones.find(m => m.status === 'In Progress') || 
           project.milestones.find(m => m.status === 'Pending');
  };

  const currentMilestone = getCurrentMilestone();

  const getActionButton = () => {
    switch (project.status) {
      case PROJECT_STATUS.DRAFT:
        return { label: 'Continue', icon: FiPlay, colorScheme: 'blue' };
      case PROJECT_STATUS.OPEN:
        return { label: 'View', icon: FiEye, colorScheme: 'blue' };
      case PROJECT_STATUS.PROPOSAL_RECEIVED:
        return { label: 'Review Proposals', icon: FiEye, colorScheme: 'purple' };
      case PROJECT_STATUS.IN_PROGRESS:
        return { label: 'Manage', icon: FiSettings, colorScheme: 'orange' };
      case PROJECT_STATUS.COMPLETED:
        return { label: 'Rate', icon: FiStar, colorScheme: 'green' };
      case PROJECT_STATUS.DISPUTED:
        return { label: 'View Dispute', icon: FiAlertTriangle, colorScheme: 'red' };
      default:
        return { label: 'View', icon: FiEye, colorScheme: 'blue' };
    }
  };

  const actionBtn = getActionButton();
  const ActionIcon = actionBtn.icon;

  return (
    <Card.Root
      cursor="pointer"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
      transition="all 0.2s ease"
      onClick={() => onClick?.(project)}
      p={6}
    >
      <Card.Body p={0}>
        <VStack gap={4} align="stretch">
          {/* Header */}
          <VStack align="start" gap={2}>
            <Text fontSize="lg" fontWeight="bold" lineHeight="short">
              {project.title}
            </Text>
            <HStack gap={2}>
              <Badge 
                colorScheme={statusColors[project.status]} 
                variant="solid"
              >
                {project.status}
              </Badge>
              <Text fontSize="sm" color="gray.600">
                {project.category} • {project.subcategory}
              </Text>
            </HStack>
          </VStack>

          {/* Provider Info */}
          {project.provider ? (
            <HStack gap={3}>
              <Box
                w={8}
                h={8}
                bg="blue.500"
                color="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                fontWeight="bold"
              >
                {project.provider.name.charAt(0)}
              </Box>
              <VStack align="start" gap={0}>
                <Text fontSize="sm" fontWeight="medium">
                  {project.provider.name}
                </Text>
                <HStack gap={2}>
                  <HStack gap={1}>
                    <FiStar size={12} color="orange" />
                    <Text fontSize="xs" color="gray.600">
                      {project.provider.rating}
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {project.provider.completedProjects} projects
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          ) : (
            <HStack gap={2}>
              <FiUser color="gray" />
              <Text fontSize="sm" color="gray.600">
                {project.status === PROJECT_STATUS.PROPOSAL_RECEIVED 
                  ? `${project.proposalsReceived} proposals received`
                  : 'No provider assigned'
                }
              </Text>
            </HStack>
          )}

          {/* Progress */}
          {project.overallProgress > 0 && (
            <Box>
              <Flex justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">Progress</Text>
                <Text fontSize="sm" color="gray.600">{project.overallProgress}%</Text>
              </Flex>
              <Box w="full" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
                <Box
                  h="full"
                  bg="blue.500"
                  borderRadius="md"
                  width={`${project.overallProgress}%`}
                />
              </Box>
              {currentMilestone && (
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Current: {currentMilestone.title}
                </Text>
              )}
            </Box>
          )}

          {/* Timeline & Budget */}
          <VStack align="start" gap={2}>
            <HStack gap={2}>
              <FiCalendar size={14} color="gray" />
              <Text fontSize="sm" color="gray.600">
                {formatDate(project.startDate)} - {formatDate(project.dueDate)}
              </Text>
            </HStack>
            <HStack gap={2}>
              <FiDollarSign size={14} color="green" />
              <Text fontSize="sm" fontWeight="medium" color="green.600">
                {formatBudget(project.totalBudget)} • {project.budgetType}
              </Text>
            </HStack>
          </VStack>

          {/* Activity Stats */}
          <Flex justify="space-between" align="center">
            <HStack gap={4}>
              <HStack gap={1}>
                <FiMessageSquare size={14} color="gray" />
                <Text fontSize="sm" color="gray.600">{project.messages}</Text>
              </HStack>
              <HStack gap={1}>
                <FiFile size={14} color="gray" />
                <Text fontSize="sm" color="gray.600">{project.files}</Text>
              </HStack>
              {project.aiAssistantEnabled && (
                <Badge colorScheme="purple" variant="outline" fontSize="10px">
                  AI Enabled
                </Badge>
              )}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              {new Date(project.lastActivity).toLocaleDateString()}
            </Text>
          </Flex>

          {/* Dispute Info */}
          {project.dispute && (
            <Box 
              bg="red.50" 
              border="1px solid" 
              borderColor="red.200" 
              p={3} 
              borderRadius="md"
            >
              <Text fontSize="xs" fontWeight="bold" color="red.800">
                Dispute: {project.dispute.status}
              </Text>
              <Text fontSize="xs" color="red.700" mt={1}>
                {project.dispute.reason}
              </Text>
            </Box>
          )}

          {/* Rating */}
          {project.rating && (
            <Box 
              bg="green.50" 
              border="1px solid" 
              borderColor="green.200" 
              p={3} 
              borderRadius="md"
            >
              <HStack justify="space-between" mb={1}>
                <Text fontSize="xs" fontWeight="bold" color="green.800">
                  Your Rating
                </Text>
                <HStack gap={1}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={`star-${project.id}-${i}`}
                      size={12}
                      color={i < project.rating!.score ? 'orange' : 'gray'}
                      fill={i < project.rating!.score ? 'orange' : 'none'}
                    />
                  ))}
                </HStack>
              </HStack>
              <Text fontSize="xs" color="green.700">
                {project.rating.comment}
              </Text>
            </Box>
          )}

          {/* Action Button */}
          <Button
            size="sm"
            width="full"
            colorScheme={actionBtn.colorScheme}
            onClick={(e) => {
              e.stopPropagation();
              // Handle action
            }}
          >
            <HStack gap={2}>
              <ActionIcon size={16} />
              <Text>{actionBtn.label}</Text>
            </HStack>
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

// Internal component that uses the user role
const MyProjectsPageContent: React.FC = () => {
  const userRoleContext = useUserRoleSafe();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Always call hooks at the top level - Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = [...mockProjectsData];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.provider?.name.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    return filtered;
  }, [searchQuery, statusFilter]);

  // Project counts by status
  const projectCounts = useMemo(() => {
    return {
      all: mockProjectsData.length,
      ongoing: mockProjectsData.filter(p => p.status === PROJECT_STATUS.IN_PROGRESS).length,
      completed: mockProjectsData.filter(p => p.status === PROJECT_STATUS.COMPLETED).length,
      disputed: mockProjectsData.filter(p => p.status === PROJECT_STATUS.DISPUTED).length,
    };
  }, []);

  const handleProjectClick = (project: Project) => {
    // Open detail modal or navigate to detail page
    console.log('Selected project:', project.id);
  };

  // Handle case where context is not available
  if (!userRoleContext) {
    return (
      <Box 
        minH="calc(100vh - 140px)" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        p={8}
        bg="gray.50"
      >
        <Card.Root maxW="md" w="full" textAlign="center">
          <Card.Body p={8}>
            <VStack gap={6}>
              <Box
                p={4}
                borderRadius="full"
                bg="orange.100"
              >
                <FiAlertTriangle size={32} color="orange" />
              </Box>
              <VStack gap={2}>
                <Text fontSize="xl" fontWeight="bold" color="gray.900">
                  Authentication Required
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Please refresh the page or navigate back to home.
                </Text>
              </VStack>
              <VStack gap={3} w="full">
                <Button
                  onClick={() => window.location.reload()}
                  colorScheme="blue"
                  w="full"
                >
                  Refresh Page
                </Button>
                <Button
                  onClick={() => window.location.href = '/home'}
                  variant="outline"
                  w="full"
                >
                  Go to Home
                </Button>
              </VStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Box>
    );
  }

  const { userRole } = userRoleContext;

  // Show different content based on user role
  if (userRole === 'Provider') {
    return <ProviderProjectsView />;
  }

  // Requester view continues here
  return (
    <Box p={6} maxW="100%" mx="auto">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" gap={1}>
          <Heading size="lg">My Projects</Heading>
          <Text color="gray.600">
            Track, manage, and take action on all your service requests
          </Text>
        </VStack>
        
        <HStack gap={3}>
          <Button colorScheme="blue">
            <HStack gap={2}>
              <FiPlus size={16} />
              <Text>New Project</Text>
            </HStack>
          </Button>
          
          <HStack gap={1}>
            <Button
              variant={viewMode === 'grid' ? 'solid' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'solid' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </Button>
          </HStack>
        </HStack>
      </Flex>

      {/* Filter Panel */}
      <Card.Root mb={6}>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Flex gap={4} wrap="wrap">
              <Box flex="1" minW="300px">
                <Text fontSize="sm" mb={2} fontWeight="medium">Search Projects</Text>
                <HStack>
                  <FiSearch color="gray" />
                  <Input
                    placeholder="Search by project name, provider, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </HStack>
              </Box>
              
              <Box minW="200px">
                <Text fontSize="sm" mb={2} fontWeight="medium">Filter by Status</Text>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    width: '100%'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value={PROJECT_STATUS.DRAFT}>Draft</option>
                  <option value={PROJECT_STATUS.OPEN}>Open</option>
                  <option value={PROJECT_STATUS.PROPOSAL_RECEIVED}>Proposals Received</option>
                  <option value={PROJECT_STATUS.IN_PROGRESS}>In Progress</option>
                  <option value={PROJECT_STATUS.COMPLETED}>Completed</option>
                  <option value={PROJECT_STATUS.DISPUTED}>Disputed</option>
                  <option value={PROJECT_STATUS.CANCELLED}>Cancelled</option>
                </select>
              </Box>
            </Flex>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* Project Tabs */}
      <HStack gap={2} mb={6} wrap="wrap">
        <Button
          variant={statusFilter === 'all' ? 'solid' : 'outline'}
          onClick={() => setStatusFilter('all')}
          size="sm"
        >
          All Projects ({projectCounts.all})
        </Button>
        <Button
          variant={statusFilter === PROJECT_STATUS.IN_PROGRESS ? 'solid' : 'outline'}
          onClick={() => setStatusFilter(PROJECT_STATUS.IN_PROGRESS)}
          size="sm"
          colorScheme="orange"
        >
          Ongoing ({projectCounts.ongoing})
        </Button>
        <Button
          variant={statusFilter === PROJECT_STATUS.COMPLETED ? 'solid' : 'outline'}
          onClick={() => setStatusFilter(PROJECT_STATUS.COMPLETED)}
          size="sm"
          colorScheme="green"
        >
          Completed ({projectCounts.completed})
        </Button>
        <Button
          variant={statusFilter === PROJECT_STATUS.DISPUTED ? 'solid' : 'outline'}
          onClick={() => setStatusFilter(PROJECT_STATUS.DISPUTED)}
          size="sm"
          colorScheme="red"
        >
          Disputed ({projectCounts.disputed})
        </Button>
      </HStack>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={12}
          bg="gray.50"
          borderRadius="xl"
          border="2px dashed"
          borderColor="gray.300"
        >
          <Text fontSize="lg" fontWeight="semibold" color="gray.600" mb={2}>
            No projects found
          </Text>
          <Text fontSize="sm" color="gray.500" mb={4}>
            {searchQuery || statusFilter !== 'all'
              ? "Try adjusting your search filters"
              : "Start your first project by creating a new service request"
            }
          </Text>
          <Button colorScheme="blue">
            <HStack gap={2}>
              <FiPlus />
              <Text>Create New Project</Text>
            </HStack>
          </Button>
        </Flex>
      ) : (
        <Grid
          templateColumns={viewMode === 'grid' 
            ? "repeat(auto-fill, minmax(400px, 1fr))" 
            : "1fr"
          }
          gap={6}
        >
          {filteredProjects.map((project) => (
            <GridItem key={project.id}>
              <ProjectCard
                project={project}
                onClick={handleProjectClick}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default function MyProjectsPage() {
  return (
    <ErrorBoundary>
      <MyProjectsPageContent />
    </ErrorBoundary>
  );
}
