import mongoose, { InferSchemaType } from "mongoose";
import Project from "./project.model";
import Ticket from "./ticket.model";
import Comment from "./comment.model";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, min: 2, max: 50 },
        image: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, min: 6 },
        admin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

export type UserType = InferSchemaType<typeof UserSchema>;

// Delete associated projects and tickets when user is removed from db
UserSchema.pre("deleteOne", { document: true }, async function (next) {
    const user: any = this;

    await Project.deleteMany({ author: user._id });
    await Ticket.deleteMany({ author: user._id });
    await Comment.deleteMany({ author: user._id });

    next();
});

export default mongoose.model("User", UserSchema);
