import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto';
import { AuthModel } from './auth.model';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    async signup(dto:SignupDto):Promise<any> {

        try {
            const {username,email,password} = dto;
    
            const existingUser = await AuthModel.findOne({email});
    
            if(existingUser){
                throw new BadRequestException("User already exists");
            }

            const hashedPassword:string = await bcrypt.hash(password,10);
    
            const user = new AuthModel({
                username,
                email,
                password: hashedPassword,
                lastLogin:new Date()
            })

            await user.save();

            return user;
    
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    signin(): { message: string } {
        return { message: "signin" };
    }
}
