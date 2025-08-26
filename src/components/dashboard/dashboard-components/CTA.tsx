import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from '../../ui/PrimaryButton'
import CreateRequestModal from '../../modals/CreateRequestModal'

interface CTAProps {
  customerName?: string;
  buttonName?: string;
  onClick?: () => void;
}

const CTA: React.FC<CTAProps> = ({ customerName, buttonName, onClick }) => {
  const { open, onOpen, onClose } = useDisclosure();

  const handleButtonClick = () => {
    if (buttonName === "Post a Service Request") {
      onOpen();
    } else if (onClick) {
      onClick();
    }
  };

  // Get current time for dynamic greeting
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Get current date formatted
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Africa/Lagos' // Nigeria timezone
    };
    return now.toLocaleDateString('en-US', options) + " - Lagos, Nigeria";
  };

  return (
    <>
      <Flex w='100%' h='100%' justifyContent='space-between' wrap="wrap" gap={2}>
          <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500">{getCurrentDate()}</Text>
              <Text fontSize="2xl" fontWeight="bold">{getCurrentGreeting()}, {customerName}</Text>
              <Text fontSize="sm">Here&apos;s your activity snapshot. Ready to get your next project done?</Text>
          </Box>
          <Box w='200px'>
              <PrimaryButton 
                bgColor='#197FCF' 
                name={buttonName || 'Get Started'} 
                icon={null} 
                onClick={handleButtonClick} 
              />
          </Box>
      </Flex>
      
      <CreateRequestModal isOpen={open} onClose={onClose} />
    </>
  )
}

export default CTA