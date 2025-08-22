import { FaDollarSign, FaProjectDiagram, FaClock, FaStar, FaMedal } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi"; // optional: better XP icon
import { IconType } from "react-icons";

interface Metric {
  label: string;
  value: string;
  bgColor: string;
  icon: IconType;
  iconColor: string;
}

const metrics: Metric[] = [
  {
    label: "Spend YTD",
    value: "$120,500",
    bgColor: "green.100",
    icon: FaDollarSign,
    iconColor: "#38A169",
  },
  {
    label: "Projects Done",
    value: "85",
    bgColor: "blue.100",
    icon: FaProjectDiagram,
    iconColor: "#3182CE",
  },
  {
    label: "Avg. Hire Time",
    value: "14 days",
    bgColor: "orange.100",
    icon: FaClock,
    iconColor: "#DD6B20",
  },
  {
    label: "Avg. Rating",
    value: "4.8 / 5",
    bgColor: "yellow.100",
    icon: FaStar,
    iconColor: "#D69E2E",
  },
  {
    label: "Total XP Earned",
    value: "12,300 XP",
    bgColor: "purple.100",
    icon: GiLaurelsTrophy,
    iconColor: "#805AD5",
  },
  {
    label: "Current Badge",
    value: "Gold",
    bgColor: "teal.100",
    icon: FaMedal,
    iconColor: "#319795",
  },
];

export default metrics;
