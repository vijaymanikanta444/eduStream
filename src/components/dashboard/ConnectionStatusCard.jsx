import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { checkSupabaseConnection } from "../../services/supabase/database";

function ConnectionStatusCard() {
  const [result, setResult] = useState({ status: "idle", message: "" });

  const handleCheck = async () => {
    setResult({
      status: "loading",
      message: "Checking Supabase connection...",
    });

    const response = await checkSupabaseConnection();

    if (response.success) {
      setResult({
        status: "success",
        message: "Supabase is reachable and ready.",
      });
      return;
    }

    setResult({ status: "error", message: response.error });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">Supabase Status</Typography>
          <Typography variant="body2" color="text.secondary">
            Use this health check to verify your database credentials and
            connection.
          </Typography>
          {result.status === "success" && (
            <Alert severity="success">{result.message}</Alert>
          )}
          {result.status === "error" && (
            <Alert severity="error">{result.message}</Alert>
          )}
          {result.status === "loading" && (
            <Alert severity="info">{result.message}</Alert>
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleCheck}>
          Test Connection
        </Button>
      </CardActions>
    </Card>
  );
}

export default ConnectionStatusCard;
