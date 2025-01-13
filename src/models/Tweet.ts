import { randomUUID } from "crypto";
import { Like } from "./Like";
import { User } from "./User";
import { Tweets } from "../database/Tweets";

export class Tweet {
  private _id: string;
  private _userName: string = "";
  private _likes: Like[] = [];
  private _replies: Tweet[] = [];

  constructor(private _content: string, private _type: "normal" | "reply") {
    this._id = randomUUID();
  }

  sendTweet(user: User) {
    this.userName = user.userName;
    Tweets.push(this);
  }

  reply(reply: Tweet, user: User) {
    this.userName = user.userName;
    reply.replies.push(this);
  }

  like(user: User) {
    const newLike = new Like(this, user.userName);
    const userLiked = this.likes.findIndex(
      (like) => like.userName == newLike.userName
    );

    if (userLiked == -1) {
      this.likes.push(newLike);
    } else {
      this.likes.splice(userLiked, 1);
    }
  }

  show() {
    console.log(
      `@${this.userName}: ${this._content}\nLikes: ${
        this.likes.length > 0
          ? this.likes.length > 2
            ? `@${this.likes[0].userName} e mais ${this.likes.length} curtiram esse post`
            : this.likes.map((like) => `@${like.userName}`).join(", ")
          : "0 likes"
      }\n${this.replies
        .map((reply) => ` > @${reply.userName}: ${reply.content}`)
        .join("\n")}`
    );
  }

  showReplies() {}

  get userName(): string {
    return this._userName;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get likes() {
    return this._likes;
  }

  get replies() {
    return this._replies;
  }
}
