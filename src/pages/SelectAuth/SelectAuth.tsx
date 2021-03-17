import React, { useEffect, useRef } from "react";
import Login from "../Login/Login";
import Settings from "../Settings/Settings";
import { useParams } from "react-router-dom";
import Register from "../Register/Register";
import { auth as firebaseUser } from "../../firebase";

const SelectAuth: React.FC = () => {
  const routeId = useParams<{ id: string }>().id;
  let nextPage = useRef<JSX.Element>(<Login />);

  if (!!firebaseUser.currentUser) {
    nextPage.current = (<Settings />) as JSX.Element;
  } else {
    if (routeId === "register") {
      nextPage.current = (<Register />) as JSX.Element;
    } else {
      nextPage.current = (<Login />) as JSX.Element;
    }
  }
  return nextPage.current;
};

export default SelectAuth;
