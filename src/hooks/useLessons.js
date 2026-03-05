import { useState } from "react";
import { supabase } from "../services/supabase/client";
import { useAuth } from "../contexts/AuthContext";

export const useLessons = () => {
  const { user } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------
  // GET LESSONS BY SECTION
  // -------------------------
  const fetchLessons = async (sectionId) => {
    console.log({ sectionId });
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("course_lessons")
      .select("*")
      .eq("section_id", sectionId)
      .order("position", { ascending: true });

    if (error) {
      setError(error.message);
      setLoading(false);
      return [];
    } else {
      const nextLessons = data || [];
      setLessons(nextLessons);
      setLoading(false);
      return nextLessons;
    }
  };

  // -------------------------
  // CREATE LESSON
  // -------------------------
  const createLesson = async (lessonData) => {
    if (!user || (user.role !== "admin" && user.role !== "faculty")) {
      setError("Permission denied");
      return;
    }

    const { error } = await supabase
      .from("course_lessons")
      .insert([lessonData]);

    if (error) {
      setError(error.message);
    }
  };

  // -------------------------
  // UPDATE LESSON
  // -------------------------
  const updateLesson = async (id, updates) => {
    if (!user || (user.role !== "admin" && user.role !== "faculty")) {
      setError("Permission denied");
      return;
    }

    const { error } = await supabase
      .from("course_lessons")
      .update(updates)
      .eq("id", id);

    if (error) {
      setError(error.message);
    }
  };

  // -------------------------
  // DELETE LESSON
  // -------------------------
  const deleteLesson = async (id) => {
    if (!user || user.role !== "admin") {
      setError("Only admin can delete lessons");
      return;
    }

    const { error } = await supabase
      .from("course_lessons")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
    }
  };

  return {
    lessons,
    loading,
    error,
    fetchLessons,
    createLesson,
    updateLesson,
    deleteLesson,
  };
};
