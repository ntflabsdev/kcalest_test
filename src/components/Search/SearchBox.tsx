import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonInput,
  IonItem,
  IonRow,
  IonText,
  IonChip,
  IonAvatar,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";

import React, { useRef, useState } from "react";
import { getDietButtonStyles } from "../../services/SearchService";
import styles from "./SearchBox.module.css";

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

  const searchBoxDisplay_Search = (
    <div className={styles.Test}>
      <div className={styles.SearchBoxDietButtons}>
        {dietButtons.map((button) => {
          let { dietButtonClasses, disabled } = getDietButtonStyles(
            styles,
            props,
            button.id,
            combinations[props.filters[0]]
          );

          return (
            <button
              className={dietButtonClasses.join(" ")}
              onClick={() => props.setFilter(button.id)}
              key={button.id}
              disabled={disabled}
            >
              <IonAvatar className={styles.SearchBoxDietButtonAvatar}>
                <img src={require(`../../assets/icons/${button.image}`)} />
              </IonAvatar>
              <IonText className={styles.SearchBoxDietButtonText}>
                {button.text}
              </IonText>
            </button>
          );
        })}
      </div>

      <IonItem class="ion-margin-bottom">
        <IonInput placeholder="Calories..." ref={calories}></IonInput>
      </IonItem>
      <IonSegment
        onIonChange={(e) => onSegmentChange(e.detail.value)}
        value={locationSelector}
      >
        <IonSegmentButton value="noLocation">
          <IonLabel>No Location</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="userLocation">
          <IonLabel>Near Me</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="enterLocation">
          <IonLabel>Enter Location</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {locationSelector === "enterLocation" && (
        <IonItem>
          <IonInput placeholder="Enter Location..."></IonInput>
        </IonItem>
      )}

      <IonButton
        class="ion-margin-top"
        expand="block"
        onClick={(e) => props.getItemsHandler(e, calories.current?.value)}
        id="searchItemsButton"
      >
        Search
      </IonButton>
      {!!props.errorMessage && (
        <IonItem lines="none">
          <IonText color="warning">{props.errorMessage}</IonText>
        </IonItem>
      )}

      {props.filters.map((filter) => {
        return (
          <IonChip key={filter}>
            <IonAvatar>
              <img src={require(`../../assets/icons/Vegan.png`)} />
            </IonAvatar>
            <IonLabel>{filter}</IonLabel>
            <IonIcon
              onClick={() => props.removeFilter(filter)}
              icon={closeCircle}
            />
          </IonChip>
        );
      })}
    </div>
  );

  const searchBoxDisplay_Resturant = <div></div>;
  const searchBoxDisplay_Eco = <div></div>;

  const [searchBoxDisplay, setSearchBoxDisplay] = useState(
    searchBoxDisplay_Search
  );
  const [searchBoxDisplayStyles, setSearchBoxDisplayStyles] = useState([
    styles.SearchBoxDisplay,
    styles.backgroundColorWhite,
  ]);

  const updateSearchBoxDisplay = (value: string) => {
    console.log(value);
    switch (value) {
      case "search":
        setSearchBoxDisplay(searchBoxDisplay_Search);
        setSearchBoxDisplayStyles([
          styles.SearchBoxDisplay,
          styles.backgroundColorWhite,
        ]);
        break;
      case "resturant":
        setSearchBoxDisplay(searchBoxDisplay_Resturant);
        setSearchBoxDisplayStyles([
          styles.SearchBoxDisplay,
          styles.backgroundColorRed,
        ]);
        break;
      case "eco":
        setSearchBoxDisplay(searchBoxDisplay_Eco);
        setSearchBoxDisplayStyles([
          styles.SearchBoxDisplay,
          styles.backgroundColorYellowGreen,
        ]);
        break;
      default:
        setSearchBoxDisplay(searchBoxDisplay_Search);
        setSearchBoxDisplayStyles([
          styles.SearchBoxDisplay,
          styles.backgroundColorWhite,
        ]);
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
        <div className={searchBoxDisplayStyles.join(" ")}>
          {searchBoxDisplay}
        </div>
        <div className={styles.SearchBoxDividers}>
          <button
            className={[styles.Divider, styles.Divider1].join(" ")}
            onClick={() => updateSearchBoxDisplay("search")}
          >
            search
          </button>
          <button
            className={[styles.Divider, styles.Divider2].join(" ")}
            onClick={() => updateSearchBoxDisplay("resturant")}
          >
            resturant
          </button>
          <button
            className={[styles.Divider, styles.Divider3].join(" ")}
            onClick={() => updateSearchBoxDisplay("eco")}
          >
            eco
          </button>
        </div>
      </IonCol>
    </IonRow>
  );
};

export default SearchBox;
