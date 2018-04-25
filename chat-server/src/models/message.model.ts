import { User } from "./user.model";

export class Message {
    
    from: User;
    to: Array<User>;

    constructor(from: User, to: User | Array<User>) {
        if (to instanceof Array) {
            this.to = to;
        } else {
            this.to = [to];
        }
    }
    
}