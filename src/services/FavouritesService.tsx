import { auth as firebaseAuth } from "../firebase";
import { firestore } from "firebase";
import { ISearchItem } from "../models/SearchItems";

interface IUserInformation {
  favourites: string[];
}

export const getCachedFavourites = () => {
  const cachedFavourites = localStorage.getItem("favourites");
  let trimmedFavourites: string[] = [];
  if (cachedFavourites != null && cachedFavourites.length > 0) {
    cachedFavourites.split(",").forEach((favourite) => {
      trimmedFavourites.push(favourite.trim());
    });
  }
  return trimmedFavourites;
};

const updateCachedFavourites = (updatedFavourites: string[]) => {
  localStorage.setItem("favourites", updatedFavourites.toString());
};

export const clearFavouritesCache = () => {
  localStorage.removeItem("favourites");
};

export function getFirebaseFavourites(): Promise<string[]> {
  if (!!firebaseAuth.currentUser) {
    const uid = firebaseAuth.currentUser?.uid;
    return firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        const userInformation = doc.data() as IUserInformation;
        let trimmedFavourites: string[] = [];
        userInformation.favourites.forEach((favourite) => {
          trimmedFavourites.push(favourite.trim());
        });
        return trimmedFavourites;
      });
  } else {
    return new Promise((res, rej) => res([]));
  }
}

const updateFirebaseFavourites = (updatedFavourites: string[]) => {
  if (!!firebaseAuth.currentUser) {
    const uid = firebaseAuth.currentUser?.uid;
    firestore().collection("users").doc(uid).set({
      favourites: updatedFavourites,
    });
  }
};

const getUpdatedFavouritesArray = (
  currentFavourites: string[],
  id: string,
  action: string
) => {
  let cloneFavourites: string[] = [];
  let updatedFavourites: string[] = [];
  if (action === "add") {
    cloneFavourites = [...currentFavourites];
    cloneFavourites.push(id);
    updatedFavourites = [...cloneFavourites];
  } else if (action === "remove") {
    cloneFavourites = [...currentFavourites];
    updatedFavourites = cloneFavourites.filter((favourite) => {
      return favourite != id;
    });
  }
  return updatedFavourites;
};

const sendUpdate = (
  currentFavourites: string[],
  id: string,
  action: string
) => {
  let updatedFavourites: string[];
  updatedFavourites = getUpdatedFavouritesArray(currentFavourites, id, action);
  updateCachedFavourites(updatedFavourites);
  updateFirebaseFavourites(updatedFavourites);
};

export function updateFavourites(id: string, action: string): void {
  let currentFavourites: string[];
  const cachedFavourites = getCachedFavourites();
  if (cachedFavourites != null && cachedFavourites.length > 0) {
    currentFavourites = cachedFavourites;
    sendUpdate(currentFavourites, id, action);
  } else {
    getFirebaseFavourites().then((firebaseFavourites) => {
      currentFavourites = firebaseFavourites;
      sendUpdate(currentFavourites, id, action);
    });
  }
}

export function initFavourites(loggedIn: Boolean): void {
  if (!loggedIn) {
    return;
  }
  if (getCachedFavourites() != null && getCachedFavourites()!.length > 0) {
    return;
  } else {
    getFirebaseFavourites().then((favourites) => {
      localStorage.setItem("favourites", favourites.toString());
    });
  }
}

export const getFavouriteItems = (favourites: string[]) => {
  let favouriteItems: ISearchItem[] = [];
  if(favourites.length > 0) {
    return firestore()
    .collection('items').where('id','in', favourites).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        favouriteItems.push(doc.data() as ISearchItem)
      });
      return favouriteItems;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
  } else {
    return new Promise((res, rej) => res([]));
  }
};
