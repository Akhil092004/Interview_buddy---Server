import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signup(): { message: string } {
        return { message: "signup" };
    }

    signin(): { message: string } {
        return { message: "signin" };
    }
}
