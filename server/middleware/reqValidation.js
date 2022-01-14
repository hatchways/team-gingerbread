const { body, param } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "loadMessages":
    case "deleteConversation":
      return [
        param("conversationId", "Please include a valid conversation id in request.").exists({ checkFalsy: true }),
      ];

    case "startConversation":
      return [body("converser", "Please include a valid converser id in request.").exists({ checkFalsy: true })];

    case "createNewMessage":
      return [
        body("conversationId", "Please include a valid conversation id in request.").exists({ checkFalsy: true }),
        body("content", "Please include valid message content in request.").exists({ checkFalsy: true }),
      ];

    case "updateIsRead":
      return [param("messageId", "Please include a valid message id in request.").exists({ checkFalsy: true })];

    default:
      break;
  }
};

module.exports = validate;
