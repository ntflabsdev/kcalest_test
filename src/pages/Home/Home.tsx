import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
} from "@ionic/react";
import React, { useState, MouseEvent } from "react";
import styles from "./Home.module.css";
import { ISearchItem } from "../../models/SearchItems";
import ToolbarButtons from "../../components/ToolbarButtons/ToolbarButtons";
import { firestore } from "../../firebase";
import SearchBox from "../../components/Search/SearchBox";
import SearchItemList from "../../components/Search/SearchItemList";
import { auth as firebaseAuth } from "../../firebase";
import SearchItemModal from "../../components/SearchItemModal/SearchItemModal";
import {
  updateFavourites,
  getCachedFavourites,
} from "../../services/FavouritesService";

const Home: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ISearchItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchItems, setSearchItems] = useState<ISearchItem[] | null>(null);
  const [searchBoxErrorMessage, setSearchBoxErrorMessage] = useState<string>(
    ""
  ); 
  const [filters, setFilters] = useState(['vegetarian']);
  let cachedUserFavourites: String[] = getCachedFavourites();

  const getItemsHandler = (event: MouseEvent, calories: any) => {
    setSearchBoxErrorMessage("");
    const sanitisedCalories = Number.parseInt(calories);
    if (!!calories && !!sanitisedCalories) {
      const upperLimit = sanitisedCalories + 25;
      const lowerLimit = sanitisedCalories - 25;
      event.preventDefault();
      firestore
        .collection("items")
        .where("calories", ">", lowerLimit)
        .where("calories", "<", upperLimit)
        .get()
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          })) as ISearchItem[];
          const fiveRandomItems = [];
          for (let i = 0; i < 5; i++) {
            const randomIndex = Number.parseInt((Math.random() * items.length).toFixed(0));
            fiveRandomItems.push(items[randomIndex]);
          }
          setSearchItems(fiveRandomItems as ISearchItem[]);
        });
    } else {
      setSearchBoxErrorMessage("please enter a number...");
    }
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

  const itemClickedHandler = (item: ISearchItem) => {
    setShowModal(true);
    setSelectedItem(item);
  };

  const removeFilter = (id: string) => {
    console.log(id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.Toolbar} color="none">
          <IonTitle className={styles.ToolbarTitle}>Kcalest</IonTitle>
          <ToolbarButtons />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SearchItemModal
          showModal={showModal}
          isAuthenticated={!!firebaseAuth.currentUser}
          onCancel={searchItemModalCloseHandler}
          model={{ item: selectedItem, favourites: cachedUserFavourites }}
        />
        <IonGrid className={styles.Grid}>
          <SearchBox
            getItemsHandler={getItemsHandler}
            errorMessage={searchBoxErrorMessage}
            removeFilter={removeFilter}
            filters = {filters}
          />
          <SearchItemList
            searchItems={searchItems}
            itemClickedHandler={itemClickedHandler}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
