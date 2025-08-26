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
  Breadcrumb,
} from "@chakra-ui/react";
import { 
  FiSearch,
  FiStar,
  FiClock,
  FiDollarSign,
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useUserRole } from "@/contexts/UserRoleContext";
import AccessRestriction from "@/components/ui/AccessRestriction";
import CreateRequestModal from "@/components/modals/CreateRequestModal";
import Link from "next/link";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card.Root);

// Service Categories Data
const serviceCategories = [
  { 
    id: 'technology', 
    name: 'Technology & Digital', 
    icon: '💻', 
    color: 'blue', 
    description: 'Web development, mobile apps, software solutions',
    count: 245 
  },
  { 
    id: 'creative', 
    name: 'Creative Services', 
    icon: '🎨', 
    color: 'purple', 
    description: 'Design, photography, video editing, content creation',
    count: 189 
  },
  { 
    id: 'writing', 
    name: 'Writing & Content', 
    icon: '✍️', 
    color: 'green', 
    description: 'Copywriting, content writing, translation, editing',
    count: 167 
  },
  { 
    id: 'marketing', 
    name: 'Marketing & Sales', 
    icon: '📊', 
    color: 'orange', 
    description: 'Digital marketing, SEO, social media, advertising',
    count: 143 
  },
  { 
    id: 'business', 
    name: 'Business Services', 
    icon: '💼', 
    color: 'teal', 
    description: 'Consulting, accounting, legal, project management',
    count: 198 
  },
  { 
    id: 'education', 
    name: 'Education & Training', 
    icon: '🎓', 
    color: 'indigo', 
    description: 'Tutoring, course creation, training, coaching',
    count: 134 
  },
  { 
    id: 'lifestyle', 
    name: 'Lifestyle & Health', 
    icon: '🏃‍♂️', 
    color: 'pink', 
    description: 'Fitness training, nutrition, wellness, personal care',
    count: 92 
  },
  { 
    id: 'events', 
    name: 'Events & Entertainment', 
    icon: '🎉', 
    color: 'yellow', 
    description: 'Event planning, entertainment, catering, photography',
    count: 156 
  }
];

// Sample services data organized by category
const servicesByCategory: Record<string, any[]> = {
  technology: [
    {
      id: 1,
      title: 'Custom Web Application Development',
      provider: 'TechSolutions Pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviews: 127,
      priceFrom: 150000,
      deliveryTime: '2-4 weeks',
      description: 'Full-stack web applications with modern frameworks',
      skills: ['React', 'Node.js', 'MongoDB'],
      verified: true
    },
    {
      id: 2,
      title: 'Mobile App Development (iOS & Android)',
      provider: 'AppCraft Studio',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      reviews: 89,
      priceFrom: 200000,
      deliveryTime: '3-6 weeks',
      description: 'Native and cross-platform mobile applications',
      skills: ['React Native', 'Flutter', 'Swift'],
      verified: true
    },
    {
      id: 3,
      title: 'E-commerce Website with Payment Integration',
      provider: 'DigitalCommerce Ltd',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      rating: 4.7,
      reviews: 156,
      priceFrom: 120000,
      deliveryTime: '2-3 weeks',
      description: 'Complete online store with secure payment processing',
      skills: ['Shopify', 'WooCommerce', 'Stripe'],
      verified: false
    }
  ],
  creative: [
    {
      id: 4,
      title: 'Professional Brand Identity Design',
      provider: 'Creative Minds Co',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5.0,
      reviews: 203,
      priceFrom: 50000,
      deliveryTime: '1-2 weeks',
      description: 'Complete brand package: logo, colors, typography, guidelines',
      skills: ['Logo Design', 'Branding', 'Adobe Creative Suite'],
      verified: true
    },
    {
      id: 5,
      title: 'Wedding Photography & Videography',
      provider: 'Moment Capture Studios',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b586?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviews: 78,
      priceFrom: 80000,
      deliveryTime: '2-3 days',
      description: 'Professional wedding photography with same-day highlights',
      skills: ['Photography', 'Videography', 'Photo Editing'],
      verified: true
    }
  ],
  writing: [
    {
      id: 6,
      title: 'SEO Content Writing & Blog Posts',
      provider: 'WordCraft Writers',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      reviews: 234,
      priceFrom: 15000,
      deliveryTime: '3-5 days',
      description: 'High-quality, SEO-optimized content for websites and blogs',
      skills: ['SEO Writing', 'Research', 'WordPress'],
      verified: true
    }
  ],
  marketing: [
    {
      id: 7,
      title: 'Social Media Marketing Campaign',
      provider: 'Digital Growth Agency',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 4.6,
      reviews: 167,
      priceFrom: 75000,
      deliveryTime: '1-2 weeks',
      description: 'Complete social media strategy and content creation',
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      verified: false
    }
  ],
  business: [
    {
      id: 8,
      title: 'Business Plan Development',
      provider: 'Strategy Consultants',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviews: 92,
      priceFrom: 100000,
      deliveryTime: '1-2 weeks',
      description: 'Comprehensive business plan with financial projections',
      skills: ['Business Strategy', 'Financial Planning', 'Market Research'],
      verified: true
    }
  ],
  education: [
    {
      id: 9,
      title: 'Online Course Creation & Setup',
      provider: 'EduTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4.7,
      reviews: 145,
      priceFrom: 80000,
      deliveryTime: '2-3 weeks',
      description: 'Complete online course with video content and assessments',
      skills: ['Course Design', 'Video Production', 'LMS Setup'],
      verified: true
    }
  ],
  lifestyle: [
    {
      id: 10,
      title: 'Personal Fitness Training Program',
      provider: 'FitLife Coaches',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      reviews: 189,
      priceFrom: 25000,
      deliveryTime: '1 week',
      description: 'Customized workout plan with nutrition guidance',
      skills: ['Fitness Training', 'Nutrition Planning', 'Goal Setting'],
      verified: false
    }
  ],
  events: [
    {
      id: 11,
      title: 'Corporate Event Planning & Management',
      provider: 'Premier Events Co',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviews: 234,
      priceFrom: 150000,
      deliveryTime: '2-4 weeks',
      description: 'End-to-end corporate event planning and execution',
      skills: ['Event Planning', 'Vendor Management', 'Project Coordination'],
      verified: true
    }
  ]
};

const AllServicesPage: React.FC = () => {
  const { userRole } = useUserRole();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Role-based access control - only Requesters can access this page
  if (userRole !== 'Requester') {
    return (
      <AccessRestriction
        requiredRole="Requester"
        pageName="All Services"
        description="The All Services page is where you can browse all available services by category. Switch to Requester mode to explore and hire service providers."
      />
    );
  }

  // Get all services or filtered by category
  const getAllServices = () => {
    if (selectedCategory === 'all') {
      return Object.values(servicesByCategory).flat();
    }
    return servicesByCategory[selectedCategory] || [];
  };

  // Filter services by search term
  const filteredServices = getAllServices().filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container maxW="7xl" py={8}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb Navigation */}
        <MotionBox variants={itemVariants} mb={6}>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link asChild>
                  <Link href="/home">Dashboard</Link>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link asChild>
                  <Link href="/explore-services">Explore Services</Link>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Breadcrumb.Link>All Services</Breadcrumb.Link>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </MotionBox>

        {/* Header */}
        <MotionBox variants={itemVariants} mb={8}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={4} mb={4}>
            <Box>
              <Heading size="xl" color="gray.800" mb={2}>
                All Services
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Browse {Object.values(servicesByCategory).flat().length}+ services across {serviceCategories.length} categories
              </Text>
            </Box>
            <Button
              colorPalette="blue"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Post a Request
            </Button>
          </Flex>
        </MotionBox>

        {/* Search and Filters */}
        <MotionBox variants={itemVariants} mb={8}>
          <VStack gap={4} align="stretch">
            {/* Search Bar */}
            <Flex gap={4} align="center">
              <Box position="relative" flex="1">
                <Icon
                  as={FiSearch}
                  position="absolute"
                  left="12px"
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.400"
                  zIndex={2}
                />
                <Input
                  placeholder="Search services, providers, or skills..."
                  pl="40px"
                  size="lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              <Button variant="outline" size="lg">
                <FiFilter />
                Filter
              </Button>
              <HStack>
                <Button
                  variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                  size="lg"
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'solid' : 'ghost'}
                  size="lg"
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </Button>
              </HStack>
            </Flex>

            {/* Category Filter Buttons */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={4} color="gray.700">
                Browse by Category:
              </Text>
              <Box
                p={4}
                bg="gray.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
              >
                <Flex gap={3} wrap="wrap" justify="flex-start">
                  <Button
                    size="md"
                    variant={selectedCategory === 'all' ? 'solid' : 'outline'}
                    colorPalette="blue"
                    onClick={() => setSelectedCategory('all')}
                    fontWeight="semibold"
                  >
                    All Categories ({Object.values(servicesByCategory).flat().length})
                  </Button>
                  {serviceCategories.map((category) => (
                    <Button
                      key={category.id}
                      size="md"
                      variant={selectedCategory === category.id ? 'solid' : 'outline'}
                      colorPalette={category.color}
                      onClick={() => setSelectedCategory(category.id)}
                      fontWeight="semibold"
                    >
                      <Text mr={2}>{category.icon}</Text>
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Box>
          </VStack>
        </MotionBox>

        {/* Services Grid/List */}
        <MotionBox variants={itemVariants}>
          {/* Results Summary */}
          <Flex justify="space-between" align="center" mb={6}>
            <Box>
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                {selectedCategory !== 'all' && (
                  <Text as="span" color="gray.600" fontSize="md" ml={2}>
                    in {serviceCategories.find(cat => cat.id === selectedCategory)?.name}
                  </Text>
                )}
              </Text>
              {searchTerm && (
                <Text fontSize="sm" color="gray.500">
                  Searching for: "{searchTerm}"
                  <Button
                    variant="ghost"
                    size="sm"
                    ml={2}
                    onClick={() => setSearchTerm('')}
                    color="blue.500"
                  >
                    Clear
                  </Button>
                </Text>
              )}
            </Box>
            <HStack>
              {(selectedCategory !== 'all' || searchTerm) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  color="gray.500"
                >
                  Clear All Filters
                </Button>
              )}
              <Text fontSize="sm" color="gray.500">Sort by:</Text>
              <Button variant="ghost" size="sm">
                Relevance
              </Button>
            </HStack>
          </Flex>

          {filteredServices.length === 0 ? (
            <Box textAlign="center" py={16}>
              <Text fontSize="xl" color="gray.500" mb={4}>
                No services found
              </Text>
              <Text color="gray.400">
                Try adjusting your search or category filter
              </Text>
            </Box>
          ) : (
            <SimpleGrid 
              columns={{ base: 1, md: viewMode === 'grid' ? 2 : 1, lg: viewMode === 'grid' ? 3 : 1 }} 
              gap={6}
            >
              {filteredServices.map((service) => (
                <MotionCard
                  key={service.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card.Body p={6}>
                    {/* Provider Info */}
                    <Flex align="center" mb={4}>
                      <Avatar.Root size="md" mr={3}>
                        <Avatar.Image src={service.avatar} alt={service.provider} />
                        <Avatar.Fallback>{service.provider.charAt(0)}</Avatar.Fallback>
                      </Avatar.Root>
                      <Box flex="1">
                        <Text fontWeight="semibold" color="gray.800">
                          {service.provider}
                        </Text>
                        <HStack>
                          <Icon as={FiStar} color="yellow.400" boxSize={4} />
                          <Text fontWeight="bold" fontSize="sm">
                            {service.rating}
                          </Text>
                          <Text color="gray.500" fontSize="sm">
                            ({service.reviews} reviews)
                          </Text>
                          {service.verified && (
                            <Badge colorPalette="blue" size="sm">
                              Verified
                            </Badge>
                          )}
                        </HStack>
                      </Box>
                    </Flex>

                    {/* Service Info */}
                    <Heading size="md" mb={2} color="gray.800">
                      {service.title}
                    </Heading>
                    
                    <Text color="gray.600" mb={4} lineHeight="1.5">
                      {service.description}
                    </Text>

                    {/* Skills */}
                    <Flex wrap="wrap" gap={2} mb={4}>
                      {service.skills.slice(0, 3).map((skill: string) => (
                        <Badge key={skill} colorPalette="gray" size="sm">
                          {skill}
                        </Badge>
                      ))}
                      {service.skills.length > 3 && (
                        <Badge colorPalette="gray" size="sm">
                          +{service.skills.length - 3} more
                        </Badge>
                      )}
                    </Flex>

                    {/* Price and Delivery */}
                    <Flex justify="space-between" align="center" mb={4}>
                      <HStack>
                        <Icon as={FiDollarSign} color="green.500" />
                        <Text fontWeight="bold" color="gray.800">
                          From {formatPrice(service.priceFrom)}
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiClock} color="gray.400" />
                        <Text fontSize="sm" color="gray.600">
                          {service.deliveryTime}
                        </Text>
                      </HStack>
                    </Flex>

                    {/* Action Button */}
                    <Button colorPalette="blue" size="md" w="full">
                      View Details & Hire
                    </Button>
                  </Card.Body>
                </MotionCard>
              ))}
            </SimpleGrid>
          )}
        </MotionBox>
      </motion.div>

      {/* Create Request Modal */}
      <CreateRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
};

export default AllServicesPage;
