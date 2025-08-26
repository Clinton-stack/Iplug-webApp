"use client"

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Avatar,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Textarea,
  Input,
  Select,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiMessageSquare,
  FiFile,
  FiStar,
  FiAlertTriangle,
  FiPlus,
  FiEdit,
  FiX,
  FiCheck,
  FiClock,
  FiPhone,
  FiUpload
} from 'react-icons/fi';
import { statusColors, MILESTONE_STATUS } from '@/constants/projectsData';

const ProjectDetailModal = ({ project, isOpen, onClose, onProjectAction }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    amount: '',
    dueDate: ''
  });
  const { isOpen: isAddMilestoneOpen, onOpen: onAddMilestoneOpen, onClose: onAddMilestoneClose } = useDisclosure();

  if (!project) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatBudget = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMilestoneStatusColor = (status) => {
    const colors = {
      [MILESTONE_STATUS.PENDING]: 'gray',
      [MILESTONE_STATUS.IN_PROGRESS]: 'blue',
      [MILESTONE_STATUS.COMPLETED]: 'green',
      [MILESTONE_STATUS.REVIEWED]: 'purple'
    };
    return colors[status] || 'gray';
  };

  const ProjectSummary = () => (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={2}>{project.title}</Text>
        <Text color="gray.600" mb={4}>{project.description}</Text>
        
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Timeline</Text>
            <Text fontWeight="medium">
              {formatDate(project.startDate)} - {formatDate(project.dueDate)}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Type</Text>
            <Text fontWeight="medium">{project.type}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Budget</Text>
            <Text fontWeight="medium" color="green.600">
              {formatBudget(project.totalBudget)} • {project.budgetType}
            </Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>Status</Text>
            <Badge colorScheme={statusColors[project.status]} variant="solid">
              {project.status}
            </Badge>
          </Box>
        </Grid>
      </Box>

      {project.provider && (
        <Box>
          <Text fontWeight="semibold" mb={3}>Provider</Text>
          <HStack spacing={3}>
            <Avatar
              size="md"
              name={project.provider.name}
              src={project.provider.avatar}
            />
            <VStack align="start" spacing={1}>
              <Text fontWeight="medium">{project.provider.name}</Text>
              <HStack spacing={3}>
                <HStack spacing={1}>
                  <FiStar color="orange" />
                  <Text fontSize="sm" color="gray.600">
                    {project.provider.rating} rating
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {project.provider.completedProjects} projects completed
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      )}

      {project.teamMembers && project.teamMembers.length > 0 && (
        <Box>
          <Text fontWeight="semibold" mb={3}>Team Members</Text>
          <VStack spacing={2} align="stretch">
            {project.teamMembers.map(member => (
              <HStack key={member.id} spacing={3}>
                <Avatar size="sm" name={member.name} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium">{member.name}</Text>
                  <Text fontSize="xs" color="gray.600">{member.role}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {project.aiAssistantEnabled && (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle fontSize="sm">AI Assistant Enabled</AlertTitle>
            <AlertDescription fontSize="xs">
              Your project has AI-powered assistance for milestone suggestions and auto-reminders.
            </AlertDescription>
          </Box>
        </Alert>
      )}
    </VStack>
  );

  const MilestoneSection = () => (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          Project Milestones ({project.milestones?.length || 0})
        </Text>
        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<FiPlus />}
          onClick={onAddMilestoneOpen}
        >
          Add Milestone
        </Button>
      </Flex>

      <Box>
        <Flex justify="space-between" mb={2}>
          <Text fontSize="sm" fontWeight="medium">Overall Progress</Text>
          <Text fontSize="sm" color="gray.600">{project.overallProgress}%</Text>
        </Flex>
        <Progress value={project.overallProgress} colorScheme="blue" size="lg" borderRadius="md" />
      </Box>

      {project.milestones && project.milestones.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {project.milestones.map((milestone, index) => (
            <Box
              key={milestone.id}
              p={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              bg={milestone.status === MILESTONE_STATUS.COMPLETED ? 'green.50' : 'white'}
            >
              <Flex justify="space-between" align="start" mb={3}>
                <VStack align="start" spacing={1} flex={1}>
                  <HStack spacing={2}>
                    <Text fontWeight="semibold">Milestone {index + 1}: {milestone.title}</Text>
                    <Badge colorScheme={getMilestoneStatusColor(milestone.status)} variant="solid">
                      {milestone.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">{milestone.description}</Text>
                </VStack>
                <Text fontWeight="bold" color="green.600">
                  {formatBudget(milestone.amount)}
                </Text>
              </Flex>

              <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4} mb={3}>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Due Date</Text>
                  <Text fontSize="sm">{formatDate(milestone.dueDate)}</Text>
                </Box>
                {milestone.completedDate && (
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Completed</Text>
                    <Text fontSize="sm" color="green.600">
                      {formatDate(milestone.completedDate)}
                    </Text>
                  </Box>
                )}
                {milestone.progress && milestone.status === MILESTONE_STATUS.IN_PROGRESS && (
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Progress</Text>
                    <HStack spacing={2}>
                      <Progress value={milestone.progress} size="sm" flex={1} />
                      <Text fontSize="sm">{milestone.progress}%</Text>
                    </HStack>
                  </Box>
                )}
              </Grid>

              <HStack spacing={2}>
                {milestone.status === MILESTONE_STATUS.COMPLETED && (
                  <Button size="sm" variant="outline" colorScheme="blue" leftIcon={<FiStar />}>
                    Review & Feedback
                  </Button>
                )}
                {milestone.status === MILESTONE_STATUS.IN_PROGRESS && (
                  <Button size="sm" variant="outline" colorScheme="green" leftIcon={<FiCheck />}>
                    Mark Complete
                  </Button>
                )}
                <Button size="sm" variant="ghost" leftIcon={<FiEdit />}>
                  Edit
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Alert status="info">
          <AlertIcon />
          No milestones defined yet. Add milestones to track project progress.
        </Alert>
      )}
    </VStack>
  );

  const CommunicationPanel = () => (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">Communication</Text>
        <HStack spacing={2}>
          <Button size="sm" leftIcon={<FiPhone />} colorScheme="blue" variant="outline">
            Schedule Call
          </Button>
          <Button size="sm" leftIcon={<FiUpload />} variant="outline">
            Upload File
          </Button>
        </HStack>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
        <Box textAlign="center" p={3} bg="blue.50" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="blue.600">
            {project.messages}
          </Text>
          <Text fontSize="sm" color="blue.600">Messages</Text>
        </Box>
        <Box textAlign="center" p={3} bg="green.50" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="green.600">
            {project.files}
          </Text>
          <Text fontSize="sm" color="green.600">Files</Text>
        </Box>
        <Box textAlign="center" p={3} bg="purple.50" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="purple.600">
            3
          </Text>
          <Text fontSize="sm" color="purple.600">Calls</Text>
        </Box>
      </Grid>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        p={4}
        minH="300px"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={2}>
          <FiMessageSquare size={32} color="gray" />
          <Text color="gray.600">Chat interface will be implemented here</Text>
          <Text fontSize="sm" color="gray.500">
            Real-time messaging with {project.provider?.name || 'provider'}
          </Text>
        </VStack>
      </Box>
    </VStack>
  );

  const ProjectActions = () => (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" fontWeight="semibold">Project Actions</Text>
      
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
        <Button
          colorScheme="red"
          variant="outline"
          leftIcon={<FiX />}
          onClick={() => onProjectAction?.(project, 'end_project')}
        >
          End Project
        </Button>
        
        <Button
          colorScheme="orange"
          variant="outline"
          leftIcon={<FiAlertTriangle />}
          onClick={() => onProjectAction?.(project, 'raise_concern')}
        >
          Raise Concern
        </Button>
        
        <Button
          colorScheme="blue"
          variant="outline"
          leftIcon={<FiPlus />}
          onClick={onAddMilestoneOpen}
        >
          Add Milestone
        </Button>
        
        <Button
          colorScheme="purple"
          variant="outline"
          leftIcon={<FiStar />}
          onClick={() => onProjectAction?.(project, 'rate_project')}
        >
          Rate Project
        </Button>
        
        <Button
          colorScheme="green"
          variant="outline"
          leftIcon={<FiUser />}
          onClick={() => onProjectAction?.(project, 'rehire_provider')}
        >
          Rehire Provider
        </Button>
      </Grid>

      {project.aiAssistantEnabled && (
        <Box mt={6} p={4} bg="purple.50" borderRadius="lg" border="1px solid" borderColor="purple.200">
          <Text fontWeight="semibold" mb={2} color="purple.800">AI Assistant Options</Text>
          <VStack spacing={3} align="stretch">
            <Button size="sm" colorScheme="purple" variant="outline">
              Get Milestone Suggestions
            </Button>
            <Button size="sm" colorScheme="purple" variant="outline">
              Set Auto-Reminders
            </Button>
            <Button size="sm" colorScheme="purple" variant="outline">
              Enable "Manage With AI"
            </Button>
          </VStack>
        </Box>
      )}
    </VStack>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="90vw" maxH="90vh">
          <ModalHeader>
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text>{project.title}</Text>
                <HStack spacing={2}>
                  <Badge colorScheme={statusColors[project.status]} variant="solid">
                    {project.status}
                  </Badge>
                  <Text fontSize="sm" color="gray.600">
                    {project.category} • {project.subcategory}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody pb={6}>
            <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed">
              <TabList>
                <Tab>Project Summary</Tab>
                <Tab>Milestones</Tab>
                <Tab>Communication</Tab>
                <Tab>Actions</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel px={0}>
                  <ProjectSummary />
                </TabPanel>
                <TabPanel px={0}>
                  <MilestoneSection />
                </TabPanel>
                <TabPanel px={0}>
                  <CommunicationPanel />
                </TabPanel>
                <TabPanel px={0}>
                  <ProjectActions />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Add Milestone Modal */}
      <Modal isOpen={isAddMilestoneOpen} onClose={onAddMilestoneClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Milestone</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Box w="full">
                <Text fontSize="sm" mb={2} fontWeight="medium">Milestone Title</Text>
                <Input
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter milestone title"
                />
              </Box>
              
              <Box w="full">
                <Text fontSize="sm" mb={2} fontWeight="medium">Description</Text>
                <Textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what needs to be accomplished"
                  rows={3}
                />
              </Box>
              
              <HStack spacing={4} w="full">
                <Box flex={1}>
                  <Text fontSize="sm" mb={2} fontWeight="medium">Amount ($)</Text>
                  <Input
                    type="number"
                    value={newMilestone.amount}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                  />
                </Box>
                
                <Box flex={1}>
                  <Text fontSize="sm" mb={2} fontWeight="medium">Due Date</Text>
                  <Input
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </Box>
              </HStack>
              
              <HStack spacing={3} justify="end" w="full" pt={4}>
                <Button variant="ghost" onClick={onAddMilestoneClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    onProjectAction?.(project, 'add_milestone', newMilestone);
                    onAddMilestoneClose();
                    setNewMilestone({ title: '', description: '', amount: '', dueDate: '' });
                  }}
                >
                  Add Milestone
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectDetailModal;
