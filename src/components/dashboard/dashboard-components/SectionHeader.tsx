import { Flex, Text, Spacer, Link } from "@chakra-ui/react";
import React from "react";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, actionText, onActionClick }) => {
  return (
    <Flex mb={4} align="center">
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <Spacer />
      {actionText && (
        <Link
          fontSize="sm"
          fontWeight="semibold"
          color="#197FCF"
          cursor="pointer"
          onClick={onActionClick}
        >
          {actionText}
        </Link>
      )}
    </Flex>
  );
};

export default SectionHeader;
