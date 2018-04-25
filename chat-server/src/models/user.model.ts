export class User {
    userName: string;
    activityStatus: ACTIVITY_STATUS;
    constructor(userName: string, activityStatus: ACTIVITY_STATUS) {
        this.userName = userName;
        this.activityStatus = activityStatus;
    }
}

export enum ACTIVITY_STATUS {
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'away'
}