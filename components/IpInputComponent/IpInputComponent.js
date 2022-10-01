import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./IpInputComponent.module.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const IpInputComponent = ({
  setIpAddress,
  setLocation,
  setTimeZone,
  setIsp,
  setPosition,
  loading,
  setLoading,
}) => {
  const [ipValue, setIpValue] = useState("8.8.8.8");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    document.getElementById("ipAddress").focus();

    (async () => {
      try {
        setLoading(true);
        //const data = await axios.get("./api/getGeoData");
        const data = await axios.get("https://geo.ipify.org/api/v2/country,city?apiKey=at_06FRIa1U1MScrAFCO7DrZyIVnxECU");

        const { ip, isp } = data?.data;
        const { city, country, lat, lng, postalCode, timezone } =
          data?.data?.location;
        setIpValue(ip);
        setIpAddress(ip);
        setIsp(isp);
        setTimeZone(timezone);
        setLocation(`${city}, ${country} ${postalCode}`);
        setPosition([lat, lng]);
      } catch (e) {
        setErrors({ network: "unable to get your data (displaying default values)" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formValidate(true);
    try {
      const data = await axios.get(`../api/getGeoData?ipAddress=${ipValue}`);
      const { ip, isp } = data?.data;
      const { city, country, lat, lng, postalCode, timezone } =
        data?.data?.location;
      setIpValue(ip);
      setIpAddress(ip);
      setIsp(isp);
      setTimeZone(timezone);
      setLocation(`${city}, ${country} ${postalCode}`);
      setPosition([lat, lng]);
    } catch (e) {
      setErrors({ network: "no Data available for this IP address (displaying default values)" });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const target = e.target;
    let value = target.value;
    // handle the ip address for the 255.255.255.255 pattern writting
    const newIpAddress = ipValue > value ? value : formatIpAddress(value); // deleting or adding characters
    setIpValue(newIpAddress);
    setTouched(true);
  };

  const formatIpAddress = (ipAddress) => {
    return (
      ipAddress
        .replace(/(\.)+/g, ".")
        .split("")
        /*.map((i, index) => {
        return Number.isInteger(Number(i)) &&
          Number.isInteger(Number(ipAddress[index - 1])) &&
          Number.isInteger(Number(ipAddress[index - 2])) && (
            index === 2 || index === 5 || index === 8
          )
          ? i + "."
          : i
      }
      )*/
        .join("")
    );
  };
  useEffect(() => {
    formValidate();
  }, [ipValue, touched]);

  const handleOnBLur = (e) => {
    setTouched(true);
  };
  const formValidate = (beforeSubmit = false) => {
    let err = [];

    let testField = beforeSubmit || touched;
    if (
      testField &&
      ipValue.length > 0 &&
      !/^\d+$|(^(\d+\.)+$)|(^(\d+\.)+\d+$)/.test(ipValue)
    ) {
      err["ipAddress"] = "Wrong format, numbers only";
    } else if (testField && ipValue?.length <= 0) {
      err["ipAddress"] = "can't be blank";
    } /*else if (testField && ipValue.length < 15)
      err["ipAddress"] = "should contain exaclty 12 digits";*/

    setErrors(err);
  };
  return (
    <>
      <div className={styles.errorDiv}>
        {errors["ipAddress"] ?? errors["network"]}
      </div>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input
          id="ipAddress"
          name="ipAddress"
          className={styles.ipInput}
          value={ipValue}
          onBlur={handleOnBLur}
          onChange={handleChange}
          placeholder="Search for any IP address or domain"
          maxLength={15}
        ></input>

        <button
          className={styles.button}
          disabled={
            Object.keys(errors).length !== 0 ||
            !/(\d+\.){3}\d+$/.test(ipValue) ||
            loading
          }
          title="submit"
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </form>
    </>
  );
};

export default IpInputComponent;
