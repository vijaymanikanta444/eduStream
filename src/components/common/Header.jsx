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
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import UserMenu from "./UserMenu";
import LoginModal from "./LoginModal";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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
          }}
        >
          {/* Left Section - Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              cursor: "pointer",
            }}
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          >
            <SchoolIcon
              sx={{
                fontSize: { xs: 28, sm: 32 },
                color: "primary.main",
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
                }}
              >
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
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              onClick={() => setLoginModalOpen(true)}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Login Modal */}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}

export default Header;
