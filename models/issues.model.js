import { model, Schema } from "mongoose";

const issueSchema = new Schema(
  {
    issue_building: {
      type: String,
      default: "",
    },
    issue_floor: {
      type: Number,
      default: "",
    },
    issue_apartment: {
      type: Number,
      default: "",
    },
    issue_description: {
      type: String,
      default: "",
    },
    issue_images: [
      {
        type: String,
        default: "",
      },
    ],
  },
  { timestamps: true }
);

export default model("issues", issueSchema);
