"use client"

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Progress,
  HStack,
  VStack,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Divider
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiMessageSquare,
  FiFile,
  FiUser,
  FiDollarSign,
  FiMoreVertical,
  FiEye,
  FiSettings,
  FiPlay,
  FiStar,
  FiAlertTriangle
} from 'react-icons/fi';
import { statusColors, PROJECT_STATUS, type Project } from '@/constants/projectsData';

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
  onActionClick?: (project: Project, action: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onActionClick }) => {
  const getActionButton = () => {
    switch (project.status) {
      case PROJECT_STATUS.DRAFT:
        return { label: 'Continue', icon: FiPlay, variant: 'solid', colorScheme: 'blue' };
      case PROJECT_STATUS.OPEN:
        return { label: 'View', icon: FiEye, variant: 'outline', colorScheme: 'blue' };
      case PROJECT_STATUS.PROPOSAL_RECEIVED:
        return { label: 'Review Proposals', icon: FiEye, variant: 'solid', colorScheme: 'purple' };
      case PROJECT_STATUS.IN_PROGRESS:
        return { label: 'Manage', icon: FiSettings, variant: 'solid', colorScheme: 'orange' };
      case PROJECT_STATUS.COMPLETED:
        return { label: 'Rate', icon: FiStar, variant: 'outline', colorScheme: 'green' };
      case PROJECT_STATUS.DISPUTED:
        return { label: 'View Dispute', icon: FiAlertTriangle, variant: 'solid', colorScheme: 'red' };
      case PROJECT_STATUS.CANCELLED:
        return { label: 'View', icon: FiEye, variant: 'ghost', colorScheme: 'gray' };
      default:
        return { label: 'View', icon: FiEye, variant: 'outline', colorScheme: 'blue' };
    }
  };

  const actionBtn = getActionButton();
  const ActionIcon = actionBtn.icon;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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

  const getCurrentMilestone = () => {
    if (!project.milestones || project.milestones.length === 0) return null;
    return project.milestones.find(m => m.status === 'In Progress') || 
           project.milestones.find(m => m.status === 'Pending');
  };

  const currentMilestone = getCurrentMilestone();

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        shadow: "md",
        transform: "translateY(-2px)",
        borderColor: "blue.200"
      }}
      onClick={() => onClick?.(project)}
    >
      {/* Header */}
      <Flex justify="space-between" align="start" mb={4}>
        <VStack align="start" spacing={2} flex={1}>
          <Text fontSize="lg" fontWeight="bold" lineHeight="short">
            {project.title}
          </Text>
          <HStack spacing={2}>
            <Badge 
              colorScheme={statusColors[project.status]} 
              variant="solid"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
            >
              {project.status}
            </Badge>
            <Text fontSize="sm" color="gray.600">
              {project.category} • {project.subcategory}
            </Text>
          </HStack>
        </VStack>
        
        <Tooltip label="More options">
          <IconButton
            aria-label="More options"
            icon={<FiMoreVertical />}
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              // Handle dropdown menu
            }}
          />
        </Tooltip>
      </Flex>

      {/* Provider Info */}
      {project.provider ? (
        <HStack spacing={3} mb={4}>
          <Avatar
            size="sm"
            name={project.provider.name}
            src={project.provider.avatar}
          />
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" fontWeight="medium">
              {project.provider.name}
            </Text>
            <HStack spacing={2}>
              <HStack spacing={1}>
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
        <HStack spacing={2} mb={4}>
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
        <Box mb={4}>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" fontWeight="medium">Progress</Text>
            <Text fontSize="sm" color="gray.600">{project.overallProgress}%</Text>
          </Flex>
          <Progress 
            value={project.overallProgress} 
            colorScheme="blue" 
            size="sm" 
            borderRadius="md"
          />
          {currentMilestone && (
            <Text fontSize="xs" color="gray.600" mt={1}>
              Current: {currentMilestone.title}
            </Text>
          )}
        </Box>
      )}

      {/* Timeline & Budget */}
      <Flex justify="space-between" align="center" mb={4}>
        <VStack align="start" spacing={1}>
          <HStack spacing={2}>
            <FiCalendar size={14} color="gray" />
            <Text fontSize="sm" color="gray.600">
              {project.startDate ? formatDate(project.startDate) : 'Not started'} - {formatDate(project.dueDate)}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <FiDollarSign size={14} color="green" />
            <Text fontSize="sm" fontWeight="medium" color="green.600">
              {formatBudget(project.totalBudget)} • {project.budgetType}
            </Text>
          </HStack>
        </VStack>
      </Flex>

      <Divider mb={4} />

      {/* Activity Stats */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={4}>
          <HStack spacing={1}>
            <FiMessageSquare size={14} color="gray" />
            <Text fontSize="sm" color="gray.600">{project.messages}</Text>
          </HStack>
          <HStack spacing={1}>
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
          mb={4}
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
          mb={4}
        >
          <HStack justify="space-between" mb={1}>
            <Text fontSize="xs" fontWeight="bold" color="green.800">
              Your Rating
            </Text>
            <HStack spacing={1}>
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={12}
                  color={i < project.rating.score ? 'orange' : 'gray'}
                  fill={i < project.rating.score ? 'orange' : 'none'}
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
        variant={actionBtn.variant}
        colorScheme={actionBtn.colorScheme}
        leftIcon={<ActionIcon size={16} />}
        onClick={(e) => {
          e.stopPropagation();
          onActionClick?.(project, actionBtn.label.toLowerCase().replace(' ', '_'));
        }}
      >
        {actionBtn.label}
      </Button>
    </Box>
  );
};

export default ProjectCard;
