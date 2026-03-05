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

function UsersTable({ users, onDelete, loading }) {
  if (!users || users.length === 0) {
    return (
      <TableContainer component={Paper}>
        <Stack sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">No users found</Typography>
        </Stack>
      </TableContainer>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "action.hover" }}>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Roll Number</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rollNumber || user.rollnumber || "-"}</TableCell>
              <TableCell>
                <Chip
                  label={user.role || "student"}
                  size="small"
                  color={user.role === "admin" ? "error" : "default"}
                  variant="outlined"
                />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(user.id)}
                  disabled={loading}
                  title="Delete user"
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

export default UsersTable;
