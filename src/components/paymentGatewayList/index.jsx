import Image from "next/image";
import React from "react";
import greenTick from "../../../public/greenTick.svg";
import paymentGateways from "../../../public/paymentGateways.svg";

const PaymentGateway = ({ listValues }) => {
  const displayValues = listValues || [
    "100% Money back guarantee",
    "Easy and secure payments",
    "4.8 out of 5 Review on Trustpilot",
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        {displayValues?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Image src={greenTick} alt="green tick" width={16} height={16} />
            <p className="text-[12px] font-nomral">{item}</p>
          </div>
        ))}
      </div>
      <Image
        src={paymentGateways}
        alt="payment gateways"
        width={200}
        height={50}
        className="w-full h-4"
      />
    </div>
  );
};

export default PaymentGateway;
