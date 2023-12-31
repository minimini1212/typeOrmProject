import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard())
  async getMyInfo(@Req() req) {
    return {
      nickname: req.user.name,
      role: req.user.role,
      point: req.user.point,
    }
  }
}
