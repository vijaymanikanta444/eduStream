import { Grid, Stack, Typography } from "@mui/material";
import ConnectionStatusCard from "../components/dashboard/ConnectionStatusCard";

function HomePage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Project Setup
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your app is configured with MUI and Supabase-ready services.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ConnectionStatusCard />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default HomePage;
