import MessageModel from "../models/message";

export const saveMessage = async ({ name, email, subject, message }) => {
  let doc = new MessageModel({
    _id: new Date().getTime(),
    name,
    email,
    subject,
    message,
  });

  await doc.validate();
  await doc.save();
};
