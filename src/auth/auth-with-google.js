import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  setAuthToLocalStorage,
  removeAuthFromLocalStorage,
} from "./auth-local-storage";
import { testDatabase } from "../utility/testDatabase";
import { ContextWrapper } from "../context/ContextWrapper";

function googleAuth() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function login() {
  const googleAuthObject = await googleAuth();
  setAuthToLocalStorage(googleAuthObject);
  return { auth: googleAuthObject };
}

export function logout() {
  removeAuthFromLocalStorage();
  return { auth: null, database: testDatabase };
}
