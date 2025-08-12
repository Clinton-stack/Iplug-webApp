"use client"
import FloatingCurrencySelector from "@/components/CurrencySelector";
import ServiceProvider from "@/components/dashboard/ServiceProvider";
import ServiceRequester from "@/components/dashboard/ServiceRequester";
import React, { useState } from "react";

const Dashboard = () => {
  const [userType, setUserType] = useState("serviceProvider");
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
