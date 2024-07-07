import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  image: { type: String },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  password: { type: String },
  updatedAt: { type: Date, default: Date.now },
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  accounts: [{ type: Types.ObjectId, ref: 'Account' }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = model('User', userSchema);


export default User;

