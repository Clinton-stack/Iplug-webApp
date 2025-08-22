import { Field } from "@chakra-ui/react";
import React from "react";
import { PasswordInput } from "./password-input";

interface PasswordFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  error?: string | null;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ name, label, isRequired = false, error }) => {
  return (
    <Field.Root>
      <Field.Label>
        {label}
        {isRequired && <Field.RequiredIndicator />}
      </Field.Label>
      <PasswordInput
        id={name}
        name={name}
        placeholder="*******"
        size="md"
        rounded="lg"
        css={{ "--focus-color": "#006BFF" }}
      />
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default PasswordField;
