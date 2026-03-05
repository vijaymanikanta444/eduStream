import { getSupabaseClient } from "./client";

export async function invokeFunction(functionName, body = {}, options = {}) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.functions.invoke(functionName, {
    body,
    ...options,
  });

  if (error) {
    throw new Error(
      error.message ?? `Failed to invoke function: ${functionName}`,
    );
  }

  return data;
}
