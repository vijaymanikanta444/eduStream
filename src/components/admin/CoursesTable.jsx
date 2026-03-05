import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Typography,
  Chip,
  Skeleton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";

function CoursesTable({ courses, onDelete, loading }) {
  if (loading) {
    return (
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 700, width: 80 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Instructor</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                Rating
              </TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                Students
              </TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={`course-row-skeleton-${index}`}>
                <TableCell><Skeleton variant="rectangular" width={60} height={50} animation="wave" /></TableCell>
                <TableCell><Skeleton variant="text" width="85%" animation="wave" /></TableCell>
                <TableCell><Skeleton variant="text" width="70%" animation="wave" /></TableCell>
                <TableCell><Skeleton variant="rounded" width={90} height={24} animation="wave" /></TableCell>
                <TableCell><Skeleton variant="text" width="60%" animation="wave" /></TableCell>
                <TableCell sx={{ textAlign: "center" }}><Skeleton variant="text" width={30} sx={{ mx: "auto" }} animation="wave" /></TableCell>
                <TableCell sx={{ textAlign: "center" }}><Skeleton variant="text" width={40} sx={{ mx: "auto" }} animation="wave" /></TableCell>
                <TableCell sx={{ textAlign: "center" }}><Skeleton variant="circular" width={28} height={28} sx={{ mx: "auto" }} animation="wave" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <TableContainer component={Paper}>
        <Stack sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">No courses found</Typography>
        </Stack>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "action.hover" }}>
            <TableCell sx={{ fontWeight: 700, width: 80 }}>Image</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Instructor</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
              Rating
            </TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
              Students
            </TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} hover>
              <TableCell sx={{ width: 80 }}>
                <Box
                  component="img"
                  src={course.image}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                  sx={{
                    width: 60,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    display: "none",
                    width: 60,
                    height: 50,
                    backgroundColor: "action.hover",
                    borderRadius: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageIcon sx={{ fontSize: 24, color: "text.secondary" }} />
                </Box>
              </TableCell>
              <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                {course.title}
              </TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>
                <Chip label={course.category} size="small" />
              </TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{course.rating}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{course.students}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(course.id)}
                  disabled={loading}
                  title="Delete course"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoursesTable;
