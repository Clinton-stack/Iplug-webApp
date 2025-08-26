"use client";

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTitle,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Box,
  Flex,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiHelpCircle,
  FiUpload,
} from "react-icons/fi";
import React, { useState } from "react";

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    timeline: "",
  });

  const steps = [
    { title: "Basic Info", description: "What do you need?" },
    { title: "Details", description: "Describe your project" },
    { title: "Budget & Timeline", description: "Final details" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onClose();
    // Show success message and redirect to projects
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="semibold" color="gray.700">
              What service do you need?
            </Text>
            
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Request Title *</Text>
              <Input
                placeholder="What do you need help with?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Category *</Text>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{ 
                  padding: '8px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  width: '100%',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select a category</option>
                <option value="tech">Tech & Digital</option>
                <option value="design">Design & Creative</option>
                <option value="writing">Writing & Content</option>
                <option value="marketing">Marketing & Sales</option>
                <option value="business">Business Services</option>
              </select>
            </Box>
          </VStack>
        );

      case 1:
        return (
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Description *</Text>
              <Textarea
                placeholder="Describe your request in detail. Mention your goals, expectations, and any context."
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Text fontSize="sm" color="gray.600" mt={1}>
                {formData.description.length}/100 characters minimum
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Attachments (Optional)</Text>
              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="lg"
                p={6}
                textAlign="center"
                cursor="pointer"
                _hover={{ borderColor: "blue.400", bg: "blue.50" }}
              >
                <FiUpload size={24} style={{ margin: "0 auto 8px" }} />
                <Text fontSize="sm" color="gray.600">
                  Upload design files, PDFs, images, etc.
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Max 10MB • Supported: PDF, DOC, JPG, PNG
                </Text>
              </Box>
            </Box>
          </VStack>
        );

      case 2:
        return (
          <VStack gap={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Budget Range *</Text>
                <Input
                  placeholder="e.g., $500-1000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Timeline *</Text>
                <select 
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  style={{ 
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select timeline</option>
                  <option value="1-3-days">1-3 days</option>
                  <option value="1-week">1 week</option>
                  <option value="2-weeks">2 weeks</option>
                  <option value="1-month">1 month</option>
                  <option value="2-3-months">2-3 months</option>
                </select>
              </Box>
            </Grid>

            <Box p={4} bg="gray.50" borderRadius="lg">
              <Text fontSize="sm" color="gray.700">
                📋 By submitting this request, you'll be able to:
              </Text>
              <VStack align="start" mt={2} fontSize="sm" color="gray.600">
                <Text>• Receive proposals from qualified providers</Text>
                <Text>• Chat with potential hires before deciding</Text>
                <Text>• Use secure escrow for safe payments</Text>
                <Text>• Track project progress with milestones</Text>
              </VStack>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent maxW="2xl" maxH="90vh">
        <DialogHeader>
          <HStack>
            <IconButton
              aria-label="Go back"
              onClick={onClose}
              variant="ghost"
              size="sm"
            >
              <FiArrowLeft />
            </IconButton>
            <Box flex="1">
              <DialogTitle fontSize="lg" fontWeight="bold">Create a Request</DialogTitle>
              <Text fontSize="sm" color="gray.600" fontWeight="normal">
                {steps[currentStep].description}
              </Text>
            </Box>
            <HStack ml="auto">
              <IconButton
                aria-label="Help"
                variant="ghost"
                size="sm"
              >
                <FiHelpCircle />
              </IconButton>
            </HStack>
          </HStack>
        </DialogHeader>

        <DialogBody>
          {/* Progress Indicator */}
          <Flex mb={6}>
            {steps.map((step, stepIndex) => (
              <Flex key={step.title} align="center" flex="1">
                <Box
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg={stepIndex <= currentStep ? "blue.500" : "gray.200"}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  {stepIndex + 1}
                </Box>
                <Text ml={2} fontSize="xs" fontWeight="semibold" color={stepIndex <= currentStep ? "blue.500" : "gray.500"}>
                  {step.title}
                </Text>
                {stepIndex < steps.length - 1 && (
                  <Box flex="1" h="1px" bg="gray.200" mx={4} />
                )}
              </Flex>
            ))}
          </Flex>

          {renderStepContent()}
        </DialogBody>

        <DialogFooter>
          <HStack gap={3}>
            <Button variant="ghost" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={onClose}>
              Save Draft
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button colorPalette="blue" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                colorPalette="blue"
                onClick={handleSubmit}
              >
                Submit Request
              </Button>
            )}
          </HStack>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateRequestModal;
