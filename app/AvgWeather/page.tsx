"use client"
import React, { useEffect } from 'react';
import Navbar from '@/components/weathercomp/Navbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AverageYearlyWeather from '@/components/weathercomp/AverageYearlyWeather';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '../atom';

type HistoricalWeatherData = {
  dt: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
};

type AverageWeatherData = {
  averageTemperature: number;
  averageRainfall: number;
};

const calculateAverages = (data: HistoricalWeatherData[]): AverageWeatherData => {
  let totalTemp = 0;
  let totalRainfall = 0;
  let count = data.length;

  data.forEach((entry) => {
    totalTemp += entry.main.temp;
    totalRainfall += entry.clouds.all; // assuming clouds.all represents rainfall percentage
  });

  return {
    averageTemperature: totalTemp / count,
    averageRainfall: totalRainfall / count,
  };
};

function Page() {
  const [place, setPlace] = useAtom(placeAtom);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['historicalWeatherData', place],
    queryFn: async () => {
      const [lat, lon] = place.split(',');
      const oneYearAgo = Math.floor(Date.now() / 1000) - 31536000; // UNIX time for one year ago
      const now = Math.floor(Date.now() / 1000);

      try {
        const { data } = await axios.get<HistoricalWeatherData[]>(
          `https://api.agromonitoring.com/agro/1.0/weather/history?lat=${lat}&lon=${lon}&start=${oneYearAgo}&end=${now}&appid=8c36d387d57f813d824969af47b6f43d`
        );
        return data;
      } catch (error) {
        console.error("Error fetching historical weather data", error);
        throw error;
      }
    }
  });

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isPending) return (
    <div className='flex items-center min-h-screen justify-center'>
      <p className='animate-bounce'>Loading....</p>
    </div>
  );

  if (error) return (
    <div className='flex items-center min-h-screen justify-center'>
      <p className='text-red-500'>Error loading data. Please try again later.</p>
    </div>
  );

  const averages = data ? calculateAverages(data) : { averageTemperature: 0, averageRainfall: 0 };

  return (
    <div className="flex flex-col gap-4 bg-slate-100 min-h-screen">
      <Navbar location={place} />
      <main className="px-3 max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4 z-10">
        {/* Average Yearly Stats */}
        <AverageYearlyWeather 
          averageRainfall={averages.averageRainfall} 
          averageTemperature={averages.averageTemperature} 
        />
      </main>
    </div>
  );
}

export default Page;
