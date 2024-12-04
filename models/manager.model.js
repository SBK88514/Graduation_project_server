import { hash } from "bcrypt";
import { model, Schema } from "mongoose";

const managerSchema = new Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
managerSchema.pre("save", async function (next) {
    this.Password = await hash(this.Password, 10);
    next();
});

export default model("managers", managerSchema);
