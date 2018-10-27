import React from "react";

function SponsorBar(props) {
  const { sponsorAddress, emergencyDetails } = props;
  return (
    <div className="sponsorBar">
      <div className="sponsorBanner">
        <img src="http://pluspng.com/img-png/logo-air-france-klm-png-official-carrier-air-france-klm-global-meetings-3189.jpg" />
      </div>
      <div className="sponsorAddress">
        Sponsor Address:{" "}
        <a href={"https://blockscout.com/poa/dai/address/" + sponsorAddress}>
          {sponsorAddress}
        </a>
      </div>
      <div className="sponsorProject">
      Relief Program: {emergencyDetails}</div>
    </div>
  );
}

export default SponsorBar;
