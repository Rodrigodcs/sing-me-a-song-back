import express from "express";
import cors from "cors";

import * as recommendationsController from "./controllers/recommendationsControler"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", recommendationsController.songRecommendation);
app.post("/recommendations/:id/upvote", recommendationsController.upVote);
app.post("/recommendations/:id/downvote", recommendationsController.downVote);
app.get("/recommendations/random", recommendationsController.randomSong)
app.get("/recommendations/top/:amount", recommendationsController.sortingSongs)


export default app;
