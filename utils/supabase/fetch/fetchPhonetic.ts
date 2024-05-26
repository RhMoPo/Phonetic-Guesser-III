// src/utils/fetchPhonetic.ts
import { supabase } from "../../../library/supabaseClient";

type Phonetic = {
  word: string;
  phonetic: string;
  definitions: string[];
};

export const fetchRandomPhonetic = async (): Promise<Phonetic | null> => {
  try {
    const { data: phoneticsData, error: phoneticsError } = await supabase
      .from("phonetics")
      .select("*");

    if (phoneticsError) {
      console.error("Error fetching phonetic:", phoneticsError.message);
      throw phoneticsError;
    }

    if (!phoneticsData || phoneticsData.length === 0) {
      throw new Error("No phonetic data found.");
    }

    const randomIndex = Math.floor(Math.random() * phoneticsData.length);
    const phoneticData = phoneticsData[randomIndex];

    const { data: definitionsData, error: definitionsError } = await supabase
      .from("definitions")
      .select("definition")
      .eq("word", phoneticData.word);

    if (definitionsError) {
      console.error("Error fetching definitions:", definitionsError.message);
      throw definitionsError;
    }

    const definitions = definitionsData.map(
      (def: { definition: string }) => def.definition
    );

    return {
      word: phoneticData.word,
      phonetic: phoneticData.phonetic,
      definitions,
    };
  } catch (error) {
    console.error("Error fetching phonetic:", error);
    return null;
  }
};
