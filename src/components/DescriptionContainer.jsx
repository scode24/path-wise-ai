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
import usePathInfoStore from "../stores/PathInfoStore";

const YouTubeVideoLinkInfo = (props) => {
  const { channelTitle, thumbnailUrl, videoLink, title } = props.data;

  return (
    <div
      className="flex flex-row border-b p-3"
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
  return (
    <div className="flex flex-row p-3 cursor-pointer">
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
  const { pathInfo, fetchDataStatus, updatePathInfo } = usePathInfoStore();

  console.log(pathInfo[index].refVideosInfo);

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
                  {pathInfo[index].refVideosInfo.map((videoLink, index) => {
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
                  <FetchRefVideoLink />
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
