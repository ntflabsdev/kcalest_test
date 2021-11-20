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
import React, { useRef } from "react";
import { getDietButtonStyles } from "../../../services/SearchService";
import styles from "./SearchDisplay.module.css";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  setFilter: (id: string) => void;
  removeFilter: (id: string) => void;
  errorMessage: string;
  filters: string[];
  getCoordinates: () => void;
  onSegmentChange : (value: string | undefined) => void;
  locationSelector : string;
  getCalories : (value: string | null | undefined) => void;
  calories : string;
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
  //const calories = useRef<HTMLIonInputElement>(null);


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
        <IonInput placeholder="Calories..." value={props.calories} onIonChange={(e) => props.getCalories(e.detail.value)}></IonInput>
      </IonItem>
      <IonSegment
        onIonChange={(e) => props.onSegmentChange(e.detail.value)}
        value={props.locationSelector}
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
      {props.locationSelector === "enterLocation" && (
        <IonItem>
          <IonInput placeholder="Enter Location..."></IonInput>
        </IonItem>
      )}

      <IonButton
        class="ion-margin-top"
        expand="block"
        onClick={(e) => props.getItemsHandler(e, props.calories)}
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
