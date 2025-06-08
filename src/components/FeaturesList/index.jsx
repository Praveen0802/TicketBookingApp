import Image from "next/image";
import React from "react";
import VIPImage from "../../../public/vip.svg";
import seating from "../../../public/seating.svg";
import restricted from "../../../public/restricted.svg";
import parking from "../../../public/parking.svg";
import noRestrictions from "../../../public/no-restrictions.svg";
import mobileTickets from "../../../public/mobileTickets.svg";

const FeaturesList = ({ title, description, titleKey: key }) => {
  const imageLogo =
    key == "vip"
      ? VIPImage
      : key == "seating"
      ? seating
      : key == "restricted"
      ? restricted
      : key == "parking"
      ? parking
      : key == "noRestrictions"
      ? noRestrictions
      : key == "mobileTickets"
      ? mobileTickets
      : null;
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#EEEEEE] flex items-center gap-2 px-2 py-1 rounded-md w-fit">
        <Image src={imageLogo} alt={`${title} icon`} width={16} height={16} />
        <p>{title}</p>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FeaturesList;
