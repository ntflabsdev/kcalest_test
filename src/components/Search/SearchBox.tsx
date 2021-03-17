import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonInput,
  IonItem,
  IonRow,
  IonText,
} from "@ionic/react";

import React, { useRef } from "react";
import styles from "./SearchBox.module.css";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  errorMessage: string;
}

const SearchBox: React.FC<propType> = (props) => {
  const calories = useRef<HTMLIonInputElement>(null);

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
            <IonItem>
              <IonInput placeholder="Calories..." ref={calories}></IonInput>
            </IonItem>
            <IonButton
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
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default SearchBox;
