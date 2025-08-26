'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Grid,
  Card,
  Tabs,
  Heading,
  Table,
  Switch,
  IconButton,
  SimpleGrid
} from '@chakra-ui/react';
import {
  FiDollarSign,
  FiTrendingUp,
  FiDownload,
  FiPlus,
  FiEye,
  FiRefreshCw,
  FiSettings,
  FiStar,
  FiClock,
  FiShield,
  FiBarChart,
  FiGift,
  FiAward,
  FiArrowUpRight,
  FiInfo,
  FiEdit,
  FiMessageSquare,
  FiAlertTriangle
} from 'react-icons/fi';
import { useUserRoleSafe } from '@/contexts/UserRoleContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Mock data for Service Requester
const mockRequesterData = {
  walletBalance: {
    NGN: 125450.75,
    USD: 350.25
  },
  plugPoints: 2847,
  transactionHistory: [
    {
      id: '1',
      date: '2024-12-20',
      description: 'Milestone Payment',
      serviceTitle: 'E-commerce Website Development',
      amount: -2500,
      status: 'Paid',
      type: 'escrow'
    },
    {
      id: '2',
      date: '2024-12-18',
      description: 'Wallet Top-up',
      serviceTitle: 'Bank Transfer',
      amount: 5000,
      status: 'Completed',
      type: 'deposit'
    },
    {
      id: '3',
      date: '2024-12-15',
      description: 'Refund Processed',
      serviceTitle: 'Logo Design Project',
      amount: 800,
      status: 'Refunded',
      type: 'refund'
    }
  ],
  upcomingPayments: [
    {
      id: '1',
      milestone: 'Final Delivery',
      project: 'Mobile App Development',
      amount: 3500,
      dueDate: '2024-12-25',
      status: 'Pending'
    },
    {
      id: '2',
      milestone: 'UI Design Complete',
      project: 'Brand Website',
      amount: 1200,
      dueDate: '2024-12-28',
      status: 'Due'
    }
  ],
  refundRequests: [
    {
      id: '1',
      project: 'Social Media Graphics',
      reason: 'Quality not met',
      amount: 450,
      status: 'In Review',
      date: '2024-12-19'
    }
  ],
  linkedAccounts: [
    { type: 'Bank Account', name: 'First Bank ****1234', primary: true },
    { type: 'Card', name: 'Visa ****5678', primary: false }
  ]
};

// Mock data for Service Provider
const mockProviderData = {
  walletBalance: {
    available: 8750.50,
    inEscrow: 4200.00,
    pendingPayout: 1250.75,
    NGN: 3245600.25,
    USD: 8750.50
  },
  plugPoints: 5642,
  earningsOverview: {
    totalEarned: 127500,
    weeklyEarnings: [2100, 2800, 3200, 2650, 3100, 2900, 3400],
    monthlyGrowth: 15.6
  },
  payoutRequests: [
    {
      id: '1',
      amount: 2500,
      date: '2024-12-20',
      status: 'Pending',
      method: 'Bank Transfer'
    },
    {
      id: '2',
      amount: 5000,
      date: '2024-12-15',
      status: 'Completed',
      method: 'Bank Transfer'
    }
  ],
  milestonePayments: [
    {
      id: '1',
      project: 'E-commerce Platform',
      milestone: 'Backend Development',
      amount: 2500,
      status: 'Confirmed',
      deliveryDate: '2024-12-22'
    },
    {
      id: '2',
      project: 'Mobile App UI',
      milestone: 'Design System',
      amount: 1800,
      status: 'Awaiting Confirmation',
      deliveryDate: '2024-12-25'
    }
  ],
  escrowContracts: [
    {
      id: '1',
      project: 'Website Redesign',
      amount: 3500,
      releaseDate: '2024-12-28',
      provider: 'Sarah Johnson'
    }
  ]
};

// Service Requester Components
const RequesterFinancialHub: React.FC = () => {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [activeTab, setActiveTab] = useState(0);
  const [transactionFilter, setTransactionFilter] = useState('all');

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === 'all') return mockRequesterData.transactionHistory;
    return mockRequesterData.transactionHistory.filter(t => t.type === transactionFilter);
  }, [transactionFilter]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'refunded': return 'blue';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={6} maxW="100%" mx="auto">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" gap={1}>
          <Heading size="lg">Ingenious Pay - Financial Hub</Heading>
          <Text color="gray.600">Manage your wallet, payments, and financial activities</Text>
        </VStack>

        <HStack gap={3}>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as 'NGN' | 'USD')}
            style={{
              padding: '8px 12px',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              backgroundColor: 'white',
              width: '100px'
            }}
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
          <Button colorScheme="blue">
            <HStack gap={2}>
              <FiPlus size={16} />
              <Text>Add Funds</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Wallet Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={6}>
        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.600">Wallet Balance</Text>
                <Box title="All payments are securely processed through Ingenious Pay" cursor="help">
                  <IconButton size="xs" variant="ghost">
                    <FiInfo size={12} />
                  </IconButton>
                </Box>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {currency === 'NGN' ? '₦' : '$'}{mockRequesterData.walletBalance[currency].toLocaleString()}
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <Text fontSize="sm" color="gray.600">Plug Points Available</Text>
              <HStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                  {mockRequesterData.plugPoints.toLocaleString()}
                </Text>
                <Badge colorScheme="purple" size="sm">Redeemable</Badge>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <Text fontSize="sm" color="gray.600">Active Escrow</Text>
              <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                ${mockRequesterData.upcomingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <Text fontSize="sm" color="gray.600">Linked Accounts</Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                {mockRequesterData.linkedAccounts.length}
              </Text>
              <Button size="xs" variant="outline" colorScheme="blue">
                <FiSettings size={12} style={{ marginRight: '4px' }} />
                Manage
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs.Root value={activeTab.toString()} onValueChange={(details) => setActiveTab(parseInt(details.value))}>
        <Tabs.List mb={6}>
          <Tabs.Trigger value="0">Transaction History</Tabs.Trigger>
          <Tabs.Trigger value="1">Upcoming Payments</Tabs.Trigger>
          <Tabs.Trigger value="2">Refund Requests</Tabs.Trigger>
          <Tabs.Trigger value="3">Plug Points</Tabs.Trigger>
          <Tabs.Trigger value="4">Settings</Tabs.Trigger>
        </Tabs.List>

        {/* Transaction History Tab */}
        <Tabs.Content value="0">
          <Card.Root>
            <Card.Header>
              <HStack justify="space-between">
                <Heading size="md">Transaction History</Heading>
                <HStack gap={2}>
                  <select 
                    value={transactionFilter} 
                    onChange={(e) => setTransactionFilter(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      width: '150px'
                    }}
                  >
                    <option value="all">All</option>
                    <option value="escrow">Escrow</option>
                    <option value="deposit">Paid</option>
                    <option value="refund">Refunded</option>
                  </select>
                  <Button size="sm" variant="outline">
                    <FiDownload size={14} style={{ marginRight: '6px' }} />
                    Export
                  </Button>
                </HStack>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Description</Table.ColumnHeader>
                    <Table.ColumnHeader>Service Title</Table.ColumnHeader>
                    <Table.ColumnHeader>Amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Action</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredTransactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                      <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{transaction.description}</Table.Cell>
                      <Table.Cell>{transaction.serviceTitle}</Table.Cell>
                      <Table.Cell>
                        <Text color={transaction.amount > 0 ? 'green.600' : 'red.600'} fontWeight="medium">
                          ${Math.abs(transaction.amount).toLocaleString()}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge colorScheme={getStatusColor(transaction.status)} variant="solid">
                          {transaction.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Button size="sm" variant="ghost">
                          <FiEye size={14} />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        {/* Upcoming Payments Tab */}
        <Tabs.Content value="1">
          <Card.Root>
            <Card.Header>
              <Heading size="md">Upcoming Payments</Heading>
              <Text fontSize="sm" color="gray.600">Milestones due for payment</Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                {mockRequesterData.upcomingPayments.map((payment) => (
                  <Box key={payment.id} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                    <Flex justify="space-between" align="start">
                      <VStack align="start" gap={2}>
                        <Text fontWeight="medium">{payment.milestone}</Text>
                        <Text fontSize="sm" color="gray.600">{payment.project}</Text>
                        <HStack gap={2}>
                          <Badge colorScheme={payment.status === 'Due' ? 'red' : 'orange'} variant="solid">
                            {payment.status}
                          </Badge>
                          <Text fontSize="sm" color="gray.600">Due: {new Date(payment.dueDate).toLocaleDateString()}</Text>
                        </HStack>
                      </VStack>
                      <VStack align="end" gap={2}>
                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                          ${payment.amount.toLocaleString()}
                        </Text>
                        <Button size="sm" colorScheme="blue">
                          Pay Now
                        </Button>
                        <Box title="Funds go into escrow until delivery" cursor="help">
                          <Text fontSize="xs" color="gray.500">
                            <FiInfo size={10} style={{ display: 'inline', marginRight: '2px' }} />
                            Escrow Protected
                          </Text>
                        </Box>
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        {/* Refund Requests Tab */}
        <Tabs.Content value="2">
          <Card.Root>
            <Card.Header>
              <Heading size="md">Refund Requests</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                {mockRequesterData.refundRequests.map((refund) => (
                  <Box key={refund.id} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                    <Flex justify="space-between" align="start">
                      <VStack align="start" gap={2}>
                        <Text fontWeight="medium">{refund.project}</Text>
                        <Text fontSize="sm" color="gray.600">Reason: {refund.reason}</Text>
                        <Text fontSize="sm" color="gray.500">Submitted: {new Date(refund.date).toLocaleDateString()}</Text>
                      </VStack>
                      <VStack align="end" gap={2}>
                        <Text fontSize="lg" fontWeight="bold" color="blue.600">
                          ${refund.amount.toLocaleString()}
                        </Text>
                        <Badge colorScheme="orange" variant="solid">
                          {refund.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <FiMessageSquare size={14} style={{ marginRight: '6px' }} />
                          View Thread
                        </Button>
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        {/* Plug Points Tab */}
        <Tabs.Content value="3">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6}>
            <Card.Root>
              <Card.Header>
                <Heading size="md">Plug Points Balance</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="center" gap={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                    {mockRequesterData.plugPoints.toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Points Available for Redemption
                  </Text>
                  <Box w="full" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
                    <Box
                      h="full"
                      bg="purple.500"
                      borderRadius="md"
                      width="75%"
                    />
                  </Box>
                  <Text fontSize="xs" color="gray.500">75% to next reward tier</Text>
                  <Button colorScheme="purple">
                    <FiGift style={{ marginRight: '8px' }} />
                    Redeem Points
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Heading size="md">Reward Options</Heading>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  <Box p={3} border="1px solid" borderColor="gray.200" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" fontWeight="medium">Wallet Top-Up</Text>
                        <Text fontSize="xs" color="gray.600">$50 credit</Text>
                      </VStack>
                      <Text fontSize="sm" color="purple.600" fontWeight="medium">5000 pts</Text>
                    </HStack>
                  </Box>
                  <Box p={3} border="1px solid" borderColor="gray.200" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" fontWeight="medium">Gift Card</Text>
                        <Text fontSize="xs" color="gray.600">Amazon $25</Text>
                      </VStack>
                      <Text fontSize="sm" color="purple.600" fontWeight="medium">2500 pts</Text>
                    </HStack>
                  </Box>
                  <Box p={3} border="1px solid" borderColor="gray.200" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" fontWeight="medium">Premium Badge</Text>
                        <Text fontSize="xs" color="gray.600">Profile boost</Text>
                      </VStack>
                      <Text fontSize="sm" color="purple.600" fontWeight="medium">1000 pts</Text>
                    </HStack>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Tabs.Content>

        {/* Settings Tab */}
        <Tabs.Content value="4">
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Card.Root>
              <Card.Header>
                <Heading size="md">Payout Settings</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="start" gap={4}>
                  <Box w="full">
                    <Text fontSize="sm" mb={2}>Default Currency</Text>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as 'NGN' | 'USD')}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        width: '100%'
                      }}
                    >
                      <option value="NGN">Nigerian Naira (NGN)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </Box>
                  <Box w="full">
                    <Text fontSize="sm" mb={2}>Payment Method</Text>
                    <VStack align="start" gap={2}>
                      {mockRequesterData.linkedAccounts.map((account) => (
                        <HStack key={`${account.type}-${account.name}`} justify="space-between" w="full" p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
                          <Text fontSize="sm">{account.name}</Text>
                          <HStack gap={2}>
                            {account.primary && <Badge colorScheme="green" size="sm">Primary</Badge>}
                            <Button size="xs" variant="ghost">
                              <FiEdit size={12} />
                            </Button>
                          </HStack>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                  <Button colorScheme="blue" w="full">
                    <FiPlus style={{ marginRight: '8px' }} />
                    Add Payment Method
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Heading size="md">Security & Notifications</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="start" gap={4}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Email Notifications</Text>
                    <Switch.Root defaultChecked colorPalette="blue">
                      <Switch.HiddenInput />
                      <Switch.Control><Switch.Thumb /></Switch.Control>
                    </Switch.Root>
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">SMS Alerts</Text>
                    <Switch.Root defaultChecked colorPalette="blue">
                      <Switch.HiddenInput />
                      <Switch.Control><Switch.Thumb /></Switch.Control>
                    </Switch.Root>
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Two-Factor Authentication</Text>
                    <Switch.Root colorPalette="green">
                      <Switch.HiddenInput />
                      <Switch.Control><Switch.Thumb /></Switch.Control>
                    </Switch.Root>
                  </HStack>
                  <Button colorScheme="red" variant="outline" w="full">
                    <FiShield style={{ marginRight: '8px' }} />
                    Enable 2FA
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

// Service Provider Components
const ProviderFinancialHub: React.FC = () => {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('USD');
  const [activeTab, setActiveTab] = useState(0);
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': case 'confirmed': return 'green';
      case 'pending': case 'awaiting confirmation': return 'orange';
      case 'failed': case 'in dispute': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={6} maxW="100%" mx="auto">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" gap={1}>
          <Heading size="lg">Ingenious Pay - Provider Hub</Heading>
          <Text color="gray.600">Track your earnings, manage payouts, and monitor financial performance</Text>
        </VStack>

        <HStack gap={3}>
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as 'NGN' | 'USD')}
            style={{
              padding: '8px 12px',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              backgroundColor: 'white',
              width: '100px'
            }}
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
          <Button colorScheme="green">
            <HStack gap={2}>
              <FiArrowUpRight size={16} />
              <Text>Withdraw</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Wallet Overview for Provider */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} mb={6}>
        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.600">Available Balance</Text>
                <FiDollarSign color="green" size={16} />
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {currency === 'NGN' ? '₦' : '$'}{currency === 'NGN' ? 
                  mockProviderData.walletBalance.NGN.toLocaleString() : 
                  mockProviderData.walletBalance.available.toLocaleString()}
              </Text>
              <Text fontSize="xs" color="green.600">Ready for withdrawal</Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.600">In Escrow</Text>
                <FiShield color="orange" size={16} />
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                ${mockProviderData.walletBalance.inEscrow.toLocaleString()}
              </Text>
              <Text fontSize="xs" color="orange.600">Awaiting project completion</Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.600">Pending Payout</Text>
                <FiClock color="blue" size={16} />
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                ${mockProviderData.walletBalance.pendingPayout.toLocaleString()}
              </Text>
              <Text fontSize="xs" color="blue.600">Processing</Text>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body p={4}>
            <VStack align="start" gap={2}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.600">Plug Points</Text>
                <FiAward color="purple" size={16} />
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                {mockProviderData.plugPoints.toLocaleString()}
              </Text>
              <Button size="xs" variant="outline" colorScheme="purple">
                View Rewards
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Earnings Chart */}
      <Card.Root mb={6}>
        <Card.Header>
          <HStack justify="space-between">
            <VStack align="start" gap={1}>
              <Heading size="md">Earnings Overview</Heading>
              <Text fontSize="sm" color="gray.600">Track your financial performance</Text>
            </VStack>
            <HStack gap={2}>
              <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value as 'week' | 'month')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  width: '120px'
                }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <Button size="sm" variant="outline">
                <FiBarChart size={14} style={{ marginRight: '6px' }} />
                View Report
              </Button>
            </HStack>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
            <Box>
              <VStack align="start" gap={4}>
                <Text fontSize="sm" color="gray.600">Weekly Earnings Trend</Text>
                <Box w="full" h="200px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                  <VStack gap={2}>
                    <FiTrendingUp size={32} color="green" />
                    <Text color="gray.600" fontSize="sm">Earnings Chart</Text>
                    <Text color="green.600" fontWeight="bold">+{mockProviderData.earningsOverview.monthlyGrowth}% growth</Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>
            <VStack align="start" gap={4}>
              <Box>
                <Text fontSize="sm" color="gray.600">Total Earned</Text>
                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                  ${mockProviderData.earningsOverview.totalEarned.toLocaleString()}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">Active Milestones</Text>
                <Text fontSize="xl" fontWeight="bold" color="blue.600">
                  {mockProviderData.milestonePayments.length}
                </Text>
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600">This Week</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  ${mockProviderData.earningsOverview.weeklyEarnings.slice(-1)[0]}
                </Text>
              </Box>
            </VStack>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Main Content Tabs for Provider */}
      <Tabs.Root value={activeTab.toString()} onValueChange={(details) => setActiveTab(parseInt(details.value))}>
        <Tabs.List mb={6}>
          <Tabs.Trigger value="0">Payout Requests</Tabs.Trigger>
          <Tabs.Trigger value="1">Milestone Payments</Tabs.Trigger>
          <Tabs.Trigger value="2">Escrow Overview</Tabs.Trigger>
          <Tabs.Trigger value="3">Plug Points</Tabs.Trigger>
          <Tabs.Trigger value="4">Finance Settings</Tabs.Trigger>
        </Tabs.List>

        {/* Payout Requests Tab */}
        <Tabs.Content value="0">
          <Card.Root>
            <Card.Header>
              <HStack justify="space-between">
                <Heading size="md">Payout Requests</Heading>
                <Button colorScheme="green">Request Withdrawal</Button>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Amount</Table.ColumnHeader>
                    <Table.ColumnHeader>Method</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Action</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {mockProviderData.payoutRequests.map((payout) => (
                    <Table.Row key={payout.id}>
                      <Table.Cell>{new Date(payout.date).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <Text fontWeight="medium" color="green.600">
                          ${payout.amount.toLocaleString()}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>{payout.method}</Table.Cell>
                      <Table.Cell>
                        <Badge colorScheme={getStatusColor(payout.status)} variant="solid">
                          {payout.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap={2}>
                          <Button size="sm" variant="ghost">
                            <FiEye size={14} />
                          </Button>
                          {payout.status === 'Completed' && (
                            <Button size="sm" variant="ghost">
                              <FiDownload size={14} />
                            </Button>
                          )}
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        {/* Milestone Payments Tab */}
        <Tabs.Content value="1">
          <Card.Root>
            <Card.Header>
              <Heading size="md">Milestone Payments</Heading>
              <Text fontSize="sm" color="gray.600">Track project deliveries and payments</Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                {mockProviderData.milestonePayments.map((milestone) => (
                  <Box key={milestone.id} p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                    <Flex justify="space-between" align="start">
                      <VStack align="start" gap={2}>
                        <Text fontWeight="medium">{milestone.project}</Text>
                        <Text fontSize="sm" color="gray.600">{milestone.milestone}</Text>
                        <HStack gap={2}>
                          <Badge colorScheme={getStatusColor(milestone.status)} variant="solid">
                            {milestone.status}
                          </Badge>
                          <Text fontSize="sm" color="gray.600">
                            Delivered: {new Date(milestone.deliveryDate).toLocaleDateString()}
                          </Text>
                        </HStack>
                      </VStack>
                      <VStack align="end" gap={2}>
                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                          ${milestone.amount.toLocaleString()}
                        </Text>
                        {milestone.status === 'Awaiting Confirmation' && (
                          <Button size="sm" colorScheme="blue" variant="outline">
                            Follow Up
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <FiEye size={14} style={{ marginRight: '6px' }} />
                          View Details
                        </Button>
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        {/* Other tabs continue... */}
        <Tabs.Content value="2">
          <Card.Root>
            <Card.Header>
              <Heading size="md">Escrow Overview</Heading>
              <Text fontSize="sm" color="gray.600">Funds secured for active projects</Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                {mockProviderData.escrowContracts.map((escrow) => (
                  <Box key={escrow.id} p={4} border="1px solid" borderColor="orange.200" borderRadius="lg" bg="orange.50">
                    <Flex justify="space-between" align="start">
                      <VStack align="start" gap={2}>
                        <Text fontWeight="medium">{escrow.project}</Text>
                        <Text fontSize="sm" color="gray.600">Client: {escrow.provider}</Text>
                        <Text fontSize="sm" color="gray.600">
                          Expected Release: {new Date(escrow.releaseDate).toLocaleDateString()}
                        </Text>
                      </VStack>
                      <VStack align="end" gap={2}>
                        <Text fontSize="lg" fontWeight="bold" color="orange.600">
                          ${escrow.amount.toLocaleString()}
                        </Text>
                        <HStack gap={2}>
                          <Button size="sm" colorScheme="orange" variant="outline">
                            Request Release
                          </Button>
                          <Button size="sm" variant="ghost">
                            <FiMessageSquare size={14} />
                          </Button>
                        </HStack>
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </Tabs.Content>

        <Tabs.Content value="3">
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Card.Root>
              <Card.Header>
                <Heading size="md">Plug Points Balance</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="center" gap={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                    {mockProviderData.plugPoints.toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Points Available for Rewards
                  </Text>
                  <Box w="full" h="2" bg="gray.200" borderRadius="md" overflow="hidden">
                    <Box
                      h="full"
                      bg="purple.500"
                      borderRadius="md"
                      width="85%"
                    />
                  </Box>
                  <Text fontSize="xs" color="gray.500">85% to Elite Provider tier</Text>
                  <HStack gap={2}>
                    <Button colorScheme="purple">
                      <FiGift style={{ marginRight: '8px' }} />
                      Redeem Points
                    </Button>
                    <Button variant="outline" colorScheme="purple">
                      <FiTrendingUp style={{ marginRight: '8px' }} />
                      Leaderboard
                    </Button>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Heading size="md">Provider Rewards</Heading>
              </Card.Header>
              <Card.Body>
                <VStack gap={3} align="stretch">
                  <Box p={3} border="1px solid" borderColor="gray.200" borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" fontWeight="medium">Wallet Credit</Text>
                        <Text fontSize="xs" color="gray.600">$100 bonus</Text>
                      </VStack>
                      <Text fontSize="sm" color="purple.600" fontWeight="medium">8000 pts</Text>
                    </HStack>
                  </Box>
                  <Box p={3} border="1px solid" borderColor="gold" borderRadius="md" bg="yellow.50">
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <HStack gap={1}>
                          <FiStar color="gold" size={14} />
                          <Text fontSize="sm" fontWeight="medium">Premium Tier</Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600">Unlock exclusive benefits</Text>
                      </VStack>
                      <Text fontSize="sm" color="orange.600" fontWeight="medium">15000 pts</Text>
                    </HStack>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Tabs.Content>

        <Tabs.Content value="4">
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
            <Card.Root>
              <Card.Header>
                <Heading size="md">Bank Information</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="start" gap={4}>
                  <Button colorScheme="blue" w="full">
                    <FiEdit style={{ marginRight: '8px' }} />
                    Update Bank Details
                  </Button>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Heading size="md">Preferences</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="start" gap={4}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Auto-withdraw</Text>
                    <Switch.Root colorPalette="green">
                      <Switch.HiddenInput />
                      <Switch.Control><Switch.Thumb /></Switch.Control>
                    </Switch.Root>
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Email notifications</Text>
                    <Switch.Root defaultChecked colorPalette="blue">
                      <Switch.HiddenInput />
                      <Switch.Control><Switch.Thumb /></Switch.Control>
                    </Switch.Root>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

// Main Financial Hub Component with Role Switching
const FinancialHubPageContent: React.FC = () => {
  const userRoleContext = useUserRoleSafe();

  if (!userRoleContext) {
    return (
      <Box minH="calc(100vh - 140px)" display="flex" alignItems="center" justifyContent="center" p={8} bg="gray.50">
        <Card.Root maxW="md" w="full">
          <Card.Body p={8} textAlign="center">
            <VStack gap={6}>
              <Box p={4} borderRadius="full" bg="orange.100">
                <FiAlertTriangle size={32} />
              </Box>
              <VStack gap={2}>
                <Text fontSize="xl" fontWeight="bold" color="gray.900">Authentication Required</Text>
                <Text color="gray.600" fontSize="sm">Please refresh the page to access your financial hub.</Text>
              </VStack>
              <VStack gap={3} w="full">
                <Button onClick={() => window.location.reload()} colorScheme="blue" w="full">
                  <FiRefreshCw style={{ marginRight: '8px' }} />
                  Refresh Page
                </Button>
                <Button onClick={() => window.location.href = '/home'} variant="outline" w="full">
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
  const isRequester = userRole === 'Requester';

  return isRequester ? <RequesterFinancialHub /> : <ProviderFinancialHub />;
};

export default function FinancialHubPage() {
  return (
    <ErrorBoundary>
      <FinancialHubPageContent />
    </ErrorBoundary>
  );
}
