// models/User.js
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import slugify from "slugify-mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Name"],
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  images: {
    avatar: {
      type: String,
      trim: true,
      required: [true, "Please select avatar"],
      default: "/images/avatar.jpg",
    },

    cover: {
      type: String,
      trim: true,
      required: [true, "Please select cover"],
      default: "/images/siom.png",
    },
    settings: {
      mobileBackgroundPosition: {
        type: Number,
        trim: true,
        required: [true, "Please mobile background position"],
        default: 20,
      },
    },
  },
  scoreTimelines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScoreTimeline",
      trim: true,
    },
  ],
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  roles: {
    type: [
      {
        type: String,
        enum: ["player", "admin"],
      },
    ],
    default: ["player"],
  },
});

UserSchema.plugin(slugify);


// Encrypt the password
UserSchema.pre("save", async function (next) {
  // To run encryption only if the password is changed
  if (!this.isModified("password")) return next();

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
