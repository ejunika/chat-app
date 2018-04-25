import { Message } from "./message.model";
import { User } from "./user.model";


export class ChatMessage extends Message {

    from: User;
    to: Array<User>;
    body: string;

    constructor(from: User, to: User | Array<User>, body: string) {
        super(from, to);
        this.body = body;
    }
    
}

export class Acknowledgement extends Message {
    type: ACKNOWLEDGE_TYPE;
    status: boolean;

    constructor(from: User, to: User | Array<User>, status: boolean, type: ACKNOWLEDGE_TYPE) {
        super(from, to);
        this.type = type;
        this.status = status;
    }

}

export enum ACKNOWLEDGE_TYPE {
    TYPING = 'typing'
}