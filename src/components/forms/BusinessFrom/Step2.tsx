'use client';
import TextField from "@/components/ui/TextField";
import { Box, NativeSelect } from "@chakra-ui/react";
import React, { useState } from "react";
import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));


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
          <option value="NIN">CAC</option>
          <option value="SMEDAN"> SMEDAN</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Box>
  );
};

export default Step2;
