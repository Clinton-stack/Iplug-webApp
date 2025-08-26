import {
  FiHome,
  FiSearch,
  FiUser,
  FiMessageSquare,
  FiBriefcase,
  FiAward,
  FiUsers,
  FiBell,
  FiSettings,
  FiTrendingUp,
  FiCreditCard,
  FiFolder,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { UserRole } from "@/contexts/UserRoleContext";

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
  roles?: UserRole[]; // Optional: if not specified, item shows for all roles
  subItems?: NavItem[]; // Optional: for dropdown items
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

// Base navigation data
const baseNavItems: NavSection[] = [
  {
    heading: "Main Navigation",
    items: [
      { label: "Home", href: "/home", icon: FiHome },
      { 
        label: "Explore Services", 
        href: "/explore-services", 
        icon: FiSearch,
        roles: ['Requester'], // Only show for Requester users
        subItems: [
          {
            label: "All Services",
            href: "/all-services",
            icon: FiFolder,
            roles: ['Requester']
          }
        ]
      },
      { label: "Messages", href: "/messages", icon: FiMessageSquare },
      { label: "My Projects", href: "/my-projects", icon: FiFolder },
      { 
        label: "My Jobs", 
        href: "/projects", 
        icon: FiBriefcase,
        roles: ['Provider'] // Only show for Provider role
      },
      {
        label: "Ads / Promotions",
        href: "/ads-promotions",
        icon: FiTrendingUp,
        roles: ['Provider'] // Only show for Provider role
      },
      { label: "Profile", href: "/profile", icon: FiUser },
    ],
  },
  {
    heading: "Finance Center",
    items: [
      { label: "Financial Hub", href: "/financial-hub", icon: FiCreditCard },
    ],
  },
  {
    heading: "Community",
    items: [
      { label: "Badges & Rewards", href: "/badges", icon: FiAward },
      { label: "My Network", href: "/network", icon: FiUsers },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Notifications", href: "/notifications", icon: FiBell },
      { label: "Settings", href: "/settings", icon: FiSettings },
    ],
  },
];

// Function to get navigation items based on user role
export const getNavItems = (userRole: UserRole): NavSection[] => {
  return baseNavItems.map(section => ({
    ...section,
    items: section.items.filter(item => {
      // If no roles specified, show for all roles
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      // Otherwise, check if current role is in the allowed roles
      return item.roles.includes(userRole);
    })
  })).filter(section => section.items.length > 0); // Remove empty sections
};

// Legacy export for backward compatibility (defaults to showing all items)
export const navItems = baseNavItems;
  