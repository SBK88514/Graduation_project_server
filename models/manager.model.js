import { hash } from "bcrypt";
import { model, Schema } from "mongoose";

const managerSchema = new Schema(
  {
    manager_name: {
      type: String,
      required: true,
      unique: true,
    },
    manager_email: {
      type: String,
      required: true,
    },
    manager_password: {
      type: String,
      required: true,
    },
    premission: {
      type: String,
      default: "Manager",
      enum: ["Admin", "Manager"],
    },
  },
  { timestamps: true }
);
managerSchema.pre("save", async function (next) {
  this.manager_password = await hash(this.manager_password, 10);
  next();
});

export default model("managers", managerSchema);
