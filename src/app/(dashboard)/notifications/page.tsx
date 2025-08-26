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
  Switch,
} from '@chakra-ui/react';
import {
  FiBell,
  FiSearch,
  FiFilter,
  FiSettings,
  FiCheckCircle,
  FiDollarSign,
  FiMessageSquare,
  FiGift,
  FiShield,
  FiTrendingUp,
  FiArchive,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiVolumeX,
  FiTarget,
  FiAward,
  FiChevronDown,
  FiChevronUp,
  FiBellOff,
  FiHeart,
} from 'react-icons/fi';
import { useState } from 'react';

// Interfaces
interface Notification {
  id: number;
  category: 'project_updates' | 'messages' | 'milestones' | 'payments_finance' | 'gamification_rewards' | 'platform_alerts' | 'system_admin' | 'project_status' | 'milestone_approvals' | 'referrals' | 'security';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionButton?: {
    text: string;
    variant: 'solid' | 'outline';
    colorScheme: string;
  };
  avatar?: string;
  clientName?: string;
  providerName?: string;
  projectTitle?: string;
  amount?: number;
  expandedContent?: string;
  isFollowing?: boolean;
  jobId?: string;
  allowSilence?: boolean;
}

interface NotificationPreferences {
  categories: {
    [key: string]: {
      enabled: boolean;
      email: boolean;
      push: boolean;
    };
  };
  silenceAll: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
}

// Mock Data - Service Requester
const mockRequesterNotifications: Notification[] = [
  {
    id: 1,
    category: 'milestone_approvals',
    title: 'Milestone Ready for Approval',
    message: 'Sarah Johnson has completed Milestone 2 of "E-commerce Website Design" and is awaiting your approval.',
    timestamp: '2025-08-26T10:30:00Z',
    isRead: false,
    priority: 'high',
    actionButton: {
      text: 'Approve Milestone',
      variant: 'solid',
      colorScheme: 'green',
    },
    providerName: 'Sarah Johnson',
    projectTitle: 'E-commerce Website Design',
    expandedContent: 'Milestone 2: User Interface Design - All wireframes and high-fidelity mockups have been completed according to specifications. Includes responsive design for mobile and tablet views.',
    isFollowing: false,
    jobId: 'job-123',
    allowSilence: true,
  },
  {
    id: 2,
    category: 'payments_finance',
    title: 'Payment Release Required',
    message: 'Milestone payment of $2,500 is ready to be released for "Mobile App Development".',
    timestamp: '2025-08-26T09:15:00Z',
    isRead: false,
    priority: 'high',
    actionButton: {
      text: 'Release Payment',
      variant: 'solid',
      colorScheme: 'blue',
    },
    providerName: 'Michael Chen',
    projectTitle: 'Mobile App Development',
    amount: 2500,
    expandedContent: 'Payment Details: Milestone 3 completion - Backend API development and database integration. All acceptance criteria met and tested.',
    isFollowing: true,
    jobId: 'job-456',
    allowSilence: false,
  },
  {
    id: 3,
    category: 'messages',
    title: 'New Message from Provider',
    message: 'Alex Rivera sent you a message regarding "Logo Design Project".',
    timestamp: '2025-08-26T08:45:00Z',
    isRead: false,
    priority: 'medium',
    actionButton: {
      text: 'View Message',
      variant: 'outline',
      colorScheme: 'blue',
    },
    providerName: 'Alex Rivera',
    projectTitle: 'Logo Design Project',
    expandedContent: 'Message preview: "Hi! I have completed the initial logo concepts and would love to get your feedback before proceeding to the next phase..."',
    isFollowing: false,
    jobId: 'job-789',
    allowSilence: true,
  },
  {
    id: 4,
    category: 'project_status',
    title: 'Project Deadline Approaching',
    message: 'Your project "Website Redesign" with Emma Davis has 3 days remaining.',
    timestamp: '2025-08-26T07:20:00Z',
    isRead: true,
    priority: 'medium',
    providerName: 'Emma Davis',
    projectTitle: 'Website Redesign',
  },
  {
    id: 5,
    category: 'referrals',
    title: 'Referral Reward Earned',
    message: 'You earned 200 referral points! Your referral to StartupXYZ was successful.',
    timestamp: '2025-08-25T16:30:00Z',
    isRead: true,
    priority: 'low',
    expandedContent: 'Referral Details: Jordan Smith was hired by StartupXYZ for their mobile development project. Your reward: 200 points ($20 credit).',
  },
  {
    id: 6,
    category: 'security',
    title: 'KYC Verification Required',
    message: 'Please complete your KYC verification to continue using payment services.',
    timestamp: '2025-08-25T14:15:00Z',
    isRead: false,
    priority: 'high',
    actionButton: {
      text: 'Complete KYC',
      variant: 'solid',
      colorScheme: 'orange',
    },
    expandedContent: 'For security and compliance purposes, please upload a government-issued ID and proof of address. This is required for payments above $1,000.',
  },
  {
    id: 7,
    category: 'system_admin',
    title: 'Platform Update Available',
    message: 'New features are available! Check out enhanced project management tools.',
    timestamp: '2025-08-25T12:00:00Z',
    isRead: true,
    priority: 'low',
    actionButton: {
      text: 'View Updates',
      variant: 'outline',
      colorScheme: 'purple',
    },
    expandedContent: 'What\'s New: Advanced milestone tracking, improved messaging system, enhanced payment security, and new collaboration tools.',
  },
];

// Mock Data - Service Provider
const mockProviderNotifications: Notification[] = [
  {
    id: 1,
    category: 'project_updates',
    title: 'New Project Invitation',
    message: 'TechStartup Inc. has invited you to work on their "Mobile Banking App" project.',
    timestamp: '2025-08-26T11:15:00Z',
    isRead: false,
    priority: 'high',
    actionButton: {
      text: 'View Project',
      variant: 'solid',
      colorScheme: 'blue',
    },
    clientName: 'TechStartup Inc.',
    projectTitle: 'Mobile Banking App',
    amount: 5000,
    expandedContent: 'Project Details: Full-stack mobile banking application with secure payment integration. Timeline: 8 weeks. Budget: $5,000.',
  },
  {
    id: 2,
    category: 'milestones',
    title: 'Milestone Approved',
    message: 'Great work! Your Milestone 1 for "E-commerce Website" has been approved.',
    timestamp: '2025-08-26T10:45:00Z',
    isRead: false,
    priority: 'medium',
    actionButton: {
      text: 'Start Next Phase',
      variant: 'solid',
      colorScheme: 'green',
    },
    clientName: 'RetailCorp',
    projectTitle: 'E-commerce Website',
    amount: 1500,
    expandedContent: 'Milestone 1: Initial wireframes and design concepts have been approved. Payment of $1,500 has been released to your account.',
  },
  {
    id: 3,
    category: 'payments_finance',
    title: 'Payment Received',
    message: 'You received $2,000 for completing "Logo Design" project.',
    timestamp: '2025-08-26T09:30:00Z',
    isRead: false,
    priority: 'medium',
    actionButton: {
      text: 'Withdraw Earnings',
      variant: 'outline',
      colorScheme: 'green',
    },
    clientName: 'Brand Agency',
    projectTitle: 'Logo Design',
    amount: 2000,
    expandedContent: 'Payment Details: Final payment for logo design project. Funds are now available in your account balance.',
  },
  {
    id: 4,
    category: 'messages',
    title: 'New Message from Client',
    message: 'StartupXYZ sent you a message about project requirements.',
    timestamp: '2025-08-26T08:15:00Z',
    isRead: true,
    priority: 'medium',
    actionButton: {
      text: 'Reply',
      variant: 'outline',
      colorScheme: 'blue',
    },
    clientName: 'StartupXYZ',
    projectTitle: 'Web App Development',
    expandedContent: 'Message preview: "Hi! We need to discuss some changes to the user authentication flow. Can we schedule a call tomorrow?"',
  },
  {
    id: 5,
    category: 'gamification_rewards',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You\'ve earned the "Top Performer" badge for excellent ratings.',
    timestamp: '2025-08-25T17:20:00Z',
    isRead: false,
    priority: 'low',
    actionButton: {
      text: 'View Profile',
      variant: 'outline',
      colorScheme: 'purple',
    },
    expandedContent: 'Achievement Details: You\'ve maintained a 4.9+ star rating across 25+ completed projects. This badge increases your profile visibility by 20%.',
  },
  {
    id: 6,
    category: 'platform_alerts',
    title: 'Profile Views Increased',
    message: 'Your profile was viewed 45 times this week - up 25% from last week!',
    timestamp: '2025-08-25T15:30:00Z',
    isRead: true,
    priority: 'low',
    actionButton: {
      text: 'View Analytics',
      variant: 'outline',
      colorScheme: 'blue',
    },
    expandedContent: 'Profile Analytics: 45 views this week, 15 shortlists, 3 direct messages. Your "React Development" skills are trending.',
  },
  {
    id: 7,
    category: 'system_admin',
    title: 'Tax Document Ready',
    message: 'Your 1099 tax document for 2024 is ready for download.',
    timestamp: '2025-08-25T12:45:00Z',
    isRead: false,
    priority: 'high',
    actionButton: {
      text: 'Download',
      variant: 'solid',
      colorScheme: 'orange',
    },
    expandedContent: 'Tax Information: Your 2024 earnings summary and 1099 form are available. Total reported income: $45,000.',
  },
  {
    id: 8,
    category: 'project_updates',
    title: 'Project Deadline Reminder',
    message: 'Reminder: "Website Redesign" project deadline is in 2 days.',
    timestamp: '2025-08-25T11:00:00Z',
    isRead: true,
    priority: 'medium',
    clientName: 'Design Agency',
    projectTitle: 'Website Redesign',
    expandedContent: 'Project Status: 85% complete. Remaining tasks: final testing and client review. Estimated completion: Tomorrow.',
  },
];

const defaultRequesterPreferences: NotificationPreferences = {
  categories: {
    project_status: { enabled: true, email: true, push: true },
    milestone_approvals: { enabled: true, email: true, push: true },
    payments_finance: { enabled: true, email: true, push: true },
    messages: { enabled: true, email: false, push: true },
    referrals: { enabled: true, email: false, push: false },
    system_admin: { enabled: true, email: false, push: false },
    security: { enabled: true, email: true, push: true },
  },
  silenceAll: false,
  frequency: 'instant',
};

const defaultProviderPreferences: NotificationPreferences = {
  categories: {
    project_updates: { enabled: true, email: true, push: true },
    messages: { enabled: true, email: false, push: true },
    milestones: { enabled: true, email: true, push: true },
    payments_finance: { enabled: true, email: true, push: true },
    gamification_rewards: { enabled: true, email: false, push: true },
    platform_alerts: { enabled: true, email: false, push: false },
    system_admin: { enabled: true, email: true, push: false },
  },
  silenceAll: false,
  frequency: 'instant',
};

// Component Definitions
const NotificationCard = ({ 
  notification, 
  onMarkRead, 
  onArchive, 
  onDelete,
  onSilence,
  onFollow
}: { 
  notification: Notification;
  onMarkRead: (id: number) => void;
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
  onSilence?: (id: number, jobId?: string) => void;
  onFollow?: (id: number, providerName?: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      // Requester categories
      case 'project_status': return <FiTarget color="#3182ce" />;
      case 'milestone_approvals': return <FiCheckCircle color="#38a169" />;
      case 'referrals': return <FiGift color="#38a169" />;
      case 'security': return <FiShield color="#e53e3e" />;
      // Provider categories
      case 'project_updates': return <FiTarget color="#3182ce" />;
      case 'milestones': return <FiCheckCircle color="#2563eb" />;
      case 'gamification_rewards': return <FiAward color="#7c3aed" />;
      case 'platform_alerts': return <FiTrendingUp color="#0891b2" />;
      // Shared categories
      case 'messages': return <FiMessageSquare color="#805ad5" />;
      case 'payments_finance': return <FiDollarSign color="#059669" />;
      case 'system_admin': return <FiSettings color="#6b7280" />;
      default: return <FiBell color="#718096" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'gray';
      default: return 'gray';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card.Root 
      borderRadius="lg" 
      shadow="sm" 
      borderLeft={notification.priority === 'high' ? '4px solid' : undefined}
      borderLeftColor={notification.priority === 'high' ? 'red.500' : undefined}
      bg={notification.isRead ? 'white' : (notification.priority === 'high' ? 'red.50' : 'blue.50')}
      _hover={{ shadow: 'md' }}
      border={notification.priority === 'high' ? '1px solid' : undefined}
      borderColor={notification.priority === 'high' ? 'red.200' : undefined}
    >
      <Card.Body p={4}>
        <VStack gap={3} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="start">
            <HStack gap={3} flex={1}>
              <Box p={2} bg="gray.100" borderRadius="full">
                {getCategoryIcon(notification.category)}
              </Box>
              <Box flex={1}>
                <HStack gap={2} mb={1}>
                  <Heading 
                    size="sm" 
                    fontWeight={notification.priority === 'high' ? 'bold' : (notification.isRead ? 'normal' : 'semibold')}
                    color={notification.priority === 'high' ? 'red.600' : 'inherit'}
                  >
                    {notification.title}
                  </Heading>
                  <Badge 
                    size="sm" 
                    colorScheme={getPriorityColor(notification.priority)}
                    variant="outline"
                  >
                    {notification.priority}
                  </Badge>
                  {!notification.isRead && (
                    <Badge size="sm" colorScheme="blue" variant="solid">
                      New
                    </Badge>
                  )}
                </HStack>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  {notification.message}
                </Text>
                
                {/* Provider/Client/Project Info */}
                {(notification.providerName || notification.clientName) && (
                  <HStack gap={2} mb={2}>
                    <Avatar.Root size="xs">
                      {notification.avatar ? (
                        <Avatar.Image src={notification.avatar} alt={notification.providerName || notification.clientName} />
                      ) : null}
                      <Avatar.Fallback>
                        {(notification.providerName || notification.clientName || '').split(' ').map(n => n[0]).join('')}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <Text fontSize="xs" color="gray.500">
                      {notification.providerName || notification.clientName}
                      {notification.projectTitle && ` • ${notification.projectTitle}`}
                      {notification.amount && ` • $${notification.amount.toLocaleString()}`}
                    </Text>
                  </HStack>
                )}
              </Box>
            </HStack>
            
            {/* Actions */}
            <HStack gap={1}>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label={notification.isRead ? 'Mark as unread' : 'Mark as read'}
                onClick={() => onMarkRead(notification.id)}
              >
                {notification.isRead ? <FiEyeOff /> : <FiEye />}
              </IconButton>
              
              {/* Follow Provider Thread - Only for Service Requesters with provider */}
              {notification.providerName && onFollow && (
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label={notification.isFollowing ? 'Unfollow' : 'Follow thread'}
                  onClick={() => onFollow(notification.id, notification.providerName)}
                  color={notification.isFollowing ? 'blue.500' : 'gray.500'}
                >
                  <FiHeart />
                </IconButton>
              )}
              
              {/* Silence Job Notifications */}
              {notification.allowSilence && onSilence && (
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="Do not notify me again"
                  onClick={() => onSilence(notification.id, notification.jobId)}
                >
                  <FiBellOff />
                </IconButton>
              )}
              
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Archive notification"
                onClick={() => onArchive(notification.id)}
              >
                <FiArchive />
              </IconButton>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Delete notification"
                onClick={() => onDelete(notification.id)}
              >
                <FiTrash2 />
              </IconButton>
            </HStack>
          </HStack>

          {/* Action Button and Timestamp */}
          <HStack justify="space-between" align="center">
            <HStack gap={2}>
              {notification.actionButton && (
                <Button 
                  size="sm" 
                  variant={notification.actionButton.variant}
                  colorScheme={notification.actionButton.colorScheme}
                >
                  {notification.actionButton.text}
                </Button>
              )}
              {notification.expandedContent && (
                <Button size="sm" variant="ghost" onClick={toggleExpanded}>
                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                  Details
                </Button>
              )}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              {formatTimestamp(notification.timestamp)}
            </Text>
          </HStack>

          {/* Expanded Content */}
          {notification.expandedContent && isExpanded && (
            <Box mt={3} p={3} bg="gray.50" borderRadius="md">
              <Text fontSize="sm" color="gray.700">
                {notification.expandedContent}
              </Text>
            </Box>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const PreferencesPanel = ({ 
  preferences, 
  onPreferencesChange,
  isProvider = false
}: { 
  preferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
  isProvider?: boolean;
}) => {
  const requesterCategoryLabels = {
    project_status: 'Project Status',
    milestone_approvals: 'Milestone Approvals',
    payments_finance: 'Payments & Escrow',
    messages: 'Messages',
    referrals: 'Referrals & Rewards',
    system_admin: 'System Announcements',
    security: 'Security / KYC / Account',
  };

  const providerCategoryLabels = {
    project_updates: 'Project Updates',
    messages: 'Messages',
    milestones: 'Milestones',
    payments_finance: 'Payments & Finance',
    gamification_rewards: 'Gamification & Rewards',
    platform_alerts: 'Platform Alerts',
    system_admin: 'System / Admin Notices',
  };

  const categoryLabels = isProvider ? providerCategoryLabels : requesterCategoryLabels;

  const updateCategoryPreference = (category: string, field: 'enabled' | 'email' | 'push', value: boolean) => {
    const newPreferences = {
      ...preferences,
      categories: {
        ...preferences.categories,
        [category]: {
          ...preferences.categories[category],
          [field]: value,
        },
      },
    };
    onPreferencesChange(newPreferences);
  };

  const toggleSilenceAll = (silenced: boolean) => {
    onPreferencesChange({
      ...preferences,
      silenceAll: silenced,
    });
  };

  return (
    <Card.Root>
      <Card.Body p={6}>
        <VStack gap={6} align="stretch">
          <Heading size="md">Notification Preferences</Heading>

          {/* Silence All Toggle */}
          <HStack justify="space-between" p={4} bg="red.50" borderRadius="md" borderLeft="4px solid" borderLeftColor="red.500">
            <VStack align="start" gap={1}>
              <HStack>
                <FiVolumeX color="#e53e3e" />
                <Text fontWeight="semibold">Silence All Notifications</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Temporarily disable all notifications
              </Text>
            </VStack>
            <Switch.Root 
              checked={preferences.silenceAll}
              onCheckedChange={(details) => toggleSilenceAll(details.checked)}
            >
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Root>
          </HStack>

          {/* Category Preferences */}
          <VStack gap={4} align="stretch">
            <Heading size="sm">Category Settings</Heading>
            {Object.entries(categoryLabels).map(([category, label]) => {
              const categoryPrefs = preferences.categories[category];
              if (!categoryPrefs) return null;
              return (
                <Card.Root key={category} variant="outline">
                  <Card.Body p={4}>
                    <VStack gap={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontWeight="semibold">{label}</Text>
                        <Switch.Root 
                          checked={categoryPrefs.enabled}
                          onCheckedChange={(details) => updateCategoryPreference(category, 'enabled', details.checked)}
                          disabled={preferences.silenceAll}
                        >
                          <Switch.Control>
                            <Switch.Thumb />
                          </Switch.Control>
                        </Switch.Root>
                      </HStack>
                      
                      {categoryPrefs.enabled && !preferences.silenceAll && (
                        <Grid templateColumns="1fr 1fr" gap={4} pl={4}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Email notifications</Text>
                            <Switch.Root 
                              size="sm"
                              checked={categoryPrefs.email}
                              onCheckedChange={(details) => updateCategoryPreference(category, 'email', details.checked)}
                            >
                              <Switch.Control>
                                <Switch.Thumb />
                              </Switch.Control>
                            </Switch.Root>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Push notifications</Text>
                            <Switch.Root 
                              size="sm"
                              checked={categoryPrefs.push}
                              onCheckedChange={(details) => updateCategoryPreference(category, 'push', details.checked)}
                            >
                              <Switch.Control>
                                <Switch.Thumb />
                              </Switch.Control>
                            </Switch.Root>
                          </HStack>
                        </Grid>
                      )}
                    </VStack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </VStack>

          {/* Frequency Settings */}
          <VStack gap={4} align="stretch">
            <Heading size="sm">Notification Frequency</Heading>
            <Card.Root variant="outline">
              <Card.Body p={4}>
                <VStack gap={3} align="stretch">
                  <Text fontWeight="semibold">Delivery Schedule</Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                    {['instant', 'daily', 'weekly'].map((freq) => (
                      <Button
                        key={freq}
                        size="sm"
                        variant={preferences.frequency === freq ? 'solid' : 'outline'}
                        colorScheme={preferences.frequency === freq ? 'blue' : 'gray'}
                        onClick={() => onPreferencesChange({
                          ...preferences,
                          frequency: freq as 'instant' | 'daily' | 'weekly'
                        })}
                        disabled={preferences.silenceAll}
                      >
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </Button>
                    ))}
                  </Grid>
                  <Text fontSize="xs" color="gray.500">
                    {preferences.frequency === 'instant' && 'Receive notifications immediately'}
                    {preferences.frequency === 'daily' && 'Receive a daily summary at 9 AM'}
                    {preferences.frequency === 'weekly' && 'Receive a weekly summary on Mondays'}
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const NotificationsPage = () => {
  const [isProvider, setIsProvider] = useState(false);
  const [notifications, setNotifications] = useState(isProvider ? mockProviderNotifications : mockRequesterNotifications);
  const [preferences, setPreferences] = useState(isProvider ? defaultProviderPreferences : defaultRequesterPreferences);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  // Update notifications and preferences when role changes
  const handleRoleSwitch = (checked: boolean) => {
    setIsProvider(checked);
    setNotifications(checked ? mockProviderNotifications : mockRequesterNotifications);
    setPreferences(checked ? defaultProviderPreferences : defaultRequesterPreferences);
    setActiveTab('all');
  };

  // Tab configuration based on user type
  const requesterTabs = [
    { id: 'all', label: 'All', icon: FiBell, count: notifications.length },
    { id: 'project_status', label: 'Project Status', icon: FiTarget, count: notifications.filter(n => n.category === 'project_status').length },
    { id: 'milestone_approvals', label: 'Milestone Approvals', icon: FiCheckCircle, count: notifications.filter(n => n.category === 'milestone_approvals').length },
    { id: 'payments_finance', label: 'Payments & Escrow', icon: FiDollarSign, count: notifications.filter(n => n.category === 'payments_finance').length },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare, count: notifications.filter(n => n.category === 'messages').length },
    { id: 'referrals', label: 'Referrals & Rewards', icon: FiGift, count: notifications.filter(n => n.category === 'referrals').length },
    { id: 'system_admin', label: 'System Announcements', icon: FiSettings, count: notifications.filter(n => n.category === 'system_admin').length },
    { id: 'security', label: 'Security / KYC / Account', icon: FiShield, count: notifications.filter(n => n.category === 'security').length },
  ];

  const providerTabs = [
    { id: 'all', label: 'All', icon: FiBell, count: notifications.length },
    { id: 'project_updates', label: 'Project Updates', icon: FiTarget, count: notifications.filter(n => n.category === 'project_updates').length },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare, count: notifications.filter(n => n.category === 'messages').length },
    { id: 'milestones', label: 'Milestones', icon: FiCheckCircle, count: notifications.filter(n => n.category === 'milestones').length },
    { id: 'payments_finance', label: 'Payments & Finance', icon: FiDollarSign, count: notifications.filter(n => n.category === 'payments_finance').length },
    { id: 'gamification_rewards', label: 'Gamification & Rewards', icon: FiAward, count: notifications.filter(n => n.category === 'gamification_rewards').length },
    { id: 'platform_alerts', label: 'Platform Alerts', icon: FiTrendingUp, count: notifications.filter(n => n.category === 'platform_alerts').length },
    { id: 'system_admin', label: 'System / Admin Notices', icon: FiSettings, count: notifications.filter(n => n.category === 'system_admin').length },
  ];

  const tabs = isProvider ? providerTabs : requesterTabs;

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || notification.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.providerName && notification.providerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (notification.clientName && notification.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  // Notification actions
  const handleMarkRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    ));
  };

  const handleArchive = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // New Service Requester specific actions
  const handleSilence = (id: number, jobId?: string) => {
    // Remove notification and potentially silence future notifications for this job
    setNotifications(notifications.filter(n => n.id !== id));
    // In a real app, you would also send this to the backend to silence future notifications
    console.log(`Silenced notifications for job: ${jobId}`);
  };

  const handleFollow = (id: number, providerName?: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isFollowing: !n.isFollowing } : n
    ));
    console.log(`${notifications.find(n => n.id === id)?.isFollowing ? 'Unfollowed' : 'Followed'} thread for provider: ${providerName}`);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length;

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack gap={3} mb={4} justify="space-between">
            <HStack gap={3}>
              <Box p={2} bg="blue.100" borderRadius="lg">
                <FiBell size={24} color="#3182ce" />
              </Box>
              <VStack align="start" gap={0}>
                <HStack gap={3}>
                  <Heading>Notifications</Heading>
                  <Badge colorScheme={isProvider ? "purple" : "blue"} variant="outline">
                    {isProvider ? "Provider" : "Requester"} View
                  </Badge>
                </HStack>
                <HStack gap={4}>
                  <Text fontSize="sm" color="gray.600">
                    {unreadCount} unread
                  </Text>
                  {highPriorityCount > 0 && (
                    <Badge colorScheme="red" variant="solid">
                      {highPriorityCount} urgent
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </HStack>
            
            <HStack gap={2}>
              {/* Role Switch */}
              <HStack gap={3} mr={4}>
                <Text fontSize="sm" color="gray.600">Requester</Text>
                <Switch.Root checked={isProvider} onCheckedChange={(details) => handleRoleSwitch(details.checked)}>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Root>
                <Text fontSize="sm" color="gray.600">Provider</Text>
              </HStack>
              
              <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <FiCheckCircle />
                Mark All Read
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowPreferences(!showPreferences)}
              >
                <FiSettings />
                Settings
              </Button>
            </HStack>
          </HStack>
          
          <Text color="gray.600">
            {isProvider 
              ? "Stay updated on project invitations, milestone approvals, payments, achievements, and platform activities"
              : "Stay updated on project milestones, payments, messages, and important account activities"
            }
          </Text>
        </Box>

        {/* Search */}
        <Card.Root p={4}>
          <Card.Body>
            <HStack gap={4}>
              <Box position="relative" flex={1}>
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
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              <Button variant="outline">
                <FiFilter />
                Filter
              </Button>
            </HStack>
          </Card.Body>
        </Card.Root>

        {/* Main Content */}
        <Grid templateColumns={{ base: '1fr', lg: showPreferences ? '2fr 1fr' : '1fr' }} gap={8}>
          {/* Notifications Feed */}
          <VStack gap={6} align="stretch">
            {/* Category Tabs */}
            <Tabs.Root value={activeTab} onValueChange={(details) => setActiveTab(details.value)}>
              <Flex wrap="wrap" gap={2}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <Tabs.Trigger key={tab.id} value={tab.id}>
                      <HStack gap={2}>
                        <Icon size={16} />
                        <Text>{tab.label}</Text>
                        {tab.count > 0 && (
                          <Badge 
                            size="sm" 
                            colorScheme={activeTab === tab.id ? 'blue' : 'gray'}
                            variant={activeTab === tab.id ? 'solid' : 'outline'}
                          >
                            {tab.count}
                          </Badge>
                        )}
                      </HStack>
                    </Tabs.Trigger>
                  );
                })}
              </Flex>

              {/* Notifications Feed */}
              <Box mt={6}>
                {filteredNotifications.length > 0 ? (
                  <VStack gap={4} align="stretch">
                    {filteredNotifications.map(notification => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkRead={handleMarkRead}
                        onArchive={handleArchive}
                        onDelete={handleDelete}
                        onSilence={!isProvider ? handleSilence : undefined}
                        onFollow={!isProvider ? handleFollow : undefined}
                      />
                    ))}
                  </VStack>
                ) : (
                  <Card.Root p={8} textAlign="center">
                    <Card.Body>
                      <VStack gap={4}>
                        <Box p={4} bg="gray.100" borderRadius="full">
                          <FiBell size={32} color="#9CA3AF" />
                        </Box>
                        <VStack gap={2}>
                          <Heading size="md" color="gray.600">No notifications found</Heading>
                          <Text color="gray.500">
                            {searchTerm ? 'Try adjusting your search terms' : 'All caught up! Check back later for updates.'}
                          </Text>
                        </VStack>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                )}
              </Box>
            </Tabs.Root>
          </VStack>

          {/* Preferences Panel */}
          {showPreferences && (
            <PreferencesPanel
              preferences={preferences}
              onPreferencesChange={setPreferences}
              isProvider={isProvider}
            />
          )}
        </Grid>
      </VStack>
    </Container>
  );
};

export default NotificationsPage;
