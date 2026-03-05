# Course APIs - Integration Options

This document lists available open APIs for integrating real course data into EduStream.

## 🎓 Education Platform APIs

### 1. **Udemy API**

- **Website**: https://www.udemy.com/developers/
- **Access**: Requires partnership/affiliate program
- **Features**:
  - Course catalog with 200,000+ courses
  - Course details, reviews, pricing
  - Instructor information
  - Search and filtering
- **Rate Limits**: Varies by partnership tier
- **Best For**: Large course library with professional content

### 2. **Coursera API**

- **Website**: https://www.coursera.org/api
- **Access**: Partner institutions only
- **Features**:
  - University courses and specializations
  - Certificates and degrees
  - Partner institution content
- **Best For**: Academic and university-level courses

### 3. **edX API**

- **Website**: https://www.edx.org/api
- **Access**: Open for partners
- **Features**:
  - University courses from top institutions
  - Course catalog and enrollment data
  - Progress tracking
- **Best For**: Free university courses and MOOCs

### 4. **YouTube Data API v3**

- **Website**: https://developers.google.com/youtube/v3
- **Access**: Free with quota limits (10,000 units/day)
- **API Key**: Requires Google Cloud Platform account
- **Features**:
  - Search for educational videos
  - Channel and playlist data
  - Video metadata and statistics
  - Comments and ratings
- **Rate Limits**: 10,000 quota units per day (free tier)
- **Best For**: Free educational video content
- **Example Search**: `q=programming tutorial education`

### 5. **Khan Academy API**

- **Website**: https://api-explorer.khanacademy.org/
- **Access**: Public API available
- **Features**:
  - Free educational content
  - Topic tree and exercises
  - Video library
- **Best For**: K-12 and fundamental education

### 6. **Canvas LMS API**

- **Website**: https://canvas.instructure.com/doc/api/
- **Access**: Open source LMS
- **Features**:
  - Course management
  - Assignment and grading
  - User management
- **Best For**: Self-hosted LMS integration

## 🔧 Implementation Recommendation

### Short-term (Current Implementation)

Use the **mock API** in `src/services/courseApi.js` for development and testing.

### Mid-term (YouTube Integration)

```javascript
// Example: YouTube Data API v3
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export const searchYouTubeCourses = async (query) => {
  const response = await fetch(
    `${YOUTUBE_API_URL}/search?part=snippet&q=${encodeURIComponent(query + " tutorial")}&type=video&videoCategoryId=27&key=${YOUTUBE_API_KEY}&maxResults=12`,
  );
  const data = await response.json();
  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    instructor: item.snippet.channelTitle,
    category: "Video Course",
    image: item.snippet.thumbnails.medium.url,
    description: item.snippet.description,
    duration: "Video",
    price: "Free",
  }));
};
```

### Long-term (Custom Supabase Backend)

Create a courses table in Supabase with:

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  instructor TEXT,
  category TEXT,
  level TEXT,
  duration TEXT,
  price TEXT,
  rating DECIMAL(3,2),
  student_count INTEGER,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX courses_search_idx ON courses
  USING gin(to_tsvector('english', title || ' ' || description || ' ' || instructor));
```

Then query with Supabase client:

```javascript
export const searchCourses = async (query) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .or(
      `title.ilike.%${query}%,description.ilike.%${query}%,instructor.ilike.%${query}%`,
    )
    .limit(50);

  if (error) throw error;
  return data;
};
```

## 🚀 Getting Started

### Option 1: YouTube API (Easiest)

1. Create a project in Google Cloud Console
2. Enable YouTube Data API v3
3. Generate an API key
4. Add to `.env`: `VITE_YOUTUBE_API_KEY=your_key_here`
5. Update `courseApi.js` with YouTube integration

### Option 2: Supabase Backend (Recommended)

1. Create courses table in Supabase
2. Populate with course data (manual or scraping)
3. Use Supabase client for searches
4. Benefits: Full control, no rate limits, custom features

### Option 3: Udemy Affiliate (Professional)

1. Apply for Udemy Affiliate Program
2. Get API credentials
3. Integrate with official API
4. Earn commissions on course sales

## 📝 Current State

The app currently uses a **mock API** with 12 sample courses in:

- `src/services/courseApi.js`

This allows full functionality for:

- Search by title, instructor, category, description
- Category-based filtering
- Course details display
- No external dependencies or API keys needed

Replace the mock data with real API calls when ready for production.
