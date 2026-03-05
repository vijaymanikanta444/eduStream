// Mock Course API Service
// TODO: Replace with real API integration (Udemy, Coursera, edX, or custom backend)

const MOCK_COURSES = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    category: "Development",
    rating: 4.8,
    students: "125,430",
    duration: "52 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp",
    price: "$89.99",
  },
  {
    id: 2,
    title: "Machine Learning A-Z: AI, Python & R",
    instructor: "Kirill Eremenko",
    category: "Data Science",
    rating: 4.6,
    students: "234,120",
    duration: "44 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    description:
      "Master Machine Learning with Python and R, including Neural Networks and Deep Learning",
    price: "$94.99",
  },
  {
    id: 3,
    title: "The Complete Digital Marketing Course",
    instructor: "Rob Percival",
    category: "Marketing",
    rating: 4.5,
    students: "89,234",
    duration: "23 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    description: "Learn SEO, Social Media Marketing, Email Marketing, and more",
    price: "$79.99",
  },
  {
    id: 4,
    title: "Advanced React and Redux",
    instructor: "Stephen Grider",
    category: "Development",
    rating: 4.7,
    students: "156,890",
    duration: "38 hours",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    description:
      "Master React and Redux with advanced patterns and best practices",
    price: "$84.99",
  },
  {
    id: 5,
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    category: "Data Science",
    rating: 4.9,
    students: "198,234",
    duration: "47 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    description:
      "Learn Python programming for data analysis, visualization, and machine learning",
    price: "$89.99",
  },
  {
    id: 6,
    title: "UI/UX Design Masterclass 2026",
    instructor: "Daniel Walter Scott",
    category: "Design",
    rating: 4.8,
    students: "56,234",
    duration: "31 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    description:
      "Complete guide to UI/UX design, Figma, Adobe XD, and user research",
    price: "$74.99",
  },
  {
    id: 7,
    title: "Complete SQL Bootcamp 2026",
    instructor: "Jose Portilla",
    category: "Database",
    rating: 4.6,
    students: "143,567",
    duration: "29 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    description: "Master SQL queries, PostgreSQL, MySQL, and database design",
    price: "$69.99",
  },
  {
    id: 8,
    title: "AWS Certified Solutions Architect",
    instructor: "Ryan Kroonenburg",
    category: "Cloud Computing",
    rating: 4.7,
    students: "187,456",
    duration: "34 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    description:
      "Complete guide to AWS services and Solutions Architect certification",
    price: "$99.99",
  },
  {
    id: 9,
    title: "Complete JavaScript Course 2026",
    instructor: "Jonas Schmedtmann",
    category: "Development",
    rating: 4.8,
    students: "289,123",
    duration: "69 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    description:
      "Modern JavaScript from beginner to advanced, including projects and best practices",
    price: "$84.99",
  },
  {
    id: 10,
    title: "Complete Graphic Design Course",
    instructor: "Lindsay Marsh",
    category: "Design",
    rating: 4.6,
    students: "67,890",
    duration: "37 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=400",
    description:
      "Learn graphic design with Photoshop, Illustrator, and InDesign",
    price: "$79.99",
  },
  {
    id: 11,
    title: "Cybersecurity Complete Course",
    instructor: "Nathan House",
    category: "Security",
    rating: 4.5,
    students: "92,345",
    duration: "41 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    description:
      "Complete cybersecurity course covering ethical hacking, penetration testing, and more",
    price: "$94.99",
  },
  {
    id: 12,
    title: "Data Structures and Algorithms",
    instructor: "Abdul Bari",
    category: "Computer Science",
    rating: 4.9,
    students: "178,234",
    duration: "55 hours",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    description:
      "Master data structures and algorithms for coding interviews and software development",
    price: "$89.99",
  },
];

/**
 * Search courses by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching courses
 */
export const searchCourses = async (query) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!query || query.trim() === "") {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();

  // Filter courses by title, instructor, category, or description
  const results = MOCK_COURSES.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm),
  );

  return results;
};

/**
 * Get all courses
 * @returns {Promise<Array>} - Array of all courses
 */
export const getAllCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_COURSES;
};

/**
 * Get courses by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Array of courses in category
 */
export const getCoursesByCategory = async (category) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return MOCK_COURSES.filter(
    (course) => course.category.toLowerCase() === category.toLowerCase(),
  );
};

/**
 * Categorize courses by category
 * @param {Array} courses - Array of courses
 * @returns {Object} - Object with categories as keys and course arrays as values
 */
export const categorizeCourses = (courses) => {
  const categorized = {};

  courses.forEach((course) => {
    const category = course.category;
    if (!categorized[category]) {
      categorized[category] = [];
    }
    categorized[category].push(course);
  });

  return categorized;
};

/**
 * Get unique categories
 * @returns {Array<string>} - Array of unique category names
 */
export const getCategories = () => {
  const categories = [
    ...new Set(MOCK_COURSES.map((course) => course.category)),
  ];
  return categories.sort();
};

// Note: For production, replace this mock service with real API integrations:
// - Udemy API: https://www.udemy.com/developers/
// - Coursera API: https://www.coursera.org/about/partners
// - edX API: https://www.edx.org/api
// - YouTube Data API v3: https://developers.google.com/youtube/v3
// - Custom Supabase backend with course data
