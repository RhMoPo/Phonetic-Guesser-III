import { useState, useEffect } from "react";
import { fetchRandomPhonetic } from "../utils/supabase/fetch/fetchPhonetic";
import { fetchUserScores } from "../utils/supabase/fetch/fetchUserScores";
import { updateScore } from "../utils/supabase/fetch/updateScore";
import SkipButton from "../components/SkipButton";
import HintButton from "../components/HintButton";
import PhoneticDisplay from "../components/PhoneticDisplay";
import GuessInputForm from "../components/GuessInputForm";
import HintBox from "../components/HintBox";
import { supabase } from "../library/supabaseClient";

type Phonetic = {
  word: string;
  phonetic: string;
  definitions: string[];
};

const PhoneticFetcher: React.FC = () => {
  const [phonetic, setPhonetic] = useState<Phonetic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        console.error("Error fetching user:", error || "No user logged in.");
      } else {
        setUserId(data.user.id);
        const userScores = await fetchUserScores();
        setScore(userScores.score);
      }
    };

    loadUser();
    loadPhonetic();
  }, []);

  const loadPhonetic = async () => {
    setLoading(true);
    setMessage("");
    setShowHint(false);
    const fetchedPhonetic = await fetchRandomPhonetic();
    if (fetchedPhonetic) {
      setPhonetic(fetchedPhonetic);
    }
    setLoading(false);
  };

  const handleGuessSubmit = async (guess: string) => {
    if (guess.trim().toLowerCase() === phonetic?.word.toLowerCase()) {
      setMessage("Correct! Fetching a new word...");
      if (userId) {
        await updateScore(userId, 1);
        const updatedScores = await fetchUserScores();
        setScore(updatedScores.score);
      }
      loadPhonetic();
    } else {
      setMessage("Incorrect");
    }
  };

  const handleSkip = () => {
    loadPhonetic();
  };

  const handleHint = () => {
    setShowHint((prevShowHint) => !prevShowHint);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {phonetic && (
        <>
          <div className="w-full max-w-md">
            <PhoneticDisplay phonetic={phonetic.phonetic} />
          </div>
          <div className="w-full max-w-md mt-4">
            <GuessInputForm onSubmit={handleGuessSubmit} message={message} />
            <div className="flex justify-center mt-2 space-x-2">
              <SkipButton onSkip={handleSkip} />
              <HintButton onHint={handleHint} showHint={showHint} />
            </div>
          </div>
          <div className="w-full max-w-md mt-4">
            <HintBox definitions={phonetic.definitions} showHint={showHint} />
          </div>
          <div className="w-full max-w-md mt-4 text-center">
            <p>Score: {score}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneticFetcher;
