"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userName, activityStatus) {
        this.userName = userName;
        this.activityStatus = activityStatus;
    }
}
exports.User = User;
var ACTIVITY_STATUS;
(function (ACTIVITY_STATUS) {
    ACTIVITY_STATUS["ONLINE"] = "online";
    ACTIVITY_STATUS["OFFLINE"] = "offline";
    ACTIVITY_STATUS["AWAY"] = "away";
})(ACTIVITY_STATUS = exports.ACTIVITY_STATUS || (exports.ACTIVITY_STATUS = {}));
