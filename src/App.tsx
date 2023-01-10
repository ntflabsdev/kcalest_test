import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  isPlatform,
  IonTabs,
  IonToast,
  IonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";
import {
  iceCreamOutline,
  personCircleOutline,
  heartOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./App.css";
import "./theme/variables.css";
import Favourites from "./pages/Favourites/Favourites";
import SelectAuth from "./pages/SelectAuth/SelectAuth";
import { useAuthInit } from "./services/Auth";
import { auth as firebaseAuth } from "./firebase";
import { initFavourites } from './services/FavouritesService';



const App: React.FC = () => {
   const {loading, loggedIn} = useAuthInit();

   useEffect(() => {
    initFavourites(loggedIn);
   }, [loggedIn]);

    if(loading) {
      return <IonLoading isOpen />
    }
    let router = (
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/my/favourites" component={Favourites} />
        <Route exact path="/auth" component={SelectAuth} />
        <Route exact path="/auth/:id" component={SelectAuth} />
        <Redirect to="/home" />
      </Switch>
    </IonRouterOutlet>
  );

  let tabButtons = (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={iceCreamOutline}></IonIcon>
      </IonTabButton>
      <IonTabButton disabled={false} tab="favourites" href="/my/favourites">
        <IonIcon icon={heartOutline}></IonIcon>
      </IonTabButton>
      <IonTabButton tab="auth" href="/auth">
        <IonIcon icon={personCircleOutline}></IonIcon>
      </IonTabButton>
    </IonTabBar>
  );

  let outlet = router;
  if (isPlatform("mobile")) {
    outlet = (
      <IonTabs>
        {router}
        {tabButtons}
      </IonTabs>
    );
  }
  return (
    <IonApp data-testid="app">
      <IonToast
        isOpen={!!firebaseAuth.currentUser}
        onDidDismiss={undefined}
        message={"Hello " + firebaseAuth.currentUser?.email}
        duration={2000}
        position="top"
      />
      <IonReactRouter>{outlet}</IonReactRouter>
    </IonApp>
  );
};

export default App;
