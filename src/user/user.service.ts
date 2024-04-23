import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor() {}

    addUser(email: string): Promise<void> {
        throw new NotImplementedException();
    }

    getUser(email: string): Promise<unknown> {
        throw new NotImplementedException();
    }

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
