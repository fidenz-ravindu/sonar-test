import { model, Schema } from "mongoose";

let MessageModel = undefined;

const MessageSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  subject: String,
  message: String,
});

try {
  MessageModel = model("messages");
} catch (e) {
  MessageModel = model("messages", MessageSchema);
}

export default MessageModel;
