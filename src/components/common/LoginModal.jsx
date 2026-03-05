import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../../contexts/AuthContext";
import { useSupAuth } from "../../hooks/useSupAuth";

function LoginModal({ open, onClose }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginUser, loading: authLoading, error: authError } = useSupAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    setError("");
    setSuccess(false);

    // Client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Call Supabase authentication
    const profile = await loginUser(formData.email, formData.password);

    if (authError) {
      setError(authError);
      return;
    }

    if (profile) {
      // Login successful
      setSuccess(true);
      login(profile);
      
      // Close modal and navigate after a short delay to show success
      setTimeout(() => {
        onClose();
        navigate("/dashboard");
      }, 500);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({ email: "", password: "" });
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "text.secondary",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3}>
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
          {success && <Alert severity="success">Login successful! Redirecting...</Alert>}

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
                disabled={authLoading || success}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={authLoading || success}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                disabled={authLoading || success}
                sx={{ mt: 2 }}
              >
                {authLoading ? "Signing in..." : success ? "Success!" : "Sign In"}
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Sign in with your college credentials
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
