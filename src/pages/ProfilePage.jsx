import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Divider,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your account information
        </Typography>
      </Stack>

      {/* Profile Card */}
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={3}>
            {/* Avatar Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </Avatar>
              <Stack spacing={0.5}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Roll No: {user.rollNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Stack>
            </Box>

            <Divider />

            {/* Profile Information */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={user.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  value={user.rollNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Divider />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained">Edit Profile</Button>
              <Button variant="outlined">Change Password</Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default ProfilePage;
