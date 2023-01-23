import { Document, ObjectId } from 'mongoose';
export interface INotification extends Document {
    readonly sender: ObjectId;
    readonly reciever: ObjectId;
    readonly title: string;
    readonly context: ObjectId;
    readonly read: boolean;
}
