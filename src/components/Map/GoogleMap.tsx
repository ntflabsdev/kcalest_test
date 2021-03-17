import React, { useEffect, useRef } from "react";
import styles from "./GoogleMap.module.css";
//import { Plugins } from "@capacitor/core";
import axios from "axios";
import { functions } from "firebase";

const GoogleMap: React.FC<{
  store: string | undefined;
  coordinates: { lat: number; lng: number } | null;
}> = (props) => {
  const renderMap = () => {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    } else {
      return new Promise((resolve, reject) => {
        const script1 = document.createElement("script");
        script1.src =
          "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_API_KEY;
        script1.async = true;
        script1.defer = true;
        document.body.appendChild(script1);
        script1.onload = () => {
          const loadedGoogleModule = win.google;
          if (loadedGoogleModule && loadedGoogleModule.maps) {
            resolve(loadedGoogleModule.maps);
          } else {
            reject("Google maps SDK not available");
          }
        };
      });
    }
  };

  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    renderMap()
      .then((googleMaps) => {
        map.current = new googleMaps.Map(mapRef.current, {
          center: props.coordinates,
          zoom: 10,
        });
        if (map.current) {
          const queryParams = `?lat=${props.coordinates?.lat}&lng=${props.coordinates?.lng}&store=${props.store}`;
          axios
            .get(
              "https://us-central1-kcalest-ionic-rd.cloudfunctions.net/testHttps" +
                queryParams
            )
            .then((response) => {
              const addMarker = (
                position: { lat: number; lng: number },
                title: string
              ) => {
                var marker = new googleMaps.Marker({
                  position,
                  map: map.current,
                  title,
                });
              };
              response.data.results.forEach((candidate: any) => {
                var position = {
                  lat: Number.parseFloat(candidate.geometry.location.lat),
                  lng: Number.parseFloat(candidate.geometry.location.lng),
                };
                addMarker(position, candidate.name);
              });
              return console.log("resolved test");
            })
            .catch((err) => {
              console.log("not resolved");
            });
        }
        return mapRef.current = null;
      })
      .catch((err) => {
        console.log("Error returning the users coordinates... ", err);
      });
  }, []);

  return <div className={styles.GoogleMaps} ref={mapRef}></div>;
};

export default GoogleMap;
