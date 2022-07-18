import { connectDBFromApi } from "DB/dbConnect";
import nc from "next-connect";
// Controllers
import { updateScoreTimeline } from "DB/Controllers/ScoreTimelineController";


const handler = nc({
    onNoMatch: (req, res) => {
        res.status(404).end("API is not found");
    },
});

// get  single type
// handler.get(async (req, res) => {
//     let { userId } = req.query;

//     const user = await getUser(userId);

//     if (user) {
//         res.status(200).json({ body: { user } });
//         return;
//     }
//     res.status(404).end("User not found");
// });

// // update type route
handler.put(async (req, res) => {
    let { scoreTimelineId } = req.query;

    const updatedScoreTimeline = await updateScoreTimeline(scoreTimelineId, req.body);

    if (updatedScoreTimeline) {
        res.status(200).json({ body: { updatedScoreTimeline } });
        return;
    }
    return res.status(404).end("Score timeline not found");
});

// // delete type route
// handler.delete(async (req, res) => {
//   let { typeId } = req.query;

//   const type = await deleteType(typeId);

//   if (type) {
//     res.status(200).json({ body: { type } });
//     return;
//   }
//   res.status(404).end("Type not found");
// });

export default connectDBFromApi(handler);
