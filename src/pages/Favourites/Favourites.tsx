import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./Favourites.module.css";
import ToolbarButtons from "../../components/ToolbarButtons/ToolbarButtons";
import {
  updateFavourites,
  getCachedFavourites,
  getFavouriteItems,
} from "../../services/FavouritesService";
import { auth as firebaseAuth } from "../../firebase";
import { Redirect } from "react-router";
import { ISearchItem } from "../../models/SearchItems";
import SearchItemList from "../../components/Search/SearchItemList";
import SearchItemModal from "../../components/SearchItemModal/SearchItemModal";
import { arraysEqual } from "../../utils/ArrayUtils";

const Favourites: React.FC = () => {
  const [cachedUserFavourites, setCachedUserFavourites] = useState<string[]>(
    []
  );
  const currentCachedFavourites = getCachedFavourites();
  if (!arraysEqual(currentCachedFavourites, cachedUserFavourites)) {
    setCachedUserFavourites(currentCachedFavourites);
  }
  const isAuthenticated = !!firebaseAuth.currentUser;
  const [selectedItem, setSelectedItem] = useState<ISearchItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [favouriteItems, setFavouriteItems] = useState<ISearchItem[]>([]);

  useEffect(() => {
    getFavouriteItems(cachedUserFavourites).then((data) => {
      setFavouriteItems(data as ISearchItem[]);
    });
  }, [cachedUserFavourites]);

  const itemClickedHandler = (item: ISearchItem) => {
    setShowModal(true);
    setSelectedItem(item);
  };

  const searchItemModalCloseHandler = (
    favouriteId: string,
    isFavourite: boolean
  ) => {
    if (showModal) {
      setShowModal(false);
      if (isFavourite) {
        if (!cachedUserFavourites.includes(favouriteId)) {
          updateFavourites(favouriteId, "add");
        }
      } else {
        if (cachedUserFavourites.includes(favouriteId)) {
          updateFavourites(favouriteId, "remove");
        }
      }
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/one" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="none" className={styles.Toolbar}>
          <IonTitle className={styles.ToolbarTitle}>Kcalest</IonTitle>
          <ToolbarButtons />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SearchItemModal
          showModal={showModal}
          isAuthenticated={isAuthenticated}
          onCancel={searchItemModalCloseHandler}
          model={{ item: selectedItem, favourites: cachedUserFavourites }}
        />
        <IonGrid className={styles.Grid}>
          <SearchItemList
            searchItems={favouriteItems}
            itemClickedHandler={itemClickedHandler}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Favourites;
