import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PromtCard from "../components/PromtCard";

function Main() {
  const navigator = useNavigate();

  return (
    <div className="centerdiv h-[100vh]">
      <span className="text-5xl font-extralight mb-7">
        Get Personalized Learning Paths with AI
      </span>
      <span className="text-5xl text-green-600 font-extrabold mb-10">
        Prompt. Learn. Grow.
      </span>
      <div className="flex flex-col">
        <PromtCard />
      </div>

      <div
        className="flex flex-row cursor-pointer mt-5"
        onClick={() => navigator("/home/learning-path")}
      >
        <div className="centerdiv">
          <span>Skip to main</span>
        </div>

        <div className="centerdiv">
          <ArrowRight strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default Main;
