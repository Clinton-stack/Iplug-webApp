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
  Icon,
  Switch,
  Input,
  Select,
  Progress,
} from '@chakra-ui/react';
import {
  FiCreditCard,
  FiShield,
  FiDownload,
  FiSettings,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiPlus,
  FiStar,
  FiGift,
  FiLock,
  FiCheck,
  FiSmartphone,
  FiCpu,
  FiDatabase,
  FiDollarSign,
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

// Custom Stat Component
const StatCard = ({ label, value, helpText, color, icon }: any) => (
  <Card>
    <CardBody>
      <VStack align="stretch" gap={2}>
        <Text fontSize="sm" fontWeight="medium" color="gray.600">
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color={color}>
          {value}
        </Text>
        <HStack gap={1}>
          {icon && <Icon as={icon} color="green.500" />}
          <Text fontSize="sm" color="gray.500">
            {helpText}
          </Text>
        </HStack>
      </VStack>
    </CardBody>
  </Card>
);

// Alert Component
const Alert = ({ status, children }: any) => {
  const getBgColor = () => {
    if (status === 'success') return 'green.50';
    if (status === 'info') return 'blue.50';
    return 'gray.50';
  };

  const getBorderColor = () => {
    if (status === 'success') return 'green.200';
    if (status === 'info') return 'blue.200';
    return 'gray.200';
  };

  return (
    <Box 
      bg={getBgColor()} 
      border="1px" 
      borderColor={getBorderColor()} 
      borderRadius="md" 
      p={4}
    >
      {children}
    </Box>
  );
};

// Interfaces
interface Transaction {
  id: string;
  type: 'payment' | 'payout' | 'escrow' | 'refund' | 'reward';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  projectId?: string;
  receiptId?: string;
}

interface EscrowItem {
  id: string;
  projectTitle: string;
  milestone: string;
  amount: number;
  status: 'funded' | 'pending_approval' | 'released' | 'disputed';
  clientName: string;
  dueDate: string;
}

interface PayoutMethod {
  id: string;
  type: 'bank' | 'mobile' | 'wallet';
  name: string;
  details: string;
  isVerified: boolean;
  isDefault: boolean;
}

const IngeniousPayPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Mock data
  const walletData = {
    totalBalance: 12450.75,
    availableEarnings: 8750.50,
    pendingPayouts: 2200.25,
    escrowAmount: 1500.00,
    plugPoints: 2350,
  };

  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      type: 'payment',
      amount: 750.00,
      status: 'completed',
      date: '2025-08-20',
      description: 'Website Design Project - Milestone 2',
      projectId: 'PRJ-123',
      receiptId: 'RCP-001'
    },
    {
      id: 'TXN-002',
      type: 'payout',
      amount: 500.00,
      status: 'pending',
      date: '2025-08-19',
      description: 'Bank Transfer Payout',
    },
    {
      id: 'TXN-003',
      type: 'reward',
      amount: 25.00,
      status: 'completed',
      date: '2025-08-18',
      description: 'Plug Points Conversion',
    },
  ];

  const escrowItems: EscrowItem[] = [
    {
      id: 'ESC-001',
      projectTitle: 'Mobile App Development',
      milestone: 'UI/UX Design',
      amount: 1200.00,
      status: 'funded',
      clientName: 'Tech Startup Inc.',
      dueDate: '2025-08-25',
    },
    {
      id: 'ESC-002',
      projectTitle: 'Brand Identity Design',
      milestone: 'Logo Concepts',
      amount: 300.00,
      status: 'pending_approval',
      clientName: 'Creative Agency',
      dueDate: '2025-08-22',
    },
  ];

  const payoutMethods: PayoutMethod[] = [
    {
      id: 'PAY-001',
      type: 'bank',
      name: 'First Bank Nigeria',
      details: '****1234',
      isVerified: true,
      isDefault: true,
    },
    {
      id: 'PAY-002',
      type: 'mobile',
      name: 'MTN Mobile Money',
      details: '+234***8765',
      isVerified: true,
      isDefault: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'released':
        return 'green';
      case 'pending':
      case 'pending_approval':
        return 'yellow';
      case 'failed':
      case 'disputed':
        return 'red';
      case 'funded':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'released':
        return FiCheckCircle;
      case 'pending':
      case 'pending_approval':
        return FiClock;
      case 'failed':
      case 'disputed':
        return FiAlertCircle;
      case 'funded':
        return FiShield;
      default:
        return FiRefreshCw;
    }
  };

  const getPayoutIcon = (type: string) => {
    if (type === 'bank') return FiDatabase;
    if (type === 'mobile') return FiSmartphone;
    return FiCpu;
  };

  const tabOptions = [
    { label: 'Wallet Overview', icon: FiCpu },
    { label: 'Escrow & Payments', icon: FiShield },
    { label: 'Payouts', icon: FiDatabase },
    { label: 'Rewards & Points', icon: FiStar },
    { label: 'Receipts & Invoices', icon: FiDownload },
    { label: 'Finance Settings', icon: FiSettings },
  ];

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack gap={3} mb={2}>
            <Icon as={FiCreditCard} boxSize={8} color="blue.500" />
            <Heading size="xl">Ingenious Pay</Heading>
            <Badge colorScheme="blue" px={2} py={1} fontSize="sm">
              Finance Hub
            </Badge>
          </HStack>
          <Text color="gray.600" fontSize="lg">
            Securely powered by IngeniousPay - Your dedicated financial center for managing all transaction activities
          </Text>
        </Box>

        {/* Wallet Overview Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <StatCard
            label="Total Balance"
            value={`₦${walletData.totalBalance.toLocaleString()}`}
            helpText="+12% this month"
            color="blue.500"
            icon={FiTrendingUp}
          />
          <StatCard
            label="Available Earnings"
            value={`₦${walletData.availableEarnings.toLocaleString()}`}
            helpText="Ready for payout"
            color="green.500"
          />
          <StatCard
            label="Pending Payouts"
            value={`₦${walletData.pendingPayouts.toLocaleString()}`}
            helpText="Processing..."
            color="orange.500"
          />
          <StatCard
            label="Plug Points"
            value={walletData.plugPoints.toLocaleString()}
            helpText={`≈ ₦${(walletData.plugPoints * 0.1).toFixed(2)}`}
            color="purple.500"
          />
        </Grid>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <Heading size="md">Quick Actions</Heading>
          </CardHeader>
          <CardBody>
            <HStack gap={4} flexWrap="wrap">
              <Button colorScheme="blue" size="sm">
                <Icon as={FiPlus} mr={2} />
                Request Payout
              </Button>
              <Button colorScheme="green" variant="outline" size="sm">
                <Icon as={FiGift} mr={2} />
                Convert Points
              </Button>
              <Button colorScheme="purple" variant="outline" size="sm">
                <Icon as={FiDatabase} mr={2} />
                Add Payout Method
              </Button>
              <Button variant="outline" size="sm">
                <Icon as={FiDownload} mr={2} />
                Export Statement
              </Button>
            </HStack>
          </CardBody>
        </Card>

        {/* Tab Navigation */}
        <Card>
          <CardHeader>
            <HStack gap={2} flexWrap="wrap">
              {tabOptions.map((tab, tabIndex) => (
                <Button
                  key={`tab-${tabIndex}`}
                  size="sm"
                  variant={activeTab === tabIndex ? "solid" : "ghost"}
                  colorScheme={activeTab === tabIndex ? "blue" : "gray"}
                  onClick={() => setActiveTab(tabIndex)}
                >
                  <Icon as={tab.icon} mr={2} />
                  {tab.label}
                </Button>
              ))}
            </HStack>
          </CardHeader>
          <CardBody>
            {/* Wallet Overview Tab */}
            {activeTab === 0 && (
              <VStack gap={6} align="stretch">
                <Card>
                  <CardHeader>
                    <Heading size="md">Recent Transactions</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {transactions.map((transaction) => (
                        <Box key={transaction.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                          <HStack justify="space-between">
                            <HStack gap={3}>
                              <Icon
                                as={getStatusIcon(transaction.status)}
                                color={`${getStatusColor(transaction.status)}.500`}
                                boxSize={5}
                              />
                              <VStack align="start" gap={0}>
                                <Text fontWeight="semibold">{transaction.description}</Text>
                                <Text fontSize="sm" color="gray.500">{transaction.date}</Text>
                              </VStack>
                            </HStack>
                            <VStack align="end" gap={0}>
                              <Text fontWeight="bold" color={transaction.type === 'payout' ? 'red.500' : 'green.500'}>
                                {transaction.type === 'payout' ? '-' : '+'}₦{transaction.amount.toLocaleString()}
                              </Text>
                              <Badge colorScheme={getStatusColor(transaction.status)} size="sm">
                                {transaction.status}
                              </Badge>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Escrow & Payments Tab */}
            {activeTab === 1 && (
              <VStack gap={6} align="stretch">
                <Alert status="info">
                  <VStack align="start" gap={2}>
                    <Text fontWeight="bold">Escrow Protection Active!</Text>
                    <Text fontSize="sm">
                      Your payments are secured until project milestones are completed and approved.
                    </Text>
                  </VStack>
                </Alert>

                <Card>
                  <CardHeader>
                    <Heading size="md">Active Escrow Items</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {escrowItems.map((item) => (
                        <Box key={item.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                          <HStack justify="space-between" mb={3}>
                            <VStack align="start" gap={1}>
                              <Text fontWeight="bold">{item.projectTitle}</Text>
                              <Text fontSize="sm" color="gray.600">{item.milestone}</Text>
                              <Text fontSize="sm" color="gray.500">Client: {item.clientName}</Text>
                            </VStack>
                            <VStack align="end" gap={1}>
                              <Text fontWeight="bold" color="blue.600">₦{item.amount.toLocaleString()}</Text>
                              <Badge colorScheme={getStatusColor(item.status)}>
                                {item.status.replace('_', ' ')}
                              </Badge>
                            </VStack>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.500">Due: {item.dueDate}</Text>
                            {item.status === 'pending_approval' && (
                              <Button size="xs" colorScheme="green">
                                <Icon as={FiCheck} mr={1} />
                                Request Release
                              </Button>
                            )}
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Payouts Tab */}
            {activeTab === 2 && (
              <VStack gap={6} align="stretch">
                <Card>
                  <CardHeader>
                    <HStack justify="space-between">
                      <Heading size="md">Payout Methods</Heading>
                      <Button colorScheme="blue" size="sm">
                        <Icon as={FiPlus} mr={2} />
                        Add Method
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {payoutMethods.map((method) => (
                        <Box key={method.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                          <HStack justify="space-between">
                            <HStack gap={3}>
                              <Icon
                                as={getPayoutIcon(method.type)}
                                boxSize={5}
                                color="blue.500"
                              />
                              <VStack align="start" gap={0}>
                                <Text fontWeight="semibold">{method.name}</Text>
                                <Text fontSize="sm" color="gray.500">{method.details}</Text>
                              </VStack>
                            </HStack>
                            <HStack gap={2}>
                              {method.isDefault && (
                                <Badge colorScheme="blue" size="sm">Default</Badge>
                              )}
                              {method.isVerified && (
                                <Badge colorScheme="green" size="sm">
                                  <Icon as={FiCheck} mr={1} />
                                  Verified
                                </Badge>
                              )}
                              <Button size="xs" variant="outline">Edit</Button>
                            </HStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Rewards & Points Tab */}
            {activeTab === 3 && (
              <VStack gap={6} align="stretch">
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  <Card>
                    <CardHeader>
                      <Heading size="md" color="purple.600">Plug Points Summary</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={4}>
                        <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                          {walletData.plugPoints.toLocaleString()}
                        </Text>
                        <Text color="gray.600">Available Points</Text>
                        <Button colorScheme="purple" size="sm" w="full">
                          Convert to Wallet (₦{(walletData.plugPoints * 0.1).toFixed(2)})
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Recent Rewards</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={3} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="sm">Project Completion Bonus</Text>
                          <Badge colorScheme="purple">+100 pts</Badge>
                        </HStack>
                        <HStack justify="space-between">
                          <Text fontSize="sm">Client Review (5★)</Text>
                          <Badge colorScheme="purple">+50 pts</Badge>
                        </HStack>
                        <HStack justify="space-between">
                          <Text fontSize="sm">On-time Delivery</Text>
                          <Badge colorScheme="purple">+25 pts</Badge>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                <Card>
                  <CardHeader>
                    <Heading size="md">Achievement Badges</Heading>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                      <Box textAlign="center" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <Icon as={FiStar} boxSize={8} color="gold" mb={2} />
                        <Text fontWeight="semibold">Top Rated</Text>
                        <Text fontSize="sm" color="gray.500">Maintain 4.8+ rating</Text>
                      </Box>
                      <Box textAlign="center" p={4} border="1px" borderColor="gray.200" borderRadius="md">
                        <Icon as={FiCheckCircle} boxSize={8} color="green.500" mb={2} />
                        <Text fontWeight="semibold">Fast Delivery</Text>
                        <Text fontSize="sm" color="gray.500">100% on-time completion</Text>
                      </Box>
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Receipts & Invoices Tab */}
            {activeTab === 4 && (
              <VStack gap={6} align="stretch">
                <Card>
                  <CardHeader>
                    <HStack justify="space-between">
                      <Heading size="md">Transaction Receipts</Heading>
                      <Button size="sm" variant="outline">
                        <Icon as={FiDownload} mr={2} />
                        Download All
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {transactions.filter(t => t.receiptId).map((transaction) => (
                        <Box key={transaction.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                          <HStack justify="space-between">
                            <VStack align="start" gap={1}>
                              <Text fontWeight="semibold">{transaction.description}</Text>
                              <Text fontSize="sm" color="gray.500">{transaction.date}</Text>
                              <Badge variant="outline">{transaction.receiptId}</Badge>
                            </VStack>
                            <VStack align="end" gap={2}>
                              <Text fontWeight="bold" color="green.500">
                                ₦{transaction.amount.toLocaleString()}
                              </Text>
                              <HStack gap={2}>
                                <Button size="xs" variant="outline">
                                  View
                                </Button>
                                <Button size="xs" colorScheme="blue">
                                  <Icon as={FiDownload} />
                                </Button>
                              </HStack>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Finance Settings Tab */}
            {activeTab === 5 && (
              <VStack gap={6} align="stretch">
                <Card>
                  <CardHeader>
                    <Heading size="md">KYC Verification</Heading>
                  </CardHeader>
                  <CardBody>
                    <Alert status="success">
                      <VStack align="start" gap={2}>
                        <Text fontWeight="bold">KYC Verified!</Text>
                        <Text fontSize="sm">
                          Your identity has been verified. You can now access all payment features.
                        </Text>
                      </VStack>
                    </Alert>
                    <Box mt={4} bg="green.200" h="4" borderRadius="md" />
                    <Text mt={2} fontSize="sm" color="gray.600">
                      Verification completed on August 15, 2025
                    </Text>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <Heading size="md">Payment Preferences</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Default Currency</Text>
                        <Box border="1px" borderColor="gray.300" borderRadius="md" p={2}>
                          <Text>Nigerian Naira (₦)</Text>
                        </Box>
                      </Box>

                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Minimum Payout Threshold</Text>
                        <HStack>
                          <Icon as={FiDollarSign} color="gray.400" />
                          <Input defaultValue="500" placeholder="Amount in NGN" />
                        </HStack>
                      </Box>

                      <HStack justify="space-between">
                        <Text fontSize="sm">Enable automatic payouts</Text>
                        <Box w="40px" h="20px" bg="gray.200" borderRadius="full" />
                      </HStack>

                      <HStack justify="space-between">
                        <Text fontSize="sm">Payment notifications</Text>
                        <Box w="40px" h="20px" bg="blue.500" borderRadius="full" />
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <Heading size="md">Security Settings</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="sm">Two-factor authentication for payouts</Text>
                        <Box w="40px" h="20px" bg="blue.500" borderRadius="full" />
                      </HStack>

                      <Button colorScheme="blue" variant="outline" w="fit-content">
                        <Icon as={FiLock} mr={2} />
                        Change PIN
                      </Button>
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

export default IngeniousPayPage;
