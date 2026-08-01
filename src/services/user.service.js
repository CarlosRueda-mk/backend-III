import UserRepository from "../repositories/user.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";

class UserService {
  static async getAllUsers() {
    const users = await UserRepository.find();
    return users;
  }

  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new CustomError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }
    return user;
  }

  static async createUser(user) {
    const existsUser = await UserRepository.findByEmail(user.email);
    if (existsUser) {
      throw new CustomError(ERROR_DICTIONARY.EMAIL_ALREADY_EXISTS);
    }
    const newUser = await UserRepository.create(user);
    return newUser;
  }

  static async updateUser(id, user) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new CustomError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }
    await UserRepository.update(id, user);
  }

  static async deleteUser(id) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new CustomError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    await UserRepository.delete(id);
  }
}

export default UserService;
