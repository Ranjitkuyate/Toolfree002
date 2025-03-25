import { useState, useEffect } from "react";

interface AdPreferences {
  [key: string]: any;
}

export const useAds = () => {
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);

  useEffect(() => {
    const savedAdsSetting = localStorage.getItem("adsEnabled");
    if (savedAdsSetting !== null) {
      setAdsEnabled(JSON.parse(savedAdsSetting));
    }
  }, []);

  const toggleAds = () => {
    const newSetting = !adsEnabled;
    setAdsEnabled(newSetting);
    localStorage.setItem("adsEnabled", JSON.stringify(newSetting));
  };

  return { adsEnabled, toggleAds };
};

const AdManager = () => {
  const { adsEnabled, toggleAds } = useAds();

  return (
    <div>
      <h2>Manage Ad Preferences</h2>
      <p>Ads are currently {adsEnabled ? "enabled" : "disabled"}.</p>
      <button onClick={toggleAds}>
        {adsEnabled ? "Disable Ads" : "Enable Ads"}
      </button>
    </div>
  );
};

export default AdManager;
