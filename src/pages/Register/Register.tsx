import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonButton,
  IonLoading,
} from "@ionic/react";
import React, { useState } from "react";
import styles from "./Register.module.css";
import ToolbarButtons from "../../components/ToolbarButtons/ToolbarButtons";
import { Redirect } from "react-router";
import {register} from '../../services/Auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });
  const [errorMessage, setErrorMessage] = useState("");
  const registerHandler = () => {
    setStatus({ loading: true, error: false });
    register(email, password)
      .then((result) => {
        setStatus({ loading: false, error: false });
        setEmail("");
        setPassword("");
      })
      .catch((e) => { 
        console.log("caught error in registration page: ", e);
        setStatus({ loading: false, error: true });
        setErrorMessage(e);
      });
    
  };

  if (false) {
    return <Redirect to="/home" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.Toolbar} color="none">
          <IonTitle className={styles.ToolbarTitle}>Register</IonTitle>
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
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(event) =>
                      setEmail(event.detail.value as string)
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(event) =>
                      setPassword(event.detail.value as string)
                    }
                  />
                </IonItem>
                {status.error && (
                  <IonText color="danger">{errorMessage.toString().substring(6)}</IonText>
                )}
              </IonList>
              <IonButton onClick={registerHandler}>Create Account</IonButton>
              <IonButton expand="block" fill="clear" routerLink="/auth/login">
                already have an account?
              </IonButton>
              <IonLoading isOpen={status.loading} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
