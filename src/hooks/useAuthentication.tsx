import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const useAuthentication = () => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // after login

    if (!user) {
      // after logout
    }
  }, [user, loading, error]);

  return {
    user,
    loading,
    error,
  };
};

export default useAuthentication;