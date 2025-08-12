import ProgressStepper from "@/components/ProgressStepper";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <Box h="100vh" overflow='hidden'>
      <div className="row">
        <div className="d-none d-lg-block d-md-block col-lg-4 col-md-5 !p-8 ">
          <Box
            rounded="xl"
            p={5}
            mb={10}
            display="flex"
            flexDirection="column"
          >
            <Box mb={6}>
              <Image src="/images/IngeniousplugLogo.png" alt="Ingeniousplug logo" height={50} width={130} style={{ height: "auto" }} priority />
            </Box>
            <ProgressStepper />
            <Box mt="auto">
              <Text className="already-have-account-text" mt="10px">
                Already have an account?{"  "}
                <Link href="/login" className="link-text">
                  Sign in
                </Link>
              </Text>
            </Box>
          </Box>
        </div>
        <div className="col-12 col-md-7 col-lg-8 ">
          <Flex h="100vh" align="center" justify="center" px={2} pos="relative"   pb={{ base: "130px", sm: "180px", md: "160px", lg: "230px" }} 
          >
            <Box zIndex={2}>
            {children}

            </Box>

            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h={{ base: "120px", sm: "170px", md: "150px", lg: "220px" }}
              overflow="hidden"
              zIndex={1}
              rounded={"xl"}
            >
              <Image
                src="/images/background/people-tiles.png"
                alt="User collage"
                fill
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </Box>
          </Flex>
        </div>
      </div>
    </Box>
  );
};

export default layout;
