import { useState, useEffect } from "react";
import { supabase } from "../services/supabase/client";
import { useAuth } from "../contexts/AuthContext";

export const useCourses = () => {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------
  // GET ALL COURSES
  // -------------------------
  const fetchCourses = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setCourses(data);
    }

    setLoading(false);
  };

  // -------------------------
  // CREATE COURSE
  // -------------------------
  const createCourse = async (courseData) => {
    if (!user || (user.role !== "admin" && user.role !== "faculty")) {
      setError("Permission denied");
      return;
    }

    const { data, error } = await supabase
      .from("courses")
      .insert([courseData]);

    if (error) {
      setError(error.message);
    } else {
      fetchCourses();
    }
  };

  // -------------------------
  // UPDATE COURSE
  // -------------------------
  const updateCourse = async (id, updates) => {
    if (!user || (user.role !== "admin" && user.role !== "faculty")) {
      setError("Permission denied");
      return;
    }

    const { error } = await supabase
      .from("courses")
      .update(updates)
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      fetchCourses();
    }
  };

  // -------------------------
  // DELETE COURSE
  // -------------------------
  const deleteCourse = async (id) => {
    if (!user || user.role !== "admin") {
      setError("Only admin can delete courses");
      return;
    }

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      fetchCourses();
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};