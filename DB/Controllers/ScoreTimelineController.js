// Models
import ScoreTimeline from "DB/Models/ScoreTimeline";
import User from "DB/Models/User";

// Get all types
async function getAllScoreTimelines() {
  return await ScoreTimeline.find({}).populate('player');
}

// // get single type
// async function getType(typeId) {
//   return await Type.findById(typeId).populate("products");
// }

// Create a user
async function createScoreTimeline(body) {

  const newScoreTimeline = new ScoreTimeline(body);

  const scoreTimeline = await newScoreTimeline
    .save()
    .then(scoreTimeline => scoreTimeline.populate('player'));


  await User.updateOne({ _id: scoreTimeline.player }, { $push: { scoreTimelines: scoreTimeline._id } });

  return scoreTimeline;
}

// Update a score
async function updateScoreTimeline(scoreTimelineId, body) {

  // push best.wickets to body
  body['best']['wickets'] = 0;

  return await ScoreTimeline.findByIdAndUpdate(scoreTimelineId, body, {
    new: true,
    runValidators: true,
  }).populate('player');
}

// // // Delete a type
// async function deleteType(typeId) {
//   const deletedType = await Type.findByIdAndDelete(typeId).populate("products");

//   await Product.updateMany(
//     { _id: deletedType.products },
//     { $pull: { types: deletedType._id } }
//   );

//   return deletedType;
// }

export { getAllScoreTimelines, createScoreTimeline, updateScoreTimeline };
