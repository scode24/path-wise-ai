import { Waypoints } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import Card from "../components/Card";
import PromtCard from "../components/PromtCard";
import usePathInfoStore from "../stores/PathInfoStore";

const Home = () => {
  const { pathInfo } = usePathInfoStore();

  const getCompletedPercentage = () => {
    const completedCount = pathInfo.filter((step) => step.isCompleted).length;
    const totalSteps = pathInfo.length;
    const percentage = (completedCount / totalSteps) * 100;
    return percentage.toFixed(0) + "%";
  };

  return (
    <div className="flex flex-col h-[100vh] md:flex-row">
      <div className="flex flex-col md:w-[30%]">
        <PromtCard />
      </div>

      <div className="flex flex-col md:w-[70%]">
        <Card
          config={{
            header: (
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-normal">
                  <div className="flex flex-col justify-center text-lg font-medium mr-2">
                    <Waypoints strokeWidth={2} />
                  </div>
                  <div className="flex flex-col justify-center text-lg font-semibold">
                    Learning path
                  </div>
                </div>

                <div className="flex flex-col justify-center h-full">
                  <div className="flex flex-col text-lg font-medium mr-2">
                    <div
                      className="h-1 bg-green-500"
                      style={{ width: getCompletedPercentage() }}
                    ></div>
                    <span className="text-sm mt-1">
                      {getCompletedPercentage() + " completed"}
                    </span>
                  </div>
                </div>
              </div>
            ),
            body: <Outlet />,
            isFullHeight: true,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
