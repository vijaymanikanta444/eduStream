import { Box, Container } from "@mui/material";
import Header from "../components/common/Header";

function AppLayout({ children, fullWidth = false }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />
      {fullWidth ? (
        <Box sx={{ py: 0 }}>{children}</Box>
      ) : (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {children}
        </Container>
      )}
    </Box>
  );
}

export default AppLayout;
