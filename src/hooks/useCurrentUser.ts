// hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth as auth } from "../firebase/config";
export const useCurrentUser = () => {
  return useAuthState(auth);
};
