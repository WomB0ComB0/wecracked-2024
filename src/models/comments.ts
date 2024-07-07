import { Schema, model, models, Types } from 'mongoose';

const commentsSchema = new Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  postId: { type: Types.ObjectId, ref: 'Post', required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Comments = models.Comments || model('Comments', commentsSchema);

export default Comments;