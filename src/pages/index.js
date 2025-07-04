import Image from "next/image";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import NewCastleImage from "../../public/newCastle.svg";
import Arsenal from "../../public/arsenal.svg";
import TeamCard from "@/components/TeamCard";
import TicketCountSelector from "@/components/TicketCountSelector";
import TicketFiltersHeader from "@/components/TicketFiltersHeader";
import TicketCard from "@/components/ticketCard";
import FeaturesList from "@/components/FeaturesList";
import PaymentGateway from "@/components/paymentGatewayList";
import CheckoutComponent from "@/components/PaymentDisplay";

const geistSans = Inter({
  variable: "Inter",
  subsets: ["latin"],
});

const geistMono = Inter({
  variable: "Inter",
  subsets: ["latin"],
});

const teamCardProps = {
  team: { logo: NewCastleImage, name: "Newcastle" },
  opponentTeam: { logo: Arsenal, name: "Arsenal" },
  date: "Wed, April 23, 7:30 AM",
  venue: "St James’ Park, London",
  leauge: "English Premier League",
};

const ticketsData = [
  {
    id: 1,
    rating: 9.8,
    isBestDeal: true,
    title: "Away Fans Section",
    subtitle: "All Together",
    isMobileTicket: true,
    originalPrice: "800",
    discountedPrice: "400.91",
    discount: 50,
    ticketsLeft: 2,
    borderColor: "orange",
    features: [
      { label: "Seated together", icon: "seat" },
      { label: "Parking", icon: "parking" },
      { label: "VIP", icon: "vip" },
    ],
  },
  {
    id: 2,
    rating: 9.8,
    isBestDeal: true,
    title: "Away Fans Section",
    subtitle: "All Together",
    isMobileTicket: true,
    originalPrice: "1000",
    discountedPrice: "900",
    discount: 10,
    ticketsLeft: 2,
    borderColor: "blue",
    features: [
      { label: "Seated together", icon: "seat" },
      { label: "Parking", icon: "parking" },
      { label: "VIP", icon: "vip" },
      { label: "Away area", icon: "away" },
      { label: "+1" },
    ],
  },
  {
    id: 3,
    rating: 9.8,
    isBestDeal: true,
    title: "Longside Lower Tier",
    subtitle: "Single Seat",
    isMobileTicket: false,
    originalPrice: "1600",
    discountedPrice: "800",
    discount: 50,
    ticketsLeft: 2,
    borderColor: "green",
    features: [
      { label: "Parking", icon: "parking" },
      { label: "Restrictions (?)", icon: "restriction" },
      { label: "VIP", icon: "vip" },
    ],
  },
  {
    id: 4,
    rating: 9.8,
    isBestDeal: true,
    title: "Away Fans Section",
    subtitle: "All Together",
    isMobileTicket: true,
    originalPrice: "800",
    discountedPrice: "400.91",
    discount: 50,
    ticketsLeft: 2,
    borderColor: "purple",
    features: [{ label: "Seated together", icon: "seat" }],
  },
];

const featureListOptions = [
  {
    title: "VIP",
    description: "Enjoy exclusive access to VIP lounges and services.",
    titleKey: "vip",
  },
  {
    title: "Seating",
    description: "Choose from a variety of seating options.",
    titleKey: "seating",
  },
  {
    title: "Restricted",
    description: "Some restrictions apply to this ticket type.",
    titleKey: "restricted",
  },
  {
    title: "Parking",
    description: "Parking is available at the venue.",
    titleKey: "parking",
  },
  {
    title: "No Restrictions",
    description: "This ticket has no restrictions.",
    titleKey: "noRestrictions",
  },
  {
    title: "Mobile Tickets",
    description: "Receive your tickets directly on your mobile device.",
    titleKey: "mobileTickets",
  },
];

export default function Home() {
  return (
    <div
      className={`px-4 flex flex-col gap-4 ${geistSans.className} ${geistMono.className} `}
    >
      <TeamCard teamCard={teamCardProps} />
      <TicketCountSelector />
      <TicketFiltersHeader />
      <div className="space-y-4 max-w-2xl">
        {ticketsData.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="space-y-4 max-w-2xl">
        {featureListOptions.map((feature) => (
          <FeaturesList key={feature.key} {...feature} />
        ))}
      </div>
      <PaymentGateway  />
      <CheckoutComponent />
    </div>
  );
}
