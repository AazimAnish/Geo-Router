"use client";

import { useEffect, useState } from "react";
import opencage from 'opencage-api-client';

export default function Home() {

  const [location, setLocation] = useState('')

  useEffect(() => {
    const checkGeoLocationPermission = async () => {
      if (navigator.geolocation) {
        try {
          const result = await navigator.permissions.query({ name: "geolocation" });
          console.log("Permission status:", result.state);

          const success = async (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            console.log("User location:", latitude, longitude);

              const data = await opencage.geocode({
                q: `${latitude},${longitude}`,
                key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY
              });

              if (data.status.code === 200 && data.results.length > 0) {
                console.log("Formatted address:", data.results[0].formatted);
                setLocation(data.results[0].formatted);
              } else {
                console.warn("No results found from OpenCage");
              }
          };

          const error = (err: GeolocationPositionError) => {
            console.error("Error getting location:", err.message);
          };

          const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          };

          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, error, options);
          }

        } catch (error) {
          console.error("Error checking geolocation permission:", error);
        }
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    checkGeoLocationPermission();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-4xl font-bold">
        Current Location: {location};
      </div>
    </div>
  );
}
