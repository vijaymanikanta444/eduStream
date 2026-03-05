import { useState } from "react";
import { supabase } from "../services/supabase/client";
import { useAuth } from "../contexts/AuthContext";

export const useCourseSections = () => {
  const { user } = useAuth();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------
  // GET SECTIONS BY COURSE
  // -------------------------
  const fetchSections = async (courseId) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("course_sections")
      .select("*")
      .eq("course_id", courseId)
      .order("position", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setSections(data);
    }

    setLoading(false);
  };

  // -------------------------
  // CREATE SECTION
  // -------------------------
  const createSection = async (sectionData) => {
    if (!user || (user.role !== "admin" && user.role !== "faculty")) {
      setError("Permission denied");
      return;
    }

    const { error } = await supabase
      .from("course_sections")
      .insert([sectionData]);

    if (error) {
      setError(error.message);
    }
  };

  // -------------------------
  // UPDATE SECTION
  // -------------------------
  const updateSection = async (id, updates) => {
    if (!user || (user.role !== "admin" && user.role !== "faculty")) {
      setError("Permission denied");
      return;
    }

    const { error } = await supabase
      .from("course_sections")
      .update(updates)
      .eq("id", id);

    if (error) {
      setError(error.message);
    }
  };

  // -------------------------
  // DELETE SECTION
  // -------------------------
  const deleteSection = async (id) => {
    if (!user || user.role !== "admin") {
      setError("Only admin can delete sections");
      return;
    }

    const { error } = await supabase
      .from("course_sections")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
    }
  };

  return {
    sections,
    loading,
    error,
    fetchSections,
    createSection,
    updateSection,
    deleteSection,
  };
};