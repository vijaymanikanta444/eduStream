import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/common/LoginModal";
import { useSearch } from "../contexts/SearchContext";
import { categorizeCourses } from "../services/courseApi";

const trendingCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    rating: 4.8,
    students: "125,430",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    category: "Development",
    duration: "52 hours",
  },
  {
    id: 2,
    title: "Machine Learning A-Z: AI, Python & R",
    instructor: "Kirill Eremenko",
    rating: 4.7,
    students: "89,234",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
    category: "Data Science",
    duration: "44 hours",
  },
  {
    id: 3,
    title: "The Complete Digital Marketing Course",
    instructor: "Rob Percival",
    rating: 4.6,
    students: "67,890",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    category: "Marketing",
    duration: "23 hours",
  },
  {
    id: 4,
    title: "iOS Development Bootcamp with Swift",
    instructor: "Angela Yu",
    rating: 4.9,
    students: "45,678",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    category: "Mobile Dev",
    duration: "58 hours",
  },
  {
    id: 5,
    title: "Complete Python Developer Course",
    instructor: "Jose Portilla",
    rating: 4.7,
    students: "134,567",
    image: "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?w=400",
    category: "Programming",
    duration: "36 hours",
  },
  {
    id: 6,
    title: "UI/UX Design Masterclass 2026",
    instructor: "Daniel Walter Scott",
    rating: 4.8,
    students: "56,234",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    category: "Design",
    duration: "31 hours",
  },
];

function PublicHomePage() {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { searchQuery, searchResults, isSearching } = useSearch();

  // Categorize search results
  const categorizedResults =
    searchResults.length > 0 ? categorizeCourses(searchResults) : {};

  const hasSearchResults = searchQuery && searchResults.length > 0;
  const hasSearchWithNoResults = searchQuery && searchResults.length === 0;

  return (
    <Box>
      {/* Hero Section - Only show when not searching */}
      {!hasSearchResults && !isSearching && !hasSearchWithNoResults && (
        <Box
          sx={{
            bgcolor: "background.paper",
            py: { xs: 6, md: 10 },
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2rem", md: "3rem" },
                    }}
                  >
                    Learn Without Limits
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Start, switch, or advance your career with thousands of
                    courses, Professional Certificates, and degrees from
                    world-class universities and companies.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Get Started
                    </Button>
                    <Button variant="outlined" size="large">
                      Explore Courses
                    </Button>
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                  alt="Students learning"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Search Results or Trending Courses Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={4}>
          {/* Show loading state */}
          {isSearching && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="text.secondary">
                Searching courses...
              </Typography>
            </Box>
          )}

          {/* Show no results message */}
          {hasSearchWithNoResults && !isSearching && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No courses found for "{searchQuery}"
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try different keywords or browse trending courses below
              </Typography>
            </Box>
          )}

          {/* Show search results when available */}
          {hasSearchResults && !isSearching && (
            <Stack spacing={4}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Search Results for "{searchQuery}"
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Found {searchResults.length} course
                  {searchResults.length !== 1 ? "s" : ""}
                </Typography>
              </Box>

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
                      label={`${courses.length} course${courses.length !== 1 ? "s" : ""}`}
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
                          onClick={() => setLoginModalOpen(true)}
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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

          {/* Show trending courses when no search */}
          {!hasSearchResults && !isSearching && !hasSearchWithNoResults && (
            <>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Trending Now
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Popular courses students are taking right now
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {trendingCourses.map((course) => (
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
                      onClick={() => setLoginModalOpen(true)}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="200"
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
                            label={course.category}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.9)",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <PlayCircleOutlineIcon
                            sx={{
                              fontSize: 64,
                              color: "white",
                              opacity: 0.8,
                            }}
                          />
                        </Box>
                      </Box>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: "1rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {course.title}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {course.instructor}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700, color: "warning.main" }}
                            >
                              ⭐ {course.rating}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              ({course.students} students)
                            </Typography>
                          </Box>

                          <Typography variant="caption" color="text.secondary">
                            {course.duration} total
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Stack>
      </Container>

      {/* CTA Section - Only show when not in search mode */}
      {!hasSearchResults && !isSearching && (
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 8,
            mt: 6,
          }}
        >
          <Container maxWidth="md">
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Ready to Start Learning?
              </Typography>
              <Typography variant="h6">
                Join thousands of students already learning on EduStream
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
                onClick={() => setLoginModalOpen(true)}
              >
                Sign Up Now
              </Button>
            </Stack>
          </Container>
        </Box>
      )}

      {/* Login Modal */}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </Box>
  );
}

export default PublicHomePage;
