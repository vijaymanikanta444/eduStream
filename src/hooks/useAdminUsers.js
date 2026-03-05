import { useState, useEffect } from "react";
import { supabase } from "../services/supabase/client";

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async ({ name, email, password, rollnumber, role }) => {
    setError(null);

    const { data, error: createError } = await supabase
      .from("profiles")
      .insert([
        {
          name,
          email,
          password,
          roll_number: rollnumber,
          role,
        },
      ])
      .select()
      .single();

    if (createError) {
      setError(createError.message);
      throw new Error(createError.message);
    }

    setUsers((prevUsers) => [data, ...prevUsers]);
    return data;
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw new Error(fetchError.message);
      setUsers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { error } = await supabase.from("profiles").delete().eq("id", id);

      if (error) throw new Error(error.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    deleteUser,
  };
}
