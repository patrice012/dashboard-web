import { updateEmail, sendEmailVerification, User } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";

// Function to update the user's email address
export const updateEmailAddress = async (newMail: string): Promise<boolean> => {
  try {
    const user: User | null = auth.currentUser;

    if (user) {
      await updateEmail(user, newMail);
      return true;
    } else {
      console.error("No authenticated user.");
      return false;
    }
  } catch (error) {
    console.error("Failed to update email: ", error);
    return false;
  }
};

// Function to send email verification to the user
export const sendEmailVerificationToUser = async (): Promise<boolean> => {
  try {
    const user: User | null = auth.currentUser;

    if (user) {
      await sendEmailVerification(user);
      return true;
    } else {
      console.error("No authenticated user.");
      return false;
    }
  } catch (error) {
    console.error("Failed to send email verification: ", error);
    return false;
  }
};
