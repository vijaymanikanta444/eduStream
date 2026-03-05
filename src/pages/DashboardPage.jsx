import { Grid, Stack, Typography, Card, CardContent } from "@mui/material";
import ConnectionStatusCard from "../components/dashboard/ConnectionStatusCard";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Welcome back, {user?.name || "Student"}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your progress and continue learning
        </Typography>
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Enrolled Courses
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                2
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Certificates
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ConnectionStatusCard />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default DashboardPage;
