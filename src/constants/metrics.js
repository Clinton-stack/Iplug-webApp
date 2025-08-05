import { FaDollarSign, FaProjectDiagram, FaClock, FaStar } from "react-icons/fa";

const metrics = [
  {
    label: "Revenue YTD",
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
];

export default metrics;
