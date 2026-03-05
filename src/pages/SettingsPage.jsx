import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme as useAppTheme } from "../contexts/ThemeContext";

function SettingsPage() {
  const { mode, toggleTheme } = useAppTheme();
  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Customize your preferences
        </Typography>
      </Stack>

      {/* Notification Settings */}
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notification Preferences
            </Typography>
            <Divider />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email Notifications"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 4, mt: -1 }}
            >
              Receive email updates about your courses and assignments
            </Typography>

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Push Notifications"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 4, mt: -1 }}
            >
              Receive push notifications on your devices
            </Typography>

            <FormControlLabel control={<Switch />} label="SMS Notifications" />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 4, mt: -1 }}
            >
              Receive text messages for important updates
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Display
            </Typography>
            <Divider />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
                <Stack spacing={0}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Dark Mode
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {mode === "dark"
                      ? "Currently enabled"
                      : "Currently disabled"}
                  </Typography>
                </Stack>
              </Box>
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            </Box>

            {/* <Divider /> */}
          </Stack>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained">Save Settings</Button>
        <Button variant="outlined">Reset to Defaults</Button>
      </Box>
    </Stack>
  );
}

export default SettingsPage;
