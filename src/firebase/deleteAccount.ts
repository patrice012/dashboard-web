import { deleteUser, User } from "firebase/auth";
import { FirebaseAuth as auth } from "./config";
import postReq from "@/helpers/postReq";

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const user: User | null = auth.currentUser;

    if (user) {
      await deleteUser(user);
      await postReq({ data: { uid: user.uid }, url: "/api/user/delete" });
      return true;
    }
    console.log("No user is currently signed in.");
    return false;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
