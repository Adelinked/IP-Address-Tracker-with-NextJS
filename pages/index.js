import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import styles from "../styles/Home.module.css";
import IpInputComponent from "../components/IpInputComponent";
import DetailsComponent from "../components/DetailsComponent";
import Map from "../components/Map";
import ChangeView from "../components/ChangeView";
const DEFAULT_CENTER = [37.38605, -122.08385];


export default function Home() {
  const [ipAddress, setIpAddress] = useState("8.8.8.8");
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const [timeZone, setTimeZone] = useState("-07:00");
  const [location, setLocation] = useState("Mountain View, US 94035");
  const [isp, setIsp] = useState("Google LLC");
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>IP Address Tracker</h1>
          <IpInputComponent
            setIpAddress={setIpAddress}
            setLocation={setLocation}
            setTimeZone={setTimeZone}
            setIsp={setIsp}
            setPosition={setPosition}
            loading={loading}
            setLoading={setLoading}
          />
          <DetailsComponent
            ipAddress={ipAddress}
            location={location}
            timeZone={timeZone}
            isp={isp}
            loading={loading}
          />
        </header>

        {position && <Map className={styles.homeMap} center={position} zoom={10} loading={loading}>
          {({ TileLayer, Marker, Popup }) => (
            <>
              <ChangeView center={position} zoom={10} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  {location}<br />{`UTC ${timeZone}`}
                </Popup>
              </Marker>
            </>
          )}
        </Map>}
      </main>
      <div className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://adelinked.netlify.app" rel="noreferrer">
          Adelinked
        </a>
        .
      </div>
    </div>
  );
}
