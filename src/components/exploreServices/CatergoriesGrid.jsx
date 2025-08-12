import { SimpleGrid, VStack, Box, Text, Flex } from "@chakra-ui/react";

export default function CategoryGrid({ categories, onSelect }) {
  return (
    <Flex  gap={3} wrap="wrap" justify="center">
      {Object.keys(categories).map((catKey) => {
        const cat = categories[catKey];
        return (
          <VStack
            key={catKey}
            cursor="pointer"
            onClick={() => onSelect(catKey)}
            _hover={{ opacity: 0.8 }}
            w="80px"
          >
            <Box
              bg={cat.iconColor}
              w={20}
              h={20}
              rounded="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontWeight="bold"
              fontSize="xl"
              shadow="md"
            >
              {cat.icon || cat.name.charAt(0)}
            </Box>
            <Text fontWeight="bold" fontSize="12px" textAlign="center" textWrap="wrap">
              {cat.name}
            </Text>
          </VStack>
        );
      })}
    </Flex>
  );
}
