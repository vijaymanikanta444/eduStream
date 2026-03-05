import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  Button,
  Container,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import UserMenu from "./UserMenu";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import { useAuth } from "../../contexts/AuthContext";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { useNavigate } from "react-router-dom";
import logo2 from "../../assets/logo2.jpg";

function Header() {
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    isOpen: loginModalOpen,
    openLoginModal,
    closeLoginModal,
  } = useLoginModal();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"));

  const studentInfo = user || {
    name: "Guest",
    rollNumber: "N/A",
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, sm: 2 },
            gap: 2,
          }}
        >
          {/* Left Section - Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              cursor: "pointer",
              flexShrink: 0,
            }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={"logo2.jpg"}
              alt="EduStream Logo"
              sx={{
                height: { xs: 28, sm: 32 },
                width: "auto",
              }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                whiteSpace: "nowrap",
              }}
            >
              EduStream
            </Typography>
          </Box>

          {/* Right Section */}
          {isAuthenticated ? (
            // Authenticated User UI
            !isMobile ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2 },
                  ml: "auto",
                  flexShrink: 0,
                }}
              >
                {/* Desktop Search - right before student info */}
                {!isTablet && (
                  <Box sx={{ width: 360 }}>
                    <SearchBar variant="header" />
                  </Box>
                )}

                {/* Student Info */}
                {!isTablet && (
                  <Stack
                    spacing={0}
                    sx={{ textAlign: "right", minWidth: "100px" }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {studentInfo.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.75rem",
                      }}
                    >
                      {studentInfo.rollNumber}
                    </Typography>
                  </Stack>
                )}

                {/* Avatar */}
                <UserMenu
                  studentName={studentInfo.name}
                  rollNumber={studentInfo.rollNumber}
                />
              </Box>
            ) : (
              /* Mobile - Avatar Only */
              <UserMenu
                studentName={studentInfo.name}
                rollNumber={studentInfo.rollNumber}
              />
            )
          ) : (
            // Public User UI - Login button
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
                ml: "auto",
              }}
            >
              {/* Desktop Search - right before login */}
              {!isTablet && (
                <Box sx={{ width: 360 }}>
                  <SearchBar variant="header" />
                </Box>
              )}
              <Button
                variant="contained"
                size={isMobile ? "small" : "medium"}
                onClick={openLoginModal}
              >
                Log In
              </Button>
            </Box>
          )}
        </Toolbar>

        {/* Search Bar for Tablet and Mobile - Below Header */}
        {isTablet && (
          <Box
            sx={{
              px: { xs: 1, sm: 2 },
              pb: 1.5,
              pt: 0.5,
              borderBottom: `1px solid ${muiTheme.palette.divider}`,
              bgcolor: "background.paper",
            }}
          >
            <Container maxWidth="lg" disableGutters>
              <SearchBar variant="mobile" />
            </Container>
          </Box>
        )}
      </AppBar>

      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

export default Header;
