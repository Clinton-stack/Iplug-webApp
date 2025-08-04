"use client"
import ServiceProvider from "@/components/dashboard/ServiceProvider";
import ServiceRequester from "@/components/dashboard/ServiceRequester";
import React, { useState } from "react";

const Dashboard = () => {
  const [userType, setUserType] = useState("serviceRequester");
  return (
    <div className="dashboard-container">
      {userType === "serviceRequester" ? (
        <ServiceRequester />
      ) : (
        <ServiceProvider />
      )}
    </div>
  );
};

export default Dashboard;
