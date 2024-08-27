import {
  getDataFromGeminiApi,
  getDataFromYoutubeApi,
} from "../services/app.service.js";
const getLearningPath = async (req, res, next) => {
  try {
    const response = await getDataFromGeminiApi(req);
    let topicList = [];

    for (const key in response) {
      let topic = response[key];
      topic["isCompleted"] = false;
      topic["refVideosInfo"] = undefined;
      topicList.push(topic);
    }

    res.status(200).send(topicList);
  } catch (err) {
    next(err);
  }
};

const getRefVideoInfo = async (req, res, next) => {
  try {
    const response = await getDataFromYoutubeApi(req);
    const videoInfo = [];
    for (const video of response.items) {
      videoInfo.push({
        videoId: video.id.videoId,
        videoLink: "https://www.youtube.com/watch?v=" + video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnailUrl: video.snippet.thumbnails.default.url,
        channelTitle: video.snippet.channelTitle,
      });
    }

    res.status(200).send(videoInfo);
  } catch (err) {
    next(err);
  }
};

export { getLearningPath, getRefVideoInfo };
