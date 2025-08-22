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
  Textarea,
} from '@chakra-ui/react';
import {
  FiSettings,
  FiUser,
  FiMail,
  FiGlobe,
  FiBell,
  FiShield,
  FiHelpCircle,
  FiEye,
  FiEyeOff,
  FiEdit,
  FiSave,
  FiRefreshCw,
  FiMessageSquare,
  FiFlag,
  FiClock,
  FiMapPin,
  FiSmartphone,
  FiMonitor,
  FiBookOpen,
  FiLifeBuoy,
  FiExternalLink,
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

// Custom Toggle Switch Component
const ToggleSwitch = ({ isChecked, onChange, ...props }: any) => (
  <Box
    as="button"
    w="48px"
    h="24px"
    borderRadius="full"
    bg={isChecked ? "blue.500" : "gray.300"}
    position="relative"
    transition="all 0.2s"
    onClick={onChange}
    {...props}
  >
    <Box
      w="20px"
      h="20px"
      borderRadius="full"
      bg="white"
      position="absolute"
      top="2px"
      left={isChecked ? "26px" : "2px"}
      transition="all 0.2s"
      shadow="sm"
    />
  </Box>
);

// Custom Form Components
const FormLabel = ({ children, ...props }: any) => (
  <Text fontSize="sm" fontWeight="medium" mb={2} {...props}>
    {children}
  </Text>
);

const FormHelperText = ({ children, ...props }: any) => (
  <Text fontSize="xs" color="gray.600" mt={1} {...props}>
    {children}
  </Text>
);

// Interfaces
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  timezone: string;
  language: string;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Michael',
    lastName: 'Marvellous',
    email: 'michael.marvellous@example.com',
    phone: '+234-801-234-5678',
    bio: 'Experienced full-stack developer specializing in React, Node.js, and cloud solutions.',
    location: 'Lagos, Nigeria',
    timezone: 'Africa/Lagos',
    language: 'English',
  });

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState({
    systemUpdates: true,
    projectUpdates: true,
    paymentAlerts: true,
    messageAlerts: true,
    marketingEmails: false,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    urgentAlerts: true,
    paymentConfirmations: true,
    securityAlerts: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    systemNotifications: true,
    projectDeadlines: true,
    newMessages: true,
    paymentUpdates: true,
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    searchVisibility: true,
    anonymousHiring: false,
    showOnlineStatus: true,
    allowDirectMessages: true,
    showEmail: false,
    showPhone: false,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile saved:', userProfile);
  };

  const renderAccountSettings = () => (
    <VStack gap={6} align="stretch">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">Profile Information</Heading>
            <Button 
              size="sm" 
              colorScheme={isEditing ? "green" : "blue"}
              onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            >
              {isEditing ? <FiSave style={{ marginRight: '8px' }} size={14} /> : <FiEdit style={{ marginRight: '8px' }} size={14} />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Change email, password, profile data
          </Text>
          
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <Box>
              <FormLabel>First Name</FormLabel>
              <Input
                value={userProfile.firstName}
                readOnly={!isEditing}
                onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </Box>

            <Box>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={userProfile.lastName}
                readOnly={!isEditing}
                onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </Box>

            <Box>
              <FormLabel>Email Address</FormLabel>
              <HStack>
                <Input
                  value={userProfile.email}
                  readOnly={!isEditing}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                />
                <Button size="sm" variant="outline" disabled={!isEditing}>
                  Verify
                </Button>
              </HStack>
            </Box>

            <Box>
              <FormLabel>Phone Number</FormLabel>
              <HStack>
                <Input
                  value={userProfile.phone}
                  readOnly={!isEditing}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Button size="sm" variant="outline" disabled={!isEditing}>
                  Verify
                </Button>
              </HStack>
            </Box>
          </Grid>

          <Box mt={4}>
            <FormLabel>Bio</FormLabel>
            <Textarea
              value={userProfile.bio}
              readOnly={!isEditing}
              onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={4}
            />
            <FormHelperText>Brief description of your skills and experience</FormHelperText>
          </Box>

          <Box mt={4}>
            <FormLabel>Location</FormLabel>
            <HStack>
              <FiMapPin color="#9ca3af" />
              <Input
                value={userProfile.location}
                readOnly={!isEditing}
                onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
              />
            </HStack>
          </Box>
        </CardBody>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <Heading size="md">Security & Password</Heading>
        </CardHeader>
        <CardBody>
          <VStack gap={4} align="stretch">
            <Box>
              <FormLabel>Current Password</FormLabel>
              <HStack>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </Button>
              </HStack>
            </Box>

            <Box>
              <FormLabel>New Password</FormLabel>
              <Input type="password" placeholder="Enter new password" />
            </Box>

            <Box>
              <FormLabel>Confirm New Password</FormLabel>
              <Input type="password" placeholder="Confirm new password" />
            </Box>

            <HStack justify="space-between" mt={4}>
              <Button colorScheme="blue">Update Password</Button>
              <Button variant="outline">
                <FiRefreshCw style={{ marginRight: '8px' }} size={14} />
                Reset Password
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderLanguageSettings = () => (
    <VStack gap={6} align="stretch">
      <Card>
        <CardHeader>
          <Heading size="md">Language & Region Preferences</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Language preferences, time zone settings
          </Text>
          
          <VStack gap={4} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Display Language</Text>
                <Text fontSize="xs" color="gray.600">Interface language: English</Text>
              </VStack>
              <Badge colorScheme="blue" px={3} py={1}>Active</Badge>
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">
                  <FiClock style={{ display: 'inline', marginRight: '8px' }} size={14} />
                  Time Zone
                </Text>
                <Text fontSize="xs" color="gray.600">West Africa Time (WAT)</Text>
              </VStack>
              <Badge colorScheme="green" px={3} py={1}>Set</Badge>
            </HStack>

            <Box h="1px" bg="gray.200" my={4} />

            <Text fontWeight="medium">Regional Settings</Text>
            
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm">Date Format</Text>
                <Text fontSize="xs" color="gray.600">DD/MM/YYYY</Text>
              </VStack>
              <Button size="sm" variant="outline">Change</Button>
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm">Currency Display</Text>
                <Text fontSize="xs" color="gray.600">₦ NGN (Nigerian Naira)</Text>
              </VStack>
              <Button size="sm" variant="outline">Change</Button>
            </HStack>

            <Button colorScheme="blue" mt={4}>
              Save Language Settings
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderNotificationSettings = () => (
    <VStack gap={6} align="stretch">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiMail color="#3182ce" />
            <Heading size="md">Email Notifications</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Email, SMS, Push notification preferences
          </Text>
          
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">System Updates</Text>
                <Text fontSize="xs" color="gray.600">Platform changes, maintenance alerts</Text>
              </VStack>
              <ToggleSwitch
                isChecked={emailNotifications.systemUpdates}
                onChange={() => setEmailNotifications(prev => ({ ...prev, systemUpdates: !prev.systemUpdates }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Project Updates</Text>
                <Text fontSize="xs" color="gray.600">Milestone progress, deadline reminders</Text>
              </VStack>
              <ToggleSwitch
                isChecked={emailNotifications.projectUpdates}
                onChange={() => setEmailNotifications(prev => ({ ...prev, projectUpdates: !prev.projectUpdates }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Payment Alerts</Text>
                <Text fontSize="xs" color="gray.600">Payouts, escrow funding, invoices</Text>
              </VStack>
              <ToggleSwitch
                isChecked={emailNotifications.paymentAlerts}
                onChange={() => setEmailNotifications(prev => ({ ...prev, paymentAlerts: !prev.paymentAlerts }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Message Alerts</Text>
                <Text fontSize="xs" color="gray.600">New messages from clients/providers</Text>
              </VStack>
              <ToggleSwitch
                isChecked={emailNotifications.messageAlerts}
                onChange={() => setEmailNotifications(prev => ({ ...prev, messageAlerts: !prev.messageAlerts }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Marketing Emails</Text>
                <Text fontSize="xs" color="gray.600">Tips, feature updates, newsletters</Text>
              </VStack>
              <ToggleSwitch
                isChecked={emailNotifications.marketingEmails}
                onChange={() => setEmailNotifications(prev => ({ ...prev, marketingEmails: !prev.marketingEmails }))}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiSmartphone color="#38a169" />
            <Heading size="md">SMS Notifications</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 SMS alerts sent to {userProfile.phone}
          </Text>
          
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Urgent Alerts</Text>
                <Text fontSize="xs" color="gray.600">Critical system issues, security alerts</Text>
              </VStack>
              <ToggleSwitch
                isChecked={smsNotifications.urgentAlerts}
                onChange={() => setSmsNotifications(prev => ({ ...prev, urgentAlerts: !prev.urgentAlerts }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Payment Confirmations</Text>
                <Text fontSize="xs" color="gray.600">Payment received, withdrawal processed</Text>
              </VStack>
              <ToggleSwitch
                isChecked={smsNotifications.paymentConfirmations}
                onChange={() => setSmsNotifications(prev => ({ ...prev, paymentConfirmations: !prev.paymentConfirmations }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Security Alerts</Text>
                <Text fontSize="xs" color="gray.600">Login attempts, password changes</Text>
              </VStack>
              <ToggleSwitch
                isChecked={smsNotifications.securityAlerts}
                onChange={() => setSmsNotifications(prev => ({ ...prev, securityAlerts: !prev.securityAlerts }))}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiMonitor color="#805ad5" />
            <Heading size="md">Push Notifications</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Browser and mobile app notifications
          </Text>
          
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">System Notifications</Text>
                <Text fontSize="xs" color="gray.600">Platform updates, maintenance</Text>
              </VStack>
              <ToggleSwitch
                isChecked={pushNotifications.systemNotifications}
                onChange={() => setPushNotifications(prev => ({ ...prev, systemNotifications: !prev.systemNotifications }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Project Deadlines</Text>
                <Text fontSize="xs" color="gray.600">Milestone reminders, due dates</Text>
              </VStack>
              <ToggleSwitch
                isChecked={pushNotifications.projectDeadlines}
                onChange={() => setPushNotifications(prev => ({ ...prev, projectDeadlines: !prev.projectDeadlines }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">New Messages</Text>
                <Text fontSize="xs" color="gray.600">Chat messages, project communications</Text>
              </VStack>
              <ToggleSwitch
                isChecked={pushNotifications.newMessages}
                onChange={() => setPushNotifications(prev => ({ ...prev, newMessages: !prev.newMessages }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Payment Updates</Text>
                <Text fontSize="xs" color="gray.600">Escrow funding, payout alerts</Text>
              </VStack>
              <ToggleSwitch
                isChecked={pushNotifications.paymentUpdates}
                onChange={() => setPushNotifications(prev => ({ ...prev, paymentUpdates: !prev.paymentUpdates }))}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderPrivacySettings = () => (
    <VStack gap={6} align="stretch">
      <Card>
        <CardHeader>
          <Heading size="md">Privacy & Visibility Settings</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Anonymous hiring (Requesters) • Search visibility (Providers)
          </Text>
          
          <VStack gap={4} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Search Visibility (Providers)</Text>
                <Text fontSize="xs" color="gray.600">🔹 Allow clients to find you in search results</Text>
              </VStack>
              <ToggleSwitch
                isChecked={privacySettings.searchVisibility}
                onChange={() => setPrivacySettings(prev => ({ ...prev, searchVisibility: !prev.searchVisibility }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Anonymous Hiring (Requesters)</Text>
                <Text fontSize="xs" color="gray.600">🔹 Hide your identity when posting jobs</Text>
              </VStack>
              <ToggleSwitch
                isChecked={privacySettings.anonymousHiring}
                onChange={() => setPrivacySettings(prev => ({ ...prev, anonymousHiring: !prev.anonymousHiring }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Show Online Status</Text>
                <Text fontSize="xs" color="gray.600">Let others see when you're active</Text>
              </VStack>
              <ToggleSwitch
                isChecked={privacySettings.showOnlineStatus}
                onChange={() => setPrivacySettings(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Allow Direct Messages</Text>
                <Text fontSize="xs" color="gray.600">Others can message you directly</Text>
              </VStack>
              <ToggleSwitch
                isChecked={privacySettings.allowDirectMessages}
                onChange={() => setPrivacySettings(prev => ({ ...prev, allowDirectMessages: !prev.allowDirectMessages }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Show Email Address</Text>
                <Text fontSize="xs" color="gray.600">Display email on your public profile</Text>
              </VStack>
              <ToggleSwitch
                isChecked={privacySettings.showEmail}
                onChange={() => setPrivacySettings(prev => ({ ...prev, showEmail: !prev.showEmail }))}
              />
            </HStack>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Show Phone Number</Text>
                <Text fontSize="xs" color="gray.600">Display phone on your public profile</Text>
              </VStack>
              <ToggleSwitch
                isChecked={privacySettings.showPhone}
                onChange={() => setPrivacySettings(prev => ({ ...prev, showPhone: !prev.showPhone }))}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderSupportSettings = () => (
    <VStack gap={6} align="stretch">
      {/* FAQs */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiBookOpen color="#3182ce" />
            <Heading size="md">Frequently Asked Questions</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 FAQs, contact support, dispute resolution
          </Text>
          
          <VStack gap={3} align="stretch">
            <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md" _hover={{ bg: "gray.100" }}>
              <Text fontSize="sm" fontWeight="medium">How do I withdraw my earnings?</Text>
              <FiExternalLink color="#3182ce" />
            </HStack>

            <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md" _hover={{ bg: "gray.100" }}>
              <Text fontSize="sm" fontWeight="medium">What are the platform fees?</Text>
              <FiExternalLink color="#3182ce" />
            </HStack>

            <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md" _hover={{ bg: "gray.100" }}>
              <Text fontSize="sm" fontWeight="medium">How does the escrow system work?</Text>
              <FiExternalLink color="#3182ce" />
            </HStack>

            <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md" _hover={{ bg: "gray.100" }}>
              <Text fontSize="sm" fontWeight="medium">How to verify my account?</Text>
              <FiExternalLink color="#3182ce" />
            </HStack>
          </VStack>

          <Button colorScheme="blue" mt={4} w="full">
            <FiBookOpen style={{ marginRight: '8px' }} size={16} />
            View All FAQs
          </Button>
        </CardBody>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiLifeBuoy color="#38a169" />
            <Heading size="md">Contact Support</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Get help from our support team
          </Text>
          
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <Card bg="blue.50" borderColor="blue.200">
              <CardBody textAlign="center">
                <FiMessageSquare size={24} color="#3182ce" style={{ margin: '0 auto 8px' }} />
                <Text fontWeight="medium" mb={2}>Live Chat</Text>
                <Text fontSize="sm" color="gray.600" mb={3}>
                  Chat with our support team in real-time
                </Text>
                <Button size="sm" colorScheme="blue">Start Chat</Button>
              </CardBody>
            </Card>

            <Card bg="green.50" borderColor="green.200">
              <CardBody textAlign="center">
                <FiMail size={24} color="#38a169" style={{ margin: '0 auto 8px' }} />
                <Text fontWeight="medium" mb={2}>Email Support</Text>
                <Text fontSize="sm" color="gray.600" mb={3}>
                  Send us an email and we'll respond within 24h
                </Text>
                <Button size="sm" colorScheme="green">Send Email</Button>
              </CardBody>
            </Card>
          </Grid>

          <Box mt={4}>
            <FormLabel>Describe your issue</FormLabel>
            <Textarea
              placeholder="Please describe your issue in detail..."
              rows={4}
            />
          </Box>

          <Button colorScheme="blue" mt={4} w="full">Submit Ticket</Button>
        </CardBody>
      </Card>

      {/* Dispute Resolution */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiFlag color="#e53e3e" />
            <Heading size="md">Dispute Resolution</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            🔹 Resolve conflicts with clients or service providers
          </Text>
          
          <VStack gap={3} align="stretch">
            <Box p={4} bg="yellow.50" borderRadius="md" border="1px" borderColor="yellow.200">
              <HStack gap={2} mb={2}>
                <FiFlag color="#d69e2e" />
                <Text fontSize="sm" fontWeight="medium">How Dispute Resolution Works</Text>
              </HStack>
              <Text fontSize="xs" color="gray.600" lineHeight="1.5">
                Our mediation team reviews disputes impartially. We'll help both parties reach 
                a fair resolution while protecting funds in escrow.
              </Text>
            </Box>

            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">Active Disputes</Text>
                <Text fontSize="xs" color="gray.600">No active disputes</Text>
              </VStack>
              <Badge colorScheme="green">All Clear</Badge>
            </HStack>

            <Button colorScheme="red" variant="outline">
              File a Dispute
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <HStack gap={2}>
            <FiMonitor color="#805ad5" />
            <Heading size="md">System Status</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack gap={3} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm">Platform Status</Text>
              <Badge colorScheme="green">All Systems Operational</Badge>
            </HStack>

            <HStack justify="space-between">
              <Text fontSize="sm">Payment Processing</Text>
              <Badge colorScheme="green">Normal</Badge>
            </HStack>

            <HStack justify="space-between">
              <Text fontSize="sm">Message Delivery</Text>
              <Badge colorScheme="green">Normal</Badge>
            </HStack>

            <Button variant="outline" size="sm">
              <FiExternalLink style={{ marginRight: '8px' }} size={12} />
              View Status Page
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack gap={3} mb={2}>
            <FiSettings size={32} color="#3182ce" />
            <Heading size="xl">Settings</Heading>
            <Badge colorScheme="blue" px={2} py={1} fontSize="sm">
              Account Management
            </Badge>
          </HStack>
          <Text color="gray.600" fontSize="lg">
            Manage general preferences and account-wide configurations.
          </Text>
        </Box>

        {/* Settings Overview Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={4}>
          <Card bg="blue.50" borderColor="blue.200">
            <CardBody textAlign="center">
              <FiUser size={20} color="#3182ce" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="sm" fontWeight="medium" color="blue.700">Account</Text>
              <Text fontSize="xs" color="gray.600">Profile & Security</Text>
            </CardBody>
          </Card>

          <Card bg="green.50" borderColor="green.200">
            <CardBody textAlign="center">
              <FiGlobe size={20} color="#38a169" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="sm" fontWeight="medium" color="green.700">Language</Text>
              <Text fontSize="xs" color="gray.600">Region & Time</Text>
            </CardBody>
          </Card>

          <Card bg="purple.50" borderColor="purple.200">
            <CardBody textAlign="center">
              <FiBell size={20} color="#805ad5" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="sm" fontWeight="medium" color="purple.700">Notifications</Text>
              <Text fontSize="xs" color="gray.600">Email, SMS, Push</Text>
            </CardBody>
          </Card>

          <Card bg="orange.50" borderColor="orange.200">
            <CardBody textAlign="center">
              <FiShield size={20} color="#dd6b20" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="sm" fontWeight="medium" color="orange.700">Privacy</Text>
              <Text fontSize="xs" color="gray.600">Visibility & Safety</Text>
            </CardBody>
          </Card>

          <Card bg="cyan.50" borderColor="cyan.200">
            <CardBody textAlign="center">
              <FiHelpCircle size={20} color="#0891b2" style={{ margin: '0 auto 8px' }} />
              <Text fontSize="sm" fontWeight="medium" color="cyan.700">Support</Text>
              <Text fontSize="xs" color="gray.600">Help & FAQs</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Settings Navigation */}
        <Card>
          <CardHeader>
            <HStack gap={2} flexWrap="wrap">
              <Button
                size="sm"
                variant={activeSection === 'account' ? "solid" : "ghost"}
                colorScheme={activeSection === 'account' ? "blue" : "gray"}
                onClick={() => setActiveSection('account')}
              >
                <FiUser style={{ marginRight: '8px' }} size={16} />
                Account Settings
              </Button>
              <Button
                size="sm"
                variant={activeSection === 'language' ? "solid" : "ghost"}
                colorScheme={activeSection === 'language' ? "blue" : "gray"}
                onClick={() => setActiveSection('language')}
              >
                <FiGlobe style={{ marginRight: '8px' }} size={16} />
                Language & Region
              </Button>
              <Button
                size="sm"
                variant={activeSection === 'notifications' ? "solid" : "ghost"}
                colorScheme={activeSection === 'notifications' ? "blue" : "gray"}
                onClick={() => setActiveSection('notifications')}
              >
                <FiBell style={{ marginRight: '8px' }} size={16} />
                Notifications
              </Button>
              <Button
                size="sm"
                variant={activeSection === 'privacy' ? "solid" : "ghost"}
                colorScheme={activeSection === 'privacy' ? "blue" : "gray"}
                onClick={() => setActiveSection('privacy')}
              >
                <FiShield style={{ marginRight: '8px' }} size={16} />
                Privacy & Visibility
              </Button>
              <Button
                size="sm"
                variant={activeSection === 'support' ? "solid" : "ghost"}
                colorScheme={activeSection === 'support' ? "blue" : "gray"}
                onClick={() => setActiveSection('support')}
              >
                <FiHelpCircle style={{ marginRight: '8px' }} size={16} />
                Support & Help
              </Button>
            </HStack>
          </CardHeader>
        </Card>

        {/* Settings Content */}
        <Box>
          {activeSection === 'account' && renderAccountSettings()}
          {activeSection === 'language' && renderLanguageSettings()}
          {activeSection === 'notifications' && renderNotificationSettings()}
          {activeSection === 'privacy' && renderPrivacySettings()}
          {activeSection === 'support' && renderSupportSettings()}
        </Box>
      </VStack>
    </Container>
  );
}
