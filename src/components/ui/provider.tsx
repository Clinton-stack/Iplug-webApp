'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import React from 'react'

interface ProviderProps {
  readonly children: React.ReactNode;
  readonly [key: string]: any;
}

export function Provider({ children, ...props }: Readonly<ProviderProps>) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
