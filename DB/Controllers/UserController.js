// Models
import User from "DB/Models/User";
import ScoreTimeline from "DB/Models/ScoreTimeline";
import mongoose from "mongoose";

// Get all types
async function getAllUsers() {
  return await User
    // .find({})
    // .populate("scoreTimelines")
    .aggregate([
      {
        $lookup: {
          from: "scoretimelines",
          localField: "scoreTimelines",
          foreignField: "_id",
          as: "scoreTimelines"
        },
      },
      {
        "$project": {
          "_id": "$$ROOT", 'scoreTimelines': "$scoreTimelines"
        }
      },
      {
        $unwind:
        {
          path: "$scoreTimelines",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { "scoreTimelines.date": -1 }
      },
      {
        $group: {
          "_id": "$_id",
          "_scoreTimelines": { "$push": "$scoreTimelines" }
        }
      },

      {
        "$addFields": {
          "_totalScoreRuns": {
            "$sum": "$_scoreTimelines.score.runs"
          },
          "_totalScoreWickets": {
            "$sum": "$_scoreTimelines.score.wickets"
          },
          '_bestRuns': {
            '$max': "$_scoreTimelines.best.runs"
          },
        }
      },

      {
        "$project": {
          "_id": "$_id._id",
          name: '$_id.name',
          slug: '$_id.slug',
          images: '$_id.images',
          email: '$_id.email',
          roles: '$_id.roles',
          scoreTimelines: '$_scoreTimelines',
          totalScoreRuns: '$_totalScoreRuns',
          totalScoreWickets: '$_totalScoreWickets',
          bestRuns: '$_bestRuns',
        }
      }


      // { "$project": { "password": 0 } }
    ]);
}

// get single type
async function getUser(userSlugOrId) {

  var match = {};
  if (userSlugOrId.match(/^[0-9a-fA-F]{24}$/)) {
    userSlugOrId = mongoose.Types.ObjectId(userSlugOrId);
    match = { _id: userSlugOrId }
  } else {
    match = { slug: userSlugOrId }
  }

  return await User
    // .findById(userId).populate("scoreTimelines")
    .aggregate([
      {
        $match: match
      },
      {
        $lookup: {
          from: "scoretimelines",
          localField: "scoreTimelines",
          foreignField: "_id",
          as: "scoreTimelines"
        },
      },
      {
        "$project": {
          "_id": "$$ROOT", 'scoreTimelines': "$scoreTimelines"
        }
      },
      {
        $unwind:
        {
          path: "$scoreTimelines",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { "scoreTimelines.date": -1 }
      },
      {
        $group: {
          "_id": "$_id",
          "_scoreTimelines": { "$push": "$scoreTimelines" }
        }
      },

      {
        "$addFields": {
          "_totalScoreRuns": {
            "$sum": "$_scoreTimelines.score.runs"
          },
          "_totalScoreWickets": {
            "$sum": "$_scoreTimelines.score.wickets"
          },
          '_bestRuns': {
            '$max': "$_scoreTimelines.best.runs"
          },
        }
      },

      {
        "$project": {
          "_id": "$_id._id",
          name: '$_id.name',
          slug: '$_id.slug',
          images: '$_id.images',
          email: '$_id.email',
          roles: '$_id.roles',
          scoreTimelines: '$_scoreTimelines',
          totalScoreRuns: '$_totalScoreRuns',
          totalScoreWickets: '$_totalScoreWickets',
          bestRuns: '$_bestRuns',
        }
      }
    ]);
}

// Create a user
async function createUser(body) {
  return new User(body).save();
}

// Update a user
async function updateUser(userId, body) {
  return await User.findByIdAndUpdate(userId, body, {
    new: true,
    runValidators: true,
  });

}

// Delete a type
async function deleteUser(userId) {


  const deletedUser = await User.findByIdAndDelete(userId).populate("scoreTimelines");

  const deleteableScoreTimelineIds = deletedUser.scoreTimelines.reduce((acc, scoreTimeline) => {
    acc.push(scoreTimeline._id);
    return acc;
  }, []);

  await ScoreTimeline.deleteMany({ _id: { $in: deleteableScoreTimelineIds } })

  // await ScoreTimeline.updateMany(
  //   { _id: deletedUser.scoreTimelines },
  //   { $pull: { player: deletedUser._id } }
  // );

  // await ScoreTimeline.updateOne({ _id: deletedUser.player }, { $push: { scoreTimelines: scoreTimeline._id } });


  return deletedUser;
}

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
