import UserRepository from "../repositories/user.repository.js";
import CustomError from "../errors/custom-error.js";
import ERROR_DICTIONARY from "../errors/error-dictionary.js";
import { DOCUMENT_TYPES } from "../constants/index.js";
import logger from "../config/logger.js";

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
    return await UserRepository.findById(id);
  }

  static async deleteUser(id) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new CustomError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    await UserRepository.delete(id);
  }

  static async addDocument(id, file, documentType) {
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new CustomError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }

    if (!Object.values(DOCUMENT_TYPES).includes(documentType)) {
      throw new CustomError(ERROR_DICTIONARY.INVALID_DOCUMENT_TYPE);
    }
    console.log("FILE:", file);
    if (!file) {
      throw new CustomError(ERROR_DICTIONARY.FILE_REQUIRED);
    }
    const document = {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      documentType: documentType,
      uploadedAt: new Date(),
    };
    const updatedUser = await UserRepository.addDocument(id, document);
    if (!updatedUser) {
      throw new CustomError(ERROR_DICTIONARY.USER_NOT_FOUND);
    }
    logger.info(`Document uploaded successfully for user: ${id}`);
    return updatedUser;
  }
}

export default UserService;
