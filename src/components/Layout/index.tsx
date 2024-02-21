import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout: React.FC = () => {
  return (
    <Box height="100vh" display="flex" overflow="hidden" flexDirection="column">
      <Box paddingX="14.125rem">
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
