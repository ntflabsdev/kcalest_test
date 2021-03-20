import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
} from "@ionic/react";
import React, { useState, MouseEvent, useEffect } from "react";
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
import { Plugins } from "@capacitor/core";

const Home: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ISearchItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchItems, setSearchItems] = useState<ISearchItem[] | null>(null);
  const [searchBoxErrorMessage, setSearchBoxErrorMessage] = useState<string>(
    ""
  );
  const [filters, setFilters] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  let cachedUserFavourites: String[] = getCachedFavourites();

  const getItemsHandler = (event: MouseEvent, calories: any) => {
    setSearchBoxErrorMessage("");
    const sanitisedCalories = Number.parseInt(calories);
    let lowerLimit = (sanitisedCalories / 100) * 90;
    let upperLimit = (sanitisedCalories / 100) * 110;
    if (!!calories && !!sanitisedCalories) {
      if (sanitisedCalories <= 250) {
        upperLimit = sanitisedCalories + 25;
        lowerLimit = sanitisedCalories - 25;
      }
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
          if (items.length > 0) {
            const fiveRandomItems = [];
            for (let i = 0; i < 5; i++) {
              const randomIndex = Number.parseInt(
                (Math.random() * items.length).toFixed(0)
              );
              fiveRandomItems.push(items[randomIndex]);
            }
            setSearchItems(fiveRandomItems as ISearchItem[]);
          } else {
            setSearchBoxErrorMessage("No items found within this range");
          }
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

  const setFilter = (id: string) => {
    const filtersClone = [...filters];
    const isDuplicateValue =
      filtersClone.filter((filter) => filter === id).length > 0;
    if (!isDuplicateValue) {
      filtersClone.push(id);
      setFilters(filtersClone);
    } else {
      removeFilter(id);
    }
  };

  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  const removeFilter = (id: string) => {
    const filtersClone = [...filters];
    const newFilters = filtersClone.filter((filter) => filter !== id);
    setFilters(newFilters);
  };

  const getCoordinates = () => {
    Plugins.Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        setCoordinates({
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        });
      })
      .catch((err) => {
        console.log("didn't resolve geolocation");
      });
  };

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
          coordinates={{ lat: 1, lng: 2 }}
        />
        <IonGrid className={styles.Grid}>
          <SearchBox
            getItemsHandler={getItemsHandler}
            errorMessage={searchBoxErrorMessage}
            setFilter={setFilter}
            removeFilter={removeFilter}
            filters={filters}
            getCoordinates={getCoordinates}
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
