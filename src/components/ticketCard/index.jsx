import React, { useState } from "react";

const TicketCard = ({ ticket }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const {
    rating = 9.8,
    isBestDeal = false,
    title,
    subtitle,
    isMobileTicket = false,
    originalPrice,
    discountedPrice,
    discount,
    ticketsLeft = 2,
    features = [],
    borderColor = "orange",
  } = ticket;

  const borderColorClasses = {
    orange: "border-b-orange-400",
    blue: "border-b-blue-400",
    green: "border-b-green-400",
    purple: "border-b-purple-400",
    red: "border-b-red-400",
  };

  const formatPrice = (price) => `€${price}`;
  const formatDiscount = (discount) => `(${discount}% off)`;

  const renderFeatureIcon = (iconType) => {
    const icons = {
      seat: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M3 8V6a2 2 0 012-2h10a2 2 0 012 2v2M3 8v6a2 2 0 002 2h10a2 2 0 002-2V8M3 8h14M7 12h6" />
        </svg>
      ),
      parking: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
        </svg>
      ),
      vip: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      away: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        </svg>
      ),
      restriction: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
          <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" />
        </svg>
      ),
    };
    return icons[iconType] || null;
  };

  return (
    <div
      className={`bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200 ${borderColorClasses[borderColor]} border-b-4`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-green-600">{rating}</span>
          </div>
          {isBestDeal && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
              Best deal
            </span>
          )}
        </div>
        <div className="text-right max-md:hidden">
          {originalPrice && discountedPrice && (
            <>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-green-500 text-xs">
                  {formatPrice(originalPrice)} {formatDiscount(discount)}
                </span>
                <span className="text-base font-bold">
                  {formatPrice(discountedPrice)}
                </span>
              </div>
              <span className="text-gray-500 text-xs">Per Ticket</span>
            </>
          )}
        </div>
      </div>

      {/* Title Section */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm">{subtitle}</span>
          {isMobileTicket && (
            <>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="5"
                    y="2"
                    width="14"
                    height="20"
                    rx="2"
                    ry="2"
                    strokeWidth="2"
                  />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
                </svg>
                <span className="text-sm">Mobile ticket</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Price Section (for layouts without top price) */}
      {!originalPrice && discountedPrice && (
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {formatPrice(discountedPrice)}
            </span>
            {originalPrice && (
              <span className="text-green-500 text-sm">
                {formatPrice(originalPrice)} {formatDiscount(discount)}
              </span>
            )}
          </div>
          <span className="text-gray-500 text-sm">Per Ticket</span>
        </div>
      )}

      {/* Features and Action */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2 relative">
          {/* Desktop: Show all features */}
          <div className="hidden md:flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
              >
                {feature.icon && (
                  <span className="w-3 h-3">
                    {renderFeatureIcon(feature.icon)}
                  </span>
                )}
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Mobile: Show first feature + dropdown for rest */}
          <div className="md:hidden flex gap-2 relative">
            {/* Show first feature */}
            {features.length > 0 && (
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                {features[0].icon && (
                  <span className="w-3 h-3">
                    {renderFeatureIcon(features[0].icon)}
                  </span>
                )}
                <span>{features[0].label}</span>
              </div>
            )}

            {/* Show "+X more" button if there are more features */}
            {features.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                >
                  +{features.length - 1}
                </button>

                {/* Dropdown overlay */}
                {showAllFeatures && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowAllFeatures(false)}
                    />

                    {/* Dropdown content */}
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-40">
                      <div className="p-2 space-y-2">
                        {features.slice(1).map((feature, index) => (
                          <div
                            key={index + 1}
                            className="flex items-center gap-2 text-xs text-gray-700"
                          >
                            {feature.icon && (
                              <span className="w-3 h-3 flex-shrink-0">
                                {renderFeatureIcon(feature.icon)}
                              </span>
                            )}
                            <span>{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {ticketsLeft && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
              {ticketsLeft} left
            </span>
          )}
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium">
            Get Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;