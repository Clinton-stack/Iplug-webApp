import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from '../../ui/PrimaryButton'

const CTA = ({customerName, buttonName, onClick}) => {
  return (
    <Flex  w='100%' h='100%' justifyContent='space-between' wrap="wrap" gap={2}>
        <Box>
            <Text fontSize="xs" fontWeight="bold" color="gray.500">Tuesday, July 29, 2025 - Abuja, FCT</Text>
            <Text fontSize="2xl" fontWeight="bold">Good Afternoon, {customerName}</Text>
            <Text fontSize="sm"  >Here's your activity snapshot. Ready to get your next project done?</Text>
        </Box>
        <Box w='200px' >
            <PrimaryButton bgColor='#197FCF' name={buttonName} />
        </Box>
    </Flex>
  )
}

export default CTA