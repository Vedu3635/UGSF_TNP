import React, { useState } from "react";

const Events = () => {
  const [activeTab, setActiveTab] = useState("all");
  const events = [
    {
      id: 1,
      title: "Annual Alumni Dinner 2025",
      date: { month: "Mar", day: "15" },
      time: "6:30 PM",
      location: "Grand Hotel Convention Center",
      type: "in-person",
      category: "reunion",
    },
    {
      id: 2,
      title: "Career Growth in Tech Industry",
      date: { month: "Mar", day: "22" },
      time: "2:00 PM",
      location: "Virtual Webinar",
      type: "online",
      category: "webinar",
    },
    {
      id: 3,
      title: "Spring Networking Mixer",
      date: { month: "Apr", day: "05" },
      time: "5:00 PM",
      location: "Rooftop Lounge, Downtown",
      type: "in-person",
      category: "networking",
    },
  ];

  const filterEvents = (category) => {
    if (category === "all") {
      return events;
    }
    return events.filter((event) => event.category === category);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Upcoming Events</h2>
        <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
          View All
        </button>
      </div>

      <div className="border-b border-gray-200 px-4 flex overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "all"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setActiveTab("reunion")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "reunion"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reunions
        </button>
        <button
          onClick={() => setActiveTab("webinar")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "webinar"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Webinars
        </button>
        <button
          onClick={() => setActiveTab("networking")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "networking"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Networking
        </button>
      </div>

      <div className="p-6">
        {filterEvents(activeTab).map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0"
          >
            <div className="bg-gray-50 rounded-lg min-w-14 h-16 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-500 font-medium">
                {event.date.month}
              </span>
              <span className="text-xl font-bold">{event.date.day}</span>
            </div>
            <div>
              <h3 className="font-medium text-sm">{event.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {event.time} • {event.location}
              </p>
              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                  event.type === "online"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                {event.type === "online" ? "Online" : "In-person"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
