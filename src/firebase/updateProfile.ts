import { updateProfile, User } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

// Define the type for the profile data
interface UserProfileData {
  displayName?: string;
  photoURL?: string;
  email?: string;
}

export const updateUserProfile = async (
  data: UserProfileData
): Promise<boolean> => {
  try {
    const user: User | null = auth.currentUser;

    if (user) {
      await updateProfile(user, { ...data });
      return true;
    } else {
      console.error("No authenticated user.");
      return false;
    }
  } catch (error) {
    console.error("Failed to update profile: ", error);
    return false;
  }
};
