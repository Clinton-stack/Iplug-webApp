"use client";
import React from "react";
import DatePicker from "react-datepicker";
import DateField from "../../ui/DatePicker";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

const Step3 = () => {
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  return (
    <Box spaceY={3}>
      <DatePicker
        selected={dateOfBirth}
        onChange={(date) => setDateOfBirth(date)}
        customInput={<DateField label="Date of birth" name="dateOfBirth" />}
        dateFormat="yyyy-MM-dd"
      />

      <DatePicker
        selected={issueDate}
        onChange={(date) => setIssueDate(date)}
        customInput={<DateField label="Date of Issue" name="issueDate" />}
        dateFormat="yyyy-MM-dd"
      />

      <DatePicker
        selected={expiryDate}
        onChange={(date) => setExpiryDate(date)}
        customInput={<DateField label="Date of Expiry" name="expiryDate" />}
        dateFormat="yyyy-MM-dd"
      />

   
    </Box>
  );
};

export default Step3;
