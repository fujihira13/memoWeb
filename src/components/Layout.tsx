import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";

const MainContent = styled(Box)`
  padding: 16px;
  padding-bottom: 72px;
`;

const SideNavigation = styled(Box)`
  width: 240px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  border-right: 1px solid #e0e0e0;
  background-color: #ffffff;
`;

export const Layout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box display="flex">
      {isDesktop && (
        <SideNavigation>
          <Navigation orientation="vertical" />
        </SideNavigation>
      )}
      <Box flex={1} marginLeft={isDesktop ? "240px" : 0}>
        <Container maxWidth={isDesktop ? "lg" : "sm"}>
          <MainContent>
            <Outlet />
          </MainContent>
        </Container>
      </Box>
      {!isDesktop && <Navigation orientation="horizontal" />}
    </Box>
  );
};
