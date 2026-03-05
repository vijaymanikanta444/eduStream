import { getSupabaseClient } from "./client";

export async function checkSupabaseConnection() {
  let supabase;

  try {
    supabase = getSupabaseClient();
  } catch (error) {
    return { success: false, error: error.message };
  }

  const { error } = await supabase.from("_healthcheck").select("*").limit(1);

  if (!error) {
    return { success: true };
  }

  if (error.code === "PGRST205") {
    return { success: true };
  }

  return {
    success: false,
    error: error.message ?? "Unable to connect to Supabase.",
  };
}

export async function fetchRows(table, queryBuilder) {
  const supabase = getSupabaseClient();
  const query = queryBuilder
    ? queryBuilder(supabase.from(table).select("*"))
    : supabase.from(table).select("*");
  return query;
}

export async function insertRow(table, payload) {
  const supabase = getSupabaseClient();
  return supabase.from(table).insert(payload).select("*").single();
}
