"use client";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const checkGeoLocationPermission = async () => {
      if (navigator.geolocation) {
        try {
          const result = await navigator.permissions.query({ name: "geolocation" });
          console.log("Permission status:", result.state);

          const success = (position: GeolocationPosition) => {
            console.log("User location:", position.coords);
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
      <h1>Hello World!</h1>
    </div>
  );
}
