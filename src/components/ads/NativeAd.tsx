import React from "react";

interface NativeAdProps {
  adPreferences?: {
    type: string;
    size: string;
    customStyles?: React.CSSProperties;
  };
}

const NativeAd: React.FC<NativeAdProps> = ({ adPreferences }) => {
  return (
    <div style={{ ...adPreferences?.customStyles, border: "1px solid #ccc", padding: "10px" }}>
      <p>Native Ad - Type: {adPreferences?.type || "Default"}</p>
      <p>Size: {adPreferences?.size || "Medium"}</p>
    </div>
  );
};

export default NativeAd;
