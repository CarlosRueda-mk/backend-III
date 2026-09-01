import UserService from "../services/user.service.js";

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const userUpdate = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(userUpdate);
    } catch (error) {
      next(error);
    }
  }
  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json("User deleted");
    } catch (error) {
      next(error);
    }
  }

  static async addDocument(req, res, next) {
    try {
      const { documentType } = req.body;
      const updatedUser = await UserService.addDocument(
        req.params.id,
        req.file,
        documentType,
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
