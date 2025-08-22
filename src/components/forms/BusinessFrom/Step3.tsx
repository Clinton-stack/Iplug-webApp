'use client';
import TextField from "@/components/ui/TextField";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import DateField from "@/components/ui/DatePicker";
import { Box } from "@chakra-ui/react";

const Step3: React.FC = () => {
  const [issueDate, setIssueDate] = useState<Date | null>(null);

  return (
    <Box spaceY={3}>
      <TextField label="Registration number" name="idNumber" />

      <DatePicker
        selected={issueDate}
        onChange={(date: Date | null) => setIssueDate(date)}
        customInput={<DateField label="Date of Issue" name="issueDate" />}
        dateFormat="yyyy-MM-dd"
      />
    </Box>
  );
};

export default Step3;
