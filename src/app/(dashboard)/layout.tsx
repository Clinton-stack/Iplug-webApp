'use client';
import { RequestFormDialog } from '@/components/forms/CustomrequestModal';
import Navbar from '@/components/Navbar';
import AppSidebar from '@/components/SiderBar/SideBar';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navbarHeight = '70px';

  // Handle responsive behavior and prevent hydration mismatch
  useEffect(() => {
    const checkIsMobile = () => {
      return typeof window !== 'undefined' && window.innerWidth < 768; // md breakpoint
    };

    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
      
      if (mobile) {
        setCollapsed(false);
        setMobileMenuOpen(false);
      }
    };

    // Initial setup
    setIsMobile(checkIsMobile());
    setMounted(true);
    
    // Add resize listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Calculate sidebar width
  let sidebarWidth: string;
  if (isMobile) {
    sidebarWidth = mobileMenuOpen ? '260px' : '0px';
  } else {
    sidebarWidth = collapsed ? '70px' : '260px';
  }

  if (!mounted) {
    // Return a simple loading state during SSR
    return (
      <Box minH="100vh" maxW="100vw" bg="#F5F5F5" overflow="hidden">
        <Box pt="70px">
          <Box p={0}>
            {children}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" maxW="100vw" bg="#F5F5F5" position="relative" overflow="hidden">
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={998}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Layout Grid */}
      <Grid
        templateAreas={isMobile ? `"main"` : `"nav main"`}
        gridTemplateColumns={isMobile ? '1fr' : `${sidebarWidth} 1fr`}
        gridTemplateRows="100vh"
        minH="100vh"
        transition="grid-template-columns 0.3s ease"
        gap={0}
      >
        {/* Sidebar - Fixed on desktop, overlay on mobile */}
        {!isMobile && (
          <GridItem area="nav" h="100vh" position="relative" zIndex={999}>
            <AppSidebar 
              collapsed={collapsed} 
              setCollapsed={setCollapsed}
              isMobile={isMobile}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </GridItem>
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && (
          <Box
            position="fixed"
            left={mobileMenuOpen ? 0 : '-260px'}
            top={0}
            h="100vh"
            w="260px"
            zIndex={999}
            transition="left 0.3s ease-in-out"
          >
            <AppSidebar 
              collapsed={false} 
              setCollapsed={setCollapsed}
              isMobile={isMobile}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </Box>
        )}

        {/* Main Area */}
        <GridItem area="main" position="relative" h="100vh" overflow="hidden">
          {/* Fixed Navbar */}
          <Box
            position="sticky"
            top="0"
            left="0"
            right="0"
            height={navbarHeight}
            bg="#F8FAFB"
            zIndex="997"
            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
            borderBottom="1px solid #E2E8F0"
          >
            <Navbar 
              isMobile={isMobile}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </Box>

          {/* Scrollable content below the navbar */}
          <Box 
            h={`calc(100vh - ${navbarHeight})`}
            overflowY="auto" 
            overflowX="hidden"
            position="relative"
            px={isMobile ? 2 : 0}
          >
            <RequestFormDialog />
            <Box p={0}>
              {children}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
