
import React from "react";

function SponsorBar(props) {
    const {sponsorAddress, emergencyDetails} = props;
    return (
     <div>Sponsor: {sponsorAddress}</div>

  
    );
  }

  export default SponsorBar;