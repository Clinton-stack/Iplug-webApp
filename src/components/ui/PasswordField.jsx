import { Field } from "@chakra-ui/react";
import React from "react";
import { PasswordInput } from "./password-input";

const PasswordField = ({name, label, isRequired, error  }) => {
  return (
    <Field.Root name={name} w>
      <Field.Label>
        {label}
        {isRequired && <Field.RequiredIndicator /> }
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
