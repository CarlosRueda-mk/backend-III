import UserRepository from "../repositories/user.repository.js";

class UserService {
  static async getAllUsers() {
    const users = await UserRepository.find();
    return users;
  }

  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not Found");
    }
    return user;
  }

  static async createUser(user) {
    const existsUser = await UserRepository.findByEmail(user.email);
    if (existsUser) {
      throw new Error("This email is already used");
    }
    const newUser = await UserRepository.create(user);
    return newUser;
  }

  static async updateUser(id, user) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not Found");
    }
    await UserRepository.update(id, user);
  }

  static async deleteUser(id) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new Error("User not Found");
    }

    await UserRepository.delete(id);
  }
}

export default UserService;
