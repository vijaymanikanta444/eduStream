import {
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  IconButton,
  Divider,
  Button,
  Container,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConnectionStatusCard from "../components/dashboard/ConnectionStatusCard";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../contexts/SearchContext";
import { useLoginModal } from "../contexts/LoginModalContext";
import { categorizeCourses, getAllCourses } from "../services/courseApi";

function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { searchQuery, searchResults, isSearching } = useSearch();
  const { openLoginModal } = useLoginModal();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const pendingCourseId = searchParams.get("courseId");

  // Open login modal if there's a pending course and user is not authenticated
  useEffect(() => {
    if (pendingCourseId && !isAuthenticated) {
      openLoginModal();
    }
  }, [pendingCourseId, isAuthenticated, openLoginModal]);

  // Fetch all courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getAllCourses();
        setAllCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Determine which courses to show
  const displayedCourses =
    searchQuery && searchResults.length > 0 ? searchResults : allCourses;

  // Categorize courses
  const categorizedResults = categorizeCourses(displayedCourses);

  const hasSearchResults = searchQuery && searchResults.length > 0;
  const hasSearchWithNoResults = searchQuery && searchResults.length === 0;

  // Handle course click
  const handleCourseClick = (courseId) => {
    if (!isAuthenticated) {
      setSearchParams({ courseId });
      openLoginModal();
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <Stack spacing={3}>
      {/* Hero Section - Show only for non-authenticated users or when no search */}
      {(!isAuthenticated || (!hasSearchResults && !isSearching)) && (
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: { xs: 6, md: 10 },
            px: 2,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3} alignItems={{ xs: "center", md: "flex-start" }}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Learn Anything, Anytime
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    fontWeight: 300,
                    maxWidth: 500,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  Unlock your potential with expert-led courses across all
                  domains
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>
      )}
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {hasSearchResults
            ? `Search Results for "${searchQuery}"`
            : isAuthenticated
              ? `Welcome back, ${user?.name || "Student"}!`
              : "Explore Our Courses"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {hasSearchResults
            ? `Found ${searchResults.length} course${
                searchResults.length !== 1 ? "s" : ""
              }`
            : isAuthenticated
              ? "Track your progress and continue learning"
              : "Discover amazing courses and start learning today"}
        </Typography>
      </Stack>

      {/* Show stats when authenticated and not searching */}
      {isAuthenticated && !hasSearchResults && !isSearching && (
        <>
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
        </>
      )}

      {/* Show loading state */}
      {isSearching && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">Searching courses...</Typography>
        </Box>
      )}

      {/* Show no results message */}
      {hasSearchWithNoResults && !isSearching && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No courses found for "{searchQuery}"
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try different keywords or browse all courses
          </Typography>
        </Box>
      )}

      {/* Show categorized courses */}
      {!hasSearchWithNoResults && !isSearching && (
        <Stack spacing={4}>
          {Object.entries(categorizedResults).map(([category, courses]) => (
            <Box key={category}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {category}
                </Typography>
                <Chip
                  label={`${courses.length} course${
                    courses.length !== 1 ? "s" : ""
                  }`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>

              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
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
                      onClick={() => handleCourseClick(course.id)}
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

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "primary.main" }}
                          >
                            {course.price}
                          </Typography>
                          <Chip
                            label={course.category}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default DashboardPage;
