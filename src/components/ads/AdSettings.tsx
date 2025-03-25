interface AdSettingsProps {
  adsEnabled: boolean;
  toggleAdsEnabled: () => void;
}

const AdSettings: React.FC<AdSettingsProps> = ({ adsEnabled, toggleAdsEnabled }) => (
  <button onClick={toggleAdsEnabled}>
    {adsEnabled ? "Disable Ads" : "Enable Ads"}
  </button>
);

export default AdSettings;
