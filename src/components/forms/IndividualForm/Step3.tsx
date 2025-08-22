"use client";
import React from "react";
import DatePicker from "react-datepicker";
import DateField from "../../ui/DatePicker";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

const Step3: React.FC = () => {
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  
  return (
    <Box spaceY={3}>
      <DatePicker
        selected={dateOfBirth}
        onChange={(date: Date | null) => setDateOfBirth(date)}
        customInput={<DateField label="Date of birth" name="dateOfBirth" />}
        dateFormat="yyyy-MM-dd"
      />

      <DatePicker
        selected={issueDate}
        onChange={(date: Date | null) => setIssueDate(date)}
        customInput={<DateField label="Date of Issue" name="issueDate" />}
        dateFormat="yyyy-MM-dd"
      />

      <DatePicker
        selected={expiryDate}
        onChange={(date: Date | null) => setExpiryDate(date)}
        customInput={<DateField label="Date of Expiry" name="expiryDate" />}
        dateFormat="yyyy-MM-dd"
      />

   
    </Box>
  );
};

export default Step3;
