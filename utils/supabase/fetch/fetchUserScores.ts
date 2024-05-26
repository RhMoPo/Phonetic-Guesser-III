import { supabase } from "../../../library/supabaseClient";

export const fetchUserScores = async () => {
  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data.user) {
    throw new Error("No user logged in.");
  }

  const { user } = data;

  const { data: scores, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return scores;
};
