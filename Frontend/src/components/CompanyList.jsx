import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabTrigger, TabContent } from "./CompanyTabs";
import CompanyCard from "./CompanyCard";

const CompanyList = ({ companiesData }) => {
  const [companies, setCompanies] = useState({ upcoming: [], visited: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (companiesData) {
      // Get the current date
      const currentDate = new Date();

      // Divide the data into upcoming and visited
      const dividedData = companiesData.reduce(
        (acc, company) => {
          const hiringDate = new Date(company.Hiring_Date);
          if (hiringDate >= currentDate) {
            acc.upcoming.push(company);
          } else {
            acc.visited.push(company);
          }
          return acc;
        },
        { upcoming: [], visited: [] }
      );

      setCompanies(dividedData);
      setIsLoading(false);
    }
  }, [companiesData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-pulse w-16 h-16 bg-blue-200 rounded-full"></div>
        <p className="text-gray-600 animate-pulse">
          Loading placement insights...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Placement Insights
        </h1>

        <Tabs defaultTab="upcoming">
          <TabList>
            <TabTrigger value="upcoming">Upcoming Drives</TabTrigger>
            <TabTrigger value="visited">Visited Companies</TabTrigger>
          </TabList>

          <TabContent value="upcoming">
            <div className="space-y-6">
              {companies.upcoming.length > 0 ? (
                companies.upcoming.map((company, index) => (
                  <CompanyCard key={index} company={company} type="upcoming" />
                ))
              ) : (
                <p className="text-center text-blue-600">
                  No upcoming placement drives at the moment
                </p>
              )}
            </div>
          </TabContent>

          <TabContent value="visited">
            <div className="space-y-6">
              {companies.visited.length > 0 ? (
                companies.visited.map((company, index) => (
                  <CompanyCard key={index} company={company} type="visited" />
                ))
              ) : (
                <p className="text-center text-green-600">
                  No companies visited this year
                </p>
              )}
            </div>
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyList;
