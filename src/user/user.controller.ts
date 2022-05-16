import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query, Render } from '@nestjs/common';
import { CreateuserDTO } from "./dto/user.dto";
import {UserService} from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createuserDTO: CreateuserDTO){
       const user = await this.userService.createUser(createuserDTO)
        return res.status(HttpStatus.OK).json({
            message: 'User registered Successfully',
            user
        })
    }

    @Get('/')
    @Render('index')
    async root(@Res() res){
        return await this.userService.getUsers()
               .then((result) => result ? {user: result} : {user: {}})         
    }

    @Get('/:userID')
    async getUser(@Res() res, @Param('userID') userID){
        const user = await this.userService.getUser(userID);
        if(!user) throw new NotFoundException('user does not exists');
        return res.status(HttpStatus.OK).json(user)
    }

    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID){
        const userDeleted = await this.userService.deleteUser(userID);
        if(!userDeleted) throw new NotFoundException('user does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Succesfully',
            userDeleted
        })
    }

    @Put('/update')
   async updateProduct(@Res() res, @Body() createuserDTO: CreateuserDTO, @Query('userID') userID){
      const updatedUser = await this.userService.updateUser(userID, createuserDTO);
      if(!updatedUser) throw new NotFoundException('user does not exists');
      return res.status(HttpStatus.OK).json({
          message: 'User Updated Successfully',
          updatedUser
      })
    }
}
