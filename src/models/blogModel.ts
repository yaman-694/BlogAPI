import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './userModel';

// Define the BlogPost schema
export interface BlogPostDocument extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId | UserDocument;
    createdAt: Date;
    updatedAt: Date;
}

const blogPostSchema = new Schema<BlogPostDocument>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Create and export the BlogPost model
export const BlogModel = mongoose.model<BlogPostDocument>('BlogPost', blogPostSchema);
