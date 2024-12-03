import { hash } from "bcrypt";
import { model, Schema } from "mongoose";

const adminSchema = new Schema({
    adminName : {
        type: String,
        required: true,
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
},
{timestamps: true}
);
adminSchema.pre("save", async function(next) {
        this.adminPassword = await hash(this.adminPassword,10)
        next()   
})

export default model("admin", adminSchema)
