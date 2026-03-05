import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Stack,
  Alert,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    try {
      login({
        email: formData.email,
        name: formData.email.split("@")[0],
        rollNumber: "2024001",
      });

      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        py: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={2}>
          <Stack spacing={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <SchoolIcon
                sx={{
                  fontSize: 48,
                  color: "primary.main",
                  mb: 1,
                }}
              />
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                EduStream
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={handleLogin} noValidate>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@college.edu"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Demo: Use any email and password to login
            </Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

export default LoginPage;
