'use client';
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isRegisterStep = pathname?.startsWith('/register/step');
  if (isRegisterStep) return  <>{children}</>
 
  return (
    <div className="d-flex flex-column min-vh-100 snakebackground">
      <div className="container flex-grow-1 d-flex flex-column">
        <div className="row flex-grow-1 py-2">
          <div className="col-12 col-md-8 col-lg-6 d-flex flex-column">
            <div className="ingeniousLogo mb-3">
              <Link href="/" aria-label="Go to home page">
                <Image
                  src="/images/IngeniousplugLogo.png"
                  alt="Ingeniousplug logo"
                  height={50}
                  width={150}
                  priority
                />
              </Link>
            </div>

            {/* Main content */}
            <Flex
              justifyContent="center"
              alignItems="center"
              h={{ lg: "80vh", base: "75vh" }}
            >
              <Box className="form-container" px={{base: '0', md: '40px', lg: '60px'}}>
                {children}
              </Box>
            </Flex>

            {/* Mobile image filling remaining height */}
            <div className="d-block d-lg-none d-md-none mt-4 flex-grow-1 d-flex">
              <div className="hero-image-background w-100"></div>
            </div>
          </div>

          {/* Desktop image */}
          <div className="col-lg-6 col-md-4 d-none d-lg-block d-md-block hero-image-background"></div>
        </div>
      </div>
    </div>
  );
};

export default layout;
