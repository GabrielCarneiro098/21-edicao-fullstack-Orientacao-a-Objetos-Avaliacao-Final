import { randomUUID } from "crypto";
import { Tweet } from "./Tweet";
import { Users } from "../database/Users";
import { Tweets } from "../database/Tweets";

export class User {
  private _id: string;
  constructor(
    private _name: string,
    private _userName: string,
    private _email: string,
    private _password: string,
    private _followers: User[] = [],
    private _following: User[] = []
  ) {
    this._id = randomUUID();
  }

  follow(user: User) {
    const alredyFollowing = this.following.findIndex(
      (follower) => follower.userName == user.userName
    );

    if (alredyFollowing == -1) {
      this.following.push(user);
      user.followers.push(this);
    } else {
      this.following.splice(alredyFollowing, 1);
      user.followers.splice(alredyFollowing, 1);
    }
  }

  showFollowers() {
    console.log(
      `@${this.userName} followers: ${this._followers
        .map((follower) => `@${follower._userName}`)
        .join(", ")}`
    );
  }

  showFeed() {
    const namesFollow = this.following.map((follow) => follow.userName);

    Tweets.forEach((tweet) => {
      if (namesFollow.includes(tweet.userName)) {
        console.log(
          `@${tweet.userName}: ${tweet.content}\nLikes: ${
            tweet.likes.length > 0
              ? tweet.likes.length > 2
                ? `@${tweet.likes[0].userName} e mais ${tweet.likes.length} curtiram esse post`
                : tweet.likes.map((like) => `@${like.userName}`).join(", ")
              : "0 likes"
          }\n${tweet.replies
            .map((reply) => ` > @${reply.userName}: ${reply.content}`)
            .join("\n")}`
        );
      }
    });
  }

  showTweets() {
    Tweets.forEach((tweet) =>
      console.log(
        `@${tweet.userName}: ${tweet.content}\nLikes: ${
          tweet.likes.length > 0
            ? tweet.likes.length > 2
              ? `@${tweet.likes[0].userName} e mais ${tweet.likes.length} curtiram esse post`
              : tweet.likes.map((like) => `@${like.userName}`).join(", ")
            : "0 likes"
        }\n ${tweet.replies
          .map((reply) => `> @${reply.userName}: ${reply.content}`)
          .join(", ")}`
      )
    );
  }

  registerUser() {
    const userNameValidation = Users.some(
      (user) => user._userName === this._userName
    );

    const sameID = Users.some((user) => user._id === this._id);

    if (userNameValidation) {
      console.log("Nome de usuário já está em uso.");
      return;
    }

    while (sameID) {
      this._id = randomUUID();
    }

    Users.push(this);
    console.log(`Usuário ${this._userName} criado com sucesso`);
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this.password;
  }

  get following() {
    return this._following;
  }

  get followers() {
    return this._followers;
  }
}
