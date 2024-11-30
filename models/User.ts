import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Virtual field to populate posts for a user
userSchema.virtual('posts', {
  ref: 'Post', // The model to populate
  localField: '_id', // The field in the User model
  foreignField: 'userId', // The field in the Post model
});

// Apply the virtual field to be included in toJSON output
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
