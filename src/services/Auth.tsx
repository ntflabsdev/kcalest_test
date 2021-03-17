import { auth as firebaseAuth} from "../firebase";
import { useEffect, useState } from "react";
import { clearFavouritesCache } from './FavouritesService';

interface AuthInit {
    loading: boolean;
    loggedIn: boolean;
    userId: string;
}

export function  useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true, loggedIn: false, userId:''});
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged(authUser => {
            authUser ? setAuthInit({loading: false, loggedIn: true, userId:authUser.uid}) :
            setAuthInit({loading: false, loggedIn: false, userId:''})
        });
      }, []);
      return authInit;
}

export const login = async (email: string, password: string) => {
  console.log("[Auth Service] Logging in...");
  try {
    const credential = await firebaseAuth.signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.log('error caught in auth service: ', e)
    throw e;
  }
};

export const logout = () => {
  firebaseAuth.signOut();
  clearFavouritesCache();
};

export const register = async (email: string, password: string) => {
  try {
    const credential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log('error caught in auth service: ', e)
    throw e;
  }
};

