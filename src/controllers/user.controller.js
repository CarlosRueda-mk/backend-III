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

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error getting user ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
  static async updateUser(req, res) {
    try {
      const userUpdate = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(userUpdate);
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(`Error creating new user: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json("User deleted");
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
