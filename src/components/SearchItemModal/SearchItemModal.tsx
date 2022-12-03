import React, { useState, useEffect, useRef } from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonIcon,
  IonText,
  IonAvatar
} from "@ionic/react";
import { IModalData } from "../../models/User";
import styles from "./SearchItemModal.module.css";
import { heartOutline, heart } from "ionicons/icons";
import GoogleMap from "../Map/GoogleMap";
import { auth } from "firebase";
import { roundToOneDp, roundToOneDpKcal } from "../../utils/NumberUtils"

const SearchItemModal: React.FC<{
  showModal: boolean;
  onCancel: (id: string, isFavourite: boolean) => void;
  model: IModalData;
  isAuthenticated: boolean;
  coordinates: {lat: number; lng: number};
}> = (props) => {
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    setIsFavourite((prevState) => {
      let isFavouriteModel = false;
      if (props.model.favourites && props.model.item) {
        const filteredFavourites = props.model.favourites.filter((id) => {
          return id == props.model.item!.id;
        });
        isFavouriteModel = filteredFavourites.length > 0;
      }
      return isFavouriteModel;
    });
  }, [props.model.favourites, props.model.item]);

  let icon = (
    <IonIcon class="ion-margin" size="large" icon={heartOutline} color="dark" />
  );
  if (isFavourite) {
    icon = (
      <IonIcon class="ion-margin" size="large" icon={heart} color="danger" />
    );
  }


  


  const clickFavouriteHandler = () => {
    setIsFavourite((prevState) => {
      return !prevState;
    });
  };

  return (
    <IonModal
      isOpen={props.showModal}
      cssClass="my-custom-class"
      onDidDismiss={() => props.onCancel(props.model.item!.id, isFavourite)}
    >
      <IonHeader>
        <IonToolbar className={styles.Toolbar} color="none">
          <IonTitle className={styles.ToolbarTitle}>
            {props.model.item ? props.model.item.store : "Kcalest"}
          </IonTitle>
          {props.isAuthenticated && (
            <IonButtons slot="end">
              <IonButton onClick={clickFavouriteHandler}>{icon}</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className={styles.Grid}>
          <IonRow>
            <IonCol className={styles.ModalTopContent}>
              <IonAvatar className={styles.Avatar}>
                <img
                  src={props.model.item ? props.model.item.avatarUrl : ""}
                  alt={props.model.item ? props.model.item.name : ""}
                />
              </IonAvatar>
              {props.model.item && <IonText>{props.model.item.name}</IonText>}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4" offset="1">
              <p>Calories: {props.model.item ? roundToOneDpKcal(props.model.item?.calories): "NA(click to report)"}</p>
              {!!props.model.item?.carbs && (<p>Carbs: {roundToOneDp(props.model.item?.carbs)}</p>)}
              {!!props.model.item?.fat && (<p>Fat: {roundToOneDp(props.model.item?.fat)}</p>)}
              {!!props.model.item?.protein && (<p>Protein: {roundToOneDp(props.model.item?.protein)}</p>)}
            </IonCol>
            <IonCol size="4" offset="1">
              <p>
                High Protein: {props.model.item?.highProtein ? "Yes" : "No"}
              </p>
              {!!!props.model.item?.vegan && (<p>Vegetarian: {props.model.item?.vegetarian ? "Yes" : "No"}</p>)}
              {(!!props.model.item?.vegan ||!!props.model.item?.vegetarian) && (<p>Vegan: {props.model.item?.vegan ? "Yes" : "No"} </p>)}
            </IonCol>
          </IonRow>
          {props.isAuthenticated && (
            <IonRow className={styles.googleMapsRow}>
              <IonCol className={styles.googleMapsCol}>
                <GoogleMap
                  store={props.model.item?.store}
                  coordinates={props.coordinates}
                />
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>

      <IonButton
        onClick={() => props.onCancel(props.model.item!.id, isFavourite)}
      >
        Close
      </IonButton>
    </IonModal>
  );
};

export default SearchItemModal;
