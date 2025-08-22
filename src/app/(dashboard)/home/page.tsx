"use client"
import FloatingCurrencySelector from "@/components/CurrencySelector";
import ServiceProvider from "@/components/dashboard/ServiceProvider";
import ServiceRequester from "@/components/dashboard/ServiceRequester";
import React, { useState } from "react";

type UserType = "serviceProvider" | "serviceRequester";

const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("serviceProvider");
  return (
    <div className="dashboard-container">
      <FloatingCurrencySelector />
      {userType === "serviceRequester" ? (
        <ServiceRequester />
      ) : (
        <ServiceProvider />
      )}
    </div>
  );
};

export default Dashboard;
