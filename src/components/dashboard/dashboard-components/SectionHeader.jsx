import { Flex, Text, Spacer, Link } from "@chakra-ui/react";

const SectionHeader = ({ title, actionText }) => {
  return (
    <Flex mb={4} align="center">
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <Spacer />
      <Link fontSize="sm" fontWeight="semibold" color="#197FCF" cursor="pointer">
        {actionText}
      </Link>
    </Flex>
  );
};

export default SectionHeader;
