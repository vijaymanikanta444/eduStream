import { Card, CardContent, Skeleton, Stack, Box } from "@mui/material";

function CourseCardSkeleton() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton variant="rectangular" height={180} animation="wave" />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Stack spacing={1.5}>
          <Skeleton variant="text" width="85%" height={28} animation="wave" />
          <Skeleton variant="text" width="55%" height={22} animation="wave" />

          <Stack spacing={1}>
            <Skeleton variant="text" width="30%" height={20} animation="wave" />
            <Skeleton variant="text" width="45%" height={20} animation="wave" />
            <Skeleton variant="text" width="35%" height={20} animation="wave" />
          </Stack>

          <Box sx={{ pt: 0.5 }}>
            <Skeleton
              variant="rounded"
              width={100}
              height={24}
              animation="wave"
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CourseCardSkeleton;
