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
import { closeCircle, filterSharp } from "ionicons/icons";

import React, { useRef, useState } from "react";
import styles from "./SearchBox.module.css";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  setFilter: (id: string) => void;
  removeFilter: (id: string) => void;
  errorMessage: string;
  filters: string[];
  getCoordinates: () => void;
}

const combinations = {
  vegetarian: ["vegan", "keto"],
  vegan: ["keto"],
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

  return (
    <IonRow className={styles.LandingPageSearchBoxRow}>
      <IonCol
        size-sm="12"
        sizeMd="6"
        offsetMd="3"
        className={styles.LandingPageSearchBoxCol}
      >
        <IonCard className={styles.LandingPageSearchBoxCard}>
          <IonCardContent>
            <div className={styles.SearchBoxDietButtons}>
              <button
                className={styles.SearchBoxDietButton}
                onClick={() => props.setFilter("anything")}
              >
                <IonAvatar className={styles.SearchBoxDietButtonAvatar}>
                  <img src={require(`../../assets/icons/Anything.png`)} />
                </IonAvatar>
                <IonText className={styles.SearchBoxDietButtonText}>
                  Anything
                </IonText>
              </button>
              <button
                className={styles.SearchBoxDietButton}
                onClick={() => props.setFilter("paleo")}
              >
                <IonAvatar className={styles.SearchBoxDietButtonAvatar}>
                  <img src={require(`../../assets/icons/Paleo.png`)} />
                </IonAvatar>
                <IonText className={styles.SearchBoxDietButtonText}>
                  Paleo
                </IonText>
              </button>
              <button
                className={styles.SearchBoxDietButton}
                onClick={() => props.setFilter("vegan")}
              >
                <IonAvatar className={styles.SearchBoxDietButtonAvatar}>
                  <img src={require(`../../assets/icons/Vegan.png`)} />
                </IonAvatar>
                <IonText className={styles.SearchBoxDietButtonText}>
                  Vegan
                </IonText>
              </button>
              <button
                className={styles.SearchBoxDietButton}
                onClick={() => props.setFilter("vegetarian")}
              >
                <IonAvatar className={styles.SearchBoxDietButtonAvatar}>
                  <img src={require(`../../assets/icons/Vegetarian.png`)} />
                </IonAvatar>
                <IonText className={styles.SearchBoxDietButtonText}>
                  Vegetarian
                </IonText>
              </button>
              <button
                className={styles.SearchBoxDietButton}
                onClick={() => props.setFilter("keto")}
              >
                <IonAvatar className={styles.SearchBoxDietButtonAvatar}>
                  <img src={require(`../../assets/icons/Keto.png`)} />
                </IonAvatar>
                <IonText className={styles.SearchBoxDietButtonText}>
                  Keto
                </IonText>
              </button>
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
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default SearchBox;
