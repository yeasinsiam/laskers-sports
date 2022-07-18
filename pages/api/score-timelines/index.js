import { getAllScoreTimelines, createScoreTimeline } from "DB/Controllers/ScoreTimelineController";
import { connectDBFromApi } from "DB/dbConnect";
import nc from "next-connect";
// Controllers

const handler = nc({
  onNoMatch: (req, res) => {
    res.status(404).end("API is not found");
  },
});

handler.get(async (req, res) => {
  const scoreTimelines = await getAllScoreTimelines();
  res.status(200).json({ body: { scoreTimelines } });
});

handler.post(async (req, res) => {
  const newScoreTimeline = await createScoreTimeline(req.body);
  res.status(200).json({ body: { newScoreTimeline } });
});

export default connectDBFromApi(handler);
