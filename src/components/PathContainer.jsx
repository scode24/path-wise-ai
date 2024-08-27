import { Hourglass } from "lucide-react";
import React from "react";
import useMessageStore from "../stores/MessageStore";
import usePathInfoStore from "../stores/PathInfoStore";
import PathStep from "./PathStep";

const PathContainer = () => {
  const { pathInfo, fetchDataStatus, updatePathInfo } = usePathInfoStore();
  const { type, showMessage, closeMessage } = useMessageStore();

  // console.log(JSON.parse(pathInfo));

  // useEffect(() => {
  //   console.log(pathInfo);
  // }, [pathInfo]);

  return (
    <div className="flex flex-col overflow-y-auto">
      {fetchDataStatus === "done" ? (
        pathInfo.map((step, index) => (
          <PathStep
            key={index}
            data={{
              index,
              title: step?.topic,
              shortDescription: step?.shortDescription,
              detailedDescription: step?.detailedDescription,
              isCompleted: step?.isCompleted,
              refVideosInfo: step?.refVideosInfo,
            }}
          />
        ))
      ) : (
        <div className="centerdiv h-[70vh]">
          <div className="flex flex-col">
            <div className="centerdiv">
              <Hourglass strokeWidth={2} />
            </div>

            <div className="centerdiv mt-5">
              {type === "error" ? (
                <span>OOPS! Something went wrong...</span>
              ) : (
                <span>Fetching learning path... please wait</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathContainer;
