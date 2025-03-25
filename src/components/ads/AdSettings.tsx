import React from "react";
import { useAds } from "./AdManager";

const AdSettings = () => {
  const { adsEnabled, toggleAds } = useAds(); // Corrected function name

  return (
    <div>
      <h2>Ad Settings</h2>
      <p>Ads are currently {adsEnabled ? "enabled" : "disabled"}.</p>
      <button onClick={toggleAds}>
        {adsEnabled ? "Disable Ads" : "Enable Ads"}
      </button>
    </div>
  );
};

export default AdSettings;
