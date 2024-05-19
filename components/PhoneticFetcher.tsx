import { useState, useEffect } from "react";
import { supabase } from "../library/supabaseClient";
import SkipButton from "../components/SkipButton";
import HintButton from "../components/HintButton";
import { FaArrowAltCircleRight } from "react-icons/fa";

type Phonetic = {
  word: string;
  phonetic: string;
  definitions: string[];
};

const PhoneticFetcher: React.FC = () => {
  const [phonetic, setPhonetic] = useState<Phonetic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);

  const fetchRandomPhonetic = async () => {
    setLoading(true);
    setMessage("");
    setGuess("");
    setShowHint(false);
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
      
    } else {
      setMessage("Incorrect, try again.");
    }
  };

  const handleSkip = () => {
    fetchRandomPhonetic();
  };

  const handleHint = () => {
    setShowHint((prevShowHint) => !prevShowHint);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {phonetic && (
        <>
          <p className="text-gray-600 text-4xl font-bold text-center mb-8">
            {phonetic.phonetic}
          </p>
          <div className="w-full max-w-md">
            <form onSubmit={handleGuessSubmit} className="w-full relative">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="px-4 py-2 border-2 w-full pr-10"
                placeholder="Type your guess here..."
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full flex items-center justify-center px-4 bg-white border-2 border-l-0 rounded-r"
              >
                <FaArrowAltCircleRight className="text-2xl" />
              </button>
            </form>
            {message && <p className="mt-2 text-green-200">{message}</p>}
            <div className="flex mt-2 space-x-2">
              <SkipButton onSkip={handleSkip} />
              <HintButton onHint={handleHint} showHint={showHint} />
            </div>
            {showHint && (
              <div className="mt-4 p-4 border rounded max-h-40 overflow-y-auto">
                <ul className="list-disc list-inside">
                  {phonetic.definitions.map((definition, index) => (
                    <li key={index}>{definition}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneticFetcher;
