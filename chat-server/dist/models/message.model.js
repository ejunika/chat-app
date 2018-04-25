"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(from, to) {
        if (to instanceof Array) {
            this.to = to;
        }
        else {
            this.to = [to];
        }
    }
}
exports.Message = Message;
