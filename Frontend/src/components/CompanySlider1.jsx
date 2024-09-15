import React from "react";
// import { ChevronRight } from "lucide-react";

const CompanySlider1 = () => {
  const cardsData = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      title: "Notion",
      plan: "Pro Plan",
      status: "Expires",
      timeLeft: "In 2 Days",
      price: "45",
      isExpiring: true,
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      title: "Amazon Web Services",
      plan: "Business Plan",
      status: "Auto-Renews",
      timeLeft: "In 15 Days",
      price: "45",
      isExpiring: false,
    },
    // You can add more cards here if needed
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-3 w-full">
      <b>Upcoming Companies</b> 
      <div className="flex flex-wrap justify-start gap-4">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] max-w-[300px] p-4 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img
                  src={card.logo}
                  alt={`${card.title} logo`}
                  className="w-8 h-8 mr-2"
                />
                <div>
                  <h3 className="font-semibold text-sm">{card.title}</h3>
                  <p className="text-xs text-gray-500">{card.plan}</p>
                </div>
              </div>
              {/* <ChevronRight className="w-5 h-5 text-gray-400" /> */}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p
                  className={`text-xs ${
                    card.isExpiring ? "text-red-500" : "text-green-500"
                  } mb-1`}
                >
                  {card.status}
                </p>
                <p className="text-sm font-semibold">{card.timeLeft}</p>
              </div>
              <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded">
                Pay ${card.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySlider1;
