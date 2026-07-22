import express from "express";
import UserRepository from "../repositories/user.repository.js";

class UserService {
  static async getAllUsers() {
    const users = await UserRepository.find();
  }
}

export default UserService;
