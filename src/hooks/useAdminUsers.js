import { useState } from "react";
import { supabase } from "../services/supabase/client";

export const useAdminUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            roll_no: userData.roll_no,
            role: "student"
          }
        ]);

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addUser, loading, error };
};