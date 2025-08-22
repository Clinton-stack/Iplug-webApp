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
  FiBell,
  FiCheck,
  FiDollarSign,
  FiSettings,
  FiCalendar,
  FiUsers,
  FiTarget,
  FiSearch,
  FiFilter,
  FiArchive,
  FiTrash2,
} from 'react-icons/fi';

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

// Interfaces
interface Notification {
  id: string;
  type: 'system' | 'milestone' | 'payment' | 'ai_suggestion' | 'referral';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    projectId?: string;
    amount?: number;
    dueDate?: string;
    referralId?: string;
  };
}

const NotificationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'system',
      title: 'Platform Update Released',
      message: '🔹 New messaging features and improved project management tools are now available.',
      timestamp: '2025-08-22T10:30:00Z',
      isRead: false,
      priority: 'medium',
      category: 'Platform Updates',
      actionText: 'View Changes'
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Project Deadline Approaching',
      message: '🔹 "Mobile App Development" milestone is due in 2 days. Current progress: 75%',
      timestamp: '2025-08-22T09:15:00Z',
      isRead: false,
      priority: 'high',
      category: 'Due Dates',
      metadata: {
        projectId: 'PRJ-123',
        dueDate: '2025-08-24'
      },
      actionText: 'View Project'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payout Processed',
      message: '🔹 Your payout of ₦25,000 has been successfully sent to your bank account.',
      timestamp: '2025-08-22T08:45:00Z',
      isRead: true,
      priority: 'medium',
      category: 'Payout Updates',
      metadata: {
        amount: 25000
      },
      actionText: 'View Receipt'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Escrow Funded',
      message: '🔹 Client has funded ₦15,000 into escrow for "Website Redesign" project.',
      timestamp: '2025-08-21T16:20:00Z',
      isRead: false,
      priority: 'high',
      category: 'Escrow Updates',
      metadata: {
        projectId: 'PRJ-124',
        amount: 15000
      },
      actionText: 'Start Work'
    },
    {
      id: '5',
      type: 'ai_suggestion',
      title: 'Perfect Job Match Found',
      message: '🔹 New UI/UX project matches your skills perfectly. High-paying client with 5★ rating.',
      timestamp: '2025-08-21T14:10:00Z',
      isRead: false,
      priority: 'high',
      category: 'Job Suggestions',
      actionText: 'View Job'
    },
    {
      id: '6',
      type: 'ai_suggestion',
      title: 'Collaboration Opportunity',
      message: '🔹 Team up with Sarah J. for a large e-commerce project. Your combined skills are perfect match.',
      timestamp: '2025-08-21T12:30:00Z',
      isRead: true,
      priority: 'medium',
      category: 'Collaboration Prompts',
      actionText: 'View Details'
    },
    {
      id: '7',
      type: 'referral',
      title: 'Referral Bonus Earned',
      message: 'Your referral John Smith completed his first project. You earned ₦500 bonus!',
      timestamp: '2025-08-21T11:15:00Z',
      isRead: false,
      priority: 'medium',
      category: 'Referral Approvals',
      metadata: {
        referralId: 'REF-789',
        amount: 500
      },
      actionText: 'View Earnings'
    },
    {
      id: '8',
      type: 'system',
      title: 'Security Update',
      message: '🔹 Enhanced security measures activated. Please review your account settings.',
      timestamp: '2025-08-20T20:45:00Z',
      isRead: true,
      priority: 'high',
      category: 'System Changes',
      actionText: 'Review Settings'
    },
    {
      id: '9',
      type: 'milestone',
      title: 'Milestone Completed',
      message: '🔹 "Logo Design" milestone completed successfully. Payment released from escrow.',
      timestamp: '2025-08-20T15:30:00Z',
      isRead: true,
      priority: 'medium',
      category: 'Project Progress',
      metadata: {
        projectId: 'PRJ-125',
        amount: 8000
      },
      actionText: 'View Project'
    },
    {
      id: '10',
      type: 'payment',
      title: 'Payment Received',
      message: '🔹 ₦12,500 payment received from client for completed work on "Brand Guidelines".',
      timestamp: '2025-08-20T13:20:00Z',
      isRead: true,
      priority: 'medium',
      category: 'Payment Updates',
      metadata: {
        amount: 12500
      },
      actionText: 'View Receipt'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return FiSettings;
      case 'milestone': return FiCalendar;
      case 'payment': return FiDollarSign;
      case 'ai_suggestion': return FiTarget;
      case 'referral': return FiUsers;
      default: return FiBell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'red.500';
    switch (type) {
      case 'system': return 'blue.500';
      case 'milestone': return 'orange.500';
      case 'payment': return 'green.500';
      case 'ai_suggestion': return 'purple.500';
      case 'referral': return 'cyan.500';
      default: return 'gray.500';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || notification.type === activeFilter;
    const matchesRead = !showUnreadOnly || !notification.isRead;
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesRead && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filterOptions = [
    { key: 'all', label: 'All Notifications', icon: FiBell },
    { key: 'system', label: 'System Notifications', icon: FiSettings },
    { key: 'milestone', label: 'Milestone Reminders', icon: FiCalendar },
    { key: 'payment', label: 'Payment Updates', icon: FiDollarSign },
    { key: 'ai_suggestion', label: 'AI Suggestions', icon: FiTarget },
    { key: 'referral', label: 'Referral Updates', icon: FiUsers },
  ];

  const markAsRead = (id: string) => {
    // In real app, this would update the backend
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In real app, this would update the backend
    console.log('Marking all notifications as read');
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack gap={3} mb={2} justify="space-between">
            <HStack gap={3}>
              <FiBell size={32} color="#3182ce" />
              <Heading size="xl">Notifications</Heading>
              <Badge colorScheme="blue" px={2} py={1} fontSize="sm">
                Alerts Hub
              </Badge>
              {unreadCount > 0 && (
                <Badge colorScheme="red" px={2} py={1} fontSize="sm">
                  {unreadCount} unread
                </Badge>
              )}
            </HStack>
            <HStack gap={2}>
              <Button size="sm" variant="outline" onClick={markAllAsRead}>
                <FiCheck style={{ marginRight: '8px' }} size={14} />
                Mark All Read
              </Button>
              <Button size="sm" variant="outline">
                <FiSettings style={{ marginRight: '8px' }} size={14} />
                Settings
              </Button>
            </HStack>
          </HStack>
          <Text color="gray.600" fontSize="lg">
            All important alerts from Plug, project updates, payment milestones, or messages.
          </Text>
        </Box>

        {/* Notification Stats */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
          <Card>
            <CardBody textAlign="center">
              <FiSettings size={20} color="#3182ce" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="blue.500">
                {notifications.filter(n => n.type === 'system').length}
              </Text>
              <Text fontSize="sm" color="gray.600">System Updates</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiCalendar size={20} color="#dd6b20" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="orange.500">
                {notifications.filter(n => n.type === 'milestone').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Milestone Alerts</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiDollarSign size={20} color="#38a169" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="green.500">
                {notifications.filter(n => n.type === 'payment').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Payment Updates</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <FiTarget size={20} color="#805ad5" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="xl" fontWeight="bold" color="purple.500">
                {notifications.filter(n => n.type === 'ai_suggestion').length}
              </Text>
              <Text fontSize="sm" color="gray.600">AI Suggestions</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <HStack gap={4} flexWrap="wrap" justify="space-between">
              <HStack gap={2} flexWrap="wrap">
                {filterOptions.map((filter) => (
                  <Button
                    key={filter.key}
                    size="sm"
                    variant={activeFilter === filter.key ? "solid" : "ghost"}
                    colorScheme={activeFilter === filter.key ? "blue" : "gray"}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    <filter.icon style={{ marginRight: '8px' }} size={14} />
                    {filter.label}
                  </Button>
                ))}
              </HStack>

              <HStack gap={2}>
                <HStack gap={2}>
                  <FiSearch color="#9ca3af" />
                  <Input
                    size="sm"
                    maxW="200px"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </HStack>
                <Button
                  size="sm"
                  variant={showUnreadOnly ? "solid" : "outline"}
                  colorScheme={showUnreadOnly ? "red" : "gray"}
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                >
                  <FiFilter style={{ marginRight: '4px' }} size={12} />
                  Unread Only
                </Button>
              </HStack>
            </HStack>
          </CardHeader>

          <CardBody>
            <VStack gap={4} align="stretch">
              {filteredNotifications.length === 0 ? (
                <Box textAlign="center" py={8}>
                  <FiBell size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
                  <Text color="gray.500" fontSize="lg" mb={2}>No notifications found</Text>
                  <Text fontSize="sm" color="gray.400">
                    {searchQuery ? 'Try adjusting your search terms' : 'All caught up! Check back later for updates.'}
                  </Text>
                </Box>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    bg={notification.isRead ? "white" : "blue.50"}
                    borderColor={notification.isRead ? "gray.200" : "blue.200"}
                    borderWidth={notification.isRead ? "1px" : "2px"}
                  >
                    <CardBody>
                      <HStack gap={4} align="start">
                        <Box position="relative">
                          {React.createElement(getNotificationIcon(notification.type), {
                            size: 24,
                            color: getNotificationColor(notification.type, notification.priority)
                          })}
                          {!notification.isRead && (
                            <Box
                              position="absolute"
                              top="-2px"
                              right="-2px"
                              w="8px"
                              h="8px"
                              borderRadius="full"
                              bg="red.500"
                            />
                          )}
                        </Box>

                        <VStack align="stretch" flex={1} gap={2}>
                          <HStack justify="space-between" align="start">
                            <VStack align="start" gap={1} flex={1}>
                              <HStack gap={2} flexWrap="wrap">
                                <Text fontWeight="bold" color={notification.isRead ? "gray.700" : "gray.900"}>
                                  {notification.title}
                                </Text>
                                <Badge 
                                  size="sm" 
                                  colorScheme={getPriorityBadgeColor(notification.priority)}
                                  variant="outline"
                                >
                                  {notification.priority}
                                </Badge>
                                <Badge size="sm" variant="outline" colorScheme="gray">
                                  {notification.category}
                                </Badge>
                              </HStack>
                              
                              <Text 
                                fontSize="sm" 
                                color={notification.isRead ? "gray.600" : "gray.800"}
                                lineHeight="1.5"
                              >
                                {notification.message}
                              </Text>

                              {notification.metadata && (
                                <HStack gap={4} fontSize="xs" color="gray.500" mt={1}>
                                  {notification.metadata.amount && (
                                    <HStack gap={1}>
                                      <FiDollarSign size={12} />
                                      <Text>₦{notification.metadata.amount.toLocaleString()}</Text>
                                    </HStack>
                                  )}
                                  {notification.metadata.dueDate && (
                                    <HStack gap={1}>
                                      <FiCalendar size={12} />
                                      <Text>Due: {new Date(notification.metadata.dueDate).toLocaleDateString()}</Text>
                                    </HStack>
                                  )}
                                  {notification.metadata.projectId && (
                                    <HStack gap={1}>
                                      <FiTarget size={12} />
                                      <Text>{notification.metadata.projectId}</Text>
                                    </HStack>
                                  )}
                                </HStack>
                              )}
                            </VStack>

                            <VStack align="end" gap={2}>
                              <Text fontSize="xs" color="gray.500">
                                {formatTimestamp(notification.timestamp)}
                              </Text>
                              <HStack gap={1}>
                                {!notification.isRead && (
                                  <Button 
                                    size="xs" 
                                    variant="outline" 
                                    colorScheme="blue"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <FiCheck size={12} />
                                  </Button>
                                )}
                                <Button size="xs" variant="outline" colorScheme="gray">
                                  <FiArchive size={12} />
                                </Button>
                                <Button size="xs" variant="outline" colorScheme="red">
                                  <FiTrash2 size={12} />
                                </Button>
                              </HStack>
                            </VStack>
                          </HStack>

                          {notification.actionText && (
                            <HStack justify="flex-start" mt={2}>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                {notification.actionText}
                              </Button>
                            </HStack>
                          )}
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))
              )}
            </VStack>

            {filteredNotifications.length > 0 && (
              <HStack justify="center" mt={6}>
                <Button variant="outline" size="sm">
                  Load More Notifications
                </Button>
              </HStack>
            )}
          </CardBody>
        </Card>

        {/* Notification Categories Overview */}
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
          <Card>
            <CardHeader>
              <Heading size="md">Recent Activity Summary</Heading>
            </CardHeader>
            <CardBody>
              <VStack gap={3} align="stretch">
                <HStack justify="space-between" p={2} bg="blue.50" borderRadius="md">
                  <HStack gap={2}>
                    <FiSettings color="#3182ce" />
                    <Text fontSize="sm" fontWeight="medium">System Updates</Text>
                  </HStack>
                  <Badge colorScheme="blue">2 new</Badge>
                </HStack>

                <HStack justify="space-between" p={2} bg="orange.50" borderRadius="md">
                  <HStack gap={2}>
                    <FiCalendar color="#dd6b20" />
                    <Text fontSize="sm" fontWeight="medium">Upcoming Deadlines</Text>
                  </HStack>
                  <Badge colorScheme="orange">1 urgent</Badge>
                </HStack>

                <HStack justify="space-between" p={2} bg="green.50" borderRadius="md">
                  <HStack gap={2}>
                    <FiDollarSign color="#38a169" />
                    <Text fontSize="sm" fontWeight="medium">Payment Activities</Text>
                  </HStack>
                  <Badge colorScheme="green">3 updates</Badge>
                </HStack>

                <HStack justify="space-between" p={2} bg="purple.50" borderRadius="md">
                  <HStack gap={2}>
                    <FiTarget color="#805ad5" />
                    <Text fontSize="sm" fontWeight="medium">AI Recommendations</Text>
                  </HStack>
                  <Badge colorScheme="purple">2 matches</Badge>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Notification Settings</Heading>
            </CardHeader>
            <CardBody>
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Customize which notifications you receive
                </Text>
                
                <HStack justify="space-between">
                  <Text fontSize="sm">🔹 System updates</Text>
                  <Box w="40px" h="20px" bg="blue.500" borderRadius="full" />
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm">🔹 Project deadlines</Text>
                  <Box w="40px" h="20px" bg="blue.500" borderRadius="full" />
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm">🔹 Payment alerts</Text>
                  <Box w="40px" h="20px" bg="blue.500" borderRadius="full" />
                </HStack>

                <HStack justify="space-between">
                  <Text fontSize="sm">🔹 AI suggestions</Text>
                  <Box w="40px" h="20px" bg="gray.200" borderRadius="full" />
                </HStack>

                <Button size="sm" colorScheme="blue" mt={2}>
                  Save Preferences
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </Container>
  );
};

export default NotificationsPage;
