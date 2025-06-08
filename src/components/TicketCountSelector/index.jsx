import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";

const TicketCountSelector = ({
  title = "How many tickets are you looking for?",
  options = [
    { value: "any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5+", label: "5+", hasDropdown: true },
  ],
  seatedTogetherOption = true,
  seatedTogetherLabel = "Seated together",
  userAvatar = null,
  onSelectionChange = () => {},
  onSeatedTogetherChange = () => {},
  className = "",
}) => {
  const [selectedTickets, setSelectedTickets] = useState("any");
  const [seatedTogether, setSeatedTogether] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTicketSelection = (value) => {
    setSelectedTickets(value);
    onSelectionChange(value);
    
    // Show dropdown when 5+ is selected
    if (value === "5+") {
      setShowDropdown(!showDropdown);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSeatedToggle = () => {
    const newValue = !seatedTogether;
    setSeatedTogether(newValue);
    onSeatedTogetherChange(newValue);
  };

  const handleDropdownSelection = (value) => {
    setSelectedTickets(value);
    onSelectionChange(value);
    setShowDropdown(false);
  };

  const dropdownOptions = ["5", "6", "7", "8", "9", "10+"];

  // Check if selected value is from dropdown options
  const isDropdownValue = dropdownOptions.includes(selectedTickets);
  const shouldShowDropdown = showDropdown && (selectedTickets === "5+" || isDropdownValue);

  return (
    <div className={`w-full max-w-4xl mx-auto flex flex-col gap-2 bg-white ${className}`}>
      {/* Title */}
      <h2 className="text-sm md:text-base font-bold text-gray-900 text-center leading-tight">
        {title}
      </h2>

      {/* Ticket Options */}
      <div className="flex flex-wrap justify-center gap-1">
        {options.map((option) => (
          <div key={option.value} className="relative">
            <button
              onClick={() => handleTicketSelection(option.value)}
              className={`
                py-1.5 px-3 text-[12px] rounded-full border-2 font-medium transition-all duration-200
                ${
                  selectedTickets === option.value || (option.hasDropdown && isDropdownValue)
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:shadow-sm"
                }
                ${option.hasDropdown ? "pr-8" : ""}
                 text-center
              `}
            >
              {/* Show selected dropdown value or original label */}
              {option.hasDropdown && isDropdownValue ? selectedTickets : option.label}
              {option.hasDropdown && (
                <ChevronDown
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform duration-200 ${
                    shouldShowDropdown ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Dropdown for 5+ option */}
            {option.hasDropdown && shouldShowDropdown && (
              <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {dropdownOptions.map((dropdownOption) => (
                  <button
                    key={dropdownOption}
                    onClick={() => handleDropdownSelection(dropdownOption)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 ${
                      selectedTickets === dropdownOption ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    {dropdownOption}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Seated Together Option */}
      {seatedTogetherOption && (
        <div className="flex items-center justify-center gap-1">
          {/* Label */}
          <span className="text-[14px] font-medium text-gray-700">
            {seatedTogetherLabel}
          </span>

          {/* Toggle Switch */}
          <button
            onClick={handleSeatedToggle}
            className={`
              relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${seatedTogether ? "bg-blue-500" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                ${seatedTogether ? "translate-x-4" : "translate-x-1"}
              `}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketCountSelector;