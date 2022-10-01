import { useEffect, useState, useMemo } from "react";
import { FaArrowDown, FaTimes } from "react-icons/fa";
import throttle from "lodash.throttle";

import styles from "./Details.module.css";

const DetailsComponent = ({
  ipAddress = "192.212.174.101",
  location = "Brooklyn, NY 10001",
  timeZone = "UTC -05:00",
  isp = "SpaceX Starlink",
  loading,
}) => {
  const [showDetails, setShowDetails] = useState(true);


  useEffect(() => {
    const detailsDivHeight = window?.innerWidth >= "950" ? "160px" : "295px";
    const detailsDivBottom = window?.innerWidth >= "950" ? "-80px" : "-180px";
    if (showDetails) {
      document.getElementById("detailsContainer").style.height = detailsDivHeight;
      document.getElementById("detailsContainer").style.bottom = detailsDivBottom;
    }
    else {
      document.getElementById("detailsContainer").style.height = "15px";
      document.getElementById("detailsContainer").style.bottom = "0";
    }
  }, [showDetails])


  const handleResize = () => {
    const detailsDivHeight = window?.innerWidth >= "950" ? "160px" : "295px";
    const detailsDivBottom = window?.innerWidth >= "950" ? "-80px" : "-180px";
    if (showDetails) {
      document.getElementById("detailsContainer").style.height = detailsDivHeight;
      document.getElementById("detailsContainer").style.bottom = detailsDivBottom;
    }
    else {
      document.getElementById("detailsContainer").style.height = "15px";
      document.getElementById("detailsContainer").style.bottom = "0";
    }
  };

  const throttleResizeHandler = useMemo(() => throttle(handleResize, 300));

  useEffect(() => {
    window.addEventListener("resize", throttleResizeHandler);
    return function cleanup() {
      throttleResizeHandler?.cancel();
      window.removeEventListener("resize", throttleResizeHandler);
    };
  });
  return (
    <div className={styles.detailsComponentContainer} id="detailsContainer">
      {!loading ? (
        <>
          {<span className={styles.detailsCmd}>
            {showDetails ? <FaTimes
              className={styles.detailsCmdClose}
              title="close details box"
              onClick={() => setShowDetails(false)}
            /> : <FaArrowDown
              className={styles.detailsCmdOpen}
              title="open details box"
              onClick={() => setShowDetails(true)} />}
          </span>}
          <OneDetail title="IP ADDRESS" content={ipAddress} showDetails={showDetails} />
          <OneDetail title="LOCATION" content={location} showDetails={showDetails} />
          <OneDetail title="TIMEZONE" content={`UTC ${timeZone}`} showDetails={showDetails} />
          <OneDetail title="ISP" content={isp} showDetails={showDetails} />
        </>
      ) : (
        <div style={{ paddingLeft: "5px" }}>loading...</div>
      )}
    </div>
  );
};

const OneDetail = ({ title, content, showDetails }) => {
  return (<>
    {showDetails && <div className={styles.detailsComponentDiv}>
      <p className={styles.detailTitle}>{title}</p>
      <p className={styles.detail}>{content}</p>
    </div>}</>
  );
};

export default DetailsComponent;
