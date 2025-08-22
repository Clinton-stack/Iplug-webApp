"use client"

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Text,
  Button,
  Badge,
  Stack,
  HStack,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  FiCamera,
  FiEdit,
  FiStar,
  FiUpload,
  FiUsers,
  FiMail,
  FiUser,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiSave,
  FiX,
  FiPlus,
} from 'react-icons/fi';

// Mock profile data
const mockProfileData = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "",
  coverImage: "",
  title: "Full-Stack Developer & UI/UX Designer",
  bio: "Passionate developer with 5+ years of experience creating beautiful and functional web applications. Specialized in React, Node.js, and modern web technologies.",
  skills: [
    { name: "React", level: "Expert", years: 5 },
    { name: "Node.js", level: "Expert", years: 4 },
    { name: "TypeScript", level: "Advanced", years: 3 },
    { name: "UI/UX Design", level: "Advanced", years: 4 },
    { name: "MongoDB", level: "Intermediate", years: 3 },
    { name: "AWS", level: "Intermediate", years: 2 },
  ],
  rating: 4.9,
  totalReviews: 156,
  completedProjects: 89,
  responseTime: "< 2 hours",
  socialLinks: {
    website: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson"
  },
  gamification: {
    points: 2450,
    level: "Gold",
    badges: [
      { id: 1, name: "Quick Responder", icon: "⚡", description: "Responds within 1 hour", earned: true },
      { id: 2, name: "Top Rated", icon: "⭐", description: "Maintains 4.8+ rating", earned: true },
      { id: 3, name: "Project Master", icon: "🏆", description: "Completed 50+ projects", earned: true },
      { id: 4, name: "Team Player", icon: "🤝", description: "Great collaboration skills", earned: true },
      { id: 5, name: "Innovation Expert", icon: "💡", description: "Innovative solutions", earned: false },
      { id: 6, name: "Mentor", icon: "🎓", description: "Helped 10+ junior developers", earned: false },
    ],
    referrals: 12,
    nextLevelPoints: 3000
  },
  portfolio: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Modern e-commerce platform built with React and Node.js",
      image: "",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates",
      image: "",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      id: 3,
      title: "Mobile Banking UI",
      description: "Modern mobile banking interface design",
      image: "",
      technologies: ["Figma", "UI/UX Design", "Prototyping"],
      liveUrl: "https://example.com",
      githubUrl: ""
    }
  ],
  reviews: [
    {
      id: 1,
      client: "Sarah Wilson",
      rating: 5,
      comment: "Outstanding work! Alex delivered exactly what we needed and went above and beyond. Highly recommended!",
      project: "E-commerce Website",
      date: "2024-02-15"
    },
    {
      id: 2,
      client: "Michael Chen",
      rating: 5,
      comment: "Great communication and excellent technical skills. The project was completed on time and exceeded our expectations.",
      project: "Mobile App Development",
      date: "2024-02-10"
    },
    {
      id: 3,
      client: "Emily Davis",
      rating: 4,
      comment: "Very professional and knowledgeable. Minor delays but the final result was worth it.",
      project: "Web Application",
      date: "2024-02-05"
    }
  ]
};

const skillLevelColors = {
  "Expert": "green",
  "Advanced": "blue",
  "Intermediate": "yellow",
  "Beginner": "gray"
} as const;

type SkillLevel = keyof typeof skillLevelColors;

interface Skill {
  name: string;
  level: SkillLevel;
  years: number;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState(mockProfileData);
  const [newSkill, setNewSkill] = useState({ name: "", level: "Beginner" as SkillLevel, years: 1 });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to an API
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, years: Number(newSkill.years) }]
      }));
      setNewSkill({ name: "", level: "Beginner", years: 1 });
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.name !== skillName)
    }));
  };

  const TabButton = ({ id, label, isActive, onClick }: { 
    id: string; 
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
      {/* Header Section */}
      <Box position="relative" mb={8}>
        {/* Cover Image */}
        <Box
          h="200px"
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          borderRadius="lg"
          position="relative"
          mb={16}
        >
          <Button
            position="absolute"
            top={4}
            right={4}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            <FiCamera size={16} />
            <Text ml={2}>Change Cover</Text>
          </Button>
          
          {/* Profile Photo */}
          <Box
            position="absolute"
            bottom={-16}
            left={8}
            w="32"
            h="32"
            bg="white"
            borderRadius="full"
            p={1}
            shadow="lg"
          >
            <Box
              w="full"
              h="full"
              bg="blue.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              position="relative"
            >
              {profileData.name.split(' ').map(n => n[0]).join('')}
              <Button
                position="absolute"
                bottom={0}
                right={0}
                size="xs"
                borderRadius="full"
                bg="blue.600"
                _hover={{ bg: "blue.700" }}
                minW="auto"
                h="6"
                w="6"
                p={0}
              >
                <FiCamera size={12} />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Profile Info */}
        <Flex justify="space-between" align="start" mt={4}>
          <Box>
            <Heading size="lg" mb={2}>{profileData.name}</Heading>
            <Text fontSize="lg" color="blue.600" mb={2}>{profileData.title}</Text>
            <HStack gap={4} mb={4} color="gray.600" fontSize="sm">
              <HStack gap={1}>
                <FiMapPin size={14} />
                <Text>{profileData.location}</Text>
              </HStack>
              <HStack gap={1}>
                <FiStar size={14} />
                <Text>{profileData.rating} ({profileData.totalReviews} reviews)</Text>
              </HStack>
              <HStack gap={1}>
                <FiUser size={14} />
                <Text>{profileData.completedProjects} projects completed</Text>
              </HStack>
            </HStack>
          </Box>
          
          <Button
            colorScheme="blue"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <><FiX /> Cancel</> : <><FiEdit /> Edit Profile</>}
          </Button>
        </Flex>
      </Box>

      {/* Tabs */}
      <HStack gap={4} mb={6} overflowX="auto">
        <TabButton
          id="overview"
          label="Overview"
          isActive={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <TabButton
          id="portfolio"
          label="Portfolio"
          isActive={activeTab === "portfolio"}
          onClick={() => setActiveTab("portfolio")}
        />
        <TabButton
          id="reviews"
          label="Reviews"
          isActive={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        />
        <TabButton
          id="gamification"
          label="Achievements"
          isActive={activeTab === "gamification"}
          onClick={() => setActiveTab("gamification")}
        />
        <TabButton
          id="settings"
          label="Settings"
          isActive={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </HStack>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <Grid templateColumns="2fr 1fr" gap={8}>
          <Stack gap={6}>
            {/* About Section */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">About</Heading>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <FiEdit size={14} />
                  </Button>
                )}
              </Flex>
              {isEditing ? (
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  resize="vertical"
                />
              ) : (
                <Text color="gray.700" lineHeight="1.6">{profileData.bio}</Text>
              )}
            </Box>

            {/* Skills Section */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Skills & Expertise</Heading>
                {isEditing && (
                  <Button size="sm" colorScheme="blue" onClick={handleAddSkill}>
                    <FiPlus size={14} />
                    <Text ml={2}>Add Skill</Text>
                  </Button>
                )}
              </Flex>
              
              {isEditing && (
                <Box mb={4} p={4} bg="gray.50" borderRadius="md">
                  <Grid templateColumns="2fr 1fr 1fr auto" gap={3} alignItems="end">
                    <Box>
                      <Text fontSize="sm" mb={1}>Skill Name</Text>
                      <Input
                        placeholder="e.g., React"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                        size="sm"
                      />
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>Level</Text>
                      <select
                        value={newSkill.level}
                        onChange={(e: any) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          fontSize: '14px',
                          width: '100%'
                        }}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>Years</Text>
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        value={newSkill.years}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, years: parseInt(e.target.value) || 1 }))}
                        size="sm"
                      />
                    </Box>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={handleAddSkill}
                      disabled={!newSkill.name.trim()}
                    >
                      Add
                    </Button>
                  </Grid>
                </Box>
              )}

              <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={3}>
                {profileData.skills.map((skill) => (
                  <Flex
                    key={skill.name}
                    justify="space-between"
                    align="center"
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Box flex="1">
                      <Text fontWeight="medium" fontSize="sm">{skill.name}</Text>
                      <HStack gap={2} mt={1}>
                        <Badge colorScheme={skillLevelColors[skill.level as SkillLevel]} size="sm">
                          {skill.level}
                        </Badge>
                        <Text fontSize="xs" color="gray.600">
                          {skill.years} year{skill.years !== 1 ? 's' : ''}
                        </Text>
                      </HStack>
                    </Box>
                    {isEditing && (
                      <Button
                        size="xs"
                        variant="ghost"
                        color="red.500"
                        onClick={() => handleRemoveSkill(skill.name)}
                      >
                        <FiX size={12} />
                      </Button>
                    )}
                  </Flex>
                ))}
              </Grid>
            </Box>
          </Stack>

          <Stack gap={6}>
            {/* Quick Stats */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Quick Stats</Heading>
              <Stack gap={4}>
                <Flex justify="space-between">
                  <Text color="gray.600">Rating</Text>
                  <HStack gap={1}>
                    <Text fontWeight="bold">{profileData.rating}</Text>
                    <FiStar color="#F6AD55" size={16} />
                  </HStack>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">Projects Completed</Text>
                  <Text fontWeight="bold">{profileData.completedProjects}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">Total Reviews</Text>
                  <Text fontWeight="bold">{profileData.totalReviews}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">Response Time</Text>
                  <Text fontWeight="bold">{profileData.responseTime}</Text>
                </Flex>
              </Stack>
            </Box>

            {/* Contact Info */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Contact & Social</Heading>
              <Stack gap={3}>
                <HStack gap={3}>
                  <FiMail color="#666" size={16} />
                  <Text fontSize="sm">{profileData.email}</Text>
                </HStack>
                <HStack gap={3}>
                  <FiPhone color="#666" size={16} />
                  <Text fontSize="sm">{profileData.phone}</Text>
                </HStack>
                {profileData.socialLinks.website && (
                  <HStack gap={3}>
                    <FiGlobe color="#666" size={16} />
                    <Text fontSize="sm" color="blue.600" cursor="pointer">
                      {profileData.socialLinks.website}
                    </Text>
                  </HStack>
                )}
                <HStack gap={4} mt={2}>
                  {profileData.socialLinks.linkedin && (
                    <Button size="sm" variant="ghost" color="blue.600">
                      <FiLinkedin size={16} />
                    </Button>
                  )}
                  {profileData.socialLinks.github && (
                    <Button size="sm" variant="ghost" color="gray.600">
                      <FiGithub size={16} />
                    </Button>
                  )}
                  {profileData.socialLinks.twitter && (
                    <Button size="sm" variant="ghost" color="blue.400">
                      <FiTwitter size={16} />
                    </Button>
                  )}
                </HStack>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      )}

      {activeTab === "portfolio" && (
        <Box>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg">Portfolio</Heading>
            <Button colorScheme="blue">
              <FiUpload />
              <Text ml={2}>Add Project</Text>
            </Button>
          </Flex>
          
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            {profileData.portfolio.map((project) => (
              <Box
                key={project.id}
                bg="white"
                borderRadius="lg"
                shadow="sm"
                border="1px solid"
                borderColor="gray.200"
                overflow="hidden"
                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <Box h="200px" bg="gray.100" position="relative">
                  <Flex
                    align="center"
                    justify="center"
                    h="full"
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    color="white"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    {project.title.split(' ').map(w => w[0]).join('')}
                  </Flex>
                </Box>
                
                <Box p={4}>
                  <Heading size="sm" mb={2}>{project.title}</Heading>
                  <Text 
                    fontSize="sm" 
                    color="gray.600" 
                    mb={3} 
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {project.description}
                  </Text>
                  
                  <Flex wrap="wrap" gap={1} mb={3}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} size="sm" variant="outline">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge size="sm" variant="outline">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </Flex>
                  
                  <HStack gap={2}>
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" flex="1">
                        <FiGlobe size={14} />
                        <Text ml={1}>Live</Text>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" flex="1">
                        <FiGithub size={14} />
                        <Text ml={1}>Code</Text>
                      </Button>
                    )}
                  </HStack>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === "reviews" && (
        <Box>
          <Heading size="lg" mb={6}>Reviews & Ratings</Heading>
          
          <Grid templateColumns="1fr 2fr" gap={8}>
            {/* Rating Summary */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Text textAlign="center" fontSize="4xl" fontWeight="bold" color="blue.600">
                {profileData.rating}
              </Text>
              <HStack justify="center" mb={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={20}
                    color={star <= Math.floor(profileData.rating) ? "#F6AD55" : "#E2E8F0"}
                    fill={star <= Math.floor(profileData.rating) ? "#F6AD55" : "none"}
                  />
                ))}
              </HStack>
              <Text textAlign="center" color="gray.600" fontSize="sm">
                Based on {profileData.totalReviews} reviews
              </Text>
              
              <Stack gap={2} mt={6}>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <HStack key={rating} gap={2}>
                    <Text fontSize="sm" minW="8">{rating}★</Text>
                    <Box flex="1" h="2" bg="gray.200" borderRadius="full" overflow="hidden">
                      <Box
                        h="full"
                        bg="yellow.400"
                        borderRadius="full"
                        style={{ 
                          width: `${rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}%` 
                        }}
                      />
                    </Box>
                    <Text fontSize="sm" color="gray.600" minW="8">
                      {rating === 5 ? '124' : rating === 4 ? '23' : '9'}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Box>

            {/* Recent Reviews */}
            <Stack gap={4}>
              {profileData.reviews.map((review) => (
                <Box
                  key={review.id}
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  shadow="sm"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Flex justify="space-between" align="start" mb={3}>
                    <Box>
                      <Text fontWeight="medium">{review.client}</Text>
                      <Text fontSize="sm" color="gray.600">{review.project}</Text>
                    </Box>
                    <HStack gap={1}>
                      <HStack gap={0}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            size={14}
                            color={star <= review.rating ? "#F6AD55" : "#E2E8F0"}
                            fill={star <= review.rating ? "#F6AD55" : "none"}
                          />
                        ))}
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </Flex>
                  <Text color="gray.700" fontSize="sm" lineHeight="1.5">
                    {review.comment}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Box>
      )}

      {activeTab === "gamification" && (
        <Box>
          <Heading size="lg" mb={6}>Achievements & Gamification</Heading>
          
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
            {/* Level & Points */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Level & Points</Heading>
              <Flex align="center" gap={4} mb={4}>
                <Box
                  w="16"
                  h="16"
                  bg="gradient.to.r"
                  bgGradient="linear(to-r, yellow.400, orange.500)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                >
                  {profileData.gamification.level[0]}
                </Box>
                <Box flex="1">
                  <Text fontSize="xl" fontWeight="bold">{profileData.gamification.level} Level</Text>
                  <Text color="gray.600">{profileData.gamification.points} points</Text>
                </Box>
              </Flex>
              
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm">Progress to next level</Text>
                  <Text fontSize="sm" color="gray.600">
                    {profileData.gamification.points}/{profileData.gamification.nextLevelPoints}
                  </Text>
                </Flex>
                <Box w="full" h="2" bg="gray.200" borderRadius="full" overflow="hidden">
                  <Box
                    h="full"
                    bg="blue.500"
                    borderRadius="full"
                    style={{ 
                      width: `${(profileData.gamification.points / profileData.gamification.nextLevelPoints) * 100}%` 
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Referrals */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Referrals</Heading>
              <Flex align="center" justify="center" direction="column">
                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                  {profileData.gamification.referrals}
                </Text>
                <Text color="gray.600" mb={4}>Successful Referrals</Text>
                <Button size="sm" colorScheme="green">
                  <FiUsers />
                  <Text ml={2}>Invite Friends</Text>
                </Button>
              </Flex>
            </Box>

            {/* Badges */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200" gridColumn={{ base: "1", lg: "1 / -1" }}>
              <Heading size="md" mb={4}>Badges & Achievements</Heading>
              <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
                {profileData.gamification.badges.map((badge) => (
                  <Box
                    key={badge.id}
                    p={4}
                    bg={badge.earned ? "blue.50" : "gray.50"}
                    border="2px solid"
                    borderColor={badge.earned ? "blue.200" : "gray.200"}
                    borderRadius="lg"
                    textAlign="center"
                    opacity={badge.earned ? 1 : 0.6}
                  >
                    <Text fontSize="3xl" mb={2}>{badge.icon}</Text>
                    <Text fontWeight="bold" mb={1}>{badge.name}</Text>
                    <Text fontSize="sm" color="gray.600">{badge.description}</Text>
                    {badge.earned && (
                      <Badge colorScheme="green" size="sm" mt={2}>
                        Earned
                      </Badge>
                    )}
                  </Box>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}

      {activeTab === "settings" && (
        <Box>
          <Heading size="lg" mb={6}>Account Settings</Heading>
          
          <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
            {/* Personal Information */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Personal Information</Heading>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Full Name</Text>
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Professional Title</Text>
                  <Input
                    value={profileData.title}
                    onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Phone Number</Text>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Location</Text>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </Box>
                <Button colorScheme="blue">
                  <FiSave />
                  <Text ml={2}>Save Changes</Text>
                </Button>
              </Stack>
            </Box>

            {/* Account Security */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Account Security</Heading>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Email Address</Text>
                  <HStack>
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      flex="1"
                    />
                    <Button size="sm" variant="outline">
                      Verify
                    </Button>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Password</Text>
                  <HStack>
                    <Input type="password" value="••••••••" readOnly flex="1" />
                    <Button size="sm" variant="outline">
                      Change
                    </Button>
                  </HStack>
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Two-Factor Authentication</Text>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Add an extra layer of security</Text>
                    <Button size="sm" colorScheme="green">
                      Enable 2FA
                    </Button>
                  </HStack>
                </Box>
              </Stack>
            </Box>

            {/* Social Links */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" border="1px solid" borderColor="gray.200">
              <Heading size="md" mb={4}>Social Links</Heading>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">Website</Text>
                  <Input
                    value={profileData.socialLinks.website}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, website: e.target.value }
                    }))}
                    placeholder="https://yourwebsite.com"
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">LinkedIn</Text>
                  <Input
                    value={profileData.socialLinks.linkedin}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                    }))}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="medium">GitHub</Text>
                  <Input
                    value={profileData.socialLinks.github}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, github: e.target.value }
                    }))}
                    placeholder="https://github.com/yourusername"
                  />
                </Box>
                <Button colorScheme="blue">
                  <FiSave />
                  <Text ml={2}>Update Links</Text>
                </Button>
              </Stack>
            </Box>

            {/* Danger Zone */}
            <Box bg="red.50" border="2px solid" borderColor="red.200" p={6} borderRadius="lg">
              <Heading size="md" color="red.700" mb={4}>Danger Zone</Heading>
              <Stack gap={4}>
                <Box>
                  <Text fontWeight="medium" color="red.700" mb={1}>Deactivate Account</Text>
                  <Text fontSize="sm" color="red.600" mb={2}>
                    Temporarily disable your account. You can reactivate it anytime.
                  </Text>
                  <Button size="sm" colorScheme="red" variant="outline">
                    Deactivate Account
                  </Button>
                </Box>
                <Box>
                  <Text fontWeight="medium" color="red.700" mb={1}>Delete Account</Text>
                  <Text fontSize="sm" color="red.600" mb={2}>
                    Permanently delete your account and all associated data. This cannot be undone.
                  </Text>
                  <Button size="sm" colorScheme="red">
                    Delete Account
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Box>
      )}

      {/* Save Button for Edit Mode */}
      {isEditing && (
        <Box position="fixed" bottom={6} right={6} zIndex={1000}>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleSaveProfile}
            shadow="lg"
          >
            <FiSave />
            <Text ml={2}>Save All Changes</Text>
          </Button>
        </Box>
      )}
    </Box>
  );
}
