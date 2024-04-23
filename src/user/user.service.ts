import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor() {}

    addUser(name:string, email: string, password: string): boolean {
        return true
    }

    getUser(email: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
