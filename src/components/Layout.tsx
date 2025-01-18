import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Container } from "@mui/material";
import styled from "@emotion/styled";

const MainContent = styled(Box)`
  padding: 16px;
  padding-bottom: 72px; // ナビゲーションバーの高さ + 余白
`;

export const Layout = () => {
  return (
    <>
      <Container maxWidth="sm">
        <MainContent>
          <Outlet />
        </MainContent>
      </Container>
      <Navigation />
    </>
  );
};
