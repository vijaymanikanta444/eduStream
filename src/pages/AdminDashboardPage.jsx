import {
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { supabase } from "../services/supabase/client";
import UsersTable from "../components/admin/UsersTable";
import CoursesTable from "../components/admin/CoursesTable";

function AdminDashboardPage() {
  const { createCourse } = useCourses();
  const { users, fetchUsers, deleteUser: deleteUserFromHook, loading: usersLoading } = useAdminUsers();
  
  // View state
  const [view, setView] = useState("dashboard"); // dashboard, users, courses
  const [userStats, setUserStats] = useState(users.length);
  const [courseStats, setCourseStats] = useState(0);
  
  // Course form state
  const [openDialog, setOpenDialog] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    category: "",
    duration: "",
    image: "",
    rating: "4.5",
    students: "0",
    description: "",
    level: "Beginner",
  });

  // User form state
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [userFormError, setUserFormError] = useState("");
  const [userFormLoading, setUserFormLoading] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollnumber: "",
  });

  // Toast/Snackbar state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpenDialog = () => {
    setFormError("");
    setFormData({
      title: "",
      instructor: "",
      category: "",
      duration: "",
      image: "",
      rating: "4.5",
      students: "0",
      description: "",
      level: "Beginner",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenUserDialog = () => {
    setUserFormError("");
    setUserFormData({
      name: "",
      email: "",
      password: "",
      rollnumber: "",
    });
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };

  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserFromHook(userId);
        setUserStats((prev) => prev - 1);
        showToast("User deleted successfully!");
      } catch (err) {
        showToast(err.message || "Failed to delete user", "error");
      }
    }
  };

  // Placeholder for deleting courses (would need implementation in useCourses)
  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      showToast("Course deletion not yet implemented", "info");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (
      !formData.title ||
      !formData.instructor ||
      !formData.category ||
      !formData.duration
    ) {
      setFormError("Please fill in all required fields");
      return;
    }

    if (!formData.image.startsWith("http")) {
      setFormError("Please enter a valid image URL");
      return;
    }

    setLoading(true);

    try {
      const courseData = {
        title: formData.title,
        instructor: formData.instructor,
        category: formData.category,
        duration: formData.duration,
        image: formData.image,
        rating: parseFloat(formData.rating) || 4.5,
        students: formData.students,
        description: formData.description || null,
        level: formData.level || "Beginner",
      };

      await createCourse(courseData);
      setOpenDialog(false);
      setCourseStats((prev) => prev + 1);
      showToast("Course added successfully!");
    } catch (err) {
      setFormError(err.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserFormError("");

    // Validation
    if (
      !userFormData.name ||
      !userFormData.email ||
      !userFormData.password ||
      !userFormData.rollnumber
    ) {
      setUserFormError("Please fill in all required fields");
      return;
    }

    if (!userFormData.email.includes("@")) {
      setUserFormError("Please enter a valid email address");
      return;
    }

    if (userFormData.password.length < 6) {
      setUserFormError("Password must be at least 6 characters");
      return;
    }

    setUserFormLoading(true);

    try {
      // Insert user into profiles table
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            name: userFormData.name,
            email: userFormData.email,
            password: userFormData.password,
            rollnumber: userFormData.rollnumber,
            role: "student",
          },
        ])
        .select();

      if (error) throw new Error(error.message);

      setOpenUserDialog(false);
      setUserStats((prev) => prev + 1);
      await fetchUsers();
      showToast("User added successfully!");
    } catch (err) {
      setUserFormError(err.message || "Failed to add user");
    } finally {
      setUserFormLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      {/* Dashboard View */}
      {view === "dashboard" && (
        <>
          <Stack spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage platform operations and monitor system activity
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => setView("users")}
              >
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {users.length}
                  </Typography>
                  <Typography variant="caption" color="primary" sx={{ mt: 1, display: "block" }}>
                    Click to view users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => setView("courses")}
              >
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Active Courses
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {courseStats}
                  </Typography>
                  <Typography variant="caption" color="primary" sx={{ mt: 1, display: "block" }}>
                    Click to view courses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    New Signups (24h)
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    43
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Pending Reviews
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    17
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* Users View */}
      {view === "users" && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => setView("dashboard")} size="small">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Users Management
              </Typography>
            </Stack>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleOpenUserDialog}
            >
              Add User
            </Button>
          </Stack>

          <UsersTable
            users={users}
            onDelete={handleDeleteUser}
            loading={usersLoading}
          />
        </>
      )}

      {/* Courses View */}
      {view === "courses" && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => setView("dashboard")} size="small">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Courses Management
              </Typography>
            </Stack>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Add Course
            </Button>
          </Stack>

          <CoursesTable
            courses={[]} // Will fetch from Supabase in the future
            onDelete={handleDeleteCourse}
            loading={loading}
          />
        </>
      )}

      {/* Add Course Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Course</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            {formError && <Alert severity="error">{formError}</Alert>}

            <TextField
              fullWidth
              label="Course Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Complete Web Development Bootcamp"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Instructor *"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              placeholder="e.g., Dr. Angela Yu"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Category *"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Development, Data Science, Marketing"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Duration *"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g., 52 hours"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Image URL *"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              placeholder="Beginner, Intermediate, Advanced"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Rating"
              name="rating"
              type="number"
              inputProps={{ step: "0.1", min: "0", max: "5" }}
              value={formData.rating}
              onChange={handleInputChange}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Number of Students"
              name="students"
              value={formData.students}
              onChange={handleInputChange}
              placeholder="0"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Course description (optional)"
              multiline
              rows={3}
              disabled={loading}
            />

            <Typography variant="caption" color="text.secondary">
              * = Required fields
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog
        open={openUserDialog}
        onClose={handleCloseUserDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Add New User</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            {userFormError && <Alert severity="error">{userFormError}</Alert>}

            <TextField
              fullWidth
              label="Full Name *"
              name="name"
              value={userFormData.name}
              onChange={handleUserInputChange}
              placeholder="e.g., John Doe"
              disabled={userFormLoading}
            />

            <TextField
              fullWidth
              label="Email *"
              name="email"
              type="email"
              value={userFormData.email}
              onChange={handleUserInputChange}
              placeholder="e.g., john@example.com"
              disabled={userFormLoading}
            />

            <TextField
              fullWidth
              label="Password *"
              name="password"
              type="password"
              value={userFormData.password}
              onChange={handleUserInputChange}
              placeholder="Minimum 6 characters"
              disabled={userFormLoading}
            />

            <TextField
              fullWidth
              label="Roll Number *"
              name="rollnumber"
              value={userFormData.rollnumber}
              onChange={handleUserInputChange}
              placeholder="e.g., 23B081"
              disabled={userFormLoading}
            />

            <Typography variant="caption" color="text.secondary">
              * = Required fields
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseUserDialog} disabled={userFormLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleUserSubmit}
            variant="contained"
            disabled={userFormLoading}
          >
            {userFormLoading ? "Adding..." : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AdminDashboardPage;
