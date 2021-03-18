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
  LocationHistory,
} from "@ionic/react";
import { closeCircle, filterSharp } from "ionicons/icons";

import React, { useRef, useState } from "react";
import styles from "./SearchBox.module.css";
import { IFilter } from "../../models/Filters";

interface propType {
  getItemsHandler: (event: any, calories: any) => void;
  removeFilter: (id: string) => void;
  errorMessage: string;
  filters: IFilter[];
}

const SearchBox: React.FC<propType> = (props) => {
  const calories = useRef<HTMLIonInputElement>(null);
  const [locationSelector, setLocationSelector] = useState("noLocation");
  const onSegmentChange = (value: string | undefined) => {
    if(value != undefined) {
      setLocationSelector(value);
    }
  }
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
            <IonSegment onIonChange={e => onSegmentChange(e.detail.value)} value={locationSelector}>
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
            {locationSelector === "enterLocation" && (<IonItem>
              <IonInput placeholder="Enter Location..."></IonInput>
            </IonItem>)}

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
                  <img src={require(`../../assets/icons/${filter.image}`)} />
                </IonAvatar>
                <IonLabel>{filter.id}</IonLabel>
                <IonIcon onClick={() => props.removeFilter(filter.id)} icon={closeCircle} />
              </IonChip>);
            })}
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default SearchBox;
