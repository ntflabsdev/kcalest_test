import { isPlatform, IonButtons, IonButton, IonIcon } from "@ionic/react";

import React from "react";

import { iceCreamOutline, heartOutline, personOutline } from "ionicons/icons";
import {auth as firebaseAuth } from '../../firebase';

const ToolbarButtons: React.FC = () => {

  let buttons = null;

  if (!isPlatform("mobile")) {
    buttons = (
      <IonButtons slot="end">
        <IonButton routerLink="/one">
          <IonIcon class="ion-margin" icon={iceCreamOutline} />
          <p>Home</p>
        </IonButton>
        { !!firebaseAuth.currentUser && <IonButton routerLink="/my/favourites">
          <IonIcon class="ion-margin" icon={heartOutline} />
          <p>Favourites</p>
        </IonButton>}
        <IonButton routerLink="/auth">
          <IonIcon class="ion-margin" icon={personOutline} />
          <p>{ !!firebaseAuth.currentUser ? 'My Account' : 'Log in / Register' }</p>
        </IonButton>
      </IonButtons>
    );
  }
  return buttons;
};

export default ToolbarButtons;
