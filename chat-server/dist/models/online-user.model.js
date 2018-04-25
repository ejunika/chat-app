"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
class OnlineUser extends user_model_1.User {
    constructor(userName, socketId) {
        super(userName);
        this.socketId = socketId;
    }
}
exports.OnlineUser = OnlineUser;
