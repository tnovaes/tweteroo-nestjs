import { Controller, Get, Post, HttpCode, Body, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreateTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sign-up')
  @HttpCode(200)
  signUp(@Body() body:CreateUserDto) {
    return this.appService.signUp(body);
  }

  @Post('tweets')
  createTweet(@Body() body: CreateTweetDto) {
    return this.appService.createTweet(body);
  }

  @Get('tweets')
  getTweets(@Query('page') page: number) {
    return this.appService.getTweets(page);
  }

  @Get('tweets/:username')
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  } 
}
