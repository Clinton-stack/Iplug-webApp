import { Button, FileUpload } from "@chakra-ui/react";
import React from "react";
import { HiUpload } from "react-icons/hi";

const Step4 = () => {
  return (
    <div>
      <FileUpload.Root maxFiles={2}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button variant="outline" size="sm" rounded="xl" w="100%">
            <HiUpload /> Upload file
          </Button>
        </FileUpload.Trigger>
        <FileUpload.List showSize clearable />
      </FileUpload.Root>
    </div>
  );
};

export default Step4;
