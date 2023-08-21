import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { Tweet } from './entities/tweet.entity';
import { User } from './entities/user.entity';
import { CreateTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  private users: User[] = [];
  private tweets: Tweet[] = [];

  getHello(): string {
    return "I'm okay!";
  }

  signUp(createUserDto: CreateUserDto) {
    const { username, avatar } = createUserDto;
    const user = new User(username, avatar);
    this.users.push(user);
  }

  createTweet(createTweetDto: CreateTweetDto) {
    const { username, tweet } = createTweetDto;
    const user = this.users.find((user) => user.getUsername() === username);
    if (!user) throw new UnauthorizedException();

    const newTweet = new Tweet(username, tweet);
    this.tweets.push(newTweet);
  }

  getTweets(page?: number) {
    if (page !== undefined && (page < 1 || isNaN(page))) throw new BadRequestException();

    const tweetsPerPage = 15;
    const start = (page ? page -1 : 0) * tweetsPerPage;
    const end = start + tweetsPerPage;
    const tweetsList = [...this.tweets].reverse().slice(start, end).map((tweet) => {
      const user = this.users.find((user) => user.getUsername() === tweet.getUsername());
      return {
        avatar: user.getAvatar(),
        username: user.getUsername(),
        tweet: tweet.getTweet(),
      };
    });

    return tweetsList;
  }

  getTweetsByUser(username: string) {
    const tweetsList = [...this.tweets].reverse()
    .filter((tweet) => tweet.getUsername() === username)
    .map((tweet) => {
      const user = this.users.find((user) => user.getUsername() === tweet.getUsername());
      return {
        avatar: user.getAvatar(),
        username: user.getUsername(),
        tweet: tweet.getTweet(),
      };
    });

    return tweetsList;
  }

}
