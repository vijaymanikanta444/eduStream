import { useState } from "react";
import { supabase } from "../supabaseClient";

export const useSupAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Login with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      return profile;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};