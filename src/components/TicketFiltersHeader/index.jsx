import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";

const TicketFiltersHeader = ({
  viewingCount = 324,
  onBack = () => {},
  onFiltersChange = () => {},
  quantityOptions = [
    { value: "any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10+", label: "10+" },
  ],
  seatLocationOptions = [
    { value: "all", label: "All" },
    { value: "lower-level", label: "Lower Level" },
    { value: "upper-level", label: "Upper Level" },
    { value: "club-level", label: "Club Level" },
    { value: "suite", label: "Suite" },
    { value: "field-level", label: "Field Level" },
    { value: "mezzanine", label: "Mezzanine" },
    { value: "balcony", label: "Balcony" },
  ],
  priceOptions = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-300", label: "$200 - $300" },
    { value: "300-500", label: "$300 - $500" },
    { value: "500+", label: "$500+" },
  ],
  className = "",
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState("any");
  const [selectedSeatLocation, setSelectedSeatLocation] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const quantityRef = useRef(null);
  const seatLocationRef = useRef(null);
  const priceRef = useRef(null);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        quantityRef.current && !quantityRef.current.contains(event.target) &&
        seatLocationRef.current && !seatLocationRef.current.contains(event.target) &&
        priceRef.current && !priceRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (filterType, value) => {
    const filters = {
      quantity: filterType === 'quantity' ? value : selectedQuantity,
      seatLocation: filterType === 'seatLocation' ? value : selectedSeatLocation,
      price: filterType === 'price' ? value : selectedPrice,
    };

    if (filterType === 'quantity') setSelectedQuantity(value);
    if (filterType === 'seatLocation') setSelectedSeatLocation(value);
    if (filterType === 'price') setSelectedPrice(value);

    setActiveDropdown(null);
    onFiltersChange(filters);
  };

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
      return;
    }

    // Calculate position for the dropdown
    const refs = {
      quantity: quantityRef,
      seatLocation: seatLocationRef,
      price: priceRef
    };

    const buttonRef = refs[dropdownName];
    if (buttonRef.current && containerRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      setDropdownPosition({
        top: buttonRect.bottom - containerRect.top + 8,
        left: buttonRect.left - containerRect.left
      });
    }

    setActiveDropdown(dropdownName);
  };

  const getSelectedLabel = (options, selectedValue) => {
    const option = options.find(opt => opt.value === selectedValue);
    return option ? option.label : options[0].label;
  };

  const FilterDropdown = ({ 
    name, 
    label, 
    options, 
    selectedValue, 
    onSelect, 
    ref 
  }) => (
    <div className="relative" ref={ref}>
      <button
        onClick={() => toggleDropdown(name)}
        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors duration-200"
      >
        <span className="text-gray-600 whitespace-nowrap text-[13px]">{label}:</span>
        <span className="text-gray-900 whitespace-nowrap">{getSelectedLabel(options, selectedValue)}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            activeDropdown === name ? 'rotate-180' : ''
          }`} 
        />
      </button>
    </div>
  );

  return (
    <div className={`w-full bg-white ${className}`} ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <div className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <ChevronLeft className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Viewing Count */}
          <div className="text-sm font-normal text-gray-900">
            {viewingCount.toLocaleString()} viewing now
          </div>
        </div>

        {/* Filters Row */}
        <div className="relative">
          <div className="flex items-center gap-1 overflow-x-auto">
            <FilterDropdown
              name="quantity"
              label="Quantity"
              options={quantityOptions}
              selectedValue={selectedQuantity}
              onSelect={(value) => handleFilterChange('quantity', value)}
              ref={quantityRef}
            />

            <FilterDropdown
              name="seatLocation"
              label="Seat location"
              options={seatLocationOptions}
              selectedValue={selectedSeatLocation}
              onSelect={(value) => handleFilterChange('seatLocation', value)}
              ref={seatLocationRef}
            />

            <FilterDropdown
              name="price"
              label="Price"
              options={priceOptions}
              selectedValue={selectedPrice}
              onSelect={(value) => handleFilterChange('price', value)}
              ref={priceRef}
            />
          </div>

          {/* Dropdown Portal */}
          {activeDropdown && (
            <div 
              className="absolute bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px] max-h-60 overflow-y-auto"
              style={{
                top: `35px`,
                left: `${dropdownPosition.left}px`
              }}
            >
              {(() => {
                const currentOptions = activeDropdown === 'quantity' ? quantityOptions :
                                    activeDropdown === 'seatLocation' ? seatLocationOptions :
                                    priceOptions;
                const currentSelected = activeDropdown === 'quantity' ? selectedQuantity :
                                      activeDropdown === 'seatLocation' ? selectedSeatLocation :
                                      selectedPrice;

                return currentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange(activeDropdown, option.value)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 text-sm ${
                      currentSelected === option.value 
                        ? "bg-blue-50 text-blue-600 font-medium" 
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ));
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketFiltersHeader;