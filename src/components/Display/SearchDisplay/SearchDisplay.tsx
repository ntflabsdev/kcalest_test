import {
  IonAvatar,
  IonText,
  IonItem,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { getDietButtonStyles } from "../../../services/SearchService";
import styles from "./SearchDisplay.module.css";

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

const SearchDisplay: React.FC<propType> = (props) => {
  useEffect(() => {
    console.log("SearchDisplay: props ", props);
  },[props.filters])
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

  return (
    <div className={styles.SearchBoxDisplaySearch}>
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
                <img
                  alt={button.text}
                  src={require(`../../../assets/icons/${button.image}`)}
                />
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
    </div>
  );
};

export default SearchDisplay;
