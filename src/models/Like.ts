import { randomUUID } from "crypto";
import { User } from "./User";
import { Tweet } from "./Tweet";

export class Like {
  private _id: string;
  private _userName: string = "";
  constructor(private _tweet: Tweet, userName: string) {
    this._id = randomUUID();
    this._userName = userName;
  }

  get userName() {
    return this._userName;
  }
}
