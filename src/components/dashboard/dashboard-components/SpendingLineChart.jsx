"use client";

import { useState } from "react";
import { Box, Flex, Text, NativeSelect } from "@chakra-ui/react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import SectionHeader from "./SectionHeader";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Sample spend data
const spendData = [
  { month: "Jan", amount: 120000 },
  { month: "Feb", amount: 95000 },
  { month: "Mar", amount: 134000 },
  { month: "Apr", amount: 87000 },
  { month: "May", amount: 156000 },
  { month: "Jun", amount: 102000 },
  { month: "Jul", amount: 99000 },
  { month: "Aug", amount: 110000 },
  { month: "Sep", amount: 123000 },
  { month: "Oct", amount: 98000 },
  { month: "Nov", amount: 107000 },
  { month: "Dec", amount: 140000 },
];

const SpendChart = () => {
  const [filter, setFilter] = useState("6m");

  const filteredData = filter === "6m" ? spendData.slice(-6) : spendData;

  const chartData = {
    labels: filteredData.map((item) => item.month),
    datasets: [
      {
        label: "Spend (₦)",
        data: filteredData.map((item) => item.amount),
        fill: true,
        backgroundColor: "rgba(0, 179, 235, 0.1)",
        borderColor: "#00B3EB",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `₦${value.toLocaleString()}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <SectionHeader title="Spend Overview"  />
        <NativeSelect.Root size="sm" width="180px">
          <NativeSelect.Field value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last 1 Year</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
      <Box h="300px">
        <Line data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default SpendChart;
