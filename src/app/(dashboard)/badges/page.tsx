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
} from '@chakra-ui/react';
import {
  FiAward,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiCheckCircle,
  FiClock,
  FiLock,
  FiGift,
  FiZap,
  FiShield,
  FiHeart,
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
interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  earnedDate?: string;
  category: 'performance' | 'quality' | 'community' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: {
    current: number;
    required: number;
    unit: string;
  };
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  category: string;
  score: number;
  change: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

const BadgesPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('earned');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for badges
  const badges: BadgeData[] = [
    {
      id: 'first-project',
      name: 'First Project',
      description: 'Complete your first project successfully',
      icon: FiCheckCircle,
      color: 'green.500',
      earned: true,
      earnedDate: '2025-06-15',
      category: 'milestone',
      rarity: 'common'
    },
    {
      id: 'five-star-rating',
      name: '5-Star Specialist',
      description: 'Maintain a 5.0 rating across 10 projects',
      icon: FiStar,
      color: 'yellow.500',
      earned: true,
      earnedDate: '2025-07-20',
      category: 'quality',
      rarity: 'rare'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete 5 projects ahead of deadline',
      icon: FiZap,
      color: 'blue.500',
      earned: true,
      earnedDate: '2025-08-10',
      category: 'performance',
      rarity: 'rare'
    },
    {
      id: 'community-hero',
      name: 'Community Hero',
      description: 'Help 50+ community members',
      icon: FiHeart,
      color: 'pink.500',
      earned: false,
      category: 'community',
      rarity: 'epic',
      progress: { current: 23, required: 50, unit: 'helps' }
    },
    {
      id: 'top-earner',
      name: 'Top Earner',
      description: 'Earn ₦100,000+ in a single month',
      icon: FiAward,
      color: 'purple.500',
      earned: false,
      category: 'performance',
      rarity: 'legendary',
      progress: { current: 65000, required: 100000, unit: 'NGN' }
    },
    {
      id: 'trusted-provider',
      name: 'Trusted Provider',
      description: 'Complete 25 projects with 100% success rate',
      icon: FiShield,
      color: 'cyan.500',
      earned: false,
      category: 'quality',
      rarity: 'epic',
      progress: { current: 18, required: 25, unit: 'projects' }
    },
    {
      id: 'referral-master',
      name: 'Referral Master',
      description: 'Successfully refer 10 new providers',
      icon: FiUsers,
      color: 'orange.500',
      earned: false,
      category: 'community',
      rarity: 'rare',
      progress: { current: 6, required: 10, unit: 'referrals' }
    }
  ];

  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'Sarah Johnson', category: 'Web Development', score: 2450, change: 'up' },
    { rank: 2, name: 'Michael Chen', category: 'Graphic Design', score: 2380, change: 'same' },
    { rank: 3, name: 'You', category: 'UI/UX Design', score: 2290, change: 'up', isCurrentUser: true },
    { rank: 4, name: 'David Wilson', category: 'Mobile Development', score: 2210, change: 'down' },
    { rank: 5, name: 'Emma Davis', category: 'Content Writing', score: 2150, change: 'up' }
  ];

  const referralStats = {
    totalReferrals: 6,
    activeReferrals: 4,
    totalEarnings: 1250.00,
    thisMonthEarnings: 300.00
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'gray';
      case 'rare': return 'blue';
      case 'epic': return 'purple';
      case 'legendary': return 'orange';
      default: return 'gray';
    }
  };

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  const getChangeIcon = (change: string) => {
    if (change === 'up') return FiTrendingUp;
    if (change === 'down') return FiClock;
    return FiCheckCircle;
  };

  const getChangeColor = (change: string) => {
    if (change === 'up') return 'green.500';
    if (change === 'down') return 'red.500';
    return 'gray.500';
  };

  const filteredBadges = badges.filter(badge => 
    selectedCategory === 'all' || badge.category === selectedCategory
  );

  const earnedBadges = filteredBadges.filter(badge => badge.earned);
  const lockedBadges = filteredBadges.filter(badge => !badge.earned);

  const sectionOptions = [
    { key: 'earned', label: 'Earned Badges', icon: FiAward },
    { key: 'progress', label: 'Progress Tracker', icon: FiTarget },
    { key: 'referrals', label: 'Referral Bonuses', icon: FiGift },
    { key: 'leaderboards', label: 'Leaderboards', icon: FiAward },
  ];

  const categoryOptions = [
    { key: 'all', label: 'All Categories' },
    { key: 'performance', label: 'Performance' },
    { key: 'quality', label: 'Quality' },
    { key: 'community', label: 'Community' },
    { key: 'milestone', label: 'Milestones' },
    { key: 'special', label: 'Special' },
  ];

  return (
    <Container maxW="7xl" py={8}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack gap={3} mb={2}>
            <Box as={FiAward} boxSize={8} color="purple.500" />
            <Heading size="xl">Badges & Rewards</Heading>
            <Badge colorScheme="purple" px={2} py={1} fontSize="sm">
              Gamification Hub
            </Badge>
          </HStack>
          <Text color="gray.600" fontSize="lg">
            🎯 See earned/locked badges & progress across Plug. Track your achievements, performance, and community impact.
          </Text>
        </Box>

        {/* Stats Overview */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
          <Card>
            <CardBody textAlign="center">
              <Box as={FiAward} boxSize={6} color="green.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {earnedBadges.length}
              </Text>
              <Text fontSize="sm" color="gray.600">Earned Badges</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Box as={FiTarget} boxSize={6} color="blue.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {lockedBadges.length}
              </Text>
              <Text fontSize="sm" color="gray.600">In Progress</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <Box as={FiUsers} boxSize={6} color="orange.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                {referralStats.totalReferrals}
              </Text>
              <Text fontSize="sm" color="gray.600">Referrals</Text>
            </CardBody>
          </Card>

          <Card>
            <CardBody textAlign="center">
              <Box as={FiAward} boxSize={6} color="purple.500" mb={2} />
              <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                #3
              </Text>
              <Text fontSize="sm" color="gray.600">Leaderboard Rank</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Navigation */}
        <Card>
          <CardHeader>
            <HStack gap={2} flexWrap="wrap" justify="space-between">
              <HStack gap={2} flexWrap="wrap">
                {sectionOptions.map((section) => (
                  <Button
                    key={section.key}
                    size="sm"
                    variant={activeSection === section.key ? "solid" : "ghost"}
                    colorScheme={activeSection === section.key ? "purple" : "gray"}
                    onClick={() => setActiveSection(section.key)}
                  >
                    <Box as={section.icon} mr={2} />
                    {section.label}
                  </Button>
                ))}
              </HStack>

              {(activeSection === 'earned' || activeSection === 'progress') && (
                <HStack gap={2}>
                  <Text fontSize="sm" color="gray.600">Filter:</Text>
                  {categoryOptions.map((category) => (
                    <Button
                      key={category.key}
                      size="xs"
                      variant={selectedCategory === category.key ? "solid" : "outline"}
                      colorScheme={selectedCategory === category.key ? "purple" : "gray"}
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </HStack>
              )}
            </HStack>
          </CardHeader>

          <CardBody>
            {/* Earned Badges Section */}
            {activeSection === 'earned' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="green.600">
                  🏆 Your Badge Collection ({earnedBadges.length} earned)
                </Text>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
                  {earnedBadges.map((badge) => (
                    <Card key={badge.id} position="relative" overflow="hidden">
                      <CardBody>
                        <VStack gap={3} align="center">
                          <Box position="relative">
                            <Box
                              w="60px"
                              h="60px"
                              bg={`${badge.color.split('.')[0]}.50`}
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              border="3px solid"
                              borderColor={badge.color}
                            >
                              <Box as={badge.icon} boxSize={6} color={badge.color} />
                            </Box>
                            <Badge
                              position="absolute"
                              top="-2"
                              right="-2"
                              colorScheme={getRarityColor(badge.rarity)}
                              fontSize="xs"
                              px={2}
                            >
                              {badge.rarity}
                            </Badge>
                          </Box>
                          
                          <VStack gap={1} textAlign="center">
                            <Text fontWeight="bold" fontSize="md">{badge.name}</Text>
                            <Text fontSize="sm" color="gray.600" textAlign="center">
                              {badge.description}
                            </Text>
                            {badge.earnedDate && (
                              <Text fontSize="xs" color="gray.500">
                                Earned: {new Date(badge.earnedDate).toLocaleDateString()}
                              </Text>
                            )}
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>

                {earnedBadges.length === 0 && (
                  <Box textAlign="center" py={8}>
                    <Box as={FiLock} boxSize={12} color="gray.300" mb={4} />
                    <Text color="gray.500">No badges earned in this category yet</Text>
                    <Text fontSize="sm" color="gray.400">Complete projects and engage with the community to earn badges!</Text>
                  </Box>
                )}
              </VStack>
            )}

            {/* Progress Tracker Section */}
            {activeSection === 'progress' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                  🔹 Next Achievable Badges & Required Actions
                </Text>

                <VStack gap={4} align="stretch">
                  {lockedBadges.map((badge) => (
                    <Card key={badge.id}>
                      <CardBody>
                        <HStack gap={4} align="start">
                          <Box position="relative">
                            <Box
                              w="50px"
                              h="50px"
                              bg="gray.100"
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              border="2px dashed"
                              borderColor="gray.300"
                              opacity={0.7}
                            >
                              <Box as={badge.icon} boxSize={5} color="gray.400" />
                            </Box>
                            <Badge
                              position="absolute"
                              top="-1"
                              right="-1"
                              colorScheme={getRarityColor(badge.rarity)}
                              fontSize="xs"
                            >
                              {badge.rarity}
                            </Badge>
                          </Box>

                          <VStack align="stretch" flex={1} gap={2}>
                            <HStack justify="space-between">
                              <VStack align="start" gap={0}>
                                <Text fontWeight="bold">{badge.name}</Text>
                                <Text fontSize="sm" color="gray.600">{badge.description}</Text>
                              </VStack>
                              <Badge colorScheme="gray" variant="outline">
                                <Box as={FiLock} mr={1} />
                                Locked
                              </Badge>
                            </HStack>

                            {badge.progress && (
                              <Box>
                                <HStack justify="space-between" mb={1}>
                                  <Text fontSize="sm" color="gray.600">Progress</Text>
                                  <Text fontSize="sm" fontWeight="medium">
                                    {badge.progress.current.toLocaleString()} / {badge.progress.required.toLocaleString()} {badge.progress.unit}
                                  </Text>
                                </HStack>
                                <Box bg="gray.200" h="2" borderRadius="full" overflow="hidden">
                                  <Box
                                    bg={badge.color}
                                    h="full"
                                    w={`${getProgressPercentage(badge.progress.current, badge.progress.required)}%`}
                                    borderRadius="full"
                                  />
                                </Box>
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                  {badge.progress.required - badge.progress.current} more {badge.progress.unit} needed
                                </Text>
                              </Box>
                            )}
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>

                {lockedBadges.length === 0 && (
                  <Box textAlign="center" py={8}>
                    <Box as={FiCheckCircle} boxSize={12} color="green.400" mb={4} />
                    <Text color="gray.500">All badges earned in this category!</Text>
                    <Text fontSize="sm" color="gray.400">Check other categories or wait for new badges to be released.</Text>
                  </Box>
                )}
              </VStack>
            )}

            {/* Referral Bonuses Section */}
            {activeSection === 'referrals' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="orange.600">
                  🔹 Referral Rewards & Bonuses
                </Text>

                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Referral Statistics</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={4} align="stretch">
                        <HStack justify="space-between">
                          <Text>🔹 Total Referrals</Text>
                          <Text fontWeight="bold" fontSize="xl" color="orange.500">
                            {referralStats.totalReferrals}
                          </Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Active Referrals</Text>
                          <Text fontWeight="bold" color="green.500">
                            {referralStats.activeReferrals}
                          </Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>🔹 Total Earnings</Text>
                          <Text fontWeight="bold" color="blue.500">
                            ₦{referralStats.totalEarnings.toLocaleString()}
                          </Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>This Month</Text>
                          <Text fontWeight="bold" color="purple.500">
                            ₦{referralStats.thisMonthEarnings.toLocaleString()}
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Referral Rewards</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={4} align="stretch">
                        <Box p={3} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="green.700">New Provider Bonus</Text>
                              <Text fontSize="sm" color="green.600">Per successful referral</Text>
                            </VStack>
                            <Text fontWeight="bold" color="green.700">₦500</Text>
                          </HStack>
                        </Box>

                        <Box p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="blue.700">Monthly Activity Bonus</Text>
                              <Text fontSize="sm" color="blue.600">5% of referral earnings</Text>
                            </VStack>
                            <Text fontWeight="bold" color="blue.700">₦62.50</Text>
                          </HStack>
                        </Box>

                        <Box p={3} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="purple.700">Milestone Reward</Text>
                              <Text fontSize="sm" color="purple.600">10 referrals milestone</Text>
                            </VStack>
                            <Text fontWeight="bold" color="purple.700">₦2,000</Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                <Card>
                  <CardHeader>
                    <Heading size="md">Share Your Referral Link</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4}>
                      <Box p={3} bg="gray.50" borderRadius="md" w="full" border="1px" borderColor="gray.200">
                        <Text fontSize="sm" fontFamily="mono">
                          https://plug.app/join?ref=YOUR_CODE_123
                        </Text>
                      </Box>
                      <HStack gap={2}>
                        <Button colorScheme="blue" size="sm">
                          Copy Link
                        </Button>
                        <Button variant="outline" size="sm">
                          Share via WhatsApp
                        </Button>
                        <Button variant="outline" size="sm">
                          Share via Twitter
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}

            {/* Leaderboards Section */}
            {activeSection === 'leaderboards' && (
              <VStack gap={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                  🔹 Top Categories & "Top Plug of the Month"
                </Text>

                <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">🏆 Top Plugs This Month</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={3} align="stretch">
                        {leaderboardData.map((entry) => (
                          <Box
                            key={entry.rank}
                            p={3}
                            borderRadius="md"
                            bg={entry.isCurrentUser ? 'purple.50' : 'gray.50'}
                            border="1px"
                            borderColor={entry.isCurrentUser ? 'purple.200' : 'gray.200'}
                          >
                            <HStack justify="space-between">
                              <HStack gap={3}>
                                <Box
                                  w="30px"
                                  h="30px"
                                  borderRadius="full"
                                  bg={entry.rank <= 3 ? 'gold' : 'gray.300'}
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  color="white"
                                  fontWeight="bold"
                                  fontSize="sm"
                                >
                                  {entry.rank}
                                </Box>
                                <VStack align="start" gap={0}>
                                  <Text fontWeight={entry.isCurrentUser ? 'bold' : 'medium'}>
                                    {entry.name}
                                  </Text>
                                  <Text fontSize="sm" color="gray.600">
                                    {entry.category}
                                  </Text>
                                </VStack>
                              </HStack>
                              <HStack gap={2}>
                                <Text fontWeight="bold">{entry.score.toLocaleString()}</Text>
                                <Box
                                  as={getChangeIcon(entry.change)}
                                  color={getChangeColor(entry.change)}
                                />
                              </HStack>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Category Leaders</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack gap={4} align="stretch">
                        <Box p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="blue.700">Web Development</Text>
                              <Text fontSize="sm" color="blue.600">Sarah Johnson</Text>
                            </VStack>
                            <Badge colorScheme="blue">👑 Leader</Badge>
                          </HStack>
                        </Box>

                        <Box p={3} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="green.700">Graphic Design</Text>
                              <Text fontSize="sm" color="green.600">Michael Chen</Text>
                            </VStack>
                            <Badge colorScheme="green">👑 Leader</Badge>
                          </HStack>
                        </Box>

                        <Box p={3} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="purple.700">UI/UX Design</Text>
                              <Text fontSize="sm" color="purple.600">You</Text>
                            </VStack>
                            <Badge colorScheme="purple">👑 Leader</Badge>
                          </HStack>
                        </Box>

                        <Box p={3} bg="orange.50" borderRadius="md" border="1px" borderColor="orange.200">
                          <HStack justify="space-between">
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold" color="orange.700">Mobile Development</Text>
                              <Text fontSize="sm" color="orange.600">David Wilson</Text>
                            </VStack>
                            <Badge colorScheme="orange">👑 Leader</Badge>
                          </HStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                <Card>
                  <CardHeader>
                    <Heading size="md">🏆 "Top Plug of the Month" Award</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack gap={4}>
                      <Box textAlign="center" p={6} bg="gradient-to-r from-purple-50 to-blue-50" borderRadius="lg" border="2px" borderColor="purple.200">
                        <Box as={FiAward} boxSize={12} color="gold" mb={4} />
                        <Text fontSize="2xl" fontWeight="bold" color="purple.700" mb={2}>
                          Congratulations!
                        </Text>
                        <Text fontSize="lg" color="purple.600" mb={1}>
                          You're currently ranked #3
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Keep up the great work to reach the top spot!
                        </Text>
                      </Box>
                      
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        The "Top Plug of the Month" receives a special badge, ₦5,000 bonus, and featured placement on the platform.
                      </Text>
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

export default BadgesPage;
