import { Card, CardContent, Typography, Skeleton } from "@mui/material";
import { keyframes } from "@mui/system";

const shimmer = keyframes`
  0% {
    backgroundPosition: -1000px 0;
  }
  100% {
    backgroundPosition: 1000px 0;
  }
`;

function StatCard({ label, value, loading = false, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        height: "140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: loading
          ? `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`
          : "inherit",
        backgroundSize: loading ? "1000px 100%" : "inherit",
        animation: loading ? `${shimmer} 2s infinite` : "none",
        "&:hover": onClick
          ? {
              boxShadow: 6,
              backgroundColor: "action.hover",
              transform: "translateY(-6px)",
            }
          : {},
      }}
    >
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <Typography
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: "0.875rem" }}
        >
          {label}
        </Typography>
        {loading ? (
          <Skeleton variant="text" width="60%" sx={{ mx: "auto", my: 1 }} />
        ) : (
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default StatCard;
