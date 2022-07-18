// models/User.js
import mongoose from "mongoose";


const ScoreTimelineSchema = new mongoose.Schema({
  score: {
    runs: {
      type: Number,
      trim: true,
      required: [true, "Please Enter runs"],
      default: 0,
    },
    wickets: {
      type: Number,
      trim: true,
      required: [true, "Please Enter wickets"],
      default: 0,
    }
  },

  best: {
    runs: {
      type: Number,
      trim: true,
      required: [true, "Please Enter runs"],
      default: 0,
    },
    wickets: {
      type: Number,
      trim: true,
      required: [true, "Please Enter wickets"],
      default: 0,
    }
  },

  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: [true, 'Please Enter player']
  },

  date: { type: Date, default: Date.now }

});



const ScoreTimeline = mongoose.models.ScoreTimeline || mongoose.model("ScoreTimeline", ScoreTimelineSchema);

export default ScoreTimeline;
