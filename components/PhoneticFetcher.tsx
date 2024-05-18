import { useState, useEffect } from "react";
import { supabase } from "../library/supabaseClient";

type Phonetic = {
  word: string;
  phonetic: string;
  definitions: string[];
};

const PhoneticFetcher = () => {
  const [phonetic, setPhonetic] = useState<Phonetic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const fetchRandomPhonetic = async () => {
    setLoading(true);
    setMessage("");
    setGuess("");
    try {
      // Fetch all phonetics
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

      // Select a random phonetic
      const randomIndex = Math.floor(Math.random() * phoneticsData.length);
      const phoneticData = phoneticsData[randomIndex];
      console.log("Selected phonetic data:", phoneticData);

      // Fetch definitions for the selected phonetic
      const { data: definitionsData, error: definitionsError } = await supabase
        .from("definitions")
        .select("definition")
        .eq("word", phoneticData.word);

      if (definitionsError) {
        console.error("Error fetching definitions:", definitionsError.message);
        throw definitionsError;
      }

      const definitions = definitionsData.map((def) => def.definition);
      console.log("Fetched definitions:", definitions);

      setPhonetic({
        word: phoneticData.word,
        phonetic: phoneticData.phonetic,
        definitions,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching phonetic:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPhonetic();
  }, []);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim().toLowerCase() === phonetic?.word.toLowerCase()) {
      setMessage("Correct! Fetching a new word...");
      setTimeout(() => {
        fetchRandomPhonetic();
      }, 2000);
    } else {
      setMessage("Incorrect, try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      {phonetic && (
        <div className="mb-4 p-4 border rounded shadow w-full max-w-md">
          <p className="text-gray-600">{phonetic.phonetic}</p>
          <ul className="list-disc list-inside">
            {phonetic.definitions.map((definition, index) => (
              <li key={index}>{definition}</li>
            ))}
          </ul>
          <form onSubmit={handleGuessSubmit} className="mt-4 w-full">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="px-4 py-2 border rounded w-full"
              placeholder="Type your guess here..."
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full"
            >
              Submit Guess
            </button>
          </form>
          {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PhoneticFetcher;
