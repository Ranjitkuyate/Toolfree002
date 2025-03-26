import React from "react";
import PropTypes from "prop-types";

const AdSettings = ({ adsEnabled, toggleAdsEnabled }) => {
  return (
    <div>
      <h2>Ad Settings</h2>
      <label>
        <input type="checkbox" checked={adsEnabled} onChange={toggleAdsEnabled} />
        Enable Ads
      </label>
    </div>
  );
};

// Add PropTypes validation
AdSettings.propTypes = {
  adsEnabled: PropTypes.bool.isRequired,
  toggleAdsEnabled: PropTypes.func.isRequired,
};

export default AdSettings;
