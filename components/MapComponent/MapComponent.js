import { useEffect } from "react";
/*import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from "./MapComponent.module.css"


import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';*/

//const { MapContainer, MapConsumer } = ReactLeaflet;
const MapComponent = ({ }) => {/*
  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);*/

  return (

    <>
      {/*<MapContainer className={styles.map} >
        <MapConsumer>
          {(map) => children(ReactLeaflet, map)}
        </MapConsumer>
      </MapContainer>*/}
    </>
  );
};
export default MapComponent;
