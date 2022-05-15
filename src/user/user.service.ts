import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {User} from './interfaces/user.interface';
import { CreateuserDTO} from './dto/user.dto';

@Injectable()
export class UserService {

    constructor (@InjectModel('User') readonly userModel: Model<User>) {}

   async getUsers(): Promise<User[]> {
       const users = await this.userModel.find({})
        return users
    }

   async getUser(userID: string): Promise<User>{
       const user = await this.userModel.findById(userID);
       return user;
    }

    async createUser(createuserDTO: CreateuserDTO): Promise<User>{
        const user = new this.userModel(createuserDTO);
        return await user.save();
    }

    async updateUser(userID: string, createuserDTO: CreateuserDTO): Promise<User>{
       const updatedUser = await this.userModel.findByIdAndUpdate(userID, createuserDTO, {new: true});
       return updatedUser;
    }

    async deleteUser(userID: string): Promise<User>{
       const deletedUser = await this.userModel.findByIdAndDelete(userID);
       return deletedUser;
    }

}
