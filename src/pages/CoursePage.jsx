import {
  Stack,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Skeleton,
  Alert,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack,
  Star,
  People,
  ExpandMore,
  Check,
  PlayCircleOutline,
  Code,
  CheckCircle,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase/client";
import { useAuth } from "../contexts/AuthContext";
import { useLessons } from "../hooks/useLessons";
import { useCourseSections } from "../hooks/useCourseSections";

function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { lessons, fetchLessons, loading: lessonsLoading } = useLessons();
  const { fetchSections } = useCourseSections();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [courseSections, setCourseSections] = useState([]);
  const [moduleWithLessons, setModuleWithLessons] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Fetch course details and modules
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) {
        setError("Course ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch course details
        const { data: courseData, error: courseError } = await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();

        if (courseError) {
          setError("Course not found");
          setLoading(false);
          return;
        }

        setCourse(courseData);

        const sectionsData = await fetchSections(id);
        setCourseSections(sectionsData || []);

        // Fetch modules for this course
        const { data: modulesData, error: modulesError } = await supabase
          .from("modules")
          .select("*")
          .eq("course_id", id)
          .order("order", { ascending: true });

        if (!modulesError && modulesData) {
          setModules(modulesData);

          // Set first module as expanded and fetch its lessons by default
          if (modulesData.length > 0) {
            setExpandedModule(modulesData[0].id);
            await loadModuleLessons(modulesData[0].id, sectionsData || []);
          }
        }

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Load lessons for a specific module
  const loadModuleLessons = async (
    moduleId,
    sectionsSource = courseSections,
  ) => {
    if (moduleWithLessons[moduleId]) {
      // Already loaded
      return;
    }

    try {
      const matchedSections = sectionsSource.filter(
        (section) => section.module_id === moduleId || section.id === moduleId,
      );

      if (matchedSections.length === 0) {
        setModuleWithLessons((prev) => ({
          ...prev,
          [moduleId]: [],
        }));
        return;
      }

      const lessonsPerSection = await Promise.all(
        matchedSections.map((section) => fetchLessons(section.id)),
      );
      const lessonsData = lessonsPerSection.flat();

      setModuleWithLessons((prev) => ({
        ...prev,
        [moduleId]: lessonsData || [],
      }));
    } catch (err) {
      console.error("Failed to load lessons:", err);
    }
  };

  // Handle module expansion and load lessons
  const handleModuleClick = async (moduleId) => {
    const isExpanding = expandedModule !== moduleId;
    setExpandedModule(isExpanding ? moduleId : null);

    if (isExpanding && !moduleWithLessons[moduleId]) {
      await loadModuleLessons(moduleId);
    }
  };

  // Handle lesson click
  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab("video");
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/?courseId=" + id);
    }
  }, [isAuthenticated, id, navigate]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", height: "calc(100vh - 72px)" }}>
        <Box sx={{ width: 320, borderRight: "1px solid #d1d7dc", p: 2 }}>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 2 }} />
          <Stack spacing={1}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={80} />
            ))}
          </Stack>
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Stack spacing={3}>
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          </Stack>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            variant="outlined"
          >
            Back To Courses
          </Button>
          <Alert severity="error">{error || "Course not found"}</Alert>
        </Stack>
      </Box>
    );
  }

  const completedModules = modules.filter((m) => m.completed).length;
  const progressPercentage =
    modules.length > 0
      ? Math.round((completedModules / modules.length) * 100)
      : 0;

  return (
    <Box
      sx={{ display: "flex", height: "calc(100vh - 72px)", bgcolor: "#f7f9fa" }}
    >
      {/* Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: 320,
          borderRight: "1px solid #d1d7dc",
          overflowY: "auto",
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #d1d7dc" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Course Content
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 2,
              justifyContent: "space-between",
              fontSize: "0.875rem",
            }}
          >
            <Typography variant="caption">
              {completedModules} of {modules.length} completed
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {progressPercentage}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{ height: 4, borderRadius: 2 }}
          />
        </Box>

        {/* Modules List */}
        <Stack sx={{ flex: 1, overflowY: "auto" }}>
          {modules.map((module, index) => (
            <Box key={module.id}>
              <Box
                onClick={() => handleModuleClick(module.id)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  borderBottom: "1px solid #d1d7dc",
                  transition: "background 0.2s",
                  bgcolor:
                    expandedModule === module.id ? "#f7f9fa" : "transparent",
                  borderLeft:
                    expandedModule === module.id ? "4px solid #667eea" : "none",
                  "&:hover": {
                    bgcolor: "#f7f9fa",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Stack spacing={0.5} sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {module.completed ? (
                        <CheckCircle
                          sx={{ fontSize: 18, color: "success.main" }}
                        />
                      ) : (
                        <PlayCircleOutline
                          sx={{ fontSize: 18, color: "primary.main" }}
                        />
                      )}
                      <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                        {index + 1}. {module.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", ml: 3 }}
                    >
                      {moduleWithLessons[module.id]?.length || 0} lessons
                    </Typography>
                  </Stack>
                  <ExpandMore
                    sx={{
                      fontSize: 18,
                      transform:
                        expandedModule === module.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </Box>
              </Box>

              {/* Lessons */}
              {expandedModule === module.id && (
                <Stack sx={{ bgcolor: "#f9f9f9" }}>
                  {lessonsLoading ? (
                    <Box sx={{ p: 2, pl: 4 }}>
                      <Stack spacing={1}>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} variant="text" width="80%" />
                        ))}
                      </Stack>
                    </Box>
                  ) : moduleWithLessons[module.id]?.length > 0 ? (
                    moduleWithLessons[module.id].map((lesson, lessonIndex) => (
                      <Box
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        sx={{
                          p: 1.5,
                          pl: 4,
                          borderBottom: "1px solid #d1d7dc",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          bgcolor:
                            selectedLesson?.id === lesson.id
                              ? "#e3f2fd"
                              : "transparent",
                          "&:hover": {
                            bgcolor:
                              selectedLesson?.id === lesson.id
                                ? "#e3f2fd"
                                : "#f0f0f0",
                          },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {lesson.completed ? (
                            <Check
                              sx={{ fontSize: 16, color: "success.main" }}
                            />
                          ) : (
                            <PlayCircleOutline
                              sx={{ fontSize: 16, color: "primary.main" }}
                            />
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "0.85rem",
                              fontWeight:
                                selectedLesson?.id === lesson.id ? 600 : 400,
                            }}
                          >
                            {lessonIndex + 1}. {lesson.title}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ p: 2, pl: 4 }}>
                      <Typography variant="caption" color="text.secondary">
                        No lessons yet
                      </Typography>
                    </Box>
                  )}
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          bgcolor: "#f7f9fa",
        }}
      >
        <Stack spacing={4}>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            variant="text"
            sx={{ alignSelf: "flex-start" }}
          >
            Back To Courses
          </Button>

          {/* Course Header */}
          <Box
            component={Paper}
            elevation={0}
            sx={{ bgcolor: "white", p: 3, borderRadius: 2 }}
          >
            {/* Course Image */}
            <Box
              component="img"
              src={course.image}
              alt={course.title}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 2,
                mb: 3,
                bgcolor: "action.hover",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

            {/* Course Info */}
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                    {course.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Instructor: {course.instructor}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                  >
                    <Chip
                      label={course.category}
                      variant="outlined"
                      color="primary"
                    />
                    <Chip
                      label={course.level}
                      color={
                        course.level === "Beginner"
                          ? "success"
                          : course.level === "Intermediate"
                            ? "warning"
                            : "error"
                      }
                    />
                  </Stack>
                </Box>
                <Chip label="In Progress" color="warning" />
              </Box>
            </Stack>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <PlayCircleOutline
                    sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                  />
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    Duration
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {course.duration}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Code sx={{ fontSize: 32, color: "info.main", mb: 1 }} />
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    Modules
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {modules.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Star sx={{ fontSize: 32, color: "warning.main", mb: 1 }} />
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    Rating
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {course.rating || "4.5"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <People sx={{ fontSize: 32, color: "success.main", mb: 1 }} />
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    display="block"
                    sx={{ mb: 1 }}
                  >
                    Students
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {course.students || "0"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs */}
          <Paper
            elevation={0}
            sx={{ borderBottom: "1px solid #d1d7dc", bgcolor: "white" }}
          >
            <Stack direction="row" spacing={0}>
              {["overview", "video", "assignment", "qna"].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    textTransform: "capitalize",
                    borderBottom: activeTab === tab ? "3px solid" : "none",
                    borderColor:
                      activeTab === tab ? "primary.main" : "transparent",
                    borderRadius: 0,
                    color:
                      activeTab === tab ? "primary.main" : "text.secondary",
                    fontWeight: activeTab === tab ? 600 : 500,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </Stack>
          </Paper>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  About This Course
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  {course.description ||
                    "No description provided for this course."}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  What You'll Learn
                </Typography>
                <Stack spacing={1}>
                  {[
                    "Master core concepts",
                    "Build real-world projects",
                    "Get industry-ready skills",
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 2 }}>
                      <Check sx={{ color: "success.main", flexShrink: 0 }} />
                      <Typography>{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {activeTab === "video" && (
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Video Lectures
                </Typography>
                <Alert severity="info">
                  Video content will be available soon. Check back later!
                </Alert>
              </CardContent>
            </Card>
          )}

          {activeTab === "assignment" && (
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Assignments
                </Typography>
                <Alert severity="info">
                  Assignments will be available as you progress through the
                  course modules.
                </Alert>
              </CardContent>
            </Card>
          )}

          {activeTab === "qna" && (
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Q&A Sessions
                </Typography>
                <Alert severity="info">
                  Live Q&A sessions will be scheduled. Check back for upcoming
                  sessions!
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Button variant="outlined" startIcon={<ArrowBack />}>
              Previous Module
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowBack sx={{ transform: "rotate(180deg)" }} />}
            >
              Next Module
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default CoursePage;
