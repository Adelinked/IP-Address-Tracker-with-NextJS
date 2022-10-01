import { useEffect } from "react";
import L from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";
import { Icon } from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
//import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const { MapContainer, MapConsumer } = ReactLeaflet;

const Map = ({ children, className, position, loading, ...rest }) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: "/images/icon-location.svg",
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <>
      <MapContainer className={mapClassName} {...rest}>
        {!loading ? (
          <MapConsumer>{(map) => children(ReactLeaflet, map)}</MapConsumer>) : (
          <></>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
