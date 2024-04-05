import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Ensure this is your correct path

// This function initializes the Supabase client; ensure it's correctly set up.
const supabase = createClient();

function useGetUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    // Initially check if the user is logged in
    checkUserSession();

    // Listen for changes in auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isLoggedIn };
}

export default useGetUser;
