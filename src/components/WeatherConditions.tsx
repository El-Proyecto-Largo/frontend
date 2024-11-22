import { useEffect, useState } from "react"
import axios from "axios";
import { useQuery } from "react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WindIcon } from "lucide-react";

export default function WeatherConditions() {
  const [lat, setLat] = useState(localStorage.getItem('latitude'));
  const [long, setLong] = useState(localStorage.getItem('longitude'));
  const [weatherData, setWeatherData] = useState<JSON | null>(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    // get weather and forecast data cached in localStorage
    try {
      const lsWeather = localStorage.getItem('weatherData');
      const lsForecast = localStorage.getItem('forecastData');
      setWeatherData(lsWeather ? JSON.parse(lsWeather) : null);
      setForecastData(lsForecast ? JSON.parse(lsForecast) : null);
    }
    catch (e) {
      console.log("Invalid weather cached in localStorage... hopefully we'll make a query to fix that");
    }
  }, []);

  async function getWeather() {
    const response = await axios.get(`https://api.weather.gov/points/${lat},${long}`)
    return response;
  }

  async function getForecast() {
    const response = await axios.get(`${weatherData["properties"]["forecast"]}`);
    return response;
  }

  const weatherQuery = useQuery({
    queryKey: ["weatherData"],
    queryFn: getWeather,
    onSuccess: (weather) => {
      console.log(weather);
      localStorage.setItem("weatherData", JSON.stringify(weather.data));
      setWeatherData(weather.data);
    },
    staleTime: 600000,
  });

  const forecastQuery = useQuery({
    queryKey: ["forecastQuery"],
    queryFn: getForecast,
    onSuccess: (forecast) => {
      console.log(forecast);
      localStorage.setItem("forecastData", JSON.stringify(forecast.data));
      setForecastData(forecast.data);
    },
    enabled: Boolean(weatherQuery.data),
    staleTime: 600000,
  });

  if (forecastQuery.isLoading) {
    return (
      <p>loading...</p>
    );
  }
  else if (forecastQuery.error) {
    return (
      <div>error</div>
    );
  }

  return (
    <div className="max-w-sm">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>
                {weatherData ?
                  weatherData["properties"]["relativeLocation"]["properties"]["city"] + ", "
                  + weatherData["properties"]["relativeLocation"]["properties"]["state"] : <></>
                }
              </CardTitle>
              <CardDescription>
                {forecastData ?
                  forecastData["properties"]["periods"][0]["name"] : <></>
                }
              </CardDescription>
            </div>

            <div>
              <img
                src={forecastData ? forecastData["properties"]["periods"][0]["icon"] : ""}
                width="48"
                className="rounded-lg"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="flex justify-between gap-3">
            <div className="flex justify-between flex-1">
              <p className="scroll-m-20 text-5xl font-bold tracking-tight">
                {forecastData ?
                  forecastData["properties"]["periods"][0]["temperature"] + "°" + forecastData["properties"]["periods"][0]["temperatureUnit"] : <></>
                }
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>{forecastData ? forecastData["properties"]["periods"][0]["detailedForecast"] : ""}</p>
        </CardFooter>
      </Card>
    </div>

  )
}