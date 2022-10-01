import axios from "axios"

export default async function handler(req, res) {
  const ipAddress = req.query?.ipAddress;
  let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.geoApiKey}`;
  if (ipAddress)
    url = `${url}&ipAddress=${ipAddress}`
  try {
    const data = await axios.get(url);
    res.status(200).json(data.data)
  }
  catch (e) {
    res.status(404).json({ error: "error" })
  }

}
