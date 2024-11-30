import mongoose, { Document, Schema } from 'mongoose';

// Define the IPost interface extending Document for Mongoose
interface IPost extends Document {
  title: string;
  description: string;
  category: string;
  readMoreLink: string;
  userId: mongoose.Types.ObjectId; // Reference to the User model
  createdAt: Date;
  updatedAt: Date;
}


const postSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    readMoreLink: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Correct reference to the User model
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Ensures createdAt and updatedAt are added automatically
  }
);


const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post;
