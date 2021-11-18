import { IonCol, IonRow } from "@ionic/react";

import React, { useRef, useState } from "react";
import SearchDisplay from "../Display/SearchDisplay/SearchDisplay";
import styles from "./SearchBox.module.css";
import ResturantDisplay from "../Display/ResturantDisplay/ResturantDisplay";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  setFilter: (id: string) => void;
  removeFilter: (id: string) => void;
  errorMessage: string;
  filters: string[];
  getCoordinates: () => void;
}

const dietButtons = [
  { id: "anything", image: "Anything.png", text: "Anything" },
  { id: "paleo", image: "Paleo.png", text: "Paleo" },
  { id: "vegan", image: "Vegan.png", text: "Vegan" },
  { id: "vegetarian", image: "Vegetarian.png", text: "Vegetarian" },
  { id: "keto", image: "Keto.png", text: "Keto" },
];

const combinations: { [key: string]: string[] } = {
  anything: [],
  paleo: ["keto"],
  vegetarian: ["vegan", "keto"],
  vegan: ["keto", "vegetarian"],
  keto: ["vegan", "vegetarian", "paleo"],
};

const SearchBox: React.FC<propType> = (props) => {
  const calories = useRef<HTMLIonInputElement>(null);
  const [locationSelector, setLocationSelector] = useState("noLocation");

  const onSegmentChange = (value: string | undefined) => {
    if (value != undefined) {
      setLocationSelector(value);
      if (value === "userLocation") {
        props.getCoordinates();
      }
    }
  };

  const [displayTest, setDisplayTest] = useState(
    <SearchDisplay
      getItemsHandler={props.getItemsHandler}
      errorMessage={props.errorMessage}
      setFilter={props.setFilter}
      removeFilter={props.removeFilter}
      filters={props.filters}
      getCoordinates={props.getCoordinates}
    />
  );

  const dividerClickedHandler = (value: String) => {
    console.log(value);
    switch (value) {
      case "search":
        setDisplayTest(
          <SearchDisplay
            getItemsHandler={props.getItemsHandler}
            errorMessage={props.errorMessage}
            setFilter={props.setFilter}
            removeFilter={props.removeFilter}
            filters={props.filters}
            getCoordinates={props.getCoordinates}
          />
        );
        break;
      case "resturant":
        setDisplayTest(<ResturantDisplay />);
        break;
      default:
        setDisplayTest(
          <SearchDisplay
            getItemsHandler={props.getItemsHandler}
            errorMessage={props.errorMessage}
            setFilter={props.setFilter}
            removeFilter={props.removeFilter}
            filters={props.filters}
            getCoordinates={props.getCoordinates}
          />
        );
    }
  };

  return (
    <IonRow className={styles.LandingPageSearchBoxRow}>
      <IonCol
        size-sm="12"
        sizeMd="6"
        offsetMd="3"
        className={styles.LandingPageSearchBoxCol}
      >
        <div className={styles.SearchBoxDisplay}>{displayTest}</div>
        <div className={styles.SearchBoxDividers}>
          <button
            className={[styles.Divider, styles.Divider1].join(" ")}
            onClick={() => dividerClickedHandler("search")}
          >
            search
          </button>
          <button
            className={[styles.Divider, styles.Divider2].join(" ")}
            onClick={() => dividerClickedHandler("resturant")}
          >
            resturant
          </button>
          <button
            className={[styles.Divider, styles.Divider3].join(" ")}
            onClick={() => dividerClickedHandler("eco")}
          >
            eco
          </button>
        </div>
      </IonCol>
    </IonRow>
  );
};

export default SearchBox;
