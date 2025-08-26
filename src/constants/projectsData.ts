// TypeScript interfaces
export interface Provider {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  completedProjects: number;
}

export interface Requester {
  id: number;
  name: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: string;
  completedDate?: string;
  progress?: number;
}

export interface Dispute {
  id: number;
  reason: string;
  raisedDate: string;
  status: string;
  mediatorAssigned: boolean;
}

export interface ProjectRating {
  score: number;
  comment: string;
  date: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  status: string;
  type: string;
  budgetType: string;
  totalBudget: number;
  hourlyRate?: number;
  estimatedHours?: number;
  startDate: string | null;
  dueDate: string | null;
  completedDate?: string;
  proposalsReceived?: number;
  provider: Provider | null;
  requester: Requester;
  teamMembers?: TeamMember[];
  milestones?: Milestone[];
  overallProgress: number;
  messages: number;
  files: number;
  aiAssistantEnabled: boolean;
  rating?: ProjectRating;
  dispute?: Dispute;
  lastActivity: string;
  createdAt: string;
}

// Project status constants
export const PROJECT_STATUS = {
  DRAFT: 'Draft',
  OPEN: 'Open',
  PROPOSAL_RECEIVED: 'Proposal Received',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  DISPUTED: 'Disputed',
  CANCELLED: 'Cancelled'
};

export const PROJECT_TYPES = {
  MANUAL: 'Manual Request',
  AI_SMART: 'AI Smart Request'
};

export const MILESTONE_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  REVIEWED: 'Reviewed'
};

export const BUDGET_TYPES = {
  FIXED: 'Fixed Price',
  HOURLY: 'Hourly Rate',
  MILESTONE: 'Milestone Based'
};

// Mock data for projects with comprehensive details
export const mockProjectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description: "Full-stack e-commerce platform with payment integration, user authentication, and admin dashboard",
    category: "Web Development",
    subcategory: "E-commerce",
    status: PROJECT_STATUS.IN_PROGRESS,
    type: PROJECT_TYPES.AI_SMART,
    budgetType: BUDGET_TYPES.MILESTONE,
    totalBudget: 5000,
    startDate: "2024-01-15",
    dueDate: "2024-03-15",
    provider: {
      id: 101,
      name: "Sarah Johnson",
      avatar: "/images/avatars/sarah.jpg",
      rating: 4.9,
      completedProjects: 87
    },
    requester: {
      id: 201,
      name: "Mike Chen"
    },
    teamMembers: [
      { id: 301, name: "Alex Rodriguez", role: "Frontend Developer" },
      { id: 302, name: "Emma Wilson", role: "UI/UX Designer" }
    ],
    milestones: [
      {
        id: 1,
        title: "Project Setup & Planning",
        description: "Initial setup, requirements gathering, and project planning",
        amount: 1000,
        dueDate: "2024-01-25",
        status: MILESTONE_STATUS.COMPLETED,
        completedDate: "2024-01-24"
      },
      {
        id: 2,
        title: "Frontend Development",
        description: "Complete responsive frontend with user interface",
        amount: 2000,
        dueDate: "2024-02-15",
        status: MILESTONE_STATUS.IN_PROGRESS,
        progress: 75
      },
      {
        id: 3,
        title: "Backend & API Integration",
        description: "Server setup, database design, and API development",
        amount: 1500,
        dueDate: "2024-02-28",
        status: MILESTONE_STATUS.PENDING
      },
      {
        id: 4,
        title: "Testing & Deployment",
        description: "Quality assurance, testing, and production deployment",
        amount: 500,
        dueDate: "2024-03-15",
        status: MILESTONE_STATUS.PENDING
      }
    ],
    overallProgress: 65,
    messages: 28,
    files: 12,
    aiAssistantEnabled: true,
    lastActivity: "2024-02-10T10:30:00Z",
    createdAt: "2024-01-10T09:00:00Z"
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    description: "Modern mobile app design for fitness tracking with dark/light modes",
    category: "Design",
    subcategory: "Mobile App Design",
    status: PROJECT_STATUS.COMPLETED,
    type: PROJECT_TYPES.MANUAL,
    budgetType: BUDGET_TYPES.FIXED,
    totalBudget: 3000,
    startDate: "2024-01-01",
    dueDate: "2024-02-01",
    completedDate: "2024-01-30",
    provider: {
      id: 102,
      name: "David Park",
      avatar: "/images/avatars/david.jpg",
      rating: 4.8,
      completedProjects: 156
    },
    requester: {
      id: 201,
      name: "Mike Chen"
    },
    milestones: [
      {
        id: 5,
        title: "User Research & Wireframes",
        description: "User research, wireframing, and initial concepts",
        amount: 1000,
        dueDate: "2024-01-08",
        status: MILESTONE_STATUS.COMPLETED,
        completedDate: "2024-01-07"
      },
      {
        id: 6,
        title: "High-Fidelity Designs",
        description: "Complete UI designs for all screens",
        amount: 1500,
        dueDate: "2024-01-20",
        status: MILESTONE_STATUS.COMPLETED,
        completedDate: "2024-01-19"
      },
      {
        id: 7,
        title: "Design System & Assets",
        description: "Design system documentation and exported assets",
        amount: 500,
        dueDate: "2024-01-30",
        status: MILESTONE_STATUS.COMPLETED,
        completedDate: "2024-01-30"
      }
    ],
    overallProgress: 100,
    messages: 15,
    files: 25,
    aiAssistantEnabled: false,
    rating: {
      score: 5,
      comment: "Outstanding work! Exceeded expectations in every way. The designs are modern, user-friendly, and perfectly aligned with our brand.",
      date: "2024-02-02"
    },
    lastActivity: "2024-02-02T14:20:00Z",
    createdAt: "2023-12-28T11:00:00Z"
  },
  {
    id: 3,
    title: "Brand Identity Package",
    description: "Complete brand identity including logo, guidelines, marketing materials, and brand assets",
    category: "Design",
    subcategory: "Brand Design",
    status: PROJECT_STATUS.DISPUTED,
    type: PROJECT_TYPES.MANUAL,
    budgetType: BUDGET_TYPES.MILESTONE,
    totalBudget: 2500,
    startDate: "2024-01-10",
    dueDate: "2024-02-10",
    provider: {
      id: 103,
      name: "Lisa Thompson",
      avatar: "/images/avatars/lisa.jpg",
      rating: 4.6,
      completedProjects: 43
    },
    requester: {
      id: 201,
      name: "Mike Chen"
    },
    milestones: [
      {
        id: 8,
        title: "Logo Design",
        description: "Primary logo design with variations",
        amount: 800,
        dueDate: "2024-01-20",
        status: MILESTONE_STATUS.COMPLETED,
        completedDate: "2024-01-19"
      },
      {
        id: 9,
        title: "Brand Guidelines",
        description: "Comprehensive brand guidelines document",
        amount: 700,
        dueDate: "2024-01-30",
        status: MILESTONE_STATUS.COMPLETED,
        completedDate: "2024-01-29"
      },
      {
        id: 10,
        title: "Marketing Materials",
        description: "Business cards, letterhead, and promotional materials",
        amount: 1000,
        dueDate: "2024-02-10",
        status: MILESTONE_STATUS.REVIEWED,
        completedDate: "2024-02-08"
      }
    ],
    overallProgress: 80,
    messages: 42,
    files: 18,
    aiAssistantEnabled: true,
    dispute: {
      id: 501,
      reason: "Client unhappy with final marketing materials quality and requested major revisions beyond scope",
      raisedDate: "2024-02-12",
      status: "Under Review",
      mediatorAssigned: true
    },
    lastActivity: "2024-02-12T16:45:00Z",
    createdAt: "2024-01-05T08:30:00Z"
  },
  {
    id: 4,
    title: "SEO Optimization & Content Strategy",
    description: "Complete SEO audit, keyword research, and content strategy for business website",
    category: "Digital Marketing",
    subcategory: "SEO",
    status: PROJECT_STATUS.PROPOSAL_RECEIVED,
    type: PROJECT_TYPES.AI_SMART,
    budgetType: BUDGET_TYPES.HOURLY,
    totalBudget: 1800,
    hourlyRate: 75,
    estimatedHours: 24,
    startDate: "2024-02-15",
    dueDate: "2024-03-15",
    proposalsReceived: 3,
    provider: null, // Not hired yet
    requester: {
      id: 201,
      name: "Mike Chen"
    },
    milestones: [
      {
        id: 11,
        title: "SEO Audit",
        description: "Complete technical and content SEO audit",
        amount: 600,
        dueDate: "2024-02-25",
        status: MILESTONE_STATUS.PENDING
      },
      {
        id: 12,
        title: "Keyword Research",
        description: "Comprehensive keyword research and competitor analysis",
        amount: 500,
        dueDate: "2024-03-05",
        status: MILESTONE_STATUS.PENDING
      },
      {
        id: 13,
        title: "Content Strategy",
        description: "Content calendar and optimization recommendations",
        amount: 700,
        dueDate: "2024-03-15",
        status: MILESTONE_STATUS.PENDING
      }
    ],
    overallProgress: 0,
    messages: 5,
    files: 2,
    aiAssistantEnabled: true,
    lastActivity: "2024-02-08T12:15:00Z",
    createdAt: "2024-02-01T10:00:00Z"
  },
  {
    id: 5,
    title: "WordPress Website Redesign",
    description: "Complete redesign of existing WordPress website with modern design and improved functionality",
    category: "Web Development",
    subcategory: "WordPress",
    status: PROJECT_STATUS.DRAFT,
    type: PROJECT_TYPES.MANUAL,
    budgetType: BUDGET_TYPES.FIXED,
    totalBudget: 2200,
    startDate: null,
    dueDate: null,
    provider: null,
    requester: {
      id: 201,
      name: "Mike Chen"
    },
    milestones: [],
    overallProgress: 0,
    messages: 0,
    files: 3,
    aiAssistantEnabled: false,
    lastActivity: "2024-02-05T09:30:00Z",
    createdAt: "2024-02-05T09:30:00Z"
  }
];

// Status colors for UI
export const statusColors: Record<string, string> = {
  [PROJECT_STATUS.DRAFT]: 'gray',
  [PROJECT_STATUS.OPEN]: 'blue',
  [PROJECT_STATUS.PROPOSAL_RECEIVED]: 'purple',
  [PROJECT_STATUS.IN_PROGRESS]: 'orange',
  [PROJECT_STATUS.COMPLETED]: 'green',
  [PROJECT_STATUS.DISPUTED]: 'red',
  [PROJECT_STATUS.CANCELLED]: 'gray'
};

// Filter options
export const filterOptions = {
  status: Object.values(PROJECT_STATUS),
  categories: [
    'Web Development',
    'Mobile Development',
    'Design',
    'Digital Marketing',
    'Content Writing',
    'Data Analytics',
    'Consulting'
  ],
  budgetTypes: Object.values(BUDGET_TYPES)
};
