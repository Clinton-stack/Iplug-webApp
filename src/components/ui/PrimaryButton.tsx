import { Button } from "@chakra-ui/react";
import React from "react";
import tinycolor from "tinycolor2";

interface PrimaryButtonProps {
  name: string;
  bgColor: string;
  icon?: React.ReactNode | null;
  onClick?: () => void;
  [key: string]: any;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ name, bgColor, icon, onClick, ...props }) => {
    const hoverColor = tinycolor(bgColor).darken(10).toString();
  return (
    <Button rounded="xl" background={bgColor} size="md" className="button-text" _hover={{background: hoverColor}} w='100%' onClick={onClick} {...props} fontSize='14px'  color="white" fontWeight='bold'>
      {icon}{name}
    </Button>
  );
};

export default PrimaryButton;
