import UserModel, { IUser } from "../models/userModel";
import { userSchema } from "../validation/dbSchema";
import { validateSchema } from "../utils/validateSchema";
import { generateToken } from "../utils/jwtUtills";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import {
  LoginResponse,
  UserCreationResponse,
  UserResponse,
} from "../models/DTO/userDTO";

class UserService {
  private mapUserResponse(user: IUser): UserResponse {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<LoginResponse | string> {
    try {
      const user = await UserModel.findOne({ email })
        .select("+password")
        .lean();
      if (!user) {
        return "User not found";
      }

      if (!(await comparePassword(password, user.password))) {
        return "Invalid password";
      }

      const token = generateToken(user._id as string, user.role);
      return {
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error: any) {
      return `Error authenticating user: ${error.message}`;
    }
  }

  async createUser(userData: IUser): Promise<UserCreationResponse | string> {
    try {
      const validateUser = validateSchema(userSchema, userData);

      if (typeof validateUser === "string") {
        return validateUser;
      }

      const hashedPassword = await hashPassword(validateUser.password);
      const user = new UserModel({
        ...validateUser,
        password: hashedPassword,
      });
      await user.save();

      const token = generateToken(user._id as string, user.role);

      return {
        user: this.mapUserResponse(user),
        token,
      };
    } catch (error: any) {
      return `Error creating user: ${error.message}`;
    }
  }

  async getAllUsers(): Promise<UserResponse[] | string> {
    try {
      const users = await UserModel.find()
        .select("name email role createdAt")
        .lean();
      return users.map((user) => this.mapUserResponse(user));
    } catch (error: any) {
      return `Error getting users: ${error.message}`;
    }
  }
}

export default new UserService();
