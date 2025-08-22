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
  Button,
  Badge,
  Progress,
  Stack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  Avatar,
  Textarea,
  Alert,
  AlertIcon,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiUpload,
  FiCheckCircle,
  FiTrendingUp,
  FiStar,
  FiDownload,
  FiEye,
  FiSend,
  FiPaperclip,
} from 'react-icons/fi';

const statusColors = {
  "completed": "green",
  "in-progress": "blue",
  "pending": "yellow",
  "in-dispute": "red"
};

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [newComment, setNewComment] = useState("");

  if (!project) return null;

  const MilestoneTracker = () => (
    <Stack gap={4}>
      {project.milestones?.map((milestone, index) => (
        <Card key={milestone.id}>
          <CardBody>
            <Flex justify="space-between" align="start" mb={3}>
              <Box flex="1">
                <HStack gap={3} mb={2}>
                  <Box
                    w="8"
                    h="8"
                    borderRadius="full"
                    bg={milestone.status === "completed" ? "green.500" : 
                        milestone.status === "in-progress" ? "blue.500" : "gray.300"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {milestone.status === "completed" ? (
                      <FiCheckCircle color="white" size={16} />
                    ) : (
                      <Text color="white" fontSize="sm" fontWeight="bold">
                        {index + 1}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    <Text fontWeight="semibold">{milestone.title}</Text>
                    <HStack gap={4} fontSize="sm" color="gray.600">
                      <HStack gap={1}>
                        <FiCalendar size={14} />
                        <Text>Due: {new Date(milestone.dueDate).toLocaleDateString()}</Text>
                      </HStack>
                      <HStack gap={1}>
                        <FiDollarSign size={14} />
                        <Text>${milestone.amount.toLocaleString()}</Text>
                      </HStack>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
              
              <Badge colorScheme={statusColors[milestone.status]} textTransform="capitalize">
                {milestone.status.replace("-", " ")}
              </Badge>
            </Flex>

            {milestone.status === "completed" && (
              <Alert status="success" size="sm">
                <AlertIcon />
                <Text fontSize="sm">Milestone completed and approved</Text>
              </Alert>
            )}

            {milestone.status === "in-dispute" && (
              <Alert status="warning" size="sm">
                <AlertIcon />
                <Text fontSize="sm">This milestone is currently under dispute</Text>
              </Alert>
            )}
          </CardBody>
        </Card>
      ))}
    </Stack>
  );

  const UploadsSection = () => {
    const mockUploads = [
      { id: 1, name: "wireframes_v1.pdf", type: "pdf", size: "2.4 MB", date: "2024-02-15", url: "" },
      { id: 2, name: "homepage_design.png", type: "image", size: "1.8 MB", date: "2024-02-14", url: "" },
      { id: 3, name: "user_flow.fig", type: "figma", size: "5.2 MB", date: "2024-02-12", url: "" },
    ];

    return (
      <Stack gap={4}>
        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Project Files ({project.uploads})</Text>
          <Button size="sm" leftIcon={<FiUpload />}>
            Upload File
          </Button>
        </Flex>

        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
          {mockUploads.map(file => (
            <Card key={file.id}>
              <CardBody>
                <HStack justify="space-between" mb={2}>
                  <HStack gap={2}>
                    <Box
                      w="8"
                      h="8"
                      bg="gray.100"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <FiUpload size={16} color="gray.600" />
                    </Box>
                    <Box flex="1" minW={0}>
                      <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                        {file.name}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {file.size} • {file.date}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack gap={1}>
                    <IconButton size="xs" variant="ghost" aria-label="View">
                      <FiEye />
                    </IconButton>
                    <IconButton size="xs" variant="ghost" aria-label="Download">
                      <FiDownload />
                    </IconButton>
                  </HStack>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Stack>
    );
  };

  const CommentsSection = () => {
    const mockComments = [
      {
        id: 1,
        author: project.client,
        avatar: "",
        content: "Great progress on the wireframes! Could we make the header slightly larger?",
        date: "2024-02-15 10:30 AM",
        type: "client"
      },
      {
        id: 2,
        author: "You",
        avatar: "",
        content: "Absolutely! I'll adjust the header size and send you the updated version.",
        date: "2024-02-15 11:15 AM",
        type: "provider"
      },
      {
        id: 3,
        author: project.client,
        avatar: "",
        content: "Perfect! The new header size looks much better. Approved for the next phase.",
        date: "2024-02-15 2:45 PM",
        type: "client"
      }
    ];

    return (
      <Stack gap={4}>
        <Stack gap={3} maxH="400px" overflowY="auto">
          {mockComments.map(comment => (
            <Flex key={comment.id} gap={3}>
              <Avatar size="sm" name={comment.author} />
              <Box flex="1">
                <HStack gap={2} mb={1}>
                  <Text fontSize="sm" fontWeight="semibold">{comment.author}</Text>
                  <Text fontSize="xs" color="gray.500">{comment.date}</Text>
                  <Badge size="sm" colorScheme={comment.type === "client" ? "blue" : "green"}>
                    {comment.type}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.700">{comment.content}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>

        <Divider />

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>Add a comment</Text>
          <Stack gap={2}>
            <Textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="sm"
              rows={3}
            />
            <Flex justify="space-between">
              <Button size="sm" variant="outline" leftIcon={<FiPaperclip />}>
                Attach File
              </Button>
              <Button 
                size="sm" 
                colorScheme="blue" 
                leftIcon={<FiSend />}
                isDisabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    );
  };

  const EscrowTracker = () => (
    <Stack gap={4}>
      <Card>
        <CardHeader>
          <Heading size="sm">Escrow Summary</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>Total Project Value</Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                ${project.budget.toLocaleString()}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>Amount in Escrow</Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                ${project.escrowAmount.toLocaleString()}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>Released Amount</Text>
              <Text fontSize="2xl" fontWeight="bold">
                ${(project.budget - project.escrowAmount).toLocaleString()}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>Release Progress</Text>
              <Progress 
                value={((project.budget - project.escrowAmount) / project.budget) * 100} 
                colorScheme="green" 
                size="lg" 
                borderRadius="md"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                {(((project.budget - project.escrowAmount) / project.budget) * 100).toFixed(1)}% Released
              </Text>
            </Box>
          </Grid>

          <Divider my={4} />

          <Box>
            <Text fontWeight="semibold" mb={3}>Milestone Payments</Text>
            <Stack gap={2}>
              {project.milestones?.map(milestone => (
                <Flex key={milestone.id} justify="space-between" align="center" p={2} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm">{milestone.title}</Text>
                  <HStack gap={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      ${milestone.amount.toLocaleString()}
                    </Text>
                    <Badge colorScheme={statusColors[milestone.status]} size="sm">
                      {milestone.status === "completed" ? "Released" : 
                       milestone.status === "in-progress" ? "In Escrow" : "Pending"}
                    </Badge>
                  </HStack>
                </Flex>
              ))}
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </Stack>
  );

  const FeedbackSection = () => (
    <Stack gap={4}>
      {project.feedback ? (
        <Card>
          <CardBody>
            <HStack justify="space-between" mb={3}>
              <Text fontWeight="semibold">Client Feedback</Text>
              <HStack gap={1}>
                {[1, 2, 3, 4, 5].map(star => (
                  <FiStar 
                    key={star}
                    size={16}
                    color={star <= project.feedback.rating ? "#F6AD55" : "#E2E8F0"}
                    fill={star <= project.feedback.rating ? "#F6AD55" : "none"}
                  />
                ))}
                <Text fontSize="sm" color="gray.600" ml={2}>
                  ({project.feedback.rating}/5)
                </Text>
              </HStack>
            </HStack>
            <Text color="gray.700">{project.feedback.comment}</Text>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody textAlign="center" py={8}>
            <Text color="gray.500" mb={4}>No feedback available yet</Text>
            <Button size="sm" colorScheme="blue">
              Request Feedback
            </Button>
          </CardBody>
        </Card>
      )}
    </Stack>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>
          <Flex justify="space-between" align="start">
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {project.title}
              </Text>
              <HStack gap={3}>
                <Badge colorScheme={statusColors[project.status.toLowerCase().replace(" ", "-")]} size="sm">
                  {project.status}
                </Badge>
                <HStack gap={1} fontSize="sm" color="gray.600">
                  <FiUser size={14} />
                  <Text>{project.client}</Text>
                </HStack>
                <HStack gap={1} fontSize="sm" color="gray.600">
                  <FiDollarSign size={14} />
                  <Text>${project.budget.toLocaleString()}</Text>
                </HStack>
              </HStack>
            </Box>
            <HStack gap={2}>
              <Button size="sm" variant="outline">
                Edit Project
              </Button>
              <Button size="sm" colorScheme="blue">
                Contact Client
              </Button>
            </HStack>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Box mb={6}>
            <Text color="gray.700" mb={4}>{project.description}</Text>
            
            <Box bg="blue.50" p={4} borderRadius="md">
              <HStack gap={2} mb={2}>
                <FiTrendingUp color="#3182CE" />
                <Text fontSize="sm" fontWeight="semibold" color="blue.800">
                  AI Project Summary
                </Text>
              </HStack>
              <Text fontSize="sm" color="blue.800">
                {project.aiSummary}
              </Text>
            </Box>
          </Box>

          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>Milestones</Tab>
              <Tab>Uploads & Files</Tab>
              <Tab>Comments ({project.comments})</Tab>
              <Tab>Escrow Tracker</Tab>
              <Tab>Feedback</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <MilestoneTracker />
              </TabPanel>
              <TabPanel px={0}>
                <UploadsSection />
              </TabPanel>
              <TabPanel px={0}>
                <CommentsSection />
              </TabPanel>
              <TabPanel px={0}>
                <EscrowTracker />
              </TabPanel>
              <TabPanel px={0}>
                <FeedbackSection />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailsModal;
