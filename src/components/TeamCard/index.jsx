import Image from "next/image";
import backgroundImage from "../../../public/background.png";
import vs from "../../../public/vs.svg";
import calendar from "../../../public/calendar.svg";
import location from "../../../public/location.svg";
import league from "../../../public/league.svg";
const TeamCard = ({ teamCard }) => {
  const teamNameView = (team) => {
    return (
      <div className="flex items-center gap-2">
        {team.logo && (
          <Image
            src={team.logo.src || team.logo}
            alt={`${team.name} logo`}
            className=""
            width={24}
            height={24}
          />
        )}
        <span className="text-[14px] text-white">{team.name}</span>
      </div>
    );
  };

  const teamFlexView = (team) => {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={team.icon.src || team.icon}
          alt={`${team.name} logo`}
          className=""
          width={12}
          height={12}
        />
        <span className="text-[11px] text-white">{team.name}</span>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage.src || backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex relative flex-col items-center justify-center rounded-lg gap-3"
    >
      {/* <div className="absolute inset-0 bg-black/30 w-3/4 bg-opacity-70"/> */}
      <div className="flex items-center justify-center gap-2">
        {teamNameView(teamCard.team)}
        <Image
          src={vs.src || vs}
          alt="vs"
          className=""
          width={16}
          height={16}
        />
        {teamNameView(teamCard.opponentTeam)}
      </div>
      <div className="flex items-center justify-center gap-2">
        {teamFlexView({
          name: teamCard.date,
          icon: calendar,
        })}
        {teamFlexView({
          name: teamCard.venue,
          icon: location,
        })}
      </div>
      {teamFlexView({
        name: teamCard.leauge,
        icon: league,
      })}
    </div>
  );
};

export default TeamCard;
