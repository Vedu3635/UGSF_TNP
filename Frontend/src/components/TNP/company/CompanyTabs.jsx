import React, { useState } from "react";

const Tabs = ({ children, defaultTab = "upcoming" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, { activeTab, setActiveTab })
  );

  return <div>{tabChildren}</div>;
};

const TabList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex bg-gray-100 rounded-full p-2 mb-6 shadow-md">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        isActive: activeTab === child.props.value,
        onClick: () => setActiveTab(child.props.value),
      })
    )}
  </div>
);

const TabTrigger = ({ children, value, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-5 py-3 rounded-full text-lg transition-colors duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
        : "text-gray-500 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const TabContent = ({ children, value, activeTab }) =>
  value === activeTab ? <>{children}</> : null;

export { Tabs, TabList, TabTrigger, TabContent };
