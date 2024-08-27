import express from "express";
import {
  getLearningPath,
  getRefVideoInfo,
} from "../controllers/app.controller.js";

const appRouter = express.Router();

appRouter.post("/getLearningPath", getLearningPath);
appRouter.post("/getRefVideoInfo", getRefVideoInfo);

export default appRouter;
