export class Tweet {
    private username: string;
    private tweet: string;

    constructor(username: string, tweet:string){
        this.username = username;
        this.tweet = tweet;
    }

    getUsername() {
        return this.username;
    }

    getTweet() {
        return this.tweet;
    }
}