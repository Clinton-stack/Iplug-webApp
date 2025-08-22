'use client'

import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  mergeRefs,
  useControllableState,
} from '@chakra-ui/react'
import * as React from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

interface PasswordInputProps {
  rootProps?: any;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode };
  disabled?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  size?: string;
  rounded?: string;
  css?: any;
  [key: string]: any;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      ...rest
    } = props

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    })

    const inputRef = React.useRef<HTMLInputElement>(null)

    return (
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e: React.PointerEvent) => {
              if (rest.disabled) return
              if (e.button !== 0) return
              e.preventDefault()
              setVisible(!visible)
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          ref={mergeRefs(ref, inputRef)}
          type={visible ? 'text' : 'password'}
        />
      </InputGroup>
    )
  },
)

interface VisibilityTriggerProps {
  children: React.ReactNode;
  disabled?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
  [key: string]: any;
}

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, VisibilityTriggerProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        me='-2'
        aspectRatio='square'
        size='sm'
        variant='ghost'
        height='calc(100% - {spacing.2})'
        aria-label='Toggle password visibility'
        {...props}
      />
    )
  },
)

interface PasswordStrengthMeterProps {
  max?: number;
  value: number;
  [key: string]: any;
}

export const PasswordStrengthMeter = React.forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
  function PasswordStrengthMeter(props, ref) {
    const { max = 4, value, ...rest } = props

    const percent = (value / max) * 100
    const { label, colorPalette } = getColorPalette(percent)

    // Create stable keys for the strength bars
    const strengthBars = Array.from({ length: max }, (_, index) => ({
      id: `strength-bar-${index}`,
      isActive: index < value
    }))

    return (
      <Stack align='flex-end' gap='1' ref={ref} {...rest}>
        <HStack width='full'>
          {strengthBars.map((bar) => (
            <Box
              key={bar.id}
              height='1'
              flex='1'
              rounded='sm'
              data-selected={bar.isActive ? '' : undefined}
              layerStyle='fill.subtle'
              colorPalette='gray'
              _selected={{
                colorPalette,
                layerStyle: 'fill.solid',
              }}
            />
          ))}
        </HStack>
        {label && <HStack textStyle='xs'>{label}</HStack>}
      </Stack>
    )
  },
)

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: 'Low', colorPalette: 'red' }
    case percent < 66:
      return { label: 'Medium', colorPalette: 'orange' }
    default:
      return { label: 'High', colorPalette: 'green' }
  }
}
