import axios from "axios";
import {
  BookOpenIcon,
  BookOpenText,
  BookType,
  Download,
  Youtube,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useMessageStore from "../stores/MessageStore";
import usePathInfoStore from "../stores/PathInfoStore";

const YouTubeVideoLink = (props) => {
  const { videoLink, thumbnailUrl, channelTitle } = props.data;

  return (
    <div
      className="flex flex-col w-[120px] p-2 cursor-pointer"
      onClick={() => window.open(videoLink)}
    >
      <img className="rounded-md object-cover" src={thumbnailUrl} />
      {/* <span className="w-full text-center mt-2">{channelTitle}</span> */}
    </div>
  );
};

const FullDescriptionLink = (props) => {
  return (
    <div className="rounded-md centerdiv border w-[120px] h-[78px] p-2 mt-2">
      <div className="flex flex-row justify-center w-full">
        <BookOpenIcon size={30} strokeWidth={1} />
      </div>
    </div>
  );
};

const FetchRefVideoLink = (props) => {
  const { topic, index } = props.data;
  const { pathInfo, updatePathInfo } = usePathInfoStore();
  const { showMessage, closeMessage } = useMessageStore();

  const getRefVideoInfo = async (e) => {
    try {
      showMessage("Fetching reference video", "info");
      const response = await axios.post(
        process.env.REACT_APP_SERVICE_API_BASE_URL + "/getRefVideoInfo",
        {
          topic: localStorage.getItem("promptQuery") + "," + topic,
        }
      );

      if (response.data.length > 0) {
        pathInfo[index].refVideosInfo = response.data;
        updatePathInfo(pathInfo, "done");
        closeMessage();
      }
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  return (
    <div
      className="rounded-md centerdiv border w-[120px] h-[78px] p-2 mt-2"
      onClick={getRefVideoInfo}
    >
      <div className="flex flex-row justify-center w-full">
        <Download size={30} strokeWidth={1} />
      </div>
    </div>
  );
};

const PathStep = (props) => {
  const {
    index,
    title,
    shortDescription,
    detailedDescription,
    isCompleted,
    refVideosInfo,
  } = props.data;

  const navigator = useNavigate();
  const { pathInfo, updatePathInfo } = usePathInfoStore();

  const handleCompleteCheck = (event) => {
    const updatedPathInfo = [...pathInfo];
    updatedPathInfo[index].isCompleted = event.target.checked;
    updatePathInfo(updatedPathInfo, "done");
  };

  return (
    <div className="flex flex-col rounded-md border justify-between p-3 mb-3 md:flex-row">
      <div className="flex flex-col md:w-1/2">
        <div className="flex flex-row">
          <div className="centerdiv">
            <input
              type="checkbox"
              checked={isCompleted}
              className="mr-2 cursor-pointer"
              onChange={handleCompleteCheck}
            />
          </div>
          <div className="centerdiv">
            <BookOpenText strokeWidth={2} />
          </div>
          <div className="centerdiv">Chapter {index + 1}</div>
        </div>
        <span className="text-xl font-semibold mt-3 md:text-2xl">{title}</span>
        <p className="mt-3">{shortDescription}</p>
      </div>

      <div className="md:flex flex-row">
        <div
          className="flex flex-col mt-5 cursor-pointer md:mt-0 md:mr-3"
          onClick={() => navigator("/home/description/" + index)}
        >
          <div className="flex flex-row">
            <div className="centerdiv">
              <BookType strokeWidth={2} />
            </div>
            <div className="centerdiv">Description</div>
          </div>
          <div className="flex flex-row w-full mt-1 overflow-x-auto">
            <FullDescriptionLink />
          </div>
        </div>

        <div className="flex flex-col  cursor-pointer  mt-5 md:mt-0">
          {refVideosInfo !== undefined ? (
            <>
              <div className="flex flex-row">
                <div className="centerdiv">
                  <Youtube strokeWidth={2} />
                </div>
                <div className="centerdiv">Reference videos</div>
              </div>
              <div className="flex flex-row w-full mt-1 overflow-x-auto">
                {refVideosInfo.length > 0 &&
                  refVideosInfo.map((video, index) => {
                    return (
                      <YouTubeVideoLink
                        key={index}
                        data={{
                          videoLink: video.videoLink,
                          thumbnailUrl: video.thumbnailUrl,
                          channelTitle: video.channelTitle,
                        }}
                      />
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row">
                <div className="centerdiv">
                  <Youtube strokeWidth={2} />
                </div>
                <div className="centerdiv">Video links</div>
              </div>
              <div className="flex flex-row w-full mt-1 overflow-x-auto">
                <FetchRefVideoLink data={{ topic: title, index: index }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PathStep;
