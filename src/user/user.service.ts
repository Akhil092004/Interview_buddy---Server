import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { SigninDto, SignupDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,

        private jwtService:JwtService
    ){}

    async signup(dto:SignupDto):Promise<User>{
        try {
            const {username,email,password} = dto;

    
            const existingUser = await this.userModel.findOne({
                email
            })
            
            if(existingUser){

                throw new BadRequestException("User already exists");
            }
    
            const hashedPassword = await bcrypt.hash(password,10);
            console.log("user created");
    
            const user = new this.userModel({
                username,
                email,
                password:hashedPassword,
                lastLogin:new Date()
            })

            await user.save();
    
            return user
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async signin(dto:SigninDto):Promise<{accessToken:string}>{
        try {
            

            const {email,password} = dto;

            const user = await this.userModel.findOne({
                email
            })

            if(!user){
                throw new BadRequestException("Invalid username");
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);

            if(!isPasswordValid){
                throw new BadRequestException("Invalid password");
            }

            const JwtPayload = {sub:user._id,username:user.username,role:user.role};

            return {
                accessToken : await this.jwtService.signAsync(JwtPayload)
            }

        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    //get user profile by fetching user email from request in user.guard.ts
    getProfile(){
        return {message:"got into getProfile"};
    }

    


    
}
