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
} from "@ionic/react";
import { closeCircle, filterSharp } from "ionicons/icons";

import React, { useRef } from "react";
import styles from "./SearchBox.module.css";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  removeFilter: (id: string) => void;
  errorMessage: string;
  filters: string[];
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

            {props.filters.map(filter => {
              return (<IonChip>
                <IonAvatar>
                  <img src={require('../../assets/icons/Vegan.png')} />
                </IonAvatar>
                <IonLabel>Vegan</IonLabel>
                <IonIcon onClick={() => props.removeFilter("vegan")} icon={closeCircle} />
              </IonChip>);
            })}
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default SearchBox;
