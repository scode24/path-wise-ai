import axios from "axios";
import { LibraryBig, Route } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMessageStore from "../stores/MessageStore";
import usePathInfoStore from "../stores/PathInfoStore";
import usePromptStore from "../stores/PromptStore";
import Button from "./Button";
import Card from "./Card";

const PromtCard = () => {
  const navigator = useNavigate();
  const [prompt, setPrompt] = useState();
  const { updatePathInfo } = usePathInfoStore();
  const { setPromptQuery } = usePromptStore();
  const { type, showMessage, closeMessage } = useMessageStore();

  const fetchLearningPath = async () => {
    try {
      if (prompt === undefined) return;

      updatePathInfo([], "start");
      showMessage("Fetching learning path", "info");
      const response = await axios.post(
        process.env.REACT_APP_SERVICE_API_BASE_URL + "/getLearningPath",
        {
          query: prompt,
        }
      );

      navigator("/home/learning-path");
      setPromptQuery(prompt);
      updatePathInfo(response.data, "done");
      closeMessage();
    } catch (err) {
      updatePathInfo([], "start");
      showMessage(err.message, "error");
    }
  };

  return (
    <Card
      config={{
        header: (
          <div className="flex flex-row justify-normal">
            <div className="centerdiv text-lg font-semibold mr-2">
              <LibraryBig strokeWidth={2} />
            </div>
            <div className="centerdiv text-lg font-semibold">
              What do you want to learn today ?
            </div>
          </div>
        ),
        body: (
          <div className="flex flex-col">
            <textarea
              className="rounded-md border w-full p-2 mb-3 text-black"
              placeholder="Describe what you want to learn"
              rows={5}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            ></textarea>
            <Button
              config={{
                icon: <Route />,
                label: "Generate learning path",
                textColor: "white",
                isTextBold: false,
                bgColor: "green",
                isWidthFull: true,
              }}
              onClickFn={fetchLearningPath}
            />
          </div>
        ),
        isFullHeight: false,
      }}
    />
  );
};

export default PromtCard;
