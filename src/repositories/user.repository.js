import express from "express";
import UserModel from "../models/User.model.js";

class UserRepository {
  static async find() {
    return await UserModel.find();
  }
}

export default UserRepository;
