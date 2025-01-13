"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
class User {
    constructor(_name, _userName, _email, _password) {
        this._name = _name;
        this._userName = _userName;
        this._email = _email;
        this._password = _password;
        this._id = (0, crypto_1.randomUUID)();
    }
}
exports.User = User;
