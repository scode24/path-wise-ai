import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Download,
  Info,
  Waypoints,
  Youtube,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMessageStore from "../stores/MessageStore";
import usePathInfoStore from "../stores/PathInfoStore";

const YouTubeVideoLinkInfo = (props) => {
  const { channelTitle, thumbnailUrl, videoLink, title } = props.data;

  return (
    <div
      className="flex flex-row border-b p-3 cursor-pointer"
      onClick={() => window.open(videoLink)}
    >
      <img
        className="rounded-md object-cover w-[120px] h-[90px] mr-3"
        src={thumbnailUrl}
      />
      <div className="flex flex-col h-[90px] pl-2 overflow-y-auto">
        <span className="text-lg font-medium w-full">{channelTitle}</span>
        <p className="mt-1">{title}</p>
      </div>
    </div>
  );
};

const FetchRefVideoLink = (props) => {
  const { topic, index } = props.data;
  const { pathInfo, updatePathInfo } = usePathInfoStore();
  const { showMessage, closeMessage } = useMessageStore();

  const getRefVideoInfo = async () => {
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
    <div className="flex flex-row p-3 cursor-pointer" onClick={getRefVideoInfo}>
      <div className="rounded-md centerdiv border w-[120px] h-[90px] p-2">
        <div className="flex flex-row justify-center w-full">
          <Download size={30} strokeWidth={1} />
        </div>
      </div>
      <div className="flex flex-col h-[90px] pl-2 overflow-y-auto">
        <span className="text-lg font-medium w-full">Get video links</span>
        <p className="mt-1">Click to get reference video links</p>
      </div>
    </div>
  );
};

const DescriptionContainer = () => {
  const param = useParams();
  const index = Number(param?.index);
  const { pathInfo } = usePathInfoStore();

  const navigator = useNavigate();

  return (
    <div className="flex flex-col rounded-md border justify-between my-2 md:my-0 md:mb-2">
      <div className="flex flex-row justify-between border-b p-3 w-full">
        <div
          className="flex flex-row cursor-pointer"
          onClick={() => {
            if (index - 1 >= 0) {
              navigator("/home/description/" + (index - 1));
            }
          }}
        >
          <div className="centerdiv">
            <ArrowLeft strokeWidth={2} />
          </div>
          <div className="centerdiv">Previous topic</div>
        </div>

        <div
          className="flex flex-row cursor-pointer"
          onClick={() => {
            if (index + 1 < pathInfo.length) {
              navigator("/home/description/" + (index + 1));
            }
          }}
        >
          <div className="centerdiv cursor-pointer">Next topic</div>
          <div className="centerdiv">
            <ArrowRight strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col border-b p-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <div className="centerdiv">
                <BookOpenText strokeWidth={2} />
              </div>
              <div className="centerdiv">Chapter {index + 1}</div>
            </div>

            <div className="flex flex-row">
              <div className="centerdiv">
                <Waypoints strokeWidth={2} />
              </div>
              <div
                className="centerdiv cursor-pointer"
                onClick={() => navigator("/home/learning-path")}
              >
                Back to learning path
              </div>
            </div>
          </div>
          <span className="text-xl font-semibold mt-3 md:text-2xl">
            {pathInfo[index]?.topic}
          </span>
          <p className="mt-3">{pathInfo[index]?.shortDescription}</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-3/5">
            <div className="font-medium border-b p-3">
              <div className="flex flex-row">
                <div className="centerdiv">
                  <Info strokeWidth={2} />
                </div>
                <div className="centerdiv">Description</div>
              </div>
            </div>
            <p className="p-3">{pathInfo[index]?.detailedDescription}</p>
          </div>
          <div className="w-full border-l md:w-2/5">
            <div className="font-medium border-y p-3 md:border-t-0 border-b">
              <div className="flex flex-row">
                <div className="centerdiv">
                  <Youtube strokeWidth={2} />
                </div>
                <div className="centerdiv">Reference videos</div>
              </div>
            </div>
            <div className="flex flex-col">
              {pathInfo[index].refVideosInfo !== undefined ? (
                <>
                  {pathInfo[index].refVideosInfo.map((videoLink) => {
                    return (
                      <YouTubeVideoLinkInfo
                        data={{
                          channelTitle: videoLink.channelTitle,
                          thumbnailUrl: videoLink.thumbnailUrl,
                          videoLink: videoLink.videoLink,
                          title: videoLink.title,
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <FetchRefVideoLink
                    data={{
                      topic: pathInfo[index].title,
                      index: index,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionContainer;
