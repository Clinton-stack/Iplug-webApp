"use client";
import React, { useState } from "react";
import { 
  Box, 
  Container, 
  VStack, 
  Text, 
  Input,
  SimpleGrid,
  Card,
  Heading,
  Badge,
  Button,
  HStack,
  Avatar,
  Flex,
  Icon,
  NativeSelect,
} from "@chakra-ui/react";
import { 
  FiSearch,
  FiStar,
  FiChevronRight,
  FiUsers,
  FiZap,
  FiHeart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import CreateRequestModal from "@/components/modals/CreateRequestModal";
import { useUserRole } from "@/contexts/UserRoleContext";
import AccessRestriction from "@/components/ui/AccessRestriction";
import { useRouter } from "next/navigation";

// Motion components
const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card.Root);

// Service Categories Data
const serviceCategories = [
  { id: 'tech', name: 'Technology & Digital', icon: '💻', color: 'blue', count: '245+' },
  { id: 'fashion', name: 'Fashion & Beauty', icon: '👗', color: 'pink', count: '180+' },
  { id: 'events', name: 'Events & Entertainment', icon: '🎉', color: 'purple', count: '156+' },
  { id: 'food', name: 'Food & Catering', icon: '🍽️', color: 'orange', count: '198+' },
  { id: 'creative', name: 'Creative Services', icon: '🎨', color: 'teal', count: '134+' },
  { id: 'health', name: 'Health & Wellness', icon: '💪', color: 'green', count: '89+' },
  { id: 'professional', name: 'Professional Services', icon: '📊', color: 'indigo', count: '267+' },
  { id: 'home', name: 'Home Services', icon: '🏠', color: 'yellow', count: '203+' },
];

// Featured Services Data
const featuredServices = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Modern React & Next.js web applications',
    provider: 'John Adebayo',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    rating: 4.9,
    reviews: 156,
    priceRange: '₦50,000 - ₦200,000',
    deliveryTime: '3-7 days',
    providers: 23,
    category: 'Technology',
    badges: ['Verified', 'Top Rated'],
    skills: ['React', 'Next.js', 'TypeScript']
  },
  {
    id: 2,
    title: 'Wedding Photography',
    description: 'Professional wedding & event photography',
    provider: 'Sarah Okafor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b586?w=40&h=40&fit=crop&crop=face',
    rating: 4.8,
    reviews: 89,
    priceRange: '₦80,000 - ₦300,000',
    deliveryTime: '2-3 weeks',
    providers: 15,
    category: 'Creative',
    badges: ['Featured', 'Premium'],
    skills: ['Photography', 'Editing', 'Drone']
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'iOS & Android native applications',
    provider: 'David Ogundimu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    rating: 5.0,
    reviews: 203,
    priceRange: '₦100,000 - ₦500,000',
    deliveryTime: '2-4 weeks',
    providers: 18,
    category: 'Technology',
    badges: ['AI Boost', 'Expert'],
    skills: ['React Native', 'Flutter', 'Swift']
  }
];

// Top Providers Data
// Top Providers Data
const topProviders = [
  {
    id: 1,
    name: 'Tunde Bakare',
    title: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face',
    rating: 4.9,
    completedJobs: 89,
    responseTime: '< 2 hours',
    badges: ['Top Rated', 'Verified'],
    skills: ['React', 'Node.js', 'AWS']
  },
  {
    id: 2,
    name: 'Kemi Adeyemi',
    title: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    rating: 5.0,
    completedJobs: 156,
    responseTime: '< 1 hour',
    badges: ['Expert', 'Premium'],
    skills: ['Figma', 'Sketch', 'Prototyping']
  },
  {
    id: 3,
    name: 'Emeka Nwachukwu',
    title: 'Digital Marketer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
    rating: 4.8,
    completedJobs: 234,
    responseTime: '< 30 mins',
    badges: ['Featured', 'AI Boost'],
    skills: ['SEO', 'Google Ads', 'Analytics']
  },
  {
    id: 4,
    name: 'Fatima Mohammed',
    title: 'Content Writer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face',
    rating: 4.9,
    completedJobs: 178,
    responseTime: '< 1 hour',
    badges: ['Top Rated', 'Verified'],
    skills: ['Copywriting', 'SEO Writing', 'Research']
  },
  {
    id: 5,
    name: 'Samuel Ojo',
    title: 'Video Editor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    rating: 4.7,
    completedJobs: 92,
    responseTime: '< 3 hours',
    badges: ['Creative', 'Premium'],
    skills: ['Premiere Pro', 'After Effects', 'Color Grading']
  },
  {
    id: 6,
    name: 'Grace Adebisi',
    title: 'Business Consultant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face',
    rating: 5.0,
    completedJobs: 67,
    responseTime: '< 2 hours',
    badges: ['Expert', 'AI Boost'],
    skills: ['Strategy', 'Planning', 'Analysis']
  }
];

const ExploreServicesPage: React.FC = () => {
  const { userRole } = useUserRole();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [location, setLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Role-based access control - only Requesters can access this page
  if (userRole !== 'Requester') {
    return (
      <AccessRestriction
        requiredRole="Requester"
        pageName="Explore Services"
        description="The Explore Services page is where you can browse and hire talented service providers. Switch to Requester mode to start exploring available services and posting your own requests."
      />
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardHoverVariants = {
    hover: { 
      y: -5, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <Container maxW="7xl" py={8}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <MotionBox
          variants={itemVariants}
          textAlign="center"
          mb={12}
        >
          <Heading 
            size="2xl" 
            bgGradient="linear(to-r, blue.500, purple.600)"
            bgClip="text"
            mb={4}
          >
            Discover Amazing Services
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={8} maxW="2xl" mx="auto">
            Connect with verified providers and bring your projects to life with Nigeria&apos;s most trusted service marketplace
          </Text>

          {/* Enhanced Search Bar */}
          <MotionBox
            variants={itemVariants}
            bg="white"
            p={6}
            borderRadius="2xl"
            shadow="xl"
            border="1px solid"
            borderColor="gray.100"
            maxW="4xl"
            mx="auto"
            mb={8}
          >
            <VStack gap={6}>
              <Box position="relative">
                <Input
                  placeholder="What service do you need? (e.g. Web development, Catering, Auto Repair)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg="gray.50"
                  border="2px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "blue.400",
                    bg: "white"
                  }}
                  borderRadius="xl"
                  fontSize="md"
                  size="lg"
                  pr={12}
                />
                <Box position="absolute" right={4} top="50%" transform="translateY(-50%)" pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" boxSize={5} />
                </Box>
              </Box>

              {/* Quick Filters */}
              <HStack wrap="wrap" justify="center" gap={4}>
                <NativeSelect.Root maxW="200px">
                  <NativeSelect.Field
                    placeholder="Category"
                    value={selectedCategory}
                    onChange={(e: any) => setSelectedCategory(e.target.value)}
                    borderRadius="lg"
                  >
                    <option value="">Category</option>
                    {serviceCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                
                <NativeSelect.Root maxW="200px">
                  <NativeSelect.Field
                    placeholder="Budget Range"
                    value={priceRange}
                    onChange={(e: any) => setPriceRange(e.target.value)}
                    borderRadius="lg"
                  >
                    <option value="">Budget Range</option>
                    <option value="0-50000">Under ₦50,000</option>
                    <option value="50000-200000">₦50,000 - ₦200,000</option>
                    <option value="200000-500000">₦200,000 - ₦500,000</option>
                    <option value="500000+">₦500,000+</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>

                <NativeSelect.Root maxW="200px">
                  <NativeSelect.Field
                    placeholder="Delivery Time"
                    value={deliveryTime}
                    onChange={(e: any) => setDeliveryTime(e.target.value)}
                    borderRadius="lg"
                  >
                    <option value="">Delivery Time</option>
                    <option value="1-3">1-3 days</option>
                    <option value="1-week">1 week</option>
                    <option value="2-weeks">2 weeks</option>
                    <option value="flexible">Flexible</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>

                <Input
                  placeholder="Location (optional)"
                  value={location}
                  onChange={(e: any) => setLocation(e.target.value)}
                  maxW="200px"
                  borderRadius="lg"
                />
              </HStack>

              <HStack gap={3}>
                <Button
                  colorPalette="blue"
                  size="lg"
                  borderRadius="xl"
                  px={8}
                >
                  <Icon as={FiSearch} mr={2} />
                  Search Services
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  px={8}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Icon as={FiZap} mr={2} />
                  AI Smart Request
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        </MotionBox>

        {/* Service Categories Carousel */}
        <MotionBox variants={itemVariants} mb={12}>
          <Heading size="lg" mb={6} textAlign="center">
            Browse by Category
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4, lg: 8 }} gap={4}>
            {serviceCategories.map((category, index) => (
              <MotionCard
                key={category.id}
                variants={itemVariants}
                whileHover="hover"
                custom={index}
                p={6}
                textAlign="center"
                cursor="pointer"
                border="2px solid transparent"
                _hover={{
                  borderColor: `${category.color}.300`,
                  shadow: "lg"
                }}
                borderRadius="xl"
              >
                <Text fontSize="3xl" mb={3}>{category.icon}</Text>
                <Text fontWeight="semibold" fontSize="sm" mb={2}>
                  {category.name}
                </Text>
                <Badge colorPalette={category.color} size="sm">
                  {category.count}
                </Badge>
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Featured Services */}
        <MotionBox variants={itemVariants} mb={12}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Featured Services</Heading>
            <Button 
              variant="ghost"
              onClick={() => router.push('/all-services')}
            >
              View All
              <Icon as={FiChevronRight} ml={1} />
            </Button>
          </Flex>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {featuredServices.map((service, index) => (
              <MotionCard
                key={service.id}
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
                p={6}
                borderRadius="xl"
                shadow="md"
                border="1px solid"
                borderColor="gray.100"
                cursor="pointer"
                _hover={{ shadow: "xl" }}
              >
                <HStack justify="space-between" mb={4}>
                  <Badge colorPalette="blue">{service.category}</Badge>
                  <HStack gap={1}>
                    {service.badges.map(badge => (
                      <Badge key={badge} size="sm" colorPalette="green">
                        {badge}
                      </Badge>
                    ))}
                  </HStack>
                </HStack>

                <Heading size="md" mb={2}>{service.title}</Heading>
                <Text color="gray.600" mb={4} fontSize="sm">
                  {service.description}
                </Text>

                <HStack mb={4}>
                  <Avatar.Root size="sm">
                    <Avatar.Image src={service.avatar} />
                    <Avatar.Fallback>{service.provider.charAt(0)}</Avatar.Fallback>
                  </Avatar.Root>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {service.provider}
                    </Text>
                    <HStack gap={1}>
                      <Icon as={FiStar} color="yellow.400" boxSize={3} />
                      <Text fontSize="xs" color="gray.500">
                        {service.rating} ({service.reviews} reviews)
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>

                <VStack align="stretch" gap={3}>
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontSize="xs" color="gray.500">Price Range</Text>
                      <Text fontWeight="bold" color="green.500">
                        {service.priceRange}
                      </Text>
                    </VStack>
                    <VStack align="start" gap={0}>
                      <Text fontSize="xs" color="gray.500">Delivery</Text>
                      <Text fontWeight="semibold" fontSize="sm">
                        {service.deliveryTime}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack wrap="wrap" gap={1}>
                    {service.skills.map(skill => (
                      <Badge key={skill} size="sm" variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </HStack>

                  <Box height="1px" bg="gray.200" my={3} />

                  <HStack justify="space-between">
                    <HStack gap={2}>
                      <Icon as={FiUsers} color="gray.400" boxSize={4} />
                      <Text fontSize="sm" color="gray.600">
                        {service.providers} providers
                      </Text>
                    </HStack>
                    <Button size="sm" colorPalette="blue" borderRadius="lg">
                      Request Service
                    </Button>
                  </HStack>
                </VStack>
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Top Providers */}
        <MotionBox variants={itemVariants} mb={12}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Top-Rated Providers</Heading>
            <Button 
              variant="ghost"
              onClick={() => router.push('/all-services')}
            >
              View All
              <Icon as={FiChevronRight} ml={1} />
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {topProviders.map((provider, index) => (
              <MotionCard
                key={provider.id}
                variants={itemVariants}
                whileHover={cardHoverVariants.hover}
                p={6}
                borderRadius="xl"
                shadow="md"
                textAlign="center"
                cursor="pointer"
              >
                <Avatar.Root size="xl" mb={4}>
                  <Avatar.Image src={provider.avatar} />
                  <Avatar.Fallback>{provider.name.charAt(0)}</Avatar.Fallback>
                </Avatar.Root>
                <Heading size="md" mb={2}>{provider.name}</Heading>
                <Text color="gray.600" mb={3}>{provider.title}</Text>
                
                <HStack justify="center" mb={3}>
                  <Icon as={FiStar} color="yellow.400" />
                  <Text fontWeight="bold">{provider.rating}</Text>
                  <Text color="gray.500">({provider.completedJobs} completed)</Text>
                </HStack>

                <HStack justify="center" wrap="wrap" gap={1} mb={4}>
                  {provider.badges.map(badge => (
                    <Badge key={badge} size="sm" colorPalette="blue">
                      {badge}
                    </Badge>
                  ))}
                </HStack>

                <Button size="sm" variant="outline" borderRadius="lg" w="full">
                  View Profile
                </Button>
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* CTA Section */}
        <MotionBox
          variants={itemVariants}
          bg="gray.50"
          p={8}
          borderRadius="2xl"
          textAlign="center"
        >
          <Icon as={FiHeart} boxSize={12} color="red.400" mb={4} />
          <Heading size="lg" mb={4}>
            Ready to start your project?
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6} maxW="2xl" mx="auto">
            Join thousands of satisfied customers who found their perfect service provider on Ingenious Plug
          </Text>
          <Button
            size="lg"
            colorPalette="blue"
            borderRadius="xl"
            px={8}
            onClick={() => setIsModalOpen(true)}
          >
            Post Your First Request
          </Button>
        </MotionBox>
      </motion.div>

      {/* Create Request Modal */}
      <CreateRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default ExploreServicesPage;
