import { supabase } from "../../../library/supabaseClient";

export const updateScore = async (userId: string, increment: number) => {
  const { data: currentScoreData, error: fetchError } = await supabase
    .from("scores")
    .select("score")
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const newScore = (currentScoreData.score || 0) + increment;

  const { data, error } = await supabase
    .from("scores")
    .update({ score: newScore })
    .eq("user_id", userId)
    .select();

  if (error) {
    throw error;
  }

  return data;
};
