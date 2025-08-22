"use client";

import { Box, Input, Textarea, NativeSelect, Button, InputGroup } from "@chakra-ui/react";
import { useRequestStore } from "@/store/requestStore";
import { categoriesData } from "@/constants/categories";
import PrimaryButton from "../ui/PrimaryButton";
import React from "react";

interface RequestFormFieldsProps {
  readonly onSuccess?: () => void;
}

export function RequestFormFields({ onSuccess }: RequestFormFieldsProps) {
  const form = useRequestStore((state) => state.formData);
  const setFormField = useRequestStore((state) => state.setFormField);
  const resetForm = useRequestStore((state) => state.resetForm);

  const selectedCategory = categoriesData.find((cat) => cat.value === form.category);

  const handleChange = (field: keyof typeof form, value: string) => {
    setFormField(field, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Submitted form data:", form);
    resetForm();
    onSuccess?.();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} display="grid" gap={4} maxW="600px" mx="auto">
      {/* Title */}
      <Input placeholder="What service are you looking for?" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
      
      {/* Category */}
      <NativeSelect.Root>
        <NativeSelect.Field value={form.category} onChange={(e) => handleChange("category", (e.target as HTMLSelectElement).value)}>
          <option value="">Select Category</option>
          {categoriesData.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {/* Service - only shows after category selection */}
      {form.category && (
        <NativeSelect.Root>
          <NativeSelect.Field value={form.service} onChange={(e) => handleChange("service", (e.target as HTMLSelectElement).value)}>
            <option value="">Select Service</option>
            {selectedCategory?.subcategories.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      )}

      {/* Description */}
      <Textarea placeholder="Describe your request in detail..." value={form.description} onChange={(e) => handleChange("description", e.target.value)} />

      <PrimaryButton type="submit" bgColor="gray.600" color="white" mt={2} name="Generate description" />

      {/* Payment Type */}
      <NativeSelect.Root>
        <NativeSelect.Field value={form.paymentType} onChange={(e) => handleChange("paymentType", (e.target as HTMLSelectElement).value)}>
          <option value="">Select Payment Type</option>
          <option value="milestone">Per Milestone</option>
          <option value="hour">Per Hour</option>
          <option value="day">Per Day</option>
          <option value="project">Entire Project</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {/* Budget */}
      <InputGroup>
        <Input type="number" placeholder="Budget" value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} />
      </InputGroup>

      {/* Engagement Type */}
      <NativeSelect.Root>
        <NativeSelect.Field value={form.engagementType} onChange={(e) => handleChange("engagementType", (e.target as HTMLSelectElement).value)}>
          <option value="">Select Engagement Type</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {/* Deadline */}
      <InputGroup>
        <Input type="date" value={form.deadline} onChange={(e) => handleChange("deadline", e.target.value)} />
      </InputGroup>

      {/* Location */}
      <InputGroup>
        <Input placeholder="Location" value={form.location} onChange={(e) => handleChange("location", e.target.value)} />
      </InputGroup>

      {/* Submit Button */}
      <PrimaryButton type="submit" bgColor="#197FCF" color="white" mt={2} name="Post My Request" />
    </Box>
  );
}
