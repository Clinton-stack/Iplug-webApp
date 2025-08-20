'use client';
import { RequestFormDialog } from '@/components/forms/CustomrequestModal';
import Navbar from '@/components/Navbar';
import AppSidebar from '@/components/SiderBar/SideBar';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? '70px' : '260px';
  const navbarHeight = '70px';

  return (
    <Box minH="100vh" maxW="100vw" overflow="hidden">
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateColumns={`${sidebarWidth} 1fr`}
        gridTemplateRows="1fr"
        minH="100vh"
        transition="all 0.2s ease"
      >
        {/* Sidebar */}
        <GridItem area="nav" h="100vh" overflow="hidden">
          <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </GridItem>

        {/* Main Area */}
        <GridItem area="main" position="relative" overflow="hidden" bg="#F5F5F5">
          <Box
            position="fixed"
            left={sidebarWidth}
            top="0"
            right="0"
            height={navbarHeight}
            bg="#F8FAFB"
            zIndex="1000"
            boxShadow="sm"
            transition="left 0.3s ease"
          >
            <Navbar />
          </Box>

          {/* Scrollable content below the navbar */}
          <Box pt={navbarHeight}  overflowY="auto" >
            <RequestFormDialog />
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
