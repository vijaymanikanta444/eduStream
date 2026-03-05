import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function CourseCard({ course, onClick }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
          cursor: "pointer",
        },
      }}
      onClick={() => onClick(course.id)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={course.image}
          alt={course.title}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <Chip
            label={course.level}
            size="small"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <PlayCircleOutlineIcon
            sx={{ fontSize: 40, color: "primary.main" }}
          />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3em",
          }}
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          {course.instructor}
        </Typography>

        <Stack spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <StarIcon
              sx={{ fontSize: 18, color: "warning.main" }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              {course.rating}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <PeopleIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {course.students} students
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <AccessTimeIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {course.duration}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Chip
          label={course.category}
          size="small"
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
}

export default CourseCard;
