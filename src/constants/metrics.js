import { FaDollarSign, FaProjectDiagram, FaClock, FaStar, FaMedal } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi"; // optional: better XP icon

const metrics = [
  {
    label: "Spend YTD",
    value: "$120,500",
    bgColor: "green.100",
    icon: <FaDollarSign color="#38A169" />,
  },
  {
    label: "Projects Done",
    value: "85",
    bgColor: "blue.100",
    icon: <FaProjectDiagram color="#3182CE" />,
  },
  {
    label: "Avg. Hire Time",
    value: "14 days",
    bgColor: "orange.100",
    icon: <FaClock color="#DD6B20" />,
  },
  {
    label: "Avg. Rating",
    value: "4.8 / 5",
    bgColor: "yellow.100",
    icon: <FaStar color="#D69E2E" />,
  },
  {
    label: "Total XP Earned",
    value: "12,300 XP",
    bgColor: "purple.100",
    icon: <GiLaurelsTrophy color="#805AD5" />, // alternate: FaMedal or FaStar
  },
  {
    label: "Current Badge",
    value: "Gold",
    bgColor: "teal.100",
    icon: <FaMedal color="#319795" />,
  },
];

export default metrics;
