import { updatePassword, sendPasswordResetEmail, User } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

// Function to update the user's password
export const updateUserPassword = async (
  newPassword: string
): Promise<boolean> => {
  try {
    const user: User | null = auth.currentUser;

    if (user) {
      await updatePassword(user, newPassword);
      return true;
    } else {
      console.error("No authenticated user.");
      return false;
    }
  } catch (error) {
    console.error("Failed to update password: ", error);
    return false;
  }
};

// Function to send a password reset email to a user
export const sendPasswordResetEmailToUser = async (
  email: string
): Promise<boolean> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Failed to send password reset email: ", error);
    return false;
  }
};
