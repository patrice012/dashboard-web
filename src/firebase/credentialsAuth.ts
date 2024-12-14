import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

export const signInWithCredentials = async (
  email: string,
  password: string
) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return resp.user;
  } catch (e) {
    console.log(e);
    // throw error to the parent component
    throw e;
  }
};

export const loginWithCredentials = async (email: string, password: string) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return resp.user;
  } catch (e) {
    console.log(e);
    // throw error to the parent component
    throw e;
  }
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();
