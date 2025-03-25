import { useState, useEffect } from "react";

interface AdPreferences {
  [key: string]: any;
}

const AdManager = () => {
  const [adPreferences, setAdPreferences] = useState<AdPreferences>({});

  useEffect(() => {
    const savedPreferences = localStorage.getItem("adPreferences");
    if (savedPreferences) {
      setAdPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  function updatePreferences(newPreferences: Record<string, any>) {
    const updatedPreferences = { ...adPreferences, ...newPreferences };
    setAdPreferences(updatedPreferences);
    localStorage.setItem("adPreferences", JSON.stringify(updatedPreferences));
  }

  return (
    <div>
      <h2>Manage Ad Preferences</h2>
      <button onClick={() => updatePreferences({ personalizedAds: true })}>
        Enable Personalized Ads
      </button>
      <button onClick={() => updatePreferences({ personalizedAds: false })}>
        Disable Personalized Ads
      </button>
    </div>
  );
};

export default AdManager;
