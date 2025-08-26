"use client"
import FloatingCurrencySelector from "@/components/CurrencySelector";
import ServiceProvider from "@/components/dashboard/ServiceProvider";
import ServiceRequester from "@/components/dashboard/ServiceRequester";
import { useUserRole } from "@/contexts/UserRoleContext";
import React, { useState, useEffect } from "react";

const Dashboard: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="dashboard-container">
        <FloatingCurrencySelector />
        {/* Default to ServiceRequester during SSR to prevent hydration mismatch */}
        <ServiceRequester />
      </div>
    );
  }

  return <DashboardContent />;
};

const DashboardContent: React.FC = () => {
  const { isProvider } = useUserRole();
  
  return (
    <div className="dashboard-container">
      <FloatingCurrencySelector />
      {isProvider ? (
        <ServiceProvider />
      ) : (
        <ServiceRequester />
      )}
    </div>
  );
};

export default Dashboard;
