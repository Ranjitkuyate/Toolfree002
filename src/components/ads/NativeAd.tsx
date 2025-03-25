import React from "react";

interface NativeAdProps {
  adPreferences?: {
    adUnit: string;
    size?: string;
  };
}

const NativeAd: React.FC<NativeAdProps> = ({ adPreferences }) => {
  if (!adPreferences || !adPreferences.adUnit) {
    return <div>Ad could not be loaded.</div>;
  }

  return (
    <div className="ad-container">
      <p>Ad Unit: {adPreferences.adUnit}</p>
      {adPreferences.size && <p>Size: {adPreferences.size}</p>}
    </div>
  );
};

export default NativeAd;
