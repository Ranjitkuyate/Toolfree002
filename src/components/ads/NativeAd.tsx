import React from "react";

interface NativeAdProps {
  adPreferences?: {
    category: string;
    placement: string;
  };
}

const NativeAd: React.FC<NativeAdProps> = ({ adPreferences }) => {
  return (
    <div>
      <p>Ad Category: {adPreferences?.category || "Default"}</p>
      <p>Ad Placement: {adPreferences?.placement || "Sidebar"}</p>
    </div>
  );
};

export default NativeAd;
