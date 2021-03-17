import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  } from "@ionic/react";
  import React from "react";
  import styles from "./Settings.module.css";
  import ToolbarButtons from "../../components/ToolbarButtons/ToolbarButtons";
  import { logout } from "../../services/Auth";
  import { useHistory } from 'react-router-dom';

  
  const Settings: React.FC = () => {
    const history = useHistory();
    console.log('[Settings.tsx]');
    const logoutHandler = () => {
      logout();
      history.push('/home');
    };

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className={styles.Toolbar} color="none">
            <IonTitle className={styles.ToolbarTitle}>Settings</IonTitle>
            <ToolbarButtons />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid className={styles.Grid}>
            <IonRow className={styles.LandingPageSearchBoxRow}>
              <IonCol
                size-sm="12"
                sizeMd="6"
                offsetMd="3"
                className={styles.LandingPageSearchBoxCol}
              >
                <IonButton expand='block' onClick={logoutHandler}>Logout</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Settings;
  