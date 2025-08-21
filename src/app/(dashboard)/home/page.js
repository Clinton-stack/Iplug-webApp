"use client"
import FloatingCurrencySelector from "@/components/CurrencySelector";
import ServiceProvider from "@/components/dashboard/ServiceProvider";
import ServiceRequester from "@/components/dashboard/ServiceRequester";
import { useUserStore } from "@/store/userStore";
import React, { useState } from "react";

const Dashboard = () => {
  const { role } = useUserStore()
  return (
    <div className="dashboard-container">
      <FloatingCurrencySelector />
      {role === "requester" ? (
        <ServiceRequester />
      ) : (
        <ServiceProvider />
      )}
    </div>
  );
};

export default Dashboard;
