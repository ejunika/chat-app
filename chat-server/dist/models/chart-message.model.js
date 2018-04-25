"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("./message.model");
class ChatMessage extends message_model_1.Message {
    constructor(from, to, body) {
        super(from, to);
        this.body = body;
    }
}
exports.ChatMessage = ChatMessage;
class Acknowledgement extends message_model_1.Message {
    constructor(from, to, status, type) {
        super(from, to);
        this.type = type;
        this.status = status;
    }
}
exports.Acknowledgement = Acknowledgement;
var ACKNOWLEDGE_TYPE;
(function (ACKNOWLEDGE_TYPE) {
    ACKNOWLEDGE_TYPE["TYPING"] = "typing";
})(ACKNOWLEDGE_TYPE = exports.ACKNOWLEDGE_TYPE || (exports.ACKNOWLEDGE_TYPE = {}));
