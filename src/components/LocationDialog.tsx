import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function LocationDialog() {
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const userLatitude = localStorage.getItem('latitude');
    const userLongitude = localStorage.getItem('longitude')
    const zipCode = localStorage.getItem('zip');
  });

  async function getLatLong() {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: zipCode,
        countrycodes: "us",
        format: "json",
      }
    });

    return response;
  }

  const {
    data: latlong,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["latlongData"],
    queryFn: getLatLong,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    enabled: false,
  });

  return (
    <>
    </>
  );
}