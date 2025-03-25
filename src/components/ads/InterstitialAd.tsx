import React from "react";

interface AdProps {
  adPreferences: {
    showInterstitial: boolean;
    frequency: number;
  };
}

const InterstitialAd: React.FC<AdProps> = ({ adPreferences }) => {
  if (!adPreferences.showInterstitial) return null;

  return (
    <div className="interstitial-ad">
      <p>Interstitial Ad Displayed!</p>
    </div>
  );
};

export default InterstitialAd;
