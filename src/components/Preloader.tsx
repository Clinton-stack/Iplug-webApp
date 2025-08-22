'use client'

import { Box, Center, Spinner, Image } from '@chakra-ui/react'

interface PreloaderProps {
  isLoading: boolean
}

export default function Preloader({ isLoading }: PreloaderProps) {
  if (!isLoading) return null

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(255, 255, 255, 0.95)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backdropFilter="blur(4px)"
    >
      <Center flexDirection="column" gap={4}>
        <Image 
          src="/images/IngeniousplugLogo.png" 
          alt="Ingenious Plug Logo" 
          maxH="80px" 
          maxW="200px" 
          objectFit="contain" 
          mb={4}
        />
        <Spinner
          borderWidth="3px"
          color="#006BFF"
          size="lg"
          css={{
            animationDuration: '0.8s'
          }}
        />
      </Center>
    </Box>
  )
}
