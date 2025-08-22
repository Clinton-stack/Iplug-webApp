"use client";

import { Field, Input } from "@chakra-ui/react";
import React from "react";

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  isRequired?: boolean;
  error?: string | null;
  placeholder?: string;
  [key: string]: any;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  type = "text",
  isRequired = false,
  error,
  ...props
}) => {
  return (
    <Field.Root>
      <Field.Label>
        {label}
        {isRequired && <Field.RequiredIndicator />}
      </Field.Label>
      <Input
        id={name}
        name={name}
        type={type}
        className={`text-field ${error ? "error" : ""}`}
        {...props}
        size="md"
        rounded="lg"
        css={{ "--focus-color": "#006BFF" }}
      />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default TextField;
