'use client'

import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

interface ColorModeProviderProps {
  readonly children: React.ReactNode;
  readonly [key: string]: any;
}

export function ColorModeProvider({ children, ...props }: ColorModeProviderProps) {
  return (
    <ThemeProvider 
      attribute='class' 
      defaultTheme='light'
      enableSystem={false}
      disableTransitionOnChange 
      {...props}
    >
      {children}
    </ThemeProvider>
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const colorMode = forcedTheme || resolvedTheme || 'light'
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  
  // Return light mode during SSR to prevent hydration mismatch
  if (!mounted) {
    return {
      colorMode: 'light',
      setColorMode: setTheme,
      toggleColorMode,
    }
  }
  
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps {
  [key: string]: any;
}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    return (
      <ClientOnly fallback={<Skeleton boxSize='8' />}>
        <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: '5',
              height: '5',
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    )
  },
)

interface ModeProps {
  children: React.ReactNode;
  [key: string]: any;
}

export const LightMode = React.forwardRef<HTMLSpanElement, ModeProps>(function LightMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme light'
      colorPalette='gray'
      colorScheme='light'
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef<HTMLSpanElement, ModeProps>(function DarkMode(props, ref) {
  return (
    <Span
      color='fg'
      display='contents'
      className='chakra-theme dark'
      colorPalette='gray'
      colorScheme='dark'
      ref={ref}
      {...props}
    />
  )
})
