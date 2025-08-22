import {
    FiHome,
    FiSearch,
    FiUser,
    FiMessageSquare,
    FiBriefcase,
    FiDollarSign,
    FiAward,
    FiUsers,
    FiBell,
    FiSettings,
  } from "react-icons/fi";
  import { IconType } from "react-icons";

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}
  
export const navItems: NavSection[] = [
    {
      heading: "Main Navigation",
      items: [
        { label: "Home", href: "/home", icon: FiHome },
        { label: "Explore Services", href: "/explore-services", icon: FiSearch },
        { label: "Messages", href: "/messages", icon: FiMessageSquare },
        { label: "My Project", href: "/projects", icon: FiBriefcase },
        { label: "Profile", href: "/profile", icon: FiUser },

      ],
    },
    {
      heading: "Finance Center",
      items: [
        { label: "Ingenious Pay", href: "/pay", icon: FiDollarSign },
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
  