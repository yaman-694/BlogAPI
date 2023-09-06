import mongoose, { Document, Schema } from "mongoose";

export interface IUserSession {
    user: Schema.Types.ObjectId
    ip_address: string
    agent: string
    created_at: Date
    expire_at: Date
    active: boolean
    deleted: boolean
}

export interface IUserSessionDocument extends IUserSession, Document {}

const UserSessionSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    ip_address: { type: String, required: true },
    agent: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    expire_at: { type: Date },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

export const UserSessionModel =  mongoose.model<IUserSessionDocument>('UserSession', UserSessionSchema);