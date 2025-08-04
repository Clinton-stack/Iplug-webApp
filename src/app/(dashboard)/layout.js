'use client'
import Navbar from '@/components/Navbar'
import AppSidebar from '@/components/SiderBar/SideBar'
import { Grid, GridItem } from '@chakra-ui/react'
import React, { useState } from 'react'

const Layout = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <Grid
    templateAreas={`
      "nav header"
      "nav main"
    `}
    gridTemplateRows="70px 1fr"
    gridTemplateColumns={collapsed ? "70px 1fr" : "260px 1fr"}
    transition="all 0.2s ease"
    minH="100vh"
    maxW="100vw"
  >
    <GridItem area="header" bg="#F8FAFB" maxHeight='70px' h='70px' p={3}>
      <Navbar/>
    </GridItem>

    <GridItem area="nav">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
    </GridItem>

    <GridItem
      area="main"
      bg="#F5F5F5"
      p={4}
      overflowX="auto"
    >
      {children}
    </GridItem>
  </Grid>
  )
}

export default Layout