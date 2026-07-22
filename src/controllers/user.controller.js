import express from "express";
import UserService from "../services/user.service.js";

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(`Error getting Users: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
