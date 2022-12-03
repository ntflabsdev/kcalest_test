import { IonCol, IonRow, IonText } from "@ionic/react";

import React, { useRef, useState } from "react";
import SearchDisplay from "../Display/SearchDisplay/SearchDisplay";
import styles from "./SearchBox.module.css";
import ResturantDisplay from "../Display/ResturantDisplay/ResturantDisplay";
import EcoDisplay from "../Display/EcoDisplay/EcoDisplay";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  setFilter: (id: string) => void;
  removeFilter: (id: string) => void;
  errorMessage: string;
  filters: string[];
  getCoordinates: () => void;
}

const SearchBox: React.FC<propType> = (props) => {
  const [display, setDisplay] = useState('search');
  const [calories, setCalories] = useState('0');
  const [locationSelector, setLocationSelector] = useState("noLocation");

  const dividerClickedHandler = (value: string) => {
    setDisplay(value);
  };
  
  const onSegmentChange = (value: string | undefined) => {
    if (value != undefined) {
      setLocationSelector(value);
      if (value === "userLocation") {
        props.getCoordinates();
      }
    }
  };

  const getCalories = (value: string | null | undefined) => {
    if (value != undefined || value != null) {
      setCalories(value);
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
        <div className={styles.SearchBoxDisplay}>
          {display === 'search' && (
            <SearchDisplay 
            getItemsHandler={props.getItemsHandler}
            errorMessage={props.errorMessage}
            setFilter={props.setFilter}
            removeFilter={props.removeFilter}
            filters={props.filters}
            getCoordinates={props.getCoordinates}
            onSegmentChange={onSegmentChange}
            locationSelector={locationSelector}
            getCalories={getCalories}
            calories={calories}
            />
          )}
          {display === 'resturant' && (
            <ResturantDisplay />
          )}
          {display === 'eco' && (
            <EcoDisplay />
          )}
        </div>
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
