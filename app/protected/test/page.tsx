// pages/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/library/supabaseClient";

const Page: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setError(error.message);
        } else if (data.user) {
          setUserId(data.user.id);
        } else {
          setError("No user is authenticated.");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setError("Failed to fetch user ID.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">User ID</h1>
      {userId ? <p>Your UUID is: {userId}</p> : <p>No user ID found.</p>}
    </div>
  );
};

export default Page;
