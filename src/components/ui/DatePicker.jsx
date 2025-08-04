import React from "react";
import { Input, Box, Text, HStack, Icon } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";

const DateField = React.forwardRef(({ value, onClick, label, name }, ref) => {
  return (
    <Box w="100%">
      {label && (
        <Text mb={1} fontWeight="medium">
          {label}
        </Text>
      )}
      <HStack
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        px={3}
        cursor="pointer"
        onClick={onClick}
        spacing={2}
      >
        <Input
          ref={ref}
          value={value}
          readOnly
          placeholder={`Select ${label?.toLowerCase()}`}
          variant="unstyled"
          name={name}
          _placeholder={{ color: "gray.500" }}
        />
        <Icon as={FiCalendar} color="gray.500" boxSize={5} />
      </HStack>
    </Box>
  );
});

export default DateField;
