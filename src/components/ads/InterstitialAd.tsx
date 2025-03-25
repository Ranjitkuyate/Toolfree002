interface InterstitialAdProps {
  adPreferences?: Record<string, any>; // Fix: Ensure `adPreferences` exists
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ adPreferences }) => {
  return (
    <div>
      {adPreferences ? <p>Ad Preferences Loaded</p> : <p>No Preferences Set</p>}
    </div>
  );
};

export default InterstitialAd;
