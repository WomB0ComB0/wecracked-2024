import { Schema, model, models, Types } from 'mongoose';

const postSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['FEATURED', 'LATEST', 'RELATED'], default: 'LATEST' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Types.ObjectId, ref: 'Comments' }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Post = models.Post || model('Post', postSchema);

export default Post;