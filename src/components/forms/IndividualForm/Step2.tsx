"use client";
import TextField from "@/components/ui/TextField";
import { Box, NativeSelect } from "@chakra-ui/react";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import { useState } from "react";
import React from "react";

const Step2 = () => {
  const [value, setValue] = useState("");
  const countryObj = countries.getNames("en", { select: "official" });
  const countryOptions = Object.entries(countryObj)
    .map(([code, name]) => ({ label: name, value: code }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return (
    <Box spaceY={3}>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select Country of Residence"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          {countryOptions.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <NativeSelect.Root>
        <NativeSelect.Field placeholder="Mode of Identification">
          <option value="NIN">NIN</option>
          <option value="residentPermit"> Resident Permit</option>
          <option value="driversLicense">Drivers License</option>
          <option value="internationalPassport">International Passport</option>
          <option value="voterCard">Voter Card</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <TextField label="ID number" name="idNumber" />
    </Box>
  );
};

export default Step2;
