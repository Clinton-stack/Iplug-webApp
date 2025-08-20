"use client";

import { Box, Input, Textarea, NativeSelect, Button, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiDollarSign, FiCalendar, FiMapPin } from "react-icons/fi";
import { useRequestStore } from "@/store/requestStore";
import { categoriesData } from "@/constants/categories";
import PrimaryButton from "../ui/PrimaryButton";

export function RequestFormFields({ onSuccess }) {
  const form = useRequestStore((state) => state.formData);
  const setFormField = useRequestStore((state) => state.setFormField);
  const resetForm = useRequestStore((state) => state.resetForm);

  const selectedCategory = categoriesData.find((cat) => cat.value === form.category);

  const handleChange = (field, value) => {
    setFormField(field, value);
  };

  const handleSubmit = (e) => {
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
      <NativeSelect.Root value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
        <NativeSelect.Field>
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
        <NativeSelect.Root value={form.service} onChange={(e) => handleChange("service", e.target.value)}>
          <NativeSelect.Field>
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

      <PrimaryButton type="submit" bg="gray.600" color="white" mt={2} name="Generate description" />

      {/* Specification (optional) */}
      <Textarea placeholder="Enter Specification (optional)" value={form.specification} onChange={(e) => handleChange("specification", e.target.value)} />

      {/* Payment Type */}
      <NativeSelect.Root value={form.paymentType} onChange={(e) => handleChange("paymentType", e.target.value)}>
        <NativeSelect.Field>
          <option value="">Select Payment Type</option>
          <option value="milestone">Per Milestone</option>
          <option value="hour">Per Hour</option>
          <option value="day">Per Day</option>
          <option value="project">Entire Project</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {/* Budget */}
      <InputGroup startAddon={<FiDollarSign />}>
        <Input type="number" placeholder="Budget" value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} />
      </InputGroup>

      {/* Engagement Type */}
      <NativeSelect.Root value={form.engagementType} onChange={(e) => handleChange("engagementType", e.target.value)}>
        <NativeSelect.Field>
          <option value="">Select Engagement Type</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {/* Deadline */}
      <InputGroup startAddon={<FiCalendar />}>
        <Input type="date" value={form.deadline} onChange={(e) => handleChange("deadline", e.target.value)} />
      </InputGroup>

      {/* Location */}
      <InputGroup startAddon={<FiMapPin />}>
        <Input placeholder="Location" value={form.location} onChange={(e) => handleChange("location", e.target.value)} />
      </InputGroup>

      {/* Submit Button */}
      <PrimaryButton type="submit" bg="#197FCF" color="white" mt={2} name="Post My Request" />
    </Box>
  );
}
