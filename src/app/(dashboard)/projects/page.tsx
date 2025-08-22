"use client"

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Button,
  Badge,
  Stack,
  HStack,
  Heading,
  Input,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiMessageSquare,
  FiUpload,
  FiEye,
} from 'react-icons/fi';
import { BsKanban } from 'react-icons/bs';

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "TechStart Inc",
    status: "In Progress",
    priority: "High",
    progress: 65,
    budget: 5000,
    escrowAmount: 2500,
    startDate: "2024-01-15",
    deadline: "2024-03-15",
    description: "Full-stack e-commerce platform with payment integration",
    uploads: 12,
    comments: 28,
    aiSummary: "Project is progressing well with frontend development 65% complete. Client feedback has been positive. Next milestone due in 5 days."
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    client: "StartupXYZ",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    budget: 3000,
    escrowAmount: 3000,
    startDate: "2024-01-01",
    deadline: "2024-02-01",
    description: "Modern mobile app design for fitness tracking",
    uploads: 25,
    comments: 15,
    aiSummary: "Successfully completed ahead of schedule. Client extremely satisfied with deliverables. Payment released in full.",
    feedback: {
      rating: 5,
      comment: "Outstanding work! Exceeded expectations in every way."
    }
  },
  {
    id: 3,
    title: "Brand Identity Package",
    client: "CreativeCorp",
    status: "Disputed",
    priority: "High",
    progress: 80,
    budget: 2500,
    escrowAmount: 1200,
    startDate: "2024-01-10",
    deadline: "2024-02-10",
    description: "Complete brand identity including logo, guidelines, and assets",
    uploads: 18,
    comments: 42,
    aiSummary: "Dispute raised over final deliverables. Mediation recommended. Most milestones completed satisfactorily.",
    dispute: {
      reason: "Client unhappy with final marketing materials",
      date: "2024-02-12",
      status: "Under Review"
    }
  }
];

const statusColors = {
  "In Progress": "blue",
  "Completed": "green",
  "Disputed": "red",
  "On Hold": "yellow"
} as const;

const priorityColors = {
  "High": "red",
  "Medium": "yellow",
  "Low": "green"
} as const;

interface Project {
  id: number;
  title: string;
  client: string;
  status: keyof typeof statusColors;
  priority: keyof typeof priorityColors;
  progress: number;
  budget: number;
  escrowAmount: number;
  startDate: string;
  deadline: string;
  description: string;
  uploads: number;
  comments: number;
  aiSummary: string;
  feedback?: {
    rating: number;
    comment: string;
  };
  dispute?: {
    reason: string;
    date: string;
    status: string;
  };
}

export default function MyProjectsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    if (selectedTab === 0) return matchesSearch && matchesStatus; // All
    if (selectedTab === 1) return matchesSearch && matchesStatus && project.status === "In Progress"; // Ongoing
    if (selectedTab === 2) return matchesSearch && matchesStatus && project.status === "Completed"; // Completed
    if (selectedTab === 3) return matchesSearch && matchesStatus && project.status === "Disputed"; // Disputed
    
    return matchesSearch && matchesStatus;
  });

  const ProjectCard = ({ project }: { project: Project }) => (
    <Box 
      cursor="pointer" 
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
    >
      <Flex justify="space-between" align="start" mb={4}>
        <Box flex="1">
          <Heading size="sm" mb={2}>{project.title}</Heading>
          <HStack gap={2} mb={2}>
            <Badge colorScheme={statusColors[project.status]} size="sm">
              {project.status}
            </Badge>
            <Badge colorScheme={priorityColors[project.priority]} variant="outline" size="sm">
              {project.priority}
            </Badge>
          </HStack>
        </Box>
        <Button size="sm" variant="ghost">
          •••
        </Button>
      </Flex>
      
      <Stack gap={3}>
        <HStack justify="space-between">
          <HStack gap={2}>
            <Box
              w="24px"
              h="24px"
              borderRadius="full"
              bg="blue.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="xs"
              fontWeight="bold"
            >
              {project.client.split(' ').map(n => n[0]).join('')}
            </Box>
            <Text fontSize="sm" color="gray.600">{project.client}</Text>
          </HStack>
          <Text fontSize="sm" fontWeight="bold" color="green.600">
            ${project.budget.toLocaleString()}
          </Text>
        </HStack>

        <Box>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="sm">Progress</Text>
            <Text fontSize="sm" color="gray.600">{project.progress}%</Text>
          </Flex>
          <Box w="full" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
            <Box
              h="full"
              bg="blue.500"
              borderRadius="md"
              style={{ width: `${project.progress}%` }}
            />
          </Box>
        </Box>

        <HStack justify="space-between" fontSize="sm" color="gray.600">
          <HStack gap={1}>
            <FiCalendar size={14} />
            <Text>Due: {new Date(project.deadline).toLocaleDateString()}</Text>
          </HStack>
          <HStack gap={3}>
            <HStack gap={1}>
              <FiUpload size={14} />
              <Text>{project.uploads}</Text>
            </HStack>
            <HStack gap={1}>
              <FiMessageSquare size={14} />
              <Text>{project.comments}</Text>
            </HStack>
          </HStack>
        </HStack>

        <Box bg="blue.50" p={3} borderRadius="md">
          <Text fontSize="xs" color="blue.800">
            <strong>AI Summary:</strong> {project.aiSummary}
          </Text>
        </Box>

        {project.status === "Disputed" && project.dispute && (
          <Box bg="red.50" border="1px solid" borderColor="red.200" p={3} borderRadius="md">
            <Text fontSize="xs" color="red.800" fontWeight="bold">
              Dispute: {project.dispute.status}
            </Text>
            <Text fontSize="xs" color="red.700">
              {project.dispute.reason}
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );

  const KanbanColumn = ({ title, projects }: { title: string; projects: Project[] }) => (
    <Box bg="gray.50" p={4} borderRadius="lg" minH="600px" minW="300px">
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="bold" fontSize="lg">{title}</Text>
        <Badge colorScheme="gray">{projects.length}</Badge>
      </HStack>
      
      <Stack gap={3}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Stack>
    </Box>
  );

  const TabButton = ({ index, label, isActive, onClick }: { 
    index: number; 
    label: string; 
    isActive: boolean; 
    onClick: () => void;
  }) => (
    <Button
      variant={isActive ? "solid" : "ghost"}
      colorScheme={isActive ? "blue" : "gray"}
      onClick={onClick}
      size="sm"
    >
      {label}
    </Button>
  );

  return (
    <Box p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" mb={2}>My Projects</Heading>
          <Text color="gray.600">Manage your ongoing and completed projects</Text>
        </Box>
        
        <HStack gap={2}>
          <Button
            variant={viewMode === "grid" ? "solid" : "outline"}
            onClick={() => setViewMode("grid")}
            size="sm"
          >
            <FiEye size={16} />
          </Button>
          <Button
            variant={viewMode === "kanban" ? "solid" : "outline"}
            onClick={() => setViewMode("kanban")}
            size="sm"
          >
            <BsKanban size={16} />
          </Button>
        </HStack>
      </Flex>

      {/* Filters */}
      <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200" mb={6}>
        <Flex gap={4} align="end" wrap="wrap">
          <Box flex="1" minW="250px">
            <Text fontSize="sm" mb={2}>Search Projects</Text>
            <Input
              placeholder="Search by project name or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          
          <Box minW="150px">
            <Text fontSize="sm" mb={2}>Filter by Status</Text>
            <select 
              value={statusFilter} 
              onChange={(e: any) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                backgroundColor: 'white',
                width: '100%'
              }}
            >
              <option value="all">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Disputed">Disputed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </Box>
        </Flex>
      </Box>

      {/* Tabs */}
      <HStack gap={4} mb={6}>
        <TabButton
          index={0}
          label={`All Projects (${mockProjects.length})`}
          isActive={selectedTab === 0}
          onClick={() => setSelectedTab(0)}
        />
        <TabButton
          index={1}
          label={`Ongoing (${mockProjects.filter(p => p.status === "In Progress").length})`}
          isActive={selectedTab === 1}
          onClick={() => setSelectedTab(1)}
        />
        <TabButton
          index={2}
          label={`Completed (${mockProjects.filter(p => p.status === "Completed").length})`}
          isActive={selectedTab === 2}
          onClick={() => setSelectedTab(2)}
        />
        <TabButton
          index={3}
          label={`Disputed (${mockProjects.filter(p => p.status === "Disputed").length})`}
          isActive={selectedTab === 3}
          onClick={() => setSelectedTab(3)}
        />
      </HStack>

      {/* Content */}
      {viewMode === "grid" ? (
        <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
          {filteredProjects.map(project => (
            <GridItem key={project.id}>
              <ProjectCard project={project} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <HStack align="start" overflowX="auto" gap={6} pb={4}>
          <KanbanColumn 
            title="In Progress" 
            projects={filteredProjects.filter(p => p.status === "In Progress")}
          />
          <KanbanColumn 
            title="Completed" 
            projects={filteredProjects.filter(p => p.status === "Completed")}
          />
          <KanbanColumn 
            title="Disputed" 
            projects={filteredProjects.filter(p => p.status === "Disputed")}
          />
        </HStack>
      )}

      {filteredProjects.length === 0 && (
        <Flex direction="column" align="center" justify="center" py={12}>
          <Text fontSize="lg" color="gray.600" mb={2}>No projects found</Text>
          <Text fontSize="sm" color="gray.500">Try adjusting your search or filters</Text>
        </Flex>
      )}
    </Box>
  );
}
