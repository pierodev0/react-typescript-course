import axios from "axios";
import { SearchType } from "../components/Form/Form";
// import { number, object, string, InferOutput, parse } from "valibot";
import { z } from "zod";
import { useMemo, useState } from "react";

//TYPE GUARD O ASSERTION
// function isWeatherResonse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }

//ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

//Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });

// export type Weather = InferOutput<typeof WeatherSchema>;

function useWeather() {
  const initialState: Weather = {
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  };
  const [weather, setWeather] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState);
    setNotFound(false);
    try {
      const city = encodeURIComponent(search.city);
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${search.country}&appid=${API_KEY}`;
      const { data } = await axios(geoUrl);

      //Comprobar si existe
      if (!data[0]) {
        setNotFound(true);
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      //Castear el type
      // const { data: weatherData } = await axios<Weather>(weatherURL);
      // console.log(weatherData.name);
      // console.log(weatherData.main.temp);

      //TYPE GUARDS
      // const { data: weatherResult } = await axios(weatherURL);
      // const result = isWeatherResonse(weatherResult);
      // if (result) {
      //   console.log(weatherResult.name);
      // }

      //ZOD
      const { data: weatherResult } = await axios(weatherURL);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      }

      //Valibot
      // const { data: weatherResult } = await axios(weatherURL);
      // const result = parse(WeatherSchema, weatherResult);
      // if (result) {
      //   console.log(result.name);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);
  return { fetchWeather, weather, hasWeatherData, loading, notFound };
}

export default useWeather;
