import UserModel from "../models/User.model.js";

class UserRepository {
  static async find(skip = 0, limit = 10) {
    return await UserModel.find().skip(skip).limit(limit);
  }

  static async count() {
    return await UserModel.countDocuments();
  }

  static async findById(id) {
    return await UserModel.findOne({ _id: id });
  }

  static async findByEmail(email) {
    return await UserModel.findOne({ email: email });
  }

  static async create(user) {
    return await UserModel.create(user);
  }

  static async update(id, user) {
    return await UserModel.findOneAndUpdate({ _id: id }, user);
  }

  static async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  static async addDocument(id, document) {
    return await UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { documents: document } },
      { new: true },
    );
  }
}

export default UserRepository;
