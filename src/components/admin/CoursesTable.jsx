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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CoursesTable({ courses, onDelete, loading }) {
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
